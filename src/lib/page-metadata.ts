import type { Metadata } from 'next';
import { getSeoSettings } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';

export async function createPageMetadata({
  title,
  description,
  canonical,
  image,
  imageAlt,
  robots,
}: {
  title?: string;
  description?: string;
  canonical: string;
  image?: string | null;
  imageAlt?: string;
  robots?: Metadata['robots'];
}): Promise<Metadata> {
  const seo = await getSeoSettings();
  const pageTitle = title ?? seo.defaultTitle;
  const pageDescription = description ?? seo.description;
  const shareImage = image || seo.socialImage;
  const shareAlt = image ? (imageAlt || pageTitle) : seo.socialImageAlt;
  const url = new URL(canonical, getSiteUrl()).toString();
  return {
    title: title ?? { absolute: seo.defaultTitle },
    description: pageDescription,
    alternates: { canonical },
    ...(robots ? { robots } : {}),
    openGraph: {
      type: 'website',
      title: title ? `${title} | ${seo.siteName}` : seo.defaultTitle,
      description: pageDescription,
      url,
      siteName: seo.siteName,
      locale: 'id_ID',
      images: [{ url: shareImage, alt: shareAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? `${title} | ${seo.siteName}` : seo.defaultTitle,
      description: pageDescription,
      images: [shareImage],
    },
  };
}
