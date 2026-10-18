import fs from 'fs'
import path from 'path'

const pages = JSON.parse(fs.readFileSync('scratch/gsc_pages.json', 'utf8'))
const gscMap = new Map()
pages.forEach((p) => gscMap.set(p.url, p))

// Protected slugs
const PROTECTED_SLUGS = new Set([
  'gpt-live-1-1-vs-gemini-3-8-live-2026',
  'openai-gpt-live-1-1-architecture-safety-2026',
  'gpt-live-1-1-vs-gemini-pricing-roi-2026',
  'why-do-sales-reps-hate-roleplaying-2026',
  'why-chatgpt-fails-sales-roleplay-2026',
  'voice-latency-ai-sales-roleplay-2026',
  'sales-roleplay-scoring-rubric-2026',
  'how-to-gate-live-outbound-dials-2026',
  'stop-sales-reps-sounding-scripted-2026',
  'gong-vs-ai-sales-roleplay-2026',
  'turn-lost-calls-into-roleplay-scenarios-2026',
  'roleplay-we-already-use-a-competitor-2026',
  'ai-sales-roleplay-vs-sales-trainer-roi-2026',
  'top-5-ai-tools-real-time-objection-handling-2026',
  'sip-trunk-provider-india-voice-ai-calling-2026',
  'plivo-vs-vobiz-sip-provider-india-ai-calling-2026',
  'exotel-vs-vobiz-sip-trunk-india-voice-ai-2026',
  'top-sip-trunk-providers-india-voice-ai-2026',
  'gemini-3-5-transcribe-vs-deepgram-nova-3-2026',
  'gemini-3-5-transcribe-vs-openai-whisper-2026',
  'cascade-vs-voice-to-voice-ai-agents-architecture-2026',
  'sarvam-ai-bulbul-saaras-indic-voice-models-review-2026',
  'sales-training-crisis-billions-wasted',
  'best-mock-interview-platforms',
  'best-sales-training-companies-world',
  'top-5-sales-training-companies-usa-2026',
  'top-5-sales-training-companies-dubai-2026',
  'top-corporate-sales-training-programs-india-2026',
  'corporate-sales-training-companies-mumbai-2026',
  'b2b-sales-training-programs-delhi-ncr-2026',
  'sales-leadership-training-bangalore-2026',
  'employee-training-companies-usa',
])

const files = fs.readdirSync('data/blog').filter((f) => f.endsWith('.mdx'))
const pruned = []

files.forEach((f) => {
  const slug = f.replace(/\.mdx$/, '')
  if (PROTECTED_SLUGS.has(slug)) return

  const filePath = `data/blog/${f}`
  const content = fs.readFileSync(filePath, 'utf8')
  const draftMatch = content.match(/draft:\s*(true|false)/)
  const isDraft = draftMatch ? draftMatch[1] === 'true' : false
  if (isDraft) return

  const url = `https://www.autointerviewai.com/blog/${slug}`
  const gsc = gscMap.get(url)

  if (!gsc || gsc.impressions === 0) {
    let dest = '/blog/best-mock-interview-platforms'
    const lower = slug.toLowerCase()

    if (
      lower.includes('sales') ||
      lower.includes('selling') ||
      lower.includes('sdr') ||
      lower.includes('closer') ||
      lower.includes('cold-call') ||
      lower.includes('objection')
    ) {
      dest = '/cold-call-practice'
    } else if (
      lower.includes('training') ||
      lower.includes('corporate') ||
      lower.includes('leadership') ||
      lower.includes('workshop')
    ) {
      dest = '/blog/best-sales-training-companies-world'
    } else if (
      lower.includes('voice') ||
      lower.includes('phone') ||
      lower.includes('sip') ||
      lower.includes('calling') ||
      lower.includes('telecom') ||
      lower.includes('deepgram') ||
      lower.includes('whisper') ||
      lower.includes('call')
    ) {
      dest = '/ai-calling-roi-calculator'
    } else if (
      lower.includes('resume') ||
      lower.includes('cv') ||
      lower.includes('ats') ||
      lower.includes('cover')
    ) {
      dest = '/cv-templates'
    } else if (
      lower.includes('interview') ||
      lower.includes('mock') ||
      lower.includes('question') ||
      lower.includes('behavioral') ||
      lower.includes('coding')
    ) {
      dest = '/free-mock-interview'
    }

    // Update file frontmatter to draft: true
    let updatedContent
    if (draftMatch) {
      updatedContent = content.replace(/draft:\s*false/, 'draft: true')
    } else {
      updatedContent = content.replace(/^---/, '---\ndraft: true')
    }
    fs.writeFileSync(filePath, updatedContent, 'utf8')

    pruned.push({ slug, dest })
  }
})

console.log(`Successfully set draft: true on ${pruned.length} zero-impression posts.`)

// Now update next.config.js with permanent redirects
let nextConfig = fs.readFileSync('next.config.js', 'utf8')

const existingRedirectsMatch = nextConfig.match(/source:\s*['"]([^'"]+)['"]/g) || []
const existingSources = new Set(
  existingRedirectsMatch.map((s) => s.replace(/source:\s*['"]/, '').replace(/['"]$/, ''))
)

const newRedirects = []
pruned.forEach((p) => {
  const source = `/blog/${p.slug}`
  if (!existingSources.has(source)) {
    newRedirects.push(`        {
          source: '${source}',
          destination: '${p.dest}',
          permanent: true,
        },`)
    existingSources.add(source)
  }
})

if (newRedirects.length > 0) {
  const insertIndex = nextConfig.lastIndexOf('      ]')
  if (insertIndex !== -1) {
    const updatedConfig =
      nextConfig.slice(0, insertIndex) +
      newRedirects.join('\n') +
      '\n' +
      nextConfig.slice(insertIndex)
    fs.writeFileSync('next.config.js', updatedConfig, 'utf8')
    console.log(`Appended ${newRedirects.length} new 301 redirects to next.config.js.`)
  } else {
    console.error('Could not find redirect array closing bracket in next.config.js')
  }
} else {
  console.log('No new redirects needed; all sources already present.')
}
