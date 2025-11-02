import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import ResumeJobMatcherPage from '@/features/resume-job-matcher/ResumeJobMatcherPage'
import AppLayout from '@/components/AppLayout'

export const metadata: Metadata = genPageMetadata({
  title: 'Resume Job Matcher | Match Your Resume to Job Description | Auto Interview AI',
  description:
    'Match your resume to any job description with AI-powered keyword analysis. Upload a job description and resume to see how well they align and get optimization suggestions.',
  keywords:
    'resume job match, job description match, resume keyword matching, resume optimization, ATS keyword matching',
  alternates: {
    canonical: 'https://www.autointerviewai.com/resume-job-matcher',
  },
})

export default function ResumeJobMatcher() {
  return (
    <>
      <div className="sr-only" aria-label="Resume Job Matcher Description">
        <h1>Resume Job Matcher - Match Your Resume to Job Descriptions</h1>
        <p>
          Match your resume to any job description with our AI-powered keyword analysis. Upload a
          job description and your resume to see how well they align, identify missing keywords, and
          get specific optimization suggestions.
        </p>
      </div>

      <AppLayout>
        <ResumeJobMatcherPage />
      </AppLayout>
    </>
  )
}
