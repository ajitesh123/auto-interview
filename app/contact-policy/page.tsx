import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'

export const metadata: Metadata = {
  title: 'Contact Us — Auto Interview AI',
  description:
    'Get in touch with the Auto Interview AI team for support, partnership inquiries, or platform feedback. Reach out via phone or email.',
  alternates: {
    canonical: 'https://www.autointerviewai.com/contact-policy',
  },
  openGraph: {
    title: 'Contact Us — Auto Interview AI',
    description: 'Get in touch with the Auto Interview AI team for support or inquiries.',
    url: 'https://www.autointerviewai.com/contact-policy',
    siteName: 'Auto Interview AI',
    locale: 'en_US',
    type: 'website',
  },
}

export default function ContactPolicyPage() {
  return (
    <DomainLayout currentPath="/contact-policy">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <header className="mb-16">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            SUPPORT &amp; INQUIRIES
          </p>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-[#171717] sm:text-5xl">
            Contact Us
          </h1>
          <p className="text-lg leading-relaxed text-[#4d4d4d]">
            Have a question, feedback, or need assistance? Our support team is here to help you.
          </p>
        </header>

        <div className="space-y-8">
          {/* Direct Reach Out Highlight Card */}
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              DIRECT CONTACT
            </p>
            <h2 className="mb-6 text-2xl font-normal tracking-tight text-[#171717]">
              Reach out directly
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div
                className="rounded-[6px] bg-[#fafafa] p-6"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-[#171717]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
                    Phone &amp; WhatsApp
                  </span>
                </div>
                <p className="text-xl font-medium text-[#171717]">+91 7972238133</p>
                <p className="mt-1 text-xs text-[#666666]">
                  Available for phone and messaging inquiries
                </p>
              </div>

              <div
                className="rounded-[6px] bg-[#fafafa] p-6"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                <div className="mb-2 flex items-center gap-2">
                  <svg
                    className="h-4 w-4 text-[#171717]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-mono text-[11px] uppercase tracking-[0.071em] text-[#666666]">
                    Email Support
                  </span>
                </div>
                <p className="text-lg font-medium text-[#171717]">contact@autointerviewai.com</p>
                <p className="mt-1 text-xs text-[#666666]">Response time: Within 24-48 hours</p>
              </div>
            </div>
          </div>

          {/* Support Hours */}
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-2xl font-normal tracking-tight text-[#171717]">
              Operating Hours
            </h2>
            <div className="grid gap-6 text-sm text-[#4d4d4d] sm:grid-cols-2">
              <div>
                <h3 className="mb-1 font-medium text-[#171717]">General Support</h3>
                <p>Monday – Friday: 9:00 AM – 6:00 PM IST</p>
                <p>Saturday: 10:00 AM – 4:00 PM IST</p>
                <p>Sunday: Closed</p>
              </div>
              <div>
                <h3 className="mb-1 font-medium text-[#171717]">Technical System Issues</h3>
                <p>Critical platform issues and automated service checks are monitored 24/7.</p>
              </div>
            </div>
          </div>

          {/* Tips for contacting */}
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-2xl font-normal tracking-tight text-[#171717]">
              What to include in your message
            </h2>
            <p className="mb-4 text-sm text-[#4d4d4d]">
              To help us assist you promptly, please provide:
            </p>
            <ul className="space-y-2 text-sm text-[#4d4d4d]">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#171717]" />
                Your name and registered email address
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#171717]" />A detailed description of
                the question, issue, or feedback
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#171717]" />
                Screenshots or relevant links if reporting a technical glitch
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#171717]" />
                Browser and operating system details for rendering inquiries
              </li>
            </ul>
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
