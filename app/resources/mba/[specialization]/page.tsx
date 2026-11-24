import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import {
  getSpecializationBySlug,
  getAllSpecializationSlugs,
  mbaSpecializations,
  outsideFor,
} from '@/data/mbaResources'
import { CHECKED_ON } from '@/data/freeResources'

interface Props {
  params: Promise<{ specialization: string }>
}

export function generateStaticParams() {
  return getAllSpecializationSlugs().map((slug) => ({ specialization: slug }))
}

const CHECKED_LABEL = new Date(CHECKED_ON + 'T00:00:00Z').toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})

function describe(slug: string) {
  const spec = getSpecializationBySlug(slug)
  if (!spec) return ''
  return `What an MBA ${spec.name.toLowerCase()} interview tests and what to read for it: ${spec.ours.length} free guides and tools plus ${outsideFor(spec).length} outside resources we checked.`
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialization: slug } = await params
  const spec = getSpecializationBySlug(slug)
  if (!spec) return { title: 'Not found | Auto Interview AI' }
  const title =
    spec.slug === 'consulting'
      ? 'MBA Consulting Casebooks and Practice Cases (Free)'
      : `MBA ${spec.name} Interview Prep: What It Tests`
  return {
    title,
    description: describe(slug),
    alternates: { canonical: `https://www.autointerviewai.com/resources/mba/${spec.slug}` },
    openGraph: {
      title,
      description: describe(slug),
      url: `https://www.autointerviewai.com/resources/mba/${spec.slug}`,
      siteName: 'Auto Interview AI',
      locale: 'en_US',
      type: 'website',
    },
  }
}

const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong'

export default async function SpecializationPage({ params }: Props) {
  const { specialization: slug } = await params
  const spec = getSpecializationBySlug(slug)
  if (!spec) notFound()
  const outside = outsideFor(spec)
  const others = mbaSpecializations.filter((s) => s.slug !== spec.slug)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `MBA ${spec.name} interview prep`,
    description: describe(slug),
    url: `https://www.autointerviewai.com/resources/mba/${spec.slug}`,
  }

  return (
    <DomainLayout currentPath="/resources">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-border">
        <div className={`${container} grid gap-10 py-12 md:py-16 lg:grid-cols-12 lg:gap-12`}>
          <div className="lg:col-span-7">
            <nav aria-label="Breadcrumb" className="text-caption text-fg-3">
              <Link href="/resources" className="hover:text-fg">
                Resources
              </Link>{' '}
              /{' '}
              <Link href="/resources/mba" className="hover:text-fg">
                MBA
              </Link>{' '}
              / <span className="text-fg-2">{spec.name}</span>
            </nav>
            <p className={`animate-fade-rise mt-6 ${kicker}`}>
              MBA {spec.name} · {spec.ours.length + outside.length} resources · Links checked{' '}
              {CHECKED_LABEL}
            </p>
            <h1 className="animate-fade-rise mt-4 max-w-[20ch] font-serif text-display font-medium text-fg">
              {spec.slug === 'consulting'
                ? 'MBA consulting casebooks and practice cases.'
                : `MBA ${spec.name} interview prep.`}
            </h1>
            <p className="animate-fade-rise-delay mt-5 max-w-[56ch] text-body-lg text-fg-2">
              <span className="font-semibold text-fg">What it tests: </span>
              {spec.tests}
            </p>
            <div className="animate-fade-rise-delay-2 mt-8">
              <MockInterviewButton />
            </div>
          </div>
          <div className="animate-fade-rise-delay lg:col-span-5">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-e2 md:p-6">
              <h2 className="text-small font-semibold text-fg">What the interviewer checks</h2>
              <ol className="mt-4 space-y-4">
                {spec.checks.map((c, i) => (
                  <li key={c} className="flex gap-3 text-small text-fg-2">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-signal-tint font-mono text-caption font-semibold text-signal-ink">
                      {i + 1}
                    </span>
                    <span className="pt-1">{c}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="ours-title" className="py-14 md:py-16">
        <div className={container}>
          <p className={kicker}>Read first · free on this site</p>
          <h2 id="ours-title" className="mt-3 text-h2 font-semibold text-fg">
            Start with these
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spec.ours.map((o) => (
              <li key={o.href}>
                <Link
                  href={o.href}
                  className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2"
                >
                  <span className="text-h4 font-semibold text-fg group-hover:text-signal-strong">
                    {o.title} →
                  </span>
                  <span className="mt-2 text-small text-fg-2">{o.body}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {outside.length > 0 && (
        <section
          aria-labelledby="outside-title"
          className="border-t border-border bg-surface py-14 md:py-16"
        >
          <div className={container}>
            <p className={kicker}>Outside reading · opened and checked {CHECKED_LABEL}</p>
            <h2 id="outside-title" className="mt-3 text-h2 font-semibold text-fg">
              {spec.slug === 'consulting'
                ? 'Casebooks and the firms’ own cases'
                : (spec.outsideLabel ?? 'Worth your time')}
            </h2>
            <p className="mt-3 max-w-[60ch] text-small text-fg-2">
              These open on the publisher&rsquo;s site. We do not re-host PDFs.
            </p>
            <ul className="mt-8 divide-y divide-border rounded-xl border border-border bg-bg">
              {outside.map((r) => (
                <li
                  key={r.url}
                  className="flex flex-col gap-1 p-5 md:flex-row md:items-start md:gap-6"
                >
                  <div className="md:w-1/2">
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body font-semibold text-signal-strong underline-offset-2 hover:underline"
                    >
                      {r.title} ↗
                    </a>
                    <p className="mt-1 text-caption text-fg-3">
                      {r.publisher} · {r.format}
                      {r.official ? ' · from the firm itself' : ''}
                    </p>
                  </div>
                  <p className="text-small text-fg-2 md:w-1/2">{r.why}</p>
                </li>
              ))}
            </ul>
            {spec.slug === 'consulting' && (
              <div className="mt-8 rounded-xl bg-signal-tint p-5 text-small ring-1 ring-inset ring-signal/15">
                <p className="font-semibold text-fg">How to practise with a casebook</p>
                <p className="mt-1 max-w-[68ch] text-fg-2">
                  Work in pairs. One person reads the prompt and holds the data; the other asks
                  clarifying questions, draws the structure, does the maths out loud and ends with a
                  recommendation. Swap after each case, and time the opening structure to two
                  minutes.
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      <section aria-labelledby="other-title" className="border-t border-border py-12">
        <div className={container}>
          <h2 id="other-title" className="text-small font-semibold text-fg">
            Other MBA tracks
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  href={`/resources/mba/${o.slug}`}
                  className="inline-flex min-h-[36px] items-center rounded-full bg-muted px-3 text-caption font-medium text-fg-2 transition-colors duration-fast hover:bg-signal-tint hover:text-signal-ink"
                >
                  {o.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/resources"
                className="inline-flex min-h-[36px] items-center rounded-full bg-muted px-3 text-caption font-medium text-fg-2 transition-colors duration-fast hover:bg-signal-tint hover:text-signal-ink"
              >
                All interview resources
              </Link>
            </li>
          </ul>
        </div>
      </section>

      <MockInterviewCTA
        title={
          spec.slug === 'consulting' ? 'Say the case out loud.' : 'Practise the interview out loud.'
        }
        body="A voice interviewer asks the question, follows up on what you say, and tells you what was strong and what was thin."
      />
    </DomainLayout>
  )
}
