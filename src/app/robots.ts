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
        ],
        allow: '/',
        disallow: ['/api', '/admin'],
      },
    ],
    host: siteUrl,
    sitemap: [`${siteUrl}/sitemap.xml`, `${siteUrl}/rss.xml`],
  };
}
