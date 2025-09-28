import { Metadata } from 'next'
import Link from '@/components/Link'

export const metadata: Metadata = {
  title: 'Sitemap - Auto Interview AI',
  description:
    'Complete sitemap of Auto Interview AI - find all pages and features for job preparation, resume building, ATS checking, and interview practice.',
}

export default function SitemapPage() {
  const pages = [
    {
      title: 'Home',
      url: '/',
      description: 'Main landing page with overview of all job preparation tools',
    },
    {
      title: 'Blog',
      url: '/blog',
      description: 'Career advice, job search tips, and industry insights',
    },
    {
      title: 'About',
      url: '/about',
      description: 'Learn about Auto Interview AI and our mission',
    },
    {
      title: 'Tough Tongue AI',
      url: '/tough-tongue-ai',
      description: 'Advanced AI-powered interview practice platform',
    },
    {
      title: 'Contact Policy',
      url: '/contact-policy',
      description: 'How to get in touch with our support team',
    },
    {
      title: 'Privacy Policy',
      url: '/privacy-policy',
      description: 'How we protect and handle your personal information',
    },
    {
      title: 'Terms & Conditions',
      url: '/terms-conditions',
      description: 'Terms of service and usage guidelines',
    },
    {
      title: 'Refund Policy',
      url: '/refund-policy',
      description: 'Our refund and cancellation policy',
    },
    {
      title: 'Shipping Policy',
      url: '/shipping-policy',
      description: 'Information about digital product delivery',
    },
  ]

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-white">Site Map</h1>
        <p className="text-lg text-gray-300">
          Navigate through all pages and features of Auto Interview AI
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {pages.map((page) => (
          <div
            key={page.url}
            className="rounded-lg bg-gray-800 p-6 transition-colors hover:bg-gray-700"
          >
            <h2 className="mb-2 text-xl font-semibold text-white">
              <Link href={page.url} className="hover:text-blue-400">
                {page.title}
              </Link>
            </h2>
            <p className="mb-3 text-sm text-gray-300">{page.description}</p>
            <Link href={page.url} className="text-sm font-medium text-blue-400 hover:text-blue-300">
              Visit Page →
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-gray-800 p-6">
        <h2 className="mb-4 text-2xl font-bold text-white">Key Features</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Resume Tools</h3>
            <ul className="space-y-1 text-gray-300">
              <li>• AI-powered resume builder</li>
              <li>• ATS score checker</li>
              <li>• Professional templates</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Interview Practice</h3>
            <ul className="space-y-1 text-gray-300">
              <li>• Mock interview simulations</li>
              <li>• AI feedback and scoring</li>
              <li>• Industry-specific questions</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Job Search</h3>
            <ul className="space-y-1 text-gray-300">
              <li>• Job opportunity discovery</li>
              <li>• Skills matching</li>
              <li>• Application tracking</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-lg font-semibold text-white">Cover Letters</h3>
            <ul className="space-y-1 text-gray-300">
              <li>• Personalized generation</li>
              <li>• Job-specific customization</li>
              <li>• Professional templates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
