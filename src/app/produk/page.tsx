import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCatalog } from '@/components/product-catalog';
import { storeUrl, waLink } from '@/data/catalog';
import { getCategories, getContactSettings, getProducts } from '@/lib/content';
import { WhatsAppStickyBar } from '@/components/whatsapp-sticky-bar';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Distributor & Jual Mesin Laundry Komersial Pontianak Kalbar',
    description: 'Distributor resmi mesin cuci, mesin pengering konversi gas, setrika uap boiler, chemical, dan suku cadang laundry komersial di Pontianak & seluruh Kalimantan Barat.',
    canonical: '/produk',
  });
}
export const dynamic = 'force-dynamic';

export default async function Produk({ searchParams }: { searchParams: Promise<{ kategori?: string }> }) {
  const params = await searchParams;
  const [categories,products,contact]=await Promise.all([getCategories(),getProducts(),getContactSettings()]);
  const initialCategory = categories.some((category) => category.slug === params.kategori) ? params.kategori ?? '' : '';
  const contactHref = waLink('Halo My Equipment, saya sedang melihat katalog produk. Mohon rekomendasi produk yang sesuai kebutuhan laundry saya. Sumber: katalog My Equipment.', contact.whatsapp);
  return <main className="subpage has-sticky-cta" data-page="catalog">
    <section className="catalog-hero"><div className="wrap catalog-hero-copy"><div><span className="eyebrow">Katalog My Equipment</span><h1>Temukan produk <br/><em>untuk laundry Anda.</em></h1><p>Jelajahi katalog ringkas dan halaman detail. Katalog lengkap, ketersediaan, dan transaksi ada di toko resmi.</p><Link href={storeUrl} className="button" target="_blank" rel="noreferrer">Katalog Toko Resmi ↗</Link></div><div className="catalog-hero-art"><Image src="/images/hero-stacked.webp" alt="Mesin laundry dari koleksi My Equipment" width={720} height={720} sizes="(max-width: 650px) 90vw, 45vw" quality={82} /><div className="floating-stat"><b>7 kategori</b><span>Mesin hingga suku cadang</span></div></div></div></section>
    <div className="wrap catalog-main"><ProductCatalog products={products} categories={categories} initialCategory={initialCategory} /></div>
    <section className="wrap catalog-bottom-cta"><div><span className="eyebrow">Butuh rekomendasi?</span><h2>Konsultasikan produk yang sesuai kebutuhan.</h2><p>Tim My Equipment dapat membantu menjelaskan pilihan produk dan paket usaha.</p></div><Link className="button button-light" href="/konsultasi">Konsultasi Gratis →</Link></section>
    <WhatsAppStickyBar href={contactHref} label="Butuh rekomendasi produk?" context="Katalog My Equipment" />
  </main>;
}
