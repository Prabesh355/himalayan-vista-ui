const WORD_PATTERN = /\b[\p{L}\p{N}'’-]+\b/gu;

const wordCount = (value = '') => (String(value).match(WORD_PATTERN) || []).length;
const readingMinutes = (value = '') => Math.max(1, Math.ceil(wordCount(value) / 200));
const hasInternalLink = (value = '') => /(?:href\s*=\s*["']\/|\]\(\/)/i.test(String(value));
const hasExternalLink = (value = '') => /(?:href\s*=\s*["']https?:\/\/|\]\(https?:\/\/)/i.test(String(value));

const issue = (content, seoCategory, severity, recommendation, field) => ({
  content, seoCategory, severity, recommendation, field,
  status: severity === 'info' ? 'passed' : 'open',
});

function check(value, label, category, recommendation, field, options = {}) {
  if (!value) return issue(label, category, options.severity || 'warning', recommendation, field);
  const length = String(value).trim().length;
  if (options.min && length < options.min) return issue(label, category, 'warning', `Use ${options.min}-${options.max || 'recommended'} characters.`, field);
  if (options.max && length > options.max) return issue(label, category, 'warning', `Keep this under ${options.max} characters.`, field);
  return null;
}

function auditContent(item, type, duplicateTitles, duplicateDescriptions) {
  const title = item.seoTitle || item.metaTitle || item.title || '';
  const description = item.seoDescription || item.metaDescription || item.excerpt || item.summary || item.description || '';
  const body = item.content || item.itinerary || item.description || '';
  const image = item.featuredImage || item.ogImage || item.images?.[0] || item.image || '';
  const issues = [
    check(title, 'Missing SEO title', 'Metadata', 'Add a unique SEO title between 50 and 60 characters.', 'seoTitle', { min: 50, max: 60 }),
    check(description, 'Missing meta description', 'Metadata', 'Add a unique meta description between 150 and 160 characters.', 'seoDescription', { min: 150, max: 160 }),
    check(item.slug, 'Missing slug', 'URL', 'Add a short, descriptive URL slug.', 'slug', { severity: 'critical' }),
    check(item.canonicalUrl, 'Missing canonical URL', 'Technical', 'Set the canonical URL for this page.', 'canonicalUrl'),
    check(image, 'Missing featured image', 'Media', 'Add a featured image for search and social sharing.', 'featuredImage'),
    check(item.ogImage || image, 'Missing Open Graph image', 'Social', 'Set an Open Graph image.', 'ogImage'),
    check(item.twitterImage || item.ogImage || image, 'Missing Twitter card image', 'Social', 'Set a Twitter card image.', 'twitterImage'),
    check(item.category, 'Missing category', 'Content', 'Assign one content category.', 'category'),
    check(item.robots && !String(item.robots).includes('noindex'), 'Not indexable', 'Indexing', 'Set robots to index, follow.', 'robots', { severity: 'critical' }),
    wordCount(body) < (type === 'blog' ? 300 : 150) ? issue('Low word count', 'Content', 'warning', `Add at least ${type === 'blog' ? 300 : 150} words of useful content.`, 'content') : null,
    !hasInternalLink(body) ? issue('No internal links', 'Links', 'info', 'Link to a relevant internal page.', 'content') : null,
    !hasExternalLink(body) ? issue('No external links', 'Links', 'info', 'Add a reputable external reference where useful.', 'content') : null,
    type === 'package' && !/faq/i.test(body) ? issue('Missing FAQ section/schema', 'Schema', 'warning', 'Add an FAQ section and FAQ schema.', 'itinerary') : null,
    type === 'package' && !item.schema ? issue('Missing TouristTrip schema', 'Schema', 'warning', 'Add TouristTrip structured data.', 'schema') : null,
    type === 'blog' && !item.schema ? issue('Missing Article schema', 'Schema', 'warning', 'Add Article structured data.', 'schema') : null,
    duplicateTitles.has(title.toLowerCase()) ? issue('Duplicate SEO title', 'Metadata', 'critical', 'Make the SEO title unique.', 'seoTitle') : null,
    duplicateDescriptions.has(description.toLowerCase()) ? issue('Duplicate meta description', 'Metadata', 'critical', 'Make the meta description unique.', 'seoDescription') : null,
  ].filter(Boolean);

  const passed = 16 - issues.length;
  return { id: item.id || item._id, title: item.title, slug: item.slug, type, score: Math.max(0, Math.round((passed / 16) * 100)), wordCount: wordCount(body), readingTime: readingMinutes(body), issues };
}

function duplicateSet(items, getValue) {
  const counts = new Map();
  items.forEach((item) => { const value = String(getValue(item) || '').trim().toLowerCase(); if (value) counts.set(value, (counts.get(value) || 0) + 1); });
  return new Set([...counts].filter(([, count]) => count > 1).map(([value]) => value));
}

function auditCollection(items, type) {
  return items.map((item) => auditContent(item, type, duplicateSet(items, (value) => value.seoTitle || value.metaTitle || value.title), duplicateSet(items, (value) => value.seoDescription || value.metaDescription || value.excerpt || value.summary || value.description)));
}

module.exports = { auditCollection };
