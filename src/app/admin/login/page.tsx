import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { AdminLoginForm } from '@/components/admin-login-form';
import Link from 'next/link';
import { AdminIcon } from '@/components/admin-icon';

export const metadata = { title: 'Masuk CMS' };
export default async function AdminLogin() {
  const session=await auth();
  if(session?.user?.id) redirect('/admin');
  return <main className="cms-login-page"><div className="cms-login-layout"><section className="cms-login-story"><Link href="/admin/login" className="cms-login-logo"><span className="cms-brand-mark">M</span><span><b>My Equipment</b><small>PANEL KONTEN</small></span></Link><span className="cms-login-label">ADMINISTRASI SITUS</span><h1>Atur situs My Equipment.</h1><p>Masuk untuk memperbarui katalog dan informasi yang dilihat pelanggan.</p><div className="cms-login-scope"><span><AdminIcon name="products" size={18}/> Produk dan kategori</span><span><AdminIcon name="portfolio" size={18}/> Paket usaha dan portfolio</span><span><AdminIcon name="contact" size={18}/> Promo, FAQ, dan kontak</span></div></section><section className="cms-login-card"><span className="cms-login-label">AKUN STAF</span><h2>Masuk ke CMS</h2><p>Gunakan email dan password Admin atau Editor.</p><AdminLoginForm/><small>Akun dibuat oleh Admin. Pendaftaran publik tidak tersedia.</small><Link href="/" target="_blank">Buka situs publik <AdminIcon name="external" size={14}/></Link></section></div></main>;
}
