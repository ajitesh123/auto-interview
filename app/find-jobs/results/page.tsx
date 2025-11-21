import { Metadata } from 'next'
import AppLayout from '@/components/AppLayout'
import RelatedTools from '@/components/RelatedTools'
import FindJobsResultsClient from '@/features/find-jobs/FindJobsResultsClient'

export const metadata: Metadata = {
  title: 'Job Search Results | Auto Interview AI',
  description:
    'Review AI-curated LinkedIn job matches on a dedicated results page with its own URL.',
  alternates: {
    canonical: 'https://www.autointerviewai.com/find-jobs/results',
  },
}

export default function FindJobsResultsPage() {
  return (
    <AppLayout>
      <FindJobsResultsClient />
      <RelatedTools currentPage="/find-jobs/results" />
    </AppLayout>
  )
}
