import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { storeUrl, waLink } from '@/data/catalog';
import { getPackages, getContactSettings } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { WhatsAppStickyBar } from '@/components/whatsapp-sticky-bar';
import { createPageMetadata } from '@/lib/page-metadata';
import { PackageConsultationGuide } from '@/components/package-consultation-guide';
import { InteractivePackageMatrix } from '@/components/interactive-package-matrix';
import { HomePartnerSlider } from '@/components/home-partner-slider';
import { PackageComparisonTable } from '@/components/package-comparison-table';
import { PackageSocialProof } from '@/components/package-social-proof';
import { FranchiseVsMandiriComparison } from '@/components/franchise-vs-mandiri-comparison';
import { RoiCalculator } from '@/components/roi-calculator';
import { InteractiveRegionalMap } from '@/components/interactive-regional-map';
import { RegionalCoverageGrid } from '@/components/regional-coverage-grid';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: { absolute: 'Paket Usaha Laundry Pontianak: Mulai 16 Jt Siap Pakai dan Bonus Pelatihan Management Bisnis Laundry' },
    description: 'Pusat paket usaha laundry Pontianak mulai 16 Jt siap pakai tanpa royalti franchise. Bonus pelatihan manajemen bisnis laundry, instalasi pipa & mesin bergaransi se-Kalbar.',
    canonical: '/paket-usaha',
  });
}
export const revalidate = 60;

