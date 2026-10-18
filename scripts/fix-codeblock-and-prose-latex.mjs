import fs from 'fs';
import path from 'path';

const blogDir = 'data/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));

let totalFixed = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // Split by code blocks
  const parts = content.split(/(```[\s\S]*?```)/g);
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 1) {
      // Inside code block: clean all stray backslashes on keywords/variables/comments
      let cb = parts[i];
      cb = cb.replace(/\b\\in\b/g, 'in');
      cb = cb.replace(/\b\\to\b/g, 'to');
      cb = cb.replace(/\\partial_/g, 'partial_');
      cb = cb.replace(/\\partial\b/g, 'partial');
      cb = cb.replace(/\\log_/g, 'log_');
      cb = cb.replace(/\\log\(/g, 'log(');
      cb = cb.replace(/\\sigma\b/g, 'sigma');
      cb = cb.replace(/\\alpha\b/g, 'alpha');
      cb = cb.replace(/\\beta\b/g, 'beta');
      cb = cb.replace(/\\mu\b/g, 'mu');
      cb = cb.replace(/\\theta\b/g, 'theta');
      cb = cb.replace(/\\tau\b/g, 'tau');
      cb = cb.replace(/\\lambda\b/g, 'lambda');
      cb = cb.replace(/\\delta\b/g, 'delta');
      cb = cb.replace(/\\Delta\b/g, 'Delta');
      cb = cb.replace(/\\sum\b/g, 'sum');
      cb = cb.replace(/\\times\b/g, 'x');
      cb = cb.replace(/\\approx\b/g, '~=');
      cb = cb.replace(/\\pm\b/g, '+/-');
      parts[i] = cb;
    } else {
      // Outside code block: split by math blocks to avoid touching $ math $
      const subparts = parts[i].split(/(\$\$[\s\S]*?\$\$|\$[^\$\n]+\$)/g);
      for (let j = 0; j < subparts.length; j += 2) {
        let p = subparts[j];
        p = p.replace(/\s\\in\s/g, ' in ');
        p = p.replace(/\s\\to\s/g, ' to ');
        p = p.replace(/\b\\in\s/g, 'in ');
        p = p.replace(/\\partial_/g, 'partial_');
        p = p.replace(/\\log_/g, 'log_');
        subparts[j] = p;
      }
      parts[i] = subparts.join('');
    }
  }

  content = parts.join('');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFixed++;
  }
}

console.log(`Cleaned code blocks and prose in ${totalFixed} files!`);
