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

    generatePreview()
  }, [resumeData, template, resumeId])

  return (
    <div className="sticky top-24 h-[calc(100vh-8rem)] w-full overflow-hidden rounded-[8px] border border-[#ebebeb] bg-white shadow-sm">
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ebebeb] bg-[#fafafa] px-4 py-2.5">
          <h3 className="font-mono text-xs uppercase tracking-[0.05em] text-[#171717]">
            LIVE PREVIEW • {template.toUpperCase()}
          </h3>
          {isLoading && (
            <div className="flex items-center font-mono text-[11px] text-[#666666]">
              <svg
                className="mr-1.5 h-3.5 w-3.5 animate-spin text-[#171717]"
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
              UPDATING...
            </div>
          )}
        </div>

        {/* Simple scrollable preview */}
        <div className="flex-1 overflow-auto bg-white p-4">
          {error ? (
            <div className="flex h-full items-center justify-center">
              <div className="p-4 text-center">
                <p className="text-xs text-red-600">{error}</p>
              </div>
            </div>
          ) : previewHTML ? (
            <div dangerouslySetInnerHTML={{ __html: previewHTML }} style={{ color: '#000000' }} />
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-xs text-[#999999]">Loading live preview...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PreviewPanel
