import Link from 'next/link'
import type { ReactNode } from 'react'
import DomainLayout from '@/components/domain/DomainLayout'
import type { RoleHub } from '@/data/roleHubs/types'
import { KIT_PATHS } from '@/data/roleKits'
import { ArrowRightIcon } from '@/components/roleHub/icons'
import KitStrip from './KitStrip'
import MockInterviewButton from '@/components/ai/MockInterviewButton'

// Shared Signal Paper layout for role kit pages (resume / CV and letter of recommendation).

export const SITE = 'https://www.autointerviewai.com'
export const container = 'mx-auto w-full max-w-[1100px] px-5 md:px-8'

export function Section({
  id,
  n,
  title,
  sub,
  children,
}: {
  id: string
  n: number
  title: string
  sub?: string
  children: ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-t`}
      className="scroll-mt-24 border-t border-border py-12 md:py-16"
    >
      <div className="max-w-2xl">
        <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
          {String(n).padStart(2, '0')}
        </div>
        <h2 id={`${id}-t`} className="mt-2 text-h2 font-semibold text-fg">
          {title}
        </h2>
        {sub && <p className="mt-2 text-body text-fg-2">{sub}</p>}
      </div>
      <div className="mt-7 space-y-4">{children}</div>
    </section>
  )
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-border bg-surface p-5 md:p-6 ${className}`}>
      {children}
    </div>
  )
}

export function KitShell({
  hub,
  kind,
  h1,
  kicker,
  directAnswer,
  toc,
  schemas,
  primary,
  children,
  faqs,
}: {
  hub: RoleHub
  kind: 'resume' | 'lor' | 'cover-letter'
  h1: string
  kicker: string
  directAnswer: string
  toc: { id: string; label: string }[]
  schemas: object[]
  primary: { href: string; label: string }
  children: ReactNode
  faqs: { q: string; a: string }[]
}) {
  const other =
    kind === 'resume'
      ? { href: KIT_PATHS.lor(hub.slug), label: `Letter of recommendation for ${hub.shortName}` }
      : { href: KIT_PATHS.resume(hub.slug), label: `${hub.shortName} resume (CV) guide` }
  const crumb =
    kind === 'resume' ? 'Resume (CV)' : kind === 'lor' ? 'Letter of recommendation' : 'Cover letter'
  return (
    <DomainLayout currentPath={`/${hub.slug}`}>
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}
      <div className="bg-bg text-fg">
        <div className={`${container} pb-6 pt-8 md:pt-12`}>
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-caption text-fg-3"
          >
            <Link href="/" className="hover:text-fg">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/${hub.slug}`} className="hover:text-fg">
              {hub.roleName}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-fg-2">{crumb}</span>
          </nav>
          <header className="mt-8 max-w-3xl">
            <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong">
              {kicker}
            </div>
            <h1 className="mt-4 font-serif text-display font-medium text-fg">{h1}</h1>
            <div className="mt-6 rounded-xl bg-signal-tint p-5 ring-1 ring-inset ring-signal/15">
              <div className="font-mono text-kicker uppercase tracking-[0.08em] text-signal-ink">
                The short answer
              </div>
              <p className="speakable-direct-answer mt-2 text-body-lg leading-relaxed text-fg">
                {directAnswer}
              </p>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={primary.href}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-colors duration-fast hover:bg-signal-strong"
              >
                {primary.label} <ArrowRightIcon />
              </a>
              <Link
                href={`/${hub.slug}`}
                className="inline-flex h-11 items-center rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border-strong hover:bg-muted"
              >
                Full {hub.shortName} interview guide
              </Link>
            </div>
            <div className="mt-5">
              <MockInterviewButton
                label={`Practise the ${hub.shortName} interview`}
                role={hub.roleName}
              />
            </div>
          </header>
          <div className="mt-8">
            <KitStrip hub={hub} current={kind} />
          </div>
          <nav aria-label="On this page" className="mt-10">
            <div className="text-caption font-medium text-fg-3">On this page</div>
            <ol className="mt-2 flex flex-wrap gap-2">
              {toc.map((t, i) => (
                <li key={t.id}>
                  <a
                    href={`#${t.id}`}
                    className="inline-flex h-9 items-center gap-1.5 rounded-full bg-surface px-3.5 text-small text-fg-2 ring-1 ring-inset ring-border hover:text-fg hover:ring-border-strong"
                  >
                    <span className="font-mono text-caption text-fg-3">{i + 1}</span>
                    {t.label}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className={container}>{children}</div>

        <div className={`${container} border-t border-border py-12 md:py-16`}>
          <h2 className="text-h2 font-semibold text-fg">Keep going</h2>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {[
              other,
              {
                href: `/${hub.slug}#interview`,
                label: `${hub.shortName} interview questions with answers`,
              },
              {
                href: '/free-mock-interview',
                label: 'Practise out loud in a free AI mock interview',
              },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-5 text-small font-semibold text-fg transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
              >
                {l.label}
                <ArrowRightIcon className="h-4 w-4 shrink-0 text-fg-3 transition-transform duration-fast group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>

          <h2 id="faq" className="mt-14 text-h2 font-semibold text-fg">
            Frequently asked questions
          </h2>
          <div className="mt-6 max-w-3xl space-y-2.5">
            {faqs.map((f, i) => (
              <details
                key={f.q}
                open={i === 0}
                className="group rounded-xl border border-border bg-surface open:shadow-e1"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-start justify-between gap-4 px-5 py-4 text-body font-medium text-fg [&::-webkit-details-marker]:hidden">
                  <span>{f.q}</span>
                  <span
                    aria-hidden="true"
                    className="mt-0.5 font-mono text-fg-3 transition-transform duration-base group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="max-w-[68ch] px-5 pb-5 text-small leading-relaxed text-fg-2 sm:text-body">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </DomainLayout>
  )
}

export function kitSchemas(opts: {
  url: string
  name: string
  description: string
  dateModified: string
  hub: RoleHub
  crumb: string
  faqs: { q: string; a: string }[]
}) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: opts.name,
      description: opts.description,
      url: opts.url,
      dateModified: opts.dateModified,
      about: { '@type': 'Occupation', name: opts.hub.roleName },
      publisher: { '@type': 'Organization', name: 'Auto Interview AI', url: SITE },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        {
          '@type': 'ListItem',
          position: 2,
          name: opts.hub.roleName,
          item: `${SITE}/${opts.hub.slug}`,
        },
        { '@type': 'ListItem', position: 3, name: opts.crumb, item: opts.url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: opts.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
  ]
}
