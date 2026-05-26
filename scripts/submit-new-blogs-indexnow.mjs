/**
 * IndexNow Submission Script — 5 New AI Calling Blogs (May 26, 2026)
 * Submits directly to api.indexnow.org which fans out to Bing, Yandex, and partners.
 * Also submits to Google Search Console ping endpoint separately.
 *
 * Run with: node scripts/submit-new-blogs-indexnow.mjs
 */

const SITE_URL = 'https://www.autointerviewai.com'
const INDEXNOW_API_KEY = 'bfb19e6f5a5e3515e0c255f4d3e05d77'
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_API_KEY}.txt`

// ── The 5 new blogs published today ─────────────────────────────────────────
const NEW_BLOG_SLUGS = [
  'ai-calling-statistics-benchmarks-data-2026',
  'ai-calling-buyers-guide-how-to-evaluate-choose-platform-2026',
  'how-ai-calling-works-technical-guide-2026',
  'ai-calling-conversion-rates-benchmarks-2026',
  'when-not-to-use-ai-calling-scenarios-2026',
]

const NEW_BLOG_URLS = NEW_BLOG_SLUGS.map((slug) => `${SITE_URL}/blog/${slug}`)

// ── Helpers ──────────────────────────────────────────────────────────────────

function log(emoji, msg) {
  console.log(`${emoji}  ${msg}`)
}

function logDivider() {
  console.log('─'.repeat(60))
}

// ── 1. Submit to IndexNow (api.indexnow.org → Bing, Yandex, etc.) ────────────

async function submitToIndexNow(urls) {
  log('📡', `Submitting ${urls.length} URLs to IndexNow...`)

  const payload = {
    host: new URL(SITE_URL).hostname,
    key: INDEXNOW_API_KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  }

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })

    if (response.ok || response.status === 202) {
      log('✅', `IndexNow accepted! Status: ${response.status}`)
      log('📋', `Submitted to Bing, Yandex & IndexNow partners simultaneously`)
      return true
    } else {
      const text = await response.text()
      log('❌', `IndexNow returned ${response.status}: ${text}`)
      return false
    }
  } catch (err) {
    log('❌', `IndexNow fetch error: ${err.message}`)
    return false
  }
}

// ── 2. Ping Google sitemap (indirect — Google ignores IndexNow protocol) ─────

async function pingGoogleSitemap() {
  log('🔍', 'Pinging Google sitemap endpoint...')
  const sitemapUrl = `${SITE_URL}/sitemap.xml`
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`

  try {
    const response = await fetch(pingUrl)
    if (response.ok) {
      log('✅', `Google sitemap ping accepted (${response.status})`)
      return true
    } else {
      log('⚠️', `Google ping returned ${response.status} — submit manually in Search Console`)
      return false
    }
  } catch (err) {
    log('⚠️', `Google ping error: ${err.message}`)
    return false
  }
}

// ── 3. Ping Bing sitemap endpoint directly as fallback ───────────────────────

async function pingBingSitemap() {
  log('🔍', 'Pinging Bing sitemap endpoint...')
  const sitemapUrl = `${SITE_URL}/sitemap.xml`
  const pingUrl = `https://www.bing.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`

  try {
    const response = await fetch(pingUrl)
    if (response.ok) {
      log('✅', `Bing sitemap ping accepted (${response.status})`)
      return true
    } else {
      log('⚠️', `Bing ping returned ${response.status}`)
      return false
    }
  } catch (err) {
    log('⚠️', `Bing ping error: ${err.message}`)
    return false
  }
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n')
  logDivider()
  log('🚀', 'AUTO INTERVIEW AI — IndexNow Submission')
  log('📅', `Date: ${new Date().toISOString()}`)
  logDivider()

  console.log('\n📝 Submitting the following URLs:\n')
  NEW_BLOG_URLS.forEach((url, i) => {
    console.log(`   ${i + 1}. ${url}`)
  })
  console.log('\n')

  // Run all submissions in parallel
  const [indexNowResult, googleResult, bingResult] = await Promise.all([
    submitToIndexNow(NEW_BLOG_URLS),
    pingGoogleSitemap(),
    pingBingSitemap(),
  ])

  logDivider()
  console.log('\n📊 SUBMISSION SUMMARY:\n')
  console.log(`   IndexNow (Bing/Yandex):  ${indexNowResult ? '✅ SUCCESS' : '❌ FAILED'}`)
  console.log(`   Google Sitemap Ping:      ${googleResult ? '✅ SUCCESS' : '⚠️  MANUAL ACTION NEEDED'}`)
  console.log(`   Bing Sitemap Ping:        ${bingResult ? '✅ SUCCESS' : '⚠️  SKIPPED'}`)
  console.log('\n')

  if (!googleResult) {
    logDivider()
    log('📌', 'MANUAL STEP FOR GOOGLE INDEXING:')
    console.log(`
   1. Open: https://search.google.com/search-console
   2. Click "URL Inspection" in left sidebar
   3. Submit each URL below individually and click "Request Indexing":
`)
    NEW_BLOG_URLS.forEach((url) => console.log(`      → ${url}`))
    console.log('')
  }

  logDivider()
  log('⏱️ ', 'Expected indexing timeline:')
  console.log(`
   Bing (via IndexNow):  Hours to 48hrs
   Yandex:               24-72 hrs
   Google:               3-14 days (use Search Console to speed up)
`)
  logDivider()
  console.log('\n')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
