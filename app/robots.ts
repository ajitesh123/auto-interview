import { MetadataRoute } from 'next'
import siteMetadata from '@/data/siteMetadata'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/*?*'],
      },
      // Explicitly allow AI crawlers for ChatGPT, Claude, Perplexity, etc.
      {
        userAgent: ['GPTBot', 'ChatGPT-User'],
        allow: '/',
        disallow: ['/api/', '/*?*'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/api/', '/*?*'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/api/', '/*?*'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/api/', '/*?*'],
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/api/', '/*?*'],
      },
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
