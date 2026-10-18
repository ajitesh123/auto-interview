import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const key = 'bfb19e6f5a5e3515e0c255f4d3e05d77' // Key from INDEXNOW_GUIDE.md
const host = 'www.autointerviewai.com'
const keyLocation = `https://${host}/${key}.txt`

async function run() {
  try {
    const dataPath = path.join(__dirname, '../.contentlayer/generated/Blog/_index.json')
    if (!fs.existsSync(dataPath)) {
      console.log('No contentlayer data found. Skipping IndexNow ping.')
      return
    }
    
    const blogs = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
    const urls = blogs
      .filter(b => !b.draft)
      .map(b => `https://${host}/${b.path}`)

    // Add homepage, core hubs, and high-converting tool pages
    urls.push(`https://${host}/`)
    urls.push(`https://${host}/blog`)
    urls.push(`https://${host}/free-mock-interview`)
    urls.push(`https://${host}/ats-score`)
    urls.push(`https://${host}/cv-templates`)
    urls.push(`https://${host}/interview-questions`)
    urls.push(`https://${host}/ai-calling-roi-calculator`)
    urls.push(`https://${host}/cold-call-practice`)
    urls.push(`https://${host}/build-resume`)
    urls.push(`https://${host}/resume-job-matcher`)

    // Programmatic CV Role Templates (20 roles)
    const cvRoles = [
      'software-engineer', 'product-manager', 'sales-sdr', 'data-analyst', 'fresher',
      'devops-engineer', 'frontend-developer', 'full-stack-developer', 'data-scientist',
      'machine-learning-engineer', 'cybersecurity-analyst', 'ui-ux-designer',
      'account-executive', 'customer-success-manager', 'financial-analyst',
      'business-analyst', 'scrum-master', 'marketing-manager', 'human-resources-specialist', 'internship'
    ]
    cvRoles.forEach(r => urls.push(`https://${host}/cv-templates/${r}`))

    // Programmatic Behavioral Interview Questions (Big 10)
    const behavioralQuestions = [
      'tell-me-about-yourself', 'what-is-your-greatest-weakness', 'why-should-we-hire-you',
      'why-do-you-want-to-work-here', 'where-do-you-see-yourself-in-5-years',
      'describe-a-conflict-with-coworker', 'tell-me-about-a-time-you-failed',
      'what-is-your-greatest-strength', 'why-are-you-leaving-your-current-job',
      'how-do-you-handle-stress-pressure'
    ]
    behavioralQuestions.forEach(q => urls.push(`https://${host}/interview-questions/behavioral/${q}`))

    // Programmatic Role Interview Questions Playbooks (10 roles)
    const roleQuestions = [
      'software-engineer', 'product-manager', 'sales-sdr', 'data-analyst', 'fresher',
      'devops-engineer', 'full-stack-developer', 'data-scientist', 'account-executive',
      'customer-success-manager'
    ]
    roleQuestions.forEach(r => urls.push(`https://${host}/interview-questions/${r}`))

    const payload = {
      host: host,
      key: key,
      keyLocation: keyLocation,
      urlList: urls
    }

    console.log(`Pinging IndexNow with ${urls.length} URLs...`)
    
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (res.ok) {
      console.log('✅ IndexNow ping successful! Search engines notified.')
    } else {
      console.error('❌ IndexNow ping failed:', res.status, await res.text())
    }
  } catch (error) {
    console.error('Error pinging IndexNow:', error)
  }
}

run()
