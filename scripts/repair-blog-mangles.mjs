import fs from 'fs';
import path from 'path';

const blogDir = 'data/blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'));

let totalFixedFiles = 0;
let totalChanges = 0;

for (const file of files) {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const original = content;

  // 1. Fix KaTeX math blocks first ($...$ and $$...$$)
  content = content.replace(/(\$\$[\s\S]*?\$\$|\$[^\$\n]+\$)/g, (math) => {
    let m = math;
    m = m.replace(/\\r\\r\\rightarrow/g, '\\rightarrow');
    m = m.replace(/\\r\\rightarrow/g, '\\rightarrow');
    m = m.replace(/\\r\\r/g, '');
    m = m.replace(/\\a\\approx/g, '\\approx');
    m = m.replace(/([^\w\\])a\\approx/g, '$1\\approx');
    m = m.replace(/^a\\approx/g, '\\approx');
    m = m.replace(/([^\w\\])a\\alpha/g, '$1\\alpha');
    m = m.replace(/^a\\alpha/g, '\\alpha');
    m = m.replace(/a\\argmax/g, '\\argmax');
    m = m.replace(/&lt;/g, '<');
    m = m.replace(/&gt;/g, '>');
    m = m.replace(/&amp;/g, '&');
    // Replace unicode dashes inside math
    m = m.replace(/[–—]/g, '-');
    return m;
  });

  // 2. Specific mangled words in prose (outside code blocks)
  // Fix restaurant / restaurants
  content = content.replace(/res\\taurant/g, 'restaurant');
  content = content.replace(/Res\\taurant/g, 'Restaurant');
  content = content.replace(/res\\taurants/g, 'restaurants');
  content = content.replace(/Res\\taurants/g, 'Restaurants');
  content = content.replace(/s\\taurant/g, 'staurant');
  content = content.replace(/s\\taurants/g, 'staurants');

  // Fix Figma
  content = content.replace(/F\\sigma/g, 'Figma');

  // Fix Alphabet / alphanumeric
  content = content.replace(/A\\alphabet/g, 'Alphabet');
  content = content.replace(/a\\alphabets/g, 'alphabets');
  content = content.replace(/A\\alphabets/g, 'Alphabets');
  content = content.replace(/a\\alphanumeric/g, 'alphanumeric');
  content = content.replace(/a\\alphanumerics/g, 'alphanumerics');

  // Fix Approximately / approximate
  content = content.replace(/A\\approximately/g, 'Approximately');
  content = content.replace(/a\\approximately/g, 'approximately');
  content = content.replace(/A\\approximate/g, 'Approximate');
  content = content.replace(/a\\approximate/g, 'approximate');
  content = content.replace(/a\\approximations/g, 'approximations');
  content = content.replace(/A\\approx\./g, 'Approx.');
  content = content.replace(/a\\approx\./g, 'approx.');

  // Fix contraction you'\ll, they'\ll, we'\ll, I'\ll
  content = content.replace(/'\\ll/g, "'ll");

  // Fix Self-taught
  content = content.replace(/Self-\\taught/g, 'Self-taught');
  content = content.replace(/self-\\taught/g, 'self-taught');

  // Fix check-in
  content = content.replace(/check-\\in/g, 'check-in');

  // Fix ai-tools-for-pm
  content = content.replace(/ai-tools-for-\\pm/g, 'ai-tools-for-pm');

  // Fix State bar
  content = content.replace(/State \\bar/g, 'State bar');

  // Fix "20 \times" or similar count expressions in prose
  content = content.replace(/(\d+)\s*\\times/g, '$1 times');
  content = content.replace(/\\times\s*(\d+)/g, 'times $1');

  // Fix Six Sigma
  content = content.replace(/Six S\\sigma/g, 'Six Sigma');
  content = content.replace(/six s\\sigma/g, 'six sigma');
  content = content.replace(/S\\sigma/g, 'Sigma');

  // Fix buy-in, barge-in, lock-in, opt-in, check-in, walk-in
  content = content.replace(/-(\\in)\b/g, '-in');
  content = content.replace(/\\in_/g, 'in_');

  // Fix \s\sigma in math -> \sigma
  content = content.replace(/\\s\\sigma/g, '\\sigma');

  // Fix \pi_    \t in math -> \pi_\theta
  content = content.replace(/\\pi_\s*\\t/g, '\\pi_\\theta');

  // Fix AWS Lambda
  content = content.replace(/L\\lambda function/g, 'Lambda function');
  content = content.replace(/AWS L\\lambda/g, 'AWS Lambda');

  // Fix Indian .in domain names
  content = content.replace(/\.\\in\b/g, '.in');

  // Fix backticked log_
  content = content.replace(/`\\log_/g, '`log_');

  // Fix Stigma
  content = content.replace(/St\\sigma/g, 'Stigma');
  content = content.replace(/st\\sigma/g, 'stigma');

  // Fix taught
  content = content.replace(/\\taught/g, 'taught');

  // Fix curly apostrophe + \\ll
  content = content.replace(/[’']\\ll/g, "'ll");

  // Fix reddit URLs or text with \\in_
  content = content.replace(/\\in_/g, 'in_');

  // Fix links with \\pm
  content = content.replace(/\\pm/g, 'pm');

  // Split by code blocks and math blocks to safely replace in pure markdown prose
  const parts = content.split(/(```[\s\S]*?```|\$\$[\s\S]*?\$\$|\$[^\$\n]+\$)/g);
  for (let i = 0; i < parts.length; i += 2) {
    let p = parts[i];
    // In pure prose:
    p = p.replace(/\\times\b/g, 'times');
    p = p.replace(/\\log\b/g, 'log');
    p = p.replace(/\\partial\b/g, 'partial');
    p = p.replace(/\\sum\b/g, 'sum');
    p = p.replace(/\\to\b/g, 'to');
    p = p.replace(/\\bar\b/g, 'bar');
    p = p.replace(/\\delta\b/g, 'delta');
    p = p.replace(/\\Delta\b/g, 'Delta');
    p = p.replace(/\\beta\b/g, 'beta');
    p = p.replace(/\\right\b/g, 'right');
    p = p.replace(/\\left\b/g, 'left');
    p = p.replace(/\\r\b/g, '');
    parts[i] = p;
  }
  content = parts.join('');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    totalFixedFiles++;
    totalChanges++;
  }
}

console.log(`Successfully fixed ${totalFixedFiles} files across data/blog!`);
