'use client'

import { useState } from 'react'

interface MatchResult {
  matchScore: number
  matchedKeywords: {
    technical: string[]
    softSkills: string[]
  }
  missingKeywords: {
    technical: string[]
    softSkills: string[]
  }
  keywordAnalysis: {
    matched: string[]
    missing: string[]
    matchRate: number
  }
  recommendations: Array<{
    priority: 'high' | 'medium' | 'low'
    category: string
    issue: string
    action: string
    example?: string
  }>
  resumeText?: string
  jobDescriptionText?: string
}

const ResumeJobMatcherPage = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [jobDescription, setJobDescription] = useState('')
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [isMatching, setIsMatching] = useState(false)
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleJobDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJobDescription(e.target.value)
    setError(null)
  }

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (
        file.type === 'application/pdf' ||
        file.type.includes('word') ||
        file.name.endsWith('.pdf') ||
        file.name.endsWith('.docx')
      ) {
        setResumeFile(file)
        setError(null)
      } else {
        setError('Please upload a PDF or DOCX file')
      }
    }
  }

  const handleNext = () => {
    if (step === 1) {
      if (jobDescription.trim().length < 50) {
        setError('Please paste a job description (at least 50 characters)')
        return
      }
      setStep(2)
    } else if (step === 2) {
      if (!resumeFile) {
        setError('Please upload your resume')
        return
      }
      handleMatch()
    }
  }

  const handleMatch = async () => {
    if (!resumeFile || !jobDescription.trim()) return

    setIsMatching(true)
    setError(null)
    setStep(3)

    try {
      const formData = new FormData()
      formData.append('file', resumeFile)
      formData.append('jobDescription', jobDescription)

      const response = await fetch('/api/resume-job-matcher/match', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to match resume with job description')
      }

      const data = await response.json()
      setMatchResult(data)
    } catch (err: any) {
      setError(err.message || 'Failed to match resume. Please try again.')
      setStep(2)
    } finally {
      setIsMatching(false)
    }
  }

  const handleStartOver = () => {
    setStep(1)
    setJobDescription('')
    setResumeFile(null)
    setMatchResult(null)
    setError(null)
  }

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-5xl font-bold text-transparent">
          Resume Job Matcher
        </h1>
        <p className="text-lg text-gray-400">
          Match your resume to any job description with AI-powered keyword analysis
        </p>
      </div>

      {/* Step Navigation */}
      <div className="mb-8 flex items-center justify-center space-x-4">
        <div className={`flex items-center ${step >= 1 ? 'text-purple-400' : 'text-gray-600'}`}>
          <div
            className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
              step >= 1 ? 'border-purple-400 bg-purple-600' : 'border-gray-600'
            }`}
          >
            <span className="font-bold">1</span>
          </div>
          <span className="font-semibold">The Job</span>
        </div>
        <div className={`h-1 w-16 ${step >= 2 ? 'bg-purple-400' : 'bg-gray-600'}`}></div>
        <div className={`flex items-center ${step >= 2 ? 'text-purple-400' : 'text-gray-600'}`}>
          <div
            className={`mr-3 flex h-10 w-10 items-center justify-center rounded-full border-2 ${
              step >= 2 ? 'border-purple-400 bg-purple-600' : 'border-gray-600'
            }`}
          >
            <span className="font-bold">2</span>
          </div>
          <span className="font-semibold">Your Resume</span>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl border border-gray-700 bg-gray-800/50 p-8 shadow-2xl">
          {/* Step 1: Job Description */}
          {step === 1 && (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white underline decoration-purple-500">
                1. PASTE YOUR JOB DESCRIPTION
              </h2>
              <p className="mb-6 text-gray-400">
                To start, copy and paste the job description you want to compare your resume to.
              </p>
              <p className="mb-6 text-sm text-gray-500">
                To make things more accurate, paste in the full job description (e.g. roles,
                responsibilities, qualifications) but exclude sections like the 'About Us/Company'
                or information around salary/benefits or diversity, which don't mention hard skills.
                Only English job descriptions please.
              </p>

              <div className="mb-6">
                <textarea
                  value={jobDescription}
                  onChange={handleJobDescChange}
                  placeholder="Paste job description here..."
                  className="h-64 w-full rounded-lg border border-dashed border-gray-600 bg-gray-900/50 p-4 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
                />
                <div className="mt-2 text-xs text-gray-500">{jobDescription.length} characters</div>
              </div>

              {error && (
                <div className="mb-4 rounded-lg border border-red-500/50 bg-red-900/20 p-4 text-red-300">
                  {error}
                </div>
              )}

              <button
                onClick={handleNext}
                disabled={jobDescription.trim().length < 50}
                className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Continue to Step 2 →
              </button>
            </div>
          )}

          {/* Step 2: Resume Upload */}
          {step === 2 && (
            <div>
              <h2 className="mb-2 text-2xl font-bold text-white underline decoration-purple-500">
                2. UPLOAD YOUR RESUME
              </h2>
              <p className="mb-6 text-gray-400">
                Upload your resume to match it against the job description you provided.
              </p>

              <div className="mb-6">
                <input
                  type="file"
                  accept=".pdf,.docx"
                  onChange={handleResumeUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-900/30 p-12 transition-colors hover:border-purple-500 hover:bg-gray-900/50"
                >
                  <svg
                    className="mb-4 h-16 w-16 text-gray-400"
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
                  <p className="mb-2 text-white">
                    {resumeFile ? resumeFile.name : 'Click here or drop your resume'}
                  </p>
                  <p className="text-sm text-gray-500">
                    English resumes in PDF or DOCX only. Readable text only (no scans).
                  </p>
                  <p className="mt-1 text-sm text-gray-500">Max 5MB file size.</p>
                </label>
              </div>

              {error && (
                <div className="mb-4 rounded-lg border border-red-500/50 bg-red-900/20 p-4 text-red-300">
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="rounded-lg border border-gray-600 bg-gray-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-600"
                >
                  ← Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={!resumeFile || isMatching}
                  className="rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isMatching ? 'Matching...' : 'Match Resume →'}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Results */}
          {step === 3 && (isMatching || matchResult) && (
            <div>
              {isMatching ? (
                <div className="py-12 text-center">
                  <div className="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent"></div>
                  <p className="text-lg text-white">Analyzing resume match...</p>
                  <p className="mt-2 text-sm text-gray-400">This may take a few moments</p>
                </div>
              ) : matchResult ? (
                <div>
                  <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-white">Match Results</h2>
                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setStep(1)
                          setJobDescription('')
                          setMatchResult(null)
                          setError(null)
                        }}
                        className="rounded-lg border border-purple-500 bg-purple-600/20 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-purple-600/30"
                      >
                        Upload Another Job Description
                      </button>
                      <button
                        onClick={handleStartOver}
                        className="rounded-lg border border-gray-600 bg-gray-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-gray-600"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="mb-8 rounded-lg border border-gray-700 bg-gray-900/50 p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white">Match Score</h3>
                      <div className="text-4xl font-bold text-purple-400">
                        {matchResult.matchScore}%
                      </div>
                    </div>
                    <div className="h-4 w-full overflow-hidden rounded-full bg-gray-700">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-1000"
                        style={{ width: `${matchResult.matchScore}%` }}
                      ></div>
                    </div>
                    <p className="mt-4 text-gray-400">
                      {matchResult.matchScore >= 80
                        ? 'Excellent! Your resume matches well with the job description.'
                        : matchResult.matchScore >= 60
                          ? 'Good match, but there are opportunities to improve.'
                          : 'Your resume needs optimization to better match this job description.'}
                    </p>
                  </div>

                  {/* Keywords Analysis */}
                  <div className="mb-8 space-y-6">
                    {/* Matched Keywords */}
                    <div>
                      <h3 className="mb-4 text-xl font-bold text-white">Matched Keywords</h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-lg border border-green-500/30 bg-green-900/20 p-6">
                          <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-400">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                              />
                            </svg>
                            Technical Keywords
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {matchResult.matchedKeywords.technical.length > 0 ? (
                              matchResult.matchedKeywords.technical.map((keyword, idx) => (
                                <span
                                  key={idx}
                                  className="rounded-full bg-green-600/30 px-3 py-1 text-sm text-green-300"
                                >
                                  {keyword}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500">No technical keywords matched</span>
                            )}
                          </div>
                          <p className="mt-4 text-sm text-gray-400">
                            {matchResult.matchedKeywords.technical.length} technical keywords found
                          </p>
                        </div>

                        <div className="rounded-lg border border-green-500/30 bg-green-900/20 p-6">
                          <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-green-400">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            Soft Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {matchResult.matchedKeywords.softSkills.length > 0 ? (
                              matchResult.matchedKeywords.softSkills.map((keyword, idx) => (
                                <span
                                  key={idx}
                                  className="rounded-full bg-green-600/30 px-3 py-1 text-sm text-green-300"
                                >
                                  {keyword}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500">No soft skills matched</span>
                            )}
                          </div>
                          <p className="mt-4 text-sm text-gray-400">
                            {matchResult.matchedKeywords.softSkills.length} soft skills found
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Missing Keywords */}
                    <div>
                      <h3 className="mb-4 text-xl font-bold text-white">Missing Keywords</h3>
                      <div className="grid gap-6 md:grid-cols-2">
                        <div className="rounded-lg border border-red-500/30 bg-red-900/20 p-6">
                          <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-red-400">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                              />
                            </svg>
                            Technical Keywords
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {matchResult.missingKeywords.technical.length > 0 ? (
                              matchResult.missingKeywords.technical
                                .slice(0, 20)
                                .map((keyword, idx) => (
                                  <span
                                    key={idx}
                                    className="rounded-full bg-red-600/30 px-3 py-1 text-sm text-red-300"
                                  >
                                    {keyword}
                                  </span>
                                ))
                            ) : (
                              <span className="text-gray-500">
                                All important technical keywords are present!
                              </span>
                            )}
                          </div>
                          <p className="mt-4 text-sm text-gray-400">
                            {matchResult.missingKeywords.technical.length} technical keywords
                            missing
                          </p>
                        </div>

                        <div className="rounded-lg border border-red-500/30 bg-red-900/20 p-6">
                          <h4 className="mb-3 flex items-center gap-2 text-lg font-semibold text-red-400">
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                              />
                            </svg>
                            Soft Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {matchResult.missingKeywords.softSkills.length > 0 ? (
                              matchResult.missingKeywords.softSkills
                                .slice(0, 20)
                                .map((keyword, idx) => (
                                  <span
                                    key={idx}
                                    className="rounded-full bg-red-600/30 px-3 py-1 text-sm text-red-300"
                                  >
                                    {keyword}
                                  </span>
                                ))
                            ) : (
                              <span className="text-gray-500">
                                All important soft skills are present!
                              </span>
                            )}
                          </div>
                          <p className="mt-4 text-sm text-gray-400">
                            {matchResult.missingKeywords.softSkills.length} soft skills missing
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recommendations */}
                  {matchResult.recommendations.length > 0 && (
                    <div className="rounded-lg border border-blue-500/30 bg-blue-900/20 p-6">
                      <h4 className="mb-4 text-lg font-semibold text-blue-400">Recommendations</h4>
                      <div className="space-y-4">
                        {matchResult.recommendations.map((rec, idx) => (
                          <div
                            key={idx}
                            className="rounded-lg border border-blue-500/20 bg-blue-900/10 p-4"
                          >
                            <div className="mb-2 flex items-center gap-2">
                              <span
                                className={`rounded px-2 py-1 text-xs font-semibold ${
                                  rec.priority === 'high'
                                    ? 'bg-red-600 text-white'
                                    : rec.priority === 'medium'
                                      ? 'bg-yellow-600 text-white'
                                      : 'bg-gray-600 text-white'
                                }`}
                              >
                                {rec.priority.toUpperCase()}
                              </span>
                              <span className="font-semibold text-blue-300">{rec.category}</span>
                            </div>
                            <p className="mb-2 text-white">{rec.issue}</p>
                            <p className="text-gray-300">{rec.action}</p>
                            {rec.example && (
                              <p className="mt-2 text-sm italic text-gray-400">
                                Example: {rec.example}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResumeJobMatcherPage
