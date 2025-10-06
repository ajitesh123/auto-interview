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
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-chatgpt-text">Projects</h2>
        <p className="text-chatgpt-textSecondary">
          Add your personal, academic, or professional projects
        </p>
      </div>

      <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
        {/* Main Content - Left Side */}
        <div className="flex-1 space-y-6">
          {projectEntries.length === 0 ? (
            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card py-12 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-chatgpt-accent">
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
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-chatgpt-text">
                No Projects Added Yet
              </h3>
              <p className="mb-4 text-chatgpt-textSecondary">
                Showcase your technical skills and creativity by adding your projects.
              </p>
              <button
                onClick={addProjectEntry}
                className="mx-auto flex items-center rounded-lg bg-chatgpt-accent px-6 py-3 font-semibold text-chatgpt-text transition-colors hover:bg-chatgpt-green/80"
              >
                <svg className="mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-6"
              >
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-chatgpt-text">Project {index + 1}</h3>
                  <button
                    onClick={() => removeProjectEntry(entry.id)}
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
                  {/* Project Name */}
                  <div className="space-y-2">
                    <label
                      htmlFor={`projectName-${entry.id}`}
                      className="block text-sm font-medium text-chatgpt-textSecondary"
                    >
                      Project Name
                    </label>
                    <input
                      id={`projectName-${entry.id}`}
                      type="text"
                      value={entry.projectName}
                      onChange={(e) => handleEntryChange(entry.id, 'projectName', e.target.value)}
                      className="w-full rounded-lg border border-chatgpt-border bg-chatgpt-input px-4 py-3 text-chatgpt-text placeholder-gray-400 focus:border-chatgpt-accent focus:outline-none focus:ring-2 focus:ring-chatgpt-accent"
                      placeholder="e.g., E-commerce Website, Mobile App, Data Analysis Tool"
                    />
                  </div>
                </div>

                {/* Project Link */}
                <div className="mb-4 space-y-2">
                  <label
                    htmlFor={`projectLink-${entry.id}`}
                    className="block text-sm font-medium text-gray-300"
                  >
                    Project Link (Optional)
                  </label>
                  <input
                    id={`projectLink-${entry.id}`}
                    type="url"
                    value={entry.link}
                    onChange={(e) => handleEntryChange(entry.id, 'link', e.target.value)}
                    className="w-full rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="https://github.com/username/project or https://project-demo.com"
                  />
                </div>

                {/* Bullet Points */}
                <BulletPointsInput
                  bullets={entry.bullets}
                  onChange={(bullets) => handleEntryChange(entry.id, 'bullets', bullets)}
                  placeholder="Describe your project, key features, challenges solved, and technologies used..."
                  maxBullets={15}
                />

                {/* Project Link Display */}
                {entry.link && (
                  <div className="mt-4 rounded-lg border border-chatgpt-border bg-chatgpt-card p-3">
                    <div className="flex items-center">
                      <svg
                        className="mr-2 h-4 w-4 text-chatgpt-accent"
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
                        className="break-all text-sm text-chatgpt-accent transition-colors hover:text-chatgpt-green/80"
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
            <div className="flex justify-center">
              <button
                onClick={addProjectEntry}
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
                Add Another Project
              </button>
            </div>
          )}
        </div>

        {/* Tips Section - Right Side */}
        <div className="w-full xl:w-72 xl:flex-shrink-0">
          <div className="sticky top-6 rounded-lg bg-chatgpt-card p-3">
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
                <h4 className="mb-2 text-sm font-medium text-chatgpt-text">Projects Tips</h4>
                <ul className="space-y-1 text-xs text-chatgpt-textSecondary">
                  <li>• Include personal/academic/professional projects</li>
                  <li>• Mention technologies and tools used</li>
                  <li>• Describe problem solved and approach</li>
                  <li>• Include GitHub/demo links</li>
                  <li>• Quantify impact when possible</li>
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
