import { genPageMetadata } from 'app/seo'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Refund Policy' })

export default function Page() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-chatgpt-dark text-chatgpt-text">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-chatgpt-text">Refund Policy</h1>
            <p className="text-lg text-chatgpt-textSecondary">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">
                Cancellation & Refund Policy
              </h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  At Auto Interview AI, we strive to provide excellent service and ensure customer
                  satisfaction. This policy outlines our approach to cancellations and refunds for
                  our AI-powered career services.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Free Services</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  Our basic resume building and job search features are provided free of charge. No
                  refunds are applicable for free services as no payment is required.
                </p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Basic resume templates</li>
                  <li>Job search functionality</li>
                  <li>Basic ATS analysis</li>
                  <li>Standard cover letter generation</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Premium Services</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>For premium services and subscriptions, the following refund policy applies:</p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>
                    <strong>7-Day Money-Back Guarantee:</strong> Full refund within 7 days of
                    purchase
                  </li>
                  <li>
                    <strong>Technical Issues:</strong> Refund if service is unusable due to
                    technical problems
                  </li>
                  <li>
                    <strong>Service Unavailability:</strong> Refund if promised features are not
                    delivered
                  </li>
                  <li>
                    <strong>Duplicate Charges:</strong> Immediate refund for accidental duplicate
                    billing
                  </li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Refund Process</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>To request a refund:</p>
                <ol className="ml-4 list-inside list-decimal space-y-2">
                  <li>Contact our support team at refunds@autointerviewai.com</li>
                  <li>Provide your account information and reason for refund</li>
                  <li>Include any relevant documentation or screenshots</li>
                  <li>Allow 3-5 business days for processing</li>
                </ol>
                <p>
                  Refunds will be processed to the original payment method within 5-10 business days
                  after approval.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">
                Non-Refundable Items
              </h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>The following are not eligible for refunds:</p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Services used beyond the 7-day guarantee period</li>
                  <li>Custom resume writing services after delivery</li>
                  <li>One-time consultation sessions after completion</li>
                  <li>Services cancelled due to violation of terms of service</li>
                  <li>Refund requests made more than 30 days after purchase</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">
                Subscription Cancellations
              </h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  For subscription services, you may cancel at any time. Cancellation will take
                  effect at the end of your current billing period.
                </p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Access to premium features continues until the end of the billing period</li>
                  <li>No partial refunds for unused time in the current billing period</li>
                  <li>You can resubscribe at any time</li>
                  <li>Account data is retained for 90 days after cancellation</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Dispute Resolution</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>If you are not satisfied with our refund decision, you may:</p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Request a review by our management team</li>
                  <li>Provide additional documentation to support your case</li>
                  <li>Contact your payment provider for chargeback options</li>
                  <li>Seek mediation through consumer protection agencies</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Contact Information</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>For refund requests or questions about this policy, please contact us:</p>
                <div className="rounded-lg bg-chatgpt-input p-4">
                  <p>
                    <strong>Email:</strong> shantanu@tough-tongue.com
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link
                href="/about"
                className="inline-flex items-center rounded-lg bg-chatgpt-accent px-6 py-3 font-semibold text-chatgpt-text transition-colors hover:bg-chatgpt-green/80"
              >
                Back to About
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
