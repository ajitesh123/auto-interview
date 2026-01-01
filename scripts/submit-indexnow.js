/**
 * IndexNow Submission Script
 * 
 * Run this script to submit all important pages to IndexNow for instant Bing indexing.
 * 
 * Usage:
 *   node scripts/submit-indexnow.js
 */

async function submitToIndexNow() {
    const INDEXNOW_API_KEY = 'a8f3e9b2c7d4f1a6e5b8c3d2f9a1e4b7'
    const SITE_HOST = 'www.autointerviewai.com'

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

        // Latest blog posts
        'https://www.autointerviewai.com/blog/best-mock-interview-platforms-2026',
        'https://www.autointerviewai.com/blog/best-ats-resume-checker-2025',
        'https://www.autointerviewai.com/blog/how-to-find-jobs-complete-guide',
        'https://www.autointerviewai.com/blog/job-search-guide-2025',
        'https://www.autointerviewai.com/blog/product-manager-interview-guide-2025',
    ]

    console.log(`📤 Submitting ${importantPages.length} URLs to IndexNow...`)

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
                urlList: importantPages,
            }),
        })

        if (response.status === 200) {
            console.log(`✅ SUCCESS: ${importantPages.length} URLs submitted to Bing for indexing!`)
            console.log('📊 Expect pages to appear in Bing within 24-48 hours')
            return true
        } else if (response.status === 202) {
            console.log(`✅ ACCEPTED: ${importantPages.length} URLs queued for processing`)
            return true
        } else {
            console.error(`❌ ERROR: ${response.status} - ${response.statusText}`)
            const text = await response.text()
            console.error('Response:', text)
            return false
        }
    } catch (error) {
        console.error('❌ Submission failed:', error.message)
        return false
    }
}

// Run the submission
submitToIndexNow()
    .then((success) => {
        if (success) {
            console.log('\n🎉 IndexNow submission complete!')
            console.log('Next steps:')
            console.log('1. Verify key file is accessible: https://www.autointerviewai.com/a8f3e9b2c7d4f1a6e5b8c3d2f9a1e4b7.txt')
            console.log('2. Monitor Bing Webmaster Tools for indexing status')
            console.log('3. Check impressions in 1-2 weeks')
        }
        process.exit(success ? 0 : 1)
    })
    .catch((error) => {
        console.error('Fatal error:', error)
        process.exit(1)
    })
