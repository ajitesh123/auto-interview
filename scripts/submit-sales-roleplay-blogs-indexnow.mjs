import https from 'https'

const SITE_URL = 'https://www.autointerviewai.com'
const INDEXNOW_API_KEY = 'bfb19e6f5a5e3515e0c255f4d3e05d77'
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_API_KEY}.txt`

const NEW_BLOG_SLUGS = [
  'why-do-sales-reps-hate-roleplaying-and-how-to-fix-it-2026',
  'why-chatgpt-fails-at-sales-roleplay-too-agreeable-ai-problem-2026',
  'what-voice-latency-is-required-for-ai-sales-roleplay-2026',
  'how-to-build-sales-roleplay-scoring-rubric-template-2026',
  'how-to-gate-live-outbound-dials-ai-roleplay-certification-2026',
  'how-to-train-sales-reps-to-stop-sounding-scripted-cold-calls-2026',
  'we-already-have-gong-why-do-we-need-ai-sales-roleplay-platform-2026',
  'how-to-turn-lost-customer-calls-into-ai-sales-roleplay-scenarios-2026',
  'how-to-roleplay-we-already-use-a-competitor-objection-2026',
  'ai-sales-roleplay-vs-hiring-sales-trainer-cost-roi-breakdown-2026',
]

const NEW_BLOG_URLS = NEW_BLOG_SLUGS.map((slug) => `${SITE_URL}/blog/${slug}`)

async function submitToIndexNow() {
  const payload = JSON.stringify({
    host: 'www.autointerviewai.com',
    key: INDEXNOW_API_KEY,
    keyLocation: KEY_LOCATION,
    urlList: NEW_BLOG_URLS,
  })

  const endpoints = ['api.indexnow.org', 'www.bing.com']

  for (const endpoint of endpoints) {
    console.log(`Submitting 10 URLs to ${endpoint}...`)
    await new Promise((resolve) => {
      const req = https.request(
        {
          hostname: endpoint,
          path: '/indexnow',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(payload),
          },
        },
        (res) => {
          console.log(`  -> Response from ${endpoint}: Status ${res.statusCode}`)
          resolve()
        }
      )
      req.on('error', (err) => {
        console.error(`  -> Error submitting to ${endpoint}:`, err.message)
        resolve()
      })
      req.write(payload)
      req.end()
    })
  }
}

submitToIndexNow()
