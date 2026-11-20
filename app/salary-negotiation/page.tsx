import type { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import type { ReactNode } from 'react'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import NegotiationBuilder, { Checks } from '@/components/negotiation/NegotiationBuilder'
import { BarList, Figure, Flow, Insight, StatRow } from '@/components/viz'
import { checkMessage, script, SAMPLES, WEAK, words } from '@/data/negotiation/engine'

const PAGE_URL = 'https://www.autointerviewai.com/salary-negotiation'
const UPDATED = '2026-11-19'
const TITLE = 'Salary Negotiation Scripts: Free Counter Email + Call Builder'
const DESC =
  'Turn your offer into a counter email, a call script and replies to "max budget" or "send payslips". India (CTC, LPA) and US. One precise number, 8 checks. Free, no AI.'

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
  pew: {
    label:
      'Pew Research Center, When negotiating starting salaries, most U.S. women and men don’t ask for higher pay (5 Apr 2023; 5,188 employed adults)',
    url: 'https://www.pewresearch.org/short-reads/2023/04/05/when-negotiating-starting-salaries-most-us-women-and-men-dont-ask-for-higher-pay/',
  },
  columbia: {
    label:
      'Columbia Business School, press release on Mason, Ames, Lee & Wiley, precise offers as anchors (Journal of Experimental Social Psychology, 2013)',
    url: 'https://business.columbia.edu/press-release/cbs-press-releases/new-research-shows-asking-precise-not-round-number-during',
  },
  pon: {
    label:
      'Harvard Program on Negotiation, Katie Shonk, How to Negotiate a Higher Salary after a Job Offer (29 Oct 2026)',
    url: 'https://www.pon.harvard.edu/daily/salary-negotiations/how-to-negotiate-a-higher-salary-after-a-job-offer',
  },
  aon: {
    label:
      'Aon, Salary Increase and Turnover Study, India (14 Oct 2026; 1,200+ organisations, 45 industries)',
    url: 'https://www.aon.com/apac/in-the-press/asia-newsroom/2026/aon-study-finds-salaries-in-india-projected-to-fise-9-1-in-2027-employers-balance-growth-and-cost-pressures',
  },
  wtw: {
    label: 'WTW, Salary Budget Planning Report, US (15 Jul 2026)',
    url: 'https://www.wtwco.com/en-us/news/2026/07/employers-shift-from-bigger-pay-budgets-to-smarter-pay-strategies-wtw-finds',
  },
  ca: {
    label: 'California Labor Commissioner, California Equal Pay Act FAQ',
    url: 'https://dir.ca.gov/dlse/California_Equal_Pay_Act.htm',
  },
  ny: {
    label: 'New York State, Salary history ban: what you need to know',
    url: 'https://www.ny.gov/salary-history-ban/salary-history-ban-what-you-need-know',
  },
  nyPay: {
    label: 'New York Governor, statewide pay transparency law takes effect (17 Sep 2023)',
    url: 'https://www.governor.ny.gov/news/governor-hochul-celebrates-new-yorks-statewide-pay-transparency-law-groundbreaking-legislation',
  },
  co: {
    label: 'Colorado CDLE, Equal Pay for Equal Work Act, C.R.S. 8-5-101 et seq.',
    url: 'https://cdle.colorado.gov/sites/cdle/files/co_equal_pay_for_equal_work_act_%E2%80%9Cepewa%E2%80%9D%29%2C_c.r.s_%C2%A7_8-5-101%2C_et_seq.pdf',
  },
  wa: {
    label: 'Washington State Legislature, RCW 49.58.110',
    url: 'https://app.leg.wa.gov/RCW/default.aspx?cite=49.58.110',
  },
  il: {
    label: 'Illinois Department of Labor, pay transparency press release (16 Dec 2024)',
    url: 'https://labor.illinois.gov/news/press-release.30746.html',
  },
  ma: {
    label: 'Mass.gov, Pay transparency in Massachusetts',
    url: 'https://www.mass.gov/info-details/pay-transparency-in-massachusetts',
  },
  revoked: {
    label: 'r/developersIndia, “remote offer revoked” after the candidate had resigned (Apr 2025)',
    url: 'https://www.reddit.com/r/developersIndia/comments/1k465cl/',
  },
}

const COUNTER = script(SAMPLES[0].inputs, 'counter', 'email').body
const R_WEAK = checkMessage(WEAK)
const R_STRONG = checkMessage(COUNTER)

