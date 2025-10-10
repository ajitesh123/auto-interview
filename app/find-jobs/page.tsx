import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { FindJobsPage } from '@/features/find-jobs'
import AppLayout from '@/components/AppLayout'

export const metadata: Metadata = genPageMetadata({
  title: 'Find Jobs - Auto Interview AI',
  description: 'Discover job opportunities tailored to your skills',
  keywords: 'job search, find jobs, job opportunities, career search',
})

export default function FindJobs() {
  return (
    <AppLayout>
      <FindJobsPage />
    </AppLayout>
  )
}
