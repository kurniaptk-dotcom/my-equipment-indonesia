import type { Metadata } from 'next';
import Link from 'next/link';
import { getFaqs, getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';
import { FaqInteractiveList } from '@/components/faq-interactive-list';
import { waLink } from '@/data/catalog';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Pusat Bantuan & Pertanyaan Umum (FAQ)',
    description:
      'Jawaban lengkap seputar paket usaha, spesifikasi mesin cuci & pengering, pengiriman, garansi, pembayaran, dan konsultasi My Equipment Indonesia.',
    canonical: '/faq',
  });
}

export const dynamic = 'force-dynamic';

export default async function FAQPage() {
  const [questions, contact] = await Promise.all([getFaqs(), getContactSettings()]);

  return (
    <main className="subpage faq-modern-page">
      {/* Breadcrumb Navigation */}
      <div className="wrap">
        <div className="breadcrumb-nav">
          <Link href="/">Beranda</Link>
          <span aria-hidden="true">›</span>
          <Link href="/layanan">Layanan</Link>
          <span aria-hidden="true">›</span>
          <span>FAQ (Pertanyaan Umum)</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="wrap faq-modern-hero">
        <div className="faq-hero-copy">
          <span className="eyebrow">Pusat Bantuan Cepat</span>
          <h1>
            Pertanyaan Umum <br />
            <em>Seputar Layanan & Produk.</em>
          </h1>
          <p>
            Temukan jawaban atas pertanyaan yang sering diajukan seputar pembelian produk, paket usaha, pengiriman luar kota, garansi mesin, dan metode pembayaran.
          </p>
        </div>

        <div className="faq-hero-cta">
          <Link
            className="button button-outline"
            href={waLink(undefined, contact.whatsapp)}
            target="_blank"
            rel="noreferrer"
          >
            Tanya Tim CS via WhatsApp <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      {/* FAQ Interactive Search & Topics */}
      <section className="wrap faq-interactive-section">
        <FaqInteractiveList questions={questions} whatsapp={contact.whatsapp} />
      </section>
    </main>
  );
}
