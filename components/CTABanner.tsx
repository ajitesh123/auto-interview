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

export default function CTABanner({
  heading = 'Want to see Conversational AI calling in action?',
  subtext = 'Watch a real AI-to-human handoff close a lead in under 3 minutes.',
  primaryLabel = 'Book Demo for AI Calling',
  primaryHref = 'https://cal.com/ajitesh/30min',
  secondaryLabel = 'Create Voice Agents',
  secondaryHref = 'https://app.toughtongueai.com/',
  badge = 'Live Demo Available',
  className = '',
}: CTABannerProps) {
  return (
    <div
      className={`not-prose my-10 rounded-[8px] border border-[#ebebeb] bg-white p-6 sm:p-8 ${className}`}
      style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.04)' }}
    >
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="max-w-xl">
          <div className="mb-2 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[#297a3a]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
              {badge}
            </span>
          </div>
          <h3 className="text-xl font-normal tracking-tight text-[#171717] sm:text-2xl">
            {heading}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[#666666]">{subtext}</p>
        </div>

        <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row md:w-auto md:flex-col lg:flex-row">
          <Link
            href={primaryHref}
            className="inline-flex items-center justify-center rounded-[6px] bg-[#171717] px-5 py-2.5 text-center text-sm font-medium !text-white transition-all hover:bg-[#333333]"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="inline-flex items-center justify-center rounded-[6px] bg-white px-5 py-2.5 text-center text-sm font-medium !text-[#171717] transition-all hover:bg-[#f5f5f5]"
            style={{ boxShadow: '0 0 0 1px #ebebeb' }}
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </div>
  )
}
