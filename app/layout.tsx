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

  // Open Graph metadata for social media sharing
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },

  // Alternative formats and canonical URL
  alternates: {
    canonical: './',
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
      <link rel="icon" type="image/svg+xml" href={`${basePath}/static/images/logo.svg`} />

      {/* Theme and display configurations */}
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />

      {/* Main body content */}
      <body className="bg-black pl-[calc(100vw-100%)] text-white antialiased">
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
