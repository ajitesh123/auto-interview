'use client'

import { useState } from 'react'
import Link from './Link'
import SearchButton from './SearchButton'
import MinimalFooter from './MinimalFooter'
import { BuildResumePage } from '../features/build-resume'
import { ATSScorePage } from '../features/ats-score'
import { FindJobsPage } from '../features/find-jobs'
import { AssessmentsPage } from '../features/assessments'
import { CoverLetterPage } from '../features/cover-letter'

const LandingPage = () => {
  const [activeMenu, setActiveMenu] = useState('Build Resume')
  const [buildResumeKey, setBuildResumeKey] = useState(0)

  const menuItems = [
    'Build Resume',
    'Check Resume ATS Score',
    'Find Jobs',
    'Try Assessments',
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
      case 'Try Assessments':
        return <AssessmentsPage />
      case 'Generate Custom Cover Letter':
        return <CoverLetterPage />
      default:
        return <BuildResumePage key={buildResumeKey} />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex min-h-screen flex-col lg:flex-row">
        {/* Left Sidebar Menu - Compact height */}
        <div className="flex w-full flex-col border-b border-gray-700 bg-gray-900 p-4 lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
          <div className="mb-6">
            <h1 className="mb-2 text-lg font-bold text-white sm:text-xl">Auto Interview</h1>
            <p className="text-xs text-gray-400 sm:text-sm">AI-powered career tools</p>
          </div>

          <nav className="flex-1 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveMenu(item)
                  if (item === 'Build Resume') {
                    setBuildResumeKey((prev) => prev + 1)
                  }
                }}
                className={`w-full rounded-lg px-3 py-2 text-left text-xs transition-colors sm:text-sm ${
                  activeMenu === item
                    ? 'bg-gradient-to-r from-pink-500 to-pink-700 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area - Full width */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* Top Navigation - Moved to right */}
          <div className="flex items-center justify-end border-b border-gray-700 p-4 sm:p-6">
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button
                onClick={() => {
                  setActiveMenu('Build Resume')
                  setBuildResumeKey((prev) => prev + 1)
                }}
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

          {/* Main Content - Full width */}
          <div className="w-full flex-1 overflow-auto">{renderMainContent()}</div>
        </div>
      </div>
      <MinimalFooter />
    </div>
  )
}

export default LandingPage
