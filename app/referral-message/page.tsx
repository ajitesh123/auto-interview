import type { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import type { ReactNode } from 'react'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import ReferralBuilder, { Checks } from '@/components/referralMessage/ReferralBuilder'
import { BarList, Figure, Flow, Insight, RangeList, StatRow } from '@/components/viz'
import {
  checkMessage,
  connectionNote,
  DM_TARGET,
  FOLLOW_UP_WORKING_DAYS,
  linkedinMessage,
  RELS,
  NOTE_FREE,
  NOTE_PREMIUM,
  SAMPLES,
  WEAK_DM,
  words,
} from '@/data/referralMessage/engine'

const PAGE_URL = 'https://www.autointerviewai.com/referral-message'
const UPDATED = '2026-11-18'
const TITLE = 'Referral Message for a Job: Free Builder for LinkedIn + Email'
const DESC =
  'Build a referral request in a minute: a LinkedIn note that fits 200 characters, the message, an email, a form summary and a follow-up, with 8 checks. Free, no AI.'

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
  ashby: {
    label: 'Ashby, Talent Trends Report: Referrals (16 May 2025; 38M+ applications, 2021–2024)',
    url: 'https://www.ashbyhq.com/talent-trends-report/reports/referrals',
  },
  burks: {
    label:
      'Burks, Cowgill, Hoffman & Housman, The Value of Hiring through Employee Referrals, QJE 130(2), 2015',
    url: 'https://econpapers.repec.org/RePEc:oup:qjecon:v:130:y:2015:i:2:p:805-839',
  },
  nyfed: {
    label:
      'Brown, Setren & Topa, Do Informal Referrals Lead to Better Matches?, FRBNY Staff Report 568',
    url: 'https://www.newyorkfed.org/medialibrary/media/research/staff_reports/sr568.html',
  },
  microsoft: {
    label: 'Microsoft Careers, Hiring FAQs',
    url: 'https://careers.microsoft.com/v2/global/en/hiringfaqs.html',
  },
  jnj: {
    label: 'Johnson & Johnson Careers, Hiring FAQs',
    url: 'https://www.careers.jnj.com/ja-jp/how-we-hire/hiring-faqs/',
  },
  att: {
    label: 'AT&T Careers, Employee referral program',
    url: 'https://careers.att.jobs/employees/erp-referral-information',
  },
  accenture: {
    label: 'Accenture Careers (Australia), FAQs',
    url: 'https://www.accenture.com/au-en/careers/local/frequently-asked-questions',
  },
  infosys: {
    label: 'Infosys, Recruitment fraud alert',
    url: 'https://www.infosys.com/careers/apply/recruitment-fraud-alert.html',
  },
  happenstance: {
    label:
      'Happenstance, How to ask for a job referral on LinkedIn (26 Aug 2026), quoting LinkedIn Help',
    url: 'https://happenstance.ai/how-to/ask-for-a-job-referral-on-linkedin',
  },
  weekday: {
    label: 'Weekday, Referral message for job (Oct 2026)',
    url: 'https://www.weekday.works/post/referral-message-for-job',
  },
  taplio: {
    label: 'Taplio, LinkedIn referral request examples (Sep 2026)',
    url: 'https://taplio.com/blog/linkedin-referral-request-examples',
  },
  hireflow: {
    label: 'HireFlow, Referral request message examples (Sep 2026)',
    url: 'https://hireflow.net/blog/referral-request-message-examples-us-short-and-polite',
  },
  workat: {
    label:
      'workat.tech, LinkedIn job referrals (Microsoft engineer, c. 2021; marked possibly outdated)',
    url: 'https://workat.tech/general/article/linkedin-job-referrals-ys58hxrjj93f',
  },
  blind: {
    label: 'Blind, How to ask for a referral: advice from an engineering manager',
    url: 'https://www.teamblind.com/post/iMeq6kEY',
  },
}

const STRONG = linkedinMessage(SAMPLES[0].inputs)
const R_WEAK = checkMessage(WEAK_DM, 'dm')
const R_STRONG = checkMessage(STRONG, 'dm')

