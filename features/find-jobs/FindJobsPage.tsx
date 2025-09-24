'use client'

import { useState } from 'react'

interface Job {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  description: string
  matchScore: number
  postedDate: string
}

const FindJobsPage = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [location, setLocation] = useState('')
  const [company, setCompany] = useState('')
  const [experience, setExperience] = useState('')
  const [jobs, setJobs] = useState<Job[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [searchError, setSearchError] = useState<string | null>(null)

  // Mock job data - replace with actual API calls
  const mockJobs: Job[] = [
    {
      id: '1',
      title: 'Senior Product Manager',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120k - $150k',
      description: 'Lead product strategy and development for our core platform...',
      matchScore: 95,
      postedDate: '2 days ago',
    },
    {
      id: '2',
      title: 'Product Manager - AI/ML',
      company: 'AI Solutions Inc',
      location: 'Remote',
      type: 'Full-time',
      salary: '$110k - $140k',
      description: 'Drive AI product initiatives and work with cross-functional teams...',
      matchScore: 88,
      postedDate: '1 week ago',
    },
    {
      id: '3',
      title: 'Associate Product Manager',
      company: 'StartupXYZ',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$80k - $100k',
      description: 'Support product development and work closely with engineering...',
      matchScore: 82,
      postedDate: '3 days ago',
    },
  ]

  const handleSearch = async () => {
    setIsSearching(true)
    setJobs([]) // Clear previous results
    setSearchError(null) // Clear previous errors

    try {
      console.log('Searching for jobs with:', { searchQuery, location, company, experience })

      const response = await fetch('/api/jobs/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          searchQuery,
          location,
          company,
          experience,
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
        setSearchError('Failed to fetch jobs from the job portal. Please try again.')
        // Fallback to mock data if scraping fails
        setJobs(mockJobs)
      }
    } catch (error) {
      console.error('Error searching for jobs:', error)
      setSearchError('An error occurred while searching for jobs. Please try again.')
      // Fallback to mock data on error
      setJobs(mockJobs)
    } finally {
      setIsSearching(false)
    }
  }

  return (
    <div className="flex h-full w-full flex-col px-8 py-12">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-bold text-white">Find Jobs</h1>
        <p className="text-xl leading-relaxed text-white">
          Discover job opportunities tailored to your skills and experience with AI-powered
          matching.
        </p>
      </div>

      {/* Search Section */}
      <div className="mx-auto mb-8 w-full max-w-4xl">
        <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Job Title</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Product Manager"
                className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:border-pink-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:border-pink-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google, Microsoft"
                className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:border-pink-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white">
                Min Experience (Years)
              </label>
              <input
                type="number"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 3"
                min="0"
                max="20"
                className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:border-pink-700 focus:outline-none"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full rounded-lg bg-gradient-to-r from-pink-700 to-pink-900 px-6 py-2 font-semibold text-white transition-colors hover:from-pink-600 hover:to-pink-800 disabled:opacity-50"
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
            <p className="text-gray-400">Sorted by match score</p>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="rounded-lg border border-gray-700 bg-gray-900 p-6 transition-colors hover:border-pink-700"
              >
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-bold text-white">{job.title}</h3>
                    <div className="mb-2 flex items-center space-x-4 text-gray-400">
                      <span className="flex items-center">
                        <svg
                          className="mr-1 h-4 w-4"
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
                        {job.company}
                      </span>
                      <span className="flex items-center">
                        <svg
                          className="mr-1 h-4 w-4"
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
                        {job.location}
                      </span>
                      {job.experience && (
                        <span className="flex items-center">
                          <svg
                            className="mr-1 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {job.experience}
                        </span>
                      )}
                      {job.salary && job.salary !== 'Not specified' && (
                        <span className="flex items-center">
                          <svg
                            className="mr-1 h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                            />
                          </svg>
                          {job.salary}
                        </span>
                      )}
                    </div>
                    <p className="mb-4 text-gray-300">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Posted {job.postedTime || job.postedDate}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Match Score:</span>
                        <span className="rounded bg-pink-700 px-2 py-1 text-sm font-semibold text-white">
                          {job.matchScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-4 rounded-lg bg-gradient-to-r from-pink-700 to-pink-900 px-4 py-2 font-semibold text-white transition-colors hover:from-pink-600 hover:to-pink-800"
                  >
                    Apply Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {jobs.length === 0 && !isSearching && (
        <div className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-pink-700/20 to-pink-900/20">
            <svg
              className="h-12 w-12 text-pink-700"
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
