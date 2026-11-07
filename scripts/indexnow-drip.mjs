// IndexNow "drip" submitter: sends only pages that changed recently, one URL at a time,
// with a pause between each and a cap per run. Run by .github/workflows/indexnow-drip.yml
// several times a day. A small state file (kept in the Actions cache) remembers what was
// already sent, so a page is submitted once per change and anything over the cap waits
// for the next run instead of being dropped.
//
// usage: node scripts/indexnow-drip.mjs [--since "7 days ago"] [--max 25] [--gap 20000]
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
const MAX = Number(arg('--max', '25'))
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
  // Learn AI lessons: data/learnAi/lessons/<slug>.ts -> /learn-ai/<slug>, plus the hub
  each(/^data\/learnAi\/lessons\/([a-z0-9-]+)\.ts$/, (m, t) => {
    add(`${ORIGIN}/learn-ai/${m[1]}`, t)
    add(`${ORIGIN}/learn-ai`, t)
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

async function submit(url) {
  const body = { host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList: [url] }
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })
  return res.status
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
// Only pages changed since we last sent them.
const pending = [...all].filter(([u, t]) => !state[u] || state[u] < t).map(([u]) => u)
const batch = pending.slice(0, MAX)
console.log(
  `IndexNow drip: ${all.size} changed URL(s) since "${SINCE}", ${pending.length} not yet sent, submitting ${batch.length} (cap ${MAX}, ${GAP_MS / 1000}s apart)${DRY ? ' [dry run]' : ''}`
)
if (pending.length > MAX) {
  console.log(`Waiting for the next run (over cap):\n  ${pending.slice(MAX).join('\n  ')}`)
}

let failures = 0
for (const [i, url] of batch.entries()) {
  if (DRY) {
    console.log(`  would submit ${url}`)
    continue
  }
  const status = await submit(url).catch(() => 0)
  const ok = status === 200 || status === 202
  if (ok) state[url] = new Date().toISOString()
  else failures++
  console.log(`  ${ok ? 'OK ' : 'ERR'} ${status} ${url}`)
  if (i < batch.length - 1) await sleep(GAP_MS)
}
if (STATE && !DRY) fs.writeFileSync(STATE, JSON.stringify(state, null, 1))
if (failures) process.exitCode = 1
