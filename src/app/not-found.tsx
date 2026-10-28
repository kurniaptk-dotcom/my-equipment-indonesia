import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Halaman Tidak Ditemukan',
};

export default function NotFound() {
  return <main className="subpage error-page">
    <span className="eyebrow">404 | Halaman tidak ditemukan</span>
    <h1>Halaman ini tidak tersedia.</h1>
    <p>Periksa kembali alamatnya atau lanjutkan ke katalog produk My Equipment.</p>
    <div className="error-actions"><Link className="button" href="/produk">Lihat katalog</Link><Link className="button button-outline" href="/">Kembali ke beranda</Link></div>
  </main>;
}
