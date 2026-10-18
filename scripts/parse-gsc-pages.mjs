import fs from 'fs';
import path from 'path';

// Parse sharedStrings.xml
const sstXml = fs.readFileSync('scratch/gsc_extracted/xl/sharedStrings.xml', 'utf8');
const strings = [];
const sstMatches = sstXml.match(/<t[^>]*>([\s\S]*?)<\/t>/g) || [];
// Note: openxml can have multiple <t> in <si>, but let's parse <si> blocks
const siMatches = sstXml.split('<si>');
siMatches.shift();
for (const si of siMatches) {
  const tMatches = si.match(/<t[^>]*>([\s\S]*?)<\/t>/g) || [];
  const text = tMatches.map(t => t.replace(/<[^>]+>/g, '')).join('');
  strings.push(text);
}

// Parse sheet3.xml (Pages)
const sheetXml = fs.readFileSync('scratch/gsc_extracted/xl/worksheets/sheet3.xml', 'utf8');
const rows = sheetXml.split('<row ');
rows.shift();

const pages = [];
for (const row of rows) {
  // Extract cells
  const cells = row.split('<c ');
  cells.shift();
  let rowData = {};
  for (const c of cells) {
    const colMatch = c.match(/r="([A-Z]+)\d+"/);
    if (!colMatch) continue;
    const col = colMatch[1];
    const isString = c.includes('t="s"');
    const valMatch = c.match(/<v>([^<]+)<\/v>/);
    if (!valMatch) continue;
    const val = valMatch[1];
    if (isString) {
      rowData[col] = strings[parseInt(val, 10)];
    } else {
      rowData[col] = parseFloat(val);
    }
  }
  // Col A: Top pages, Col B: Clicks, Col C: Impressions, Col D: CTR, Col E: Position
  if (rowData['A'] && rowData['A'] !== 'Top pages') {
    pages.push({
      url: rowData['A'],
      clicks: rowData['B'] || 0,
      impressions: rowData['C'] || 0,
      ctr: rowData['D'] || 0,
      position: rowData['E'] || 0,
    });
  }
}

// Sort by impressions descending
pages.sort((a,b) => b.impressions - a.impressions);

console.log(`Parsed ${pages.length} pages with impressions from GSC!`);
console.log('Top 20 Pages:');
for (const p of pages.slice(0, 20)) {
  console.log(`${p.impressions.toLocaleString()} imp | ${p.clicks} clicks | ${(p.ctr*100).toFixed(2)}% CTR | Pos ${p.position.toFixed(1)} | ${p.url}`);
}

// Save parsed JSON
fs.writeFileSync('scratch/gsc_pages.json', JSON.stringify(pages, null, 2));
