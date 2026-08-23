import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'

export const metadata: Metadata = {
  title: 'Free Interview Resources by Domain — MBA, Engineering & Commerce | Auto Interview AI',
  description:
    'Access free, domain-specific interview preparation resources. Curated MBA casebooks, engineering interview frameworks, and commerce playbooks built by practitioners.',
  keywords:
    'interview resources, MBA interview prep, consulting casebooks, engineering interview resources, free interview preparation, case interview framework, IIM casebooks, career prep kits',
  alternates: {
    canonical: 'https://www.autointerviewai.com/resources',
  },
  openGraph: {
    title: 'Free Interview Resources by Domain — MBA, Engineering & Commerce',
    description:
      'Access free, domain-specific interview preparation resources. Curated MBA casebooks, frameworks, and playbooks.',
    url: 'https://www.autointerviewai.com/resources',
    siteName: 'Auto Interview AI',
    images: [
      {
        url: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'Free Interview Resources by Domain',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Interview Resources by Domain — MBA, Engineering & Commerce',
    description: 'Free domain-specific casebooks, frameworks, and interview prep guides.',
    images: ['https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png'],
    creator: '@ajiteshleo',
  },
}

export default function ResourcesHubPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Interview Resources by Domain',
    description: metadata.description,
    url: 'https://www.autointerviewai.com/resources',
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What interview resources are available on Auto Interview AI?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Auto Interview AI provides free, domain-specific interview resources including official casebooks from IIM Ahmedabad, IIM Bangalore, IIM Calcutta, and FMS Delhi, along with frameworks for market sizing, profitability, product management, and engineering prep.',
        },
      },
      {
        '@type': 'Question',
        name: 'Are all interview resources and casebooks free to access?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. All playbooks, casebooks, frameworks, and preparation guides are 100% free and ungated with zero paywalls.',
        },
      },
    ],
  }

  const faqs = [
    {
      q: 'What interview resources are available on Auto Interview AI?',
      a: 'Auto Interview AI provides free, domain-specific interview resources including official casebooks from IIM Ahmedabad, IIM Bangalore, IIM Calcutta, and FMS Delhi, along with frameworks for market sizing, profitability, product management, and engineering prep.',
    },
    {
      q: 'Are all interview resources and casebooks free to access?',
      a: 'Yes. All playbooks, casebooks, frameworks, and preparation guides are 100% free and ungated with zero paywalls.',
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
        <header className="mb-16 max-w-3xl">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            RESOURCES
          </p>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-[#171717] sm:text-5xl md:text-6xl">
            Domain-specific intelligence.
          </h1>
          <p className="text-lg leading-relaxed text-[#4d4d4d]">
            Curated frameworks, casebooks, and playbooks organized by domain. Download the material,
            master the craft.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* MBA Card */}
          <Link href="/resources/mba" className="group block h-full">
            <div
              className="flex h-full flex-col rounded-[6px] bg-white p-7 transition-all hover:shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
              style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
            >
              <div className="mb-5 flex items-start justify-between">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#fafafa] text-[#171717]"
                  style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <span
                  className="rounded-full bg-[#fafafa] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.071em] text-[#171717]"
                  style={{ boxShadow: '0 0 0 1px #ebebeb' }}
                >
                  6 SPECIALIZATIONS
                </span>
              </div>
              <h2 className="mb-2 text-[24px] font-normal tracking-[-0.5px] text-[#171717]">MBA</h2>
              <p className="mb-6 flex-grow text-sm leading-relaxed text-[#4d4d4d]">
                Consulting, general management, finance, marketing, HR, and PM. Curated casebooks
                from top Indian B-Schools.
              </p>
              <div className="mt-auto flex items-center text-sm font-medium text-[#171717] transition-transform group-hover:translate-x-1">
                Explore MBA Resources →
              </div>
            </div>
          </Link>

          {/* Engineering Card */}
          <div
            className="flex h-full flex-col rounded-[6px] bg-white p-7"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <div className="mb-5 flex items-start justify-between">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#fafafa] text-[#171717]"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <span
                className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.071em] text-[#666666]"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                COMING SOON
              </span>
            </div>
            <h2 className="mb-2 text-[24px] font-normal tracking-[-0.5px] text-[#171717]">
              Engineering
            </h2>
            <p className="text-sm leading-relaxed text-[#4d4d4d]">
              Technical interview preparation for software, mechanical, electrical, and computer
              engineering tracks.
            </p>
          </div>

          {/* Commerce Card */}
          <div
            className="flex h-full flex-col rounded-[6px] bg-white p-7"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <div className="mb-5 flex items-start justify-between">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#fafafa] text-[#171717]"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <span
                className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.071em] text-[#666666]"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                COMING SOON
              </span>
            </div>
            <h2 className="mb-2 text-[24px] font-normal tracking-[-0.5px] text-[#171717]">
              Commerce & CA
            </h2>
            <p className="text-sm leading-relaxed text-[#4d4d4d]">
              Accounting, financial reporting, taxation, audit, and commercial corporate interview
              frameworks.
            </p>
          </div>

          {/* Other Streams Card */}
          <div
            className="flex h-full flex-col rounded-[6px] bg-white p-7"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <div className="mb-5 flex items-start justify-between">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-[6px] bg-[#fafafa] text-[#171717]"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </div>
              <span
                className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.071em] text-[#666666]"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                COMING SOON
              </span>
            </div>
            <h2 className="mb-2 text-[24px] font-normal tracking-[-0.5px] text-[#171717]">
              Other Streams
            </h2>
            <p className="text-sm leading-relaxed text-[#4d4d4d]">
              Law, Healthcare Management, and additional specialized vocational preparation kits
              launching soon.
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 border-t border-[#ebebeb] pt-12">
          <div className="mb-8">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              FAQ
            </p>
            <h3 className="text-2xl font-normal tracking-tight text-[#171717]">
              Domain Resources FAQs
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
