import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import CostPerMeeting from '@/components/voiceAi/CostPerMeeting'
import { Figure, SegmentBar, RangeList, StatRow, RAMP } from '@/components/viz'
import {
  VENDORS as PRACTICE,
  KINDS as PRACTICE_KINDS,
  CHECKED as PRACTICE_CHECKED,
  type RoleplayVendor,
} from '@/data/salesRoleplayData'
import {
  PLATFORMS,
  KIND_LABEL,
  CHECKED as TRAINING_CHECKED,
  type Platform,
} from '@/data/salesTrainingPlatforms'
import {
  VENDORS as CALLING,
  AGENTS_WITH_PRICE,
  CHECKED as CALLING_CHECKED,
  type Vendor,
} from '@/data/aiCallingSalesData'

/*
 * Nov 21 2026 (Part 1): rebuilt from three sourced data files. The old page had a latency column we
 * could not source, a "500 ms biological threshold", invented practices and 122 raw hex colours.
 * Every name, price and count below comes from data/salesRoleplayData.ts,
 * data/salesTrainingPlatforms.ts and data/aiCallingSalesData.ts. Brief:
 * docs/briefs/2026-11-21-ai-sales-training-directory.md
 */

const PAGE_URL = 'https://www.autointerviewai.com/ai-sales-training'
const TT =
  'https://www.toughtongueai.com/?utm_source=autointerviewai&utm_medium=directory&utm_campaign=ai-sales-training'

export const metadata: Metadata = {
  title: 'AI Sales Training & AI Calling Tools Directory (2026)',
  description:
    'Every AI sales roleplay tool, sales training platform and AI calling product we checked, with prices as written on each vendor’s own page, free starts and what each is for.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'AI Sales Training & AI Calling Tools Directory (2026)',
    description:
      'AI practice tools, training platforms and AI calling products, with prices from each vendor’s own page. Tough Tongue AI is our product and is marked.',
    url: PAGE_URL,
    siteName: 'Auto Interview AI',
    type: 'website',
  },
}

/* ---------- Data ---------- */

const TRAINING = PLATFORMS.filter((p) => p.kind !== 'practice')
const practiceSorted = [...PRACTICE].sort((a, b) => Number(!!b.ours) - Number(!!a.ours))
const agents = CALLING.filter((v) => v.kind === 'agent')
const dialers = CALLING.filter((v) => v.kind === 'dialer')

type Status = 'published' | 'free-then-quote' | 'quote'
/** A real self-serve free start: not a money-back guarantee, not a demo. */
const hasFreeStart = (p: Platform) =>
  p.free !== '' && !/money-back|no self-serve free plan/i.test(p.free)
const trainingStatus = (p: Platform): Status =>
  p.published ? 'published' : hasFreeStart(p) ? 'free-then-quote' : 'quote'
const callingStatus = (v: Vendor): Status => (/quote only/i.test(v.stated) ? 'quote' : 'published')

/* Counts: a vendor that appears in two tables (e.g. Mindtickle) is counted once, with its practice-tool facts. */
const inPractice = (name: string) => PRACTICE.some((v) => v.name === name)
const ALL: { name: string; status: Status }[] = [
  ...PRACTICE.map((v) => ({ name: v.name, status: v.priceStatus as Status })),
  ...TRAINING.filter((p) => !inPractice(p.name)).map((p) => ({
    name: p.name,
    status: trainingStatus(p),
  })),
  ...CALLING.map((v) => ({ name: v.name, status: callingStatus(v) })),
].filter((a, i, arr) => arr.findIndex((b) => b.name === a.name) === i)
const TOTAL = ALL.length
const count = (s: Status) => ALL.filter((a) => a.status === s).length
const PUBLISHED = count('published')
const FREE_THEN_QUOTE = count('free-then-quote')
const QUOTE = count('quote')
const FREE_START =
  PRACTICE.filter((v) => v.freeStart !== '').length +
  TRAINING.filter((p) => !inPractice(p.name) && hasFreeStart(p)).length
const OVERLAP = PRACTICE.length + TRAINING.length + CALLING.length - TOTAL
const pct = (n: number) => Math.round((n / TOTAL) * 100)

/** Dollars per minute without rounding away a half cent (Bolna lists 4.5¢). */
const money = (n: number) => `$${Math.round(n * 1000) % 10 ? n.toFixed(3) : n.toFixed(2)}`

