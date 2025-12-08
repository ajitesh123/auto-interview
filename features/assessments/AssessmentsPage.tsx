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
      completed: false,
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
      score: 85,
    },
    {
      id: '3',
      title: 'Behavioral Interview Questions',
      description: 'Master the STAR method and common behavioral interview scenarios.',
      duration: '30 minutes',
      difficulty: 'Beginner',
      category: 'Behavioral',
      questions: 15,
      completed: false,
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
      score: 92,
    },
    {
      id: '5',
      title: 'Leadership & Team Management',
      description: 'Assess your leadership skills and team management capabilities.',
      duration: '35 minutes',
      difficulty: 'Advanced',
      category: 'Leadership',
      questions: 20,
      completed: false,
    },
  ]

  const categories = [
    'all',
    'Product Management',
    'Technical',
    'Behavioral',
    'Analytics',
    'Leadership',
  ]
  const difficulties = ['all', 'Beginner', 'Intermediate', 'Advanced']

  const filteredAssessments = mockAssessments.filter((assessment) => {
    const categoryMatch = selectedCategory === 'all' || assessment.category === selectedCategory
    const difficultyMatch =
      selectedDifficulty === 'all' || assessment.difficulty === selectedDifficulty
    return categoryMatch && difficultyMatch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-purple-500'
      case 'Intermediate':
        return 'bg-yellow-500'
      case 'Advanced':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  const startAssessment = (assessmentId: string) => {
    // TODO: Implement assessment start logic
    console.log('Starting assessment:', assessmentId)
  }

  return (
    <div className="flex h-full w-full flex-col px-8 py-12">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-bold text-white">Try Assessments</h1>
        <p className="text-xl leading-relaxed text-white">
          Practice with our comprehensive skill assessments and mock interviews to boost your career
          prospects.
        </p>
      </div>

      {/* Filters */}
      <div className="mx-auto mb-8 w-full max-w-6xl">
        <div className="rounded-lg border border-gray-700 bg-gray-900 p-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:border-pink-700 focus:outline-none"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-white">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full rounded-lg border border-gray-600 bg-gray-800 px-4 py-2 text-white focus:border-pink-700 focus:outline-none"
              >
                {difficulties.map((difficulty) => (
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
                className="w-full rounded-lg bg-gradient-to-r from-pink-700 to-pink-900 px-6 py-2 font-semibold text-white transition-colors hover:from-pink-600 hover:to-pink-800"
              >
                {isLoading ? 'Loading...' : 'Filter Assessments'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Assessments Grid */}
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6">
          <h2 className="mb-2 text-2xl font-bold text-white">
            Available Assessments ({filteredAssessments.length})
          </h2>
          <p className="text-gray-400">Choose an assessment to test your skills</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredAssessments.map((assessment) => (
            <div
              key={assessment.id}
              className="rounded-lg border border-gray-700 bg-gray-900 p-6 transition-colors hover:border-pink-700"
            >
              <div className="mb-4 flex items-start justify-between">
                <h3 className="mb-2 text-xl font-bold text-white">{assessment.title}</h3>
                <span
                  className={`rounded px-2 py-1 text-xs font-semibold text-white ${getDifficultyColor(assessment.difficulty)}`}
                >
                  {assessment.difficulty}
                </span>
              </div>

              <p className="mb-4 text-sm text-gray-300">{assessment.description}</p>

              <div className="mb-4 space-y-2">
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
                    <span className="font-semibold text-pink-700">{assessment.score}%</span>
                  </div>
                )}
              </div>

              <button
                onClick={() => startAssessment(assessment.id)}
                className={`w-full rounded-lg px-4 py-2 font-semibold transition-colors ${
                  assessment.completed
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gradient-to-r from-pink-700 to-pink-900 text-white hover:from-pink-600 hover:to-pink-800'
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
        <div className="py-12 text-center">
          <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-pink-700/20 to-pink-900/20">
            <svg
              className="h-12 w-12 text-pink-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-xl font-semibold text-white">No Assessments Found</h3>
          <p className="text-gray-400">Try adjusting your filters to see more assessments</p>
        </div>
      )}
    </div>
  )
}

export default AssessmentsPage
