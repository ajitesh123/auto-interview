'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { SkillsData } from '../../../lib/resumeStore'
import BoldButton from './BoldButton'

interface SkillsSectionProps {
  data?: SkillsData
  onChange: (data: SkillsData) => void
  onSave?: () => void
}

const SkillsSection = ({ data, onChange, onSave }: SkillsSectionProps) => {
  // Use ref to store the actual data to avoid re-renders
  const skillsDataRef = useRef<SkillsData>(
    data || {
      technical: [],
      languages: [],
      interests: [],
    }
  )

  // State only for triggering re-renders when needed (like adding/removing skills)
  const [renderTrigger, setRenderTrigger] = useState(0)

  // Create refs for all possible skill inputs (up to 10 per category)
  const inputRefs = useRef<Record<string, (HTMLInputElement | null)[]>>({
    technical: [],
    languages: [],
    interests: [],
  })

  // Use ref to store the latest onChange function to avoid dependency issues
  const onChangeRef = useRef(onChange)
  onChangeRef.current = onChange

  // Track if data has been saved to parent
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)

  const [enabledFields, setEnabledFields] = useState<Record<keyof SkillsData, boolean>>({
    technical: data?.technical?.some((skill) => skill.trim() !== '') || false,
    languages: data?.languages?.some((skill) => skill.trim() !== '') || false,
    interests: data?.interests?.some((skill) => skill.trim() !== '') || false,
  })

  // Sync with external data changes
  useEffect(() => {
    if (data) {
      skillsDataRef.current = data
      setEnabledFields({
        technical: data.technical?.some((skill) => skill.trim() !== '') || false,
        languages: data.languages?.some((skill) => skill.trim() !== '') || false,
        interests: data.interests?.some((skill) => skill.trim() !== '') || false,
      })
      setHasUnsavedChanges(false)
      setRenderTrigger((prev) => prev + 1) // Trigger re-render to update display
    }
  }, [data])

  // Function to save data to parent
  const saveData = useCallback(() => {
    onChangeRef.current(skillsDataRef.current)
    setHasUnsavedChanges(false)
    onSave?.()
  }, [onSave])

  // Note: saveData function is available but not exposed via ref

  // Stable function that doesn't depend on changing values
  const handleSkillsChange = useCallback((field: keyof SkillsData, value: string[]) => {
    skillsDataRef.current = { ...skillsDataRef.current, [field]: value }
    setHasUnsavedChanges(true)
    setRenderTrigger((prev) => prev + 1) // Trigger re-render to update display
  }, [])

  const handleFieldToggle = useCallback(
    (field: keyof SkillsData, enabled: boolean) => {
      setEnabledFields((prev) => ({ ...prev, [field]: enabled }))

      if (enabled) {
        // When enabling, add an empty skill if none exist
        if (skillsDataRef.current[field].length === 0) {
          skillsDataRef.current = { ...skillsDataRef.current, [field]: [''] }
          setHasUnsavedChanges(true)
          setRenderTrigger((prev) => prev + 1)
        }
      } else {
        // When disabling, clear all skills
        handleSkillsChange(field, [])
      }
    },
    [handleSkillsChange]
  )

  const addSkill = useCallback((field: keyof SkillsData) => {
    const currentSkills = skillsDataRef.current[field]
    if (currentSkills.length < 10) {
      // Limit to 10 skills per category
      const newSkills = [...currentSkills, '']
      skillsDataRef.current = { ...skillsDataRef.current, [field]: newSkills }
      setHasUnsavedChanges(true)
      setRenderTrigger((prev) => prev + 1)
    }
  }, [])

  const removeSkill = useCallback((field: keyof SkillsData, index: number) => {
    const currentSkills = skillsDataRef.current[field]
    if (currentSkills.length > 1) {
      const newSkills = currentSkills.filter((_, i) => i !== index)
      skillsDataRef.current = { ...skillsDataRef.current, [field]: newSkills }
      setHasUnsavedChanges(true)
      setRenderTrigger((prev) => prev + 1)
    }
  }, [])

  const updateSkill = useCallback((field: keyof SkillsData, index: number, value: string) => {
    // Update the ref directly without causing re-renders
    skillsDataRef.current[field][index] = value
    setHasUnsavedChanges(true)
    // NO setRenderTrigger here - this prevents re-renders during typing!
  }, [])

  const handleBoldText = useCallback(
    (
      field: keyof SkillsData,
      index: number,
      selectedText: string,
      startPos: number,
      endPos: number
    ) => {
      const currentSkills = [...skillsDataRef.current[field]]
      const currentSkill = currentSkills[index]
      const beforeSelection = currentSkill.substring(0, startPos)
      const afterSelection = currentSkill.substring(endPos)
      const boldedText = `**${selectedText}**`

      const newSkill = beforeSelection + boldedText + afterSelection
      currentSkills[index] = newSkill
      skillsDataRef.current = { ...skillsDataRef.current, [field]: currentSkills }
      setHasUnsavedChanges(true)
      setRenderTrigger((prev) => prev + 1) // Trigger re-render for bold text display
    },
    []
  )

  const SkillInput = ({
    field,
    title,
    placeholder,
  }: {
    field: keyof SkillsData
    title: string
    placeholder: string
  }) => {
    const skills = skillsDataRef.current[field]
    const isEnabled = enabledFields[field]

    return (
      <div className={`space-y-3 ${!isEnabled ? 'opacity-50' : ''}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <label className="block text-sm font-medium text-chatgpt-textSecondary">{title}</label>
            {!isEnabled && (
              <span className="rounded-full bg-chatgpt-input px-2 py-1 text-xs text-chatgpt-textSecondary">
                Not included
              </span>
            )}
            {isEnabled && (
              <span className="rounded-full bg-chatgpt-accent px-2 py-1 text-xs text-chatgpt-text">
                ✓ Included
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => handleFieldToggle(field, e.target.checked)}
              className="h-5 w-5 rounded border-chatgpt-border bg-chatgpt-input text-chatgpt-accent focus:ring-chatgpt-accent"
            />
            <span className="text-sm font-medium text-chatgpt-text">Include in Resume</span>
          </div>
        </div>

        {isEnabled && (
          <div className="space-y-2">
            {skills.map((skill, index) => (
              <div key={`${field}-${index}`} className="flex items-center space-x-2">
                <input
                  ref={(el) => {
                    if (inputRefs.current[field]) {
                      inputRefs.current[field][index] = el
                    }
                  }}
                  type="text"
                  defaultValue={skill}
                  onChange={(e) => updateSkill(field, index, e.target.value)}
                  className="flex-1 rounded-lg border border-chatgpt-border bg-chatgpt-input px-4 py-3 text-chatgpt-text placeholder-gray-400 focus:border-chatgpt-accent focus:outline-none focus:ring-2 focus:ring-chatgpt-accent"
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
                      className="flex h-12 w-12 items-center justify-center rounded-lg border border-chatgpt-border bg-chatgpt-card text-chatgpt-textSecondary transition-colors hover:bg-chatgpt-input hover:text-chatgpt-text"
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
    <div className="min-h-screen bg-chatgpt-dark text-chatgpt-text">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-chatgpt-text">Skills and Interests</h1>
          <p className="text-lg text-chatgpt-textSecondary">
            Highlight your technical skills, languages, and interests
          </p>
          <div className="mt-4 rounded-lg border border-chatgpt-accent/30 bg-chatgpt-accent/10 p-4">
            <p className="text-sm text-chatgpt-accent">
              💡 <strong>Tip:</strong> Check the "Include in Resume" box for each skill category you
              want to appear in your final resume
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
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
          <div className="mt-8 rounded-lg bg-matte-dark p-6">
            <div className="flex items-start space-x-3">
              <svg
                className="mt-1 h-6 w-6 text-accent-500"
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
