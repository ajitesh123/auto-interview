import { genPageMetadata } from 'app/seo'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Link from '@/components/Link'

export const metadata = genPageMetadata({ title: 'Shipping Policy' })

export default function Page() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-chatgpt-dark text-chatgpt-text">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-4xl font-bold text-chatgpt-text">Shipping Policy</h1>
            <p className="text-lg text-chatgpt-textSecondary">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-8">
            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Digital Services</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  Auto Interview AI provides digital services including resume building, ATS
                  analysis, and job search assistance. All services are delivered instantly upon
                  completion.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Delivery Method</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>
                  All services are delivered digitally through our web platform. No physical
                  shipping is required.
                </p>
                <ul className="ml-4 list-inside list-disc space-y-2">
                  <li>Instant access to resume builder</li>
                  <li>Immediate ATS analysis results</li>
                  <li>Real-time job search results</li>
                  <li>Downloadable resume files</li>
                </ul>
              </div>
            </div>

            <div className="rounded-lg border border-chatgpt-border bg-chatgpt-card p-8">
              <h2 className="mb-4 text-2xl font-semibold text-chatgpt-text">Contact Information</h2>
              <div className="space-y-4 text-chatgpt-textSecondary">
                <p>For questions about our digital services, please contact us:</p>
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
