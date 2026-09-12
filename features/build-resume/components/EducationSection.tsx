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
      <div className="mb-6">
        <h2 className="text-xl font-normal tracking-tight text-[#171717]">Education</h2>
        <p className="mt-1 text-xs text-[#666666]">
          Add your academic background, degrees, and institutions.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-4">
        {educationEntries.map((entry, index) => (
          <div key={entry.id} className="rounded-[8px] border border-[#ebebeb] bg-[#fafafa] p-5">
            <div className="mb-4 flex items-center justify-between border-b border-[#ebebeb] pb-3">
              <h3 className="font-mono text-xs uppercase tracking-[0.05em] text-[#171717]">
                Education #{index + 1}
              </h3>
              {educationEntries.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducationEntry(entry.id)}
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

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Degree/Program */}
              <div className="space-y-1.5 sm:col-span-2">
                <label
                  htmlFor={`degree-${entry.id}`}
                  className="block text-xs font-medium text-[#171717]"
                >
                  Degree / Program *
                </label>
                <input
                  id={`degree-${entry.id}`}
                  type="text"
                  value={entry.degree}
                  onChange={(e) => handleEntryChange(entry.id, 'degree', e.target.value)}
                  className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                />
              </div>

              {/* Major/Field of Study */}
              <div className="space-y-1.5">
                <label
                  htmlFor={`major-${entry.id}`}
                  className="block text-xs font-medium text-[#171717]"
                >
                  Major / Field of Study
                </label>
                <input
                  id={`major-${entry.id}`}
                  type="text"
                  value={entry.major}
                  onChange={(e) => handleEntryChange(entry.id, 'major', e.target.value)}
                  className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                  placeholder="e.g., Artificial Intelligence, Finance"
                />
              </div>

              {/* University/Institution */}
              <div className="space-y-1.5">
                <label
                  htmlFor={`university-${entry.id}`}
                  className="block text-xs font-medium text-[#171717]"
                >
                  University / Institution *
                </label>
                <input
                  id={`university-${entry.id}`}
                  type="text"
                  value={entry.university}
                  onChange={(e) => handleEntryChange(entry.id, 'university', e.target.value)}
                  className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                  placeholder="e.g., Stanford University"
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
                  placeholder="e.g., Stanford, CA"
                />
              </div>

              {/* GPA */}
              <div className="space-y-1.5">
                <label
                  htmlFor={`gpa-${entry.id}`}
                  className="block text-xs font-medium text-[#171717]"
                >
                  GPA (Optional)
                </label>
                <input
                  id={`gpa-${entry.id}`}
                  type="text"
                  value={entry.gpa}
                  onChange={(e) => handleEntryChange(entry.id, 'gpa', e.target.value)}
                  className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                  placeholder="e.g., 3.85 / 4.0"
                />
              </div>

              {/* Graduation Month */}
              <div className="space-y-1.5">
                <label
                  htmlFor={`graduation-month-${entry.id}`}
                  className="block text-xs font-medium text-[#171717]"
                >
                  Graduation Month *
                </label>
                <select
                  id={`graduation-month-${entry.id}`}
                  value={entry.graduationMonth}
                  onChange={(e) => handleEntryChange(entry.id, 'graduationMonth', e.target.value)}
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

              {/* Graduation Year */}
              <div className="space-y-1.5">
                <label
                  htmlFor={`graduation-year-${entry.id}`}
                  className="block text-xs font-medium text-[#171717]"
                >
                  Graduation Year *
                </label>
                <select
                  id={`graduation-year-${entry.id}`}
                  value={entry.graduationYear}
                  onChange={(e) => handleEntryChange(entry.id, 'graduationYear', e.target.value)}
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
            </div>
          </div>
        ))}

        {/* Add Education Button */}
        {educationEntries.length < 4 && (
          <button
            type="button"
            onClick={addEducationEntry}
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
            Add Another Education Entry
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
            <h4 className="font-medium text-[#171717]">Education Tips for ATS</h4>
            <ul className="mt-1 space-y-0.5 text-[#666666]">
              <li>• Always list your highest degree or most recent education first.</li>
              <li>• Only mention GPA if it is 3.5 or higher.</li>
              <li>• Spell out university names fully (e.g. University of California, Berkeley).</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EducationSection
