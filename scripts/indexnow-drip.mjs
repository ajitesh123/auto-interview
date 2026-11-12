// IndexNow submitter: sends pages that changed since they were last sent, all in one request
// (up to 10,000 URLs per POST, the protocol maximum), after checking each page is live.
// Run hourly by .github/workflows/indexnow-drip.yml. A small state file (kept in the Actions
// cache) remembers what was sent, so a page goes once per change (the IndexNow FAQ says not
// to resend unchanged URLs) and anything not live yet is retried next hour.
//
// usage: node scripts/indexnow-drip.mjs [--since "7 days ago"] [--max 10000] [--gap 20000]
//                                       [--state .indexnow-state.json] [--dry]
import fs from 'fs'
import { execSync } from 'child_process'

const KEY = 'bfb19e6f5a5e3515e0c255f4d3e05d77' // file lives at public/<KEY>.txt
const HOST = 'www.autointerviewai.com'
const ORIGIN = `https://${HOST}`
const ENDPOINT = 'https://api.indexnow.org/indexnow'

const arg = (name, fallback) => {
  const i = process.argv.indexOf(name)
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : fallback
}
const SINCE = arg('--since', '7 days ago')
const MAX = Number(arg('--max', '10000'))
const GAP_MS = Number(arg('--gap', '20000'))
const STATE = arg('--state', '')
const DRY = process.argv.includes('--dry')
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// file -> time of its latest commit in the window (newest first in git log)
function changedFiles() {
  const out = execSync(`git log --since="${SINCE}" --name-only --format=@@%cI`, {
    encoding: 'utf8',
  })
  const latest = new Map()
  let when = ''
  for (const raw of out.split('\n')) {
    const l = raw.trim()
    if (!l) continue
    if (l.startsWith('@@')) when = l.slice(2)
    else if (!latest.has(l)) latest.set(l, when)
  }
  return latest
}

function isDraft(file) {
  try {
    return /^draft:\s*true/m.test(fs.readFileSync(file, 'utf8').slice(0, 4000))
  } catch {
    return true // deleted or unreadable: never submit
  }
}

// Map changed source files to the public URLs they affect. Order = priority.
// Returns Map url -> latest change time.
function toUrls(files) {
  const urls = new Map()
  const add = (u, t) => {
    if (!urls.has(u) || urls.get(u) < t) urls.set(u, t)
  }
  const each = (re, fn) => {
    for (const [f, t] of files) {
      const m = f.match(re)
      if (m && fs.existsSync(f)) fn(m, t, f)
    }
  }
  // Role hubs: data/roleHubs/<slug>.ts -> /<slug>
  each(/^data\/roleHubs\/([a-z0-9-]+)\.ts$/, (m, t) => {
    if (!['index', 'types'].includes(m[1])) add(`${ORIGIN}/${m[1]}`, t)
  })
  // Role kits: data/roleKits/<slug>.ts -> /<slug>/resume and /<slug>/letter-of-recommendation
  each(/^data\/roleKits\/([a-z0-9-]+)\.ts$/, (m, t) => {
    if (['index', 'types'].includes(m[1])) return
    add(`${ORIGIN}/${m[1]}/resume`, t)
    add(`${ORIGIN}/${m[1]}/letter-of-recommendation`, t)
  })
  // Concepts pages: data/roleConcepts/<slug>.ts -> /<slug>/concepts
  each(/^data\/roleConcepts\/([a-z0-9-]+)\.ts$/, (m, t) => {
    if (!['index', 'types'].includes(m[1])) add(`${ORIGIN}/${m[1]}/concepts`, t)
  })
  // Cover letter kits: data/roleCoverLetters/<slug>.ts -> /<slug>/cover-letter
  each(/^data\/roleCoverLetters\/([a-z0-9-]+)\.ts$/, (m, t) => {
    if (!['index', 'types'].includes(m[1])) add(`${ORIGIN}/${m[1]}/cover-letter`, t)
  })
  // Learn AI lessons: data/learnAi/lessons/<slug>.ts -> /learn-ai/<slug>, plus the hub
  each(/^data\/learnAi\/lessons\/([a-z0-9-]+)\.ts$/, (m, t) => {
    add(`${ORIGIN}/learn-ai/${m[1]}`, t)
    add(`${ORIGIN}/learn-ai`, t)
  })
  // Paul Graham course: data/pgCourse/lessons/<slug>.ts -> /paul-graham/<slug>, plus the hub;
  // the 6-month plan lives on the hub
  each(/^data\/pgCourse\/lessons\/([a-z0-9-]+)\.ts$/, (m, t) => {
    add(`${ORIGIN}/paul-graham/${m[1]}`, t)
    add(`${ORIGIN}/paul-graham`, t)
  })
  each(/^data\/pgCourse\/plan\.ts$/, (m, t) => add(`${ORIGIN}/paul-graham`, t))
  // The YC batch program: data/pgCourse/batch/weeks/week-<n>.ts -> /paul-graham/yc-batch/week-<n>
  each(/^data\/pgCourse\/batch\/weeks\/(week-\d+)\.ts$/, (m, t) => {
    add(`${ORIGIN}/paul-graham/yc-batch/${m[1]}`, t)
    add(`${ORIGIN}/paul-graham/yc-batch`, t)
  })
  // Static app routes: app/<route>/page.tsx (skip dynamic [param] routes)
  each(/^app\/([a-z0-9/-]+)\/page\.tsx$/, (m, t) => {
    if (!m[1].includes('[')) add(`${ORIGIN}/${m[1]}`, t)
  })
  // Blog posts: data/blog/<slug>.mdx -> /blog/<slug>, never drafts
  each(/^data\/blog\/([^/]+)\.mdx?$/, (m, t, f) => {
    if (!isDraft(f)) add(`${ORIGIN}/blog/${m[1]}`, t)
  })
  for (const home of ['components/domain/DomainHomePage.tsx', 'app/page.tsx']) {
    if (files.has(home)) add(`${ORIGIN}/`, files.get(home))
  }
  return urls
}

