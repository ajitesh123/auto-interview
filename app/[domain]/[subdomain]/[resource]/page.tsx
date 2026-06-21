import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'
import Breadcrumbs from '@/components/domain/Breadcrumbs'
import { getResourceBySlug, getAllResourceSlugs, generateBreadcrumbs } from '@/lib/domainUtils'
import siteMetadata from '@/data/siteMetadata'

interface Props {
  params: Promise<{ domain: string; subdomain: string; resource: string }>
}

export async function generateStaticParams() {
  return getAllResourceSlugs()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domain: dSlug, subdomain: sdSlug, resource: rSlug } = await params
  const result = getResourceBySlug(dSlug, sdSlug, rSlug)
  if (!result) return {}

  const { domain, subDomain, resource } = result
  const title = `${resource.title} | ${domain.name} ${subDomain.name} | Auto Interview AI`
  const description = resource.description.slice(0, 160)

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteMetadata.siteUrl}/${domain.slug}/${subDomain.slug}/${resource.slug}`,
      type: 'article',
    },
    alternates: {
      canonical: `${siteMetadata.siteUrl}/${domain.slug}/${subDomain.slug}/${resource.slug}`,
    },
  }
}

export default async function ResourcePage({ params }: Props) {
  const { domain: dSlug, subdomain: sdSlug, resource: rSlug } = await params
  const result = getResourceBySlug(dSlug, sdSlug, rSlug)
  if (!result) notFound()

  const { domain, subDomain, resource } = result
  const breadcrumbs = generateBreadcrumbs(dSlug, sdSlug, rSlug)
  const relatedResources = subDomain.resources.filter((r) => r.slug !== resource.slug).slice(0, 3)

  // Schema.org
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: resource.title,
    description: resource.description,
    provider: {
      '@type': 'Organization',
      name: 'Auto Interview AI',
      url: siteMetadata.siteUrl,
    },
    educationalLevel: domain.name,
    about: subDomain.name,
    isAccessibleForFree: true,
  }

  return (
    <DomainLayout currentPath={`/${dSlug}/${sdSlug}/${rSlug}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="mx-auto max-w-4xl px-6 py-12 sm:px-8">
        <Breadcrumbs items={breadcrumbs} />

        {/* Resource Detail */}
        <div className="mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-[hsl(240,4%,66%)]">
              {resource.fileType}
            </span>
            <span className="text-xs text-[hsl(240,4%,66%)]">{resource.fileSize}</span>
            <span className="text-xs text-[hsl(240,4%,66%)]">•</span>
            <span className="text-xs text-[hsl(240,4%,66%)]">{domain.name} → {subDomain.name}</span>
          </div>

          <h1
            className="animate-fade-rise mb-6 text-4xl text-white sm:text-5xl"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {resource.title}
          </h1>

          <p className="animate-fade-rise-delay mb-10 text-lg leading-relaxed text-[hsl(240,4%,66%)]">
            {resource.description}
          </p>

          {/* Download CTA */}
          <div className="animate-fade-rise-delay-2 flex flex-wrap gap-4">
            <a
              href={resource.fileUrl}
              download
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-8 py-4 text-base text-white transition-transform hover:scale-[1.03]"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download {resource.fileType.toUpperCase()}
            </a>

            <Link
              href={`/${dSlug}/${sdSlug}`}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-4 text-base text-[hsl(240,4%,66%)] transition-colors hover:border-white/30 hover:text-white"
            >
              ← Back to {subDomain.name}
            </Link>
          </div>
        </div>

        {/* Related Resources */}
        {relatedResources.length > 0 && (
          <section className="border-t border-white/[0.08] pt-12">
            <h2
              className="mb-6 text-2xl text-white"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              More {subDomain.name} Resources
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedResources.map((r) => (
                <Link
                  key={r.slug}
                  href={`/${dSlug}/${sdSlug}/${r.slug}`}
                  className="group rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 transition-colors hover:border-white/20"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] uppercase text-[hsl(240,4%,66%)]">
                      {r.fileType}
                    </span>
                    <span className="text-xs text-[hsl(240,4%,66%)]">{r.fileSize}</span>
                  </div>
                  <h3 className="mb-1 text-sm font-medium text-white">{r.title}</h3>
                  <p className="line-clamp-2 text-xs text-[hsl(240,4%,66%)]">{r.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </DomainLayout>
  )
}
