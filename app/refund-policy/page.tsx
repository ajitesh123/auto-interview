import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'

export const metadata: Metadata = {
  title: 'Refund Policy — Auto Interview AI',
  description: 'Review the refund and service policies for Auto Interview AI.',
  alternates: {
    canonical: 'https://www.autointerviewai.com/refund-policy',
  },
}

export default function RefundPolicyPage() {
  return (
    <DomainLayout currentPath="/refund-policy">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <header className="mb-16">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            POLICIES
          </p>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-[#171717] sm:text-5xl">
            Refund Policy
          </h1>
          <p className="text-sm text-[#666666]">Last updated: August 2026</p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-[#4d4d4d]">
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-xl font-normal tracking-tight text-[#171717]">
              1. 100% Free Core Platform
            </h2>
            <p>
              Auto Interview AI provides CV templates, casebooks, and community access completely
              free with zero mandatory subscription fees. As core services are ungated, no refunds
              apply to free usage.
            </p>
          </div>

          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-xl font-normal tracking-tight text-[#171717]">
              2. Premium &amp; Specialized Services
            </h2>
            <p className="mb-3">
              For any optional premium coaching or bespoke assessment packages that may be offered:
            </p>
            <ul className="list-inside list-disc space-y-1.5 pl-2">
              <li>Eligible refund requests must be submitted within 7 calendar days of purchase</li>
              <li>Technical failures preventing service delivery qualify for full reimbursement</li>
              <li>
                Refund processing is completed within 5-7 business days to the original payment
                method
              </li>
            </ul>
          </div>

          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-xl font-normal tracking-tight text-[#171717]">
              3. Contact Support
            </h2>
            <p className="mb-2">
              For billing inquiries or policy clarifications, please reach out:
            </p>
            <p className="font-mono text-xs text-[#171717]">
              Email: contact@autointerviewai.com | Phone: +91 7972238133
            </p>
          </div>

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
