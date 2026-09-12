'use client'

import { useState } from 'react'
import BulletPointsInput from './BulletPointsInput'

interface LeadershipEntry {
  id: string
  title: string
  organization: string
  location: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  isCurrent: boolean
  bullets: string[]
}

interface LeadershipActivitiesSectionProps {
  data?: LeadershipEntry[]
  onChange: (data: LeadershipEntry[]) => void
}

const LeadershipActivitiesSection = ({ data, onChange }: LeadershipActivitiesSectionProps) => {
  const [leadershipEntries, setLeadershipEntries] = useState<LeadershipEntry[]>(
    data && data.length > 0 ? data : []
  )

  const handleEntryChange = (
    id: string,
    field: keyof LeadershipEntry,
    value: string | boolean | string[]
  ) => {
    const updatedEntries = leadershipEntries.map((entry) => {
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
    setLeadershipEntries(updatedEntries)
    onChange(updatedEntries)
  }

  const addLeadershipEntry = () => {
    const newEntry: LeadershipEntry = {
      id: Date.now().toString(),
      title: '',
      organization: '',
      location: '',
      startMonth: '',
      startYear: '',
      endMonth: '',
      endYear: '',
      isCurrent: false,
      bullets: [''],
    }
    const updatedEntries = [...leadershipEntries, newEntry]
    setLeadershipEntries(updatedEntries)
    onChange(updatedEntries)
  }

  const removeLeadershipEntry = (id: string) => {
    const updatedEntries = leadershipEntries.filter((entry) => entry.id !== id)
    setLeadershipEntries(updatedEntries)
    onChange(updatedEntries)
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
        <h2 className="text-xl font-normal tracking-tight text-[#171717]">
          Positions of Responsibility
        </h2>
        <p className="mt-1 text-xs text-[#666666]">
          Highlight leadership roles in clubs, committees, non-profits, or student initiatives.
        </p>
      </div>

      <div className="space-y-4">
        {leadershipEntries.length === 0 ? (
          <div className="rounded-[8px] border border-[#ebebeb] bg-[#fafafa] p-8 text-center">
            <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[#171717]">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.75}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-sm font-medium text-[#171717]">
              No Positions of Responsibility Added
            </h3>
            <p className="mx-auto mt-1 max-w-md text-xs text-[#666666]">
              Showcase student government, club leadership, mentoring, or community initiatives.
            </p>
            <button
              type="button"
              onClick={addLeadershipEntry}
              className="mt-4 inline-flex items-center rounded-[6px] bg-[#171717] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#333333]"
            >
              + Add Position of Responsibility
            </button>
          </div>
        ) : (
          leadershipEntries.map((entry, index) => (
            <div key={entry.id} className="rounded-[8px] border border-[#ebebeb] bg-[#fafafa] p-5">
              <div className="mb-4 flex items-center justify-between border-b border-[#ebebeb] pb-3">
                <h3 className="font-mono text-xs uppercase tracking-[0.05em] text-[#171717]">
                  Leadership #{index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => removeLeadershipEntry(entry.id)}
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
              </div>

              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Title */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={`title-${entry.id}`}
                    className="block text-xs font-medium text-[#171717]"
                  >
                    Role / Title *
                  </label>
                  <input
                    id={`title-${entry.id}`}
                    type="text"
                    value={entry.title}
                    onChange={(e) => handleEntryChange(entry.id, 'title', e.target.value)}
                    className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                    placeholder="e.g., President, Tech Lead, Volunteer Coordinator"
                  />
                </div>

                {/* Organization */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={`organization-${entry.id}`}
                    className="block text-xs font-medium text-[#171717]"
                  >
                    Organization / Club *
                  </label>
                  <input
                    id={`organization-${entry.id}`}
                    type="text"
                    value={entry.organization}
                    onChange={(e) => handleEntryChange(entry.id, 'organization', e.target.value)}
                    className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                    placeholder="e.g., ACM Student Chapter, Red Cross"
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
                    placeholder="e.g., University Campus"
                  />
                </div>

                {/* Current Position Checkbox */}
                <div className="flex items-end pb-2">
                  <label className="flex cursor-pointer select-none items-center">
                    <input
                      type="checkbox"
                      checked={entry.isCurrent}
                      onChange={(e) => handleEntryChange(entry.id, 'isCurrent', e.target.checked)}
                      className="h-4 w-4 rounded border-[#ebebeb] text-[#171717] focus:ring-1 focus:ring-[#171717]"
                    />
                    <span className="ml-2 text-xs font-medium text-[#171717]">
                      I currently hold this position
                    </span>
                  </label>
                </div>

                {/* Date Range */}
                <div className="space-y-1.5">
                  <label
                    htmlFor={`startMonth-${entry.id}`}
                    className="block text-xs font-medium text-[#171717]"
                  >
                    Start Month
                  </label>
                  <select
                    id={`startMonth-${entry.id}`}
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
                    htmlFor={`startYear-${entry.id}`}
                    className="block text-xs font-medium text-[#171717]"
                  >
                    Start Year
                  </label>
                  <select
                    id={`startYear-${entry.id}`}
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
                        htmlFor={`endMonth-${entry.id}`}
                        className="block text-xs font-medium text-[#171717]"
                      >
                        End Month
                      </label>
                      <select
                        id={`endMonth-${entry.id}`}
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
                        htmlFor={`endYear-${entry.id}`}
                        className="block text-xs font-medium text-[#171717]"
                      >
                        End Year
                      </label>
                      <select
                        id={`endYear-${entry.id}`}
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
                  placeholder="e.g., Organized annual hackathon for 400+ participants and raised $25k in sponsorships..."
                  maxBullets={15}
                />
              </div>
            </div>
          ))
        )}

        {/* Add Leadership Button */}
        {leadershipEntries.length > 0 && (
          <button
            type="button"
            onClick={addLeadershipEntry}
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
            Add Another Position of Responsibility
          </button>
        )}
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
            <h4 className="font-medium text-[#171717]">Leadership Tips</h4>
            <ul className="mt-1 space-y-0.5 text-[#666666]">
              <li>• Focus on team scale, budget managed, or event reach.</li>
              <li>• Demonstrates soft skills, initiative, and cross-functional leadership.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadershipActivitiesSection
