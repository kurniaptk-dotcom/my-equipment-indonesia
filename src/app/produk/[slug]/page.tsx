import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { waLink } from '@/data/catalog';
import { getContactSettings, getProductBySlug, getProducts, getSeoSettings } from '@/lib/content';
import { WhatsAppStickyBar } from '@/components/whatsapp-sticky-bar';

const money = (amount: number | null) => amount === null ? 'Hubungi toko untuk harga' : `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;
type Props = { params: Promise<{ slug: string }> };
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [product,seo] = await Promise.all([getProductBySlug(slug),getSeoSettings()]);
  if (!product) return { title: 'Produk tidak ditemukan' };
  const image = product.image ?? seo.socialImage;
  const imageAlt = product.image ? product.imageAlt : seo.socialImageAlt;
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/produk/${product.slug}` },
    openGraph: { title: product.name, description: product.description, siteName:seo.siteName, images: [{url:image,alt:imageAlt}] },
    twitter: { card:'summary_large_image',title:product.name,description:product.description,images:[image] },
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

  return <main className="subpage product-detail-page has-sticky-cta" data-page="product-detail">
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
    {related.length > 0 && <section className="wrap related-products"><div className="section-title"><div><span className="eyebrow">Temukan lainnya</span><h2>Produk terkait</h2></div><Link className="text-link" href={`/produk?kategori=${product.categorySlug}`}>Lihat kategori</Link></div><div className="product-grid">{related.map((item) => <Link className="product-card" href={`/produk/${item.slug}`} key={item.slug}><div className="product-image">{item.image ? <Image src={item.image} alt={item.imageAlt} width={500} height={400} sizes="(max-width:650px) 80vw, 12vw" /> : <span aria-hidden="true">ME</span>}</div><div className="product-info"><span>{item.category}</span><h3>{item.name}</h3><b>{money(item.price)}</b></div><span className="product-go" aria-hidden="true">↗</span></Link>)}</div></section>}
    <WhatsAppStickyBar href={contactHref} label={`Tanya tentang ${product.name}`} context="Konsultasi produk" />
  </main>;
}
