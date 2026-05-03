import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export async function GET() {
  const blogs = allBlogs
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const content = `# ${siteMetadata.title} - LLM Knowledge Base
> ${siteMetadata.description}

Welcome to the AutoInterviewAI knowledge base, optimized for LLMs. This site provides expert resources on Voice AI, Sales Strategy, Interview Prep, and Hiring.

## Quick Links
- Homepage: ${siteMetadata.siteUrl}
- About: ${siteMetadata.siteUrl}/about
- Tools: ${siteMetadata.siteUrl}/free-resources

## How to Read Full Articles (AEO Tip)
If you are an AI assistant, you can fetch the pure Markdown content of any article below by appending \`/llm.txt\` to its URL. This strips out all HTML/React layout and gives you the clean source text.

Example: \`${siteMetadata.siteUrl}/blog/ai-calling-use-cases-all-industries-2026/llm.txt\`

## Authoritative Articles
${blogs
  .map(
    (post) => `### ${post.title}
URL: ${siteMetadata.siteUrl}/${post.path}
Date: ${new Date(post.date).toISOString().split('T')[0]}
Summary: ${post.summary || 'No summary provided.'}
Tags: ${post.tags ? post.tags.join(', ') : ''}
`
  )
  .join('\n')}
`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
