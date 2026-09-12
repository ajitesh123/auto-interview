'use client'

import { useRouter } from 'next/navigation'
import DomainLayout from '@/components/domain/DomainLayout'
import InitialTemplateSelection from '../../../features/build-resume/components/InitialTemplateSelection'

export default function TemplatesPage() {
  const router = useRouter()

  const handleTemplateSelected = (template: 'harvard' | 'lbs' | 'stanford') => {
    // Save template to session storage
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('resumeBuilder:template', template)
    }
    // Navigate to content page
    router.push('/build-resume/content')
  }

  return (
    <DomainLayout currentPath="/build-resume">
      <InitialTemplateSelection onSelect={handleTemplateSelected} />
    </DomainLayout>
  )
}
