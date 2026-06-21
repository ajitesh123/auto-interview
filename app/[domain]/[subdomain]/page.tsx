import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import Breadcrumbs from '@/components/domain/Breadcrumbs'
import ContentHubTabs from '@/components/domain/ContentHubTabs'
import FAQSection from '@/components/domain/FAQSection'
import { getSubDomainBySlug, getAllSubDomainSlugs, generateBreadcrumbs, getSiblingSubDomains } from '@/lib/domainUtils'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  params: Promise<{ domain: string; subdomain: string }>
}

export async function generateStaticParams() {
  return getAllSubDomainSlugs()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain: domainSlug, subdomain: subDomainSlug } = await params
  const result = getSubDomainBySlug(domainSlug, subDomainSlug)
  if (!result) return {}

  const { domain, subDomain } = result
  const title = `${domain.name} ${subDomain.name} Interview Resources | Auto Interview AI`
  const description = subDomain.aeoSummary

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteMetadata.siteUrl}/${domain.slug}/${subDomain.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/${domain.slug}/${subDomain.slug}`,
    },
  }
}

export default async function SubDomainPage({ params }: Props) {
  const { domain: domainSlug, subdomain: subDomainSlug } = await params
  const result = getSubDomainBySlug(domainSlug, subDomainSlug)
  if (!result) notFound()

  const { domain, subDomain } = result
  const breadcrumbs = generateBreadcrumbs(domainSlug, subDomainSlug)
  const siblings = getSiblingSubDomains(domainSlug, subDomainSlug)

  return (
    <DomainLayout currentPath={`/${domainSlug}/${subDomainSlug}`}>
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* AEO summary */}
        <p className="mb-6 text-base leading-relaxed text-[hsl(240,4%,66%)]">
          {subDomain.aeoSummary}
        </p>

        {/* Header */}
        <div className="mb-12">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-4xl">{subDomain.icon}</span>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[hsl(240,4%,66%)]">
              {domain.name}
            </span>
          </div>

          <h1
            className="animate-fade-rise mb-4 text-4xl text-white sm:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {subDomain.name} Interview Prep
          </h1>
          <p className="animate-fade-rise-delay max-w-3xl text-base leading-relaxed text-[hsl(240,4%,66%)]">
            {subDomain.description}
          </p>
        </div>

        {/* 3-Tab Content Hub */}
        <ContentHubTabs subDomain={subDomain} domainSlug={domainSlug} />

        {/* FAQ */}
        <FAQSection faqs={subDomain.faqs} />

        {/* Sibling Sub-domains (internal linking) */}
        {siblings.length > 0 && (
          <section className="border-t border-white/[0.08] py-12">
            <h2
              className="mb-6 text-2xl text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Other {domain.name} Specializations
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {siblings.map((sd) => (
                <Link
                  key={sd.slug}
                  href={`/${domain.slug}/${sd.slug}`}
                  className="group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.02] p-4 transition-colors hover:border-white/20"
                >
                  <span className="text-2xl">{sd.icon}</span>
                  <div>
                    <span className="text-sm font-medium text-white">{sd.name}</span>
                    <span className="block text-xs text-[hsl(240,4%,66%)]">
                      {sd.resources.length} resources
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </DomainLayout>
  )
}
