import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import DomainLayout from '@/components/domain/DomainLayout'
import { getSpecializationBySlug, getAllSpecializationSlugs } from '@/data/mbaResources'

interface Props {
  params: Promise<{ specialization: string }>
}

export function generateStaticParams() {
  return getAllSpecializationSlugs().map((slug) => ({
    specialization: slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialization: slug } = await params
  const spec = getSpecializationBySlug(slug)

  if (!spec) {
    return { title: 'Specialization Not Found | Auto Interview AI' }
  }

  return {
    title: `${spec.name} Interview Resources & Casebooks — MBA | Auto Interview AI`,
    description: `Free download of ${spec.name.toLowerCase()} interview casebooks, strategy frameworks, and practice materials from IIM Ahmedabad, Bangalore, Calcutta, and FMS.`,
    keywords: `${spec.name} casebook, MBA ${spec.name.toLowerCase()} interview, IIM casebook, consulting case interview, market sizing frameworks, profitability framework`,
    alternates: {
      canonical: `https://www.autointerviewai.com/resources/mba/${spec.slug}`,
    },
    openGraph: {
      title: `${spec.name} Interview Resources & Casebooks — MBA`,
      description: `Free download of ${spec.name.toLowerCase()} interview casebooks and frameworks from top Indian B-Schools.`,
      url: `https://www.autointerviewai.com/resources/mba/${spec.slug}`,
      siteName: 'Auto Interview AI',
      images: [
        {
          url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
          width: 1200,
          height: 630,
          alt: `${spec.name} MBA Interview Resources`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${spec.name} Interview Resources & Casebooks — MBA`,
      description: `Free download of ${spec.name.toLowerCase()} interview casebooks and frameworks.`,
      images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
      creator: '@ajiteshleo',
    },
  }
}

export default async function SpecializationPage({ params }: Props) {
  const { specialization: slug } = await params
  const spec = getSpecializationBySlug(slug)

  if (!spec) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${spec.name} MBA Interview Resources`,
    description: spec.description,
    url: `https://www.autointerviewai.com/resources/mba/${spec.slug}`,
    numberOfItems: spec.resources.length,
    itemListElement: spec.resources.map((res, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'DigitalDocument',
        name: res.title,
        description: res.description,
        isAccessibleForFree: true,
        fileFormat: 'application/pdf',
        author: {
          '@type': 'EducationalOrganization',
          name: res.source,
        },
      },
    })),
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is included in the MBA Consulting casebooks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The consulting casebooks contain actual interview cases, structured solution frameworks (Profitability, Market Entry, Pricing, M&A, Growth Strategy), guesstimates, and business transcripts from placement cycles at IIM Ahmedabad, IIM Bangalore, IIM Calcutta, and FMS Delhi.',
        },
      },
      {
        '@type': 'Question',
        name: 'How should I practice with these casebooks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Practice in pairs (interviewer and interviewee). Have one person read the case prompt and background data while the candidate structures hypotheses, asks clarifying questions, and runs market sizing calculations before reviewing the model answers.',
        },
      },
    ],
  }

  return (
    <DomainLayout currentPath="/resources">
      {spec.resources.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="mx-auto max-w-5xl px-6 py-20">
        {/* Breadcrumb */}
        <nav className="mb-8 font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
          <Link href="/" className="hover:text-[#171717]">
            Home
          </Link>{' '}
          /{' '}
          <Link href="/resources" className="hover:text-[#171717]">
            Resources
          </Link>{' '}
          /{' '}
          <Link href="/resources/mba" className="hover:text-[#171717]">
            MBA
          </Link>{' '}
          / <span className="text-[#171717]">{spec.name}</span>
        </nav>

        <header className="mb-16 max-w-3xl">
          <div className="mb-3 inline-flex items-center gap-2">
            <span className="text-3xl">{spec.icon}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              MBA Track
            </span>
          </div>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-[#171717] sm:text-5xl md:text-6xl">
            {spec.name} Resources
          </h1>
          <p className="text-lg leading-relaxed text-[#4d4d4d]">{spec.description}</p>
        </header>

        {spec.comingSoon ? (
          <div
            className="rounded-[6px] bg-white p-12 text-center"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <span
              className="mb-6 inline-block rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.071em] text-[#666666]"
              style={{ boxShadow: '0 0 0 1px #ebebeb' }}
            >
              COMING SOON
            </span>
            <h2 className="mb-3 text-2xl font-normal tracking-tight text-[#171717]">
              We&apos;re curating {spec.name} resources.
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm text-[#4d4d4d]">
              We are currently packaging top playbooks and guides for this track. Explore our
              consulting casebooks in the meantime.
            </p>
            <Link
              href="/resources/mba/consulting"
              className="inline-flex items-center justify-center rounded-[6px] bg-[#171717] px-5 py-2.5 text-sm text-white transition-colors hover:bg-[#383838]"
            >
              View Consulting Casebooks →
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid gap-6 md:grid-cols-2">
              {spec.resources.map((resource) => (
                <div
                  key={resource.slug}
                  className="flex flex-col rounded-[6px] bg-white p-6"
                  style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <span
                      className="rounded-full bg-[#fafafa] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.071em] text-[#171717]"
                      style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                    >
                      {resource.source}
                    </span>
                    <span className="font-mono text-[10px] uppercase text-[#666666]">
                      {resource.format}
                    </span>
                  </div>

                  <h3 className="mb-2 text-[20px] font-normal tracking-[-0.5px] text-[#171717]">
                    {resource.title}
                  </h3>
                  <p className="mb-6 flex-grow text-sm leading-relaxed text-[#4d4d4d]">
                    {resource.description}
                  </p>

                  <div className="mb-6 flex flex-wrap gap-1.5">
                    {resource.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-[#fafafa] px-2 py-0.5 font-mono text-[10px] text-[#666666]"
                        style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={resource.downloadUrl}
                    className="block rounded-[6px] bg-[#171717] px-5 py-2.5 text-center text-sm text-white transition-colors hover:bg-[#383838]"
                  >
                    Download {resource.format}
                  </a>
                </div>
              ))}
            </div>

            {/* Consulting Practice FAQ */}
            <div className="mt-16 border-t border-[#ebebeb] pt-12">
              <div className="mb-8">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
                  CASE INTERVIEW FAQ
                </p>
                <h3 className="text-2xl font-normal tracking-tight text-[#171717]">
                  How to use MBA casebooks effectively
                </h3>
              </div>
              <div className="space-y-4">
                <div
                  className="rounded-[6px] bg-white p-6"
                  style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
                >
                  <h4 className="mb-2 text-base font-medium text-[#171717]">
                    What is included in the MBA Consulting casebooks?
                  </h4>
                  <p className="text-sm leading-relaxed text-[#4d4d4d]">
                    The consulting casebooks contain actual interview cases, structured solution
                    frameworks (Profitability, Market Entry, Pricing, M&amp;A, Growth Strategy),
                    guesstimates, and business transcripts from placement cycles at IIM Ahmedabad,
                    IIM Bangalore, IIM Calcutta, and FMS Delhi.
                  </p>
                </div>
                <div
                  className="rounded-[6px] bg-white p-6"
                  style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
                >
                  <h4 className="mb-2 text-base font-medium text-[#171717]">
                    How should I practice with these casebooks?
                  </h4>
                  <p className="text-sm leading-relaxed text-[#4d4d4d]">
                    Practice in pairs (interviewer and interviewee). Have one person read the case
                    prompt and background data while the candidate structures hypotheses, asks
                    clarifying questions, and runs market sizing calculations before reviewing the
                    model answers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DomainLayout>
  )
}
