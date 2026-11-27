import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import NoticePeriodCalculator from '@/components/noticePeriod/NoticePeriodCalculator'
import { BarList, Figure, Flow, Insight, StatRow } from '@/components/viz'
import {
  compute,
  type Count,
  diffDays,
  fmtDate,
  fmtMoney,
  type Inputs,
  SAMPLE,
} from '@/data/noticePeriod/engine'

const PAGE_URL = 'https://www.autointerviewai.com/notice-period-calculator'
const UPDATED = '2026-11-27'
const TITLE = 'Notice Period Calculator: Last Working Day, Buyout + Leave'
const DESC =
  'Find your last working day from your resignation date, then see leave set-off, notice buyout cost for your joining date and when final wages are due under India’s Labour Codes. Free.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESC,
    url: PAGE_URL,
    siteName: 'Auto Interview AI',
    type: 'website',
  },
  twitter: { card: 'summary', title: TITLE, description: DESC },
}

const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const link =
  'font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'

const SRC = {
  pib: {
    label: 'PIB, Government of India announces the four Labour Codes (21 Nov 2025)',
    url: 'https://labour.gov.in/sites/default/files/pib2192463.pdf',
  },
  wages: {
    label: 'Code on Wages, 2019, s.17(2) (India Code)',
    url: 'https://www.indiacode.nic.in/bitstream/123456789/15793/1/aA2019-29.pdf',
  },
  css: {
    label: 'Code on Social Security, 2020, s.53 (India Code)',
    url: 'https://www.indiacode.nic.in/bitstream/123456789/16823/1/aA2020-36.pdf',
  },
  delhi: {
    label: 'Delhi Shops and Establishments Act, 1954, s.30(2) (PRS India copy)',
    url: 'https://prsindia.org/files/bills_acts/acts_states/delhi/1954/1954Delhi7.pdf',
  },
  karnataka: {
    label: 'Karnataka Shops and Commercial Establishments Act, 1961, s.39 (PRS India copy)',
    url: 'https://prsindia.org/files/bills_acts/acts_states/karnataka/1962/1962KA8.pdf',
  },
  contract: {
    label: 'Indian Contract Act, 1872, s.27 (India Code)',
    url: 'https://indiacode.nic.in/bitstream/123456789/2187/2/A187209.pdf',
  },
  vijaya: {
    label: 'Vijaya Bank v. Prashant B. Narnaware, Supreme Court, 14 May 2025 (order copy)',
    url: 'https://www.verdictum.in/pdf_upload/4017920142025-05-14-1-1712394.pdf',
  },
  gst: {
    label: 'CBIC Circular No. 178/10/2022-GST, para 7.5 (3 Aug 2022)',
    url: 'https://gstcouncil.gov.in/sites/default/files/2024-06/cir-178-08-2022-cgst.pdf',
  },
  itat: {
    label: 'Nandinho Rebello v. DCIT, ITAT Ahmedabad, 18 Apr 2017',
    url: 'https://future.indiankanoon.org/doc/6594756/',
  },
  epf: {
    label: 'PIB, EPF withdrawal clarification (15 Oct 2025)',
    url: 'https://labour.gov.in/sites/default/files/pib2179689.pdf',
  },
  acas: {
    label: 'Acas, When the notice period starts (updated 24 Nov 2025)',
    url: 'https://www.acas.org.uk/notice-periods/when-the-notice-period-starts',
  },
  era: {
    label: 'Employment Rights Act 1996, s.86(2) (legislation.gov.uk)',
    url: 'https://legislation.gov.uk/ukpga/1996/18/section/86',
  },
  mn: {
    label: 'Minnesota Department of Labor and Industry, Termination FAQs',
    url: 'https://dli.mn.gov/business/employment-practices/termination-faqs',
  },
  aim: {
    label: 'Analytics India Magazine, Notice periods in India IT (6 Dec 2022)',
    url: 'https://analyticsindiamag.com/report-notice-periods-in-india-it/',
  },
  foundit: {
    label: 'foundit Insights Tracker via IANS / Lokmat Times (18 Mar 2026)',
    url: 'https://www.lokmattimes.com/business/nearly-1-in-3-job-postings-in-india-want-newcomers-to-join-immediately-report/amp/',
  },
  tcs: {
    label: 'Business Insider India, TCS to increase notice period to three months (20 Feb 2016)',
    url: 'https://www.businessinsider.in/tcsto-increase-notice-period-to-three-months-from-march/amp_articleshow/51068032.cms',
  },
  leaveCourts: {
    label: 'Business Today, Can employees take leave while serving notice period (9 Aug 2026)',
    url: 'https://www.businesstoday.in/jobs/story/can-employees-take-leave-while-serving-notice-period-rules-court-rulings-and-exceptions-548138-2026-08-09',
  },
  sccNotice: {
    label: 'SCC Online blog, Notice period in employment contracts for non-workmen (24 Apr 2026)',
    url: 'https://www.scconline.com/blog/post/2026/04/24/notice-period-employment-contract-non-workmen-india/',
  },
  nasscom: {
    label: 'NASSCOM HR Manual 2016 (published employer policy)',
    url: 'https://community.nasscom.in/sites/default/files/report/nasscom-hr-manual-2016.pdf',
  },
}
type Src = { label: string; url: string }

