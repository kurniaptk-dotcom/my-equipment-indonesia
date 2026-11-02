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

export async function generateStaticParams() {
  return KALBAR_CITIES.map((c) => ({ kota: c.slug }));
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { kota: slug } = await params;
  const city = KALBAR_CITIES.find((c) => c.slug === slug);
  if (!city) return {};

  return createPageMetadata({
    title: city.metaTitle,
    description: city.metaDescription,
    canonical: `/wilayah/${city.slug}`,
  });
}

export default async function CityCoveragePage({ params }: CityPageProps) {
  const { kota: slug } = await params;
  const city = KALBAR_CITIES.find((c) => c.slug === slug);
  if (!city) notFound();

  const [contact, packages] = await Promise.all([getContactSettings(), getPackages()]);
  const siteUrl = getSiteUrl();

  const waHref = waLink(
    `Halo My Equipment Indonesia, saya tertarik membuka usaha laundry di wilayah ${city.name} (${city.districtType}). Mohon info estimasi ongkir mesin, paket usaha yang cocok, dan jadwal survei teknisi. Sumber: halaman wilayah ${city.name}.`,
    contact.whatsapp
  );

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
        name: `Paket Usaha Laundry ${city.name} - My Equipment Indonesia`,
        serviceType: 'Paket Usaha Laundry Kiloan & Koin Komersial',
        provider: {
          '@type': 'LocalBusiness',
          name: 'My Equipment Indonesia Corp',
          telephone: contact.phone,
          email: contact.email,
          url: siteUrl,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Jl. Adi Sucipto Perum. Teluk Mulus B No.33, Sungai Raya',
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
          lowPrice: 15000000,
          highPrice: 120000000,
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/wilayah/${city.slug}#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: `Apakah My Equipment melayani pengiriman dan instalasi mesin laundry ke ${city.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Ya, kami melayani pengiriman unit mesin cuci, dryer gas, dan setrika uap lengkap beserta teknisi resmi ke wilayah ${city.name} dan seluruh kecamatan sekitarnya. Teknisi kami memasang instalasi pipa air, gas, dan kelistrikan hingga mesin siap running.`,
            },
          },
          {
            '@type': 'Question',
            name: `Apakah ada biaya royalti bulanan atau sistem franchise di ${city.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Tidak ada sama sekali. Paket usaha laundry My Equipment di ${city.name} bersifat 100% kepemilikan mandiri tanpa franchise fee awal atau bagi hasil omset bulanan. Anda bebas menentukan nama merk laundry Anda sendiri.`,
            },
          },
          {
            '@type': 'Question',
            name: `Bagaimana penanganan kualitas air di ${city.name}?`,
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Untuk ${city.name}, ${city.waterCharacteristics}. Teknisi My Equipment menyertakan panduan dan paket instalasi tabung filter air yang tepat agar hasil cucian pakaian pelanggan selalu cerah dan higienis.`,
            },
          },
        ],
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
            <span>Konsultasi Wilayah {city.name}</span>
            <span aria-hidden="true">→</span>
          </a>
          <Link className="button button-outline" href="/paket-usaha">
            <span>Lihat Katalog Paket Usaha</span>
            <span aria-hidden="true">›</span>
          </Link>
        </div>
      </section>

      {/* Key Info Cards for Local City */}
      <section className="wrap city-spec-section" aria-label={`Spesifikasi layanan untuk ${city.name}`}>
        <div className="city-spec-grid">
          <div className="city-spec-card">
            <span className="spec-icon">🚚</span>
            <h3>Estimasi Pengiriman</h3>
            <p>{city.deliveryEstimate}</p>
          </div>

          <div className="city-spec-card">
            <span className="spec-icon">💧</span>
            <h3>Karakteristik & Filter Air</h3>
            <p>{city.waterCharacteristics}</p>
          </div>

          <div className="city-spec-card">
            <span className="spec-icon">📈</span>
            <h3>Potensi Pasar Usaha</h3>
            <p>{city.marketPotential}</p>
          </div>
        </div>
      </section>

      {/* Packages Section Tailored for this city */}
      <section className="wrap section" aria-label={`Pilihan paket usaha untuk ${city.name}`}>
        <div className="section-title">
          <div>
            <span className="eyebrow">PILIHAN REKOMENDASI</span>
            <h2>Paket Usaha Cocok untuk {city.name}</h2>
          </div>
          <p>
            Mulai dari laundry kiloan pemula hingga laundromat koin modern tanpa royalti bulanan.
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

      {/* Local FAQ Section */}
      <section className="wrap home-faq" aria-label={`FAQ Layanan ${city.name}`} style={{ marginTop: '2rem', marginBottom: '3.5rem' }}>
        <div className="section-title">
          <div>
            <span className="eyebrow">TANYA JAWAB WILAYAH</span>
            <h2>Pertanyaan Seputar Layanan di {city.name}</h2>
          </div>
          <p>Hal yang sering ditanyakan calon mitra di {city.districtType} {city.name}.</p>
        </div>

        <div className="home-faq-list">
          <details open>
            <summary>Apakah teknisi My Equipment datang langsung untuk memasang mesin di {city.name}?</summary>
            <p>
              Ya. Teknisi resmi kami mendampingi atau menyusul pengiriman armada ke {city.name} untuk melakukan setup perpipaan, pemasangan cerobong gas dryer, serta pengetesan mesin hingga berjalan normal.
            </p>
          </details>
          <details>
            <summary>Berapa lama estimasi pengiriman mesin ke {city.name}?</summary>
            <p>{city.deliveryEstimate}</p>
          </details>
          <details>
            <summary>Bagaimana solusi kualitas air di {city.name} agar pakaian tidak kuning?</summary>
            <p>
              {city.waterCharacteristics}. Kami menyediakan filter media air yang disesuaikan dengan sumber air outlet Anda sebelum masuk ke tabung mesin cuci.
            </p>
          </details>
        </div>
      </section>

      {/* Floating CTA / Bottom Banner */}
      <section className="wrap" style={{ marginBottom: '4rem' }}>
        <div className="city-cta-banner">
          <div className="city-cta-content">
            <h2>Mulai Usaha Laundry Anda di {city.name} Sekarang</h2>
            <p>
              Konsultasikan Rencana Anggaran Biaya (RAB), pemilihan mesin, dan ketersediaan lokasi bersama konsultan My Equipment Indonesia.
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

