import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import SalaryCalculator from '@/components/salaryCalc/SalaryCalculator'
import { ROLE_HUB_LIST } from '@/data/roleHubs'
import { ROLE_SALARIES } from '@/data/roleSalary'
import {
  breakEvenDeductions,
  computeSalary,
  DEFAULT_INPUTS,
  HRA_METROS,
  inr,
  lakh,
  monthlyFor,
  NEW_SLABS,
  OLD_SLABS,
  PF_WAGE_CEILING,
  RULES_CHECKED,
  SOURCES,
  STD_DEDUCTION,
  TAX_YEAR,
  WORKED_CTCS,
} from '@/data/indiaTax'

const PAGE_URL = 'https://www.autointerviewai.com/salary-calculator'
const UPDATED = '2026-11-06'
const TITLE = 'CTC to In-Hand Salary Calculator India (FY 2026-27)'
const DESC =
  'Turn any CTC into monthly in-hand pay on 2026-27 rules: new vs old regime, the ₹25,000 PF ceiling, 8-city HRA, bonus tax. Compare two job offers side by side.'

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
  },
  twitter: { card: 'summary', title: TITLE, description: DESC },
}

const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const link =
  'font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'

const fmtDate = (d: string) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })

function Src({ s }: { s: { label: string; url: string } }) {
  return (
    <a href={s.url} target="_blank" rel="noopener" className={link}>
      {s.label}
    </a>
  )
}

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

