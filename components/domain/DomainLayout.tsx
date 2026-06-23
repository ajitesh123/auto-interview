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
                The career intelligence platform for professionals who refuse to be underprepared. Resources, AI interviews, and resumes — all free.
              </p>
            </div>

            {/* Domains */}
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
                Resources
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
                Platform
              </h4>
              <div className="flex flex-col gap-2">
                <Link href="/build-resume" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Resume Builder</Link>
                <Link href="/ats-score" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">ATS Score Checker</Link>
                <Link href="/free-mock-interview" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Mock Interviews</Link>
                <Link href="/cover-letter" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Cover Letter</Link>
                <Link href="/find-jobs" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Job Search</Link>
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
                Company
              </h4>
              <div className="flex flex-col gap-2">
                <Link href="/blog" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Insights</Link>
                <Link href="/about" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">About</Link>
                <Link href="/privacy-policy" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Privacy</Link>
                <Link href="/terms-conditions" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Terms</Link>
                <Link href="/contact-policy" className="text-sm text-[hsl(240,4%,66%)] transition-colors hover:text-white">Contact</Link>
              </div>
            </div>
          </div>

          {/* Social Icons */}
          <div className="mt-12 flex justify-center gap-4">
            {[
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ajiteshnandan/', icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              )},
              { label: 'X (Twitter)', href: 'https://x.com/ajiteshleo', icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              )},
              { label: 'GitHub', href: 'https://github.com/ajitesh123', icon: (
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              )},
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-white/80 transition-all hover:bg-white/5 hover:text-white"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div className="mt-8 border-t border-white/[0.08] pt-8 text-center text-xs text-[hsl(240,4%,66%)]">
            © {new Date().getFullYear()} Auto Interview AI. All rights reserved. Built for the ambitious.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DomainLayout
