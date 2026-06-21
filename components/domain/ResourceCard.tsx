import React from 'react'
import Link from 'next/link'
import type { Resource } from '@/data/domains'

interface ResourceCardProps {
  resource: Resource
  domainSlug: string
  subDomainSlug: string
}

const ResourceCard: React.FC<ResourceCardProps> = ({ resource, domainSlug, subDomainSlug }) => {
  const isVideo = resource.fileType === 'video'
  const detailHref = `/${domainSlug}/${subDomainSlug}/${resource.slug}`

  return (
    <Link href={detailHref} className="group block">
      <div className="resource-card rounded-xl bg-white/[0.03] p-6">
        {/* Header: Icon + Type badge */}
        <div className="mb-4 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white/[0.06]">
            {isVideo ? (
              <svg
                className="h-6 w-6 text-[hsl(240,4%,66%)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6 text-[hsl(240,4%,66%)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs uppercase tracking-wide text-[hsl(240,4%,66%)]">
              {resource.fileType}
            </span>
            <span className="text-xs text-[hsl(240,4%,66%)]">{resource.fileSize}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-lg font-medium text-white transition-colors group-hover:text-white/90">
          {resource.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-[hsl(240,4%,66%)]">
          {resource.description}
        </p>

        {/* Download CTA */}
        <div className="flex items-center text-sm text-[hsl(240,4%,66%)] transition-colors group-hover:text-white">
          View & Download
          <svg
            className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
      </div>
    </Link>
  )
}

export default ResourceCard
