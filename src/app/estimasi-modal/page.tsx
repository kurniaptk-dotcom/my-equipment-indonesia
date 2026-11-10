import type { Metadata } from 'next';
import Link from 'next/link';
import { EstimateForm } from '@/components/interactive-forms';
import { RoiCalculator } from '@/components/roi-calculator';
import { FranchiseVsMandiriComparison } from '@/components/franchise-vs-mandiri-comparison';
import { getProducts, getContactSettings } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Kalkulator & Estimasi Modal Usaha Laundry Kiloan Pontianak Kalbar: Rincian Biaya Mulai 16 Jt',
    description:
      'Kalkulator simulasi modal usaha laundry kiloan di Pontianak & Kalimantan Barat. Rincian biaya mesin cuci komersial, dryer gas, setrika boiler, & instalasi teknisi lengkap.',
    canonical: '/estimasi-modal',
  });
}

export const dynamic = 'force-dynamic';

export default async function EstimasiModalPage() {
  const [products, contact] = await Promise.all([getProducts(), getContactSettings()]);
  const siteUrl = getSiteUrl();

  const estimatorFaqs = [
    {
      q: 'Berapa modal awal minimal untuk membuka usaha laundry kiloan di Kalimantan Barat?',
      a: 'Modal awal membuka usaha laundry kiloan di Kalimantan Barat berkisar antara Rp 16,5 Juta untuk skala pemula (Paket Pra-Starting), Rp 26,5 Juta untuk skala komersial reguler (kapasitas 60–80 kg/hari), hingga Rp 70 Juta+ untuk laundromat koin self-service. Biaya ini sudah mencakup mesin cuci komersial front-load, pengering dryer konversi gas hemat daya, setrika uap boiler, instalasi perpipaan teknisi, dan bahan chemical awal.',
    },
    {
      q: 'Berapa lama estimasi balik modal (BEP / Break Even Point) usaha laundry kiloan di Kalbar?',
      a: 'Dengan rata-rata volume cucian 40–60 kg per hari dan tarif cuci setrika Rp 7.000–Rp 9.000 per kg di Kalbar, margin keuntungan bersih berkisar antara 45%–55%. Estimasi balik modal (BEP) modal peralatan biasanya tercapai dalam waktu 4 hingga 8 bulan operasional aktif.',
    },
    {
      q: 'Apakah kalkulator estimasi modal ini sudah termasuk biaya instalasi dan teknisi?',
      a: 'Ya, seluruh paket rekomendasi My Equipment sudah termasuk survei kelayakan lokasi ruko, pemasangan instalasi pipa air & gas, cerobong hawa panas, serta pelatihan SOP operasional langsung oleh teknisi resmi kami di lokasi Anda.',
    },
  ];

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
          validFrom: '2026-01-01',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/estimasi-modal#faq`,
        mainEntity: estimatorFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
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
          <span className="eyebrow">Simulasi Biaya Perlengkapan</span>
          <h1>
            Kalkulator Modal <br />
            <em>Usaha Laundry.</em>
          </h1>
          <p>
            Hitung estimasi modal awal berdasarkan pilihan skala usaha, kapasitas mesin cuci & pengering, serta perlengkapan pendukung yang Anda butuhkan secara transparan.
          </p>
        </div>

        <div className="estimator-hero-alert">
          <div className="estimator-alert-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
          </div>
          <p>
            Simulasi ini membantu Anda memperkirakan kebutuhan modal awal peralatan. Hasil estimasi bersifat indikatif dan disesuaikan dengan ketersediaan ruang ruko atau rumah Anda di Kalimantan Barat.
          </p>
        </div>
      </section>

      {/* Direct Entity Answer Section for AI Overview */}
      <section className="wrap" style={{ marginBottom: '2rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdf4 100%)',
            border: '2px solid #86efac',
            borderRadius: '16px',
            padding: '1.5rem 1.75rem',
            boxShadow: '0 4px 16px rgba(22, 163, 74, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '28px',
                height: '28px',
                borderRadius: '8px',
                background: '#16a34a',
                color: '#ffffff',
              }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#166534', margin: 0 }}>
              Rincian Standar Modal Awal Usaha Laundry Kiloan di Kalimantan Barat
            </h2>
          </div>
          <p style={{ margin: '0 0 0.85rem 0', color: '#334155', fontSize: '0.925rem', lineHeight: 1.6 }}>
            Untuk membuka usaha laundry kiloan mandiri di wilayah Kalimantan Barat (Pontianak, Kubu Raya, Singkawang, Ketapang, Sintang, dll), estimasi modal peralatan siap operasional terbagi dalam 3 kategori: <strong>Paket Pra-Starting Rumahan</strong> (Rp 16,5 Juta), <strong>Paket Starting Komersial 2 Washer + 2 Dryer</strong> (Rp 26,5 Juta), dan <strong>Paket Koin Self-Service Stack</strong> (Rp 70 Juta+). Seluruh paket bebas biaya franchise / royalti omzet bulanan.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.825rem' }}>
            <Link href="/artikel/estimasi-balik-modal-usaha-laundry-kalbar" style={{ color: '#16a34a', fontWeight: 700, textDecoration: 'underline' }}>
              Baca Simulasi Balik Modal (BEP) Lengkap →
            </Link>
            <Link href="/paket-usaha/proposal" style={{ color: '#0284c7', fontWeight: 700, textDecoration: 'underline' }}>
              Unduh Dokumen Proposal Resmi (PDF) ↗
            </Link>
          </div>
        </div>
      </section>

      {/* Estimator Section */}
      <section className="wrap estimator-section">
        <EstimateForm products={products} whatsapp={contact.whatsapp} />
      </section>

      {/* Interactive Profit & BEP Simulator */}
      <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
        <RoiCalculator whatsapp={contact.whatsapp} />
      </div>

      {/* Head-to-Head Comparison: Mandiri vs Franchise */}
      <FranchiseVsMandiriComparison whatsapp={contact.whatsapp} sourceContext="halaman estimasi modal" />

      {/* FAQ Section */}
      <section className="wrap home-faq" aria-label="FAQ Estimasi Modal Usaha" style={{ marginTop: '3rem', marginBottom: '4rem' }}>
        <div className="section-title">
          <div>
            <span className="eyebrow">TANYA JAWAB MODAL</span>
            <h2>Pertanyaan Seputar Modal & Biaya Buka Laundry</h2>
          </div>
          <p>Informasi transparan mengenai kebutuhan investasi dan potensi omset laundry di Kalbar.</p>
        </div>

        <div className="home-faq-list">
          {estimatorFaqs.map((faq, index) => (
            <details key={faq.q} open={index === 0}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
