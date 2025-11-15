'use client'

import { useMemo, useState } from 'react'
import Link from '@/components/Link'

type PrimaryCategory = 'mba' | 'coding' | 'ca'

interface CategoryTab {
  id: PrimaryCategory
  title: string
  subtitle: string
  badge: string
  accent: string
  comingSoon?: boolean
}

interface FolderCard {
  id: string
  title: string
  description: string
  accent: string
  stats: string
  highlights: string[]
  primaryAction: {
    label: string
    href: string
  }
  secondaryAction: {
    label: string
    href: string
  }
}

const heroStats = [
  { label: 'MBA-ready folders', value: '6', helper: 'Consulting to PM' },
  { label: 'Guides & playbooks', value: '18', helper: 'Step-by-step walkthroughs' },
  { label: 'Community downloads', value: '42k+', helper: 'Across 120 countries' },
]

const categoryTabs: CategoryTab[] = [
  {
    id: 'mba',
    title: 'MBA Career Vault',
    subtitle: 'Break into consulting, product, marketing, finance, and GM roles faster.',
    badge: 'New',
    accent: 'from-indigo-500/20 to-purple-500/20 border-indigo-500/60',
  },
  {
    id: 'coding',
    title: 'Coding Interview Lab',
    subtitle: 'DSA drills, system design labs, and FAANG-ready resumes.',
    badge: 'Coming soon',
    accent: 'from-emerald-500/20 to-cyan-500/20 border-emerald-500/60',
    comingSoon: true,
  },
  {
    id: 'ca',
    title: 'Chartered Accountant Hub',
    subtitle: 'Audit-ready templates, ERM trackers, CFO interview loops.',
    badge: 'Coming soon',
    accent: 'from-amber-500/20 to-orange-500/20 border-amber-500/60',
    comingSoon: true,
  },
]

const mbaFolders: FolderCard[] = [
  {
    id: 'consulting',
    title: 'Consulting',
    description:
      'Case interview math sheets, MECE storytelling flows, and partner-review resume templates.',
    accent: 'from-purple-600/80 via-indigo-600/60 to-indigo-900/60',
    stats: '8 premium templates',
    highlights: ['Harvard resume skin', 'Case math crib sheet', 'Partner debrief script'],
    primaryAction: {
      label: 'Launch Consulting Kit',
      href: '/templates/Harvard/harvard-template.html',
    },
    secondaryAction: {
      label: 'Read case prep guide',
      href: '/blog/complete-job-preparation-guide-2025',
    },
  },
  {
    id: 'finance',
    title: 'Finance',
    description:
      'Pitch deck outlines, buy-side resume bullets, and Excel-ready valuation trackers.',
    accent: 'from-blue-600/80 via-sky-600/60 to-blue-900/60',
    stats: '6 curated playbooks',
    highlights: ['1-pager template', 'Deal sheet builder', 'Capital markets outreach doc'],
    primaryAction: {
      label: 'Download LBS Template',
      href: '/templates/Harvard/LBS/LBS-Template.html',
    },
    secondaryAction: {
      label: 'See outreach playbook',
      href: '/blog/how-to-find-jobs-complete-guide',
    },
  },
  {
    id: 'general-management',
    title: 'General Management',
    description:
      'Operating rhythm checklists, OKR dashboards, and executive briefing memos for GM roles.',
    accent: 'from-pink-600/80 via-rose-500/60 to-rose-900/60',
    stats: '5 scaled frameworks',
    highlights: ['Executive summary sheet', 'Cross-functional scorecards', 'Board update memo'],
    primaryAction: {
      label: 'Use Modern Template',
      href: '/templates/Harvard/Stanford/Stanford-template.html',
    },
    secondaryAction: {
      label: 'View leadership guide',
      href: '/blog/complete-job-preparation-guide-2025',
    },
  },
  {
    id: 'hr',
    title: 'HR / People',
    description:
      'Competency interview scripts, behavioral scorecards, and culture pulse survey doc.',
    accent: 'from-amber-500/80 via-orange-500/60 to-orange-900/60',
    stats: '4 ready-to-use packs',
    highlights: ['Behavioral answer bank', 'Change management playbook', 'Ops dashboard'],
    primaryAction: {
      label: 'Download Checklist',
      href: '/downloads/pm-interview-checklist.md',
    },
    secondaryAction: {
      label: 'Prep with TL;DR',
      href: '/blog/behavioral-interview-star-method-guide',
    },
  },
  {
    id: 'marketing',
    title: 'Marketing',
    description:
      'Launch brief blueprints, growth OKR trackers, and campaign retro templates for CMOs.',
    accent: 'from-fuchsia-600/80 via-purple-500/60 to-purple-900/60',
    stats: '7 launch assets',
    highlights: ['Go-to-market outline', 'Creative retro doc', 'Channel impact tracker'],
    primaryAction: {
      label: 'Grab GTM Template',
      href: '/downloads/pm-interview-templates.md',
    },
    secondaryAction: {
      label: 'Review messaging guide',
      href: '/blog/top-pm-interview-prep-resources',
    },
  },
  {
    id: 'product-management',
    title: 'Product Management',
    description:
      'Product sense cheatsheets, estimation workbooks, and PM-ready Harvard templates.',
    accent: 'from-emerald-600/80 via-teal-500/60 to-emerald-900/60',
    stats: '10 PM artifacts',
    highlights: ['PM interview templates', 'Estimation frameworks', 'Roadmap storytelling'],
    primaryAction: {
      label: 'Open PM Templates',
      href: '/downloads/pm-interview-templates.md',
    },
    secondaryAction: {
      label: 'Read PM guide',
      href: '/blog/product-manager-interview-guide-2025',
    },
  },
]

