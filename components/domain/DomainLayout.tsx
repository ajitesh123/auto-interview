import React from 'react'
import GlassNav from './GlassNav'
import Link from 'next/link'
import { getAllDomains } from '@/lib/domainUtils'

interface DomainLayoutProps {
  children: React.ReactNode
  currentPath?: string
}

const DomainLayout: React.FC<DomainLayoutProps> = ({ children, currentPath }) => {
  const allDomains = getAllDomains()

  return (
    <div className="domain-page">
      <GlassNav currentPath={currentPath} />
      <main>{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/[0.08] py-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div>
              <span
                className="mb-4 block text-xl text-white"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                Auto Interview AI<sup className="text-xs">®</sup>
              </span>
              <p className="text-sm leading-relaxed text-[hsl(240,4%,66%)]">
                Domain-specific interview preparation for students and job-seekers.
              </p>
            </div>

            {/* Domains */}
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
                Domains
              </h4>
              <div className="flex flex-col gap-2">
                {allDomains.map((d) => (
                  <Link
                    key={d.slug}
                    href={`/${d.slug}`}
                    className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white"
                  >
                    {d.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
                Career Tools
              </h4>
              <div className="flex flex-col gap-2">
                <Link href="/build-resume" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Resume Builder</Link>
                <Link href="/ats-score" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">ATS Score Checker</Link>
                <Link href="/find-jobs" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Job Search</Link>
                <Link href="/cover-letter" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Cover Letter</Link>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
                Company
              </h4>
              <div className="flex flex-col gap-2">
                <Link href="/blog" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Blog</Link>
                <Link href="/about" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">About</Link>
                <Link href="/privacy-policy" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Privacy</Link>
                <Link href="/terms-conditions" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Terms</Link>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/[0.08] pt-8 text-center text-xs text-[hsl(240,4%,66%)]">
            © {new Date().getFullYear()} Auto Interview AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DomainLayout
