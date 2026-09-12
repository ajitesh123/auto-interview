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
  const [expandedImprovements, setExpandedImprovements] = useState<Set<number>>(new Set([0]))

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
    if (score >= 85) return 'Excellent ATS Compatibility'
    if (score >= 70) return 'Good • Minor Optimization Recommended'
    if (score >= 55) return 'Average • Significant Improvements Needed'
    if (score >= 40) return 'Below Average • Likely to be Filtered'
    return 'Critical • Major ATS Formatting Issues'
  }

  const getScoreBarColor = (score: number): string => {
    if (score >= 85) return 'bg-[#297a3a]'
    if (score >= 70) return 'bg-[#0284c7]'
    if (score >= 55) return 'bg-[#d97706]'
    return 'bg-[#dc2626]'
  }

  const getScoreBadge = (score: number) => {
    if (score >= 85) {
      return (
        <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800">
          Passed Screening
        </span>
      )
    }
    if (score >= 70) {
      return (
        <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-medium text-sky-800">
          Competitive
        </span>
      )
    }
    if (score >= 55) {
      return (
        <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-800">
          Needs Work
        </span>
      )
    }
    return (
      <span className="inline-flex items-center rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-800">
        At Risk
      </span>
    )
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return (
          <span className="inline-flex items-center rounded-[4px] border border-red-200 bg-red-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-red-700">
            High Priority
          </span>
        )
      case 'medium':
        return (
          <span className="inline-flex items-center rounded-[4px] border border-amber-200 bg-amber-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-amber-700">
            Medium
          </span>
        )
      case 'low':
        return (
          <span className="inline-flex items-center rounded-[4px] border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-emerald-700">
            Low
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center rounded-[4px] border border-[#ebebeb] bg-[#f5f5f5] px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider text-[#666666]">
            {priority}
          </span>
        )
    }
  }

  const topThreeImprovements = results.improvements.slice(0, 3)
  const visibleImprovements = showAllImprovements
    ? results.improvements
    : results.improvements.slice(0, 5)

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Hero Score Section */}
      <div
        className="rounded-[8px] border border-[#ebebeb] bg-white p-8 text-center sm:p-10"
        style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.04)' }}
      >
        <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
          ATS Compatibility Score
        </div>

        <div className="mb-4 inline-flex items-baseline gap-2">
          <span className="text-6xl font-normal tracking-tight text-[#171717] sm:text-7xl">
            {results.overallScore}
          </span>
          <span className="text-2xl font-normal text-[#8f8f8f]">/ 100</span>
        </div>

        {/* Score Bar */}
        <div className="mx-auto mb-4 h-2.5 w-full max-w-md overflow-hidden rounded-full bg-[#ebebeb]">
          <div
            className={`h-full ${getScoreBarColor(results.overallScore)} transition-all duration-700 ease-out`}
            style={{ width: `${results.overallScore}%` }}
          />
        </div>

        <div className="flex items-center justify-center gap-3">
          <p className="text-base font-medium text-[#171717]">
            {getScoreLabel(results.overallScore)}
          </p>
          {getScoreBadge(results.overallScore)}
        </div>
      </div>

      {/* Top 3 Priority Fixes */}
      {topThreeImprovements.length > 0 && (
        <div
          className="rounded-[8px] border border-[#ebebeb] bg-white p-6 sm:p-8"
          style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.04)' }}
        >
          <div className="mb-1 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            ACTIONABLE QUICK WINS
          </div>
          <h3 className="mb-4 text-xl font-normal tracking-tight text-[#171717]">
            Top Priority Fixes
          </h3>
          <div className="space-y-3">
            {topThreeImprovements.map((imp, i) => (
              <div
                key={i}
                className="flex items-center gap-4 rounded-[6px] border border-[#ebebeb] bg-[#fafafa] p-4 transition-colors hover:border-[#171717]"
              >
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#171717] text-xs font-semibold text-white">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-[#171717]">{imp.category}</span>
                  <p className="line-clamp-1 text-xs text-[#666666]">{imp.reason}</p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-800">
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
                setTimeout(() => {
                  document
                    .getElementById('detailed-feedback')
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }, 100)
              }}
              className="mt-4 w-full rounded-[6px] border border-[#ebebeb] bg-white py-2.5 text-sm font-medium text-[#171717] transition-colors hover:bg-[#f5f5f5]"
            >
              View All {results.improvements.length} Improvements &darr;
            </button>
          )}
        </div>
      )}

      {/* Collapsible Score Breakdown */}
      <div
        className="overflow-hidden rounded-[8px] border border-[#ebebeb] bg-white"
        style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.04)' }}
      >
        <button
          onClick={() => toggleSection('breakdown')}
          className="flex w-full items-center justify-between p-6 text-left transition-colors hover:bg-[#fafafa]"
        >
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
              COMPONENTS
            </div>
            <h3 className="text-lg font-normal tracking-tight text-[#171717]">Score Breakdown</h3>
          </div>
          <svg
            className={`h-5 w-5 text-[#8f8f8f] transition-transform ${expandedSections.has('breakdown') ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {expandedSections.has('breakdown') && (
          <div className="border-t border-[#ebebeb] p-6 pt-4">
            <div className="space-y-4">
              {Object.entries(results.breakdown).map(([key, score]) => {
                const maxScore = results.breakdownMax[key as keyof CategoryScore]
                const percentage = maxScore > 0 ? (score / maxScore) * 100 : 0
                const label = key
                  .replace(/([A-Z])/g, ' $1')
                  .replace(/^./, (str) => str.toUpperCase())

                return (
                  <div key={key} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-[#171717]">{label}</span>
                      <span className="font-mono text-xs text-[#666666]">
                        {score} / {maxScore} ({Math.round(percentage)}%)
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#ebebeb]">
                      <div
                        className={`h-full ${getScoreBarColor(percentage)} transition-all duration-500`}
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
        className="overflow-hidden rounded-[8px] border border-[#ebebeb] bg-white"
        style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.04)' }}
      >
        {/* Tab Headers */}
        <div className="border-b border-[#ebebeb] bg-[#fafafa] p-2">
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveTab('improvements')}
              className={`rounded-[6px] px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                activeTab === 'improvements'
                  ? 'shadow-xs border border-[#ebebeb] bg-white text-[#171717]'
                  : 'text-[#666666] hover:bg-white/60 hover:text-[#171717]'
              }`}
            >
              Improvements ({results.improvements.length})
            </button>
            <button
              onClick={() => setActiveTab('strengths')}
              className={`rounded-[6px] px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                activeTab === 'strengths'
                  ? 'shadow-xs border border-[#ebebeb] bg-white text-[#171717]'
                  : 'text-[#666666] hover:bg-white/60 hover:text-[#171717]'
              }`}
            >
              Strengths ({results.strengths.length})
            </button>
            {results.keywordAnalysis && (
              <button
                onClick={() => setActiveTab('keywords')}
                className={`rounded-[6px] px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                  activeTab === 'keywords'
                    ? 'shadow-xs border border-[#ebebeb] bg-white text-[#171717]'
                    : 'text-[#666666] hover:bg-white/60 hover:text-[#171717]'
                }`}
              >
                Keywords ({results.keywordAnalysis.matched.length}/
                {results.keywordAnalysis.matched.length + results.keywordAnalysis.missing.length})
              </button>
            )}
            <button
              onClick={() => setActiveTab('recommendations')}
              className={`rounded-[6px] px-4 py-2 text-xs font-medium transition-all sm:text-sm ${
                activeTab === 'recommendations'
                  ? 'shadow-xs border border-[#ebebeb] bg-white text-[#171717]'
                  : 'text-[#666666] hover:bg-white/60 hover:text-[#171717]'
              }`}
            >
              Recommendations ({results.recommendations.length})
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
                  className="overflow-hidden rounded-[6px] border border-[#ebebeb] bg-white"
                >
                  <button
                    onClick={() => toggleImprovement(index)}
                    className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-[#fafafa]"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      {getPriorityBadge(imp.priority)}
                      <span className="text-sm font-medium text-[#171717]">{imp.category}</span>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                        +{imp.scoreImpact} pts
                      </span>
                    </div>
                    <svg
                      className={`h-4 w-4 text-[#8f8f8f] transition-transform ${expandedImprovements.has(index) ? 'rotate-180' : ''}`}
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
                    <div className="space-y-4 border-t border-[#ebebeb] bg-[#fafafa] p-4">
                      {imp.currentText && (
                        <div>
                          <label className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-rose-700">
                            Current text:
                          </label>
                          <div className="rounded-[4px] border border-rose-200 bg-rose-50/50 p-3 font-mono text-xs text-rose-950">
                            {imp.currentText}
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="mb-1 block font-mono text-[11px] uppercase tracking-wider text-emerald-700">
                          Suggested enhancement:
                        </label>
                        <div className="rounded-[4px] border border-emerald-200 bg-emerald-50/50 p-3 font-mono text-xs text-emerald-950">
                          {imp.suggestedText}
                        </div>
                      </div>

                      <div className="rounded-[4px] border border-[#ebebeb] bg-white p-3 text-xs text-[#666666]">
                        <span className="font-medium text-[#171717]">Rationale: </span>
                        {imp.reason}
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {!showAllImprovements && results.improvements.length > 5 && (
                <button
                  onClick={() => setShowAllImprovements(true)}
                  className="w-full rounded-[6px] border border-[#ebebeb] bg-[#fafafa] py-2.5 text-sm font-medium text-[#171717] transition-colors hover:bg-[#f0f0f0]"
                >
                  Show All {results.improvements.length} Improvements &darr;
                </button>
              )}
            </div>
          )}

          {/* Strengths Tab */}
          {activeTab === 'strengths' && (
            <div className="space-y-3">
              {results.strengths.map((strength, index) => (
                <div key={index} className="rounded-[6px] border border-[#ebebeb] bg-[#fafafa] p-4">
                  <h4 className="mb-1 text-sm font-medium text-[#171717]">{strength.category}</h4>
                  <p className="mb-2 text-xs text-[#666666]">{strength.description}</p>
                  <p className="text-xs text-emerald-700">
                    <span className="font-medium">Impact: </span>
                    {strength.impact}
                  </p>
                  {strength.exampleText && (
                    <div className="mt-3 rounded-[4px] border border-[#ebebeb] bg-white p-2.5 font-mono text-xs text-[#666666]">
                      "{strength.exampleText}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Keywords Tab */}
          {activeTab === 'keywords' && results.keywordAnalysis && (
            <div className="space-y-5">
              <div>
                <h4 className="mb-3 font-mono text-[11px] uppercase tracking-wider text-emerald-800">
                  Matched Keywords ({results.keywordAnalysis.matched.length})
                </h4>
                <div className="flex flex-wrap gap-2">
                  {results.keywordAnalysis.matched.map((kw, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-800"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>

              {results.keywordAnalysis.missing.length > 0 && (
                <div>
                  <h4 className="mb-3 font-mono text-[11px] uppercase tracking-wider text-rose-800">
                    Missing Keywords ({results.keywordAnalysis.missing.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {results.keywordAnalysis.missing.map((kw, i) => (
                      <span
                        key={i}
                        className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-medium text-rose-800"
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
                  className="rounded-[6px] border border-[#ebebeb] bg-[#fafafa] p-4 text-xs leading-relaxed text-[#4d4d4d]"
                >
                  {rec}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
