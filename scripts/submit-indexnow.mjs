/**
 * IndexNow Submission Script
 * Submits all blog URLs to Bing & search engines for instant indexing.
 * Run: node scripts/submit-indexnow.mjs
 */

const SITE_URL = 'https://www.autointerviewai.com'
const INDEX_NOW_KEY = 'bd0daaceadb143a1abb33f26b8dd1ea7'
const INDEX_NOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

import { readFileSync, readdirSync } from 'fs'
import { join } from 'path'

function getAllBlogSlugs() {
    const blogDir = join(process.cwd(), 'data', 'blog')
    return readdirSync(blogDir)
        .filter((f) => f.endsWith('.mdx') || f.endsWith('.md'))
        .map((f) => f.replace(/\.(mdx|md)$/, ''))
}

async function submitToIndexNow() {
    const slugs = getAllBlogSlugs()

    // Build URL list: homepage + blog index + all blog posts
    const urlList = [
        SITE_URL,
        `${SITE_URL}/blog`,
        ...slugs.map((slug) => `${SITE_URL}/blog/${slug}`),
    ]

    console.log(`Submitting ${urlList.length} URLs to IndexNow...`)

    const payload = {
        host: 'www.autointerviewai.com',
        key: INDEX_NOW_KEY,
        keyLocation: `${SITE_URL}/${INDEX_NOW_KEY}.txt`,
        urlList: urlList,
    }

    try {
        const res = await fetch(INDEX_NOW_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(payload),
        })

        if (res.ok || res.status === 200 || res.status === 202) {
            console.log(`✅ IndexNow: ${urlList.length} URLs submitted (status ${res.status})`)
        } else {
            const text = await res.text()
            console.error(`❌ IndexNow failed: ${res.status} - ${text}`)
        }
    } catch (err) {
        console.error('❌ IndexNow submission error:', err.message)
    }
}

submitToIndexNow()
