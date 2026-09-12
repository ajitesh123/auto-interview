'use client'

import { useState, ReactNode } from 'react'

interface ResumeBuilderLayoutProps {
  children: ReactNode
  currentSection: number
  onNext: () => void
  onPrevious: () => void
  onSectionChange: (section: number) => void
  onSave: () => void
  isSaving?: boolean
  saveMessage?: string | null
  totalSections?: number
  isResumeSaved?: boolean
  validationErrors?: string[]
  previewPanel?: ReactNode
}

const SECTIONS = [
  'Contact',
  'Education',
  'Experience',
  'Positions of Responsibility',
  'Projects',
  'Certifications',
  'Skills and Interests',
]

const ResumeBuilderLayout = ({
  children,
  currentSection,
  onNext,
  onPrevious,
  onSectionChange,
  onSave,
  isSaving = false,
  saveMessage = null,
  totalSections = SECTIONS.length,
  isResumeSaved = false,
  validationErrors = [],
  previewPanel,
}: ResumeBuilderLayoutProps) => {
  const progress = ((currentSection + 1) / totalSections) * 100

  return (
    <div className="w-full bg-[#fafafa]">
      {/* Header with Progress Bar */}
      <div className="sticky top-0 z-30 border-b border-[#ebebeb] bg-white/95 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          {/* Progress Bar */}
          <div className="mb-3">
            <div className="mb-1.5 flex items-center justify-between font-mono text-xs">
              <span className="text-[#666666]">
                SECTION {currentSection + 1} OF {totalSections}
              </span>
              <span className="font-medium text-[#171717]">{Math.round(progress)}% COMPLETE</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#ebebeb]">
              <div
                className="h-full rounded-full bg-[#171717] transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Section Navigation */}
          <div className="scrollbar-none flex items-center gap-1.5 overflow-x-auto pb-1">
            {SECTIONS.map((section, index) => (
              <button
                key={index}
                onClick={() => onSectionChange(index)}
                type="button"
                className={`whitespace-nowrap rounded-[6px] px-3 py-1.5 text-xs font-medium transition-colors ${
                  index === currentSection
                    ? 'bg-[#171717] text-white'
                    : index < currentSection
                      ? 'border border-[#ebebeb] bg-white text-[#171717] hover:bg-[#f5f5f5]'
                      : 'text-[#666666] hover:bg-[#f5f5f5] hover:text-[#171717]'
                }`}
              >
                {index + 1}. {section}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_500px] xl:grid-cols-[1.3fr_550px]">
          {/* Left Column - Form Content */}
          <div className="min-w-0">
            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="mb-4 rounded-[6px] border border-red-200 bg-red-50 p-4 text-sm">
                <div className="flex items-start">
                  <svg
                    className="mr-2 mt-0.5 h-4 w-4 flex-shrink-0 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <h4 className="mb-1 font-medium text-red-800">
                      Please complete required fields:
                    </h4>
                    <ul className="space-y-0.5 text-xs text-red-700">
                      {validationErrors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Save Message */}
            {saveMessage && (
              <div
                className={`mb-4 rounded-[6px] p-4 text-sm ${
                  saveMessage.includes('Error')
                    ? 'border border-red-200 bg-red-50 text-red-700'
                    : 'border border-emerald-200 bg-emerald-50 text-emerald-800'
                }`}
              >
                <div className="flex items-center">
                  {saveMessage.includes('Error') ? (
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="mr-2 h-4 w-4"
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
                  )}
                  {saveMessage}
                </div>
              </div>
            )}

            <div className="rounded-[8px] border border-[#ebebeb] bg-white p-6 shadow-sm sm:p-8">
              {children}
            </div>
          </div>

          {/* Right Column - Preview Panel */}
          {previewPanel && <div className="hidden lg:block">{previewPanel}</div>}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="sticky bottom-0 z-30 border-t border-[#ebebeb] bg-white/95 px-4 py-3.5 backdrop-blur-md sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <button
            onClick={onPrevious}
            disabled={currentSection === 0}
            type="button"
            className="flex items-center rounded-[6px] border border-[#ebebeb] bg-white px-4 py-2 text-sm font-medium text-[#171717] transition-colors hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-40"
          >
            &larr; Previous
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onSave}
              disabled={isSaving}
              type="button"
              className="flex items-center rounded-[6px] border border-[#ebebeb] bg-white px-4 py-2 text-sm font-medium text-[#171717] transition-colors hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSaving ? (
                <>
                  <svg
                    className="-ml-0.5 mr-2 h-3.5 w-3.5 animate-spin text-[#171717]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Saving...
                </>
              ) : (
                'Save Draft'
              )}
            </button>

            {currentSection < totalSections - 1 ? (
              <button
                onClick={onNext}
                type="button"
                className="flex items-center rounded-[6px] bg-[#171717] px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
              >
                Next &rarr;
              </button>
            ) : (
              <button
                onClick={onNext}
                disabled={!isResumeSaved}
                type="button"
                className={`flex items-center rounded-[6px] px-5 py-2 text-sm font-medium text-white transition-colors ${
                  isResumeSaved
                    ? 'bg-[#171717] hover:bg-[#333333]'
                    : 'cursor-not-allowed bg-[#999999]'
                }`}
                title={!isResumeSaved ? 'Please click "Save Draft" to proceed' : ''}
              >
                Finish &amp; Download &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilderLayout
