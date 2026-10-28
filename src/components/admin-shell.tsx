'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';
import { AdminIcon, type AdminIconName } from '@/components/admin-icon';

const navigation = [
  { label: 'Ringkasan', href: '/admin', icon: 'overview', group: 'Menu utama' },
  { label: 'Produk', href: '/admin/products', icon: 'products', group: 'Katalog' },
  { label: 'Kategori', href: '/admin/categories', icon: 'categories', group: 'Katalog' },
  { label: 'Paket usaha', href: '/admin/packages', icon: 'packages', group: 'Konten usaha' },
  { label: 'Portfolio', href: '/admin/portfolio', icon: 'portfolio', group: 'Konten usaha' },
  { label: 'Promo', href: '/admin/promos', icon: 'promos', group: 'Konten usaha' },
  { label: 'FAQ', href: '/admin/faqs', icon: 'faq', group: 'Konten usaha' },
  { label: 'Artikel', href: '/admin/articles', icon: 'portfolio', group: 'Konten usaha' },
  { label: 'Pengaturan situs', href: '/admin/settings', icon: 'contact', group: 'Pengaturan', adminOnly: true },
  { label: 'Pengguna', href: '/admin/users', icon: 'users', group: 'Pengaturan', adminOnly: true },
];

const titles = Object.fromEntries(navigation.map((item) => [item.href, item.label]));

export function AdminShell({ children, user, logoutAction }: {
  children: ReactNode;
  user: { fullName: string; role: 'admin' | 'editor' };
  logoutAction: () => void;
}) {
  const pathname = usePathname();
  const groups = ['Menu utama', 'Katalog', 'Konten usaha', ...(user.role === 'admin' ? ['Pengaturan'] : [])];
  const pageTitle = titles[pathname] ?? 'Area CMS';
  const initials = user.fullName.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase()).join('');

  return <div className="cms-shell">
    <aside className="cms-sidebar">
      <Link href="/admin" className="cms-brand"><span className="cms-brand-mark">M</span><span className="cms-brand-copy"><b>My Equipment</b><small>PANEL KONTEN</small></span></Link>
      <nav className="cms-navigation" aria-label="Menu CMS">
        {groups.map((group) => <div className="cms-nav-group" key={group}>
          <span className="cms-nav-heading">{group}</span>
          {navigation.filter((item) => item.group === group && (!item.adminOnly || user.role === 'admin')).map((item) => {
            const active = item.href === '/admin' ? pathname === item.href : pathname === item.href || pathname.startsWith(`${item.href}/`);
            return <Link key={item.href} href={item.href} aria-current={active ? 'page' : undefined} className={active ? 'is-active' : undefined}><span className="cms-nav-icon"><AdminIcon name={item.icon as AdminIconName} size={17}/></span>{item.label}{active && <span className="cms-nav-indicator" />}</Link>;
          })}
        </div>)}
      </nav>
      <div className="cms-sidebar-help"><span className="cms-help-icon"><AdminIcon name="help" size={17}/></span><div><b>Perlu bantuan?</b><small>Hubungi tim My Equipment</small></div><Link href="/kontak" target="_blank" aria-label="Buka halaman kontak"><AdminIcon name="external" size={15}/></Link></div>
      <div className="cms-account"><span className="cms-avatar">{initials || 'ME'}</span><span className="cms-account-copy"><b>{user.fullName}</b><small>{user.role === 'admin' ? 'Admin' : 'Editor'}</small></span><form action={logoutAction}><button type="submit" aria-label="Keluar dari CMS" title="Keluar"><AdminIcon name="logout" size={17}/></button></form></div>
    </aside>
    <div className="cms-main-area">
      <header className="cms-topbar"><div className="cms-topbar-title"><span>CMS My Equipment</span><b>{pageTitle}</b></div><div className="cms-topbar-actions"><span className="cms-live-status"><i /> Terbit setelah disimpan</span><Link href="/" target="_blank" className="cms-view-site">Lihat situs <AdminIcon name="external" size={15}/></Link><form action={logoutAction} className="cms-mobile-logout"><button type="submit"><AdminIcon name="logout" size={15}/> Keluar</button></form></div></header>
      <div className="cms-main">{children}</div>
    </div>
  </div>;
}
