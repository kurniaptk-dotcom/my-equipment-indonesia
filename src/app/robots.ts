import type { MetadataRoute } from 'next';
import { getSiteUrl } from '@/lib/site-url';

export default function robots(): MetadataRoute.Robots {
  return {
    // Let crawlers read the noindex metadata on CMS pages; the API has no public pages.
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api'] }],
    host: getSiteUrl(),
    sitemap: `${getSiteUrl()}/sitemap.xml`,
  };
}
