import type { Metadata } from 'next';
import '@fontsource-variable/plus-jakarta-sans';
import './globals.css';
import './interactions.css';
import './package-guide.css';
import { SiteFooter, SiteHeader } from '@/components/site-chrome';
import { SiteChromeSwitch } from '@/components/site-chrome-switch';
import { WhatsAppFloatingToggle } from '@/components/whatsapp-floating-toggle';
import { ScrollRevealController } from '@/components/scroll-reveal-controller';
import { getContactSettings, getSeoSettings } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoSettings();
  const siteUrl = getSiteUrl();
  return {
    metadataBase: new URL(siteUrl),
    title: { default: seo.defaultTitle, template: `%s | ${seo.siteName}` },
    description: seo.description,
    alternates: { canonical: '/' },
    openGraph: { title: seo.defaultTitle, description: seo.description, url: siteUrl, siteName: seo.siteName, locale: 'id_ID', type: 'website', images: [{ url: seo.socialImage, alt: seo.socialImageAlt }] },
    twitter: { card: 'summary_large_image', title: seo.defaultTitle, description: seo.description, images: [seo.socialImage] },
  };
}
export const dynamic = 'force-dynamic';
export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [contact,seo] = await Promise.all([getContactSettings(),getSeoSettings()]);
  const siteUrl = getSiteUrl();
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: seo.siteName,
    url: siteUrl,
    email: contact.email,
    telephone: contact.phone,
    contactPoint: [{ '@type': 'ContactPoint', telephone: contact.phone, contactType: 'customer service', availableLanguage: ['Indonesian'] }],
  };
  return <html lang="id"><body><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization).replace(/</g, '\\u003c') }} /><ScrollRevealController /><a className="skip-to-content" href="#main-content">Lewati ke konten utama</a><SiteChromeSwitch header={<SiteHeader contact={contact}/>} footer={<SiteFooter contact={contact} />} floatingCta={<WhatsAppFloatingToggle contact={contact} />}><div id="main-content" tabIndex={-1}>{children}</div></SiteChromeSwitch></body></html>;
}
