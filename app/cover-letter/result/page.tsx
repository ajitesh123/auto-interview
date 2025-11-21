import { Metadata } from 'next'
import AppLayout from '@/components/AppLayout'
import RelatedTools from '@/components/RelatedTools'
import CoverLetterResultClient from '@/features/cover-letter/CoverLetterResultClient'

export const metadata: Metadata = {
  title: 'Cover Letter Result | Auto Interview AI',
  description:
    'Review, copy, and download your AI-generated cover letter from a dedicated completion page with its own URL.',
  alternates: {
    canonical: 'https://www.autointerviewai.com/cover-letter/result',
  },
}

export default function CoverLetterResultPage() {
  return (
    <AppLayout>
      <CoverLetterResultClient />
      <RelatedTools currentPage="/cover-letter/result" />
    </AppLayout>
  )
}
