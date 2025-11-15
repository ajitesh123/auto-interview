'use client'

import { useMemo, useState, useEffect } from 'react'
import Link from '@/components/Link'

type PrimaryCategory = 'mba' | 'coding' | 'ca'

interface CategoryTab {
  id: PrimaryCategory
  title: string
  subtitle: string
  badge: string
  comingSoon?: boolean
}

interface FolderFile {
  id: string
  name: string
  description: string
  href: string
  format: string
}

interface FolderCard {
  id: string
  title: string
  accent: string
  files: FolderFile[]
  hiddenDescription?: string
}

const heroStats = [
  { label: 'MBA-ready folders', value: 6, helper: 'Consulting to PM', format: 'default' },
  { label: 'Guides & playbooks', value: 18, helper: 'Step-by-step walkthroughs', format: 'default' },
  { label: 'Community downloads', value: 42000, helper: 'Across 120 countries', format: 'k-plus' },
]

const categoryTabs: CategoryTab[] = [
  {
    id: 'mba',
    title: 'MBA Career Vault',
    subtitle: 'Break into consulting, product, marketing, finance, and GM roles faster.',
    badge: 'New',
  },
  {
    id: 'coding',
    title: 'Coding Interview Lab',
    subtitle: 'DSA drills, system design labs, and FAANG-ready resumes.',
    badge: 'Coming soon',
    comingSoon: true,
  },
  {
    id: 'ca',
    title: 'Chartered Accountant Hub',
    subtitle: 'Audit-ready templates, ERM trackers, CFO interview loops.',
    badge: 'Coming soon',
    comingSoon: true,
  },
]

