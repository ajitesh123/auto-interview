'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import TemplateSelectionPage from './components/TemplateSelectionPage'
import { ResumeData } from '@/lib/resumeStore'

type TemplateOption = 'harvard' | 'lbs' | 'stanford'

const STORAGE_KEYS = {
  data: 'resumeBuilder:lastResumeData',
  id: 'resumeBuilder:lastResumeId',
  template: 'resumeBuilder:lastTemplate',
}

const ResumeDownloadClient = () => {
  const router = useRouter()
  const [resumeData, setResumeData] = useState<ResumeData | null>(null)
  const [resumeId, setResumeId] = useState<string | null>(null)
  const [initialTemplate, setInitialTemplate] = useState<TemplateOption>('harvard')
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const storedData = window.sessionStorage.getItem(STORAGE_KEYS.data)
    const storedId = window.sessionStorage.getItem(STORAGE_KEYS.id)
    const storedTemplate = window.sessionStorage.getItem(
      STORAGE_KEYS.template
    ) as TemplateOption | null

    if (!storedData || !storedId) {
      router.replace('/build-resume')
      return
    }

    try {
      setResumeData(JSON.parse(storedData))
      setResumeId(storedId)
      if (storedTemplate && ['harvard', 'lbs', 'stanford'].includes(storedTemplate)) {
        setInitialTemplate(storedTemplate)
      }
      setIsReady(true)
    } catch (error) {
      console.error('Failed to parse stored resume data', error)
      router.replace('/build-resume')
    }
  }, [router])

  if (!isReady || !resumeData || !resumeId) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-white">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-2 border-accent-500 border-t-transparent"></div>
          <p className="text-gray-300">Preparing your download options...</p>
        </div>
      </div>
    )
  }

  return (
    <TemplateSelectionPage
      resumeData={resumeData}
      resumeId={resumeId}
      onBack={() => router.push('/build-resume')}
      initialTemplate={initialTemplate}
    />
  )
}

export default ResumeDownloadClient
