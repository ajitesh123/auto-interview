/**
 * IndexNow API Integration for Instant Bing Indexing
 * 
 * IndexNow is Microsoft's instant indexing protocol that notifies Bing
 * immediately when content is added or updated (minutes vs days/weeks).
 * 
 * @see https://www.indexnow.org/
 */

const INDEXNOW_API_KEY = 'a8f3e9b2c7d4f1a6e5b8c3d2f9a1e4b7'
const SITE_HOST = 'www.autointerviewai.com'

export interface IndexNowOptions {
    url?: string | string[]
    urlList?: string[]
}

/**
 * Submit URLs to IndexNow for instant Bing indexing
 * @param urls Single URL string or array of URLs
 * @returns Promise<boolean> - true if successful
 */
export async function submitToIndexNow(urls: string | string[]): Promise<boolean> {
    const urlList = Array.isArray(urls) ? urls : [urls]

    // Ensure all URLs are absolute
    const absoluteUrls = urlList.map((url) => {
        if (url.startsWith('http')) return url
        return `https://${SITE_HOST}${url.startsWith('/') ? url : `/${url}`}`
    })

    try {
        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                host: SITE_HOST,
                key: INDEXNOW_API_KEY,
                keyLocation: `https://${SITE_HOST}/${INDEXNOW_API_KEY}.txt`,
                urlList: absoluteUrls,
            }),
        })

        if (response.status === 200) {
            console.log(`✅ IndexNow: Successfully submitted ${absoluteUrls.length} URLs to Bing`)
            return true
        } else if (response.status === 202) {
            console.log(`✅ IndexNow: ${absoluteUrls.length} URLs accepted for processing`)
            return true
        } else {
            console.error(`❌ IndexNow error: ${response.status} - ${response.statusText}`)
            return false
        }
    } catch (error) {
        console.error('❌ IndexNow submission error:', error)
        return false
    }
}

/**
 * Submit all important site pages to IndexNow
 * Call this after deploying new content or major updates
 */
export async function submitAllPages(): Promise<boolean> {
    const importantPages = [
        // Homepage
        'https://www.autointerviewai.com/',

        // Core features
        'https://www.autointerviewai.com/build-resume',
        'https://www.autointerviewai.com/ats-score',
        'https://www.autointerviewai.com/find-jobs',
        'https://www.autointerviewai.com/cover-letter',
        'https://www.autointerviewai.com/resume-job-matcher',

        // Important pages
        'https://www.autointerviewai.com/blog',
        'https://www.autointerviewai.com/free-resources',
        'https://www.autointerviewai.com/about',

        // Latest blog posts (add new ones here)
        'https://www.autointerviewai.com/blog/best-mock-interview-platforms-2026',
        'https://www.autointerviewai.com/blog/best-ats-resume-checker-2025',
        'https://www.autointerviewai.com/blog/how-to-find-jobs-complete-guide',
    ]

    return await submitToIndexNow(importantPages)
}

/**
 * Submit a single blog post to IndexNow
 * Use this when publishing new blog content
 */
export async function submitBlogPost(slug: string): Promise<boolean> {
    const url = `https://www.autointerviewai.com/blog/${slug}`
    return await submitToIndexNow(url)
}
