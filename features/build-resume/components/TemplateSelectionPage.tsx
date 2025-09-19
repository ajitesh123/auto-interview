'use client'

import { useState } from 'react'
import { ResumeData } from '../../../../lib/resumeStore'

interface TemplateSelectionPageProps {
  resumeData: ResumeData
  resumeId: string
  onBack: () => void
}

const TemplateSelectionPage = ({ resumeData, resumeId, onBack }: TemplateSelectionPageProps) => {
  const [isGenerating, setIsGenerating] = useState(false)
  const [downloadMessage, setDownloadMessage] = useState<string | null>(null)

  const handleDownload = async () => {
    setIsGenerating(true)
    setDownloadMessage(null)

    try {
      // Generate PDF using the resume data
      const response = await fetch('/api/resume/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resumeId,
          template: 'harvard',
          data: resumeData,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate PDF')
      }

      // Create blob and download
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${resumeData.contact.name.replace(/\s+/g, '_')}_Resume.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      setDownloadMessage('Resume downloaded successfully!')
      setTimeout(() => setDownloadMessage(null), 3000)
    } catch (error) {
      console.error('Error generating PDF:', error)
      setDownloadMessage('Error generating PDF. Please try again.')
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
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Harvard Template */}
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-6 transition-colors hover:border-pink-500">
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
              <h3 className="mb-2 text-xl font-bold text-white">Harvard Template</h3>
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

          {/* Coming Soon Templates */}
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
              <h3 className="mb-2 text-xl font-bold text-gray-400">More Templates</h3>
              <p className="mb-4 text-gray-500">Additional professional templates coming soon!</p>
              <div className="text-sm text-gray-500">Modern, Creative, Executive styles</div>
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
                Generating PDF...
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
                Download Resume
              </>
            )}
          </button>
        </div>

        {/* Resume Preview */}
        <div className="mt-12 rounded-lg border border-gray-700 bg-gray-800 p-6">
          <h3 className="mb-4 text-xl font-bold text-white">Resume Preview</h3>
          <div className="rounded-lg bg-white p-6 text-black">
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold">{resumeData.contact.name || 'Your Name'}</h2>
              <div className="text-gray-600">
                {resumeData.contact.email && <div>{resumeData.contact.email}</div>}
                {resumeData.contact.phone && <div>{resumeData.contact.phone}</div>}
                {resumeData.contact.location && <div>{resumeData.contact.location}</div>}
                {resumeData.contact.linkedin && <div>LinkedIn: {resumeData.contact.linkedin}</div>}
                {resumeData.contact.portfolio && (
                  <div>Portfolio: {resumeData.contact.portfolio}</div>
                )}
              </div>
            </div>

            {resumeData.education.length > 0 && (
              <div className="mb-4">
                <h3 className="border-b border-gray-300 pb-1 text-lg font-bold">Education</h3>
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="mt-2">
                    <div className="font-semibold">
                      {edu.degree} in {edu.major}
                    </div>
                    <div className="text-gray-600">
                      {edu.university}, {edu.location}
                    </div>
                    <div className="text-sm text-gray-500">
                      {edu.graduationMonth} {edu.graduationYear}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {resumeData.experience.length > 0 && (
              <div className="mb-4">
                <h3 className="border-b border-gray-300 pb-1 text-lg font-bold">Experience</h3>
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="mt-2">
                    <div className="font-semibold">{exp.jobTitle}</div>
                    <div className="text-gray-600">
                      {exp.company}, {exp.location}
                    </div>
                    <div className="text-sm text-gray-500">
                      {exp.startMonth} {exp.startYear} -{' '}
                      {exp.isCurrent ? 'Present' : `${exp.endMonth} ${exp.endYear}`}
                    </div>
                    {exp.responsibilities && (
                      <div className="mt-1 whitespace-pre-line text-sm">{exp.responsibilities}</div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TemplateSelectionPage
