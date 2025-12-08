'use client'

import { useRouter } from 'next/navigation'
import InitialTemplateSelection from '../../../features/build-resume/components/InitialTemplateSelection'
import AppLayout from '../../../components/AppLayout'

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
    <AppLayout>
      <InitialTemplateSelection onSelect={handleTemplateSelected} />
    </AppLayout>
  )
}
