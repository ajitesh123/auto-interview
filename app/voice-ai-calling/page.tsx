import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { allBlogs } from 'contentlayer/generated'
import { CostCalculator, LatencyBudget } from '@/components/voiceAi/VoiceCalculators'
import {
  ALL_IN,
  DEFAULTS,
  CHARS_PER_MIN_OF_SPEECH,
  LATENCY_TWILIO,
  HUMAN_GAP_MS,
  HUMAN_GAP_SOURCE,
  PRICES_CHECKED,
  costBreakdown,
} from '@/data/voiceAiPricing'

const PAGE_URL = 'https://www.autointerviewai.com/voice-ai-calling'
const UPDATED = '2026-11-05'
const TITLE = 'Voice AI Calling (2026): Latency, Cost per Minute, Laws'
const DESC =
  'How AI phone calls work, with a latency budget that adds up (1,115 ms target), a cost-per-minute calculator on official list prices, and the US, India and EU rules.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: PAGE_URL,
    siteName: 'Auto Interview AI',
    type: 'article',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/voice-ai-calling/og.webp',
        width: 1200,
        height: 630,
        alt: 'A voice AI turn should land in about 1.1 seconds and a DIY stack costs about 4.5 cents a minute',
      },
    ],
  },
  twitter: { card: 'summary_large_image', title: TITLE, description: DESC },
}

const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const link =
  'font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'

/* ---------- Posts ---------- */

type Post = { slug: string; title: string; date: string }

const VOICE_RE =
  /voice|ai call|calling|telephon|\bsip\b|latency|speech|\btts\b|\bstt\b|\bivr\b|dialer|receptionist|vapi|retell|bland|deepgram|elevenlabs|cartesia|livekit|pipecat|turn detection|turn-taking|\bvad\b|answering machine/i
const NOT_VOICE_RE =
  /roleplay|sales training|sales coach|coaching|onboarding|scoring rubric|script template|hackathon|recordings for training|avoma|series b/i

function cleanTitle(t: string) {
  return t.replace(/\s*\((?:19|20)\d\d[^)]*\)\s*$/, '').replace(/\s+in 20\d\d$/, '')
}

const POSTS: Post[] = allBlogs
  .filter((p) => !p.draft && VOICE_RE.test(p.title) && !NOT_VOICE_RE.test(p.title))
  .map((p) => ({ slug: p.slug, title: p.title, date: p.date }))
  .sort((a, b) => a.title.localeCompare(b.title))

const BY_SLUG = new Map(allBlogs.filter((p) => !p.draft).map((p) => [p.slug, p.title]))

const GROUPS: { id: string; label: string; re: RegExp }[] = [
  {
    id: 'law',
    label: 'Laws and compliance',
    re: /complian|tcpa|trai|\bdlt\b|gdpr|\blaws?\b|legal|regulat|hipaa|pci|dpdp|acma|pipeda|tdra|security|redact/i,
  },
  { id: 'cost', label: 'Pricing and cost', re: /pric|cost|\broi\b|bill|quote/i },
  {
    id: 'infra',
    label: 'Infrastructure: STT, TTS, LLMs, telephony, latency',
    re: /\bstt\b|\btts\b|speech|latency|turn|\bvad\b|\bsip\b|webrtc|architect|cascade|voice-to-voice|pipeline|\basr\b|\bwer\b|noise|echo|8khz|async|event loop|models?\b|\bllms?\b|deepgram|whisper|cartesia|elevenlabs|livekit|pipecat|\brag\b|memory|observab|concurren|python|build|stack|works|work\?|realtime|live\b|gemini|gpt|sarvam|gnani|sim card|scale|deploy|detect|transfer|guardrail|hallucinat|script|prompt|spelling|vocables|sound|emotion|clone|failure|debug|disconnect|tool calling|react pattern|talker|glossary|terms|history|timeline/i,
  },
  {
    id: 'compare',
    label: 'Compare and choose a platform',
    re: /\bvs\.?\b|best|top \d|top ai|alternativ|compar|choose|buyer|evaluat|ranked|recommend/i,
  },
  {
    id: 'use',
    label: 'Use cases by industry',
    re: /\bfor\b|use case|appointment|receptionist|collection|recruit|real estate|dental|insurance|logistic/i,
  },
]

