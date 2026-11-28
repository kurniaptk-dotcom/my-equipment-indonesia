import Link from 'next/link';
import Image from 'next/image';
import { storeUrl, waLink } from '@/data/catalog';
import { CategoryIcon } from '@/components/category-icon';
import { YoutubePlayer } from '@/components/youtube-player';
import { InteractiveRegionalMap } from '@/components/interactive-regional-map';
import { HomePackageSwitcher } from '@/components/home-package-switcher';
import { HomeKeyFacts } from '@/components/home-key-facts';
import { BrandTrustStrip } from '@/components/brand-trust-strip';
import { featuredVideos } from '@/data/featured-videos';
import { getArticles, getCategories, getPackages, getPortfolio, getProducts, getContactSettings, getFaqs } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata() {
  return createPageMetadata({
    title: { absolute: 'Pusat Mesin dan Paket Usaha Laundry Mandiri Kalbar' },
    description: 'Pusat mesin laundry komersial & paket usaha laundry mandiri 0% royalti di Kalbar. Ready stock washer front load, dryer konversi gas 150W, dan setrika boiler.',
    canonical: '/',
  });
}
export const revalidate = 60;
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
  const consultationHref = waLink('Halo My Equipment, saya ingin konsultasi usaha laundry. Mohon bantu saya memilih paket yang sesuai.', contact.whatsapp, 'WEB-HOME-HERO');
  const homeBottomCtaHref = waLink('Halo My Equipment, saya ingin konsultasi usaha laundry. Mohon bantu saya memilih paket yang sesuai.', contact.whatsapp, 'WEB-HOME-BOTTOM-CTA');
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
    {/* Industrial Editorial Hero Section (Clean, Hardware-First, Zero-Slop) */}
    <section className="hero-editorial" id="beranda">
      <div className="hero-editorial-grid wrap">
        {/* Left Column: Sharp Typography & Direct Actions */}
        <div className="hero-editorial-copy">
          <p className="hero-editorial-eyebrow">
            Distributor Resmi Mesin Laundry Kalimantan &middot; Pontianak &amp; Singkawang
          </p>

          <h1 className="hero-editorial-title">
            Paket Usaha Laundry Kalbar.{' '}
            <span>100% Mandiri Tanpa Franchise.</span>
          </h1>

          <p className="hero-editorial-lead">
            Pusat mesin laundry komersial heavy-duty dengan <strong>Gratis Instalasi Teknisi</strong>, <strong>Gratis Ongkir</strong>, dan <strong>Pelatihan Manajemen Bisnis</strong> siap operasional ke 14 kabupaten/kota se-Kalbar hingga seluruh Kalimantan.
          </p>

          <div className="hero-editorial-actions">
            <Link
              className="hero-editorial-btn-wa"
              href={consultationHref}
              target="_blank"
              rel="noreferrer"
            >
              <svg className="hero-wa-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
              </svg>
              <span>Konsultasi via WhatsApp</span>
            </Link>
            <Link className="hero-editorial-btn-secondary" href="/paket-usaha/proposal">
              <span>Proposal Resmi (PDF)</span>
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <dl className="hero-editorial-specs" aria-label="Ringkasan spesifikasi layanan">
            <div>
              <dt>Skema Kepemilikan</dt>
              <dd>0% Royalti Seumur Hidup</dd>
            </div>
            <div>
              <dt>Efisiensi Dryer Gas</dt>
              <dd>Hemat Listrik 150 Watt</dd>
            </div>
            <div>
              <dt>Jaminan Purnajual</dt>
              <dd>Teknisi &amp; Sparepart Lokal</dd>
            </div>
          </dl>
        </div>

        {/* Right Column: Clean, Unobstructed Hardware Showcase */}
        <div className="hero-editorial-media">
          <figure className="hero-editorial-frame">
            <div className="hero-editorial-img-wrap">
              <Image
                src="/images/hero-stage-clean.webp"
                alt="Paket Usaha Laundry Siap Pakai My Equipment Indonesia - Stack Washer Dryer Komersial"
                width={1024}
                height={702}
                priority
                sizes="(max-width: 900px) 100vw, 560px"
                className="hero-editorial-img"
              />
            </div>
            <figcaption className="hero-editorial-caption">
              <span>Unit Komersial Ready Stock</span>
              <b>Mulai Rp 16,5 Juta &middot; Rating 4.9/5 (100+ Mitra)</b>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    {/* Direct Fact Box: AIO & GEO Grounding Parameters */}
    <HomeKeyFacts />

    {/* Interactive Dynamic Package Switcher */}
    <HomePackageSwitcher packages={packages} whatsapp={contact.whatsapp} />

    {/* Brand Authority Strip */}
    <BrandTrustStrip />

    {/* Static SEO Category Navigation Strip */}
    <nav className="category-strip home-category-strip wrap" aria-label="Kategori produk pilihan" data-reveal>
      {categoryTiles.map((category) => <Link key={category.slug} href={`/produk/kategori/${category.slug}`}><span><CategoryIcon slug={category.slug} /></span><b>{category.title}</b><small>{category.desc}</small></Link>)}
      <Link href="/produk"><span><CategoryIcon slug="all" /></span><b>Semua kategori</b><small>Lihat katalog produk</small></Link>
    </nav>

    <section className="section wrap home-products" id="produk" data-reveal><SectionTitle kicker="Produk unggulan" title="Produk pilihan" text="Sebagian produk dari katalog lokal. Katalog lengkap dan transaksi tersedia di toko resmi." />
      <div className="home-product-grid">{featured.map((product) => <Link className="home-product-card" href={`/produk/${product.slug}`} key={product.slug}>
        <div className="home-product-image">{product.image ? <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 650px) 45vw, (max-width: 950px) 16vw, 190px" /> : <span><CategoryIcon slug={product.categorySlug} /></span>}</div>
        <h3>{product.name}</h3><b>{rupiah(product.price)}</b>
      </Link>)}</div>
      <div className="center"><Link className="button button-outline" href="/produk" aria-label="Jelajahi Katalog Mesin dan Perlengkapan Laundry">Jelajahi Katalog Mesin <span aria-hidden="true">→</span></Link> <Link className="text-link" href="/estimasi-modal">Simulasi Kalkulator Modal &amp; ROI →</Link></div>
    </section>

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
            href={waLink('Halo My Equipment Indonesia, saya ingin meminta file PDF Proposal dan Brosur Resmi Paket Usaha Laundry 2026.', contact.whatsapp, 'WEB-HOME-PROPOSAL-PDF')}
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

    <section className="portfolio-home" data-reveal><div className="wrap"><SectionTitle kicker="Portfolio" title="Inspirasi outlet laundry" text="Dokumentasi outlet My Equipment dengan izin publikasi yang tercatat." />{portfolio.length > 0 ? <div className="portfolio-home-grid">{portfolio.slice(0, 3).map((item) => <article className="portfolio-home-item" key={item.id}><Link className="portfolio-home-card" href="/inspirasi"><Image src={item.image} alt={item.name} width={720} height={480} sizes="(max-width: 650px) 90vw, 30vw" /><b>{item.name}</b></Link><Link className="content-whatsapp-link" href={waLink(`Halo My Equipment, saya melihat portfolio ${item.name} dan ingin berdiskusi tentang kebutuhan peralatan atau paket usaha laundry. Sumber: beranda, portfolio outlet ${item.name}.`, contact.whatsapp, `WEB-HOME-PORTFOLIO-${String(item.id).toUpperCase()}`)} target="_blank" rel="noreferrer">Konsultasi Paket Outlet {item.name} <span aria-hidden="true">↗</span></Link></article>)}</div> : <div className="portfolio-home-empty"><b>Portfolio sedang disiapkan</b><p>Foto dan nama outlet akan tampil setelah izin publikasi tercatat.</p></div>}<Link className="text-link" href="/inspirasi">Lihat Galeri Dokumentasi Portfolio Outlet Laundry →</Link></div></section>

    {/* Interactive Regional Coverage Map */}
    <InteractiveRegionalMap whatsapp={contact.whatsapp} />

    {/* Solusi & Panduan Strategis Bisnis Laundry */}
    <section className="section wrap home-solutions-hub" data-reveal style={{ paddingTop: '20px', paddingBottom: '30px' }}>
      <SectionTitle
        kicker="Pusat Panduan & Solusi"
        title="Rujukan Praktis & Bimbingan Teknis Usaha Laundry"
        text="Panduan operasional lapangan, kalkulasi modal, penanganan kimia, hingga solusi pengadaan mesin B2B di Kalimantan."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px', marginTop: '24px' }}>
        {/* Card 1: B2B Sektoral */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#075fd4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pengadaan B2B & Korporasi</span>
          <h3 style={{ fontSize: '16px', fontWeight: 750, margin: '8px 0 10px', color: '#0f172a' }}>Laundry Hotel, Resort, & Pesantren</h3>
          <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6, margin: '0 0 14px' }}>
            Solusi in-house laundry untuk efisiensi biaya vendor hingga 60%, mesin heavy-duty tahan getaran, dan pemanas gas 150 Watt.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Link href="/artikel/pengadaan-mesin-laundry-hotel-dan-resort-kalbar" style={{ fontSize: '12px', fontWeight: 700, color: '#075fd4' }}>
              Solusi Laundry Hotel & Resort Kalbar →
            </Link>
            <Link href="/artikel/paket-usaha-laundry-asrama-dan-pesantren-kalbar" style={{ fontSize: '12px', fontWeight: 700, color: '#075fd4' }}>
              Pengadaan Laundry Asrama & Pesantren →
            </Link>
          </div>
        </div>

        {/* Card 2: Pemeliharaan & Troubleshooting */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#075fd4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Teknis, Servis, & Chemical</span>
          <h3 style={{ fontSize: '16px', fontWeight: 750, margin: '8px 0 10px', color: '#0f172a' }}>Troubleshooting & Sanitasi Pakaian</h3>
          <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6, margin: '0 0 14px' }}>
            Solusi mandiri mesin pengering gas tidak panas, pengecekan pemantik solenoid, dosis deterjen matic, dan formula anti noda membandel.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Link href="/artikel/penyebab-dryer-gas-tidak-mau-panas-dan-solusi-pemantik-laundry" style={{ fontSize: '12px', fontWeight: 700, color: '#075fd4' }}>
              Penyebab Dryer Gas Tidak Panas & Solusinya →
            </Link>
            <Link href="/artikel/resep-dosis-chemical-laundry-kiloan-dan-cara-hilangkan-noda-membandel" style={{ fontSize: '12px', fontWeight: 700, color: '#075fd4' }}>
              SOP Dosis Chemical & Resep Parfum 30 Hari →
            </Link>
          </div>
        </div>

        {/* Card 3: Otomasi & Finansial Modal */}
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '20px' }}>
          <span style={{ fontSize: '11px', fontWeight: 800, color: '#075fd4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Otomasi & Simulasi Modal</span>
          <h3 style={{ fontSize: '16px', fontWeight: 750, margin: '8px 0 10px', color: '#0f172a' }}>Laundromat Koin & Pilihan Modal</h3>
          <p style={{ fontSize: '12px', color: '#64748b', lineHeight: 1.6, margin: '0 0 14px' }}>
            Bisnis laundromat koin self-service berbasis QRIS autopilot tanpa karyawan, serta komparasi modal 15 Juta vs 25 Juta vs 50 Juta.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <Link href="/artikel/panduan-buka-laundromat-koin-qris-autopilot-kalbar" style={{ fontSize: '12px', fontWeight: 700, color: '#075fd4' }}>
              Panduan Buka Laundromat Koin & QRIS →
            </Link>
            <Link href="/artikel/panduan-memilih-paket-laundry-modal-15-juta-25-juta-50-juta" style={{ fontSize: '12px', fontWeight: 700, color: '#075fd4' }}>
              Komparasi Modal: 15 Jt vs 25 Jt vs 50 Jt →
            </Link>
          </div>
        </div>
      </div>
    </section>

    <section className="home-editorial section wrap" aria-label="Artikel dan video pilihan My Equipment" data-reveal>
      <SectionTitle kicker="Cerita My Equipment" title="Artikel, kegiatan, dan video pilihan" text="Ikuti dokumentasi dan konten terbaru dari My Equipment Indonesia." />
      {latestArticles.length > 0 && <div className="home-editorial-subsection">
        <div className="home-editorial-subheading"><h3>Artikel & kegiatan terbaru</h3><Link href="/artikel">Lihat Seluruh Panduan &amp; Edukasi Laundry <span aria-hidden="true">→</span></Link></div>
        <div className="home-article-preview-grid">{latestArticles.map((article) => <article className="article-card home-article-preview" key={article.id}><Link href={`/artikel/${article.slug}`} className="article-card-link" aria-label={`Baca panduan lengkap ${article.title}`}>{article.coverImage ? <div className="article-card-image"><Image src={article.coverImage} alt={article.coverAlt} fill sizes="(max-width:700px) 100vw, (max-width:1000px) 50vw, 33vw" /></div> : <div className="article-card-image article-card-placeholder" aria-hidden="true"><span>ME</span></div>}<div className="article-card-copy"><div><span className="article-type">{article.type === 'activity' ? 'Kegiatan' : 'Artikel'}</span>{article.type === 'activity' && article.eventDate && <time dateTime={article.eventDate}>{new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${article.eventDate.slice(0, 10)}T00:00:00Z`))}</time>}</div><h3>{article.title}</h3><p>{article.excerpt}</p><span className="article-read-link">Baca ulasan selengkapnya <span aria-hidden="true">→</span></span></div></Link></article>)}</div>
      </div>}
      {!latestArticles.length && <div className="home-editorial-note"><span className="eyebrow">ARTIKEL & KEGIATAN</span><p>Tulisan dan dokumentasi kegiatan akan muncul di sini setelah diterbitkan melalui CMS.</p><Link href="/artikel">Jelajahi Seluruh Panduan &amp; Artikel Laundry <span aria-hidden="true">→</span></Link></div>}
      <div className="home-editorial-subsection home-video-preview" aria-labelledby="home-video-heading">
        <div className="home-editorial-subheading"><div><span className="eyebrow">VIDEO PILIHAN</span><h3 id="home-video-heading">My Equipment Indonesia di YouTube</h3></div><a href="https://www.youtube.com/@myequipmentindonesia" target="_blank" rel="noopener noreferrer">Kunjungi Kanal YouTube @myequipmentindonesia <span aria-hidden="true">↗</span></a></div>
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
      <div className="center home-editorial-all"><Link className="button button-outline" href="/artikel">Buka Seluruh Panduan &amp; Kegiatan Laundry <span aria-hidden="true">→</span></Link></div>
    </section>

    <section className="showroom" id="showroom" data-reveal><div className="wrap showroom-inner"><div><span className="eyebrow">Kunjungi langsung</span><h2>Kenali produk lebih dekat<br/>di showroom kami.</h2><p>Atur kunjungan dan konfirmasikan informasi lokasi bersama tim My Equipment.</p><Link className="button button-light" href="/kontak">Informasi Showroom</Link></div><div className="showroom-list">{contact.locations.slice(0, 2).map((location, index) => <article key={location.name}><span>{String(index + 1).padStart(2, '0')}</span><div><b>{location.name}</b><p>{location.address}</p></div><Link href={waLink(`Halo My Equipment, saya ingin mengatur kunjungan ke showroom ${location.name}. Mohon konfirmasi alamat dan kesiapan sebelum saya datang. Sumber: beranda, bagian showroom ${location.name}.`, contact.whatsapp, `WEB-HOME-SHOWROOM-${index + 1}`)} target="_blank" rel="noreferrer">Jadwalkan Kunjungan ke Showroom {location.name.split('(')[0].trim()} ↗</Link></article>)}</div></div></section>

    {quickFaqs.length > 0 && <section className="section wrap home-faq" aria-label="Pertanyaan umum" data-reveal>
      <SectionTitle kicker="Pertanyaan umum" title="Sebelum Anda memilih" text="Jawaban singkat untuk membantu menentukan langkah berikutnya." />
      <div className="home-faq-list">{quickFaqs.map((item) => <details key={item.id}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p><Link href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>Pelajari Panduan Solusi Terkait: {item.question} →</Link></details>)}</div>
      <Link className="home-faq-more" href="/faq">Buka Seluruh Tanya Jawab (FAQ) Usaha Laundry <span aria-hidden="true">→</span></Link>
    </section>}

    <section className="wrap cta home-cta" data-reveal><div><span className="eyebrow">Mulai usaha laundry Anda</span><h2>Mari rencanakan kebutuhan bersama.</h2><p>Konsultasikan pilihan paket dan perlengkapan lewat WhatsApp.</p></div><Link className="button button-light" href={homeBottomCtaHref} target="_blank" rel="noreferrer">Konsultasi Gratis <span aria-hidden="true">↗</span></Link><Image src="/images/hero-stacked.webp" alt="Paket mesin laundry komersial My Equipment Indonesia" width={400} height={400} sizes="200px" /></section>
  </main>;
}
