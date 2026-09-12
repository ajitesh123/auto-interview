'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import ATSScoreResults from './ATSScoreResults'

interface CategoryScore {
  formatCompatibility: number
  keywordOptimization: number
  impactAndMetrics: number
  actionVerbs: number
  sectionCompleteness: number
}

interface Strength {
  category: string
  description: string
  impact: string
  exampleText: string
}

interface Improvement {
  category: string
  priority: 'high' | 'medium' | 'low'
  currentText: string
  suggestedText: string
  reason: string
  scoreImpact: string
}

export interface AnalysisResults {
  overallScore: number
  breakdown: CategoryScore
  strengths: Strength[]
  improvements: Improvement[]
  recommendations: string[]
  priorityIssues?: Array<{ level: 'critical' | 'high' | 'medium'; message: string }>
  breakdownMax: CategoryScore
  lineByLine?: Array<{
    section?: 'summary' | 'experience' | 'skills' | 'education'
    index: number
    text: string
    issues: Array<{ type: string; detail: string }>
    score: number
    potentialScore: number
  }>
  parseCoverage: number
}

const resumeTips: Array<{ title: string; body: string }> = [
  {
    title: 'Focus on achievements',
    body: 'Describe accomplishments using strong action verbs and quantified impact (e.g., "Increased pipeline by 32%").',
  },
  {
    title: 'Align core keywords',
    body: 'Incorporate relevant hard skills and domain vocabulary matching target job descriptions.',
  },
  {
    title: 'Keep bullets concise',
    body: 'Aim for 1-2 lines per bullet point (fewer than 30 words) with clear context-action-result structure.',
  },
  {
    title: 'Maintain clean hierarchy',
    body: 'Use standard headings (Experience, Education, Skills) and avoid multi-column tables or graphics.',
  },
  {
    title: 'Verify typography & links',
    body: 'Ensure consistent font sizing, margins, and active links for LinkedIn and portfolio.',
  },
]

