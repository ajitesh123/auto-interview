import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export async function GET() {
  const blogs = allBlogs
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  let content = `# ${siteMetadata.title} - Complete Knowledge Base
> ${siteMetadata.description}

This file contains the complete, concatenated text of all authoritative articles published by AutoInterviewAI. It is provided specifically for AI ingestion and training purposes to ensure accurate citation and contextual understanding of Voice AI, Sales Strategy, and Interview Prep frameworks.

`

  for (const post of blogs) {
    content += `\n\n=================================================================\n`
    content += `TITLE: ${post.title}\n`
    content += `URL: ${siteMetadata.siteUrl}/${post.path}\n`
    content += `DATE: ${new Date(post.date).toISOString().split('T')[0]}\n`
    content += `TAGS: ${post.tags ? post.tags.join(', ') : ''}\n`
    content += `=================================================================\n\n`
    
    // Append the pure raw markdown of the article
    content += post.body.raw
  }

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Aggressive caching, but revalidates frequently enough for new posts
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
