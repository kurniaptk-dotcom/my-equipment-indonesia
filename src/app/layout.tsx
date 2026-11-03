import type { Metadata } from 'next';
import Script from 'next/script';
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
  const rawImage = seo.socialImage || '/images/laundry-hero.webp';
  const shareImage = rawImage.startsWith('http')
    ? rawImage
    : `${siteUrl}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: seo.defaultTitle, template: `%s | ${seo.siteName}` },
    description: seo.description,
    alternates: { canonical: '/' },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: '32x32' },
        { url: '/icon.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    },
    openGraph: {
      title: seo.defaultTitle,
      description: seo.description,
      url: siteUrl,
      siteName: seo.siteName,
      locale: 'id_ID',
      type: 'website',
      images: [
        {
          url: shareImage,
          width: 1200,
          height: 630,
          alt: seo.socialImageAlt || 'My Equipment Indonesia - Paket Usaha Laundry Kalbar',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.defaultTitle,
      description: seo.description,
      images: [shareImage],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '9LZSXdw2_owOFj19lQgCoh88ytlk0Bize26Wx29mz64',
    },
  };
}
export const dynamic = 'force-dynamic';
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-TZNB85PVLX';

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [contact,seo] = await Promise.all([getContactSettings(),getSeoSettings()]);
  const siteUrl = getSiteUrl();
  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `${siteUrl}/#localbusiness`,
        name: `${seo.siteName} - Pusat Mesin & Paket Usaha Laundry Kalbar`,
        alternateName: ['My Equipment', 'My Equipment Indonesia Corp', 'Pusat Mesin Laundry Kalbar', 'My Equipment Indonesia'],
        url: siteUrl,
        hasMap: 'https://www.google.com/maps/place/My+Equipment+Indonesia+Corp/@-0.1018164,109.3939182,17z/data=!3m1!4b1!4m6!3m5!1s0x2e1d5182504320b9:0x822c17173bbad83c!8m2!3d-0.1018218!4d109.3964931!16s%2Fg%2F11xmdvxx0_',
        logo: `${siteUrl}/images/brand-logo.png`,
        image: `${siteUrl}/images/laundry-hero.webp`,
        description: seo.description,
        telephone: contact.phone,
        email: contact.email,
        priceRange: 'Rp 10.000.000 - Rp 150.000.000',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Jl. Adi Sucipto Perum. Teluk Mulus B No.33, Sungai Raya',
          addressLocality: 'Kubu Raya',
          addressRegion: 'Kalimantan Barat',
          postalCode: '78391',
          addressCountry: 'ID',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: -0.1018218,
          longitude: 109.3964931,
        },
        areaServed: [
          'Pontianak',
          'Kubu Raya',
          'Singkawang',
          'Sambas',
          'Mempawah',
          'Sintang',
          'Ketapang',
          'Sanggau',
          'Sekadau',
          'Landak',
          'Melawi',
          'Kayong Utara',
          'Kapuas Hulu',
          'Bengkayang',
          'Kalimantan Barat',
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            opens: '08:00',
            closes: '21:00',
          },
        ],
        sameAs: [
          'https://www.instagram.com/pusat.mesin.laundry.kalbar/',
          'https://www.youtube.com/@ShortMQIndonesia',
          'https://www.facebook.com/pusatmesinlaundrykalbar',
          'https://www.facebook.com/profile.php?id=61591805407368',
          'https://www.google.com/maps/place/My+Equipment+Indonesia+Corp/@-0.1018164,109.3939182,17z/data=!3m1!4b1!4m6!3m5!1s0x2e1d5182504320b9:0x822c17173bbad83c!8m2!3d-0.1018218!4d109.3964931!16s%2Fg%2F11xmdvxx0_',
        ],
      },
      {
        '@type': 'Organization',
        '@id': `${siteUrl}/#organization`,
        name: seo.siteName,
        url: siteUrl,
        email: contact.email,
        telephone: contact.phone,
        sameAs: [
          'https://www.instagram.com/pusat.mesin.laundry.kalbar/',
          'https://www.youtube.com/@ShortMQIndonesia',
          'https://www.facebook.com/pusatmesinlaundrykalbar',
          'https://www.facebook.com/profile.php?id=61591805407368',
          'https://www.google.com/maps/place/My+Equipment+Indonesia+Corp/@-0.1018164,109.3939182,17z/data=!3m1!4b1!4m6!3m5!1s0x2e1d5182504320b9:0x822c17173bbad83c!8m2!3d-0.1018218!4d109.3964931!16s%2Fg%2F11xmdvxx0_',
        ],
        contactPoint: [
          {
            '@type': 'ContactPoint',
            telephone: contact.phone,
            contactType: 'customer service',
            availableLanguage: ['Indonesian'],
          },
        ],
      },
    ],
  };
  return (
    <html lang="id">
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });

            // Otomatis melacak setiap klik menuju WhatsApp
            document.addEventListener('click', function(e) {
              var target = e.target && e.target.closest ? e.target.closest('a') : null;
              if (target && target.href && (target.href.indexOf('wa.me') !== -1 || target.href.indexOf('whatsapp.com') !== -1)) {
                if (typeof gtag === 'function') {
                  gtag('event', 'whatsapp_lead_click', {
                    event_category: 'conversion',
                    event_label: target.innerText ? target.innerText.trim() : (target.getAttribute('title') || 'WhatsApp Link'),
                    link_url: target.href,
                    page_location: window.location.href
                  });
                }
              }
            });
          `}
        </Script>
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph).replace(/</g, '\\u003c') }} />
        <ScrollRevealController />
        <a className="skip-to-content" href="#main-content">Lewati ke konten utama</a>
        <SiteChromeSwitch header={<SiteHeader contact={contact}/>} footer={<SiteFooter contact={contact} />} floatingCta={<WhatsAppFloatingToggle contact={contact} />}>
          <div id="main-content" tabIndex={-1}>{children}</div>
        </SiteChromeSwitch>
      </body>
    </html>
  );
}