const ATSScorePage = ({
  initialResults = null,
  initialTips = [],
  showUploadSection = true,
}: {
  initialResults?: AnalysisResults | null
  initialTips?: Array<{ title: string; body: string }>
  showUploadSection?: boolean
} = {}) => {
  const router = useRouter()
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(
    initialResults || null
  )
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [selectedTips, setSelectedTips] =
    useState<Array<{ title: string; body: string }>>(initialTips)
  const [dragActive, setDragActive] = useState(false)

  useEffect(() => {
    setAnalysisResults(initialResults || null)
  }, [initialResults])

  useEffect(() => {
    if (initialTips.length) {
      setSelectedTips(initialTips)
    }
  }, [initialTips])

  const isResultOnlyView = !showUploadSection

  // Progress simulation during analysis
  useEffect(() => {
    if (!isAnalyzing) return

    const startTime = Date.now()
    const totalMs = 2800

    setProgress(0)

    let raf: number
    const tick = () => {
      const elapsed = Date.now() - startTime
      const pct = Math.min(100, (elapsed / totalMs) * 100)
      setProgress(pct)
      if (pct < 100) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [isAnalyzing])

  const handleFileSelect = (file: File) => {
    if (file.type !== 'application/pdf') {
      setError('Please upload a PDF document (.pdf)')
      return
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be under 10MB')
      return
    }
    setUploadedFile(file)
    setError(null)
    setAnalysisResults(null)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)
    setError(null)

    const shuffled = [...resumeTips].sort(() => Math.random() - 0.5)
    const chosenTips = shuffled.slice(0, 3)
    setSelectedTips(chosenTips)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)

      const response = await fetch('/api/ats/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        let serverErr = 'Failed to analyze resume'
        try {
          const data = await response.json()
          if (data?.message) serverErr = data.message
          if (data?.errorCode) serverErr += ` [${data.errorCode}]`
        } catch (_) {
          // ignore json errors
        }
        throw new Error(serverErr)
      }

      const data = await response.json()
      setProgress(100)
      setAnalysisResults(data)

      if (showUploadSection) {
        try {
          if (typeof window !== 'undefined') {
            window.sessionStorage.setItem('ats:analysisResult', JSON.stringify(data))
            window.sessionStorage.setItem('ats:analysisTips', JSON.stringify(chosenTips))
          }
        } catch (storageError) {
          console.error('Failed to persist ATS analysis result', storageError)
        }
        router.push('/ats-score/result')
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to analyze resume. Please try again.'
      setError(msg)
      console.error('Analysis error:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  if (isResultOnlyView && !analysisResults) {
    return (
      <div className="mx-auto max-w-xl py-12 text-center">
        <div
          className="rounded-[8px] border border-[#ebebeb] bg-white p-8 sm:p-10"
          style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.04)' }}
        >
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-[#ebebeb] bg-[#fafafa] text-[#171717]">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="mb-2 text-xl font-normal tracking-tight text-[#171717]">
            Run an ATS analysis first
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-[#666666]">
            We couldn&apos;t find a saved ATS report for this session. Please upload and analyze a
            resume to view detailed compatibility scoring and line-by-line feedback.
          </p>
          <button
            onClick={() => router.push('/ats-score')}
            className="inline-flex items-center justify-center rounded-[6px] bg-[#171717] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
          >
            Go to ATS Analyzer
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Upload Section */}
      {showUploadSection && !analysisResults && (
        <div className="mx-auto w-full max-w-2xl">
          <div
            className="rounded-[8px] border border-[#ebebeb] bg-white p-6 sm:p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.04)' }}
          >
            {/* Upload Dropzone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center rounded-[8px] border-2 border-dashed p-8 text-center transition-all sm:p-12 ${
                dragActive
                  ? 'border-[#171717] bg-[#f5f5f5]'
                  : uploadedFile
                    ? 'border-[#171717] bg-[#fafafa]'
                    : 'border-[#d1d5db] bg-[#fafafa] hover:border-[#171717]'
              }`}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="flex w-full cursor-pointer flex-col items-center justify-center"
              >
                <div className="shadow-xs mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[#171717]">
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <span className="text-base font-medium text-[#171717]">
                  {uploadedFile ? uploadedFile.name : 'Upload your resume'}
                </span>
                <span className="mt-1 text-xs text-[#666666]">
                  {uploadedFile
                    ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • Click to change file`
                    : 'Drag and drop your PDF resume here, or click to browse (up to 10MB)'}
                </span>
              </label>
            </div>

            {error && (
              <div className="mt-4 rounded-[6px] border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                {error}
              </div>
            )}

            {/* Action buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                onClick={handleAnalyze}
                disabled={!uploadedFile || isAnalyzing}
                className="inline-flex flex-1 items-center justify-center rounded-[6px] bg-[#171717] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#333333] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {isAnalyzing ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4 animate-spin text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Analyzing Resume...
                  </span>
                ) : (
                  'Run ATS Score Analysis'
                )}
              </button>

              <button
                onClick={() => router.push('/build-resume')}
                className="inline-flex items-center justify-center rounded-[6px] border border-[#ebebeb] bg-white px-5 py-3 text-sm font-medium text-[#171717] transition-all hover:bg-[#f5f5f5]"
              >
                Resume Builder &rarr;
              </button>
            </div>

            {/* Loading state with progress */}
            {isAnalyzing && (
              <div className="mt-6 border-t border-[#ebebeb] pt-6">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-medium text-[#171717]">
                    Running deep ATS algorithm evaluation...
                  </span>
                  <span className="font-mono text-[#666666]">
                    {Math.min(100, Math.floor(progress))}%
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#ebebeb]">
                  <div
                    className="h-full bg-[#171717] transition-all duration-300 ease-out"
                    style={{ width: `${Math.max(5, progress)}%` }}
                  />
                </div>

                {/* Tips */}
                <div className="mt-6 rounded-[8px] border border-[#ebebeb] bg-[#fafafa] p-4 text-left">
                  <h4 className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
                    ATS Optimization Insights
                  </h4>
                  <ul className="space-y-2 text-xs text-[#666666]">
                    {selectedTips.map((tip, idx) => (
                      <li key={idx} className="leading-relaxed">
                        <strong className="text-[#171717]">{tip.title}:</strong> {tip.body}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results View */}
      {analysisResults && (
        <div className="w-full space-y-8">
          {isResultOnlyView && (
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ebebeb] pb-6">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
                  AUDIT RESULTS
                </span>
                <h2 className="text-2xl font-normal tracking-tight text-[#171717] sm:text-3xl">
                  ATS Compatibility Report
                </h2>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => router.push('/ats-score')}
                  className="rounded-[6px] border border-[#ebebeb] bg-white px-4 py-2 text-xs font-medium text-[#171717] transition-colors hover:bg-[#f5f5f5] sm:text-sm"
                >
                  Analyze Another Resume
                </button>
                <button
                  onClick={() => router.push('/build-resume')}
                  className="rounded-[6px] bg-[#171717] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#333333] sm:text-sm"
                >
                  Improve in Builder &rarr;
                </button>
              </div>
            </div>
          )}

          <ATSScoreResults results={analysisResults} />

          {/* Action Buttons Footer */}
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setUploadedFile(null)
                setAnalysisResults(null)
                if (isResultOnlyView) {
                  router.push('/ats-score')
                }
              }}
              className="rounded-[6px] border border-[#ebebeb] bg-white px-6 py-2.5 text-sm font-medium text-[#171717] transition-colors hover:bg-[#f5f5f5]"
            >
              Analyze Another Resume
            </button>
            <button
              onClick={() => router.push('/build-resume')}
              className="rounded-[6px] bg-[#171717] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
            >
              Build ATS-Optimized Resume &rarr;
            </button>
            <button
              onClick={() => window.print()}
              className="rounded-[6px] border border-[#ebebeb] bg-white px-6 py-2.5 text-sm font-medium text-[#171717] transition-colors hover:bg-[#f5f5f5]"
            >
              Print Report
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ATSScorePage
