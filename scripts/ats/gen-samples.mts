// tsx scripts/ats/gen-samples.mts — run the real checker on the 3 sample files and save the results
// the page prints (so the worked example is computed, never typed). Re-run after changing checks.
import { readFileSync, writeFileSync } from 'node:fs'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'
import JSZip from 'jszip'
import { extractPdf, extractDocx } from '../../data/atsFileCheck/extract'
import { runChecks, summary, columnJumps } from '../../data/atsFileCheck/checks'

const dir = 'public/samples/ats-check/'
const SAMPLES = [
  { id: 'single-column', file: 'single-column.pdf', name: 'One column, PDF' },
  { id: 'two-column', file: 'two-column.pdf', name: 'Two columns with a sidebar, PDF' },
  {
    id: 'table-and-header',
    file: 'table-and-header.docx',
    name: 'Table layout, contact in the header, Word',
  },
]
const out = []
for (const s of SAMPLES) {
  const data = new Uint8Array(readFileSync(dir + s.file))
  const ex = s.file.endsWith('.pdf')
    ? await extractPdf(data, s.file, pdfjs as never)
    : await extractDocx(data, s.file, JSZip as never)
  const checks = runChecks(ex)
  out.push({
    ...s,
    summary: summary(checks),
    jumps: columnJumps(ex),
    checks: checks.map(({ id, label, status }) => ({ id, label, status })),
    // first 14 lines as a parser reading across the page sees them (docx: body order)
    preview: (ex.rowText || ex.streamText).split('\n').slice(0, 14),
    sides: ex.lines.slice(0, 14).map((l) => l.side ?? null),
    headerFooter: ex.headerFooter.text,
  })
}
writeFileSync('data/atsFileCheck/sampleResults.json', JSON.stringify(out, null, 2) + '\n')
console.log(
  out
    .map((o) => `${o.id}: ${JSON.stringify(o.summary)} jumps=${JSON.stringify(o.jumps)}`)
    .join('\n')
)
