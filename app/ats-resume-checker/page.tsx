import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import AtsFileChecker from '@/components/atsFileCheck/AtsFileChecker'
import { BarList, Figure, StatRow } from '@/components/viz'
import {
  CHECKED,
  MATRIX,
  NAMED_BY,
  PROBLEM_LABEL,
  PROBLEMS,
  SOURCES,
} from '@/data/atsFileCheck/sources'
import { PARSE_LIMIT_MB } from '@/data/atsFileCheck/checks'
import SAMPLES from '@/data/atsFileCheck/sampleResults.json'

const PAGE_URL = 'https://www.autointerviewai.com/ats-resume-checker'
const UPDATED = '2026-11-24'
const TITLE = 'Free ATS Resume Checker: See What the Parser Reads'
const DESC =
  'Drop a PDF or Word resume and see the text an ATS pulls out, line by line. Up to 12 checks: columns, tables, headers, text boxes, icons. Nothing uploaded.'

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

const S = SOURCES
const N_SOURCES = MATRIX.length
const CHECK_COUNT = 12
const [ONE, TWO, TABLE] = SAMPLES
const TOP_PROBLEM = [...PROBLEMS].sort((a, b) => NAMED_BY[b] - NAMED_BY[a])[0]
const failed = (s: (typeof SAMPLES)[number]) =>
  s.checks.filter((c) => c.status === 'fail').map((c) => c.label)

