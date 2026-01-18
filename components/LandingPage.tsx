'use client'

import React, { useState } from 'react'
import Link from './Link'
import SearchButton from './SearchButton'
import MinimalFooter from './MinimalFooter'
import Logo from './Logo'
import { BuildResumePage } from '../features/build-resume'
import { ATSScorePage } from '../features/ats-score'
import { FindJobsPage } from '../features/find-jobs'
// import { AssessmentsPage } from '../features/assessments' // Removed - now redirects to Tough Tongue AI
import { CoverLetterPage } from '../features/cover-letter'
import { FreeResourcesPage } from '../features/free-resources'

const LandingPage = () => {
  const [activeMenu, setActiveMenu] = useState('Build Resume')
  const [buildResumeKey, setBuildResumeKey] = useState(0)

  const menuItems = [
    'Build Resume',
    'Check Resume ATS Score',
    'Find Jobs',
    'Practice Interview',
    'Generate Custom Cover Letter',
    'Free Resources',
  ]

  const renderMainContent = () => {
    switch (activeMenu) {
      case 'Build Resume':
        return <BuildResumePage key={buildResumeKey} />
      case 'Check Resume ATS Score':
        return <ATSScorePage />
      case 'Find Jobs':
        return <FindJobsPage />
      // Try Assessments case removed - now redirects to Tough Tongue AI
      case 'Generate Custom Cover Letter':
        return <CoverLetterPage />
      case 'Free Resources':
        return <FreeResourcesPage />
      default:
        return <BuildResumePage key={buildResumeKey} />
    }
  }

  return (
    <div className="min-h-screen bg-matte-black text-white">
      {/* Hidden SEO Content - Visible to Search Engines */}
      <div className="sr-only">
        <h1>Auto Interview AI - Complete Job Preparation Platform</h1>
        <h2>AI Resume Builder</h2>
        <p>
          Build professional, ATS-friendly resumes with our free AI resume builder. Create resumes
          from scratch or upload existing ones for optimization.
        </p>

        <h2>ATS Score Checker</h2>
        <p>
          Analyze your resume's ATS compatibility with our free AI-powered checker. Get detailed
          scoring and improvement suggestions.
        </p>

        <h2>AI Job Search</h2>
        <p>
          Find your next job opportunity with our AI-powered job search tool. Search LinkedIn jobs
          by title, location, and company.
        </p>

        <h2>Cover Letter Generator</h2>
        <p>
          Generate personalized cover letters tailored to specific job postings with our free AI
          cover letter generator.
        </p>

        <h2>Skill Assessments</h2>
        <p>
          Practice with comprehensive skill assessments and mock interviews across multiple
          categories including product management, technical skills, and behavioral interviews.
        </p>

        <h2>Mock Interview Practice</h2>
        <p>
          Practice with AI-powered mock interviews to boost your confidence and performance in real
          interviews.
        </p>

        <h2>Free Resources Library</h2>
        <p>
          Download ATS-friendly resume templates, interview checklists, outreach scripts, and job
          search playbooks curated by the Auto Interview AI team. Every resource is 100% free and
          ungated.
        </p>

        <h3>Key Features:</h3>
        <ul>
          <li>Free AI resume builder with ATS-friendly templates</li>
          <li>Instant ATS compatibility scoring and analysis</li>
          <li>AI-powered job search with LinkedIn integration</li>
          <li>Personalized cover letter generation</li>
          <li>Comprehensive skill assessments</li>
          <li>Mock interview practice sessions</li>
          <li>Professional resume templates</li>
          <li>Resume optimization suggestions</li>
          <li>Job application tracking</li>
          <li>Career preparation tools</li>
        </ul>

        <h3>Benefits:</h3>
        <ul>
          <li>Increase job application success rate</li>
          <li>Improve resume ATS compatibility</li>
          <li>Find relevant job opportunities faster</li>
          <li>Create personalized cover letters</li>
          <li>Practice interview skills</li>
          <li>Boost career confidence</li>
        </ul>

        <h3>How It Works:</h3>
        <ol>
          <li>Upload your resume or create one from scratch</li>
          <li>Get instant ATS score analysis and improvement suggestions</li>
          <li>Search for relevant job opportunities</li>
          <li>Generate personalized cover letters for each application</li>
          <li>Practice with skill assessments and mock interviews</li>
          <li>Apply with confidence using optimized materials</li>
        </ol>
      </div>

      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Sidebar Menu - Compact height */}
        <div className="flex w-full flex-col border-b border-matte-gray bg-matte-dark p-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
          <div className="mb-6">
            <div className="mb-2 flex items-center">
              <Logo width={40} height={40} className="mr-1" />
              <h1 className="text-lg font-bold text-chatgpt-text sm:text-xl">Auto Interview AI</h1>
            </div>
            <p className="text-xs text-chatgpt-textSecondary sm:text-sm">AI-powered career tools</p>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item, index) => (
              <button
                key={item}
                onClick={() => {
                  // Redirect to Free Mock Interview page
                  if (item === 'Practice Interview') {
                    window.location.href = '/free-mock-interview'
                    return
                  }

                  setActiveMenu(item)
                  if (item === 'Build Resume') {
                    setBuildResumeKey((prev) => prev + 1)
                  }
                }}
                className={`group relative w-full animate-slide-up rounded-lg px-3 py-2 text-left text-xs font-medium transition-all duration-300 hover:translate-x-2 hover:scale-105 hover:shadow-lg hover:shadow-gray-500/20 sm:text-sm ${
                  activeMenu === item
                    ? 'bg-matte-gray/20 text-white'
                    : 'text-gray-400 hover:bg-matte-gray hover:text-white'
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {activeMenu === item && (
                  <div className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-accent-500 to-accent-400 transition-all duration-300"></div>
                )}
                <span className="relative z-10">{item}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area - Full width */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* Top Navigation - Moved to right */}
          <div className="flex items-center justify-end border-b border-matte-gray p-4 sm:p-6">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button
                onClick={() => {
                  setActiveMenu('Build Resume')
                  setBuildResumeKey((prev) => prev + 1)
                }}
                className="text-sm font-medium text-chatgpt-textSecondary transition-colors hover:text-chatgpt-text sm:text-base"
              >
                Home
              </button>
              <Link
                href="/blog"
                className="text-sm font-medium text-chatgpt-textSecondary transition-colors hover:text-chatgpt-text sm:text-base"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-chatgpt-textSecondary transition-colors hover:text-chatgpt-text sm:text-base"
              >
                About
              </Link>
              <Link
                href="/free-mock-interview"
                className="text-sm font-medium text-chatgpt-textSecondary transition-colors hover:text-chatgpt-text sm:text-base"
              >
                Free Mock Interview
              </Link>
              <SearchButton />
            </div>
          </div>

          {/* Main Content - Full width */}
          <div className="w-full flex-1 overflow-auto">{renderMainContent()}</div>
        </div>
      </div>
      <MinimalFooter />
    </div>
  )
}

export default LandingPage
