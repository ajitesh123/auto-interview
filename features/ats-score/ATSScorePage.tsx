'use client'

import { useState } from 'react'

interface CategoryScore {
  formatStructure: number
  keywordsSkills: number
  contentQuality: number
  atsCompatibility: number
  contactInfo: number
  experienceRelevance: number
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

interface AnalysisResults {
  overallScore: number
  categoryScores: CategoryScore
  strengths: Strength[]
  improvements: Improvement[]
  summary: string
  recommendations: string[]
}

const ATSScorePage = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResults, setAnalysisResults] = useState<AnalysisResults | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type !== 'application/pdf') {
        setError('Please upload a PDF file only')
        return
      }
      setUploadedFile(file)
      setError(null)
      setAnalysisResults(null)
    }
  }

  const handleAnalyze = async () => {
    if (!uploadedFile) return

    setIsAnalyzing(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', uploadedFile)

      const response = await fetch('/api/ats/analyze', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to analyze resume')
      }

      const data = await response.json()
      setAnalysisResults(data)
    } catch (err) {
      setError('Failed to analyze resume. Please try again.')
      console.error('Analysis error:', err)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black px-8 py-12">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/4 top-0 h-96 w-96 animate-pulse rounded-full bg-cyan-500/5 blur-3xl"></div>
        <div
          className="absolute bottom-0 right-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500/5 blur-3xl"
          style={{ animationDelay: '1s' }}
        ></div>
        <div
          className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform animate-pulse rounded-full bg-blue-500/5 blur-3xl"
          style={{ animationDelay: '2s' }}
        ></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-6 inline-block">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 to-purple-500 shadow-2xl shadow-cyan-500/25">
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <h1 className="mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-6xl font-bold tracking-tight text-transparent">
            ATS Resume Analyzer
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-400">
            Advanced AI-powered resume analysis with{' '}
            <span className="font-semibold text-cyan-400">quantum-level precision</span> for maximum
            ATS compatibility
          </p>
        </div>

        {/* Upload Section */}
        {!analysisResults && (
          <div className="mx-auto mb-8 w-full max-w-3xl">
            <div className="rounded-3xl border border-gray-800/50 bg-gray-900/50 p-12 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <div className="text-center">
                {/* Futuristic Upload Icon */}
                <div className="relative mb-8">
                  <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-2xl shadow-cyan-500/25">
                    <svg
                      className="h-12 w-12 text-white"
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
                  {/* Animated rings */}
                  <div className="absolute inset-0 mx-auto h-24 w-24 animate-ping rounded-3xl border-2 border-cyan-400/30"></div>
                  <div className="absolute inset-2 mx-auto h-20 w-20 animate-pulse rounded-2xl border border-purple-400/20"></div>
                </div>

                <h3 className="mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent">
                  Upload Your Resume
                </h3>
                <p className="mb-8 text-lg leading-relaxed text-gray-400">
                  Drop your PDF resume for{' '}
                  <span className="font-semibold text-cyan-400">advanced AI analysis</span> and
                  optimization
                </p>

                {error && (
                  <div className="mb-6 rounded-2xl border border-red-500/50 bg-red-900/20 p-4 backdrop-blur-sm">
                    <p className="text-red-300">{error}</p>
                  </div>
                )}

                <div className="mb-8">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="resume-upload"
                  />
                  <label
                    htmlFor="resume-upload"
                    className="group inline-flex cursor-pointer items-center rounded-2xl border-2 border-dashed border-gray-700 bg-gray-800/30 px-8 py-4 backdrop-blur-sm transition-all duration-300 hover:border-cyan-400 hover:bg-gray-800/50"
                  >
                    <svg
                      className="mr-3 h-6 w-6 text-gray-400 transition-colors group-hover:text-cyan-400"
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
                    <span className="text-gray-300 transition-colors group-hover:text-white">
                      {uploadedFile ? uploadedFile.name : 'Choose PDF file or drag & drop'}
                    </span>
                  </label>
                </div>

                <button
                  onClick={handleAnalyze}
                  disabled={!uploadedFile || isAnalyzing}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 px-12 py-4 text-lg font-semibold text-white shadow-2xl shadow-cyan-500/25 transition-all duration-300 hover:shadow-cyan-500/40 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                  {isAnalyzing ? (
                    <div className="relative z-10 flex items-center">
                      {/* Cursor-style loading animation */}
                      <div className="relative mr-4">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        <div
                          className="absolute inset-0 h-6 w-6 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent"
                          style={{ animationDelay: '0.15s', animationDuration: '0.6s' }}
                        ></div>
                        <div
                          className="absolute inset-1 h-4 w-4 animate-spin rounded-full border border-purple-300 border-t-transparent"
                          style={{ animationDelay: '0.3s', animationDuration: '0.4s' }}
                        ></div>
                      </div>
                      <span className="relative z-10">Analyzing Resume...</span>
                    </div>
                  ) : (
                    <span className="relative z-10">Analyze Resume</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {analysisResults && (
          <div className="space-y-12">
            {/* Overall Score */}
            <div className="rounded-3xl border border-gray-800/50 bg-gray-900/30 p-12 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <div className="text-center">
                <h2 className="mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-4xl font-bold text-transparent">
                  ATS Compatibility Score
                </h2>

                {/* Futuristic Score Display */}
                <div className="relative mb-8 inline-block">
                  <div className="relative">
                    <div
                      className={`text-9xl font-bold ${getScoreColor(analysisResults.overallScore)} mb-2 drop-shadow-2xl`}
                    >
                      {analysisResults.overallScore}
                    </div>
                    <div className="text-3xl font-light text-gray-400">/ 100</div>

                    {/* Animated score indicator */}
                    <div
                      className={`absolute -right-4 -top-4 h-8 w-8 ${getScoreBgColor(analysisResults.overallScore)} animate-pulse rounded-full shadow-lg`}
                    ></div>

                    {/* Glowing effect */}
                    <div
                      className={`absolute inset-0 ${getScoreColor(analysisResults.overallScore)} opacity-20 blur-xl`}
                    ></div>
                  </div>
                </div>

                <p className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-400">
                  {analysisResults.summary}
                </p>

                {/* Potential Score Improvement */}
                {analysisResults.improvements.length > 0 && (
                  <div className="mt-8 rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-purple-900/20 p-6 backdrop-blur-sm">
                    <div className="mb-3 flex items-center justify-center space-x-4">
                      <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-400"></div>
                      <p className="text-xl font-semibold text-cyan-300">
                        Potential Score Improvement: +
                        {Math.min(
                          analysisResults.improvements.reduce((total, improvement) => {
                            const points = parseInt(improvement.scoreImpact) || 0
                            return total + points
                          }, 0),
                          100 - analysisResults.overallScore
                        )}{' '}
                        points
                      </p>
                      <div
                        className="h-3 w-3 animate-pulse rounded-full bg-purple-400"
                        style={{ animationDelay: '0.5s' }}
                      ></div>
                    </div>
                    <p className="text-sm text-gray-400">
                      Apply all suggested improvements to reach your maximum ATS score
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Category Scores */}
            <div className="rounded-3xl border border-gray-800/50 bg-gray-900/30 p-10 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <h3 className="mb-10 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-center text-3xl font-bold text-transparent">
                Category Breakdown
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {Object.entries(analysisResults.categoryScores).map(([category, score]) => (
                  <div
                    key={category}
                    className="group rounded-2xl border border-gray-700/50 bg-gray-800/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gray-600/50"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="text-lg font-semibold capitalize text-white transition-colors group-hover:text-gray-200">
                        {category.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <span className={`text-2xl font-bold ${getScoreColor(score)} drop-shadow-lg`}>
                        {score}
                      </span>
                    </div>
                    <div className="relative">
                      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-700/50">
                        <div
                          className={`h-3 rounded-full ${getScoreBgColor(score)} shadow-lg transition-all duration-1000 ease-out`}
                          style={{ width: `${score}%` }}
                        ></div>
                      </div>
                      {/* Glowing effect */}
                      <div
                        className={`absolute inset-0 ${getScoreColor(score)} opacity-20 blur-sm`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths */}
            <div className="rounded-lg border border-gray-700 bg-gray-900 p-8">
              <h3 className="mb-6 text-2xl font-bold text-white">Strengths</h3>
              <div className="space-y-4">
                {analysisResults.strengths.map((strength, index) => (
                  <div key={index} className="rounded-lg bg-gray-800 p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
                        <svg
                          className="h-4 w-4 text-white"
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
                      </div>
                      <div className="flex-1">
                        <h4 className="mb-2 text-lg font-semibold text-white">
                          {strength.category}
                        </h4>
                        <p className="mb-3 text-gray-300">{strength.description}</p>
                        <p className="mb-3 text-sm text-green-400">{strength.impact}</p>
                        {strength.exampleText && (
                          <div className="rounded-lg border border-green-700 bg-green-900 p-3">
                            <p className="mb-1 text-sm text-gray-400">Example from your resume:</p>
                            <p className="italic text-green-200">"{strength.exampleText}"</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Improvements */}
            <div className="rounded-3xl border border-gray-800/50 bg-gray-900/30 p-10 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <div className="mb-10 flex items-center justify-between">
                <h3 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-3xl font-bold text-transparent">
                  Improvement Suggestions
                </h3>
                {analysisResults.improvements.length > 0 && (
                  <div className="text-right">
                    <p className="text-lg text-gray-400">
                      Current Score:{' '}
                      <span className="font-bold text-white">
                        {analysisResults.overallScore}/100
                      </span>
                    </p>
                    <p className="text-lg text-cyan-400">
                      Potential Score:{' '}
                      <span className="font-bold text-cyan-300">
                        {Math.min(
                          analysisResults.overallScore +
                            analysisResults.improvements.reduce((total, improvement) => {
                              const points = parseInt(improvement.scoreImpact) || 0
                              return total + points
                            }, 0),
                          100
                        )}
                        /100
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Categorized Improvements */}
              {(() => {
                // Group improvements by category
                const categorizedImprovements = analysisResults.improvements.reduce(
                  (acc, improvement, index) => {
                    const category = improvement.category.toLowerCase().replace(/\s+/g, '-')
                    if (!acc[category]) {
                      acc[category] = {
                        categoryName: improvement.category,
                        improvements: [],
                        totalPoints: 0,
                      }
                    }
                    acc[category].improvements.push({ ...improvement, originalIndex: index })
                    acc[category].totalPoints += parseInt(improvement.scoreImpact) || 0
                    return acc
                  },
                  {} as any
                )

                // Define category colors and icons
                const categoryConfig = {
                  'content-quality': {
                    color: 'from-red-500 to-pink-500',
                    icon: '📝',
                    bgColor: 'from-red-900/20 to-pink-900/20',
                  },
                  keywords: {
                    color: 'from-blue-500 to-cyan-500',
                    icon: '🔍',
                    bgColor: 'from-blue-900/20 to-cyan-900/20',
                  },
                  achievements: {
                    color: 'from-green-500 to-emerald-500',
                    icon: '🏆',
                    bgColor: 'from-green-900/20 to-emerald-900/20',
                  },
                  'skills-section': {
                    color: 'from-purple-500 to-violet-500',
                    icon: '⚡',
                    bgColor: 'from-purple-900/20 to-violet-900/20',
                  },
                  experience: {
                    color: 'from-orange-500 to-yellow-500',
                    icon: '💼',
                    bgColor: 'from-orange-900/20 to-yellow-900/20',
                  },
                  'format-structure': {
                    color: 'from-indigo-500 to-blue-500',
                    icon: '📋',
                    bgColor: 'from-indigo-900/20 to-blue-900/20',
                  },
                  'ats-compatibility': {
                    color: 'from-teal-500 to-green-500',
                    icon: '🤖',
                    bgColor: 'from-teal-900/20 to-green-900/20',
                  },
                  'contact-info': {
                    color: 'from-gray-500 to-slate-500',
                    icon: '📞',
                    bgColor: 'from-gray-900/20 to-slate-900/20',
                  },
                }

                return Object.entries(categorizedImprovements).map(
                  ([categoryKey, categoryData]: [string, any]) => {
                    const config =
                      categoryConfig[categoryKey as keyof typeof categoryConfig] ||
                      categoryConfig['content-quality']

                    return (
                      <div key={categoryKey} className="mb-12">
                        {/* Category Header */}
                        <div className="mb-8">
                          <div className="mb-4 flex items-center space-x-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 shadow-lg shadow-cyan-500/25">
                              <span className="text-2xl">{config.icon}</span>
                            </div>
                            <div>
                              <h4 className="text-2xl font-bold text-white">
                                {categoryData.categoryName}
                              </h4>
                              <p className="text-gray-400">
                                {categoryData.improvements.length} improvement
                                {categoryData.improvements.length !== 1 ? 's' : ''} •
                                <span className="ml-1 font-semibold text-cyan-400">
                                  +{categoryData.totalPoints} points
                                </span>
                              </p>
                            </div>
                          </div>

                          {/* Category Progress Bar */}
                          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700/30">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${config.color} transition-all duration-1000 ease-out`}
                              style={{
                                width: `${Math.min((categoryData.totalPoints / 25) * 100, 100)}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Improvements in this category */}
                        <div className="space-y-6">
                          {categoryData.improvements.map((improvement: any, index: number) => (
                            <div
                              key={improvement.originalIndex}
                              className="group overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm transition-all duration-500 hover:border-gray-600/50"
                            >
                              {/* Header */}
                              <div
                                className={`bg-gradient-to-r ${config.bgColor} border-b border-gray-600/50 px-8 py-6`}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-6">
                                    <div className="relative">
                                      <div
                                        className={`h-12 w-12 bg-gradient-to-r ${config.color} flex items-center justify-center rounded-2xl shadow-lg`}
                                      >
                                        <span className="text-lg font-bold text-white">
                                          {index + 1}
                                        </span>
                                      </div>
                                      {/* Animated ring */}
                                      <div
                                        className={`absolute inset-0 h-12 w-12 animate-pulse rounded-2xl border border-cyan-400/30`}
                                      ></div>
                                    </div>
                                    <div>
                                      <h5 className="text-lg font-semibold text-white transition-colors group-hover:text-gray-200">
                                        {improvement.category}
                                      </h5>
                                      <p className="mt-1 text-gray-400">{improvement.reason}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-4">
                                    {improvement.scoreImpact && (
                                      <span className="rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-500/25">
                                        +{improvement.scoreImpact} POINTS
                                      </span>
                                    )}
                                    <span
                                      className={`rounded-xl px-4 py-2 text-sm font-medium text-white ${getPriorityColor(improvement.priority)} shadow-lg`}
                                    >
                                      {improvement.priority.toUpperCase()}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Content */}
                              <div className="p-8">
                                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                                  {/* Current Text */}
                                  <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                      <div className="h-4 w-4 animate-pulse rounded-full bg-red-500"></div>
                                      <h6 className="text-sm font-semibold uppercase tracking-wider text-red-400">
                                        Current Text
                                      </h6>
                                    </div>
                                    <div className="rounded-xl border border-red-500/30 bg-red-900/20 p-6 backdrop-blur-sm">
                                      <p className="text-lg italic leading-relaxed text-red-200">
                                        "{improvement.currentText}"
                                      </p>
                                    </div>
                                  </div>

                                  {/* Suggested Text */}
                                  <div className="space-y-4">
                                    <div className="flex items-center space-x-3">
                                      <div
                                        className="h-4 w-4 animate-pulse rounded-full bg-green-500"
                                        style={{ animationDelay: '0.5s' }}
                                      ></div>
                                      <h6 className="text-sm font-semibold uppercase tracking-wider text-green-400">
                                        Improved Text
                                      </h6>
                                    </div>
                                    <div className="rounded-xl border border-green-500/30 bg-green-900/20 p-6 backdrop-blur-sm">
                                      <p className="text-lg leading-relaxed text-green-200">
                                        "{improvement.suggestedText}"
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Impact Explanation */}
                                <div className="mt-8 rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20 p-6 backdrop-blur-sm">
                                  <div className="flex items-start space-x-4">
                                    <div className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                                      <svg
                                        className="h-4 w-4 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                      </svg>
                                    </div>
                                    <div>
                                      <h6 className="mb-2 text-lg font-semibold text-blue-300">
                                        Why This Change Helps
                                      </h6>
                                      <p className="leading-relaxed text-blue-200">
                                        {improvement.reason}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }
                )
              })()}
            </div>

            {/* Recommendations */}
            <div className="rounded-lg border border-gray-700 bg-gray-900 p-8">
              <h3 className="mb-6 text-2xl font-bold text-white">Quick Recommendations</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {analysisResults.recommendations.map((recommendation, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 rounded-lg bg-gray-800 p-4"
                  >
                    <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
                      <span className="text-sm text-white">{index + 1}</span>
                    </div>
                    <p className="text-gray-300">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => {
                  setAnalysisResults(null)
                  setUploadedFile(null)
                }}
                className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-600"
              >
                Analyze Another Resume
              </button>
              <button
                onClick={() => window.print()}
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Print Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ATSScorePage
