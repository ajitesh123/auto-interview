import React from 'react'
import Link from 'next/link'
import type { Domain } from '@/data/domains'
import { countDomainResources } from '@/lib/domainUtils'

interface DomainCardProps {
  domain: Domain
}

const DomainCard: React.FC<DomainCardProps> = ({ domain }) => {
  const resourceCount = countDomainResources(domain)
  const subDomainCount = domain.subDomains.length

  return (
    <Link href={`/${domain.slug}`} className="group block">
      <div className="domain-card flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8">
        {/* Icon + Badge */}
        <div className="mb-5 flex items-start justify-between">
          <span className="text-4xl">{domain.icon}</span>
          {domain.isPlaceholder ? (
            <span className="coming-soon-pulse rounded-full bg-white/10 px-3 py-1 text-xs text-[hsl(240,4%,66%)]">
              Coming Soon
            </span>
          ) : (
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white">
              {resourceCount} resources
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          className="mb-2 text-2xl text-white"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {domain.name}
        </h3>

        {/* Tagline */}
        <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-[hsl(240,4%,66%)]">
          {domain.tagline}
        </p>

        {/* Sub-domains preview */}
        <div className="mb-6 flex flex-wrap gap-2">
          {domain.subDomains.slice(0, 3).map((sd) => (
            <span
              key={sd.slug}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-[hsl(240,4%,66%)]"
            >
              {sd.name}
            </span>
          ))}
          {subDomainCount > 3 && (
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-[hsl(240,4%,66%)]">
              +{subDomainCount - 3} more
            </span>
          )}
        </div>

        {/* Arrow */}
        <div className="mt-auto flex items-center text-sm text-[hsl(240,4%,66%)] transition-colors group-hover:text-white">
          Explore {domain.name}
          <svg
            className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default DomainCard
