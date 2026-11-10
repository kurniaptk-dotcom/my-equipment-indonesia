import Image from 'next/image';
import Link from 'next/link';

interface OutletItem {
  name: string;
  location: string;
  capacity: string;
  packageType: string;
  image: string;
}

const OUTLETS: OutletItem[] = [
  {
    name: 'Atma Laundry',
    location: 'Sungai Raya, Kab. Kubu Raya',
    capacity: '50 Kg / Hari',
    packageType: 'Paket Kiloan Komersial',
    image: '/images/case-atma-outlet.webp',
  },
  {
    name: 'Dinar Laundry',
    location: 'Kota Pontianak, Kalbar',
    capacity: '80 Kg / Hari',
    packageType: 'Paket Stack Speed Queen',
    image: '/images/case-dinar-outlet.webp',
  },
  {
    name: 'Happy Family Laundry',
    location: 'Pontianak Kota, Kalbar',
    capacity: '40 Kg / Hari',
    packageType: 'Paket Hemat Pemula',
    image: '/images/case-happy-family-outlet.webp',
  },
  {
    name: 'Kila Laundry',
    location: 'Pontianak Barat, Kalbar',
    capacity: '60 Kg / Hari',
    packageType: 'Paket Heavy-Duty 10 Kg',
    image: '/images/case-kila-outlet.webp',
  },
  {
    name: 'Permata Laundry Express',
    location: 'Siantan, Pontianak Utara',
    capacity: '100 Kg / Hari',
    packageType: 'Paket Komersial Multi-Line',
    image: '/images/case-permata-outlet.webp',
  },
  {
    name: 'Putussibau Sentral Laundry',
    location: 'Putussibau, Kab. Kapuas Hulu',
    capacity: '90 Kg / Hari',
    packageType: 'Paket Komersial & Mess',
    image: '/images/hero-showroom.webp',
  },
  {
    name: 'Ketapang Mandiri Laundry',
    location: 'Delta Pawan, Kab. Ketapang',
    capacity: '70 Kg / Hari',
    packageType: 'Paket Usaha Kiloan Mandiri',
    image: '/images/hero-stage-clean.webp',
  },
];

const GUIDES = [
  {
    slug: 'estimasi-balik-modal-usaha-laundry-kalbar',
    title: 'Rincian Modal Usaha Laundry Kiloan di Pontianak & Kalbar: Estimasi Balik Modal & RAB Riil',
    badge: 'Kalkulasi Finansial',
    desc: 'Hitungan riil omset 40–60 kg/hari, biaya HPP per kg (Rp 1.300), dan proyeksi BEP dalam 3–6 bulan tanpa franchise fee.',
  },
  {
    slug: 'panduan-buka-usaha-laundry-kiloan-pemula-kalbar-2026',
    title: 'Panduan Buka Usaha Laundry Kiloan Pemula Kalbar 2026',
    badge: 'Panduan Langkah',
    desc: 'Langkah praktis persiapan ruko, kapasitas mesin komersial, instalasi teknis, hingga strategi penetapan harga.',
  },
  {
    slug: 'mesin-pengering-konversi-gas-vs-listrik-laundry-kalbar',
    title: 'Mesin Pengering Konversi Gas vs Listrik: Mana yang Lebih Hemat Biaya Operasional di Kalbar?',
    badge: 'Panduan Mesin',
    desc: 'Komparasi konsumsi daya PLN vs tabung gas LPG untuk menekan tagihan listrik bulanan ruko hingga 90%.',
  },
  {
    slug: 'solusi-air-gambut-dan-kuning-laundry-kalbar',
    title: 'Solusi Air Gambut & Kuning untuk Usaha Laundry di Kalimantan Barat',
    badge: 'Standar Teknis',
    desc: 'Panduan tabung filter FRP multimedia agar pakaian pelanggan tetap cerah, wangi, dan bebas noda karat.',
  },
];

export function PackageSocialProof() {
  return (
    <div className="package-social-proof-wrap" style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
      {/* 1. Real Outlets Social Proof */}
      <section className="wrap proof-outlets-section" aria-label="Dokumentasi Outlet Mitra Laundry Pontianak">
        <div className="section-title">
          <div>
            <span className="eyebrow">BUKTI NYATA OUTLET MITRA</span>
            <h2>Dokumentasi Outlet Laundry Riil di Pontianak &amp; Kalbar</h2>
          </div>
          <p>
            Bukan sekadar foto katalog pabrikan. Berikut dokumentasi nyata mesin cuci komersial, dryer gas, dan instalasi pipa My Equipment yang telah beroperasi menghasilkan omset harian.
          </p>
        </div>

        <div className="proof-outlets-grid">
          {OUTLETS.map((outlet) => (
            <article key={outlet.name} className="proof-outlet-card">
              <div className="proof-outlet-image-wrap">
                <Image
                  src={outlet.image}
                  alt={`Outlet ${outlet.name} mitra My Equipment Pontianak`}
                  fill
                  sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 280px"
                  style={{ objectFit: 'cover' }}
                />
                <span className="proof-badge-verified">
                  <svg viewBox="0 0 20 20" fill="currentColor" width="12" height="12" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Mitra Aktif
                </span>
              </div>
              <div className="proof-outlet-body">
                <h3>{outlet.name}</h3>
                <p className="proof-outlet-loc">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {outlet.location}
                </p>
                <div className="proof-outlet-meta">
                  <span>Kapasitas: <b>{outlet.capacity}</b></span>
                  <span>{outlet.packageType}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <Link href="/inspirasi" className="button button-outline">
            Lihat Semua Foto &amp; Portofolio Outlet di Kalbar <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* 2. Educational Cluster Guides for Authority */}
      <section className="wrap proof-guides-section" style={{ marginTop: '4rem' }} aria-label="Panduan Edukasi Bisnis Laundry Kalbar">
        <div className="section-title">
          <div>
            <span className="eyebrow">EDUKASI &amp; RISET BISNIS</span>
            <h2>Pelajari Hitungan &amp; Standar Usaha Sebelum Memulai</h2>
          </div>
          <p>
            Riset lengkap kami susun khusus untuk iklim bisnis Kalimantan Barat agar modal Anda aman dan terhindar dari salah beli mesin.
          </p>
        </div>

        <div className="proof-guides-grid">
          {GUIDES.map((guide) => (
            <article key={guide.slug} className="proof-guide-card">
              <span className="proof-guide-badge">{guide.badge}</span>
              <h3>
                <Link href={`/artikel/${guide.slug}`}>
                  {guide.title}
                </Link>
              </h3>
              <p>{guide.desc}</p>
              <Link href={`/artikel/${guide.slug}`} className="proof-guide-link">
                <span>Baca panduan lengkap</span>
                <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