const comingSoonHighlights = [
  'Interactive editors with AI critiques',
  'Scenario-based walkthroughs',
  'One-click exports (PDF / DOCX / Notion)',
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
  const [activeCategory, setActiveCategory] = useState<PrimaryCategory>('mba')

  const categoryAccent = useMemo(
    () => categoryTabs.find((tab) => tab.id === activeCategory)?.accent ?? 'from-indigo-500',
    [activeCategory]
  )

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
      <section className="mb-12">
        <div className="grid gap-4 md:grid-cols-3">
          {categoryTabs.map((category) => {
            const isActive = category.id === activeCategory
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`group rounded-3xl border bg-gradient-to-r px-5 py-5 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  category.accent
                } ${
                  isActive
                    ? 'opacity-100 ring-2 ring-offset-2 ring-accent-400 ring-offset-gray-950'
                    : 'opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-200">
                    {category.badge}
                  </p>
                  {category.comingSoon && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase text-white">
                      Preview
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-2xl font-bold text-white">{category.title}</h3>
                <p className="mt-2 text-sm text-gray-200">{category.subtitle}</p>
              </button>
            )
          })}
        </div>
      </section>

      {/* MBA folders */}
      {activeCategory === 'mba' && (
        <section className="mb-16">
          <div className="mb-8 rounded-3xl border border-gray-800 bg-gradient-to-r from-gray-900 via-gray-900 to-black p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-accent-300">MBA Vault</p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Structured like your favourite Google Drive. Just faster.
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Click into a folder to grab templates, scripts, and checklists tailored for that track.
              Every asset is ATS-friendly and ready to remix inside Auto Interview AI.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mbaFolders.map((folder) => (
              <div
                key={folder.id}
                className={`flex flex-col rounded-3xl border border-white/10 bg-gradient-to-br ${folder.accent} p-6 shadow-xl shadow-black/30 backdrop-blur`}
              >
                <div className="flex items-center justify-between text-xs uppercase tracking-widest text-gray-200">
                  <span>{folder.stats}</span>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-semibold">
                    Folder
                  </span>
                </div>
                <h3 className="mt-3 text-2xl font-bold text-white">{folder.title}</h3>
                <p className="mt-2 text-sm text-gray-100">{folder.description}</p>
                <ul className="mt-4 space-y-2 text-sm text-white/90">
                  {folder.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-white/70">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-col gap-3 pt-6">
                  <Link
                    href={folder.primaryAction.href}
                    className="flex items-center justify-center rounded-xl bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/30"
                  >
                    {folder.primaryAction.label}
                  </Link>
                  <Link
                    href={folder.secondaryAction.href}
                    className="flex items-center justify-center rounded-xl border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10"
                  >
                    {folder.secondaryAction.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Coming soon */}
      {activeCategory !== 'mba' && (
        <section className="mb-16">
          <div
            className={`rounded-3xl border border-white/10 bg-gradient-to-br ${categoryAccent} p-10 text-center shadow-2xl shadow-black/40`}
          >
            <p className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-white">
              Coming Soon
            </p>
            <h2 className="mt-4 text-4xl font-bold text-white">
              {activeCategory === 'coding'
                ? 'Coding Interview Lab drops next.'
                : 'CA leadership toolkit in progress.'}
            </h2>
            <p className="mt-3 text-lg text-gray-100">
              Our team is packaging editor-ready playbooks, animated explainers, and AI workflows
              purpose-built for this track. Join the waitlist to get early access.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {comingSoonHighlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm text-white shadow-inner shadow-black/20 backdrop-blur"
                >
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-ping rounded-full bg-white"></span>
                    <p>{item}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/contact-policy"
              className="mt-8 inline-flex items-center rounded-full bg-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/30"
            >
              Notify me when live
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>
      )}

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
          {[
            {
              title: 'Resume Launch Kit',
              description:
                'Start from a blank canvas, turn it into an ATS-ready resume, and verify the score before you send a single application.',
              items: ['Harvard template', 'ATS checklist', 'Keyword planner worksheet'],
              href: '/build-resume',
            },
            {
              title: 'Interview Confidence Kit',
              description:
                'Warm-up routine that keeps you sharp: structure answers, refresh frameworks, and rehearse high-signal stories.',
              items: ['PM interview checklist', 'Answer templates', 'AI mock prompts'],
              href: '/cover-letter',
            },
            {
              title: 'Opportunity Engine',
              description:
                'Organize searches, stack-ranked leads, and outreach cadences to source 10-15 qualified interviews per month.',
              items: ['Job search playbook', 'Application tracker', 'Daily outreach script'],
              href: '/find-jobs',
            },
          ].map((bundle) => (
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
                  href={bundle.href}
                  className="inline-flex w-full items-center justify-center rounded-xl border border-accent-500/40 px-4 py-2 text-sm font-semibold text-accent-200 transition hover:border-accent-400 hover:bg-accent-500/10"
                >
                  Launch workflow
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

