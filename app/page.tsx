import { Metadata } from 'next'
import { genPageMetadata } from './seo'
import HomePage from '@/components/HomePage'
import SEOFeatures from '@/components/SEOFeatures'

export const metadata: Metadata = genPageMetadata({
  title:
    'Auto Interview AI - Complete Job Preparation Platform | Free Resume Builder, ATS Checker, Job Search',
  description:
    'Complete AI-powered job preparation platform. Build ATS-friendly resumes, check ATS scores, search jobs, generate cover letters, and practice interviews. Everything you need to land your dream job - all free.',
  keywords:
    'Auto Interview AI, Autointerviewai, job preparation, resume builder, ATS checker, job search, cover letter generator, interview practice, career tools, free resume builder, ATS score, job application tools, AI interview practice, automated interview prep, resume optimization, job matching, skill assessment, mock interview',
  openGraph: {
    title: 'Auto Interview AI - Complete Job Preparation Platform | Free AI Tools',
    description:
      'Complete AI-powered job preparation platform. Build resumes, check ATS scores, search jobs, generate cover letters, and practice interviews - all free.',
    type: 'website',
    url: '/',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/twitter-card.png',
        width: 1200,
        height: 630,
        alt: 'Auto Interview AI - Complete Job Preparation Platform',
      },
    ],
  },
  twitter: {
    title: 'Auto Interview AI - Complete Job Preparation Platform | Free AI Tools',
    description:
      'Complete AI-powered job preparation platform. Build resumes, check ATS scores, search jobs, generate cover letters, and practice interviews - all free.',
    images: ['https://www.autointerviewai.com/static/images/twitter-card.png'],
  },
  alternates: {
    canonical: 'https://www.autointerviewai.com',
  },
})

export default function Page() {
  return (
    <>
      <SEOFeatures />
      <HomePage />
    </>
  )
}