const agentRanges = AGENTS_WITH_PRICE.flatMap((v) =>
  v.perMin
    ? [
        {
          label: v.name,
          sub: v.perMin.note,
          min: v.perMin.low,
          max: v.perMin.high,
          display:
            v.perMin.low === v.perMin.high
              ? money(v.perMin.low)
              : `${money(v.perMin.low)}–${money(v.perMin.high)}`,
          href: v.url,
        },
      ]
    : []
).sort((a, b) => a.min - b.min)
if (!agentRanges.length) throw new Error('ai-sales-training: no AI agent per-minute rates in data')
const cheapest = agentRanges[0]
const dearest = [...agentRanges].sort((a, b) => b.max - a.max)[0]

/* ---------- FAQ (visible and in FAQPage schema) ---------- */

const NUM = ['No', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
const word = (n: number) => NUM[n] ?? String(n)
const list = (xs: string[]) =>
  xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`
const pPublished = PRACTICE.filter((v) => v.priceStatus === 'published')
const pFreeQuote = PRACTICE.filter((v) => v.priceStatus === 'free-then-quote')
const ttPractice = PRACTICE.find((v) => v.ours)
const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1)

const FAQS = [
  {
    q: 'What is the difference between AI sales training and AI calling?',
    a: 'AI sales training tools let your reps practise calls with an AI buyer and get scored before they talk to real customers. AI calling tools put an AI voice on real calls with prospects or customers. They are different purchases with different rules: practice calls involve only your own team, while AI calls to the public fall under calling and consent laws.',
  },
  {
    q: 'Which AI sales roleplay tools publish their prices?',
    a: `Of the ${PRACTICE.length} AI practice tools we checked on ${PRACTICE_CHECKED}, ${word(
      pPublished.length
    ).toLowerCase()} show a paid price you can read without a sales call: ${list(
      pPublished.map((v) => v.name)
    )}. ${word(pFreeQuote.length)} more (${list(
      pFreeQuote.map((v) => v.name)
    )}) offer a free start and quote the paid plans; the rest are quote only.`,
  },
  {
    q: 'How much do AI calling agents cost per minute?',
    a: `On the vendors' own pricing pages (checked ${CALLING_CHECKED}), listed AI agent rates run from ${money(
      cheapest.min
    )} a minute (${cheapest.label}${cheapest.sub ? `, ${cheapest.sub}` : ''}) to ${money(
      dearest.max
    )} (${dearest.label}). Most rates leave out telephony, so compare what each price covers before you compare the numbers.`,
  },
  {
    q: 'Is there a free AI sales roleplay tool?',
    a: `Yes. ${PRACTICE.filter((v) => v.freeStart !== '')
      .map((v) => `${v.name} (${lowerFirst(v.freeStart)})`)
      .join('; ')}. Terms are as written on each vendor's page on ${PRACTICE_CHECKED}.`,
  },
  {
    q: 'Is Tough Tongue AI on this list your product?',
    a: `Yes. Tough Tongue AI is our product and is marked wherever it appears. ${
      ttPractice
        ? `It starts with ${ttPractice.freeStart}; practice runs by ${lowerFirst(ttPractice.modes)}. `
        : ''
    }It also sells AI voice agents, which are not listed here. Every other vendor is described from its own website.`,
  },
]

/* ---------- Small pieces ---------- */

const th = 'px-4 py-3 text-left font-medium'
const td = 'px-4 py-3 align-top'

function Section({
  id,
  kicker,
  title,
  lead,
  children,
}: {
  id: string
  kicker: string
  title: string
  lead?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 py-12 md:py-16">
      <div className="max-w-2xl">
        <p className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
          {kicker}
        </p>
        <h2 className="mt-3 text-h2 font-semibold text-fg">{title}</h2>
        {lead && <div className="mt-3 text-body text-fg-2">{lead}</div>}
      </div>
      {children}
    </section>
  )
}

function Ours() {
  return (
    <span className="ml-2 inline-flex h-5 items-center rounded-full bg-signal-tint px-2 text-caption font-medium text-signal-strong">
      our product
    </span>
  )
}

function VendorName({ name, url, ours }: { name: string; url: string; ours?: boolean }) {
  return (
    <>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="font-semibold text-fg underline decoration-border-strong underline-offset-4 transition-colors duration-fast hover:text-signal-strong hover:decoration-signal"
      >
        {name}
      </a>
      {ours && <Ours />}
    </>
  )
}

