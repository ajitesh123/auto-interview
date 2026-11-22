// Lists blog lines that pair our product (Tough Tongue AI) with a performance number or a
// superiority claim. Those claims were never measured and are paused (see the Brain's
// NON-NEGOTIABLES). Run: node scripts/audit/ttai-claims.mjs [--top 30]
// Output: one row per post, most flagged lines first, so weekly sweeps can work down the list.
import fs from 'node:fs'
import path from 'node:path'

const DIR = 'data/blog'
const top = Number(process.argv[process.argv.indexOf('--top') + 1]) || 40
const PRODUCT = /tough tongue|\bTTGE\b|\bTTAI\b/i
const CLAIM =
  /\b\d+(\.\d+)?\s?ms\b|\b\d+(\.\d+)?%|human[- ]parity|\b#1\b|fastest|leads the market|dominates|sub-\d+/i
const PAUSED = /99\.8%|50,000\+|348\s?ms|42\.8%|sub-350|sub-40\s?ms|TTGE/i

const rows = []
for (const f of fs.readdirSync(DIR)) {
  if (!f.endsWith('.mdx')) continue
  const lines = fs.readFileSync(path.join(DIR, f), 'utf8').split('\n')
  let hits = 0
  let paused = 0
  lines.forEach((l) => {
    if (PRODUCT.test(l) && CLAIM.test(l)) hits++
    if (PAUSED.test(l) && PRODUCT.test(l)) paused++
  })
  if (hits) rows.push({ f, hits, paused })
}
rows.sort((a, b) => b.paused - a.paused || b.hits - a.hits)
console.log(`${rows.length} posts pair Tough Tongue AI with a number or superlative`)
for (const r of rows.slice(0, top)) console.log(`${r.hits}\t${r.paused}\t${r.f}`)
