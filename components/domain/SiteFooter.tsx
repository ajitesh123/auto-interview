import Link from 'next/link'

const LINK = 'inline-block py-1 text-caption leading-snug text-fg-2 transition-colors hover:text-fg'

type FooterLink = { href: string; label: string }

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Free tools',
    links: [
      { href: '/free-mock-interview', label: 'AI mock interview' },
      { href: '/resume-keyword-checker', label: 'Resume keyword checker' },
      { href: '/interview-prep-plan', label: 'Interview prep plan' },
      { href: '/star-method', label: 'STAR answer builder' },
      { href: '/referral-message', label: 'Referral message builder' },
      { href: '/salary-negotiation', label: 'Salary negotiation scripts' },
      { href: '/find-jobs', label: 'Find jobs' },
      { href: '/cold-call-practice', label: 'Cold call simulator' },
      { href: '/ai-calling-roi-calculator', label: 'Voice AI ROI calculator' },
    ],
  },
  {
    title: 'Role guides',
    links: [
      { href: '/aipm', label: 'AI Product Manager' },
      { href: '/product-manager', label: 'Product Manager' },
      { href: '/ai-engineer', label: 'AI Engineer' },
      { href: '/fde', label: 'Forward Deployed Engineer' },
      { href: '/gtm-engineer', label: 'GTM Engineer' },
      { href: '/data-analyst', label: 'Data Analyst' },
      { href: '/growth', label: 'Growth Manager' },
      { href: '/founders-office', label: "Founder's Office" },
      { href: '/chief-of-staff', label: 'Chief of Staff' },
      { href: '/strategy-and-operations', label: 'Strategy & Operations' },
    ],
  },
  {
    title: 'Salary data',
    links: [
      { href: '/product-manager/salary', label: 'Product Manager salary' },
      { href: '/data-analyst/salary', label: 'Data Analyst salary' },
      { href: '/ai-engineer/salary', label: 'AI Engineer salary' },
      { href: '/fde/salary', label: 'FDE salary' },
      { href: '/gtm-engineer/salary', label: 'GTM Engineer salary' },
      { href: '/founders-office/salary', label: "Founder's Office salary" },
      { href: '/salary-calculator', label: 'CTC to in-hand calculator' },
      { href: '/job-offer-comparison', label: 'Job offer comparison' },
    ],
  },
  {
    title: 'CV templates',
    links: [
      { href: '/cv-templates', label: 'All CV templates' },
      { href: '/cv-templates/software-engineer', label: 'Software Engineer' },
      { href: '/cv-templates/product-manager', label: 'Product Manager' },
      { href: '/cv-templates/sales-sdr', label: 'SDR & Sales' },
      { href: '/cv-templates/data-analyst', label: 'Data Analyst' },
      { href: '/cv-templates/fresher', label: 'Fresher & Graduate' },
      { href: '/cover-letter', label: 'Cover letter samples' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/learn-ai', label: 'Learn AI (free course)' },
      { href: '/paul-graham', label: 'Paul Graham startup course' },
      { href: '/paul-graham/yc-batch', label: '12-week YC challenge' },
      { href: '/interview-questions', label: 'Interview questions Q&A' },
      {
        href: '/interview-questions/behavioral/tell-me-about-yourself',
        label: 'Tell me about yourself',
      },
      { href: '/free-resources', label: 'Free prep resources' },
      { href: '/resources', label: 'Interview resources by domain' },
      { href: '/resources/mba', label: 'MBA resources' },
      { href: '/blog', label: 'Blog' },
      { href: 'https://app.toughtongueai.com', label: 'Tough Tongue AI' },
    ],
  },
  {
    title: 'Company',
    links: [
      { href: '/about', label: 'About' },
      { href: '/contact-policy', label: 'Contact' },
      { href: '/privacy-policy', label: 'Privacy policy' },
      { href: '/terms-conditions', label: 'Terms & conditions' },
      { href: '/refund-policy', label: 'Refund policy' },
    ],
  },
]

/** The one site footer (Signal Paper). Used by DomainLayout, blog posts and blog lists. */
export default function SiteFooter() {
  return (
    <footer className="border-t border-border py-16">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="mb-10 flex flex-col gap-4 border-b border-border pb-10 md:flex-row md:items-end md:justify-between">
          <div className="max-w-md">
            <span className="mb-2 block text-sm font-medium text-fg">Auto Interview AI</span>
            <p className="text-xs leading-relaxed text-fg-2">
              Free interview prep: role guides, salary data, resume (CV) templates, Learn AI lessons
              and a free AI mock interview.
            </p>
          </div>
          <a
            href="https://cal.com/ajitesh/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center rounded-md border border-border bg-surface px-3 py-1.5 font-mono text-kicker text-fg transition hover:bg-muted"
          >
            Book a team demo &rarr;
          </a>
        </div>
        <nav aria-label="Site directory">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-6">
            {COLUMNS.map((col) => (
              <div key={col.title}>
                <h2 className="mb-3 font-mono text-kicker uppercase tracking-[0.08em] text-fg">
                  {col.title}
                </h2>
                <ul className="flex flex-col gap-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      {l.href.startsWith('http') ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                          {l.label} &rarr;
                        </a>
                      ) : (
                        <Link href={l.href} className={LINK}>
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>

        {/* Social Icons */}
        <div className="mt-12 flex justify-center gap-4">
          {[
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/ajiteshnandan/',
              icon: (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              ),
            },
            {
              label: 'X (Twitter)',
              href: 'https://x.com/ajiteshleo',
              icon: (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              ),
            },
            {
              label: 'GitHub',
              href: 'https://github.com/ajitesh123',
              icon: (
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              ),
            },
          ].map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-[6px] text-fg-3 transition-colors hover:text-fg"
              aria-label={social.label}
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Hairline */}
        <div className="mt-8 h-px bg-border" />

        {/* Copyright */}
        <div className="mt-6 text-center font-mono text-kicker text-fg-3">
          © {new Date().getFullYear()} Auto Interview AI. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
