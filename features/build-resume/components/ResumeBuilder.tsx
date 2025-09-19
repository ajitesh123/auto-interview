'use client'

import { useState, useEffect } from 'react'
import ResumeBuilderLayout from './ResumeBuilderLayout'
import ContactSection from './ContactSection'
import EducationSection from './EducationSection'
import ExperienceSection from './ExperienceSection'
import LeadershipActivitiesSection from './LeadershipActivitiesSection'
import ProjectsSection from './ProjectsSection'
import CustomSection from './CustomSection'
import TemplateSelectionPage from './TemplateSelectionPage'
import { resumeApi } from '../../../lib/resumeApi'

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

const ResumeBuilder = () => {
  const [currentSection, setCurrentSection] = useState(0)
  const [resumeData, setResumeData] = useState<ResumeData>({
    contact: {
      name: '',
      email: '',
      phone: '',
      linkedin: '',
      portfolio: '',
      location: '',
    },
    education: [],
    experience: [],
    leadership: [],
    projects: [],
    other1: { sectionTitle: 'Other (1)', entries: [] },
    other2: { sectionTitle: 'Other (2)', entries: [] },
  })
  const [savedResumeId, setSavedResumeId] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [showTemplateSelection, setShowTemplateSelection] = useState(false)

  // Save resume data to API
  const saveResume = async () => {
    setIsSaving(true)
    setSaveMessage(null)

    try {
      let result
      if (savedResumeId) {
        // Update existing resume
        result = await resumeApi.updateResume(savedResumeId, resumeData)
      } else {
        // Save new resume
        result = await resumeApi.saveResume(resumeData)
        if (result.success && result.data) {
          setSavedResumeId(result.data.id)
        }
      }

      if (result.success) {
        setSaveMessage('Resume saved successfully!')
        setTimeout(() => setSaveMessage(null), 3000)
      } else {
        setSaveMessage(`Error: ${result.message}`)
        setTimeout(() => setSaveMessage(null), 5000)
      }
    } catch (error) {
      setSaveMessage('Error saving resume. Please try again.')
      setTimeout(() => setSaveMessage(null), 5000)
    } finally {
      setIsSaving(false)
    }
  }

  const handleNext = async () => {
    if (currentSection < 6) {
      setCurrentSection(currentSection + 1)
    } else {
      // Handle completion - save and navigate to template selection
      await saveResume()
      if (savedResumeId) {
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
          <CustomSection
            sectionTitle="Other (2)"
            sectionNumber={2}
            data={resumeData.other2}
            onChange={(data) => setResumeData({ ...resumeData, other2: data })}
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
    >
      {renderCurrentSection()}
    </ResumeBuilderLayout>
  )
}

export default ResumeBuilder
