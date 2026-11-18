import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import { CV_ROLES } from '@/data/cvRolesData'
import { ROLE_KITS } from '@/data/roleKits'
import { ROLE_HUBS } from '@/data/roleHubs'

interface PageProps {
  params: Promise<{
    role: string
  }>
}

const UPDATED = '18 Nov 2026'
const HARVARD_PAGE =
  'https://careerservices.fas.harvard.edu/resources/bullet-point-resume-template/'

export async function generateStaticParams() {
  return Object.keys(CV_ROLES).map((role) => ({
    role,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { role } = await params
  const roleData = CV_ROLES[role]

  if (!roleData) {
    return {
      title: 'Resume Template Not Found',
    }
  }

  return {
    title: roleData.metaTitle,
    description: roleData.metaDescription,
    alternates: {
      canonical: `https://www.autointerviewai.com/cv-templates/${roleData.slug}`,
    },
    openGraph: {
      title: roleData.metaTitle,
      description: roleData.metaDescription,
      url: `https://www.autointerviewai.com/cv-templates/${roleData.slug}`,
      siteName: 'Auto Interview AI',
      images: [
        {
          url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
          width: 1200,
          height: 630,
          alt: `${roleData.roleName} Resume Template`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: roleData.metaTitle,
      description: roleData.metaDescription,
      images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
      creator: '@ajiteshleo',
    },
  }
}

const pl = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em]'
const link =
  'font-medium text-signal-strong underline decoration-signal/30 underline-offset-2 hover:decoration-signal'
const btnSecondary =
  'inline-flex h-12 items-center justify-center gap-2 rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted'

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
        {intro && <p className="mt-3 text-body text-fg-2">{intro}</p>}
      </header>
      <div className="mt-8">{children}</div>
    </section>
  )
}

function DownloadIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  )
}

