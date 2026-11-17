import Link from 'next/link'
import type { ReactNode } from 'react'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import { Flow } from '@/components/viz'
import { CV_ROLES } from '@/data/cvRolesData'
import { ROLE_HUB_LIST } from '@/data/roleHubs'
import { KIT_PATHS, ROLE_KITS } from '@/data/roleKits'

// One source for the visible FAQ and the FAQPage schema (app/cv-templates/page.tsx).
export const CV_FAQ: { q: string; a: string }[] = [
  {
    q: 'What makes a resume (CV) template ATS-friendly?',
    a: 'Real text rather than text boxes, images or skill bars; plain section headings (Education, Experience, Skills); contact details in the body rather than in the page header; and a .docx or text-based PDF file. Harvard’s template is a single column. Our Indian-format templates use simple tables for labels, marks and dates, the layout placement cells expect; if a job portal jumbles it when you upload, paste the text or use the Harvard layout for that application. No template can promise you pass a screen: recruiters search the text for skills, so what you write matters more than the layout.',
  },
  {
    q: 'Should I use a resume or a CV in India?',
    a: 'In Indian job posts and campus placements the two words mean the same one-to-two page document. Our Word templates use the one-page table format that placement cells and Indian recruiters know (marks, positions of responsibility, a label beside each bullet). For US and UK applications, the Harvard bullet template is the safer starting point.',
  },
  {
    q: 'Should I send my resume as Word or PDF?',
    a: 'Send the format the job post asks for. If it does not say, a PDF exported from Word or Google Docs keeps your layout, and a .docx is easy for recruiters to edit. Both are read as text by applicant tracking systems as long as the PDF was exported, not scanned.',
  },
  {
    q: 'Are these templates free?',
    a: 'Yes. Our 10 Word templates download directly with no sign-up. The Harvard template comes from Harvard’s Mignone Center for Career Success, which publishes it free; we link to its own files and are not affiliated with Harvard.',
  },
  {
    q: 'Should my resume have a photo, age or date of birth?',
    a: 'No. Recruiters do not need them, and leaving them out keeps attention on your work. Our templates leave out photo, age, gender and date of birth on purpose.',
  },
]

const HARVARD = {
  page: 'https://careerservices.fas.harvard.edu/resources/bullet-point-resume-template/',
  files: [
    {
      label: 'Word (.docx)',
      href: 'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/09/2025-template_bullet.docx',
    },
    {
      label: 'Accessible Word (.docx)',
      href: 'https://cdn-careerservices.fas.harvard.edu/wp-content/uploads/sites/161/2025/02/Accessible-MCS-Resume-Template-Bullet-Points.docx',
    },
    {
      label: 'Google Docs (makes a copy)',
      href: 'https://docs.google.com/document/d/1nlD4BGOyKF2vnC1Zhcbd8_jvkRRmIw-OAa-tT0MSCj0/copy',
    },
  ],
}

const RULES = [
  ['Real text', 'No text boxes, icons or skill bars; a parser cannot read a picture.'],
  ['Plain headings', 'Education, Experience, Skills: the words a system looks for.'],
  ['Contact in the body', 'Some systems skip the page header and footer.'],
  [
    'Simple layout',
    'Harvard’s is one column. Ours use plain tables for labels, marks and dates, the Indian campus format.',
  ],
  ['Skills in the post’s words', 'Recruiters search for them. Check with the keyword checker.'],
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
      className="scroll-mt-24 border-t border-border py-14 md:py-20"
    >
      <header className="max-w-2xl">
        <div className={`${kicker} text-signal-strong`}>{meta}</div>
        <h2 id={`${id}-t`} className="mt-3 text-h2 font-semibold text-fg">
          {title}
        </h2>
        {intro && <p className="mt-3 text-body-lg text-fg-2">{intro}</p>}
      </header>
      <div className="mt-8">{children}</div>
    </section>
  )
}

