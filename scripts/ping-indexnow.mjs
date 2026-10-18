import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const key = 'bfb19e6f5a5e3515e0c255f4d3e05d77' // Verified Bing IndexNow key
const host = 'www.autointerviewai.com'
const keyLocation = `https://${host}/${key}.txt`

// IndexNow endpoints (IndexNow central API and Bing direct gateway)
const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
]

async function run() {
  console.log('====================================================')
  console.log('🚀 IndexNow Batch Dispatcher for Bing & Edge Copilot')
  console.log('====================================================\n')

  const urlSet = new Set()

  // 1. Core Hubs & Tool Pages
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

  // 2. MBA Specialization Hubs (11 specializations)
  const mbaSpecializations = [
    'marketing',
    'finance',
    'operations',
    'hr',
    'consulting',
    'analytics',
    'strategy',
    'general-management',
    'entrepreneurship',
    'healthcare',
    'supply-chain',
  ]
  mbaSpecializations.forEach((s) => urlSet.add(`https://${host}/resources/mba/${s}`))

  // 3. Programmatic CV Role Templates (20 roles)
  const cvRoles = [
    'software-engineer',
    'product-manager',
    'sales-sdr',
    'data-analyst',
    'fresher',
    'devops-engineer',
    'frontend-developer',
    'full-stack-developer',
    'data-scientist',
    'machine-learning-engineer',
    'cybersecurity-analyst',
    'ui-ux-designer',
    'account-executive',
    'customer-success-manager',
    'financial-analyst',
    'business-analyst',
    'scrum-master',
    'marketing-manager',
    'human-resources-specialist',
    'internship-resume',
  ]
  cvRoles.forEach((r) => urlSet.add(`https://${host}/cv-templates/${r}`))

  // 4. Programmatic Behavioral Interview Questions (14 guides)
  const behavioralQuestions = [
    'tell-me-about-yourself',
    'what-is-your-greatest-weakness',
    'why-should-we-hire-you',
    'why-do-you-want-to-work-here',
    'where-do-you-see-yourself-in-5-years',
    'describe-a-conflict-with-coworker',
    'tell-me-about-a-time-you-failed',
    'what-is-your-greatest-strength',
    'why-are-you-leaving-your-current-job',
    'how-do-you-handle-stress-pressure',
    'tell-me-about-a-time-you-showed-leadership',
    'how-do-you-prioritize-your-work',
    'tell-me-about-a-time-you-disagreed-with-your-manager',
    'what-are-your-salary-expectations',
  ]
  behavioralQuestions.forEach((q) =>
    urlSet.add(`https://${host}/interview-questions/behavioral/${q}`)
  )

  // 5. Programmatic Role Interview Questions Playbooks (19 role playbooks + internship)
  const roleQuestions = [
    'software-engineer',
    'product-manager',
    'sales-sdr',
    'data-analyst',
    'fresher',
    'devops-engineer',
    'full-stack-developer',
    'data-scientist',
    'account-executive',
    'customer-success-manager',
    'frontend-developer',
    'machine-learning-engineer',
    'cybersecurity-analyst',
    'ui-ux-designer',
    'financial-analyst',
    'business-analyst',
    'scrum-master',
    'marketing-manager',
    'human-resources-specialist',
    'internship-resume',
  ]
  roleQuestions.forEach((r) => urlSet.add(`https://${host}/interview-questions/${r}`))

  // 6. Complete Blog Post Corpus (506+ posts from Contentlayer and data/blog)
  let blogCount = 0
  const dataPath = path.join(__dirname, '../.contentlayer/generated/Blog/_index.json')
  if (fs.existsSync(dataPath)) {
    try {
      const blogs = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
      blogs.forEach((b) => {
        if (b.path) {
          urlSet.add(`https://${host}/${b.path}`)
          blogCount++
        }
      })
    } catch (e) {
      console.warn('⚠️ Warning parsing contentlayer blogs:', e.message)
    }
  }

  // Also scan data/blog directory to ensure 100% coverage of all markdown posts
  const blogDir = path.join(__dirname, '../data/blog')
  if (fs.existsSync(blogDir)) {
    try {
      const files = fs.readdirSync(blogDir)
      files.forEach((f) => {
        if (f.endsWith('.mdx') || f.endsWith('.md')) {
          const slug = f.replace(/\.(mdx|md)$/, '')
          const blogUrl = `https://${host}/blog/${slug}`
          if (!urlSet.has(blogUrl)) {
            urlSet.add(blogUrl)
            blogCount++
          }
        }
      })
    } catch (e) {
      console.warn('⚠️ Warning scanning data/blog directory:', e.message)
    }
  }

  // 7. Curated High-Authority Topic Hubs (>= 4 articles from tag-data.json)
  let tagCount = 0
  const tagDataPath = path.join(__dirname, '../app/tag-data.json')
  if (fs.existsSync(tagDataPath)) {
    try {
      const tagData = JSON.parse(fs.readFileSync(tagDataPath, 'utf8'))
      Object.keys(tagData).forEach((tagKey) => {
        if (tagData[tagKey] >= 4) {
          // Slug format matching GitHub-slugger
          const formattedSlug = encodeURI(
            tagKey
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)/g, '')
          )
          urlSet.add(`https://${host}/tags/${formattedSlug}`)
          tagCount++
        }
      })
    } catch (e) {
      console.warn('⚠️ Warning parsing tag-data.json:', e.message)
    }
  }

  const allUrls = Array.from(urlSet)

  console.log('📊 URL Inventory Breakdown:')
  console.log(`   - Core Hubs & Tool Pages:        ${coreHubs.length}`)
  console.log(`   - MBA Specialization Hubs:       ${mbaSpecializations.length}`)
  console.log(`   - Programmatic CV Templates:     ${cvRoles.length}`)
  console.log(`   - Behavioral Question Guides:    ${behavioralQuestions.length}`)
  console.log(`   - Role Interview Playbooks:      ${roleQuestions.length}`)
  console.log(`   - Complete Blog Articles:        ${blogCount}`)
  console.log(`   - Curated Authority Tag Hubs:    ${tagCount}`)
  console.log(`   -------------------------------------------------`)
  console.log(`   🔥 Total Unique URLs in Payload: ${allUrls.length}\n`)

  const payload = {
    host: host,
    key: key,
    keyLocation: keyLocation,
    urlList: allUrls,
  }

  // Dispatch batch to IndexNow endpoints
  for (const endpoint of ENDPOINTS) {
    try {
      console.log(`📡 Dispatching batch to ${endpoint}...`)
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(payload),
      })

      const status = res.status
      if (status === 200 || status === 202) {
        console.log(`   ✅ SUCCESS [HTTP ${status}] — ${allUrls.length} URLs accepted by ${new URL(endpoint).hostname}`)
      } else {
        const errorText = await res.text()
        console.error(`   ❌ FAILED [HTTP ${status}] from ${endpoint}:`, errorText)
      }
    } catch (err) {
      console.error(`   ❌ NETWORK ERROR pinging ${endpoint}:`, err.message)
    }
  }

  console.log('\n🏁 IndexNow notification cycle completed.')
}

run()
