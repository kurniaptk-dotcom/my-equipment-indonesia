'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { waLink } from '@/data/catalog';

const links = [
  { label: 'Beranda', href: '/' },
  { label: 'Paket Usaha', href: '/paket-usaha' },
  { label: 'Produk', href: '/produk' },
  { label: 'Portfolio', href: '/inspirasi' },
  { label: 'Artikel', href: '/artikel' },
  { label: 'Layanan', href: '/layanan' },
  { label: 'Tentang Kami', href: '/tentang-kami' },
];

function isCurrent(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteNavigation({ whatsapp }: { whatsapp: string }) {
  const pathname = usePathname();
  const mobileMenu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (mobileMenu.current) mobileMenu.current.open = false;
  }, [pathname]);

  function closeMenu() {
    if (mobileMenu.current) mobileMenu.current.open = false;
  }

  return <>
    <nav className="site-primary-nav" aria-label="Navigasi utama">
      {links.map((link) => <Link key={link.href} href={link.href} aria-current={isCurrent(pathname, link.href) ? 'page' : undefined}>{link.label}</Link>)}
    </nav>
    <details className="mobile-menu" ref={mobileMenu}>
      <summary aria-label="Menu navigasi"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg></summary>
      <nav className="mobile-menu-panel" aria-label="Navigasi ponsel">
        {links.map((link) => <Link key={link.href} href={link.href} aria-current={isCurrent(pathname, link.href) ? 'page' : undefined} onClick={closeMenu}>{link.label}</Link>)}
        <Link href="/kontak" aria-current={isCurrent(pathname, '/kontak') ? 'page' : undefined} onClick={closeMenu}>Kontak dan showroom</Link>
        <Link href={waLink(undefined, whatsapp)} target="_blank" rel="noreferrer" onClick={closeMenu}>WhatsApp My Equipment ↗</Link>
      </nav>
    </details>
  </>;
}