const LAWS: {
  state: string
  history: ReactNode
  ranges: string
  src: { label: string; url: string }[]
}[] = [
  {
    state: 'California',
    history: 'Banned: an employer “cannot … seek salary history information”',
    ranges: '15+ employees must put the pay scale in any job posting; applicants can ask for it',
    src: [SRC.ca],
  },
  {
    state: 'New York State',
    history: 'Banned since 6 Jan 2020 (Labor Law 194-a)',
    ranges: '4+ employees, since 17 Sep 2023: minimum and maximum pay in postings',
    src: [SRC.ny, SRC.nyPay],
  },
  {
    state: 'Colorado',
    history: 'Banned: employers may not seek or rely on wage-rate history',
    ranges: 'Postings must show the pay or pay range (Equal Pay for Equal Work Act)',
    src: [SRC.co],
  },
  {
    state: 'Washington',
    history: 'Not checked here',
    ranges: '15+ employees, since 1 Jan 2023: wage scale or salary range plus benefits',
    src: [SRC.wa],
  },
  {
    state: 'Illinois',
    history: 'Not checked here',
    ranges: '15+ employees, since 1 Jan 2025: pay scale and benefits in postings',
    src: [SRC.il],
  },
  {
    state: 'Massachusetts',
    history: 'Not checked here',
    ranges: '25+ employees, since 29 Oct 2025: pay range in postings and on request',
    src: [SRC.ma],
  },
]