/* ---------- worked examples, computed by the same engine as the calculator ---------- */
const BASE: Inputs = { ...SAMPLE, leave: 0, join: undefined, joined: undefined }
const R_SAMPLE = compute(SAMPLE)
const WAYS: { label: string; short: string; i: Inputs }[] = [
  { label: '90 calendar days', short: 'Calendar days', i: BASE },
  { label: '3 calendar months', short: '3 months', i: { ...BASE, length: 3, unit: 'months' } },
  {
    label: '90 working days, Mon–Sat',
    short: 'Mon–Sat days',
    i: { ...BASE, count: 'mon-sat' as Count },
  },
  {
    label: '90 working days, Mon–Fri',
    short: 'Mon–Fri days',
    i: { ...BASE, count: 'mon-fri' as Count },
  },
]
const WAY_ROWS = WAYS.map((w) => ({ ...w, r: compute(w.i) }))
const CAL90 = WAY_ROWS[0].r
const WD90 = WAY_ROWS[3].r
const EXTRA_DAYS = WD90.calendarDays - CAL90.calendarDays
const SAME_DAY = compute({ ...BASE, start: 'same' })
const THIRTY = compute({ ...BASE, length: 30 })
const THIRTY_SAME = compute({ ...BASE, length: 30, start: 'same' })
const GRAT_GAP = R_SAMPLE.gratuityLine ? diffDays(R_SAMPLE.lwdWithLeave, R_SAMPLE.gratuityLine) : 0
const inr = (n: number) => fmtMoney(n, 'INR')

const LAW: { rule: string; means: string; quote: string; src: Src }[] = [
  {
    rule: 'Labour Codes in force',
    means:
      'The four Labour Codes took effect on 21 Nov 2025, including the wage and gratuity rules below.',
    quote: 'with effect from 21st November 2025',
    src: SRC.pib,
  },
  {
    rule: 'Final wages: 2 working days',
    means:
      'Wages owed when you resign must be paid within two working days. The Code counts from the resignation; how that applies while you serve notice is not spelled out, so most people read it from the last working day.',
    quote:
      'the wages payable to him shall be paid within two working days of his removal, dismissal, retrenchment or, as the case may be, his resignation',
    src: SRC.wages,
  },
  {
    rule: 'Gratuity: 5 years (1 for fixed-term)',
    means:
      'Gratuity is 15 days’ wages per completed year, payable after 5 years’ continuous service. Fixed-term staff qualify after 1 year (PIB, 21 Nov 2025).',
    quote:
      'Gratuity shall be payable to an employee on the termination of his employment after he has rendered continuous service for not less than five years',
    src: SRC.css,
  },
  {
    rule: 'Notice length: your contract',
    means:
      'No central law sets how much notice an office employee must give. Some state shop acts do: Delhi asks for one month after 3 months’ service, or one month’s pay.',
    quote:
      'No employee who has put in three months’ continuous service shall terminate his employment unless he has given to his employer a notice of at least one month, in writing.',
    src: SRC.delhi,
  },
  {
    rule: 'Karnataka: the duty is on the employer',
    means:
      'Karnataka’s shop act sets one month’s notice (or pay) for the employer removing someone with 6+ months’ service, and none for an employee who resigns. Your contract still binds you.',
    quote: 'one month’s previous notice or pay in lieu thereof has been given to him',
    src: SRC.karnataka,
  },
  {
    rule: 'Service bonds can bind',
    means:
      'The Supreme Court held in 2025 that a minimum-service bond with damages for leaving early is not a restraint of trade, because it applies only while you are employed.',
    quote:
      'a restrictive covenant operating during the subsistence of an employment contract does not put a clog',
    src: SRC.vijaya,
  },
  {
    rule: 'No GST on recovery',
    means:
      'Salary forfeited or bond money recovered when you quit early is a penalty, not payment for a service, so no GST. The circular does not say “notice pay”; firms apply it by analogy.',
    quote:
      'such amounts recovered by the employer are not taxable as consideration for the service of agreeing to tolerate an act or a situation',
    src: SRC.gst,
  },
  {
    rule: 'Tax on notice pay deducted',
    means:
      'A tax tribunal held that when notice pay is recovered from your salary, only the salary you actually received is taxed. Other cases differ; ask your CA.',
    quote: 'the actual salary received by the assessee is only taxable',
    src: SRC.itat,
  },
  {
    rule: 'PF after you leave',
    means:
      'Move your PF to the new employer. If you stay unemployed, 75% can be withdrawn at once and the rest after a year (Oct 2025 decision); check EPFO for the 2026 scheme.',
    quote: 'Remaining 25% can also be withdrawn after one year.',
    src: SRC.epf,
  },
]

