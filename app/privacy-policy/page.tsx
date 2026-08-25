import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy — Auto Interview AI',
  description:
    'Read the Privacy Policy for Auto Interview AI to understand how we collect, safeguard, and respect your personal career data.',
  alternates: {
    canonical: 'https://www.autointerviewai.com/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy — Auto Interview AI',
    description: 'Understand how we collect, safeguard, and respect your personal career data.',
    url: 'https://www.autointerviewai.com/privacy-policy',
    siteName: 'Auto Interview AI',
    locale: 'en_US',
    type: 'website',
  },
}

export default function PrivacyPolicyPage() {
  return (
    <DomainLayout currentPath="/privacy-policy">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <header className="mb-16">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            LEGAL &amp; PRIVACY
          </p>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-[#171717] sm:text-5xl">
            Privacy Policy
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
              1. Information We Collect
            </h2>
            <p className="mb-3">
              We collect information that you directly provide to us when creating resumes,
              downloading templates, or taking AI mock interviews. This includes:
            </p>
            <ul className="list-inside list-disc space-y-1.5 pl-2">
              <li>Contact details such as your name, email address, and phone number</li>
              <li>
                Career data including work history, educational background, and technical skills
              </li>
              <li>
                Session analytics, browser data, and device information to optimize site performance
              </li>
              <li>Communication preferences when you opt into our role community announcements</li>
            </ul>
          </div>

          {/* Section 2 */}
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-xl font-normal tracking-tight text-[#171717]">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">We use the collected information exclusively to:</p>
            <ul className="list-inside list-disc space-y-1.5 pl-2">
              <li>
                Generate and format ATS-optimized resume files and structured career documents
              </li>
              <li>Conduct real-time AI mock interview simulations and speech analytics feedback</li>
              <li>
                Diagnose resume parsing compatibility against major applicant tracking algorithms
              </li>
              <li>Maintain the security, uptime, and integrity of our web services</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-xl font-normal tracking-tight text-[#171717]">
              3. Data Security &amp; Retention
            </h2>
            <p className="mb-3">
              We implement industry-standard encryption protocols (TLS in transit and AES at rest)
              to protect your uploaded documents. We never sell, rent, or trade your personal career
              data to third-party advertisers.
            </p>
          </div>

          {/* Section 4 */}
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-xl font-normal tracking-tight text-[#171717]">
              4. Contact Privacy Officer
            </h2>
            <p className="mb-3">
              If you have any questions regarding your data rights or wish to request data deletion,
              contact our privacy team:
            </p>
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
