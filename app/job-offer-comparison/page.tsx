import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import OfferComparer from '@/components/offerCompare/OfferComparer'
import { ColumnChart, Figure, Flow, Insight, SERIES, StatRow } from '@/components/viz'
import {
  compareOffers,
  computeOffer,
  fixedToMatch,
  DEFAULT_HIKE_PCT,
  DEFAULT_PAYOUT_PCT,
  headlineCtc,
  inr,
  lakhs,
  realHike,
  SAMPLE_OFFERS,
  SOURCES,
} from '@/data/offerCompare/engine'

const PAGE_URL = 'https://www.autointerviewai.com/job-offer-comparison'
const UPDATED = '2026-11-15'
const TITLE = 'Job Offer Comparison Calculator India (2026-27)'
const DESC =
  'Compare 2–3 job offers on real money: monthly in-hand on FY 2026-27 tax, variable payout, joining bonus clawback, notice buyout, ESOPs and rent. Free, no sign-up.'

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

/* ---------- Worked example: the three sample offers, run through the same engine ---------- */
const EX = compareOffers(SAMPLE_OFFERS)
const [CUR, MNC, START] = EX.results
const MNC_VS_START_Y1 = MNC.year1AfterLiving - START.year1AfterLiving
const START_VS_MNC_3Y = START.threeYearTotal - MNC.threeYearTotal
const START_NO_ESOP = computeOffer({ ...SAMPLE_OFFERS[2], equityCountPct: 0 })
const START_VS_MNC_3Y_NO_ESOP = START_NO_ESOP.threeYearTotal - MNC.threeYearTotal
const MNC_HIKE = realHike(CUR, MNC) ?? 0
const MNC_CTC_HIKE =
  ((headlineCtc(SAMPLE_OFFERS[1]) - headlineCtc(SAMPLE_OFFERS[0])) /
    headlineCtc(SAMPLE_OFFERS[0])) *
  100
const MNC_CASH_HIKE = ((MNC.year1Cash - CUR.year1Cash) / CUR.year1Cash) * 100
const MNC_TO_MATCH = fixedToMatch(SAMPLE_OFFERS, 1, 2)
const BUYOUT_NET = SAMPLE_OFFERS[2].buyout - START.years[0].oneTimeInHand
const EXTRA_COMMUTE_YR = (SAMPLE_OFFERS[1].commute - SAMPLE_OFFERS[2].commute) * 12

const SECTIONS = [
  { id: 'calculator', label: 'Calculator' },
  { id: 'example', label: 'Worked example' },
  { id: 'rules', label: 'Rules that move the money' },
  { id: 'before', label: 'Before you sign' },
  { id: 'faq', label: 'FAQ' },
]

const RULES: {
  item: string
  rule: ReactNode
  money: string
  src: { label: string; url: string }[]
}[] = [
  {
    item: 'Variable pay',
    rule: 'Paid on performance, usually once a year. In EY’s 2026 survey, average performers received 60–80% of target; top performers 120–150%.',
    money: `Count ${DEFAULT_PAYOUT_PCT}% of target unless the company shows you its payout history.`,
    src: [SOURCES.eyPay],
  },
  {
    item: 'Joining bonus',
    rule: 'Taxed as salary in the year you get it. Most Indian joining bonuses carry a 1–2 year clawback. A tribunal held that repaying one gives no tax deduction.',
    money: 'Leave early and you repay the full bonus, while you only kept the after-tax part.',
    src: [SOURCES.kekaSignOn, SOURCES.signOnItat],
  },
  {
    item: 'Notice buyout',
    rule: 'When the new employer pays your buyout back, it is in practice added to your salary and TDS is deducted.',
    money: 'A “reimbursed” buyout still costs you the tax on it.',
    src: [SOURCES.buyoutTax],
  },
  {
    item: 'RSUs (listed company)',
    rule: 'Taxed as salary when they vest, at the market value that day. Capital gains apply only to the rise after vesting.',
    money: 'Count RSUs after tax at your slab, and only what vests in the years you stay.',
    src: [SOURCES.rsuVest],
  },
  {
    item: 'Startup ESOPs',
    rule: 'Taxed when you exercise, on market value minus your exercise price. For an eligible start-up the tax is due within 14 days of the earliest of: 60 months after the tax year, selling, or leaving.',
    money:
      'No cash until a sale or buyback, and leaving can bring the tax bill forward. Count a fraction, or zero.',
    src: [SOURCES.esopDept, SOURCES.esopDeferral],
  },
  {
    item: 'Gratuity in CTC',
    rule: 'Paid only after 5 years of continuous service (1 year for fixed-term employees under the labour codes).',
    money:
      'Leave in year 2 and the gratuity line in your CTC was never yours. This tool leaves it out of in-hand.',
    src: [SOURCES.gratuityFaq, SOURCES.gratuityFixedTerm],
  },
  {
    item: 'Yearly raise',
    rule: 'Aon: India salaries rose 9.0% in 2026 and are projected to rise 9.1% in 2027.',
    money: `The tool assumes ${DEFAULT_HIKE_PCT}% a year; change it per offer if you know the company’s cycle.`,
    src: [SOURCES.aonHike],
  },
]

