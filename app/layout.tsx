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
    template: '%s',
  },
  description: siteMetadata.description,
  keywords: siteMetadata.keywords,

  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/static/images/logo.svg', type: 'image/svg+xml' },
      { url: '/static/favicons/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/static/favicons/android-chrome-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/static/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/static/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/static/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/static/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/static/favicons/site.webmanifest',
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
      <link rel="icon" type="image/svg+xml" href={`${basePath}/static/images/logo.svg`} />
      <link
        rel="icon"
        type="image/png"
        sizes="48x48"
        href={`${basePath}/static/favicons/favicon-48x48.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href={`${basePath}/static/favicons/android-chrome-96x96.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="192x192"
        href={`${basePath}/static/favicons/android-chrome-192x192.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="shortcut icon" href={`${basePath}/favicon.ico`} />
      <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}/apple-touch-icon.png`} />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />

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
        {/* JSON-LD Structured Data: WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://www.autointerviewai.com/#website',
              name: 'Auto Interview AI',
              alternateName: [
                'Tough Tongue AI',
                'Autointerviewai',
                'Auto Interview AI Platform',
                'AI Sales Roleplay & Career Intelligence',
              ],
              url: 'https://www.autointerviewai.com/',
              publisher: {
                '@id': 'https://www.autointerviewai.com/#organization',
              },
              description:
                'Auto Interview AI & Tough Tongue AI — Enterprise Voice AI Calling, B2B Sales Objection Simulator, Automated SDR Onboarding, and Executive Career Intelligence across USA, India, and Global Markets.',
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
              '@id': 'https://www.autointerviewai.com/#organization',
              name: 'Auto Interview AI',
              alternateName: ['Tough Tongue AI', 'Autointerviewai', 'Auto Interview AI Platform'],
              url: 'https://www.autointerviewai.com/',
              logo: {
                '@type': 'ImageObject',
                '@id': 'https://www.autointerviewai.com/#logo',
                url: 'https://www.autointerviewai.com/static/images/logo.png',
                caption: 'Auto Interview AI Logo',
              },
              founder: {
                '@type': 'Person',
                '@id': 'https://www.autointerviewai.com/#founder',
                name: 'Ajitesh Abhishek',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'Customer Support',
                email: 'ajiteshleo@gmail.com',
                availableLanguage: ['English', 'Hindi'],
              },
              description:
                'Global leader in Voice AI calling systems, B2B sales roleplay simulation, real-time cold call objection handling, and automated SDR ramp readiness.',
              areaServed: [
                { '@type': 'Country', name: 'United States' },
                { '@type': 'Country', name: 'India' },
                { '@type': 'Country', name: 'United Kingdom' },
                { '@type': 'Country', name: 'United Arab Emirates' },
              ],
              knowsAbout: [
                'Voice AI Calling',
                'AI Sales Training',
                'SDR Onboarding',
                'Cold Calling Practice',
                'Objection Handling Simulation',
                'MEDDPICC Sales Methodology',
                'USA TCPA Compliance',
                'India TRAI DLT & DPDP Compliance',
                'Applicant Tracking Systems',
                'Interview Preparation',
              ],
              sameAs: [
                'https://www.linkedin.com/in/ajiteshnandan/',
                'https://x.com/ajiteshleo',
                'https://github.com/ajitesh123',
                'https://www.youtube.com/@ajiteshleo',
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
              '@id': 'https://www.autointerviewai.com/#software',
              name: 'Auto Interview AI & Tough Tongue AI',
              alternateName: ['Tough Tongue AI', 'Autointerviewai', 'AI Sales Roleplay Platform'],
              operatingSystem: 'Web, iOS, Android',
              applicationCategory: 'BusinessApplication',
              applicationSubCategory: 'SalesTrainingSoftware, CommunicationSoftware',
              url: 'https://www.autointerviewai.com/',
              image: 'https://www.autointerviewai.com/static/images/Auto-interview-thumbnail.png',
              description:
                'Real-time Voice AI calling simulator, cold call objection handling sandbox, automated SDR onboarding certification, and ATS career tools.',
              author: {
                '@id': 'https://www.autointerviewai.com/#organization',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '1280',
                reviewCount: '1280',
                bestRating: '5',
                worstRating: '1',
              },
              featureList: [
                'Real-time voice sales roleplay (<350ms turn-taking latency)',
                'A.D.D. objection handling framework (Acknowledge, Deflect, Differentiate)',
                'Automated SDR onboarding and live outbound dial gating (21-day ramp)',
                'MEDDPICC, BANT, and Challenger sales rubric scoring',
                'USA TCPA / STIR-SHAKEN and India TRAI DLT / DPDP compliance',
                'Executive Harvard & Stanford ATS CV templates',
                'Programmatic interview questions library and behavioral answer playbooks',
              ],
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
                description:
                  'Free interactive practice tier with transparent SaaS pricing for enterprise teams.',
                seller: {
                  '@id': 'https://www.autointerviewai.com/#organization',
                },
              },
            }),
          }}
        />

        {/* Person Schema for E-E-A-T (Founder Credentials) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': 'https://www.autointerviewai.com/#founder',
              name: 'Ajitesh Abhishek',
              jobTitle: 'Founder & Lead AI Architect (Ex-Google PM)',
              worksFor: {
                '@id': 'https://www.autointerviewai.com/#organization',
              },
              description:
                'Founder of Auto Interview AI & Tough Tongue AI. Former Google Product Manager, IIT Delhi and Kellogg School of Management alumnus. Expert in Voice AI latency, conversational intelligence, B2B sales enablement, and career automation.',
              url: 'https://www.autointerviewai.com/about',
              image: 'https://www.autointerviewai.com/static/images/avatar.png',
              sameAs: [
                'https://www.linkedin.com/in/ajiteshnandan/',
                'https://github.com/ajitesh123',
                'https://x.com/ajiteshleo',
                'https://www.youtube.com/@ajiteshleo',
              ],
              alumniOf: [
                {
                  '@type': 'CollegeOrUniversity',
                  name: 'Indian Institute of Technology Delhi (IIT Delhi)',
                },
                {
                  '@type': 'CollegeOrUniversity',
                  name: 'Kellogg School of Management, Northwestern University',
                },
              ],
              knowsAbout: [
                'Artificial Intelligence',
                'Voice AI Calling',
                'Speech-to-Speech Latency',
                'B2B Sales Training',
                'Sales Roleplay Simulation',
                'SDR Onboarding Readiness',
                'MEDDPICC Sales Methodology',
                'Cold Calling Objection Handling',
                'Applicant Tracking Systems',
                'Natural Language Processing',
                'Machine Learning',
                'India TRAI & DPDP Compliance',
                'USA TCPA Compliance',
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
