'use client'

import { useState } from 'react'

interface CategoryScore {
  formatCompatibility: number
  keywordOptimization: number
  impactAndMetrics: number
  actionVerbs: number
  sectionCompleteness: number
}

interface Improvement {
  category: string
  priority: 'high' | 'medium' | 'low'
  currentText: string
  suggestedText: string
  reason: string
  scoreImpact: string
}

interface Strength {
  category: string
  description: string
  impact: string
  exampleText?: string
}

interface AnalysisResults {
  overallScore: number
  breakdown: CategoryScore
  breakdownMax: CategoryScore
  improvements: Improvement[]
  strengths: Strength[]
  recommendations: string[]
  keywordAnalysis?: {
    matched: string[]
    missing: string[]
    matchRate: number
  }
}

interface ATSScoreResultsProps {
  results: AnalysisResults
}

export default function ATSScoreResults({ results }: ATSScoreResultsProps) {
  const [activeTab, setActiveTab] = useState<
    'improvements' | 'strengths' | 'keywords' | 'recommendations'
  >('improvements')
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['breakdown']))
  const [showAllImprovements, setShowAllImprovements] = useState(false)
  const [expandedImprovements, setExpandedImprovements] = useState<Set<number>>(new Set([0])) // First improvement expanded by default

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const toggleImprovement = (index: number) => {
    const newExpanded = new Set(expandedImprovements)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedImprovements(newExpanded)
  }

  const getScoreLabel = (score: number): string => {
    if (score >= 85) return 'Excellent'
    if (score >= 70) return 'Good'
    if (score >= 55) return 'Average'
    if (score >= 40) return 'Below Average'
    return 'Needs Work'
  }

  const getScoreColor = (score: number): string => {
    if (score >= 85) return 'from-green-400 to-emerald-500'
    if (score >= 70) return 'from-blue-400 to-cyan-500'
    if (score >= 55) return 'from-yellow-400 to-orange-500'
    if (score >= 40) return 'from-orange-500 to-red-500'
    return 'from-red-500 to-rose-600'
  }

  const getPriorityBadge = (priority: string) => {
    const colors = {
      high: 'bg-red-500/10 text-red-400 ring-red-500/20',
      medium: 'bg-blue-500/10 text-blue-400 ring-blue-500/20',
      low: 'bg-green-500/10 text-green-400 ring-green-500/20',
    }
    return (
      <span
        className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${colors[priority as keyof typeof colors] || colors.medium}`}
      >
        {priority.toUpperCase()}
      </span>
    )
  }

  const topThreeImprovements = results.improvements.slice(0, 3)
  const visibleImprovements = showAllImprovements
    ? results.improvements
    : results.improvements.slice(0, 5)

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8">
      {/* Hero Score Section */}
      <div className="overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-slate-900/90 via-purple-900/30 to-slate-900/90 p-8 shadow-2xl backdrop-blur-xl">
        <div className="text-center">
          <div className="mb-4">
            <div className="inline-flex items-baseline gap-2">
              <span
                className={`bg-gradient-to-r ${getScoreColor(results.overallScore)} bg-clip-text text-7xl font-bold text-transparent`}
              >
                {results.overallScore}
              </span>
              <span className="text-3xl font-semibold text-gray-400">/100</span>
            </div>
          </div>

          {/* Score Bar */}
          <div className="mx-auto mb-4 h-3 w-full max-w-md overflow-hidden rounded-full bg-gray-800">
            <div
              className={`h-full bg-gradient-to-r ${getScoreColor(results.overallScore)} transition-all duration-1000 ease-out`}
              style={{ width: `${results.overallScore}%` }}
            />
          </div>

          <p className="text-xl font-semibold text-gray-300">
            {getScoreLabel(results.overallScore)}
            {results.overallScore < 85 && ' • Room for Improvement'}
          </p>
        </div>
      </div>

      {/* Top 3 Priority Fixes */}
      {topThreeImprovements.length > 0 && (
        <div className="rounded-xl border border-red-500/20 bg-gradient-to-br from-red-900/10 to-orange-900/10 p-6 backdrop-blur-sm">
          <h3 className="mb-4 text-lg font-bold text-white">Top Priority Fixes</h3>
          <div className="space-y-3">
            {topThreeImprovements.map((imp, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-lg bg-slate-900/50 p-4 transition-all hover:bg-slate-900/70"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-orange-500 text-sm font-bold text-white">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <span className="font-medium text-white">{imp.category}</span>
                </div>
                <div className="flex-shrink-0">
                  <span className="rounded-full bg-green-500/10 px-3 py-1 text-sm font-semibold text-green-400">
                    +{imp.scoreImpact} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
          {results.improvements.length > 3 && (
            <button
              onClick={() => {
                setActiveTab('improvements')
                setShowAllImprovements(true)
                // Scroll to detailed feedback after state update
                setTimeout(() => {
                  document
                    .getElementById('detailed-feedback')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 100)
              }}
              className="mt-4 w-full rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-500/20"
            >
              View All {results.improvements.length} Improvements →
            </button>
          )}
        </div>
      )}

      {/* Collapsible Score Breakdown */}
      <div className="overflow-hidden rounded-xl border border-purple-500/20 bg-slate-900/50 backdrop-blur-sm">
        <button
          onClick={() => toggleSection('breakdown')}
          className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-slate-900/70"
        >
          <h3 className="text-lg font-bold text-white">Score Breakdown</h3>
          <svg
            className={`h-5 w-5 text-gray-400 transition-transform ${expandedSections.has('breakdown') ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSections.has('breakdown') && (
          <div className="border-t border-purple-500/10 p-6 pt-4">
            <div className="space-y-4">
              {Object.entries(results.breakdown).map(([key, score]) => {
                const maxScore = results.breakdownMax[key as keyof CategoryScore]
                const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0
                const label = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase())

                return (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-gray-300">{label}</span>
                      <span className="text-gray-400">
                        {score}/{maxScore} ({Math.round(percentage)}%)
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-gray-800">
                      <div
                        className={`h-full bg-gradient-to-r ${getScoreColor(percentage)} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Tabbed Detailed Feedback */}
      <div
        id="detailed-feedback"
        className="rounded-xl border border-purple-500/20 bg-slate-900/50 backdrop-blur-sm"
      >
        {/* Tab Headers */}
        <div className="border-b border-purple-500/10 px-2 pt-2">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('improvements')}
              className={`rounded-t-lg px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'improvements'
                  ? 'bg-purple-500/20 text-purple-300'
                  : 'text-gray-400 hover:bg-slate-900/50 hover:text-gray-300'
              }`}
            >
              Improvements ({results.improvements.length})
            </button>
            <button
              onClick={() => setActiveTab('strengths')}
              className={`rounded-t-lg px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'strengths'
                  ? 'bg-purple-500/20 text-purple-300'
                  : 'text-gray-400 hover:bg-slate-900/50 hover:text-gray-300'
              }`}
            >
              Strengths ({results.strengths.length})
            </button>
            {results.keywordAnalysis && (
              <button
                onClick={() => setActiveTab('keywords')}
                className={`rounded-t-lg px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === 'keywords'
                    ? 'bg-purple-500/20 text-purple-300'
                    : 'text-gray-400 hover:bg-slate-900/50 hover:text-gray-300'
                }`}
              >
                Keywords ({results.keywordAnalysis.matched.length}/
                {results.keywordAnalysis.matched.length + results.keywordAnalysis.missing.length})
              </button>
            )}
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`rounded-t-lg px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === 'recommendations'
                  ? 'bg-purple-500/20 text-purple-300'
                  : 'text-gray-400 hover:bg-slate-900/50 hover:text-gray-300'
              }`}
            >
              Tips ({results.recommendations.length})
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Improvements Tab */}
          {activeTab === 'improvements' && (
            <div className="space-y-3">
              {visibleImprovements.map((imp, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg border border-purple-500/10 bg-slate-900/30"
                >
                  <button
                    onClick={() => toggleImprovement(index)}
                    className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-slate-900/50"
                  >
                    <div className="flex items-center gap-3">
                      {getPriorityBadge(imp.priority)}
                      <span className="font-medium text-white">{imp.category}</span>
                      <span className="text-sm text-green-400">+{imp.scoreImpact} pts</span>
                    </div>
                    <svg
                      className={`h-5 w-5 text-gray-400 transition-transform ${expandedImprovements.has(index) ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {expandedImprovements.has(index) && (
                    <div className="space-y-4 border-t border-purple-500/10 p-4">
                      {imp.currentText && (
                        <div>
                          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-400">
                            Current:
                          </label>
                          <div className="rounded-md bg-red-500/10 p-3 text-sm text-gray-300">
                            {imp.currentText}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-green-400">
                          Suggested:
                        </label>
                        <div className="rounded-md bg-green-500/10 p-3 text-sm text-gray-200">
                          {imp.suggestedText}
                        </div>
                      </div>

                      <div className="rounded-md bg-purple-500/5 p-3 text-sm text-gray-400">
                        <span className="font-semibold text-purple-300">Why: </span>
                        {imp.reason}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {!showAllImprovements && results.improvements.length > 5 && (
                <button
                  onClick={() => setShowAllImprovements(true)}
                  className="w-full rounded-lg border border-purple-500/20 bg-purple-500/5 px-4 py-3 text-sm font-medium text-purple-300 transition-colors hover:bg-purple-500/10"
                >
                  View {results.improvements.length - 5} More Improvements ▼
                </button>
              )}
            </div>
          )}

          {/* Strengths Tab */}
          {activeTab === 'strengths' && (
            <div className="space-y-3">
              {results.strengths.map((strength, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-green-500/10 bg-green-500/5 p-4"
                >
                  <h4 className="mb-2 font-semibold text-green-400">{strength.category}</h4>
                  <p className="mb-2 text-sm text-gray-300">{strength.description}</p>
                  <p className="text-xs text-gray-400">
                    <span className="font-semibold text-green-300">Impact: </span>
                    {strength.impact}
                  </p>
                  {strength.exampleText && (
                    <div className="mt-3 rounded-md bg-slate-900/50 p-2 text-xs text-gray-400">
                      "{strength.exampleText}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Keywords Tab */}
          {activeTab === 'keywords' && results.keywordAnalysis && (
            <div className="space-y-4">
              <div>
                <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-green-400">
                  <span></span>
                  Matched Keywords ({results.keywordAnalysis.matched.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.keywordAnalysis.matched.map((kw, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-green-500/10 px-3 py-1 text-sm text-green-300 ring-1 ring-green-500/20"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {results.keywordAnalysis.missing.length > 0 && (
                <div>
                  <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-red-400">
                    <span></span>
                    Missing Keywords ({results.keywordAnalysis.missing.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {results.keywordAnalysis.missing.map((kw, i) => (
                      <span
                        key={i}
                        className="rounded-full bg-red-500/10 px-3 py-1 text-sm text-red-300 ring-1 ring-red-500/20"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Recommendations Tab */}
          {activeTab === 'recommendations' && (
            <div className="space-y-3">
              {results.recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-purple-500/10 bg-purple-500/5 p-4"
                >
                  <p className="text-sm text-gray-300">{rec}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
