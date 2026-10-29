import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { storeUrl, waLink } from '@/data/catalog';
import { getPackages, getContactSettings } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { WhatsAppStickyBar } from '@/components/whatsapp-sticky-bar';
import { createPageMetadata } from '@/lib/page-metadata';
import { PackageConsultationGuide } from '@/components/package-consultation-guide';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Paket Usaha Laundry Pontianak & Kalbar Tanpa Franchise',
    description: 'Pusat paket usaha laundry kiloan, koin, dan komersial siap pakai di Pontianak & seluruh Kalimantan Barat. 100% keuntungan milik Anda, tanpa biaya franchise dan royalti.',
    canonical: '/paket-usaha',
  });
}
export const dynamic = 'force-dynamic';

export default async function PaketUsaha() {
  const [packages, contact] = await Promise.all([getPackages(), getContactSettings()]);
  const contactHref = waLink('Halo My Equipment, saya sedang melihat pilihan paket usaha laundry. Mohon rekomendasikan paket yang sesuai kebutuhan saya. Sumber: halaman paket usaha.', contact.whatsapp);
  const siteUrl = getSiteUrl();

  const packageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${siteUrl}/paket-usaha#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Beranda',
            item: `${siteUrl}/`,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Paket Usaha Laundry',
            item: `${siteUrl}/paket-usaha`,
          },
        ],
      },
      {
        '@type': 'ItemList',
        '@id': `${siteUrl}/paket-usaha#itemlist`,
        name: 'Pilihan Paket Usaha Laundry Tanpa Franchise My Equipment Indonesia',
        numberOfItems: packages.length,
        itemListElement: packages.map((pack, index) => {
          const numericPrice = parseInt(pack.price.replace(/[^0-9]/g, ''), 10) || 0;
          return {
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'Product',
              name: `Paket Usaha Laundry ${pack.name}`,
              description: pack.desc,
              url: `${siteUrl}/paket-usaha`,
              image: pack.image
                ? pack.image.startsWith('http')
                  ? pack.image
                  : `${siteUrl}${pack.image}`
                : `${siteUrl}/images/laundry-hero.webp`,
              brand: {
                '@type': 'Brand',
                name: 'My Equipment Indonesia',
              },
              offers: {
                '@type': 'Offer',
                priceCurrency: 'IDR',
                price: numericPrice,
                priceValidUntil: '2027-12-31',
                availability: 'https://schema.org/InStock',
                seller: {
                  '@type': 'Organization',
                  name: 'My Equipment Indonesia',
                  url: siteUrl,
                },
              },
            },
          };
        }),
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/paket-usaha#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Apakah ada biaya franchise, royalty fee, atau bagi hasil omset bulanan?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sama sekali tidak ada. Semua paket usaha di My Equipment Indonesia bersifat 100% kepemilikan mandiri tanpa franchise fee awal atau royalti bulanan. Seluruh keuntungan bersih menjadi milik Anda dan Anda bebas menggunakan brand nama sendiri.',
            },
          },
          {
            '@type': 'Question',
            name: 'Berapa kisaran modal awal untuk membuka usaha laundry kiloan di Kalimantan Barat?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Modal awal berkisar antara Rp 15 Juta – Rp 25 Juta untuk paket pemula rumahan, Rp 35 Juta – Rp 55 Juta untuk paket komersial reguler, hingga Rp 65 Juta – Rp 120 Juta untuk paket laundry koin/self-service stack komersial.',
            },
          },
          {
            '@type': 'Question',
            name: 'Apakah paket usaha sudah mencakup pengiriman dan instalasi mesin ke luar kota Pontianak?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ya, kami melayani pengiriman dan instalasi lengkap oleh teknisi berpengalaman ke 14 kabupaten/kota di seluruh Kalimantan Barat, termasuk Singkawang, Sambas, Mempawah, Sintang, Ketapang, dan wilayah lainnya.',
            },
          },
          {
            '@type': 'Question',
            name: 'Apakah pemula yang belum pernah berbisnis laundry akan mendapatkan pelatihan operasional?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Ya, setiap pembelian paket usaha sudah termasuk pelatihan SOP operasional mesin, takaran chemical laundry ramah lingkungan, teknik setrika uap boiler, dan pendampingan konsultasi manajemen gratis seumur hidup.',
            },
          },
        ],
      },
    ],
  };

  return <main className="subpage has-sticky-cta" data-page="packages">
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(packageSchema).replace(/</g, '\\u003c') }}
    />
    <section className="wrap subhero"><span className="eyebrow">Paket usaha laundry</span><h1>Mulai dari paket yang <br/><em>sesuai rencana Anda.</em></h1><p>Pilihan paket dapat dikonsultasikan sesuai anggaran, ruang, dan kebutuhan perlengkapan. Rincian setiap paket dikonfirmasi oleh tim.</p><div className="package-hero-actions"><Link className="button" href="/konsultasi">Konsultasi Gratis <span aria-hidden="true">&#8599;</span></Link><a className="button button-outline" href="#panduan">Bantu saya memilih <span aria-hidden="true">&#8595;</span></a></div></section>
    <div className="wrap"><PackageConsultationGuide packages={packages.map(({ name, price }) => ({ name, price }))} whatsapp={contact.whatsapp} /></div>
    <section className="wrap package-grid subpackage" aria-label="Pilihan paket usaha">
      {packages.length ? packages.map((pack, index) => <article className={`package-card ${index === 2 ? 'featured' : ''}`} key={pack.name}>
        <div className="package-image">{pack.image ? <Image src={pack.image} alt={`Paket Usaha Laundry ${pack.name} - My Equipment Pontianak Kalimantan Barat`} fill sizes="(max-width: 650px) 90vw, (max-width: 1000px) 45vw, 280px" /> : <span className="package-image-placeholder">Foto paket belum tersedia</span>}</div>
        <span className="package-label">{pack.label}</span><h2>Paket {pack.name}</h2><p>{pack.desc}</p>
        <ul>{pack.points.map((point) => <li key={point}><span aria-hidden="true">✓</span>{point}</li>)}</ul>
        <div className="package-price"><small>Harga indikatif katalog*</small><b>{pack.price}</b></div>
        <Link href={waLink(`Halo My Equipment, saya tertarik dengan Paket ${pack.name}. Mohon rincian dan harga terbaru.`, contact.whatsapp)} className="button button-block" target="_blank" rel="noreferrer">Tanya detail paket <span aria-hidden="true">↗</span></Link>
      </article>) : <div className="empty-state"><h2>Informasi paket sedang diperbarui</h2><p>Hubungi tim untuk mendiskusikan perlengkapan sesuai rencana usaha Anda.</p><Link className="button" href="/konsultasi">Konsultasi kebutuhan</Link></div>}
    </section>
    <p className="wrap note">*Harga dan isi paket berasal dari referensi katalog, bukan sinkronisasi langsung. Pastikan rincian dan harga terbaru kepada tim.</p>

    <section className="wrap home-faq" aria-label="Pertanyaan umum seputar paket usaha" style={{ marginTop: '3.5rem', marginBottom: '3.5rem' }}>
      <div className="section-title">
        <div>
          <span className="eyebrow">TANYA JAWAB UMUM</span>
          <h2>Pertanyaan Seputar Paket Usaha</h2>
        </div>
        <p>Hal yang paling sering ditanyakan calon mitra sebelum memulai usaha laundry mandiri.</p>
      </div>
      <div className="home-faq-list">
        <details>
          <summary>Apakah ada biaya franchise, royalty fee, atau bagi hasil omset bulanan?<span aria-hidden="true">+</span></summary>
          <p><strong>Sama sekali tidak ada.</strong> Semua paket usaha di My Equipment bersifat kepemilikan mandiri 100%. Seluruh omset dan keuntungan bersih menjadi milik Anda seutuhnya, dan Anda bebas menentukan nama brand laundry sendiri tanpa ikatan royalti.</p>
        </details>
        <details>
          <summary>Berapa kisaran modal awal untuk membuka usaha laundry kiloan di Kalimantan Barat?<span aria-hidden="true">+</span></summary>
          <p>Modal awal bervariasi mulai dari <strong>Rp 15 Juta – Rp 25 Juta</strong> untuk paket pemula rumahan (Pra-Starting), <strong>Rp 35 Juta – Rp 55 Juta</strong> untuk paket reguler komersial, hingga <strong>Rp 65 Juta – Rp 120 Juta</strong> untuk paket laundry koin/self-service modern.</p>
        </details>
        <details>
          <summary>Apakah paket usaha sudah mencakup pengiriman dan instalasi mesin ke luar kota Pontianak?<span aria-hidden="true">+</span></summary>
          <p><strong>Ya, mencakup seluruh 14 kabupaten/kota se-Kalbar.</strong> Tim logistik dan teknisi kami mengantar mesin langsung ke lokasi Anda (Singkawang, Sambas, Sintang, Ketapang, dll.) serta melakukan instalasi perpipaan, cerobong gas boiler, kelistrikan, dan uji coba mesin sampai beroperasi normal.</p>
        </details>
        <details>
          <summary>Apakah saya yang masih pemula akan diajari cara mengoperasikan mesin dan manajemen usaha?<span aria-hidden="true">+</span></summary>
          <p><strong>Ya, ada pelatihan dan pendampingan gratis seumur hidup.</strong> Setiap mitra mendapatkan training operasional mesin, takaran chemical ramah lingkungan, teknik setrika uap boiler, hingga konsultasi strategi promosi dan penetapan harga jual per kilogram.</p>
        </details>
      </div>
    </section>

    <section className="wrap catalog-bottom-cta"><div><span className="eyebrow">Butuh bantuan memilih?</span><h2>Rencanakan perlengkapan bersama tim.</h2><p>Diskusikan skala kebutuhan dan daftar peralatan awal melalui konsultasi.</p></div><Link className="button button-light" href={waLink(undefined, contact.whatsapp)} target="_blank" rel="noreferrer">Hubungi WhatsApp <span aria-hidden="true">↗</span></Link></section>
    <div className="wrap subbottom"><Link className="button button-outline" href="/produk">Lihat katalog produk</Link><Link className="button" href={storeUrl} target="_blank" rel="noreferrer">Toko resmi <span aria-hidden="true">↗</span></Link></div>
    <WhatsAppStickyBar href={contactHref} label="Konsultasikan paket usaha" context="Pilihan paket laundry" />
  </main>;
}
