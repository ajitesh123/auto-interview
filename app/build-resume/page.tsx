import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import { BuildResumePage } from '@/features/build-resume'
import AppLayout from '@/components/AppLayout'

export const metadata: Metadata = genPageMetadata({
  title: 'Build Resume - Auto Interview AI',
  description: 'Build professional resumes with AI-powered templates',
  keywords: 'resume builder, AI resume, professional resume, resume templates',
})

export default function BuildResume() {
  return (
    <AppLayout>
      <BuildResumePage />
    </AppLayout>
  )
}
