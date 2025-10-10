'use client'

import { useState, useEffect } from 'react'
import Link from './Link'
import SearchButton from './SearchButton'
import MinimalFooter from './MinimalFooter'
import Logo from './Logo'
import VisitorCounter from './VisitorCounter'
import { BuildResumePage } from '../features/build-resume'
import { ATSScorePage } from '../features/ats-score'
import { FindJobsPage } from '../features/find-jobs'
// import { AssessmentsPage } from '../features/assessments' // Removed - now redirects to Tough Tongue AI
import { CoverLetterPage } from '../features/cover-letter'

const HomePage = () => {
  const [activePage, setActivePage] = useState('home')
  const [buildResumeKey, setBuildResumeKey] = useState(0)

  // Visitor tracking is now handled by VisitorCounter component

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
      href: '/build-resume',
    },
    {
      id: 'ats-score',
      title: 'Check Resume ATS Score',
      description: 'Optimize your resume for Applicant Tracking Systems',
      href: '/ats-score',
    },
    {
      id: 'find-jobs',
      title: 'Find Relevant Jobs',
      description: 'Discover job opportunities tailored to your skills',
      href: '/find-jobs',
    },
    {
      id: 'assessments',
      title: 'Practice Interview',
      description: 'Practice with AI-powered interview simulations',
      href: 'https://app.toughtongueai.com/',
      external: true,
    },
    {
      id: 'cover-letter',
      title: 'Generate Custom Cover Letter',
      description: 'Create personalized cover letters',
      href: '/cover-letter',
    },
  ]

  const handleFeatureClick = (feature: any) => {
    console.log('Feature clicked:', feature.id)

    if (feature.external) {
      window.open(feature.href, '_blank')
    } else {
      window.location.href = feature.href
    }
  }

  const renderHomePage = () => {
    return (
      <div className="min-h-screen">
        <div className="relative">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-6xl xl:text-7xl">
                <span className="animate-pulse-glow bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                  Auto Interview AI
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-2xl text-base text-chatgpt-textSecondary sm:mt-6 sm:text-lg sm:text-xl">
                Auto Interview AI (Autointerviewai) - AI-powered career tools to help you land your
                dream job.
              </p>
            </div>
          </div>
        </div>

        {/* Visitor Counter Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <VisitorCounter />
        </div>

        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="mb-4 text-center sm:mb-6">
            <h2 className="text-2xl font-bold text-chatgpt-text sm:text-3xl lg:text-4xl">
              Choose Your Career Tool
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-5">
            {features.map((feature, index) => (
              <div
                key={feature.id}
                onClick={() => handleFeatureClick(feature)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleFeatureClick(feature)
                  }
                }}
                role="button"
                tabIndex={0}
                className="group relative animate-slide-up cursor-pointer rounded-xl border border-matte-gray bg-matte-dark p-4 transition-all duration-500 hover:-translate-y-2 hover:scale-105 hover:border-gray-400 hover:bg-matte-light hover:shadow-xl hover:shadow-gray-500/20 sm:p-6 lg:p-8"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 transition-all duration-500 group-hover:w-16 sm:mb-6 sm:w-16 sm:group-hover:w-20"></div>
                  <h3 className="text-lg font-semibold text-chatgpt-text transition-colors duration-300 group-hover:text-chatgpt-textSecondary sm:text-xl">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-xs text-chatgpt-textSecondary transition-colors duration-300 group-hover:text-chatgpt-text sm:mt-4 sm:text-sm">
                    {feature.description}
                  </p>
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
      // assessments case removed - now redirects to Tough Tongue AI
      case 'cover-letter':
        return <CoverLetterPage />
      default:
        return renderHomePage()
    }
  }

  return <div className="w-full flex-1 overflow-auto">{renderMainContent()}</div>
}

export default HomePage