function groupOf(title: string) {
  return GROUPS.find((g) => g.re.test(title))?.id ?? 'sales'
}

const LIBRARY = [
  ...GROUPS,
  { id: 'sales', label: 'Strategy, outbound and sales teams', re: /./ },
].map((g) => ({
  ...g,
  posts: POSTS.filter((p) => groupOf(p.title) === g.id),
}))

function PostLinks({ slugs }: { slugs: string[] }) {
  const items = slugs.filter((s) => BY_SLUG.has(s))
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {items.map((s) => (
        <li key={s}>
          <Link
            href={`/blog/${s}`}
            className="flex h-full items-start gap-2 rounded-lg border border-border bg-surface px-4 py-3 text-small text-fg transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
          >
            <span aria-hidden="true" className="mt-0.5 text-signal-strong">
              →
            </span>
            <span>{cleanTitle(BY_SLUG.get(s) as string)}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}

/* ---------- Layout helpers ---------- */

const SECTIONS = [
  { id: 'how', label: 'How it works' },
  { id: 'latency', label: 'Latency' },
  { id: 'cost', label: 'Cost' },
  { id: 'laws', label: 'Laws' },
  { id: 'choose', label: 'Build or buy' },
  { id: 'library', label: 'All guides' },
  { id: 'faq', label: 'FAQ' },
]

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
      className="scroll-mt-32 border-t border-border py-14 md:py-20"
    >
      <header className="max-w-2xl">
        <div className={`${kicker} text-signal-strong`}>{meta}</div>
        <h2 id={`${id}-t`} className="mt-3 text-h2 font-semibold text-fg">
          {title}
        </h2>
        {intro && <p className="mt-3 text-body-lg text-fg-2">{intro}</p>}
      </header>
      <div className="mt-8 space-y-10">{children}</div>
    </section>
  )
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-h3 font-semibold text-fg">{children}</h3>
}

function P({ children }: { children: ReactNode }) {
  return <p className="max-w-prose text-body text-fg-2 md:text-prose">{children}</p>
}

function Src({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" className={link}>
      {children}
    </a>
  )
}

function Table({
  label,
  caption,
  head,
  rows,
}: {
  label: string
  caption: ReactNode
  head: string[]
  rows: ReactNode[][]
}) {
  return (
    <figure>
      {/* Scrollable table region must be keyboard-focusable (WCAG 2.1.1). */}
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label={label}
        className="overflow-x-auto rounded-xl border border-border bg-surface"
      >
        <table className="w-full min-w-[640px] text-left text-small tabular-nums">
          <thead className="bg-muted text-fg-2">
            <tr>
              {head.map((h, i) => (
                <th
                  key={h}
                  scope="col"
                  className={`px-4 py-3 font-medium ${i === 0 ? 'sticky left-0 bg-muted' : ''}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r, ri) => (
              <tr key={ri}>
                {r.map((c, ci) =>
                  ci === 0 ? (
                    <th
                      key={ci}
                      scope="row"
                      className="sticky left-0 bg-surface px-4 py-3 font-medium text-fg"
                    >
                      {c}
                    </th>
                  ) : (
                    <td key={ci} className="px-4 py-3 align-top text-fg-2">
                      {c}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-2 flex justify-between gap-4 text-caption text-fg-3">
        <span>{caption}</span>
        <span className="shrink-0 md:hidden">Swipe →</span>
      </figcaption>
    </figure>
  )
}

function Ticks({ items }: { items: ReactNode[] }) {
  return (
    <ul className="max-w-prose space-y-2.5">
      {items.map((it, i) => (
        <li key={i} className="flex gap-3 text-body text-fg-2">
          <span
            aria-hidden="true"
            className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  )
}

/* ---------- Numbers (computed from the sourced price file) ---------- */

const b = costBreakdown(DEFAULTS)
// Round half up on a cleaned float so table lines add up to the total shown.
const f4 = (n: number) => `$${(Math.round(Number((n * 1e4).toPrecision(12))) / 1e4).toFixed(4)}`
const vapiTotal = b.total + 0.05
const NETWORK = LATENCY_TWILIO.mouthToEar - LATENCY_TWILIO.platformTurnGap
const HOPS =
  LATENCY_TWILIO.platformTurnGap - LATENCY_TWILIO.stt - LATENCY_TWILIO.llm - LATENCY_TWILIO.tts
const fmtDate = (d: string) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  })

const FAQ = [
  {
    q: 'How much does an AI phone call cost per minute?',
    a: `On official list prices checked ${fmtDate(PRICES_CHECKED)}, a self-hosted US stack (Twilio + Deepgram Nova-3 + gemini-3.8-flash + ElevenLabs Flash) costs about ${f4(b.total)} a minute. Adding Vapi's $0.05 hosting fee makes it about ${f4(vapiTotal)}. All-in platforms we checked list $0.07 to $0.11 a minute.`,
  },
  {
    q: 'How fast does a voice AI agent need to reply?',
    a: `Twilio's published target is a 1,115 ms mouth-to-ear turn gap, with 1,400 ms as the upper limit. People in conversation reply in about ${HUMAN_GAP_MS} ms on average (Stivers et al., 2009), so every component you shave matters.`,
  },
  {
    q: 'Is it legal to make AI calls in the US?',
    a: 'Yes, with consent. The FCC ruled on 8 Feb 2024 (FCC-24-17) that AI-generated voices count as "artificial" voices under the TCPA, so these calls need the prior express consent of the person called. This is not legal advice.',
  },
  {
    q: 'Which numbers must AI sales calls use in India?',
    a: "TRAI's amended rules (PIB, 12 Feb 2025) put promotional calls on the 140 series and transactional or service calls on the 1600 series, and stop senders using normal 10-digit numbers for telemarketing.",
  },
  {
    q: 'Should I build my own voice agent or buy a platform?',
    a: 'Build when calls are your core product and you have engineers to own latency, scaling and compliance. Buy when you need agents live in days. The checklist on this page lists the 8 things to test either way.',
  },
]

export default function VoiceAiCallingPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: TITLE,
      description: DESC,
      url: PAGE_URL,
      mainEntityOfPage: PAGE_URL,
      datePublished: UPDATED,
      dateModified: UPDATED,
      image: 'https://www.autointerviewai.com/static/images/voice-ai-calling/og.webp',
      author: {
        '@type': 'Person',
        name: 'Ajitesh Abhishek',
        url: 'https://www.autointerviewai.com/about',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Auto Interview AI',
        url: 'https://www.autointerviewai.com',
        parentOrganization: {
          '@type': 'Organization',
          name: 'Tough Tongue AI',
          url: 'https://www.toughtongueai.com',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.autointerviewai.com' },
        { '@type': 'ListItem', position: 2, name: 'Voice AI calling', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Voice AI cost-per-minute and latency calculator',
      url: `${PAGE_URL}#cost`,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
  ]

  return (
    <div className="bg-bg text-fg">
      {schema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      {/* ---------- Hero ---------- */}
      <div className={`${container} pb-10 pt-8 md:pb-14 md:pt-12`}>
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-caption text-fg-3">
          <Link href="/" className="hover:text-fg">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-fg-2">Voice AI calling</span>
        </nav>

        <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className={`${kicker} text-signal-strong`}>
              Free guide · 2 calculators · {POSTS.length} guides · Updated {fmtDate(UPDATED)}
            </div>
            <h1 className="mt-4 font-serif text-display font-medium text-fg">
              Voice AI calling: how it works, what it costs, what the law says
            </h1>
            <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
              An AI phone call is a loop: speech-to-text hears the caller, an LLM decides the reply,
              and text-to-speech speaks it down a phone line. A good loop answers in about 1.1
              seconds. On today’s list prices, a self-hosted US stack costs about {f4(b.total)} a
              minute before any platform fee.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#cost"
                className="inline-flex h-11 items-center rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong"
              >
                Price your stack
              </a>
              <a
                href="#latency"
                className="inline-flex h-11 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
              >
                Check your latency
              </a>
            </div>
          </div>

          <aside
            aria-label="Voice AI calling at a glance"
            className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
          >
            <div className={`${kicker} text-fg-3`}>At a glance · sources linked below</div>
            <dl className="mt-4 divide-y divide-border">
              {[
                ['Turn-gap target', '1,115 ms', 'Twilio, Nov 2025 (upper limit 1,400 ms)'],
                ['Humans reply in', `${HUMAN_GAP_MS} ms`, 'Average gap, 10 languages (PNAS 2009)'],
                [
                  'Self-hosted US stack',
                  `${f4(b.total)}/min`,
                  `List prices, checked ${fmtDate(PRICES_CHECKED)}`,
                ],
                ['All-in platforms', '$0.07–$0.11/min', 'Retell and Tough Tongue AI list prices'],
              ].map(([k, v, s]) => (
                <div key={k} className="grid grid-cols-[120px_1fr] gap-3 py-3">
                  <dt className="text-small text-fg-3">{k}</dt>
                  <dd>
                    <div className="text-small font-semibold tabular-nums text-fg">{v}</div>
                    <div className="text-caption text-fg-2">{s}</div>
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </header>

        <div className="mt-10 max-w-3xl rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
          <div className={`${kicker} text-signal-ink`}>TL;DR</div>
          <ul className="mt-3 space-y-2 text-body text-fg">
            <li>
              <strong className="font-semibold">Latency is the product.</strong> Speech-to-text, the
              LLM’s first token and the first audio byte take 825 of Twilio’s 1,115 ms target.
              Service hops and the phone network take the other 290 ms.
            </li>
            <li>
              <strong className="font-semibold">Voice is the biggest cost line.</strong> On our
              defaults, text-to-speech is {Math.round((b.tts / b.total) * 100)}% of the per-minute
              cost and the phone line is {Math.round((b.tel / b.total) * 100)}%. The LLM is{' '}
              {Math.round((b.llm / b.total) * 100)}%.
            </li>
            <li>
              <strong className="font-semibold">Consent first.</strong> AI voices are “artificial”
              under the US TCPA, India requires 140/1600 numbers for commercial calls, and the EU
              now requires telling people they are talking to an AI.
            </li>
          </ul>
        </div>
      </div>

      {/* ---------- In-page nav ---------- */}
      <nav aria-label="On this page" className="sticky top-16 z-40 border-y border-border bg-bg/95">
        <div className={`${container} flex gap-1 overflow-x-auto py-2`}>
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex h-9 shrink-0 items-center rounded-full px-3 text-small text-fg-2 hover:bg-muted hover:text-fg"
            >
              {s.label}
            </a>
          ))}
        </div>
      </nav>

      <div className={container}>
        {/* ---------- How ---------- */}
        <Section
          id="how"
          meta="Step 1 · 2 min"
          title="How a voice AI call works"
          intro="Four services run in a loop on every turn. Each one adds milliseconds and cents, so the table shows both."
        >
          <Table
            label="Voice AI pipeline: latency and cost per stage"
            caption={
              <>
                Latency: <Src href={LATENCY_TWILIO.source}>Twilio core latency guide</Src> (median
                targets). Cost: official list prices, our defaults below. Checked{' '}
                {fmtDate(PRICES_CHECKED)}.
              </>
            }
            head={['Stage', 'What it does', 'Latency target', 'Example list price / call min']}
            rows={[
              [
                'Phone line',
                'Carries 8 kHz audio over SIP or the phone network',
                `${NETWORK} ms (with buffering)`,
                `${f4(b.tel)} · Twilio US outbound`,
              ],
              [
                'Speech-to-text',
                'Streams the caller’s words and decides they have finished',
                `${LATENCY_TWILIO.stt} ms`,
                `${f4(b.stt)} · Deepgram Nova-3`,
              ],
              [
                'LLM',
                'Reads the prompt and history, writes the reply',
                `${LATENCY_TWILIO.llm} ms to first token`,
                `${f4(b.llm)} · gemini-3.8-flash`,
              ],
              [
                'Text-to-speech',
                'Turns the reply into audio, streaming',
                `${LATENCY_TWILIO.tts} ms to first byte`,
                `${f4(b.tts)} · ElevenLabs Flash`,
              ],
              [
                'Orchestration',
                'Glue between the services',
                `${HOPS} ms of hops`,
                '$0 self-hosted, $0.05 on Vapi',
              ],
            ]}
          />
          <div className="space-y-4">
            <H3>Cascade or speech-to-speech?</H3>
            <P>
              The table describes a cascade: three separate models. Speech-to-speech models such as
              OpenAI’s realtime models and Gemini Live hear audio and answer in audio, which removes
              two hand-offs. The trade is control: a cascade lets you swap any part, log the
              transcript and pick a cheaper voice.
            </P>
          </div>
          <PostLinks
            slugs={[
              'how-does-voice-ai-work-explained-2026',
              'ai-calling-architecture-sip-llm-tts-stt-explained-2026',
              'cascade-vs-voice-to-voice-which-architecture-is-better-2026',
              'best-stt-speech-to-text-models-voice-agents-2026',
              'best-tts-text-to-speech-models-voice-agents-2026',
              'how-to-choose-sip-trunk-provider-ai-voice-agents-2026',
            ]}
          />
        </Section>

        {/* ---------- Latency ---------- */}
        <Section
          id="latency"
          meta="Step 2 · Tool · 2 min"
          title="Build a latency budget that adds up"
          intro={
            <>
              People reply in about {HUMAN_GAP_MS} ms on average, across 10 languages (
              <Src href={HUMAN_GAP_SOURCE}>Stivers et al., PNAS 2009</Src>). An AI turn will be
              slower, so set a budget and spend it on purpose. Start from Twilio’s targets, then
              enter your own measurements.
            </>
          }
        >
          <LatencyBudget />
          <div className="space-y-4">
            <H3>Where the milliseconds usually go</H3>
            <Ticks
              items={[
                <>
                  <strong className="font-semibold text-fg">Endpointing.</strong> Deciding the
                  caller has finished. Twilio notes fixed end-of-turn defaults are often set around
                  500 ms, which can eat half the budget on its own. Semantic turn detection cuts it.
                </>,
                <>
                  <strong className="font-semibold text-fg">Long prompts.</strong> Time to first
                  token grows with the context you send each turn. Trim history and cache the system
                  prompt.
                </>,
                <>
                  <strong className="font-semibold text-fg">Distance.</strong> ITU-T G.114 says
                  one-way delay under 150 ms feels “essentially transparent” (
                  <Src href="https://www.itu.int/rec/T-REC-G.114/index.html">ITU-T G.114</Src>). Put
                  your models in the same region as your phone carrier.
                </>,
              ]}
            />
          </div>
          <PostLinks
            slugs={[
              'solving-end-of-turn-detection-voice-ai-agent-2026',
              'voice-activity-detection-vad-end-of-turn-tuning-2026',
              'global-ai-calling-latency-report-us-eu-apac-2026',
              'how-to-test-measure-ai-calling-audio-quality-latency-2026',
            ]}
          />
        </Section>

        {/* ---------- Cost ---------- */}
        <Section
          id="cost"
          meta="Step 3 · Tool · 3 min"
          title="What a voice AI minute costs"
          intro="Pick a vendor for each part. Every price is the vendor’s own pay-as-you-go list price, with the source under each menu."
        >
          <CostCalculator />

          <div className="space-y-4">
            <H3>The worked example, line by line</H3>
            <P>
              Our defaults: the agent speaks for {Math.round(DEFAULTS.agentTalkShare * 100)}% of the
              call and replies {DEFAULTS.turnsPerMin} times a minute. Each reply sends{' '}
              {DEFAULTS.inputTokensPerTurn.toLocaleString('en-US')} input tokens and writes{' '}
              {DEFAULTS.outputTokensPerTurn}. Speech runs at {CHARS_PER_MIN_OF_SPEECH} characters a
              minute, the top of Cartesia’s stated 750–800 range. These are assumptions; change them
              in the calculator.
            </P>
            <Table
              label="Worked cost per minute for a self-hosted US stack"
              caption={
                <>
                  List prices checked {fmtDate(PRICES_CHECKED)}. Sources are under each calculator
                  menu.
                </>
              }
              head={['Line', 'Maths', 'Per call minute']}
              rows={[
                ['Twilio US outbound', '$0.0140 × 1 min', f4(b.tel)],
                ['Deepgram Nova-3', '$0.0077 × 1 min', f4(b.stt)],
                ['gemini-3.8-flash', `6 × 1,500 × $0.75/1M + 6 × 40 × $3.75/1M`, f4(b.llm)],
                ['ElevenLabs Flash', `800 chars × 50% × $0.04/1K`, f4(b.tts)],
                [
                  'Total, self-hosted',
                  'Sum of the four lines',
                  <strong key="t" className="text-fg">
                    {f4(b.total)}
                  </strong>,
                ],
                ['Total on Vapi', `${f4(b.total)} + $0.05 hosting`, f4(vapiTotal)],
              ]}
            />
            <P>
              Google lists gemini-3.8-flash at double the price from 1 Jan 2027, which would lift
              the LLM line to {f4(b.llm * 2)}. In India, Plivo charges ₹0.38 a minute for domestic
              calls in 30-second pulses (<Src href="https://plivo.com/voice/pricing/in/">Plivo</Src>
              ), so a 40-second call bills as 60 seconds.
            </P>
          </div>

          <div className="space-y-4">
            <H3>All-in platform prices</H3>
            <Table
              label="All-in voice AI platform prices per minute"
              caption={
                <>
                  Tough Tongue AI runs this site and is our product, so we have a conflict of
                  interest. Its prices are shown exactly as listed. Checked{' '}
                  {fmtDate(PRICES_CHECKED)}.
                </>
              }
              head={['Option', 'Per minute', 'How it adds up', 'Source']}
              rows={[
                [
                  'Self-hosted stack (above)',
                  f4(b.total),
                  'Four services, no platform fee',
                  'This page',
                ],
                [
                  'Vapi + the same stack',
                  f4(vapiTotal),
                  '$0.05 hosting + providers at cost',
                  <Src key="v" href="https://vapi.ai/pricing">
                    vapi.ai
                  </Src>,
                ],
                ...ALL_IN.map((r) => [
                  r.name,
                  `$${r.perMin.toFixed((String(r.perMin).split('.')[1] ?? '').length > 2 ? 4 : 2)}`,
                  r.how,
                  <Src key={r.name} href={r.source}>
                    {new URL(r.source).hostname.replace('www.', '')}
                  </Src>,
                ]),
              ]}
            />
            <P>
              For the business case, use the{' '}
              <Link href="/ai-calling-roi-calculator" className={link}>
                AI calling ROI calculator
              </Link>
              . It compares these costs with the cost of a human caller.
            </P>
          </div>
          <PostLinks
            slugs={[
              'how-much-does-an-ai-voice-agent-cost-per-minute-2026',
              'real-cost-ai-voice-agents-pricing-breakdown-2026',
              'transparent-ai-calling-pricing-enterprise-quotes-2026',
              'ai-calling-pricing-breakdown-what-it-really-costs-2026',
            ]}
          />
        </Section>

        {/* ---------- Laws ---------- */}
        <Section
          id="laws"
          meta="Step 4 · 3 min"
          title="The rules that apply to AI calls"
          intro="Consent and disclosure are the common thread. These are the rules most teams hit first. This is a summary, not legal advice."
        >
          <Table
            label="AI calling rules by region"
            caption="Each rule links to the regulator or the official text."
            head={['Region', 'Rule', 'What it means for an AI call']}
            rows={[
              [
                'United States',
                <Src key="us" href="https://www.fcc.gov/node/261899">
                  FCC-24-17, released 8 Feb 2024
                </Src>,
                'AI-generated voices are “artificial” voices under the TCPA, so calls need the prior express consent of the person called.',
              ],
              [
                'India',
                <Src
                  key="in"
                  href="https://www.pib.gov.in/PressReleasePage.aspx?PRID=2102413&reg=48&lang=2"
                >
                  TRAI TCCCPR amendments, 12 Feb 2025
                </Src>,
                'Promotional calls use 140-series numbers; transactional and service calls use 1600. No normal 10-digit numbers for telemarketing. A first violation bars outgoing service for 15 days.',
              ],
              [
                'India',
                <Src
                  key="in2"
                  href="https://www.trai.gov.in/sites/default/files/2026-07/PR_No91of2026.pdf"
                >
                  TRAI press release 91/2026
                </Src>,
                'Banks and other financial firms must call existing customers from 1600-series numbers.',
              ],
              [
                'India',
                <Src
                  key="in3"
                  href="https://www.pib.gov.in/PressNoteDetails.aspx?NoteId=156054&ModuleId=3&reg=3&lang=2"
                >
                  DPDP Rules, notified 14 Nov 2025
                </Src>,
                'An 18-month phased rollout. Notice and consent duties for call recordings and transcripts are in the final phase (May 2027, per AZB & Partners).',
              ],
              [
                'European Union',
                <Src key="eu" href="https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50">
                  AI Act Article 50(1)
                </Src>,
                'People must be told they are interacting with an AI system unless it is obvious. In force from 2 Aug 2026.',
              ],
            ]}
          />
          <PostLinks
            slugs={[
              'ai-calling-usa-tcpa-fcc-stir-shaken-compliance-guide-2026',
              'trai-140-series-dlt-regulations-ai-calling-india-2026',
              'ai-calling-india-dpdp-trai-dlt-compliance-complete-guide-2026',
              'ai-voice-agents-dubai-uae-arabic-dialect-tdra-compliance-2026',
              'ai-calling-regulations-australia-acma-dncr-2026',
              'ai-calling-in-germany-gdpr-compliance-local-language-2026',
            ]}
          />
        </Section>

        {/* ---------- Choose ---------- */}
        <Section
          id="choose"
          meta="Step 5 · Checklist · 3 min"
          title="Build or buy: test these 8 things first"
          intro="Build when calls are your product and you have engineers to own latency and scale. Buy when you need agents live this month. Either way, run every candidate through this list on a real phone line."
        >
          <ol className="max-w-prose space-y-3">
            {[
              [
                'Turn gap on a real call',
                'Measure p50 and p95 mouth-to-ear on a mobile network, not a browser demo. Compare with 1,115 ms.',
              ],
              [
                'Barge-in',
                'Talk over the agent mid-sentence. It should stop within a beat and keep the context.',
              ],
              [
                'Voicemail and IVR detection',
                'Call a voicemail box and a phone menu. The agent should not pitch a machine.',
              ],
              ['Warm transfer', 'Hand off to a human with a summary, without dropping the caller.'],
              [
                'Billing increment',
                'Per second, per minute or 30-second pulses. It changes the cost of short calls.',
              ],
              [
                'Consent and disclosure',
                'Where consent is stored, how the AI disclosure is spoken, and how opt-outs are honoured.',
              ],
              [
                'Data location and retention',
                'Where audio and transcripts live, for how long, and whether you can delete them.',
              ],
              [
                'Languages and accents',
                'Test your real callers: Hinglish, regional accents, background noise, 8 kHz audio.',
              ],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-4 rounded-xl border border-border bg-surface p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-caption font-semibold tabular-nums text-fg">
                  {i + 1}
                </span>
                <span>
                  <span className="block text-body font-semibold text-fg">{t}</span>
                  <span className="mt-0.5 block text-small text-fg-2">{d}</span>
                </span>
              </li>
            ))}
          </ol>
          <PostLinks
            slugs={[
              'buy-vs-build-ai-calling-decision-framework-founders-2026',
              'how-to-choose-ai-calling-platform-buyers-checklist-2026',
              'build-your-first-real-time-voice-ai-agent-python-2026',
              'how-answering-machine-detection-amd-works-voice-ai-2026',
              'can-ai-voice-agent-transfer-calls-to-human-2026',
              'ai-calling-use-cases-by-industry-complete-guide-2026',
            ]}
          />
        </Section>

        {/* ---------- Library ---------- */}
        <Section
          id="library"
          meta={`Library · ${POSTS.length} guides`}
          title="Every voice AI guide on this site"
          intro="Grouped by the question they answer. Open a group to see every guide in it."
        >
          <div className="space-y-3">
            {LIBRARY.filter((g) => g.posts.length > 0).map((g) => (
              <details
                key={g.id}
                className="group rounded-xl border border-border bg-surface open:shadow-e1"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-body font-medium text-fg">
                  <span>
                    {g.label}{' '}
                    <span className="ml-1 text-small font-normal text-fg-3">{g.posts.length}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-fg-3 transition-transform duration-base group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <ul className="grid gap-x-6 gap-y-2 px-5 pb-5 sm:grid-cols-2">
                  {g.posts.map((p) => (
                    <li key={p.slug}>
                      <Link
                        href={`/blog/${p.slug}`}
                        className="text-small text-fg-2 hover:text-signal-strong"
                      >
                        {cleanTitle(p.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </Section>

        {/* ---------- FAQ ---------- */}
        <Section id="faq" meta="FAQ · 5 questions" title="Quick answers">
          <div className="max-w-3xl space-y-3">
            {FAQ.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group rounded-xl border border-border bg-surface open:shadow-e1"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-fg">
                  <h3 className="text-body font-medium">{f.q}</h3>
                  <span
                    aria-hidden="true"
                    className="text-fg-3 transition-transform duration-base group-open:rotate-180"
                  >
                    ▾
                  </span>
                </summary>
                <p className="max-w-prose px-5 pb-5 text-body text-fg-2">{f.a}</p>
              </details>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ['/ai-calling-roi-calculator', 'Tool', 'AI calling ROI calculator'],
              ['/ai-sales-training', 'Guide', 'AI sales training and roleplay'],
              ['/cold-call-practice', 'Practice', 'Cold call practice with an AI buyer'],
            ].map(([href, k, t]) => (
              <Link
                key={href}
                href={href}
                className="rounded-xl border border-border bg-surface px-5 py-4 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
              >
                <span className={`block ${kicker} text-fg-3`}>Up next · {k}</span>
                <span className="mt-1 block text-h4 font-semibold text-fg">{t}</span>
              </Link>
            ))}
          </div>
        </Section>
      </div>

      {/* ---------- CTA band (ink, once) ---------- */}
      <section className="bg-ink py-16 text-ink-fg md:py-20">
        <div className={container}>
          <div className={`${kicker} text-signal-on-ink`}>
            Tough Tongue AI · our product · 25 free minutes
          </div>
          <h2 className="mt-3 max-w-2xl font-serif text-h1 font-medium text-ink-fg">
            Hear a voice agent before you build one.
          </h2>
          <p className="mt-3 max-w-[56ch] text-body-lg text-ink-fg-2">
            Set up a calling agent without code and test the turn gap on your own phone. The free
            plan includes 25 one-time minutes.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://www.toughtongueai.com/pricing"
              className="inline-flex h-11 items-center rounded-full bg-white px-5 text-small font-semibold text-ink transition-colors duration-fast hover:bg-white/90"
            >
              See Tough Tongue AI plans
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
