import { slug } from 'github-slugger'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayoutWithTags'
import { allBlogs } from 'contentlayer/generated'
import tagData from 'app/tag-data.json'
import { genPageMetadata } from 'app/seo'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>
}): Promise<Metadata> {
  const { tag: tagParam } = await params
  const rawTag = decodeURI(tagParam)
  const normalizedTag = slug(rawTag)
  const displayTitle = rawTag.charAt(0).toUpperCase() + rawTag.slice(1)

  return genPageMetadata({
    title: `${displayTitle} Articles & Resources`,
    description: `Browse all articles, guides, and interview prep materials tagged with ${rawTag} on Auto Interview AI.`,
    alternates: {
      canonical: `https://www.autointerviewai.com/tags/${encodeURI(normalizedTag)}`,
    },
  })
}

export const generateStaticParams = async () => {
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  return tagKeys.map((tag) => ({
    tag: encodeURI(slug(tag)),
  }))
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag: tagParam } = await params
  const rawTag = decodeURI(tagParam)
  const targetSlug = slug(rawTag)

  // Capitalize first letter for display title
  const title =
    rawTag.length > 0 ? rawTag[0].toUpperCase() + rawTag.split('-').join(' ').slice(1) : 'Topics'

  // Match posts by slugified tag comparison
  const filteredPosts = allCoreContent(
    sortPosts(
      allBlogs.filter(
        (post) =>
          post.tags && post.tags.some((t) => slug(t) === targetSlug || slug(t) === slug(rawTag))
      )
    )
  )

  // Graceful redirect to /blog if tag has no posts (prevents 404 in Search Console)
  if (filteredPosts.length === 0) {
    redirect('/blog')
  }

  return <ListLayout posts={filteredPosts} title={title} />
}
