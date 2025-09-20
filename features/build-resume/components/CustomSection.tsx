'use client'

import { useState } from 'react'
import BulletPointsInput from './BulletPointsInput'

interface CustomEntry {
  id: string
  title: string
  subtitle: string
  startDate: string
  endDate: string
  isCurrent: boolean
  bullets: string[]
}

interface CustomSectionProps {
  sectionTitle: string
  sectionNumber: number
  data?: {
    sectionTitle: string
    entries: CustomEntry[]
  }
  onChange: (data: { sectionTitle: string; entries: CustomEntry[] }) => void
}

const CustomSection = ({ sectionTitle, sectionNumber, data, onChange }: CustomSectionProps) => {
  const [customTitle, setCustomTitle] = useState(data?.sectionTitle || sectionTitle)
  const [customEntries, setCustomEntries] = useState<CustomEntry[]>(
    data?.entries && data.entries.length > 0 ? data.entries : []
  )

  const handleTitleChange = (title: string) => {
    setCustomTitle(title)
    onChange({ sectionTitle: title, entries: customEntries })
  }

  const handleEntryChange = (id: string, field: keyof CustomEntry, value: string | boolean) => {
    const updatedEntries = customEntries.map((entry) => {
      if (entry.id === id) {
        const updatedEntry = { ...entry, [field]: value }

        // If marking as current, clear end date
        if (field === 'isCurrent' && value === true) {
          updatedEntry.endDate = ''
        }

        return updatedEntry
      }
      return entry
    })
    setCustomEntries(updatedEntries)
    onChange({ sectionTitle: customTitle, entries: updatedEntries })
  }

  const addCustomEntry = () => {
    const newEntry: CustomEntry = {
      id: Date.now().toString(),
      title: '',
      subtitle: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      bullets: [''],
    }
    const updatedEntries = [...customEntries, newEntry]
    setCustomEntries(updatedEntries)
    onChange({ sectionTitle: customTitle, entries: updatedEntries })
  }

  const removeCustomEntry = (id: string) => {
    const updatedEntries = customEntries.filter((entry) => entry.id !== id)
    setCustomEntries(updatedEntries)
    onChange({ sectionTitle: customTitle, entries: updatedEntries })
  }

  return (
    <div className="space-y-6">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-white">Other ({sectionNumber})</h2>
        <p className="text-gray-300">
          Add any additional information that showcases your skills and experience
        </p>
      </div>

      {/* Section Title */}
      <div className="rounded-lg border border-gray-600 bg-gray-700 p-6">
        <div className="space-y-2">
          <label htmlFor="section-title" className="block text-sm font-medium text-gray-300">
            Section Title
          </label>
          <input
            id="section-title"
            type="text"
            value={customTitle}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="e.g., Certifications, Skills, Languages, Publications"
          />
        </div>
      </div>

      {customEntries.length === 0 ? (
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-white">No Entries Added Yet</h3>
          <p className="mb-4 text-gray-300">
            Add entries to showcase additional skills, certifications, or achievements.
          </p>
          <button
            onClick={addCustomEntry}
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
            Add Entry
          </button>
        </div>
      ) : (
        customEntries.map((entry, index) => (
          <div key={entry.id} className="rounded-lg border border-gray-600 bg-gray-700 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Entry {index + 1}</h3>
              <button
                onClick={() => removeCustomEntry(entry.id)}
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
                  Title
                </label>
                <input
                  id={`title-${entry.id}`}
                  type="text"
                  value={entry.title}
                  onChange={(e) => handleEntryChange(entry.id, 'title', e.target.value)}
                  className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., AWS Certified Solutions Architect, Fluent in Spanish"
                />
              </div>

              {/* Subtitle */}
              <div className="space-y-2">
                <label
                  htmlFor={`subtitle-${entry.id}`}
                  className="block text-sm font-medium text-gray-300"
                >
                  Subtitle (Optional)
                </label>
                <input
                  id={`subtitle-${entry.id}`}
                  type="text"
                  value={entry.subtitle}
                  onChange={(e) => handleEntryChange(entry.id, 'subtitle', e.target.value)}
                  className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., Amazon Web Services, Native Speaker"
                />
              </div>
            </div>

            {/* Date Range */}
            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <label
                  htmlFor={`start-date-${entry.id}`}
                  className="block text-sm font-medium text-gray-300"
                >
                  Start Date (Optional)
                </label>
                <input
                  id={`start-date-${entry.id}`}
                  type="text"
                  value={entry.startDate}
                  onChange={(e) => handleEntryChange(entry.id, 'startDate', e.target.value)}
                  className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., Jan 2023, 2020"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`end-date-${entry.id}`}
                  className="block text-sm font-medium text-gray-300"
                >
                  End Date (Optional)
                </label>
                <input
                  id={`end-date-${entry.id}`}
                  type="text"
                  value={entry.endDate}
                  onChange={(e) => handleEntryChange(entry.id, 'endDate', e.target.value)}
                  disabled={entry.isCurrent}
                  className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder={entry.isCurrent ? 'Current' : 'e.g., Dec 2023, Present'}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor={`current-${entry.id}`} className="flex items-center">
                  <input
                    id={`current-${entry.id}`}
                    type="checkbox"
                    checked={entry.isCurrent}
                    onChange={(e) => handleEntryChange(entry.id, 'isCurrent', e.target.checked)}
                    className="h-4 w-4 rounded border-gray-500 bg-gray-600 text-pink-600 focus:ring-2 focus:ring-pink-500"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-300">Ongoing/Current</span>
                </label>
              </div>
            </div>

            {/* Bullet Points */}
            <BulletPointsInput
              bullets={entry.bullets}
              onChange={(bullets) => handleEntryChange(entry.id, 'bullets', bullets)}
              placeholder="Add additional details, achievements, or context..."
              maxBullets={15}
            />
          </div>
        ))
      )}

      {/* Add Entry Button */}
      {customEntries.length > 0 && (
        <div className="flex justify-center">
          <button
            onClick={addCustomEntry}
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
            Add Another Entry
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
            <h4 className="mb-1 text-sm font-medium text-white">Custom Section Tips</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>• Use for certifications, skills, languages, publications, or awards</li>
              <li>• Keep section titles concise and professional</li>
              <li>• Include relevant dates when applicable</li>
              <li>• Add descriptions to provide context and details</li>
              <li>• Use bullet points for easy scanning</li>
              <li>• Only include information that adds value to your application</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomSection
