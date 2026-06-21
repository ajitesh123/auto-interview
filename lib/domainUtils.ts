// ============================================================
// Domain Data Utilities
// ============================================================

import { domains, Domain, SubDomain, Resource } from '@/data/domains'

/**
 * Get all domains
 */
export function getAllDomains(): Domain[] {
  return domains
}

/**
 * Get a domain by its slug
 */
export function getDomainBySlug(slug: string): Domain | undefined {
  return domains.find((d) => d.slug === slug)
}

/**
 * Get a sub-domain by domain + subdomain slugs
 */
export function getSubDomainBySlug(
  domainSlug: string,
  subDomainSlug: string
): { domain: Domain; subDomain: SubDomain } | undefined {
  const domain = getDomainBySlug(domainSlug)
  if (!domain) return undefined
  const subDomain = domain.subDomains.find((sd) => sd.slug === subDomainSlug)
  if (!subDomain) return undefined
  return { domain, subDomain }
}

/**
 * Get a resource by domain + subdomain + resource slugs
 */
export function getResourceBySlug(
  domainSlug: string,
  subDomainSlug: string,
  resourceSlug: string
): { domain: Domain; subDomain: SubDomain; resource: Resource } | undefined {
  const result = getSubDomainBySlug(domainSlug, subDomainSlug)
  if (!result) return undefined
  const resource = result.subDomain.resources.find((r) => r.slug === resourceSlug)
  if (!resource) return undefined
  return { ...result, resource }
}

/**
 * Get all valid domain slugs (for generateStaticParams)
 */
export function getAllDomainSlugs(): string[] {
  return domains.map((d) => d.slug)
}

/**
 * Get all valid domain + subdomain slug pairs
 */
export function getAllSubDomainSlugs(): { domain: string; subdomain: string }[] {
  return domains.flatMap((d) =>
    d.subDomains.map((sd) => ({
      domain: d.slug,
      subdomain: sd.slug,
    }))
  )
}

/**
 * Get all valid domain + subdomain + resource slug triples
 */
export function getAllResourceSlugs(): {
  domain: string
  subdomain: string
  resource: string
}[] {
  return domains.flatMap((d) =>
    d.subDomains.flatMap((sd) =>
      sd.resources.map((r) => ({
        domain: d.slug,
        subdomain: sd.slug,
        resource: r.slug,
      }))
    )
  )
}

/**
 * Generate breadcrumb items for a given path
 */
export function generateBreadcrumbs(
  domainSlug?: string,
  subDomainSlug?: string,
  resourceSlug?: string
): { label: string; href: string }[] {
  const crumbs: { label: string; href: string }[] = [{ label: 'Home', href: '/' }]

  if (domainSlug) {
    const domain = getDomainBySlug(domainSlug)
    if (domain) {
      crumbs.push({ label: domain.name, href: `/${domain.slug}` })

      if (subDomainSlug) {
        const subDomain = domain.subDomains.find((sd) => sd.slug === subDomainSlug)
        if (subDomain) {
          crumbs.push({
            label: subDomain.name,
            href: `/${domain.slug}/${subDomain.slug}`,
          })

          if (resourceSlug) {
            const resource = subDomain.resources.find((r) => r.slug === resourceSlug)
            if (resource) {
              crumbs.push({
                label: resource.title,
                href: `/${domain.slug}/${subDomain.slug}/${resource.slug}`,
              })
            }
          }
        }
      }
    }
  }

  return crumbs
}

/**
 * Count total resources across all sub-domains in a domain
 */
export function countDomainResources(domain: Domain): number {
  return domain.subDomains.reduce((sum, sd) => sum + sd.resources.length, 0)
}

/**
 * Get sibling sub-domains (for internal linking)
 */
export function getSiblingSubDomains(
  domainSlug: string,
  currentSubDomainSlug: string
): SubDomain[] {
  const domain = getDomainBySlug(domainSlug)
  if (!domain) return []
  return domain.subDomains.filter((sd) => sd.slug !== currentSubDomainSlug)
}
