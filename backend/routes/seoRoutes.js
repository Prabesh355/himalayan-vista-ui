const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const Blog = require('../models/Blog');
const logger = require('../utils/logger');

const SITE_URL = process.env.FRONTEND_URL || 'https://nomadsnavigatenepal.com';

/**
 * Maps a package category to its URL prefix on the frontend.
 */
function getPackageUrlPrefix(category) {
  const cat = (category || '').toLowerCase();
  if (cat === 'trekking') return 'trekking';
  if (cat === 'climbing' || cat === 'expedition' || cat === 'peak-climbing') return 'peak-climbing';
  return 'tours';
}

// ─── Dynamic XML Sitemap ────────────────────────────────────────────────────

/**
 * @route   GET /api/seo/sitemap.xml
 * @desc    Generate a comprehensive XML sitemap from DB content
 * @access  Public
 */
router.get('/sitemap.xml', async (req, res) => {
  try {
    const [packages, blogs] = await Promise.all([
      Package.find({ isActive: true }),
      Blog.find({ status: 'published' }),
    ]);

    const now = new Date().toISOString();

    // Static pages
    const staticPages = [
      { loc: '/', changefreq: 'daily', priority: '1.0' },
      { loc: '/packages', changefreq: 'daily', priority: '0.9' },
      { loc: '/blogs', changefreq: 'daily', priority: '0.8' },
      { loc: '/destinations', changefreq: 'weekly', priority: '0.8' },
      { loc: '/about', changefreq: 'monthly', priority: '0.6' },
      { loc: '/contact', changefreq: 'monthly', priority: '0.6' },
      { loc: '/teams', changefreq: 'monthly', priority: '0.5' },
      { loc: '/shop', changefreq: 'weekly', priority: '0.6' },
    ];

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    // Static pages
    for (const page of staticPages) {
      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}${page.loc}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
      xml += `    <priority>${page.priority}</priority>\n`;
      xml += `  </url>\n`;
    }

    // Package pages — use SEO-friendly URLs
    for (const pkg of packages) {
      const prefix = getPackageUrlPrefix(pkg.category);
      const lastmod = pkg.updatedAt || pkg.createdAt || now;
      const priority = pkg.seo?.priority || (pkg.featured ? '0.9' : '0.8');
      const changefreq = pkg.seo?.changeFrequency || 'weekly';

      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/${prefix}/${pkg.slug}</loc>\n`;
      xml += `    <lastmod>${new Date(lastmod).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;

      // Embed primary image for image sitemap enrichment
      const mainImage = pkg.image || (Array.isArray(pkg.images) && pkg.images[0]);
      if (mainImage) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(mainImage)}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(pkg.title || '')}</image:title>\n`;
        xml += `      <image:caption>${escapeXml((pkg.description || '').substring(0, 200))}</image:caption>\n`;
        xml += `    </image:image>\n`;
      }

      xml += `  </url>\n`;
    }

    // Blog pages — canonical /blog/$slug
    for (const blog of blogs) {
      const lastmod = blog.updatedAt || blog.publishedAt || blog.createdAt || now;
      const priority = blog.seo?.priority || '0.7';
      const changefreq = blog.seo?.changeFrequency || 'monthly';

      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/blog/${blog.slug}</loc>\n`;
      xml += `    <lastmod>${new Date(lastmod).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>${changefreq}</changefreq>\n`;
      xml += `    <priority>${priority}</priority>\n`;

      if (blog.featuredImage) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(blog.featuredImage)}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(blog.title || '')}</image:title>\n`;
        xml += `    </image:image>\n`;
      }

      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.set('Content-Type', 'application/xml; charset=utf-8');
    res.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.send(xml);
  } catch (err) {
    logger.error('Sitemap generation error:', err);
    res.status(500).json({ success: false, message: 'Sitemap generation failed' });
  }
});

// ─── Image Sitemap ──────────────────────────────────────────────────────────

/**
 * @route   GET /api/seo/image-sitemap.xml
 * @desc    Dedicated image sitemap for Google Images indexing
 * @access  Public
 */
router.get('/image-sitemap.xml', async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    for (const pkg of packages) {
      const prefix = getPackageUrlPrefix(pkg.category);
      const images = [];

      if (pkg.image) images.push(pkg.image);
      if (Array.isArray(pkg.images)) {
        for (const img of pkg.images) {
          if (img && !images.includes(img)) images.push(img);
        }
      }

      if (images.length === 0) continue;

      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/${prefix}/${pkg.slug}</loc>\n`;

      for (const img of images) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(img)}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(pkg.title || '')}</image:title>\n`;
        xml += `      <image:caption>${escapeXml(`${pkg.title} - ${pkg.destination || 'Nepal'} | Nomads Navigate Nepal`)}</image:caption>\n`;
        xml += `      <image:geo_location>Nepal</image:geo_location>\n`;
        xml += `    </image:image>\n`;
      }

      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.set('Content-Type', 'application/xml; charset=utf-8');
    res.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.send(xml);
  } catch (err) {
    logger.error('Image sitemap generation error:', err);
    res.status(500).json({ success: false, message: 'Image sitemap generation failed' });
  }
});

// ─── Blog Sitemap ───────────────────────────────────────────────────────────

/**
 * @route   GET /api/seo/blog-sitemap.xml
 * @desc    Dedicated blog/article sitemap
 * @access  Public
 */
router.get('/blog-sitemap.xml', async (req, res) => {
  try {
    const blogs = await Blog.find({ status: 'published' });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
    xml += `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

    for (const blog of blogs) {
      const lastmod = blog.updatedAt || blog.publishedAt || blog.createdAt || new Date().toISOString();

      xml += `  <url>\n`;
      xml += `    <loc>${SITE_URL}/blog/${blog.slug}</loc>\n`;
      xml += `    <lastmod>${new Date(lastmod).toISOString()}</lastmod>\n`;
      xml += `    <changefreq>monthly</changefreq>\n`;
      xml += `    <priority>0.7</priority>\n`;

      if (blog.featuredImage) {
        xml += `    <image:image>\n`;
        xml += `      <image:loc>${escapeXml(blog.featuredImage)}</image:loc>\n`;
        xml += `      <image:title>${escapeXml(blog.title || '')}</image:title>\n`;
        xml += `    </image:image>\n`;
      }

      xml += `  </url>\n`;
    }

    xml += `</urlset>`;

    res.set('Content-Type', 'application/xml; charset=utf-8');
    res.set('Cache-Control', 'public, max-age=3600, s-maxage=3600');
    res.send(xml);
  } catch (err) {
    logger.error('Blog sitemap generation error:', err);
    res.status(500).json({ success: false, message: 'Blog sitemap generation failed' });
  }
});

