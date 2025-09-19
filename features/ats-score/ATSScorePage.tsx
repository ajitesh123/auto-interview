'use client'

import { useState } from 'react'

const ATSScorePage = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [analysisResults, setAnalysisResults] = useState<any>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
    }
  }

  const handleAnalyze = async () => {
    if (!uploadedFile) return
    
    setIsAnalyzing(true)
    // TODO: Implement ATS analysis logic
    // This is where the ATS analysis API calls will go
    setTimeout(() => {
      setScore(85) // Mock score
      setAnalysisResults({
        overallScore: 85,
        suggestions: [
          'Add more relevant keywords',
          'Improve formatting consistency',
          'Include quantifiable achievements'
        ]
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center px-8 py-12">
      {/* Header */}
      <div className="text-center mb-12 max-w-4xl">
        <h1 className="text-5xl font-bold text-white mb-6">Check Resume ATS Score</h1>
        <p className="text-xl text-white leading-relaxed">
          Upload your resume to get an instant ATS compatibility score and detailed improvement suggestions.
        </p>
      </div>

      {/* Upload Section */}
      <div className="w-full max-w-2xl mb-8">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-pink-500 to-pink-700 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Upload Your Resume</h3>
            <p className="text-white text-lg mb-6">
              Upload your resume in PDF, DOC, or DOCX format to get started with ATS analysis.
            </p>
            
            <div className="mb-6">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label
                htmlFor="resume-upload"
                className="cursor-pointer inline-flex items-center px-6 py-3 border-2 border-dashed border-gray-600 rounded-lg hover:border-pink-500 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                {uploadedFile ? uploadedFile.name : 'Choose file or drag and drop'}
              </label>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={!uploadedFile || isAnalyzing}
              className="bg-gradient-to-r from-pink-500 to-pink-700 text-white px-8 py-3 rounded-lg font-semibold hover:from-pink-400 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {score && analysisResults && (
        <div className="w-full max-w-4xl">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">Analysis Results</h3>
            
            {/* Score Display */}
            <div className="text-center mb-8">
              <div className="text-6xl font-bold text-pink-500 mb-2">{score}%</div>
              <div className="text-xl text-white">ATS Compatibility Score</div>
            </div>

            {/* Suggestions */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white mb-4">Improvement Suggestions:</h4>
              {analysisResults.suggestions.map((suggestion: string, index: number) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm">!</span>
                  </div>
                  <p className="text-gray-300">{suggestion}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ATSScorePage
