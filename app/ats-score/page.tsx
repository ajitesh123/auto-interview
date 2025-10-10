import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { ATSScorePage } from '@/features/ats-score'
import AppLayout from '@/components/AppLayout'

export const metadata: Metadata = genPageMetadata({
  title: 'ATS Score Checker - Auto Interview AI',
  description: 'Optimize your resume for Applicant Tracking Systems',
  keywords: 'ATS score, resume optimization, ATS checker, applicant tracking system',
})

export default function ATSScore() {
  return (
    <AppLayout>
      <ATSScorePage />
    </AppLayout>
  )
}
