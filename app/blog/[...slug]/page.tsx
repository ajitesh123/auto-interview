import 'css/prism.css'
import 'katex/dist/katex.css'

import PageTitle from '@/components/PageTitle'
import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
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
    const authorResults = allAuthors.find((p) => p.slug === author)
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

  return {
    title: post.title,
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
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  const mainContent = coreContent(post)
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
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteMetadata.siteUrl}/${post.path}` },
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

  if (jsonLd && jsonLd['@graph']) {
    // It's a Graph schema, update the Article node
    const articleNode = jsonLd['@graph'].find((node: any) => node['@type'] === 'Article')
    if (articleNode) {
      articleNode['author'] = enhancedAuthors
      const citations = extractCitations(post.body.raw)
      if (citations.length > 0) {
        articleNode['citation'] = citations
      }
      
      // Add RelatedArticle semantic graph if prev/next exist
      const relatedLinks = []
      if (prev) relatedLinks.push(`${siteMetadata.siteUrl}/${prev.path}`)
      if (next) relatedLinks.push(`${siteMetadata.siteUrl}/${next.path}`)
      if (relatedLinks.length > 0) {
        articleNode['hasPart'] = relatedLinks.map(url => ({
          '@type': 'WebPage',
          '@id': url
        }))
      }
    }
    jsonLd['@graph'].push(breadcrumbSchema)
  } else {
    // Single schema object
    jsonLd['author'] = enhancedAuthors
    const citations = extractCitations(post.body.raw)
    if (citations.length > 0) {
      jsonLd['citation'] = citations
    }
    
    // Add RelatedArticle semantic graph
    const relatedLinks = []
    if (prev) relatedLinks.push(`${siteMetadata.siteUrl}/${prev.path}`)
    if (next) relatedLinks.push(`${siteMetadata.siteUrl}/${next.path}`)
    if (relatedLinks.length > 0) {
      jsonLd['hasPart'] = relatedLinks.map(url => ({
        '@type': 'WebPage',
        '@id': url
      }))
    }
    
    // Convert to graph-like structure for Breadcrumbs
    jsonLd = [jsonLd, { '@context': 'https://schema.org', ...breadcrumbSchema }]
  }

  const Layout = layouts[post.layout || defaultLayout]

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
