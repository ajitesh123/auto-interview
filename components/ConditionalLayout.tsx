'use client'

import { usePathname } from 'next/navigation'
import AppLayout from './AppLayout'

const ConditionalLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()

  // Routes that should use the app layout (with navigation)
  const appRoutes = [
    '/build-resume',
    '/ats-score',
    '/find-jobs',
    '/cover-letter',
    '/assessments',
    '/resume-job-matcher',
  ]

  // Check if current route should use app layout
  const shouldUseAppLayout = appRoutes.includes(pathname)

  if (shouldUseAppLayout) {
    return <AppLayout>{children}</AppLayout>
  }

  // For other routes (home, blog, etc.), render children directly
  return <>{children}</>
}

export default ConditionalLayout
