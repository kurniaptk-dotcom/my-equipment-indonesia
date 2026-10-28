import Link from 'next/link';
import { redirect } from 'next/navigation';
import { AdminIcon, type AdminIconName } from '@/components/admin-icon';
import { getAdminCounts } from '@/lib/content';
import { getCmsUser } from '@/lib/access';

export const metadata = { title: 'CMS Dashboard' };

const countLabels: Record<string, { label: string; hint: string; icon: AdminIconName }> = {
  products: { label: 'Produk', hint: 'di katalog', icon: 'products' },
  categories: { label: 'Kategori', hint: 'produk', icon: 'categories' },
  packages: { label: 'Paket usaha', hint: 'tersimpan', icon: 'packages' },
  portfolio: { label: 'Portfolio', hint: 'outlet', icon: 'portfolio' },
  promos: { label: 'Promo', hint: 'tersimpan', icon: 'promos' },
  faqs: { label: 'FAQ', hint: 'pertanyaan', icon: 'faq' },
  articles: { label: 'Artikel', hint: 'artikel & kegiatan', icon: 'portfolio' },
  users: { label: 'Pengguna', hint: 'akun CMS', icon: 'users' },
};

const contentLinks: { slug: string; label: string; description: string; icon: AdminIconName }[] = [
  { slug: 'products', label: 'Produk', description: 'Foto, harga, spesifikasi, dan tautan toko.', icon: 'products' },
  { slug: 'categories', label: 'Kategori', description: 'Susun kelompok produk di katalog.', icon: 'categories' },
  { slug: 'packages', label: 'Paket usaha', description: 'Perbarui pilihan paket laundry.', icon: 'packages' },
  { slug: 'portfolio', label: 'Portfolio', description: 'Foto dan nama outlet laundry.', icon: 'portfolio' },
  { slug: 'promos', label: 'Promo', description: 'Atur penawaran dan tanggal berlakunya.', icon: 'promos' },
  { slug: 'faqs', label: 'FAQ', description: 'Jawaban untuk pertanyaan pelanggan.', icon: 'faq' },
  { slug: 'articles', label: 'Artikel', description: 'Dokumentasi kegiatan dan artikel My Equipment.', icon: 'portfolio' },
];

export default async function AdminDashboard() {
  const user = await getCmsUser();
  if (!user) redirect('/admin/login');
  const counts = await getAdminCounts();
  const links = user?.role === 'admin' ? [...contentLinks,
    { slug: 'settings', label: 'Pengaturan situs', description: 'Identitas, SEO, nomor, dan lokasi showroom.', icon: 'contact' as const },
    { slug: 'users', label: 'Pengguna CMS', description: 'Undang dan atur akses tim.', icon: 'users' as const },
  ] : contentLinks;

  return <main className="cms-dashboard">
    <header className="cms-dashboard-heading">
      <div><span className="cms-page-kicker">RINGKASAN</span><h1>Selamat datang, {user?.fullName?.split(' ')[0] ?? 'Admin'}</h1><p>Perbarui katalog dan informasi bisnis dari satu tempat.</p></div>
      <div className="cms-dashboard-actions"><span className="cms-save-note"><i/>Perubahan terbit setelah disimpan</span><Link href="/admin/products" className="cms-primary-action"><AdminIcon name="plus" size={17}/> Kelola produk</Link></div>
    </header>

    <section className="cms-overview-section" aria-labelledby="cms-overview-title">
      <div className="cms-section-title"><div><h2 id="cms-overview-title">Konten tersimpan</h2><p>Ringkasan item yang dikelola dari CMS.</p></div></div>
      <div className="cms-count-grid">{Object.entries(counts).filter(([key]) => key !== 'users' || user?.role === 'admin').map(([key, count]) => {
        const item = countLabels[key] ?? { label: key, hint: 'item tersimpan', icon: 'overview' as const };
        const destination = key === 'users' ? '/admin/users' : `/admin/${key}`;
        return <Link href={destination} className="cms-count-card" key={key}><span className="cms-count-icon"><AdminIcon name={item.icon}/></span><span className="cms-count-copy"><b>{count}</b><small>{item.label}</small><em>{item.hint}</em></span><AdminIcon name="external" size={15} className="cms-count-arrow"/></Link>;
      })}</div>
    </section>

    <section className="cms-dashboard-links" aria-labelledby="cms-manage-title"><div className="cms-section-title"><div><h2 id="cms-manage-title">Kelola konten</h2><p>Pilih bagian yang ingin diperbarui.</p></div></div><div>{links.map((item) => <Link key={item.slug} href={`/admin/${item.slug}`} className="cms-manage-card"><span className="cms-manage-icon"><AdminIcon name={item.icon}/></span><span className="cms-manage-copy"><b>{item.label}</b><small>{item.description}</small></span><span className="cms-manage-arrow"><AdminIcon name="external" size={16}/></span></Link>)}</div></section>
  </main>;
}
