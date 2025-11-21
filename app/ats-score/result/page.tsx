import { Metadata } from 'next'
import AppLayout from '@/components/AppLayout'
import RelatedTools from '@/components/RelatedTools'
import TLDRSummary from '@/components/TLDRSummary'
import ATSScoreResultClient from '@/features/ats-score/ATSScoreResultClient'

export const metadata: Metadata = {
  title: 'ATS Score Results | Auto Interview AI',
  description:
    'View your detailed ATS resume analysis results, parse coverage, strengths, and improvement suggestions. Track completion of ATS checks with a dedicated results page.',
  alternates: {
    canonical: 'https://www.autointerviewai.com/ats-score/result',
  },
}

export default function ATSScoreResultPage() {
  return (
    <AppLayout>
      <TLDRSummary
        title="ATS Score Results"
        summary="Review your ATS compatibility report, improvement suggestions, and scoring breakdown on a dedicated results page."
        keyPoints={[
          'Instant view of your ATS parse coverage and score breakdown',
          'Highlights quick wins to boost your score before you apply',
          'Track ATS checks with a dedicated results URL for analytics',
        ]}
      />
      <ATSScoreResultClient />
      <RelatedTools currentPage="/ats-score/result" />
    </AppLayout>
  )
}
