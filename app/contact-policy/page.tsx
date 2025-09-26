import { genPageMetadata } from 'app/seo'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Contact Us' })

export default function Page() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-chatgpt-dark text-chatgpt-text">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-chatgpt-text">Contact Us</h1>
            <p className="text-lg text-chatgpt-textSecondary">Get in touch with our support team</p>
          </div>

          <div className="space-y-8">
            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Get Support</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  Our dedicated support team is here to help you with any questions or issues you
                  may have. We're committed to providing excellent customer service and ensuring
                  your success with our platform.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Contact Methods</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-chatgpt-text">Email Support</h3>
                  <div className="rounded-lg bg-chatgpt-input p-4">
                    <p className="mb-2 text-chatgpt-textSecondary">Contact:</p>
                    <p className="text-chatgpt-accent">shantanu@tough-tongue.com</p>
                    <p className="mt-2 text-sm text-chatgpt-textSecondary">
                      Response time: 24-48 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Support Hours</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-chatgpt-text">Email Support</h3>
                    <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                    <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                    <p>Sunday: Closed</p>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-chatgpt-text">
                      Emergency Support
                    </h3>
                    <p>Critical issues: 24/7 response</p>
                    <p>Service outages: Immediate response</p>
                    <p>Security issues: Immediate response</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">
                What to Include in Your Message
              </h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>To help us assist you more effectively, please include:</p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Your account email address</li>
                  <li>Detailed description of the issue or question</li>
                  <li>Steps you've already taken to resolve the issue</li>
                  <li>Screenshots or error messages (if applicable)</li>
                  <li>Browser and device information (for technical issues)</li>
                  <li>Expected vs. actual behavior</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium text-chatgpt-text">
                      How do I reset my password?
                    </h3>
                    <p>
                      Use the "Forgot Password" link on the login page, or contact support for
                      assistance.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-chatgpt-text">
                      Can I export my resume data?
                    </h3>
                    <p>
                      Yes, you can download your resume in multiple formats from your dashboard.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-chatgpt-text">Is my data secure?</h3>
                    <p>
                      Yes, we use industry-standard encryption and security measures to protect your
                      information.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-chatgpt-text">Do you offer refunds?</h3>
                    <p>
                      Yes, we offer a 7-day money-back guarantee for premium services. See our
                      refund policy for details.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Mailing Address</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
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
