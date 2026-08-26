// Import required styles
import 'css/tailwind.css'
import 'pliny/search/algolia.css'
import 'remark-github-blockquote-alert/alert.css'

// Import necessary dependencies and components
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, SearchConfig } from 'pliny/search'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { Analytics as VercelAnalytics } from '@vercel/analytics/react'

// Initialize fonts — Geist Sans substitute (Inter) + Geist Mono substitute (JetBrains Mono)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['400', '500'],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '600'],
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
      className={`${inter.variable} ${jetbrainsMono.variable} scroll-smooth`}
      suppressHydrationWarning // Suppress hydration warnings for client/server mismatch
    >
      {/* Favicon and PWA configurations */}
      <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/static/images/logo.png`} />
      <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}/static/images/logo.png`} />
      <link rel="shortcut icon" href={`${basePath}/static/images/logo.png`} />
      <link rel="apple-touch-icon" href={`${basePath}/static/images/logo.png`} />

      {/* Theme and display configurations */}
      <meta name="msapplication-TileColor" content="#fafafa" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fafafa" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#fafafa" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />

      {/* Google Search Console Verification */}
      <meta name="google-site-verification" content="eTOb6OL-8x8-f47xo-azolhMsoPH_N0QoOgNPX-lCoM" />

      {/* Bing Webmaster Tools Verification */}
      <meta name="msvalidate.01" content="DCE0AC8E258C8B66E1E4F10414746DCF" />

      {/* Main body content */}
      <body className="bg-[#fafafa] pl-[calc(100vw-100%)] text-[#171717] antialiased">
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
                'Auto Interview AI is the one-stop platform for cracking your dream job: CV templates, interview resources, AI mock interviews, and career communities.',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://www.autointerviewai.com/blog?q={search_term_string}',
                },
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
                'Auto Interview AI — CV templates, interview resources, AI mock interviews, and career communities. Your dream job, engineered.',
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
                'Creator of Auto Interview AI - helping job seekers with CV templates, interview resources, AI mock interviews, and career communities.',
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
                  name: 'CV Templates',
                  item: 'https://www.autointerviewai.com/cv-templates',
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'Resources',
                  item: 'https://www.autointerviewai.com/resources',
                },
                {
                  '@type': 'ListItem',
                  position: 4,
                  name: 'Mock Interview',
                  item: 'https://www.autointerviewai.com/free-mock-interview',
                },
                {
                  '@type': 'ListItem',
                  position: 5,
                  name: 'Blog',
                  item: 'https://www.autointerviewai.com/blog',
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
        {/* Theme provider wrapper — forced light mode */}
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
