import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import { ROLE_INTERVIEW_QUESTIONS, RoleQuestionData } from '@/data/interviewQuestionsData'
import { CV_ROLES } from '@/data/cvRolesData'

interface PageProps {
  params: Promise<{
    role: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(ROLE_INTERVIEW_QUESTIONS).map((role) => ({
    role,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role } = await params
  const roleData = ROLE_INTERVIEW_QUESTIONS[role]

  if (!roleData) {
    return {
      title: 'Interview Questions Not Found',
    }
  }

  return {
    title: roleData.metaTitle,
    description: roleData.metaDescription,
    keywords: [
      `${roleData.roleName} interview questions`,
      `${roleData.roleName} interview answers`,
      `${roleData.roleName} technical interview`,
      'behavioral interview questions',
      'mock interview practice',
      'job interview guide',
    ],
    alternates: {
      canonical: `https://www.autointerviewai.com/interview-questions/${roleData.slug}`,
    },
    openGraph: {
      title: roleData.metaTitle,
      description: roleData.metaDescription,
      url: `https://www.autointerviewai.com/interview-questions/${roleData.slug}`,
      siteName: 'Auto Interview AI',
      images: [
        {
          url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
          width: 1200,
          height: 630,
          alt: `${roleData.roleName} Interview Questions`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: roleData.metaTitle,
      description: roleData.metaDescription,
      images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
      creator: '@ajiteshleo',
    },
  }
}

export default async function RoleInterviewQuestionsPage({ params }: PageProps) {
  const { role } = await params
  const roleData = ROLE_INTERVIEW_QUESTIONS[role]

  if (!roleData) {
    notFound()
  }

  const allRoles = Object.values(ROLE_INTERVIEW_QUESTIONS)
  const otherRoles = allRoles.filter((item) => item.slug !== roleData.slug).slice(0, 4)
  const hasMatchingCv = Boolean(CV_ROLES[roleData.slug])

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: roleData.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.autointerviewai.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Interview Questions',
        item: 'https://www.autointerviewai.com/interview-questions',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${roleData.roleName} Questions`,
        item: `https://www.autointerviewai.com/interview-questions/${roleData.slug}`,
      },
    ],
  }

  return (
    <DomainLayout currentPath="/interview-questions">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="min-h-screen bg-[#fafafa] px-4 pb-32 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-16">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs font-medium text-[#666666]">
            <Link href="/" className="transition-colors hover:text-[#171717]">
              Home
            </Link>
            <span>/</span>
            <Link href="/interview-questions" className="transition-colors hover:text-[#171717]">
              Interview Questions
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#171717]">{roleData.roleName}</span>
          </nav>

          {/* Hero Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
              <span>{roleData.category} Playbook</span>
              <span className="text-[#999999]">•</span>
              <span className="font-semibold text-[#ea580c]">2026 Edition</span>
            </div>
            <h1 className="text-4xl font-normal leading-[1.08] tracking-tight text-[#171717] sm:text-5xl md:text-[52px]">
              {roleData.heroTitle}
            </h1>
            <p className="text-lg font-light leading-relaxed text-[#666666]">
              {roleData.heroDescription}
            </p>
          </div>

          {/* Featured Snippet Direct Answer Box */}
          <div className="rounded-xl border-y border-l-4 border-r border-[#ebebeb] border-l-[#ea580c] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ea580c]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Executive Summary: What Interviewers Evaluate</span>
            </div>
            <p className="mt-3 text-sm font-medium leading-relaxed text-[#171717]">
              Interviews for <strong>{roleData.roleName}</strong> evaluate hands-on problem-solving,
              architectural tradeoffs, and cross-functional communication. Candidates who articulate
              their thought process out loud, ground metrics in business outcomes, and demonstrate
              composure during live exercises score in the 90th percentile.
            </p>
          </div>

          {/* Top Questions & Model Answers */}
          <section className="space-y-8">
            <div className="border-b border-[#ebebeb] pb-4">
              <span className="font-mono text-xs uppercase tracking-wider text-[#ea580c]">
                Proven Answers & Frameworks
              </span>
              <h2 className="text-2xl font-normal tracking-tight text-[#171717] sm:text-3xl">
                Top {roleData.roleName} Questions & Answers
              </h2>
            </div>

            <div className="space-y-8">
              {roleData.topQuestions.map((q, idx) => (
                <div
                  key={q.id}
                  className="space-y-4 rounded-xl border border-[#ebebeb] bg-white p-6 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#f0f0f0] pb-3">
                    <span className="font-mono text-xs font-semibold text-[#ea580c]">
                      Question {idx + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#f5f5f5] px-2 py-0.5 font-mono text-[10px] text-[#666666]">
                        {q.category}
                      </span>
                      <span className="rounded bg-[#fff7ed] px-2 py-0.5 font-mono text-[10px] font-medium text-[#ea580c]">
                        {q.difficulty} Level
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-medium text-[#171717]">{q.question}</h3>

                  {/* Key Takeaway Callout */}
                  <div className="rounded-lg border border-[#ebebeb] bg-[#fafafa] px-4 py-2.5 text-xs text-[#555555]">
                    <span className="font-bold text-[#171717]">Key Takeaway: </span>
                    {q.keyTakeaway}
                  </div>

                  {/* Model Answer Script */}
                  <div className="space-y-2">
                    <div className="font-mono text-[11px] font-semibold uppercase tracking-wider text-[#ea580c]">
                      Model Answer:
                    </div>
                    <div className="rounded-lg border border-[#fed7aa] bg-[#fff7ed] p-4 text-sm leading-relaxed text-[#171717]">
                      {q.modelAnswer}
                    </div>
                  </div>

                  {/* Framework Tip */}
                  <div className="pt-1 text-xs text-[#666666]">
                    <span className="font-mono font-medium text-[#171717]">Framework: </span>
                    {q.frameworkTip}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Cross-Link to ATS Resume Template */}
          {hasMatchingCv && (
            <div className="flex flex-col justify-between gap-6 rounded-2xl border border-[#ebebeb] bg-white p-8 shadow-sm sm:flex-row sm:items-center">
              <div className="max-w-xl space-y-2">
                <span className="inline-block rounded-full bg-[#fff7ed] px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase text-[#ea580c]">
                  ATS Resume Template
                </span>
                <h3 className="text-xl font-medium text-[#171717]">
                  Need an ATS-optimized resume for {roleData.roleName}?
                </h3>
                <p className="text-xs leading-relaxed text-[#666666]">
                  Download our free Harvard single-column Word DOCX template with verified X-Y-Z
                  bullet points and high-frequency keywords tailored specifically for{' '}
                  {roleData.roleName}.
                </p>
              </div>
              <Link
                href={`/cv-templates/${roleData.slug}`}
                className="inline-flex shrink-0 items-center justify-center rounded-lg bg-[#171717] px-5 py-3 text-xs font-semibold text-white transition-opacity hover:opacity-90"
              >
                Download Free {roleData.roleName} CV →
              </Link>
            </div>
          )}

          {/* Interactive Voice Simulator CTA */}
          <div className="relative overflow-hidden rounded-2xl border border-[#171717] bg-[#171717] p-8 text-white sm:p-10">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#fafafa]">
                Free Audio AI Simulator
              </span>
              <h3 className="text-2xl font-normal tracking-tight sm:text-3xl">
                Practice these {roleData.roleName} questions out loud.
              </h3>
              <p className="text-sm font-light leading-relaxed text-[#cccccc]">
                Our sub-400ms voice AI hiring manager drills your technical accuracy, checks your
                response pacing, and flags filler words so you walk into the real interview
                completely confident.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/free-mock-interview"
                  className="rounded-lg bg-white px-5 py-2.5 text-xs font-semibold text-[#171717] transition-opacity hover:opacity-95"
                >
                  Start Free Mock Interview Session →
                </Link>
                <Link
                  href="/interview-questions"
                  className="rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                >
                  View All Interview Questions
                </Link>
              </div>
            </div>
          </div>

          {/* Interview Tips Checklist */}
          <section className="space-y-4 rounded-xl border border-[#ebebeb] bg-white p-6 shadow-sm">
            <h3 className="text-base font-medium text-[#171717]">
              Preparation Checklist for {roleData.roleName} Candidates
            </h3>
            <ul className="space-y-2.5 text-xs leading-relaxed text-[#555555]">
              {roleData.interviewTips.map((tip, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-bold text-[#ea580c]">✓</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Explore Other Career Tracks */}
          <section className="space-y-4">
            <h2 className="text-xl font-normal tracking-tight text-[#171717]">
              Explore Other Role Question Playbooks
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {otherRoles.map((item) => (
                <Link
                  key={item.slug}
                  href={`/interview-questions/${item.slug}`}
                  className="group rounded-xl border border-[#ebebeb] bg-white p-5 shadow-sm transition-all hover:border-[#ea580c]"
                >
                  <div className="font-mono text-[10px] uppercase text-[#ea580c]">
                    {item.category}
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#171717] group-hover:text-[#ea580c]">
                    {item.roleName} Questions & Answers
                  </div>
                  <div className="mt-1 line-clamp-1 text-xs text-[#666666]">
                    {item.topQuestions.length} Model Answers Included
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ Accordion Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-normal tracking-tight text-[#171717]">
              Frequently Asked Questions
            </h2>
            <div className="divide-y divide-[#ebebeb] rounded-xl border border-[#ebebeb] bg-white">
              {roleData.faqs.map((faq, idx) => (
                <div key={idx} className="p-6">
                  <h3 className="text-base font-medium text-[#171717]">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#666666]">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </DomainLayout>
  )
}
