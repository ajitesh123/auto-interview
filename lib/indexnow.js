/**
 * IndexNow API Integration
 * 
 * IndexNow is a free protocol that allows websites to instantly notify search engines
 * (Bing, Yandex, etc.) when content is created, updated, or deleted.
 * 
 * Documentation: https://www.indexnow.org/documentation
 */

const INDEXNOW_API_KEY = 'd66e3021-360f-4e36-b15b-47fd8210d8c1'
const SITE_HOST = 'auto-interview.ai'
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_API_KEY}.txt`

/**
 * Submit a single URL to IndexNow for instant indexing
 * @param {string} url - Full URL to submit (e.g., 'https://auto-interview.ai/blog/post-slug')
 * @returns {Promise<boolean>} - True if submission successful
 */
export async function submitToIndexNow(url) {
  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_API_KEY,
        keyLocation: KEY_LOCATION,
        urlList: [url],
      }),
    })

    if (response.ok || response.status === 202) {
      console.log(`✅ IndexNow: Successfully submitted ${url}`)
      return true
    } else {
      console.warn(`⚠️ IndexNow: Failed to submit ${url} - Status: ${response.status}`)
      return false
    }
  } catch (error) {
    console.error(`❌ IndexNow: Error submitting ${url}`, error)
    return false
  }
}

/**
 * Submit multiple URLs to IndexNow in a single request
 * @param {string[]} urls - Array of full URLs to submit
 * @returns {Promise<boolean>} - True if submission successful
 */
export async function submitBatchToIndexNow(urls) {
  if (!urls || urls.length === 0) {
    console.warn('⚠️ IndexNow: No URLs provided for batch submission')
    return false
  }

  // IndexNow supports up to 10,000 URLs per request, but we'll batch in chunks of 100
  const BATCH_SIZE = 100
  const batches = []
  
  for (let i = 0; i < urls.length; i += BATCH_SIZE) {
    batches.push(urls.slice(i, i + BATCH_SIZE))
  }

  console.log(`📤 IndexNow: Submitting ${urls.length} URLs in ${batches.length} batch(es)`)

  let successCount = 0
  for (const batch of batches) {
    try {
      const response = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          host: SITE_HOST,
          key: INDEXNOW_API_KEY,
          keyLocation: KEY_LOCATION,
          urlList: batch,
        }),
      })

      if (response.ok || response.status === 202) {
        successCount += batch.length
        console.log(`✅ IndexNow: Submitted batch of ${batch.length} URLs`)
      } else {
        console.warn(`⚠️ IndexNow: Failed batch submission - Status: ${response.status}`)
      }
    } catch (error) {
      console.error('❌ IndexNow: Batch submission error', error)
    }
  }

  console.log(`✅ IndexNow: Successfully submitted ${successCount}/${urls.length} URLs`)
  return successCount === urls.length
}

/**
 * Get all blog post URLs for submission
 * @returns {string[]} - Array of blog post URLs
 */
export function getAllBlogUrls() {
  // This will be populated during build time
  // For now, return empty array - will be integrated with contentlayer
  return []
}

/**
 * Submit all site URLs to IndexNow (use during initial setup or major updates)
 * @returns {Promise<boolean>}
 */
export async function submitAllSiteUrls() {
  const urls = [
    `https://${SITE_HOST}/`,
    `https://${SITE_HOST}/blog`,
    `https://${SITE_HOST}/build-resume`,
    `https://${SITE_HOST}/ats-score`,
    `https://${SITE_HOST}/find-jobs`,
    `https://${SITE_HOST}/cover-letter`,
    `https://${SITE_HOST}/free-resources`,
    // Blog posts will be added dynamically
    ...getAllBlogUrls(),
  ]

  return await submitBatchToIndexNow(urls)
}
