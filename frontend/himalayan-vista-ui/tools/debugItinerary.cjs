const fs = require('fs');
const path = require('path');

const mockPath = path.join(__dirname, '..', 'src', 'services', 'mockData.ts');
const text = fs.readFileSync(mockPath, 'utf8');

function extractBlockForSlug(slug) {
  const slugIndex = text.indexOf(`slug: "${slug}"`);
  if (slugIndex === -1) return null;
  const after = text.slice(slugIndex);
  const itPos = after.indexOf('itinerary:');
  if (itPos === -1) return null;
  const start = after.indexOf('`', itPos);
  if (start === -1) return null;
  const end = after.indexOf('`', start + 1);
  if (end === -1) return null;
  return after.slice(start + 1, end);
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

    // detect a 'Day N' token and parse title/detail more forgivingly
    const dayNumberMatch = line.match(/Day\s*(\d+)/i);
    if (dayNumberMatch) {
      const dayNum = Number(dayNumberMatch[1]);
      const afterDayIndex = line.search(/Day\s*\d+/i);
      const dashIndex = Math.max(line.indexOf('—', afterDayIndex), line.indexOf('–', afterDayIndex), line.indexOf('-', afterDayIndex));
      let title = '';
      let detailPart = '';

      if (dashIndex > -1) {
        const colonIndex = line.indexOf(':', dashIndex + 1);
        if (colonIndex > -1) {
          title = clean(line.slice(dashIndex + 1, colonIndex));
          detailPart = line.slice(colonIndex + 1);
        } else {
          title = clean(line.slice(dashIndex + 1));
        }
      } else {
        const after = line.slice(afterDayIndex + dayNumberMatch[0].length).trim();
        const colonIndex = after.indexOf(':');
        if (colonIndex > -1) {
          title = clean(after.slice(0, colonIndex));
          detailPart = after.slice(colonIndex + 1);
        } else {
          title = clean(after);
        }
      }

      startDay(dayNum, title || `Day ${dayNum}`);
      if (detailPart) currentDay.detailParts.push(clean(detailPart));
      continue;
    }

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
  console.log('\nRaw block preview:', block.slice(0,200));
  console.log('Raw block chars:', Array.from(block.slice(0,20)).map(c=> `${c}(${c.charCodeAt(0)})`).join(' '));
  const parsed = extractItinerary(block);
  // DEBUG: show first few raw lines and regex groups
  const lines = block.split(/\r?\n/).map(l=>l.trim());
  for (const ln of lines) {
    if (/^\d+\.\s+\*\*Day/i.test(ln) || /^\d+\.\s+Day/i.test(ln) || /^[-*]\s+\*\*Day/i.test(ln)) {
      console.log('\nSample day line:', ln);
      const m1 = ln.match(/^(?:#{1,3}\s*)?(?:\*\*)?Day\s*(\d+)\s*[:\-–—]\s*(.+?)(?:\*\*)?$/i);
      const m2 = ln.match(/^\d+\.\s+(?:\*\*)?Day\s*(\d+)\s*[—–-]\s*(.+?)(?:\*\*)?[:\-]?(?:\s*(.+))?$/i);
      const m3 = ln.match(/^[-*]\s+(?:\*\*)?Day\s*(\d+)\s*[—–-]\s*(.+?)(?:\*\*)?[:\-]?(?:\s*(.+))?$/i);
      console.log('m1:', m1 && m1.slice(1));
      console.log('m2:', m2 && m2.slice(1));
      console.log('m3:', m3 && m3.slice(1));
      break;
    }
  }
  console.log('Summary:', parsed.summary.slice(0,200));
  console.log('Days parsed:', parsed.days.length);
  for (let i=0;i<Math.min(3, parsed.days.length); i++) {
    const d = parsed.days[i];
    console.log(`Day ${d.day} title: ${d.title}`);
    console.log(`Detail (len ${d.detail.length}):`, d.detail.slice(0,200));
  }
}