// Is the page live? Never tell search engines about a URL that 404s (e.g. deploy not done).
// Only a 404/410 counts as not live: a network error or firewall answer (403/429) should not
// stop submissions.
async function isLive(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' })
    if (res.status === 404 || res.status === 410) return false
    if (res.status !== 200) console.log(`  note: ${res.status} on ${url}, sending anyway`)
    return true
  } catch {
    return true
  }
}

// One POST with many URLs (the protocol allows up to 10,000 per request).
async function submitBatch(urlList) {
  const body = { host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  return { status: res.status, retryAfter: res.headers.get('retry-after') }
}

let state = {}
if (STATE && fs.existsSync(STATE)) {
  try {
    state = JSON.parse(fs.readFileSync(STATE, 'utf8'))
  } catch {
    state = {}
  }
}

const all = toUrls(changedFiles())
// Only pages changed since we last sent them (never resend an unchanged page).
const pending = [...all].filter(([u, t]) => !state[u] || state[u] < t).map(([u]) => u)
console.log(
  `IndexNow: ${all.size} changed URL(s) since "${SINCE}", ${pending.length} not yet sent${DRY ? ' [dry run]' : ''}`
)

// Check each is live (a few at a time), then send the live ones in one request.
const live = []
const notLive = []
for (let i = 0; i < pending.length; i += 8) {
  const chunk = pending.slice(i, i + 8)
  const ok = await Promise.all(chunk.map(isLive))
  chunk.forEach((u, j) => (ok[j] ? live : notLive).push(u))
}
if (notLive.length) console.log(`Not live yet, will retry next run:\n  ${notLive.join('\n  ')}`)
const batch = live.slice(0, MAX)
if (live.length > MAX)
  console.log(`Over this run's cap (${MAX}); ${live.length - MAX} wait for the next run`)

if (!batch.length) {
  console.log('Nothing to send.')
} else if (DRY) {
  batch.forEach((u) => console.log(`  would submit ${u}`))
} else {
  // Chunks of 10,000 (protocol maximum), a short pause between chunks.
  for (let i = 0; i < batch.length; i += 10000) {
    const part = batch.slice(i, i + 10000)
    const { status, retryAfter } = await submitBatch(part).catch(() => ({ status: 0 }))
    const ok = status === 200 || status === 202
    console.log(`${ok ? 'OK ' : 'ERR'} ${status} sent ${part.length} URL(s)`)
    part.forEach((u) => console.log(`  ${u}`))
    if (ok) {
      const now = new Date().toISOString()
      part.forEach((u) => (state[u] = now))
    } else {
      if (status === 429)
        console.log(
          `Rate limited (429). Retry-After: ${retryAfter || 'not given'}. Stopping; next run retries.`
        )
      process.exitCode = 1
      break
    }
    if (i + 10000 < batch.length) await sleep(GAP_MS)
  }
}
if (STATE && !DRY) fs.writeFileSync(STATE, JSON.stringify(state, null, 1))
