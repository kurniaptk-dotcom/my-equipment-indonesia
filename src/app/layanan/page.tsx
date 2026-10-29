import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/page-metadata';
import { getContactSettings } from '@/lib/content';
import { waLink } from '@/data/catalog';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Pusat Solusi & Layanan Usaha Laundry',
    description:
      'Solusi lengkap usaha laundry: konsultasi gratis, kalkulator modal awal, promo mesin, studi kasus outlet, FAQ interaktif, dan dukungan garansi servis My Equipment Indonesia.',
    canonical: '/layanan',
  });
}

const serviceCards = [
  {
    num: '01',
    title: 'Konsultasi & Rekomendasi Paket',
    desc: 'Ceritakan rencana usaha, target kapasitas, dan anggaran. Tim konsultan kami akan menyusunkan paket peralatan yang paling efisien.',
    href: '/konsultasi',
    badge: 'Konsultasi Gratis',
    highlights: ['Analisis skala & pasar', 'Rekomendasi mesin tepat guna', 'Draf konsultasi instan via WA'],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="M8 9h8" />
        <path d="M8 13h5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Kalkulator Modal Usaha Laundry',
    desc: 'Simulasikan estimasi modal awal secara mandiri berdasarkan skala usaha (Rumahan, Kecil, Menengah, Besar) dan pilihan peralatan katalog.',
    href: '/estimasi-modal',
    badge: 'Simulasi Realtime',
    highlights: ['4 pilihan skala usaha', 'Rincian mesin, kimia & setup', 'Subtotal transparan & akurat'],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="2" width="16" height="20" rx="2" />
        <line x1="8" y1="6" x2="16" y2="6" />
        <line x1="16" y1="14" x2="16" y2="18" />
        <path d="M8 10h.01M12 10h.01M16 10h.01M8 14h.01M12 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Promo & Penawaran Spesial',
    desc: 'Dapatkan penawaran harga hemat hingga 30%, paket bundling mesin cuci + dryer, dan cashback perlengkapan resmi bergaransi.',
    href: '/promo',
    badge: 'Hemat s/d 30%',
    highlights: ['Paket bundling hemat', 'Potongan harga resmi terverifikasi', 'Tautan promo langsung ke toko'],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Inspirasi & Studi Kasus Pelanggan',
    desc: 'Lihat bagaimana My Equipment mendampingi puluhan pengusaha laundry membuka outlet sukses, mulai dari kiloan, rumahan, hingga self-service.',
    href: '/inspirasi',
    badge: 'Dokumentasi Nyata',
    highlights: ['Galeri outlet berizin', 'Spesifikasi kapasitas harian', 'Tanya langsung per outlet'],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <polyline points="21 15 16 10 5 21" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Pusat Bantuan & FAQ Interaktif',
    desc: 'Temukan jawaban cepat seputar tata cara pembelian, spesifikasi daya listrik mesin, pengiriman luar kota, dan panduan instalasi awal.',
    href: '/faq',
    badge: 'Pencarian Cepat',
    highlights: ['Live search pertanyaan', 'Filter topik terstruktur', 'Konsultasi lanjutan via WA'],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Garansi Resmi & Layanan Servis',
    desc: 'Dukungan purna jual terpercaya dengan jaminan garansi resmi sesuai brand, ketersediaan suku cadang asli, dan teknisi siap panggilan.',
    href: '/garansi-servis',
    badge: 'Teknisi Berpengalaman',
    highlights: ['Form pengajuan servis langsung', 'Suku cadang 100% original', 'Kunjungan perbaikan teknisi'],
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

export const dynamic = 'force-dynamic';

export default async function LayananPage() {
  const contact = await getContactSettings();

  return (
    <main className="subpage services-hub-page">
      {/* Hero Section */}
      <section className="services-hub-hero">
        <div className="wrap">
          <div className="breadcrumb-nav">
            <Link href="/">Beranda</Link>
            <span aria-hidden="true">›</span>
            <span>Layanan</span>
          </div>

          <span className="eyebrow">Pusat Layanan & Solusi Usaha</span>
          <h1>
            Layanan Terpadu untuk <br />
            <em>Memulai & Mengembangkan Usaha Laundry.</em>
          </h1>
          <p className="services-hub-subtitle">
            Dari perencanaan modal, rekomendasi peralatan, promo harga hemat, studi kasus nyata, hingga garansi dan servis purna jual. Seluruh dukungan tersedia langsung dari tim resmi My Equipment Indonesia.
          </p>

          <div className="services-hub-actions">
            <Link className="button" href="/konsultasi">
              Mulai Konsultasi Gratis →
            </Link>
            <Link className="button button-outline" href="/estimasi-modal">
              Hitung Estimasi Modal
            </Link>
          </div>
        </div>
      </section>

      {/* 6 Core Services Grid */}
      <section className="wrap services-grid-section" aria-labelledby="services-grid-title">
        <div className="services-grid-heading">
          <div>
            <span className="eyebrow">Solusi Terpadu</span>
            <h2 id="services-grid-title">Pilih Layanan yang Anda Butuhkan</h2>
          </div>
          <p>Klik salah satu layanan di bawah untuk membuka alat bantu atau panduan interaktif.</p>
        </div>

        <div className="services-cards-grid">
          {serviceCards.map((service) => (
            <Link className="service-hub-card" key={service.num} href={service.href}>
              <div className="service-hub-card__top">
                <div className="service-hub-card__icon">{service.icon}</div>
                <div className="service-hub-card__meta">
                  <span className="service-hub-badge">{service.badge}</span>
                  <span className="service-hub-num">{service.num}</span>
                </div>
              </div>

              <h3>{service.title}</h3>
              <p>{service.desc}</p>

              <ul className="service-hub-highlights">
                {service.highlights.map((item, idx) => (
                  <li key={idx}>
                    <span aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="service-hub-card__action">
                <span>Buka Layanan</span>
                <span className="service-arrow" aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Showroom & Layanan Lokasi */}
      <section className="wrap service-location-banner">
        <div className="service-location-copy">
          <span className="eyebrow">Layanan Langsung di Lokasi Anda</span>
          <h2>Kunjungi Showroom & Konsultasi Tatap Muka</h2>
          <p>
            Ingin melihat langsung unit mesin cuci, mesin pengering, boiler uap, dan perlengkapan laundry sebelum memutuskan? Tim kami siap menyambut Anda di showroom Pontianak dan Kubu Raya.
          </p>
          <div className="service-location-meta">
            <span>📍 Pontianak & Kubu Raya, Kalimantan Barat</span>
            <span>🕒 {contact.serviceHours}</span>
          </div>
        </div>
        <div className="service-location-action">
          <Link
            className="button button-light"
            href={waLink('Halo My Equipment, saya ingin membuat janji temu dan survei unit di showroom.', contact.whatsapp)}
            target="_blank"
            rel="noreferrer"
          >
            Atur Jadwal Kunjungan ↗
          </Link>
          <Link className="text-link" href="/kontak">
            Lihat peta dan detail kontak →
          </Link>
        </div>
      </section>
    </main>
  );
}
