import React from 'react'
import { Metadata } from 'next'
import ColdCallSimulator from '@/components/ColdCallSimulator'
import DomainLayout from '@/components/domain/DomainLayout'
import Link from 'next/link'
import {
  Crumbs,
  Faq,
  SectionHead,
  container,
  kicker,
  link,
} from '@/components/interviewQuestions/ui'

const URL = 'https://www.autointerviewai.com/cold-call-practice'
const TITLE = 'Cold Call Practice: Free Objection Handling Drill'
const DESC =
  'Practise four common cold call objections (competitor, "send me an email", budget freeze, "not interested"). Type or speak your reply and get a rule-based check. Free, no sign-up.'
const TTAI =
  'https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=tool&utm_campaign=cold-call-practice'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: URL,
    siteName: 'Auto Interview AI',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Cold call practice drill',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

const STEPS = [
  {
    n: '1',
    t: 'Acknowledge',
    d: 'Agree that their position is reasonable. No arguing, no apology.',
    say: '“Totally fair, most teams I call already have something in place.”',
  },
  {
    n: '2',
    t: 'Lower the stakes',
    d: 'Make clear you are not asking them to switch or buy today.',
    say: '“I’m not asking you to rip anything out.”',
  },
  {
    n: '3',
    t: 'Ask one open question',
    d: 'Probe a specific pain the prospect may have, then stop talking.',
    say: '“When your reps follow up after a demo, what slows them down?”',
  },
]

const FAQS = [
  {
    q: 'Can I practise cold calling online for free?',
    a: 'Yes. Pick one of the four objections on this page, type your reply or speak it (your browser turns speech into text), and the page checks it. Nothing is sent to an AI and nothing is saved.',
  },
  {
    q: 'How does the score work?',
    a: 'It is a simple rule-based check, not a judgement of a real call: reply length, whether you used the words that fit the scenario, filler words such as "just" or "basically", and whether you end with a question. Use it as a nudge, then practise with a live voice roleplay.',
  },
  {
    q: 'What is the best way to handle "We already use a competitor"?',
    a: 'Acknowledge it, make clear you are not asking them to switch today, and ask one open question about a gap their current tool might leave. The goal of the call is a next conversation, not a sale.',
  },
  {
    q: 'Where can I practise a full cold call out loud?',
    a: 'Tough Tongue AI (our product) runs voice roleplays where an AI buyer pushes back and you answer out loud, with feedback after the call.',
  },
]

export default function ColdCallPracticePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'Cold call practice drill',
        url: URL,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'All',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        description: DESC,
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  const related = [
    {
      href: '/blog/ai-roleplay-objection-handling-scripts-scenarios-results-2026',
      t: 'Objection handling: 20 answers and a free checker',
    },
    {
      href: '/blog/b2b-cold-call-script-templates-modern-frameworks-2026',
      t: 'B2B cold call script templates',
    },
    {
      href: '/blog/hinglish-sales-roleplay-scripts-india-2026',
      t: 'Hinglish sales roleplay: 15 Indian objections',
    },
    {
      href: '/blog/top-5-ai-tools-real-time-objection-handling-2026',
      t: 'AI tools for objection handling practice',
    },
    { href: '/ai-sales-training', t: 'AI sales training: what the tools do' },
    { href: '/ai-calling-roi-calculator', t: 'AI calling cost calculator' },
  ]

  return (
    <DomainLayout currentPath="/cold-call-practice">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="bg-bg text-fg">
        <div className={`${container} pb-10 pt-8 md:pt-12`}>
          <Crumbs items={[{ label: 'Home', href: '/' }, { label: 'Cold call practice' }]} />
          <header className="mt-8 max-w-3xl">
            <div className={`${kicker} text-signal-strong`}>
              Free drill · 4 objections · type or speak · no AI, no sign-up
            </div>
            <h1 className="mt-4 font-serif text-h1 font-medium text-fg md:text-display">
              Cold call practice: answer the objection out loud
            </h1>
            <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
              Pick the pushback you dread, say or type your reply, and see a quick check of what you
              did. Then compare it with a sample answer.
            </p>
          </header>
        </div>

        <section aria-label="Practice drill" className="pb-14 md:pb-20">
          <div className={container}>
            <ColdCallSimulator />
          </div>
        </section>

        <section aria-labelledby="add-title" className="border-t border-border py-14 md:py-20">
          <div className={container}>
            <SectionHead
              id="add-title"
              k="Method · 3 steps"
              title="How to answer a reflex objection in three steps"
              sub="Prospects often say “we already use someone” or “just send an email” before they have heard anything. Two common mistakes: hanging up, or launching into a product pitch."
            />
            <ol className="mt-8 grid gap-3 md:grid-cols-3">
              {STEPS.map((st) => (
                <li key={st.n} className="rounded-xl border border-border bg-surface p-5 md:p-6">
                  <span className="font-mono text-caption font-semibold text-signal-strong">
                    Step {st.n}
                  </span>
                  <h3 className="mt-2 text-h4 font-semibold text-fg">{st.t}</h3>
                  <p className="mt-2 text-small text-fg-2">{st.d}</p>
                  <p className="mt-3 border-t border-border pt-3 font-serif text-body italic text-fg">
                    {st.say}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section aria-labelledby="faq-title" className="border-t border-border py-14 md:py-20">
          <div className={container}>
            <div className="max-w-3xl">
              <h2 id="faq-title" className="text-h2 font-semibold text-fg">
                Questions people ask
              </h2>
              <div className="mt-6">
                <Faq faqs={FAQS} />
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="rel-title" className="border-t border-border py-14 md:py-20">
          <div className={container}>
            <h2 id="rel-title" className="text-h2 font-semibold text-fg">
              Keep going
            </h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <li key={r.href}>
                  <Link
                    href={r.href}
                    className="group block h-full rounded-xl border border-border bg-surface p-5 font-medium text-fg transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:text-signal-strong hover:shadow-e2"
                  >
                    {r.t} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section aria-labelledby="ttai-title" className="border-t border-border py-14 md:py-20">
          <div className={container}>
            <div className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 shadow-e1 md:flex-row md:items-center md:justify-between md:p-10">
              <div className="max-w-2xl">
                <div className={`${kicker} text-signal-strong`}>Our product · Tough Tongue AI</div>
                <h2 id="ttai-title" className="mt-3 font-serif text-h2 font-medium text-fg">
                  Practise the whole call with a buyer who pushes back.
                </h2>
                <p className="mt-3 text-body text-fg-2">
                  Tough Tongue AI runs voice roleplays: an AI prospect raises objections, you answer
                  out loud, and you get feedback after the call. Teams can build their own
                  scenarios. See also{' '}
                  <Link href="/free-mock-interview" className={link}>
                    the free mock interview
                  </Link>{' '}
                  if you are preparing for an SDR job.
                </p>
              </div>
              <a
                href={TTAI}
                className="inline-flex h-12 shrink-0 items-center justify-center rounded-full bg-signal px-6 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong"
              >
                Try a sales roleplay
              </a>
            </div>
          </div>
        </section>
      </div>
    </DomainLayout>
  )
}
