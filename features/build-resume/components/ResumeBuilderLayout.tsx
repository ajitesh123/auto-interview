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
  validationErrors?: string[]
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
  validationErrors = [],
}: ResumeBuilderLayoutProps) => {
  const progress = ((currentSection + 1) / totalSections) * 100

  return (
    <div className="min-h-screen bg-chatgpt-dark text-chatgpt-text">
      {/* Header with Progress Bar */}
      <div className="sticky top-0 z-50 border-b border-chatgpt-border bg-chatgpt-card">
        <div className="mx-auto max-w-4xl px-4 py-4">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-medium text-chatgpt-textSecondary">
                Section {currentSection + 1} of {totalSections}
              </span>
              <span className="text-sm font-medium text-chatgpt-textSecondary">
                {Math.round(progress)}% Complete
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-chatgpt-border">
              <div
                className="h-2 rounded-full bg-chatgpt-accent transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Section Navigation */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-1">
              {SECTIONS.map((section, index) => (
                <button
                  key={index}
                  onClick={() => onSectionChange(index)}
                  className={`rounded-md px-3 py-1 text-xs font-medium transition-colors ${
                    index === currentSection
                      ? 'bg-accent-500 text-white'
                      : index < currentSection
                        ? 'bg-matte-gray text-gray-200 hover:bg-matte-light'
                        : 'bg-matte-dark text-gray-400 hover:bg-matte-gray'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Validation Errors */}
        {validationErrors.length > 0 && (
          <div className="mb-4 rounded-lg border border-red-700 bg-red-900 p-4">
            <div className="flex items-start">
              <svg
                className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-red-400"
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
                <h4 className="mb-2 text-sm font-medium text-red-200">
                  Please fill in all required fields:
                </h4>
                <ul className="space-y-1 text-sm text-red-300">
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
            className={`mb-4 rounded-lg p-4 ${
              saveMessage.includes('Error')
                ? 'border border-red-700 bg-red-900 text-red-200'
                : 'border border-green-700 bg-green-900 text-green-200'
            }`}
          >
            <div className="flex items-center">
              {saveMessage.includes('Error') ? (
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              ) : (
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

        <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-6">
          {children}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="sticky bottom-0 border-t border-chatgpt-border bg-chatgpt-card">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex justify-between">
            <button
              onClick={onPrevious}
              disabled={currentSection === 0}
              className="flex items-center rounded-lg bg-chatgpt-input px-6 py-3 font-semibold text-chatgpt-text transition-colors hover:bg-chatgpt-border disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Previous
            </button>

            <div className="flex space-x-4">
              <button
                onClick={onSave}
                disabled={isSaving}
                className="flex items-center rounded-lg bg-chatgpt-input px-6 py-3 font-semibold text-chatgpt-text transition-colors hover:bg-chatgpt-border disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <svg
                      className="-ml-1 mr-2 h-4 w-4 animate-spin text-white"
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
                  'Save Progress'
                )}
              </button>

              {currentSection < totalSections - 1 ? (
                <button
                  onClick={onNext}
                  className="flex items-center rounded-lg bg-chatgpt-accent px-6 py-3 font-semibold text-chatgpt-text transition-colors hover:bg-chatgpt-green/80"
                >
                  Next
                  <svg
                    className="ml-2 h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  onClick={onNext}
                  className="flex items-center rounded-lg bg-chatgpt-accent px-6 py-3 font-semibold text-chatgpt-text transition-colors hover:bg-chatgpt-green/80"
                >
                  Finish Resume
                  <svg
                    className="ml-2 h-4 w-4"
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
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilderLayout
