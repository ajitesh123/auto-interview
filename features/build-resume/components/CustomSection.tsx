'use client'

import { useState } from 'react'
import BulletPointsInput from './BulletPointsInput'
import BoldButton from './BoldButton'

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

  const handleEntryChange = (
    id: string,
    field: keyof CustomEntry,
    value: string | boolean | string[]
  ) => {
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

  const handleBoldText = (
    id: string,
    field: 'title' | 'subtitle',
    selectedText: string,
    startPos: number,
    endPos: number
  ) => {
    const updatedEntries = customEntries.map((entry) => {
      if (entry.id === id) {
        const currentText = entry[field]
        const beforeSelection = currentText.substring(0, startPos)
        const afterSelection = currentText.substring(endPos)
        const boldedText = `**${selectedText}**`

        const newText = beforeSelection + boldedText + afterSelection
        return { ...entry, [field]: newText }
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
      <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
        {/* Main Content - Left Side */}
        <div className="flex-1 space-y-4">
          {/* Section Title Configuration */}
          <div className="rounded-[8px] border border-[#ebebeb] bg-white p-4 shadow-sm">
            <div className="space-y-1.5">
              <label htmlFor="section-title" className="block text-xs font-medium text-[#444444]">
                Custom Section Title
              </label>
              <input
                id="section-title"
                type="text"
                value={customTitle}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                placeholder="e.g., Publications, Patents, Volunteer Work, Honors"
              />
            </div>
          </div>

          {customEntries.length === 0 ? (
            <div className="rounded-[8px] border border-dashed border-[#ebebeb] bg-[#fafafa] py-10 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[#666666]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-[#171717]">No Entries Added Yet</h3>
              <p className="mb-4 text-xs text-[#666666]">
                Add custom items such as publications, patents, awards, or volunteer experience.
              </p>
              <button
                type="button"
                onClick={addCustomEntry}
                className="inline-flex items-center gap-1.5 rounded-[6px] bg-[#171717] px-4 py-2 text-xs font-medium text-white transition-colors hover:bg-[#333333]"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <div
                key={entry.id}
                className="rounded-[8px] border border-[#ebebeb] bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between border-b border-[#f0f0f0] pb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
                    Entry {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeCustomEntry(entry.id)}
                    className="inline-flex items-center gap-1 text-xs text-[#999999] transition-colors hover:text-red-500"
                    title="Remove entry"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <span>Remove</span>
                  </button>
                </div>

                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Title */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor={`title-${entry.id}`}
                      className="block text-xs font-medium text-[#444444]"
                    >
                      Title / Role / Honor
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id={`title-${entry.id}`}
                        type="text"
                        value={entry.title}
                        onChange={(e) => handleEntryChange(entry.id, 'title', e.target.value)}
                        className="flex-1 rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                        placeholder="e.g., Best Research Paper Award"
                        ref={(el) => {
                          if (el) {
                            ;(
                              el as HTMLInputElement & { boldButtonRef?: HTMLInputElement }
                            ).boldButtonRef = el
                          }
                        }}
                      />
                      <BoldButton
                        onBold={(selectedText, startPos, endPos) =>
                          handleBoldText(entry.id, 'title', selectedText, startPos, endPos)
                        }
                      />
                    </div>
                  </div>

                  {/* Subtitle */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor={`subtitle-${entry.id}`}
                      className="block text-xs font-medium text-[#444444]"
                    >
                      Organization / Subtitle (Optional)
                    </label>
                    <div className="flex items-center gap-1.5">
                      <input
                        id={`subtitle-${entry.id}`}
                        type="text"
                        value={entry.subtitle}
                        onChange={(e) => handleEntryChange(entry.id, 'subtitle', e.target.value)}
                        className="flex-1 rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                        placeholder="e.g., IEEE Computer Society"
                        ref={(el) => {
                          if (el) {
                            ;(
                              el as HTMLInputElement & { boldButtonRef?: HTMLInputElement }
                            ).boldButtonRef = el
                          }
                        }}
                      />
                      <BoldButton
                        onBold={(selectedText, startPos, endPos) =>
                          handleBoldText(entry.id, 'subtitle', selectedText, startPos, endPos)
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Date Range */}
                <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-end">
                  <div className="space-y-1.5">
                    <label
                      htmlFor={`start-date-${entry.id}`}
                      className="block text-xs font-medium text-[#444444]"
                    >
                      Start Date (Optional)
                    </label>
                    <input
                      id={`start-date-${entry.id}`}
                      type="text"
                      value={entry.startDate}
                      onChange={(e) => handleEntryChange(entry.id, 'startDate', e.target.value)}
                      className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                      placeholder="e.g., Jan 2023"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor={`end-date-${entry.id}`}
                      className="block text-xs font-medium text-[#444444]"
                    >
                      End Date (Optional)
                    </label>
                    <input
                      id={`end-date-${entry.id}`}
                      type="text"
                      value={entry.endDate}
                      onChange={(e) => handleEntryChange(entry.id, 'endDate', e.target.value)}
                      disabled={entry.isCurrent}
                      className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717] disabled:bg-[#f5f5f5] disabled:text-[#999999]"
                      placeholder={entry.isCurrent ? 'Present' : 'e.g., Dec 2023'}
                    />
                  </div>

                  <div className="flex h-9 items-center">
                    <label
                      htmlFor={`current-${entry.id}`}
                      className="flex cursor-pointer items-center gap-2 text-xs font-medium text-[#666666]"
                    >
                      <input
                        id={`current-${entry.id}`}
                        type="checkbox"
                        checked={entry.isCurrent}
                        onChange={(e) => handleEntryChange(entry.id, 'isCurrent', e.target.checked)}
                        className="h-4 w-4 rounded border-[#ebebeb] text-[#171717] focus:ring-[#171717]"
                      />
                      <span>Ongoing / Current</span>
                    </label>
                  </div>
                </div>

                {/* Bullet Points */}
                <BulletPointsInput
                  bullets={entry.bullets}
                  onChange={(bullets) => handleEntryChange(entry.id, 'bullets', bullets)}
                  placeholder="Add details, publication citations, or scope of accomplishment..."
                  maxBullets={15}
                />
              </div>
            ))
          )}

          {/* Add Entry Button */}
          {customEntries.length > 0 && (
            <button
              type="button"
              onClick={addCustomEntry}
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
              Add Another Entry
            </button>
          )}
        </div>

        {/* Tips Section - Right Side */}
        <div className="w-full xl:w-72 xl:flex-shrink-0">
          <div className="sticky top-6 rounded-[8px] border border-[#ebebeb] bg-[#fafafa] p-4 text-xs text-[#666666]">
            <div className="flex items-start gap-2.5">
              <svg
                className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#171717]"
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
                <h4 className="mb-1.5 font-semibold text-[#171717]">Custom Section Tips</h4>
                <ul className="space-y-1.5 leading-relaxed text-[#666666]">
                  <li>• Use for patents, awards, publications, or volunteer work</li>
                  <li>• Keep entries structured chronologically</li>
                  <li>• Highlight impact and scope in bullet points</li>
                  <li>• Use standard citations for research papers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CustomSection