export default async function PaketUsaha() {
  const [packages, contact] = await Promise.all([getPackages(), getContactSettings()]);
  const contactHref = waLink('Halo My Equipment, saya sedang melihat pilihan paket usaha laundry. Mohon rekomendasikan paket yang sesuai kebutuhan saya. Sumber: halaman paket usaha.', contact.whatsapp);
  const siteUrl = getSiteUrl();

  const packageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/paket-usaha#breadcrumb`,
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
            name: 'Paket Usaha Laundry',
            item: `${siteUrl}/paket-usaha`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/paket-usaha#itemlist`,
        name: 'Pilihan Paket Usaha Laundry Tanpa Franchise My Equipment Indonesia',
        numberOfItems: packages.length,
        itemListElement: packages.map((pack, index) => {
          const numericPrice = parseInt(pack.price.replace(/[^0-9]/g, ''), 10) || 0;
          return {
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              name: `Paket Usaha Laundry ${pack.name}`,
              description: pack.desc,
              url: `${siteUrl}/paket-usaha`,
              image: pack.image
                ? pack.image.startsWith('http')
                  ? pack.image
                  : `${siteUrl}${pack.image}`
                : `${siteUrl}/images/laundry-hero.webp`,
              brand: {
                '@type': 'Brand',
                name: 'My Equipment Indonesia',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '48',
                bestRating: '5',
                worstRating: '1',
              },
              review: [
                {
                  '@type': 'Review',
                  author: {
                    '@type': 'Person',
                    name: 'Hendra Setiawan (Mitra Pontianak)',
                  },
                  datePublished: '2026-09-15',
                  reviewBody: 'Paket usaha sangat memuaskan, instalasi cepat dan teknisi membimbing SOP operasional sampai mahir tanpa dipungut biaya franchise.',
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                  },
                },
                {
                  '@type': 'Review',
                  author: {
                    '@type': 'Person',
                    name: 'Ibu Ratna Dewi (Mitra Singkawang)',
                  },
                  datePublished: '2026-10-02',
                  reviewBody: 'Pelayanan teknisi sangat responsif dan ketersediaan sparepart terjamin di Kalbar. Paket lengkap langsung bisa jualan dan BEP lebih cepat karena modal mandiri 100%.',
                  reviewRating: {
                    '@type': 'Rating',
                    ratingValue: '5',
                    bestRating: '5',
                  },
                },
              ],
              offers: {
                '@type': 'Offer',
                priceCurrency: 'IDR',
                price: numericPrice,
                validFrom: '2026-01-01',
                priceValidUntil: '2027-12-31',
                availability: 'https://schema.org/InStock',
                itemCondition: 'https://schema.org/NewCondition',
                url: `${siteUrl}/paket-usaha`,
                seller: {
                  '@type': 'Organization',
                  name: 'My Equipment Indonesia',
                  url: siteUrl,
                },
              },
            },
          };
        }),
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/paket-usaha#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Apakah ada biaya franchise, royalty fee, atau bagi hasil omset bulanan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sama sekali tidak ada. Semua paket usaha di My Equipment Indonesia bersifat 100% kepemilikan mandiri tanpa franchise fee awal atau royalti bulanan. Seluruh keuntungan bersih menjadi milik Anda dan Anda bebas menggunakan brand nama sendiri.',
            },
          },
          {
            '@type': 'Question',
            name: 'Berapa kisaran modal awal untuk membuka usaha laundry kiloan di Kalimantan Barat?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Modal awal berkisar antara Rp 15 Juta – Rp 25 Juta untuk paket pemula rumahan, Rp 35 Juta – Rp 55 Juta untuk paket komersial reguler, hingga Rp 65 Juta – Rp 120 Juta untuk paket laundry koin/self-service stack komersial.',
            },
          },
          {
            '@type': 'Question',
            name: 'Apakah paket usaha sudah mencakup pengiriman dan instalasi mesin ke luar kota Pontianak?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ya, kami melayani pengiriman dan instalasi lengkap oleh teknisi berpengalaman ke 14 kabupaten/kota di seluruh Kalimantan Barat, termasuk Singkawang, Sambas, Mempawah, Sintang, Ketapang, dan wilayah lainnya.',
            },
          },
          {
            '@type': 'Question',
            name: 'Apakah pemula yang belum pernah berbisnis laundry akan mendapatkan pelatihan operasional?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ya, setiap pembelian paket usaha sudah termasuk pelatihan SOP operasional mesin, takaran chemical laundry ramah lingkungan, teknik setrika uap boiler, dan pendampingan konsultasi manajemen gratis seumur hidup.',
            },
          },
          {
            '@type': 'Question',
            name: 'Apakah My Equipment menyediakan paket usaha laundry koin self-service dengan sistem QRIS di Kalbar?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ya, kami menyediakan paket laundromat koin dan sistem QRIS self-service digital (IoT Smartlink) menggunakan mesin komersial stack hemat tempat. Outlet laundry koin dapat berjalan autopilot tanpa ketergantungan kasir, dan 100% laba milik mitra tanpa potongan royalti.',
            },
          },
        ],
      },
      {
        '@type': 'VideoObject',
        '@id': `${siteUrl}/paket-usaha#video-workshop`,
        name: 'Showroom dan Workshop Paket Usaha Laundry My Equipment Indonesia',
        description: 'Tinjauan langsung unit mesin cuci front load, dryer gas komersial, boiler setrika uap, dan fasilitas training di showroom My Equipment Pontianak & Kubu Raya.',
        thumbnailUrl: `${siteUrl}/images/hero-showroom.webp`,
        uploadDate: '2026-10-26T09:00:00Z',
        contentUrl: 'https://www.youtube.com/watch?v=1S1MumVG5xo',
        embedUrl: 'https://www.youtube-nocookie.com/embed/1S1MumVG5xo',
      },
      {
        '@type': 'HowTo',
        '@id': `${siteUrl}/paket-usaha#howto-start`,
        name: 'Cara Memulai Usaha Laundry Kiloan Siap Pakai di Pontianak & Kalimantan Barat',
        description: 'Panduan 5 langkah praktis membuka usaha laundry kiloan atau koin tanpa franchise bersama My Equipment Indonesia.',
        totalTime: 'P7D',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'IDR',
          value: '16500000',
        },
        step: [
          {
            '@type': 'HowToStep',
            position: 1,
            name: 'Konsultasi Budget & Pemilihan Paket',
            text: 'Diskusikan estimasi modal, target kapasitas harian (kg), dan jenis layanan (kiloan rumahan atau koin) bersama tim konsultan My Equipment.',
            url: `${siteUrl}/paket-usaha#panduan`,
          },
          {
            '@type': 'HowToStep',
            position: 2,
            name: 'Perencanaan Layout & Kualitas Air',
            text: 'Tim membantu merancang denah tata letak mesin, jalur pembuangan air, cerobong gas, dan sistem filtrasi air tandon anti-gambut.',
            url: `${siteUrl}/paket-usaha`,
          },
          {
            '@type': 'HowToStep',
            position: 3,
            name: 'Pengiriman & Instalasi Teknisi',
            text: 'Unit mesin cuci komersial, dryer gas, dan boiler setrika uap dikirim dan dipasang langsung oleh teknisi resmi di lokasi ruko mitra.',
            url: `${siteUrl}/paket-usaha`,
          },
          {
            '@type': 'HowToStep',
            position: 4,
            name: 'Pelatihan SOP & Manajemen Bisnis',
            text: 'Mitra dan karyawan mendapatkan edukasi langsung penanganan noda, takaran chemical ramah lingkungan, teknik setrika cepat, dan pembukuan kasir.',
            url: `${siteUrl}/paket-usaha`,
          },
          {
            '@type': 'HowToStep',
            position: 5,
            name: 'Grand Opening & Pendampingan Purnajual',
            text: 'Outlet resmi beroperasi dengan garansi servis teknisi lokal standby dan ketersediaan suku cadang terjamin di Kalbar.',
            url: `${siteUrl}/paket-usaha`,
          },
        ],
      },

    ],
  };

  return <main className="subpage has-sticky-cta" data-page="packages">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(packageSchema).replace(/</g, '\\u003c') }}
    />
    <section className="wrap subhero">
      <span className="eyebrow">Paket Usaha Laundry Pontianak &amp; Kalbar</span>
      <h1>
        Paket Usaha Laundry Siap Pakai <br />
        <em>Mulai 16 Jt (100% Milik Anda)</em>
      </h1>
      <p>
        Paket lengkap mesin cuci front load, dryer gas komersial, dan boiler uap 100% kepemilikan mandiri tanpa franchise fee. Dapatkan 3 nilai utama resmi: <strong>Gratis Instalasi</strong>, <strong>Gratis Ongkir</strong>, dan <strong>Gratis Pelatihan Management Bisnis Laundry</strong> sampai outlet Anda siap running.
      </p>
      <div className="package-hero-actions">
        <Link className="button" href="/konsultasi">
          Konsultasi Gratis <span aria-hidden="true">&#8599;</span>
        </Link>
        <a className="button button-outline" href="#panduan">
          Bantu saya memilih <span aria-hidden="true">&#8595;</span>
        </a>
      </div>

      {/* 3 Core Value Propositions Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '16px',
          marginTop: '2.5rem',
          textAlign: 'left',
        }}
      >
        <div
          style={{
            background: '#ffffff',
            border: '2px solid #bae6fd',
            borderRadius: '14px',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 4px 16px rgba(2, 132, 199, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: '#0284c7',
                color: '#ffffff',
              }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
              </svg>
            </span>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#0369a1' }}>Gratis Instalasi</h3>
          </div>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
            Pemasangan lengkap perpipaan air, gas dryer, cerobong pembuangan hawa panas, dan kelistrikan aman langsung oleh teknisi resmi My Equipment.
          </p>
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '2px solid #bbf7d0',
            borderRadius: '14px',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 4px 16px rgba(22, 163, 74, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: '#16a34a',
                color: '#ffffff',
              }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <rect x="1" y="3" width="15" height="13" rx="2" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </span>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#166534' }}>Gratis Ongkir</h3>
          </div>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
            Pengiriman unit mesin dengan armada logistik berpengalaman berproteksi aman sampai di depan lokasi outlet Anda di Kalimantan Barat.
          </p>
        </div>

        <div
          style={{
            background: '#ffffff',
            border: '2px solid #fed7aa',
            borderRadius: '14px',
            padding: '1.25rem 1.5rem',
            boxShadow: '0 4px 16px rgba(234, 88, 12, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '34px',
                height: '34px',
                borderRadius: '8px',
                background: '#ea580c',
                color: '#ffffff',
              }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
            </span>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#c2410c' }}>Gratis Pelatihan Management</h3>
          </div>
          <p style={{ margin: 0, fontSize: '0.88rem', color: '#475569', lineHeight: 1.55 }}>
            Bimbingan operasional komprehensif: SOP cuci anti-luntur, teknik setrika cepat, SOP kasir, dan strategi pemasaran bisnis laundry sampai mandiri.
          </p>
        </div>
      </div>
    </section>

    {/* Direct Answer Box for AI Overviews, GEO, and Quick Skimming */}
    <section className="wrap aio-direct-answer-section" aria-label="Ringkasan Cepat Paket Usaha Laundry">
      <div className="aio-summary-card">
        <div className="aio-summary-header">
          <span className="aio-badge">Ringkasan Cepat / AI Overview</span>
          <h2>Pertanyaan Kunci Seputar Paket Usaha Laundry Pontianak</h2>
        </div>
        <div className="aio-facts-grid">
          <div className="aio-fact-item">
            <span className="aio-fact-q">Berapa modal awal minimal?</span>
            <p className="aio-fact-a">Mulai dari <strong>Rp 16,5 Juta</strong> siap pakai (1 Washer Heavy Duty + 1 Dryer Gas LPG + Boiler Uap + Starter Chemical). Bisa dimulai dari rumah sendiri tanpa biaya sewa ruko.</p>
          </div>
          <div className="aio-fact-item">
            <span className="aio-fact-q">Apakah ada royalti franchise?</span>
            <p className="aio-fact-a"><strong>0% Biaya Franchise &amp; 0% Royalti Bulanan</strong>. 100% omset dan laba bersih menjadi milik Anda seutuhnya, bebas menggunakan nama toko sendiri.</p>
          </div>
          <div className="aio-fact-item">
            <span className="aio-fact-q">Apakah dapat pelatihan &amp; bimbingan?</span>
            <p className="aio-fact-a"><strong>Ya, gratis seumur hidup</strong>. Termasuk pelatihan SOP mencuci anti-luntur, teknik setrika uap cepat, pencegahan noda, dan pendampingan manajemen bisnis.</p>
          </div>
          <div className="aio-fact-item">
            <span className="aio-fact-q">Bagaimana jangkauan pengiriman &amp; servis?</span>
            <p className="aio-fact-a">Teknisi resmi melayani pengiriman, perakitan pipa, dan instalasi cerobong gas ke <strong>seluruh 14 kabupaten/kota di Kalimantan Barat</strong> dengan jaminan suku cadang lokal.</p>
          </div>
          <div className="aio-fact-item">
            <span className="aio-fact-q">Apakah tersedia sistem Laundry Koin &amp; QRIS?</span>
            <p className="aio-fact-a"><strong>Tersedia lengkap</strong>. Paket laundromat koin self-service stack hemat ruang dan sistem IoT QRIS digital autopilot. Pelanggan bayar mandiri, pemilik pantau omzet dari smartphone tanpa pusing kasir.</p>
          </div>
        </div>
      </div>
    </section>

    <div className="wrap"><PackageConsultationGuide packages={packages.map(({ name, price }) => ({ name, price }))} whatsapp={contact.whatsapp} /></div>
    <section className="wrap package-grid subpackage" aria-label="Pilihan paket usaha">
      {packages.length ? packages.map((pack, index) => <article className={`package-card ${index === 2 ? 'featured' : ''}`} key={pack.name}>
        <div className="package-image">{pack.image ? <Image src={pack.image} alt={`Paket Usaha Laundry ${pack.name} - My Equipment Pontianak Kalimantan Barat`} fill sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 280px" /> : <span className="package-image-placeholder">Foto paket belum tersedia</span>}</div>
        <span className="package-label">{pack.label}</span><h2>Paket {pack.name}</h2><p>{pack.desc}</p>
        <ul>{pack.points.map((point) => <li key={point}><span aria-hidden="true">✓</span>{point}</li>)}</ul>
        <div className="package-price"><small>Harga indikatif katalog*</small><b>{pack.price}</b></div>
        <Link href={waLink(`Halo My Equipment, saya tertarik dengan Paket ${pack.name}. Mohon rincian dan harga terbaru.`, contact.whatsapp)} className="button button-block" target="_blank" rel="noreferrer">Tanya detail paket <span aria-hidden="true">↗</span></Link>
      </article>) : <div className="empty-state"><h2>Informasi paket sedang diperbarui</h2><p>Hubungi tim untuk mendiskusikan perlengkapan sesuai rencana usaha Anda.</p><Link className="button" href="/konsultasi">Konsultasi kebutuhan</Link></div>}
    </section>
    <p className="wrap note">*Harga dan isi paket berasal dari referensi katalog, bukan sinkronisasi langsung. Pastikan rincian dan harga terbaru kepada tim.</p>

    {/* Semantic Comparison Table for Google AI Overviews and Search */} 
    <PackageComparisonTable whatsapp={contact.whatsapp} />

    {/* Head-to-Head Comparison: Mandiri vs Franchise */}
    <FranchiseVsMandiriComparison whatsapp={contact.whatsapp} sourceContext="halaman paket usaha" />

    {/* Interactive BEP & ROI Profit Simulator */}
    <div style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
      <RoiCalculator whatsapp={contact.whatsapp} />
    </div>

    {/* Lead Magnet: Download Brosur & Proposal Resmi */}
    <section className="wrap home-lead-magnet-card" data-reveal>
      <div className="lead-magnet-content">
        <div className="lead-magnet-copy">
          <div className="lead-magnet-eyebrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>DOKUMEN RESMI 2026</span>
          </div>
          <h2 className="lead-magnet-title">
            Butuh Proposal Resmi untuk Pengajuan Modal atau Rekanan?
          </h2>
          <p className="lead-magnet-desc">
            Buka dokumen proposal penawaran paket usaha laundry mandiri My Equipment Indonesia (mencakup rincian mesin heavy duty, estimasi modal, dan jaminan 100% tanpa royalti) dalam format PDF siap cetak.
          </p>
        </div>
        <div className="lead-magnet-actions">
          <Link
            href="/paket-usaha/proposal"
            className="lead-magnet-btn-primary"
          >
            <span>Buka Proposal PDF</span>
            <span aria-hidden="true">↗</span>
          </Link>
          <a
            href={waLink('Halo My Equipment Indonesia, saya ingin meminta file PDF Proposal dan Brosur Resmi Paket Usaha Laundry 2026.', contact.whatsapp)}
            target="_blank"
            rel="noreferrer"
            className="lead-magnet-btn-wa"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
            </svg>
            <span>Minta via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>

    {/* Interactive Package Comparison Matrix */}
    <div className="wrap" data-reveal>
      <InteractivePackageMatrix packages={packages} whatsapp={contact.whatsapp} />
    </div>

    {/* Brand Partners Showcase */}
    <HomePartnerSlider />

    {/* Real Outlets Social Proof & Educational Cluster Guides */}
    <PackageSocialProof />

    {/* Video Tour Showroom & Workshop */}
    <section className="wrap home-video-showcase" style={{ margin: '3.5rem auto' }} data-reveal>
      <div className="section-title">
        <div>
          <span className="eyebrow">DOKUMENTASI SHOWROOM & WORKSHOP</span>
          <h2>Kunjungi Workshop & Showroom Resmi di Kalbar</h2>
        </div>
        <p>Lihat langsung unit mesin cuci front-load, dryer komersial Speed Queen & Maytag, boiler setrika uap, serta fasilitas training operasional kami.</p>
      </div>
      <div className="video-card" style={{ maxWidth: '900px', margin: '0 auto', borderRadius: '18px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}>
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
          <iframe
            src="https://www.youtube-nocookie.com/embed/1S1MumVG5xo?rel=0"
            title="Video Profil Workshop dan Showroom My Equipment Pontianak"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>

    {/* Regional Coverage Interactive Map */}
    <div style={{ marginTop: '3.5rem', marginBottom: '2.5rem' }}>
      <InteractiveRegionalMap whatsapp={contact.whatsapp} />
    </div>

    {/* Regional Coverage 14-City Semantic Hub Grid */}
    <RegionalCoverageGrid whatsapp={contact.whatsapp} />

    <section className="wrap home-faq" aria-label="Pertanyaan umum seputar paket usaha" style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
      <div className="section-title">
        <div>
          <span className="eyebrow">TANYA JAWAB UMUM</span>
          <h2>Pertanyaan Seputar Paket Usaha</h2>
        </div>
        <p>Hal yang paling sering ditanyakan calon mitra sebelum memulai usaha laundry mandiri.</p>
      </div>
      <div className="home-faq-list">
        <details>
          <summary>Apakah ada biaya franchise, royalty fee, atau bagi hasil omset bulanan?<span aria-hidden="true">+</span></summary>
          <p><strong>Sama sekali tidak ada.</strong> Semua paket usaha di My Equipment bersifat kepemilikan mandiri 100%. Seluruh omset dan keuntungan bersih menjadi milik Anda seutuhnya, dan Anda bebas menentukan nama brand laundry sendiri tanpa ikatan royalti.</p>
        </details>
        <details>
          <summary>Berapa kisaran modal awal untuk membuka usaha laundry kiloan di Kalimantan Barat?<span aria-hidden="true">+</span></summary>
          <p>Modal awal bervariasi mulai dari <strong>Rp 15 Juta – Rp 25 Juta</strong> untuk paket pemula rumahan (Pra-Starting), <strong>Rp 35 Juta – Rp 55 Juta</strong> untuk paket reguler komersial, hingga <strong>Rp 65 Juta – Rp 120 Juta</strong> untuk paket laundry koin/self-service modern.</p>
        </details>
        <details>
          <summary>Apakah paket usaha sudah mencakup pengiriman dan instalasi mesin ke luar kota Pontianak?<span aria-hidden="true">+</span></summary>
          <p><strong>Ya, mencakup seluruh 14 kabupaten/kota se-Kalbar.</strong> Tim logistik dan teknisi kami mengantar mesin langsung ke lokasi Anda (Singkawang, Sambas, Sintang, Ketapang, dll.) serta melakukan instalasi perpipaan, cerobong gas boiler, kelistrikan, dan uji coba mesin sampai beroperasi normal.</p>
        </details>
        <details>
          <summary>Apakah saya yang masih pemula akan diajari cara mengoperasikan mesin dan manajemen usaha?<span aria-hidden="true">+</span></summary>
          <p><strong>Ya, ada pelatihan dan pendampingan gratis seumur hidup.</strong> Setiap mitra mendapatkan training operasional mesin, takaran chemical ramah lingkungan, teknik setrika uap boiler, hingga konsultasi strategi promosi dan penetapan harga jual per kilogram.</p>
        </details>
      </div>
    </section>

    <section className="wrap catalog-bottom-cta"><div><span className="eyebrow">Butuh bantuan memilih?</span><h2>Rencanakan perlengkapan bersama tim.</h2><p>Diskusikan skala kebutuhan dan daftar peralatan awal melalui konsultasi.</p></div><Link className="button button-light" href={waLink(undefined, contact.whatsapp)} target="_blank" rel="noreferrer">Hubungi WhatsApp <span aria-hidden="true">↗</span></Link></section>
    <div className="wrap subbottom"><Link className="button button-outline" href="/produk">Lihat katalog produk</Link><Link className="button" href={storeUrl} target="_blank" rel="noreferrer">Toko resmi <span aria-hidden="true">↗</span></Link></div>
    <WhatsAppStickyBar href={contactHref} label="Konsultasikan paket usaha" context="Pilihan paket laundry" />
  </main>;
}
