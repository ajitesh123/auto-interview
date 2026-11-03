// IndexNow "drip" submitter: sends only pages that changed recently, one URL at a time,
// with a pause between each and a daily cap. Run by .github/workflows/indexnow-drip.yml.
//
// usage: node scripts/indexnow-drip.mjs [--since "26 hours ago"] [--max 10] [--gap 20000] [--dry]
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

const KEY = 'bfb19e6f5a5e3515e0c255f4d3e05d77' // file lives at public/<KEY>.txt
const HOST = 'www.autointerviewai.com'
const ORIGIN = `https://${HOST}`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const arg = (name, fallback) => {
  const i = process.argv.indexOf(name)
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}
const SINCE = arg('--since', '26 hours ago')
const MAX = Number(arg('--max', '10'))
const GAP_MS = Number(arg('--gap', '20000'))
const DRY = process.argv.includes('--dry')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

function changedFiles() {
  const out = execSync(`git log --since="${SINCE}" --name-only --format=`, { encoding: 'utf8' })
  return [...new Set(out.split('\n').map((l) => l.trim()).filter(Boolean))]
}

function isDraft(file) {
  try {
    return /^draft:\s*true/m.test(fs.readFileSync(file, 'utf8').slice(0, 4000))
  } catch {
    return true // deleted or unreadable: never submit
  }
}

// Map a changed source file to the public URL it affects. Order = priority.
function toUrls(files) {
  const urls = []
  const add = (u) => !urls.includes(u) && urls.push(u)
  for (const f of files) {
    // Role hubs: data/roleHubs/<slug>.ts -> /<slug>
    let m = f.match(/^data\/roleHubs\/([a-z0-9-]+)\.ts$/)
    if (m && !['index', 'types'].includes(m[1]) && fs.existsSync(f)) add(`${ORIGIN}/${m[1]}`)
  }
  for (const f of files) {
    // Static app routes: app/<route>/page.tsx (skip dynamic [param] routes)
    const m = f.match(/^app\/([a-z0-9/-]+)\/page\.tsx$/)
    if (m && !m[1].includes('[') && fs.existsSync(f)) add(`${ORIGIN}/${m[1]}`)
  }
  for (const f of files) {
    // Blog posts: data/blog/<slug>.mdx -> /blog/<slug>, never drafts
    const m = f.match(/^data\/blog\/([^/]+)\.mdx?$/)
    if (m && !isDraft(f)) add(`${ORIGIN}/blog/${m[1]}`)
  }
  if (files.includes('components/domain/DomainHomePage.tsx') || files.includes('app/page.tsx')) {
    add(`${ORIGIN}/`)
  }
  return urls
}

async function submit(url) {
  const body = { host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList: [url] }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  return res.status
}

const files = changedFiles()
const all = toUrls(files)
const batch = all.slice(0, MAX)
console.log(`IndexNow drip: ${all.length} changed URL(s) since "${SINCE}", submitting ${batch.length} (cap ${MAX}, ${GAP_MS / 1000}s apart)${DRY ? ' [dry run]' : ''}`)
if (all.length > MAX) console.log(`Not submitted today (over cap):\n  ${all.slice(MAX).join('\n  ')}`)

let failures = 0
for (const [i, url] of batch.entries()) {
  if (DRY) {
    console.log(`  would submit ${url}`)
    continue
  }
  const status = await submit(url).catch(() => 0)
  const ok = status === 200 || status === 202
  if (!ok) failures++
  console.log(`  ${ok ? 'OK ' : 'ERR'} ${status} ${url}`)
  if (i < batch.length - 1) await sleep(GAP_MS)
}
if (failures) process.exitCode = 1
