import Link from 'next/link';
import { storeUrl, waLink } from '@/data/catalog';
import type { ContactSettings } from '@/lib/content';
import { SiteNavigation } from '@/components/site-navigation';

function Logo() {
  return <Link className="logo" href="/" aria-label="My Equipment Indonesia">
    <svg className="logo-symbol" viewBox="0 0 40 30" aria-hidden="true"><path d="M1 27 11 5h9l-3.4 8L22 5h9L20.5 27h-9l4.2-9L11.5 27z"/><path d="m24 27 9-20h6l-9 20z"/></svg><span>My Equipment<small>INDONESIA</small></span>
  </Link>;
}

export function SiteHeader({ contact }: { contact: ContactSettings }) {
  return <header className="header"><div className="nav wrap"><Logo />
    <SiteNavigation whatsapp={contact.whatsapp} />
    <div className="nav-actions"><Link className="button button-small nav-header-btn" href="/kontak">Hubungi Kami <span aria-hidden="true">→</span></Link></div>
  </div></header>;
}

export function SiteFooter({ contact }: { contact: ContactSettings }) {
  return <footer id="footer"><div className="wrap footer-grid">
    <div><Logo /><p>Solusi perlengkapan dan paket usaha laundry untuk memulai dan mengembangkan bisnis Anda.</p><Link className="footer-store" href={storeUrl} target="_blank" rel="noreferrer">Katalog dan transaksi di toko resmi ↗</Link></div>
    <div><b>Jelajahi</b><Link href="/paket-usaha">Paket Usaha</Link><Link href="/produk">Katalog Produk</Link><Link href="/inspirasi">Inspirasi Laundry</Link><Link href="/artikel">Artikel & Kegiatan</Link><Link href="/promo">Promo</Link></div>
    <div><b>Layanan</b><Link href="/konsultasi">Konsultasi</Link><Link href="/estimasi-modal">Estimasi Perlengkapan</Link><Link href="/faq">FAQ</Link><Link href="/garansi-servis">Garansi & Servis</Link></div>
    <div><b>Kontak Kami</b><a href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>{contact.phone}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><Link href="/kontak">{contact.locations.map((location)=>location.name).join(" & ")}</Link><Link href={waLink(undefined,contact.whatsapp)} target="_blank" rel="noreferrer">WhatsApp ↗</Link></div>
  </div><div className="wrap copyright">© {new Date().getFullYear()} My Equipment Indonesia</div></footer>;
}
