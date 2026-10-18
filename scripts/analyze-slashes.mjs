import fs from 'fs';
import path from 'path';

const blogDir = 'data/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));

const nonMathSlashes = new Map();
const examples = new Map();

for (const file of files) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  // strip code blocks
  const noCode = content.replace(/```[\s\S]*?```/g, '');
  // strip math blocks
  const noMath = noCode.replace(/\$\$[\s\S]*?\$\$/g, '').replace(/\$[^$\n]+\$/g, '');
  
  const matches = noMath.match(/\\[a-zA-Z]+/g);
  if (matches) {
    for (const m of matches) {
      nonMathSlashes.set(m, (nonMathSlashes.get(m) || 0) + 1);
      if (!examples.has(m)) {
        const idx = noMath.indexOf(m);
        const snippet = noMath.substring(Math.max(0, idx - 20), Math.min(noMath.length, idx + m.length + 20)).replace(/\n/g, ' ');
        examples.set(m, { file, snippet });
      }
    }
  }
}

const sorted = Array.from(nonMathSlashes.entries()).sort((a,b) => b[1] - a[1]);
console.log('Top 50 non-math slash patterns:');
for (const [pattern, count] of sorted.slice(0, 50)) {
  const ex = examples.get(pattern);
  console.log(`${pattern} (${count}): in ${ex.file} -> "${ex.snippet}"`);
}
