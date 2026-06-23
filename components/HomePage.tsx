'use client'

import React, { useState, useEffect } from 'react'
import Link from './Link'
import VisitorCounter from './VisitorCounter'
import PillTabs from './PillTabs'
import ContentBox from './ContentBox'
import Calculator from './Calculator'

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
        title: 'Resume Builder',
        description: 'AI-powered resumes, ATS-ready in 2 minutes',
        href: '/build-resume',
        icon: '📝',
      },
      {
        title: 'ATS Score Checker',
        description: 'Optimize your resume for Applicant Tracking Systems',
        href: '/ats-score',
        icon: '📊',
      },
      {
        title: 'Cover Letter',
        description: 'Generate personalized cover letters in seconds',
        href: '/cover-letter',
        icon: '✍️',
      },
    ],
    jobs: [
      {
        title: 'Find Jobs',
        description: 'Discover opportunities tailored to your profile',
        href: '/find-jobs',
        icon: '🔍',
      },
    ],
    interview: [
      {
        title: 'Mock Interview',
        description: 'AI-powered interview simulations with real-time feedback',
        href: '/free-mock-interview',
        icon: '🎤',
      },
    ],
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <h1
            className="text-5xl font-normal tracking-tight text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Career Intelligence Platform
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl leading-relaxed text-[hsl(240,4%,66%)]">
            AI-powered career tools to help you outperform 95% of candidates
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/ats-score"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-200 hover:bg-white/90"
            >
              Check Your ATS Score
            </Link>
            <Link
              href="/#domains"
              className="liquid-glass inline-flex items-center justify-center rounded-full px-8 py-4 text-base font-semibold text-white transition-all duration-200 hover:bg-white/5"
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

      {/* Calculator Integration */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2
            className="text-3xl text-white sm:text-4xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Calculate Your ROI
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-[hsl(240,4%,66%)]">
            See exactly how much time and money you save by automating your job prep with AI.
          </p>
        </div>
        <Calculator />
      </div>

      {/* Features Section */}
      <section className="border-t border-white/[0.08] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2
              className="text-4xl text-white sm:text-5xl"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Your Career Toolkit
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-[hsl(240,4%,66%)]">
              Everything you need to land your dream role, powered by AI
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

          {/* Feature Cards */}
          <div className="mt-8">
            <ContentBox padding="lg" background="warm">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuresByCategory[activeFeatureTab as keyof typeof featuresByCategory].map(
                  (feature, index) => (
                    <Link
                      key={index}
                      href={feature.href}
                      className="group rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.05]"
                    >
                      <div className="mb-4 text-4xl">{feature.icon}</div>
                      <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                      <p className="mt-3 text-base text-[hsl(240,4%,66%)]">{feature.description}</p>
                      <div className="mt-4 flex items-center text-sm font-medium text-[hsl(240,4%,66%)] group-hover:text-white transition-colors">
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

      {/* Stats Section */}
      <section className="border-t border-white/[0.08] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mb-16 text-center text-4xl text-white sm:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            The data speaks for itself
          </h2>

          {/* Featured Large Stat */}
          <div className="mb-8 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-16 text-center">
            <div
              className="text-8xl text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              3.4×
            </div>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-[hsl(240,4%,66%)]">
              Higher callback rate when you optimize your resume with ATS intelligence first
            </p>
          </div>

          {/* Supporting Stats Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
              <div
                className="text-5xl text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                +32
              </div>
              <p className="mt-4 text-base text-[hsl(240,4%,66%)]">
                Average ATS score improvement using our AI resume builder templates
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
              <div
                className="text-5xl text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                58%
              </div>
              <p className="mt-4 text-base text-[hsl(240,4%,66%)]">
                Of rejections trace back to missing exact keywords from the job description
              </p>
            </div>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
              <div
                className="text-5xl text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                14,363
              </div>
              <p className="mt-4 text-base text-[hsl(240,4%,66%)]">
                Real resumes analyzed in our Hiring Index — giving you data, not guesswork
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="border-t border-white/[0.08] py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2
            className="mb-16 text-center text-4xl text-white sm:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            How it works
          </h2>

          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Upload Your Resume',
                description:
                  'Our AI analyzes your resume against 14,000+ real job postings to identify gaps and opportunities.',
              },
              {
                step: '02',
                title: 'Get Your ATS Score',
                description:
                  'Receive a detailed score showing ATS compatibility — the same systems used by 99% of Fortune 500.',
              },
              {
                step: '03',
                title: 'Apply AI Suggestions',
                description:
                  'Follow AI-powered recommendations to optimize keywords, formatting, and content for maximum impact.',
              },
              {
                step: '04',
                title: 'Land More Interviews',
                description:
                  'Apply with confidence knowing your resume is optimized to pass ATS screening and impress recruiters.',
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-6">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]">
                  <span className="text-sm font-medium text-[hsl(240,4%,66%)]">{item.step}</span>
                </div>
                <div className="flex-1 border-b border-white/[0.05] pb-8">
                  <h3
                    className="text-xl text-white"
                    style={{ fontFamily: "'Instrument Serif', serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2 text-base leading-relaxed text-[hsl(240,4%,66%)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/ats-score"
              className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition-all duration-200 hover:bg-white/90"
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
