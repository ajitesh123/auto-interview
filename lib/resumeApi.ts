// API client for resume operations
import { ResumeData } from './resumeStore'

export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data?: T
  errors?: string[]
}

export interface SaveResumeResponse {
  id: string
  createdAt: string
}

export interface ResumeListItem {
  id: string
  contact: {
    name: string
    email: string
  }
  createdAt: string
  updatedAt: string
}

export interface GetAllResumesResponse {
  resumes: ResumeListItem[]
  total: number
}

class ResumeApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = '/api/resume'
  }

  // Save a new resume
  async saveResume(resumeData: ResumeData): Promise<ApiResponse<SaveResumeResponse>> {
    try {
      const response = await fetch(`${this.baseUrl}/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to save resume')
      }

      return result
    } catch (error) {
      console.error('Error saving resume:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  // Get a specific resume by ID
  async getResume(
    id: string
  ): Promise<ApiResponse<ResumeData & { id: string; createdAt: string; updatedAt: string }>> {
    try {
      const response = await fetch(`${this.baseUrl}/get?id=${encodeURIComponent(id)}`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to get resume')
      }

      return result
    } catch (error) {
      console.error('Error getting resume:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  // Get all resumes
  async getAllResumes(): Promise<ApiResponse<GetAllResumesResponse>> {
    try {
      const response = await fetch(`${this.baseUrl}/get`)
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to get resumes')
      }

      return result
    } catch (error) {
      console.error('Error getting resumes:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  // Update an existing resume
  async updateResume(
    id: string,
    resumeData: Partial<ResumeData>
  ): Promise<ApiResponse<{ id: string; updatedAt: string }>> {
    try {
      const response = await fetch(`${this.baseUrl}/get?id=${encodeURIComponent(id)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(resumeData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to update resume')
      }

      return result
    } catch (error) {
      console.error('Error updating resume:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  // Delete a resume
  async deleteResume(id: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/get?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to delete resume')
      }

      return result
    } catch (error) {
      console.error('Error deleting resume:', error)
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }
}

// Export a singleton instance
export const resumeApi = new ResumeApiClient()

// Export the class for testing or custom instances
export default ResumeApiClient
