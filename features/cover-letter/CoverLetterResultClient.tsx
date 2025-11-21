'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface StoredCoverLetter {
  jobTitle: string
  company: string
  jobDescription: string
  coverLetter: string
}

const CoverLetterResultClient = () => {
  const router = useRouter()
  const [data, setData] = useState<StoredCoverLetter | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const stored = window.sessionStorage.getItem('coverLetter:lastResult')

    if (!stored) {
      router.replace('/cover-letter')
      return
    }

    try {
      setData(JSON.parse(stored))
    } catch (error) {
      console.error('Failed to parse stored cover letter', error)
      router.replace('/cover-letter')
      return
    }
  }, [router])

  const handleDownload = async () => {
    if (!data) return
    setIsDownloading(true)
    setMessage(null)
    try {
      const response = await fetch('/api/cover-letter/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          coverLetter: data.coverLetter,
          jobTitle: data.jobTitle,
          company: data.company,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate document')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `Cover_Letter_${data.company}_${data.jobTitle}.docx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      setMessage('Cover letter downloaded successfully!')
    } catch (error) {
      console.error('Error downloading cover letter:', error)
      setMessage(
        `Error downloading: ${error instanceof Error ? error.message : 'Failed to download'}`
      )
    } finally {
      setIsDownloading(false)
    }
  }

  const handleCopy = async () => {
    if (!data) return
    try {
      await navigator.clipboard.writeText(data.coverLetter)
      setMessage('Cover letter copied to clipboard!')
    } catch (error) {
      console.error('Error copying cover letter:', error)
      setMessage('Failed to copy to clipboard')
    }
  }

  if (!data) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-white">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-2 border-accent-500 border-t-transparent"></div>
          <p className="text-gray-300">Loading your cover letter...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 px-8 py-12">
      <div className="text-center">
        <h1 className="mb-3 text-4xl font-bold text-white">Your Cover Letter is Ready</h1>
        <p className="text-gray-300">
          Download, copy, or generate another cover letter anytime. This page provides a dedicated
          URL to track completion events.
        </p>
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="rounded-2xl border border-matte-gray bg-white p-6 shadow-xl">
          <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-gray-500">
            {data.jobTitle} @ {data.company}
          </div>
          <div className="max-h-[70vh] overflow-y-auto text-sm leading-relaxed text-gray-900">
            {data.coverLetter.split('\n').map((line, index) => (
              <p key={index} className="mb-3">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-matte-gray bg-matte-dark p-6 text-white">
          <h2 className="mb-4 text-2xl font-semibold">Next Steps</h2>
          <ul className="mb-6 space-y-3 text-gray-300">
            <li>• Review the generated cover letter</li>
            <li>• Download as DOCX or copy to clipboard</li>
            <li>• Return to the builder to create another version</li>
          </ul>

          {message && (
            <div
              className={`mb-4 rounded-lg p-3 text-sm ${
                message.toLowerCase().startsWith('error')
                  ? 'border border-red-500 bg-red-900/20 text-red-200'
                  : 'border border-green-500 bg-green-900/20 text-green-200'
              }`}
            >
              {message}
            </div>
          )}

          <div className="space-y-3">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-accent-500 to-accent-600 px-4 py-2 font-semibold text-white transition-colors hover:from-accent-400 hover:to-accent-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDownloading ? 'Preparing DOCX...' : 'Download DOCX'}
            </button>
            <button
              onClick={handleCopy}
              className="w-full rounded-lg border border-matte-gray px-4 py-2 font-semibold text-white transition-colors hover:bg-matte-light"
            >
              Copy to Clipboard
            </button>
            <button
              onClick={() => router.push('/cover-letter')}
              className="w-full rounded-lg bg-matte-gray px-4 py-2 font-semibold text-white transition-colors hover:bg-matte-light"
            >
              Create Another Cover Letter
            </button>
          </div>

          <div className="mt-6 rounded-lg bg-matte-light/70 p-4">
            <h3 className="mb-2 text-sm font-semibold text-white">Job Description Reference</h3>
            <p className="text-sm text-gray-300">{data.jobDescription}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoverLetterResultClient
