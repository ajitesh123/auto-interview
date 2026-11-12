// Builds one Word cover letter template per kit: public/downloads/cover-letter-templates/<slug>-cover-letter-template.docx
// Plain one-column letter (no tables, no graphics) so it pastes cleanly into any portal.
// Usage: node build.js <kits.json> <outDir>
const fs = require('fs')
const path = require('path')
const { Document, Packer, Paragraph, TextRun, BorderStyle } = require('docx')

const [, , kitsPath, outDir] = process.argv
const KITS = JSON.parse(fs.readFileSync(kitsPath, 'utf8'))
fs.mkdirSync(outDir, { recursive: true })

const F = 'Calibri'
const run = (text, o = {}) =>
  new TextRun({
    text,
    font: F,
    size: o.size ?? 22,
    bold: o.bold,
    italics: o.italics,
    color: o.color,
  })
const para = (children, o = {}) =>
  new Paragraph({
    children: Array.isArray(children) ? children : [children],
    spacing: { before: o.before ?? 0, after: o.after ?? 120, line: o.line ?? 264 },
    border: o.rule
      ? { bottom: { style: BorderStyle.SINGLE, size: 6, color: '999999', space: 4 } }
      : undefined,
  })
const clean = (s) => s.replace(/\s*\((sample|fictional)\)/gi, '').trim()

for (const [slug, kit] of Object.entries(KITS)) {
  const s = kit.samples[0]
  const name = clean(s.who)
  const role = kit.h1.split(' cover letter')[0].replace(/\b\w/g, (c) => c.toUpperCase())
  const kids = [
    para(
      run(
        'SAMPLE: every name, company and number is made up. Keep the structure, replace each line with your own facts, then delete this note and the [bracket] labels.',
        { size: 18, italics: true, color: '666666' }
      ),
      { after: 200 }
    ),
    para(run(name, { size: 32, bold: true }), { after: 40 }),
    para(
      run('[City] · [email] · [phone] · [portfolio or GitHub link]', { size: 20, color: '444444' }),
      {
        rule: true,
        after: 240,
      }
    ),
    para(run('[Date]')),
    para(run('[Hiring manager name]'), { after: 0 }),
    para(run('[Team], [Company]'), { after: 200 }),
    para(run(`Re: ${role} role, [team] (job ID [ID])`, { bold: true }), { after: 200 }),
    para(run(s.greeting.replace(/^Dear .*,$/, 'Dear [Hiring manager name],'))),
  ]
  s.paragraphs.forEach((p, i) => {
    kids.push(
      para(run(`[${i + 1}. ${p.role}]`, { size: 18, italics: true, color: '3B5BFF' }), {
        after: 20,
      })
    )
    kids.push(para(run(p.text), { after: 160 }))
  })
  s.signoff
    .split('\n')
    .forEach((line, i, a) => kids.push(para(run(line), { after: i === a.length - 1 ? 0 : 0 })))
  const doc = new Document({
    creator: 'autointerviewai.com',
    title: `${role} cover letter template`,
    styles: { default: { document: { run: { font: F, size: 22 } } } },
    sections: [
      {
        properties: {
          page: {
            size: { width: 11906, height: 16838 },
            margin: { top: 1000, bottom: 1000, left: 1134, right: 1134 },
          },
        },
        children: kids,
      },
    ],
  })
  Packer.toBuffer(doc).then((buf) => {
    const out = path.join(outDir, `${slug}-cover-letter-template.docx`)
    fs.writeFileSync(out, buf)
    console.log('wrote', out)
  })
}
