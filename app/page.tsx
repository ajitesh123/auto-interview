import { Metadata } from 'next'
import { genPageMetadata } from './seo'
import HomePage from '@/components/HomePage'
import SEOFeatures from '@/components/SEOFeatures'
import AppLayout from '@/components/AppLayout'

export const metadata: Metadata = genPageMetadata({
  title: 'Auto Interview AI: Free Job Prep & Resume Builder',
  description:
    'Auto Interview AI: Free AI-powered job prep platform. Build ATS-friendly resumes, check scores, search jobs, and practice interviews to land your dream job.',
  keywords:
    'Auto Interview AI, Autointerviewai, job preparation, resume builder, ATS checker, job search, cover letter generator, interview practice, career tools, free resume builder, ATS score, job application tools, AI interview practice, automated interview prep, resume optimization, job matching, skill assessment, mock interview',
  openGraph: {
    title: 'Auto Interview AI - Complete Job Preparation Platform | AI-Powered Career Tools',
    description:
      'Complete AI-powered job preparation platform. Build resumes, check ATS scores, search jobs, generate cover letters, and practice interviews - all free.',
    type: 'website',
    url: '/',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Auto Interview AI - Complete Job Preparation Platform',
      },
    ],
  },
  twitter: {
    title: 'Auto Interview AI - Complete Job Preparation Platform | AI-Powered Career Tools',
    description:
      'Complete AI-powered job preparation platform. Build resumes, check ATS scores, search jobs, generate cover letters, and practice interviews - all free.',
    images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
  },
  alternates: {
    canonical: 'https://www.autointerviewai.com',
  },
})

export default function Page() {
  return (
    <>
      <SEOFeatures />
      <AppLayout>
        <HomePage />
      </AppLayout>
      <a href="https://navs.site" title="AI Sites | 2026" className="hidden" aria-hidden="true">AI Nav Site</a>
    </>
  )
}
