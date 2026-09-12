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
      <div className="mb-6">
        <h2 className="text-xl font-normal tracking-tight text-[#171717]">Work Experience</h2>
        <p className="mt-1 text-xs text-[#666666]">
          Detail your career history with measurable accomplishments and keywords.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {experienceEntries.map((entry, index) => (
          <div key={entry.id} className="rounded-[8px] border border-[#ebebeb] bg-[#fafafa] p-5">
            <div className="mb-4 flex items-center justify-between border-b border-[#ebebeb] pb-3">
              <h3 className="font-mono text-xs uppercase tracking-[0.05em] text-[#171717]">
                Experience #{index + 1}
              </h3>
              {experienceEntries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeExperienceEntry(entry.id)}
                  className="flex items-center gap-1 text-xs text-[#999999] transition-colors hover:text-red-600"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                  Remove
                </button>
              )}
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Job Title */}
              <div className="space-y-1.5">
                <label
                  htmlFor={`job-title-${entry.id}`}
                  className="block text-xs font-medium text-[#171717]"
                >
                  Job Title *
                </label>
                <input
                  id={`job-title-${entry.id}`}
                  type="text"
                  value={entry.jobTitle}
                  onChange={(e) => handleEntryChange(entry.id, 'jobTitle', e.target.value)}
                  className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                  placeholder="e.g., Senior Full-Stack Engineer"
                />
              </div>

              {/* Company */}
              <div className="space-y-1.5">
                <label
                  htmlFor={`company-${entry.id}`}
                  className="block text-xs font-medium text-[#171717]"
                >
                  Company Name *
                </label>
                <input
                  id={`company-${entry.id}`}
                  type="text"
                  value={entry.company}
                  onChange={(e) => handleEntryChange(entry.id, 'company', e.target.value)}
                  className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                  placeholder="e.g., Stripe, Google, Scale AI"
                />
              </div>

              {/* Location */}
              <div className="space-y-1.5">
                <label
                  htmlFor={`location-${entry.id}`}
                  className="block text-xs font-medium text-[#171717]"
                >
                  Location
                </label>
                <input
                  id={`location-${entry.id}`}
                  type="text"
                  value={entry.location}
                  onChange={(e) => handleEntryChange(entry.id, 'location', e.target.value)}
                  className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                  placeholder="e.g., San Francisco, CA (or Remote)"
                />
              </div>

              {/* Current Position Checkbox */}
              <div className="flex items-end pb-2">
                <label
                  htmlFor={`current-${entry.id}`}
                  className="flex cursor-pointer select-none items-center"
                >
                  <input
                    id={`current-${entry.id}`}
                    type="checkbox"
                    checked={entry.isCurrent}
                    onChange={(e) => handleEntryChange(entry.id, 'isCurrent', e.target.checked)}
                    className="h-4 w-4 rounded border-[#ebebeb] text-[#171717] focus:ring-1 focus:ring-[#171717]"
                  />
                  <span className="ml-2 text-xs font-medium text-[#171717]">
                    I currently work in this role
                  </span>
                </label>
              </div>

              {/* Date Range */}
              <div className="space-y-1.5">
                <label
                  htmlFor={`start-month-${entry.id}`}
                  className="block text-xs font-medium text-[#171717]"
                >
                  Start Month *
                </label>
                <select
                  id={`start-month-${entry.id}`}
                  value={entry.startMonth}
                  onChange={(e) => handleEntryChange(entry.id, 'startMonth', e.target.value)}
                  className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                >
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor={`start-year-${entry.id}`}
                  className="block text-xs font-medium text-[#171717]"
                >
                  Start Year *
                </label>
                <select
                  id={`start-year-${entry.id}`}
                  value={entry.startYear}
                  onChange={(e) => handleEntryChange(entry.id, 'startYear', e.target.value)}
                  className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
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
                  <div className="space-y-1.5">
                    <label
                      htmlFor={`end-month-${entry.id}`}
                      className="block text-xs font-medium text-[#171717]"
                    >
                      End Month *
                    </label>
                    <select
                      id={`end-month-${entry.id}`}
                      value={entry.endMonth}
                      onChange={(e) => handleEntryChange(entry.id, 'endMonth', e.target.value)}
                      className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                    >
                      <option value="">Select Month</option>
                      {months.map((month) => (
                        <option key={month} value={month}>
                          {month}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor={`end-year-${entry.id}`}
                      className="block text-xs font-medium text-[#171717]"
                    >
                      End Year *
                    </label>
                    <select
                      id={`end-year-${entry.id}`}
                      value={entry.endYear}
                      onChange={(e) => handleEntryChange(entry.id, 'endYear', e.target.value)}
                      className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
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
            <div className="border-t border-[#ebebeb] pt-4">
              <BulletPointsInput
                bullets={entry.bullets}
                onChange={(bullets) => handleEntryChange(entry.id, 'bullets', bullets)}
                placeholder="e.g., Engineered real-time WebSocket backend scaling to 50k concurrent users..."
                maxBullets={15}
              />
            </div>
          </div>
        ))}

        {/* Add Experience Button */}
        <button
          type="button"
          onClick={addExperienceEntry}
          className="flex w-full items-center justify-center gap-1.5 rounded-[6px] border border-dashed border-[#ebebeb] bg-white py-3 text-xs font-medium text-[#171717] transition-colors hover:border-[#171717] hover:bg-[#fafafa]"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Another Work Experience Entry
        </button>
      </div>

      {/* Tips Section */}
      <div className="mt-6 rounded-[6px] border border-[#ebebeb] bg-[#fafafa] p-4 text-xs text-[#666666]">
        <div className="flex items-start">
          <svg
            className="mr-2.5 mt-0.5 h-4 w-4 flex-shrink-0 text-[#171717]"
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
            <h4 className="font-medium text-[#171717]">
              Experience Impact Formula (Google XYZ formula)
            </h4>
            <p className="mt-1 text-[#666666]">
              Accomplished <strong>[X]</strong> as measured by <strong>[Y]</strong> by doing{' '}
              <strong>[Z]</strong>. Always front-load strong power verbs and include tangible
              percentage or revenue gains.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExperienceSection
