'use client'

import { useState, useRef } from 'react'
import { ResumeData } from '../../../lib/resumeStore'

interface ResumeUploadPageProps {
  onUploadComplete: (parsedData: Partial<ResumeData>) => void
  onBack: () => void
}

const ResumeUploadPage = ({ onUploadComplete, onBack }: ResumeUploadPageProps) => {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadMessage, setUploadMessage] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (!file) return

    console.log('File selected:', { name: file.name, size: file.size, type: file.type })

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]

    if (!allowedTypes.includes(file.type)) {
      console.log('Invalid file type:', file.type)
      setUploadMessage(
        `Please upload a PDF or Word document (.pdf, .doc, .docx). File type: ${file.type}`
      )
      setTimeout(() => setUploadMessage(null), 5000)
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setUploadMessage('File size must be less than 10MB')
      setTimeout(() => setUploadMessage(null), 5000)
      return
    }

    uploadFile(file)
  }

  const uploadFile = async (file: File) => {
    setIsUploading(true)
    setUploadMessage(null)

    try {
      console.log('Uploading file:', { name: file.name, type: file.type, size: file.size })
      const formData = new FormData()
      formData.append('resume', file)

      console.log('Sending request to upload-and-parse API...')
      const response = await fetch('/api/resume/upload-and-parse', {
        method: 'POST',
        body: formData,
      })

      console.log('Response status:', response.status)
      const result = await response.json()
      console.log('Response result:', result)

      // Log detailed error information
      if (!response.ok) {
        console.log('Error response details:', {
          status: response.status,
          statusText: response.statusText,
          result: result,
        })
      }

      if (!response.ok) {
        // Show more helpful error messages
        if (result.suggestion) {
          throw new Error(`${result.error}. ${result.suggestion}`)
        } else {
          throw new Error(result.error || 'Upload failed')
        }
      }

      if (result.success) {
        setUploadMessage('Resume parsed successfully! Review and edit the information below.')
        onUploadComplete(result.data)
      } else {
        throw new Error(result.message || 'Parsing failed')
      }
    } catch (error) {
      console.error('Error uploading resume:', error)
      const errorMessage = error instanceof Error ? error.message : 'Upload failed'
      setUploadMessage(`Error: ${errorMessage}`)
      console.log('Upload error details:', {
        error,
        file: { name: file.name, size: file.size, type: file.type },
      })
      setTimeout(() => setUploadMessage(null), 5000)
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    console.log('File dropped')
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      console.log('Dropped file:', e.dataTransfer.files[0])
      handleFileSelect(e.dataTransfer.files[0])
    } else {
      console.log('No file in drop event')
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input changed')
    if (e.target.files && e.target.files[0]) {
      console.log('Selected file from input:', e.target.files[0])
      handleFileSelect(e.target.files[0])
    } else {
      console.log('No file selected')
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
            RESUME IMPORT
          </p>
          <h2 className="mb-2 text-2xl font-normal tracking-tight text-[#171717] sm:text-3xl">
            Upload your resume.
          </h2>
          <p className="text-sm text-[#4d4d4d]">
            Upload an existing document. We will extract your work experience, education, and skills
            into our ATS builder automatically.
          </p>
        </div>

        {/* Upload Message */}
        {uploadMessage && (
          <div
            className={`mb-6 rounded-[6px] p-4 text-sm ${
              uploadMessage.includes('Error') || uploadMessage.includes('failed')
                ? 'border border-red-200 bg-red-50 text-red-700'
                : 'border border-emerald-200 bg-emerald-50 text-emerald-800'
            }`}
          >
            {uploadMessage}
          </div>
        )}

        {/* Upload Area */}
        <div className="mb-8">
          <div
            className={`relative cursor-pointer rounded-[8px] border-2 border-dashed p-10 text-center transition-all ${
              dragActive
                ? 'border-[#171717] bg-[#f5f5f5]'
                : 'border-[#ebebeb] bg-[#fafafa] hover:border-[#171717]'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={openFileDialog}
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[#171717]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>

            <h3 className="mb-1 text-base font-medium text-[#171717]">
              {isUploading ? 'Processing your resume...' : 'Drag and drop your resume file here'}
            </h3>
            <p className="mb-3 text-xs text-[#666666]">
              or click to{' '}
              <span className="font-medium text-[#171717] underline underline-offset-4">
                browse files
              </span>
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.05em] text-[#999999]">
              Supports PDF, DOCX, DOC • Max 10MB
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInputChange}
              className="hidden"
              disabled={isUploading}
            />
          </div>
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mb-8 rounded-[6px] border border-[#ebebeb] bg-white p-4">
            <div className="mb-2 flex items-center justify-between font-mono text-xs text-[#666666]">
              <span>PARSING RESUME CONTENT...</span>
              <span>PLEASE WAIT</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#ebebeb]">
              <div className="h-full w-full animate-pulse rounded-full bg-[#171717]"></div>
            </div>
          </div>
        )}

        {/* Supported Formats */}
        <div className="mb-8 rounded-[8px] border border-[#ebebeb] bg-white p-5">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-[0.071em] text-[#666666]">
            Supported Formats
          </h3>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="flex items-center space-x-3 rounded-[6px] border border-[#ebebeb] bg-[#fafafa] p-3">
              <span className="rounded bg-[#171717] px-2 py-0.5 font-mono text-xs font-medium text-white">
                PDF
              </span>
              <div>
                <div className="text-xs font-medium text-[#171717]">PDF Files</div>
                <div className="text-[11px] text-[#666666]">Universal layout</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-[6px] border border-[#ebebeb] bg-[#fafafa] p-3">
              <span className="rounded border border-[#171717] px-2 py-0.5 font-mono text-xs font-medium text-[#171717]">
                DOCX
              </span>
              <div>
                <div className="text-xs font-medium text-[#171717]">Word Doc</div>
                <div className="text-[11px] text-[#666666]">Modern XML format</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 rounded-[6px] border border-[#ebebeb] bg-[#fafafa] p-3">
              <span className="rounded border border-[#ebebeb] bg-white px-2 py-0.5 font-mono text-xs font-medium text-[#666666]">
                DOC
              </span>
              <div>
                <div className="text-xs font-medium text-[#171717]">Legacy Word</div>
                <div className="text-[11px] text-[#666666]">Classic format</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between border-t border-[#ebebeb] pt-6">
          <button
            onClick={onBack}
            disabled={isUploading}
            className="flex items-center rounded-[6px] border border-[#ebebeb] bg-white px-4 py-2 text-sm font-medium text-[#171717] transition-colors hover:bg-[#f5f5f5] disabled:cursor-not-allowed disabled:opacity-50"
          >
            &larr; Back to Options
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResumeUploadPage
