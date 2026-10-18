import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { getAllDomains } from '@/lib/domainUtils'
import { mbaSpecializations } from '@/data/mbaResources'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { CV_ROLES } from '@/data/cvRolesData'
import { BEHAVIORAL_QUESTIONS, ROLE_INTERVIEW_QUESTIONS } from '@/data/interviewQuestionsData'

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

  // ===== Domain routes =====
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

  // ===== Resource Hub & MBA Specialization Routes =====
  const resourceHubRoutes = [
    {
      url: `${siteUrl}/resources`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${siteUrl}/resources/mba`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...mbaSpecializations.map((spec) => ({
      url: `${siteUrl}/resources/mba/${spec.slug}`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
  ]

  // ===== Static Core Pages =====
  const getRoutePriority = (route: string) => {
    if (route === '') return 1.0
    if (
      [
        'interview-questions',
        'cv-templates',
        'resources',
        'free-mock-interview',
        'build-resume',
        'ats-score',
        'find-jobs',
        'cover-letter',
        'free-resources',
        'ai-calling-roi-calculator',
        'cold-call-practice',
        'resume-job-matcher',
      ].includes(route)
    )
      return 0.95
    if (route === 'communities') return 0.85
    if (route === 'blog') return 0.9
    if (route === 'about') return 0.85
    if (['privacy-policy', 'terms-conditions'].includes(route)) return 0.6
    return 0.7
  }

  const getChangeFrequency = (route: string) => {
    if (route === '') return 'daily' as const
    if (
      [
        'interview-questions',
        'cv-templates',
        'resources',
        'free-mock-interview',
        'build-resume',
        'ats-score',
        'find-jobs',
        'cover-letter',
        'free-resources',
        'ai-calling-roi-calculator',
        'cold-call-practice',
        'resume-job-matcher',
      ].includes(route)
    )
      return 'weekly' as const
    if (route === 'blog') return 'daily' as const
    return 'monthly' as const
  }

  const routes = [
    '',
    'interview-questions',
    'cv-templates',
    'resources',
    'free-mock-interview',
    'communities',
    'blog',
    'about',
    'build-resume',
    'ats-score',
    'ai-calling-roi-calculator',
    'cold-call-practice',
    'resume-job-matcher',
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

  // Curated Tag Topic Hubs (>= 4 articles) to prevent thin taxonomy bloat and maximize crawl budget
  const tagCounts = tagData as Record<string, number>
  const tagRoutes = Object.keys(tagCounts)
    .filter((tagKey) => tagCounts[tagKey] >= 4)
    .map((tagKey) => ({
      url: `${siteUrl}/tags/${encodeURI(slug(tagKey))}`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  const cvRoleRoutes = Object.keys(CV_ROLES).map((role) => ({
    url: `${siteUrl}/cv-templates/${role}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }))

  const interviewBehavioralRoutes = Object.keys(BEHAVIORAL_QUESTIONS).map((question) => ({
    url: `${siteUrl}/interview-questions/behavioral/${question}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }))

  const interviewRoleRoutes = Object.keys(ROLE_INTERVIEW_QUESTIONS).map((role) => ({
    url: `${siteUrl}/interview-questions/${role}`,
    lastModified: today,
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }))

  return [
    ...routes,
    ...interviewBehavioralRoutes,
    ...interviewRoleRoutes,
    ...cvRoleRoutes,
    ...resourceHubRoutes,
    ...domainRoutes,
    ...subDomainRoutes,
    ...resourceRoutes,
    ...blogRoutes,
    ...blogPaginationRoutes,
    ...tagRoutes,
  ]
}
