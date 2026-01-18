'use client'

import React, { useState, useEffect } from 'react'
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
      href: '/free-mock-interview',
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
        <div className="relative overflow-hidden">
          {/* Animated background grid */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-purple-500/10 blur-3xl" />
            <div
              className="absolute right-1/4 top-1/3 h-80 w-80 animate-pulse rounded-full bg-purple-600/5 blur-3xl"
              style={{ animationDelay: '1s' }}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-6xl xl:text-7xl">
                <span className="animate-pulse-glow bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
                  Auto Interview AI
                </span>
              </h1>
              <p className="mx-auto mt-4 max-w-4xl text-sm leading-relaxed tracking-wide text-gray-400 sm:mt-6 sm:text-base lg:text-lg">
                <span className="bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text font-medium text-transparent">
                  Auto Interview AI (Autointerviewai)
                </span>{' '}
                &middot;{' '}
                <span className="text-gray-300">
                  AI-powered career tools to help you land your dream job
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Visitor Counter Section */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <VisitorCounter />
        </div>

        {/* 2025 Hiring Index Banner */}
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href="/blog/auto-interview-ai-2025-hiring-index"
            className="block rounded-lg border border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-4 transition-all duration-300 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/20"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="text-sm font-semibold text-purple-300">NEW: 2025 Hiring Index</div>
                <div className="mt-1 text-xs text-gray-400">
                  Data from 14,000+ resumes analyzed – See why 75% fail ATS screening
                </div>
              </div>
              <div className="ml-4 text-purple-400 transition-transform duration-300 group-hover:translate-x-1">
                →
              </div>
            </div>
          </Link>
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
                className="group relative animate-slide-up cursor-pointer rounded-xl border border-matte-gray bg-matte-dark/50 p-4 shadow-lg backdrop-blur-sm transition-all duration-500 hover:-translate-y-3 hover:rotate-1 hover:scale-[1.03] hover:border-purple-400 hover:bg-matte-light hover:shadow-2xl hover:shadow-purple-500/30 sm:p-6 lg:p-8"
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

          {/* Free Resources Library - Helper Tool */}
          <div className="mt-8 flex justify-center">
            <Link
              href="/free-resources"
              className="group inline-flex items-center gap-3 rounded-lg border border-gray-700 bg-matte-dark px-6 py-3 transition-colors hover:border-gray-600 hover:bg-matte-light"
            >
              <svg
                className="h-5 w-5 text-gray-400 transition-colors group-hover:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <span className="text-sm font-medium text-gray-300 transition-colors group-hover:text-white">
                Free Resources Library
              </span>
              <svg
                className="h-4 w-4 text-gray-500 transition-all group-hover:translate-x-1 group-hover:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>

          {/* User-Focused Content Sections */}
          <div className="mt-20 space-y-20 sm:mt-24 sm:space-y-24 lg:mt-28 lg:space-y-28">
            {/* Why This Exists Section */}
            <div className="mx-auto max-w-4xl animate-fade-in-up text-center opacity-0">
              <h2 className="mb-6 text-2xl font-bold text-chatgpt-text sm:text-3xl lg:text-4xl">
                The Job Search Problem Nobody Talks About
              </h2>
              <div className="space-y-5 text-left text-base leading-relaxed text-gray-300 sm:text-lg">
                <p>
                  You spend hours crafting the perfect resume. You apply to dozens of jobs. And
                  then... nothing. No response. No interview. Just silence.
                </p>
                <p>
                  Here's what most people don't realize:{' '}
                  <strong className="text-white">
                    75% of resumes never reach a human recruiter
                  </strong>
                  . They're automatically rejected by ATS (Applicant Tracking Systems) before anyone
                  even sees your qualifications.
                </p>
                <p>
                  The system isn't broken - it's just that no one taught you how to work with it.
                  Companies use software to filter thousands of applications, and if your resume
                  doesn't match their exact format and keywords, you're out.
                </p>
              </div>
            </div>

            {/* How We Help Section */}
            <div
              className="animate-fade-in-up rounded-xl border border-chatgpt-border bg-chatgpt-card p-6 opacity-0 shadow-lg sm:p-8"
              style={{ animationDelay: '0.1s' }}
            >
              <h2 className="mb-6 text-2xl font-bold text-chatgpt-text sm:text-3xl lg:text-4xl">
                What Actually Works (Data-Backed)
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:gap-8">
                <div className="group rounded-lg border border-chatgpt-border bg-chatgpt-input p-6 shadow-md transition-all hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="mb-3 text-5xl font-extrabold text-purple-400 transition-all group-hover:scale-110 group-hover:text-purple-300">
                    3.4x
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Higher callback rate when you check your ATS score first and optimize your
                    resume based on the feedback
                  </p>
                </div>
                <div className="group rounded-lg border border-chatgpt-border bg-chatgpt-input p-6 shadow-md transition-all hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="mb-3 text-5xl font-extrabold text-purple-400 transition-all group-hover:scale-110 group-hover:text-purple-300">
                    +32
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Average ATS score improvement (out of 100) when using our resume builder
                    templates designed specifically for ATS parsing
                  </p>
                </div>
                <div className="group rounded-lg border border-chatgpt-border bg-chatgpt-input p-6 shadow-md transition-all hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="mb-3 text-5xl font-extrabold text-purple-400 transition-all group-hover:scale-110 group-hover:text-purple-300">
                    58%
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Of resume rejections are due to missing the exact keywords that appear in the
                    job description but not in your resume
                  </p>
                </div>
                <div className="group rounded-lg border border-chatgpt-border bg-chatgpt-input p-6 shadow-md transition-all hover:border-purple-400 hover:shadow-lg hover:shadow-purple-500/20">
                  <div className="mb-3 text-5xl font-extrabold text-purple-400 transition-all group-hover:scale-110 group-hover:text-purple-300">
                    14,363
                  </div>
                  <p className="text-sm leading-relaxed text-gray-300">
                    Resumes analyzed in our latest Hiring Index report, giving you real data on what
                    works and what doesn't
                  </p>
                </div>
              </div>
            </div>

            {/* What Makes Us Different */}
            <div
              className="mx-auto max-w-4xl animate-fade-in-up opacity-0"
              style={{ animationDelay: '0.2s' }}
            >
              <h2 className="mb-8 text-center text-2xl font-bold text-chatgpt-text sm:text-3xl">
                Why People Choose This Over Everything Else
              </h2>
              <div className="space-y-6">
                <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-6">
                  <h3 className="mb-3 text-xl font-semibold text-chatgpt-text">
                    Everything You Need in One Place
                  </h3>
                  <p className="text-chatgpt-textSecondary">
                    Most platforms make you juggle multiple subscriptions: one for resume building,
                    another for ATS checking, a third for job searching, and more for interview
                    prep. We built everything into one platform because switching between tools
                    wastes your time and money.
                  </p>
                </div>

                <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-6">
                  <h3 className="mb-3 text-xl font-semibold text-chatgpt-text">
                    No Hidden Costs or Paywalls
                  </h3>
                  <p className="text-chatgpt-textSecondary">
                    Job searching is stressful enough without worrying about subscription fees. Our
                    core tools are free because we believe everyone deserves a fair shot at landing
                    their dream job, regardless of their current financial situation.
                  </p>
                </div>

                <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-6">
                  <h3 className="mb-3 text-xl font-semibold text-chatgpt-text">
                    Built on Real Data, Not Guesswork
                  </h3>
                  <p className="text-chatgpt-textSecondary">
                    We analyze thousands of real ATS scans and job matches every quarter. Our
                    recommendations aren't based on outdated "resume tips from 2015" - they're based
                    on what's actually working right now in 2025 for people landing interviews and
                    offers.
                  </p>
                </div>

                <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-6">
                  <h3 className="mb-3 text-xl font-semibold text-chatgpt-text">
                    Simple, Not Overwhelming
                  </h3>
                  <p className="text-chatgpt-textSecondary">
                    Other platforms bury you in features you don't need. We focus on what actually
                    matters: getting your resume past ATS, finding relevant jobs, and preparing for
                    interviews. No fluff, no feature bloat, just what works.
                  </p>
                </div>
              </div>

              <div className="mt-10 text-center">
                <Link
                  href="/about"
                  className="inline-flex items-center rounded-lg border-2 border-purple-500 bg-transparent px-6 py-3 font-semibold text-purple-400 transition-all hover:border-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
                >
                  Learn More About Our Mission
                  <svg
                    className="ml-2 h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Real Results Section */}
            <div
              className="animate-fade-in-up rounded-xl border border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 opacity-0 sm:p-8"
              style={{ animationDelay: '0.3s' }}
            >
              <h2 className="mb-6 text-center text-2xl font-bold text-chatgpt-text sm:text-3xl">
                What Happens When You Follow the Process
              </h2>
              <div className="mx-auto max-w-3xl space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">
                    1
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-chatgpt-text">Check Your ATS Score</h3>
                    <p className="text-sm text-chatgpt-textSecondary">
                      Upload your current resume and see exactly what's blocking you. Most people
                      discover they're missing critical keywords that appear in 80%+ of job
                      descriptions in their field.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">
                    2
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-chatgpt-text">
                      Rebuild with ATS-Friendly Templates
                    </h3>
                    <p className="text-sm text-chatgpt-textSecondary">
                      Use our templates that are specifically designed to pass ATS parsing. The
                      average improvement is +32 points on your ATS score - enough to move from
                      auto-reject to interview pile.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">
                    3
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-chatgpt-text">Find the Right Jobs</h3>
                    <p className="text-sm text-chatgpt-textSecondary">
                      Stop wasting time on jobs you're not qualified for. Our job matching shows you
                      roles that actually match your skills and experience level, filtered by your
                      preferences.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-purple-600 text-lg font-bold text-white">
                    4
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-chatgpt-text">Apply with Confidence</h3>
                    <p className="text-sm text-chatgpt-textSecondary">
                      Generate custom cover letters that reinforce your ATS keywords and tell your
                      story. Then practice interviews with AI before the real thing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Final CTA Section */}
            <div
              className="mx-auto max-w-2xl animate-fade-in-up text-center opacity-0"
              style={{ animationDelay: '0.4s' }}
            >
              <h2 className="mb-4 text-2xl font-bold text-chatgpt-text sm:text-3xl">
                Ready to Stop Getting Ignored?
              </h2>
              <p className="mb-6 text-base text-chatgpt-textSecondary sm:text-lg">
                Start with the ATS Score Checker. It takes 60 seconds and shows you exactly what's
                wrong with your current resume.
              </p>
              <Link
                href="/ats-score"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 px-6 py-3 font-semibold text-white shadow-lg shadow-purple-500/50 transition-all hover:scale-105 hover:from-purple-500 hover:to-purple-400 hover:shadow-xl hover:shadow-purple-500/60 sm:px-8 sm:py-4 sm:text-lg"
              >
                Check Your ATS Score (Free)
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
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
