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
    <div className="w-full text-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold">Upload Your Resume</h1>
          <p className="text-lg text-gray-400">
            Upload your existing resume and we'll extract the information for you to review and
            edit.
          </p>
        </div>

        {/* Upload Message */}
        {uploadMessage && (
          <div
            className={`mb-6 rounded-lg p-4 ${
              uploadMessage.includes('Error') || uploadMessage.includes('failed')
                ? 'border border-red-700 bg-red-900 text-red-200'
                : 'border border-purple-700 bg-purple-900 text-purple-200'
            }`}
          >
            {uploadMessage}
          </div>
        )}

        {/* Upload Area */}
        <div className="mb-8">
          <div
            className={`relative rounded-lg border-2 border-dashed p-12 text-center transition-colors ${
              dragActive
                ? 'border-pink-500 bg-pink-900/20'
                : 'border-gray-600 hover:border-gray-500'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-700">
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
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            <h3 className="mb-2 text-xl font-semibold">
              {isUploading ? 'Processing your resume...' : 'Drag & drop your resume here'}
            </h3>
            <p className="mb-4 text-gray-400">
              or{' '}
              <button
                onClick={openFileDialog}
                disabled={isUploading}
                className="text-pink-400 hover:text-pink-300 disabled:cursor-not-allowed disabled:opacity-50"
              >
                browse files
              </button>
            </p>
            <p className="text-sm text-gray-500">Supports PDF, DOC, and DOCX files up to 10MB</p>

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
          <div className="mb-8">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span>Processing resume...</span>
              <span>Please wait</span>
            </div>
            <div className="h-2 w-full rounded-full bg-gray-700">
              <div className="h-2 w-full animate-pulse rounded-full bg-gradient-to-r from-pink-500 to-pink-700"></div>
            </div>
          </div>
        )}

        {/* Supported Formats */}
        <div className="mb-8 rounded-lg bg-gray-800 p-6">
          <h3 className="mb-4 text-lg font-semibold">Supported File Formats</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-red-600">
                <span className="text-xs font-bold text-white">PDF</span>
              </div>
              <div>
                <div className="font-medium">PDF Files</div>
                <div className="text-sm text-gray-400">Most common format</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-600">
                <span className="text-xs font-bold text-white">DOCX</span>
              </div>
              <div>
                <div className="font-medium">Word Documents</div>
                <div className="text-sm text-gray-400">Modern Word format</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded bg-purple-600">
                <span className="text-xs font-bold text-white">DOC</span>
              </div>
              <div>
                <div className="font-medium">Legacy Word</div>
                <div className="text-sm text-gray-400">Older Word format</div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <button
            onClick={onBack}
            disabled={isUploading}
            className="rounded-lg bg-gray-700 px-8 py-3 font-semibold text-white transition-colors hover:bg-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg
              className="mr-2 inline h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResumeUploadPage
