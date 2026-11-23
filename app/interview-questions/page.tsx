import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import { ROLE_HUBS } from '@/data/roleHubs'
import {
  Crumbs,
  Faq,
  SectionHead,
  btnSecondary,
  container,
  kicker,
  link,
} from '@/components/interviewQuestions/ui'
import { BEHAVIORAL_QUESTIONS, ROLE_INTERVIEW_QUESTIONS } from '@/data/interviewQuestionsData'

export const metadata: Metadata = {
  title: 'Top Interview Questions & Model Answers (2026 Guide)',
  description:
    '14 behavioral interview questions and 22 role question banks, each with a model answer, a weak answer and why it fails, plus free tools and a free voice mock interview.',
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
  const nRoleQs = roleList.reduce((n, r) => n + r.topQuestions.length, 0)
  const categories = Array.from(new Set(roleList.map((r) => r.category)))
  const extraHubs = Object.values(ROLE_HUBS).filter((h) => !ROLE_INTERVIEW_QUESTIONS[h.slug])

  const hubFaqs = [
    {
      q: 'What is the STAR method and how should I use it?',
      a: 'STAR stands for Situation, Task, Action and Result. Use it for any "tell me about a time" question: one or two sentences of setup, most of your time on what you did, and a result you can point to, ideally with a number.',
    },
    {
      q: 'How long should an interview answer be?',
      a: 'A common rule of thumb for behavioral answers is one to two minutes spoken. Time yourself: the STAR builder and the "tell me about yourself" builder on this site show how long your written answer runs out loud.',
    },
    {
      q: 'Can I practise these questions out loud for free?',
      a: 'Yes. The free mock interview runs on Tough Tongue AI: a voice interviewer asks the questions, follows up on your answers and tells you what was strong and what was thin.',
    },
    {
      q: 'Should I memorise the model answers?',
      a: 'No. Use them to see the shape of a strong answer, then write your own with your real numbers and say it out loud until it sounds like you, not a script.',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: hubFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Interview question guides',
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

  const tools = [
    {
      href: '/tell-me-about-yourself',
      t: '"Tell me about yourself" builder',
      d: 'Three parts, a talk-time timer and 8 plain checks.',
    },
    {
      href: '/star-method',
      t: 'STAR answer builder',
      d: 'Time split per part, "I" vs "we", a number in the result.',
    },
    {
      href: '/interview-prep-plan',
      t: 'Interview prep plan',
      d: 'A day-by-day plan from today to your interview date.',
    },
    {
      href: '/salary-negotiation',
      t: 'Salary negotiation scripts',
      d: 'Counter email and call script for India (CTC) and the US.',
    },
  ]

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

      <div className="bg-bg text-fg">
        <div className={`${container} pb-10 pt-8 md:pt-12`}>
          <Crumbs items={[{ label: 'Home', href: '/' }, { label: 'Interview questions' }]} />
          <header className="mt-8 max-w-3xl">
            <div className={`${kicker} text-signal-strong`}>
              Question bank · {behavioralList.length} behavioral · {roleList.length} roles ·{' '}
              {nRoleQs} role questions · Free, no login
            </div>
            <h1 className="mt-4 font-serif text-h1 font-medium text-fg md:text-display">
              Interview questions, with answers you can say out loud
            </h1>
            <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
              Pick the question that worries you or your role. Every guide shows a model answer, a
              weak answer and why it fails, then a free tool to write your own.
            </p>
            <div className="mt-7 flex flex-wrap items-start gap-3">
              <MockInterviewButton />
              <a href="#behavioral" className={btnSecondary}>
                Behavioral questions
              </a>
              <a href="#roles" className={btnSecondary}>
                By role
              </a>
            </div>
          </header>
        </div>

        {/* Behavioral */}
        <section
          id="behavioral"
          aria-labelledby="beh-title"
          className="scroll-mt-24 border-t border-border py-14 md:py-20"
        >
          <div className={container}>
            <SectionHead
              id="beh-title"
              k={`Behavioral · ${behavioralList.length} questions · STAR and story answers`}
              title="The behavioral questions almost every interview asks"
              sub="Each guide: the short answer, a strong vs weak comparison, a model answer broken down sentence by sentence, and the mistakes that cost points."
            />
            <ol className="mt-8 grid gap-3 md:grid-cols-2">
              {behavioralList.map((q, idx) => (
                <li key={q.slug}>
                  <Link
                    href={`/interview-questions/behavioral/${q.slug}`}
                    className="group relative flex h-full gap-4 rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                  >
                    <span className="font-mono text-small tabular-nums text-fg-3">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-h4 font-semibold text-fg group-hover:text-signal-strong">
                        &ldquo;{q.questionText}&rdquo;
                      </span>
                      <span className="mt-1.5 line-clamp-2 block text-small text-fg-2">
                        {q.psychologyInsight}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Tools */}
        <section aria-labelledby="tools-title" className="border-t border-border py-14 md:py-20">
          <div className={container}>
            <SectionHead
              id="tools-title"
              k="Free tools · run in your browser · no AI, no sign-up"
              title="Write your own answer, then time it"
              sub="Model answers show the shape. These tools help you fill it with your story."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((t) => (
                <li key={t.href}>
                  <Link
                    href={t.href}
                    className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                  >
                    <span className="text-h4 font-semibold text-fg group-hover:text-signal-strong">
                      {t.t}
                    </span>
                    <span className="mt-1.5 text-small text-fg-2">{t.d}</span>
                    <span className="mt-auto pt-4 text-small font-semibold text-signal-strong">
                      Open tool →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Roles */}
        <section
          id="roles"
          aria-labelledby="roles-title"
          className="scroll-mt-24 border-t border-border py-14 md:py-20"
        >
          <div className={container}>
            <SectionHead
              id="roles-title"
              k={`By role · ${roleList.length} roles · ${categories.length} fields`}
              title="Questions for your role"
              sub="Technical and situational questions with model answers. Roles marked 'Full hub' also have interview rounds, pay data and a CV template."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {roleList.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/interview-questions/${r.slug}`}
                    className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                  >
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="inline-flex h-6 items-center rounded-full bg-muted px-2.5 text-caption font-medium text-fg-2">
                        {r.category}
                      </span>
                      {ROLE_HUBS[r.slug] && (
                        <span className="inline-flex h-6 items-center rounded-full bg-signal-tint px-2.5 text-caption font-medium text-signal-ink">
                          Full hub
                        </span>
                      )}
                    </span>
                    <span className="mt-3 text-h4 font-semibold text-fg group-hover:text-signal-strong">
                      {r.roleName}
                    </span>
                    <span className="mt-1.5 line-clamp-2 text-small text-fg-2">
                      {r.heroDescription}
                    </span>
                    <span className="mt-auto pt-4 font-mono text-caption text-fg-3">
                      {r.topQuestions.length} questions with model answers
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            {extraHubs.length > 0 && (
              <p className="mt-6 text-small text-fg-2">
                Not listed? These role hubs have their own question banks:{' '}
                {extraHubs.map((h, i) => (
                  <span key={h.slug}>
                    {i > 0 && ', '}
                    <Link href={`/${h.slug}`} className={link}>
                      {h.roleName}
                    </Link>
                  </span>
                ))}
                .
              </p>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="border-t border-border py-14 md:py-20">
          <div className={container}>
            <div className="max-w-3xl">
              <h2 id="faq-title" className="text-h2 font-semibold text-fg">
                Questions people ask
              </h2>
              <div className="mt-6">
                <Faq faqs={hubFaqs} />
              </div>
            </div>
          </div>
        </section>

        <MockInterviewCTA
          title="Reading answers is not the same as saying them."
          questions={behavioralList.slice(0, 4).map((q) => q.questionText)}
        />
      </div>
    </DomainLayout>
  )
}
