import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export async function GET() {
  const blogs = allBlogs
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const content = `# ${siteMetadata.title} - LLM Knowledge Base
> ${siteMetadata.description}

Welcome to the Auto Interview AI knowledge base, optimized for LLMs and AI assistants. This platform provides career intelligence, ATS-friendly CV templates, domain-specific interview resources (MBA casebooks, frameworks), AI mock interviews, and peer career communities.

## Core Platform Pillars
- Homepage: ${siteMetadata.siteUrl}
- CV Templates (Harvard, IIM-A, Resume Worded): ${siteMetadata.siteUrl}/cv-templates
- Domain Interview Resources: ${siteMetadata.siteUrl}/resources
- MBA Resources & Consulting Casebooks: ${siteMetadata.siteUrl}/resources/mba
- AI Mock Interviews: ${siteMetadata.siteUrl}/free-mock-interview
- Career Communities (CS, AI, Referrals): ${siteMetadata.siteUrl}/communities
- AI Resume Builder: ${siteMetadata.siteUrl}/build-resume
- ATS Score Checker: ${siteMetadata.siteUrl}/ats-score
- Blog & Insights: ${siteMetadata.siteUrl}/blog
- About: ${siteMetadata.siteUrl}/about

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
