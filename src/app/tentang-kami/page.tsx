import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/page-metadata';
import { getSiteUrl } from '@/lib/site-url';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Tentang Kami | Profil Resmi My Equipment Indonesia',
    description:
      'Pusat penyedia paket usaha laundry komersial mandiri tanpa biaya franchise di Kalimantan Barat. Berdiri sejak 2019 dan telah mendampingi lebih dari 1.000+ mitra laundry di Kalbar.',
    canonical: '/tentang-kami',
  });
}

export default function TentangKami() {
  const siteUrl = getSiteUrl();

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'AboutPage',
        '@id': `${siteUrl}/tentang-kami#webpage`,
        url: `${siteUrl}/tentang-kami`,
        name: 'Tentang My Equipment Indonesia',
        description:
          'Pusat penyedia paket usaha laundry non-franchise terpercaya di Kalimantan Barat sejak 2019 dengan pendampingan 1.000+ mitra.',
        mainEntity: {
          '@id': `${siteUrl}/#organization`,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/tentang-kami#breadcrumb`,
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
            name: 'Tentang Kami',
            item: `${siteUrl}/tentang-kami`,
          },
        ],
      },
    ],
  };

  return (
    <main className="subpage">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema).replace(/</g, '\\u003c') }}
      />
      <section className="about-hero">
        <div className="wrap about-hero-grid">
          <div>
            <span className="eyebrow">PROFIL PERUSAHAAN</span>
            <h1>
              Mitra Terpercaya Usaha Laundry <br />
              <em>di Kalimantan Barat.</em>
            </h1>
            <p>
              <strong>My Equipment Indonesia</strong> (dikenal juga sebagai <strong>Pusat Mesin Laundry Kalbar</strong>) adalah supplier, distributor peralatan mesin laundry komersial, dan konsultan paket usaha laundry mandiri berbasis di Kubu Raya dan Pontianak. Berdiri sejak tahun 2019, kami telah mendampingi lebih dari <strong>1.000+ pengusaha laundry</strong> membuka dan mengembangkan outlet mereka di 14 kabupaten/kota se-Kalbar tanpa sistem waralaba yang membebani.
            </p>
            <div className="hero-actions">
              <Link className="button" href="/kontak">
                Kunjungi Showroom ↗
              </Link>
              <Link className="button button-outline" href="/paket-usaha">
                Pilihan Paket Usaha →
              </Link>
            </div>
          </div>
          <div className="about-hero-image">
            <Image
              src="/images/hero-stacked.webp"
              alt="Showroom dan mesin laundry komersial My Equipment Indonesia"
              width={720}
              height={720}
              sizes="(max-width: 650px) 90vw, 45vw"
              quality={82}
            />
          </div>
        </div>
      </section>

      {/* Quick Metrics Strip */}
      <section className="wrap home-trust-strip" aria-label="Statistik My Equipment">
        <div className="home-trust-card">
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--blue)' }}>2019</span>
          <span>
            <b>Tahun Berdiri</b>
            <small>Pengalaman mendalam industri laundry Kalbar</small>
          </span>
        </div>
        <div className="home-trust-card">
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--blue)' }}>1.000+</span>
          <span>
            <b>Mitra Terbantu</b>
            <small>Outlet mandiri beroperasi sukses se-Kalbar</small>
          </span>
        </div>
        <div className="home-trust-card">
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--blue)' }}>14 Kota</span>
          <span>
            <b>Jangkauan Layanan</b>
            <small>Pengiriman & teknisi panggilan seluruh Kalbar</small>
          </span>
        </div>
      </section>

      {/* Core Values / Why Us */}
      <section className="wrap about-pillars">
        <div>
          <span className="eyebrow">PRINSIP & KEUNGGULAN KAMI</span>
          <h2>Mengapa Pengusaha Memilih My Equipment?</h2>
        </div>
        <div className="why-cards">
          <article>
            <span>01</span>
            <h3>100% Kepemilikan Mandiri (Tanpa Franchise)</h3>
            <p>
              Tidak ada <em>franchise fee</em> awal atau potongan royalti omset bulanan sepeser pun. Seluruh keuntungan bersih menjadi milik Anda dan Anda bebas menentukan nama brand sendiri.
            </p>
          </article>
          <article>
            <span>02</span>
            <h3>Layanan End-to-End oleh Teknisi Berpengalaman</h3>
            <p>
              Bukan transaksi jual putus. Tim teknisi kami melayani pengiriman unit, instalasi perpipaan, cerobong gas boiler, instalasi filter air gambut, hingga commissioning test tuntas.
            </p>
          </article>
          <article>
            <span>03</span>
            <h3>Kustomisasi Sesuai Modal & Anggaran</h3>
            <p>
              Mulai dari paket pemula belasan juta hingga laundromat komersial sistem koin bertingkat. Kami menyusun Rencana Anggaran Biaya (RAB) paling efisien sesuai modal awal Anda.
            </p>
          </article>
          <article>
            <span>04</span>
            <h3>Pendampingan Manajemen & SOP Seumur Hidup</h3>
            <p>
              Akses konsultasi gratis berkelanjutan mengenai takaran chemical, teknik setrika uap, strategi promosi lokal, hingga penanganan komplain pakaian pelanggan.
            </p>
          </article>
        </div>
      </section>

      {/* Showroom & Network */}
      <section className="wrap about-showroom">
        <span className="eyebrow">SHOWROOM & WORKSHOP FISIK</span>
        <h2>Kunjungi Showroom Kami di Kubu Raya & Singkawang</h2>
        <p>
          Lihat langsung unit mesin cuci <em>front-load</em>, dryer komersial konversi gas, dan setrika uap boiler beroperasi sebelum Anda memutuskan untuk membeli.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <Link className="button" href="/kontak">
            Informasi Kontak & Lokasi ↗
          </Link>
          <Link className="button button-outline" href="/inspirasi">
            Lihat Bukti Dokumentasi Outlet →
          </Link>
        </div>
      </section>
    </main>
  );
}
