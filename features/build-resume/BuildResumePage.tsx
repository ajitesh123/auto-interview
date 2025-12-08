'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ResumeBuilder from './components/ResumeBuilder'
import ResumeUploadPage from './components/ResumeUploadPage'
import InitialTemplateSelection from './components/InitialTemplateSelection'
import { ResumeData } from '../../lib/resumeStore'

const BuildResumePage = () => {
  const router = useRouter()
  const [hasResume, setHasResume] = useState<boolean | null>(null)
  const [parsedResumeData, setParsedResumeData] = useState<Partial<ResumeData> | null>(null)
  const [pendingParsedResumeData, setPendingParsedResumeData] =
    useState<Partial<ResumeData> | null>(null)
  const [showUploadPage, setShowUploadPage] = useState(false)
  const [showTemplateSelection, setShowTemplateSelection] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<'harvard' | 'lbs' | 'stanford' | null>(
    null
  )

  const handleUploadResume = () => {
    setShowUploadPage(true)
  }

  const handleUploadComplete = (parsedData: Partial<ResumeData>) => {
    setPendingParsedResumeData(parsedData)
    setShowUploadPage(false)
    setShowTemplateSelection(true)
  }

  const handleBackFromUpload = () => {
    setShowUploadPage(false)
  }

  const handleStartBuilding = () => {
    router.push('/build-resume/templates')
  }

  const handleTemplateSelected = (template: 'harvard' | 'lbs' | 'stanford') => {
    setSelectedTemplate(template)
    setShowTemplateSelection(false)
    setParsedResumeData(pendingParsedResumeData)
    setPendingParsedResumeData(null)
    setHasResume(false)
  }

  // Show Upload Page FIRST - this takes priority
  if (showUploadPage) {
    return (
      <ResumeUploadPage onUploadComplete={handleUploadComplete} onBack={handleBackFromUpload} />
    )
  }

  // Show Template Selection when user clicks "Create from scratch"
  if (showTemplateSelection) {
    return <InitialTemplateSelection onSelect={handleTemplateSelected} />
  }

  if (hasResume === null) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-matte-black px-4 py-8 sm:px-8 sm:py-12">
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
        <div className="mb-8 flex w-full max-w-4xl flex-col items-center gap-4 sm:mb-12">
          {/* Create Resume from Scratch - Main CTA */}
          <button
            onClick={handleStartBuilding}
            className="group w-full max-w-md cursor-pointer rounded-lg border border-accent-500 bg-gradient-to-r from-accent-600 to-accent-700 p-4 text-center transition-all duration-300 hover:from-accent-500 hover:to-accent-600 hover:shadow-lg hover:shadow-gray-500/25 sm:p-6"
            type="button"
          >
            <div className="flex flex-col items-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 transition-colors group-hover:bg-white/30 sm:mb-4 sm:h-14 sm:w-14">
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-bold text-white sm:mb-3 sm:text-xl md:text-2xl">
                Create resume from scratch
              </h3>
              <p className="text-xs leading-relaxed text-white/90 sm:text-sm md:text-base">
                Start from scratch with our guided resume builder. We'll help you create an
                ATS-friendly resume step by step.
              </p>
            </div>
          </button>

          {/* OR Divider */}
          <div className="flex items-center">
            <div className="h-px w-16 bg-matte-gray"></div>
            <span className="mx-4 text-lg font-semibold text-gray-400">OR</span>
            <div className="h-px w-16 bg-matte-gray"></div>
          </div>

          {/* Upload Resume - Secondary Option */}
          <button
            onClick={handleUploadResume}
            className="group w-full max-w-sm cursor-pointer rounded-lg border border-matte-gray bg-matte-dark p-4 text-center transition-colors hover:border-gray-400 hover:bg-matte-light sm:p-6"
            type="button"
          >
            <div className="flex flex-col items-center">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-matte-gray transition-colors group-hover:bg-gray-400 sm:mb-4 sm:h-12 sm:w-12">
                <svg
                  className="h-5 w-5 text-white sm:h-6 sm:w-6"
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
              <h3 className="mb-2 text-base font-bold text-white sm:mb-3 sm:text-lg">
                Upload old resume
              </h3>
              <p className="text-xs leading-relaxed text-gray-300 sm:text-sm">
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
    return (
      <ResumeBuilder
        initialData={parsedResumeData || undefined}
        initialTemplate={selectedTemplate || undefined}
      />
    )
  }

  // This should never be reached, but just in case
  return <ResumeBuilder initialData={undefined} initialTemplate={undefined} />
}

export default BuildResumePage
