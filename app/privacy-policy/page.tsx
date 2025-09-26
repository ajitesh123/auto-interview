import { genPageMetadata } from 'app/seo'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Privacy Policy' })

export default function Page() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-chatgpt-dark text-chatgpt-text">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-chatgpt-text">Privacy Policy</h1>
            <p className="text-lg text-chatgpt-textSecondary">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">
                Information We Collect
              </h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  We collect information you provide directly to us, such as when you create an
                  account, use our services, or contact us for support.
                </p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Personal information (name, email address, phone number)</li>
                  <li>Resume and career-related information</li>
                  <li>Usage data and analytics</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">
                How We Use Your Information
              </h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>We use the information we collect to:</p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Provide and improve our AI-powered career services</li>
                  <li>Generate personalized resumes and cover letters</li>
                  <li>Analyze resume compatibility with ATS systems</li>
                  <li>Send you relevant job opportunities</li>
                  <li>Communicate with you about our services</li>
                  <li>Ensure the security and integrity of our platform</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Data Security</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  We implement appropriate technical and organizational measures to protect your
                  personal information against unauthorized access, alteration, disclosure, or
                  destruction.
                </p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication</li>
                  <li>Secure data storage and backup procedures</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Data Sharing</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third
                  parties without your consent, except as described in this policy.
                </p>
                <p>We may share your information with:</p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Service providers who assist in our operations</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your explicit consent</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Your Rights</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>You have the right to:</p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Export your data in a portable format</li>
                  <li>Withdraw consent for data processing</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Contact Us</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  If you have any questions about this Privacy Policy or our data practices, please
                  contact us:
                </p>
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
