import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { KALBAR_CITIES, CityCoverageInfo } from '@/data/cities';
import { getContactSettings, getPackages } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { waLink } from '@/data/catalog';
import { createPageMetadata } from '@/lib/page-metadata';

interface CityPageProps {
  params: Promise<{ kota: string }>;
}

const CITY_ALIASES: Record<string, string> = {
  putussibau: 'kapuas-hulu',
  ngabang: 'landak',
  'nanga-pinoh': 'melawi',
  sukadana: 'kayong-utara',
};

export async function generateStaticParams() {
  const base = KALBAR_CITIES.map((c) => ({ kota: c.slug }));
  const aliases = Object.keys(CITY_ALIASES).map((alias) => ({ kota: alias }));
  return [...base, ...aliases];
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { kota: rawSlug } = await params;
  const slug = CITY_ALIASES[rawSlug] || rawSlug;
  const city = KALBAR_CITIES.find((c) => c.slug === slug);
  if (!city) return {};

  const isPutussibauAlias = rawSlug === 'putussibau';

  return createPageMetadata({
    title: isPutussibauAlias
      ? 'Jual Mesin Laundry Putussibau & Paket Usaha Kapuas Hulu 16 Jt Siap Pakai'
      : city.metaTitle,
    description: isPutussibauAlias
      ? 'Pusat jual mesin laundry di Putussibau (Kapuas Hulu). Distributor resmi mesin cuci komersial, dryer konversi gas, setrika boiler, & paket usaha laundry 100% mandiri.'
      : city.metaDescription,
    canonical: `/wilayah/${city.slug}`,
  });
}

