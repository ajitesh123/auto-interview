import type { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import {
  CHECKED_ON,
  FREE_RESOURCE_COUNT,
  FREE_RESOURCE_SECTIONS,
  type FreeResource,
} from '@/data/freeResources'

// Nov 2026 rebuild: a hand-checked library of free resources that links to the original publishers.
const SITE = 'https://www.autointerviewai.com'
const PAGE_URL = `${SITE}/free-resources`
const TITLE = 'Free Interview Prep Resources: Casebooks, Resume Templates and Study PDFs'
const DESCRIPTION = `${FREE_RESOURCE_COUNT} free, hand-checked interview prep resources: McKinsey and Bain practice cases, MBA casebooks, Harvard resume templates, coding lists, statistics PDFs and campus placement guides. Linked to the original source.`

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords:
    'free interview prep resources, consulting casebook pdf, case interview practice, resume template free, harvard resume template, blind 75, grind 75, tcs nqt pattern, data analyst interview, free statistics pdf',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    siteName: 'Auto Interview AI',
    type: 'article',
  },
}

const FAQS = [
  {
    q: 'Are these resources really free?',
    a: 'Yes. Every resource on this page can be read or downloaded without paying. Some publishers sell optional extras, which we do not link to.',
  },
  {
    q: 'Where can I find consulting casebook PDFs?',
    a: 'Start with the firms’ own practice cases: McKinsey publishes five and Bain publishes two. For more volume, the casebook collection linked in the consulting section gathers 26 MBA club casebooks, including Wharton, Booth, Kellogg and INSEAD.',
  },
  {
    q: 'Why do you link out instead of hosting the files?',
    a: 'The files belong to their publishers. Linking to the original keeps you on the latest version and respects their copyright.',
  },
  {
    q: 'How do you choose what goes on this list?',
    a: `We open every link and check that it is free and still online. We prefer material published by the employer, the school or the author. This list was last checked on ${CHECKED_ON}.`,
  },
]

function ResourceCard({ r }: { r: FreeResource }) {
  const internal = r.url.startsWith('/')
  const body = (
    <>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded bg-[#f5f5f5] px-2 py-0.5 font-mono text-[10px] uppercase text-[#171717]">
          {r.format}
        </span>
        {r.official && (
          <span className="rounded bg-[#EEF1FF] px-2 py-0.5 text-[10px] font-medium text-[#1E33B3]">
            From the source
          </span>
        )}
      </div>
      <div className="mt-2 text-sm font-medium text-[#171717] group-hover:underline">
        {r.title}
        {!internal && <span aria-hidden="true"> ↗</span>}
      </div>
      <p className="mt-1 text-xs leading-relaxed text-[#666666]">{r.why}</p>
      <p className="mt-2 text-[11px] text-[#999999]">{r.publisher}</p>
    </>
  )
  const cls =
    'group block rounded-xl border border-[#ebebeb] bg-white p-4 transition hover:border-[#171717]'
  return internal ? (
    <Link href={r.url} className={cls}>
      {body}
    </Link>
  ) : (
    <a href={r.url} target="_blank" rel="noopener noreferrer" className={cls}>
      {body}
    </a>
  )
}

export default function FreeResources() {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQS.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE },
        { '@type': 'ListItem', position: 2, name: 'Free resources', item: PAGE_URL },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: TITLE,
      description: DESCRIPTION,
      url: PAGE_URL,
      dateModified: CHECKED_ON,
      publisher: { '@type': 'Organization', name: 'Auto Interview AI', url: SITE },
    },
  ]

  return (
    <DomainLayout currentPath="/free-resources">
      {schemas.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }}
        />
      ))}

      <div className="min-h-screen bg-[#fafafa] px-4 pb-32 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-14">
          <nav className="flex items-center space-x-2 text-xs font-medium text-[#666666]">
            <Link href="/" className="transition-colors hover:text-[#171717]">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-[#171717]">Free resources</span>
          </nav>

          <header className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#ebebeb] bg-white px-3.5 py-1 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717] shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#3B5BFF]" />
              <span>{FREE_RESOURCE_COUNT} resources</span>
              <span className="text-[#999999]">•</span>
              <span className="font-semibold text-[#3B5BFF]">Checked {CHECKED_ON}</span>
            </div>
            <h1 className="text-4xl font-normal leading-[1.08] tracking-tight text-[#171717] sm:text-5xl">
              Free interview prep resources, checked by hand
            </h1>
            <p className="max-w-3xl text-lg font-light leading-relaxed text-[#666666]">
              Practice cases from McKinsey and Bain, MBA casebooks, Harvard resume templates, coding
              lists, statistics textbooks and campus placement guides. Every link goes to the
              original publisher, and we check each one is free.
            </p>
          </header>

          <nav aria-label="Sections" className="flex flex-wrap gap-2">
            {FREE_RESOURCE_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="rounded-full border border-[#ebebeb] bg-white px-3 py-1.5 text-xs font-medium text-[#171717] hover:border-[#171717]"
              >
                {s.title.split(':')[0]}
              </a>
            ))}
          </nav>

          {FREE_RESOURCE_SECTIONS.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28 space-y-5">
              <div className="space-y-2">
                <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-[#3B5BFF]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="text-2xl font-normal tracking-tight text-[#171717] sm:text-3xl">
                  {s.title}
                </h2>
                <p className="max-w-3xl text-sm leading-relaxed text-[#666666]">{s.intro}</p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {s.items.map((r) => (
                  <ResourceCard key={r.url} r={r} />
                ))}
              </div>
              {s.ours && (
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
                  {s.ours.map((o) => (
                    <Link
                      key={o.href}
                      href={o.href}
                      className="font-medium text-[#3B5BFF] hover:underline"
                    >
                      {o.label} →
                    </Link>
                  ))}
                </div>
              )}
            </section>
          ))}

          <section className="rounded-2xl bg-[#0E1424] p-8 text-white">
            <h2 className="text-2xl font-normal tracking-tight">
              Reading is half of it. Say it out loud.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
              Practise your answers with a free AI mock interviewer and get feedback on every
              answer.
            </p>
            <Link
              href="/free-mock-interview"
              className="mt-5 inline-flex items-center rounded-md bg-[#3B5BFF] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#2F4BE0]"
            >
              Start a free mock interview
            </Link>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-normal tracking-tight text-[#171717]">Questions</h2>
            {FAQS.map((f) => (
              <details key={f.q} className="rounded-xl border border-[#ebebeb] bg-white p-4">
                <summary className="cursor-pointer text-sm font-medium text-[#171717]">
                  {f.q}
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-[#4d4d4d]">{f.a}</p>
              </details>
            ))}
          </section>
        </div>
      </div>
    </DomainLayout>
  )
}
