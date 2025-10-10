import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { CoverLetterPage } from '@/features/cover-letter'
import AppLayout from '@/components/AppLayout'

export const metadata: Metadata = genPageMetadata({
  title: 'Cover Letter Generator - Auto Interview AI',
  description: 'Create personalized cover letters',
  keywords: 'cover letter generator, AI cover letter, personalized cover letter',
})

export default function CoverLetter() {
  return (
    <AppLayout>
      <CoverLetterPage />
    </AppLayout>
  )
}
