import { Metadata } from 'next'
import DomainLayout from '@/components/domain/DomainLayout'
import { BuildResumePage } from '@/features/build-resume'
import TLDRSummary from '@/components/TLDRSummary'

export const metadata: Metadata = {
  title: 'Free AI Resume Builder — ATS-Optimized Templates | Auto Interview AI',
  description:
    'Free AI-powered resume builder with ATS-friendly templates. Build professional resumes or upload existing documents. Download in PDF or DOCX format. No signup required.',
  keywords:
    'resume builder, AI resume, professional resume, resume templates, ATS resume, free resume builder, resume creator, online resume builder',
  alternates: {
    canonical: 'https://www.autointerviewai.com/build-resume',
  },
  openGraph: {
    title: 'Free AI Resume Builder — Auto Interview AI',
    description: 'Free AI-powered resume builder with ATS-friendly templates.',
    url: 'https://www.autointerviewai.com/build-resume',
    siteName: 'Auto Interview AI',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Free AI Resume Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Resume Builder — Auto Interview AI',
    description: 'Free AI-powered resume builder with ATS-friendly templates.',
    images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
    creator: '@ajiteshleo',
  },
}

export default function BuildResume() {
  return (
    <DomainLayout currentPath="/build-resume">
      {/* FAQ Schema for AI Search Engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'Is the AI resume builder really free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, Auto Interview AI resume builder is 100% free with no hidden costs, premium tiers, or limitations. All features including AI-powered content suggestions, ATS-friendly templates, and downloads in PDF or DOCX format are completely free with no signup required.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long does it take to build a resume with AI?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Most users complete their professional resume in 10-15 minutes using our AI-powered builder. If you upload an existing resume, the process is even faster as our AI analyzes and improves your content automatically.',
                },
              },
            ],
          }),
        }}
      />

      <TLDRSummary
        title="Free AI Resume Builder"
        summary="Build professional, ATS-optimized resumes in 10-15 minutes with our free AI-powered resume builder. 100% free, no signup required, download in PDF or DOCX instantly."
        keyPoints={[
          '75% of resumes rejected by ATS - our templates ensure yours passes',
          '100% free forever - no hidden costs, premium tiers, or limitations',
          'AI-powered suggestions improve your content and optimize keywords',
          'ATS-friendly templates (Harvard, Modern, Professional) proven to work',
          'Upload existing resume or start from scratch with guided process',
          'Download in PDF or DOCX format - no signup or registration needed',
        ]}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <header className="mb-10 max-w-3xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            RESUME BUILDER
          </p>
          <h1 className="mb-3 text-3xl font-normal tracking-tight text-[#171717] sm:text-4xl">
            AI-powered resume builder.
          </h1>
          <p className="text-sm text-[#4d4d4d]">
            Choose a proven template, fill in your experience with AI suggestions, and export an
            ATS-compliant resume.
          </p>
        </header>

        <div
          className="rounded-[6px] bg-white p-4 sm:p-6"
          style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
        >
          <BuildResumePage />
        </div>
      </div>
    </DomainLayout>
  )
}
