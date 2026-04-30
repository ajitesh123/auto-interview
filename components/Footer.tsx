import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'

export default function Footer() {
  return (
    <footer>
      {/* SEO-Optimized Footer with crawlable links - Google SEO requirement */}
      <nav
        className="mt-8 border-t border-gray-200 dark:border-gray-700"
        aria-label="Footer Navigation"
      >
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {/* Tools Section */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                Job Preparation Tools
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/build-resume"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Free Resume Builder
                  </Link>
                </li>
                <li>
                  <Link
                    href="/ats-score"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    ATS Score Checker
                  </Link>
                </li>
                <li>
                  <Link
                    href="/find-jobs"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Job Search Engine
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cover-letter"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Cover Letter Generator
                  </Link>
                </li>
                <li>
                  <Link
                    href="/free-mock-interview"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Free Mock Interview
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                Career Resources
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/blog"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Career Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/job-search-guide-2025"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Job Search Guide 2025
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/best-ats-resume-checker-2025"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Best ATS Resume Checkers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog/product-manager-interview-guide-2025"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    PM Interview Guide
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tags"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Browse All Topics
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Section */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms-conditions"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/refund-policy"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-policy"
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                  >
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social Section */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
                Connect With Us
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
        </div>
      </nav>

      {/* Copyright Section */}
      <div className="flex flex-col items-center border-t border-gray-200 py-6 dark:border-gray-700">
        <div className="mb-2 flex space-x-2 text-sm text-gray-400">
          <div>{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div>{`© ${new Date().getFullYear()}`}</div>
          <div>{` • `}</div>
          <Link href="/">{siteMetadata.title}</Link>
        </div>
        <div className="mb-2 text-sm text-gray-400 flex items-center space-x-2">
          <Link href="https://github.com/timlrx/tailwind-nextjs-starter-blog">
            Tailwind Nextjs Theme
          </Link>
          <span>{` • `}</span>
          <a href="https://www.seewhatnewai.com" target="_blank" rel="noreferrer">
            Featured on SeeWhatNewAI Directory
          </a>
        </div>
        <div className="mb-8 mt-4 flex justify-center">
          <a target="_blank" href="https://startupbenchmarks.com" rel="noreferrer">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://startupbenchmarks.com/assets/images/badge.png" alt="Startup Benchmarks" height="54" />
          </a>
        </div>
      </div>
    </footer>
  )
}
