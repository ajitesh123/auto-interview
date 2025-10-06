'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import ResumeBuilderLayout from './ResumeBuilderLayout'
import ContactSection from './ContactSection'
import EducationSection from './EducationSection'
import ExperienceSection from './ExperienceSection'
import LeadershipActivitiesSection from './LeadershipActivitiesSection'
import ProjectsSection from './ProjectsSection'
import CertificationsSection from './CertificationsSection'
import SkillsSection from './SkillsSection'
import TemplateSelectionPage from './TemplateSelectionPage'
import { resumeApi } from '../../../lib/resumeApi'
import { ResumeData as ResumeDataType, SkillsData } from '../../../lib/resumeStore'

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
  bullets: string[]
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
  bullets: string[]
}

interface ProjectEntry {
  id: string
  projectName: string
  bullets: string[]
  link: string
}

interface CertificationEntry {
  bullets: string[]
}

interface ResumeData {
  contact: ContactData
  education: EducationEntry[]
  experience: ExperienceEntry[]
  leadership: LeadershipEntry[]
  projects: ProjectEntry[]
  certifications: CertificationEntry
  skills: { technical: string[]; languages: string[]; interests: string[] }
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
    certifications: initialData?.certifications || { bullets: [] },
    skills: initialData?.skills || { technical: [], languages: [], interests: [] },
  })
  const [savedResumeId, setSavedResumeId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [showTemplateSelection, setShowTemplateSelection] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [isResumeSaved, setIsResumeSaved] = useState(false)

  // Note: SkillsSection now handles its own state management

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
      // Save data from all sections that have unsaved changes
      // Note: SkillsSection now saves data automatically on change

      let result
      if (savedResumeId) {
        // Update existing resume
        result = await resumeApi.updateResume(savedResumeId, resumeData)
        if (result.success) {
          setSaveMessage('Resume saved successfully!')
          setTimeout(() => setSaveMessage(null), 3000)
          setIsResumeSaved(true)
          setHasUnsavedChanges(false)
          return savedResumeId
        }
      } else {
        // Save new resume
        result = await resumeApi.saveResume(resumeData)
        if (result.success && result.data) {
          setSavedResumeId(result.data.id)
          setSaveMessage('Resume saved successfully!')
          setTimeout(() => setSaveMessage(null), 3000)
          setIsResumeSaved(true)
          setHasUnsavedChanges(false)
          return result.data.id
        }
      }

      if (!result.success) {
        setSaveMessage(`Error: ${result.message}`)
        setTimeout(() => setSaveMessage(null), 5000)
        console.error('Save resume failed:', result.message)
      }
      return null
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setSaveMessage(`Error saving resume: ${errorMessage}`)
      setTimeout(() => setSaveMessage(null), 5000)
      console.error('Save resume error:', error)
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
      // Handle completion - automatically save and navigate to template selection
      const resumeId = await saveResume()
      if (resumeId) {
        setShowTemplateSelection(true)
      } else {
        // If save failed, show error message and don't proceed to template selection
        setSaveMessage('Failed to save resume. Please try again.')
        setTimeout(() => setSaveMessage(null), 5000)
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

  // Memoized onChange handlers to prevent unnecessary re-renders
  const handleContactChange = useCallback((data: ContactData) => {
    setResumeData((prev) => ({ ...prev, contact: data }))
  }, [])

  const handleEducationChange = useCallback((data: EducationEntry[]) => {
    setResumeData((prev) => ({ ...prev, education: data }))
  }, [])

  const handleExperienceChange = useCallback((data: ExperienceEntry[]) => {
    setResumeData((prev) => ({ ...prev, experience: data }))
  }, [])

  const handleLeadershipChange = useCallback((data: LeadershipEntry[]) => {
    setResumeData((prev) => ({ ...prev, leadership: data }))
  }, [])

  const handleProjectsChange = useCallback((data: ProjectEntry[]) => {
    setResumeData((prev) => ({ ...prev, projects: data }))
  }, [])

  const handleCertificationsChange = useCallback((data: CertificationEntry) => {
    setResumeData((prev) => ({ ...prev, certifications: data }))
  }, [])

  const handleSkillsChange = useCallback((data: SkillsData) => {
    setResumeData((prev) => ({ ...prev, skills: data }))
  }, [])

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return <ContactSection data={resumeData.contact} onChange={handleContactChange} />
      case 1:
        return <EducationSection data={resumeData.education} onChange={handleEducationChange} />
      case 2:
        return <ExperienceSection data={resumeData.experience} onChange={handleExperienceChange} />
      case 3:
        return (
          <LeadershipActivitiesSection
            data={resumeData.leadership}
            onChange={handleLeadershipChange}
          />
        )
      case 4:
        return <ProjectsSection data={resumeData.projects} onChange={handleProjectsChange} />
      case 5:
        return (
          <CertificationsSection
            data={resumeData.certifications}
            onChange={handleCertificationsChange}
          />
        )
      case 6:
        return <SkillsSection data={resumeData.skills} onChange={handleSkillsChange} />
      default:
        return null
    }
  }

  // Show template selection if completed and we have a valid resume ID
  if (showTemplateSelection && savedResumeId) {
    console.log('Showing template selection page with resume ID:', savedResumeId)
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
      isResumeSaved={isResumeSaved}
    >
      {renderCurrentSection()}
    </ResumeBuilderLayout>
  )
}

export default ResumeBuilder
