import Link from './Link'

interface CTABannerProps {
  heading?: string
  subtext?: string
  primaryLabel?: string
  primaryHref?: string
  secondaryLabel?: string
  secondaryHref?: string
  badge?: string
  className?: string
}

/**
 * Product call to action inside voice-AI and sales blog posts (Signal Paper: light card,
 * hairline border, one Signal-blue button, a small voice meter that stops under reduced motion).
 * Describe Tough Tongue AI only by what it does: no performance, latency or ranking claims.
 */
export default function CTABanner({
  heading = 'Hear a voice agent on a real call',
  subtext = 'Tough Tongue AI runs AI voice agents for calls and meetings, and AI sales roleplays for training. Book a demo, or build your own agent without code.',
  primaryLabel = 'Book a demo',
  primaryHref = 'https://cal.com/ajitesh/30min',
  secondaryLabel = 'Build a voice agent',
  secondaryHref = 'https://app.toughtongueai.com/',
  badge = 'Tough Tongue AI',
  className = '',
}: CTABannerProps) {
  return (
    <div
      className={`not-prose my-10 rounded-2xl border border-border bg-surface p-6 shadow-e1 sm:p-8 ${className}`}
    >
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-xl">
          <div className="mb-2 flex items-center gap-2">
            <span aria-hidden="true" className="flex h-4 items-end gap-[2px]">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="mi-bar w-[3px] rounded-full bg-signal"
                  style={{ animationDelay: `${i * 140}ms` }}
                />
              ))}
            </span>
            <span className="font-mono text-kicker uppercase tracking-[0.08em] text-fg-3">
              {badge}
            </span>
          </div>
          <p className="text-h3 font-semibold tracking-tight text-fg">{heading}</p>
          <p className="mt-2 text-small leading-relaxed text-fg-2">{subtext}</p>
        </div>

        <div className="flex w-full shrink-0 flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Link
            href={primaryHref}
            className="inline-flex h-11 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-signal px-5 text-small font-semibold text-white shadow-e1 transition-[background-color,box-shadow] duration-fast hover:bg-signal-strong hover:shadow-e2"
          >
            {primaryLabel}
            <svg aria-hidden="true" viewBox="0 0 16 16" className="h-4 w-4" fill="none">
              <path
                d="M3 8h10m-4-4 4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-surface px-5 text-small font-semibold text-fg ring-1 ring-inset ring-border transition-colors duration-fast hover:text-signal-strong hover:ring-border-strong"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}
