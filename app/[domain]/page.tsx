import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import Breadcrumbs from '@/components/domain/Breadcrumbs'
import FAQSection from '@/components/domain/FAQSection'
import { getDomainBySlug, getAllDomainSlugs, generateBreadcrumbs, countDomainResources } from '@/lib/domainUtils'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  params: Promise<{ domain: string }>
}

export async function generateStaticParams() {
  return getAllDomainSlugs().map((slug) => ({ domain: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain: domainSlug } = await params
  const domain = getDomainBySlug(domainSlug)
  if (!domain) return {}

  const title = `${domain.name} Interview Resources — Free Prep Kits | Auto Interview AI`
  const description = domain.aeoSummary

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteMetadata.siteUrl}/${domain.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/${domain.slug}`,
    },
  }
}

export default async function DomainPage({ params }: Props) {
  const { domain: domainSlug } = await params
  const domain = getDomainBySlug(domainSlug)
  if (!domain) notFound()

  const breadcrumbs = generateBreadcrumbs(domainSlug)
  const resourceCount = countDomainResources(domain)

  return (
    <DomainLayout currentPath={`/${domainSlug}`}>
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* AEO direct-answer summary */}
        <p className="mb-6 text-base leading-relaxed text-[hsl(240,4%,66%)]">
          {domain.aeoSummary}
        </p>

        {/* Hero */}
        <div className="mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="text-5xl">{domain.icon}</span>
            {domain.isPlaceholder && (
              <span className="coming-soon-pulse rounded-full border border-white/20 bg-white/[0.05] px-3 py-1 text-xs text-[hsl(240,4%,66%)]">
                Coming Soon
              </span>
            )}
          </div>

          <h1
            className="animate-fade-rise mb-4 text-5xl text-white sm:text-6xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {domain.name} Prep Kit
          </h1>
          <p className="animate-fade-rise-delay max-w-3xl text-lg leading-relaxed text-[hsl(240,4%,66%)]">
            {domain.description}
          </p>

          {!domain.isPlaceholder && (
            <div className="animate-fade-rise-delay-2 mt-6 flex gap-4">
              <span className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-[hsl(240,4%,66%)]">
                {domain.subDomains.length} specializations
              </span>
              <span className="rounded-full border border-white/10 px-4 py-1.5 text-sm text-[hsl(240,4%,66%)]">
                {resourceCount} resources
              </span>
            </div>
          )}
        </div>

        {/* Sub-domain Grid */}
        <section>
          <h2
            className="mb-8 text-3xl text-white sm:text-4xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Specializations
          </h2>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {domain.subDomains.map((sd) => (
              <Link
                key={sd.slug}
                href={`/${domain.slug}/${sd.slug}`}
                className="group block"
              >
                <div className="domain-card rounded-xl border border-white/[0.08] bg-white/[0.03] p-6">
                  <div className="mb-4 flex items-start justify-between">
                    <span className="text-3xl">{sd.icon}</span>
                    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-[hsl(240,4%,66%)]">
                      {sd.resources.length} resources
                    </span>
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-white">{sd.name}</h3>
                  <p className="mb-4 line-clamp-2 text-sm text-[hsl(240,4%,66%)]">
                    {sd.description}
                  </p>
                  <span className="flex items-center text-sm text-[hsl(240,4%,66%)] transition-colors group-hover:text-white">
                    Explore
                    <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <FAQSection faqs={domain.faqs} />
      </div>
    </DomainLayout>
  )
}