const FAQ = [
  {
    q: 'How do I ask for a referral on LinkedIn?',
    a: `Find the exact role first and copy its job ID and link. Send a connection request with a short note (under ${NOTE_FREE} characters) that says who you are and that you are applying. After they accept, send one message with the role, job ID, link, one line on why you fit with a number, a view-only resume link and an easy way to say no. Add a 2–3 line summary they can paste into the referral form.`,
  },
  {
    q: 'How long can a LinkedIn connection note be?',
    a: `LinkedIn Help, as quoted by Happenstance in August 2026, says free accounts can send up to five personalised invitations with a ${NOTE_FREE}-character limit, Happenstance gives ${NOTE_PREMIUM} characters for Premium. LinkedIn's own help pages block automated reading, so we could not open them ourselves; LinkedIn shows a live counter when you add a note, so trust that.`,
  },
  {
    q: 'Is it rude to ask a stranger for a referral?',
    a: 'Not if you make it easy and give them a way out. A Microsoft engineer writing on workat.tech asks for the job ID and URL; an engineering manager on Blind asks for a resume link in the first message. Some people would rather talk first, so the builder lets you ask for a referral or for a 10-minute chat.',
  },
  {
    q: 'Should I apply first or get the referral first?',
    a: 'Advice differs. At companies like AT&T and Johnson & Johnson the employee submits you and you then get an email link to apply, so asking first fits how the process runs. An engineering manager on Blind says the opposite: apply on the website without waiting for a reply. Microsoft says a referral "does not replace the application process", so you apply either way. If you already applied, tick that box and the message tells your referrer politely.',
  },
  {
    q: 'When should I follow up if they do not reply?',
    a: `Once, after about a week. The guides we read range from 4–5 days (Weekday) to 5–7 business days (Taplio) to 10 business days (HireFlow). The builder uses ${FOLLOW_UP_WORKING_DAYS} working days and gives you one polite nudge. If there is still no reply, thank them and ask someone else; never send "??".`,
  },
  {
    q: 'Should I send my resume in the first message?',
    a: 'Yes, as a link. An engineering manager on Blind puts it plainly: give a link to your resume in your intro message, from a public place like Google Drive or Dropbox. Set the link to view-only and name the file with your name.',
  },
  {
    q: 'What is the "Ask for a referral" button on LinkedIn?',
    a: 'Taplio describes it: on desktop LinkedIn Jobs, filter by "In your network" and some listings show an "Ask for a referral" button that pre-fills a message to a connection at that company. It only appears when you already know someone there. Rewrite its pre-filled text with the role, your fit and your resume link; the builder\'s LinkedIn message does that.',
  },
  {
    q: 'How do I find someone to ask?',
    a: 'Start with people who know you: friends, ex-colleagues, then alumni of your college. On LinkedIn, search People, filter by the current company, then by your school. Pick someone who does the job you want or works in that team, not a recruiter. Ask one or two people per role, not ten.',
  },
  {
    q: 'What happens after someone refers me?',
    a: "It depends on the company, but employer pages describe the same steps. The employee enters the job ID in an internal form (AT&T asks for the requisition ID). You get an email inviting you to apply (Johnson & Johnson, AT&T). You complete the application. A recruiter then reviews it. Johnson & Johnson says you cannot check your referral status (Microsoft shows referrals in the candidate's Action Center), so ask your referrer to tell you when it is done.",
  },
  {
    q: 'Does a referral guarantee an interview?',
    a: "No. In Ashby's data (38M+ applications, 2021–2024), 40% of referred candidates reached an interview, against 3% of inbound applicants, and 16% of interviewed referrals reached an offer. A referral gets your application read; the interview is still yours to win.",
  },
  {
    q: 'Should I pay for a referral?',
    a: 'No. Real employee referral programmes do not charge candidates. Infosys, for example, says it "does not charge/accept any amount or security deposit from job seekers". Treat anyone who asks for money for a referral as a scam.',
  },
  {
    q: 'Is my information saved or sent anywhere?',
    a: 'Your details and tracker are saved only in this browser, so they are there when you come back. Nothing is uploaded and no AI reads your text; every message is built from templates and every check is a simple rule shown on this page.',
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
  { id: 'why', label: 'Why referrals' },
  { id: 'how', label: 'How it works' },
  { id: 'timing', label: 'Length + timing' },
  { id: 'example', label: 'Weak vs strong' },
  { id: 'templates', label: 'Samples' },
  { id: 'faq', label: 'FAQ' },
]

const EMPLOYERS: { org: string; quote: string; src: { label: string; url: string } }[] = [
  {
    org: 'Microsoft',
    quote: 'A referral does not replace the application process',
    src: SRC.microsoft,
  },
  {
    org: 'Johnson & Johnson',
    quote: 'That e-mail will invite you to apply for the job you were referred to.',
    src: SRC.jnj,
  },
  {
    org: 'AT&T (for employees)',
    quote: 'Select a job and find the Requisition ID at the end of the posting',
    src: SRC.att,
  },
  {
    org: 'Accenture',
    quote:
      'Reach out to current or former Accenture employees in your network to request a referral',
    src: SRC.accenture,
  },
]

export default function ReferralMessagePage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Referral Message Builder',
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
        { '@type': 'ListItem', position: 2, name: 'Referral message builder', item: PAGE_URL },
      ],
    },
  ]

  return (
    <DomainLayout currentPath="/referral-message">
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
            <span className="text-fg-2">Referral message builder</span>
          </nav>

          <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free tool · 4 messages + form summary · 8 checks · No AI, no upload · Updated 18 Nov
                2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                Referral message builder
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                Fill in the role, the job ID and one line on why you fit. You get a LinkedIn
                connection note that fits {NOTE_FREE} characters, the message to send once they
                accept, an email, a summary they can paste into the referral form and a follow-up,
                each checked against what referrers say they need.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#builder"
                  className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  Write my message
                </a>
                <MockInterviewButton caption={false} label="Referred? Practise the interview" />
              </div>
            </div>

            <aside
              aria-label="What a referrer needs from you"
              className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
            >
              <div className={`${kicker} text-fg-3`}>What referrers and guides ask for</div>
              <ol className="mt-4 space-y-3">
                {[
                  [
                    'The exact job ID and link',
                    '“Send your message with the proper job id and URL of the opening.”',
                    SRC.workat,
                  ],
                  [
                    'Your resume, as a link',
                    '“provide a link to your resume IN YOUR INTRO MESSAGE.”',
                    SRC.blind,
                  ],
                  ['A short message', '“3 to 5 sentences under 100 words.”', SRC.taplio],
                ].map(([t, q, s], i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-signal-tint font-mono text-small font-semibold text-signal-ink">
                      {i + 1}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-small font-semibold text-fg">{t as string}</span>
                      <a
                        href={(s as { url: string }).url}
                        target="_blank"
                        rel="noopener"
                        className="block text-caption text-fg-2 hover:text-fg"
                      >
                        {q as string}
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
                <strong className="font-semibold">Find the role yourself.</strong> Send the job ID,
                the link and a view-only resume link in one message; never ask &ldquo;any
                openings?&rdquo;.
              </li>
              <li>
                <strong className="font-semibold">Keep it short:</strong> a note under {NOTE_FREE}{' '}
                characters, a message under {DM_TARGET} words, one line of fit with a number.
              </li>
              <li>
                <strong className="font-semibold">Follow up once</strong> after about{' '}
                {FOLLOW_UP_WORKING_DAYS} working days, then ask someone else.
              </li>
              <li>
                <strong className="font-semibold">It is worth asking:</strong> referred applicants
                reached interview 40% of the time in Ashby&apos;s data, against 3% for inbound.
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
            meta="The builder · about 3 minutes per person"
            title="Fill in once, get every message you need"
            intro="A sample is loaded so you can see the result. Change the details to yours; the messages and checks update as you type."
          >
            <ReferralBuilder />
          </Section>

          <Section
            id="why"
            meta="Why ask · Ashby data, 38M+ applications, Jan 2021–Dec 2024"
            title="Referred applicants reached interview about 13 times as often as inbound"
            intro="Referrals were only about 1% of applications in Ashby's customer data, but they reached the interview stage far more often than people who applied cold."
          >
            <Figure
              label="Share of applicants who reached an interview, by source"
              title="40% of referred applicants got an interview; 3% of inbound did"
              source={[SRC.ashby]}
              updated="May 2025"
              table={{
                head: ['Source', 'Application to interview'],
                rows: [
                  ['Agency', '42%'],
                  ['Internal', '42%'],
                  ['Referral', '40%'],
                  ['Sourced by a recruiter', '25%'],
                  ['Inbound (applied cold)', '3%'],
                ],
              }}
            >
              <BarList
                emphasis
                format={{ suffix: '%' }}
                max={50}
                rows={[
                  { label: 'Agency', value: 42 },
                  { label: 'Internal', value: 42 },
                  { label: 'Referral', value: 40, highlight: true },
                  { label: 'Sourced by a recruiter', value: 25 },
                  { label: 'Inbound (applied cold)', value: 3 },
                ]}
              />
            </Figure>
            <StatRow
              stats={[
                {
                  label: 'Interviewed referrals who got to offer',
                  value: '16%',
                  sub: 'Ashby, 2021–2024; inbound: 6%',
                  href: SRC.ashby.url,
                },
                {
                  label: 'Applications that came from referrals',
                  value: '~1%',
                  sub: '2% in Q1 2021, under 1% by Q1 2024 (Ashby)',
                  href: SRC.ashby.url,
                },
                {
                  label: 'Referred vs not, in 9 large firms',
                  value: 'More likely hired',
                  sub: 'and more likely to accept (Burks et al., QJE 2015)',
                  href: SRC.burks.url,
                },
              ]}
            />
            <P>
              Ashby&apos;s numbers come from companies that use its hiring software, mostly tech
              firms, so treat them as a direction, not a promise. Academic work points the same way:
              a study of nine large firms found referred applicants more likely to be hired and more
              likely to accept offers (
              <a href={SRC.burks.url} target="_blank" rel="noopener" className={link}>
                Burks and colleagues, 2015
              </a>
              ), and a New York Fed paper found referred workers start with a wage edge that fades
              and stay longer (
              <a href={SRC.nyfed.url} target="_blank" rel="noopener" className={link}>
                Brown, Setren and Topa
              </a>
              ).
            </P>
          </Section>

          <Section
            id="how"
            meta={`How a referral works · ${EMPLOYERS.length} employer pages, opened 18 Nov 2026`}
            title="The referrer submits you; you still apply"
            intro="Employer careers pages describe the same few steps. Knowing them tells you what to send: the referrer needs the job ID, and you need to watch your inbox for the apply link."
          >
            <Flow
              label="What happens after you ask"
              steps={[
                { title: 'You ask', body: 'Role, job ID, link, resume link, one line of fit.' },
                {
                  title: 'They submit you',
                  body: 'In an internal portal, using the job’s requisition ID (AT&T).',
                },
                {
                  title: 'You get an email',
                  body: 'It invites you to apply for that job (Johnson & Johnson, AT&T).',
                },
                {
                  title: 'You apply',
                  body: 'A referral does not replace the application (Microsoft).',
                },
                {
                  title: 'A recruiter reviews',
                  body: 'J&J says you cannot check referral status; Microsoft shows it. Ask your referrer.',
                },
              ]}
            />
            <div
              className="overflow-x-auto rounded-xl border border-border bg-surface"
              role="region"
              aria-label="What employers say about referrals"
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              tabIndex={0}
            >
              <table className="w-full min-w-[560px] text-left text-small">
                <thead className="bg-muted text-fg-2">
                  <tr>
                    <th scope="col" className="sticky left-0 bg-muted px-4 py-3 font-medium">
                      Employer
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      What its careers page says
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {EMPLOYERS.map((e) => (
                    <tr key={e.org}>
                      <th
                        scope="row"
                        className="sticky left-0 bg-surface px-4 py-3 align-top font-medium text-fg"
                      >
                        <a href={e.src.url} target="_blank" rel="noopener" className={link}>
                          {e.org}
                        </a>
                      </th>
                      <td className="px-4 py-3 align-top text-fg-2">&ldquo;{e.quote}&rdquo;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Insight title="Apply first or ask first? Advice differs">
              Where the referrer starts the process (AT&amp;T, J&amp;J), asking first matches how it
              runs. An engineering manager on Blind says apply anyway, without waiting for a reply.
              If you have applied, say so and let your referrer check; the builder adds that line
              when you tick &ldquo;I have already applied&rdquo;.
            </Insight>
          </Section>

          <Section
            id="timing"
            meta="Length and follow-up · 4 guides read 18 Nov 2026"
            title={`Under ${DM_TARGET} words, then one nudge after about a week`}
            intro="Guides agree on short messages and one follow-up, but not on the exact wait. We use the middle: five working days."
          >
            <Figure
              label="Advised wait before the first follow-up, in days"
              title="Advice runs from 4 days to 10 working days"
              source={[SRC.weekday, SRC.taplio, SRC.hireflow, SRC.workat]}
              updated="Nov 2026"
              table={{
                head: ['Guide', 'What it says'],
                rows: [
                  ['Weekday', '“After 4–5 days, once.”'],
                  ['Taplio', '“5 to 7 business days” (3–4 if the posting closes that week)'],
                  ['HireFlow', '“Wait ten business days”'],
                  ['workat.tech', '“at max 2-3 followups spread across 10-15 days”'],
                ],
              }}
            >
              <RangeList
                domain={[0, 12]}
                ticks={6}
                format={{ suffix: ' d' }}
                rule={{ value: FOLLOW_UP_WORKING_DAYS, label: 'This builder' }}
                rows={[
                  { label: 'Weekday', sub: 'calendar days', min: 4, max: 5, display: '4–5' },
                  { label: 'Taplio', sub: 'business days', min: 5, max: 7, display: '5–7' },
                  { label: 'HireFlow', sub: 'business days', min: 10, max: 10, display: '10' },
                ]}
              />
            </Figure>
            <StatRow
              stats={[
                {
                  label: 'First message, Weekday',
                  value: '50–80 words',
                  sub: '“50–80 words is enough”',
                  href: SRC.weekday.url,
                },
                {
                  label: 'Referral request, Taplio',
                  value: '< 100 words',
                  sub: '“3 to 5 sentences”',
                  href: SRC.taplio.url,
                },
                {
                  label: 'LinkedIn message, HireFlow',
                  value: '< 120 words',
                  sub: '“four to six sentences”',
                  href: SRC.hireflow.url,
                },
              ]}
            />
            <P>
              The connection note has a hard limit. LinkedIn Help, as{' '}
              <a href={SRC.happenstance.url} target="_blank" rel="noopener" className={link}>
                quoted by Happenstance
              </a>{' '}
              in August 2026, gives free accounts up to five personalised invitations at {NOTE_FREE}{' '}
              characters; Happenstance puts Premium at {NOTE_PREMIUM}. With so few notes, send the
              ask itself in the message after they accept, and keep the note to who you are and why
              you are writing.
            </P>
          </Section>

          <Section
            id="example"
            meta="Worked example · the same checks as the builder"
            title={`A common message passes ${R_WEAK.passed} of 8 checks; the builder's passes ${R_STRONG.passed}`}
            intro={`The weak one is shorter (${words(WEAK_DM)} words) but gives the referrer nothing to act on. The strong one is the builder's alumni sample (${words(STRONG)} words).`}
          >
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                { name: 'Weak', text: WEAK_DM },
                { name: 'Strong', text: STRONG },
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
                  <Checks text={m.text} channel="dm" />
                </div>
              ))}
            </div>
          </Section>

          <Section
            id="templates"
            meta={`Templates · ${SAMPLES.length} worked samples, fictional`}
            title="Referral message samples you can copy"
            intro="Each sample is the builder's own output for a different situation. Swap in your details, or load the sample in the builder above and edit it there."
          >
            <div className="grid gap-6 lg:grid-cols-3">
              {SAMPLES.map((s) => (
                <article
                  key={s.id}
                  className="min-w-0 rounded-2xl border border-border bg-surface p-4 md:p-5"
                >
                  <h3 className="text-h4 font-semibold text-fg">{s.label}</h3>
                  <p className="mt-1 text-caption text-fg-3">
                    {RELS.find((r) => r.id === s.inputs.rel)?.name} ·{' '}
                    {s.inputs.ask === 'chat' ? 'asks for a chat first' : 'asks for the referral'}
                  </p>
                  {!s.inputs.connected && (
                    <>
                      <div className={`${kicker} mt-4 text-fg-3`}>Connection note</div>
                      <pre className="mt-1.5 whitespace-pre-wrap break-words rounded-xl bg-muted p-3 font-sans text-small text-fg">
                        {connectionNote(s.inputs)}
                      </pre>
                    </>
                  )}
                  <div className={`${kicker} mt-4 text-fg-3`}>LinkedIn message</div>
                  <pre className="mt-1.5 whitespace-pre-wrap break-words rounded-xl bg-muted p-3 font-sans text-small text-fg">
                    {linkedinMessage(s.inputs)}
                  </pre>
                </article>
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
                [
                  '/resume-keyword-checker',
                  'Before you send',
                  'Check your resume against the job post',
                ],
                [
                  '/interview-prep-plan',
                  'After the referral',
                  'Plan your interview prep, day by day',
                ],
                [
                  '/linkedin-headline-checker',
                  'They will look you up',
                  'Check your LinkedIn headline',
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
              Sources (opened 18 Nov 2026):{' '}
              {Object.values(SRC).map((s, i) => (
                <span key={s.url}>
                  {i > 0 && '; '}
                  <a href={s.url} target="_blank" rel="noopener" className={link}>
                    {s.label}
                  </a>
                </span>
              ))}
              . Samples, names and the company Northwind Payments are fictional. Not affiliated with
              LinkedIn or any employer named here.
            </p>
          </Section>
        </div>

        <MockInterviewCTA
          title="The referral gets you the interview. Now win it."
          body="A voice interviewer asks the questions a recruiter asks after a referral, follows up on your answers, and tells you what was strong and what was thin."
          questions={[
            'Walk me through your resume.',
            'Why do you want to join this company?',
            'Tell me about a time you worked under a tight deadline.',
            'What would you do in your first 90 days in this role?',
          ]}
        />
      </div>
    </DomainLayout>
  )
}
