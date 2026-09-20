// Next.js configuration - Updated Aug 2026
const { withContentlayer } = require('next-contentlayer2')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' giscus.app analytics.umami.is www.googletagmanager.com www.google-analytics.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src * blob: data:;
  media-src *.s3.amazonaws.com *.cloudfront.net;
  connect-src * https://api-gateway.umami.dev;
  font-src 'self' https://fonts.gstatic.com;
  frame-src giscus.app www.loom.com www.youtube.com open.spotify.com app.toughtongueai.com
`

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\n/g, ''),
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    key: 'Permissions-Policy',
    value:
      'microphone=(), camera=(), geolocation=(), microphone=(self "https://app.toughtongueai.com")',
  },
]

const output = process.env.EXPORT ? 'export' : undefined
const basePath = process.env.BASE_PATH || undefined
const unoptimized = process.env.UNOPTIMIZED ? true : undefined

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = () => {
  const plugins = [withContentlayer, withBundleAnalyzer]
  return plugins.reduce((acc, next) => next(acc), {
    output,
    basePath,
    reactStrictMode: true,
    pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
    eslint: {
      dirs: ['app', 'components', 'layouts', 'scripts'],
    },
    experimental: {
      optimizePackageImports: ['framer-motion', 'recharts', '@headlessui/react'],
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'picsum.photos',
        },
      ],
      unoptimized,
    },
    async headers() {
      return [
        {
          source: '/:path*',
          headers: securityHeaders,
        },
      ]
    },
    async redirects() {
      return [
        // Legacy Brand & 404 URL Redirects reported in Search Console
        {
          source: '/tough-tongue-ai',
          destination: '/',
          permanent: true,
        },
        {
          source: '/tags/e.164',
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/tags/tl:dv-alternative',
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/tags/tl;dv-alternative',
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/tags/fireflies.ai',
          destination: '/blog',
          permanent: true,
        },
        {
          source: "/tags/buyer's-guide",
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/tags/otter.ai',
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/tags/read.ai-alternative',
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/tags/smith.ai-alternatives',
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/tags/ats-data',
          destination: '/ats-score',
          permanent: true,
        },
        {
          source: '/blog/agentic-ai-training-beyond-voice-chatbots',
          destination: '/blog/agentic-ai-calling-autonomous-sales-agent-actions-2026',
          permanent: true,
        },
        {
          source: '/blog/agentic-ai-training-beyond-voice-chatbots/',
          destination: '/blog/agentic-ai-calling-autonomous-sales-agent-actions-2026',
          permanent: true,
        },
        {
          source: '/ats-checker',
          destination: '/ats-score',
          permanent: true,
        },
        {
          source: '/community',
          destination: '/communities',
          permanent: true,
        },
        {
          source: '/tags/ai-jobs',
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/blog/auto-interview-ai-hiring-index-july-2026',
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/projects',
          destination: '/',
          permanent: true,
        },
        {
          source: '/blog/ai-mock-interviews-guide',
          destination: '/free-mock-interview',
          permanent: true,
        },
        // Content Pruning & De-cannibalization Redirects (SEO Engine 2026)
        {
          source: '/blog/google-product-management-interview-questions-2025-temp',
          destination: '/blog/google-product-management-interview-questions-2025',
          permanent: true,
        },
        {
          source: '/blog/new-blog-post-template',
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/blog/acceptenc-into-kellogg-mba',
          destination: '/about',
          permanent: true,
        },
        {
          source: '/blog/auto-interview-ai-2025-hiring-index',
          destination: '/blog',
          permanent: true,
        },
        {
          source: '/blog/best-mock-interview-platforms-2025',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/best-mock-interview-platforms-2026',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/best-sales-training-companies-india-2026',
          destination: '/blog/best-sales-training-companies-india',
          permanent: true,
        },
        {
          source: '/blog/b2b-sales-training-india-platforms-methodologies-2026',
          destination: '/blog/best-sales-training-companies-india',
          permanent: true,
        },
        {
          source: '/blog/webrtc-vs-sip-real-time-ai-voice-agents-2026',
          destination: '/blog/webrtc-vs-sip-ai-voice-agent-architecture-2026',
          permanent: true,
        },
        {
          source: '/blog/top-5-air-ai-alternatives-2026',
          destination: '/blog/best-air-ai-alternatives-outbound-sales-2026',
          permanent: true,
        },
        {
          source: '/blog/best-synthflow-alternatives-ai-calling-sales-2026',
          destination: '/blog/top-5-synthflow-alternatives-2026',
          permanent: true,
        },
        {
          source: '/blog/best-retell-ai-alternatives-developers-sales-2026',
          destination: '/blog/top-5-retell-ai-alternatives-2026',
          permanent: true,
        },
      ]
    },
    webpack: (config, { dev, isServer }) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      })

      if (!dev && !isServer) {
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            styles: {
              name: 'styles',
              test: /\.(css|scss)$/,
              chunks: 'all',
              enforce: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
          },
        }
      }

      return config
    },
  })
}