const ABROAD: { where: string; rule: string; quote: string; src: Src }[] = [
  {
    where: 'UK',
    rule: 'At least 1 week after 1 month’s service, unless your contract says more. Notice starts the day after you resign if the contract is silent.',
    quote:
      'The notice required to be given by an employee who has been continuously employed for one month or more to terminate his contract of employment is not less than one week.',
    src: SRC.era,
  },
  {
    where: 'US',
    rule: 'Most states are at-will: no law requires two weeks’ notice. It is a courtesy, and some employers tie unused-leave payouts to it.',
    quote:
      'No notice of separation by either party is required by law upon separation of an employee for any reason.',
    src: SRC.mn,
  },
]

const FAQ = [
  {
    q: 'How do I calculate my last working day?',
    a: `Start the day after you resign (unless your letter says the resignation day is day 1) and count the notice in the way your contract counts it. Resign on ${fmtDate(BASE.resign)} with 30 days’ notice and your last day is ${fmtDate(THIRTY.lwd)}; with 90 days it is ${fmtDate(CAL90.lwd)}.`,
  },
  {
    q: 'Is the resignation day counted in the notice period?',
    a: `Only if your contract says so. UK guidance (Acas) starts notice the day after you resign when the contract is silent, and that is the usual practice in India too. The difference is one day: 30 days from ${fmtDate(BASE.resign, false)} ends ${fmtDate(THIRTY.lwd, false)} if it starts next day, ${fmtDate(THIRTY_SAME.lwd, false)} if the resignation day counts.`,
  },
  {
    q: 'Is the notice period counted in calendar days or working days?',
    a: `Calendar days, unless your contract says working days. It matters: 90 working days (Mon–Fri) from ${fmtDate(BASE.resign, false)} run to ${fmtDate(WD90.lwd)}, ${EXTRA_DAYS} days later than 90 calendar days.`,
  },
  {
    q: 'Is a one-month notice 30 days or a calendar month?',
    a: 'Whatever your letter says. A calendar month runs to the same date next month (resign 15 Mar, last day 15 Apr); “30 days” can be a day shorter or longer. The calculator lets you pick either.',
  },
  {
    q: 'Can I use my earned leave to shorten the notice period?',
    a: 'Only if your policy or manager allows it; it is not a right. Courts have let leave overlap notice where the rules allow and refused it where they forbid it. Some policies need senior approval (NASSCOM’s own HR manual does). If allowed, enter the days in the calculator to see the new last day.',
  },
  {
    q: 'How is notice period buyout calculated?',
    a: `Monthly pay ÷ 30 × calendar days not served, or ÷ 26 × working days. Your appointment letter says whether it is gross or basic pay. In our example, ${inr(SAMPLE.pay ?? 0)} a month and ${R_SAMPLE.shortCalendar} days short comes to ${inr(R_SAMPLE.buyout30 ?? 0)} at ÷30.`,
  },
  {
    q: 'Can my company refuse early release or buyout?',
    a: 'Yes. Courts have treated shortening the notice as the employer’s choice, and a notice clause in your contract can be enforced (see the SCC Online explainer in the sources). Ask early, offer a written handover plan, and offer leave set-off or buyout; the calculator writes that email from your dates.',
  },
  {
    q: 'Can the new company pay my notice buyout?',
    a: 'Many do, as a joining bonus or a reimbursement against your relieving letter. Ask before you accept the offer and get it in the offer letter. A reimbursement is usually taxed as salary in your hands.',
  },
  {
    q: 'What happens if I leave without serving notice?',
    a: 'The employer can recover notice pay from your full and final settlement or ask you to pay it, and may hold back your relieving and experience letters until it is settled, which can stall a background check at the new job. Beyond that, damages generally need a loss the employer can show (Indian Contract Act s.73).',
  },
  {
    q: 'When will I get my full and final settlement?',
    a: `The Code on Wages says wages due on resignation are paid within two working days. Read from the last day in our example, that is ${fmtDate(R_SAMPLE.wagesDue)}. Many company policies still say 45–60 days, so ask HR for the date in writing and keep the email.`,
  },
  {
    q: 'Do I lose gratuity if I resign before 5 years?',
    a: `Usually yes, unless you are on a fixed-term contract (1 year). The Code on Social Security asks for 5 years’ continuous service; some courts have counted 4 years and 240 days as 5, so ask HR in writing before you rely on either. Check the date before you resign: in our example the last day falls ${GRAT_GAP} days before the 5-year line, so a slightly later resignation would clear it.`,
  },
  {
    q: 'What is the notice period during probation?',
    a: 'Whatever your offer letter says for probation; it is often shorter (a week to a month). If the letter is silent, ask HR in writing before you resign, and check whether your state’s shop act applies.',
  },
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
      <div className="mt-8 space-y-8">{children}</div>
    </section>
  )
}

