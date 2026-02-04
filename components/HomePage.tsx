'use client'

import React, { useState, useEffect } from 'react'
import Link from './Link'
import VisitorCounter from './VisitorCounter'
import PillTabs from './PillTabs'
import ContentBox from './ContentBox'

const HomePage = () => {
  const [activeFeatureTab, setActiveFeatureTab] = useState('resume')

  useEffect(() => {
    // Clear any body scroll locks
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
    document.documentElement.style.overflow = ''
    document.documentElement.style.paddingRight = ''
    document.body.style.pointerEvents = 'auto'
    document.documentElement.style.pointerEvents = 'auto'
  }, [])

  const featureTabs = [
    { id: 'resume', label: 'Resume Tools' },
    { id: 'jobs', label: 'Job Search' },
    { id: 'interview', label: 'Interview Prep' },
  ]

  const featuresByCategory = {
    resume: [
      {
        title: 'Create Resume',
        description: 'Build professional resumes with AI-powered templates',
        href: '/build-resume',
        icon: '📝',
      },
      {
        title: 'Check ATS Score',
        description: 'Optimize your resume for Applicant Tracking Systems',
        href: '/ats-score',
        icon: '📊',
      },
      {
        title: 'Custom Cover Letter',
        description: 'Generate personalized cover letters in seconds',
        href: '/cover-letter',
        icon: '✍️',
      },
    ],
    jobs: [
      {
        title: 'Find Relevant Jobs',
        description: 'Discover job opportunities tailored to your skills',
        href: '/find-jobs',
        icon: '🔍',
      },
    ],
    interview: [
      {
        title: 'Practice Interview',
        description: 'Practice with AI-powered interview simulations',
        href: '/free-mock-interview',
        icon: '🎤',
      },
    ],
  }

  const stats = [
    {
      value: '3.4x',
      label: 'Higher callback rate when you check your ATS score first and optimize your resume',
      size: 'large',
    },
    {
      value: '+32',
      label: 'Average ATS score improvement (out of 100) when using our resume builder templates',
      size: 'small',
    },
    {
      value: '58%',
      label:
        'Of job rejections are due to missing exact keywords that appear in the job description',
      size: 'small',
    },
    {
      value: '14,363',
      label:
        "Data from our latest Hiring Index report, giving you real data on what works and what doesn't",
      size: 'small',
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold tracking-tight text-black sm:text-6xl lg:text-7xl">
            Auto Interview AI
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-gray-600">
            AI-powered career tools to help you land your dream job
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/ats-score"
              className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-gray-800"
            >
              Check Your ATS Score
            </Link>
            <Link
              href="/free-resources"
              className="inline-flex items-center justify-center rounded-full border-2 border-black bg-transparent px-8 py-4 text-base font-semibold text-black transition-all duration-200 hover:bg-gray-50"
            >
              Free Resources
            </Link>
          </div>
        </div>
      </section>

      {/* Visitor Counter */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <VisitorCounter />
      </div>

      {/* 2025 Hiring Index Banner */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/blog/auto-interview-ai-2025-hiring-index"
          className="block rounded-2xl border border-gray-200 bg-gray-50 p-6 transition-all duration-200 hover:border-gray-300 hover:shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="text-sm font-semibold text-black">NEW: 2025 Hiring Index</div>
              <div className="mt-1 text-sm text-gray-600">
                Data from 14,000+ resumes analyzed – See why 75% fail ATS screening
              </div>
            </div>
            <div className="ml-4 text-black transition-transform duration-200 hover:translate-x-1">
              →
            </div>
          </div>
        </Link>
      </div>

      {/* Features Section with Pill Tabs */}
      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-black sm:text-5xl">Choose Your Career Tool</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
              Everything you need to land your dream job, powered by AI
            </p>
          </div>

          {/* Pill Tabs */}
          <div className="mt-12 flex justify-center">
            <PillTabs
              tabs={featureTabs}
              activeTab={activeFeatureTab}
              onChange={setActiveFeatureTab}
            />
          </div>

          {/* Feature Cards in Content Box */}
          <div className="mt-8">
            <ContentBox padding="lg" background="warm">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuresByCategory[activeFeatureTab as keyof typeof featuresByCategory].map(
                  (feature, index) => (
                    <Link
                      key={index}
                      href={feature.href}
                      className="group rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-200 hover:border-gray-300 hover:shadow-md"
                    >
                      <div className="mb-4 text-4xl">{feature.icon}</div>
                      <h3 className="text-xl font-semibold text-black">{feature.title}</h3>
                      <p className="mt-3 text-base text-gray-600">{feature.description}</p>
                      <div className="mt-4 flex items-center text-sm font-medium text-black">
                        Get Started
                        <svg
                          className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
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
                      </div>
                    </Link>
                  )
                )}
              </div>
            </ContentBox>
          </div>
        </div>
      </section>

      {/* Stats Section - Premium Design */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl font-bold text-black sm:text-5xl">
            What Actually Works (Data-Backed)
          </h2>

          {/* Featured Large Stat */}
          <div className="mb-8 rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-16 text-center">
            <div className="text-8xl font-bold text-black">3.4x</div>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600">
              Higher callback rate when you check your ATS score first and optimize your resume
              based on the feedback
            </p>
          </div>

          {/* Supporting Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="text-5xl font-bold text-black">+32</div>
              <p className="mt-4 text-base text-gray-600">
                Average ATS score improvement (out of 100) when using our resume builder templates
                designed specifically for ATS parsing
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="text-5xl font-bold text-black">58%</div>
              <p className="mt-4 text-base text-gray-600">
                Of job rejections are due to missing the exact keywords that appear in the job
                description but not in your resume
              </p>
            </div>
            <div className="rounded-2xl border border-gray-200 bg-white p-8">
              <div className="text-5xl font-bold text-black">14,363</div>
              <p className="mt-4 text-base text-gray-600">
                Data from our latest Hiring Index report, giving you real data on what works and
                what doesn't
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Timeline Style */}
      <section className="bg-[#F8F6F3] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-16 text-center text-4xl font-bold text-black sm:text-5xl">
            How It Works
          </h2>

          <div className="space-y-6">
            {[
              {
                step: 1,
                title: 'Upload Your Resume',
                description:
                  'Our AI analyzes your resume against 14,000+ real job postings to identify gaps and opportunities for improvement.',
              },
              {
                step: 2,
                title: 'Get Your ATS Score',
                description:
                  'Receive a detailed score showing how well your resume will perform with Applicant Tracking Systems used by 99% of Fortune 500 companies.',
              },
              {
                step: 3,
                title: 'Apply AI Suggestions',
                description:
                  'Follow our AI-powered recommendations to optimize keywords, formatting, and content for maximum impact.',
              },
              {
                step: 4,
                title: 'Land More Interviews',
                description:
                  'Apply with confidence knowing your resume is optimized to pass ATS screening and impress human recruiters.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                  {item.step}
                </div>
                <div className="flex-1 rounded-2xl border border-gray-200 bg-white p-8">
                  <h3 className="text-xl font-semibold text-black">{item.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-gray-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/ats-score"
              className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-gray-800"
            >
              Check Your ATS Score Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
