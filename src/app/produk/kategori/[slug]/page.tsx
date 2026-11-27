import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { categories as seedCategories, waLink } from '@/data/catalog';
import { CATEGORY_SEO_MAP } from '@/data/category-seo';
import { getCategories, getContactSettings, getProducts } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { createPageMetadata } from '@/lib/page-metadata';
import { CategoryIcon } from '@/components/category-icon';
import { BrandTrustStrip } from '@/components/brand-trust-strip';
import { WhatsAppStickyBar } from '@/components/whatsapp-sticky-bar';

type Props = { params: Promise<{ slug: string }> };

const money = (amount: number | null) =>
  amount === null ? 'Hubungi untuk harga' : `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;

export async function generateStaticParams() {
  return seedCategories.map((cat) => ({ slug: cat.slug }));
}

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const seoInfo = CATEGORY_SEO_MAP[slug];
  const allCategories = await getCategories();
  const category = allCategories.find((c) => c.slug === slug);
  if (!category && !seoInfo) return {};

  const title = seoInfo?.metaTitle || `${category?.title || slug} Laundry Pontianak | My Equipment`;
  const description =
    seoInfo?.metaDescription ||
    `Jual ${category?.title || slug} laundry komersial di Pontianak & Kalimantan. Bergaransi resmi dengan dukungan teknisi lokal My Equipment Indonesia.`;

  return createPageMetadata({
    title: { absolute: title },
    description,
    canonical: `/produk/kategori/${slug}`,
  });
}

export default async function ProductCategoryPage({ params }: Props) {
  const { slug } = await params;
  const [allCategories, allProducts, contact] = await Promise.all([
    getCategories(),
    getProducts(),
    getContactSettings(),
  ]);

  const category = allCategories.find((c) => c.slug === slug);
  const seoInfo = CATEGORY_SEO_MAP[slug];
  if (!category && !seoInfo) notFound();

  const categoryTitle = category?.title || seoInfo?.h1 || slug;
  const categoryProducts = allProducts.filter((p) => p.categorySlug === slug);
  const otherCategories = allCategories.filter((c) => c.slug !== slug);
  const siteUrl = getSiteUrl();

  const refCode = `CAT-${slug.toUpperCase()}`;
  const waHref = waLink(
    `Halo My Equipment Indonesia, saya sedang melihat kategori ${categoryTitle} di website. Mohon informasi daftar harga terbaru, stok ready, dan rekomendasi unit untuk usaha laundry saya.`,
    contact.whatsapp,
    refCode
  );

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/produk/kategori/${slug}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Beranda', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Katalog Produk', item: `${siteUrl}/produk` },
          {
            '@type': 'ListItem',
            position: 3,
            name: categoryTitle,
            item: `${siteUrl}/produk/kategori/${slug}`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/produk/kategori/${slug}#itemlist`,
        name: seoInfo?.h1 || categoryTitle,
        numberOfItems: categoryProducts.length,
        itemListElement: categoryProducts.map((product, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: product.name,
            url: `${siteUrl}/produk/${product.slug}`,
            image: product.image ? `${siteUrl}${product.image}` : `${siteUrl}/images/laundry-hero.webp`,
            description: product.description,
            offers: {
              '@type': 'Offer',
              priceCurrency: 'IDR',
              price: product.price ?? 0,
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'My Equipment Indonesia',
                url: siteUrl,
              },
            },
          },
        })),
      },
      ...(seoInfo?.faqs?.length
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${siteUrl}/produk/kategori/${slug}#faq`,
              mainEntity: seoInfo.faqs.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.a,
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <main className="subpage has-sticky-cta" data-page="product-category">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaGraph).replace(/</g, '\\u003c') }}
      />

      <div className="wrap breadcrumbs">
        <Link href="/">Beranda</Link>
        <span>/</span>
        <Link href="/produk">Katalog Produk</Link>
        <span>/</span>
        <b>{categoryTitle}</b>
      </div>

      <section className="wrap" style={{ paddingTop: '1.5rem', paddingBottom: '2rem' }}>
        <span className="eyebrow">{seoInfo?.eyebrow || 'Kategori Produk My Equipment'}</span>
        <h1 style={{ marginTop: '0.5rem', marginBottom: '0.75rem' }}>{seoInfo?.h1 || categoryTitle}</h1>
        <p style={{ maxWidth: '72ch', color: 'var(--muted)', lineHeight: 1.7 }}>
          {seoInfo?.intro || category?.desc}
        </p>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
          <a href={waHref} className="button" target="_blank" rel="noreferrer">
            Cek Stok &amp; Harga {categoryTitle} ↗
          </a>
          <Link href="/paket-usaha" className="button button-outline">
            Lihat Paket Usaha Siap Buka →
          </Link>
          <Link href="/estimasi-modal" className="button button-outline">
            Hitung Estimasi Modal →
          </Link>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: '2.5rem' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1.25rem',
          }}
        >
          <h2 style={{ margin: 0 }}>Daftar Produk {categoryTitle} ({categoryProducts.length} Item)</h2>
          <Link href="/produk" className="text-link">
            Lihat Semua Kategori di Katalog →
          </Link>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="product-grid">
            {categoryProducts.map((product) => (
              <Link className="product-card" href={`/produk/${product.slug}`} key={product.slug}>
                <div className="product-image">
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.imageAlt}
                      fill
                      sizes="(max-width: 650px) 46vw, (max-width: 950px) 30vw, 240px"
                    />
                  ) : (
                    <span>
                      <CategoryIcon slug={product.categorySlug} />
                    </span>
                  )}
                </div>
                <div className="product-body">
                  <small>{product.category}</small>
                  <h3>{product.name}</h3>
                  <b>{money(product.price)}</b>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>Daftar unit sedang diperbarui</h3>
            <p>Hubungi tim kami via WhatsApp untuk mendapatkan katalog harga terbaru kategori {categoryTitle}.</p>
            <a href={waHref} className="button" target="_blank" rel="noreferrer">
              Minta Katalog via WhatsApp ↗
            </a>
          </div>
        )}
      </section>

      {seoInfo?.buyingTips && seoInfo.buyingTips.length > 0 && (
        <section className="wrap" style={{ paddingBottom: '2.5rem' }}>
          <div
            style={{
              background: 'var(--surface-alt, #f8fafc)',
              border: '1px solid var(--border, #e2e8f0)',
              borderRadius: '16px',
              padding: '1.75rem',
            }}
          >
            <span className="eyebrow">Panduan Pembelian Teknis</span>
            <h2 style={{ marginTop: '0.35rem', marginBottom: '1rem' }}>
              Tips Memilih {categoryTitle} untuk Usaha Laundry
            </h2>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.65rem', lineHeight: 1.65 }}>
              {seoInfo.buyingTips.map((tip, idx) => (
                <li key={idx}>{tip}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {seoInfo?.faqs && seoInfo.faqs.length > 0 && (
        <section className="wrap home-faq" style={{ paddingBottom: '2.5rem' }}>
          <span className="eyebrow">Pertanyaan Umum</span>
          <h2 style={{ marginTop: '0.35rem', marginBottom: '1rem' }}>FAQ Seputar {categoryTitle}</h2>
          <div className="home-faq-list">
            {seoInfo.faqs.map((faq, idx) => (
              <details key={idx}>
                <summary>
                  {faq.q}
                  <span aria-hidden="true">+</span>
                </summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      {seoInfo?.relatedArticles && seoInfo.relatedArticles.length > 0 && (
        <section className="wrap" style={{ paddingBottom: '2.5rem' }}>
          <h2 style={{ marginBottom: '0.75rem' }}>Panduan &amp; Perbandingan Terkait</h2>
          <div style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}>
            {seoInfo.relatedArticles.map((art) => (
              <Link
                key={art.slug}
                href={`/artikel/${art.slug}`}
                style={{
                  display: 'block',
                  padding: '1rem 1.25rem',
                  border: '1px solid var(--border, #e2e8f0)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  color: 'inherit',
                  fontWeight: 600,
                }}
              >
                {art.title} →
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="wrap" style={{ paddingBottom: '2.5rem' }}>
        <h2 style={{ marginBottom: '0.75rem' }}>Jelajahi Kategori Produk Lainnya</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          {otherCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/produk/kategori/${cat.slug}`}
              className="button button-outline"
              style={{ fontSize: '0.9rem' }}
            >
              {cat.title}
            </Link>
          ))}
        </div>
      </section>

      <BrandTrustStrip />

      <WhatsAppStickyBar
        href={waHref}
        label={`Tanya Stok ${categoryTitle}`}
        context={`Kategori ${categoryTitle} - My Equipment`}
      />
    </main>
  );
}
