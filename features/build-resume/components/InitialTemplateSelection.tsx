'use client'

import { useState } from 'react'
import Image from 'next/image'

interface InitialTemplateSelectionProps {
  onSelect: (template: 'harvard' | 'lbs' | 'stanford') => void
}

const InitialTemplateSelection = ({ onSelect }: InitialTemplateSelectionProps) => {
  const [selectedTemplate, setSelectedTemplate] = useState<'harvard' | 'lbs' | 'stanford' | null>(
    null
  )

  const handleTemplateSelect = (template: 'harvard' | 'lbs' | 'stanford') => {
    setSelectedTemplate(template)
  }

  const handleContinue = () => {
    if (selectedTemplate) {
      onSelect(selectedTemplate)
    }
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-matte-black px-4 py-8 sm:px-8 sm:py-12">
      {/* Title and Description */}
      <div className="mb-8 w-full max-w-6xl text-center sm:mb-12">
        <h1 className="mb-4 text-3xl font-bold leading-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
          Choose Your Resume Template
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-relaxed text-white sm:text-lg md:text-xl">
          Select a professional template to get started. You can preview and change your selection
          later.
        </p>
      </div>

      {/* Template Selection Grid */}
      <div className="mb-8 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {/* Harvard Template */}
        <div
          className={`cursor-pointer rounded-lg border-2 transition-all ${
            selectedTemplate === 'harvard'
              ? 'border-accent-500 bg-matte-dark shadow-lg shadow-accent-500/20'
              : 'border-matte-gray bg-matte-dark hover:border-accent-500/50'
          }`}
          onClick={() => handleTemplateSelect('harvard')}
        >
          <div className="p-6">
            {/* Image Preview */}
            <div className="mb-4 overflow-hidden rounded-lg border border-matte-gray">
              <div className="relative aspect-[8.5/11] w-full">
                <Image
                  src="/static/images/Harvard_Screenshot.png"
                  alt="Harvard Resume Template Preview"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Template Info */}
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-accent-500 to-accent-600">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Harvard Template
                  {selectedTemplate === 'harvard' && (
                    <span className="ml-2 text-accent-500">✓ Selected</span>
                  )}
                </h3>
              </div>
              <p className="mb-4 text-sm text-gray-300">
                Clean, professional design perfect for academic and professional settings. Features
                clear sections and elegant typography.
              </p>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 text-pink-500"
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
                  ATS-friendly format
                </div>
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 text-pink-500"
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
                  Clean typography
                </div>
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 text-pink-500"
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
                  Professional layout
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* LBS Template */}
        <div
          className={`cursor-pointer rounded-lg border-2 transition-all ${
            selectedTemplate === 'lbs'
              ? 'border-accent-500 bg-matte-dark shadow-lg shadow-accent-500/20'
              : 'border-matte-gray bg-matte-dark hover:border-accent-500/50'
          }`}
          onClick={() => handleTemplateSelect('lbs')}
        >
          <div className="p-6">
            {/* Image Preview */}
            <div className="mb-4 overflow-hidden rounded-lg border border-matte-gray">
              <div className="relative aspect-[8.5/11] w-full">
                <Image
                  src="/static/images/LBS_Screenshot.png"
                  alt="London Business School Resume Template Preview"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Template Info */}
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-accent-500 to-accent-600">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  London Business School Template
                  {selectedTemplate === 'lbs' && (
                    <span className="ml-2 text-accent-500">✓ Selected</span>
                  )}
                </h3>
              </div>
              <p className="mb-4 text-sm text-gray-300">
                Executive-style template with Times New Roman font, perfect for business school
                applications and corporate roles.
              </p>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 text-blue-500"
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
                  Executive format
                </div>
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 text-blue-500"
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
                  Times New Roman font
                </div>
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 text-blue-500"
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
                  Business-focused layout
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stanford Template */}
        <div
          className={`cursor-pointer rounded-lg border-2 transition-all ${
            selectedTemplate === 'stanford'
              ? 'border-accent-500 bg-matte-dark shadow-lg shadow-accent-500/20'
              : 'border-matte-gray bg-matte-dark hover:border-accent-500/50'
          }`}
          onClick={() => handleTemplateSelect('stanford')}
        >
          <div className="p-6">
            {/* Image Preview */}
            <div className="mb-4 overflow-hidden rounded-lg border border-matte-gray">
              <div className="relative aspect-[8.5/11] w-full">
                <Image
                  src="/static/images/Stanford_Screenshot.png"
                  alt="Stanford Resume Template Preview"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>

            {/* Template Info */}
            <div className="text-center">
              <div className="mb-2 flex items-center justify-center">
                <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-accent-500 to-accent-600">
                  <svg
                    className="h-5 w-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">
                  Stanford Template
                  {selectedTemplate === 'stanford' && (
                    <span className="ml-2 text-accent-500">✓ Selected</span>
                  )}
                </h3>
              </div>
              <p className="mb-4 text-sm text-gray-300">
                Academic-style template with Times New Roman font, perfect for graduate school
                applications and research positions.
              </p>
              <div className="space-y-2 text-xs text-gray-400">
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 text-accent-500"
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
                  Academic format
                </div>
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 text-accent-500"
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
                  Times New Roman font
                </div>
                <div className="flex items-center justify-center">
                  <svg
                    className="mr-2 h-4 w-4 text-accent-500"
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
                  Research-focused layout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex w-full max-w-6xl justify-center">
        <button
          onClick={handleContinue}
          disabled={!selectedTemplate}
          className={`flex items-center rounded-lg px-8 py-4 text-lg font-semibold text-white transition-all ${
            selectedTemplate
              ? 'bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-500 hover:to-accent-600 hover:shadow-lg hover:shadow-accent-500/25'
              : 'cursor-not-allowed bg-gray-700 opacity-50'
          }`}
        >
          {selectedTemplate ? (
            <>
              Continue with{' '}
              {selectedTemplate === 'harvard'
                ? 'Harvard'
                : selectedTemplate === 'lbs'
                  ? 'LBS'
                  : 'Stanford'}{' '}
              Template
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </>
          ) : (
            'Please select a template to continue'
          )}
        </button>
      </div>
    </div>
  )
}

export default InitialTemplateSelection
