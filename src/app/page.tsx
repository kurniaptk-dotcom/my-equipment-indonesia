import Link from 'next/link';
import Image from 'next/image';
import { storeUrl, waLink } from '@/data/catalog';
import { CategoryIcon } from '@/components/category-icon';
import { YoutubePlayer } from '@/components/youtube-player';
import { HomeStatsCounter } from '@/components/home-stats-counter';
import { HomePartnerSlider } from '@/components/home-partner-slider';
import { InteractiveRegionalMap } from '@/components/interactive-regional-map';
import { RoiCalculator } from '@/components/roi-calculator';
import { HomePackageSwitcher } from '@/components/home-package-switcher';
import { featuredVideos } from '@/data/featured-videos';
import { getArticles, getCategories, getPackages, getPortfolio, getProducts, getContactSettings, getFaqs } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata() { return createPageMetadata({ canonical: '/' }); }
export const dynamic = 'force-dynamic';
const rupiah = (amount: number | null) => amount === null ? 'Hubungi kami' : `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;

function SectionTitle({ kicker, title, text }: { kicker: string; title: string; text?: string }) {
  return <div className="section-title"><div><span className="eyebrow">{kicker}</span><h2>{title}</h2></div>{text && <p>{text}</p>}</div>;
}

export default async function Home() {
  const [categories, packages, portfolio, products, contact, faqs, articles] = await Promise.all([
    getCategories(), getPackages(), getPortfolio(), getProducts(), getContactSettings(), getFaqs(), getArticles(),
  ]);
  const categoryTiles = categories.slice(0, 4);
  const featured = ['mesin-cuci-lg-8-kg', 'mesin-pengering-speedqueen', 'setrika-uap-boiler-15-liter', 'meja-setrika-uap-boiler', 'chemical-laundry-detoxy-5-liter', 'keranjang-laundry-great-a']
    .map((slug) => products.find((product) => product.slug === slug))
    .filter((product) => product !== undefined);
  const quickFaqs = faqs.slice(0, 4);
  const latestArticles = articles.slice(0, 3);
  const consultationHref = waLink('Halo My Equipment, saya ingin konsultasi usaha laundry. Mohon bantu saya memilih paket yang sesuai.', contact.whatsapp);
  const siteUrl = getSiteUrl();

  const homeFaqSchema = quickFaqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: quickFaqs.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  } : null;

  return <main>
    {homeFaqSchema && (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqSchema).replace(/</g, '\\u003c') }}
      />
    )}
    {/* Modern Hero Section */}
    <section className="hero-modern-section" id="beranda">
      {/* Subtle Organic Background Waves matching Reference Design */}
      <div className="hero-bg-waves" aria-hidden="true">
        <svg viewBox="0 0 1440 620" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 390C180 390 320 450 480 530C600 590 720 620 860 620H0V390Z" fill="url(#leftWaveGrad)" />
          <path d="M740 0H1440V560C1260 560 1120 510 960 410C810 315 730 160 740 0Z" fill="url(#rightWaveGrad)" />
          <defs>
            <linearGradient id="leftWaveGrad" x1="0" y1="390" x2="600" y2="620" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#F0F7FF" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="rightWaveGrad" x1="1440" y1="0" x2="780" y2="520" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#BAE6FD" stopOpacity="0.55" />
              <stop offset="55%" stopColor="#E0F2FE" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="hero-modern-grid wrap">
        {/* Left Column: Copy & Actions */}
        <div className="hero-modern-copy">
          <div className="hero-status-pill">
            <span className="hero-pulse-dot" aria-hidden="true" />
            <span>Unit Ready Stock di Workshop Kubu Raya & Singkawang</span>
          </div>

          <h1>
            Paket Usaha Laundry Kalbar<br />
            <span className="hero-highlight-gradient">100% Mandiri Tanpa Franchise</span>
          </h1>

          <p className="hero-modern-lead">
            Distributor pusat mesin laundry komersial heavy-duty, instalasi lengkap oleh teknisi resmi, filter air anti-gambut, dan pendampingan manajemen ke 14 kabupaten/kota se-Kalimantan Barat.
          </p>

          <div className="hero-modern-actions">
            <Link
              className="hero-btn-primary"
              href={consultationHref}
              target="_blank"
              rel="noreferrer"
              style={{
                backgroundColor: '#16a34a',
                boxShadow: '0 10px 24px -4px rgba(22, 163, 74, 0.4)',
              }}
            >
              <svg className="hero-wa-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
              </svg>
              <span>Konsultasi Cepat WhatsApp</span>
              <span className="hero-btn-arrow" aria-hidden="true">→</span>
            </Link>
            <Link className="hero-btn-secondary" href="/paket-usaha/proposal">
              <span>Proposal Resmi (PDF)</span>
              <span className="hero-btn-chevron" aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="hero-modern-props">
            <div className="hero-prop-item">
              <span className="hero-prop-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <span>100% Keuntungan Milik Anda</span>
            </div>
            <div className="hero-prop-item">
              <span className="hero-prop-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </span>
              <span>Tanpa Royalti & Franchise Fee</span>
            </div>
            <div className="hero-prop-item">
              <span className="hero-prop-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>
              </span>
              <span>Garansi & Teknisi Lokal Kalbar</span>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Interactive 3D Product Showcase (Option 1: Clean Stage + HTML Components) */}
        <div className="hero-modern-media">
          <div className="hero-stage-container">
            <div className="hero-stage-visual-frame">
              <Image
                src="/images/hero-stage-clean.webp"
                alt="Paket Usaha Laundry Siap Pakai My Equipment Indonesia - Stack Washer Dryer Komersial"
                width={1024}
                height={702}
                priority
                sizes="(max-width: 900px) 100vw, 620px"
                className="hero-stage-visual-img"
              />
            </div>

            {/* Left Floating Feature Pills (HTML / Pure CSS) */}
            <div className="hero-stage-pills" aria-label="Keunggulan paket usaha">
              <div className="stage-pill stage-pill-1">
                <span className="stage-pill-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m7.5 4.27 9 5.15" />
                    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5" />
                    <path d="M12 22V12" />
                  </svg>
                </span>
                <span className="stage-pill-text">
                  <small>Paket Lengkap</small>
                  <b>Siap Operasional</b>
                </span>
                <span className="stage-pill-chevron" aria-hidden="true">›</span>
              </div>

              <div className="stage-pill stage-pill-2">
                <span className="stage-pill-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                </span>
                <span className="stage-pill-text">
                  <small>Instalasi &</small>
                  <b>Setup oleh Teknisi</b>
                </span>
                <span className="stage-pill-chevron" aria-hidden="true">›</span>
              </div>

              <div className="stage-pill stage-pill-3">
                <span className="stage-pill-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </span>
                <span className="stage-pill-text">
                  <small>Pendampingan</small>
                  <b>Manajemen Usaha</b>
                </span>
                <span className="stage-pill-chevron" aria-hidden="true">›</span>
              </div>
            </div>

            {/* Right Floating Package Card (HTML / Pure CSS) */}
            <div className="hero-stage-card" aria-label="Pilihan Paket Sesuai Kebutuhan">
              <div className="stage-card-title">Pilihan Paket Sesuai Kebutuhan</div>
              <ul className="stage-card-list">
                <li>
                  <span className="stage-check-badge" aria-hidden="true">✓</span>
                  <span>Laundry Kiloan</span>
                </li>
                <li>
                  <span className="stage-check-badge" aria-hidden="true">✓</span>
                  <span>Laundry Koin (Self Service)</span>
                </li>
                <li>
                  <span className="stage-check-badge" aria-hidden="true">✓</span>
                  <span>Laundry Komersial (Hotel, Kos, RS)</span>
                </li>
              </ul>
            </div>

            {/* Bottom Dots Decoration */}
            <div className="hero-floating-stat-badge">
              <span className="stat-stars" aria-label="Rating 5 bintang">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 20 20" fill="#f59e0b" width="13" height="13" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </span>
              <b className="stat-score">4.9 / 5.0</b>
              <small className="stat-label">Rating 100+ Mitra Usaha Kalbar</small>
            </div>

            <div className="hero-stage-dots" aria-hidden="true">
              <span className="stage-dot-arrow">‹</span>
              <span className="stage-dot-items">
                <i className="active" />
                <i />
                <i />
                <i />
              </span>
              <span className="stage-dot-arrow">›</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Trust Strip: 3 Clean Cards */}
    <section className="home-trust-strip wrap" aria-label="Informasi layanan My Equipment" data-reveal>
      <a className="home-trust-card" href={storeUrl} target="_blank" rel="noreferrer">
        <span className="trust-card-icon-wrap trust-icon-blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="8" cy="21" r="1"/>
            <circle cx="19" cy="21" r="1"/>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
          </svg>
        </span>
        <span className="trust-card-text">
          <b>Katalog & transaksi resmi</b>
          <small>Lanjutkan pembelian di toko resmi kami</small>
        </span>
        <span className="trust-card-arrow" aria-hidden="true">›</span>
      </a>

      <a className="home-trust-card" href={consultationHref} target="_blank" rel="noreferrer">
        <span className="trust-card-icon-wrap trust-icon-green">
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
          </svg>
        </span>
        <span className="trust-card-text">
          <b>Konsultasi WhatsApp</b>
          <small>Tanyakan kebutuhan Anda ke tim ahli</small>
        </span>
        <span className="trust-card-arrow" aria-hidden="true">›</span>
      </a>

      <Link className="home-trust-card" href="/kontak">
        <span className="trust-card-icon-wrap trust-icon-blue">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        </span>
        <span className="trust-card-text">
          <b>Showroom</b>
          <small>{contact.locations.slice(0, 3).map((location) => location.name).join(' & ') || 'Pontianak & Kubu Raya (Kantor Pusat) & Singkawang'}</small>
        </span>
        <span className="trust-card-arrow" aria-hidden="true">›</span>
      </Link>
    </section>

    {/* Interactive Regional Coverage Map with Direct Pins & Location Labels */}
    <InteractiveRegionalMap whatsapp={contact.whatsapp} />

    {/* Section Milestone & Animated Stats Counter */}
    <HomeStatsCounter />

    {/* Section Our Partner - Infinite Marquee Left-to-Right */}
    <HomePartnerSlider />

    {/* Interactive Laundry ROI & Financial Simulator */}
    <RoiCalculator whatsapp={contact.whatsapp} />

    {/* Interactive Dynamic Package Switcher */}
    <HomePackageSwitcher packages={packages} whatsapp={contact.whatsapp} />

    {/* Lead Magnet: Download Proposal Resmi PDF */}
    <section className="wrap home-lead-magnet-card" data-reveal>
      <div className="lead-magnet-content">
        <div className="lead-magnet-copy">
          <div className="lead-magnet-eyebrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            <span>DOKUMEN RESMI 2026</span>
          </div>
          <h2 className="lead-magnet-title">
            Butuh Proposal Resmi untuk Pengajuan Modal atau Rekanan?
          </h2>
          <p className="lead-magnet-desc">
            Buka dokumen proposal penawaran paket usaha laundry mandiri My Equipment Indonesia (mencakup rincian mesin heavy duty, estimasi modal, dan jaminan 100% tanpa royalti) dalam format PDF siap cetak.
          </p>
        </div>
        <div className="lead-magnet-actions">
          <Link
            href="/paket-usaha/proposal"
            className="lead-magnet-btn-primary"
          >
            <span>Buka Proposal PDF</span>
            <span aria-hidden="true">↗</span>
          </Link>
          <a
            href={waLink('Halo My Equipment Indonesia, saya ingin meminta file PDF Proposal dan Brosur Resmi Paket Usaha Laundry 2026.', contact.whatsapp)}
            target="_blank"
            rel="noreferrer"
            className="lead-magnet-btn-wa"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
            </svg>
            <span>Minta via WhatsApp</span>
          </a>
        </div>
      </div>
    </section>

    <section className="home-steps-section" data-reveal>
      <div className="wrap">
        <SectionTitle kicker="Cara memulai" title="Dari rencana sampai pilihan yang tepat" text="Tim My Equipment membantu Anda memahami pilihan sebelum melanjutkan transaksi." />
        <div className="home-step-grid">
          <article><span className="home-step-number">01</span><span className="home-step-icon"><CategoryIcon slug="consultation" /></span><h3>Konsultasikan kebutuhan</h3><p>Ceritakan jenis layanan laundry dan kebutuhan usaha yang sedang direncanakan.</p></article>
          <article><span className="home-step-number">02</span><span className="home-step-icon"><CategoryIcon slug="quality" /></span><h3>Konfirmasi pilihan</h3><p>Minta rincian isi paket, spesifikasi, ketersediaan, dan harga terbaru.</p></article>
          <article><span className="home-step-number">03</span><span className="home-step-icon"><CategoryIcon slug="catalog" /></span><h3>Transaksi di toko resmi</h3><p>Lanjutkan pembelian melalui toko resmi setelah detailnya sesuai kebutuhan.</p></article>
        </div>
      </div>
    </section>

    <nav className="category-strip home-category-strip wrap" aria-label="Kategori produk pilihan" data-reveal>
      {categoryTiles.map((category) => <Link key={category.slug} href={`/produk?kategori=${category.slug}`}><span><CategoryIcon slug={category.slug} /></span><b>{category.title}</b><small>{category.desc}</small></Link>)}
      <Link href="/produk"><span><CategoryIcon slug="all" /></span><b>Semua kategori</b><small>Lihat katalog produk</small></Link>
    </nav>

    <section className="section wrap home-products" id="produk" data-reveal><SectionTitle kicker="Produk unggulan" title="Produk pilihan" text="Sebagian produk dari katalog lokal. Katalog lengkap dan transaksi tersedia di toko resmi." />
      <div className="home-product-grid">{featured.map((product) => <Link className="home-product-card" href={`/produk/${product.slug}`} key={product.slug}>
        <div className="home-product-image">{product.image ? <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 650px) 45vw, (max-width: 950px) 16vw, 190px" /> : <span><CategoryIcon slug={product.categorySlug} /></span>}</div>
        <h3>{product.name}</h3><b>{rupiah(product.price)}</b>
      </Link>)}</div>
      <div className="center"><Link className="button button-outline" href="/produk">Jelajahi Katalog <span aria-hidden="true">→</span></Link> <Link className="text-link" href={storeUrl} target="_blank" rel="noreferrer">Katalog lengkap di toko resmi ↗</Link></div>
    </section>

    <section className="portfolio-home" data-reveal><div className="wrap"><SectionTitle kicker="Portfolio" title="Inspirasi outlet laundry" text="Dokumentasi outlet My Equipment dengan izin publikasi yang tercatat." />{portfolio.length > 0 ? <div className="portfolio-home-grid">{portfolio.slice(0, 3).map((item) => <article className="portfolio-home-item" key={item.id}><Link className="portfolio-home-card" href="/inspirasi"><Image src={item.image} alt={item.name} width={720} height={480} sizes="(max-width: 650px) 90vw, 30vw" /><b>{item.name}</b></Link><Link className="content-whatsapp-link" href={waLink(`Halo My Equipment, saya melihat portfolio ${item.name} dan ingin berdiskusi tentang kebutuhan peralatan atau paket usaha laundry. Sumber: beranda, portfolio outlet ${item.name}.`, contact.whatsapp)} target="_blank" rel="noreferrer">Tanya tentang outlet ini <span aria-hidden="true">↗</span></Link></article>)}</div> : <div className="portfolio-home-empty"><b>Portfolio sedang disiapkan</b><p>Foto dan nama outlet akan tampil setelah izin publikasi tercatat.</p></div>}<Link className="text-link" href="/inspirasi">Lihat halaman portfolio →</Link></div></section>

    <section className="home-editorial section wrap" aria-label="Artikel dan video pilihan My Equipment" data-reveal>
      <SectionTitle kicker="Cerita My Equipment" title="Artikel, kegiatan, dan video pilihan" text="Ikuti dokumentasi dan konten terbaru dari My Equipment Indonesia." />
      {latestArticles.length > 0 && <div className="home-editorial-subsection">
        <div className="home-editorial-subheading"><h3>Artikel & kegiatan terbaru</h3><Link href="/artikel">Lihat semua artikel <span aria-hidden="true">→</span></Link></div>
        <div className="home-article-preview-grid">{latestArticles.map((article) => <article className="article-card home-article-preview" key={article.id}><Link href={`/artikel/${article.slug}`} className="article-card-link">{article.coverImage ? <div className="article-card-image"><Image src={article.coverImage} alt={article.coverAlt} fill sizes="(max-width:700px) 100vw, (max-width:1000px) 50vw, 33vw" /></div> : <div className="article-card-image article-card-placeholder" aria-hidden="true"><span>ME</span></div>}<div className="article-card-copy"><div><span className="article-type">{article.type === 'activity' ? 'Kegiatan' : 'Artikel'}</span>{article.type === 'activity' && article.eventDate && <time dateTime={article.eventDate}>{new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${article.eventDate.slice(0, 10)}T00:00:00Z`))}</time>}</div><h3>{article.title}</h3><p>{article.excerpt}</p><span className="article-read-link">Baca selengkapnya <span aria-hidden="true">→</span></span></div></Link></article>)}</div>
      </div>}
      {!latestArticles.length && <div className="home-editorial-note"><span className="eyebrow">ARTIKEL & KEGIATAN</span><p>Tulisan dan dokumentasi kegiatan akan muncul di sini setelah diterbitkan melalui CMS.</p><Link href="/artikel">Jelajahi halaman artikel <span aria-hidden="true">→</span></Link></div>}
      <div className="home-editorial-subsection home-video-preview" aria-labelledby="home-video-heading">
        <div className="home-editorial-subheading"><div><span className="eyebrow">VIDEO PILIHAN</span><h3 id="home-video-heading">My Equipment Indonesia di YouTube</h3></div><a href="https://www.youtube.com/@myequipmentindonesia" target="_blank" rel="noopener noreferrer">Kunjungi kanal <span aria-hidden="true">↗</span></a></div>
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
      </div>
      <div className="center home-editorial-all"><Link className="button button-outline" href="/artikel">Lihat semua artikel & kegiatan <span aria-hidden="true">→</span></Link></div>
    </section>

    <section className="showroom" id="showroom" data-reveal><div className="wrap showroom-inner"><div><span className="eyebrow">Kunjungi langsung</span><h2>Kenali produk lebih dekat<br/>di showroom kami.</h2><p>Atur kunjungan dan konfirmasikan informasi lokasi bersama tim My Equipment.</p><Link className="button button-light" href="/kontak">Informasi Showroom</Link></div><div className="showroom-list">{contact.locations.slice(0, 2).map((location, index) => <article key={location.name}><span>{String(index + 1).padStart(2, '0')}</span><div><b>{location.name}</b><p>{location.address}</p></div><Link href={waLink(`Halo My Equipment, saya ingin mengatur kunjungan ke showroom ${location.name}. Mohon konfirmasi alamat dan kesiapan sebelum saya datang. Sumber: beranda, bagian showroom ${location.name}.`, contact.whatsapp)} target="_blank" rel="noreferrer">Atur kunjungan ↗</Link></article>)}</div></div></section>

    {quickFaqs.length > 0 && <section className="section wrap home-faq" aria-label="Pertanyaan umum" data-reveal>
      <SectionTitle kicker="Pertanyaan umum" title="Sebelum Anda memilih" text="Jawaban singkat untuk membantu menentukan langkah berikutnya." />
      <div className="home-faq-list">{quickFaqs.map((item) => <details key={item.id}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p><Link href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>Lihat informasi terkait →</Link></details>)}</div>
      <Link className="home-faq-more" href="/faq">Lihat semua pertanyaan <span aria-hidden="true">→</span></Link>
    </section>}

    <section className="wrap cta home-cta" data-reveal><div><span className="eyebrow">Mulai usaha laundry Anda</span><h2>Mari rencanakan kebutuhan bersama.</h2><p>Konsultasikan pilihan paket dan perlengkapan lewat WhatsApp.</p></div><Link className="button button-light" href={consultationHref} target="_blank" rel="noreferrer">Konsultasi Gratis <span aria-hidden="true">↗</span></Link><Image src="/images/hero-stacked.webp" alt="" aria-hidden="true" width={400} height={400} sizes="200px" /></section>
  </main>;
}
