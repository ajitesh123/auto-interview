'use client'

import { useState, useEffect } from 'react'
import ResumeBuilderLayout from './ResumeBuilderLayout'
import ContactSection from './ContactSection'
import EducationSection from './EducationSection'
import ExperienceSection from './ExperienceSection'
import LeadershipActivitiesSection from './LeadershipActivitiesSection'
import ProjectsSection from './ProjectsSection'
import CustomSection from './CustomSection'
import SkillsSection from './SkillsSection'
import TemplateSelectionPage from './TemplateSelectionPage'
import { resumeApi } from '../../../lib/resumeApi'
import { ResumeData as ResumeDataType } from '../../../lib/resumeStore'

// Define data types for all sections
interface ContactData {
  name: string
  email: string
  phone: string
  linkedin: string
  portfolio: string
  location: string
}

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

interface ExperienceEntry {
  id: string
  jobTitle: string
  company: string
  location: string
  startMonth: string
  startYear: string
  endMonth: string
  endYear: string
  isCurrent: boolean
  responsibilities: string
}

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
  description: string
}

interface ProjectEntry {
  id: string
  projectName: string
  technologies: string
  description: string
  link: string
}

interface CustomEntry {
  id: string
  title: string
  subtitle: string
  startDate: string
  endDate: string
  isCurrent: boolean
  description: string
}

interface ResumeData {
  contact: ContactData
  education: EducationEntry[]
  experience: ExperienceEntry[]
  leadership: LeadershipEntry[]
  projects: ProjectEntry[]
  other1: { sectionTitle: string; entries: CustomEntry[] }
  other2: { sectionTitle: string; entries: CustomEntry[] }
}

interface ResumeBuilderProps {
  initialData?: Partial<ResumeDataType>
}

