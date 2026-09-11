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
  primaryLabel = 'Book Demo',
  primaryHref = 'https://cal.com/ajitesh/30min',
  secondaryLabel = 'Build Voice Agent',
  secondaryHref = 'https://app.toughtongueai.com/',
  badge = 'Live Demo Available',
  className = '',
}: CTABannerProps) {
  return (
    <>
      <style>{`
        @keyframes cta-beam-spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        .cta-beam-container {
          position: relative;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }

        /* Outer running orange glow/shadow point */
        .cta-beam-shadow-halo {
          position: absolute;
          inset: -4px;
          border-radius: 12px;
          overflow: hidden;
          pointer-events: none;
          filter: blur(8px);
          opacity: 0.9;
          z-index: 0;
        }

        .cta-beam-shadow-rotator {
          position: absolute;
          inset: -180%;
          background: conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 270deg,
            rgba(249, 115, 22, 0.2) 300deg,
            rgba(255, 107, 0, 0.85) 330deg,
            #ffedd5 348deg,
            #ff7700 355deg,
            transparent 360deg
          );
          animation: cta-beam-spin 3.2s linear infinite;
        }

        /* Main border beam box */
        .cta-beam-box {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1.5px;
          border-radius: 8px;
          overflow: hidden;
          text-decoration: none !important;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-beam-box:hover {
          transform: translateY(-1.5px);
        }

        .cta-beam-rotator {
          position: absolute;
          inset: -180%;
          background: conic-gradient(
            from 0deg at 50% 50%,
            transparent 0deg,
            transparent 270deg,
            rgba(249, 115, 22, 0.3) 300deg,
            #ff5500 328deg,
            #ffffff 346deg,
            #ff8800 354deg,
            transparent 360deg
          );
          animation: cta-beam-spin 3.2s linear infinite;
        }

        /* Glassy dark button surface */
        .cta-demo-glass {
          position: relative;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          height: 100%;
          padding: 10px 22px;
          border-radius: 6.5px;
          background: linear-gradient(180deg, rgba(26, 26, 28, 0.94) 0%, rgba(12, 12, 14, 0.98) 100%);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #ffffff !important;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 0 12px rgba(249, 115, 22, 0.08),
            0 2px 8px rgba(0, 0, 0, 0.3);
          transition: all 0.2s ease;
        }

        .cta-beam-box:hover .cta-demo-glass {
          background: linear-gradient(180deg, rgba(34, 34, 38, 0.94) 0%, rgba(16, 16, 20, 0.98) 100%);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.35),
            inset 0 0 16px rgba(249, 115, 22, 0.2),
            0 6px 20px -2px rgba(249, 115, 22, 0.4);
        }

        /* Glassy secondary button */
        .cta-build-glass {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(0, 0, 0, 0.09);
          color: #171717 !important;
          font-size: 14px;
          font-weight: 500;
          white-space: nowrap;
          text-decoration: none !important;
          box-shadow:
            0 1px 2px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cta-build-glass:hover {
          transform: translateY(-1.5px);
          background: rgba(255, 255, 255, 0.98);
          border-color: rgba(249, 115, 22, 0.45);
          color: #ea580c !important;
          box-shadow:
            0 6px 18px -3px rgba(249, 115, 22, 0.18),
            inset 0 1px 0 #ffffff;
        }
      `}</style>

      <div
        className={`not-prose my-10 rounded-[12px] border border-[#ebebeb] bg-white p-6 sm:p-8 ${className}`}
        style={{
          boxShadow: '0 1px 3px rgba(0,0,0,0.03), 0 8px 24px -4px rgba(0,0,0,0.04)',
          background:
            'radial-gradient(ellipse 80% 80% at 100% 50%, rgba(254, 215, 170, 0.12), transparent 60%), #ffffff',
        }}
      >
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div className="max-w-xl">
            <div className="mb-2 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#297a3a] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#297a3a]" />
              </span>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-[#666666]">
                {badge}
              </span>
            </div>
            <h3 className="text-xl font-normal tracking-tight text-[#171717] sm:text-2xl">
              {heading}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#666666]">{subtext}</p>
          </div>

          <div className="flex w-full shrink-0 flex-col items-stretch gap-3.5 sm:w-auto sm:flex-row sm:items-center">
            {/* Primary 'Book Demo' button with continuous rotating orange border beam + shadow point */}
            <div className="cta-beam-container w-full sm:w-auto">
              <div className="cta-beam-shadow-halo" aria-hidden="true">
                <div className="cta-beam-shadow-rotator" />
              </div>
              <Link href={primaryHref} className="cta-beam-box group w-full sm:w-auto">
                <div className="cta-beam-rotator" aria-hidden="true" />
                <span className="cta-demo-glass">
                  <svg
                    className="h-4 w-4 shrink-0 text-[#fb923c] transition-transform duration-200 group-hover:scale-110"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>{primaryLabel}</span>
                </span>
              </Link>
            </div>

            {/* Secondary 'Build Voice Agent' button with frosted glass aesthetic */}
            <Link href={secondaryHref} className="cta-build-glass group w-full sm:w-auto">
              <svg
                className="h-4 w-4 shrink-0 text-[#f97316] transition-transform duration-200 group-hover:scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 003-3V5a3 3 0 00-6 0v6a3 3 0 003 3z"
                />
              </svg>
              <span>{secondaryLabel}</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
