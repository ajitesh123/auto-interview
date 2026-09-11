import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer className="border-t border-[#ebebeb] bg-[#fafafa]">
      {/* SEO-Optimized Footer with crawlable links - Google SEO requirement */}
      <nav className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8" aria-label="Footer Navigation">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Tools Section */}
          <div>
            <h3
              className="mb-4 text-[11px] font-normal uppercase text-[#171717]"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.071em' }}
            >
              Platform
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/build-resume"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  Resume Builder
                </Link>
              </li>
              <li>
                <Link
                  href="/ats-score"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  ATS Score Checker
                </Link>
              </li>
              <li>
                <Link
                  href="/find-jobs"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  Job Search
                </Link>
              </li>
              <li>
                <Link
                  href="/cover-letter"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  Cover Letter
                </Link>
              </li>
              <li>
                <Link
                  href="/free-mock-interview"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  Mock Interviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Section */}
          <div>
            <h3
              className="mb-4 text-[11px] font-normal uppercase text-[#171717]"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.071em' }}
            >
              Insights
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  Career Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/job-search-guide-2025"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  Job Search Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/best-ats-resume-checker-2025"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  Best ATS Checkers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog/product-manager-interview-guide-2025"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  PM Interview Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/tags"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  Browse Topics
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3
              className="mb-4 text-[11px] font-normal uppercase text-[#171717]"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.071em' }}
            >
              Company
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-conditions"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/refund-policy"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-policy"
                  className="text-sm text-[#666666] transition-colors hover:text-[#171717]"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3
              className="mb-4 text-[11px] font-normal uppercase text-[#171717]"
              style={{ fontFamily: 'var(--font-mono)', letterSpacing: '0.071em' }}
            >
              Connect
            </h3>
            <div className="flex space-x-3">
              <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={5} />
              <SocialIcon kind="github" href={siteMetadata.github} size={5} />
              <SocialIcon kind="youtube" href={siteMetadata.youtube} size={5} />
              <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={5} />
              <SocialIcon kind="x" href={siteMetadata.x} size={5} />
            </div>
          </div>
        </div>
      </nav>

      {/* Copyright Section */}
      <div className="flex flex-col items-center border-t border-[#ebebeb] py-6">
        <div className="mb-2 flex space-x-2 text-xs text-[#8f8f8f]">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/" className="hover:text-[#171717]">
            {siteMetadata.title}
          </Link>
        </div>
        <div className="mb-8 mt-4 flex flex-wrap items-center justify-center gap-4">
          <a target="_blank" href="https://startupbenchmarks.com" rel="noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://startupbenchmarks.com/assets/images/badge.png"
              alt="Startup Benchmarks"
              height="40"
              className="opacity-70 transition-opacity hover:opacity-100"
            />
          </a>
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a href="https://openhunts.com" target="_blank" title="OpenHunts Club">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="OpenHunts Club Member"
              height="80"
              src="https://cdn.openhunts.com/badges/club.webp"
              style={{ width: '160px', height: 'auto' }}
              width="400"
              className="opacity-70 transition-opacity hover:opacity-100"
            />
          </a>
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          <a target="_blank" href="https://mylaunchstash.com">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://mylaunchstash.com/assets/images/badge.png"
              alt="My Launch Stash"
              height="40"
              className="opacity-70 transition-opacity hover:opacity-100"
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
