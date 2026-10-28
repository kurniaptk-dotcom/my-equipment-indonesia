import type { Metadata } from 'next';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> { return createPageMetadata({ title:'Layanan', description:'Konsultasi usaha, rekomendasi perlengkapan, kunjungan showroom, dan informasi dukungan My Equipment Indonesia.', canonical:'/layanan' }); }
const services = [
  ['01', 'Konsultasi kebutuhan', 'Ceritakan rencana usaha, lokasi, dan kebutuhan yang ingin didiskusikan.', '/konsultasi'],
  ['02', 'Rekomendasi paket', 'Tinjau pilihan paket dan minta penjelasan isi serta harga terbaru.', '/paket-usaha'],
  ['03', 'Pemilihan produk', 'Jelajahi kategori dan tanyakan spesifikasi atau ketersediaan langsung kepada tim.', '/produk'],
  ['04', 'Garansi dan servis', 'Konfirmasikan ketentuan garansi dan layanan untuk merek serta produk yang dipilih.', '/garansi-servis'],
];
export default function Layanan() {
  return <main className="subpage"><section className="wrap subhero"><span className="eyebrow">Layanan My Equipment</span><h1>Teman diskusi untuk<br/><em>rencana laundry Anda.</em></h1><p>Mulai dari memilih paket dan perlengkapan hingga memperoleh informasi dukungan setelah pembelian. Detail layanan dikonfirmasi bersama tim.</p><Link className="button" href="/konsultasi">Mulai Konsultasi →</Link></section>
    <section className="wrap service-grid">{services.map(([number, title, description, href]) => <Link className="service-card" key={number} href={href}><span>{number}</span><h2>{title}</h2><p>{description}</p><b>Selengkapnya ↗</b></Link>)}</section>
    <section className="wrap service-note"><span className="eyebrow">Layanan berdasarkan lokasi</span><h2>Showroom Pontianak dan Singkawang</h2><p>Atur kunjungan dan konfirmasi alamat terbaru pada halaman kontak sebelum datang.</p><Link className="text-link" href="/kontak">Lihat informasi kontak →</Link></section>
  </main>;
}
