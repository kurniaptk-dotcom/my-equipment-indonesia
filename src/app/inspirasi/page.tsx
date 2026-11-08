import type { Metadata } from 'next';
import Link from 'next/link';
import { getPortfolio, getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';
import { waLink } from '@/data/catalog';
import { featuredVideos } from '@/data/featured-videos';
import { YoutubePlayer } from '@/components/youtube-player';
import { PortfolioCatalog } from '@/components/portfolio-catalog';

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolio();
  return createPageMetadata({
    title: 'Dokumentasi Outlet & Kisah Sukses Mitra Laundry My Equipment se-Kalbar',
    description:
      'Bukti nyata 1.000+ mitra usaha laundry My Equipment di Pontianak, Singkawang, Ketapang, & Kalbar. Foto outlet aktif, testimoni balik modal, dan video dokumentasi instalasi.',
    canonical: '/inspirasi',
    robots: portfolio.length ? undefined : { index: false, follow: true },
  });
}

export const dynamic = 'force-dynamic';

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
          <span>Inspirasi Usaha &amp; Portfolio</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="wrap inspiration-hero">
        <div className="inspiration-hero-left">
          <div className="inspiration-eyebrow-chip">
            <span className="inspiration-dot-green" aria-hidden="true" />
            <span>PORTFOLIO &amp; DOKUMENTASI RESMI</span>
          </div>
          <h1>
            Katalog Portfolio Outlet <br />
            <span className="inspiration-blue-title">Laundry Sukses di Kalbar.</span>
          </h1>
          <p>
            Dokumentasi instalasi nyata mesin laundry komersial heavy-duty, instalasi plumbing gas aman, dan pendampingan manajemen ke berbagai pengusaha laundry di seluruh Kalimantan Barat.
          </p>
        </div>

        {/* Featured Testimonial Quote Card */}
        <div className="featured-quote-card">
          <div className="quote-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="currentColor" width="32" height="32" opacity="0.25">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
          <p className="quote-text">
            &ldquo;Peralatan lengkap, proses cepat, dan tim teknisnya sangat membantu dari instalasi pipa hingga mesin berjalan lancar. Rekomendasi terbaik untuk yang mau buka usaha laundry.&rdquo;
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

      {/* Trust & Milestone Bar */}
      <section className="wrap portfolio-milestone-bar" aria-label="Statistik pencapaian outlet My Equipment">
        <div className="milestone-item">
          <b>100+</b>
          <span>Outlet Terbantu</span>
        </div>
        <div className="milestone-divider" aria-hidden="true" />
        <div className="milestone-item">
          <b>14</b>
          <span>Kabupaten/Kota Kalbar</span>
        </div>
        <div className="milestone-divider" aria-hidden="true" />
        <div className="milestone-item">
          <b>100%</b>
          <span>Mandiri Tanpa Royalti</span>
        </div>
        <div className="milestone-divider" aria-hidden="true" />
        <div className="milestone-item">
          <b>Ready Stock</b>
          <span>Mesin &amp; Teknisi Standby</span>
        </div>
      </section>

      {/* Main Interactive Portfolio Catalog */}
      <section className="wrap portfolio-section" aria-labelledby="portfolio-main-title">
        <div className="portfolio-section-header">
          <span className="eyebrow">DOKUMENTASI OUTLET NYATA</span>
          <h2 id="portfolio-main-title">Dokumentasi Instalasi Outlet Tercatat</h2>
          <p>
            Koleksi dokumentasi outlet mitra usaha yang telah mendapatkan izin publikasi resmi. Pilih kategori atau gunakan kolom pencarian untuk melihat rincian mesin yang digunakan.
          </p>
        </div>

        {/* Client-side Filterable Catalog Grid */}
        <PortfolioCatalog portfolio={portfolio} whatsapp={contact.whatsapp} />

        {portfolio.length > 0 && (
          <p className="portfolio-disclaimer-note">
            * Seluruh foto dan nama outlet di atas memiliki catatan izin publikasi. Hasil usaha dan omset bergantung pada manajemen operasional, penentuan lokasi, serta kualitas pelayanan masing-masing pengusaha.
          </p>
        )}
      </section>

      {/* Video Documentation Section */}
      <section className="wrap home-editorial-subsection home-video-preview" style={{ marginTop: '4rem', marginBottom: '3.5rem' }}>
        <div className="home-editorial-subheading">
          <div>
            <span className="eyebrow">DOKUMENTASI VIDEO LAPANGAN</span>
            <h3>Video Nyata Pengiriman &amp; Komisioning di Kalbar</h3>
          </div>
          <a href="https://www.youtube.com/@myequipmentindonesia" target="_blank" rel="noopener noreferrer">
            Kanal YouTube @myequipmentindonesia <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="article-video-grid">
          {featuredVideos.map((video) => (
            <article className="article-video-card" key={video.url}>
              <YoutubePlayer url={video.url} title={video.title} />
              <div>
                <span className="article-type article-location-tag">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="12" height="12" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                  </svg>
                  <span>{video.location}</span>
                </span>
                <h4>{video.title}</h4>
                <p style={{ fontSize: '0.825rem', color: '#64748b', margin: '0.35rem 0 0 0', lineHeight: 1.45 }}>
                  {video.desc}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Bottom Lead Magnet Banner */}
      <section className="wrap home-lead-magnet-card" style={{ marginBottom: '4rem' }}>
        <div className="lead-magnet-content">
          <div className="lead-magnet-copy">
            <div className="lead-magnet-eyebrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
              <span>DOKUMEN RESMI 2026</span>
            </div>
            <h2 className="lead-magnet-title">
              Tertarik Membuka Outlet Laundry dengan Setup Mesin Serupa?
            </h2>
            <p className="lead-magnet-desc">
              Dapatkan proposal penawaran paket usaha laundry mandiri My Equipment Indonesia (100% tanpa royalti) lengkap dengan rincian unit mesin komersial, instalasi, dan survei teknisi ke kota Anda.
            </p>
          </div>
          <div className="lead-magnet-actions">
            <Link href="/paket-usaha/proposal" className="lead-magnet-btn-primary">
              <span>Buka Proposal PDF</span>
              <span aria-hidden="true">↗</span>
            </Link>
            <a
              href={waLink('Halo My Equipment Indonesia, saya tertarik membuka outlet laundry dan ingin berkonsultasi mengenai paket mesin yang cocok.', contact.whatsapp)}
              target="_blank"
              rel="noreferrer"
              className="lead-magnet-btn-wa"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
              </svg>
              <span>Konsultasi via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
