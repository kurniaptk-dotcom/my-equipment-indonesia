import type { Metadata } from 'next';
import Link from 'next/link';
import { waLink } from '@/data/catalog';
import { getFaqs, getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> { return createPageMetadata({ title:'Pertanyaan Umum', description:'Jawaban tentang paket usaha, pilihan produk, katalog dan konsultasi My Equipment Indonesia.', canonical:'/faq' }); }
export const dynamic = 'force-dynamic';

export default async function FAQ() {
  const [questions, contact] = await Promise.all([getFaqs(), getContactSettings()]);
  return <main className="subpage">
    <section className="wrap subhero faq-hero"><span className="eyebrow">Pusat bantuan</span><h1>Pertanyaan yang<br/><em>sering diajukan.</em></h1><p>Informasi ringkas seputar produk, paket, transaksi, dan kontak My Equipment.</p><Link className="button button-outline" href={waLink(undefined, contact.whatsapp)} target="_blank" rel="noreferrer">Tanya tim kami <span aria-hidden="true">↗</span></Link></section>
    <section className="wrap faq-layout"><aside className="faq-categories" aria-label="Topik bantuan"><span className="eyebrow">Topik</span><Link href="/produk">Produk</Link><Link href="/paket-usaha">Paket usaha</Link><Link href="/garansi-servis">Garansi dan servis</Link><Link href="/kontak">Kontak dan showroom</Link></aside><div className="faq-list" aria-label="Daftar pertanyaan">
      {questions.length ? questions.map((item) => <details className="faq-item" key={item.id}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p><Link href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noreferrer' : undefined}>Lihat informasi terkait <span aria-hidden="true">→</span></Link></details>) : <div className="empty-state"><h2>Jawaban sedang diperbarui</h2><p>Tim My Equipment dapat membantu menjawab pertanyaan Anda secara langsung.</p><Link className="button" href={waLink(undefined, contact.whatsapp)} target="_blank" rel="noreferrer">Tanya via WhatsApp <span aria-hidden="true">↗</span></Link></div>}
    </div></section>
  </main>;
}
