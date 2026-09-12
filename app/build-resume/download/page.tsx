import { Metadata } from 'next'
import DomainLayout from '@/components/domain/DomainLayout'
import RelatedTools from '@/components/RelatedTools'
import ResumeDownloadClient from '@/features/build-resume/ResumeDownloadClient'

export const metadata: Metadata = {
  title: 'Download Your Resume | Auto Interview AI',
  description:
    'Access your completed resume, preview templates, and download ATS-friendly DOCX files from a dedicated completion page.',
  alternates: {
    canonical: 'https://www.autointerviewai.com/build-resume/download',
  },
}

export default function BuildResumeDownloadPage() {
  return (
    <DomainLayout currentPath="/build-resume">
      <ResumeDownloadClient />
      <RelatedTools currentPage="/build-resume/download" />
    </DomainLayout>
  )
}
