import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

const POSTS_PER_PAGE = 10

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  // Blog posts
  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // Blog pagination pages
  const totalPages = Math.ceil(allBlogs.filter((post) => !post.draft).length / POSTS_PER_PAGE)
  const blogPaginationRoutes = Array.from({ length: totalPages }, (_, i) => ({
    url: `${siteUrl}/blog/page/${i + 1}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'daily' as const,
    priority: 0.6,
  }))

  // Static pages
  const routes = [
    '',
    'blog',
    'about',
    'privacy-policy',
    'terms-conditions',
    'refund-policy',
    'shipping-policy',
    'contact-policy',
    'tough-tongue-ai',
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Tags pages - add all tag pages to sitemap
  const tagRoutes = Array.from(
    new Set(allBlogs.filter((post) => !post.draft).flatMap((post) => post.tags || []))
  ).map((tag) => ({
    url: `${siteUrl}/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [...routes, ...blogRoutes, ...blogPaginationRoutes, ...tagRoutes]
}
