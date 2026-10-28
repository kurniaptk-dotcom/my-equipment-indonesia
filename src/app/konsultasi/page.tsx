import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ConsultationForm } from '@/components/interactive-forms';
import { getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';
import { waLink } from '@/data/catalog';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Konsultasi & Rekomendasi Paket Usaha Laundry',
    description:
      'Konsultasi gratis usaha laundry bersama My Equipment Indonesia: rekomendasi paket sesuai modal, lokasi, dan target pasar tanpa komitmen pembelian.',
    canonical: '/konsultasi',
  });
}

export const dynamic = 'force-dynamic';

export default async function KonsultasiPage() {
  const contact = await getContactSettings();

  return (
    <main className="subpage consult-modern-page">
      {/* Breadcrumb Navigation */}
      <div className="wrap">
        <div className="breadcrumb-nav">
          <Link href="/">Beranda</Link>
          <span aria-hidden="true">›</span>
          <Link href="/layanan">Layanan</Link>
          <span aria-hidden="true">›</span>
          <span>Konsultasi</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="consult-hero-modern">
        <div className="wrap consult-hero-modern-grid">
          <div className="consult-hero-copy">
            <span className="eyebrow">Konsultasi Usaha Gratis</span>
            <h1>
              Konsultasi & Rekomendasi<br />
              <em>Paket Usaha Laundry.</em>
            </h1>
            <p>
              Ceritakan kebutuhan Anda, tim kami akan membantu memberikan rekomendasi paket usaha laundry yang paling sesuai dengan modal, lokasi, dan target pasar Anda.
            </p>

            <div className="consult-trust-points">
              <div className="trust-point-item">
                <span className="trust-check" aria-hidden="true">✓</span>
                <span>Konsultasi Gratis</span>
              </div>
              <div className="trust-point-item">
                <span className="trust-check" aria-hidden="true">✓</span>
                <span>Rekomendasi Paket Sesuai Kebutuhan</span>
              </div>
              <div className="trust-point-item">
                <span className="trust-check" aria-hidden="true">✓</span>
                <span>Dibantu oleh Tim Berpengalaman</span>
              </div>
              <div className="trust-point-item">
                <span className="trust-check" aria-hidden="true">✓</span>
                <span>Tanpa Komitmen Pembelian</span>
              </div>
            </div>
          </div>

          <div className="consult-hero-visual">
            <div className="consult-visual-card">
              <Image
                src="/images/hero-stacked.webp"
                alt="Peralatan laundry My Equipment"
                width={640}
                height={520}
                sizes="(max-width: 650px) 90vw, 42vw"
                quality={82}
                priority
              />
              <Link
                href={waLink('Halo My Equipment, saya ingin konsultasi gratis via WhatsApp.', contact.whatsapp)}
                target="_blank"
                rel="noreferrer"
                className="consult-floating-pill"
              >
                <span className="pill-dot" aria-hidden="true" />
                <span>Konsultasi Gratis via WhatsApp ↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="wrap consult-form-section" aria-labelledby="form-consult-title">
        <div className="consult-form-header">
          <span className="eyebrow">Formulir Kebutuhan</span>
          <h2 id="form-consult-title">Isi Form Konsultasi</h2>
          <p>Lengkapi data berikut untuk menyusun draf konsultasi yang relevan langsung ke WhatsApp tim kami.</p>
        </div>

        <ConsultationForm whatsapp={contact.whatsapp} />
      </section>
    </main>
  );
}
