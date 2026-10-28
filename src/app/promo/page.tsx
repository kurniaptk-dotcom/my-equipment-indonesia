import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { PromoCatalog } from '@/components/promo-catalog';
import { getPromos, getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Promo & Penawaran Spesial Usaha Laundry',
    description:
      'Penawaran promo peralatan laundry hemat hingga 30%: paket usaha, mesin cuci, mesin pengering, boiler setrika, dan chemical bergaransi resmi.',
    canonical: '/promo',
  });
}

export const dynamic = 'force-dynamic';

export default async function PromoPage() {
  const [promos, contact] = await Promise.all([getPromos(), getContactSettings()]);

  return (
    <main className="subpage promo-modern-page">
      {/* Breadcrumb Navigation */}
      <div className="wrap">
        <div className="breadcrumb-nav">
          <Link href="/">Beranda</Link>
          <span aria-hidden="true">›</span>
          <Link href="/layanan">Layanan</Link>
          <span aria-hidden="true">›</span>
          <span>Promo & Penawaran</span>
        </div>
      </div>

      {/* Hero Promo Banner */}
      <section className="wrap promo-hero-modern">
        <div className="promo-banner-container">
          <div className="promo-banner-copy">
            <span className="promo-special-tag">PROMO SPESIAL</span>
            <h1>
              Peralatan Laundry Berkualitas<br />
              <em>dengan Harga Lebih Hemat.</em>
            </h1>
            <p>
              Dapatkan berbagai promo menarik untuk mesin laundry komersial, perlengkapan pendukung, chemical, dan paket usaha siap operasional.
            </p>
            <div className="promo-banner-actions">
              <a href="#promo-list" className="button button-light">
                Lihat Semua Promo →
              </a>
            </div>
          </div>

          <div className="promo-banner-visual">
            <div className="promo-saving-badge">
              <small>HEMAT HINGGA</small>
              <b>30%</b>
            </div>
            <Image
              src="/images/dryer-speedqueen.webp"
              alt="Promo mesin laundry resmi My Equipment"
              width={420}
              height={440}
              sizes="(max-width: 650px) 70vw, 360px"
              quality={82}
              priority
            />
          </div>
        </div>
      </section>

      {/* Promo Catalog List */}
      <section className="wrap promo-section-main" id="promo-list">
        <PromoCatalog cmsPromos={promos} whatsapp={contact.whatsapp} />
      </section>
    </main>
  );
}
