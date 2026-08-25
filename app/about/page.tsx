import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'

export const metadata: Metadata = {
  title: 'About Auto Interview AI — The Career Intelligence Platform',
  description:
    'Auto Interview AI empowers job seekers with ATS-optimized CV templates, domain resources, and AI mock interview simulations. Built to level the playing field.',
  alternates: {
    canonical: 'https://www.autointerviewai.com/about',
  },
  openGraph: {
    title: 'About Auto Interview AI — The Career Intelligence Platform',
    description:
      'Auto Interview AI empowers job seekers with ATS-optimized CV templates, domain resources, and AI mock interview simulations.',
    url: 'https://www.autointerviewai.com/about',
    siteName: 'Auto Interview AI',
    locale: 'en_US',
    type: 'website',
  },
}

export default function AboutPage() {
  return (
    <DomainLayout currentPath="/about">
      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* Header */}
        <header className="mb-16">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            ABOUT AUTO INTERVIEW AI
          </p>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-[#171717] sm:text-5xl">
            Democratizing career intelligence.
          </h1>
          <p className="text-lg leading-relaxed text-[#4d4d4d]">
            We believe career preparation should be structured, accessible, and free. Auto Interview
            AI provides high-leverage tools to help ambitious professionals secure their dream
            roles.
          </p>
        </header>

        <div className="space-y-12">
          {/* Mission */}
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              OUR MISSION
            </p>
            <h2 className="mb-3 text-2xl font-normal tracking-tight text-[#171717]">
              Leveling the hiring field for everyone.
            </h2>
            <p className="leading-relaxed text-[#4d4d4d]">
              The modern hiring market is inundated with opaque automated filters, expensive
              bootcamps, and gatekept prep materials. Auto Interview AI was founded to provide every
              job seeker with world-class ATS-optimized CV templates, verified domain casebooks, and
              adaptive AI mock interview practice. 100% free with zero paywalls.
            </p>
          </div>

          {/* Four Core Offerings */}
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              OUR PILLARS
            </p>
            <h2 className="mb-6 text-2xl font-normal tracking-tight text-[#171717]">
              What we build
            </h2>

            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="mb-1 text-base font-medium text-[#171717]">1. Stellar CVs</h3>
                <p className="text-sm leading-relaxed text-[#4d4d4d]">
                  Tested ATS-optimized resume formats from institutions like Harvard and IIM
                  Ahmedabad, ensuring candidates pass initial automated screenings.
                </p>
              </div>
              <div>
                <h3 className="mb-1 text-base font-medium text-[#171717]">2. Domain Resources</h3>
                <p className="text-sm leading-relaxed text-[#4d4d4d]">
                  Curated interview playbooks, casebooks, and technical study guides organized by
                  career track including MBA Consulting, Engineering, and Commerce.
                </p>
              </div>
              <div>
                <h3 className="mb-1 text-base font-medium text-[#171717]">3. AI Mock Interviews</h3>
                <p className="text-sm leading-relaxed text-[#4d4d4d]">
                  Voice and text-driven realistic simulation environments with instant feedback on
                  content quality, structure, and communication delivery.
                </p>
              </div>
              <div>
                <h3 className="mb-1 text-base font-medium text-[#171717]">4. Role Communities</h3>
                <p className="text-sm leading-relaxed text-[#4d4d4d]">
                  Focused peer networks for Computer Science, AI engineers, and MBA candidates to
                  exchange interview insights and direct company referrals.
                </p>
              </div>
            </div>
          </div>

          {/* Legal & Policies Navigation */}
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
              GOVERNANCE
            </p>
            <h2 className="mb-6 text-2xl font-normal tracking-tight text-[#171717]">
              Policies & contact
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <Link
                href="/privacy-policy"
                className="group flex items-center justify-between rounded-[6px] bg-[#fafafa] p-4 transition-all hover:bg-[#f0f0f0]"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                <div>
                  <h3 className="text-sm font-medium text-[#171717]">Privacy Policy</h3>
                  <p className="text-xs text-[#666666]">How we handle and protect your data</p>
                </div>
                <span className="text-sm text-[#171717] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/terms-conditions"
                className="group flex items-center justify-between rounded-[6px] bg-[#fafafa] p-4 transition-all hover:bg-[#f0f0f0]"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                <div>
                  <h3 className="text-sm font-medium text-[#171717]">Terms & Conditions</h3>
                  <p className="text-xs text-[#666666]">Service terms and usage rules</p>
                </div>
                <span className="text-sm text-[#171717] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/contact-policy"
                className="group flex items-center justify-between rounded-[6px] bg-[#fafafa] p-4 transition-all hover:bg-[#f0f0f0]"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                <div>
                  <h3 className="text-sm font-medium text-[#171717]">Contact Us</h3>
                  <p className="text-xs text-[#666666]">Support hours and direct assistance</p>
                </div>
                <span className="text-sm text-[#171717] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>

              <Link
                href="/refund-policy"
                className="group flex items-center justify-between rounded-[6px] bg-[#fafafa] p-4 transition-all hover:bg-[#f0f0f0]"
                style={{ boxShadow: '0 0 0 1px #ebebeb' }}
              >
                <div>
                  <h3 className="text-sm font-medium text-[#171717]">Refund Policy</h3>
                  <p className="text-xs text-[#666666]">Service terms and policies</p>
                </div>
                <span className="text-sm text-[#171717] transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>

          {/* CTA Box */}
          <div
            className="rounded-[6px] bg-[#171717] p-8 text-center sm:p-12"
            style={{ color: '#ffffff' }}
          >
            <h2
              className="mb-3 text-2xl font-normal tracking-tight !text-white"
              style={{ color: '#ffffff' }}
            >
              Ready to accelerate your career?
            </h2>
            <p className="mx-auto mb-6 max-w-md text-sm text-[#a8a8a8]">
              Explore our free ATS resume templates and start preparing for your interviews today.
            </p>
            <Link
              href="/cv-templates"
              className="inline-flex items-center justify-center rounded-[6px] bg-white px-6 py-2.5 text-sm font-medium !text-[#171717] transition-all hover:bg-[#f0f0f0]"
              style={{ color: '#171717', backgroundColor: '#ffffff' }}
            >
              Explore CV Templates
            </Link>
          </div>
        </div>
      </div>
    </DomainLayout>
  )
}