const mbaFolders: FolderCard[] = [
  {
    id: 'consulting',
    title: 'Consulting',
    accent: 'from-purple-600/50 via-indigo-600/40 to-indigo-900/40',
    files: [
      {
        id: 'iimc-casebook',
        name: 'IIM Calcutta Casebook',
        description: 'Complete IIM-C case interview book covering frameworks, math, and sample drills.',
        href: '/downloads/IIMC_Casebook_24-25.pdf',
        format: 'PDF',
      },
    ],
    hiddenDescription:
      'Consulting prep downloads covering case interview frameworks, mental math practice, and partner-ready resume formats for global firms.',
  },
  {
    id: 'finance',
    title: 'Finance',
    accent: 'from-blue-600/40 via-sky-600/30 to-blue-900/30',
    files: [],
    hiddenDescription:
      'Finance folder references valuation templates, buy-side resume bullets, and investment banking pitch outlines for New York, London, and Singapore roles.',
  },
  {
    id: 'general-management',
    title: 'General Management',
    accent: 'from-pink-600/40 via-rose-500/30 to-rose-900/30',
    files: [],
    hiddenDescription:
      'General management resources include OKR scorecards and executive briefing decks optimized for global operators in the US, EU, and APAC.',
  },
  {
    id: 'hr',
    title: 'HR / People',
    accent: 'from-amber-500/40 via-orange-500/30 to-orange-900/30',
    files: [],
    hiddenDescription:
      'HR folder highlights behavioral interview scorecards, people ops dashboards, and culture surveys tuned for remote and hybrid teams worldwide.',
  },
  {
    id: 'marketing',
    title: 'Marketing',
    accent: 'from-fuchsia-600/40 via-purple-500/30 to-purple-900/30',
    files: [],
    hiddenDescription:
      'Marketing downloads focus on go-to-market launch briefs, growth OKR templates, and messaging frameworks for SaaS, e-commerce, and consumer apps.',
  },
  {
    id: 'product-management',
    title: 'Product Management',
    accent: 'from-emerald-600/40 via-teal-500/30 to-emerald-900/30',
    files: [],
    hiddenDescription:
      'Product management folder covers product sense cheat sheets, estimation drills, and AI product requirement docs aligned with North America and India hiring.',
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
  const [expandedFolderId, setExpandedFolderId] = useState<string | null>(null)
  const [downloadingFileId, setDownloadingFileId] = useState<string | null>(null)
  const [statsAnimationProgress, setStatsAnimationProgress] = useState(0)
  const glassGreen =
    'bg-white/5 border border-emerald-100/30 hover:border-emerald-100/70 hover:bg-emerald-200/10 text-emerald-100'
  const activePurple =
    'bg-gradient-to-r from-purple-500/80 via-fuchsia-500/80 to-purple-600/80 border border-purple-200/70 text-white shadow-[0_20px_50px_rgba(168,85,247,0.35)]'

  const toggleFolder = (folderId: string) => {
    setExpandedFolderId((prev) => (prev === folderId ? null : folderId))
  }

  const handleFileDownload = (file: FolderFile) => {
    setDownloadingFileId(file.id)
    window.open(file.href, '_blank')
    setTimeout(() => setDownloadingFileId((current) => (current === file.id ? null : current)), 1500)
  }

  useEffect(() => {
    let frame: number
    const start = performance.now()
    const duration = 800
    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1)
      setStatsAnimationProgress(progress)
      if (progress < 1) {
        frame = requestAnimationFrame(animate)
      }
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [])

  const animatedValue = (value: number) => Math.round(value * statsAnimationProgress)

  return (
    <div className="flex min-h-full w-full flex-col px-6 py-10 text-white sm:px-8 lg:px-16">
      <div className="sr-only" aria-label="SEO AEO GEO summary">
        Auto Interview AI Free Resources Library curates free downloadable interview resources for
        software engineering, tech product, consulting, and MBA job seekers searching phrases like
        “free downloadable case interview pdf”, “ATS resume template download”, and “IIM Calcutta
        casebook free download” from San Francisco, Bengaluru, London, Singapore, and other GEO hubs.
        Each hidden folder summary is optimized for SEO discoverability, AEO answer-first snippets,
        and GEO intent so search engines and AI assistants understand this page stores ATS resume
        templates, case study PDFs, cover letter scripts, and AI-ready playbooks.
      </div>
      {/* Hero */}
      <section className="mb-10 rounded-4xl border border-white/5 bg-gradient-to-br from-[#0B0B1A] via-[#111122] to-[#0B0B1A] p-8 shadow-[0_40px_90px_rgba(0,0,0,0.45)]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="mb-3 inline-flex items-center rounded-full bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-accent-200">
              Free prep vault
            </p>
            <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-5xl">
              One library for every downloadable interview resource.
            </h1>
            <p className="mt-3 text-base text-white/70">
              From FAANG software roles to MBB consulting, grab the exact resume, case, or interview
              file you need—no email gates, no bloat, just clean downloads.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-white/80 backdrop-blur">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">How it works</p>
            <ol className="mt-3 space-y-2 text-sm text-white/90">
              <li>1. Pick a track (MBA, Coding, CA)</li>
              <li>2. Tap “Click to open” to reveal files</li>
              <li>3. Download instantly with live progress</li>
            </ol>
          </div>
        </div>
        <div className="mt-10 grid gap-4 text-center sm:grid-cols-3">
          {heroStats.map((stat) => {
            const value = animatedValue(stat.value)
            const formatted =
              stat.format === 'k-plus'
                ? `${Math.max(1, Math.floor(value / 1000))}k+`
                : `${value}`
            return (
              <div
                key={stat.label}
                className="rounded-3xl border border-white/5 bg-white/5 px-4 py-6 text-white backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-white/20"
              >
                <p className="text-4xl font-extrabold text-white">{formatted}</p>
                <p className="mt-1 text-sm font-semibold text-white/80">{stat.label}</p>
                <p className="text-xs text-white/60">{stat.helper}</p>
              </div>
            )
          })}
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
                className={`group rounded-3xl px-5 py-5 text-left transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl ${
                  isActive ? activePurple : `${glassGreen} text-white/90`
                } ${category.comingSoon ? 'backdrop-blur-lg' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-200">
                    {category.badge}
                  </p>
                  {category.comingSoon && (
                    <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase text-white shadow-inner shadow-black/20">
                      Preview
                    </span>
                  )}
                </div>
                <h3 className="mt-3 text-2xl font-bold text-white">{category.title}</h3>
                <p className="mt-2 text-sm text-gray-100/90">{category.subtitle}</p>
              </button>
            )
          })}
        </div>
      </section>

      {/* MBA folders */}
      {activeCategory === 'mba' && (
        <section className="mb-16">
          <div className="mb-6 rounded-3xl border border-white/5 bg-white/5 p-5 text-white backdrop-blur">
            <p className="text-xs uppercase tracking-[0.4em] text-accent-300">Folders</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">
              Minimal cards, one tap to open, files underneath.
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {mbaFolders.map((folder) => {
              const isExpanded = expandedFolderId === folder.id
              return (
                <div key={folder.id} className="rounded-3xl border border-white/5 bg-white/5 p-3 backdrop-blur">
                  <button
                    onClick={() => toggleFolder(folder.id)}
                    aria-expanded={isExpanded}
                    aria-describedby={folder.hiddenDescription ? `folder-hidden-${folder.id}` : undefined}
                    className={`flex w-full items-center justify-between rounded-2xl bg-gradient-to-r ${folder.accent} px-5 py-4 text-left text-white transition-all duration-300 ${
                      isExpanded ? 'shadow-[0_25px_45px_rgba(0,0,0,0.35)]' : ''
                    }`}
                  >
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.4em] text-white/70">Folder</p>
                      <h3 className="text-xl font-semibold">{folder.title}</h3>
                    </div>
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white transition-transform ${
                        isExpanded ? 'rotate-45' : ''
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {folder.hiddenDescription && (
                    <p id={`folder-hidden-${folder.id}`} className="sr-only">
                      {folder.hiddenDescription}
                    </p>
                  )}
                  {isExpanded && (
                    <div className="mt-3 rounded-2xl border border-white/10 bg-black/30 p-4 text-white/80 shadow-inner shadow-black/30">
                      {folder.files.length > 0 ? (
                        <ul className="space-y-3">
                          {folder.files.map((file) => (
                            <li
                              key={file.id}
                              className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/90"
                            >
                              <div className="flex flex-col gap-2">
                                <p className="text-base font-semibold text-white">{file.name}</p>
                                <p className="text-white/70">{file.description}</p>
                                <button
                                  onClick={() => handleFileDownload(file)}
                                  className="mt-2 inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-accent-100 transition-all duration-300 hover:bg-white/20 hover:text-white"
                                  disabled={downloadingFileId === file.id}
                                >
                                  {downloadingFileId === file.id ? (
                                    <>
                                      <svg
                                        className="mr-2 h-4 w-4 animate-spin text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M4 12a8 8 0 018-8 8 8 0 018 8 8 8 0 01-8 8"
                                        />
                                      </svg>
                                      Preparing...
                                    </>
                                  ) : (
                                    <>
                                      Click to download
                                      <svg
                                        className="ml-2 h-3 w-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                      </svg>
                                    </>
                                  )}
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center text-sm text-white/70">
                          Files coming soon
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Coming soon */}
      {activeCategory !== 'mba' && (
        <section className="mb-16">
          <div
            className={`rounded-3xl border border-white/10 p-10 text-center shadow-2xl shadow-black/40 ${
              activeCategory === 'coding'
                ? 'bg-gradient-to-br from-emerald-400/20 via-emerald-500/10 to-teal-600/20'
                : 'bg-gradient-to-br from-amber-400/20 via-amber-500/10 to-amber-600/20'
            } backdrop-blur-lg`}
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