function Table({
  label,
  caption,
  head,
  rows,
  min = 'min-w-[560px]',
}: {
  label: string
  caption: ReactNode
  head: string[]
  rows: ReactNode[][]
  min?: string
}) {
  return (
    <figure>
      <div
        role="region"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
        aria-label={label}
        className="overflow-x-auto rounded-xl border border-border bg-surface"
      >
        <table className={`w-full ${min} text-left text-small tabular-nums`}>
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

/* ---------- Numbers, all from data/indiaTax.ts ---------- */

const WORKED = WORKED_CTCS.map((l) => {
  const inputs = { ...DEFAULT_INPUTS, ctc: l * 100000 }
  const r = computeSalary(inputs)
  return {
    l,
    r,
    oldMonthly: monthlyFor(inputs, 'old'),
    breakEven: breakEvenDeductions(l),
  }
})
const at = (l: number) => WORKED.find((w) => w.l === l)!
const W12 = at(12)
const W20 = at(20)
const r20 = W20.r
const BE30 = at(30).breakEven as number

const slabText = (slabs: typeof NEW_SLABS) => {
  let lower = 0
  return slabs.map((s) => {
    const band =
      s.upTo === Infinity
        ? `Above ${lakh(lower).replace(' LPA', ' lakh')}`
        : `${lakh(lower).replace(' LPA', '')}–${lakh(s.upTo).replace(' LPA', ' lakh')}`
    lower = s.upTo
    return [band, s.rate === 0 ? 'Nil' : `${Math.round(s.rate * 100)}%`]
  })
}

const SECTIONS = [
  { id: 'calculator', label: 'Calculator' },
  { id: 'table', label: 'In-hand by CTC' },
  { id: 'example', label: 'Line by line' },
  { id: 'regime', label: 'Old vs new' },
  { id: 'offers', label: 'Compare offers' },
  { id: 'rules', label: '2026-27 rules' },
  { id: 'faq', label: 'FAQ' },
]

const FAQ = [
  {
    q: `What is the in-hand salary for ${lakh(12 * 100000)}?`,
    a: `About ${inr(W12.r.monthlyInHand)} a month under the new regime, if basic is 50% of CTC, PF is 12% on the ₹${PF_WAGE_CEILING.toLocaleString('en-IN')} wage ceiling, gratuity sits inside the CTC and professional tax is ₹2,500 a year. Taxable salary is ${inr(W12.r.regimes.new.taxable)}, under the ₹12 lakh rebate limit, so income tax is zero.`,
  },
  {
    q: 'How much tax is there on ₹20 LPA in the new regime?',
    a: `${inr(r20.regimes.new.tax)} for tax year ${TAX_YEAR}, including 4% cess, on the defaults above. That leaves about ${inr(r20.monthlyInHand)} a month in hand.`,
  },
  {
    q: 'Is salary up to ₹12.75 lakh tax-free?',
    a: `Under the new regime, yes for salaried people: the ₹${STD_DEDUCTION.new.toLocaleString('en-IN')} standard deduction brings ₹12.75 lakh of salary down to ₹12 lakh of taxable income, and the rebate of up to ₹60,000 cancels the tax on that. Just above ₹12 lakh, marginal relief caps the tax at the amount you are over.`,
  },
  {
    q: 'Which regime should I choose, old or new?',
    a: `Work out your deductions first. On a ${lakh(30 * 100000)} CTC, the old regime only wins if you claim about ${inr(BE30)} more than the standard deduction, professional tax and your own PF (rent exemption, the rest of 80C, 80D, home-loan interest). Most people under 25 with no home loan are better off in the new regime.`,
  },
  {
    q: 'Did the PF limit change in 2026?',
    a: `Yes. The EPF wage ceiling went from ₹15,000 to ₹25,000 a month from 17 September 2026 (PIB, 16 Sep 2026). If your employer caps PF at the ceiling, both your PF and the employer's PF rise to ₹3,000 a month, so in-hand drops a little and savings rise.`,
  },
]

export default function SalaryCalculatorPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'CTC to in-hand salary calculator (India)',
      url: PAGE_URL,
      applicationCategory: 'FinanceApplication',
      operatingSystem: 'Any',
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
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.autointerviewai.com' },
        { '@type': 'ListItem', position: 2, name: 'Salary calculator', item: PAGE_URL },
      ],
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
          <span className="text-fg-2">Salary calculator</span>
        </nav>

        <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <div className={`${kicker} text-signal-strong`}>
              Free tool · Tax year {TAX_YEAR} · No login · Updated {fmtDate(UPDATED)}
            </div>
            <h1 className="mt-4 font-serif text-display font-medium text-fg">
              CTC to in-hand salary calculator for India
            </h1>
            <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
              A {lakh(12 * 100000)} CTC pays about {inr(W12.r.monthlyInHand)} a month in hand under
              the new regime, with no income tax. A {lakh(20 * 100000)} CTC pays about{' '}
              {inr(r20.monthlyInHand)}. Put in your offer to see your own number, or compare two
              offers side by side.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#calculator"
                className="inline-flex h-11 items-center rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong"
              >
                Calculate my in-hand
              </a>
              <a
                href="#table"
                className="inline-flex h-11 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
              >
                See the CTC table
              </a>
            </div>
          </div>

          <aside
            aria-label="2026-27 salary rules at a glance"
            className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
          >
            <div className={`${kicker} text-fg-3`}>2026-27 rules · sources in the table below</div>
            <dl className="mt-4 divide-y divide-border">
              {[
                [
                  'Tax-free salary',
                  '₹12.75 lakh',
                  'New regime: ₹12 lakh rebate + ₹75,000 deduction',
                ],
                [
                  'PF wage ceiling',
                  `₹${PF_WAGE_CEILING.toLocaleString('en-IN')}/month`,
                  'Up from ₹15,000 on 17 Sep 2026',
                ],
                [
                  '50% HRA cities',
                  `${HRA_METROS.length} cities`,
                  'Bengaluru, Hyderabad, Pune, Ahmedabad added',
                ],
                ['Basic pay', '50% of pay or more', 'Labour codes, in force 21 Nov 2025'],
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
              <strong className="font-semibold">CTC is not salary.</strong> Employer PF and gratuity
              sit inside most CTCs but never reach your bank account each month.
            </li>
            <li>
              <strong className="font-semibold">The new regime wins for most offers.</strong> The
              old regime needs about {inr(BE30)} of extra deductions to beat it at{' '}
              {lakh(30 * 100000)}.
            </li>
            <li>
              <strong className="font-semibold">Compare in-hand, not CTC.</strong> A bigger CTC with
              more variable pay can pay less every month.
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
        <Section
          id="calculator"
          meta="Step 1 · 1 min"
          title="Your in-hand salary"
          intro="Change the CTC and the PF line to match your offer letter. Both tax regimes run at once and the cheaper one is shown."
        >
          <SalaryCalculator />
        </Section>

        <Section
          id="table"
          meta={`${WORKED.length} CTCs · tax year ${TAX_YEAR}`}
          title="In-hand salary by CTC"
          intro="Monthly in-hand on the same defaults for every row: 50% basic, PF on the ₹25,000 ceiling, gratuity inside the CTC, ₹2,500 professional tax, no variable pay."
        >
          <Table
            label="Monthly in-hand salary by CTC, new and old regime"
            caption={
              <>
                Computed from the rules in the table further down. Old regime here claims only the
                standard deduction, professional tax and your PF. Checked {fmtDate(RULES_CHECKED)}.
              </>
            }
            head={[
              'CTC',
              'Gross salary / yr',
              'Tax, new regime / yr',
              'In-hand / month (new)',
              'In-hand / month (old)',
              'Old regime needs extra deductions of',
            ]}
            min="min-w-[760px]"
            rows={WORKED.map((w) => [
              lakh(w.l * 100000),
              inr(w.r.gross),
              inr(w.r.regimes.new.tax),
              <strong key="m" className="font-semibold text-fg">
                {inr(w.r.monthlyInHand)}
              </strong>,
              inr(w.oldMonthly),
              w.breakEven === 0 ? 'Ties at zero tax' : inr(w.breakEven as number),
            ])}
          />
        </Section>

        <Section
          id="example"
          meta={`Worked example · ${lakh(20 * 100000)}`}
          title={`Where a ${lakh(20 * 100000)} CTC goes, line by line`}
          intro="Every line comes from the same rules as the calculator, and the lines add up."
        >
          <Table
            label={`Worked example for a ${lakh(20 * 100000)} CTC`}
            caption="New regime, defaults as above. Rounded to the rupee."
            head={['Line', 'Per year', 'Per month', 'Why']}
            min="min-w-[640px]"
            rows={[
              ['CTC', inr(r20.fixed), inr(r20.fixed / 12), 'What the offer letter says'],
              [
                '− Employer PF',
                inr(r20.employerPf),
                inr(r20.employerPf / 12),
                `12% of basic, capped at ₹${PF_WAGE_CEILING.toLocaleString('en-IN')} a month`,
              ],
              [
                '− Gratuity',
                inr(r20.gratuity),
                inr(r20.gratuity / 12),
                '4.81% of basic, paid when you leave',
              ],
              [
                '= Gross salary',
                inr(r20.gross),
                inr(r20.gross / 12),
                'Basic + HRA + special allowance',
              ],
              [
                '− Your PF',
                inr(r20.employeePf),
                inr(r20.employeePf / 12),
                'Same 12% from your side',
              ],
              ['− Professional tax', inr(2500), inr(2500 / 12), 'State tax, ₹2,500 a year at most'],
              [
                '− Income tax',
                inr(r20.regimes.new.tax),
                inr(r20.regimes.new.tax / 12),
                `On ${inr(r20.regimes.new.taxable)} after the ₹75,000 deduction, + 4% cess`,
              ],
              [
                '= In-hand',
                <strong key="y" className="font-semibold text-fg">
                  {inr(r20.annualInHand)}
                </strong>,
                <strong key="m" className="font-semibold text-fg">
                  {inr(r20.monthlyInHand)}
                </strong>,
                'What reaches your bank account',
              ],
            ]}
          />
          <P>
            Of the {inr(r20.fixed)} CTC, {inr(r20.employerPf + r20.employeePf)} a year goes into
            your PF account and {inr(r20.gratuity)} is set aside as gratuity. That money is still
            yours, just not this month. Income tax takes {inr(r20.regimes.new.tax)}.
          </P>
        </Section>

        <Section
          id="regime"
          meta="Old vs new regime"
          title="Which tax regime should you pick?"
          intro="The new regime is the default. The old one only pays off if your deductions are large."
        >
          <P>
            The last column of the CTC table is the break-even: the extra deductions you need,
            beyond the standard deduction, professional tax and your own PF, before the old regime
            costs less. Count HRA exemption on rent, the rest of 80C (up to ₹1.5 lakh in total), 80D
            health cover and home-loan interest.
          </P>
          <ul className="max-w-prose space-y-2.5">
            {[
              `Under ${lakh(8 * 100000)}, both regimes usually land at or near zero tax.`,
              `From ${lakh(10 * 100000)} to ${lakh(20 * 100000)}, the old regime needs ${inr(at(10).breakEven as number)}–${inr(W20.breakEven as number)} of extra deductions. Rent in a big city plus full 80C can get there.`,
              `From ${lakh(30 * 100000)} up, it needs about ${inr(BE30)}. That usually means a home loan as well as rent and 80C.`,
            ].map((t) => (
              <li key={t} className="flex gap-3 text-body text-fg-2">
                <span
                  aria-hidden="true"
                  className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-signal"
                />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="grid gap-6 md:grid-cols-2">
            <Table
              label="New regime slabs"
              caption={
                <>
                  New regime, tax year {TAX_YEAR}. <Src s={SOURCES.slabsOfficial} />
                </>
              }
              head={['Taxable income', 'Rate']}
              min="min-w-0"
              rows={slabText(NEW_SLABS)}
            />
            <Table
              label="Old regime slabs"
              caption={
                <>
                  Old regime, under 60. <Src s={SOURCES.slabsOfficial} />
                </>
              }
              head={['Taxable income', 'Rate']}
              min="min-w-0"
              rows={slabText(OLD_SLABS)}
            />
          </div>
        </Section>

        <Section
          id="offers"
          meta="Two offers · 6 checks"
          title="How to compare two job offers"
          intro="Switch the calculator to “Compare two offers”, then check the lines a CTC hides."
        >
          <ol className="max-w-prose list-decimal space-y-3 pl-5 text-body text-fg-2 marker:text-fg-3">
            <li>
              <strong className="font-semibold text-fg">Fixed pay.</strong> Compare the monthly
              in-hand line first. It is the only number you can plan rent and EMIs around.
            </li>
            <li>
              <strong className="font-semibold text-fg">Variable pay.</strong> Ask what share was
              actually paid last year. A target bonus is not a promise.
            </li>
            <li>
              <strong className="font-semibold text-fg">PF on full basic or the ceiling.</strong>{' '}
              Full-basic PF lowers in-hand but saves more. Neither is wrong; just compare like with
              like.
            </li>
            <li>
              <strong className="font-semibold text-fg">Joining bonus.</strong> Read the clawback
              clause. It is usually repayable if you leave within a set period.
            </li>
            <li>
              <strong className="font-semibold text-fg">ESOPs and RSUs.</strong> Leave them out of
              the CTC comparison. Value them separately, with the vesting schedule.
            </li>
            <li>
              <strong className="font-semibold text-fg">Notice period.</strong> If the new employer
              will buy out your notice, get it in the offer letter.
            </li>
          </ol>
          <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
            <h3 className="text-h4 font-semibold text-fg">Check pay for your role</h3>
            <p className="mt-1 text-small text-fg-2">
              Each role guide has posted pay for India and the US, with sources. Put the range into
              the calculator to see what it means each month.
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {ROLE_HUB_LIST.map((h) => (
                <li key={h.slug}>
                  <Link
                    href={ROLE_SALARIES[h.slug] ? `/${h.slug}/salary` : `/${h.slug}#pay`}
                    className="flex min-h-11 items-center gap-2 rounded-lg border border-border px-3 py-2 text-small text-fg transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                  >
                    <span aria-hidden="true" className="text-signal-strong">
                      →
                    </span>
                    {h.roleName} pay
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        <Section
          id="rules"
          meta={`Sources · checked ${fmtDate(RULES_CHECKED)}`}
          title="The 2026-27 rules this calculator uses"
          intro="Every rule links to the page it came from. If a rule changes, this table and the calculator change together."
        >
          <Table
            label="Salary and tax rules used"
            caption="Resident individual under 60, salary income only."
            head={['Rule', 'Value', 'Source']}
            min="min-w-[640px]"
            rows={[
              [
                'Tax slabs',
                'Unchanged by Budget 2026 for tax year 2026-27',
                <Src key="s" s={SOURCES.slabsOfficial} />,
              ],
              [
                'Rebate, new regime',
                'Up to ₹60,000 if taxable income ≤ ₹12 lakh',
                <Src key="s" s={SOURCES.rebate} />,
              ],
              [
                'Rebate, old regime',
                'Up to ₹12,500 if taxable income ≤ ₹5 lakh',
                <Src key="s" s={SOURCES.rebate} />,
              ],
              [
                'Standard deduction',
                `₹${STD_DEDUCTION.new.toLocaleString('en-IN')} new · ₹${STD_DEDUCTION.old.toLocaleString('en-IN')} old`,
                <span key="s">
                  <Src s={SOURCES.budget2026} />; <Src s={SOURCES.oldStdDeduction} />
                </span>,
              ],
              [
                'Surcharge',
                '10% above ₹50 lakh, 15% above ₹1 crore, 25% above ₹2 crore (old regime: 37% above ₹5 crore)',
                <Src key="s" s={SOURCES.ratesPage} />,
              ],
              ['Cess', '4% on tax + surcharge', <Src key="s" s={SOURCES.ratesPage} />],
              [
                'PF',
                `12% employee + 12% employer; wage ceiling ₹${PF_WAGE_CEILING.toLocaleString('en-IN')}/month from 17 Sep 2026`,
                <span key="s">
                  <Src s={SOURCES.pfCeiling} />; <Src s={SOURCES.pfRates} />
                </span>,
              ],
              [
                'HRA exemption (old regime)',
                `Least of HRA received, rent − 10% of basic, and 50% of basic in ${HRA_METROS.join(', ')} (40% elsewhere)`,
                <Src key="s" s={SOURCES.hraCities} />,
              ],
              [
                'Basic pay',
                'Basic + DA at least 50% of pay, or the shortfall counts as wages',
                <Src key="s" s={SOURCES.wageRule} />,
              ],
              [
                '80C (now section 123), old regime',
                '₹1.5 lakh a year in total; the calculator counts your PF inside it',
                <Src key="s" s={SOURCES.sec123} />,
              ],
              [
                'Professional tax',
                'At most ₹2,500 a year; rates vary by state',
                <Src key="s" s={SOURCES.profTax} />,
              ],
            ]}
          />
          <p className="max-w-prose text-caption text-fg-3">
            Not tax advice. Your employer&apos;s payroll may differ in rounding, perquisites, meal
            cards or flexible benefits. Gratuity at 4.81% of basic (15 days&apos; basic per year ÷
            26 working days) is the common way companies show it inside a CTC.
          </p>
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
              ['/free-mock-interview', 'Practice', 'Free AI mock interview'],
              ['/founders-office/salary', 'Pay data', "Founder's Office salary in India"],
              ['/free-resources', 'Library', 'Free interview resources'],
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
          <div className={`${kicker} text-signal-on-ink`}>Free · no login to start</div>
          <h2 className="mt-3 max-w-2xl font-serif text-h1 font-medium text-ink-fg">
            Get the offer first. Practise the interview out loud.
          </h2>
          <p className="mt-3 max-w-[56ch] text-body-lg text-ink-fg-2">
            Run a free voice mock interview for your role and hear where your answers are thin.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/free-mock-interview"
              className="inline-flex h-11 items-center rounded-full bg-white px-5 text-small font-semibold text-ink transition-colors duration-fast hover:bg-white/90"
            >
              Start a free mock interview
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
