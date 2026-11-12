import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/admin'],
      },
      // Explicitly allow AI Search Crawlers for Generative Engine Optimization (GEO)
      {
        userAgent: [
          'OAI-SearchBot', // ChatGPT Search
          'PerplexityBot', // Perplexity AI Search
          'Claude-SearchBot', // Claude AI Search
          'Googlebot', // Google Search & AI Overviews
          'Google-Extended', // Google Gemini training & search grounding
          'GPTBot', // OpenAI indexing
          'ClaudeBot', // Anthropic indexing
          'Applebot', // Apple Intelligence
        ],
        allow: '/',
        disallow: ['/api', '/admin'],
      },
    ],
    host: siteUrl,
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/rss.xml`],
  };
}
