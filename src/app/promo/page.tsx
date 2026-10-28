import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { storeUrl } from '@/data/catalog';
import { getPromos } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> { return createPageMetadata({ title:'Promo dan Penawaran', description:'Temukan penawaran aktif yang sumber dan masa berlakunya telah dicatat oleh My Equipment Indonesia.', canonical:'/promo' }); }
export const dynamic='force-dynamic';
export default async function Promo() {
  const promos=await getPromos();
  return <main className="subpage"><section className="promo-hero"><div className="wrap promo-banner"><div><span className="promo-pill">PENAWARAN RESMI</span><h1>Temukan promo<br/>yang masih berlaku.</h1><p>Promo yang ditampilkan memiliki sumber resmi dan masa berlaku. Periksa kembali syarat penawaran sebelum membeli.</p><Link className="button button-light" href={promos[0]?.sourceUrl ?? storeUrl} target="_blank" rel="noreferrer">Lihat Penawaran</Link></div><Image src="/images/dryer-speedqueen.webp" alt="Mesin pengering dari koleksi My Equipment" width={600} height={650} sizes="(max-width: 650px) 75vw, 30vw" quality={82} /></div></section>
    <section className="wrap verified-promo">{promos.length ? <div className="promo-cards">{promos.map((promo)=><article className="promo-card" key={promo.id}>{promo.image&&<Image src={promo.image} alt="" width={480} height={300}/>}<span className="eyebrow">Promo terverifikasi</span><h2>{promo.title}</h2><p>{promo.description}</p><small>Berlaku {promo.startsAt} sampai {promo.endsAt}</small><Link className="button" href={promo.sourceUrl} target="_blank" rel="noreferrer">Buka Sumber Promo</Link></article>)}</div>:<div><span className="eyebrow">Promo terverifikasi</span><h2>Periksa daftar terbaru di toko resmi</h2><p>Situs ini tidak menampilkan potongan harga yang belum dipastikan masih berlaku. Gunakan tautan toko untuk melihat harga dan penawaran yang tersedia sekarang.</p><Link className="button" href={storeUrl} target="_blank" rel="noreferrer">Lihat Penawaran Toko</Link></div>}{!promos.length&&<div className="promo-empty"><span>↗</span><b>Informasi promo terkini</b><small>Tersedia di toko online resmi</small></div>}</section>
    <section className="wrap promo-secondary"><Link href="/produk" className="text-link">Jelajahi katalog ringkas</Link><Link href="/konsultasi" className="text-link">Konsultasikan paket usaha</Link></section>
  </main>;
}
