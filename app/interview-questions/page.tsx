import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import { BEHAVIORAL_QUESTIONS, ROLE_INTERVIEW_QUESTIONS } from '@/data/interviewQuestionsData'

export const metadata: Metadata = {
  title: 'Top Interview Questions & Model Answers (2026 Guide)',
  description:
    'Comprehensive library of top behavioral and technical interview questions with word-for-word STAR sample answers, psychology breakdowns, and 1-click voice simulator practice.',
  keywords: [
    'interview questions and answers',
    'behavioral interview questions',
    'STAR method interview answers',
    'tell me about yourself example answer',
    'what is your greatest weakness answer',
    'software engineer interview questions',
    'product manager interview questions',
    'sales sdr interview questions',
    'hr interview questions for freshers',
    'mock interview practice',
  ],
  alternates: {
    canonical: 'https://www.autointerviewai.com/interview-questions',
  },
  openGraph: {
    title: 'Top Interview Questions & Model Answers (2026 Guide)',
    description:
      'Curated behavioral scripts and role-specific interview playbooks with word-for-word sample answers and voice simulation practice.',
    url: 'https://www.autointerviewai.com/interview-questions',
    siteName: 'Auto Interview AI',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Top Interview Questions and Answers Guide',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Top Interview Questions & Model Answers (2026 Guide)',
    description:
      'Curated behavioral scripts and role-specific interview playbooks with word-for-word sample answers and voice simulation practice.',
    images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
    creator: '@ajiteshleo',
  },
}