export default async function RoleCVPage({ params }: PageProps) {
  const { role } = await params
  const roleData = CV_ROLES[role]

  if (!roleData) {
    notFound()
  }

  const allRoles = Object.values(CV_ROLES)
  const hub = ROLE_HUBS[roleData.slug]
  const kit = ROLE_KITS[roleData.slug] && hub
  const r = roleData.roleName

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: roleData.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.autointerviewai.com' },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Resume (CV) templates',
        item: 'https://www.autointerviewai.com/cv-templates',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${r} resume template`,
        item: `https://www.autointerviewai.com/cv-templates/${roleData.slug}`,
      },
    ],
  }

  const ctaQuestions = [
    'Walk me through your resume in two minutes.',
    'Pick one bullet on your CV. How did you measure that result?',
    `Why ${r}, and why now?`,
  ]

  return (
    <DomainLayout currentPath="/cv-templates">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="bg-bg text-fg">
        <div className="mx-auto w-full max-w-[1200px] px-5 md:px-8">
          {/* ---------- Hero ---------- */}
          <div className="pb-10 pt-8 md:pb-14 md:pt-12">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-caption text-fg-3"
            >
              <Link href="/" className="hover:text-fg">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link href="/cv-templates" className="hover:text-fg">
                Resume (CV) templates
              </Link>
              <span aria-hidden="true">/</span>
              <span className="text-fg-2">{r}</span>
            </nav>

            <header className="mt-8 max-w-3xl">
              <div className={`${kicker} text-signal-strong`}>
                {roleData.category} · Free Word + Google Docs · No sign-up · Updated {UPDATED}
              </div>
              <h1 className="mt-4 font-serif text-display font-medium text-fg">
                {roleData.heroTitle}
              </h1>
              <p className="mt-5 max-w-[60ch] text-body-lg text-fg-2">{roleData.heroDescription}</p>
              <div className="mt-8 flex flex-wrap items-start gap-3">
                <a href="#download" className={btnSecondary}>
                  <DownloadIcon />
                  Get the template
                </a>
                <MockInterviewButton caption={false} label="Free mock interview" />
              </div>
              <p className="mt-4 text-small text-fg-3">
                On this page: the template · {roleData.atsKeywords.length} keywords ·{' '}
                {roleData.sampleBullets.length} sample bullets · skills · do and don&apos;t ·{' '}
                {pl(roleData.faqs.length, 'FAQ')}
              </p>
            </header>

            {kit && (
              <div className="mt-10 flex flex-col gap-4 rounded-xl bg-signal-tint p-5 text-small ring-1 ring-inset ring-signal/15 sm:flex-row sm:items-center sm:justify-between">
                <span>
                  <span className="block font-semibold text-fg">
                    Applying in India? Use the one-page table CV.
                  </span>
                  <span className="text-fg-2">
                    Our {kit.roleName} CV guide has a free Word template in the Indian campus format
                    (marks, positions of responsibility), bullet examples and keywords from real job
                    posts.
                  </span>
                </span>
                <Link
                  href={`/${roleData.slug}/resume`}
                  className="inline-flex h-11 shrink-0 items-center justify-center rounded-full bg-surface px-5 font-semibold text-fg ring-1 ring-inset ring-border-strong transition-colors duration-fast hover:bg-muted"
                >
                  Open the {kit.roleName} CV guide →
                </Link>
              </div>
            )}
          </div>

          {/* ---------- Download ---------- */}
          <Section
            id="download"
            meta="Template · Word and Google Docs · Free"
            title={`Download a ${r} resume template`}
            intro={
              <>
                Both links open the bullet-point template published free by Harvard&apos;s Mignone
                Center for Career Success (
                <a href={HARVARD_PAGE} target="_blank" rel="noopener noreferrer" className={link}>
                  its page
                </a>
                ). One column, real text, nothing in the header or footer. We are not affiliated
                with Harvard; fill it with the {r} keywords and bullets below.
              </>
            }
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {[
                {
                  tag: 'Word (.docx)',
                  title: 'Edit in Word, LibreOffice or Pages',
                  body: 'Downloads the .docx straight from Harvard’s site. Best when a job portal asks for a Word file or you want to keep a master copy offline.',
                  href: roleData.docxUrl,
                  cta: 'Download the .docx',
                },
                {
                  tag: 'Google Docs',
                  title: 'Make your own copy in Google Drive',
                  body: 'The link asks you to make a copy, so you edit your own file. When you finish: File → Download → PDF or Microsoft Word.',
                  href: roleData.gdocsUrl,
                  cta: 'Open in Google Docs',
                },
              ].map((c) => (
                <div
                  key={c.tag}
                  className="flex flex-col justify-between rounded-xl border border-border bg-surface p-5 md:p-6"
                >
                  <div>
                    <span className="inline-flex h-6 items-center rounded-full bg-muted px-2.5 text-caption font-medium text-fg-2">
                      {c.tag}
                    </span>
                    <h3 className="mt-3 text-h4 font-semibold text-fg">{c.title}</h3>
                    <p className="mt-2 text-small text-fg-2">{c.body}</p>
                  </div>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${btnSecondary} mt-6 w-full`}
                  >
                    {c.cta}
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              ))}
            </div>
          </Section>

          {/* ---------- Keywords ---------- */}
          <Section
            id="keywords"
            meta={`${roleData.atsKeywords.length} terms · use the ones you can back up`}
            title={`${r} keywords to use, if you have done the work`}
            intro={
              <>
                Recruiters search applicant tracking systems for the skills a job post names. Use
                the post&apos;s own words for the work you have done, in your bullets and skills
                line. To see which words a specific post uses, paste it into the{' '}
                <Link href="/resume-keyword-checker" className={link}>
                  free resume keyword checker
                </Link>
                .
              </>
            }
          >
            <ul className="flex flex-wrap gap-2">
              {roleData.atsKeywords.map((kw) => (
                <li
                  key={kw}
                  className="max-w-full break-words rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-caption text-fg"
                >
                  {kw}
                </li>
              ))}
            </ul>
          </Section>

          {/* ---------- Bullets ---------- */}
          <Section
            id="bullets"
            meta={`${roleData.sampleBullets.length} samples · made-up numbers`}
            title={`${r} resume bullet examples`}
            intro={
              <>
                Each sample follows one pattern: what you did, how it was measured, and how you did
                it. The numbers are invented to show the shape; replace them with your own, and be
                ready to explain each one in an interview.
              </>
            }
          >
            <ol className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {roleData.sampleBullets.map((item, idx) => (
                <li
                  key={item.heading}
                  className="rounded-xl border border-border bg-surface p-5 md:p-6"
                >
                  <div className={`${kicker} text-fg-3`}>
                    {String(idx + 1).padStart(2, '0')} · {item.heading}
                  </div>
                  <p className="mt-3 text-body text-fg">{item.bullet}</p>
                  <p className="mt-3 rounded-lg bg-signal-tint px-3 py-2 text-small text-fg-2">
                    <span className="font-semibold text-fg">Result line: </span>
                    {item.metric}
                  </p>
                </li>
              ))}
            </ol>
          </Section>

          {/* ---------- Skills ---------- */}
          <Section
            id="skills"
            meta={pl(roleData.skillsMatrix.length, 'group')}
            title={`A ${r} skills section, grouped`}
            intro="Group skills the way a recruiter reads them, and list only what you could be asked about."
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {roleData.skillsMatrix.map((matrix) => (
                <div
                  key={matrix.category}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <h3 className="text-small font-semibold text-fg">{matrix.category}</h3>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {matrix.skills.map((skill) => (
                      <li
                        key={skill}
                        className="inline-flex h-7 items-center rounded-full bg-muted px-2.5 text-caption font-medium text-fg-2"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          {/* ---------- Do / Don't ---------- */}
          <Section
            id="rules"
            meta={pl(roleData.dosAndDonts.length, 'pair')}
            title={`Do and don't for a ${r} resume`}
          >
            <ul className="space-y-3">
              {roleData.dosAndDonts.map((rule) => (
                <li key={rule.do} className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  <div className="flex gap-3 rounded-xl bg-success-soft p-4 text-small ring-1 ring-inset ring-success/15">
                    <span aria-hidden="true" className="mt-0.5 font-semibold text-success">
                      ✓
                    </span>
                    <span>
                      <span className="font-semibold text-fg">Do: </span>
                      <span className="text-fg-2">{rule.do}</span>
                    </span>
                  </div>
                  <div className="flex gap-3 rounded-xl bg-danger-soft p-4 text-small ring-1 ring-inset ring-danger/15">
                    <span aria-hidden="true" className="mt-0.5 font-semibold text-danger">
                      ✕
                    </span>
                    <span>
                      <span className="font-semibold text-fg">Don&apos;t: </span>
                      <span className="text-fg-2">{rule.dont}</span>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          {/* ---------- Next steps ---------- */}
          <Section id="next" meta="3 free tools · no sign-up" title="Then make it fit one job">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {[
                {
                  href: '/resume-keyword-checker',
                  k: 'Step 1 · Check',
                  t: 'Match your CV to a job post',
                  b: 'Paste the post and your resume; see which of its skills you already name.',
                },
                {
                  href: '/star-method',
                  k: 'Step 2 · Prepare',
                  t: 'Turn a bullet into a STAR answer',
                  b: 'Write the story behind your best bullet and time it out loud.',
                },
                kit
                  ? {
                      href: `/${roleData.slug}`,
                      k: 'Step 3 · Learn',
                      t: `${kit.roleName} interview hub`,
                      b: 'Real reported questions, pay and what the loop looks like.',
                    }
                  : {
                      href: '/cover-letter',
                      k: 'Step 3 · Write',
                      t: 'Write the cover letter',
                      b: 'A short letter that points at the same two or three results.',
                    },
              ].map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  className="group relative rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2 md:p-6"
                >
                  <div className={`${kicker} text-fg-3`}>{c.k}</div>
                  <h3 className="mt-2 text-h4 font-semibold text-fg">
                    {c.t}{' '}
                    <span
                      aria-hidden="true"
                      className="inline-block transition-transform duration-fast group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </h3>
                  <p className="mt-2 text-small text-fg-2">{c.b}</p>
                </Link>
              ))}
            </div>
          </Section>

          {/* ---------- FAQ ---------- */}
          <Section id="faq" meta={pl(roleData.faqs.length, 'question')} title={`${r} resume FAQs`}>
            <div className="max-w-3xl space-y-3">
              {roleData.faqs.map((faq, i) => (
                <details
                  key={faq.q}
                  open={i === 0}
                  className="group rounded-xl border border-border bg-surface open:shadow-e1"
                >
                  <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-medium text-fg">
                    <h3 className="text-body font-medium">{faq.q}</h3>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-fg-3 transition-transform duration-base group-open:rotate-180"
                    >
                      ▾
                    </span>
                  </summary>
                  <p className="max-w-prose px-5 pb-5 text-body text-fg-2">{faq.a}</p>
                </details>
              ))}
            </div>
          </Section>

          {/* ---------- Other roles ---------- */}
          <section aria-labelledby="roles-t" className="border-t border-border py-12 md:py-16">
            <h2 id="roles-t" className={`${kicker} text-fg-3`}>
              Resume templates for {allRoles.length - 1} other roles
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {allRoles
                .filter((x) => x.slug !== roleData.slug)
                .map((x) => (
                  <li key={x.slug}>
                    <Link
                      href={`/cv-templates/${x.slug}`}
                      className="flex h-full flex-col rounded-xl border border-border bg-surface p-4 transition-[border-color] duration-fast hover:border-border-strong"
                    >
                      <span className="text-small font-medium text-fg">{x.roleName}</span>
                      <span className="mt-1 text-caption text-fg-3">{x.category}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          </section>
        </div>

        <MockInterviewCTA
          roleName={r}
          title="Your resume gets the call. Practise what comes next."
          questions={ctaQuestions}
        />
      </div>
    </DomainLayout>
  )
}
