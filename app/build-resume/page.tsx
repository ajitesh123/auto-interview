import { Metadata } from 'next'
import DomainLayout from '@/components/domain/DomainLayout'
import { BuildResumePage } from '@/features/build-resume'

export const metadata: Metadata = {
  title: 'Free Resume Builder: One-Column Word Templates | Auto Interview AI',
  description:
    'Free resume (CV) builder: fill in your details step by step in a one-column Harvard, LBS or Stanford style template and download a Word file. No sign-up.',
  keywords:
    'resume builder, cv builder, professional resume, resume templates, ATS resume, free resume builder, resume creator, online resume builder',
  alternates: {
    canonical: 'https://www.autointerviewai.com/build-resume',
  },
  openGraph: {
    title: 'Free Resume Builder — Auto Interview AI',
    description: 'Free resume builder with one-column Word templates.',
    url: 'https://www.autointerviewai.com/build-resume',
    siteName: 'Auto Interview AI',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Free Resume Builder',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Resume Builder — Auto Interview AI',
    description: 'Free resume builder with one-column Word templates.',
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
                name: 'Is the resume builder free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. You fill in your details, pick one of three one-column templates and download a Word (.docx) file, with no sign-up and no payment.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does the builder write my resume with AI?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. You write every line yourself in seven short sections (contact, education, experience, positions of responsibility, projects, certifications, skills). To check a finished resume against a job post, use the free resume keyword checker.',
                },
              },
            ],
          }),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <header className="mb-10 max-w-3xl">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            RESUME BUILDER
          </p>
          <h1 className="mb-3 text-3xl font-normal tracking-tight text-[#171717] sm:text-4xl">
            Free resume (CV) builder.
          </h1>
          <p className="text-sm text-[#4d4d4d]">
            Pick a one-column template, fill in seven short sections and download a Word file. You
            write every line; nothing is generated for you.
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
