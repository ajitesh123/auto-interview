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
          source: '/blog/mba-in-india-guide',
          destination: '/resources/mba',
          permanent: true,
        },
        {
          source: '/blog/job-search-guide-2025',
          destination: '/find-jobs',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-roi-calculator-sales-pipeline-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-roi-cold-dial-to-closed-deal-funnel-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-roi-executive-business-case-board-approval-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-roi-break-even-analysis-calculator-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/real-cost-ai-voice-agents-pricing-breakdown-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/3-biggest-outbound-sales-challenges-ai-calling-solutions-2026',
          destination: '/blog/top-5-ai-tools-real-time-objection-handling-2026',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-saas-b2b-outbound-sales-playbook-2026',
          destination: '/blog/top-5-ai-tools-real-time-objection-handling-2026',
          permanent: true,
        },
        {
          source: '/blog/ultimate-guide-to-objection-handling-scripts-tactics-2026',
          destination: '/blog/top-5-ai-tools-real-time-objection-handling-2026',
          permanent: true,
        },
        {
          source: '/blog/sales-roleplay-scenarios-exercises-sharpen-team-2026',
          destination: '/blog/12-realistic-sales-role-play-scenarios-sdr-mastery-2026',
          permanent: true,
        },
        {
          source: '/blog/sales-roleplay-scenarios-objection-handling-b2b-scripts-2026',
          destination: '/blog/roleplay-we-already-use-a-competitor-2026',
          permanent: true,
        },
        {
          source: '/blog/how-to-handle-sales-objections-scripts-ai-practice-2026',
          destination: '/blog/roleplay-we-already-use-a-competitor-2026',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-lead-qualification-scripts-workflows-results-2026',
          destination: '/blog/roleplay-we-already-use-a-competitor-2026',
          permanent: true,
        },
        {
          source: '/blog/why-sales-reps-hate-training-best-teams-do-it-anyway-2026',
          destination: '/blog/why-do-sales-reps-hate-roleplaying-2026',
          permanent: true,
        },
        {
          source: '/blog/why-sales-team-thinks-training-waste-of-time-wrong-2026',
          destination: '/blog/why-do-sales-reps-hate-roleplaying-2026',
          permanent: true,
        },
        {
          source: '/blog/mastering-difficult-conversations-roleplay-frameworks-managers-2026',
          destination: '/blog/why-do-sales-reps-hate-roleplaying-2026',
          permanent: true,
        },
        {
          source: '/blog/sales-training-plan-new-hires-30-60-90-day-2026',
          destination: '/blog/how-to-gate-live-outbound-dials-2026',
          permanent: true,
        },
        {
          source: '/blog/essential-ai-calling-tools-for-sales-success-2026',
          destination: '/blog/sip-providers-for-ai-calling-complete-guide-2026',
          permanent: true,
        },
        {
          source: '/blog/top-10-ai-calling-softwares-for-businesses-2026',
          destination: '/blog/best-bland-ai-alternatives-outbound-sales-2026',
          permanent: true,
        },
        {
          source: '/blog/why-ai-cold-calling-software-sounds-robotic-engineering-fix-2026',
          destination: '/blog/voice-latency-ai-sales-roleplay-2026',
          permanent: true,
        },
        {
          source: '/blog/the-state-of-ai-calling-competitors-2026-latency-pricing-report',
          destination: '/blog/voice-latency-ai-sales-roleplay-2026',
          permanent: true,
        },
        {
          source: '/blog/how-to-automate-appointment-setting-ai-voice-agents-2026',
          destination: '/blog/how-to-build-ai-cold-calling-agent-retell-vapi-bland-2026',
          permanent: true,
        },
        {
          source: '/blog/ai-cold-call-training-voice-ai-transforming-sales-onboarding-2026',
          destination: '/blog/why-do-sales-reps-hate-roleplaying-2026',
          permanent: true,
        },
        {
          source: '/blog/how-to-measure-sales-training-roi-metrics-vp-sales-2026',
          destination: '/blog/ai-sales-roleplay-vs-sales-trainer-roi-2026',
          permanent: true,
        },
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
        {
          source: '/blog/3-2-1-communication-framework-stop-rambling',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/agentic-ai-calling-autonomous-sales-agent-actions-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-address-confirmation-landmark-verification-shopify-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-cart-abandonment-live-cart-modification-shopify-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-crm-integration-salesforce-hubspot-guide-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-ecommerce-d2c-abandoned-cart-recovery-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-for-solar-companies-lead-qualification-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-use-cases-banking-financial-services-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-use-cases-customer-support-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-vs-email-sequences-pipeline-comparison-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/ai-calling-with-humans-conversational-ai-sales-india',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/ai-calls-lead-human-closes-deal-hybrid-sales-model',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/ai-cold-calling-complete-guide-outbound-sales-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/ai-meeting-notetaker-whiteboard-visual-ai-tough-tongue-2026',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/ai-powered-coaching-corporate-training',
          destination: '/blog/best-sales-training-companies-world',
          permanent: true,
        },
        {
          source: '/blog/ai-powered-coaching-ld-transformation',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/ai-real-time-meeting-notes-how-tough-tongue-ai-works-2026',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/ai-replacing-sdrs-future-sales-development',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/ai-roleplay-vs-classroom-training-effectiveness-2026',
          destination: '/blog/best-sales-training-companies-world',
          permanent: true,
        },
        {
          source: '/blog/ai-sales-calling-best-filter-human-closers-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/ai-sales-roleplay-executive-tech-upskilling-bootcamps-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/ai-sales-roleplay-private-engineering-tech-institutions-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source:
            '/blog/ai-sales-roleplay-training-india-industries-edtech-fintech-real-estate-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/ai-sales-roleplay-vs-hiring-sales-trainer-cost-roi-breakdown-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/ai-sales-simulators-vs-human-roleplay-win-rates-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/ai-voice-bot-vendor-lock-in-avoid-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/auto-interview-ai-platform-guide',
          destination: '/free-mock-interview',
          permanent: true,
        },
        {
          source: '/blog/automated-customer-feedback-calling-voice-ai-shopify-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/b2b-vs-b2c-sales-career-guide',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/behavioral-interview-star-method-guide',
          destination: '/free-mock-interview',
          permanent: true,
        },
        {
          source: '/blog/best-ai-sales-training-pune-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/best-ai-training-in-india-2026',
          destination: '/blog/best-sales-training-companies-world',
          permanent: true,
        },
        {
          source: '/blog/best-cold-call-opening-lines-reddit',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/best-communication-platforms-practice-2026',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/best-employee-training-companies-india-2026',
          destination: '/blog/best-sales-training-companies-world',
          permanent: true,
        },
        {
          source: '/blog/best-platforms-english-communication',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/best-platforms-practice-communication-skills',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/best-sales-closing-techniques-proven-methods',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/best-sales-training-methods-crack-deals',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/bolna-ai-vs-tough-tongue-ai-comparison-2026',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/building-sales-objection-handling-simulator-enablement-guide-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/can-voice-ai-accidentally-drain-bank-account-api-costs-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/case-study-reduce-sdr-ramp-time-ai-roleplay-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/case-study-saas-company-doubles-demos-ai-roleplay-practice-2026',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/cold-calls-to-close-ai-powered-sales-training-curriculum-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/communication-skills-guide-beginner',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/complete-job-preparation-guide-2025',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/compliance-sales-ai-training-regulated-calls-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/conversational-intelligence-vs-ai-roleplay-sales-tools-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/cross-border-b2b-sales-roleplay-indian-sdrs-us-uk-buyers-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/discovery-call-framework-questions-structure-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/ebbinghaus-forgetting-curve-ai-training-solutions-2026',
          destination: '/blog/best-sales-training-companies-world',
          permanent: true,
        },
        {
          source: '/blog/gemini-3-8-live-pricing-disrupts-indian-ai-calling-market-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/google-software-engineering-interview-questions-2025',
          destination: '/free-mock-interview',
          permanent: true,
        },
        {
          source: '/blog/gpt-live-1-1-vs-gemini-3-8-live-pricing-cost-latency-roi-breakdown-2026',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/gpt-live-1-1-vs-gemini-3-8-live-technical-business-comparison-2026',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/hidden-revenue-lever-sales-training-close-more-deals-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/how-b2b-saas-scaled-to-50-demos-without-hiring-sdrs-case-study-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/how-to-build-sales-pipeline-from-scratch-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/how-to-build-sales-roleplay-scoring-rubric-template-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/how-to-connect-ai-voice-agent-to-phone-number-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/how-to-find-jobs-complete-guide',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/how-to-gate-live-outbound-dials-ai-roleplay-certification-2026',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/how-to-improve-sales-skills-techniques',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/how-to-onboard-train-sales-reps-faster-ai-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/how-to-prevent-voice-ai-hallucinations-live-calls-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/how-to-roleplay-we-already-use-a-competitor-objection-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/how-to-set-up-ai-calling-sales-team-30-minutes',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/how-to-train-sales-reps-to-stop-sounding-scripted-cold-calls-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/how-to-turn-lost-customer-calls-into-ai-sales-roleplay-scenarios-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/hyperbound-vs-tough-tongue-ai-sales-training',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/inside-sales-vs-outside-sales-which-model-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/is-my-business-ready-for-ai-calling-readiness-assessment-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/leadership-training-complete-guide-2025',
          destination: '/blog/best-sales-training-companies-world',
          permanent: true,
        },
        {
          source:
            '/blog/openai-gpt-live-1-1-system-card-two-model-architecture-safety-analysis-2026',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/passive-vs-active-learning-corporate-training-2026',
          destination: '/blog/best-sales-training-companies-world',
          permanent: true,
        },
        {
          source: '/blog/product-management-in-maang',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/product-manager-interview-guide-2025',
          destination: '/free-mock-interview',
          permanent: true,
        },
        {
          source: '/blog/product-manager-interview-questions',
          destination: '/free-mock-interview',
          permanent: true,
        },
        {
          source: '/blog/remote-sales-training-distributed-teams-build-skills',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/rise-of-agentic-ai-sales-enablement-active-intervention-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/sales-coaching-vs-sales-training-difference-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/set-up-ai-voice-agent-without-coding-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/shopify-ai-calling-integration-d2c-tough-tongue-ai-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/solve-b2b-meeting-no-show-crisis-ai-confirmation-calls-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/top-5-ai-calling-use-cases-drive-revenue-2026',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/top-5-sales-training-companies-australia-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/top-5-visa-interview-platforms-ai-preparation',
          destination: '/free-mock-interview',
          permanent: true,
        },
        {
          source: '/blog/top-employee-training-topics-boost-productivity',
          destination: '/blog/best-sales-training-companies-world',
          permanent: true,
        },
        {
          source: '/blog/top-sales-training-companies-us',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/types-of-employee-training-methods-comparison-2026',
          destination: '/blog/best-sales-training-companies-world',
          permanent: true,
        },
        {
          source: '/blog/ultimate-sdr-guide-practice-scripts-tough-tongue-ai',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/voice-ai-outbound-call-automation-scaling-sdr-outreach-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/we-already-have-gong-why-do-we-need-ai-sales-roleplay-platform-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/wealth-managers-communication-tough-tongue-ai-double-revenue',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/what-is-an-ai-agent-vs-a-voice-bot-2026-definitions',
          destination: '/ai-calling-roi-calculator',
          permanent: true,
        },
        {
          source: '/blog/what-is-speech-to-text-stt-how-ai-hears-2026',
          destination: '/blog/best-mock-interview-platforms',
          permanent: true,
        },
        {
          source: '/blog/what-voice-latency-is-required-for-ai-sales-roleplay-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/why-chatgpt-fails-at-sales-roleplay-too-agreeable-ai-problem-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/why-corporate-training-fails-statistics-2026',
          destination: '/blog/best-sales-training-companies-world',
          permanent: true,
        },
        {
          source: '/blog/why-do-sales-reps-hate-roleplaying-and-how-to-fix-it-2026',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/why-freeze-interviews-after-mock-practice',
          destination: '/free-mock-interview',
          permanent: true,
        },
        {
          source: '/blog/why-tough-tongue-ai-is-the-2nd-best-sales-training-platform-in-the-world',
          destination: '/cold-call-practice',
          permanent: true,
        },
        {
          source: '/blog/why-traditional-leadership-coaching-fails-remote-teams',
          destination: '/blog/best-sales-training-companies-world',
          permanent: true,
        },
        {
          source: '/blog/yoodli-vs-tough-tongue-ai',
          destination: '/blog/best-mock-interview-platforms',
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
