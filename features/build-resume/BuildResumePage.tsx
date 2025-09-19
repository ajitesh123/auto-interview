'use client'

import { useState } from 'react'
import ResumeBuilder from './components/ResumeBuilder'

const BuildResumePage = () => {
  const [hasResume, setHasResume] = useState<boolean | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setHasResume(true)
    }
  }

  const handleCreateNew = () => {
    setHasResume(false)
  }

  const handleUpload = async () => {
    if (!uploadedFile) return

    setIsUploading(true)
    // TODO: Implement file upload logic
    setTimeout(() => {
      setIsUploading(false)
      // Navigate to resume builder or show success message
    }, 2000)
  }

  const handleStartBuilding = () => {
    setHasResume(false)
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
        <div className="mb-12 flex w-full max-w-6xl flex-col gap-6 sm:mb-16 sm:gap-8 lg:flex-row">
          {/* Upload Resume Card */}
          <button
            onClick={() => setHasResume(true)}
            className="group min-h-[300px] flex-1 cursor-pointer rounded-lg border border-gray-700 bg-gray-900 p-6 text-left transition-colors hover:border-pink-500 sm:min-h-[350px] sm:p-8"
            type="button"
          >
            <div className="flex h-full flex-col justify-center text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-700 transition-colors group-hover:from-pink-400 group-hover:to-pink-600 sm:mb-6 sm:h-20 sm:w-20">
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
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl">
                Upload your resume
              </h3>
              <p className="text-sm leading-relaxed text-white sm:text-base md:text-lg">
                Already have a resume? Upload it and we'll analyze it for ATS compatibility and help
                you improve it.
              </p>
            </div>
          </button>

          {/* Create Resume Card */}
          <button
            onClick={handleStartBuilding}
            className="group min-h-[300px] flex-1 cursor-pointer rounded-lg border border-gray-700 bg-gray-900 p-6 text-left transition-colors hover:border-pink-500 sm:min-h-[350px] sm:p-8"
            type="button"
          >
            <div className="flex h-full flex-col justify-center text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-700 transition-colors group-hover:from-pink-400 group-hover:to-pink-600 sm:mb-6 sm:h-20 sm:w-20">
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
              <h3 className="mb-3 text-xl font-bold text-white sm:mb-4 sm:text-2xl">
                I want to make a resume
              </h3>
              <p className="text-sm leading-relaxed text-white sm:text-base md:text-lg">
                Start from scratch with our guided resume builder. We'll help you create an
                ATS-friendly resume step by step.
              </p>
            </div>
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="grid w-full max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {/* ATS Analysis */}
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 text-center sm:p-6">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 sm:mb-4 sm:h-16 sm:w-16">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="mb-2 text-base font-bold text-white sm:text-lg">ATS Analysis</h4>
            <p className="text-xs text-white sm:text-sm">
              Get detailed scoring and improvement suggestions
            </p>
          </div>

          {/* Job Matching */}
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 text-center sm:p-6">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 sm:mb-4 sm:h-16 sm:w-16">
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
                  d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                />
              </svg>
            </div>
            <h4 className="mb-2 text-base font-bold text-white sm:text-lg">Job Matching</h4>
            <p className="text-xs text-white sm:text-sm">
              Find jobs that match your skills and experience
            </p>
          </div>

          {/* Skill Assessment */}
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 text-center sm:p-6">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 sm:mb-4 sm:h-16 sm:w-16">
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h4 className="mb-2 text-base font-bold text-white sm:text-lg">Skill Assessment</h4>
            <p className="text-xs text-white sm:text-sm">
              Take personalized assessments and interview prep
            </p>
          </div>

          {/* Cover Letters */}
          <div className="rounded-lg border border-gray-700 bg-gray-900 p-4 text-center sm:p-6">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 sm:mb-4 sm:h-16 sm:w-16">
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
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </div>
            <h4 className="mb-2 text-base font-bold text-white sm:text-lg">Cover Letters</h4>
            <p className="text-xs text-white sm:text-sm">
              Generate tailored cover letters for any job
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Upload Resume Flow
  if (hasResume === true) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-8 py-12">
        <div className="mb-8 max-w-2xl text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Upload Your Resume</h1>
          <p className="text-xl text-white">
            Upload your existing resume to get started with our AI-powered optimization
          </p>
        </div>

        <div className="w-full max-w-md rounded-lg border border-gray-700 bg-gray-900 p-8">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-700">
              <svg
                className="h-8 w-8 text-white"
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

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
            />
            <label
              htmlFor="resume-upload"
              className="mb-6 inline-flex cursor-pointer items-center rounded-lg border-2 border-dashed border-gray-600 px-6 py-3 transition-colors hover:border-pink-500"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {uploadedFile ? uploadedFile.name : 'Choose file or drag and drop'}
            </label>

            <button
              onClick={handleUpload}
              disabled={!uploadedFile || isUploading}
              className="w-full rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 px-6 py-3 font-semibold text-white transition-colors hover:from-pink-400 hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isUploading ? 'Uploading...' : 'Upload Resume'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Create New Resume Flow
  return <ResumeBuilder />
}

export default BuildResumePage
