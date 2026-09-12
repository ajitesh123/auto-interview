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
      <div className="w-full">
        {/* Main Action Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Card 1: Create from Scratch */}
          <div className="flex flex-col justify-between rounded-[8px] border border-[#ebebeb] bg-white p-6 transition-all hover:border-[#171717] hover:shadow-sm sm:p-8">
            <div>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-[#ebebeb] bg-[#fafafa] text-[#171717]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
                RECOMMENDED
              </span>
              <h2 className="mt-2 text-xl font-normal tracking-tight text-[#171717]">
                Create resume from scratch
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                Build a battle-tested resume step-by-step. Select an ATS-optimized template
                (Harvard, LBS, or Stanford) and fill in your details with AI bullet assistance.
              </p>
            </div>

            <div className="mt-8 border-t border-[#ebebeb] pt-6">
              <button
                onClick={handleStartBuilding}
                type="button"
                className="w-full rounded-[6px] bg-[#171717] px-4 py-2.5 text-center text-sm font-medium text-white transition-colors hover:bg-[#333333]"
              >
                Choose Template &amp; Start &rarr;
              </button>
            </div>
          </div>

          {/* Card 2: Upload Existing Resume */}
          <div className="flex flex-col justify-between rounded-[8px] border border-[#ebebeb] bg-white p-6 transition-all hover:border-[#171717] hover:shadow-sm sm:p-8">
            <div>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-[6px] border border-[#ebebeb] bg-[#fafafa] text-[#171717]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <span className="ml-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
                AUTO-EXTRACT
              </span>
              <h2 className="mt-2 text-xl font-normal tracking-tight text-[#171717]">
                Upload old resume
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[#666666]">
                Already have a resume? Upload your PDF or DOCX file. Our AI will automatically parse
                your experience, education, and skills into ATS-friendly sections.
              </p>
            </div>

            <div className="mt-8 border-t border-[#ebebeb] pt-6">
              <button
                onClick={handleUploadResume}
                type="button"
                className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-4 py-2.5 text-center text-sm font-medium text-[#171717] transition-colors hover:bg-[#f5f5f5]"
              >
                Upload Resume File &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Feature checklist */}
        <div className="mt-8 grid grid-cols-1 gap-4 border-t border-[#ebebeb] pt-6 sm:grid-cols-3">
          <div className="flex items-center text-xs text-[#666666]">
            <svg
              className="mr-2 h-4 w-4 text-[#171717]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            100% Free • No paywall or limits
          </div>
          <div className="flex items-center text-xs text-[#666666]">
            <svg
              className="mr-2 h-4 w-4 text-[#171717]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Passes 99.7% of ATS scanners
          </div>
          <div className="flex items-center text-xs text-[#666666]">
            <svg
              className="mr-2 h-4 w-4 text-[#171717]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Download clean DOCX &amp; PDF
          </div>
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
