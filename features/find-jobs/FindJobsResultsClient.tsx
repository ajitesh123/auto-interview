'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface Job {
  id: string
  title: string
  company: string
  location: string
  link: string
  postedTime: string
}

interface StoredJobResult {
  jobs: Job[]
  searchQuery: string
  location: string
  company: string
  fetchedAt: number
}

const FindJobsResultsClient = () => {
  const router = useRouter()
  const [result, setResult] = useState<StoredJobResult | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.sessionStorage.getItem('jobSearch:lastResult')
    if (!stored) {
      router.replace('/find-jobs')
      return
    }

    try {
      setResult(JSON.parse(stored))
    } catch (error) {
      console.error('Failed to parse stored job results', error)
      router.replace('/find-jobs')
    }
  }, [router])

  if (!result) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-white">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-2 border-accent-500 border-t-transparent"></div>
          <p className="text-gray-300">Loading your job matches...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col px-8 py-12">
      <div className="mb-8 flex flex-col gap-4 text-center text-white md:flex-row md:items-center md:justify-between md:text-left">
        <div>
          <h1 className="text-4xl font-bold">Job Matches Ready</h1>
          <p className="text-gray-300">
            Results for {result.searchQuery || 'your search'}
            {result.location ? ` • ${result.location}` : ''}
            {result.company ? ` • Focused on ${result.company}` : ''}
          </p>
        </div>
        <button
          onClick={() => router.push('/find-jobs')}
          className="rounded-lg border border-accent-500 px-6 py-2 font-semibold text-white transition-colors hover:bg-accent-500/10"
        >
          Start New Search
        </button>
      </div>

      <div className="mb-6 text-sm text-gray-400">
        Retrieved {new Date(result.fetchedAt).toLocaleString()} • {result.jobs.length} jobs found
      </div>

      {result.jobs.length === 0 ? (
        <div className="rounded-2xl border border-yellow-500/50 bg-yellow-900/20 p-6 text-yellow-100">
          No jobs matched your criteria. Try expanding your location or using a broader title.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {result.jobs.map((job) => (
            <div
              key={job.id}
              className="rounded-lg border border-matte-gray bg-matte-dark p-5 transition-colors hover:border-gray-400"
            >
              <div className="flex h-full flex-col">
                <div className="flex-1">
                  <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{job.title}</h3>
                  <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      <span className="truncate">{job.company}</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="truncate">{job.location}</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="truncate">{job.postedTime}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full rounded-lg bg-gradient-to-r from-accent-600 to-accent-700 px-4 py-2 text-center font-semibold text-white transition-colors hover:from-accent-500 hover:to-accent-600"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default FindJobsResultsClient