export default function InterviewQuestionsHubPage() {
  const behavioralList = Object.values(BEHAVIORAL_QUESTIONS)
  const roleList = Object.values(ROLE_INTERVIEW_QUESTIONS)

  const hubFaqs = [
    {
      q: 'What is the STAR method and how should I use it?',
      a: 'The STAR method stands for Situation, Task, Action, and Result. It is the gold standard framework for answering behavioral interview questions. Allocate roughly 15% of your time to Situation and Task, 65% to your specific Actions, and 20% to measurable, quantified Results.',
    },
    {
      q: 'How long should an interview answer ideally be?',
      a: 'For behavioral and introductory questions ("Tell me about yourself"), the ideal duration is 75 to 90 seconds (approx. 180 to 220 words). Technical explanations can extend to 2 to 3 minutes when detailing architectural tradeoffs.',
    },
    {
      q: 'Can I practice answering these questions with real-time AI feedback?',
      a: 'Yes. Auto Interview AI offers a free real-time voice simulator where an AI hiring manager asks questions, listens to your speech, detects filler words, and delivers an instant performance scorecard.',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hubFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Top Job Interview Questions & Answer Guides',
    description:
      'Master the most frequent behavioral and technical interview questions asked by top tech and enterprise employers.',
    url: 'https://www.autointerviewai.com/interview-questions',
    numberOfItems: behavioralList.length + roleList.length,
    itemListElement: [
      ...behavioralList.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.questionText,
        url: `https://www.autointerviewai.com/interview-questions/behavioral/${item.slug}`,
      })),
      ...roleList.map((item, idx) => ({
        '@type': 'ListItem',
        position: behavioralList.length + idx + 1,
        name: `${item.roleName} Interview Questions`,
        url: `https://www.autointerviewai.com/interview-questions/${item.slug}`,
      })),
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />

      <div className="min-h-screen bg-[#fafafa] px-4 pb-32 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-20">
          {/* Breadcrumb Navigation */}
          <nav className="flex items-center space-x-2 text-xs font-medium text-[#666666]">
            <Link href="/" className="transition-colors hover:text-[#171717]">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#171717]">Interview Questions</span>
          </nav>

          {/* Hero Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
              <span>2026 Interview Intelligence Library</span>
              <span className="text-[#999999]">•</span>
              <span className="font-semibold text-[#ea580c]">100% Free & Ungated</span>
            </div>
            <h1 className="text-4xl font-normal leading-[1.08] tracking-tight text-[#171717] sm:text-5xl md:text-[54px]">
              Top Interview Questions & <br className="hidden sm:block" />
              Model Answer Scripts
            </h1>
            <p className="max-w-3xl text-lg font-light leading-relaxed text-[#666666]">
              Master the exact questions asked in 95% of job interviews. Every guide includes the
              interviewer’s psychological intent, word-for-word STAR answer scripts, critical
              mistakes to avoid, and 1-click voice mock simulation practice.
            </p>

            {/* Quick Filter CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#behavioral"
                className="inline-flex items-center rounded-lg bg-[#171717] px-4 py-2 text-xs font-medium text-white transition-opacity hover:opacity-90"
              >
                The Big 10 Behavioral Questions ↓
              </a>
              <a
                href="#roles"
                className="inline-flex items-center rounded-lg border border-[#ebebeb] bg-white px-4 py-2 text-xs font-medium text-[#171717] transition-colors hover:bg-[#f5f5f5]"
              >
                Role-Specific Playbooks ↓
              </a>
              <Link
                href="/free-mock-interview"
                className="inline-flex items-center rounded-lg border border-[#fed7aa] bg-[#fff7ed] px-4 py-2 text-xs font-semibold text-[#ea580c] transition-colors hover:bg-[#ffedd5]"
              >
                Practice in Live Voice Simulator →
              </Link>
            </div>
          </div>

          {/* SECTION 1: The Big 10 Behavioral Questions */}
          <section id="behavioral" className="scroll-mt-24 space-y-8">
            <div className="flex flex-col justify-between gap-2 border-b border-[#ebebeb] pb-4 sm:flex-row sm:items-end">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#ea580c]">
                  High-Impact Behavioral Screening
                </span>
                <h2 className="text-2xl font-normal tracking-tight text-[#171717] sm:text-3xl">
                  The Big 10 Behavioral Questions
                </h2>
              </div>
              <p className="text-xs text-[#666666]">
                Over 2,000,000 global job seekers search these exact 10 questions monthly
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {behavioralList.map((q, idx) => (
                <Link
                  key={q.slug}
                  href={`/interview-questions/behavioral/${q.slug}`}
                  className="group flex flex-col justify-between rounded-xl border border-[#ebebeb] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ea580c] hover:shadow-md"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono font-medium text-[#999999]">
                        Question 0{idx + 1}
                      </span>
                      <span className="rounded-full bg-[#f5f5f5] px-2.5 py-0.5 font-mono text-[10px] font-medium text-[#666666]">
                        {q.searchVolumeTier}
                      </span>
                    </div>
                    <h3 className="text-xl font-medium tracking-tight text-[#171717] group-hover:text-[#ea580c]">
                      &ldquo;{q.questionText}&rdquo;
                    </h3>
                    <p className="line-clamp-2 text-xs leading-relaxed text-[#666666]">
                      {q.psychologyInsight}
                    </p>
                    <div className="inline-block rounded border border-[#ebebeb] bg-[#fafafa] px-2 py-1 font-mono text-[11px] text-[#444444]">
                      Framework: {q.framework}
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#f0f0f0] pt-4 text-xs font-medium text-[#171717]">
                    <span className="text-[#666666]">Word-for-Word Model Answer Included</span>
                    <span className="flex items-center gap-1 font-semibold text-[#ea580c] transition-transform group-hover:translate-x-0.5">
                      Read Guide & Script &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Interactive Simulator Callout Banner */}
          <div className="relative overflow-hidden rounded-2xl border border-[#171717] bg-[#171717] p-8 text-white sm:p-10">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#fafafa]">
                Free Audio AI Simulator
              </span>
              <h3 className="text-2xl font-normal tracking-tight sm:text-3xl">
                Memorizing answers isn’t enough. Build muscle memory out loud.
              </h3>
              <p className="text-sm font-light leading-relaxed text-[#cccccc]">
                Practice answering these questions with our sub-400ms voice AI hiring manager.
                Receive instant telemetry on your delivery pacing (WPM), hesitation filler words,
                and STAR methodology adherence.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/free-mock-interview"
                  className="rounded-lg bg-white px-5 py-2.5 text-xs font-semibold text-[#171717] transition-opacity hover:opacity-95"
                >
                  Start Free Voice Mock Session →
                </Link>
                <Link
                  href="/cv-templates"
                  className="rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                >
                  Explore ATS Resume Templates
                </Link>
              </div>
            </div>
          </div>

          {/* SECTION 2: Role-Specific Playbooks */}
          <section id="roles" className="scroll-mt-24 space-y-8">
            <div className="flex flex-col justify-between gap-2 border-b border-[#ebebeb] pb-4 sm:flex-row sm:items-end">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#ea580c]">
                  Technical & Domain Playbooks
                </span>
                <h2 className="text-2xl font-normal tracking-tight text-[#171717] sm:text-3xl">
                  Role-Specific Interview Question Playbooks
                </h2>
              </div>
              <p className="text-xs text-[#666666]">
                Technical, behavioral, and situational breakdowns tailored to your exact career
                track
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {roleList.map((r) => (
                <Link
                  key={r.slug}
                  href={`/interview-questions/${r.slug}`}
                  className="group flex flex-col justify-between rounded-xl border border-[#ebebeb] bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#ea580c] hover:shadow-md"
                >
                  <div className="space-y-3">
                    <span className="inline-block rounded-full bg-[#f5f5f5] px-2.5 py-0.5 font-mono text-[10px] font-medium text-[#666666]">
                      {r.category}
                    </span>
                    <h3 className="text-lg font-medium tracking-tight text-[#171717] group-hover:text-[#ea580c]">
                      {r.roleName}
                    </h3>
                    <p className="line-clamp-3 text-xs leading-relaxed text-[#666666]">
                      {r.heroDescription}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-[#f0f0f0] pt-4 text-xs">
                    <span className="font-mono text-[11px] text-[#999999]">
                      {r.topQuestions.length} Questions & Answers
                    </span>
                    <span className="font-semibold text-[#ea580c] transition-transform group-hover:translate-x-0.5">
                      Open Playbook &rarr;
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Sitewide Ecosystem Silo Links */}
          <section className="rounded-2xl border border-[#ebebeb] bg-white p-8">
            <h3 className="text-lg font-medium text-[#171717]">
              Complete Candidate Preparation Suite
            </h3>
            <p className="mt-1 text-xs text-[#666666]">
              Equip yourself with every free tool needed to land your dream offer.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <Link
                href="/cv-templates"
                className="rounded-lg border border-[#ebebeb] p-4 transition-colors hover:border-[#171717]"
              >
                <div className="font-mono text-[10px] font-bold uppercase text-[#ea580c]">
                  Document Hub
                </div>
                <div className="mt-1 text-sm font-medium text-[#171717]">
                  20+ ATS Resume Templates
                </div>
                <div className="mt-1 text-xs text-[#666666]">
                  Free Harvard DOCX single-column templates for every role.
                </div>
              </Link>
              <Link
                href="/ats-score"
                className="rounded-lg border border-[#ebebeb] p-4 transition-colors hover:border-[#171717]"
              >
                <div className="font-mono text-[10px] font-bold uppercase text-[#ea580c]">
                  Scanner
                </div>
                <div className="mt-1 text-sm font-medium text-[#171717]">
                  Free ATS Resume Scanner
                </div>
                <div className="mt-1 text-xs text-[#666666]">
                  Check parsing accuracy and match keywords to job descriptions.
                </div>
              </Link>
              <Link
                href="/cold-call-practice"
                className="rounded-lg border border-[#ebebeb] p-4 transition-colors hover:border-[#171717]"
              >
                <div className="font-mono text-[10px] font-bold uppercase text-[#ea580c]">
                  Simulator
                </div>
                <div className="mt-1 text-sm font-medium text-[#171717]">
                  Cold Call Roleplay Engine
                </div>
                <div className="mt-1 text-xs text-[#666666]">
                  Drill hostile gatekeeper objections with real-time audio AI.
                </div>
              </Link>
            </div>
          </section>

          {/* FAQ Accordion Section */}
          <section className="space-y-6">
            <h2 className="text-2xl font-normal tracking-tight text-[#171717]">
              Frequently Asked Interview Questions
            </h2>
            <div className="divide-y divide-[#ebebeb] rounded-xl border border-[#ebebeb] bg-white">
              {hubFaqs.map((faq, idx) => (
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
