import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import { mbaSpecializations } from '@/data/mbaResources'

export const metadata: Metadata = {
  title: 'MBA Interview Resources — Consulting, Finance, Marketing & More | Auto Interview AI',
  description:
    'Free MBA interview preparation resources organized by specialization. Download casebooks, frameworks, and study guides for consulting, finance, marketing, HR, and product management interviews.',
  keywords:
    'MBA interview resources, consulting casebook, MBA case interview, finance interview prep, marketing interview questions, MBA preparation, IIM Ahmedabad casebook, IIM Bangalore casebook, IIM Calcutta casebook, FMS casebook',
  alternates: {
    canonical: 'https://www.autointerviewai.com/resources/mba',
  },
  openGraph: {
    title: 'MBA Interview Resources — Consulting, Finance, Marketing & More',
    description:
      'Free MBA interview preparation resources organized by specialization. Casebooks, frameworks, and study guides.',
    url: 'https://www.autointerviewai.com/resources/mba',
    siteName: 'Auto Interview AI',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'MBA Interview Resources',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBA Interview Resources — Consulting, Finance, Marketing & More',
    description: 'Free MBA casebooks, frameworks, and domain prep kits.',
    images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
    creator: '@ajiteshleo',
  },
}

function getSpecializationIcon(slug: string) {
  switch (slug) {
    case 'consulting':
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      )
    case 'general-management':
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      )
    case 'finance':
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      )
    case 'marketing':
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
          />
        </svg>
      )
    case 'hr':
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      )
    case 'product-management':
    default:
      return (
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
          />
        </svg>
      )
  }
}

export default function MBAResourcesPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'MBA Interview Resources',
    description: metadata.description,
    url: 'https://www.autointerviewai.com/resources/mba',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Which MBA specializations have free interview materials available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Consulting casebooks from IIM Ahmedabad, IIM Bangalore, IIM Calcutta, and FMS Delhi are currently live. General Management, Finance, Marketing, HR, and Product Management tracks are being added.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are these the official casebooks used by top IIMs?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, these are the verified casebooks compiled by student placement committees and consulting clubs at top Indian management institutes.',
        },
      },
    ],
  }

  const faqs = [
    {
      q: 'Which MBA specializations have free interview materials available?',
      a: 'Consulting casebooks from IIM Ahmedabad, IIM Bangalore, IIM Calcutta, and FMS Delhi are currently live. General Management, Finance, Marketing, HR, and Product Management tracks are being added.',
    },
    {
      q: 'Are these the official casebooks used by top IIMs?',
      a: 'Yes, these are the verified casebooks compiled by student placement committees and consulting clubs at top Indian management institutes.',
    },
  ]

  return (
    <DomainLayout currentPath="/resources">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
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
          / <span className="text-[#171717]">MBA</span>
        </nav>

        <header className="mb-16 max-w-3xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            MBA RESOURCES
          </p>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-[#171717] sm:text-5xl md:text-6xl">
            Choose your specialization.
          </h1>
          <p className="text-lg leading-relaxed text-[#4d4d4d]">
            Deep-dive resources for every MBA career track. Download casebooks, frameworks, and
            practice guides.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mbaSpecializations.map((spec) => {
            const cardContent = (
              <div
                className={`flex h-full flex-col rounded-[6px] bg-white p-7 ${
                  !spec.comingSoon ? 'transition-all hover:shadow-[0_0_0_1px_rgba(0,0,0,0.15)]' : ''
                }`}
                style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
              >
                <div className="mb-5 flex items-start justify-between">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#fafafa] text-[#171717]"
                    style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                  >
                    {getSpecializationIcon(spec.slug)}
                  </div>
                  {spec.comingSoon && (
                    <span
                      className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.071em] text-[#666666]"
                      style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                    >
                      COMING SOON
                    </span>
                  )}
                  {!spec.comingSoon && (
                    <span
                      className="rounded-full bg-[#fafafa] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.071em] text-[#171717]"
                      style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                    >
                      {spec.resources.length} RESOURCES
                    </span>
                  )}
                </div>
                <h2 className="mb-2 mt-auto text-[22px] font-normal tracking-[-0.5px] text-[#171717]">
                  {spec.name}
                </h2>
                <p className="mb-6 flex-grow text-sm leading-relaxed text-[#4d4d4d]">
                  {spec.description}
                </p>
                {!spec.comingSoon && (
                  <div className="mt-auto flex items-center text-sm font-medium text-[#171717] transition-transform group-hover:translate-x-1">
                    Explore {spec.name} →
                  </div>
                )}
              </div>
            )

            return spec.comingSoon ? (
              <div key={spec.slug} className="block h-full cursor-default opacity-80">
                {cardContent}
              </div>
            ) : (
              <Link
                key={spec.slug}
                href={`/resources/mba/${spec.slug}`}
                className="group block h-full"
              >
                {cardContent}
              </Link>
            )
          })}
        </div>

        {/* FAQ Section */}
        <div className="mt-20 border-t border-[#ebebeb] pt-12">
          <div className="mb-8">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              FAQ
            </p>
            <h3 className="text-2xl font-normal tracking-tight text-[#171717]">
              MBA Resources FAQs
            </h3>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div
                key={faq.q}
                className="rounded-[6px] bg-white p-6"
                style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
              >
                <h4 className="mb-2 text-base font-medium text-[#171717]">{faq.q}</h4>
                <p className="text-sm leading-relaxed text-[#4d4d4d]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DomainLayout>
  )
}
