# Cover letter templates (Word)

Builds `public/downloads/cover-letter-templates/<slug>-cover-letter-template.docx` from the first
sample in `data/roleCoverLetters/<slug>.ts` (the same letter shown on `/<slug>/cover-letter`).
Plain one-column letter, A4, one page, with each paragraph's job in a [bracket] label.

```bash
npx tsx --tsconfig tsconfig.json scripts/cover-letter-templates/dump.ts /tmp/cl.json
node scripts/cover-letter-templates/build.js /tmp/cl.json public/downloads/cover-letter-templates
```

Then convert to PDF with LibreOffice and check it is one page.
