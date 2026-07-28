/**
 * IndexNow Submission Script — 10 Legendary Voice AI Blogs (July 28, 2026)
 * Submits directly to api.indexnow.org (Bing, Yandex, Seznam, Naver).
 *
 * Run with: node scripts/submit-legendary-blogs-indexnow.mjs
 */

const SITE_URL = 'https://toughtongueai.com'
const LEGACY_SITE_URL = 'https://www.autointerviewai.com'
const INDEXNOW_API_KEY = 'bfb19e6f5a5e3515e0c255f4d3e05d77'

const LEGENDARY_BLOG_SLUGS = [
  'add-phone-number-ai-voice-agent-60-seconds-guide-2026',
  'build-voice-ai-agent-no-code-minutes-guide-2026',
  'voice-ai-agent-observability-debug-every-call-2026',
  'deploy-scale-voice-ai-agents-cloud-production-2026',
  'unified-model-interface-voice-ai-inference-2026',
  'healthcare-ai-voice-agents-patient-communication-case-study-2026',
  'ai-avatars-voice-agents-next-frontier-2026',
  'solving-end-of-turn-detection-voice-ai-agent-2026',
  'voice-ai-pricing-future-aligned-per-minute-2026',
  'tough-tongue-ai-all-in-one-voice-ai-platform-journey-2026',
]

const PRIMARY_URLS = LEGENDARY_BLOG_SLUGS.map((slug) => `${SITE_URL}/blog/${slug}`)
const LEGACY_URLS = LEGENDARY_BLOG_SLUGS.map((slug) => `${LEGACY_SITE_URL}/blog/${slug}`)

function log(emoji, msg) {
  console.log(`${emoji}  ${msg}`)
}

function logDivider() {
  console.log('─'.repeat(65))
}

async function submitToIndexNow(urls, domain) {
  log('📡', `Submitting ${urls.length} URLs for ${domain} to IndexNow...`)

  const payload = {
    host: new URL(domain).hostname,
    key: INDEXNOW_API_KEY,
    keyLocation: `${domain}/${INDEXNOW_API_KEY}.txt`,
    urlList: urls,
  }

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload),
    })

    if (response.ok || response.status === 202) {
      log('✅', `IndexNow accepted for ${domain}! Status: ${response.status}`)
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

async function pingGoogleSitemap(domain) {
  log('🔍', `Pinging Google sitemap endpoint for ${domain}...`)
  const sitemapUrl = `${domain}/sitemap.xml`
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`

  try {
    const response = await fetch(pingUrl)
    if (response.ok) {
      log('✅', `Google sitemap ping accepted (${response.status})`)
      return true
    } else {
      log('⚠️', `Google ping returned ${response.status}`)
      return false
    }
  } catch (err) {
    log('⚠️', `Google ping error: ${err.message}`)
    return false
  }
}

async function main() {
  console.log('\n')
  logDivider()
  log('🚀', 'TOUGH TONGUE AI — IndexNow & Search Engine Submission')
  log('📅', `Timestamp: ${new Date().toISOString()}`)
  logDivider()

  console.log('\n📝 Submitting 10 Primary Blog URLs:\n')
  PRIMARY_URLS.forEach((url, i) => {
    console.log(`   ${i + 1}. ${url}`)
  })
  console.log('\n')

  const [primaryRes, legacyRes, googlePrimary, googleLegacy] = await Promise.all([
    submitToIndexNow(PRIMARY_URLS, SITE_URL),
    submitToIndexNow(LEGACY_URLS, LEGACY_SITE_URL),
    pingGoogleSitemap(SITE_URL),
    pingGoogleSitemap(LEGACY_SITE_URL),
  ])

  logDivider()
  console.log('\n📊 SUBMISSION SUMMARY:\n')
  console.log(`   IndexNow (toughtongueai.com):     ${primaryRes ? '✅ SUCCESS (200/202)' : '❌ FAILED'}`)
  console.log(`   IndexNow (autointerviewai.com):   ${legacyRes ? '✅ SUCCESS (200/202)' : '❌ FAILED'}`)
  console.log(`   Google Sitemap (Primary):         ${googlePrimary ? '✅ PINGED' : '⚠️  PING SKIPPED'}`)
  console.log(`   Google Sitemap (Legacy):          ${googleLegacy ? '✅ PINGED' : '⚠️  PING SKIPPED'}`)
  logDivider()
  console.log('\n')
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
