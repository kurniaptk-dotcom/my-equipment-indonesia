import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getPortfolio, getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';
import { waLink } from '@/data/catalog';

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolio();
  return createPageMetadata({
    title: 'Portfolio Outlet Laundry & Cerita Sukses',
    description:
      'Dokumentasi dan cerita sukses para pengusaha laundry mitra My Equipment Indonesia: outlet kiloan, self-service, dan laundry komersial dengan izin publikasi.',
    canonical: '/inspirasi',
    robots: portfolio.length ? undefined : { index: false, follow: true },
  });
}

export const dynamic = 'force-dynamic';

const capacityTags: Record<string, string> = {
  'Atma Laundry': 'Kapasitas 50 Kg/Hari',
  'Dinar Laundry': 'Kapasitas 80 Kg/Hari',
  'Happy Family Laundry': 'Kapasitas 35 Kg/Hari',
  'Kila Laundry': 'Kapasitas 60 Kg/Hari',
  'Permata Laundry Express': 'Kapasitas 120 Kg/Hari',
};

const categoryTags: Record<string, string> = {
  'Atma Laundry': 'Laundry Kiloan 5 Mesin',
  'Dinar Laundry': 'Laundry Self Service & Koin',
  'Happy Family Laundry': 'Laundry Rumahan Pemula',
  'Kila Laundry': 'Laundry Kiloan & Bed Cover',
  'Permata Laundry Express': 'Laundry Komersial Cepat',
};

export default async function InspirasiPage() {
  const [portfolio, contact] = await Promise.all([getPortfolio(), getContactSettings()]);

  return (
    <main className="subpage inspiration-modern-page">
      {/* Breadcrumb Navigation */}
      <div className="wrap">
        <div className="breadcrumb-nav">
          <Link href="/">Beranda</Link>
          <span aria-hidden="true">›</span>
          <Link href="/layanan">Layanan</Link>
          <span aria-hidden="true">›</span>
          <span>Inspirasi Usaha</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="wrap inspiration-hero">
        <div className="inspiration-hero-left">
          <span className="eyebrow">Portfolio & Cerita Nyata</span>
          <h1>
            Portfolio outlet <br />
            <em>laundry & cerita sukses.</em>
          </h1>
          <p>
            Lihat bagaimana My Equipment membantu banyak pengusaha memulai dan mengembangkan bisnis laundry mereka dengan peralatan yang tepat guna dan efisien.
          </p>
        </div>

        {/* Featured Testimonial Quote Card */}
        <div className="featured-quote-card">
          <div className="quote-icon" aria-hidden="true">“</div>
          <p className="quote-text">
            Peralatan lengkap, proses cepat, dan tim teknisnya sangat membantu dari instalasi pipa hingga mesin berjalan lancar. Rekomendasi terbaik untuk yang mau buka usaha laundry.
          </p>
          <div className="quote-author-row">
            <div className="quote-avatar" aria-hidden="true">
              <span>RA</span>
            </div>
            <div className="quote-author-meta">
              <b>Ricky Andrian</b>
              <small>Owner Laundry CleanPro · Pontianak, Kalbar</small>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Chips Bar */}
      <section className="wrap inspiration-chips-section">
        <div className="inspiration-chips" role="navigation" aria-label="Kategori Inspirasi">
          <span className="chip-pill is-active">Semua Outlet</span>
          <span className="chip-pill">Rumahan</span>
          <span className="chip-pill">Profesional</span>
          <span className="chip-pill">Kiloan</span>
          <span className="chip-pill">Self Service</span>
        </div>
      </section>

      {/* Portfolio Gallery Section */}
      <section className="wrap portfolio-section" aria-labelledby="portfolio-main-title">
        <div className="portfolio-section-header">
          <span className="eyebrow">Dokumentasi Outlet</span>
          <h2 id="portfolio-main-title">Dokumentasi outlet yang tercatat</h2>
          <p>
            Dokumentasi outlet yang telah mendapat izin publikasi. Portfolio ini merupakan dokumentasi nyata instalasi peralatan dan tidak menyiratkan jaminan keuntungan tanpa pengelolaan yang baik.
          </p>
        </div>

        <div className="portfolio-cards-grid">
          {portfolio.length ? (
            portfolio.map((item, index) => (
              <article className="portfolio-card" key={item.id}>
                <div className="portfolio-photo">
                  <Image
                    src={item.image}
                    alt={`Foto portfolio ${item.name}`}
                    width={800}
                    height={520}
                    sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 380px"
                    priority
                    loading="eager"
                  />
                  <span className="portfolio-capacity-tag">
                    {capacityTags[item.name] ?? 'Kapasitas 50 Kg/Hari'}
                  </span>
                </div>

                <div className="portfolio-copy">
                  <div className="portfolio-meta-header">
                    <span>PORTFOLIO · {String(index + 1).padStart(2, '0')}</span>
                    <small className="portfolio-cat-label">{categoryTags[item.name] ?? 'Laundry Kiloan'}</small>
                  </div>

                  <h2>{item.name}</h2>

                  <Link
                    className="content-whatsapp-link"
                    href={waLink(
                      `Halo My Equipment, saya melihat portfolio ${item.name} dan ingin berdiskusi tentang kebutuhan peralatan atau paket usaha laundry serupa. Sumber: halaman Portfolio My Equipment, outlet ${item.name}.`,
                      contact.whatsapp
                    )}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Tanya tentang outlet ini <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state portfolio-empty">
              <h2>Portfolio menunggu izin penggunaan</h2>
              <p>Foto dan nama outlet akan ditayangkan setelah izin publikasinya tercatat.</p>
              <Link className="button" href="/kontak">
                Hubungi My Equipment
              </Link>
            </div>
          )}
        </div>

        {portfolio.length > 0 && (
          <p className="wrap note">
            Foto dan nama yang terlihat sudah memiliki catatan izin publikasi. Informasi operasional, testimoni, atau hasil usaha tidak disimpulkan dari foto semata.
          </p>
        )}
      </section>
    </main>
  );
}
