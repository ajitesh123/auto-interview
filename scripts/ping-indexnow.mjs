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

    // Add homepage and core pages
    urls.push(`https://${host}/`)
    urls.push(`https://${host}/blog`)

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
