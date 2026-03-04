import Link from './Link'

interface CTABannerProps {
  heading?: string
  subtext?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
}

export default function CTABanner({
  heading = 'Want to see Conversational AI calling in action?',
  subtext = 'Watch a real AI-to-human handoff close a lead in under three minutes.',
  primaryLabel = 'Book a Free 30-Min Demo',
  primaryHref = 'https://cal.com/ajitesh/30min',
  secondaryLabel = 'Try Tough Tongue AI Free',
  secondaryHref = 'https://app.toughtongueai.com/',
}: CTABannerProps) {
  return (
    <div className="not-prose my-8 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-px shadow-xl">
      <div className="rounded-2xl bg-gradient-to-br from-indigo-950 via-purple-950 to-gray-900 px-8 py-8">
        {/* Sparkle accent */}
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-pink-400 shadow-[0_0_8px_2px_rgba(244,114,182,0.6)]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-pink-300">
            Live Demo Available
          </span>
        </div>

        <h3 className="mb-2 text-2xl font-bold leading-snug text-white">{heading}</h3>
        <p className="mb-6 text-base text-indigo-200">{subtext}</p>

        <div className="flex flex-wrap gap-4">
          {/* Primary button */}
          <Link
            href={primaryHref}
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-indigo-400/40 hover:shadow-xl no-underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            {primaryLabel}
          </Link>

          {/* Secondary button */}
          <Link
            href={secondaryHref}
            className="inline-flex items-center gap-2 rounded-xl border border-indigo-400 bg-transparent px-6 py-3 text-sm font-semibold text-indigo-200 transition-all duration-200 hover:scale-105 hover:border-pink-400 hover:text-white no-underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}
