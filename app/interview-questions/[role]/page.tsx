import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import { ROLE_INTERVIEW_QUESTIONS, RoleQuestionData } from '@/data/interviewQuestionsData'
import { CV_ROLES } from '@/data/cvRolesData'
import { ROLE_HUBS } from '@/data/roleHubs'
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
} from '@/components/interviewQuestions/ui'

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
  const idx = allRoles.findIndex((item) => item.slug === roleData.slug)
  const otherRoles = [1, 2, 3, 4].map((k) => allRoles[(idx + k) % allRoles.length])
  const hasMatchingCv = Boolean(CV_ROLES[roleData.slug])
  const hub = ROLE_HUBS[roleData.slug]

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
        name: `${roleData.roleName} Questions`,
        item: `https://www.autointerviewai.com/interview-questions/${roleData.slug}`,
      },
    ],
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: roleData.metaTitle,
    description: roleData.metaDescription,
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
      '@id': `https://www.autointerviewai.com/interview-questions/${roleData.slug}`,
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
              { label: roleData.roleName },
            ]}
          />
          <header className="mt-8 max-w-3xl">
            <div className={`${kicker} text-signal-strong`}>
              {roleData.category} · {roleData.topQuestions.length} questions with model answers ·
              Updated 23 Nov 2026
            </div>
            <h1 className="mt-4 font-serif text-h1 font-medium text-fg md:text-display">
              {roleData.heroTitle}
            </h1>
            <p className="mt-5 max-w-[60ch] text-body-lg text-fg-2">{roleData.heroDescription}</p>
            <div className="mt-6 rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
              <div className={`${kicker} text-signal-ink`}>The short answer</div>
              <p className="speakable-direct-answer mt-2 text-body leading-relaxed text-fg">
                {roleData.roleName} interviews test how you solve real problems, the trade-offs you
                weigh and how clearly you explain your thinking. Prepare the{' '}
                {roleData.topQuestions.length} questions below, tie each example to a result you can
                measure, and practise saying the answers out loud.
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-start gap-3">
              <MockInterviewButton role={roleData.roleName} />
              <a href="#questions" className={btnSecondary}>
                See the questions
              </a>
            </div>
          </header>

          {hub && (
            <Link
              href={`/${roleData.slug}`}
              className="mt-8 flex max-w-3xl items-center justify-between gap-4 rounded-xl border border-border bg-surface p-5 text-small transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
            >
              <span>
                <span className="block font-semibold text-fg">Full {hub.roleName} hub</span>
                <span className="text-fg-2">
                  {hub.questionGroups.reduce((n, g) => n + g.questions.length, 0)} questions with
                  answers, the interview rounds, real pay data and a free CV template.
                </span>
              </span>
              <span aria-hidden="true" className="shrink-0 font-semibold text-signal-strong">
                Open →
              </span>
            </Link>
          )}
        </div>

        {/* Questions */}
        <section
          id="questions"
          aria-labelledby="q-title"
          className="scroll-mt-24 border-t border-border py-14 md:py-20"
        >
          <div className={container}>
            <SectionHead
              id="q-title"
              k={`${roleData.topQuestions.length} questions · model answers`}
              title={`Top ${roleData.roleName} interview questions and answers`}
              sub="Read the takeaway first, then the model answer. Rewrite it with your own project and numbers before you practise."
            />
            <ol className="mt-8 max-w-3xl space-y-4">
              {roleData.topQuestions.map((q, idx) => (
                <li key={q.id} className="rounded-xl border border-border bg-surface p-5 md:p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-caption tabular-nums text-fg-3">
                      Q{idx + 1}
                    </span>
                    <span className="inline-flex h-6 items-center rounded-full bg-muted px-2.5 text-caption font-medium text-fg-2">
                      {q.category}
                    </span>
                    <span className="inline-flex h-6 items-center rounded-full bg-muted px-2.5 text-caption font-medium text-fg-2">
                      {q.difficulty}
                    </span>
                  </div>
                  <h3 className="mt-3 text-h3 font-semibold text-fg">{q.question}</h3>
                  <p className="mt-3 text-small text-fg-2">
                    <span className="font-semibold text-fg">Takeaway: </span>
                    {q.keyTakeaway}
                  </p>
                  <div className="mt-4 rounded-lg bg-muted p-4">
                    <div className={`${kicker} text-fg-3`}>Model answer</div>
                    <p className="mt-2 text-body leading-relaxed text-fg">{q.modelAnswer}</p>
                  </div>
                  <p className="mt-3 text-small text-fg-2">
                    <span className="font-semibold text-fg">Structure: </span>
                    {q.frameworkTip.replace(/\s*->\s*/g, ' → ')}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Checklist + next steps */}
        <section aria-labelledby="prep-title" className="border-t border-border py-14 md:py-20">
          <div className={`${container} grid gap-8 md:grid-cols-2`}>
            <div>
              <SectionHead
                id="prep-title"
                k={`Checklist · ${roleData.interviewTips.length} items`}
                title={`How to prepare for a ${roleData.roleName} interview`}
              />
              <ul className="mt-6 space-y-3">
                {roleData.interviewTips.map((tip) => (
                  <li key={tip} className="flex items-start gap-3 text-body text-fg-2">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="mt-1 h-4 w-4 shrink-0 text-signal"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="m5 12 5 5 9-10" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <div className={`${kicker} text-signal-strong`}>Next steps · free</div>
              <Link
                href="/interview-prep-plan"
                className="group block rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
              >
                <span className="block text-h4 font-semibold text-fg group-hover:text-signal-strong">
                  Make a day-by-day prep plan
                </span>
                <span className="mt-1 block text-small text-fg-2">
                  Enter your interview date; get what to do each day until then.
                </span>
              </Link>
              <Link
                href="/star-method"
                className="group block rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
              >
                <span className="block text-h4 font-semibold text-fg group-hover:text-signal-strong">
                  Write your stories in STAR
                </span>
                <span className="mt-1 block text-small text-fg-2">
                  See how long each answer runs out loud, with 8 checks.
                </span>
              </Link>
              {hasMatchingCv && (
                <Link
                  href={`/cv-templates/${roleData.slug}`}
                  className="group block rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                >
                  <span className="block text-h4 font-semibold text-fg group-hover:text-signal-strong">
                    {roleData.roleName} CV / resume template
                  </span>
                  <span className="mt-1 block text-small text-fg-2">
                    Example bullets and keywords for this role, plus a free Word template.
                  </span>
                </Link>
              )}
            </div>
          </div>
        </section>

        {/* Other roles */}
        <section aria-labelledby="other-title" className="border-t border-border py-14 md:py-20">
          <div className={container}>
            <h2 id="other-title" className="text-h2 font-semibold text-fg">
              Other roles
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {otherRoles.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/interview-questions/${item.slug}`}
                    className="group block h-full rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                  >
                    <span className="block font-mono text-caption text-fg-3">{item.category}</span>
                    <span className="mt-1 block font-semibold text-fg group-hover:text-signal-strong">
                      {item.roleName} questions
                    </span>
                    <span className="mt-1 block text-small text-fg-2">
                      {item.topQuestions.length} model answers
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-small text-fg-2">
              Or see{' '}
              <Link href="/interview-questions#behavioral" className={link}>
                the behavioral questions every interview asks
              </Link>
              .
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-title" className="border-t border-border py-14 md:py-20">
          <div className={container}>
            <div className="max-w-3xl">
              <h2 id="faq-title" className="text-h2 font-semibold text-fg">
                {roleData.roleName} interview FAQs
              </h2>
              <div className="mt-6">
                <Faq faqs={roleData.faqs} />
              </div>
            </div>
          </div>
        </section>

        <MockInterviewCTA
          roleName={roleData.roleName}
          questions={roleData.topQuestions.slice(0, 4).map((q) => q.question)}
        />
      </div>
    </DomainLayout>
  )
}
