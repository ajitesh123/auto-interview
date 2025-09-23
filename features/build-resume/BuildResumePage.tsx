'use client'

import { useState } from 'react'
import ResumeBuilder from './components/ResumeBuilder'
import ResumeUploadPage from './components/ResumeUploadPage'
import { ResumeData } from '../../lib/resumeStore'

const BuildResumePage = () => {
  const [hasResume, setHasResume] = useState<boolean | null>(null)
  const [parsedResumeData, setParsedResumeData] = useState<Partial<ResumeData> | null>(null)
  const [showUploadPage, setShowUploadPage] = useState(false)

  const handleUploadResume = () => {
    setShowUploadPage(true)
  }

  const handleUploadComplete = (parsedData: Partial<ResumeData>) => {
    setParsedResumeData(parsedData)
    setShowUploadPage(false)
    setHasResume(false) // This will show the ResumeBuilder with pre-filled data
  }

  const handleBackFromUpload = () => {
    setShowUploadPage(false)
  }

  const handleStartBuilding = () => {
    setHasResume(false)
    setParsedResumeData(null) // Clear any previously parsed data
  }

  // Show Upload Page FIRST - this takes priority
  if (showUploadPage) {
    return (
      <ResumeUploadPage onUploadComplete={handleUploadComplete} onBack={handleBackFromUpload} />
    )
  }

  if (hasResume === null) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center px-4 py-8 sm:px-8 sm:py-12">
        {/* Title and Description */}
        <div className="mb-8 w-full max-w-4xl text-center sm:mb-12">
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
            Build Your Perfect Resume
          </h1>
          <p className="mx-auto max-w-3xl text-base leading-relaxed text-white sm:text-lg md:text-xl">
            Create ATS-friendly resumes, get your score analyzed, find matching jobs, and generate
            tailored cover letters - all in one platform.
          </p>
        </div>

        {/* Main Action Cards */}
        <div className="mb-12 flex w-full max-w-4xl flex-col items-center gap-6 sm:mb-16">
          {/* Create Resume from Scratch - Main CTA */}
          <button
            onClick={handleStartBuilding}
            className="group w-full max-w-xl cursor-pointer rounded-xl border-2 border-pink-700 bg-gradient-to-r from-pink-700 to-pink-900 p-6 text-center transition-all duration-300 hover:from-pink-600 hover:to-pink-800 hover:shadow-2xl hover:shadow-pink-700/25 sm:p-8"
            type="button"
          >
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30 sm:mb-6 sm:h-20 sm:w-20">
                <svg
                  className="h-8 w-8 text-white sm:h-10 sm:w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl md:text-3xl">
                Create resume from scratch
              </h3>
              <p className="text-sm leading-relaxed text-white/90 sm:text-base md:text-lg">
                Start from scratch with our guided resume builder. We'll help you create an
                ATS-friendly resume step by step.
              </p>
            </div>
          </button>

          {/* OR Divider */}
          <div className="flex items-center">
            <div className="h-px w-16 bg-gray-600"></div>
            <span className="mx-4 text-lg font-semibold text-gray-400">OR</span>
            <div className="h-px w-16 bg-gray-600"></div>
          </div>

          {/* Upload Resume - Secondary Option */}
          <button
            onClick={handleUploadResume}
            className="group w-full max-w-lg cursor-pointer rounded-lg border border-gray-600 bg-gray-800 p-6 text-center transition-colors hover:border-pink-500 hover:bg-gray-700 sm:p-8"
            type="button"
          >
            <div className="flex flex-col items-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-700 transition-colors group-hover:bg-pink-600 sm:mb-6 sm:h-16 sm:w-16">
                <svg
                  className="h-6 w-6 text-white sm:h-8 sm:w-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-bold text-white sm:mb-4 sm:text-xl">
                Upload old resume
              </h3>
              <p className="text-sm leading-relaxed text-gray-300 sm:text-base">
                Already have a resume? Upload it and we'll analyze it for ATS compatibility and help
                you improve it.
              </p>
            </div>
          </button>
        </div>
      </div>
    )
  }

  // Create New Resume Flow (with or without pre-filled data)
  if (hasResume === false) {
    return <ResumeBuilder initialData={parsedResumeData || undefined} />
  }

  // This should never be reached, but just in case
  return <ResumeBuilder initialData={undefined} />
}

export default BuildResumePage
