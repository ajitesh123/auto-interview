'use client'

import { useState } from 'react'
import Link from 'next/link'

// Nov 2026: this tool used to scrape LinkedIn, which LinkedIn's terms forbid.
// It now builds search links so candidates open each job board's own results directly.

interface Board {
  name: string
  note: string
  url: string
}

const enc = encodeURIComponent
const slug = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

function buildBoards(keywords: string, location: string): Board[] {
  const q = keywords.trim()
  const l = location.trim()
  return [
    {
      name: 'LinkedIn Jobs',
      note: 'Largest global listing; filter by date posted and experience level',
      url: `https://www.linkedin.com/jobs/search/?keywords=${enc(q)}${l ? `&location=${enc(l)}` : ''}`,
    },
    {
      name: 'Naukri',
      note: 'Best coverage for India, including campus and fresher roles',
      url: `https://www.naukri.com/${slug(q) || 'all'}-jobs${l ? `-in-${slug(l)}` : ''}`,
    },
    {
      name: 'Indeed',
      note: 'Broad US coverage, including smaller employers',
      url: `https://www.indeed.com/jobs?q=${enc(q)}${l ? `&l=${enc(l)}` : ''}`,
    },
    {
      name: 'Google Jobs',
      note: 'Pulls listings from many boards and company career pages at once',
      url: `https://www.google.com/search?q=${enc(`${q} jobs${l ? ` in ${l}` : ''}`)}&ibp=htl;jobs`,
    },
  ]
}

const PREP_LINKS = [
  { href: '/aipm', label: 'AI Product Manager interview guide' },
  { href: '/fde', label: 'Forward Deployed Engineer interview guide' },
  { href: '/gtm-engineer', label: 'GTM Engineer interview guide' },
  { href: '/ai-engineer', label: 'AI Engineer interview guide' },
  { href: '/ats-score', label: 'Check your resume against ATS filters' },
  { href: '/free-mock-interview', label: 'Free AI mock interview' },
]

const inputClass =
  'w-full rounded-lg border border-matte-gray bg-matte-light px-4 py-2 text-white focus:border-accent-500 focus:outline-none'

const FindJobsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [company, setCompany] = useState('')
  const [boards, setBoards] = useState<Board[]>([])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const keywords = [searchQuery, company].filter((s) => s.trim()).join(' ')
    if (!keywords) return
    setBoards(buildBoards(keywords, location))
  }

  return (
    <div className="flex h-full w-full flex-col px-8 py-12">
      <div className="mx-auto mb-8 max-w-4xl text-center">
        <h1 className="from-accent-400 mb-6 bg-gradient-to-r via-accent-500 to-accent-600 bg-clip-text text-5xl font-bold text-transparent">
          Find Jobs
        </h1>
        <p className="text-xl leading-relaxed text-white">
          Search once, then open matching jobs on LinkedIn, Naukri, Indeed and Google Jobs.
        </p>
      </div>

      <form onSubmit={handleSearch} className="mx-auto mb-8 w-full max-w-4xl">
        <div className="border-matte-gray bg-matte-dark rounded-lg border p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="flex-1">
              <label htmlFor="job-title" className="mb-2 block text-sm font-medium text-white">
                Job title
              </label>
              <input
                id="job-title"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Product Manager"
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="job-location" className="mb-2 block text-sm font-medium text-white">
                Location
              </label>
              <input
                id="job-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Bengaluru or Remote"
                className={inputClass}
              />
            </div>
            <div className="flex-1">
              <label htmlFor="job-company" className="mb-2 block text-sm font-medium text-white">
                Company (optional)
              </label>
              <input
                id="job-company"
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google"
                className={inputClass}
              />
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="hover:from-accent-400 w-full rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-8 py-2 font-semibold text-white transition-colors hover:to-accent-500 lg:w-auto"
              >
                Search jobs
              </button>
            </div>
          </div>
        </div>
      </form>

      {boards.length > 0 ? (
        <div className="mx-auto w-full max-w-4xl">
          <h2 className="mb-4 text-2xl font-bold text-white">Open your results</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {boards.map((b) => (
              <a
                key={b.name}
                href={b.url}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="border-matte-gray bg-matte-dark block rounded-lg border p-5 transition-colors hover:border-accent-500"
              >
                <span className="mb-1 block text-lg font-semibold text-white">{b.name} ↗</span>
                <span className="text-sm text-gray-400">{b.note}</span>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="py-8 text-center">
          <h3 className="mb-2 text-xl font-semibold text-white">Start your job search</h3>
          <p className="text-gray-400">
            Enter a job title above. Location and company are optional.
          </p>
        </div>
      )}

      <div className="mx-auto mt-12 w-full max-w-4xl">
        <h2 className="mb-4 text-xl font-semibold text-white">Before you apply</h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {PREP_LINKS.map((p) => (
            <li key={p.href}>
              <Link href={p.href} className="text-accent-400 underline underline-offset-4">
                {p.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default FindJobsPage
