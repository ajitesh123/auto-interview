'use client'

import { useState } from 'react'

interface EducationEntry {
  id: string
  degree: string
  major: string
  university: string
  location: string
  graduationMonth: string
  graduationYear: string
  gpa: string
}

interface EducationSectionProps {
  data?: EducationEntry[]
  onChange: (data: EducationEntry[]) => void
}

const EducationSection = ({ data, onChange }: EducationSectionProps) => {
  const [educationEntries, setEducationEntries] = useState<EducationEntry[]>(
    data && data.length > 0
      ? data
      : [
          {
            id: '1',
            degree: '',
            major: '',
            university: '',
            location: '',
            graduationMonth: '',
            graduationYear: '',
            gpa: '',
          },
        ]
  )

  const handleEntryChange = (id: string, field: keyof EducationEntry, value: string) => {
    const updatedEntries = educationEntries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry
    )
    setEducationEntries(updatedEntries)
    onChange(updatedEntries)
  }

  const addEducationEntry = () => {
    const newEntry: EducationEntry = {
      id: Date.now().toString(),
      degree: '',
      major: '',
      university: '',
      location: '',
      graduationMonth: '',
      graduationYear: '',
      gpa: '',
    }
    const updatedEntries = [...educationEntries, newEntry]
    setEducationEntries(updatedEntries)
    onChange(updatedEntries)
  }

  const removeEducationEntry = (id: string) => {
    if (educationEntries.length > 1) {
      const updatedEntries = educationEntries.filter((entry) => entry.id !== id)
      setEducationEntries(updatedEntries)
      onChange(updatedEntries)
    }
  }

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from(
    { length: currentYear - 1950 + (2030 - currentYear) + 1 },
    (_, i) => 2030 - i
  )

  return (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-white">Education</h2>
        <p className="text-gray-300">Add your educational background</p>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {educationEntries.map((entry, index) => (
          <div key={entry.id} className="rounded-lg border border-matte-gray bg-matte-dark p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Education Entry {index + 1}</h3>
              {educationEntries.length > 1 && (
                <button
                  onClick={() => removeEducationEntry(entry.id)}
                  className="text-red-400 transition-colors hover:text-red-300"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}
            </div>

            <div className="space-y-4">
              {/* Degree/Program */}
              <div className="space-y-2">
                <label
                  htmlFor={`degree-${entry.id}`}
                  className="block text-sm font-medium text-chatgpt-textSecondary"
                >
                  Degree/Program *
                </label>
                <input
                  id={`degree-${entry.id}`}
                  type="text"
                  value={entry.degree}
                  onChange={(e) => handleEntryChange(entry.id, 'degree', e.target.value)}
                  className="w-full rounded-lg border border-chatgpt-border bg-chatgpt-input px-4 py-3 text-chatgpt-text placeholder-gray-400 focus:border-chatgpt-accent focus:outline-none focus:ring-2 focus:ring-chatgpt-accent"
                  placeholder="e.g., Bachelor of Science, Master of Arts"
                />
              </div>

              {/* Major/Field of Study */}
              <div className="space-y-2">
                <label
                  htmlFor={`major-${entry.id}`}
                  className="block text-sm font-medium text-chatgpt-textSecondary"
                >
                  Major/Field of Study
                </label>
                <input
                  id={`major-${entry.id}`}
                  type="text"
                  value={entry.major}
                  onChange={(e) => handleEntryChange(entry.id, 'major', e.target.value)}
                  className="w-full rounded-lg border border-chatgpt-border bg-chatgpt-input px-4 py-3 text-chatgpt-text placeholder-gray-400 focus:border-chatgpt-accent focus:outline-none focus:ring-2 focus:ring-chatgpt-accent"
                  placeholder="e.g., Computer Science, Business Administration"
                />
              </div>

              {/* University/Institution */}
              <div className="space-y-2">
                <label
                  htmlFor={`university-${entry.id}`}
                  className="block text-sm font-medium text-chatgpt-textSecondary"
                >
                  University/Institution *
                </label>
                <input
                  id={`university-${entry.id}`}
                  type="text"
                  value={entry.university}
                  onChange={(e) => handleEntryChange(entry.id, 'university', e.target.value)}
                  className="w-full rounded-lg border border-chatgpt-border bg-chatgpt-input px-4 py-3 text-chatgpt-text placeholder-gray-400 focus:border-chatgpt-accent focus:outline-none focus:ring-2 focus:ring-chatgpt-accent"
                  placeholder="e.g., Stanford University, MIT"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label
                  htmlFor={`location-${entry.id}`}
                  className="block text-sm font-medium text-chatgpt-textSecondary"
                >
                  Location
                </label>
                <input
                  id={`location-${entry.id}`}
                  type="text"
                  value={entry.location}
                  onChange={(e) => handleEntryChange(entry.id, 'location', e.target.value)}
                  className="w-full rounded-lg border border-chatgpt-border bg-chatgpt-input px-4 py-3 text-chatgpt-text placeholder-gray-400 focus:border-chatgpt-accent focus:outline-none focus:ring-2 focus:ring-chatgpt-accent"
                  placeholder="e.g., Stanford, CA"
                />
              </div>

              {/* Graduation Month */}
              <div className="space-y-2">
                <label
                  htmlFor={`graduation-month-${entry.id}`}
                  className="block text-sm font-medium text-chatgpt-textSecondary"
                >
                  Graduation Month *
                </label>
                <select
                  id={`graduation-month-${entry.id}`}
                  value={entry.graduationMonth}
                  onChange={(e) => handleEntryChange(entry.id, 'graduationMonth', e.target.value)}
                  className="w-full rounded-lg border border-chatgpt-border bg-chatgpt-input px-4 py-3 text-chatgpt-text focus:border-chatgpt-accent focus:outline-none focus:ring-2 focus:ring-chatgpt-accent"
                >
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Graduation Year */}
              <div className="space-y-2">
                <label
                  htmlFor={`graduation-year-${entry.id}`}
                  className="block text-sm font-medium text-chatgpt-textSecondary"
                >
                  Graduation Year *
                </label>
                <select
                  id={`graduation-year-${entry.id}`}
                  value={entry.graduationYear}
                  onChange={(e) => handleEntryChange(entry.id, 'graduationYear', e.target.value)}
                  className="w-full rounded-lg border border-chatgpt-border bg-chatgpt-input px-4 py-3 text-chatgpt-text focus:border-chatgpt-accent focus:outline-none focus:ring-2 focus:ring-chatgpt-accent"
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year.toString()}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* GPA */}
              <div className="space-y-2">
                <label
                  htmlFor={`gpa-${entry.id}`}
                  className="block text-sm font-medium text-chatgpt-textSecondary"
                >
                  GPA (Optional)
                </label>
                <input
                  id={`gpa-${entry.id}`}
                  type="text"
                  value={entry.gpa}
                  onChange={(e) => handleEntryChange(entry.id, 'gpa', e.target.value)}
                  className="w-full rounded-lg border border-chatgpt-border bg-chatgpt-input px-4 py-3 text-chatgpt-text placeholder-gray-400 focus:border-chatgpt-accent focus:outline-none focus:ring-2 focus:ring-chatgpt-accent"
                  placeholder="e.g., 8.5/10, 3.8/4.0"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Education Button */}
        {educationEntries.length < 4 && (
          <div className="flex justify-center">
            <button
              onClick={addEducationEntry}
              className="flex items-center rounded-lg border border-chatgpt-border bg-chatgpt-card px-6 py-3 font-semibold text-chatgpt-text transition-colors hover:bg-chatgpt-input"
            >
              <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add Another Education Entry
            </button>
          </div>
        )}
      </div>

      {/* Tips Section - Moved to Bottom */}
      <div className="mt-8 rounded-lg border border-chatgpt-border bg-chatgpt-card p-4">
        <div className="flex items-start">
          <svg
            className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-chatgpt-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="mb-2 text-sm font-medium text-chatgpt-text">Education Tips</h4>
            <ul className="space-y-1 text-xs text-chatgpt-textSecondary">
              <li>• List most recent education first</li>
              <li>• Include relevant coursework</li>
              <li>• Only include GPA if 3.5+</li>
              <li>• Add study abroad if relevant</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EducationSection