const FAQ = [
  {
    q: 'How do I negotiate salary after a job offer?',
    a: 'Thank them, then ask for one precise number with one reason: market pay for the role, a bigger scope than the level offered, or a real competing offer. Put it in writing or say it on a call and then stop talking. If base cannot move, ask for the gap as a joining or sign-on bonus, a notice buyout or a written pay review. Accept only once the revised offer is in writing.',
  },
  {
    q: 'Will the company withdraw my offer if I negotiate?',
    a: 'Asking politely, once, with a reason, is normal. Harvard’s Program on Negotiation says not negotiating is typically a mistake, and that experienced hiring managers may reconsider an offer if they sense bad-faith bargaining. So avoid ultimatums, invented offers and repeated rounds. In Pew’s 2023 survey, of US workers who asked for more pay, 66% got more and 35% kept the first offer; the survey did not ask about withdrawn offers.',
  },
  {
    q: 'How much should I ask for?',
    a: 'Start from what people in the role are paid, not from your current pay. Our salary pages show employee-reported pay by company for several roles. Pick the top number you can justify, then say it as a precise figure: the builder turns a round ₹19 LPA into ₹19.3 LPA, because a Columbia Business School study found precise numbers read as better researched.',
  },
  {
    q: 'What should I answer to “what is your expected CTC”?',
    a: 'One number based on the role, then ask for their range: “For this role I am looking at about ₹X fixed, based on the scope and what people in similar roles report. Could you share the budgeted range?” Say fixed or total so there is no confusion, and do not lead with a percentage over your current CTC.',
  },
  {
    q: 'HR is asking for my last 3 payslips. Should I share them?',
    a: 'Many Indian employers ask for payslips or a relieving letter during background checks, so never inflate your current CTC. You can say you will share documents at the offer stage, and move the talk back to the role: your expectation is about this job, not a percentage over your old pay.',
  },
  {
    q: 'How much hike should I ask for when switching jobs in India?',
    a: `There is no fair standard percentage, because your current pay may be low or high for the market. For context, Aon’s survey of 1,200+ companies found an average 9% salary increase in India in 2026, and projects 9.1% for 2027. A switch is priced on the new role, so compare the offer with what people in that role report, not with your appraisal.`,
  },
  {
    q: 'HR says this is the maximum budget. What now?',
    a: 'Accept the band, then ask for the gap in another form: a one-time joining bonus, cover for your notice buyout, or a pay review at 6 months with the amount written into the offer letter. You can also ask whether the role is levelled correctly, since the level usually sets the band.',
  },
  {
    q: 'Can I ask the company to pay my notice period buyout?',
    a: 'You can ask, usually as a joining bonus. Before you accept, get the terms in writing: how long you must stay, whether repayment is pro-rated, and whether your notice period counts towards that time. The builder’s “Bonus + buyout” script asks all three questions.',
  },
  {
    q: 'When should I resign from my current job?',
    a: 'After you have the signed, final offer letter, not after a call or an email saying yes. Candidates in India have had offers revoked after they resigned. If your employer asks for a long notice period, confirm the joining date in writing too.',
  },
  {
    q: 'My current company made a counter-offer. Should I stay?',
    a: 'Ask why it took a resignation to pay you that, and whether the reasons you were leaving (role, manager, growth) change too. Compare both offers on the same basis: fixed pay, variable, bonus clawbacks and joining date. If you have accepted the new offer in writing, tell the new company early if you change your mind; do not use their offer just to get a raise.',
  },
  {
    q: 'Can freshers negotiate a campus or first job offer?',
    a: 'Campus offers are usually fixed for the whole batch, so the base rarely moves. You can still ask about the joining date, location, a relocation allowance and the terms of any service bond or joining-bonus clawback. Off-campus offers for freshers can sometimes move a little with a competing offer or a strong internship; ask once, politely.',
  },
  {
    q: 'What should I type in the "expected CTC" field on a job application?',
    a: 'One number, the same one you would say on a call, written as total or fixed so it is clear, for example "19.3 LPA fixed". If the form allows text, add "negotiable based on role scope". Avoid 0 or "as per company norms": recruiters filter on this field.',
  },
  {
    q: 'Can US employers ask about my current salary?',
    a: 'It depends on the state. Several states, including California, New York State and Colorado, ban employers from seeking your salary history, and several states require pay ranges in job postings; see the table on this page with links to each state’s page. Where the question is allowed, you can still steer to the role: “I am targeting about $X base. What range is budgeted?”',
  },
  {
    q: 'Should I negotiate over email or on a call?',
    a: 'Either works. Email gives you time to choose words and leaves a record; a call is faster and warmer. Many people send a short email asking for a call, then confirm what was agreed in writing. The builder gives both versions of each script.',
  },
  {
    q: 'Is my offer saved or sent anywhere?',
    a: 'Your inputs are saved only in this browser, so they are there when you come back. Nothing is uploaded and no AI reads your text; every script is a template and every check is a rule shown on this page.',
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
  { id: 'builder', label: 'Builder' },
  { id: 'does-it-work', label: 'Does asking work' },
  { id: 'steps', label: 'The steps' },
  { id: 'benchmarks', label: 'Raise benchmarks' },
  { id: 'read-ctc', label: 'Read the CTC' },
  { id: 'us-law', label: 'US laws' },
  { id: 'example', label: 'Weak vs strong' },
  { id: 'faq', label: 'FAQ' },
]

export default function SalaryNegotiationPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Salary Negotiation Script Builder',
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
        { '@type': 'ListItem', position: 2, name: 'Salary negotiation scripts', item: PAGE_URL },
      ],
    },
  ]

  return (
    <DomainLayout currentPath="/salary-negotiation">
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
            <span className="text-fg-2">Salary negotiation scripts</span>
          </nav>

          <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free · India + US · 7 scripts · No AI · Updated 19 Nov 2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                Salary negotiation scripts, built from your offer
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                Type the offer, your ask and your walk-away. You get one precise number to say, the
                counter email and the call script, and what to say when they reply &ldquo;this is
                the max budget&rdquo;, &ldquo;send your payslips&rdquo; or &ldquo;we will revise in
                6 months&rdquo;. Works in CTC and LPA for India and in base salary for the US.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#builder"
                  className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  Build my counter
                </a>
                <MockInterviewButton caption={false} label="Still interviewing? Practise free" />
              </div>
            </div>

            <aside
              aria-label="Three rules behind the scripts"
              className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
            >
              <div className={`${kicker} text-fg-3`}>Three rules behind every script</div>
              <ol className="mt-4 space-y-3">
                {(
                  [
                    [
                      'Do not ask if it is negotiable',
                      '“just begin the negotiation.” Harvard PON',
                      SRC.pon.url,
                    ],
                    [
                      'Say one precise number',
                      '₹19.3 LPA reads as researched; ₹19 LPA as rounded. Columbia study',
                      SRC.columbia.url,
                    ],
                    [
                      'Get every yes in writing',
                      'Resign only after the signed letter arrives.',
                      SRC.revoked.url,
                    ],
                  ] as const
                ).map(([t, q, u], i) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal-tint font-mono text-small font-semibold text-signal-ink">
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-small font-semibold text-fg">{t}</span>
                      <a
                        href={u}
                        target="_blank"
                        rel="noopener"
                        className="block text-caption text-fg-2 hover:text-fg"
                      >
                        {q}
                      </a>
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
                <strong className="font-semibold">Asking usually pays:</strong> of US workers who
                asked for more pay the last time they were hired, 66% got more (Pew, 2023).
              </li>
              <li>
                <strong className="font-semibold">Thank, give one reason, say one number,</strong>{' '}
                then stop. No range, no apology, no rent or EMI.
              </li>
              <li>
                <strong className="font-semibold">If base is stuck,</strong> ask for the gap as a
                joining or sign-on bonus, a notice buyout or a written review date.
              </li>
              <li>
                <strong className="font-semibold">Price the role, not your old pay:</strong> the
                average salary increase in India was 9% in 2026 (Aon); a new job is priced on the
                new role.
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
            id="builder"
            meta="The builder · about 3 minutes"
            title="Your offer in, your words out"
            intro="A fictional sample is loaded so you can see the result. Change the numbers to yours; the number to say, the scripts and the checks update as you type."
          >
            <NegotiationBuilder />
          </Section>

          <Section
            id="does-it-work"
            meta="Does asking work · Pew Research Center, 5,188 US workers, Apr 2023"
            title="Two in three who asked got more; only about 3 in 10 asked"
            intro="Pew asked US workers about the last time they were hired. Most did not ask for more pay. Of those who did, most got at least part of what they asked for."
          >
            <Figure
              label="What happened when US workers asked for higher pay than offered"
              title="66% of those who asked got more than the first offer"
              source={[SRC.pew]}
              updated="Apr 2023"
              table={{
                head: ['Outcome after asking', 'Share of those who asked'],
                rows: [
                  ['Got more, but less than they asked for', '38%'],
                  ['Kept the first offer', '35%'],
                  ['Got what they asked for', '28%'],
                ],
              }}
            >
              <BarList
                emphasis
                format={{ suffix: '%' }}
                max={50}
                rows={[
                  { label: 'Got more, but less than asked', value: 38, highlight: true },
                  { label: 'Got what they asked for', value: 28, highlight: true },
                  { label: 'Kept the first offer', value: 35 },
                ]}
              />
            </Figure>
            <StatRow
              stats={[
                {
                  label: 'Men who asked for more',
                  value: '32%',
                  sub: 'Women: 28% (Pew, 2023)',
                  href: SRC.pew.url,
                },
                {
                  label: 'Did not ask: “didn’t feel comfortable”',
                  value: '38%',
                  sub: 'Women 42%, men 33%',
                  href: SRC.pew.url,
                },
                {
                  label: 'Ages 18–29 not comfortable asking',
                  value: '46%',
                  sub: 'Ages 65+: 19%',
                  href: SRC.pew.url,
                },
              ]}
            />
            <P>
              The shares add to 101% because Pew rounds each one. These are US workers describing
              their own hiring, so treat them as direction, not a promise; we found no survey of the
              same quality for India. The pattern behind the scripts is the same in both markets:
              the people who got more were the ones who asked, and among those who did not ask,
              about as many felt uncomfortable asking (38%) as were happy with the offer (39%). A
              written script takes some of the discomfort out.
            </P>
          </Section>

          <Section
            id="steps"
            meta="The steps · from offer to signed letter"
            title="Six steps, one round, everything in writing"
            intro="Negotiation goes best as one clear round, not a long haggle. The builder has a script for each step."
          >
            <Flow
              label="How a salary negotiation runs"
              steps={[
                {
                  title: 'Get it in writing',
                  body: 'Ask for the full offer letter and CTC breakup or package details.',
                },
                {
                  title: 'Ask for time',
                  body: 'A specific date, 2–3 working days out, with a reason.',
                },
                {
                  title: 'Counter once',
                  body: 'Thanks, one reason, one precise number. Then stop talking.',
                },
                {
                  title: 'Handle the reply',
                  body: '“Max budget”? Ask for the gap as a bonus, buyout or review.',
                },
                {
                  title: 'Get the revision',
                  body: 'The new number and every promise in a revised letter.',
                },
                {
                  title: 'Sign, then resign',
                  body: 'Give notice only after the signed letter arrives.',
                },
              ]}
            />
            <Insight title="Why one precise number">
              In the study behind the{' '}
              <a href={SRC.columbia.url} target="_blank" rel="noopener" className={link}>
                Columbia Business School release
              </a>
              , people in negotiation experiments (not salary talks specifically) who received a
              precise offer ($5,015 rather than $5,000) saw the person making it as better informed
              and conceded more. The builder applies this as a simple rule: a round ask moves about
              1.5% up and is rounded to the nearest ₹5,000 or $250. A range does the opposite: it
              tells them the bottom is fine.
            </Insight>
          </Section>

          <Section
            id="benchmarks"
            meta="Raise benchmarks · Aon India Oct 2026, WTW US Jul 2026"
            title="Average pay rises were about 9% in India and 3.5% in the US in 2026"
            intro="These are average salary increases from employer surveys. They are a floor for context, not a target for a job switch: a new job is priced on what the role pays."
          >
            <Figure
              label="Projected average salary increase in India for 2027, selected industries"
              title="NBFCs top Aon’s 2027 India projection at 10.1%; tech consulting is lowest at 6.6% (9 of 17 industries shown)"
              source={[SRC.aon]}
              updated="Oct 2026"
              table={{
                head: ['Industry', 'Projected 2027 increase'],
                rows: [
                  ['NBFCs', '10.1%'],
                  ['Energy (oil, gas, power)', '9.9%'],
                  ['Real estate / infrastructure', '9.8%'],
                  ['Tech platforms and products', '9.5%'],
                  ['Global capability centres', '9.4%'],
                  ['Overall India', '9.1%'],
                  ['Banking', '8.5%'],
                  ['Chemicals', '8.0%'],
                  ['Tech consulting and services', '6.6%'],
                ],
              }}
            >
              <BarList
                format={{ suffix: '%', decimals: 1 }}
                max={12}
                rows={[
                  { label: 'NBFCs', value: 10.1 },
                  { label: 'Energy (oil, gas, power)', value: 9.9 },
                  { label: 'Real estate / infrastructure', value: 9.8 },
                  { label: 'Tech platforms and products', value: 9.5 },
                  { label: 'Global capability centres', value: 9.4 },
                  { label: 'Overall India', value: 9.1, highlight: true },
                  { label: 'Banking', value: 8.5 },
                  { label: 'Chemicals', value: 8.0 },
                  { label: 'Tech consulting and services', value: 6.6 },
                ]}
              />
            </Figure>
            <StatRow
              stats={[
                {
                  label: 'India, actual 2026',
                  value: '9%',
                  sub: 'Attrition rose to 18% (Aon)',
                  href: SRC.aon.url,
                },
                {
                  label: 'India, projected 2027',
                  value: '9.1%',
                  sub: '1,200+ organisations (Aon)',
                  href: SRC.aon.url,
                },
                {
                  label: 'US, actual 2026',
                  value: '3.5%',
                  sub: '2027 projected: 3.4% (WTW)',
                  href: SRC.wtw.url,
                },
              ]}
            />
            <P>
              For the role itself, use pay that people in the job report. Our salary pages collect
              it by company:{' '}
              <Link href="/product-manager/salary" className={link}>
                product manager
              </Link>
              ,{' '}
              <Link href="/data-analyst/salary" className={link}>
                data analyst
              </Link>
              ,{' '}
              <Link href="/ai-engineer/salary" className={link}>
                AI engineer
              </Link>
              ,{' '}
              <Link href="/fde/salary" className={link}>
                forward deployed engineer
              </Link>
              ,{' '}
              <Link href="/gtm-engineer/salary" className={link}>
                GTM engineer
              </Link>{' '}
              and{' '}
              <Link href="/founders-office/salary" className={link}>
                founder&apos;s office
              </Link>
              . Before you counter in India, run the offer through the{' '}
              <Link href="/salary-calculator" className={link}>
                CTC to in-hand calculator
              </Link>{' '}
              so you know what the number means each month.
            </P>
          </Section>

          <Section
            id="read-ctc"
            meta="India · read the offer before you counter"
            title="Counter on fixed pay, not on a CTC full of one-time money"
            intro="Two offers with the same CTC can pay very different amounts each month. Before you name a number, split the CTC into what you will actually get."
          >
            <ul className="grid gap-3 md:grid-cols-2">
              {[
                [
                  'Variable pay',
                  'Counted at 100% in the CTC, but paid only if targets are met. Ask what was paid out last year.',
                ],
                [
                  'Joining or retention bonus',
                  'One-time money inside the CTC. It disappears in year two and often has a clawback.',
                ],
                [
                  'ESOPs',
                  'Sometimes added to CTC at a paper value. Ask for the number of options, strike price and vesting.',
                ],
                [
                  'Employer PF and gratuity',
                  'Part of CTC but not in your monthly salary. Your in-hand pay is lower than CTC ÷ 12.',
                ],
              ].map(([t, b]) => (
                <li key={t} className="rounded-xl border border-border bg-surface p-4">
                  <span className="block text-small font-semibold text-fg">{t}</span>
                  <span className="mt-1 block text-small text-fg-2">{b}</span>
                </li>
              ))}
            </ul>
            <P>
              The builder works on fixed pay for this reason. To see what a CTC means each month,
              run it through the{' '}
              <Link href="/salary-calculator" className={link}>
                CTC to in-hand calculator
              </Link>
              ; with two offers, use the{' '}
              <Link href="/job-offer-comparison" className={link}>
                job offer comparison
              </Link>
              , which handles clawbacks and ESOPs.
            </P>
          </Section>

          <Section
            id="us-law"
            meta={`US rules · ${LAWS.length} state pages opened 19 Nov 2026`}
            title="In several US states, you can see the range and skip the salary-history question"
            intro="Pay-transparency laws put a range in the job post; salary-history bans stop employers asking what you earn now. Both help you anchor on the role. Check your own state; this is not legal advice."
          >
            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="US state rules on salary history and pay ranges"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
            >
              <table className="w-full min-w-[640px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                      State
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Asking your salary history
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Pay range in job posts
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {LAWS.map((l) => (
                    <tr key={l.state}>
                      <th
                        scope="row"
                        className="sticky left-0 bg-surface px-4 py-3 align-top font-medium text-fg"
                      >
                        {l.src.map((s, i) => (
                          <a
                            key={s.url}
                            href={s.url}
                            target="_blank"
                            rel="noopener"
                            className={`${link} block`}
                          >
                            {i === 0 ? l.state : 'second source'}
                          </a>
                        ))}
                      </th>
                      <td className="px-4 py-3 align-top text-fg-2">{l.history}</td>
                      <td className="px-4 py-3 align-top text-fg-2">{l.ranges}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <P>
              &ldquo;Not checked here&rdquo; means we did not open that state&apos;s salary-history
              rule for this page, not that there is none. None of these rules apply in India, where
              employers commonly ask for your current CTC and payslips; the builder&apos;s India
              replies cover that.
            </P>
          </Section>

          <Section
            id="example"
            meta="Worked example · the same 8 checks as the builder"
            title={`A typical first draft passes ${R_WEAK.passed} of 8 checks; the builder's passes ${R_STRONG.passed === 8 ? 'all 8' : R_STRONG.passed}`}
            intro={`The weak one is shorter (${words(WEAK)} words) but gives a range, apologises and leans on rent and EMIs. The strong one is the builder's data analyst sample (${words(COUNTER)} words).`}
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                { name: 'Weak', text: WEAK },
                { name: 'Strong', text: COUNTER },
              ].map((m) => (
                <div key={m.name} className="min-w-0 space-y-4">
                  <div className="rounded-2xl border border-border bg-surface p-4 md:p-5">
                    <div className={`${kicker} text-fg-3`}>
                      {m.name} · {words(m.text)} words · fictional
                    </div>
                    <pre className="mt-2 whitespace-pre-wrap break-words font-sans text-small text-fg">
                      {m.text}
                    </pre>
                  </div>
                  <Checks text={m.text} />
                </div>
              ))}
            </div>
          </Section>

          <Section id="faq" meta={`FAQ · ${FAQ.length} questions people ask`} title="Quick answers">
            <div className="space-y-3">
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
                ['/salary-calculator', 'Before you counter', 'CTC to in-hand calculator'],
                ['/job-offer-comparison', 'Two offers?', 'Compare your job offers'],
                ['/product-manager/salary', 'Know the market', 'What PMs are paid in India'],
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
              Sources (opened 19 Nov 2026):{' '}
              {Object.values(SRC).map((s, i) => (
                <span key={s.url}>
                  {i > 0 && '; '}
                  <a href={s.url} target="_blank" rel="noopener" className={link}>
                    {s.label}
                  </a>
                </span>
              ))}
              . Samples, names and the company Northwind Payments are fictional. This page is
              general information, not legal or financial advice.
            </p>
          </Section>
        </div>

        <MockInterviewCTA
          title="Get the offer first. Practise the interview out loud."
          body="A voice interviewer asks the questions for your role, follows up on your answers, and tells you what was strong and what was thin, so you reach the offer stage with leverage."
          questions={[
            'Why are you looking to switch now?',
            'What are your salary expectations for this role?',
            'Tell me about a result you are proud of, with numbers.',
            'Why should we hire you over other candidates?',
          ]}
        />
      </div>
    </DomainLayout>
  )
}
