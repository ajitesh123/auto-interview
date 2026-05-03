import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export async function GET() {
  const blogs = allBlogs
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const feedItems = blogs
    .map((post) => {
      return `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${siteMetadata.siteUrl}/${post.path}</link>
      <guid>${siteMetadata.siteUrl}/${post.path}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description><![CDATA[${post.summary || ''}]]></description>
      ${post.tags ? post.tags.map((t) => `<category><![CDATA[${t}]]></category>`).join('') : ''}
    </item>`
    })
    .join('')

  const feed = `<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteMetadata.title}</title>
    <link>${siteMetadata.siteUrl}</link>
    <description>${siteMetadata.description}</description>
    <language>${siteMetadata.language}</language>
    <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
    <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
    <lastBuildDate>${new Date(blogs[0]?.date || new Date()).toUTCString()}</lastBuildDate>
    <atom:link href="${siteMetadata.siteUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${feedItems}
  </channel>
</rss>`

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
