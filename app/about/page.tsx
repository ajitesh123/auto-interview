import { genPageMetadata } from 'app/seo'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-chatgpt-dark text-chatgpt-text">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-chatgpt-text">About Auto Interview AI</h1>
            <p className="text-lg text-chatgpt-textSecondary">
              Auto Interview AI (Autointerviewai) - AI-powered career tools to help you land your
              dream job
            </p>
          </div>

          <div className="space-y-8">
            {/* Mission Section */}
            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Our Mission</h2>
              <p className="leading-relaxed text-chatgpt-textSecondary">
                Auto Interview AI (Autointerviewai) is dedicated to democratizing career success
                through AI-powered tools. We believe everyone deserves access to professional-grade
                resume building, interview preparation, and job search assistance, regardless of
                their background or experience level.
              </p>
            </div>

            {/* Features Section */}
            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-6 text-2xl font-semibold text-chatgpt-text">What We Offer</h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-chatgpt-text">Resume Building</h3>
                  <p className="text-chatgpt-textSecondary">
                    Create professional, ATS-friendly resumes with our guided builder and AI-powered
                    templates.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-chatgpt-text">ATS Optimization</h3>
                  <p className="text-chatgpt-textSecondary">
                    Get your resume analyzed and optimized for Applicant Tracking Systems to
                    increase your chances of being noticed.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-chatgpt-text">Job Discovery</h3>
                  <p className="text-chatgpt-textSecondary">
                    Find relevant job opportunities tailored to your skills and experience with
                    AI-powered matching.
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-chatgpt-text">Cover Letters</h3>
                  <p className="text-chatgpt-textSecondary">
                    Generate personalized cover letters that complement your resume and highlight
                    your unique value.
                  </p>
                </div>
              </div>
            </div>

            {/* Policy Links Section */}
            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-6 text-2xl font-semibold text-chatgpt-text">Legal & Policies</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <Link
                  href="/privacy-policy"
                  className="flex items-center rounded-lg border border-chatgpt-border bg-chatgpt-input p-4 transition-colors hover:bg-chatgpt-card"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-chatgpt-text">Privacy Policy</h3>
                    <p className="text-sm text-chatgpt-textSecondary">
                      How we collect, use, and protect your data
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-chatgpt-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/terms-conditions"
                  className="flex items-center rounded-lg border border-chatgpt-border bg-chatgpt-input p-4 transition-colors hover:bg-chatgpt-card"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-chatgpt-text">Terms & Conditions</h3>
                    <p className="text-sm text-chatgpt-textSecondary">
                      Terms of service and user agreements
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-chatgpt-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/refund-policy"
                  className="flex items-center rounded-lg border border-chatgpt-border bg-chatgpt-input p-4 transition-colors hover:bg-chatgpt-card"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-chatgpt-text">Refund Policy</h3>
                    <p className="text-sm text-chatgpt-textSecondary">
                      Cancellation and refund information
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-chatgpt-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/contact-policy"
                  className="flex items-center rounded-lg border border-chatgpt-border bg-chatgpt-input p-4 transition-colors hover:bg-chatgpt-card"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-chatgpt-text">Contact Us</h3>
                    <p className="text-sm text-chatgpt-textSecondary">
                      Get in touch with our support team
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-chatgpt-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>

                <Link
                  href="/shipping-policy"
                  className="flex items-center rounded-lg border border-chatgpt-border bg-chatgpt-input p-4 transition-colors hover:bg-chatgpt-card"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-chatgpt-text">Shipping Policy</h3>
                    <p className="text-sm text-chatgpt-textSecondary">
                      Digital delivery and service information
                    </p>
                  </div>
                  <svg
                    className="h-5 w-5 text-chatgpt-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Contact Section */}
            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8 text-center">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Get Started Today</h2>
              <p className="mb-6 text-chatgpt-textSecondary">
                Ready to take your career to the next level? Start building your professional resume
                with AI assistance.
              </p>
              <Link
                href="/"
                className="inline-flex items-center rounded-lg bg-chatgpt-accent px-6 py-3 font-semibold text-chatgpt-text transition-colors hover:bg-chatgpt-green/80"
              >
                Start Building Resume
                <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
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
