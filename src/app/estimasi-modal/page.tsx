import type { Metadata } from 'next';
import { EstimateForm } from '@/components/interactive-forms';
import { getProducts, getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> { return createPageMetadata({ title:'Estimasi Biaya Perlengkapan', description:'Buat perkiraan subtotal untuk item perlengkapan laundry yang dipilih dari katalog My Equipment.', canonical:'/estimasi-modal' }); }
export const dynamic='force-dynamic';
export default async function EstimasiModal() {
  const [products,contact]=await Promise.all([getProducts(),getContactSettings()]);
  return <main className="subpage has-sticky-cta" data-page="estimator"><section className="wrap subhero estimate-hero"><span className="eyebrow">Kalkulator perlengkapan</span><h1>Perkirakan subtotal<br/><em>pilihan produk Anda.</em></h1><p>Pilih item dari katalog dan lihat subtotal indikatif. Estimasi ini hanya menjumlahkan harga item yang dipilih.</p><div className="estimate-scope"><span>✓ Menggunakan harga katalog indikatif</span><span>✓ Tidak menghitung ongkir atau instalasi</span><span>✓ Tidak membuat estimasi laba atau ROI</span></div></section><section className="wrap estimator-section"><EstimateForm products={products} whatsapp={contact.whatsapp} /></section></main>;
}
