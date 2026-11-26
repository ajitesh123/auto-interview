import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import {
  BEHAVIORAL_QUESTIONS,
  BehavioralQuestionData,
  ROLE_INTERVIEW_QUESTIONS,
} from '@/data/interviewQuestionsData'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import {
  Crumbs,
  Faq,
  SectionHead,
  btnSecondary,
  container,
  kicker,
  link,
  toolFor,
} from '@/components/interviewQuestions/ui'

interface PageProps {
  params: Promise<{
    question: string
  }>
}

export async function generateStaticParams() {
  return Object.keys(BEHAVIORAL_QUESTIONS).map((question) => ({
    question,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { question } = await params
  const qData = BEHAVIORAL_QUESTIONS[question]

  if (!qData) {
    return {
      title: 'Interview Question Not Found',
    }
  }

  return {
    title: qData.metaTitle,
    description: qData.metaDescription,
    keywords: [
      `how to answer ${qData.questionText.toLowerCase()}`,
      `${qData.questionText.toLowerCase()} sample answer`,
      `${qData.questionText.toLowerCase()} star method`,
      'behavioral interview questions',
      'job interview preparation',
      'mock interview practice',
    ],
    alternates: {
      canonical: `https://www.autointerviewai.com/interview-questions/behavioral/${qData.slug}`,
    },
    openGraph: {
      title: qData.metaTitle,
      description: qData.metaDescription,
      url: `https://www.autointerviewai.com/interview-questions/behavioral/${qData.slug}`,
      siteName: 'Auto Interview AI',
      images: [
        {
          url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
          width: 1200,
          height: 630,
          alt: `How to Answer ${qData.questionText}`,
        },
      ],
      locale: 'en_US',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: qData.metaTitle,
      description: qData.metaDescription,
      images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
      creator: '@ajiteshleo',
    },
  }
}

// The one-paragraph answer each guide opens with (advice, no statistics).
const SHORT: Record<string, string> = {
  'tell-me-about-yourself':
    'Give a short career story built for this job: what you do now, the one or two steps before that matter here, and why this role is the next step. Not your life story and not your resume read aloud. About one to two minutes.',
  'what-is-your-greatest-weakness':
    'Name a real weakness that will not sink you for this job, show what you do about it now, and give one sign it is improving. Skip disguised strengths like "I work too hard".',
  'why-should-we-hire-you':
    'Match yourself to the job in three parts: the skill they need most, proof you have done it before (with a number if you have one), and what you would deliver first. End on the role, not on you.',
  'why-do-you-want-to-work-here':
    'Show you know this company: one specific thing about its product or mission, why that fits the work you want to do, and what you would bring. Avoid pay, perks or location as your main reason.',
  'where-do-you-see-yourself-in-5-years':
    'Describe a realistic direction, not a title: the skills you want to build and the kind of problems you want to own, and show how this role leads there. They are checking you will stay and grow.',
  'describe-a-conflict-with-coworker':
    'Pick a work disagreement, not a personal feud. Explain both sides fairly, what you did to resolve it (listen, bring data, propose a compromise) and how it ended. No blaming.',
  'tell-me-about-a-time-you-failed':
    'Choose a real failure that you owned, say briefly what went wrong and why, then spend most of the answer on what you fixed and what you do differently now.',
  'what-is-your-greatest-strength':
    'Pick one strength the job needs, prove it with a short real example and a result, and link it to what you would do in this role. One strength told well beats a list.',
  'why-are-you-leaving-your-current-job':
    'Stay positive and forward-looking: thank the old job for what you learned, name the limit you have reached (growth, scope, learning), and explain why this role is the pull. Never criticise your employer.',
  'how-do-you-handle-stress-pressure':
    'Show a method, not a claim: a real high-pressure moment, how you prioritised and communicated, and the outcome. Calm and organised beats "I thrive under pressure".',
  'tell-me-about-a-time-you-showed-leadership':
    'Use a STAR story where you led without being asked: the situation, what you decided and how you got people moving, and the result. Leadership without a title counts.',
  'how-do-you-prioritize-your-work':
    'Explain your system (impact and deadline first, then the rest), show it on a real busy week, and say how you tell people when something has to move.',
  'tell-me-about-a-time-you-disagreed-with-your-manager':
    'Show you can disagree respectfully: you raised it privately with evidence, proposed an option, and then committed to the final decision even if it was not yours.',
  'what-are-your-salary-expectations':
    'Research the pay for this role and city first, then give a range or a precise number anchored on that research, and show you are open to the whole package. In India, be clear whether you mean CTC or in-hand.',
}

const arrows = (t: string) => t.replace(/\s*->\s*/g, ' → ')

const COMPARE = [
  {
    part: 'Setup',
    strong: 'One or two sentences of context, then straight to the point.',
    weak: 'A long backstory before the interviewer knows where it is going.',
  },
  {
    part: 'Your part',
    strong: 'Most of the time on what you did, said with “I”.',
    weak: 'Only “we”, so your own role is unclear.',
  },
  {
    part: 'Result',
    strong: 'A concrete outcome, with a number where you have one.',
    weak: '“It went well” and nothing to check.',
  },
  {
    part: 'Length',
    strong: 'About one to two minutes out loud, then stop.',
    weak: 'A monologue that runs on until the interviewer cuts in.',
  },
  {
    part: 'Ending',
    strong: 'What you learned or how it applies to this job.',
    weak: 'Trails off, or ends by blaming someone.',
  },
]

export default async function BehavioralQuestionPage({ params }: PageProps) {
  const { question } = await params
  const qData = BEHAVIORAL_QUESTIONS[question]

  if (!qData) {
    notFound()
  }

  const allQuestions = Object.values(BEHAVIORAL_QUESTIONS)
  const qIndex = allQuestions.findIndex((item) => item.slug === qData.slug)
  const relatedQuestions = [1, 2, 3, 4].map((k) => allQuestions[(qIndex + k) % allQuestions.length])
  const tool = toolFor(qData.slug)
  const isStory =
    /STAR|CAR/.test(qData.framework) ||
    qData.slug.startsWith('tell-me-about-a-time') ||
    qData.slug === 'describe-a-conflict-with-coworker'

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: qData.faqs.map((faq) => ({
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
        item: 'https://www.autointerviewai.com/',
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
        name: qData.questionText,
        item: `https://www.autointerviewai.com/interview-questions/behavioral/${qData.slug}`,
      },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: qData.metaTitle,
    description: qData.metaDescription,
    image: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
    datePublished: '2026-01-15T08:00:00+00:00',
    dateModified: '2026-11-23T08:00:00+05:30',
    author: {
      '@type': 'Person',
      '@id': 'https://www.autointerviewai.com/#founder',
      name: 'Ajitesh Abhishek',
      jobTitle: 'Founder & Former Google Product Manager',
      url: 'https://www.linkedin.com/in/ajiteshnandan/',
      sameAs: [
        'https://www.linkedin.com/in/ajiteshnandan/',
        'https://x.com/ajiteshleo',
        'https://github.com/ajitesh123',
      ],
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Indian Institute of Technology Delhi (IIT Delhi)',
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'Kellogg School of Management, Northwestern University',
        },
      ],
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://www.autointerviewai.com/#organization',
      name: 'Auto Interview AI',
      url: 'https://www.autointerviewai.com/',
      logo: {
        '@type': 'ImageObject',
        '@id': 'https://www.autointerviewai.com/#logo',
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.autointerviewai.com/interview-questions/behavioral/${qData.slug}`,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.speakable-direct-answer'],
    },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="bg-bg text-fg">
        <div className={`${container} pb-10 pt-8 md:pt-12`}>
          <Crumbs
            items={[
              { label: 'Home', href: '/' },
              { label: 'Interview questions', href: '/interview-questions' },
              { label: qData.questionText },
            ]}
          />
          <header className="mt-8 max-w-3xl">
            <div className={`${kicker} text-signal-strong`}>
              Behavioral question {qIndex + 1} of {allQuestions.length} · Updated 23 Nov 2026
            </div>
            <h1 className="mt-4 font-serif text-h1 font-medium text-fg md:text-display">
              How to answer &ldquo;{qData.questionText}&rdquo;
            </h1>
            <p className="mt-5 max-w-[60ch] text-body-lg text-fg-2">{qData.metaDescription}</p>
            <div className="mt-6 rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
              <div className={`${kicker} text-signal-ink`}>The short answer</div>
              <p className="speakable-direct-answer mt-2 text-body leading-relaxed text-fg">
                {SHORT[qData.slug] ??
                  'Keep the setup short, spend most of your answer on what you did, end on a result you can point to, and keep it to about one to two minutes out loud.'}
              </p>
            </div>
            {qData.slug === 'tell-me-about-yourself' && (
              <p className="mt-4 text-small text-fg-2">
                Want the full guide with 11 sources and a timer?{' '}
                <Link href="/tell-me-about-yourself" className={link}>
                  Open the answer builder →
                </Link>
              </p>
            )}
            {qData.slug === 'why-should-we-hire-you' && (
              <p className="mt-4 text-small text-fg-2">
                Want to build yours with a timer and 9 checks?{' '}
                <Link href="/why-should-we-hire-you" className={link}>
                  Open the answer builder →
                </Link>
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-start gap-3">
              <MockInterviewButton label="Practise this question free" />
              <Link href={tool.href} className={btnSecondary}>
                {tool.title}
              </Link>
            </div>
          </header>
        </div>

        {/* Strong vs weak (story questions only) */}
        {isStory && (
          <section aria-labelledby="sw-title" className="border-t border-border py-14 md:py-20">
            <div className={container}>
              <SectionHead
                id="sw-title"
                k="Strong vs weak · coaching rules of thumb, not measured data"
                title="What a strong answer does differently"
              />
              <figure className="mt-8 max-w-3xl">
                <div
                  role="region"
                  // Scrollable table must be keyboard-focusable (WCAG 2.1.1)
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                  tabIndex={0}
                  aria-label="Strong vs weak answer comparison"
                  className="overflow-x-auto rounded-xl border border-border bg-surface"
                >
                  <table className="w-full min-w-[560px] text-left text-small">
                    <thead className="bg-muted text-fg-2">
                      <tr>
                        <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-semibold">
                          Part
                        </th>
                        <th scope="col" className="px-4 py-3 font-semibold text-fg">
                          Strong answer
                        </th>
                        <th scope="col" className="px-4 py-3 font-semibold">
                          Weak answer
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-fg-2">
                      {COMPARE.map((r) => (
                        <tr key={r.part}>
                          <th
                            scope="row"
                            className="sticky left-0 bg-surface px-4 py-3 font-medium text-fg"
                          >
                            {r.part}
                          </th>
                          <td className="px-4 py-3 text-fg">{r.strong}</td>
                          <td className="px-4 py-3">{r.weak}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <figcaption className="mt-2 text-caption text-fg-3">
                  Common career-service guidance on behavioral answers.{' '}
                  <span className="md:hidden">Swipe →</span>
                </figcaption>
              </figure>
            </div>
          </section>
        )}

        {/* Why they ask */}
        <section aria-labelledby="why-title" className="border-t border-border py-14 md:py-20">
          <div className={container}>
            <SectionHead
              id="why-title"
              k="Why they ask"
              title="What the interviewer is really testing"
            />
            <p className="mt-5 max-w-prose text-body-lg leading-relaxed text-fg-2">
              {qData.psychologyInsight}
            </p>
          </div>
        </section>

        {/* Model answer */}
        <section aria-labelledby="model-title" className="border-t border-border py-14 md:py-20">
          <div className={container}>
            <SectionHead
              id="model-title"
              k={`Model answer · ${qData.goodSampleAnswer.roleContext}`}
              title="A strong sample answer, and why it works"
              sub="Made-up example to show the shape. Swap in your own story and numbers."
            />
            <blockquote className="mt-8 max-w-3xl rounded-xl border border-border bg-surface p-5 md:p-6">
              <p className="font-serif text-body-lg leading-relaxed text-fg md:text-h4">
                {qData.goodSampleAnswer.script}
              </p>
            </blockquote>
            <ol className="mt-4 grid max-w-3xl gap-3 sm:grid-cols-3">
              {qData.goodSampleAnswer.breakdown.map((item) => (
                <li key={item.step} className="rounded-xl border border-border bg-surface p-4">
                  <div className="font-mono text-caption font-semibold text-signal-strong">
                    {item.step}
                  </div>
                  <p className="mt-2 text-small leading-relaxed text-fg-2">{item.content}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Weak answer */}
        <section aria-labelledby="weak-title" className="border-t border-border py-14 md:py-20">
          <div className={container}>
            <SectionHead id="weak-title" k="Weak answer" title="The answer that loses points" />
            <div className="mt-8 max-w-3xl rounded-xl bg-danger-soft p-5 ring-1 ring-inset ring-danger/15 md:p-6">
              <div className={`${kicker} text-danger`}>Avoid saying</div>
              <p className="mt-2 text-body italic leading-relaxed text-fg">
                {qData.badAnswerExample.script}
              </p>
              <p className="mt-4 border-t border-danger/15 pt-3 text-small text-fg-2">
                <span className="font-semibold text-fg">Why it fails: </span>
                {qData.badAnswerExample.critique}
              </p>
            </div>
          </div>
        </section>

        {/* Tips + mistakes + tool */}
        <section aria-labelledby="tips-title" className="border-t border-border py-14 md:py-20">
          <div className={container}>
            <h2 id="tips-title" className="sr-only">
              Tips and mistakes
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
                <h3 className="text-h4 font-semibold text-fg">Do</h3>
                <ul className="mt-4 space-y-3 text-body text-fg-2">
                  {qData.proTips.map((tip) => (
                    <li key={tip} className="flex gap-3">
                      <span aria-hidden="true" className="mt-0.5 font-semibold text-success">
                        ✓
                      </span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
                <h3 className="text-h4 font-semibold text-fg">Avoid</h3>
                <ul className="mt-4 space-y-3 text-body text-fg-2">
                  {qData.commonMistakes.map((m) => (
                    <li key={m} className="flex gap-3">
                      <span aria-hidden="true" className="mt-0.5 font-semibold text-danger">
                        ✕
                      </span>
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              href={tool.href}
              className="group mt-4 flex flex-col gap-3 rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15 transition-shadow duration-fast hover:shadow-e2 sm:flex-row sm:items-center sm:justify-between md:p-6"
            >
              <span>
                <span className={`${kicker} block text-signal-ink`}>
                  Free tool · no AI, no sign-up
                </span>
                <span className="mt-1 block text-h4 font-semibold text-fg">{tool.title}</span>
                <span className="mt-1 block max-w-[60ch] text-small text-fg-2">{tool.body}</span>
              </span>
              <span className="shrink-0 font-semibold text-signal-strong">Open →</span>
            </Link>
          </div>
        </section>

        {/* Related */}
        <section aria-labelledby="rel-title" className="border-t border-border py-14 md:py-20">
          <div className={container}>
            <h2 id="rel-title" className="text-h2 font-semibold text-fg">
              Next questions to prepare
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {relatedQuestions.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/interview-questions/behavioral/${item.slug}`}
                    className="group block h-full rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                  >
                    <span className="block font-semibold text-fg group-hover:text-signal-strong">
                      &ldquo;{item.questionText}&rdquo;
                    </span>
                    <span className="mt-1 block text-small text-fg-2">
                      {arrows(item.framework)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-small text-fg-2">
              <Link href="/interview-questions" className={link}>
                All {allQuestions.length} behavioral questions and{' '}
                {Object.keys(ROLE_INTERVIEW_QUESTIONS).length} role question banks
              </Link>
            </p>
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
                <Faq faqs={qData.faqs} />
              </div>
            </div>
          </div>
        </section>

        <MockInterviewCTA
          title="Now say it out loud, to someone who follows up."
          questions={[
            qData.questionText,
            ...relatedQuestions.slice(0, 3).map((q) => q.questionText),
          ]}
        />
      </div>
    </DomainLayout>
  )
}
