import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { waLink } from '@/data/catalog';
import { getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> { return createPageMetadata({ title:'Garansi, Servis dan Pengiriman', description:'Cara meminta rincian garansi per produk, dukungan servis, dan cakupan pengiriman sebelum transaksi.', canonical:'/garansi-servis' }); }
export const dynamic='force-dynamic';
export default async function GaransiServis() {
  const contact=await getContactSettings();
  return <main className="subpage"><section className="service-hero"><div className="wrap service-hero-grid"><div><span className="eyebrow">Dukungan produk</span><h1>Garansi dan servis<br/><em>sesuai produk.</em></h1><p>Ketentuan dapat berbeda menurut merek dan model. Sebelum membeli, minta informasi garansi, cakupan, masa berlaku, dan jalur servis untuk produk yang Anda pilih.</p><Link className="button" href={waLink('Halo My Equipment, saya ingin bertanya tentang garansi dan servis untuk produk laundry.',contact.whatsapp)} target="_blank" rel="noreferrer">Tanya Ketentuan via WhatsApp ↗</Link></div><Image src="/images/hero-stacked.webp" alt="Mesin laundry dari media resmi My Equipment" width={720} height={720} sizes="(max-width: 650px) 90vw, 45vw" quality={82} /></div></section>
    <section className="wrap warranty-grid">{[['01', 'Cakupan garansi', 'Mintalah masa berlaku, komponen yang tercakup, syarat klaim, dan pihak yang menangani servis untuk merek serta model yang dipilih.'], ['02', 'Cakupan pengiriman', 'Area layanan, metode, ongkir, dan estimasi waktu perlu dikonfirmasi berdasarkan alamat tujuan serta jenis produk.'], ['03', 'Servis dan suku cadang', 'Sertakan merek, model, nomor seri bila tersedia, serta kode suku cadang agar tim dapat memeriksa kecocokannya.']].map(([num, title, text]) => <article key={num}><span>{num}</span><h2>{title}</h2><p>{text}</p></article>)}</section>
    <section className="wrap warranty-note"><b>Konfirmasi sebelum transaksi</b><p>Informasi resmi yang kami temukan belum merinci satu cakupan garansi atau pengiriman yang berlaku untuk semua produk dan lokasi. Minta rincian tertulis untuk barang dan alamat tujuan Anda sebelum membayar.</p><Link className="text-link" href={waLink('Halo My Equipment, saya ingin mengonfirmasi garansi, servis, dan pengiriman untuk produk yang saya pertimbangkan.',contact.whatsapp)} target="_blank" rel="noreferrer">Tanyakan ke tim via WhatsApp ↗</Link> <Link className="text-link" href="https://produk.myequipmentindonesia.com/" target="_blank" rel="noreferrer">Buka toko resmi</Link></section>
  </main>;
}
