'use client'

import { useState } from 'react'

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
    // TODO: Navigate to resume builder
    console.log('Starting resume builder')
  }

  if (hasResume === null) {
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
  }

  // Upload Resume Flow
  if (hasResume === true) {
    return (
      <div className="w-full h-full flex flex-col justify-center items-center px-8 py-12">
        <div className="text-center mb-8 max-w-2xl">
          <h1 className="text-4xl font-bold text-white mb-4">Upload Your Resume</h1>
          <p className="text-xl text-white">Upload your existing resume to get started with our AI-powered optimization</p>
        </div>

        <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg p-8">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-pink-700 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
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
              className="cursor-pointer inline-flex items-center px-6 py-3 border-2 border-dashed border-gray-600 rounded-lg hover:border-pink-500 transition-colors mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {uploadedFile ? uploadedFile.name : 'Choose file or drag and drop'}
            </label>

            <button
              onClick={handleUpload}
              disabled={!uploadedFile || isUploading}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-400 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? 'Uploading...' : 'Upload Resume'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Create New Resume Flow
  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-8 py-12">
      <div className="text-center mb-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-white mb-4">Create New Resume</h1>
        <p className="text-xl text-white">Start from scratch with our guided resume builder</p>
      </div>

      <div className="w-full max-w-md bg-gray-900 border border-gray-700 rounded-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-pink-700 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-4">Ready to Build Your Resume?</h3>
          <p className="text-gray-300 mb-6">
            Our AI-powered resume builder will guide you through creating a professional, ATS-friendly resume step by step.
          </p>

          <button
            onClick={handleStartBuilding}
            className="w-full bg-gradient-to-r from-pink-500 to-pink-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-400 hover:to-pink-600 transition-colors"
          >
            Start Building Resume
          </button>
        </div>
      </div>
    </div>
  )
}

export default BuildResumePage
