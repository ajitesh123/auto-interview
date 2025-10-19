// Import required styles
import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

// Import necessary dependencies and components
import { Space_Grotesk } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

// Initialize the Space Grotesk font with specific configurations
// This uses Next.js built-in font optimization
const space_grotesk = Space_Grotesk({
  subsets: ['latin'], // Only load Latin character subset
  display: 'swap', // Use font-display: swap for better performance
  variable: '--font-space-grotesk', // CSS variable name for the font
})

/**
 * Metadata configuration for the application
 * This defines various SEO-related properties and meta tags
 */
export const metadata: Metadata = {
  // Set the base URL for all relative URLs in the metadata
  metadataBase: new URL(siteMetadata.siteUrl),

  // Configure title template and default title
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`, // Format: [Page Name] | [Site Title]
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,

  // Open Graph metadata for social media sharing
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },

  // Alternative formats and canonical URL
  alternates: {
    canonical: siteMetadata.siteUrl,
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
    },
  },

  // Search engine crawler configurations
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Twitter card metadata
  twitter: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

/**
 * Root Layout Component
 * This is the main layout component that wraps all pages in the application
 *
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be rendered within the layout
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Get the base path from environment variables or default to empty string
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${space_grotesk.variable} scroll-smooth`}
      suppressHydrationWarning // Suppress hydration warnings for client/server mismatch
    >
      {/* Favicon and PWA configurations */}
      <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/static/images/logo.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}/static/images/logo.png`} />
      <link rel="shortcut icon" href={`${basePath}/static/images/logo.png`} />
      <link rel="apple-touch-icon" href={`${basePath}/static/images/logo.png`} />

      {/* Theme and display configurations */}
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />

      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="eTOb6OL-8x8-f47xo-azolhMsoPH_N0QoOgNPX-lCoM" />

      {/* Bing Webmaster Tools Verification */}
      <meta name="msvalidate.01" content="DCE0AC8E258C8B66E1E4F10414746DCF" />

      {/* Main body content */}
      <body className="bg-black pl-[calc(100vw-100%)] text-white antialiased">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Auto Interview AI',
              alternateName: [
                'Autointerviewai',
                'Auto Interview AI Platform',
                'AI Interview Practice',
              ],
              url: 'https://www.autointerviewai.com/',
              description:
                'Auto Interview AI (Autointerviewai) is the one-stop platform for job preparation: resume builder, ATS checker, mock interviews, job search, and cover letter generator.',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://www.autointerviewai.com/?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Auto Interview AI',
              alternateName: ['Autointerviewai', 'Auto Interview AI Platform'],
              url: 'https://www.autointerviewai.com/',
              logo: 'https://www.autointerviewai.com/static/images/logo.png',
              sameAs: [
                'https://www.linkedin.com/in/ajiteshnandan/',
                'https://x.com/ajiteshleo',
                'https://github.com/ajitesh123',
              ],
            }),
          }}
        />

        {/* SoftwareApplication Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Auto Interview AI',
              alternateName: ['Autointerviewai', 'AI Interview Practice Platform'],
              operatingSystem: 'Web',
              applicationCategory: 'BusinessApplication',
              url: 'https://www.autointerviewai.com/',
              image: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
              description:
                'Auto Interview AI (Autointerviewai) - AI-driven mock interviews, resume builder, ATS checker, job search and cover letter generator.',
            }),
          }}
        />

        {/* Person Schema for E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Ajitesh Abhishek',
              jobTitle: 'AI & Career Tools Developer',
              description:
                'Creator of Auto Interview AI - helping job seekers with AI-powered resume building, ATS optimization, interview preparation, and job search tools.',
              url: 'https://www.autointerviewai.com/about',
              image: 'https://www.autointerviewai.com/static/images/avatar.png',
              sameAs: [
                'https://www.linkedin.com/in/ajiteshnandan/',
                'https://github.com/ajitesh123',
                'https://x.com/ajiteshleo',
              ],
              knowsAbout: [
                'Artificial Intelligence',
                'Resume Optimization',
                'Applicant Tracking Systems',
                'Job Search Strategies',
                'Interview Preparation',
                'Career Development',
                'Natural Language Processing',
                'Machine Learning',
              ],
            }),
          }}
        />

        {/* BreadcrumbList Schema for Site Navigation */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.autointerviewai.com/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Resume Builder',
                  item: 'https://www.autointerviewai.com/build-resume',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'ATS Score Checker',
                  item: 'https://www.autointerviewai.com/ats-score',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Job Search',
                  item: 'https://www.autointerviewai.com/find-jobs',
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  name: 'Cover Letter Generator',
                  item: 'https://www.autointerviewai.com/cover-letter',
                },
              ],
            }),
          }}
        />

        {/* Clear body scroll locks on page load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                // Clear any body scroll locks that might be preventing clicks
                document.body.style.overflow = '';
                document.body.style.paddingRight = '';
                document.documentElement.style.overflow = '';
                document.documentElement.style.paddingRight = '';
              }
            `,
          }}
        />
        {/* Theme provider wrapper for dark/light mode */}
        <ThemeProviders>
          {/* Analytics component for tracking - disabled in development */}
          {process.env.NODE_ENV === 'production' && (
            <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          )}
          {/* Main content container */}
          <SectionContainer>
            {/* Search provider wrapper for search functionality - simplified in development */}
            {process.env.NODE_ENV === 'production' ? (
              <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                <main className="mb-auto">{children}</main>
              </SearchProvider>
            ) : (
              <main className="mb-auto">{children}</main>
            )}
          </SectionContainer>
          {process.env.NODE_ENV === 'production' && <VercelAnalytics />}
        </ThemeProviders>
      </body>
    </html>
  )
}
