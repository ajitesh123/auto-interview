'use client'

import { useState } from 'react'
import BulletPointsInput from './BulletPointsInput'

interface ProjectEntry {
  id: string
  projectName: string
  bullets: string[]
  link: string
}

interface ProjectsSectionProps {
  data?: ProjectEntry[]
  onChange: (data: ProjectEntry[]) => void
}

const ProjectsSection = ({ data, onChange }: ProjectsSectionProps) => {
  const [projectEntries, setProjectEntries] = useState<ProjectEntry[]>(
    data && data.length > 0 ? data : []
  )

  const handleEntryChange = (id: string, field: keyof ProjectEntry, value: string | string[]) => {
    const updatedEntries = projectEntries.map((entry) =>
      entry.id === id ? { ...entry, [field]: value } : entry
    )
    setProjectEntries(updatedEntries)
    onChange(updatedEntries)
  }

  const addProjectEntry = () => {
    const newEntry: ProjectEntry = {
      id: Date.now().toString(),
      projectName: '',
      bullets: [''],
      link: '',
    }
    const updatedEntries = [...projectEntries, newEntry]
    setProjectEntries(updatedEntries)
    onChange(updatedEntries)
  }

  const removeProjectEntry = (id: string) => {
    const updatedEntries = projectEntries.filter((entry) => entry.id !== id)
    setProjectEntries(updatedEntries)
    onChange(updatedEntries)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
        {/* Main Content - Left Side */}
        <div className="flex-1 space-y-4">
          {projectEntries.length === 0 ? (
            <div className="rounded-[8px] border border-dashed border-[#ebebeb] bg-[#fafafa] py-10 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#ebebeb] bg-white text-[#666666]">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="mb-1 text-sm font-semibold text-[#171717]">No Projects Added Yet</h3>
              <p className="mb-4 text-xs text-[#666666]">
                Showcase personal, open-source, or academic projects.
              </p>
              <button
                type="button"
                onClick={addProjectEntry}
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
                Add Project
              </button>
            </div>
          ) : (
            projectEntries.map((entry, index) => (
              <div
                key={entry.id}
                className="rounded-[8px] border border-[#ebebeb] bg-white p-5 shadow-sm"
              >
                <div className="mb-4 flex items-center justify-between border-b border-[#f0f0f0] pb-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#666666]">
                    Project {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeProjectEntry(entry.id)}
                    className="inline-flex items-center gap-1 text-xs text-[#999999] transition-colors hover:text-red-500"
                    title="Remove project"
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
                  {/* Project Name */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor={`projectName-${entry.id}`}
                      className="block text-xs font-medium text-[#444444]"
                    >
                      Project Name
                    </label>
                    <input
                      id={`projectName-${entry.id}`}
                      type="text"
                      value={entry.projectName}
                      onChange={(e) => handleEntryChange(entry.id, 'projectName', e.target.value)}
                      className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                      placeholder="e.g., Real-Time Video Synthesizer"
                    />
                  </div>

                  {/* Project Link */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor={`projectLink-${entry.id}`}
                      className="block text-xs font-medium text-[#444444]"
                    >
                      Project Link (Optional)
                    </label>
                    <input
                      id={`projectLink-${entry.id}`}
                      type="url"
                      value={entry.link}
                      onChange={(e) => handleEntryChange(entry.id, 'link', e.target.value)}
                      className="w-full rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                      placeholder="https://github.com/user/project"
                    />
                  </div>
                </div>

                {/* Bullet Points */}
                <BulletPointsInput
                  bullets={entry.bullets}
                  onChange={(bullets) => handleEntryChange(entry.id, 'bullets', bullets)}
                  placeholder="Describe the problem, technologies used, and quantified impact..."
                  maxBullets={15}
                />

                {/* Project Link Display */}
                {entry.link && (
                  <div className="mt-3 rounded-[6px] border border-[#ebebeb] bg-[#fafafa] px-3 py-2">
                    <div className="flex items-center gap-2 text-xs">
                      <svg
                        className="h-3.5 w-3.5 flex-shrink-0 text-[#666666]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      <a
                        href={entry.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate text-[#171717] underline hover:text-[#0070f3]"
                      >
                        {entry.link}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}

          {/* Add Project Button */}
          {projectEntries.length > 0 && (
            <button
              type="button"
              onClick={addProjectEntry}
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
              Add Another Project
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
                <h4 className="mb-1.5 font-semibold text-[#171717]">Projects Tips</h4>
                <ul className="space-y-1.5 leading-relaxed text-[#666666]">
                  <li>• Include personal, academic, or open-source projects</li>
                  <li>• State specific technologies and architecture used</li>
                  <li>• Explain the core challenge and your solution</li>
                  <li>• Quantify results (e.g. speedup, user base, accuracy)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectsSection
