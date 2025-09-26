import { genPageMetadata } from 'app/seo'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Terms & Conditions' })

export default function Page() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-chatgpt-dark text-chatgpt-text">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-chatgpt-text">Terms & Conditions</h1>
            <p className="text-lg text-chatgpt-textSecondary">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Acceptance of Terms</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  By accessing and using Auto Interview AI services, you accept and agree to be
                  bound by the terms and provision of this agreement.
                </p>
                <p>If you do not agree to abide by the above, please do not use this service.</p>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Use License</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  Permission is granted to temporarily use Auto Interview AI services for personal,
                  non-commercial transitory viewing only. This is the grant of a license, not a
                  transfer of title, and under this license you may not:
                </p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the website</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Service Description</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>Auto Interview AI provides AI-powered career tools including:</p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Resume building and optimization</li>
                  <li>ATS compatibility analysis</li>
                  <li>Cover letter generation</li>
                  <li>Job search assistance</li>
                  <li>Interview preparation resources</li>
                </ul>
                <p>
                  We reserve the right to modify, suspend, or discontinue any aspect of our services
                  at any time without notice.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">
                User Responsibilities
              </h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>As a user of our services, you agree to:</p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Provide accurate and truthful information</li>
                  <li>Use the services in compliance with applicable laws</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not use the services for any illegal or unauthorized purpose</li>
                  <li>Respect intellectual property rights</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">
                Intellectual Property
              </h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  The service and its original content, features, and functionality are and will
                  remain the exclusive property of Auto Interview AI and its licensors.
                </p>
                <p>
                  You retain ownership of the content you create using our services, including
                  resumes and cover letters. However, you grant us a license to use this content to
                  provide and improve our services.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">
                Limitation of Liability
              </h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  In no event shall Auto Interview AI, nor its directors, employees, partners,
                  agents, suppliers, or affiliates, be liable for any indirect, incidental, special,
                  consequential, or punitive damages, including without limitation, loss of profits,
                  data, use, goodwill, or other intangible losses, resulting from your use of the
                  service.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Termination</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  We may terminate or suspend your account and bar access to the service
                  immediately, without prior notice or liability, under our sole discretion, for any
                  reason whatsoever and without limitation, including but not limited to a breach of
                  the Terms.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Changes to Terms</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at
                  any time. If a revision is material, we will provide at least 30 days notice prior
                  to any new terms taking effect.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Contact Information</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>If you have any questions about these Terms & Conditions, please contact us:</p>
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
