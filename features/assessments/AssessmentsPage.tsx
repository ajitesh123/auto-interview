'use client'

import { useState } from 'react'

interface Assessment {
  id: string
  title: string
  description: string
  duration: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  category: string
  questions: number
  completed: boolean
  score?: number
}

const AssessmentsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')
  const [assessments, setAssessments] = useState<Assessment[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Mock assessment data - replace with actual API calls
  const mockAssessments: Assessment[] = [
    {
      id: '1',
      title: 'Product Management Fundamentals',
      description: 'Test your knowledge of core PM concepts, methodologies, and best practices.',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      category: 'Product Management',
      questions: 30,
      completed: false
    },
    {
      id: '2',
      title: 'Technical Interview Prep - System Design',
      description: 'Practice system design questions commonly asked in technical interviews.',
      duration: '60 minutes',
      difficulty: 'Advanced',
      category: 'Technical',
      questions: 5,
      completed: true,
      score: 85
    },
    {
      id: '3',
      title: 'Behavioral Interview Questions',
      description: 'Master the STAR method and common behavioral interview scenarios.',
      duration: '30 minutes',
      difficulty: 'Beginner',
      category: 'Behavioral',
      questions: 15,
      completed: false
    },
    {
      id: '4',
      title: 'Data Analysis & Metrics',
      description: 'Test your ability to analyze data and make data-driven decisions.',
      duration: '40 minutes',
      difficulty: 'Intermediate',
      category: 'Analytics',
      questions: 25,
      completed: true,
      score: 92
    },
    {
      id: '5',
      title: 'Leadership & Team Management',
      description: 'Assess your leadership skills and team management capabilities.',
      duration: '35 minutes',
      difficulty: 'Advanced',
      category: 'Leadership',
      questions: 20,
      completed: false
    }
  ]

  const categories = ['all', 'Product Management', 'Technical', 'Behavioral', 'Analytics', 'Leadership']
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced']

  const filteredAssessments = mockAssessments.filter(assessment => {
    const categoryMatch = selectedCategory === 'all' || assessment.category === selectedCategory
    const difficultyMatch = selectedDifficulty === 'all' || assessment.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-500'
      case 'Intermediate': return 'bg-yellow-500'
      case 'Advanced': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const startAssessment = (assessmentId: string) => {
    // TODO: Implement assessment start logic
    console.log('Starting assessment:', assessmentId)
  }

  return (
    <div className="w-full h-full flex flex-col px-8 py-12">
      {/* Header */}
      <div className="text-center mb-8 max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white mb-6">Try Assessments</h1>
        <p className="text-xl text-white leading-relaxed">
          Practice with our comprehensive skill assessments and mock interviews to boost your career prospects.
        </p>
      </div>

      {/* Filters */}
      <div className="w-full max-w-6xl mx-auto mb-8">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-white text-sm font-medium mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-pink-500 focus:outline-none"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Levels' : difficulty}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  setIsLoading(true)
                  setTimeout(() => {
                    setAssessments(filteredAssessments)
                    setIsLoading(false)
                  }, 500)
                }}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-700 text-white px-6 py-2 rounded-lg font-semibold hover:from-pink-400 hover:to-pink-600 transition-colors"
              >
                {isLoading ? 'Loading...' : 'Filter Assessments'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assessments Grid */}
      <div className="w-full max-w-6xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">
            Available Assessments ({filteredAssessments.length})
          </h2>
          <p className="text-gray-400">Choose an assessment to test your skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssessments.map((assessment) => (
            <div key={assessment.id} className="bg-gray-900 border border-gray-700 rounded-lg p-6 hover:border-pink-500 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white mb-2">{assessment.title}</h3>
                <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getDifficultyColor(assessment.difficulty)}`}>
                  {assessment.difficulty}
                </span>
              </div>
              
              <p className="text-gray-300 mb-4 text-sm">{assessment.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Category:</span>
                  <span className="text-white">{assessment.category}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-white">{assessment.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Questions:</span>
                  <span className="text-white">{assessment.questions}</span>
                </div>
                {assessment.completed && assessment.score && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Your Score:</span>
                    <span className="text-pink-500 font-semibold">{assessment.score}%</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => startAssessment(assessment.id)}
                className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${
                  assessment.completed
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gradient-to-r from-pink-500 to-pink-700 text-white hover:from-pink-400 hover:to-pink-600'
                }`}
              >
                {assessment.completed ? 'Retake Assessment' : 'Start Assessment'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filteredAssessments.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-pink-500/20 to-pink-700/20 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">No Assessments Found</h3>
          <p className="text-gray-400">Try adjusting your filters to see more assessments</p>
        </div>
      )}
    </div>
  )
}

export default AssessmentsPage
