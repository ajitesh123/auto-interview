'use client'

import { useState, useEffect } from 'react'
import { ResumeData } from '../../../lib/resumeStore'

interface PreviewPanelProps {
  resumeData: ResumeData
  template: 'harvard' | 'lbs' | 'stanford'
  resumeId?: string | null
}

const PreviewPanel = ({ resumeData, template, resumeId }: PreviewPanelProps) => {
  const [previewHTML, setPreviewHTML] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const generatePreview = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/resume/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            resumeId: resumeId || 'preview',
            template,
            data: resumeData,
            preview: true,
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          throw new Error(`Failed to generate preview: ${response.status}`)
        }

        const html = await response.text()
        setPreviewHTML(html)
      } catch (err) {
        console.error('Error generating preview:', err)
        setError(err instanceof Error ? err.message : 'Failed to generate preview')
        setPreviewHTML('')
      } finally {
        setIsLoading(false)
      }
    }

    // Generate preview when data or template changes
    generatePreview()
  }, [resumeData, template, resumeId])

  return (
    <div className="sticky top-24 h-[calc(100vh-8rem)] w-full overflow-hidden rounded-lg border border-chatgpt-border bg-white">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-chatgpt-border bg-chatgpt-card px-4 py-3">
          <h3 className="text-sm font-semibold text-chatgpt-text">
            Preview - {template === 'harvard' ? 'Harvard' : template === 'lbs' ? 'LBS' : 'Stanford'}
          </h3>
          {isLoading && (
            <div className="flex items-center text-xs text-chatgpt-textSecondary">
              <svg
                className="mr-2 h-4 w-4 animate-spin"
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
              Updating...
            </div>
          )}
        </div>

        {/* Preview Content - Scaled to match final preview size */}
        <div className="flex-1 overflow-auto p-4">
          {error ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <svg
                  className="mx-auto mb-2 h-8 w-8 text-red-500"
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
                <p className="text-sm text-red-500">{error}</p>
              </div>
            </div>
          ) : previewHTML ? (
            <div className="flex h-full w-full items-start justify-center">
              {/* Render at actual document size - 8.5in width with proper scaling for sidebar */}
              <div className="flex items-start justify-center">
                {/* Scale down to fit sidebar while maintaining aspect ratio */}
                <div
                  className="bg-white shadow-lg"
                  style={{
                    width: '8.5in',
                    minHeight: '11in',
                    // Scale down to ~60% to fit sidebar and show actual font sizes (Calibri 11)
                    transform: 'scale(0.6)',
                    transformOrigin: 'top center',
                  }}
                  dangerouslySetInnerHTML={{ __html: previewHTML }}
                />
              </div>
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <svg
                  className="mx-auto mb-2 h-8 w-8 animate-pulse text-chatgpt-textSecondary"
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
                <p className="text-sm text-chatgpt-textSecondary">Loading preview...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PreviewPanel
