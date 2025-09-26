'use client'

import { useState } from 'react'

interface Job {
  id: string
  title: string
  company: string
  location: string
  link: string
  postedTime: string
}

const FindJobsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [company, setCompany] = useState('')
  const [jobs, setJobs] = useState<Job[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)
  const [loadingProgress, setLoadingProgress] = useState(0)

  const handleSearch = async () => {
    setIsSearching(true)
    setJobs([]) // Clear previous results
    setSearchError(null) // Clear previous errors
    setLoadingProgress(0)

    // Start loading progress animation (40 seconds total for 200 jobs)
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 2.5 // 100% in 40 seconds (100/40 = 2.5% per second)
      })
    }, 1000)

    try {
      console.log('Searching for LinkedIn jobs with:', { searchQuery, location, company })

      const response = await fetch('/api/jobs/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchQuery,
          location,
          company,
          experience: '', // Not used in current scraper
          category: '', // Not used in current scraper
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to fetch jobs')
      }

      const result = await response.json()

      if (result.success) {
        console.log(`Found ${result.jobs.length} jobs`)
        setJobs(result.jobs)
        if (result.jobs.length === 0) {
          setSearchError(
            'No jobs found matching your criteria. Try adjusting your search parameters.'
          )
        }
      } else {
        console.error('Scraping failed:', result.error)
        setSearchError('Failed to fetch jobs from LinkedIn. Please try again.')
      }
    } catch (error) {
      console.error('Error searching for jobs:', error)
      setSearchError('An error occurred while searching for jobs. Please try again.')
    } finally {
      clearInterval(progressInterval)
      setIsSearching(false)
    }
  }

  return (
    <div className="flex h-full w-full flex-col bg-matte-black px-8 py-12">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-4xl text-center">
        <h1 className="mb-6 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-5xl font-bold text-transparent">
          Find Jobs
        </h1>
        <p className="text-xl leading-relaxed text-white">
          Discover job opportunities tailored to your skills and experience with AI-powered
          matching.
        </p>
      </div>

      {/* Search Section */}
      <div className="mx-auto mb-8 w-full max-w-4xl">
        <div className="rounded-lg border border-matte-gray bg-matte-dark p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-white">Job Title</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Product Manager"
                className="w-full rounded-lg border border-matte-gray bg-matte-light px-4 py-2 text-white focus:border-accent-500 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-white">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="w-full rounded-lg border border-matte-gray bg-matte-light px-4 py-2 text-white focus:border-accent-500 focus:outline-none"
              />
            </div>
            <div className="flex-1">
              <label className="mb-2 block text-sm font-medium text-white">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google, Microsoft"
                className="w-full rounded-lg border border-matte-gray bg-matte-light px-4 py-2 text-white focus:border-accent-500 focus:outline-none"
              />
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-8 py-2 font-semibold text-white transition-colors hover:from-accent-400 hover:to-accent-500 disabled:opacity-50 lg:w-auto"
              >
                {isSearching ? 'Searching...' : 'Search Jobs'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {searchError && (
        <div className="mx-auto mb-8 w-full max-w-4xl">
          <div className="rounded-lg border border-red-500 bg-red-900/20 p-4">
            <div className="flex items-center">
              <svg
                className="mr-3 h-5 w-5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-300">{searchError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Results Section */}
      {jobs.length > 0 && (
        <div className="mx-auto w-full max-w-6xl">
          <div className="mb-6">
            <h2 className="mb-2 text-2xl font-bold text-white">Found {jobs.length} Jobs</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-lg border border-matte-gray bg-matte-dark p-4 transition-colors hover:border-gray-400"
              >
                <div className="flex h-full flex-col">
                  <div className="flex-1">
                    <h3 className="mb-2 line-clamp-2 text-lg font-bold text-white">{job.title}</h3>

                    <div className="mb-3 space-y-2 text-sm text-gray-400">
                      <div className="flex items-center">
                        <svg
                          className="mr-2 h-4 w-4 flex-shrink-0"
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
                          className="mr-2 h-4 w-4 flex-shrink-0"
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
                          className="mr-2 h-4 w-4 flex-shrink-0"
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
                      className="block w-full rounded-lg bg-gradient-to-r from-pink-700 to-pink-900 px-4 py-2 text-center font-semibold text-white transition-colors hover:from-pink-600 hover:to-pink-800"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading State with Progress Bar */}
      {isSearching && (
        <div className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-pink-700/20 to-pink-900/20">
            <svg
              className="h-12 w-12 animate-spin text-pink-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </div>
          <h3 className="mb-4 text-xl font-semibold text-white">Searching the best jobs for you</h3>
          <p className="mb-6 text-gray-400">Scraping LinkedIn for the best job opportunities...</p>

          {/* Progress Bar */}
          <div className="mx-auto max-w-md">
            <div className="mb-2 flex justify-between text-sm text-gray-400">
              <span>Progress</span>
              <span>{Math.round(loadingProgress)}%</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-700">
              <div
                className="h-2 rounded-full bg-gradient-to-r from-accent-500 to-accent-600 transition-all duration-1000 ease-out"
                style={{ width: `${loadingProgress}%` }}
              ></div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              This may take up to 40 seconds to find the best matches
            </p>
          </div>
        </div>
      )}

      {/* Empty State */}
      {jobs.length === 0 && !isSearching && (
        <div className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-accent-500/20 to-accent-600/20">
            <svg
              className="h-12 w-12 text-accent-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-white">Start Your Job Search</h3>
          <p className="text-gray-400">
            Enter your preferences above to find matching opportunities
          </p>
        </div>
      )}
    </div>
  )
}

export default FindJobsPage
