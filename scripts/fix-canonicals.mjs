import fs from 'fs';

const files = [
  'data/blog/ai-avatars-voice-agents-next-frontier-2026.mdx',
  'data/blog/healthcare-ai-voice-agents-patient-communication-case-study-2026.mdx',
  'data/blog/solving-end-of-turn-detection-voice-ai-agent-2026.mdx',
  'data/blog/tough-tongue-ai-all-in-one-voice-ai-platform-journey-2026.mdx',
  'data/blog/voice-ai-pricing-future-aligned-per-minute-2026.mdx'
];

for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/https:\/\/toughtongueai\.com/g, 'https://www.autointerviewai.com');
  fs.writeFileSync(f, content, 'utf8');
  console.log('Fixed canonical & URLs in:', f);
}