const FAQ = [
  {
    q: 'How do I check if my resume is ATS friendly?',
    a: `Look at the text a parser gets, not at the design. Drop your file in the checker above: it shows the plain text in the order your file stores it and read straight across the page, and runs up to ${CHECK_COUNT} file checks. By hand: open the PDF, select all, paste into Notepad. If you cannot select the text, Lever says the document “is likely not parseable”; if the pasted lines come out jumbled, columns or tables are the usual cause.`,
  },
  {
    q: 'Are two-column resumes bad for ATS?',
    a: `They are risky: Greenhouse lists “Resumes that have a columned layout” as a cause of failed parses. Read across the page, our two-column sample jumps between columns ${TWO.jumps.jumps} times in ${TWO.jumps.lines} lines. Some parsers handle columns well; you cannot know which one an employer uses, so one column is the safe choice.`,
  },
  {
    q: 'Does an ATS reject a resume because of its format?',
    a: 'Rarely on its own. In the help pages we read, automatic rejection comes from knock-out questions on the application form (Greenhouse, Oracle, SmartRecruiters) and rules the employer sets, not from layout. A bad parse costs you differently: empty or wrong profile fields, and a recruiter’s keyword search that does not find you. iCIMS asks candidates to “Review the information parsed from your resume”: do that every time.',
  },
  {
    q: 'PDF or Word: which is better for ATS?',
    a: 'Either, if the PDF holds real text. Greenhouse accepts .doc, .docx, .pdf, .rtf and .txt; Workable accepts .pdf, .doc, .docx, .rtf, .html and .odt. The sources disagree on which is best: the University at Buffalo tells students “Use a PDF”, while Talview’s help page points to DOCX for the most reliable parsing. Follow the job posting if it names a format; otherwise a text PDF exported from Word or Google Docs is fine.',
  },
  {
    q: 'Can an ATS read my contact details in the header?',
    a: 'Not reliably. Greenhouse lists “Resumes with the name and contact information in the header, footer, or text box” as a cause of failed parses, and Talview advises “avoiding headers, footers, and text boxes”. Put your name, phone and email as the first lines of the page body.',
  },
  {
    q: 'Is my resume uploaded when I use this checker?',
    a: 'No. The file is read by code running in your browser tab (pdf.js for PDFs, served from this site, and a zip reader for .docx). Nothing is sent to a server and nothing is saved. The only thing kept is what you choose to send to the keyword checker, and that stays on your device.',
  },
  {
    q: 'What file size is too big?',
    a: `Greenhouse “can’t parse resumes larger than ${PARSE_LIMIT_MB}MB”, even though it accepts uploads up to 100 MB, so a large file uploads but fills nothing in. Workable’s resume limit is 5MB. A text-only resume is usually well under 1 MB; photos and background images are what make it big.`,
  },
  {
    q: 'Do icons for phone and email hurt?',
    a: 'They can. Icon fonts and Word’s Symbol or Wingdings characters come out as junk characters or boxes next to your details. MIT CAPD says “Avoid use of graphics, icons, or images.” Write “Email:” and “Phone:” instead.',
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
  { id: 'checker', label: 'Checker' },
  { id: 'what-breaks', label: 'What breaks parsing' },
  { id: 'three-layouts', label: 'Same resume, 3 layouts' },
  { id: 'how-to-fix', label: 'How to fix' },
  { id: 'reject', label: 'Does ATS reject?' },
  { id: 'faq', label: 'FAQ' },
]

const FIXES: { problem: string; word: string; docs: string; design: string }[] = [
  {
    problem: 'Two columns or a sidebar',
    word: 'Layout → Columns → One. If the sidebar is a table, select it → Table Layout → Convert to Text.',
    docs: 'Format → Columns → one column. Move sidebar items into full-width sections.',
    design:
      'Pick a one-column template; copy the sidebar text into sections under your experience.',
  },
  {
    problem: 'Contact details in the header',
    word: 'Double-click the header, cut your name and contact lines, paste them as the first lines of the page.',
    docs: 'Same: cut from the header area and paste at the top of the body.',
    design:
      'Make the name and contact lines plain text boxes at the top of the page, not part of an image.',
  },
  {
    problem: 'Tables and text boxes',
    word: 'Table: Convert to Text. Text box: cut the text, delete the box, paste as a paragraph.',
    docs: 'Copy the table cells into normal paragraphs, then delete the table.',
    design: 'Avoid grid blocks for skills; write skills as one line separated by commas.',
  },
  {
    problem: 'No selectable text (scan or image)',
    word: 'File → Save As → PDF (not Print → Microsoft Print to PDF of a scan).',
    docs: 'File → Download → PDF document.',
    design:
      'Download as a standard PDF; leave off any option that turns text into an image or flattens it.',
  },
  {
    problem: 'Icons, photos, skill bars',
    word: 'Replace icons with “Email:”, “Phone:”. Delete skill-level bars; list skills as words.',
    docs: 'Same. Images and drawings can go.',
    design: 'Remove icon elements next to contact details; keep a photo only if the job post asks.',
  },
]

export default function AtsResumeCheckerPage() {
  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'ATS Resume Checker (file and layout)',
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
        { '@type': 'ListItem', position: 2, name: 'ATS resume checker', item: PAGE_URL },
      ],
    },
  ]

  return (
    <DomainLayout currentPath="/ats-resume-checker">
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
            <span className="text-fg-2">ATS resume checker</span>
          </nav>

          <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="min-w-0 lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free tool · PDF and Word · Up to {CHECK_COUNT} checks · Nothing uploaded · Updated
                24 Nov 2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                ATS resume checker: see what the parser reads
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                An ATS does not see your design. It pulls out plain text and files it into fields.
                Drop your resume to see that text, line by line, and up to {CHECK_COUNT} checks for
                what breaks it. Greenhouse’s own help page names columns, tables, headers and
                footers, text boxes and images. This checker finds all of them in Word files, and
                columns, images and scans in PDFs.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#checker"
                  className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  Check my resume
                </a>
                <MockInterviewButton caption={false} label="Got the call? Free mock interview" />
              </div>
            </div>

            <aside
              aria-label="A two-column resume read across the page"
              className="min-w-0 rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
            >
              <div className={`${kicker} text-fg-3`}>Two-column sample · read across the page</div>
              <ol className="mt-4 space-y-1 font-mono text-caption leading-relaxed">
                {TWO.preview.slice(0, 11).map((line, i) => {
                  const side = TWO.sides[i]
                  return (
                    <li
                      key={i}
                      className={`ats-line flex gap-3 rounded px-1 ${side === 'B' ? 'bg-warn-soft' : ''}`}
                      style={{ animationDelay: `${300 + i * 90}ms` }}
                    >
                      <span
                        className={`w-7 shrink-0 text-right ${side === 'R' ? 'text-signal' : 'text-fg-3'}`}
                      >
                        {side === 'R' ? 'R' : side === 'L' ? 'L' : 'L+R'}
                      </span>
                      <span
                        className={`min-w-0 truncate ${side === 'R' ? 'text-signal-ink' : 'text-fg'}`}
                      >
                        {line}
                      </span>
                    </li>
                  )
                })}
              </ol>
              <p className="mt-4 text-caption text-fg-3">
                Output of this checker on our fictional sample. L = sidebar, R = main column. The
                name runs into “Profile”, and contact lines land between experience lines:{' '}
                {TWO.jumps.jumps} jumps in {TWO.jumps.lines} lines.
              </p>
            </aside>
          </header>

          <div className="mt-10 max-w-3xl rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
            <div className={`${kicker} text-signal-ink`}>TL;DR</div>
            <ul className="mt-3 space-y-2 text-body text-fg">
              <li>
                <strong className="font-semibold">
                  One column, plain headings, text you can select.
                </strong>{' '}
                That covers most of what {N_SOURCES} ATS and parser help pages warn about.
              </li>
              <li>
                <strong className="font-semibold">Contact details in the body,</strong> not in
                Word’s header, a text box or an icon.
              </li>
              <li>
                <strong className="font-semibold">Under {PARSE_LIMIT_MB} MB.</strong> Greenhouse
                does not parse larger files even though it accepts the upload.
              </li>
              <li>
                <strong className="font-semibold">There is no official “ATS score”.</strong> After
                uploading to a real portal, review the fields it filled in.
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
                className="inline-flex min-h-11 shrink-0 items-center rounded-full px-3 text-small text-fg-2 hover:bg-muted hover:text-fg"
              >
                {s.label}
              </a>
            ))}
          </div>
        </nav>

        <div className={container}>
          <Section
            id="checker"
            meta="The checker · under a minute"
            title="Drop your resume and read it like a parser"
            intro="Use the same file you would upload to a careers page. The checker reads it inside this tab, shows you the text, and flags what to fix with the help page that says so."
          >
            <AtsFileChecker />
          </Section>

          <Section
            id="what-breaks"
            meta={`Primary sources · ${N_SOURCES} help pages · opened ${CHECKED}`}
            title="What breaks resume parsing, in the ATS makers’ own words"
            intro="We read the help pages of applicant tracking systems and resume parsers, plus two university career offices, and noted which layout problems each one names."
          >
            <StatRow
              stats={[
                {
                  label: 'Name scanned or image files',
                  value: `${NAMED_BY.image} of ${N_SOURCES}`,
                  sub: 'Named most often',
                },
                {
                  label: 'Name tables',
                  value: `${NAMED_BY.tables} of ${N_SOURCES}`,
                  sub: MATRIX.filter((r) => r.named.includes('tables'))
                    .map((r) => S[r.key].org)
                    .join(', '),
                },
                {
                  label: 'Greenhouse parse limit',
                  value: `${PARSE_LIMIT_MB} MB`,
                  sub: 'Uploads up to 100 MB still accepted',
                  href: S.greenhouseParse.url,
                },
              ]}
            />
            <Figure
              label={`What ${N_SOURCES} help pages name`}
              title={`${PROBLEM_LABEL[TOP_PROBLEM]}: named most often, by ${NAMED_BY[TOP_PROBLEM]} of ${N_SOURCES} sources`}
              sub="Count of sources (ATS, parser and career-office pages) that name each problem as a cause of bad parsing."
              source={[{ label: 'Help pages listed in the table below' }]}
              updated="Nov 2026"
              table={{
                head: ['Problem', 'Sources naming it'],
                rows: PROBLEMS.map((p) => [PROBLEM_LABEL[p], NAMED_BY[p]]),
              }}
            >
              <BarList
                rows={PROBLEMS.map((p) => ({
                  label: PROBLEM_LABEL[p],
                  value: NAMED_BY[p],
                  display: `${NAMED_BY[p]} of ${N_SOURCES}`,
                  highlight: ['columns', 'tables', 'headerFooter', 'textBox'].includes(p),
                }))}
                max={N_SOURCES}
              />
            </Figure>

            <ul className="space-y-3 md:hidden">
              {MATRIX.map((r) => {
                const src = S[r.key]
                return (
                  <li key={r.key} className="rounded-xl border border-border bg-surface p-4">
                    <a href={src.url} target="_blank" rel="noopener" className={link}>
                      {src.org}
                    </a>
                    <span className="ml-2 text-caption text-fg-3">
                      {src.kind}
                      {src.date ? ` · ${src.date}` : ''}
                    </span>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {r.named.map((p) => (
                        <span
                          key={p}
                          className="rounded-full bg-signal-tint px-2.5 py-0.5 text-caption text-signal-ink"
                        >
                          {PROBLEM_LABEL[p]}
                        </span>
                      ))}
                    </div>
                    {r.note && <p className="mt-2 text-caption text-fg-2">{r.note}</p>}
                  </li>
                )
              })}
            </ul>
            <div className="hidden overflow-x-auto rounded-xl border border-border bg-surface md:block">
              <table className="w-full min-w-[760px] text-left text-small">
                <caption className="sr-only">
                  Layout problems named by each ATS, parser or career-office help page
                </caption>
                <thead className="border-b border-border bg-muted/50 text-caption text-fg-2">
                  <tr>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Source
                    </th>
                    {PROBLEMS.map((p) => (
                      <th key={p} scope="col" className="px-2 py-3 text-center font-semibold">
                        {PROBLEM_LABEL[p]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {MATRIX.map((r) => {
                    const src = S[r.key]
                    return (
                      <tr key={r.key} className="align-top">
                        <th scope="row" className="px-4 py-3 font-normal">
                          <a href={src.url} target="_blank" rel="noopener" className={link}>
                            {src.org}
                          </a>
                          <span className="block text-caption text-fg-3">
                            {src.kind}
                            {src.date ? ` · ${src.date}` : ''}
                          </span>
                          {r.note && (
                            <span className="mt-1 block max-w-[16rem] text-caption text-fg-2">
                              {r.note}
                            </span>
                          )}
                        </th>
                        {PROBLEMS.map((p) => (
                          <td key={p} className="px-2 py-3 text-center">
                            {r.named.includes(p) ? (
                              <span className="font-semibold text-signal-strong">
                                ✓<span className="sr-only"> named</span>
                              </span>
                            ) : (
                              <span className="text-fg-3">
                                ·<span className="sr-only"> not named</span>
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            <P>
              A blank cell means the page we opened does not mention that problem, not that the
              system handles it well. The clearest single list is Greenhouse’s: “Complex resumes
              with tables, headers, and footers”, “Resumes that have a columned layout”, “Resumes
              that include graphics, photos, or word art” (
              <a href={S.greenhouseParse.url} target="_blank" rel="noopener" className={link}>
                Greenhouse, updated 2 Mar 2026
              </a>
              ). Workday puts the cause in one line: “Resume parsing results can vary based on
              resume format and order of words.”
            </P>
          </Section>

          <Section
            id="three-layouts"
            meta="Measured · one fictional resume, three files"
            title="Same words, three layouts: what the checker found"
            intro="We wrote one resume and saved it three ways. Every number below is the checker’s own output on these files, run when this page was built."
          >
            <div className="grid gap-5 md:grid-cols-3">
              {[
                { s: ONE, img: 'single-column', w: 910, h: 1287 },
                { s: TWO, img: 'two-column', w: 910, h: 1287 },
                { s: TABLE, img: 'table-and-header', w: 935, h: 1210 },
              ].map(({ s, img, w, h }) => {
                const fails = failed(s)
                return (
                  <figure
                    key={s.id}
                    className="flex flex-col rounded-xl border border-border bg-surface p-4"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/samples/ats-check/${img}.webp`}
                      alt={`Sample resume: ${s.name}`}
                      width={w}
                      height={h}
                      loading="lazy"
                      className="aspect-[3/4] w-full rounded-md object-cover object-top ring-1 ring-border"
                    />
                    <figcaption className="mt-4 flex flex-1 flex-col">
                      <span className="text-h4 font-semibold text-fg">{s.name}</span>
                      <span className="mt-2 flex flex-wrap gap-2 text-caption font-semibold tabular-nums">
                        <span className="rounded-full bg-success-soft px-2.5 py-0.5 text-success-strong">
                          {s.summary.pass} pass
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 ${s.summary.fail ? 'bg-danger-soft text-danger' : 'bg-muted text-fg-3'}`}
                        >
                          {s.summary.fail} fix
                        </span>
                      </span>
                      <span className="mt-3 text-small text-fg-2">
                        {fails.length === 0
                          ? 'Reads top to bottom in both orders. Nothing to fix.'
                          : `Fix: ${fails.join('; ')}.`}
                        {s.jumps.jumps > 0 &&
                          ` Read across the page, it jumps between columns ${s.jumps.jumps} times in ${s.jumps.lines} lines.`}
                        {s.headerFooter &&
                          ' Name, email and phone sit only in the Word header, so the body text has no contact details.'}
                      </span>
                      <a
                        href={`/samples/ats-check/${s.file}`}
                        download
                        className={`mt-3 text-small ${link}`}
                      >
                        Download this sample ({s.file.endsWith('.pdf') ? 'PDF' : '.docx'})
                      </a>
                    </figcaption>
                  </figure>
                )
              })}
            </div>
            <P>
              The two-column file is not broken in every system. Read in the order the file stores
              it, its text comes out in sensible blocks (sidebar first, then experience). Read
              straight across the page, which is how some parsers rebuild lines, the sidebar and the
              main column interleave. You cannot tell which method an employer’s system uses, which
              is why Greenhouse, Talview and MIT warn against columns.
            </P>
          </Section>

          <Section
            id="how-to-fix"
            meta="Fixes · Word, Google Docs, design tools"
            title="How to fix each problem in the tool you used"
          >
            <div className="space-y-3 md:hidden">
              {FIXES.map((f) => (
                <div key={f.problem} className="rounded-xl border border-border bg-surface p-4">
                  <h3 className="text-h4 font-semibold text-fg">{f.problem}</h3>
                  <dl className="mt-2 space-y-2 text-small">
                    {(
                      [
                        ['Word', f.word],
                        ['Google Docs', f.docs],
                        ['Canva / design tools', f.design],
                      ] as const
                    ).map(([k, v]) => (
                      <div key={k}>
                        <dt className="font-semibold text-fg">{k}</dt>
                        <dd className="text-fg-2">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
            <div className="hidden overflow-hidden rounded-xl border border-border bg-surface md:block">
              <table className="w-full text-left text-small">
                <thead className="border-b border-border bg-muted/50 text-caption text-fg-2">
                  <tr>
                    <th scope="col" className="w-48 px-4 py-3 font-semibold">
                      Problem
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Word
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Google Docs
                    </th>
                    <th scope="col" className="px-4 py-3 font-semibold">
                      Canva / design tools
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {FIXES.map((f) => (
                    <tr key={f.problem} className="align-top">
                      <th scope="row" className="px-4 py-3 font-semibold text-fg">
                        {f.problem}
                      </th>
                      <td className="px-4 py-3 text-fg-2">{f.word}</td>
                      <td className="px-4 py-3 text-fg-2">{f.docs}</td>
                      <td className="px-4 py-3 text-fg-2">{f.design}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <P>
              Starting again is often faster than fixing a design template. Our{' '}
              <Link href="/cv-templates" className={link}>
                one-page CV templates
              </Link>{' '}
              are single-column Word files with plain headings. Once the file reads cleanly, match
              its words to the job with the{' '}
              <Link href="/resume-keyword-checker" className={link}>
                resume keyword checker
              </Link>
              .
            </P>
          </Section>

          <Section
            id="reject"
            meta="Myths · what an ATS does with a bad parse"
            title="A messy parse rarely gets you auto-rejected. It gets you lost."
          >
            <div className="grid gap-4 md:grid-cols-3">
              {[
                {
                  t: 'Who rejects automatically',
                  b: 'Knock-out questions on the application form. SmartRecruiters “will automatically reject candidates who choose answers marked as knock-out”; Oracle’s disqualification questions do the same.',
                },
                {
                  t: 'What a bad parse costs',
                  b: 'Empty or wrong fields (your phone in the address box, experience under skills) and recruiter searches that miss you, because the words are not where the search looks.',
                },
                {
                  t: 'What to do',
                  b: '“Review the information parsed from your resume” (iCIMS) on every portal, fix the fields by hand, and answer knock-out questions truthfully.',
                },
              ].map((x) => (
                <div key={x.t} className="rounded-xl border border-border bg-surface p-5">
                  <h3 className="text-h4 font-semibold text-fg">{x.t}</h3>
                  <p className="mt-2 text-small text-fg-2">{x.b}</p>
                </div>
              ))}
            </div>
            <P>
              More on how real ATS products score and filter, with the vendor pages, in our{' '}
              <Link href="/blog/best-ats-resume-checker-2025" className={link}>
                comparison of ATS resume checkers
              </Link>{' '}
              (Greenhouse, Workday, Lever, Oracle, SmartRecruiters and Ashby, and where the “75%
              rejected” number comes from).
            </P>
          </Section>

          <Section id="faq" meta={`FAQ · ${FAQ.length} questions`} title="Quick answers">
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
                ['/resume-keyword-checker', 'Keywords', 'Resume keyword checker'],
                ['/cv-templates', 'Templates', 'One-page CV templates'],
                ['/interview-prep-plan', 'After you apply', 'Interview prep plan'],
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
              Sources (opened {CHECKED}):{' '}
              {Object.values(S).map((s, i) => (
                <span key={s.url}>
                  {i > 0 && '; '}
                  <a href={s.url} target="_blank" rel="noopener" className={link}>
                    {s.label}
                  </a>
                </span>
              ))}
              ; SmartRecruiters and Oracle knock-out rules as cited in our{' '}
              <Link href="/blog/best-ats-resume-checker-2025" className={link}>
                ATS checker comparison
              </Link>
              . Sample resumes are fictional. PDF reading uses Mozilla’s open-source pdf.js. Not
              affiliated with any company named here.
            </p>
          </Section>
        </div>

        <MockInterviewCTA
          title="The resume gets read. Practise the call that comes next."
          body="A voice interviewer runs the recruiter screen: “Walk me through your resume”, “Why this role?”, “What are your salary expectations?”, follows up on your answers and tells you what landed."
          questions={[
            'Walk me through your resume.',
            'Why are you looking for a change?',
            'Which project on your resume are you proudest of?',
            'What are your salary expectations?',
          ]}
        />
      </div>
    </DomainLayout>
  )
}
