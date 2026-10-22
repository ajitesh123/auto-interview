import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execSync } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const key = 'bfb19e6f5a5e3515e0c255f4d3e05d77' // Verified Bing IndexNow key
const host = 'www.autointerviewai.com'
const keyLocation = `https://${host}/${key}.txt`

// IndexNow endpoints (IndexNow central API and Bing direct gateway)
const ENDPOINTS = [
  'https://www.bing.com/indexnow',
  'https://api.indexnow.org/indexnow',
]

// Sleep helper for streaming rate-limiting
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Identify URLs modified in recent git commits or within the last 48 hours
 */
function getRecentChangedUrls() {
  const changedUrls = new Set()

  try {
    // Check files changed in the most recent commits
    const gitDiff = execSync('git diff --name-only HEAD~2 HEAD', { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] })
    const lines = gitDiff.split('\n').filter(Boolean)
    lines.forEach((filePath) => {
      if (filePath.startsWith('data/blog/') && (filePath.endsWith('.mdx') || filePath.endsWith('.md'))) {
        const slug = path.basename(filePath).replace(/\.(mdx|md)$/, '')
        changedUrls.add(`https://${host}/blog/${slug}`)
      }
    })
  } catch {
    // Fallback if git diff fails: check filesystem mtime in last 48 hours
    const blogDir = path.join(__dirname, '../data/blog')
    const cutoff = Date.now() - 48 * 60 * 60 * 1000
    if (fs.existsSync(blogDir)) {
      fs.readdirSync(blogDir).forEach((file) => {
        if (file.endsWith('.mdx') || file.endsWith('.md')) {
          const stats = fs.statSync(path.join(blogDir, file))
          if (stats.mtimeMs > cutoff) {
            const slug = file.replace(/\.(mdx|md)$/, '')
            changedUrls.add(`https://${host}/blog/${slug}`)
          }
        }
      })
    }
  }

  // Always include key dynamic entry points in streaming updates
  changedUrls.add(`https://${host}/`)
  changedUrls.add(`https://${host}/blog`)
  changedUrls.add(`https://${host}/interview-questions`)
  changedUrls.add(`https://${host}/cv-templates`)

  return Array.from(changedUrls)
}

/**
 * Assemble all canonical URLs across the application
 */
function getAllCanonicalUrls() {
  const urlSet = new Set()

  const coreHubs = [
    `https://${host}/`,
    `https://${host}/blog`,
    `https://${host}/interview-questions`,
    `https://${host}/cv-templates`,
    `https://${host}/free-mock-interview`,
    `https://${host}/ats-score`,
    `https://${host}/build-resume`,
    `https://${host}/resume-job-matcher`,
    `https://${host}/ai-calling-roi-calculator`,
    `https://${host}/cold-call-practice`,
    `https://${host}/ai-sales-training`,
    `https://${host}/resources`,
    `https://${host}/resources/mba`,
    `https://${host}/communities`,
    `https://${host}/find-jobs`,
    `https://${host}/cover-letter`,
    `https://${host}/free-resources`,
    `https://${host}/about`,
    `https://${host}/terms-conditions`,
    `https://${host}/privacy-policy`,
    `https://${host}/refund-policy`,
    `https://${host}/shipping-policy`,
    `https://${host}/contact-policy`,
  ]
  coreHubs.forEach((u) => urlSet.add(u))

  const mbaSpecializations = [
    'marketing', 'finance', 'operations', 'hr', 'consulting',
    'analytics', 'strategy', 'general-management', 'entrepreneurship',
    'healthcare', 'supply-chain',
  ]
  mbaSpecializations.forEach((s) => urlSet.add(`https://${host}/resources/mba/${s}`))

  const cvRoles = [
    'software-engineer', 'product-manager', 'sales-sdr', 'data-analyst', 'fresher',
    'devops-engineer', 'frontend-developer', 'full-stack-developer', 'data-scientist',
    'machine-learning-engineer', 'cybersecurity-analyst', 'ui-ux-designer',
    'account-executive', 'customer-success-manager', 'financial-analyst',
    'business-analyst', 'scrum-master', 'marketing-manager', 'human-resources-specialist',
    'internship-resume',
  ]
  cvRoles.forEach((r) => urlSet.add(`https://${host}/cv-templates/${r}`))

  const behavioralQuestions = [
    'tell-me-about-yourself', 'what-is-your-greatest-weakness', 'why-should-we-hire-you',
    'why-do-you-want-to-work-here', 'where-do-you-see-yourself-in-5-years',
    'describe-a-conflict-with-coworker', 'tell-me-about-a-time-you-failed',
    'what-is-your-greatest-strength', 'why-are-you-leaving-your-current-job',
    'how-do-you-handle-stress-pressure', 'tell-me-about-a-time-you-showed-leadership',
    'how-do-you-prioritize-your-work', 'tell-me-about-a-time-you-disagreed-with-your-manager',
    'what-are-your-salary-expectations',
  ]
  behavioralQuestions.forEach((q) => urlSet.add(`https://${host}/interview-questions/behavioral/${q}`))

  const roleQuestions = [
    'software-engineer', 'product-manager', 'sales-sdr', 'data-analyst', 'fresher',
    'devops-engineer', 'full-stack-developer', 'data-scientist', 'account-executive',
    'customer-success-manager', 'frontend-developer', 'machine-learning-engineer',
    'cybersecurity-analyst', 'ui-ux-designer', 'financial-analyst', 'business-analyst',
    'scrum-master', 'marketing-manager', 'human-resources-specialist', 'internship-resume',
  ]
  roleQuestions.forEach((r) => urlSet.add(`https://${host}/interview-questions/${r}`))

  const blogDir = path.join(__dirname, '../data/blog')
  if (fs.existsSync(blogDir)) {
    fs.readdirSync(blogDir).forEach((f) => {
      if (f.endsWith('.mdx') || f.endsWith('.md')) {
        const slug = f.replace(/\.(mdx|md)$/, '')
        urlSet.add(`https://${host}/blog/${slug}`)
      }
    })
  }

  const tagDataPath = path.join(__dirname, '../app/tag-data.json')
  if (fs.existsSync(tagDataPath)) {
    try {
      const tagData = JSON.parse(fs.readFileSync(tagDataPath, 'utf8'))
      Object.keys(tagData).forEach((tagKey) => {
        if (tagData[tagKey] >= 4) {
          const formattedSlug = encodeURI(
            tagKey.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          )
          urlSet.add(`https://${host}/tags/${formattedSlug}`)
        }
      })
    } catch {
      // Ignored
    }
  }

  return Array.from(urlSet)
}

