'use client'

import { useState } from 'react'

interface CoverLetterTemplate {
  id: string
  title: string
  description: string
  category: string
  preview: string
}

const CoverLetterPage = () => {
  const [jobTitle, setJobTitle] = useState('')
  const [company, setCompany] = useState('')
  const [jobDescription, setJobDescription] = useState('')
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [generatedLetter, setGeneratedLetter] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const templates: CoverLetterTemplate[] = [
    {
      id: '1',
      title: 'Professional Standard',
      description: 'Clean, professional format suitable for most industries',
      category: 'General',
      preview: 'Dear Hiring Manager, I am writing to express my strong interest in the [Position] role at [Company]...'
    },
    {
      id: '2',
      title: 'Tech Industry',
      description: 'Optimized for technology and startup companies',
      category: 'Technology',
      preview: 'Dear [Company] Team, As a passionate technologist with [X] years of experience...'
    },
    {
      id: '3',
      title: 'Creative Industry',
      description: 'More personal and creative approach for design/creative roles',
      category: 'Creative',
      preview: 'Hello [Company] Creative Team, Your recent work on [Project] caught my attention...'
    },
    {
      id: '4',
      title: 'Executive Level',
      description: 'Formal, executive-level format for senior positions',
      category: 'Executive',
      preview: 'Dear [Hiring Manager], I am pleased to submit my application for the [Position] position...'
    }
  ]

  const handleGenerate = async () => {
    if (!jobTitle || !company || !selectedTemplate) return

    setIsGenerating(true)
    // TODO: Implement AI cover letter generation
    setTimeout(() => {
      const template = templates.find(t => t.id === selectedTemplate)
      const generated = `Dear ${company} Hiring Team,

I am writing to express my strong interest in the ${jobTitle} position at ${company}. With my extensive experience in [relevant field] and proven track record of [key achievements], I am confident that I would be a valuable addition to your team.

In my previous role at [Previous Company], I successfully [specific achievement with metrics]. This experience has equipped me with the skills and knowledge necessary to excel in the ${jobTitle} role at ${company}.

I am particularly drawn to ${company} because of [specific reason related to company values/mission]. I am excited about the opportunity to contribute to your team and help drive [specific company goal or project].

I would welcome the opportunity to discuss how my skills and experience align with your needs. Thank you for considering my application.

Best regards,
[Your Name]`
      
      setGeneratedLetter(generated)
      setIsGenerating(false)
    }, 2000)
  }

  return (
    <div className="w-full h-full flex flex-col px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6">Generate Custom Cover Letter</h1>
        <p className="text-xl text-white leading-relaxed">
          Create personalized cover letters that match your resume and job requirements using AI.
        </p>
      </div>

      <div className="w-full max-w-6xl mx-auto flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Job Information</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Job Title *</label>
                  <input
                    type="text"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Product Manager"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Company Name *</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Google"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-white text-sm font-medium mb-2">Job Description</label>
                  <textarea
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here for better customization..."
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Template Selection */}
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-4">Choose Template</h3>
              
              <div className="space-y-3">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedTemplate === template.id
                        ? 'border-pink-500 bg-pink-500/10'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedTemplate(template.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-white">{template.title}</h4>
                      <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                        {template.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{template.description}</p>
                    <p className="text-xs text-gray-400 italic">{template.preview}</p>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!jobTitle || !company || !selectedTemplate || isGenerating}
              className="w-full bg-gradient-to-r from-pink-500 to-pink-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-pink-400 hover:to-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? 'Generating...' : 'Generate Cover Letter'}
            </button>
          </div>

          {/* Output Section */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-white mb-4">Generated Cover Letter</h3>
            
            {generatedLetter ? (
              <div className="space-y-4">
                <div className="bg-gray-800 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-white text-sm whitespace-pre-wrap font-sans">
                    {generatedLetter}
                  </pre>
                </div>
                
                <div className="flex space-x-3">
                  <button className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                    Copy to Clipboard
                  </button>
                  <button className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors">
                    Download PDF
                  </button>
                  <button 
                    onClick={() => setGeneratedLetter('')}
                    className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Regenerate
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-pink-500/20 to-pink-700/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <p className="text-gray-400">Fill in the job information and select a template to generate your cover letter</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoverLetterPage
