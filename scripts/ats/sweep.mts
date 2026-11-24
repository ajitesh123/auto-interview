// tsx scripts/ats/sweep.mts [files...] — run the extractor + checks on files and print everything
import { readFileSync } from 'node:fs'
import { basename } from 'node:path'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'
import JSZip from 'jszip'
import { extractPdf, extractDocx, kindOf, blank } from '../../data/atsFileCheck/extract'
import { runChecks, summary, columnJumps } from '../../data/atsFileCheck/checks'

const files = process.argv.slice(2)
for (const f of files) {
  const data = new Uint8Array(readFileSync(f))
  const name = basename(f)
  const kind = kindOf(name, data)
  const ex =
    kind === 'pdf'
      ? await extractPdf(data, name, pdfjs as never)
      : kind === 'docx'
        ? await extractDocx(data, name, JSZip as never)
        : blank(kind, name, data.byteLength)
  const checks = runChecks(ex)
  console.log(
    '\n=====',
    name,
    kind,
    summary(checks),
    'mixed',
    columnJumps(ex),
    'cols',
    ex.columnPages
  )
  for (const c of checks) console.log(`  [${c.status}] ${c.label}: ${c.detail}`)
  if (process.env.TEXT) {
    console.log('--- stream ---\n' + ex.streamText.slice(0, 1200))
    console.log('--- rows ---\n' + ex.rowText.slice(0, 1200))
  }
}
