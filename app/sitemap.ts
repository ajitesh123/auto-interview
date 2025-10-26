import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

const POSTS_PER_PAGE = 10

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  // Blog posts - Optimized for Google SEO
  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
      // High-priority blog posts get better ranking
      changeFrequency: 'monthly' as const, // More realistic than weekly for evergreen content
      priority: 0.8, // Blog posts are important content - increased from 0.7
    }))

  // Blog pagination pages
  const totalPages = Math.ceil(allBlogs.filter((post) => !post.draft).length / POSTS_PER_PAGE)
  const blogPaginationRoutes = Array.from({ length: totalPages }, (_, i) => ({
    url: `${siteUrl}/blog/page/${i + 1}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: 'weekly' as const, // More realistic than daily
    priority: i === 0 ? 0.9 : 0.5, // First page (blog index) is more important
  }))

  // Helper function to determine route priority - Google SEO optimization
  const getRoutePriority = (route: string) => {
    if (route === '') return 1.0 // Homepage - highest priority
    // Feature pages are core business value - very high priority
    if (['build-resume', 'ats-score', 'find-jobs', 'cover-letter'].includes(route)) return 0.95
    if (route === 'blog') return 0.9 // Blog index is important
    if (route === 'about') return 0.85 // About page for E-E-A-T
    // Policy pages - lower priority but still important for trust
    if (['privacy-policy', 'terms-conditions'].includes(route)) return 0.6
    return 0.7 // Default for other pages
  }

  // Helper function to determine change frequency
  const getChangeFrequency = (route: string) => {
    if (route === '') return 'daily' as const // Homepage changes frequently
    if (['build-resume', 'ats-score', 'find-jobs', 'cover-letter'].includes(route)) return 'weekly' as const
    if (route === 'blog') return 'daily' as const // Blog index updates with new posts
    return 'monthly' as const // Static pages change less frequently
  }

  // Static pages - Optimized for Google SEO with proper priorities and frequencies
  const routes = [
    '',
    'blog',
    'about',
    'build-resume',
    'ats-score',
    'find-jobs',
    'cover-letter',
    'privacy-policy',
    'terms-conditions',
    'refund-policy',
    'shipping-policy',
    'contact-policy',
    // 'tough-tongue-ai' removed - redirects to external domain, causes indexing issues
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
    changeFrequency: getChangeFrequency(route),
    priority: getRoutePriority(route),
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
