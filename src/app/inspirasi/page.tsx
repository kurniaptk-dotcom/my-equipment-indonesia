import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { waLink } from '@/data/catalog';
import { getPortfolio, getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';

export const dynamic = 'force-dynamic';

export async function generateMetadata(): Promise<Metadata> {
  const portfolio = await getPortfolio();
  return createPageMetadata({ title:'Portfolio Outlet Laundry', description:'Foto outlet ditampilkan setelah izin penggunaan nama dan foto terdokumentasi.', canonical:'/inspirasi', robots:portfolio.length?undefined:{index:false,follow:true} });
}

export default async function Inspirasi() {
  const [portfolio, contact] = await Promise.all([getPortfolio(), getContactSettings()]);
  return <main className="subpage">
    <section className="wrap subhero"><span className="eyebrow">Portfolio My Equipment</span><h1>Portfolio outlet<br/><em>laundry.</em></h1><p>Dokumentasi outlet yang mendapat izin publikasi. Portfolio ini tidak menyiratkan hasil usaha atau merupakan kutipan testimoni.</p><Link className="button" href={waLink('Halo My Equipment, saya ingin konsultasi paket usaha laundry.', contact.whatsapp)} target="_blank" rel="noreferrer">Diskusikan rencana Anda <span aria-hidden="true">↗</span></Link></section>
    <section className="wrap portfolio-grid" aria-label="Foto portfolio outlet laundry">
      {portfolio.length ? portfolio.map((item, index) => <article className="portfolio-card" key={item.id}><div className="portfolio-photo"><Image src={item.image} alt={`Foto portfolio ${item.name}`} width={800} height={520} sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 380px" /></div><div className="portfolio-copy"><span>PORTFOLIO · {String(index + 1).padStart(2, '0')}</span><h2>{item.name}</h2><Link className="content-whatsapp-link" href={waLink(`Halo My Equipment, saya melihat portfolio ${item.name} dan ingin berdiskusi tentang kebutuhan peralatan atau paket usaha laundry. Sumber: halaman Portfolio My Equipment, outlet ${item.name}.`, contact.whatsapp)} target="_blank" rel="noreferrer">Tanya tentang outlet ini <span aria-hidden="true">↗</span></Link></div></article>) : <div className="empty-state portfolio-empty"><h2>Portfolio menunggu izin penggunaan</h2><p>Foto dan nama outlet akan ditayangkan setelah izin publikasinya tercatat.</p><Link className="button" href="/kontak">Hubungi My Equipment</Link></div>}
    </section>
    {portfolio.length > 0 && <p className="wrap note">Foto dan nama yang terlihat sudah memiliki catatan izin publikasi. Informasi operasional, testimoni, atau hasil usaha tidak disimpulkan dari foto.</p>}
  </main>;
}