/** Table above sm, stacked cards below: wide vendor rows never squeeze on a phone. */
function Directory<T>({
  label,
  rows,
  cols,
  name,
  ours,
  caption,
}: {
  label: string
  rows: T[]
  cols: { head: string; cell: (r: T) => ReactNode }[]
  name: (r: T) => ReactNode
  ours?: (r: T) => boolean
  caption: ReactNode
}) {
  return (
    <figure className="mt-8">
      <ul className="space-y-3 sm:hidden">
        {rows.map((r, i) => (
          <li
            key={i}
            className={`rounded-xl border bg-surface p-4 ${
              ours?.(r) ? 'border-signal/40' : 'border-border'
            }`}
          >
            <div className="text-body">{name(r)}</div>
            <dl className="mt-2 space-y-1.5 text-small">
              {cols.map((c) => (
                <div key={c.head}>
                  <dt className="text-caption text-fg-3">{c.head}</dt>
                  <dd className="text-fg-2">{c.cell(r)}</dd>
                </div>
              ))}
            </dl>
          </li>
        ))}
      </ul>
      <div
        role="region"
        aria-label={label}
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        className="hidden overflow-x-auto rounded-xl border border-border bg-surface sm:block"
      >
        <table className="w-full min-w-[720px] text-small">
          <thead className="bg-muted text-fg-2">
            <tr>
              <th scope="col" className={th}>
                Tool
              </th>
              {cols.map((c) => (
                <th key={c.head} scope="col" className={th}>
                  {c.head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((r, i) => (
              <tr key={i} className={ours?.(r) ? 'bg-signal-tint/40' : ''}>
                <th scope="row" className={`${td} w-48 text-left font-normal`}>
                  {name(r)}
                </th>
                {cols.map((c) => (
                  <td key={c.head} className={`${td} text-fg-2`}>
                    {c.cell(r)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption className="mt-3 text-caption text-fg-3">{caption}</figcaption>
    </figure>
  )
}

const TRI: Record<string, string> = { yes: 'Yes', no: 'No', 'not stated': 'Not stated' }
const kindShort = (k: RoleplayVendor['kind']) => PRACTICE_KINDS.find((x) => x.id === k)?.short ?? k

const GUIDES = [
  {
    href: '/blog/best-sales-roleplay-software-platforms-2026',
    title: 'AI sales roleplay software, compared',
    note: 'Finder by team size, scenario sources and a yearly cost calculator',
  },
  {
    href: '/blog/best-sales-training-platforms-2026',
    title: 'Sales training platforms, compared',
    note: 'Course libraries, methodology programmes and LMS, with year-one costs',
  },
  {
    href: '/blog/ai-calling-software-sales-teams-2026',
    title: 'AI calling software for sales teams',
    note: 'Per-minute prices and cost per booked meeting on public funnel rates',
  },
  {
    href: '/voice-ai-calling',
    title: 'Voice AI calling: how it works, costs and the law',
    note: 'How AI calls work, cost per minute and US, India and EU rules',
  },
  {
    href: '/blog/12-realistic-sales-role-play-scenarios-sdr-mastery-2026',
    title: '12 sales roleplay scenarios with scorecards',
    note: 'Ready-to-run scripts for SDR and AE practice',
  },
  {
    href: '/blog/ai-roleplay-objection-handling-scripts-scenarios-results-2026',
    title: 'Objection handling scripts and drills',
    note: 'Practise the objections that stall deals, with an answer checker',
  },
  {
    href: '/blog/hinglish-sales-roleplay-scripts-india-2026',
    title: 'Hinglish sales roleplay scripts (India)',
    note: 'Code-switched scripts and the rules for regulated sectors',
  },
  {
    href: '/blog/best-sales-training-companies-india',
    title: 'Sales training companies in India',
    note: 'Who trains Indian sales teams, how and at what price',
  },
]

/* ---------- Page ---------- */

export default function AISalesTrainingDirectoryPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://www.autointerviewai.com/',
        },
        { '@type': 'ListItem', position: 2, name: 'AI sales training directory', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]

  const jobs = [
    {
      href: '#practice',
      n: PRACTICE.length,
      title: 'Reps practise calls with an AI buyer',
      body: 'Roleplay, scoring and coaching before real calls. Only your team is on the line.',
    },
    {
      href: '#training',
      n: TRAINING.length,
      title: 'Teach a method and track who learned it',
      body: 'Course libraries, methodology programmes, enablement suites and LMS.',
    },
    {
      href: '#calling',
      n: CALLING.length,
      title: 'Let AI make or support real calls',
      body: 'AI voice agents and dialers. Calling and consent laws apply.',
    },
  ]

  return (
    <DomainLayout currentPath="/ai-sales-training">
      {schema.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <div className="mx-auto w-full max-w-page px-5 md:px-8">
        {/* ---------- Hero ---------- */}
        <header className="pb-6 pt-8 md:pt-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-caption text-fg-3">
            <Link href="/" className="hover:text-fg">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-fg-2">AI sales training directory</span>
          </nav>
          <p className="mt-8 font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
            Directory · {TOTAL} tools · prices from each vendor’s own page · checked{' '}
            {CALLING_CHECKED.split(' ')[0]}–{TRAINING_CHECKED}
          </p>
          <h1 className="mt-3 max-w-4xl font-serif text-display font-medium text-fg">
            AI sales training and AI calling tools, in one directory
          </h1>
          <p className="mt-4 max-w-[56ch] text-body-lg text-fg-2">
            Three different jobs get sold under the same words. Pick yours below, then compare the
            tools that do it on price as written, free start and fit. Tough Tongue AI is our product
            and is marked.
          </p>

          {/* Pick the job: a hairline list, each row jumps to its table */}
          <ol className="mt-8 grid overflow-hidden rounded-2xl border border-border bg-surface md:grid-cols-3">
            {jobs.map((j, i) => (
              <li
                key={j.href}
                className={`border-border ${i > 0 ? 'border-t md:border-l md:border-t-0' : ''}`}
              >
                <a
                  href={j.href}
                  className="group flex h-full flex-col gap-2 p-5 transition-colors duration-fast hover:bg-signal-tint/50 md:p-6"
                >
                  <span className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
                    Job {i + 1} · {j.n} tools
                  </span>
                  <span className="text-h4 font-semibold text-fg">{j.title}</span>
                  <span className="text-small text-fg-2">{j.body}</span>
                  <span className="mt-auto pt-2 text-small font-semibold text-signal-strong">
                    See the list{' '}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-fast group-hover:translate-y-0.5"
                    >
                      ↓
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <StatRow
            stats={[
              {
                label: 'Tools listed',
                value: String(TOTAL),
                sub: OVERLAP
                  ? `Across the three jobs; ${OVERLAP} suites sit in two lists and count once`
                  : 'Across the three jobs',
              },
              {
                label: 'Show a paid price',
                value: `${PUBLISHED} of ${TOTAL}`,
                sub: 'Readable without a sales call',
              },
              {
                label: 'Free start',
                value: String(FREE_START),
                sub: 'Practice and training tools with a free plan, courses or minutes',
              },
              {
                label: 'AI agent rates',
                value: `${money(cheapest.min)}–${money(dearest.max)}`,
                sub: `Per minute, as listed, checked ${CALLING_CHECKED}`,
              },
            ]}
          />
        </header>

        <Figure
          label={`Pricing · ${TOTAL} tools`}
          title={`${pct(QUOTE + FREE_THEN_QUOTE)}% of these tools don’t publish a paid price on their own page`}
          sub="What each vendor’s own pricing or product page showed when we opened it."
          source={[
            {
              label: `AI practice tools, checked ${PRACTICE_CHECKED}`,
              url: '/blog/best-sales-roleplay-software-platforms-2026',
            },
            {
              label: `Training platforms, checked ${TRAINING_CHECKED}`,
              url: '/blog/best-sales-training-platforms-2026',
            },
            {
              label: `AI calling tools, checked ${CALLING_CHECKED}`,
              url: '/blog/ai-calling-software-sales-teams-2026',
            },
          ]}
          updated="Nov 2026"
          table={{
            head: ['Price shown', 'Tools'],
            rows: [
              ['Paid price published', PUBLISHED],
              ['Free start, paid plans by quote', FREE_THEN_QUOTE],
              ['Quote only or not published', QUOTE],
            ],
          }}
        >
          <SegmentBar
            parts={[
              { label: 'Paid price published', value: PUBLISHED },
              { label: 'Free start, then quote', value: FREE_THEN_QUOTE },
              { label: 'Quote only', value: QUOTE },
            ]}
          />
        </Figure>

        {/* ---------- 1. Practice ---------- */}
        <Section
          id="practice"
          kicker={`Job 1 · ${PRACTICE.length} AI practice tools · checked ${PRACTICE_CHECKED}`}
          title="Practise sales calls with an AI buyer"
          lead={
            <>
              Reps talk to an AI prospect, get scored and try again. Ask two questions first: can it
              build a scenario from your own calls, and does it score real calls with the same
              scorecard? The{' '}
              <Link
                href="/blog/best-sales-roleplay-software-platforms-2026"
                className="text-signal-strong underline underline-offset-4"
              >
                roleplay software guide
              </Link>{' '}
              has a finder and a yearly cost calculator.
            </>
          }
        >
          <Directory
            label="AI sales practice tools"
            rows={practiceSorted}
            name={(v) => <VendorName name={v.name} url={v.url} ours={v.ours} />}
            ours={(v) => !!v.ours}
            cols={[
              { head: 'Type', cell: (v) => kindShort(v.kind) },
              { head: 'Price, as written', cell: (v) => v.price },
              { head: 'Free start', cell: (v) => v.freeStart || 'None found' },
              { head: 'From your calls', cell: (v) => TRI[v.fromCalls] },
              { head: 'Best for', cell: (v) => v.bestFor },
            ]}
            caption={
              <>
                Facts from each vendor’s pricing or product page (linked), opened {PRACTICE_CHECKED}
                . “From your calls” = the vendor says a scenario can be built from your recordings
                or transcripts.
              </>
            }
          />

          {/* How Tough Tongue AI does this (our product) */}
          {ttPractice && (
            <div className="mt-8 grid gap-6 rounded-2xl border border-border bg-surface p-5 md:grid-cols-[1fr_auto] md:items-center md:p-7">
              <div>
                <p className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
                  How Tough Tongue AI does this · our product
                </p>
                <p className="mt-2 text-h4 font-semibold text-fg">
                  Spoken practice with an AI buyer, scored on your own rubric
                </p>
                <p className="mt-2 max-w-prose text-small text-fg-2">
                  {ttPractice.modes}. Start with {ttPractice.freeStart}; team plans are priced by
                  seats and minutes ({ttPractice.price}).
                </p>
              </div>
              <a
                href={TT}
                className="inline-flex h-11 items-center justify-center rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong"
              >
                Try a free practice call
              </a>
            </div>
          )}
        </Section>

        {/* ---------- 2. Training ---------- */}
        <Section
          id="training"
          kicker={`Job 2 · ${TRAINING.length} training platforms · checked ${TRAINING_CHECKED}`}
          title="Teach a sales method and track who learned it"
          lead={
            <>
              Courses teach the method; an enablement suite or LMS assigns it and tracks completion.
              Most programmes and suites quote by team size. Year-one costs for a 20-person team are
              worked out in the{' '}
              <Link
                href="/blog/best-sales-training-platforms-2026"
                className="text-signal-strong underline underline-offset-4"
              >
                sales training platforms guide
              </Link>
              .
            </>
          }
        >
          <Directory
            label="Sales training platforms"
            rows={TRAINING}
            name={(p) => <VendorName name={p.name} url={p.url} />}
            cols={[
              { head: 'Type', cell: (p) => KIND_LABEL[p.kind] },
              { head: 'What it trains', cell: (p) => p.trains },
              { head: 'Price, as written', cell: (p) => p.price },
              { head: 'AI roleplay', cell: (p) => p.roleplay || 'None named' },
            ]}
            caption={
              <>
                Facts from each vendor’s own page (linked), opened {TRAINING_CHECKED}. “AI roleplay”
                shows the vendor’s own name for it, if it names one.
              </>
            }
          />
        </Section>

        {/* ---------- 3. Calling ---------- */}
        <Section
          id="calling"
          kicker={`Job 3 · ${agents.length} AI agents + ${dialers.length} dialers · checked ${CALLING_CHECKED}`}
          title="Let AI make or support real sales calls"
          lead={
            <>
              AI voice agents talk to prospects themselves; dialers help human reps call faster.
              Before an AI calls the public, check the consent rules for each country you call: the{' '}
              <Link
                href="/voice-ai-calling"
                className="text-signal-strong underline underline-offset-4"
              >
                voice AI calling guide
              </Link>{' '}
              quotes the US, India and EU rules, and the{' '}
              <Link
                href="/blog/ai-calling-for-real-estate-convert-more-leads-2026"
                className="text-signal-strong underline underline-offset-4"
              >
                real estate call check
              </Link>{' '}
              gives a verdict per call type in five countries. Selling in India? See the{' '}
              <Link
                href="/blog/hinglish-sales-roleplay-scripts-india-2026"
                className="text-signal-strong underline underline-offset-4"
              >
                Hinglish roleplay scripts
              </Link>{' '}
              and{' '}
              <Link
                href="/blog/best-sales-training-companies-india"
                className="text-signal-strong underline underline-offset-4"
              >
                sales training companies in India
              </Link>
              .
            </>
          }
        >
          <Figure
            label={`AI agent rates · ${agentRanges.length} vendors that list a per-minute price`}
            title={`Listed AI agent rates run from ${money(cheapest.min)} to ${money(dearest.max)} a minute`}
            sub="Each band is the vendor’s own low and high rate. Most leave out telephony, so read what each price covers."
            source={[{ label: 'Vendor pricing pages (linked in the table below)' }]}
            updated="Nov 2026"
            legend={[{ label: 'Listed range per minute', kind: 'bar', color: RAMP[0] }]}
            table={{
              head: ['Vendor', 'Low ($/min)', 'High ($/min)', 'Note'],
              rows: agentRanges.map((r) => [r.label, r.min, r.max, r.sub ?? '']),
            }}
          >
            <RangeList rows={agentRanges} format={{ prefix: '$', decimals: 2 }} />
          </Figure>

          <Directory
            label="AI calling tools"
            rows={CALLING}
            name={(v) => <VendorName name={v.name} url={v.url} />}
            cols={[
              { head: 'Type', cell: (v) => (v.kind === 'agent' ? 'AI voice agent' : 'Dialer') },
              { head: 'Price, as written', cell: (v) => v.stated },
              { head: 'What the price covers', cell: (v) => v.covers },
              {
                head: 'Per minute',
                cell: (v) =>
                  v.perMin
                    ? v.perMin.low === v.perMin.high
                      ? money(v.perMin.low)
                      : `${money(v.perMin.low)}–${money(v.perMin.high)}`
                    : v.kind === 'dialer'
                      ? 'Not per minute'
                      : 'Not listed',
              },
            ]}
            caption={
              <>
                Prices exactly as each vendor states them on its pricing page (linked), opened{' '}
                {CALLING_CHECKED}. No conversion and no volume discounts unless the row says so.
              </>
            }
          />

          <div className="mt-10 max-w-3xl">
            <h3 className="text-h3 font-semibold text-fg">
              What a booked meeting costs: AI vs a rep
            </h3>
            <p className="mt-2 text-body text-fg-2">
              Change the dials, connect and meeting rates to yours. Defaults come from the sources
              named in the calculator.
            </p>
            <div className="mt-6">
              <CostPerMeeting />
            </div>
          </div>
        </Section>

        {/* ---------- Guides ---------- */}
        <Section
          id="guides"
          kicker={`Go deeper · ${GUIDES.length} guides`}
          title="The full comparison for each job"
        >
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {GUIDES.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="group block h-full rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                >
                  <span className="text-h4 font-semibold text-fg group-hover:text-signal-strong">
                    {g.title} →
                  </span>
                  <span className="mt-1 block text-small text-fg-2">{g.note}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>

        {/* ---------- FAQ ---------- */}
        <Section id="faq" kicker="Questions buyers ask" title="Frequently asked questions">
          <div className="mt-8 max-w-3xl space-y-3">
            {FAQS.map((f, i) => (
              <details
                key={f.q}
                open={i < 2}
                className="group rounded-xl border border-border bg-surface open:shadow-e1"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-fg">
                  {f.q}
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
        </Section>

        {/* ---------- Close: one route to our product, light, on tokens ---------- */}
        <section className="mb-16 rounded-2xl border border-border bg-surface p-6 md:p-10">
          <p className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
            Tough Tongue AI · our product · {ttPractice?.freeStart ?? 'free start'}
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-h1 font-medium text-fg">
            Hear what your reps sound like before a buyer does.
          </h2>
          <p className="mt-3 max-w-[56ch] text-body text-fg-2">
            Pick a scenario, take the call out loud with an AI buyer and read the scorecard. You can
            score it on your own rubric. Practise on the web, by phone or in Google Meet and Zoom.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={TT}
              className="inline-flex h-11 items-center rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong"
            >
              Try a free practice call
            </a>
            <Link
              href="/cold-call-practice"
              className="inline-flex h-11 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
            >
              Cold call simulator
            </Link>
          </div>
        </section>
      </div>
    </DomainLayout>
  )
}
