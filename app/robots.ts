import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      // Explicitly allow AI crawlers for ChatGPT, Claude, Perplexity, etc.
      {
        userAgent: ['GPTBot', 'ChatGPT-User'],
        allow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
      },
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
