'use client'

import { useState } from 'react'
import BulletPointsInput from './BulletPointsInput'

interface ExperienceEntry {
  id: string
  jobTitle: string
  company: string
  location: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  isCurrent: boolean
  bullets: string[]
}

interface ExperienceSectionProps {
  data?: ExperienceEntry[]
  onChange: (data: ExperienceEntry[]) => void
}

const ExperienceSection = ({ data, onChange }: ExperienceSectionProps) => {
  const [experienceEntries, setExperienceEntries] = useState<ExperienceEntry[]>(
    data && data.length > 0
      ? data
      : [
          {
            id: '1',
            jobTitle: '',
            company: '',
            location: '',
            startMonth: '',
            startYear: '',
            endMonth: '',
            endYear: '',
            isCurrent: false,
            bullets: [''],
          },
        ]
  )

  const handleEntryChange = (
    id: string,
    field: keyof ExperienceEntry,
    value: string | boolean | string[]
  ) => {
    const updatedEntries = experienceEntries.map((entry) => {
      if (entry.id === id) {
        const updatedEntry = { ...entry, [field]: value }

        // If marking as current, clear end date
        if (field === 'isCurrent' && value === true) {
          updatedEntry.endMonth = ''
          updatedEntry.endYear = ''
        }

        return updatedEntry
      }
      return entry
    })
    setExperienceEntries(updatedEntries)
    onChange(updatedEntries)
  }

  const addExperienceEntry = () => {
    const newEntry: ExperienceEntry = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      isCurrent: false,
      bullets: [''],
    }
    const updatedEntries = [...experienceEntries, newEntry]
    setExperienceEntries(updatedEntries)
    onChange(updatedEntries)
  }

  const removeExperienceEntry = (id: string) => {
    if (experienceEntries.length > 1) {
      const updatedEntries = experienceEntries.filter((entry) => entry.id !== id)
      setExperienceEntries(updatedEntries)
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
        <h2 className="mb-2 text-3xl font-bold text-white">Work Experience</h2>
        <p className="text-gray-300">Add your professional work experience</p>
      </div>

      {experienceEntries.map((entry, index) => (
        <div key={entry.id} className="rounded-lg border border-gray-600 bg-gray-700 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Experience Entry {index + 1}</h3>
            {experienceEntries.length > 1 && (
              <button
                onClick={() => removeExperienceEntry(entry.id)}
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

          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Job Title */}
            <div className="space-y-2">
              <label
                htmlFor={`job-title-${entry.id}`}
                className="block text-sm font-medium text-gray-300"
              >
                Job Title
              </label>
              <input
                id={`job-title-${entry.id}`}
                type="text"
                value={entry.jobTitle}
                onChange={(e) => handleEntryChange(entry.id, 'jobTitle', e.target.value)}
                className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="e.g., Software Engineer, Marketing Manager"
              />
            </div>

            {/* Company */}
            <div className="space-y-2">
              <label
                htmlFor={`company-${entry.id}`}
                className="block text-sm font-medium text-gray-300"
              >
                Company
              </label>
              <input
                id={`company-${entry.id}`}
                type="text"
                value={entry.company}
                onChange={(e) => handleEntryChange(entry.id, 'company', e.target.value)}
                className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="e.g., Google, Microsoft"
              />
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label
                htmlFor={`location-${entry.id}`}
                className="block text-sm font-medium text-gray-300"
              >
                Location
              </label>
              <input
                id={`location-${entry.id}`}
                type="text"
                value={entry.location}
                onChange={(e) => handleEntryChange(entry.id, 'location', e.target.value)}
                className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="e.g., San Francisco, CA"
              />
            </div>

            {/* Current Position Checkbox */}
            <div className="space-y-2">
              <label htmlFor={`current-${entry.id}`} className="flex items-center">
                <input
                  id={`current-${entry.id}`}
                  type="checkbox"
                  checked={entry.isCurrent}
                  onChange={(e) => handleEntryChange(entry.id, 'isCurrent', e.target.checked)}
                  className="h-4 w-4 rounded border-gray-500 bg-gray-600 text-pink-600 focus:ring-2 focus:ring-pink-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-300">
                  I currently work here
                </span>
              </label>
            </div>
          </div>

          {/* Date Range */}
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <label
                htmlFor={`start-month-${entry.id}`}
                className="block text-sm font-medium text-gray-300"
              >
                Start Month
              </label>
              <select
                id={`start-month-${entry.id}`}
                value={entry.startMonth}
                onChange={(e) => handleEntryChange(entry.id, 'startMonth', e.target.value)}
                className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Select Month</option>
                {months.map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor={`start-year-${entry.id}`}
                className="block text-sm font-medium text-gray-300"
              >
                Start Year
              </label>
              <select
                id={`start-year-${entry.id}`}
                value={entry.startYear}
                onChange={(e) => handleEntryChange(entry.id, 'startYear', e.target.value)}
                className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Select Year</option>
                {years.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {!entry.isCurrent && (
              <>
                <div className="space-y-2">
                  <label
                    htmlFor={`end-month-${entry.id}`}
                    className="block text-sm font-medium text-gray-300"
                  >
                    End Month
                  </label>
                  <select
                    id={`end-month-${entry.id}`}
                    value={entry.endMonth}
                    onChange={(e) => handleEntryChange(entry.id, 'endMonth', e.target.value)}
                    className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Select Month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor={`end-year-${entry.id}`}
                    className="block text-sm font-medium text-gray-300"
                  >
                    End Year
                  </label>
                  <select
                    id={`end-year-${entry.id}`}
                    value={entry.endYear}
                    onChange={(e) => handleEntryChange(entry.id, 'endYear', e.target.value)}
                    className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year.toString()}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}
          </div>

          {/* Bullet Points */}
          <BulletPointsInput
            bullets={entry.bullets}
            onChange={(bullets) => handleEntryChange(entry.id, 'bullets', bullets)}
            placeholder="Describe your key responsibilities and achievements..."
            maxBullets={15}
          />
        </div>
      ))}

      {/* Add Experience Button */}
      <div className="flex justify-center">
        <button
          onClick={addExperienceEntry}
          className="flex items-center rounded-lg border border-gray-600 bg-gray-700 px-6 py-3 font-semibold text-white transition-colors hover:bg-gray-600"
        >
          <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Another Experience Entry
        </button>
      </div>

      {/* Help Text */}
      <div className="rounded-lg bg-gray-700 p-4">
        <div className="flex items-start">
          <svg
            className="mr-3 mt-0.5 h-5 w-5 flex-shrink-0 text-pink-500"
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
            <h4 className="mb-1 text-sm font-medium text-white">Experience Tips</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>
                • Use action verbs to start each bullet point (e.g., "Led", "Developed", "Managed")
              </li>
              <li>• Quantify your achievements with numbers and metrics</li>
              <li>• Focus on results and impact, not just responsibilities</li>
              <li>• Use bullet points for easy scanning by recruiters</li>
              <li>• Start lines with "- " or "• " to create bullet points</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceSection
