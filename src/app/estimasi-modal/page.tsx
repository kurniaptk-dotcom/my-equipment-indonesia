import type { Metadata } from 'next';
import Link from 'next/link';
import { EstimateForm } from '@/components/interactive-forms';
import { getProducts, getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Kalkulator Modal Usaha Laundry',
    description:
      'Hitung perkiraan modal awal usaha laundry: simulasi pilihan skala usaha, peralatan, perlengkapan, dan instalasi My Equipment Indonesia.',
    canonical: '/estimasi-modal',
  });
}

export const dynamic = 'force-dynamic';

export default async function EstimasiModalPage() {
  const [products, contact] = await Promise.all([getProducts(), getContactSettings()]);

  return (
    <main className="subpage has-sticky-cta estimator-modern-page" data-page="estimator">
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
            Hitung estimasi modal awal berdasarkan pilihan skala usaha, kapasitas mesin cuci & pengering, serta perlengkapan pendukung yang Anda butuhkan.
          </p>
        </div>

        <div className="estimator-hero-alert">
          <div className="estimator-alert-icon" aria-hidden="true">ℹ️</div>
          <p>
            Simulasi ini membantu Anda memperkirakan kebutuhan modal awal peralatan. Hasil estimasi bersifat indikatif dan bukan jaminan omzet atau keuntungan usaha.
          </p>
        </div>
      </section>

      {/* Estimator Section */}
      <section className="wrap estimator-section">
        <EstimateForm products={products} whatsapp={contact.whatsapp} />
      </section>
    </main>
  );
}