const FAQ = [
  {
    q: 'How do I compare two job offers in India?',
    a: 'Compare money you will actually receive, not CTC. For each offer, work out monthly in-hand after PF, professional tax and income tax; add the variable pay you realistically expect and any joining bonus after tax; subtract a notice buyout and the rent and commute that job means. Then look at year 1 and at 3 years, and check the lock-ins: clawback months, notice period and the equity cliff.',
  },
  {
    q: 'Is a higher CTC always the better offer?',
    a: `No. In our worked example the ${lakhs(headlineCtc(SAMPLE_OFFERS[1]))} offer has the biggest CTC, yet it leaves only ${inr(MNC_VS_START_Y1)} more than the ${lakhs(headlineCtc(SAMPLE_OFFERS[2]))} offer in year 1, and less from year 2, because part of its CTC is a variable paid at ${DEFAULT_PAYOUT_PCT}% and a one-time joining bonus.`,
  },
  {
    q: 'Joining bonus or higher fixed pay: which is better?',
    a: 'Higher fixed pay, if the totals are close. Fixed pay repeats every year and every future raise is a percentage of it; a joining bonus is paid once, taxed at your slab, and usually has to be repaid in full if you leave within 12–24 months.',
  },
  {
    q: 'If I leave before the clawback, do I repay the bonus before or after tax?',
    a: 'Offer letters usually say the full (gross) amount. In S.S.N. Ravi vs ACIT (ITAT Chennai, 2016) the tribunal held that a refunded sign-on bonus cannot be reduced from taxable salary, so you may repay more than you kept. Read your clause; some say “net of tax”.',
  },
  {
    q: 'How should I value ESOPs in a startup offer?',
    a: 'Separately from cash. Count only what vests while you expect to stay, after the cliff, and apply a discount for the chance the shares never become sellable; many people count unlisted ESOPs at 0–25% of the paper value. Ask for the exercise price, the latest valuation per share, the exercise window after leaving and any past buybacks.',
  },
  {
    q: 'What is a good hike when switching jobs?',
    a: `Measure it on money you receive, not on CTC. In the example, the MNC offer is a ${MNC_CTC_HIKE.toFixed(0)}% CTC jump but a ${MNC_CASH_HIKE.toFixed(0)}% rise in year-1 cash, mainly because its variable is counted at ${DEFAULT_PAYOUT_PCT}% and the extra pay is taxed. For context, Aon reports that salaries in India rose 9.0% on average in 2026.`,
  },
  {
    q: 'Is my data saved?',
    a: 'Only in your own browser, so your offers are still there when you come back. Nothing is sent to a server.',
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

export default function JobOfferComparisonPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Job Offer Comparison Calculator (India)',
      url: PAGE_URL,
      description: DESC,
      applicationCategory: 'FinanceApplication',
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
        { '@type': 'ListItem', position: 2, name: 'Job offer comparison', item: PAGE_URL },
      ],
    },
  ]

  const names = EX.results.map((r) => r.name)

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
          <span className="text-fg-2">Job offer comparison</span>
        </nav>

        <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className={`${kicker} text-signal-strong`}>
              Free tool · FY 2026-27 tax · 2 or 3 offers · No upload · Updated 15 Nov 2026
            </div>
            <h1 className="mt-4 font-serif text-display font-medium text-fg">
              Job offer comparison calculator
            </h1>
            <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
              Two offer letters, two different CTCs, and neither tells you what lands in your
              account. Put in up to three offers and see monthly in-hand pay, the variable you will
              realistically get, the joining bonus after tax and what leaving early costs, notice
              buyout, ESOPs or RSUs, and rent. Year 1 and 3 years, in rupees.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#calculator"
                className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
              >
                Compare my offers
              </a>
              <MockInterviewButton
                caption={false}
                label="Practise the HR round: free mock interview"
              />
            </div>
          </div>

          <aside
            aria-label="Worked example result"
            className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
          >
            <div className={`${kicker} text-fg-3`}>Worked example · Bengaluru (fictional)</div>
            <p className="mt-3 text-h4 font-semibold text-fg">
              The biggest CTC leaves just {inr(MNC_VS_START_Y1)} more in year 1 after rent and
              commute, then falls behind.
            </p>
            <dl className="mt-4 divide-y divide-border">
              {EX.results.map((r, i) => (
                <div key={r.name} className="flex items-baseline justify-between gap-3 py-2.5">
                  <dt className="flex items-center gap-2 text-small text-fg-2">
                    <span
                      aria-hidden="true"
                      className={`h-2 w-2 rounded-full ${['bg-viz-1', 'bg-viz-2', 'bg-viz-3'][i]}`}
                    />
                    {r.name} · {lakhs(headlineCtc(SAMPLE_OFFERS[i]))} CTC
                  </dt>
                  <dd className="text-small font-semibold tabular-nums text-fg">
                    {inr(r.monthlyInHand)}/mo
                  </dd>
                </div>
              ))}
            </dl>
            <a href="#example" className={`mt-3 inline-block text-small ${link}`}>
              See the example year by year
            </a>
          </aside>
        </header>

        <div className="mt-10 max-w-3xl rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
          <div className={`${kicker} text-signal-ink`}>TL;DR</div>
          <ul className="mt-3 space-y-2 text-body text-fg">
            <li>
              <strong className="font-semibold">Compare in-hand, not CTC.</strong> CTC includes
              employer PF, gratuity you get only after 5 years, a variable that average performers
              receive at 60–80% (EY 2026) and one-time bonuses.
            </li>
            <li>
              <strong className="font-semibold">
                A joining bonus is a loan until the clawback ends.
              </strong>{' '}
              Leave early and you usually repay the full amount; a tribunal has held that the
              repayment does not reduce your taxable salary.
            </li>
            <li>
              <strong className="font-semibold">Count equity separately.</strong> RSUs are taxed
              when they vest; startup ESOPs pay nothing until a sale, so count a fraction.
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
          meta="Step 1 · about 2 minutes"
          title="Compare your offers"
          intro="The example is loaded so you can see a full result; overwrite it with your numbers. Equity, notice buyout and raises sit in each offer's “Equity, notice buyout, raises” panel."
        >
          <OfferComparer />
        </Section>

        <Section
          id="example"
          meta="Worked example · 3 fictional offers, Bengaluru"
          title={`The ${lakhs(headlineCtc(SAMPLE_OFFERS[1]))} offer leaves less than the ${lakhs(headlineCtc(SAMPLE_OFFERS[2]))} one from year 2`}
          intro="A current job at ₹12 LPA, an MNC offer with variable pay and a joining bonus, and a startup offer with ESOPs and a notice buyout the startup pays back. Same rent; the MNC office is a longer commute."
        >
          <Figure
            label="₹ lakh a year · money left after rent and commute, plus equity counted"
            title={`The startup leads over 3 years by ${inr(START_VS_MNC_3Y)}; ${inr(START_VS_MNC_3Y_NO_ESOP)} of that is cash alone`}
            source="Auto Interview AI job offer comparison calculator, run on the fictional example; FY 2026-27 tax, 9% yearly raise, 70% variable payout"
            updated="Nov 2026"
            legend={names.map((n, i) => ({ label: n, color: SERIES[i] }))}
            table={{
              head: ['Year', ...names],
              rows: [1, 2, 3].map((y) => [
                `Year ${y}`,
                ...EX.results.map((r) => inr(r.years[y - 1].cash + r.years[y - 1].equityCounted)),
              ]),
            }}
          >
            <ColumnChart
              showValues={false}
              format={{ prefix: '₹', suffix: 'L' }}
              groups={[1, 2, 3].map((y) => ({
                label: `Year ${y}`,
                values: EX.results.map(
                  (r) =>
                    Math.round(
                      ((r.years[y - 1].cash + r.years[y - 1].equityCounted) / 100000) * 10
                    ) / 10
                ),
              }))}
            />
          </Figure>

          <figure>
            <div
              role="region"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              aria-label="Worked example inputs and year-1 result"
              className="overflow-x-auto rounded-xl border border-border bg-surface"
            >
              <table className="w-full min-w-[620px] text-left text-small tabular-nums">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                      Example
                    </th>
                    {names.map((n) => (
                      <th key={n} scope="col" className="px-4 py-3 text-right font-medium">
                        {n}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {(
                    [
                      ['Fixed CTC', (i: number) => lakhs(SAMPLE_OFFERS[i].fixed)],
                      ['Target variable', (i: number) => lakhs(SAMPLE_OFFERS[i].variable)],
                      ['Joining bonus', (i: number) => lakhs(SAMPLE_OFFERS[i].joiningBonus)],
                      [
                        'Equity (grant, counted at)',
                        (i: number) =>
                          SAMPLE_OFFERS[i].equityType === 'none'
                            ? '—'
                            : `${lakhs(SAMPLE_OFFERS[i].equityGrant)} ESOP, ${SAMPLE_OFFERS[i].equityCountPct}%`,
                      ],
                      [
                        'Rent + commute a month',
                        (i: number) => inr(SAMPLE_OFFERS[i].rent + SAMPLE_OFFERS[i].commute),
                      ],
                      ['In-hand per month', (i: number) => inr(EX.results[i].monthlyInHand)],
                      [
                        'Left after rent + commute, yr 1',
                        (i: number) => inr(EX.results[i].year1AfterLiving),
                      ],
                    ] as [string, (i: number) => string][]
                  ).map(([k, f]) => (
                    <tr key={k}>
                      <th
                        scope="row"
                        className="sticky left-0 bg-surface px-4 py-2.5 text-left font-normal text-fg-2"
                      >
                        {k}
                      </th>
                      {names.map((n, i) => (
                        <td key={n} className="px-4 py-2.5 text-right text-fg">
                          {f(i)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figcaption className="mt-2 flex justify-between gap-4 text-caption text-fg-3">
              <span>Fictional offers. Numbers computed by the calculator above.</span>
              <span className="shrink-0 md:hidden">Swipe →</span>
            </figcaption>
          </figure>

          <Insight title="What the example shows">
            The MNC offer is a {MNC_CTC_HIKE.toFixed(0)}% CTC jump over the current job but a{' '}
            {MNC_HIKE.toFixed(0)}% rise in year-1 money left: its variable is counted at{' '}
            {DEFAULT_PAYOUT_PCT}%, its {lakhs(SAMPLE_OFFERS[1].joiningBonus)} joining bonus leaves{' '}
            {inr(MNC.joiningBonusInHand)} after tax, and the longer commute costs{' '}
            {inr(EXTRA_COMMUTE_YR)} a year. The startup&apos;s higher fixed pay repeats and
            compounds with every raise; its buyout refund still costs {inr(BUYOUT_NET)} in tax.{' '}
            {MNC_TO_MATCH !== null &&
              `To match the startup over 3 years, the MNC would need a fixed CTC of ${lakhs(MNC_TO_MATCH)}: that is the number to negotiate with. `}
            {START_VS_MNC_3Y_NO_ESOP > 0
              ? 'Even with its ESOPs counted at zero, it leads over 3 years.'
              : 'Count its ESOPs at zero, though, and the MNC offer leads over 3 years.'}
          </Insight>
        </Section>

        <Section
          id="rules"
          meta={`Rules · ${RULES.length} items · checked ${new Date('2026-11-15').toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}`}
          title="The rules that change what an offer is worth"
          intro="Each line below is something an offer letter mentions in one line and a calculator usually ignores."
        >
          <StatRow
            stats={[
              {
                label: 'Variable paid to average performers',
                value: '60–80%',
                sub: 'of target. EY Future of Pay, Feb 2026',
                href: SOURCES.eyPay.url,
              },
              {
                label: 'Projected salary rise in India, 2027',
                value: '9.1%',
                sub: 'Actual 2026: 9.0%. Aon, Oct 2026',
                href: SOURCES.aonHike.url,
              },
              {
                label: 'Longest startup ESOP tax deferral',
                value: '60 mo',
                sub: 'after the tax year, or earlier on sale or exit. s.289(3)',
                href: SOURCES.esopDeferral.url,
              },
              {
                label: 'Service before gratuity is paid',
                value: '5 yrs',
                sub: '1 year for fixed-term staff. Labour codes, Nov 2025',
                href: SOURCES.gratuityFaq.url,
              },
            ]}
          />
          <figure>
            <div
              role="region"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
              aria-label="Rules that change what an offer is worth"
              className="overflow-x-auto rounded-xl border border-border bg-surface"
            >
              <table className="w-full min-w-[760px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                      Item
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      The rule
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      What it does to your money
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Source
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {RULES.map((r) => (
                    <tr key={r.item}>
                      <th
                        scope="row"
                        className="sticky left-0 bg-surface px-4 py-3 align-top font-medium text-fg"
                      >
                        {r.item}
                      </th>
                      <td className="px-4 py-3 align-top text-fg-2">{r.rule}</td>
                      <td className="px-4 py-3 align-top text-fg">{r.money}</td>
                      <td className="px-4 py-3 align-top text-caption">
                        {r.src.map((s, i) => (
                          <span key={s.url}>
                            {i > 0 && '; '}
                            <a href={s.url} target="_blank" rel="noopener" className={link}>
                              {s.label}
                            </a>
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <figcaption className="mt-2 flex justify-between gap-4 text-caption text-fg-3">
              <span>
                General information, not tax advice. Tax on PF, slabs and HRA follows our{' '}
                <Link href="/salary-calculator" className={link}>
                  CTC to in-hand calculator
                </Link>
                .
              </span>
              <span className="shrink-0 md:hidden">Swipe →</span>
            </figcaption>
          </figure>
        </Section>

        <Section
          id="before"
          meta="Checklist · 5 steps"
          title="Before you sign: get these answers in writing"
          intro="Most offer regret comes from a line nobody asked about. Ask HR these before you accept; a good recruiter answers all of them in a day."
        >
          <Flow
            label="From two offer letters to a decision"
            steps={[
              {
                title: 'Get the full breakup',
                body: 'Fixed, variable (and last 2 years’ payout %), joining bonus, gratuity, employer PF, insurance. A CTC number alone is not an offer.',
              },
              {
                title: 'Read the lock-ins',
                body: 'Joining bonus clawback months and whether repayment is gross or net; notice period; non-compete or training bonds.',
              },
              {
                title: 'Price the equity',
                body: 'Grant size in shares, exercise price, latest price per share, vesting and cliff, exercise window after leaving, past buybacks.',
              },
              {
                title: 'Run the numbers',
                body: 'Put every offer in the calculator with your real rent and commute. Look at year 1 and at 3 years.',
              },
              {
                title: 'Negotiate the gap',
                body: 'Ask to move a joining bonus into fixed pay, or for the new employer to cover the buyout. Practise the call out loud first.',
              },
            ]}
          />
          <P>
            The question HR asks most at this stage is your expected CTC. Answer with a range based
            on money left, not on a percentage over your current CTC, and say what would make you
            sign today. If you have a competing offer, name the in-hand difference, not the
            headline.
          </P>
        </Section>

        <Section id="faq" meta={`FAQ · ${FAQ.length} questions`} title="Quick answers">
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
              ['/salary-calculator', 'Tax detail', 'CTC to in-hand calculator'],
              ['/product-manager/salary', 'Benchmark', 'What PMs are paid in India'],
              ['/resume-keyword-checker', 'Next job', 'Resume keyword checker'],
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
            Sources:{' '}
            {Object.values(SOURCES).map((s, i) => (
              <span key={s.url}>
                {i > 0 && '; '}
                <a href={s.url} target="_blank" rel="noopener" className={link}>
                  {s.label}
                </a>
              </span>
            ))}
            . Rules checked 15 Nov 2026. General information, not tax or legal advice.
          </p>
        </Section>
      </div>

      <MockInterviewCTA
        title="The offer is in. Now say your number out loud."
        body="A voice interviewer plays the HR round: expected CTC, notice period, a lowball counter. You practise the answer, it tells you what was strong and what gave money away."
        questions={[
          'What is your expected CTC, and how did you arrive at it?',
          'We can offer 14 LPA fixed. Can you join at that?',
          'Your notice period is 90 days. Can you buy it out?',
          'You have another offer. Why should we match it?',
        ]}
      />
    </div>
  )
}
