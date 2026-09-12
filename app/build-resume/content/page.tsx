'use client'

import { useState, useEffect } from 'react'
import ResumeBuilder from '../../../features/build-resume/components/ResumeBuilder'
import DomainLayout from '@/components/domain/DomainLayout'

export default function ContentPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<'harvard' | 'lbs' | 'stanford'>(
    'harvard'
  )
  const [isLoading, setIsLoading] = useState(true)

  // Load selected template from session storage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTemplate = window.sessionStorage.getItem('resumeBuilder:template')
        if (savedTemplate) {
          setSelectedTemplate(savedTemplate as 'harvard' | 'lbs' | 'stanford')
        }
      } catch (error) {
        console.error('Failed to load template from session storage:', error)
      }
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return null
  }

  return (
    <DomainLayout currentPath="/build-resume">
      <ResumeBuilder initialTemplate={selectedTemplate} />
    </DomainLayout>
  )
}
