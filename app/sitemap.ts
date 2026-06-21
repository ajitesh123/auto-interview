import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { getAllDomains } from '@/lib/domainUtils'

const POSTS_PER_PAGE = 10

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const today = new Date().toISOString().split('T')[0]

  // ===== Blog posts =====
  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

  // Blog pagination
  const totalPages = Math.ceil(allBlogs.filter((post) => !post.draft).length / POSTS_PER_PAGE)
  const blogPaginationRoutes = Array.from({ length: totalPages }, (_, i) => ({
    url: `${siteUrl}/blog/page/${i + 1}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: i === 0 ? 0.9 : 0.5,
  }))

  // ===== Domain routes (auto-generated from data) =====
  const domains = getAllDomains()

  const domainRoutes = domains.map((d) => ({
    url: `${siteUrl}/${d.slug}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  const subDomainRoutes = domains.flatMap((d) =>
    d.subDomains.map((sd) => ({
      url: `${siteUrl}/${d.slug}/${sd.slug}`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    }))
  )

  const resourceRoutes = domains.flatMap((d) =>
    d.subDomains.flatMap((sd) =>
      sd.resources.map((r) => ({
        url: `${siteUrl}/${d.slug}/${sd.slug}/${r.slug}`,
        lastModified: r.updatedAt || today,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }))
    )
  )

  // ===== Static pages =====
  const getRoutePriority = (route: string) => {
    if (route === '') return 1.0
    if (['build-resume', 'ats-score', 'find-jobs', 'cover-letter', 'free-resources'].includes(route))
      return 0.9
    if (route === 'blog') return 0.9
    if (route === 'about') return 0.85
    if (['privacy-policy', 'terms-conditions'].includes(route)) return 0.6
    return 0.7
  }

  const getChangeFrequency = (route: string) => {
    if (route === '') return 'daily' as const
    if (['build-resume', 'ats-score', 'find-jobs', 'cover-letter', 'free-resources'].includes(route))
      return 'weekly' as const
    if (route === 'blog') return 'daily' as const
    return 'monthly' as const
  }

  const routes = [
    '',
    'blog',
    'about',
    'build-resume',
    'ats-score',
    'find-jobs',
    'cover-letter',
    'free-resources',
    'privacy-policy',
    'terms-conditions',
    'refund-policy',
    'shipping-policy',
    'contact-policy',
  ].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: today,
    changeFrequency: getChangeFrequency(route),
    priority: getRoutePriority(route),
  }))

  // Tags
  const tagRoutes = Array.from(
    new Set(allBlogs.filter((post) => !post.draft).flatMap((post) => post.tags || []))
  ).map((tag) => ({
    url: `${siteUrl}/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [
    ...routes,
    ...domainRoutes,
    ...subDomainRoutes,
    ...resourceRoutes,
    ...blogRoutes,
    ...blogPaginationRoutes,
    ...tagRoutes,
  ]
}
