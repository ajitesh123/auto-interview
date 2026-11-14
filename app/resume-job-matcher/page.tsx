import { Metadata } from 'next'
import { genPageMetadata } from '../seo'
import ResumeJobMatcherPage from '@/features/resume-job-matcher/ResumeJobMatcherPage'
import AppLayout from '@/components/AppLayout'
import Link from 'next/link'

export const metadata: Metadata = genPageMetadata({
  title: 'Free Resume Job Matcher: Match Resume to JD (2026)',
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
        <div className="mx-auto mt-6 w-full max-w-[1200px] px-5 md:px-8">
          <p className="rounded-xl bg-signal-tint p-4 text-small text-fg ring-1 ring-inset ring-signal/15">
            Want an instant check with nothing uploaded? Paste the job post and your resume into the{' '}
            <Link
              href="/resume-keyword-checker"
              className="font-semibold text-signal-strong underline underline-offset-2"
            >
              free resume keyword checker
            </Link>
            : must-have vs missing skills and 8 format checks, all in your browser.
          </p>
        </div>
        <ResumeJobMatcherPage />
      </AppLayout>
    </>
  )
}
