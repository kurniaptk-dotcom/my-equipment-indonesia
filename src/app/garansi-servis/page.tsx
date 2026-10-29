import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { waLink } from '@/data/catalog';
import { getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';
import { ServiceRequestForm } from '@/components/interactive-forms';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Garansi Resmi, Servis & Pengajuan Perbaikan',
    description:
      'Layanan purna jual resmi My Equipment Indonesia: pengajuan servis online, teknisi profesional, suku cadang original, dan ketentuan garansi per produk.',
    canonical: '/garansi-servis',
  });
}

export const dynamic = 'force-dynamic';

export default async function GaransiServisPage() {
  const contact = await getContactSettings();

  return (
    <main className="subpage warranty-modern-page">
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
                <span className="badge-icon" aria-hidden="true">🛡️</span>
                <div>
                  <b>Garansi Resmi</b>
                  <small>Sesuai ketentuan brand</small>
                </div>
              </div>

              <div className="warranty-trust-item">
                <span className="badge-icon" aria-hidden="true">👨‍🔧</span>
                <div>
                  <b>Teknisi Profesional</b>
                  <small>Dan Berpengalaman</small>
                </div>
              </div>

              <div className="warranty-trust-item">
                <span className="badge-icon" aria-hidden="true">⚡</span>
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
              <span className="card-item-icon" aria-hidden="true">📋</span>
              <div>
                <h3>Garansi Resmi</h3>
                <p>Setiap mesin dan produk bergaransi resmi sesuai ketentuan pabrikan masing-masing merek.</p>
              </div>
            </div>

            <div className="warranty-card-item">
              <span className="card-item-icon" aria-hidden="true">⚡</span>
              <div>
                <h3>Proses Mudah</h3>
                <p>Pengajuan garansi dapat dilakukan secara online melalui form ini atau customer service resmi.</p>
              </div>
            </div>

            <div className="warranty-card-item">
              <span className="card-item-icon" aria-hidden="true">🔧</span>
              <div>
                <h3>Layanan Servis</h3>
                <p>Tersedia layanan pengecekan berkala dan perbaikan oleh teknisi bersertifikat di lokasi Anda.</p>
              </div>
            </div>

            <div className="warranty-card-item">
              <span className="card-item-icon" aria-hidden="true">⚙️</span>
              <div>
                <h3>Suku Cadang Original</h3>
                <p>Kami menjamin penggunaan suku cadang asli untuk menjaga efisiensi dan keawetan mesin.</p>
              </div>
            </div>

            <div className="warranty-card-item">
              <span className="card-item-icon" aria-hidden="true">📝</span>
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
