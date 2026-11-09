import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { getAllDomains } from '@/lib/domainUtils'
import { mbaSpecializations } from '@/data/mbaResources'
import { slug } from 'github-slugger'
import tagData from 'app/tag-data.json'
import { CV_ROLES } from '@/data/cvRolesData'
import { BEHAVIORAL_QUESTIONS, ROLE_INTERVIEW_QUESTIONS } from '@/data/interviewQuestionsData'
import { ROLE_HUB_LIST } from '@/data/roleHubs'
import { ROLE_KITS, KIT_PATHS } from '@/data/roleKits'
import { ROLE_SALARY_LIST } from '@/data/roleSalary'
import { LESSONS } from '@/data/learnAi'
import { PG_LESSONS } from '@/data/pgCourse'

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
        'find-jobs',
        'cover-letter',
        'free-resources',
        'ai-calling-roi-calculator',
        'cold-call-practice',
        'ai-sales-training',
        'voice-ai-calling',
        'salary-calculator',
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
        'find-jobs',
        'cover-letter',
        'free-resources',
        'ai-calling-roi-calculator',
        'cold-call-practice',
        'ai-sales-training',
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
    'ai-calling-roi-calculator',
    'voice-ai-calling',
    'salary-calculator',
    'cold-call-practice',
    'ai-sales-training',
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

  // ===== Role hubs (top-level pages such as /aipm) =====
  const roleHubRoutes = ROLE_HUB_LIST.map((hub) => ({
    url: `${siteUrl}/${hub.slug}`,
    lastModified: hub.lastUpdated,
    changeFrequency: 'weekly' as const,
    priority: 0.95,
  }))

  // Resume (CV) and letter-of-recommendation pages under each hub
  const roleKitRoutes = Object.keys(ROLE_KITS).flatMap((slug) => {
    const hub = ROLE_HUB_LIST.find((h) => h.slug === slug)
    return [KIT_PATHS.resume(slug), KIT_PATHS.lor(slug)].map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: hub?.lastUpdated ?? today,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }))
  })

  // Salary pages (posted pay) under each hub
  const roleSalaryRoutes = ROLE_SALARY_LIST.map((r) => ({
    url: `${siteUrl}/${r.slug}/salary`,
    lastModified: r.checked,
    changeFrequency: 'monthly' as const,
    priority: 0.85,
  }))

  // Learn AI: the hub and every lesson
  const learnAiRoutes = [
    {
      url: `${siteUrl}/learn-ai`,
      lastModified: today,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    ...LESSONS.map((l) => ({
      url: `${siteUrl}/learn-ai/${l.slug}`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]

  // Paul Graham course: the hub and every lesson
  const pgCourseRoutes = [
    {
      url: `${siteUrl}/paul-graham`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    ...PG_LESSONS.map((l) => ({
      url: `${siteUrl}/paul-graham/${l.slug}`,
      lastModified: today,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ]

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
    ...roleHubRoutes,
    ...roleKitRoutes,
    ...roleSalaryRoutes,
    ...learnAiRoutes,
    ...pgCourseRoutes,
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
