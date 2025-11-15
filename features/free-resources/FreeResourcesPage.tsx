'use client'

import { useMemo, useState } from 'react'
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
    accent: 'from-purple-600/80 via-indigo-600/60 to-indigo-900/60',
    files: [
      {
        id: 'iimc-casebook',
        name: 'IIM Calcutta Casebook',
        description: 'Complete IIM-C case interview book covering frameworks, math, and sample drills.',
        href: '/downloads/IIMC_Casebook_24-25.pdf',
        format: 'PDF',
      },
    ],
  },
  {
    id: 'finance',
    title: 'Finance',
    accent: 'from-blue-600/80 via-sky-600/60 to-blue-900/60',
    files: [],
  },
  {
    id: 'general-management',
    title: 'General Management',
    accent: 'from-pink-600/80 via-rose-500/60 to-rose-900/60',
    files: [],
  },
  {
    id: 'hr',
    title: 'HR / People',
    accent: 'from-amber-500/80 via-orange-500/60 to-orange-900/60',
    files: [],
  },
  {
    id: 'marketing',
    title: 'Marketing',
    accent: 'from-fuchsia-600/80 via-purple-500/60 to-purple-900/60',
    files: [],
  },
  {
    id: 'product-management',
    title: 'Product Management',
    accent: 'from-emerald-600/80 via-teal-500/60 to-emerald-900/60',
    files: [],
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
          <div className="mb-8 rounded-3xl border border-gray-800 bg-gradient-to-r from-gray-900 via-gray-900 to-black p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-accent-300">MBA Vault</p>
            <h2 className="mt-3 text-3xl font-bold text-white">
              Structured like your favourite Drive. Click a folder to reveal files.
            </h2>
            <p className="mt-2 text-sm text-gray-300">
              Minimal surface, zero clutter. Tap “Click to open” to peek inside a folder and grab the
              resources you need.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {mbaFolders.map((folder) => {
              const isExpanded = expandedFolderId === folder.id
              return (
                <div
                  key={folder.id}
                  className={`rounded-3xl border border-white/10 bg-gradient-to-br ${folder.accent} p-6 shadow-xl shadow-black/30 backdrop-blur`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">Folder</p>
                      <h3 className="mt-3 text-2xl font-bold text-white">{folder.title}</h3>
                    </div>
                    <button
                      onClick={() => toggleFolder(folder.id)}
                      className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-300 ${
                        isExpanded ? 'bg-white/90 text-gray-900' : 'bg-white/15 text-white'
                      }`}
                    >
                      {isExpanded ? 'Hide files' : 'Click to open'}
                    </button>
                  </div>
                  {isExpanded && (
                    <div className="mt-6 rounded-2xl border border-white/20 bg-black/20 p-4 shadow-inner shadow-black/40">
                      {folder.files.length > 0 ? (
                        <ul className="space-y-3">
                          {folder.files.map((file) => (
                            <li
                              key={file.id}
                              className="rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white/90"
                            >
                              <div className="flex flex-col gap-1">
                                <div className="flex items-center justify-between">
                                  <p className="font-semibold text-white">{file.name}</p>
                                  <span className="rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-widest text-white/70">
                                    {file.format}
                                  </span>
                                </div>
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

