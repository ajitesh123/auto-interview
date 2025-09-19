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

  const menuItems = [
    'Build Resume',
    'Check Resume ATS Score',
    'Find Jobs',
    'Try Assessments',
    'Generate Custom Cover Letter'
  ]

  const renderMainContent = () => {
    switch (activeMenu) {
      case 'Build Resume':
        return <BuildResumePage />
      case 'Check Resume ATS Score':
        return <ATSScorePage />
      case 'Find Jobs':
        return <FindJobsPage />
      case 'Try Assessments':
        return <AssessmentsPage />
      case 'Generate Custom Cover Letter':
        return <CoverLetterPage />
      default:
        return <BuildResumePage />
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="flex h-screen">
        {/* Left Sidebar Menu - Compact height */}
        <div className="w-64 bg-gray-900 border-r border-gray-700 p-4 flex flex-col">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-white mb-2">Auto Interview</h1>
            <p className="text-gray-400 text-sm">AI-powered career tools</p>
          </div>
          
          <nav className="space-y-1 flex-1">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => setActiveMenu(item)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                  activeMenu === item
                    ? 'bg-gradient-to-r from-pink-500 to-pink-700 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area - Full width */}
        <div className="flex-1 flex flex-col">
          {/* Top Navigation - Moved to right */}
          <div className="flex justify-end items-center p-6 border-b border-gray-700">
            <div className="flex items-center space-x-6">
              <Link
                href="/blog"
                className="text-gray-400 hover:text-white transition-colors font-medium"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="text-gray-400 hover:text-white transition-colors font-medium"
              >
                About
              </Link>
              <Link
                href="https://app.toughtongueai.com/"
                className="text-gray-400 hover:text-white transition-colors font-medium"
              >
                Tough Tongue AI
              </Link>
              <SearchButton />
            </div>
          </div>
          
          {/* Main Content - Full width */}
          <div className="flex-1 w-full">
            {renderMainContent()}
          </div>
        </div>
      </div>
      <MinimalFooter />
    </div>
  )
}

export default LandingPage
