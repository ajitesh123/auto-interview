import { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import CostPerMeeting from '@/components/voiceAi/CostPerMeeting'
import { CostCalculator, LatencyBudget } from '@/components/voiceAi/VoiceCalculators'
import { DIY, EXAMPLE, costPerMeeting } from '@/data/costPerMeeting'
import {
  ALL_IN,
  DEFAULTS,
  LLM,
  PRICES_CHECKED,
  STT,
  TELEPHONY,
  TTS,
  findOpt,
} from '@/data/voiceAiPricing'

const URL = 'https://www.autointerviewai.com/ai-calling-roi-calculator'
const TITLE = 'AI Calling Cost & ROI Calculator: Cost per Minute and per Meeting'
const DESC = `Work out what an AI calling agent costs per minute from vendor list prices (from $${DIY}/min in parts), then cost per booked meeting against human callers, with your own numbers.`

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
        alt: 'AI calling cost and ROI calculator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

const checked = new Date(PRICES_CHECKED + 'T00:00:00Z').toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})
const ex = costPerMeeting(EXAMPLE)
const m2 = (n: number) => `$${n.toFixed(2)}`
const m0 = (n: number) => `$${Math.round(n).toLocaleString('en-US')}`
const hostedMin = Math.min(...ALL_IN.map((a) => a.perMin))
const hostedMax = Math.max(...ALL_IN.map((a) => a.perMin))
const ttaiPro = ALL_IN.find((a) => a.name.includes('Pro plan'))
const parts = [
  findOpt(TELEPHONY, DEFAULTS.telephony).label,
  findOpt(STT, DEFAULTS.stt).label,
  findOpt(LLM, DEFAULTS.llm).label,
  findOpt(TTS, DEFAULTS.tts).label,
]

const FAQ: { q: string; a: string }[] = [
  {
    q: 'How much does an AI calling agent cost per minute?',
    a: `Built from list-price parts and self-hosted, about $${DIY} a minute with our default stack (${parts.join(', ')}), before your own servers and engineering. Hosted platforms charge more because they bundle hosting: Retell's example stack is $${ALL_IN[0].perMin} a minute, and Tough Tongue AI (our product) lists $${ttaiPro?.perMin} a minute on its Pro plan (custom plans for AI calling in India run about ₹3.5 to ₹5 a minute, per the Tough Tongue AI team, 18 Nov 2026). List prices were read on each vendor's page on ${checked}.`,
  },
  {
    q: 'How do I calculate the ROI of AI calling?',
    a: 'Divide what you spend by what you get. Take your dials per month, your connect rate, average talk minutes and meetings per 100 connects. AI cost is talk minutes times the per-minute price; human cost is the number of callers that volume needs times what one caller costs you. Cost per meeting for each is that cost divided by meetings booked. Then add the costs the per-minute price leaves out: set-up, engineering, numbers and call review.',
  },
  {
    q: 'Is AI calling cheaper than human SDRs?',
    a: 'Per minute of talk time, yes, by a wide margin, on any list price we checked. Per meeting booked, it depends on whether the agent books as many meetings per connect as your team does, which nobody can tell you without testing on your own list. Run the same list through both for two weeks and compare meetings, not minutes.',
  },
  {
    q: 'What does the per-minute price leave out?',
    a: 'Phone numbers and their monthly fees, unanswered and voicemail calls if your carrier bills them, set-up and prompt engineering, the time someone spends reviewing calls, CRM and dialer seats, and compliance checks such as do-not-call scrubbing. Some platforms also charge a monthly plan on top of minutes.',
  },
]

const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const link =
  'font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'

