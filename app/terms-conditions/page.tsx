import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'

export const metadata: Metadata = {
  title: 'Terms & Conditions — Auto Interview AI',
  description:
    'Review the Terms and Conditions for accessing Auto Interview AI services, free CV templates, and mock interview tools.',
  alternates: {
    canonical: 'https://www.autointerviewai.com/terms-conditions',
  },
  openGraph: {
    title: 'Terms & Conditions — Auto Interview AI',
    description: 'Terms and Conditions for accessing Auto Interview AI services.',
    url: 'https://www.autointerviewai.com/terms-conditions',
    siteName: 'Auto Interview AI',
    locale: 'en_US',
    type: 'website',
  },
}

export default function TermsConditionsPage() {
  return (
    <DomainLayout currentPath="/terms-conditions">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <header className="mb-16">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            LEGAL &amp; AGREEMENTS
          </p>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-[#171717] sm:text-5xl">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-[#666666]">Last updated: August 2026</p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-[#4d4d4d]">
          {/* Section 1 */}
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-xl font-normal tracking-tight text-[#171717]">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using Auto Interview AI, you acknowledge that you have read,
              understood, and agree to be bound by these Terms and Conditions. If you disagree with
              any part of these terms, please discontinue use of the platform.
            </p>
          </div>

          {/* Section 2 */}
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-xl font-normal tracking-tight text-[#171717]">
              2. Platform Use &amp; Intellectual Property
            </h2>
            <p className="mb-3">
              All downloadable CV templates, casebooks, and educational frameworks provided by Auto
              Interview AI are intended for personal, non-commercial career preparation purposes.
              Users agree not to:
            </p>
            <ul className="list-inside list-disc space-y-1.5 pl-2">
              <li>
                Repackage, resell, or redistribute platform resources behind commercial paywalls
              </li>
              <li>Attempt to scrape, reverse engineer, or disrupt the AI interview simulator</li>
              <li>Submit unlawful, fraudulent, or defamatory content through resume tools</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-xl font-normal tracking-tight text-[#171717]">
              3. Disclaimer of Warranties
            </h2>
            <p>
              Auto Interview AI provides career intelligence tools and mock assessments on an
              &quot;as is&quot; basis. While our materials and scoring models follow verified
              recruiting industry standards, we do not guarantee specific employment offers or
              interview outcomes from third-party employers.
            </p>
          </div>

          {/* Section 4 */}
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-xl font-normal tracking-tight text-[#171717]">
              4. Contact Information
            </h2>
            <p className="mb-2">For inquiries regarding our terms, reach out at:</p>
            <p className="font-mono text-xs text-[#171717]">
              Email: contact@autointerviewai.com | Phone: +91 7972238133
            </p>
          </div>

          {/* Back Navigation */}
          <div className="pt-4 text-center">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-[6px] bg-[#171717] px-6 py-2.5 text-sm font-medium !text-white transition-colors hover:bg-[#383838]"
            >
              ← Back to About
            </Link>
          </div>
        </div>
      </div>
    </DomainLayout>
  )
}
