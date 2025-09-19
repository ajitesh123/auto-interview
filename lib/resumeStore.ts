// Shared in-memory store for resume data
// In a real application, this would be replaced with a database connection

export interface ContactData {
  name: string
  email: string
  phone: string
  linkedin: string
  portfolio: string
  location: string
}

export interface EducationEntry {
  id: string
  degree: string
  major: string
  university: string
  location: string
  graduationMonth: string
  graduationYear: string
  gpa: string
}

export interface ExperienceEntry {
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

export interface LeadershipEntry {
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

export interface ProjectEntry {
  id: string
  projectName: string
  technologies: string
  description: string
  link: string
}

export interface CustomEntry {
  id: string
  title: string
  subtitle: string
  startDate: string
  endDate: string
  isCurrent: boolean
  description: string
}

export interface ResumeData {
  contact: ContactData
  education: EducationEntry[]
  experience: ExperienceEntry[]
  leadership: LeadershipEntry[]
  projects: ProjectEntry[]
  other1: { sectionTitle: string; entries: CustomEntry[] }
  other2: { sectionTitle: string; entries: CustomEntry[] }
}

export interface StoredResumeData extends ResumeData {
  id: string
  createdAt: string
  updatedAt: string
}

// In-memory store
const resumeStore = new Map<string, StoredResumeData>()

// Store operations
export const resumeStoreOperations = {
  // Save a new resume
  save: (data: ResumeData): { id: string; createdAt: string } => {
    const resumeId = `resume_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()

    const storedData: StoredResumeData = {
      ...data,
      id: resumeId,
      createdAt: now,
      updatedAt: now,
    }

    resumeStore.set(resumeId, storedData)
    return { id: resumeId, createdAt: now }
  },

  // Get a resume by ID
  get: (id: string): StoredResumeData | undefined => {
    return resumeStore.get(id)
  },

  // Get all resumes
  getAll: (): StoredResumeData[] => {
    return Array.from(resumeStore.values())
  },

  // Update an existing resume
  update: (id: string, data: Partial<ResumeData>): boolean => {
    const existing = resumeStore.get(id)
    if (!existing) return false

    const updatedData: StoredResumeData = {
      ...existing,
      ...data,
      id, // Keep original ID
      createdAt: existing.createdAt, // Keep original creation date
      updatedAt: new Date().toISOString(),
    }

    resumeStore.set(id, updatedData)
    return true
  },

  // Delete a resume
  delete: (id: string): boolean => {
    return resumeStore.delete(id)
  },

  // Get resume count
  count: (): number => {
    return resumeStore.size
  },
}

// Validation function
export function validateResumeData(data: unknown): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  // Check if data exists
  if (!data) {
    errors.push('Resume data is required')
    return { isValid: false, errors }
  }

  // Type guard to check if data has the expected structure
  if (typeof data !== 'object' || data === null) {
    errors.push('Resume data must be an object')
    return { isValid: false, errors }
  }

  const resumeData = data as Record<string, unknown>

  // Validate contact data structure
  if (!resumeData.contact || typeof resumeData.contact !== 'object') {
    errors.push('Contact data is required')
  } else {
    const contact = resumeData.contact as Record<string, unknown>
    if (typeof contact.name !== 'string') errors.push('Contact name must be a string')
    if (typeof contact.email !== 'string') errors.push('Contact email must be a string')
    if (contact.phone && typeof contact.phone !== 'string')
      errors.push('Contact phone must be a string')
    if (contact.linkedin && typeof contact.linkedin !== 'string')
      errors.push('Contact LinkedIn must be a string')
    if (contact.portfolio && typeof contact.portfolio !== 'string')
      errors.push('Contact portfolio must be a string')
    if (contact.location && typeof contact.location !== 'string')
      errors.push('Contact location must be a string')
  }

  // Validate arrays exist
  if (!Array.isArray(resumeData.education)) errors.push('Education must be an array')
  if (!Array.isArray(resumeData.experience)) errors.push('Experience must be an array')
  if (!Array.isArray(resumeData.leadership)) errors.push('Leadership must be an array')
  if (!Array.isArray(resumeData.projects)) errors.push('Projects must be an array')

  // Validate other sections
  if (!resumeData.other1 || typeof resumeData.other1 !== 'object') {
    errors.push('Other1 section is required')
  } else {
    const other1 = resumeData.other1 as Record<string, unknown>
    if (typeof other1.sectionTitle !== 'string') errors.push('Other1 sectionTitle must be a string')
    if (!Array.isArray(other1.entries)) errors.push('Other1 entries must be an array')
  }

  if (!resumeData.other2 || typeof resumeData.other2 !== 'object') {
    errors.push('Other2 section is required')
  } else {
    const other2 = resumeData.other2 as Record<string, unknown>
    if (typeof other2.sectionTitle !== 'string') errors.push('Other2 sectionTitle must be a string')
    if (!Array.isArray(other2.entries)) errors.push('Other2 entries must be an array')
  }

  return { isValid: errors.length === 0, errors }
}