const ResumeBuilder = ({ initialData }: ResumeBuilderProps) => {
  const [currentSection, setCurrentSection] = useState(0)
  const [resumeData, setResumeData] = useState<ResumeDataType>({
    contact: {
      name: initialData?.contact?.name || '',
      email: initialData?.contact?.email || '',
      phone: initialData?.contact?.phone || '',
      linkedin: initialData?.contact?.linkedin || '',
      portfolio: initialData?.contact?.portfolio || '',
      location: initialData?.contact?.location || '',
    },
    education: initialData?.education || [],
    experience: initialData?.experience || [],
    leadership: initialData?.leadership || [],
    projects: initialData?.projects || [],
    other1: initialData?.other1 || { sectionTitle: 'Other (1)', entries: [] },
    skills: initialData?.skills || { technical: [''], languages: [''], interests: [''] },
  })
  const [savedResumeId, setSavedResumeId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [showTemplateSelection, setShowTemplateSelection] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [skillsSectionSaved, setSkillsSectionSaved] = useState(false)

  // Clear validation errors when user fixes the issues
  useEffect(() => {
    if (validationErrors.length > 0) {
      const errors = validateCurrentSection()
      if (errors.length === 0) {
        setValidationErrors([])
      }
    }
  }, [resumeData, currentSection, validationErrors.length])

  // Validation functions
  const validateContactSection = (): string[] => {
    const errors: string[] = []
    const { name, email, phone, location, linkedin } = resumeData.contact

    if (!name.trim()) errors.push('Full Name is required')
    if (!email.trim()) errors.push('Email Address is required')
    if (!phone.trim()) errors.push('Phone Number is required')
    if (!location.trim()) errors.push('Location is required')
    if (!linkedin.trim()) errors.push('LinkedIn Profile is required')

    return errors
  }

  const validateEducationSection = (): string[] => {
    const errors: string[] = []

    if (resumeData.education.length === 0) {
      errors.push('At least one education entry is required')
      return errors
    }

    resumeData.education.forEach((edu, index) => {
      if (!edu.degree.trim()) errors.push(`Education ${index + 1}: Degree/Program is required`)
      if (!edu.university.trim())
        errors.push(`Education ${index + 1}: University/Institution is required`)
      if (!edu.graduationMonth.trim())
        errors.push(`Education ${index + 1}: Graduation Month is required`)
      if (!edu.graduationYear.trim())
        errors.push(`Education ${index + 1}: Graduation Year is required`)
    })

    return errors
  }

  const validateCurrentSection = (): string[] => {
    switch (currentSection) {
      case 0:
        return validateContactSection()
      case 1:
        return validateEducationSection()
      default:
        return []
    }
  }

  // Save resume data to API
  const saveResume = async (): Promise<string | null> => {
    setIsSaving(true)
    setSaveMessage(null)

    try {
      let result
      if (savedResumeId) {
        // Update existing resume
        result = await resumeApi.updateResume(savedResumeId, resumeData)
        if (result.success) {
          setSaveMessage('Resume saved successfully!')
          setTimeout(() => setSaveMessage(null), 3000)
          // Mark skills section as saved if we're on the skills section (section 6)
          if (currentSection === 6) {
            setSkillsSectionSaved(true)
          }
          return savedResumeId
        }
      } else {
        // Save new resume
        result = await resumeApi.saveResume(resumeData)
        if (result.success && result.data) {
          setSavedResumeId(result.data.id)
          setSaveMessage('Resume saved successfully!')
          setTimeout(() => setSaveMessage(null), 3000)
          // Mark skills section as saved if we're on the skills section (section 6)
          if (currentSection === 6) {
            setSkillsSectionSaved(true)
          }
          return result.data.id
        }
      }

      if (!result.success) {
        setSaveMessage(`Error: ${result.message}`)
        setTimeout(() => setSaveMessage(null), 5000)
      }
      return null
    } catch (error) {
      setSaveMessage('Error saving resume. Please try again.')
      setTimeout(() => setSaveMessage(null), 5000)
      return null
    } finally {
      setIsSaving(false)
    }
  }

  const handleNext = async () => {
    // Validate current section before proceeding
    const errors = validateCurrentSection()

    if (errors.length > 0) {
      setValidationErrors(errors)
      return // Don't proceed if there are validation errors
    }

    // Clear validation errors if validation passes
    setValidationErrors([])

    if (currentSection < 6) {
      setCurrentSection(currentSection + 1)
    } else {
      // Handle completion - check if skills section has been saved
      if (!skillsSectionSaved) {
        setValidationErrors([
          'Please save your progress on the Skills and Interests section before finishing your resume.',
        ])
        return
      }

      // Handle completion - save and navigate to template selection
      const resumeId = await saveResume()
      if (resumeId) {
        setShowTemplateSelection(true)
      }
    }
  }

  const handleBackToBuilder = () => {
    setShowTemplateSelection(false)
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  const handleSectionChange = (section: number) => {
    setCurrentSection(section)
    setValidationErrors([]) // Clear validation errors when changing sections
  }

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <ContactSection
            data={resumeData.contact}
            onChange={(data) => setResumeData({ ...resumeData, contact: data })}
          />
        )
      case 1:
        return (
          <EducationSection
            data={resumeData.education}
            onChange={(data) => setResumeData({ ...resumeData, education: data })}
          />
        )
      case 2:
        return (
          <ExperienceSection
            data={resumeData.experience}
            onChange={(data) => setResumeData({ ...resumeData, experience: data })}
          />
        )
      case 3:
        return (
          <LeadershipActivitiesSection
            data={resumeData.leadership}
            onChange={(data) => setResumeData({ ...resumeData, leadership: data })}
          />
        )
      case 4:
        return (
          <ProjectsSection
            data={resumeData.projects}
            onChange={(data) => setResumeData({ ...resumeData, projects: data })}
          />
        )
      case 5:
        return (
          <CustomSection
            sectionTitle="Other (1)"
            sectionNumber={1}
            data={resumeData.other1}
            onChange={(data) => setResumeData({ ...resumeData, other1: data })}
          />
        )
      case 6:
        return (
          <SkillsSection
            data={resumeData.skills}
            onChange={(data) => setResumeData({ ...resumeData, skills: data })}
          />
        )
      default:
        return null
    }
  }

  // Show template selection if completed
  if (showTemplateSelection && savedResumeId) {
    return (
      <TemplateSelectionPage
        resumeData={resumeData}
        resumeId={savedResumeId}
        onBack={handleBackToBuilder}
      />
    )
  }

  return (
    <ResumeBuilderLayout
      currentSection={currentSection}
      onNext={handleNext}
      onPrevious={handlePrevious}
      onSectionChange={handleSectionChange}
      onSave={saveResume}
      isSaving={isSaving}
      saveMessage={saveMessage}
      validationErrors={validationErrors}
      skillsSectionSaved={skillsSectionSaved}
    >
      {renderCurrentSection()}
    </ResumeBuilderLayout>
  )
}

export default ResumeBuilder
