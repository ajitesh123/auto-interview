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
  const [jobType, setJobType] = useState('all')
  const [jobs, setJobs] = useState<Job[]>([])
  const [isSearching, setIsSearching] = useState(false)

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
      postedDate: '2 days ago'
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
      postedDate: '1 week ago'
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
      postedDate: '3 days ago'
    }
  ]

  const handleSearch = async () => {
    setIsSearching(true)
    // TODO: Implement actual job search API
    setTimeout(() => {
      setJobs(mockJobs)
      setIsSearching(false)
    }, 1500)
  }

  return (
    <div className="w-full h-full flex flex-col px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6">Find Jobs</h1>
        <p className="text-xl text-white leading-relaxed">
          Discover job opportunities tailored to your skills and experience with AI-powered matching.
        </p>
      </div>

      {/* Search Section */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Job Title</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Product Manager"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA"
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Job Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              >
                <option value="all">All Types</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="remote">Remote</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-pink-400 hover:to-pink-600 transition-colors disabled:opacity-50"
              >
                {isSearching ? 'Searching...' : 'Search Jobs'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {jobs.length > 0 && (
        <div className="w-full max-w-6xl mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-white mb-2">Found {jobs.length} Jobs</h2>
            <p className="text-gray-400">Sorted by match score</p>
          </div>
          
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-pink-500 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                    <div className="flex items-center space-x-4 text-gray-400 mb-2">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {job.company}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span>{job.type}</span>
                      <span>{job.salary}</span>
                    </div>
                    <p className="text-gray-300 mb-4">{job.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Posted {job.postedDate}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-400">Match Score:</span>
                        <span className="bg-pink-500 text-white px-2 py-1 rounded text-sm font-semibold">
                          {job.matchScore}%
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 bg-gradient-to-r from-pink-500 to-pink-700 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-400 hover:to-pink-600 transition-colors">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {jobs.length === 0 && !isSearching && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-pink-500/20 to-pink-700/20 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Start Your Job Search</h3>
          <p className="text-gray-400">Enter your preferences above to find matching opportunities</p>
        </div>
      )}
    </div>
  )
}

export default FindJobsPage
