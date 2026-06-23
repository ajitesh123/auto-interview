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
    <Link href={`/${domain.slug}`} className="group block h-full">
      <div className="glass-card flex h-full flex-col p-8">
        {/* Icon + Badge */}
        <div className="mb-6 flex items-start justify-between">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-4xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
            {domain.icon}
          </div>
          {domain.isPlaceholder ? (
            <span className="coming-soon-pulse rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-[hsl(240,4%,66%)]">
              Coming Soon
            </span>
          ) : (
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium tracking-wide text-white">
              {resourceCount} resources
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          className="mb-3 text-3xl tracking-tight text-white transition-colors group-hover:text-white"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {domain.name}
        </h3>

        {/* Tagline */}
        <p className="mb-8 line-clamp-2 text-sm leading-relaxed text-[hsl(240,4%,66%)]">
          {domain.tagline}
        </p>

        {/* Sub-domains preview */}
        <div className="mb-8 flex flex-wrap gap-2">
          {domain.subDomains.slice(0, 3).map((sd) => (
            <span
              key={sd.slug}
              className="rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium tracking-wider text-[hsl(240,4%,66%)] backdrop-blur-sm transition-colors group-hover:text-white"
            >
              {sd.name}
            </span>
          ))}
          {subDomainCount > 3 && (
            <span className="rounded-full bg-black/40 px-3 py-1 text-[11px] font-medium tracking-wider text-[hsl(240,4%,66%)] backdrop-blur-sm transition-colors group-hover:text-white">
              +{subDomainCount - 3} more
            </span>
          )}
        </div>

        {/* Arrow */}
        <div className="mt-auto flex items-center text-sm font-medium tracking-wide text-[hsl(240,4%,66%)] transition-colors group-hover:text-white">
          Explore {domain.name}
          <div className="ml-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/5 transition-all group-hover:bg-white/10 group-hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
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
      </div>
    </Link>
  )
}

export default DomainCard
