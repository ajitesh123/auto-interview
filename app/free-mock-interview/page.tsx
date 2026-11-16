import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewPicker, { type MockOption } from '@/components/ai/MockInterviewPicker'

export const metadata: Metadata = {
  title: 'Free AI Mock Interview: Practice Online With AI (2026)',
  description:
    'Practise a mock interview out loud with an AI voice interviewer: product manager case, consulting case, AI engineer technical round, or speaking clarity. Free to start, runs in your browser.',
  keywords:
    'free mock interview, AI interview simulator, behavioral interview practice, coding interview prep, technical mock interview, Tough Tongue AI',
  alternates: {
    canonical: 'https://www.autointerviewai.com/free-mock-interview',
  },
  openGraph: {
    title: 'Free AI Mock Interview Simulator — Auto Interview AI',
    description:
      'Practice role-specific interview questions with our free AI mock interview simulator.',
    url: 'https://www.autointerviewai.com/free-mock-interview',
    siteName: 'Auto Interview AI',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Free Mock Interview Practice',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Mock Interview Simulator — Auto Interview AI',
    description:
      'Practice role-specific interview questions with our free AI mock interview simulator.',
    images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
    creator: '@ajiteshleo',
  },
}

const OPTIONS: MockOption[] = [
  {
    id: '6aba95442769e5d6d5ea0eb0',
    label: 'Product manager case',
    title: 'Product manager: product case interview',
    forWho: 'PM, APM, AI PM',
    about:
      'A structured product case modelled on Google’s PM (MBA graduate) role. The interviewer presents a case and probes your reasoning one question at a time, like a real round: no hints during the interview.',
  },
  {
    id: '6a6837587fcb88ed6a68d18c',
    label: 'Consulting case',
    title: 'Consulting: MBB-style case interview',
    forWho: 'Consulting, strategy, S&O, founder’s office',
    about:
      'A case interview with a senior consultant who evaluates your structure, your maths and your business judgment.',
  },
  {
    id: '6a2ada4581e9e2e761f9a715',
    label: 'AI engineer technical',
    title: 'AI engineer: technical interview',
    forWho: 'AI engineer, ML, FDE',
    minutes: 'about 25 min',
    about:
      'Data structures, ML fundamentals and system design, with a live notepad that tracks your progress through the round.',
  },
  {
    id: '6964fe0b8b51ea70930a6c05',
    label: 'Speaking clarity coach',
    title: 'Speaking clarity: American English pronunciation coach',
    forWho: 'Anyone interviewing in English',
    minutes: 'about 20 min',
    about:
      'Not an interview: a coach who picks one sound and one rhythm pattern you can fix, drills it, then has you answer a short interview-style prompt.',
  },
]

const FAQS = [
  {
    q: 'Is the AI mock interview free?',
    a: 'Yes, it is free to start and runs in your browser. The interviews run on Tough Tongue AI, the product behind this site.',
  },
  {
    q: 'Do I need to install anything or create an account?',
    a: 'No installation is needed. Tough Tongue AI may ask you to sign in before the session starts. Allow microphone access when your browser asks, use headphones if you can, and start talking.',
  },
  {
    q: 'Which interviews can I practise here?',
    a: 'A product manager case, a consulting case, an AI engineer technical round, and a speaking-clarity coach. For other roles, read the role guide first and practise its questions out loud.',
  },
  {
    q: 'How should I prepare before I start?',
    a: 'Pick one interview, read 5 questions from the matching role guide, and give yourself 20–30 quiet minutes. Answer the way you would in the real room: out loud, in full sentences, without notes.',
  },
]

const GUIDES = [
  { href: '/product-manager', label: 'Product Manager questions' },
  { href: '/aipm', label: 'AI PM questions' },
  { href: '/strategy-and-operations', label: 'Strategy & Operations questions' },
  { href: '/founders-office', label: 'Founder’s Office questions' },
  { href: '/ai-engineer', label: 'AI Engineer questions' },
  { href: '/fde', label: 'FDE questions' },
  { href: '/interview-questions/behavioral', label: 'Behavioural questions' },
]

export default function FreeMockInterviewPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Free AI Mock Interview (Tough Tongue AI)',
    applicationCategory: 'EducationalApplication',
    operatingSystem: 'Web',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    description:
      'Practise a mock interview out loud with an AI voice interviewer: product manager case, consulting case, AI engineer technical round, or a speaking-clarity coach.',
  }
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <DomainLayout currentPath="/free-mock-interview">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="mx-auto w-full max-w-[1200px] px-5 py-10 md:px-8 md:py-16">
        <header className="max-w-3xl">
          <p className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
            Free to start · runs in your browser · by Tough Tongue AI
          </p>
          <h1 className="mt-3 font-serif text-h1 font-medium text-fg">
            Free AI mock interview, out loud
          </h1>
          <p className="mt-4 max-w-[60ch] text-body-lg text-fg-2">
            Pick an interview, allow your microphone, and answer the way you would in the real room.
            The interviewer listens and follows up on what you actually said.
          </p>
        </header>

        <div className="mt-8">
          <MockInterviewPicker options={OPTIONS} />
        </div>

        <section aria-labelledby="before-title" className="mt-14 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
              Before you start
            </p>
            <h2 id="before-title" className="mt-3 text-h3 font-semibold text-fg">
              Read the questions first
            </h2>
            <p className="mt-2 text-small text-fg-2">
              A mock interview is most useful when you have already seen the questions for your
              role. Each guide has model answers and what interviewers listen for.
            </p>
          </div>
          <ul className="flex flex-wrap content-start gap-2 md:col-span-8">
            {GUIDES.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="inline-flex h-10 items-center rounded-full bg-surface px-4 text-small text-fg-2 ring-1 ring-inset ring-border transition-colors duration-fast hover:text-signal-strong hover:ring-border-strong"
                >
                  {g.label} →
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="faq-title" className="mt-14 border-t border-border pt-10">
          <h2 id="faq-title" className="text-h3 font-semibold text-fg">
            Mock interview FAQ
          </h2>
          <div className="mt-6 space-y-3">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                open={i < 2}
                className="group rounded-xl border border-border bg-surface open:shadow-e1"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-fg [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="h-4 w-4 shrink-0 text-fg-3 transition-transform duration-base group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <path d="m4 6 4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </summary>
                <p className="max-w-prose px-5 pb-5 text-body text-fg-2">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </DomainLayout>
  )
}
