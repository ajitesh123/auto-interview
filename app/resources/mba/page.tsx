import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import MockInterviewButton from '@/components/ai/MockInterviewButton'
import MockInterviewCTA from '@/components/ai/MockInterviewCTA'
import { mbaSpecializations, outsideFor } from '@/data/mbaResources'

const DESCRIPTION =
  'Free MBA interview prep by track: consulting casebooks and the firms’ own practice cases, plus what general management, finance, marketing, HR and product interviews test, with the guide to read for each.'

export const metadata: Metadata = {
  title: 'MBA Interview Prep by Track: Casebooks and Guides',
  description: DESCRIPTION,
  alternates: { canonical: 'https://www.autointerviewai.com/resources/mba' },
  openGraph: {
    title: 'MBA interview prep by track',
    description: DESCRIPTION,
    url: 'https://www.autointerviewai.com/resources/mba',
    siteName: 'Auto Interview AI',
    locale: 'en_US',
    type: 'website',
  },
}

const container = 'mx-auto w-full max-w-[1200px] px-5 md:px-8'
const kicker = 'font-mono text-kicker uppercase tracking-[0.08em] text-signal-strong'

export default function MBAResourcesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'MBA interview prep by track',
    description: DESCRIPTION,
    url: 'https://www.autointerviewai.com/resources/mba',
  }
  return (
    <DomainLayout currentPath="/resources">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <section className="border-b border-border">
        <div className={`${container} py-12 md:py-16`}>
          <nav aria-label="Breadcrumb" className="text-caption text-fg-3">
            <Link href="/resources" className="hover:text-fg">
              Resources
            </Link>{' '}
            / <span className="text-fg-2">MBA</span>
          </nav>
          <p className={`animate-fade-rise mt-6 ${kicker}`}>
            MBA · {mbaSpecializations.length} tracks · Updated Nov 2026
          </p>
          <h1 className="animate-fade-rise mt-4 max-w-[20ch] font-serif text-display font-medium text-fg">
            MBA interview prep, by the job you want.
          </h1>
          <p className="animate-fade-rise-delay mt-5 max-w-[56ch] text-body-lg text-fg-2">
            Each track says what its interview tests and links the guide to read and the outside
            material worth your time. Casebooks link to the sites that publish them.
          </p>
          <div className="animate-fade-rise-delay-2 mt-8">
            <MockInterviewButton />
          </div>
        </div>
      </section>

      <section aria-label="Tracks" className="py-14 md:py-20">
        <ul className={`${container} grid gap-4 sm:grid-cols-2 lg:grid-cols-3`}>
          {mbaSpecializations.map((s) => {
            const n = s.ours.length + outsideFor(s).length
            return (
              <li key={s.slug}>
                <Link
                  href={`/resources/mba/${s.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-surface p-5 transition-[border-color,box-shadow] duration-fast hover:border-border-strong hover:shadow-e2 md:p-6"
                >
                  <span className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
                    {n} resources
                  </span>
                  <span className="mt-2 text-h4 font-semibold text-fg group-hover:text-signal-strong">
                    {s.name}
                  </span>
                  <span className="mt-2 flex-1 text-small text-fg-2">{s.tests}</span>
                  <span className="mt-4 text-small font-semibold text-signal-strong">
                    What it tests and what to read →
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      <MockInterviewCTA
        title="Say the case out loud."
        body="A case read silently feels easy. A voice interviewer asks the question, pushes on your structure and maths, and tells you what was thin."
      />
    </DomainLayout>
  )
}