function P({ children }: { children: ReactNode }) {
  return <p className="max-w-prose text-body text-fg-2 md:text-prose">{children}</p>
}

const SECTIONS = [
  { id: 'calculator', label: 'Calculator' },
  { id: 'counting', label: 'How it’s counted' },
  { id: 'law', label: 'India rules 2026' },
  { id: 'buyout', label: 'Buyout + early release' },
  { id: 'lengths', label: 'Typical lengths' },
  { id: 'faq', label: 'FAQ' },
]

export default function NoticePeriodCalculatorPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Notice Period Calculator',
      url: PAGE_URL,
      description: DESC,
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Any (runs in the browser)',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
      dateModified: UPDATED,
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
      '@type': 'FAQPage',
      mainEntity: FAQ.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.autointerviewai.com' },
        { '@type': 'ListItem', position: 2, name: 'Notice period calculator', item: PAGE_URL },
      ],
    },
  ]

  return (
    <DomainLayout currentPath="/notice-period-calculator">
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
            <span className="text-fg-2">Notice period calculator</span>
          </nav>

          <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free tool · India Labour Codes 2026 · Saved on your device · No AI · Updated 27 Nov
                2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                Notice period calculator
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                Your last working day is usually the resignation date plus your notice, counted from
                the next day in calendar days, unless your contract says otherwise. Enter your dates
                to see it, then what leave set-off, a buyout for your joining date and the
                final-wages rule change.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#calculator"
                  className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  Find my last day
                </a>
                <MockInterviewButton caption={false} label="Practise for the new job" />
              </div>
            </div>

            <aside
              aria-label="Example result"
              className="hidden rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5 lg:block"
            >
              <div className={`${kicker} text-fg-3`}>
                Example · resign {fmtDate(SAMPLE.resign, false)}, 90 days
              </div>
              <ol className="mt-4 space-y-3">
                {[
                  ['Full notice ends', fmtDate(R_SAMPLE.lwd)],
                  [`${SAMPLE.leave} leave days set off`, fmtDate(R_SAMPLE.lwdWithLeave)],
                  [
                    `Join ${fmtDate(SAMPLE.join ?? '', false)}: unserved`,
                    `${R_SAMPLE.shortCalendar} days · ${inr(R_SAMPLE.buyout30 ?? 0)}`,
                  ],
                  ['Final wages due, read from your last day', fmtDate(R_SAMPLE.wagesDue)],
                ].map(([t, b], i) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal-tint font-mono text-small font-semibold text-signal-ink">
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-caption text-fg-2">{t}</span>
                      <span className="block text-small font-semibold text-fg">{b}</span>
                    </span>
                  </li>
                ))}
              </ol>
            </aside>
          </header>

          <div className="mt-10 max-w-3xl rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
            <div className={`${kicker} text-signal-ink`}>TL;DR</div>
            <ul className="mt-3 space-y-2 text-body text-fg">
              <li>
                <strong className="font-semibold">
                  Count from the next day, in calendar days,
                </strong>{' '}
                unless your letter says otherwise: 90 days from {fmtDate(BASE.resign, false)} ends{' '}
                {fmtDate(CAL90.lwd)}.
              </li>
              <li>
                <strong className="font-semibold">“Working days” adds weeks:</strong> 90 Mon–Fri
                working days run {EXTRA_DAYS} days longer than 90 calendar days.
              </li>
              <li>
                <strong className="font-semibold">
                  Buyout ≈ monthly pay ÷ 30 × days not served;
                </strong>{' '}
                leave set-off and early release are the employer&apos;s call, so ask in writing.
              </li>
              <li>
                <strong className="font-semibold">Final wages:</strong> India&apos;s Code on Wages
                (in force 21 Nov 2025) says &ldquo;within two working days of … his
                resignation&rdquo;; read from your last day, that is about{' '}
                {fmtDate(R_SAMPLE.wagesDue, false)} in our example.
              </li>
            </ul>
          </div>
        </div>

        {/* ---------- In-page nav ---------- */}
        <nav aria-label="On this page" className="sticky top-16 z-40 border-y border-border bg-bg">
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
          <Section
            id="calculator"
            meta="The calculator · about 1 minute"
            title="Your last working day, buyout and final wages"
            intro="An example loads first. Change the dates to yours; the result updates as you type and is saved on this device. It also writes your early-release email."
          >
            <NoticePeriodCalculator />
          </Section>

          <Section
            id="counting"
            meta="How the date is counted · computed by the calculator"
            title={`The same “90 days” can end ${EXTRA_DAYS} days apart`}
            intro="Two lines in your appointment letter decide your last day: when notice starts, and whether it counts calendar or working days. Here is one resignation counted four ways."
          >
            <Figure
              label={`Resign ${fmtDate(BASE.resign)} · notice starts the next day`}
              title={`90 working days (Mon–Fri) keep you ${WD90.calendarDays} calendar days, not 90`}
              source="Auto Interview AI notice period calculator; no holidays entered"
              updated="Nov 2026"
              table={{
                head: ['Notice in the contract', 'Last working day', 'Calendar days on notice'],
                rows: WAY_ROWS.map((w) => [w.label, fmtDate(w.r.lwd), w.r.calendarDays]),
              }}
            >
              <BarList
                sort={false}
                format={{ suffix: ' days' }}
                rows={WAY_ROWS.map((w, k) => ({
                  label: w.short,
                  value: w.r.calendarDays,
                  display: `${w.r.calendarDays} days · ${fmtDate(w.r.lwd, false)}`,
                  highlight: k === 3,
                }))}
                emphasis
              />
            </Figure>
            <Flow
              label="Four checks before you resign"
              steps={[
                {
                  title: 'Start day',
                  body: `Day after you resign, or the resignation day itself? One day apart: 90 days ends ${fmtDate(CAL90.lwd, false)} or ${fmtDate(SAME_DAY.lwd, false)}.`,
                },
                {
                  title: 'Unit',
                  body: 'Calendar days, working days, or calendar months. Read the exact words.',
                },
                {
                  title: 'Weekend end',
                  body: 'If the last day is a Saturday or Sunday, ask whether you are relieved on the Friday.',
                },
                {
                  title: 'Written date',
                  body: 'Ask HR to confirm the last working day by email the day you resign.',
                },
              ]}
            />
            <Insight title="Why people get this wrong">
              On Fishbowl, a person with a 90-day notice wrote that their manager was{' '}
              <a
                href="https://www.fishbowlapp.com/post/in-my-company-there-is-90-days-notice-period-but-excluding-the-weekends-so-in-reality-its-around-5-6-months-time-is-it-like"
                target="_blank"
                rel="noopener"
                className={link}
              >
                “excluding the weekends”
              </a>
              . Whether that holds depends on the letter&apos;s exact words. If it says days, not
              working days, calendar days is the usual reading; ask HR to put the date in writing.
            </Insight>
          </Section>

          <Section
            id="law"
            meta={`India rules · ${LAW.length} rules · sources opened 27 Nov 2026`}
            title="What the law says in India in 2026"
            intro="The Labour Codes that took effect on 21 Nov 2025 changed the wage and gratuity rules. Your notice length still comes from your contract, and from your state’s shop act where it applies."
          >
            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="India rules on notice, final wages and gratuity, with sources"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
            >
              <table className="w-full min-w-[720px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                      Rule
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      What it means for you
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      What the source says
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {LAW.map((r) => (
                    <tr key={r.rule}>
                      <th
                        scope="row"
                        className="sticky left-0 w-44 bg-surface px-4 py-3 align-top font-medium text-fg"
                      >
                        {r.rule}
                      </th>
                      <td className="px-4 py-3 align-top text-fg-2">{r.means}</td>
                      <td className="px-4 py-3 align-top text-fg-2">
                        &ldquo;{r.quote}&rdquo;{' '}
                        <a href={r.src.url} target="_blank" rel="noopener" className={link}>
                          {r.src.label.split(',')[0]}
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              {ABROAD.map((a) => (
                <div
                  key={a.where}
                  className="min-w-0 rounded-xl border border-border bg-surface p-5"
                >
                  <h3 className="text-h4 font-semibold text-fg">{a.where}</h3>
                  <p className="mt-2 text-small text-fg-2">{a.rule}</p>
                  <p className="mt-3 text-caption text-fg-3">
                    &ldquo;{a.quote}&rdquo;{' '}
                    <a href={a.src.url} target="_blank" rel="noopener" className={link}>
                      {a.src.label}
                    </a>
                  </p>
                </div>
              ))}
            </div>
            <p className="max-w-prose text-caption text-fg-3">
              This is general information, not legal or tax advice. State rules differ, and your
              appointment letter is the first document to read.
            </p>
          </Section>

          <Section
            id="buyout"
            meta="Buyout, leave and early release · worked example"
            title={`Leaving ${R_SAMPLE.shortCalendar} days before your last day costs about ${inr(R_SAMPLE.buyout30 ?? 0)} in this example`}
            intro="Three levers shorten a notice period: earned leave set off against it, a buyout of the days you don’t serve, and the employer waiving them. All three need your employer’s yes."
          >
            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="Worked example"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
            >
              <table className="w-full text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Step
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Date or amount
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-fg-2">
                  {[
                    ['Resign (90 calendar days, starts next day)', fmtDate(SAMPLE.resign)],
                    ['Full notice ends', fmtDate(R_SAMPLE.lwd)],
                    [
                      `Set off ${SAMPLE.leave} days of earned leave (if allowed)`,
                      fmtDate(R_SAMPLE.lwdWithLeave),
                    ],
                    ['New employer wants you on', fmtDate(SAMPLE.join ?? '')],
                    [
                      'So your last day must be',
                      fmtDate(R_SAMPLE.servedUntil ?? R_SAMPLE.lwdWithLeave),
                    ],
                    [
                      'Notice days not served',
                      `${R_SAMPLE.shortCalendar} calendar (${R_SAMPLE.shortWorking6} Mon–Sat working)`,
                    ],
                    [
                      `Buyout at ${inr(SAMPLE.pay ?? 0)}/month ÷ 30 × ${R_SAMPLE.shortCalendar}`,
                      inr(R_SAMPLE.buyout30 ?? 0),
                    ],
                    [
                      `Buyout at ÷ 26 × ${R_SAMPLE.shortWorking6} working days`,
                      inr(R_SAMPLE.buyout26 ?? 0),
                    ],
                  ].map(([a, b]) => (
                    <tr key={a}>
                      <td className="px-4 py-3">{a}</td>
                      <td className="px-4 py-3 font-medium text-fg">{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  t: '1 · Ask with a plan',
                  b: 'Ask in your resignation email, with a dated handover plan: who takes each piece of work and when. A manager can agree to a date; a vague request is easy to refuse.',
                },
                {
                  t: '2 · Offer leave, then money',
                  b: 'Offer to set earned leave off against the notice first (it costs nothing), then a buyout of the rest, deducted from your full and final settlement.',
                },
                {
                  t: '3 · Ask the new employer',
                  b: 'Before you accept, ask whether they reimburse notice buyout and get it in the offer letter. If not, ask for a joining date after your last day.',
                },
              ].map((c) => (
                <div key={c.t} className="min-w-0 rounded-xl border border-border bg-surface p-5">
                  <h3 className="text-h4 font-semibold text-fg">{c.t}</h3>
                  <p className="mt-2 text-small text-fg-2">{c.b}</p>
                </div>
              ))}
            </div>
            <P>
              Basic or gross? No law fixes it; the appointment letter does. A recovered amount is
              not taxed as GST (
              <a href={SRC.gst.url} target="_blank" rel="noopener" className={link}>
                CBIC circular, para 7.5
              </a>
              ), and one tribunal held only the salary you actually receive is taxable (
              <a href={SRC.itat.url} target="_blank" rel="noopener" className={link}>
                Nandinho Rebello, 2017
              </a>
              ). If the new employer reimburses the buyout, expect it to be taxed as salary.
            </P>
          </Section>

          <Section
            id="lengths"
            meta="How long notice periods are · sources dated"
            title="Employers ask for 90 days; new jobs want you in 15"
            intro="That gap is why so many people search for buyouts and early release. The numbers below come from the reports named, with their dates; none is a law."
          >
            <StatRow
              stats={[
                {
                  label: 'Organised-sector jobs with 1 month or less',
                  value: '54.1%',
                  sub: 'Analytics India Magazine report, Dec 2022',
                  href: SRC.aim.url,
                },
                {
                  label: 'IT roles with a 90-day notice',
                  value: '1 in 3',
                  sub: 'Analytics India Magazine report, Dec 2022',
                  href: SRC.aim.url,
                },
                {
                  label: 'Job demand wanting joiners in 15 days or less',
                  value: '27%',
                  sub: 'vs 14% of candidates available that fast · foundit, Mar 2026',
                  href: SRC.foundit.url,
                },
              ]}
            />
            <P>
              TCS moved India-based staff back to a 90-day notice in March 2016, after one month
              from 2007 (
              <a href={SRC.tcs.url} target="_blank" rel="noopener" className={link}>
                Business Insider India
              </a>
              ). NASSCOM&apos;s own published HR manual asks its staff for one month and needs
              senior approval to set leave off against it (
              <a href={SRC.nasscom.url} target="_blank" rel="noopener" className={link}>
                NASSCOM HR Manual
              </a>
              ). Your notice could be anything from a week to six months: only your letter tells
              you.
            </P>
          </Section>

          <Section id="faq" meta={`FAQ · ${FAQ.length} questions people ask`} title="Quick answers">
            <div className="space-y-3">
              {FAQ.map((f, i) => (
                <details
                  key={f.q}
                  open={i === 0}
                  className="group rounded-xl border border-border bg-surface open:shadow-e1"
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-fg [&::-webkit-details-marker]:hidden">
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
                ['/job-offer-comparison', 'Before you resign', 'Compare the offers side by side'],
                ['/salary-negotiation', 'Before you accept', 'Ask for buyout in the offer'],
                [
                  '/interview-prep-plan',
                  'While you serve notice',
                  'Plan prep for your next rounds',
                ],
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
            <p className="max-w-prose text-caption text-fg-3">
              Sources (opened 27 Nov 2026):{' '}
              {Object.values(SRC).map((s, i) => (
                <span key={s.url}>
                  {i > 0 && '; '}
                  <a href={s.url} target="_blank" rel="noopener" className={link}>
                    {s.label}
                  </a>
                </span>
              ))}
              . PRS India and Indian Kanoon host copies of the official texts. The ÷30 and ÷26 day
              rates are common employer practice, not law. Not legal or tax advice.
            </p>
          </Section>
        </div>

        <MockInterviewCTA
          title="Serving notice? Use it to get ready for the next job."
          body="A voice interviewer asks the questions, follows up on your answers, and tells you what was strong and what was thin, so the next offer comes faster."
          questions={[
            'Why are you leaving your current job?',
            'What is your notice period, and can you join earlier?',
            'Tell me about yourself.',
            'What are your salary expectations?',
          ]}
        />
      </div>
    </DomainLayout>
  )
}
