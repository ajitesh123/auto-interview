'use client'

import { useState, useEffect } from 'react'
import { ResumeData } from '../../../lib/resumeStore'
import { generateDOCX } from '../../../lib/docxGenerator'

interface TemplateSelectionPageProps {
  resumeData: ResumeData
  resumeId: string
  onBack: () => void
}

const TemplateSelectionPage = ({ resumeData, resumeId, onBack }: TemplateSelectionPageProps) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [previewHTML, setPreviewHTML] = useState<string>('')
  const [selectedTemplate, setSelectedTemplate] = useState<'harvard' | 'lbs' | 'stanford'>(
    'harvard'
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

      // Use popup modal for Harvard template only, new tab for LBS and Stanford
      if (selectedTemplate === 'harvard') {
        setPreviewHTML(html)
        setShowPreview(true)
      } else {
        // LBS and Stanford templates - open in new window
        const newWindow = window.open('', '_blank', 'width=800,height=600')
        if (newWindow) {
          newWindow.document.write(html)
          newWindow.document.close()
        } else {
          // Fallback to modal if popup blocked
          setPreviewHTML(html)
          setShowPreview(true)
        }
      }
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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Choose Your Resume Template</h1>
          <p className="text-xl text-gray-300">Select a professional template for your resume</p>
        </div>

        {/* Success Message */}
        <div className="mb-8 rounded-lg border border-green-700 bg-green-900 p-4">
          <div className="flex items-center">
            <svg
              className="mr-3 h-5 w-5 text-green-400"
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
              <h3 className="text-lg font-semibold text-green-200">
                Resume Data Saved Successfully!
              </h3>
              <p className="text-green-300">
                Your resume information has been saved and is ready for template selection.
              </p>
            </div>
          </div>
        </div>

        {/* Template Selection */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Harvard Template */}
          <div
            className={`cursor-pointer rounded-lg border p-6 transition-colors ${
              selectedTemplate === 'harvard'
                ? 'border-pink-500 bg-gray-700'
                : 'border-gray-700 bg-gray-800 hover:border-pink-500'
            }`}
            onClick={() => handleTemplateSelect('harvard')}
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-pink-700">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Harvard Template
                {selectedTemplate === 'harvard' && (
                  <span className="ml-2 text-pink-500">✓ Selected</span>
                )}
              </h3>
              <p className="mb-4 text-gray-300">
                Clean, professional design perfect for academic and professional settings. Features
                clear sections and elegant typography.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
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
                <div className="flex items-center">
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
                <div className="flex items-center">
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

          {/* LBS Template */}
          <div
            className={`cursor-pointer rounded-lg border p-6 transition-colors ${
              selectedTemplate === 'lbs'
                ? 'border-pink-500 bg-gray-700'
                : 'border-gray-700 bg-gray-800 hover:border-pink-500'
            }`}
            onClick={() => handleTemplateSelect('lbs')}
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-blue-500 to-blue-700">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                London Business School Template
                {selectedTemplate === 'lbs' && (
                  <span className="ml-2 text-blue-500">✓ Selected</span>
                )}
              </h3>
              <p className="mb-4 text-gray-300">
                Executive-style template with Times New Roman font, perfect for business school
                applications and corporate roles.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
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
                <div className="flex items-center">
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
                <div className="flex items-center">
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

          {/* Stanford Template */}
          <div
            className={`cursor-pointer rounded-lg border p-6 transition-colors ${
              selectedTemplate === 'stanford'
                ? 'border-pink-500 bg-gray-700'
                : 'border-gray-700 bg-gray-800 hover:border-pink-500'
            }`}
            onClick={() => handleTemplateSelect('stanford')}
          >
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-red-700">
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">
                Stanford Template
                {selectedTemplate === 'stanford' && (
                  <span className="ml-2 text-red-500">✓ Selected</span>
                )}
              </h3>
              <p className="mb-4 text-gray-300">
                Academic-style template with Times New Roman font, perfect for graduate school
                applications and research positions.
              </p>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-red-500"
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
                <div className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-red-500"
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
                <div className="flex items-center">
                  <svg
                    className="mr-2 h-4 w-4 text-red-500"
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

          <div className="rounded-lg border border-gray-600 bg-gray-800 p-6 opacity-60">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gray-600">
                <svg
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-400">Custom Templates</h3>
              <p className="mb-4 text-gray-500">Personalized templates tailored to your industry</p>
              <div className="text-sm text-gray-500">Tech, Finance, Healthcare, etc.</div>
            </div>
          </div>
        </div>

        {/* Download Message */}
        {downloadMessage && (
          <div
            className={`mb-6 rounded-lg p-4 ${
              downloadMessage.includes('Error')
                ? 'border border-red-700 bg-red-900 text-red-200'
                : 'border border-green-700 bg-green-900 text-green-200'
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
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={onBack}
            className="flex items-center justify-center rounded-lg bg-gray-700 px-8 py-3 font-semibold text-white transition-colors hover:bg-gray-600"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Resume Builder
          </button>

          <button
            onClick={handlePreview}
            className="flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            className="flex items-center justify-center rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 px-8 py-3 font-semibold text-white transition-colors hover:from-pink-400 hover:to-pink-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <svg
                  className="-ml-1 mr-2 h-5 w-5 animate-spin text-white"
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
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="mx-4 max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Resume Preview -{' '}
                {selectedTemplate === 'harvard'
                  ? 'Harvard'
                  : selectedTemplate === 'lbs'
                    ? 'London Business School'
                    : 'Stanford'}{' '}
                Template
              </h3>
              <button
                onClick={() => setShowPreview(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="max-h-[80vh] overflow-auto p-4">
              <div
                className="h-[70vh] w-full border-0 bg-white"
                dangerouslySetInnerHTML={{ __html: previewHTML }}
              />
            </div>
            <div className="flex justify-end gap-2 border-t p-4">
              <button
                onClick={() => setShowPreview(false)}
                className="rounded-lg bg-gray-200 px-4 py-2 text-gray-600 hover:bg-gray-300"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowPreview(false)
                  handleDownload()
                }}
                className="rounded-lg bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
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
