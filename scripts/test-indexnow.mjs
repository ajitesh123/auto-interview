/**
 * Test script for IndexNow API
 * 
 * Run this to test IndexNow submission:
 * node scripts/test-indexnow.mjs
 */

import { submitToIndexNow, submitBatchToIndexNow } from '../lib/indexnow.js'

async function testIndexNow() {
    console.log('🧪 Testing IndexNow API...\n')

    // Test 1: Submit homepage
    console.log('Test 1: Submitting homepage...')
    const result1 = await submitToIndexNow('https://auto-interview.ai/')
    console.log(`Result: ${result1 ? '✅ Success' : '❌ Failed'}\n`)

    // Test 2: Submit blog page
    console.log('Test 2: Submitting blog page...')
    const result2 = await submitToIndexNow('https://auto-interview.ai/blog')
    console.log(`Result: ${result2 ? '✅ Success' : '❌ Failed'}\n`)

    // Test 3: Submit new visa interview blog post
    console.log('Test 3: Submitting new visa interview blog post...')
    const result3 = await submitToIndexNow(
        'https://auto-interview.ai/blog/top-5-visa-interview-platforms-ai-preparation'
    )
    console.log(`Result: ${result3 ? '✅ Success' : '❌ Failed'}\n`)

    // Test 4: Batch submission
    console.log('Test 4: Batch submitting multiple URLs...')
    const urls = [
        'https://auto-interview.ai/build-resume',
        'https://auto-interview.ai/ats-score',
        'https://auto-interview.ai/find-jobs',
    ]
    const result4 = await submitBatchToIndexNow(urls)
    console.log(`Result: ${result4 ? '✅ Success' : '❌ Failed'}\n`)

    console.log('🎉 IndexNow testing complete!')
    console.log('\n📝 Note: Check Bing Webmaster Tools in 24-48 hours to verify indexing.')
}

testIndexNow()