// ─── Robots.txt ─────────────────────────────────────────────────────────────

/**
 * @route   GET /api/seo/robots.txt
 * @desc    Dynamic robots.txt
 * @access  Public
 */
router.get('/robots.txt', (req, res) => {
  const robotsTxt = [
    'User-agent: *',
    'Allow: /',
    '',
    '# Block admin and internal paths',
    'Disallow: /admin',
    'Disallow: /admin/*',
    'Disallow: /dashboard',
    'Disallow: /login',
    'Disallow: /register',
    'Disallow: /api/',
    '',
    '# Block search/filter results from indexing',
    'Disallow: /*?*sort=',
    'Disallow: /*?*filter=',
    'Disallow: /*?*page=',
    '',
    '# Sitemaps',
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    `Sitemap: ${SITE_URL}/image-sitemap.xml`,
    `Sitemap: ${SITE_URL}/blog-sitemap.xml`,
    '',
    '# Crawl-delay for well-behaved bots',
    'User-agent: AhrefsBot',
    'Crawl-delay: 10',
    '',
    'User-agent: SemrushBot',
    'Crawl-delay: 10',
    '',
    'User-agent: MJ12bot',
    'Crawl-delay: 10',
  ].join('\n');

  res.set('Content-Type', 'text/plain; charset=utf-8');
  res.set('Cache-Control', 'public, max-age=86400, s-maxage=86400');
  res.send(robotsTxt);
});

// ─── SEO Health API (for Admin Dashboard) ───────────────────────────────────

/**
 * @route   GET /api/seo/health
 * @desc    Returns SEO health metrics for the admin dashboard
 * @access  Private (Admin)
 */
router.get('/health', async (req, res) => {
  try {
    const [packages, blogs] = await Promise.all([
      Package.find({}),
      Blog.find({}),
    ]);

    const packageIssues = [];
    const blogIssues = [];
    let totalScore = 100;

    for (const pkg of packages) {
      const issues = [];

      if (!pkg.description || pkg.description.length < 50) {
        issues.push('Description too short (< 50 chars)');
      }
      if (!pkg.slug) {
        issues.push('Missing slug');
      }
      if (!pkg.image && (!pkg.images || pkg.images.length === 0)) {
        issues.push('No images');
      }
      if (!pkg.category) {
        issues.push('Missing category');
      }

      if (issues.length > 0) {
        packageIssues.push({ id: pkg.id || pkg._id, title: pkg.title, slug: pkg.slug, issues });
        totalScore -= Math.min(issues.length * 2, 10);
      }
    }

    for (const blog of blogs) {
      const issues = [];

      if (!blog.excerpt && !blog.summary) {
        issues.push('Missing excerpt/summary');
      }
      if (!blog.slug) {
        issues.push('Missing slug');
      }
      if (!blog.featuredImage) {
        issues.push('Missing featured image');
      }
      if (blog.status !== 'published') {
        issues.push('Not published');
      }

      if (issues.length > 0) {
        blogIssues.push({ id: blog.id || blog._id, title: blog.title, slug: blog.slug, issues });
        totalScore -= Math.min(issues.length * 2, 10);
      }
    }

    const healthScore = Math.max(0, Math.min(100, totalScore));

    res.status(200).json({
      success: true,
      data: {
        healthScore,
        totalPackages: packages.length,
        activePackages: packages.filter((p) => p.isActive).length,
        totalBlogs: blogs.length,
        publishedBlogs: blogs.filter((b) => b.status === 'published').length,
        packageIssues,
        blogIssues,
        sitemapUrl: `${SITE_URL}/sitemap.xml`,
        robotsUrl: `${SITE_URL}/robots.txt`,
        lastChecked: new Date().toISOString(),
      },
    });
  } catch (err) {
    logger.error('SEO health check error:', err);
    res.status(500).json({ success: false, message: 'SEO health check failed' });
  }
});

// ─── Helpers ────────────────────────────────────────────────────────────────

function escapeXml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

module.exports = router;
