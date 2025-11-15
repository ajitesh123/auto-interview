'use client'

import { useMemo, useState } from 'react'
import Link from '@/components/Link'

type CategoryFilter =
  | 'All'
  | 'Resume Templates'
  | 'Interview Prep'
  | 'Job Search'
  | 'Career Strategy'

interface ResourceCard {
  id: string
  title: string
  description: string
  category: Exclude<CategoryFilter, 'All'>
  link: string
  format: string
  time: string
  actionText?: string
  isNew?: boolean
}

interface Bundle {
  title: string
  description: string
  items: string[]
  cta: {
    label: string
    href: string
  }
}

const categoryFilters: CategoryFilter[] = [
  'All',
  'Resume Templates',
  'Interview Prep',
  'Job Search',
  'Career Strategy',
]

const heroStats = [
  { label: 'Free templates', value: '12', helper: 'ATS-friendly layouts' },
  { label: 'Guides & playbooks', value: '18', helper: 'Step-by-step walkthroughs' },
  { label: 'Community downloads', value: '42k+', helper: 'Across 120 countries' },
]

const resources: ResourceCard[] = [
  {
    id: 'harvard-template',
    title: 'Harvard Resume Template (HTML + CSS)',
    description:
      'Battle-tested single-column resume structure that mirrors the Harvard career center format. Download the responsive HTML file and customize instantly.',
    category: 'Resume Templates',
    link: '/templates/Harvard/harvard-template.html',
    format: 'HTML + CSS',
    time: '5 min setup',
    isNew: true,
  },
  {
    id: 'stanford-template',
    title: 'Stanford Resume Template',
    description:
      'Clean, minimalist layout favored by product and strategy roles. Includes typography guidance plus spacing rules for ATS parsing.',
    category: 'Resume Templates',
    link: '/templates/Harvard/Stanford/Stanford-template.html',
    format: 'HTML',
    time: 'Copy → paste into builder',
  },
  {
    id: 'lbs-template',
    title: 'London Business School Template',
    description:
      'Two-column layout that highlights leadership impact and extracurriculars—perfect for MBA, consulting, and growth roles.',
    category: 'Resume Templates',
    link: '/templates/Harvard/LBS/LBS-Template.html',
    format: 'HTML',
    time: 'Ready in 7 min',
  },
  {
    id: 'pm-checklist',
    title: 'Product Management Interview Checklist',
    description:
      'Comprehensive checklist covering discovery, execution, metrics, and leadership prompts. Use before every onsite loop.',
    category: 'Interview Prep',
    link: '/downloads/pm-interview-checklist.md',
    format: 'Markdown / PDF export',
    time: 'Print-ready',
  },
  {
    id: 'pm-templates',
    title: 'PM Interview Answer Templates',
    description:
      'Fill-in-the-blank templates for product sense, estimation, and system design responses so you never blank out again.',
    category: 'Interview Prep',
    link: '/downloads/pm-interview-templates.md',
    format: 'Markdown',
    time: '2 min to customize',
  },
  {
    id: 'ats-guide',
    title: 'ATS Resume Optimization Guide',
    description:
      'Step-by-step article that explains how to structure sections, keyword balance, and formatting so you consistently score 80+ on ATS scans.',
    category: 'Career Strategy',
    link: '/blog/ats-resume-optimization',
    format: 'In-depth article',
    time: '10 min read',
  },
  {
    id: 'job-search-playbook',
    title: 'Job Search Playbook (LinkedIn Edition)',
    description:
      'Complete walkthrough for sourcing leads, saving searches, and building a 15-min daily routine to stay ahead of stealth postings.',
    category: 'Job Search',
    link: '/blog/how-to-find-jobs-complete-guide',
    format: 'Playbook',
    time: '15 min read',
  },
  {
    id: 'career-roadmap',
    title: 'Complete Job Preparation Guide 2025',
    description:
      'Master checklist that shows the exact order to build resumes, score them, find roles, and prep interviews without burning out.',
    category: 'Career Strategy',
    link: '/blog/complete-job-preparation-guide-2025',
    format: 'Guide',
    time: 'Bookmark-friendly',
  },
]

const bundles: Bundle[] = [
  {
    title: 'Resume Launch Kit',
    description:
      'Start from a blank canvas, turn it into an ATS-ready resume, and verify the score before you send a single application.',
    items: ['Harvard template', 'ATS checklist', 'Keyword planner worksheet'],
    cta: { label: 'Open Resume Builder', href: '/build-resume' },
  },
  {
    title: 'Interview Confidence Kit',
    description:
      'Warm-up routine that keeps you sharp: structure answers, refresh frameworks, and rehearse high-signal stories.',
    items: ['PM interview checklist', 'Answer templates', 'AI mock prompts'],
    cta: { label: 'Generate Cover Letter & Stories', href: '/cover-letter' },
  },
  {
    title: 'Opportunity Engine',
    description:
      'Organize searches, stack-ranked leads, and outreach cadences to source 10-15 qualified interviews per month.',
    items: ['Job search playbook', 'Application tracker', 'Daily outreach script'],
    cta: { label: 'Find Jobs Now', href: '/find-jobs' },
  },
]

const quickWins = [
  {
    title: 'Upload your resume for instant ATS score',
    description: 'Identify broken formatting and missing keywords in under 60 seconds.',
    href: '/ats-score',
    action: 'Check ATS Score',
  },
  {
    title: 'Match resumes to live job posts',
    description: 'Paste a job description and compare strengths vs. gaps automatically.',
    href: '/resume-job-matcher',
    action: 'Try Matcher',
  },
  {
    title: 'Auto-generate tailored cover letters',
    description: 'Reuse your resume data to spin up a polished cover letter that sounds human.',
    href: '/cover-letter',
    action: 'Create Cover Letter',
  },
]

const FreeResourcesPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('All')

  const visibleResources = useMemo(() => {
    if (selectedCategory === 'All') return resources
    return resources.filter((resource) => resource.category === selectedCategory)
  }, [selectedCategory])

  return (
    <div className="flex min-h-full w-full flex-col px-6 py-10 text-white sm:px-8 lg:px-16">
      {/* Hero */}
      <section className="mb-12 rounded-3xl border border-matte-gray bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800 p-8 shadow-2xl shadow-purple-500/10">
        <p className="mb-3 inline-flex items-center rounded-full bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-accent-300">
          100% Free Resource Library
        </p>
        <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
          <div>
            <h1 className="mb-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Free Resources for Every Step of Your Job Search
            </h1>
            <p className="text-lg text-gray-300">
              Download ATS-friendly resume templates, interview checklists, and step-by-step playbooks
              curated by the Auto Interview AI team. No email gates, no limits—just fast execution.
            </p>
          </div>
          <div className="rounded-2xl border border-purple-600/40 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-widest text-gray-400">Need it fast?</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Pick a template → ship in 30m</h3>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>• Start with Harvard / Stanford formats</li>
              <li>• Run ATS score & keyword scan</li>
              <li>• Send personalized outreach with AI cover letters</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 grid gap-4 text-center sm:grid-cols-3">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur"
            >
              <p className="text-3xl font-bold text-accent-300">{stat.value}</p>
              <p className="text-sm font-semibold text-white">{stat.label}</p>
              <p className="text-xs text-gray-400">{stat.helper}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Filters */}
      <section className="mb-10">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          {categoryFilters.map((category) => {
            const isActive = category === selectedCategory
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? 'border-accent-400 bg-accent-500/20 text-white shadow-lg shadow-accent-500/30'
                    : 'border-gray-700 bg-gray-900 text-gray-300 hover:border-accent-500/70 hover:text-white'
                }`}
                aria-pressed={isActive}
              >
                {category}
              </button>
            )
          })}
        </div>
        <p className="text-sm text-gray-400">
          Showing {visibleResources.length} resource{visibleResources.length !== 1 ? 's' : ''} •{' '}
          {selectedCategory === 'All' ? 'Browse everything in the library.' : selectedCategory}
        </p>
      </section>

      {/* Resource Grid */}
      <section className="mb-16">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {visibleResources.map((resource) => (
            <div
              key={resource.id}
              className="flex flex-col rounded-2xl border border-gray-800 bg-gray-900/80 p-6 transition-all hover:-translate-y-1 hover:border-accent-500/60 hover:bg-gray-900"
            >
              <div className="mb-3 flex items-center justify-between text-xs uppercase tracking-widest">
                <span className="font-semibold text-accent-300">{resource.category}</span>
                {resource.isNew && (
                  <span className="rounded-full bg-accent-500/20 px-3 py-1 text-[10px] font-bold text-accent-200">
                    New
                  </span>
                )}
              </div>
              <h3 className="text-xl font-semibold text-white">{resource.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{resource.description}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs text-gray-400">
                <span className="rounded-full border border-gray-700 px-3 py-1">{resource.format}</span>
                <span className="rounded-full border border-gray-700 px-3 py-1">{resource.time}</span>
              </div>
              <div className="mt-auto pt-6">
                <Link
                  href={resource.link}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-2 text-sm font-semibold text-white transition hover:from-accent-400 hover:to-accent-500"
                >
                  {resource.actionText ?? 'Download Free'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bundles */}
      <section className="mb-16">
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent-300">Shortcut Kits</p>
            <h2 className="text-3xl font-bold">Plug-and-Play Resource Bundles</h2>
            <p className="text-sm text-gray-400">
              Each kit is a curated mini playbook designed to solve one part of the funnel in a single
              sitting.
            </p>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {bundles.map((bundle) => (
            <div
              key={bundle.title}
              className="flex flex-col rounded-2xl border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 p-6"
            >
              <h3 className="text-2xl font-semibold text-white">{bundle.title}</h3>
              <p className="mt-2 text-sm text-gray-300">{bundle.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {bundle.items.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="text-accent-300">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-6">
                <Link
                  href={bundle.cta.href}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-accent-500/40 px-4 py-2 text-sm font-semibold text-accent-200 transition hover:border-accent-400 hover:bg-accent-500/10"
                >
                  {bundle.cta.label}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick wins */}
      <section className="mb-20 rounded-3xl border border-gray-800 bg-gray-950/70 p-8">
        <div className="mb-6 flex flex-col gap-2">
          <p className="text-xs uppercase tracking-widest text-accent-300">Execute Now</p>
          <h2 className="text-3xl font-bold text-white">Turn Downloads into Action</h2>
          <p className="text-sm text-gray-400">
            Pair each resource with the matching Auto Interview AI workflow so you can apply what you
            downloaded right away.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {quickWins.map((item) => (
            <div key={item.title} className="rounded-2xl border border-gray-800 bg-gray-900/70 p-5">
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{item.description}</p>
              <Link
                href={item.href}
                className="mt-4 inline-flex items-center text-sm font-semibold text-accent-300 hover:text-accent-100"
              >
                {item.action}
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default FreeResourcesPage

