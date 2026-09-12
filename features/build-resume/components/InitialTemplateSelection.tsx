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
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      {/* Title and Description */}
      <div className="mb-10 max-w-3xl">
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
          STEP 1 OF 3 • SELECT TEMPLATE
        </p>
        <h1 className="mb-3 text-3xl font-normal tracking-tight text-[#171717] sm:text-4xl">
          Choose your resume template.
        </h1>
        <p className="text-sm text-[#4d4d4d]">
          Select a battle-tested ATS-friendly layout. You can preview and adjust your styling at any
          time.
        </p>
      </div>

      {/* Template Selection Grid */}
      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Harvard Template */}
        <div
          className={`group cursor-pointer rounded-[8px] border bg-white p-5 transition-all ${
            selectedTemplate === 'harvard'
              ? 'border-[#171717] shadow-sm ring-1 ring-[#171717]'
              : 'border-[#ebebeb] hover:border-[#171717]'
          }`}
          onClick={() => handleTemplateSelect('harvard')}
        >
          {/* Image Preview */}
          <div className="mb-4 overflow-hidden rounded-[6px] border border-[#ebebeb] bg-[#fafafa]">
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
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <h3 className="text-base font-medium text-[#171717]">Harvard Template</h3>
              {selectedTemplate === 'harvard' && (
                <span className="rounded-full bg-[#171717] px-2 py-0.5 font-mono text-[11px] text-white">
                  Selected
                </span>
              )}
            </div>
            <p className="mb-4 text-xs leading-relaxed text-[#666666]">
              Clean, classic design favored by top academic institutions and Fortune 500 recruiters.
              Features clear section demarcation.
            </p>
            <div className="space-y-1.5 border-t border-[#ebebeb] pt-3 text-xs text-[#666666]">
              <div className="flex items-center">
                <svg
                  className="mr-2 h-3.5 w-3.5 text-[#171717]"
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
                ATS-friendly single-column format
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-2 h-3.5 w-3.5 text-[#171717]"
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
                High contrast serif typography
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-2 h-3.5 w-3.5 text-[#171717]"
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
                Proven 99.4% parser accuracy
              </div>
            </div>
          </div>
        </div>

        {/* LBS Template */}
        <div
          className={`group cursor-pointer rounded-[8px] border bg-white p-5 transition-all ${
            selectedTemplate === 'lbs'
              ? 'border-[#171717] shadow-sm ring-1 ring-[#171717]'
              : 'border-[#ebebeb] hover:border-[#171717]'
          }`}
          onClick={() => handleTemplateSelect('lbs')}
        >
          {/* Image Preview */}
          <div className="mb-4 overflow-hidden rounded-[6px] border border-[#ebebeb] bg-[#fafafa]">
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
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <h3 className="text-base font-medium text-[#171717]">LBS Template</h3>
              {selectedTemplate === 'lbs' && (
                <span className="rounded-full bg-[#171717] px-2 py-0.5 font-mono text-[11px] text-white">
                  Selected
                </span>
              )}
            </div>
            <p className="mb-4 text-xs leading-relaxed text-[#666666]">
              Executive-style layout modeled after London Business School standards. Optimized for
              corporate, finance, and consulting roles.
            </p>
            <div className="space-y-1.5 border-t border-[#ebebeb] pt-3 text-xs text-[#666666]">
              <div className="flex items-center">
                <svg
                  className="mr-2 h-3.5 w-3.5 text-[#171717]"
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
                Executive leadership layout
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-2 h-3.5 w-3.5 text-[#171717]"
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
                Times New Roman typography
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-2 h-3.5 w-3.5 text-[#171717]"
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
                Quantitative impact emphasis
              </div>
            </div>
          </div>
        </div>

        {/* Stanford Template */}
        <div
          className={`group cursor-pointer rounded-[8px] border bg-white p-5 transition-all ${
            selectedTemplate === 'stanford'
              ? 'border-[#171717] shadow-sm ring-1 ring-[#171717]'
              : 'border-[#ebebeb] hover:border-[#171717]'
          }`}
          onClick={() => handleTemplateSelect('stanford')}
        >
          {/* Image Preview */}
          <div className="mb-4 overflow-hidden rounded-[6px] border border-[#ebebeb] bg-[#fafafa]">
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
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <h3 className="text-base font-medium text-[#171717]">Stanford Template</h3>
              {selectedTemplate === 'stanford' && (
                <span className="rounded-full bg-[#171717] px-2 py-0.5 font-mono text-[11px] text-white">
                  Selected
                </span>
              )}
            </div>
            <p className="mb-4 text-xs leading-relaxed text-[#666666]">
              Modern academic layout engineered for technical roles, research positions, engineering
              leadership, and tech careers.
            </p>
            <div className="space-y-1.5 border-t border-[#ebebeb] pt-3 text-xs text-[#666666]">
              <div className="flex items-center">
                <svg
                  className="mr-2 h-3.5 w-3.5 text-[#171717]"
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
                Tech &amp; research focused layout
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-2 h-3.5 w-3.5 text-[#171717]"
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
                Project &amp; publication hierarchy
              </div>
              <div className="flex items-center">
                <svg
                  className="mr-2 h-3.5 w-3.5 text-[#171717]"
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
                Optimal keyword density
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end border-t border-[#ebebeb] pt-6">
        <button
          onClick={handleContinue}
          disabled={!selectedTemplate}
          className={`flex items-center rounded-[6px] px-6 py-2.5 text-sm font-medium text-white transition-colors ${
            selectedTemplate ? 'bg-[#171717] hover:bg-[#333333]' : 'cursor-not-allowed bg-[#999999]'
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
              Template &rarr;
            </>
          ) : (
            'Select a template to continue'
          )}
        </button>
      </div>
    </div>
  )
}

export default InitialTemplateSelection
