import type { Metadata } from 'next';
import Image from 'next/image';
import { ConsultationForm } from '@/components/interactive-forms';
import { getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> { return createPageMetadata({ title:'Konsultasi Usaha Laundry', description:'Kirim kebutuhan usaha laundry Anda melalui konsultasi WhatsApp dengan My Equipment Indonesia.', canonical:'/konsultasi' }); }
export const dynamic='force-dynamic';
export default async function Konsultasi() {
  const contact=await getContactSettings();
  return <main className="subpage"><section className="consult-hero"><div className="wrap consult-hero-grid"><div><span className="eyebrow">Konsultasi dan rekomendasi</span><h1>Mulai dari kebutuhan,<br/><em>temukan perlengkapan.</em></h1><p>Isi informasi singkat agar tim kami memahami rencana usaha yang ingin didiskusikan. Pesan akan disiapkan di WhatsApp untuk Anda tinjau.</p><div className="consult-points"><span>✓ Konsultasi paket usaha</span><span>✓ Pilihan produk laundry</span><span>✓ Pertanyaan showroom</span></div></div><Image src="/images/hero-stacked.webp" alt="Mesin laundry dari koleksi My Equipment" width={720} height={720} sizes="(max-width: 650px) 90vw, 45vw" quality={82} /></div></section>
    <section className="wrap consultation-section"><div><span className="eyebrow">Hubungi tim kami</span><h2>Ceritakan rencana Anda.</h2><p>Informasi pada form hanya digunakan untuk membuat draf pesan WhatsApp. Situs tidak menyimpan jawaban.</p></div><ConsultationForm whatsapp={contact.whatsapp} /></section>
  </main>;
}
