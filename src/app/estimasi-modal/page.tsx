import type { Metadata } from 'next';
import Link from 'next/link';
import { EstimateForm } from '@/components/interactive-forms';
import { InteractiveRoiCalculator } from '@/components/interactive-roi-calculator';
import { getProducts, getContactSettings } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Simulasi & Estimasi Modal Usaha Laundry Kiloan Kalbar',
    description:
      'Kalkulator simulasi estimasi modal awal buka usaha laundry kiloan di Pontianak & Kalimantan Barat. Hitung kebutuhan mesin cuci, dryer, boiler, dan perlengkapan secara transparan.',
    canonical: '/estimasi-modal',
  });
}

export const dynamic = 'force-dynamic';

export default async function EstimasiModalPage() {
  const [products, contact] = await Promise.all([getProducts(), getContactSettings()]);
  const siteUrl = getSiteUrl();

  const estimatorSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/estimasi-modal#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda',
            item: `${siteUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Layanan & Konsultasi',
            item: `${siteUrl}/layanan`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Kalkulator Simulasi Modal Laundry',
            item: `${siteUrl}/estimasi-modal`,
          },
        ],
      },
      {
        '@type': 'WebApplication',
        '@id': `${siteUrl}/estimasi-modal#app`,
        name: 'Kalkulator Simulasi Modal Usaha Laundry Kalbar',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        url: `${siteUrl}/estimasi-modal`,
        description:
          'Kalkulator interaktif simulasi estimasi modal awal buka usaha laundry kiloan di Pontianak & Kalimantan Barat.',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'IDR',
        },
      },
    ],
  };

  return (
    <main className="subpage has-sticky-cta estimator-modern-page" data-page="estimator">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(estimatorSchema).replace(/</g, '\\u003c') }}
      />
      {/* Breadcrumb Navigation */}
      <div className="wrap">
        <div className="breadcrumb-nav">
          <Link href="/">Beranda</Link>
          <span aria-hidden="true">›</span>
          <Link href="/layanan">Layanan</Link>
          <span aria-hidden="true">›</span>
          <span>Kalkulator Modal</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="wrap estimator-modern-hero">
        <div className="estimator-hero-left">
          <span className="eyebrow">Simulasi Biaya & Potensi Usaha</span>
          <h1>
            Kalkulator Modal & <br />
            <em>Potensi Omset Laundry.</em>
          </h1>
          <p>
            Hitung estimasi modal awal, potensi omzet bulanan, dan proyeksi balik modal (BEP) berdasarkan pilihan skala usaha, kapasitas mesin cuci & pengering, serta perlengkapan pendukung yang Anda butuhkan.
          </p>
        </div>

        <div className="estimator-hero-alert">
          <div className="estimator-alert-icon" aria-hidden="true">ℹ️</div>
          <p>
            Simulasi ini membantu Anda memperkirakan kebutuhan modal awal peralatan dan proyeksi omzet. Hasil estimasi bersifat indikatif dan disesuaikan dengan rata-rata mitra di Kalbar.
          </p>
        </div>
      </section>

      {/* Section 1: Interactive ROI & Business Calculator */}
      <section className="wrap estimator-section" aria-label="Kalkulator Potensi Omset dan Balik Modal">
        <InteractiveRoiCalculator whatsapp={contact.whatsapp} />
      </section>

      {/* Section 2: Detailed Itemized Equipment Selector from Catalog */}
      <section className="wrap estimator-section" style={{ marginTop: '20px' }}>
        <div className="estimator-section-divider">
          <span>ATAU PILIH PERLENGKAPAN SATUAN DARI KATALOG</span>
        </div>
        <EstimateForm products={products} whatsapp={contact.whatsapp} />
      </section>
    </main>
  );
}
