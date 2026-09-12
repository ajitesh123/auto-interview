'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { ResumeData } from '../../../lib/resumeStore'
import { generateDOCX } from '../../../lib/docxGenerator'

interface TemplateSelectionPageProps {
  resumeData: ResumeData
  resumeId: string
  onBack: () => void
  initialTemplate?: 'harvard' | 'lbs' | 'stanford'
}

const TemplateSelectionPage = ({
  resumeData,
  resumeId,
  onBack,
  initialTemplate,
}: TemplateSelectionPageProps) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewHTML, setPreviewHTML] = useState<string>('')
  const [selectedTemplate, setSelectedTemplate] = useState<'harvard' | 'lbs' | 'stanford'>(
    initialTemplate || 'harvard'
  )

  // Debug log to track when component is rendered
  console.log('TemplateSelectionPage rendered with resumeId:', resumeId)

  // Preview is now only loaded when user clicks "Preview Resume" button

  const loadPreview = async (template: 'harvard' | 'lbs' | 'stanford' = selectedTemplate) => {
    try {
      console.log('Loading preview with resumeId:', resumeId, 'template:', template)
      const response = await fetch('/api/resume/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeId,
          template,
          data: resumeData,
          preview: true,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Preview generation failed:', response.status, errorText)
        throw new Error(`Failed to generate preview: ${response.status} ${errorText}`)
      }

      const html = await response.text()
      setPreviewHTML(html)
      setShowPreview(true)
    } catch (error) {
      console.error('Error generating preview:', error)
      setDownloadMessage(
        `Error generating preview: ${error instanceof Error ? error.message : 'Unknown error'}`
      )
      setTimeout(() => setDownloadMessage(null), 5000)
    }
  }

  const handleTemplateSelect = (template: 'harvard' | 'lbs' | 'stanford') => {
    setSelectedTemplate(template)
    // Preview will be loaded when user clicks "Preview Resume" button
  }

  const handlePreview = async () => {
    try {
      const response = await fetch('/api/resume/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeId,
          template: selectedTemplate,
          data: resumeData,
          preview: true,
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('Preview generation failed:', response.status, errorText)
        throw new Error(`Failed to generate preview: ${response.status} ${errorText}`)
      }

      const html = await response.text()

      // Use modal popup for all templates
      setPreviewHTML(html)
      setShowPreview(true)
    } catch (error) {
      console.error('Error generating preview:', error)
      setDownloadMessage('Error generating preview. Please try again.')
      setTimeout(() => setDownloadMessage(null), 5000)
    }
  }

  const handleDownload = async () => {
    setIsGenerating(true)
    setDownloadMessage(null)

    try {
      // Generate DOCX using client-side generation
      await generateDOCX(resumeData, selectedTemplate)

      setDownloadMessage('Resume downloaded successfully!')
      setTimeout(() => setDownloadMessage(null), 3000)
    } catch (error) {
      console.error('Error generating DOCX:', error)
      setDownloadMessage('Error generating DOCX. Please try again.')
      setTimeout(() => setDownloadMessage(null), 5000)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Header */}
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
            STEP 3 OF 3 • EXPORT
          </p>
          <h1 className="mb-3 text-3xl font-normal tracking-tight text-[#171717] sm:text-4xl">
            Your ATS-optimized resume is ready.
          </h1>
          <p className="text-sm text-[#4d4d4d]">
            Select your preferred layout format and download a clean, ATS-compliant DOCX file or
            inspect the live preview.
          </p>
        </div>

        {/* Success Message */}
        <div className="mb-8 rounded-[6px] border border-emerald-200 bg-emerald-50 p-4 text-sm">
          <div className="flex items-center">
            <svg
              className="mr-3 h-5 w-5 flex-shrink-0 text-emerald-600"
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
            <div>
              <h3 className="font-medium text-emerald-900">Resume Data Formatted Successfully</h3>
              <p className="mt-0.5 text-xs text-emerald-800">
                All sections have been validated against standard applicant tracking system schemas.
              </p>
            </div>
          </div>
        </div>

        {/* Template Selection Grid */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Harvard Template */}
          <div
            className={`group cursor-pointer rounded-[8px] border bg-white p-5 transition-all ${
              selectedTemplate === 'harvard'
                ? 'border-[#171717] shadow-sm ring-1 ring-[#171717]'
                : 'border-[#ebebeb] hover:border-[#171717]'
            }`}
            onClick={() => handleTemplateSelect('harvard')}
          >
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
                Clean, classic design favored by academic institutions and Fortune 500 recruiters.
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
                  Single-column ATS layout
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
                Executive-style format modeled after London Business School corporate standards.
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
                  Executive leadership format
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
                Modern layout engineered for technical roles, engineering leadership, and tech
                careers.
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
                  Engineering &amp; research layout
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
                  Project &amp; skill hierarchy
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download Message / Status */}
        {downloadMessage && (
          <div
            className={`mb-6 rounded-[6px] p-4 text-sm ${
              downloadMessage.includes('Error')
                ? 'border border-red-200 bg-red-50 text-red-700'
                : 'border border-emerald-200 bg-emerald-50 text-emerald-800'
            }`}
          >
            <div className="flex items-center">
              {downloadMessage.includes('Error') ? (
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
              {downloadMessage}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col justify-between gap-4 border-t border-[#ebebeb] pt-6 sm:flex-row">
          <button
            onClick={onBack}
            className="flex items-center justify-center rounded-[6px] border border-[#ebebeb] bg-white px-5 py-2.5 text-sm font-medium text-[#171717] transition-colors hover:bg-[#f5f5f5]"
          >
            &larr; Back to Builder
          </button>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handlePreview}
              className="flex items-center justify-center rounded-[6px] border border-[#171717] bg-white px-5 py-2.5 text-sm font-medium text-[#171717] transition-colors hover:bg-[#fafafa]"
            >
              <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
              Preview Resume
            </button>

            <button
              onClick={handleDownload}
              disabled={isGenerating}
              className="flex items-center justify-center rounded-[6px] bg-[#171717] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#333333] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating ? (
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
                  Generating DOCX...
                </>
              ) : (
                <>
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
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download DOCX Resume
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-[8px] border border-[#ebebeb] bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#ebebeb] px-5 py-4">
              <h3 className="text-sm font-medium text-[#171717]">
                Resume Preview —{' '}
                {selectedTemplate === 'harvard'
                  ? 'Harvard'
                  : selectedTemplate === 'lbs'
                    ? 'London Business School'
                    : 'Stanford'}{' '}
                Template
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-[#666666] transition-colors hover:text-[#171717]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto bg-[#fafafa] p-4">
              <div
                className="min-h-[60vh] w-full rounded-[6px] border border-[#ebebeb] bg-white p-6 shadow-sm"
                dangerouslySetInnerHTML={{ __html: previewHTML }}
              />
            </div>
            <div className="flex justify-end gap-3 border-t border-[#ebebeb] bg-white px-5 py-3.5">
              <button
                onClick={() => setShowPreview(false)}
                className="rounded-[6px] border border-[#ebebeb] bg-white px-4 py-2 text-sm font-medium text-[#171717] hover:bg-[#f5f5f5]"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowPreview(false)
                  handleDownload()
                }}
                className="rounded-[6px] bg-[#171717] px-4 py-2 text-sm font-medium text-white hover:bg-[#333333]"
              >
                Download DOCX
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TemplateSelectionPage
