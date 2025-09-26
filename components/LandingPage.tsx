'use client'

import { useState } from 'react'
import Link from './Link'
import SearchButton from './SearchButton'
import MinimalFooter from './MinimalFooter'
import Logo from './Logo'
import { BuildResumePage } from '../features/build-resume'
import { ATSScorePage } from '../features/ats-score'
import { FindJobsPage } from '../features/find-jobs'
// import { AssessmentsPage } from '../features/assessments' // Removed - now redirects to Tough Tongue AI
import { CoverLetterPage } from '../features/cover-letter'

const LandingPage = () => {
  const [activeMenu, setActiveMenu] = useState('Build Resume')
  const [buildResumeKey, setBuildResumeKey] = useState(0)

  const menuItems = [
    'Build Resume',
    'Check Resume ATS Score',
    'Find Jobs',
    'Practice Interview',
    'Generate Custom Cover Letter',
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
      default:
        return <BuildResumePage key={buildResumeKey} />
    }
  }

  return (
    <div className="min-h-screen bg-matte-black text-white">
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
                  // Redirect to Tough Tongue AI app for practice interviews
                  if (item === 'Practice Interview') {
                    window.open('https://app.toughtongueai.com/', '_blank')
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
                href="https://app.toughtongueai.com/"
                className="text-sm font-medium text-chatgpt-textSecondary transition-colors hover:text-chatgpt-text sm:text-base"
              >
                Tough Tongue AI
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
