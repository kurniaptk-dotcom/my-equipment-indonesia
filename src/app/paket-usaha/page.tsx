import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { storeUrl, waLink } from '@/data/catalog';
import { getPackages, getContactSettings } from '@/lib/content';
import { WhatsAppStickyBar } from '@/components/whatsapp-sticky-bar';
import { createPageMetadata } from '@/lib/page-metadata';
import { PackageConsultationGuide } from '@/components/package-consultation-guide';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Paket Usaha Laundry Pontianak & Kalbar Tanpa Franchise',
    description: 'Pusat paket usaha laundry kiloan, koin, dan komersial siap pakai di Pontianak & seluruh Kalimantan Barat. 100% keuntungan milik Anda, tanpa biaya franchise dan royalti.',
    canonical: '/paket-usaha',
  });
}
export const dynamic = 'force-dynamic';

export default async function PaketUsaha() {
  const [packages, contact] = await Promise.all([getPackages(), getContactSettings()]);
  const contactHref = waLink('Halo My Equipment, saya sedang melihat pilihan paket usaha laundry. Mohon rekomendasikan paket yang sesuai kebutuhan saya. Sumber: halaman paket usaha.', contact.whatsapp);
  return <main className="subpage has-sticky-cta" data-page="packages">
    <section className="wrap subhero"><span className="eyebrow">Paket usaha laundry</span><h1>Mulai dari paket yang <br/><em>sesuai rencana Anda.</em></h1><p>Pilihan paket dapat dikonsultasikan sesuai anggaran, ruang, dan kebutuhan perlengkapan. Rincian setiap paket dikonfirmasi oleh tim.</p><div className="package-hero-actions"><Link className="button" href="/konsultasi">Konsultasi Gratis <span aria-hidden="true">&#8599;</span></Link><a className="button button-outline" href="#panduan">Bantu saya memilih <span aria-hidden="true">&#8595;</span></a></div></section>
    <div className="wrap"><PackageConsultationGuide packages={packages.map(({ name, price }) => ({ name, price }))} whatsapp={contact.whatsapp} /></div>
    <section className="wrap package-grid subpackage" aria-label="Pilihan paket usaha">
      {packages.length ? packages.map((pack, index) => <article className={`package-card ${index === 2 ? 'featured' : ''}`} key={pack.name}>
        <div className="package-image">{pack.image ? <Image src={pack.image} alt={`Paket Usaha Laundry ${pack.name} - My Equipment Pontianak Kalimantan Barat`} fill sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 280px" /> : <span className="package-image-placeholder">Foto paket belum tersedia</span>}</div>
        <span className="package-label">{pack.label}</span><h2>Paket {pack.name}</h2><p>{pack.desc}</p>
        <ul>{pack.points.map((point) => <li key={point}><span aria-hidden="true">✓</span>{point}</li>)}</ul>
        <div className="package-price"><small>Harga indikatif katalog*</small><b>{pack.price}</b></div>
        <Link href={waLink(`Halo My Equipment, saya tertarik dengan Paket ${pack.name}. Mohon rincian dan harga terbaru.`, contact.whatsapp)} className="button button-block" target="_blank" rel="noreferrer">Tanya detail paket <span aria-hidden="true">↗</span></Link>
      </article>) : <div className="empty-state"><h2>Informasi paket sedang diperbarui</h2><p>Hubungi tim untuk mendiskusikan perlengkapan sesuai rencana usaha Anda.</p><Link className="button" href="/konsultasi">Konsultasi kebutuhan</Link></div>}
    </section>
    <p className="wrap note">*Harga dan isi paket berasal dari referensi katalog, bukan sinkronisasi langsung. Pastikan rincian dan harga terbaru kepada tim.</p>
    <section className="wrap catalog-bottom-cta"><div><span className="eyebrow">Butuh bantuan memilih?</span><h2>Rencanakan perlengkapan bersama tim.</h2><p>Diskusikan skala kebutuhan dan daftar peralatan awal melalui konsultasi.</p></div><Link className="button button-light" href={waLink(undefined, contact.whatsapp)} target="_blank" rel="noreferrer">Hubungi WhatsApp <span aria-hidden="true">↗</span></Link></section>
    <div className="wrap subbottom"><Link className="button button-outline" href="/produk">Lihat katalog produk</Link><Link className="button" href={storeUrl} target="_blank" rel="noreferrer">Toko resmi <span aria-hidden="true">↗</span></Link></div>
    <WhatsAppStickyBar href={contactHref} label="Konsultasikan paket usaha" context="Pilihan paket laundry" />
  </main>;
}
