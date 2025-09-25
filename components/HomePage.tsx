'use client'

import { useState, useEffect } from 'react'
import Link from './Link'
import SearchButton from './SearchButton'
import MinimalFooter from './MinimalFooter'
import { BuildResumePage } from '../features/build-resume'
import { ATSScorePage } from '../features/ats-score'
import { FindJobsPage } from '../features/find-jobs'
import { AssessmentsPage } from '../features/assessments'
import { CoverLetterPage } from '../features/cover-letter'

const HomePage = () => {
  const [activePage, setActivePage] = useState('home')
  const [buildResumeKey, setBuildResumeKey] = useState(0)

  // Clear any body scroll locks that might be preventing clicks
  useEffect(() => {
    // Clear body scroll locks
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    document.documentElement.style.overflow = ''
    document.documentElement.style.paddingRight = ''

    // Ensure pointer events are enabled
    document.body.style.pointerEvents = 'auto'
    document.documentElement.style.pointerEvents = 'auto'

    // Add a test click handler to see if clicks are working
    const testClick = () => {
      console.log('Test click detected - clicks are working!')
    }

    document.addEventListener('click', testClick)

    return () => {
      document.removeEventListener('click', testClick)
    }
  }, [])

  const features = [
    {
      id: 'build-resume',
      title: 'Create Resume',
      description: 'Build professional resumes with AI-powered templates',
      icon: '📄',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'ats-score',
      title: 'Check Resume ATS Score',
      description: 'Optimize your resume for Applicant Tracking Systems',
      icon: '🎯',
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      id: 'find-jobs',
      title: 'Find Relevant Jobs',
      description: 'Discover job opportunities tailored to your skills',
      icon: '🔍',
      gradient: 'from-green-500 to-emerald-500',
    },
    {
      id: 'assessments',
      title: 'Take Assessments',
      description: 'Practice with AI-powered assessments',
      icon: '🧠',
      gradient: 'from-orange-500 to-red-500',
    },
    {
      id: 'cover-letter',
      title: 'Generate Custom Cover Letter',
      description: 'Create personalized cover letters',
      icon: '✍️',
      gradient: 'from-indigo-500 to-purple-500',
    },
  ]

  const handleFeatureClick = (featureId: string) => {
    console.log('Feature clicked:', featureId)
    setActivePage(featureId)
    if (featureId === 'build-resume') {
      setBuildResumeKey((prev) => prev + 1)
    }
  }

  const renderHomePage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10"></div>

          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Auto Interview
                </span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300 sm:text-xl">
                AI-powered career tools to help you land your dream job.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Choose Your Career Tool</h2>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {features.map((feature) => (
              <div
                key={feature.id}
                onClick={() => handleFeatureClick(feature.id)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl bg-gray-800/50 p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative z-10">
                  <div className="mb-4 text-4xl">{feature.icon}</div>
                  <h3 className="mb-3 text-xl font-bold text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderMainContent = () => {
    switch (activePage) {
      case 'build-resume':
        return <BuildResumePage key={buildResumeKey} />
      case 'ats-score':
        return <ATSScorePage />
      case 'find-jobs':
        return <FindJobsPage />
      case 'assessments':
        return <AssessmentsPage />
      case 'cover-letter':
        return <CoverLetterPage />
      default:
        return renderHomePage()
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <div className="flex w-full flex-col border-b border-gray-700 bg-gray-900 p-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
          <div className="mb-6">
            <h1 className="mb-2 text-lg font-bold text-white sm:text-xl">Auto Interview</h1>
            <p className="text-xs text-gray-400 sm:text-sm">AI-powered career tools</p>
          </div>

          <nav className="flex-1 space-y-1">
            <button
              onClick={() => setActivePage('home')}
              className={`w-full rounded-lg px-3 py-2 text-left text-xs transition-colors sm:text-sm ${
                activePage === 'home'
                  ? 'bg-gradient-to-r from-pink-700 to-pink-900 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              Home
            </button>
            {features.map((feature) => (
              <button
                key={feature.id}
                onClick={() => handleFeatureClick(feature.id)}
                className={`w-full rounded-lg px-3 py-2 text-left text-xs transition-colors sm:text-sm ${
                  activePage === feature.id
                    ? 'bg-gradient-to-r from-pink-700 to-pink-900 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {feature.title}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex min-h-screen flex-1 flex-col">
          <div className="flex items-center justify-end border-b border-gray-700 p-4 sm:p-6">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button
                onClick={() => setActivePage('home')}
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white sm:text-base"
              >
                Home
              </button>
              <Link
                href="/blog"
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white sm:text-base"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white sm:text-base"
              >
                About
              </Link>
              <Link
                href="https://app.toughtongueai.com/"
                className="text-sm font-medium text-gray-400 transition-colors hover:text-white sm:text-base"
              >
                Tough Tongue AI
              </Link>
              <SearchButton />
            </div>
          </div>

          <div className="w-full flex-1 overflow-auto">{renderMainContent()}</div>
        </div>
      </div>
      <MinimalFooter />
    </div>
  )
}

export default HomePage
