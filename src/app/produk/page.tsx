import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCatalog } from '@/components/product-catalog';
import { storeUrl, waLink } from '@/data/catalog';
import { getCategories, getContactSettings, getProducts } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { WhatsAppStickyBar } from '@/components/whatsapp-sticky-bar';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Distributor & Toko Mesin Laundry Komersial Pontianak Kalbar: Washer, Dryer, & Boiler Ready Stock',
    description: 'Pusat distributor & toko mesin laundry di Pontianak & Kalbar. Ready stock mesin cuci komersial front load, pengering konversi gas, setrika uap, suku cadang, & chemical resmi.',
    canonical: '/produk',
  });
}
export const dynamic = 'force-dynamic';

export default async function Produk({ searchParams }: { searchParams: Promise<{ kategori?: string }> }) {
  const params = await searchParams;
  const [categories,products,contact]=await Promise.all([getCategories(),getProducts(),getContactSettings()]);
  const initialCategory = categories.some((category) => category.slug === params.kategori) ? params.kategori ?? '' : '';
  const contactHref = waLink('Halo My Equipment, saya sedang melihat katalog produk. Mohon rekomendasi produk yang sesuai kebutuhan laundry saya. Sumber: katalog My Equipment.', contact.whatsapp);
  const siteUrl = getSiteUrl();

  const catalogSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/produk#breadcrumb`,
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
            name: 'Katalog Produk & Mesin Laundry',
            item: `${siteUrl}/produk`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/produk#itemlist`,
        name: 'Katalog Mesin & Perlengkapan Laundry My Equipment Indonesia',
        numberOfItems: products.length,
        itemListElement: products.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: item.name,
            description: item.description,
            url: `${siteUrl}/produk/${item.slug}`,
            image: item.image
              ? item.image.startsWith('http')
                ? item.image
                : `${siteUrl}${item.image}`
              : `${siteUrl}/images/laundry-hero.webp`,
            offers: {
              '@type': 'Offer',
              url: `${siteUrl}/produk/${item.slug}`,
              priceCurrency: 'IDR',
              price: item.price ?? 0,
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
        })),
      },
    ],
  };

  return <main className="subpage has-sticky-cta" data-page="catalog">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(catalogSchema).replace(/</g, '\\u003c') }}
    />
    <section className="catalog-hero"><div className="wrap catalog-hero-copy"><div><span className="eyebrow">Katalog My Equipment</span><h1>Temukan produk <br/><em>untuk laundry Anda.</em></h1><p>Jelajahi katalog ringkas dan halaman detail. Katalog lengkap, ketersediaan, dan transaksi ada di toko resmi.</p><Link href={storeUrl} className="button" target="_blank" rel="noreferrer">Katalog Toko Resmi ↗</Link></div><div className="catalog-hero-art"><Image src="/images/hero-stacked.webp" alt="Mesin laundry dari koleksi My Equipment" width={720} height={720} sizes="(max-width: 650px) 90vw, 45vw" quality={82} /><div className="floating-stat"><b>7 kategori</b><span>Mesin hingga suku cadang</span></div></div></div></section>
    <div className="wrap catalog-main"><ProductCatalog products={products} categories={categories} initialCategory={initialCategory} /></div>
    <section className="wrap catalog-bottom-cta"><div><span className="eyebrow">Butuh rekomendasi?</span><h2>Konsultasikan produk yang sesuai kebutuhan.</h2><p>Tim My Equipment dapat membantu menjelaskan pilihan produk dan paket usaha.</p></div><Link className="button button-light" href="/konsultasi">Konsultasi Gratis →</Link></section>
    <WhatsAppStickyBar href={contactHref} label="Butuh rekomendasi produk?" context="Katalog My Equipment" />
  </main>;
}
