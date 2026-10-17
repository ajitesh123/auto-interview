import fs from 'fs';

const files = [
  'data/blog/gpt-live-1-1-vs-gemini-3-8-live-technical-business-comparison-2026.mdx',
  'data/blog/openai-gpt-live-1-1-system-card-two-model-architecture-safety-analysis-2026.mdx',
  'data/blog/gpt-live-1-1-vs-gemini-3-8-live-pricing-cost-latency-roi-breakdown-2026.mdx'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  // Match $ followed by a digit or period that isn't preceded by \
  const updated = content.replace(/(?<!\\)\$([0-9\.\,]+)/g, '\\$$$1');
  if (updated !== content) {
    fs.writeFileSync(f, updated, 'utf8');
    console.log('Escaped dollars in:', f);
  } else {
    console.log('No changes needed in:', f);
  }
}
