import fs from 'node:fs'
import path from 'node:path'
import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostLayout from '@/layouts/PostLayout'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

const defaultLayout = 'PostLayout'
const layouts = {
  PostLayout,
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const { slug: slugArray } = await params
  const slug = decodeURI(slugArray.join('/'))
  const post = allBlogs.find((p) => p.slug === slug)
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults =
      allAuthors.find((p) => p.slug === author || p.name === author) ??
      allAuthors.find((p) => p.slug === 'default')
    return coreContent(authorResults as Authors)
  })
  if (!post) {
    return
  }

  const publishedAt = new Date(post.date).toISOString()
  const modifiedAt = new Date(post.lastmod || post.date).toISOString()
  const authors = authorDetails.map((author) => author.name)
  let imageList = [siteMetadata.socialBanner]
  if (post.images) {
    imageList = typeof post.images === 'string' ? [post.images] : post.images
  }
  const ogImages = imageList.map((img) => {
    return {
      url: img.includes('http') ? img : siteMetadata.siteUrl + img,
    }
  })

  const canonicalUrl = post.canonicalUrl || `${siteMetadata.siteUrl}/blog/${slug}`

  const pageTitle =
    post.title.length > 50 || post.title.includes('Auto Interview AI')
      ? post.title
      : `${post.title} | Auto Interview AI`

  return {
    title: {
      absolute: pageTitle,
    },
    description: post.summary,
    keywords: post.tags?.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    authors: authorDetails.map((author) => ({
      name: author.name,
      url: author.twitter || author.linkedin || `${siteMetadata.siteUrl}/about`,
    })),
    openGraph: {
      title: post.title,
      description: post.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      publishedTime: publishedAt,
      modifiedTime: modifiedAt,
      url: canonicalUrl,
      images: ogImages,
      authors: authors.length > 0 ? authors : [siteMetadata.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.summary,
      images: imageList,
    },
  }
}

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug: slugArray } = await params
  const slug = decodeURI(slugArray.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find((p) => p.slug === slug) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults =
      allAuthors.find((p) => p.slug === author || p.name === author) ??
      allAuthors.find((p) => p.slug === 'default')
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
  // Show a hero image only when the file exists: many older posts point to images that were
  // never added, which rendered as a large broken box at the top of the post.
  const heroExists = (src?: string) =>
    !!src && (/^https?:\/\//.test(src) || fs.existsSync(path.join(process.cwd(), 'public', src)))
  const imgs = mainContent.images as unknown
  mainContent.images = (Array.isArray(imgs) ? imgs : imgs ? [imgs] : []).filter((src: string) =>
    heroExists(src)
  )
  let jsonLd = post.jsonLd

  const enhancedAuthors = authorDetails.map((author) => {
    return {
      '@type': 'Person',
      name: author.name,
      jobTitle: author.occupation || 'Author',
      url: `${siteMetadata.siteUrl}/about`,
      sameAs: [author.linkedin, author.twitter, author.github].filter(Boolean),
    }
  })

  const breadcrumbSchema = {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteMetadata.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteMetadata.siteUrl}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${siteMetadata.siteUrl}/${post.path}`,
      },
    ],
  }

  // Extract external links for Citation Schema (AEO/GEO Trust Signal)
  const extractCitations = (markdown: string) => {
    // eslint-disable-next-line no-useless-escape
    const linkRegex = /\[([^\]]+)\]\((https?:\/\/(?!www\.autointerviewai\.com)[^)]+)\)/g
    const citations: string[] = []
    let match
    while ((match = linkRegex.exec(markdown)) !== null) {
      citations.push(match[2])
    }
    return citations
  }

  // Normalise whatever the post's frontmatter carries (one node, an array, or an @graph) into
  // one @graph that always has exactly one article node and the breadcrumb.
  type Node = Record<string, unknown>
  const raw = jsonLd as Node | Node[] | undefined
  const nodes: Node[] = Array.isArray(raw)
    ? raw
    : raw && Array.isArray(raw['@graph'])
      ? (raw['@graph'] as Node[])
      : raw
        ? [raw]
        : []
  const isArticle = (n: Node) => /Article|BlogPosting/.test(String(n['@type'] ?? ''))
  let articleNode = nodes.find(isArticle)
  if (!articleNode) {
    articleNode = {
      '@type': 'BlogPosting',
      headline: post.title,
      datePublished: post.date,
      dateModified: post.lastmod || post.date,
      description: post.summary,
      image: post.images?.[0] ?? siteMetadata.socialBanner,
      url: `${siteMetadata.siteUrl}/${post.path}`,
    }
    nodes.unshift(articleNode)
  }
  articleNode['author'] = enhancedAuthors
  const citations = extractCitations(post.body.raw)
  if (citations.length > 0) articleNode['citation'] = citations
  const relatedLinks: string[] = []
  if (prev) relatedLinks.push(`${siteMetadata.siteUrl}/${prev.path}`)
  if (next) relatedLinks.push(`${siteMetadata.siteUrl}/${next.path}`)
  if (relatedLinks.length > 0) {
    articleNode['hasPart'] = relatedLinks.map((url) => ({ '@type': 'WebPage', '@id': url }))
  }
  const graph = nodes
    .filter((n) => n['@type'] !== 'BreadcrumbList')
    .map(({ ['@context']: _ctx, ...n }) => n)
  graph.push(breadcrumbSchema)
  jsonLd = { '@context': 'https://schema.org', '@graph': graph }

  const Layout = layouts[(post.layout as keyof typeof layouts) || defaultLayout] || PostLayout

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
        <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
      </Layout>
    </>
  )
}