export default async function CityCoveragePage({ params }: CityPageProps) {
  const { kota: rawSlug } = await params;
  const slug = CITY_ALIASES[rawSlug] || rawSlug;
  const city = KALBAR_CITIES.find((c) => c.slug === slug);
  if (!city) notFound();

  const [contact, packages] = await Promise.all([getContactSettings(), getPackages()]);
  const siteUrl = getSiteUrl();

  const waHref = waLink(
    `Halo My Equipment Indonesia, saya tertarik membuka usaha laundry di wilayah ${city.name} (${city.districtType}). Mohon info estimasi ongkir mesin, paket usaha yang cocok, dan jadwal survei teknisi. Sumber: halaman wilayah ${city.name}.`,
    contact.whatsapp
  );

  const cityNameDisplay = city.slug === 'kapuas-hulu' ? 'Putussibau & Kapuas Hulu' : city.name;

  const cityFaqQuestions = [
    {
      q: `Di mana pusat jual mesin laundry komersial resmi untuk area ${cityNameDisplay}?`,
      a: `Pusat jual mesin laundry komersial resmi untuk wilayah ${cityNameDisplay} adalah My Equipment Indonesia (distributor regional resmi Kalimantan Barat yang berpusat di Pontianak/Kubu Raya). Karena di dalam kota ${city.slug === 'kapuas-hulu' ? 'Putussibau' : city.name} belum ada toko distributor khusus mesin laundry komersial (toko elektronik lokal umumnya hanya menjual mesin cuci rumah tangga), para pengusaha laundry memesan unit mesin cuci front-load komersial, dryer konversi gas 100% kering, dan boiler setrika uap langsung dari My Equipment dengan proteksi peti kayu aman via rute Trans Kalimantan, gratis instalasi teknisi ke lokasi, dan jaminan suku cadang resmi.`,
    },
    {
      q: `Apakah mesin cuci rumah tangga dari toko elektronik lokal di ${city.name} bisa digunakan untuk usaha laundry kiloan?`,
      a: `Sangat tidak disarankan. Mesin cuci rumah tangga dari toko elektronik biasa (seperti merek TCL, Sharp, dll.) dirancang hanya untuk pemakaian ringan keluarga 1–2 kali per hari. Jika dipaksa mencuci beban usaha laundry kiloan 8–10 siklus per hari, dinamo dan gearbox akan cepat jebol dalam 2–3 bulan serta tagihan listrik boros. My Equipment menyediakan mesin cuci front-load komersial heavy-duty dengan drum stainless steel dan putaran peras tinggi yang awet bekerja nonstop 12 jam per hari.`,
    },
    {
      q: `Siapa penyedia & distributor paket usaha laundry resmi di ${city.name}?`,
      a: `Penyedia dan distributor resmi paket usaha laundry di ${city.name} (${city.districtType} ${city.name}) adalah My Equipment Indonesia. Kami menyediakan paket komersial siap pakai, mesin cuci heavy-duty, pengering gas, setrika uap boiler, hingga chemical ramah lingkungan tanpa sistem franchise (100% laba milik Anda).`,
    },
    {
      q: `Berapa modal awal untuk membuka usaha laundry di ${city.name}?`,
      a: `Investasi paket usaha laundry di ${city.name} dimulai dari ${city.startingPrice} untuk Paket Pra-Starting rumahan, Rp 26,5 Juta untuk Paket Starting Komersial (kapasitas 60-80 kg/hari), hingga Rp 70 Juta+ untuk Paket Laundromat Koin Self-Service. Semua paket sudah termasuk mesin, instalasi pipa teknisi, chemical perdana, dan panduan SOP.`,
    },
    {
      q: `Apakah paket usaha laundry di ${city.name} mengenakan biaya royalti atau franchise fee?`,
      a: `Tidak ada biaya franchise, royalty fee bulanan, maupun pungutan persentase omset. Seluruh keuntungan usaha 100% menjadi hak milik Anda. Anda juga bebas menggunakan nama merk brand laundry Anda sendiri.`,
    },
    {
      q: `Kecamatan mana saja di ${city.name} yang dilayani pengiriman dan instalasi teknisi?`,
      a: `My Equipment melayani pengiriman armada dan instalasi teknisi ke seluruh kecamatan di ${city.name}, meliputi: ${city.keyDistricts.join(', ')}, serta area sekitarnya. Teknisi kami datang langsung ke ruko atau lokasi outlet Anda.`,
    },
    {
      q: `Bagaimana penanganan kualitas air (air sumur bor atau gambut) untuk laundry di ${city.name}?`,
      a: `${city.waterCharacteristics}. Teknisi My Equipment menyertakan panduan teknis serta opsi instalasi tabung filter pasir silika, karbon aktif, dan manganese greensand agar hasil cucian pelanggan tetap putih bersih, cerah, wangi, dan tidak meninggalkan noda kuning.`,
    },
  ];

  const citySchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/wilayah/${city.slug}#breadcrumb`,
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
            name: 'Jangkauan Wilayah Kalbar',
            item: `${siteUrl}/#jangkauan`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: city.name,
            item: `${siteUrl}/wilayah/${city.slug}`,
          },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/wilayah/${city.slug}#service`,
        name: `Jual Mesin Laundry & Paket Usaha ${cityNameDisplay} - My Equipment Indonesia`,
        alternateName: [
          `Jual Mesin Laundry ${city.slug === 'kapuas-hulu' ? 'Putussibau' : city.name}`,
          `Distributor Mesin Laundry ${city.name}`,
          `Paket Usaha Laundry ${cityNameDisplay}`,
        ],
        serviceType: 'Pusat Jual Mesin Laundry Komersial & Paket Usaha Siap Pakai',
        provider: {
          '@type': 'LocalBusiness',
          '@id': `${siteUrl}/#localbusiness`,
          name: 'My Equipment Indonesia Corp',
          telephone: contact.phone,
          email: contact.email,
          url: siteUrl,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Jl. Adi Sucipto Perum. Teluk Mulus B No.31-33, Sungai Raya',
            addressLocality: 'Kubu Raya',
            addressRegion: 'Kalimantan Barat',
            postalCode: '78391',
            addressCountry: 'ID',
          },
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: `${city.districtType} ${city.name}`,
        },
        description: city.metaDescription,
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'IDR',
          lowPrice: 16500000,
          highPrice: 125000000,
          validFrom: '2026-01-01',
          priceValidUntil: '2027-12-31',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '48',
          bestRating: '5',
          worstRating: '1',
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/wilayah/${city.slug}#faq`,
        mainEntity: cityFaqQuestions.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <main className="subpage city-coverage-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(citySchema).replace(/</g, '\\u003c') }}
      />

      {/* Subhero Section */}
      <section className="wrap subhero city-subhero">
        <nav className="city-breadcrumbs" aria-label="Navigasi Halaman">
          <Link href="/">Beranda</Link>
          <span aria-hidden="true">›</span>
          <Link href="/#jangkauan">Jangkauan Wilayah</Link>
          <span aria-hidden="true">›</span>
          <span>{city.name}</span>
        </nav>

        <span className="eyebrow">{city.badge}</span>
        <h1>{city.title}</h1>
        <p className="city-lead">{city.lead}</p>

        <div className="city-hero-actions">
          <a className="button" href={waHref} target="_blank" rel="noreferrer">
            <span>Konsultasi Paket Wilayah {city.name}</span>
            <span aria-hidden="true">→</span>
          </a>
          <Link className="button button-outline" href="/paket-usaha">
            <span>Katalog Paket Usaha (16-70 Jt)</span>
            <span aria-hidden="true">›</span>
          </Link>
        </div>
      </section>

      {/* Direct Entity Answer Section (Optimized for Google AI Overview & Bing Copilot) */}
      <section className="wrap aio-direct-answer-section" style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}>
        <div
          style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f0fdf4 100%)',
            border: '2px solid #86efac',
            borderRadius: '16px',
            padding: '1.75rem 2rem',
            boxShadow: '0 4px 16px rgba(22, 163, 74, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.85rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '8px',
                background: '#16a34a',
                color: '#ffffff',
              }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#166534', margin: 0 }}>
              Ringkasan Resmi: Jual Mesin Laundry &amp; Paket Usaha {cityNameDisplay}
            </h2>
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.65, color: '#334155', margin: '0 0 1.25rem 0', fontWeight: 500 }}>
            {city.directAnswerSummary}
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '12px',
              paddingTop: '1rem',
              borderTop: '1px solid #dcfce7',
            }}
          >
            <div style={{ background: '#ffffff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Investasi Awal</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>{city.startingPrice} Siap Buka</p>
            </div>
            <div style={{ background: '#ffffff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Biaya Royalti / Franchise</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '1.05rem', fontWeight: 800, color: '#16a34a' }}>0% (Bebas Royalti Selamanya)</p>
            </div>
            <div style={{ background: '#ffffff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Kecamatan Dilayani</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', fontWeight: 600, color: '#334155', lineHeight: 1.35 }}>{city.keyDistricts.slice(0, 4).join(', ')} & sekitarnya</p>
            </div>
            <div style={{ background: '#ffffff', padding: '12px 14px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Dukungan Instalasi</span>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', fontWeight: 700, color: '#0284c7' }}>Teknisi Resmi On-Site</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Info Cards for Local City */}
      <section className="wrap city-spec-section" aria-label={`Spesifikasi layanan untuk ${city.name}`}>
        <div className="city-spec-grid">
          <div className="city-spec-card">
            <span className="spec-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <rect x="1" y="3" width="15" height="13" rx="2" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
            </span>
            <h3>Estimasi Pengiriman</h3>
            <p>{city.deliveryEstimate}</p>
          </div>

          <div className="city-spec-card">
            <span className="spec-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </span>
            <h3>Karakteristik & Filter Air</h3>
            <p>{city.waterCharacteristics}</p>
          </div>

          <div className="city-spec-card">
            <span className="spec-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                <polyline points="16 7 22 7 22 13" />
              </svg>
            </span>
            <h3>Potensi Pasar Usaha</h3>
            <p>{city.marketPotential}</p>
          </div>
        </div>

        {/* Local Guarantee & Contextual Guides */}
        <div style={{ marginTop: '1.5rem', padding: '1.25rem 1.5rem', background: '#f0fdf4', border: '1.5px solid #bbf7d0', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.35rem 0', color: '#166534', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <span>Jaminan Teknisi Panggilan, Suku Cadang, & Simulasi Balik Modal di {city.name}</span>
            </h4>
            <p style={{ margin: 0, color: '#15803d', fontSize: '0.875rem', lineHeight: 1.5 }}>
              Semua paket usaha di {city.name} didukung teknisi resmi siaga di Kalbar. Ingin menghitung kelayakan usaha? Pelajari panduan kami seputar{' '}
              <Link href="/artikel/simulasi-balik-modal-usaha-laundry-kiloan-pontianak-kalbar" style={{ color: '#15803d', fontWeight: 700, textDecoration: 'underline' }}>Simulasi Balik Modal (BEP)</Link>,{' '}
              <Link href="/artikel/solusi-filter-air-gambut-dan-sumur-bor-laundry-kiloan-kalbar" style={{ color: '#15803d', fontWeight: 700, textDecoration: 'underline' }}>Solusi Filter Air Gambut</Link>,{' '}
              <Link href="/artikel/jasa-service-mesin-cuci-dryer-laundry-panggilan-pontianak-kalbar" style={{ color: '#15803d', fontWeight: 700, textDecoration: 'underline' }}>Servis Mesin Panggilan</Link>, serta{' '}
              <Link href="/artikel/peluang-usaha-laundry-mess-sawit-dan-tambang-kalbar" style={{ color: '#15803d', fontWeight: 700, textDecoration: 'underline' }}>Peluang Laundry Mess Sawit &amp; Tambang {city.name}</Link>.
            </p>
          </div>
          <Link
            href="/paket-usaha/proposal"
            style={{
              backgroundColor: '#16a34a',
              color: '#ffffff',
              padding: '0.65rem 1.2rem',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.85rem',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(22, 163, 74, 0.25)',
            }}
          >
            Proposal Resmi (PDF) ↗
          </Link>
        </div>
      </section>

      {/* Packages Section Tailored for this city */}
      <section className="wrap section" aria-label={`Pilihan paket usaha untuk ${city.name}`}>
        <div className="section-title">
          <div>
            <span className="eyebrow">PILIHAN REKOMENDASI {city.name.toUpperCase()}</span>
            <h2>Katalog Paket Usaha Laundry {city.name} (Mulai 16 Jt)</h2>
          </div>
          <p>
            Mulai dari laundry kiloan pemula hingga laundromat koin modern tanpa royalti bulanan (100% keuntungan milik Anda). Lengkap dengan fasilitas resmi: <strong>Gratis Instalasi</strong>, <strong>Gratis Ongkir</strong>, dan <strong>Gratis Pelatihan Management Bisnis Laundry</strong> sampai siap operasional di {city.name}.
          </p>
        </div>

        <div className="package-grid home-package-grid">
          {packages.slice(0, 3).map((pack, idx) => (
            <article className={`package-card ${idx === 1 ? 'featured' : ''}`} key={pack.name}>
              <span className="package-label">{pack.label}</span>
              <h3>Paket {pack.name}</h3>
              <p>{pack.desc}</p>
              <ul>
                {pack.points.map((pt) => (
                  <li key={pt}>
                    <span aria-hidden="true">✓</span>
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="package-price">
                <small>Investasi paket</small>
                <b>{pack.price}</b>
              </div>
              <a
                href={waLink(`Halo My Equipment, saya ingin konsultasi Paket ${pack.name} untuk wilayah ${city.name}. Mohon rincian mesin dan biaya instalasinya.`, contact.whatsapp)}
                className="button button-block"
                target="_blank"
                rel="noreferrer"
              >
                Pilih Paket Ini di {city.name} <span aria-hidden="true">↗</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* Local FAQ Section (Directly Mirrors FAQ Schema for 100% Search & AI Match) */}
      <section className="wrap home-faq" aria-label={`FAQ Layanan ${city.name}`} style={{ marginTop: '2rem', marginBottom: '3.5rem' }}>
        <div className="section-title">
          <div>
            <span className="eyebrow">TANYA JAWAB TERVERIFIKASI</span>
            <h2>Pertanyaan Populer Seputar Usaha Laundry di {city.name}</h2>
          </div>
          <p>Fakta penting dan panduan resmi bagi calon pengusaha laundry di {city.districtType} {city.name}.</p>
        </div>

        <div className="home-faq-list">
          {cityFaqQuestions.map((faq, index) => (
            <details key={faq.q} open={index === 0}>
              <summary>{faq.q}</summary>
              <p>{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Sibling Cities Cross-linking for Local SEO */}
      <section className="wrap section" aria-label="Wilayah Layanan Lainnya di Kalimantan Barat" style={{ marginTop: '1rem', marginBottom: '2.5rem' }}>
        <div className="section-title">
          <div>
            <span className="eyebrow">JARINGAN WILAYAH KALBAR</span>
            <h2>Distribusi Paket Usaha Laundry di Kota & Kabupaten Lainnya</h2>
          </div>
          <p>
            Selain {city.name}, My Equipment melayani pengiriman mesin komersial, instalasi teknisi, dan jaminan suku cadang di seluruh 14 kota & kabupaten Kalimantan Barat:
          </p>
        </div>

        <div className="other-cities-tags" style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '1rem' }}>
          {KALBAR_CITIES.filter((c) => c.slug !== city.slug).map((c) => (
            <Link
              key={c.slug}
              href={`/wilayah/${c.slug}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 14px',
                borderRadius: '20px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                color: '#1e293b',
                fontSize: '0.85rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{c.name}</span>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>({c.districtType})</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Floating CTA / Bottom Banner */}
      <section className="wrap" style={{ marginBottom: '4rem' }}>
        <div className="city-cta-banner">
          <div className="city-cta-content">
            <h2>Mulai Usaha Laundry Anda di {city.name} Sekarang</h2>
            <p>
              Konsultasikan Rencana Anggaran Biaya (RAB), survei denah ruko, dan estimasi ongkir ke {city.name} langsung bersama tim My Equipment Indonesia.
            </p>
          </div>
          <a className="button" href={waHref} target="_blank" rel="noreferrer">
            Hubungi Konsultan via WhatsApp →
          </a>
        </div>
      </section>
    </main>
  );
}
