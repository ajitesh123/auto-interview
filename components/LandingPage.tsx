'use client'

import { useState } from 'react'
import Link from './Link'
import SearchButton from './SearchButton'
import MinimalFooter from './MinimalFooter'

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
        return (
          <div className="w-full h-full flex flex-col justify-center items-center px-8 py-12">
            {/* Title and Description */}
            <div className="text-center mb-12 max-w-4xl">
              <h1 className="text-5xl font-bold text-white mb-6">Build Your Perfect Resume</h1>
              <p className="text-xl text-white leading-relaxed">
                Create ATS-friendly resumes, get your score analyzed, find matching jobs, and generate tailored cover letters - all in one platform.
              </p>
            </div>

            {/* Main Action Cards */}
            <div className="flex gap-8 mb-16 max-w-5xl w-full">
              {/* Upload Resume Card */}
              <div className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-8 hover:border-pink-500 transition-colors cursor-pointer group">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-pink-700 rounded-full flex items-center justify-center group-hover:from-pink-400 group-hover:to-pink-600 transition-colors">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Upload your resume</h3>
                  <p className="text-white text-lg leading-relaxed">
                    Already have a resume? Upload it and we'll analyze it for ATS compatibility and help you improve it.
                  </p>
                </div>
              </div>

              {/* Create Resume Card */}
              <div className="flex-1 bg-gray-900 border border-gray-700 rounded-lg p-8 hover:border-pink-500 transition-colors cursor-pointer group">
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-pink-700 rounded-full flex items-center justify-center group-hover:from-pink-400 group-hover:to-pink-600 transition-colors">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">I want to make a resume</h3>
                  <p className="text-white text-lg leading-relaxed">
                    Start from scratch with our guided resume builder. We'll help you create an ATS-friendly resume step by step.
                  </p>
                </div>
              </div>
            </div>

            {/* Feature Highlights */}
            <div className="grid grid-cols-4 gap-6 max-w-6xl w-full">
              {/* ATS Analysis */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-pink-700 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">ATS Analysis</h4>
                <p className="text-white text-sm">Get detailed scoring and improvement suggestions</p>
              </div>

              {/* Job Matching */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-pink-700 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Job Matching</h4>
                <p className="text-white text-sm">Find jobs that match your skills and experience</p>
              </div>

              {/* Skill Assessment */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-pink-700 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Skill Assessment</h4>
                <p className="text-white text-sm">Take personalized assessments and interview prep</p>
              </div>

              {/* Cover Letters */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500 to-pink-700 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Cover Letters</h4>
                <p className="text-white text-sm">Generate tailored cover letters for any job</p>
              </div>
            </div>
          </div>
        )
      case 'Check Resume ATS Score':
        return (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-pink-500/20 to-pink-700/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Check Resume ATS Score</h2>
              <p className="text-gray-400 text-lg">Upload your resume to get an instant ATS compatibility score</p>
            </div>
          </div>
        )
      case 'Find Jobs':
        return (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-pink-500/20 to-pink-700/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Find Jobs</h2>
              <p className="text-gray-400 text-lg">Discover job opportunities tailored to your skills and experience</p>
            </div>
          </div>
        )
      case 'Try Assessments':
        return (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-pink-500/20 to-pink-700/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Try Assessments</h2>
              <p className="text-gray-400 text-lg">Practice with our comprehensive skill assessments and mock interviews</p>
            </div>
          </div>
        )
      case 'Generate Custom Cover Letter':
        return (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-r from-pink-500/20 to-pink-700/20 rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-4xl font-bold text-white mb-4">Generate Custom Cover Letter</h2>
              <p className="text-gray-400 text-lg">Create personalized cover letters that match your resume and job requirements</p>
            </div>
          </div>
        )
      default:
        return null
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