export default function CVTemplatesPage() {
  const kitRoles = ROLE_HUB_LIST.filter((h) => ROLE_KITS[h.slug])
  const editions = Object.values(CV_ROLES)

  return (
    <div className="bg-bg text-fg">
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
        {/* ---------- Hero ---------- */}
        <div className="pb-12 pt-8 md:pb-16 md:pt-12">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-caption text-fg-3">
            <Link href="/" className="hover:text-fg">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-fg-2">Resume (CV) templates</span>
          </nav>

          <header className="mt-8 grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <div className={`${kicker} text-signal-strong`}>
                Free · {kitRoles.length} Word templates by role + Harvard&apos;s · No sign-up ·
                Updated 17 Nov 2026
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                Free resume (CV) templates an ATS can read
              </h1>
              <p className="mt-5 max-w-[56ch] text-body-lg text-fg-2">
                Download a one-page Word template for your role, filled with a made-up sample you
                replace line by line, or Harvard&apos;s bullet template for US and UK applications.
                Every one is real text with plain headings, no text boxes or images, so an applicant
                tracking system can read it. Then check it against a job post and practise the
                interview out loud.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#by-role"
                  className="inline-flex h-12 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  Pick your role&apos;s template
                </a>
                <MockInterviewButton caption={false} label="Free mock interview" />
              </div>
            </div>

            <aside
              aria-label="What keeps a CV readable by an ATS"
              className="rounded-2xl border border-border bg-surface p-5 shadow-e1 md:p-6 lg:col-span-5"
            >
              <div className={`${kicker} text-fg-3`}>What keeps a CV readable by an ATS</div>
              <ol className="mt-4 divide-y divide-border">
                {RULES.map(([t, b], i) => (
                  <li key={t} className="flex gap-3 py-3 first:pt-0 last:pb-0">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal-tint font-mono text-caption text-signal-strong"
                    >
                      {i + 1}
                    </span>
                    <span>
                      <span className="block text-small font-semibold text-fg">{t}</span>
                      <span className="block text-small text-fg-2">{b}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-border pt-3 text-caption text-fg-3">
                Why the words matter more than the layout:{' '}
                <Link href="/resume-keyword-checker#ats" className={link}>
                  what an ATS really does
                </Link>
              </p>
            </aside>
          </header>

          <div className="mt-12">
            <Flow
              label="From template to interview in four steps"
              steps={[
                { title: 'Download', body: 'Your role’s Word template, or Harvard’s.' },
                { title: 'Replace every line', body: 'Keep the layout; write your own numbers.' },
                {
                  title: 'Check against the post',
                  body: 'Paste both into the free keyword checker.',
                },
                { title: 'Practise out loud', body: 'A voice mock interview on your CV.' },
              ]}
            />
          </div>
        </div>

        {/* ---------- Our Word templates ---------- */}
        <Section
          id="by-role"
          meta={`Our templates · ${kitRoles.length} roles · Word (.docx) · one page`}
          title="One-page Word CV templates by role"
          intro="The one-page table format Indian recruiters and placement cells know: education with marks, experience with a label beside every bullet, positions of responsibility and skills. Each comes with a made-up sample for the role and a guide with bullet examples and keywords from real job posts."
        >
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {kitRoles.map((h) => (
              <li
                key={h.slug}
                className="flex flex-col rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong"
              >
                <div className="text-h4 font-semibold text-fg">{h.roleName}</div>
                <a
                  href={`/downloads/resume-templates/${h.slug}-resume-template.docx`}
                  download
                  aria-label={`Download ${h.roleName} Word template (.docx)`}
                  className="mt-3 inline-flex h-10 items-center gap-2 self-start rounded-full bg-muted px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border transition-colors duration-fast hover:bg-signal-tint hover:text-signal-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Word template
                </a>
                <div className="mt-3 flex flex-col gap-1 text-small">
                  <Link href={KIT_PATHS.resume(h.slug)} className={link}>
                    {h.shortName} CV guide, sample and bullets
                  </Link>
                  <Link href={KIT_PATHS.lor(h.slug)} className={link}>
                    Letter of recommendation for {h.shortName}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-caption text-fg-3">
            Every name, company, college and number in the samples is made up. No photo, age, gender
            or date of birth, on purpose. Opens in Word, Google Docs and LibreOffice.
          </p>
        </Section>

        {/* ---------- Harvard ---------- */}
        <Section
          id="harvard"
          meta="Third-party · Harvard FAS Mignone Center · page updated 14 Oct 2026"
          title="Harvard’s bullet-point resume template"
          intro="For US and UK applications, the best-known free starting point is the bullet template from Harvard’s Mignone Center for Career Success. We link to its own files; we are not affiliated with Harvard."
        >
          <div className="rounded-xl border border-border bg-surface p-5 md:p-6">
            <p className="max-w-prose text-body text-fg-2">
              A one-column resume with bullet points under each entry, in Word or Google Docs.
              Harvard publishes it as a template &ldquo;to build out your first draft of your
              resume.&rdquo; There is also an accessible Word version.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {HARVARD.files.map((f) => (
                <a
                  key={f.href}
                  href={f.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center rounded-full bg-muted px-4 text-small font-semibold text-fg ring-1 ring-inset ring-border transition-colors duration-fast hover:bg-signal-tint hover:text-signal-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong"
                >
                  {f.label}
                </a>
              ))}
            </div>
            <p className="mt-4 text-caption text-fg-3">
              Source:{' '}
              <a href={HARVARD.page} target="_blank" rel="noopener noreferrer" className={link}>
                Harvard FAS Mignone Center, Bullet Point Resume Template
              </a>{' '}
              (opened 17 Nov 2026).
            </p>
          </div>
        </Section>

        {/* ---------- Role editions ---------- */}
        <Section
          id="editions"
          meta={`${editions.length} roles · Harvard-style Word template + bullet bank`}
          title="Resume templates by job title"
          intro="Twenty more job titles, each with the Harvard-style template plus bullet examples, keywords and mistakes to avoid."
        >
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {editions.map((role) => (
              <li key={role.slug}>
                <Link
                  href={`/cv-templates/${role.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong"
                >
                  <span className="inline-flex h-6 items-center self-start rounded-full bg-muted px-2.5 text-caption font-medium text-fg-2">
                    {role.category}
                  </span>
                  <span className="mt-3 text-h4 font-semibold text-fg group-hover:text-signal-strong">
                    {role.roleName} resume template{' '}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-fast group-hover:translate-x-0.5"
                    >
                      &rarr;
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-small text-fg-2">
            Prefer to fill in a form?{' '}
            <Link href="/build-resume" className={link}>
              The free resume builder
            </Link>{' '}
            walks you through seven sections and downloads a Word file.
          </p>
        </Section>

        {/* ---------- Next step ---------- */}
        <Section
          id="next"
          meta="Free tools · run in your browser · nothing uploaded"
          title="Before you send it"
        >
          <div className="grid gap-3 md:grid-cols-3">
            {[
              {
                href: '/resume-keyword-checker',
                t: 'Resume keyword checker',
                b: 'Paste a job post and your CV: missing skills, must-haves and 8 format checks.',
              },
              {
                href: '/star-method',
                t: 'STAR method answer builder',
                b: 'Turn your best CV bullet into a 2-minute interview story.',
              },
              {
                href: '/cover-letter',
                t: 'Cover letter templates',
                b: 'For the posts that ask for one.',
              },
            ].map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal-strong"
              >
                <span className="block text-h4 font-semibold text-fg group-hover:text-signal-strong">
                  {c.t} &rarr;
                </span>
                <span className="mt-1 block text-small text-fg-2">{c.b}</span>
              </Link>
            ))}
          </div>
        </Section>

        {/* ---------- FAQ ---------- */}
        <Section id="faq" meta={`FAQ · ${CV_FAQ.length} questions`} title="Resume template FAQ">
          <div className="max-w-3xl space-y-3">
            {CV_FAQ.map((f, i) => (
              <details
                key={f.q}
                open={i < 2}
                className="group rounded-xl border border-border bg-surface open:shadow-e1"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-medium text-fg">
                  {f.q}
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-fg-3 transition-transform duration-base group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.75}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 9l6 6 6-6" />
                  </svg>
                </summary>
                <p className="max-w-prose px-5 pb-5 text-body text-fg-2">{f.a}</p>
              </details>
            ))}
          </div>
        </Section>
      </div>

      <MockInterviewCTA
        title="Your CV gets you the interview. Practise the interview."
        questions={[
          'Walk me through your resume.',
          'Tell me about the project on your CV you are proudest of.',
          'What number on your resume are you most proud of, and how did you get it?',
          'Why are you leaving your current role?',
        ]}
      />
    </div>
  )
}
