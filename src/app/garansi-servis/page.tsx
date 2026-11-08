import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { waLink } from '@/data/catalog';
import { getContactSettings } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { createPageMetadata } from '@/lib/page-metadata';
import { ServiceRequestForm } from '@/components/interactive-forms';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Jasa Servis Mesin Cuci & Dryer Laundry Panggilan Pontianak Kalbar: Teknisi Resmi Bergaransi',
    description:
      'Layanan servis mesin cuci & pengering dryer laundry panggilan di Pontianak, Kubu Raya, Singkawang, & seluruh Kalbar. Teknisi resmi, suku cadang original, dan garansi perbaikan.',
    canonical: '/garansi-servis',
  });
}

export const dynamic = 'force-dynamic';

export default async function GaransiServisPage() {
  const contact = await getContactSettings();
  const siteUrl = getSiteUrl();

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/garansi-servis#breadcrumb`,
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
            name: 'Layanan',
            item: `${siteUrl}/layanan`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Garansi & Servis Mesin Laundry',
            item: `${siteUrl}/garansi-servis`,
          },
        ],
      },
      {
        '@type': 'Service',
        '@id': `${siteUrl}/garansi-servis#service`,
        name: 'Jasa Servis Mesin Cuci & Dryer Laundry Panggilan Pontianak Kalbar',
        serviceType: 'Jasa Perbaikan & Pemeliharaan Mesin Laundry Komersial',
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
          name: 'Kalimantan Barat',
        },
        description:
          'Layanan teknisi panggilan untuk perbaikan mesin cuci komersial, dryer konversi gas, setrika uap boiler, dan instalasi perpipaan laundry di Kalimantan Barat.',
      },
    ],
  };

  return (
    <main className="subpage warranty-modern-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
      />
      {/* Breadcrumb Navigation */}
      <div className="wrap">
        <div className="breadcrumb-nav">
          <Link href="/">Beranda</Link>
          <span aria-hidden="true">›</span>
          <Link href="/layanan">Layanan</Link>
          <span aria-hidden="true">›</span>
          <span>Garansi & Servis</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="warranty-hero-modern">
        <div className="wrap warranty-hero-modern-grid">
          <div className="warranty-hero-copy">
            <span className="eyebrow">Dukungan Purna Jual & Teknisi</span>
            <h1>
              Garansi & Servis <br />
              <em>Resmi dan Terpercaya.</em>
            </h1>
            <p>
              My Equipment memberikan garansi resmi untuk setiap produk peralatan laundry dengan dukungan teknisi berpengalaman, ketersediaan suku cadang asli, dan respon cepat.
            </p>

            <div className="warranty-trust-badges">
              <div className="warranty-trust-item">
                <span className="badge-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <div>
                  <b>Garansi Resmi</b>
                  <small>Sesuai ketentuan brand</small>
                </div>
              </div>

              <div className="warranty-trust-item">
                <span className="badge-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </span>
                <div>
                  <b>Teknisi Profesional</b>
                  <small>Dan Berpengalaman</small>
                </div>
              </div>

              <div className="warranty-trust-item">
                <span className="badge-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="20" height="20">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </span>
                <div>
                  <b>Layanan Cepat</b>
                  <small>Dan Terpercaya</small>
                </div>
              </div>
            </div>
          </div>

          <div className="warranty-hero-visual">
            <div className="warranty-visual-card">
              <Image
                src="/images/hero-stacked.webp"
                alt="Teknisi servis dan mesin laundry My Equipment"
                width={640}
                height={520}
                sizes="(max-width: 650px) 90vw, 42vw"
                quality={82}
                priority
              />
              <div className="warranty-visual-tag">
                <span className="tag-dot" aria-hidden="true" />
                <span>Teknisi Siap Datang ke Lokasi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2-Column Section: Form Pengajuan Servis & Informasi Garansi */}
      <section className="wrap warranty-content-grid" aria-labelledby="service-section-title">
        {/* Kolom Kiri: Form Pengajuan Servis */}
        <div className="warranty-form-column">
          <div className="warranty-form-header">
            <span className="eyebrow">Permohonan Servis</span>
            <h2 id="service-section-title">Ajukan Servis</h2>
            <p>Isi form berikut untuk mengajukan layanan servis dan perbaikan mesin ke tim teknisi kami.</p>
          </div>

          <ServiceRequestForm whatsapp={contact.whatsapp} />
        </div>

        {/* Kolom Kanan: Rincian Garansi & Ketentuan */}
        <div className="warranty-info-column">
          <div className="warranty-info-header">
            <span className="eyebrow">Panduan Pelanggan</span>
            <h2>Informasi Garansi</h2>
            <p>Standar perlindungan dan jaminan servis untuk kenyamanan operasional bisnis laundry Anda.</p>
          </div>

          <div className="warranty-info-cards">
            <div className="warranty-card-item">
              <span className="card-item-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
              </span>
              <div>
                <h3>Garansi Resmi</h3>
                <p>Setiap mesin dan produk bergaransi resmi sesuai ketentuan pabrikan masing-masing merek.</p>
              </div>
            </div>

            <div className="warranty-card-item">
              <span className="card-item-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
              </span>
              <div>
                <h3>Proses Mudah</h3>
                <p>Pengajuan garansi dapat dilakukan secara online melalui form ini atau customer service resmi.</p>
              </div>
            </div>

            <div className="warranty-card-item">
              <span className="card-item-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </span>
              <div>
                <h3>Layanan Servis</h3>
                <p>Tersedia layanan pengecekan berkala dan perbaikan oleh teknisi bersertifikat di lokasi Anda.</p>
              </div>
            </div>

            <div className="warranty-card-item">
              <span className="card-item-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </span>
              <div>
                <h3>Suku Cadang Original</h3>
                <p>Kami menjamin penggunaan suku cadang asli untuk menjaga efisiensi dan keawetan mesin.</p>
              </div>
            </div>

            <div className="warranty-card-item">
              <span className="card-item-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </span>
              <div>
                <h3>Cakupan Garansi</h3>
                <p>Meliputi kerusakan fungsi atau cacat manufaktur dalam pemakaian normal sesuai buku panduan.</p>
              </div>
            </div>
          </div>

          {/* Catatan Kepatuhan yang Diverifikasi E2E */}
          <div className="warranty-disclaimer-box">
            <b>Konfirmasi Ketentuan Sebelum Transaksi</b>
            <p>
              Informasi resmi yang kami temukan belum merinci satu cakupan garansi atau pengiriman yang berlaku untuk semua produk dan lokasi. Area layanan, metode, ongkir, dan estimasi waktu perlu dikonfirmasi berdasarkan alamat tujuan serta jenis produk yang dipilih.
            </p>
            <div className="warranty-box-actions">
              <Link
                className="text-link"
                href={waLink('Halo My Equipment, saya ingin mengonfirmasi rincian garansi dan pengiriman untuk produk yang saya pilih.', contact.whatsapp)}
                target="_blank"
                rel="noreferrer"
              >
                Konfirmasi Ketentuan via WhatsApp ↗
              </Link>
              <Link className="text-link" href="https://produk.myequipmentindonesia.com/" target="_blank" rel="noreferrer">
                Buka toko resmi
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
