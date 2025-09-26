'use client'

import { useState, useRef } from 'react'

const CoverLetterPage = () => {
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    setResumeFile(file)
    setUploadMessage(null)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0])
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const validateInputs = () => {
    const errors: string[] = []

    if (!jobTitle.trim()) {
      errors.push('Job title is required')
    }

    if (!company.trim()) {
      errors.push('Company name is required')
    }

    if (!jobDescription.trim()) {
      errors.push('Job description is required')
    }

    if (!resumeFile) {
      errors.push('Resume file is required')
    }

    setValidationErrors(errors)
    return errors.length === 0
  }

  const handleGenerate = async () => {
    if (!validateInputs()) {
      return
    }

    setIsGenerating(true)
    setUploadMessage(null)

    try {
      console.log('Starting cover letter generation process...')

      // First, parse the resume
      const formData = new FormData()
      formData.append('resume', resumeFile!)
      console.log('Resume file:', resumeFile?.name, resumeFile?.size)

      console.log('Sending resume for parsing...')
      const parseResponse = await fetch('/api/resume/upload-and-parse', {
        method: 'POST',
        body: formData,
      })

      console.log('Parse response status:', parseResponse.status)
      if (!parseResponse.ok) {
        const errorText = await parseResponse.text()
        console.error('Parse response error:', errorText)
        throw new Error('Failed to parse resume')
      }

      const parseResult = await parseResponse.json()
      console.log(
        'Parse result:',
        parseResult.success ? 'Success' : 'Failed',
        parseResult.error || ''
      )

      if (!parseResult.success) {
        throw new Error('Failed to parse resume: ' + parseResult.error)
      }

      console.log('Resume parsed successfully, sending to cover letter generator...')
      // Generate cover letter using Gemini API
      const coverLetterResponse = await fetch('/api/cover-letter/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobTitle,
          company,
          jobDescription,
          resumeData: parseResult.data,
        }),
      })

      console.log('Cover letter response status:', coverLetterResponse.status)
      if (!coverLetterResponse.ok) {
        const errorText = await coverLetterResponse.text()
        console.error('Cover letter response error:', errorText)
        throw new Error('Failed to generate cover letter')
      }

      const coverLetterResult = await coverLetterResponse.json()
      console.log(
        'Cover letter result:',
        coverLetterResult.success ? 'Success' : 'Failed',
        coverLetterResult.error || ''
      )

      if (!coverLetterResult.success) {
        throw new Error('Failed to generate cover letter: ' + coverLetterResult.error)
      }

      setGeneratedLetter(coverLetterResult.coverLetter)
      setUploadMessage('Cover letter generated successfully!')
    } catch (error) {
      console.error('Error generating cover letter:', error)
      setUploadMessage(
        `Error: ${error instanceof Error ? error.message : 'Failed to generate cover letter'}`
      )
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDownload = async () => {
    if (!generatedLetter) return

    try {
      const response = await fetch('/api/cover-letter/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coverLetter: generatedLetter,
          jobTitle,
          company,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate document')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Cover_Letter_${company}_${jobTitle}.docx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading cover letter:', error)
      setUploadMessage(
        `Error downloading: ${error instanceof Error ? error.message : 'Failed to download'}`
      )
    }
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLetter)
      setUploadMessage('Cover letter copied to clipboard!')
    } catch (error) {
      console.error('Error copying to clipboard:', error)
      setUploadMessage('Failed to copy to clipboard')
    }
  }

  return (
    <div className="flex h-full w-full flex-col bg-matte-black px-8 py-12">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-4xl text-center">
        <h1 className="mb-6 bg-gradient-to-r from-accent-400 via-accent-500 to-accent-600 bg-clip-text text-5xl font-bold text-transparent">
          Generate Custom Cover Letter
        </h1>
        <p className="text-xl leading-relaxed text-white">
          Create personalized cover letters that match your resume and job requirements using AI.
        </p>
      </div>

      <div className="mx-auto w-full max-w-6xl flex-1">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <div className="space-y-6">
            {/* Job Information */}
            <div className="rounded-lg border border-matte-gray bg-matte-dark p-6">
              <h3 className="mb-4 text-xl font-bold text-white">Job Information</h3>

              <div className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">Job Title *</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Product Manager"
                    className="w-full rounded-lg border border-matte-gray bg-matte-light px-4 py-2 text-white focus:border-accent-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full rounded-lg border border-matte-gray bg-matte-light px-4 py-2 text-white focus:border-accent-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Job Description *
                  </label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the complete job description here..."
                    rows={6}
                    className="w-full resize-none rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Resume Upload */}
            <div className="rounded-lg border border-matte-gray bg-matte-dark p-6">
              <h3 className="mb-4 text-xl font-bold text-white">Upload Resume *</h3>

              <div className="space-y-4">
                <div
                  onClick={openFileDialog}
                  className="cursor-pointer rounded-lg border-2 border-dashed border-matte-gray p-8 text-center transition-colors hover:border-accent-500"
                >
                  {resumeFile ? (
                    <div>
                      <div className="mb-2 text-green-400">✓ File Selected</div>
                      <div className="font-medium text-white">{resumeFile.name}</div>
                      <div className="text-sm text-gray-400">
                        {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="mb-2 text-gray-400">📄</div>
                      <div className="mb-1 text-white">Click to upload resume</div>
                      <div className="text-sm text-gray-400">
                        Supports PDF and DOCX files up to 10MB
                      </div>
                    </div>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="rounded-lg border border-red-500 bg-red-900/20 p-4">
                <h4 className="mb-2 font-medium text-red-400">Please fix the following errors:</h4>
                <ul className="space-y-1 text-sm text-red-300">
                  {validationErrors.map((error, index) => (
                    <li key={index}>• {error}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Upload Message */}
            {uploadMessage && (
              <div
                className={`rounded-lg p-4 ${
                  uploadMessage.includes('Error')
                    ? 'border border-red-500 bg-red-900/20 text-red-300'
                    : 'border border-green-500 bg-green-900/20 text-green-300'
                }`}
              >
                {uploadMessage}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!jobTitle || !company || !jobDescription || !resumeFile || isGenerating}
              className="w-full rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-6 py-3 font-semibold text-white transition-colors hover:from-accent-400 hover:to-accent-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating ? 'Generating Cover Letter...' : 'Generate Cover Letter'}
            </button>
          </div>

          {/* Output Section */}
          <div className="rounded-lg border border-matte-gray bg-matte-dark p-6">
            <h3 className="mb-4 text-xl font-bold text-white">Generated Cover Letter</h3>

            {generatedLetter ? (
              <div className="space-y-4">
                <div className="max-h-96 overflow-y-auto rounded-lg bg-white p-6">
                  <div
                    className="text-xs leading-relaxed text-black"
                    style={{ fontFamily: 'Arial, sans-serif', fontSize: '10px' }}
                  >
                    {generatedLetter.split('\n').map((line, index) => (
                      <div key={index} className="mb-2">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleCopyToClipboard}
                    className="flex-1 rounded-lg bg-matte-gray px-4 py-2 text-white transition-colors hover:bg-matte-light"
                  >
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex-1 rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-2 text-white transition-colors hover:from-accent-400 hover:to-accent-500"
                  >
                    Download DOCX
                  </button>
                  <button
                    onClick={() => setGeneratedLetter('')}
                    className="flex-1 rounded-lg bg-matte-gray px-4 py-2 text-white transition-colors hover:bg-matte-light"
                  >
                    Regenerate
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500/20 to-pink-700/20">
                  <svg
                    className="h-8 w-8 text-pink-500"
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
                <p className="text-gray-400">
                  Fill in all the required information and upload your resume to generate your cover
                  letter
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoverLetterPage
