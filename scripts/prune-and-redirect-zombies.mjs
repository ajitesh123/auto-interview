import fs from 'fs'
import path from 'path'

// Map of cannibalizing/dead zero-impression posts to their canonical target
const REDIRECT_MAP = {
  'mba-in-india-guide': '/resources/mba',
  'job-search-guide-2025': '/find-jobs',
  'ai-calling-roi-calculator-sales-pipeline-2026': '/ai-calling-roi-calculator',
  'ai-calling-roi-cold-dial-to-closed-deal-funnel-2026': '/ai-calling-roi-calculator',
  'ai-calling-roi-executive-business-case-board-approval-2026': '/ai-calling-roi-calculator',
  'ai-calling-roi-break-even-analysis-calculator-2026': '/ai-calling-roi-calculator',
  'real-cost-ai-voice-agents-pricing-breakdown-2026': '/ai-calling-roi-calculator',
  '3-biggest-outbound-sales-challenges-ai-calling-solutions-2026': '/blog/top-5-ai-tools-real-time-objection-handling-2026',
  'ai-calling-saas-b2b-outbound-sales-playbook-2026': '/blog/top-5-ai-tools-real-time-objection-handling-2026',
  'ultimate-guide-to-objection-handling-scripts-tactics-2026': '/blog/top-5-ai-tools-real-time-objection-handling-2026',
  'sales-roleplay-scenarios-exercises-sharpen-team-2026': '/blog/12-realistic-sales-role-play-scenarios-sdr-mastery-2026',
  'sales-roleplay-scenarios-objection-handling-b2b-scripts-2026': '/blog/roleplay-we-already-use-a-competitor-2026',
  'how-to-handle-sales-objections-scripts-ai-practice-2026': '/blog/roleplay-we-already-use-a-competitor-2026',
  'ai-calling-lead-qualification-scripts-workflows-results-2026': '/blog/roleplay-we-already-use-a-competitor-2026',
  'why-sales-reps-hate-training-best-teams-do-it-anyway-2026': '/blog/why-do-sales-reps-hate-roleplaying-2026',
  'why-sales-team-thinks-training-waste-of-time-wrong-2026': '/blog/why-do-sales-reps-hate-roleplaying-2026',
  'mastering-difficult-conversations-roleplay-frameworks-managers-2026': '/blog/why-do-sales-reps-hate-roleplaying-2026',
  'sales-training-plan-new-hires-30-60-90-day-2026': '/blog/how-to-gate-live-outbound-dials-2026',
  'essential-ai-calling-tools-for-sales-success-2026': '/blog/sip-providers-for-ai-calling-complete-guide-2026',
  'top-10-ai-calling-softwares-for-businesses-2026': '/blog/best-bland-ai-alternatives-outbound-sales-2026',
  'why-ai-cold-calling-software-sounds-robotic-engineering-fix-2026': '/blog/voice-latency-ai-sales-roleplay-2026',
  'the-state-of-ai-calling-competitors-2026-latency-pricing-report': '/blog/voice-latency-ai-sales-roleplay-2026',
  'how-to-automate-appointment-setting-ai-voice-agents-2026': '/blog/how-to-build-ai-cold-calling-agent-retell-vapi-bland-2026',
  'ai-cold-call-training-voice-ai-transforming-sales-onboarding-2026': '/blog/why-do-sales-reps-hate-roleplaying-2026',
  'how-to-measure-sales-training-roi-metrics-vp-sales-2026': '/blog/ai-sales-roleplay-vs-sales-trainer-roi-2026'
}

console.log(`Setting draft: true on ${Object.keys(REDIRECT_MAP).length} cannibalizing/zero-impression files...`)

let draftedCount = 0
for (const [slug, target] of Object.entries(REDIRECT_MAP)) {
  const filePath = path.join('data', 'blog', `${slug}.mdx`)
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8')
    if (content.includes('draft: false')) {
      content = content.replace('draft: false', 'draft: true')
      fs.writeFileSync(filePath, content, 'utf8')
      draftedCount++
    }
  } else {
    console.warn(`File not found: ${filePath}`)
  }
}

console.log(`Successfully set draft: true on ${draftedCount} files.`)

// Now update next.config.js redirects
const nextConfigPath = 'next.config.js'
let configContent = fs.readFileSync(nextConfigPath, 'utf8')

const redirectEntries = Object.entries(REDIRECT_MAP).map(([slug, target]) => {
  return `        {
          source: '/blog/${slug}',
          destination: '${target}',
          permanent: true,
        },`
}).join('\n')

const marker = '// Content Pruning & De-cannibalization Redirects (SEO Engine 2026)'
if (configContent.includes(marker)) {
  // Check if we need to insert them
  const firstEntry = Object.keys(REDIRECT_MAP)[0]
  if (!configContent.includes(`'/blog/${firstEntry}'`)) {
    configContent = configContent.replace(
      marker,
      `${marker}\n${redirectEntries}`
    )
    fs.writeFileSync(nextConfigPath, configContent, 'utf8')
    console.log(`Appended ${Object.keys(REDIRECT_MAP).length} 301 redirects into next.config.js`)
  } else {
    console.log('Redirects already present in next.config.js')
  }
} else {
  console.error('Could not find marker in next.config.js')
}
