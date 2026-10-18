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
      // Dedicated Bing, MSN, and Microsoft Copilot crawler permissions
      {
        userAgent: [
          'bingbot',
          'msnbot',
          'msnbot-media',
          'BingPreview',
          'adidxbot',
          'Copilot',
          'Microsoft-Copilot',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/*?*'],
      },
      // Explicit rule for OpenAI ChatGPT Search (SearchGPT) retrieval crawler (grounded via Bing index)
      {
        userAgent: 'OAI-SearchBot',
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/'],
      },
      // Explicit rule for OpenAI Model Training and User Browsing
      {
        userAgent: ['GPTBot', 'ChatGPT-User'],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/'],
      },
      {
        userAgent: ['ClaudeBot', 'anthropic-ai', 'Claude-Web'],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/*?*'],
      },
      {
        userAgent: ['Google-Extended', 'Googlebot'],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/*?*'],
      },
      {
        userAgent: ['PerplexityBot'],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/*?*'],
      },
      {
        userAgent: [
          'Applebot',
          'Applebot-Extended',
          'cohere-ai',
          'Bytespider',
          'Bravebot',
          'bravebot',
        ],
        allow: ['/', '/llms.txt', '/llms-full.txt'],
        disallow: ['/api/', '/*?*'],
      },
    ],
    sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
    host: siteMetadata.siteUrl,
  }
}
