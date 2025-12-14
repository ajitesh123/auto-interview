import rss from './rss.mjs'
import { submitAllSiteUrls } from '../lib/indexnow.js'

async function postbuild() {
  await rss()

  // Submit all URLs to IndexNow for instant indexing on Bing
  console.log('📤 Submitting URLs to IndexNow...')
  try {
    await submitAllSiteUrls()
    console.log('✅ IndexNow submission complete')
  } catch (error) {
    console.warn('⚠️ IndexNow submission failed (non-critical):', error.message)
  }
}

postbuild()
