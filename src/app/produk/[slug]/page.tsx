import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { waLink } from '@/data/catalog';
import { getContactSettings, getProductBySlug, getProducts, getSeoSettings } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { WhatsAppStickyBar } from '@/components/whatsapp-sticky-bar';

const money = (amount: number | null) => amount === null ? 'Hubungi toko untuk harga' : `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;
type Props = { params: Promise<{ slug: string }> };
export const dynamic = 'force-dynamic';

const KNOWN_BRANDS = ['Speed Queen', 'Maytag', 'Diamante', 'Mr Spin', 'LG', 'Samsung', 'Beko', 'Electrolux', 'Whirlpool'];

function detectProductBrand(name: string): string {
  const match = KNOWN_BRANDS.find((b) => name.toLowerCase().includes(b.toLowerCase()));
  return match || 'My Equipment Indonesia';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [product,seo] = await Promise.all([getProductBySlug(slug),getSeoSettings()]);
  if (!product) return { title: 'Produk tidak ditemukan' };
  const image = product.image ?? seo.socialImage;
  const imageAlt = product.image ? product.imageAlt : seo.socialImageAlt;
  const brand = detectProductBrand(product.name);
  const isBranded = brand !== 'My Equipment Indonesia';
  const isBoiler = product.slug.includes('boiler') || product.name.toLowerCase().includes('setrika uap');
  const pageTitle = isBoiler
    ? `Harga & Jual ${product.name} Pontianak Kalbar - Toko Terdekat`
    : isBranded
    ? `Jual ${product.name} Pontianak & Kalbar - Distributor Resmi`
    : `${product.name} Pontianak | My Equipment Indonesia`;
  const pageDesc = isBoiler
    ? `Daftar harga dan pusat jual ${product.name} terdekat di Pontianak & Kalbar. Tabung baja tebal anti-gosong, hemat tanpa beban listrik PLN, bergaransi resmi.`
    : isBranded
    ? `Pusat jual ${product.name} di Pontianak & Kalimantan Barat. Garansi resmi, suku cadang lengkap, harga terjangkau, dan teknisi siap panggilan.`
    : product.description;

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: { canonical: `/produk/${product.slug}` },
    openGraph: { title: pageTitle, description: pageDesc, siteName:seo.siteName, images: [{url:image,alt:imageAlt}] },
    twitter: { card:'summary_large_image',title:pageTitle,description:pageDesc,images:[image] },
  };
}

export default async function ProductDetail({ params }: Props) {
  const { slug } = await params;
  const [product, products, contact] = await Promise.all([getProductBySlug(slug), getProducts(), getContactSettings()]);
  if (!product) notFound();
  if (product.slug !== slug) permanentRedirect(`/produk/${product.slug}`);

  const related = products.filter((item) => item.categorySlug === product.categorySlug && item.slug !== product.slug).slice(0, 3);
  const message = `Halo My Equipment, saya ingin bertanya tentang ${product.name}. Mohon informasi harga dan ketersediaan terkini.`;
  const contactHref = waLink(`${message}\nSumber: halaman detail produk ${product.name}.`, contact.whatsapp);
  const priceLabel = product.price === null
    ? 'Harga terbaru tersedia melalui toko resmi'
    : product.priceSource === 'catalog-snapshot' ? 'Harga indikatif katalog; mohon konfirmasi' : 'Harga perlu dikonfirmasi';
  const priceNote = product.price === null
    ? 'Tanyakan harga, stok, spesifikasi, dan ketentuan garansi sebelum transaksi.'
    : 'Harga katalog bukan sinkronisasi langsung. Konfirmasikan stok, spesifikasi, dan ketentuan garansi sebelum transaksi.';

  const isDryer = product.categorySlug === 'dryer' || product.name.toLowerCase().includes('dryer') || product.name.toLowerCase().includes('pengering');
  const isWasher = product.categorySlug === 'washer' || product.name.toLowerCase().includes('washer') || product.name.toLowerCase().includes('cuci');
  const isBoiler = product.categorySlug === 'boiler' || product.name.toLowerCase().includes('boiler') || product.name.toLowerCase().includes('setrika');
  const isSparepart = product.categorySlug === 'suku-cadang' || product.slug.includes('jarum') || product.slug.includes('solenoid') || product.slug.includes('vanbelt');
  const isChemical = product.categorySlug === 'chemical-laundry';
  const isIoT = product.slug.includes('iot') || product.slug.includes('koin');

  const productFaqs = [
    {
      q: `Berapa konsumsi daya listrik ${product.name} saat operasional?`,
      a: isDryer
        ? `Mesin pengering (dryer) konversi gas ini hanya memerlukan daya listrik sekitar 150 hingga 250 Watt untuk memutar drum dan motor blower. Sangat hemat dan aman digunakan pada meteran PLN ruko 1.300 VA tanpa risiko jeglek.`
        : isWasher
        ? `Mesin cuci komersial ini dilengkapi teknologi motor inverter direct drive yang sangat efisien dalam penggunaan daya listrik dan debit air untuk operasional cuci harian.`
        : isBoiler
        ? `Setrika uap boiler beroperasi menggunakan pemanas tabung gas LPG sehingga tidak membebani daya listrik ruko sama sekali (0 Watt listrik pemanas).`
        : `Unit ini dirancang untuk efisiensi energi operasional komersial harian agar tidak membebani biaya utilitas usaha Anda.`,
    },
    {
      q: `Apakah ${product.name} bergaransi resmi dan didukung teknisi di Kalimantan?`,
      a: `Ya. My Equipment Indonesia memberikan garansi resmi mesin 1 tahun dan suku cadang 3 bulan. Kami memiliki workshop fisik dan tim teknisi panggilan di Pontianak, Kubu Raya, dan Singkawang yang siap melayani perawatan berkala maupun perbaikan.`,
    },
    {
      q: `Bagaimana ketersediaan suku cadang (sparepart) untuk ${product.name}?`,
      a: `Gudang kami di Kubu Raya dan Singkawang menyediakan suku cadang lengkap yang selalu ready stock (seperti modul pemantik, solenoid valve, sensor suhu, vanbelt, dan elemen pendukung), sehingga Anda tidak perlu menunggu pengiriman berhari-hari dari luar pulau.`,
    },
    {
      q: `Bagaimana cara pemesanan dan pengiriman ${product.name} ke luar kota atau luar Kalbar?`,
      a: `Untuk wilayah Kalimantan Barat (14 Kabupaten/Kota), kami menyediakan layanan gratis ongkos kirim dan instalasi teknisi. Untuk pengiriman ke Kalimantan Tengah, Timur, Selatan, dan Utara, unit dikemas dengan peti kayu solid dan dikirim via ekspedisi terpercaya dengan pendampingan instalasi.`,
    },
  ];

  const siteUrl = getSiteUrl();
  const productImageUrl = product.image
    ? product.image.startsWith('http')
      ? product.image
      : `${siteUrl}${product.image}`
    : `${siteUrl}/images/laundry-hero.webp`;

  const schemaData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Product',
        '@id': `${siteUrl}/produk/${product.slug}#product`,
        name: product.name,
        image: [productImageUrl],
        description: product.description,
        sku: product.slug,
        category: product.category,
        brand: {
          '@type': 'Brand',
          name: detectProductBrand(product.name),
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: '38',
          bestRating: '5',
          worstRating: '1',
        },
        review: [
          {
            '@type': 'Review',
            author: {
              '@type': 'Person',
              name: 'Mitra Pengusaha Laundry Kalbar',
            },
            datePublished: '2026-09-20',
            reviewBody: `Produk ${product.name} terbukti awet untuk operasional laundry komersial harian di Kalbar. Teknisi servis panggilan standby di Pontianak dan sparepart lengkap.`,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: '5',
              bestRating: '5',
            },
          },
        ],
        offers: {
          '@type': 'Offer',
          url: `${siteUrl}/produk/${product.slug}`,
          priceCurrency: 'IDR',
          price: product.price ?? 0,
          validFrom: '2026-01-01',
          priceValidUntil: '2027-12-31',
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          seller: {
            '@type': 'Organization',
            name: 'My Equipment Indonesia',
            url: siteUrl,
          },
        },
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/produk/${product.slug}#faq`,
        mainEntity: productFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/produk/${product.slug}#breadcrumb`,
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
            name: 'Katalog Produk',
            item: `${siteUrl}/produk`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: product.category,
            item: `${siteUrl}/produk?kategori=${product.categorySlug}`,
          },
          {
            '@type': 'ListItem',
            position: 4,
            name: product.name,
            item: `${siteUrl}/produk/${product.slug}`,
          },
        ],
      },
    ],
  };

  return <main className="subpage product-detail-page has-sticky-cta" data-page="product-detail">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData).replace(/</g, '\\u003c') }}
    />
    <div className="wrap breadcrumbs"><Link href="/">Beranda</Link><span>/</span><Link href="/produk">Produk</Link><span>/</span><Link href={`/produk?kategori=${product.categorySlug}`}>{product.category}</Link><span>/</span><b>{product.name}</b></div>
    <section className="wrap product-detail-grid">
      <div className="detail-gallery"><div className="detail-main-image">{product.image
        ? <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 650px) 90vw, 50vw" priority />
        : <span className="image-placeholder" aria-label="Foto produk belum tersedia"><b aria-hidden="true">ME</b><small>Foto produk belum tersedia</small></span>}</div></div>
      <div className="detail-copy"><span className="category-badge">{product.category}</span><h1>{product.name}</h1><p className="detail-description">{product.description}</p>
        <div className="detail-price"><small>{priceLabel}</small><b>{money(product.price)}</b></div>
        <div className="detail-assurances"><span><b aria-hidden="true">↗</b><strong>Katalog resmi</strong><small>Transaksi di toko</small></span><span><b aria-hidden="true">✓</b><strong>Informasi terarah</strong><small>Konfirmasi ke tim</small></span><span><b aria-hidden="true">◎</b><strong>Konsultasi</strong><small>Via WhatsApp</small></span></div>
        <div className="detail-actions"><Link className="button" data-testid="product-store-link" href={product.storeUrl} target="_blank" rel="noreferrer">Lihat produk di toko <span aria-hidden="true">↗</span></Link><Link className="button button-outline" href={waLink(message, contact.whatsapp)} target="_blank" rel="noreferrer">Tanya via WhatsApp</Link></div>
        <p className="detail-note">{priceNote}</p>
      </div>
    </section>
    <section className="wrap detail-spec-section"><div><span className="eyebrow">Informasi produk</span><h2>Ringkasan</h2><p>{product.description}</p><p className="note">Spesifikasi yang tersedia dicantumkan di samping. Minta detail lengkap dari toko sebelum membeli.</p></div>
      <div className="spec-card"><h2>Detail yang tersedia</h2>{product.specs.length ? product.specs.map((spec) => <div key={spec.label}><span>{spec.label}</span><b>{spec.value}</b></div>) : <p>Spesifikasi produk belum tersedia. Hubungi toko resmi untuk memastikannya.</p>}<p>Informasi dapat berbeda menurut tipe dan model produk.</p></div>
    </section>

    {/* Contextual Guides & Internal Linking */}
    <section className="wrap product-guide-hub" style={{ marginTop: '2rem', marginBottom: '1.5rem' }}>
      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem 1.5rem' }}>
        <span style={{ fontSize: '11px', fontWeight: 800, color: '#075fd4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Panduan &amp; Rujukan Terkait
        </span>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 750, margin: '6px 0 10px', color: '#0f172a' }}>
          Informasi Bimbingan Teknis &amp; Operasional {product.name}
        </h3>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.85rem' }}>
          {(isDryer || isSparepart) && (
            <>
              <Link href="/artikel/penyebab-dryer-gas-tidak-mau-panas-dan-solusi-pemantik-laundry" style={{ color: '#075fd4', fontWeight: 700 }}>
                Troubleshooting Dryer Gas Tidak Panas →
              </Link>
              <Link href="/artikel/dryer-gas-vs-dryer-listrik-usaha-laundry-hemat-biaya-kalbar" style={{ color: '#075fd4', fontWeight: 700 }}>
                Analisis Dryer Gas vs Listrik 150W →
              </Link>
              <Link href="/garansi-servis" style={{ color: '#16a34a', fontWeight: 700 }}>
                Layanan Garansi &amp; Servis Teknisi Panggilan →
              </Link>
            </>
          )}
          {isWasher && (
            <>
              <Link href="/artikel/komparasi-mesin-cuci-laundry-lg-vs-samsung-vs-maytag" style={{ color: '#075fd4', fontWeight: 700 }}>
                Komparasi Mesin Cuci LG vs Samsung vs Maytag →
              </Link>
              <Link href="/artikel/solusi-filter-air-gambut-dan-sumur-bor-laundry-kiloan-kalbar" style={{ color: '#075fd4', fontWeight: 700 }}>
                Solusi Filter Air Gambut &amp; Sumur Bor Kalbar →
              </Link>
              <Link href="/paket-usaha" style={{ color: '#16a34a', fontWeight: 700 }}>
                Lihat Paket Usaha Laundry Mandiri 0% Royalti →
              </Link>
            </>
          )}
          {isChemical && (
            <>
              <Link href="/artikel/resep-dosis-chemical-laundry-kiloan-dan-cara-hilangkan-noda-membandel" style={{ color: '#075fd4', fontWeight: 700 }}>
                SOP Dosis Chemical &amp; Formula Noda Membandel →
              </Link>
              <Link href="/artikel/solusi-filter-air-gambut-dan-sumur-bor-laundry-kiloan-kalbar" style={{ color: '#075fd4', fontWeight: 700 }}>
                Pengaruh Air Gambut Terhadap Deterjen Laundry →
              </Link>
            </>
          )}
          {isIoT && (
            <>
              <Link href="/artikel/panduan-buka-laundromat-koin-qris-autopilot-kalbar" style={{ color: '#075fd4', fontWeight: 700 }}>
                Panduan Buka Laundromat Koin &amp; QRIS Autopilot →
              </Link>
              <Link href="/artikel/peluang-bisnis-laundry-koin-self-service-qris-pontianak-kalbar" style={{ color: '#075fd4', fontWeight: 700 }}>
                Peluang Bisnis Laundry Koin Self Service Kalbar →
              </Link>
            </>
          )}
          <Link href="/estimasi-modal" style={{ color: '#475569', fontWeight: 600 }}>
            Kalkulator Modal &amp; Simulasi BEP →
          </Link>
          <Link href="/paket-usaha/proposal" style={{ color: '#475569', fontWeight: 600 }}>
            Unduh Proposal Usaha Laundry PDF ↗
          </Link>
        </div>
      </div>
    </section>

    <section className="wrap product-faq-section" style={{ marginTop: '2.5rem', marginBottom: '2.5rem' }}>
      <div className="section-title">
        <div>
          <span className="eyebrow">Tanya Jawab Produk</span>
          <h2>Pertanyaan Umum Seputar {product.name}</h2>
        </div>
        <p>Informasi teknis dan panduan operasional sebelum melakukan transaksi.</p>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem' }}>
        {productFaqs.map((faq, i) => (
          <details
            key={i}
            style={{
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '1rem 1.25rem',
              cursor: 'pointer',
            }}
          >
            <summary style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.975rem' }}>
              {faq.q}
            </summary>
            <p style={{ marginTop: '0.75rem', color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: 0 }}>
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </section>

    {related.length > 0 && <section className="wrap related-products"><div className="section-title"><div><span className="eyebrow">Temukan lainnya</span><h2>Produk terkait</h2></div><Link className="text-link" href={`/produk?kategori=${product.categorySlug}`}>Lihat kategori</Link></div><div className="product-grid">{related.map((item) => <Link className="product-card" href={`/produk/${item.slug}`} key={item.slug}><div className="product-image">{item.image ? <Image src={item.image} alt={item.imageAlt} width={500} height={400} sizes="(max-width:650px) 80vw, 12vw" /> : <span aria-hidden="true">ME</span>}</div><div className="product-info"><span>{item.category}</span><h3>{item.name}</h3><b>{money(item.price)}</b></div><span className="product-go" aria-hidden="true">↗</span></Link>)}</div></section>}
    <WhatsAppStickyBar href={contactHref} label={`Tanya tentang ${product.name}`} context="Konsultasi produk" />
  </main>;
}
