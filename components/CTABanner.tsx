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
  subtext = 'Watch a real AI-to-human handoff close a lead in under 3 minutes.',
  primaryLabel = 'Book a Free 30-Min Demo',
  primaryHref = 'https://cal.com/ajitesh/30min',
  secondaryLabel = 'Try Tough Tongue AI',
  secondaryHref = 'https://app.toughtongueai.com/',
}: CTABannerProps) {
  return (
    <>
      <style>{`
        @keyframes ping-slow {
          0%   { transform: scale(1);   opacity: 0.6; }
          70%  { transform: scale(1.55); opacity: 0; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        .cta-ring {
          animation: ping-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .cta-primary-btn {
          background: #ffffff;
          color: #111111;
          position: relative;
          overflow: hidden;
          transition: transform 0.18s ease, box-shadow 0.18s ease;
        }
        .cta-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(0,0,0,0.22);
        }
        .cta-primary-btn::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 40%,
            rgba(255,255,255,0.55) 50%,
            transparent 60%
          );
          background-size: 200% 100%;
          animation: shimmer 2.4s linear infinite;
        }
        .cta-secondary-btn {
          background: transparent;
          color: #d4d4d4;
          border: 1px solid #555555;
          transition: transform 0.18s ease, border-color 0.18s ease, color 0.18s ease;
        }
        .cta-secondary-btn:hover {
          transform: translateY(-2px);
          border-color: #aaaaaa;
          color: #ffffff;
        }
      `}</style>

      <div
        className="not-prose my-8 rounded-2xl"
        style={{
          background: 'rgba(18, 18, 18, 0.82)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 4px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        <div className="px-7 py-8">
          {/* Status pill */}
          <div className="mb-5 flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ background: '#e5e5e5' }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: '#9a9a9a', letterSpacing: '0.13em' }}
            >
              Live Demo Available
            </span>
          </div>

          {/* Heading */}
          <h3
            className="mb-2 text-xl font-bold leading-snug"
            style={{ color: '#ffffff', margin: '0 0 8px 0' }}
          >
            {heading}
          </h3>

          {/* Sub-text */}
          <p
            className="mb-7 text-sm"
            style={{ color: '#8a8a8a', margin: '0 0 28px 0', lineHeight: '1.6' }}
          >
            {subtext}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            {/* Primary — animated ring + shimmer */}
            <div className="relative flex items-center">
              {/* Pulsing ring behind the button */}
              <span
                className="cta-ring pointer-events-none absolute inset-0 rounded-xl"
                style={{ border: '2px solid rgba(220,220,220,0.35)' }}
              />
              <Link
                href={primaryHref}
                className="cta-primary-btn no-underline inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"
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
            </div>

            {/* Secondary */}
            <Link
              href={secondaryHref}
              className="cta-secondary-btn no-underline inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
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
    </>
  )
}
