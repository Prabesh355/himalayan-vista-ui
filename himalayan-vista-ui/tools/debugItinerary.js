const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, '..', 'src', 'services', 'mockData.ts');
const text = fs.readFileSync(mockPath, 'utf8');

function extractBlockForSlug(slug) {
  const slugIndex = text.indexOf(`slug: "${slug}"`);
  if (slugIndex === -1) return null;
  const after = text.slice(slugIndex);
  const itMatch = after.match(/itinerary:\s*`([\s\S]*?)`,\n\s*image:/);
  if (!itMatch) return null;
  return itMatch[1];
}

function extractItinerary(markdown) {
  const lines = markdown.split(/\r?\n/).map((line) => line.trim());
  const summaryParts = [];
  const highlights = [];
  const days = [];
  let currentDay = null;
  const clean = (v) => v.replace(/^[-*•]\s+/, '').replace(/^\*+/, '').replace(/\*+$/, '').replace(/\s+/g, ' ').trim();
  const pushDay = () => { if (!currentDay) return; days.push(currentDay); currentDay = null; };
  const startDay = (day, title) => { pushDay(); currentDay = { day, title, detailParts: [], meta: [], highlights: [], activeSection: null }; };

  for (const line of lines) {
    if (!line || line === '---') { if (currentDay) currentDay.activeSection = null; continue; }

    const dayHeading = line.match(/^(?:#{1,3}\s*)?(?:\*\*)?Day\s*(\d+)\s*[:\-–—]\s*(.+?)(?:\*\*)?$/i);
    if (dayHeading) { startDay(Number(dayHeading[1]), clean(dayHeading[2])); continue; }
    const numberedDay = line.match(/^\d+\.\s+(?:\*\*)?Day\s*(\d+)\s*[—–-]\s*(.+?)(?:\*\*)?[:\-]?(?:\s*(.+))?$/i);
    if (numberedDay) { startDay(Number(numberedDay[1]), clean(numberedDay[2])); if (numberedDay[3]) currentDay.detailParts.push(clean(numberedDay[3])); continue; }
    const bulletDay = line.match(/^[-*]\s+(?:\*\*)?Day\s*(\d+)\s*[—–-]\s*(.+?)(?:\*\*)?[:\-]?(?:\s*(.+))?$/i);
    if (bulletDay) { startDay(Number(bulletDay[1]), clean(bulletDay[2])); if (bulletDay[3]) currentDay.detailParts.push(clean(bulletDay[3])); continue; }

    if (currentDay) {
      if (/^\*\*Highlights:\*\*/i.test(line)) { currentDay.activeSection = 'highlights'; continue; }
      if (/^\*\*Activities:\*\*/i.test(line)) { currentDay.activeSection = 'activities'; continue; }
      if (/^\*\*(Accommodation|Duration)\:/i.test(line)) { currentDay.meta.push(clean(line.replace(/^\*\*/, '').replace(/\*\*$/, ''))); continue; }
      if (/^[-*•]\s+/.test(line)) { currentDay.detailParts.push(clean(line)); continue; }
      currentDay.detailParts.push(clean(line));
      continue;
    }

    summaryParts.push(clean(line));
  }
  pushDay();
  return { summary: summaryParts.join(' ').replace(/\s+/g, ' ').trim(), highlights, days: days.map(d => ({ day: d.day, title: d.title, detail: d.detailParts.join(' ').replace(/\s+/g,' ').trim(), meta: Array.from(new Set(d.meta)).filter(Boolean), highlights: Array.from(new Set(d.highlights)).filter(Boolean) })) };
}

const slugs = ['everest-base-camp','mera-peak-ski','mera-peak-expedition','manaslu-tsum-valley','annapurna-base-camp','lobuche-east','annapurna-circuit-trek'];
for (const s of slugs) {
  const block = extractBlockForSlug(s);
  console.log('\n---', s, '---');
  if (!block) { console.log('No itinerary block found'); continue; }
  const parsed = extractItinerary(block);
  console.log('Summary:', parsed.summary.slice(0,200));
  console.log('Days parsed:', parsed.days.length);
  for (let i=0;i<Math.min(3, parsed.days.length); i++) {
    const d = parsed.days[i];
    console.log(`Day ${d.day} title: ${d.title}`);
    console.log(`Detail (len ${d.detail.length}):`, d.detail.slice(0,200));
  }
}
