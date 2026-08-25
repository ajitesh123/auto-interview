import { Metadata } from 'next'
import Link from 'next/link'
import DomainLayout from '@/components/domain/DomainLayout'

export const metadata: Metadata = {
  title: 'Shipping Policy — Auto Interview AI',
  description: 'Digital delivery and service fulfillment information for Auto Interview AI.',
  alternates: {
    canonical: 'https://www.autointerviewai.com/shipping-policy',
  },
}

export default function ShippingPolicyPage() {
  return (
    <DomainLayout currentPath="/shipping-policy">
      <div className="mx-auto max-w-4xl px-6 py-20">
        <header className="mb-16">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.071em] text-[#171717]">
            FULFILLMENT
          </p>
          <h1 className="mb-4 text-4xl font-normal tracking-tight text-[#171717] sm:text-5xl">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-sm text-[#666666]">Last updated: August 2026</p>
        </header>

        <div className="space-y-8 text-sm leading-relaxed text-[#4d4d4d]">
          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-xl font-normal tracking-tight text-[#171717]">
              1. Digital Service Fulfillment
            </h2>
            <p>
              Auto Interview AI is a software and digital content platform. All resume templates,
              casebooks, and AI mock interview simulations are delivered electronically and
              instantaneously via the web. No physical goods or shipments are dispatched.
            </p>
          </div>

          <div
            className="rounded-[6px] bg-white p-8"
            style={{ boxShadow: '0 0 0 1px rgba(0,0,0,0.08)' }}
          >
            <h2 className="mb-4 text-xl font-normal tracking-tight text-[#171717]">
              2. Download Access &amp; Availability
            </h2>
            <p className="mb-3">
              Resume templates (DOCX / Google Docs) and casebooks (PDF) are accessible 24/7 without
              wait times. If you experience an issue downloading a file, please check your network
              connection or contact our support team.
            </p>
            <p className="font-mono text-xs text-[#171717]">
              Support Phone: +91 7972238133 | Email: contact@autointerviewai.com
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
