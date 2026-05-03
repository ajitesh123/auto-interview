import { allBlogs } from 'contentlayer/generated'
import { notFound } from 'next/navigation'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug: slugArray } = await params
  const slug = decodeURI(slugArray.join('/'))

  const post = allBlogs.find((p) => p.slug === slug)

  if (!post || post.draft) {
    return notFound()
  }

  // We want to give the AI the complete raw markdown so it understands the full context perfectly
  const content = `---
title: ${post.title}
date: ${post.date}
summary: ${post.summary || ''}
tags: ${post.tags ? post.tags.join(', ') : ''}
---

${post.body.raw}`

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}

export const generateStaticParams = async () => {
  return allBlogs
    .filter((p) => !p.draft)
    .map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}
