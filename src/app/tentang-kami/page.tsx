import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> { return createPageMetadata({ title:'Tentang Kami', description:'Kenali My Equipment Indonesia, penyedia perlengkapan dan peralatan usaha laundry di Kalimantan Barat.', canonical:'/tentang-kami' }); }
export default function TentangKami() {
  return <main className="subpage"><section className="about-hero"><div className="wrap about-hero-grid"><div><span className="eyebrow">Tentang My Equipment</span><h1>Perlengkapan laundry <br/><em>untuk usaha Anda.</em></h1><p>My Equipment Indonesia berfokus pada penyediaan perlengkapan dan peralatan usaha laundry di Kalimantan Barat. Kami membantu pelanggan menemukan pilihan yang sesuai untuk memulai maupun mengembangkan usaha.</p><Link className="button" href="/kontak">Temui Kami →</Link></div><div className="about-hero-image"><Image src="/images/hero-stacked.webp" alt="Mesin laundry dari media My Equipment" width={720} height={720} sizes="(max-width: 650px) 90vw, 45vw" quality={82} /></div></div></section>
    <section className="wrap about-pillars"><div><span className="eyebrow">Cara kami membantu</span><h2>Mulai dengan memahami kebutuhan.</h2></div><div className="why-cards"><article><span>01</span><h3>Pilihan perlengkapan</h3><p>Mesin laundry, peralatan, chemical, perlengkapan, cleaning, dan suku cadang.</p></article><article><span>02</span><h3>Pendampingan konsultasi</h3><p>Hubungi tim untuk mendiskusikan kebutuhan dan detail produk.</p></article><article><span>03</span><h3>Berbasis di Kalimantan Barat</h3><p>Informasi showroom Pontianak dan Singkawang tersedia sebelum kunjungan.</p></article><article><span>04</span><h3>Portfolio yang ditampilkan</h3><p>Jelajahi beberapa outlet yang ditampilkan pada situs My Equipment.</p></article></div></section>
    <section className="wrap about-showroom"><span className="eyebrow">Kunjungi kami</span><h2>Showroom di Pontianak dan Singkawang</h2><p>Hubungi tim untuk memastikan lokasi dan kesiapan kunjungan.</p><Link className="button button-outline" href="/kontak">Informasi Kontak →</Link><Link className="text-link" href="/inspirasi">Lihat Portfolio →</Link></section>
  </main>;
}
