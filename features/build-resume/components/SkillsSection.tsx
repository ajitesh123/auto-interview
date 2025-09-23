'use client'

import { useState, useRef } from 'react'
import { SkillsData } from '../../../lib/resumeStore'
import BoldButton from './BoldButton'

interface SkillsSectionProps {
  data?: SkillsData
  onChange: (data: SkillsData) => void
}

const SkillsSection = ({ data, onChange }: SkillsSectionProps) => {
  const [skillsData, setSkillsData] = useState<SkillsData>(
    data || {
      technical: [],
      languages: [],
      interests: [],
    }
  )

  // Create refs for all possible skill inputs (up to 10 per category)
  const inputRefs = useRef<Record<string, (HTMLInputElement | null)[]>>({
    technical: [],
    languages: [],
    interests: [],
  })

  const [enabledFields, setEnabledFields] = useState<Record<keyof SkillsData, boolean>>({
    technical: data?.technical?.some((skill) => skill.trim() !== '') || false,
    languages: data?.languages?.some((skill) => skill.trim() !== '') || false,
    interests: data?.interests?.some((skill) => skill.trim() !== '') || false,
  })

  const handleSkillsChange = (field: keyof SkillsData, value: string[]) => {
    const newData = { ...skillsData, [field]: value }
    setSkillsData(newData)
    onChange(newData)
  }

  const handleFieldToggle = (field: keyof SkillsData, enabled: boolean) => {
    setEnabledFields((prev) => ({ ...prev, [field]: enabled }))

    if (enabled) {
      // When enabling, add an empty skill if none exist
      if (skillsData[field].length === 0) {
        handleSkillsChange(field, [''])
      }
    } else {
      // When disabling, clear all skills
      handleSkillsChange(field, [])
    }
  }

  const addSkill = (field: keyof SkillsData) => {
    const currentSkills = skillsData[field]
    if (currentSkills.length < 10) {
      // Limit to 10 skills per category
      const newSkills = [...currentSkills, '']
      handleSkillsChange(field, newSkills)
    }
  }

  const removeSkill = (field: keyof SkillsData, index: number) => {
    const currentSkills = skillsData[field]
    if (currentSkills.length > 1) {
      const newSkills = currentSkills.filter((_, i) => i !== index)
      handleSkillsChange(field, newSkills)
    }
  }

  const updateSkill = (field: keyof SkillsData, index: number, value: string) => {
    const currentSkills = [...skillsData[field]]
    currentSkills[index] = value
    const newSkillsData = { ...skillsData, [field]: currentSkills }
    setSkillsData(newSkillsData)
    // Don't call onChange immediately to prevent focus loss
    // onChange will be called when the user finishes typing (onBlur)
  }

  const handleBoldText = (
    field: keyof SkillsData,
    index: number,
    selectedText: string,
    startPos: number,
    endPos: number
  ) => {
    const currentSkills = [...skillsData[field]]
    const currentSkill = currentSkills[index]
    const beforeSelection = currentSkill.substring(0, startPos)
    const afterSelection = currentSkill.substring(endPos)
    const boldedText = `**${selectedText}**`

    const newSkill = beforeSelection + boldedText + afterSelection
    updateSkill(field, index, newSkill)
  }

  const SkillInput = ({
    field,
    title,
    placeholder,
  }: {
    field: keyof SkillsData
    title: string
    placeholder: string
  }) => {
    const skills = skillsData[field]
    const isEnabled = enabledFields[field]

    return (
      <div className={`space-y-3 ${!isEnabled ? 'opacity-50' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <label className="block text-sm font-medium text-gray-300">{title}</label>
            {!isEnabled && (
              <span className="rounded-full bg-gray-600 px-2 py-1 text-xs text-gray-400">
                Not included
              </span>
            )}
            {isEnabled && (
              <span className="rounded-full bg-green-600 px-2 py-1 text-xs text-green-100">
                ✓ Included
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => handleFieldToggle(field, e.target.checked)}
              className="h-5 w-5 rounded border-gray-500 bg-gray-600 text-pink-500 focus:ring-pink-500"
            />
            <span className="text-sm font-medium text-white">Include in Resume</span>
          </div>
        </div>

        {isEnabled && (
          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  ref={(el) => {
                    inputRefs.current[field][index] = el
                  }}
                  type="text"
                  value={skill}
                  onChange={(e) => updateSkill(field, index, e.target.value)}
                  onBlur={() => {
                    // Call onChange when user finishes typing
                    const filteredSkills = skillsData[field].filter((s) => s.trim() !== '')
                    onChange({ ...skillsData, [field]: filteredSkills })
                  }}
                  className="flex-1 rounded-lg border border-gray-500 bg-gray-600 px-4 py-3 text-white placeholder-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder={placeholder}
                />

                <div className="flex space-x-1">
                  <BoldButton
                    inputRef={{ current: inputRefs.current[field][index] }}
                    onBold={(selectedText, startPos, endPos) =>
                      handleBoldText(field, index, selectedText, startPos, endPos)
                    }
                  />

                  {index === skills.length - 1 && skills.length < 10 && (
                    <button
                      type="button"
                      onClick={() => addSkill(field)}
                      className="flex h-12 w-12 items-center justify-center rounded-lg border border-gray-500 bg-gray-600 text-gray-300 transition-colors hover:bg-gray-500 hover:text-white"
                      title="Add skill"
                    >
                      <svg
                        className="h-5 w-5"
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
                    </button>
                  )}

                  {skills.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSkill(field, index)}
                      className="flex h-12 w-12 items-center justify-center rounded-lg border border-red-500 bg-red-600 text-white transition-colors hover:bg-red-500"
                      title="Remove skill"
                    >
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">Skills and Interests</h1>
          <p className="text-lg text-gray-300">
            Highlight your technical skills, languages, and interests
          </p>
          <div className="mt-4 rounded-lg border border-blue-700 bg-blue-900 p-4">
            <p className="text-sm text-blue-200">
              💡 <strong>Tip:</strong> Check the "Include in Resume" box for each skill category you
              want to appear in your final resume
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-700 bg-gray-800 p-8">
          <div className="space-y-8">
            <SkillInput
              field="technical"
              title="Technical Skills"
              placeholder="e.g., JavaScript, React, Python, AWS"
            />

            <SkillInput
              field="languages"
              title="Languages"
              placeholder="e.g., English (Native), Spanish (Fluent), French (Conversational)"
            />

            <SkillInput
              field="interests"
              title="Interests"
              placeholder="e.g., Technology, Innovation, Leadership, Photography"
            />
          </div>

          {/* Tips */}
          <div className="mt-8 rounded-lg bg-gray-700 p-6">
            <div className="flex items-start space-x-3">
              <svg
                className="mt-1 h-6 w-6 text-pink-500"
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
                <h4 className="mb-1 text-sm font-medium text-white">Skills Tips</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>
                    • Technical: List programming languages, frameworks, tools, and technologies
                  </li>
                  <li>
                    • Languages: Include proficiency levels (Native, Fluent, Conversational, Basic)
                  </li>
                  <li>• Interests: Show personality and passion areas relevant to your field</li>
                  <li>• Only include skills you're comfortable discussing in interviews</li>
                  <li>• Use checkboxes to include/exclude each category from your resume</li>
                  <li>• Select text and click the bold button (B) to highlight important skills</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SkillsSection