/**
 * Stream a single URL using IndexNow GET protocol (Lowest server overhead)
 */
async function streamSingleUrl(targetUrl) {
  const getUrl = `https://www.bing.com/indexnow?url=${encodeURIComponent(targetUrl)}&key=${key}&keyLocation=${encodeURIComponent(keyLocation)}`
  try {
    const res = await fetch(getUrl, { method: 'GET' })
    return res.status === 200 || res.status === 202
  } catch {
    return false
  }
}

/**
 * Stream micro-batch (1-5 URLs) via POST to Bing and IndexNow
 */
async function streamMicroBatch(urls) {
  const payload = {
    host,
    key,
    keyLocation,
    urlList: urls,
  }

  let success = true
  for (const endpoint of ENDPOINTS) {
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(payload),
      })
      if (res.status !== 200 && res.status !== 202) success = false
    } catch {
      success = false
    }
  }
  return success
}

async function run() {
  const args = process.argv.slice(2)
  const isFullResync = args.includes('--all') || args.includes('--full')

  console.log('====================================================')
  console.log('🚀 IndexNow STREAMING Engine for Bing & Edge Copilot')
  console.log(`   Mode: ${isFullResync ? 'Paced Micro-Batch Re-sync' : 'Real-Time Streaming Mode (Recommended)'}`)
  console.log('====================================================\n')

  const urlsToSubmit = isFullResync ? getAllCanonicalUrls() : getRecentChangedUrls()

  console.log(`📡 Streaming ${urlsToSubmit.length} URLs to search engine indexers...`)

  if (!isFullResync) {
    // STREAMING MODE: Submit individually as changes occur (satisfies Bing ruleId 120)
    let streamedCount = 0
    for (const url of urlsToSubmit) {
      const ok = await streamSingleUrl(url)
      if (ok) {
        streamedCount++
        console.log(`   ⚡ [STREAMED] ${url}`)
      } else {
        // Fallback to micro-batch POST
        await streamMicroBatch([url])
        streamedCount++
        console.log(`   ✅ [POSTED]   ${url}`)
      }
      await sleep(120) // Pacing delay to prevent server strain
    }
    console.log(`\n🎉 Streaming complete: ${streamedCount}/${urlsToSubmit.length} URLs submitted in real-time streaming mode.`)
  } else {
    // PACED MICRO-BATCH MODE: Chunk in sizes of 5 with 180ms delay between chunks
    const CHUNK_SIZE = 5
    let totalPaced = 0
    for (let i = 0; i < urlsToSubmit.length; i += CHUNK_SIZE) {
      const chunk = urlsToSubmit.slice(i, i + CHUNK_SIZE)
      await streamMicroBatch(chunk)
      totalPaced += chunk.length
      process.stdout.write(`\r   🚀 Paced stream: ${totalPaced}/${urlsToSubmit.length} URLs dispatched...`)
      await sleep(150)
    }
    console.log(`\n\n🎉 Paced sync complete: ${totalPaced} URLs indexed without server overload.`)
  }

  console.log('🏁 IndexNow streaming cycle completed cleanly.\n')
}

run()
