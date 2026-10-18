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
      // Explicitly allow AI crawlers for ChatGPT Search, Claude, Perplexity, Google, Bing
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot'],
        allow: '/',
        disallow: ['/api/', '/*?*'],
      },
      {
        userAgent: ['ClaudeBot', 'anthropic-ai', 'Claude-Web'],
        allow: '/',
        disallow: ['/api/', '/*?*'],
      },
      {
        userAgent: ['Google-Extended', 'Googlebot'],
        allow: '/',
        disallow: ['/api/', '/*?*'],
      },
      {
        userAgent: ['PerplexityBot'],
        allow: '/',
        disallow: ['/api/', '/*?*'],
      },
      {
        userAgent: ['Applebot-Extended', 'cohere-ai', 'Bytespider', 'bingbot'],
        allow: '/',
        disallow: ['/api/', '/*?*'],
      },
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
