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
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-white">Positions of Responsibility</h2>
      </div>

      {leadershipEntries.length === 0 ? (
        <div className="rounded-lg border border-gray-600 bg-gray-700 py-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-pink-700">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">
            No Positions of Responsibility Added Yet
          </h3>
          <p className="mb-4 text-gray-300">
            Add information about any organisations or club/committees that you were part of and
            have led, to make your resume better
          </p>
          <button
            onClick={addLeadershipEntry}
            className="mx-auto flex items-center rounded-lg bg-gradient-to-r from-pink-500 to-pink-700 px-6 py-3 font-semibold text-white transition-colors hover:from-pink-400 hover:to-pink-600"
          >
            <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Add Position of Responsibility
          </button>
        </div>
      ) : (
        leadershipEntries.map((entry, index) => (
          <div key={entry.id} className="rounded-lg border border-gray-600 bg-gray-700 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                Position of Responsibility {index + 1}
              </h3>
              <button
                onClick={() => removeLeadershipEntry(entry.id)}
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
            </div>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Title */}
              <div className="space-y-2">
                <label
                  htmlFor={`title-${entry.id}`}
                  className="block text-sm font-medium text-gray-300"
                >
                  Title/Role
                </label>
                <input
                  id={`title-${entry.id}`}
                  type="text"
                  value={entry.title}
                  onChange={(e) => handleEntryChange(entry.id, 'title', e.target.value)}
                  className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., President, Volunteer Coordinator, Team Captain"
                />
              </div>

              {/* Organization */}
              <div className="space-y-2">
                <label
                  htmlFor={`organization-${entry.id}`}
                  className="block text-sm font-medium text-gray-300"
                >
                  Organisation/Club
                </label>
                <input
                  id={`organization-${entry.id}`}
                  type="text"
                  value={entry.organization}
                  onChange={(e) => handleEntryChange(entry.id, 'organization', e.target.value)}
                  className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., Student Government, Red Cross, Sports Club"
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
                  placeholder="e.g., University of California, Local Community"
                />
              </div>

              {/* Current Position Checkbox */}
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={entry.isCurrent}
                    onChange={(e) => handleEntryChange(entry.id, 'isCurrent', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-500 bg-gray-600 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-300">
                    I currently hold this position
                  </span>
                </label>
              </div>
            </div>

            {/* Date Range */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div className="space-y-2">
                <label
                  htmlFor={`startMonth-${entry.id}`}
                  className="block text-sm font-medium text-gray-300"
                >
                  Start Month
                </label>
                <select
                  id={`startMonth-${entry.id}`}
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
                  htmlFor={`startYear-${entry.id}`}
                  className="block text-sm font-medium text-gray-300"
                >
                  Start Year
                </label>
                <select
                  id={`startYear-${entry.id}`}
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
                      htmlFor={`endMonth-${entry.id}`}
                      className="block text-sm font-medium text-gray-300"
                    >
                      End Month
                    </label>
                    <select
                      id={`endMonth-${entry.id}`}
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
                      htmlFor={`endYear-${entry.id}`}
                      className="block text-sm font-medium text-gray-300"
                    >
                      End Year
                    </label>
                    <select
                      id={`endYear-${entry.id}`}
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
              placeholder="Describe your role, responsibilities, and achievements..."
              maxBullets={15}
            />
          </div>
        ))
      )}

      {/* Add Leadership Button */}
      {leadershipEntries.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={addLeadershipEntry}
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
            Add Another Position of Responsibility
          </button>
        </div>
      )}

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
            <h4 className="mb-1 text-sm font-medium text-white">
              Positions of Responsibility Tips
            </h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Include student government, clubs, volunteer work, sports teams</li>
              <li>• Highlight leadership roles and responsibilities</li>
              <li>• Quantify your impact when possible (e.g., "Led team of 15 volunteers")</li>
              <li>• Show skills relevant to your target job</li>
              <li>• Use bullet points for easy scanning</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadershipActivitiesSection
