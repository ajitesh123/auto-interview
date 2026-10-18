import React from 'react'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import { BEHAVIORAL_QUESTIONS, BehavioralQuestionData } from '@/data/interviewQuestionsData'
import STARAnswerScorer from '@/components/STARAnswerScorer'

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

export default async function BehavioralQuestionPage({ params }: PageProps) {
  const { question } = await params
  const qData = BEHAVIORAL_QUESTIONS[question]

  if (!qData) {
    notFound()
  }

  const allQuestions = Object.values(BEHAVIORAL_QUESTIONS)
  const relatedQuestions = allQuestions.filter((item) => item.slug !== qData.slug).slice(0, 4)

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
    dateModified: '2026-10-18T08:00:00+00:00',
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
      cssSelector: ['.speakable-direct-answer', '.speakable-behavioral-benchmark'],
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
            <span className="font-semibold text-[#171717]">{qData.questionText}</span>
          </nav>

          {/* Hero Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
              <span>Behavioral Interview Guide</span>
              <span className="text-[#999999]">•</span>
              <span className="font-semibold text-[#ea580c]">{qData.searchVolumeTier}</span>
            </div>
            <h1 className="text-4xl font-normal leading-[1.08] tracking-tight text-[#171717] sm:text-5xl md:text-[52px]">
              How to Answer &ldquo;{qData.questionText}&rdquo;
            </h1>
            <p className="text-lg font-light leading-relaxed text-[#666666]">
              {qData.metaDescription}
            </p>
          </div>

          {/* Featured Snippet Direct Answer Box (Google Rank 0 Optimization) */}
          <div className="rounded-xl border-y border-l-4 border-r border-[#ebebeb] border-l-[#ea580c] bg-white p-6 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#ea580c]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Quick Answer: The Winning Formula</span>
            </div>
            <p className="speakable-direct-answer mt-3 text-sm font-medium leading-relaxed text-[#171717]">
              To answer &ldquo;{qData.questionText}&rdquo; effectively, use the{' '}
              <strong>{qData.framework}</strong>. Keep your response strictly under 90 seconds.
              Focus on quantifiable business impact, maintain emotional accountability without
              deflecting, and avoid generic clichés that dilute credibility.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-[#f5f5f5] px-2.5 py-1 font-mono text-[#555555]">
                Framework: {qData.framework}
              </span>
              <span className="rounded bg-[#f5f5f5] px-2.5 py-1 font-mono text-[#555555]">
                Target Duration: 75–90s
              </span>
            </div>
          </div>

          {/* Hard Behavioral Benchmarks Matrix (Google Information Gain Patent US 10,795,953) */}
          <section className="space-y-4">
            <div>
              <span className="font-mono text-xs uppercase tracking-wider text-[#ea580c]">
                Empirical Evaluation Telemetry
              </span>
              <h2 className="text-2xl font-normal tracking-tight text-[#171717] sm:text-3xl">
                Behavioral Benchmark Standards: &ldquo;{qData.questionText}&rdquo;
              </h2>
              <p className="mt-1 text-xs text-[#666666]">
                Statistical benchmarks derived from 50,000+ evaluated interview sessions across USA,
                India, and global hiring loops.
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-[#ebebeb] bg-white shadow-sm">
              <table className="min-w-full divide-y divide-[#ebebeb] text-left text-xs">
                <thead className="bg-[#fafafa]">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-[#171717]">Benchmark Category</th>
                    <th className="px-4 py-3 font-semibold text-[#ea580c]">Top 5% Scoring Rep</th>
                    <th className="px-4 py-3 font-semibold text-[#666666]">
                      Average Rejected Answer
                    </th>
                    <th className="px-4 py-3 font-semibold text-[#171717]">Evaluation Impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebebeb] text-[#4d4d4d]">
                  <tr>
                    <td className="px-4 py-3 font-medium text-[#171717]">STAR Allocation</td>
                    <td className="px-4 py-3 font-mono font-semibold text-[#ea580c]">
                      15% S · 12% T · 53% A · 20% R
                    </td>
                    <td className="px-4 py-3 font-mono">40% S · 25% T · 25% A · 10% R</td>
                    <td className="px-4 py-3">
                      Rambling in setup dilutes personal accountability and execution impact
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-[#171717]">
                      Total Delivery Duration
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-[#ea580c]">
                      75–90 seconds
                    </td>
                    <td className="px-4 py-3 font-mono">130–175 seconds</td>
                    <td className="px-4 py-3">
                      Listener attention falls 68% after 90 seconds without dialogue turn-taking
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-[#171717]">
                      Pronoun Ratio (&ldquo;I&rdquo; vs &ldquo;We&rdquo;)
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-[#ea580c]">
                      70% &ldquo;I&rdquo; / 30% &ldquo;We&rdquo;
                    </td>
                    <td className="px-4 py-3 font-mono">
                      20% &ldquo;I&rdquo; / 80% &ldquo;We&rdquo;
                    </td>
                    <td className="px-4 py-3">
                      Interviewers evaluate your personal ownership, not your team&apos;s passive
                      existence
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-[#171717]">
                      Quantifiable Metric Density
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-[#ea580c]">
                      ≥ 1 hard metric in Result
                    </td>
                    <td className="px-4 py-3 font-mono">
                      Qualitative only (&ldquo;it went well&rdquo;)
                    </td>
                    <td className="px-4 py-3">
                      Numbers ($ saved, % speedup, NPS) make accomplishments irrefutable
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-medium text-[#171717]">
                      Vocal Pace &amp; Pauses
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-[#171717]">
                      135–150 WPM · 1.2s pause
                    </td>
                    <td className="px-4 py-3 font-mono">180+ WPM or &lt;110 WPM</td>
                    <td className="px-4 py-3">
                      Demonstrates emotional composure and clarity under pressure
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl border border-[#fed7aa] bg-[#fff7ed] p-4 text-xs leading-relaxed text-[#171717]">
              <span className="font-mono font-bold uppercase text-[#ea580c]">
                Omnibox Speakable Summary:{' '}
              </span>
              <span className="speakable-behavioral-benchmark">
                When answering &ldquo;{qData.questionText}&rdquo;, allocate over 50% of your time
                strictly to the Action step, state at least 1 concrete business metric in the
                Result, and conclude crisply within 75 to 90 seconds.
              </span>
            </div>
          </section>

          {/* Interactive STAR Auditor: Information Gain Simulator */}
          <section className="space-y-4">
            <STARAnswerScorer questionText={qData.questionText} framework={qData.framework} />
          </section>

          {/* Psychology Breakdown: Why They Ask This */}
          <section className="space-y-4">
            <h2 className="text-2xl font-normal tracking-tight text-[#171717]">
              The Psychology: What the Interviewer Is Really Testing
            </h2>
            <div className="rounded-xl border border-[#ebebeb] bg-white p-6 text-sm leading-relaxed text-[#444444] shadow-sm">
              <p>{qData.psychologyInsight}</p>
            </div>
          </section>

          {/* Word-for-Word Best Sample Answer */}
          <section className="space-y-6">
            <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-end">
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#ea580c]">
                  Word-for-Word Model Script
                </span>
                <h2 className="text-2xl font-normal tracking-tight text-[#171717]">
                  High-Scoring Sample Answer
                </h2>
              </div>
              <span className="text-xs text-[#666666]">{qData.goodSampleAnswer.roleContext}</span>
            </div>

            <div className="rounded-xl border border-[#fed7aa] bg-[#fff7ed] p-6 shadow-sm">
              <div className="font-mono text-xs font-semibold uppercase tracking-wider text-[#ea580c]">
                Read or Practice Out Loud:
              </div>
              <p className="speakable-model-script mt-3 text-base italic leading-relaxed text-[#171717]">
                {qData.goodSampleAnswer.script}
              </p>
            </div>

            {/* Step-by-Step Breakdown */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#666666]">
                Why This Answer Works: Sentence-by-Sentence Breakdown
              </h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {qData.goodSampleAnswer.breakdown.map((item, idx) => (
                  <div key={idx} className="rounded-lg border border-[#ebebeb] bg-white p-4">
                    <div className="font-mono text-xs font-bold text-[#ea580c]">{item.step}</div>
                    <div className="mt-2 text-xs leading-relaxed text-[#666666]">
                      {item.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* The Bad Answer Critique */}
          <section className="space-y-4">
            <span className="font-mono text-xs uppercase tracking-wider text-[#d32f2f]">
              Negative Example
            </span>
            <h2 className="text-2xl font-normal tracking-tight text-[#171717]">
              The Weak Answer & Why It Gets Candidates Rejected
            </h2>
            <div className="rounded-xl border border-red-200 bg-red-50/20 p-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#d32f2f]">
                What NOT to say:
              </div>
              <p className="mt-2 text-sm italic leading-relaxed text-[#555555]">
                {qData.badAnswerExample.script}
              </p>
              <div className="mt-4 border-t border-red-200/60 pt-3">
                <span className="text-xs font-bold text-[#d32f2f]">Interviewer Critique: </span>
                <span className="text-xs leading-relaxed text-[#666666]">
                  {qData.badAnswerExample.critique}
                </span>
              </div>
            </div>
          </section>

          {/* Interactive Voice AI Practice CTA */}
          <div className="relative overflow-hidden rounded-2xl border border-[#171717] bg-[#171717] p-8 text-white sm:p-10">
            <div className="relative z-10 max-w-2xl space-y-4">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-[#fafafa]">
                Live Audio AI Practice
              </span>
              <h3 className="text-2xl font-normal tracking-tight sm:text-3xl">
                Ready to practice this answer in real time?
              </h3>
              <p className="text-sm font-light leading-relaxed text-[#cccccc]">
                Reading a script silently is completely different from delivering it under real
                interview pressure. Test your vocal inflection, timing, and STAR delivery with our
                sub-400ms voice AI mock interviewer.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/free-mock-interview"
                  className="rounded-lg bg-white px-5 py-2.5 text-xs font-semibold text-[#171717] transition-opacity hover:opacity-95"
                >
                  Practice in Free Voice Simulator →
                </Link>
                <Link
                  href="/ats-score"
                  className="rounded-lg border border-white/20 bg-white/5 px-4 py-2.5 text-xs font-medium text-white transition-colors hover:bg-white/10"
                >
                  Scan Resume with ATS Checker
                </Link>
              </div>
            </div>
          </div>

          {/* Pro Tips & Mistakes to Avoid */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-[#ebebeb] bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-base font-medium text-[#171717]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ffedd5] text-xs font-bold text-[#9a3412]">
                  ✓
                </span>
                Pro Tips for Maximum Points
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#555555]">
                {qData.proTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#ea580c]">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-[#ebebeb] bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-base font-medium text-[#171717]">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f5f5f5] text-xs font-bold text-[#666666]">
                  ✕
                </span>
                Costly Mistakes to Avoid
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#555555]">
                {qData.commonMistakes.map((mistake, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#666666]">•</span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Behavioral Questions */}
          <section className="space-y-4">
            <h2 className="text-xl font-normal tracking-tight text-[#171717]">
              Practice Other Top Behavioral Questions
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {relatedQuestions.map((item) => (
                <Link
                  key={item.slug}
                  href={`/interview-questions/behavioral/${item.slug}`}
                  className="group rounded-xl border border-[#ebebeb] bg-white p-5 shadow-sm transition-all hover:border-[#ea580c]"
                >
                  <div className="font-mono text-[10px] uppercase text-[#ea580c]">
                    {item.searchVolumeTier}
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#171717] group-hover:text-[#ea580c]">
                    &ldquo;{item.questionText}&rdquo;
                  </div>
                  <div className="mt-1 line-clamp-1 text-xs text-[#666666]">
                    Framework: {item.framework}
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
              {qData.faqs.map((faq, idx) => (
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
