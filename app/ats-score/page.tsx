import { Metadata } from 'next'
import DomainLayout from '@/components/domain/DomainLayout'
import { ATSScorePage } from '@/features/ats-score'
import TLDRSummary from '@/components/TLDRSummary'

export const metadata: Metadata = {
  title: 'Free ATS Resume Score Checker — Test ATS Compatibility | Auto Interview AI',
  description:
    'Free ATS resume score checker. Analyze your resume for Applicant Tracking System compatibility. Get instant scoring, keyword optimization, and improvement suggestions.',
  keywords:
    'ATS score, resume optimization, ATS checker, applicant tracking system, ATS resume scanner, resume ATS test, ATS compatibility',
  alternates: {
    canonical: 'https://www.autointerviewai.com/ats-score',
  },
  openGraph: {
    title: 'Free ATS Resume Score Checker — Auto Interview AI',
    description: 'Analyze your resume for Applicant Tracking System compatibility with AI.',
    url: 'https://www.autointerviewai.com/ats-score',
    siteName: 'Auto Interview AI',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Free ATS Resume Score Checker',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free ATS Resume Score Checker — Auto Interview AI',
    description: 'Analyze your resume for Applicant Tracking System compatibility with AI.',
    images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
    creator: '@ajiteshleo',
  },
}

export default function ATSScore() {
  return (
    <DomainLayout currentPath="/ats-score">
      {/* FAQ Schema for AI Search Engines (ChatGPT, Claude, Perplexity) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'What is a good ATS score for a resume?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'A good ATS score is 75 or higher out of 100. Scores of 80+ indicate excellent ATS compatibility and significantly increase your chances of passing automated screening. Scores below 60 suggest your resume needs optimization before applying to jobs that use Applicant Tracking Systems.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is the ATS checker really free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, our ATS resume score checker is completely free with no limitations, trial periods, or hidden costs. You can check as many resumes as you want, receive detailed scoring across multiple categories, and get improvement suggestions without signing up or providing payment information.',
                },
              },
            ],
          }),
        }}
      />

      <TLDRSummary
        title="Free ATS Resume Score Checker"
        summary="Check your resume's ATS compatibility instantly with our free AI-powered score checker. Get detailed scoring, keyword analysis, and improvement suggestions in seconds."
        keyPoints={[
          '99.7% of Fortune 500 companies use ATS software - is your resume ready?',
          'Score of 75+ recommended, 80+ excellent - check yours for free now',
          'Only 25% of resumes pass ATS screening - improve your odds by 300%',
          'Instant analysis of formatting, keywords, structure, and compatibility',
          'Upload PDF or DOCX - get detailed report with specific improvements',
          'Completely free, unlimited checks - no signup or registration required',
        ]}
      />

      <div className="mx-auto max-w-5xl px-6 py-20">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            ATS OPTIMIZATION
          </p>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-[#171717] sm:text-5xl md:text-6xl">
            ATS resume checker.
          </h1>
          <p className="text-lg leading-relaxed text-[#4d4d4d]">
            Evaluate your resume against recruiter algorithms. Get granular scores on keyword
            matching, formatting integrity, and actionable improvements.
          </p>
        </header>

        <div
          className="rounded-[6px] bg-white p-6 sm:p-8"
          style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
        >
          <ATSScorePage />
        </div>
      </div>
    </DomainLayout>
  )
}
