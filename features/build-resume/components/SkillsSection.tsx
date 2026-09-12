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
      <div
        className={`space-y-3 rounded-[8px] border border-[#ebebeb] bg-white p-4 transition-opacity ${!isEnabled ? 'bg-[#fafafa] opacity-60' : ''}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#171717]">
              {title}
            </label>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                isEnabled ? 'bg-[#171717] text-white' : 'bg-[#ebebeb] text-[#666666]'
              }`}
            >
              {isEnabled ? 'Included' : 'Excluded'}
            </span>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-xs font-medium text-[#666666]">
            <input
              type="checkbox"
              checked={isEnabled}
              onChange={(e) => handleFieldToggle(field, e.target.checked)}
              className="h-4 w-4 rounded border-[#ebebeb] text-[#171717] focus:ring-[#171717]"
            />
            <span>Include in resume</span>
          </label>
        </div>

        {isEnabled && (
          <div className="space-y-2 pt-1">
            {skills.map((skill, index) => (
              <div key={`${field}-${index}`} className="flex items-center gap-2">
                <input
                  ref={(el) => {
                    if (inputRefs.current[field]) {
                      inputRefs.current[field][index] = el
                    }
                  }}
                  type="text"
                  defaultValue={skill}
                  onChange={(e) => updateSkill(field, index, e.target.value)}
                  className="flex-1 rounded-[6px] border border-[#ebebeb] bg-white px-3.5 py-2 text-sm text-[#171717] placeholder:text-[#999999] focus:border-[#171717] focus:outline-none focus:ring-1 focus:ring-[#171717]"
                  placeholder={placeholder}
                />

                <div className="flex flex-shrink-0 items-center gap-1.5">
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
                      className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#ebebeb] bg-white text-[#666666] transition-colors hover:border-[#171717] hover:text-[#171717]"
                      title="Add item"
                    >
                      <svg
                        className="h-4 w-4"
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
                      className="flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#ebebeb] bg-white text-[#999999] transition-colors hover:border-red-500 hover:text-red-500"
                      title="Remove item"
                    >
                      <svg
                        className="h-4 w-4"
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
    <div className="space-y-6">
      <div className="flex flex-col gap-6 xl:flex-row xl:gap-8">
        {/* Main Content - Left Side */}
        <div className="flex-1 space-y-4">
          <SkillInput
            field="technical"
            title="Technical Skills"
            placeholder="e.g., TypeScript, Next.js, Node.js, PostgreSQL, Docker"
          />

          <SkillInput
            field="languages"
            title="Languages"
            placeholder="e.g., English (Native), Spanish (Fluent), German (Basic)"
          />

          <SkillInput
            field="interests"
            title="Interests & Activities"
            placeholder="e.g., Open Source, System Architecture, Competitive Chess"
          />
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
                <h4 className="mb-1.5 font-semibold text-[#171717]">Skills Tips</h4>
                <ul className="space-y-1.5 leading-relaxed text-[#666666]">
                  <li>• Group related technical tools logically</li>
                  <li>• Only list skills you can comfortably defend in interviews</li>
                  <li>• Add languages with realistic fluency indicators</li>
                  <li>• Keep interests authentic and concise</li>
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