function Section({
  id,
  meta,
  title,
  intro,
  children,
}: {
  id: string
  meta: string
  title: string
  intro?: ReactNode
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-t`}
      className="scroll-mt-24 border-t border-border py-12 md:py-16"
    >
      <header className="max-w-2xl">
        <div className={`${kicker} text-signal-strong`}>{meta}</div>
        <h2 id={`${id}-t`} className="mt-3 text-h2 font-semibold text-fg">
          {title}
        </h2>
        {intro && <div className="mt-3 text-body text-fg-2">{intro}</div>}
      </header>
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default function CalculatorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebApplication',
        name: 'AI calling cost and ROI calculator',
        url: URL,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        isAccessibleForFree: true,
        description: DESC,
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    ],
  }

  return (
    <DomainLayout currentPath="/ai-calling-roi-calculator">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="bg-bg text-fg">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
          <header className="max-w-3xl pb-10 pt-10 md:pb-14 md:pt-14">
            <div className={`${kicker} text-signal-strong`}>
              Free calculator · List prices checked {checked} · No sign-up
            </div>
            <h1 className="mt-4 font-serif text-display font-medium text-fg">
              AI calling cost and ROI calculator
            </h1>
            <p className="mt-5 max-w-[60ch] text-body-lg text-fg-2">
              An AI calling agent built from list-price parts costs about{' '}
              <strong className="font-semibold text-fg">${DIY} a minute</strong> before hosting and
              engineering; hosted platforms list ${hostedMin} to ${hostedMax}. At 10,000 dials a
              month with example rates, that is {m2(ex.aiPerMeeting ?? 0)} of talk time per booked
              meeting, against {m0(ex.humanPerMeeting ?? 0)} for {ex.callers} human callers at{' '}
              {m0(EXAMPLE.human)} each. Put in your own numbers below: the gap that matters is
              meetings booked, and only a test on your own list shows it.
            </p>
            <nav aria-label="On this page" className="mt-6 flex flex-wrap gap-2">
              {[
                ['#meeting', 'Cost per meeting'],
                ['#minute', 'Cost per minute'],
                ['#latency', 'Response time'],
                ['#faq', 'FAQ'],
              ].map(([h, l]) => (
                <a
                  key={h}
                  href={h}
                  className="inline-flex h-9 items-center rounded-full bg-surface px-3 text-small text-fg-2 ring-1 ring-inset ring-border hover:bg-muted hover:text-fg"
                >
                  {l}
                </a>
              ))}
            </nav>
          </header>

          <Section
            id="meeting"
            meta="Step 1 · Your numbers · Example values filled in"
            title="Cost per booked meeting: AI agent vs human callers"
            intro={
              <p>
                Replace every example with numbers from your dialer and payroll. The AI line counts
                talk minutes only; the human line counts how many callers that dial volume needs.
              </p>
            }
          >
            <CostPerMeeting />
          </Section>

          <Section
            id="minute"
            meta={`Step 2 · Vendor list prices · Checked ${checked}`}
            title="What one minute of an AI call costs, part by part"
            intro={
              <p>
                Pick a phone line, speech-to-text, model and voice. Each price links to the
                vendor&apos;s own pricing page. For the full vendor tables and laws by country, see
                the{' '}
                <Link href="/voice-ai-calling" className={link}>
                  voice AI calling guide
                </Link>
                .
              </p>
            }
          >
            <CostCalculator />
          </Section>

          <Section
            id="latency"
            meta="Step 3 · Response time · Twilio's published targets"
            title="Will it answer fast enough to sound natural?"
            intro={
              <p>
                Cost is half the decision. Add up how long each part takes before the agent starts
                speaking, and compare it with the targets Twilio publishes.
              </p>
            }
          >
            <LatencyBudget />
          </Section>

          <Section id="faq" meta={`FAQ · ${FAQ.length} questions`} title="Quick answers">
            <div className="max-w-3xl space-y-3">
              {FAQ.map((f, i) => (
                <details
                  key={f.q}
                  open={i === 0}
                  className="group rounded-xl border border-border bg-surface open:shadow-e1"
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-fg">
                    <h3 className="text-body font-medium">{f.q}</h3>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-fg-3 transition-transform duration-base group-open:rotate-180"
                    >
                      ▾
                    </span>
                  </summary>
                  <p className="max-w-prose px-5 pb-5 text-body text-fg-2">{f.a}</p>
                </details>
              ))}
            </div>
          </Section>

          <section
            aria-labelledby="ttai-t"
            className="mb-16 rounded-xl border border-border bg-surface p-6 md:p-8"
          >
            <div className={`${kicker} text-fg-3`}>Our product · Tough Tongue AI</div>
            <h2 id="ttai-t" className="mt-3 text-h3 font-semibold text-fg">
              How Tough Tongue AI does this
            </h2>
            <p className="mt-3 max-w-[64ch] text-body text-fg-2">
              Tough Tongue AI runs voice agents that place and take calls, and sales roleplays that
              let your callers practise objections before the real call. You write the scenario,
              pick a voice and language, and review every call as a transcript with a score. Its
              pricing page lists the Pro plan at $99 a month for 900 minutes; custom plans for AI
              calling in India run about ₹3.5 to ₹5 a minute (Tough Tongue AI team, 18 Nov 2026), so
              ask for a quote at volume.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href="https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=tool&utm_campaign=ai-calling-roi-calculator"
                target="_blank"
                rel="noopener"
                className="inline-flex h-11 items-center rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong"
              >
                See Tough Tongue AI ↗
              </a>
              <Link
                href="/blog/sip-providers-for-ai-calling-complete-guide-2026"
                className="inline-flex h-11 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong hover:bg-muted"
              >
                Choose a phone line (SIP) →
              </Link>
            </div>
          </section>
        </div>
      </div>
    </DomainLayout>
  )
}
