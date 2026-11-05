import type { Metadata } from 'next';
import Link from 'next/link';
import { getContactSettings, getPackages } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { waLink } from '@/data/catalog';
import { createPageMetadata } from '@/lib/page-metadata';
import { ProposalPrintActions } from '@/components/proposal-print-actions';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Proposal Resmi Paket Usaha Laundry Kalbar (PDF Siap Cetak)',
    description: 'Dokumen proposal resmi penawaran paket usaha laundry kiloan dan koin self-service My Equipment Indonesia di Kalimantan Barat. 100% mandiri tanpa franchise.',
    canonical: '/paket-usaha/proposal',
  });
}

export const dynamic = 'force-dynamic';

export default async function ProposalPage() {
  const [contact, packages] = await Promise.all([getContactSettings(), getPackages()]);
  const siteUrl = getSiteUrl();
  const contactHref = waLink('Halo My Equipment Indonesia, saya telah membaca dokumen Proposal Resmi Paket Usaha di website. Saya ingin konsultasi ketersediaan stok mesin dan jadwal survei teknisi ke lokasi saya.', contact.whatsapp);

  return (
    <main className="subpage proposal-page" style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        {/* Navigation & Print Bar (Hidden during Print) */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/paket-usaha" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
            ← Kembali ke Katalog Paket Usaha
          </Link>
          <ProposalPrintActions whatsappHref={contactHref} />
        </div>

        {/* The Printable Paper Document */}
        <article
          className="proposal-sheet"
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            padding: '3rem 2.5rem',
            color: '#0f172a',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            lineHeight: 1.6,
          }}
        >
          {/* Header Kop Surat */}
          <header style={{ borderBottom: '3px solid #0284c7', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.25rem 0', letterSpacing: '-0.5px' }}>
                  MY EQUIPMENT INDONESIA
                </h1>
                <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: '#0284c7' }}>
                  Pusat Mesin & Paket Usaha Laundry Komersial Kalimantan Barat
                </p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.825rem', color: '#64748b' }}>
                  Workshop Pusat: Jl. Adi Sucipto Perum. Teluk Mulus B No.33, Kubu Raya 78391<br />
                  Cabang Singkawang: Terminal Induk Lama Kios No. 3, Singkawang<br />
                  Kontak WhatsApp / Telp: <b>{contact.phone}</b> · Website: <b>www.myequipmentindonesia.com</b>
                </p>
              </div>
              <div style={{ textAlign: 'right', minWidth: '160px' }}>
                <span style={{ display: 'inline-block', backgroundColor: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 0.75rem', borderRadius: '6px', textTransform: 'uppercase' }}>
                  Dokumen Resmi 2026
                </span>
                <p style={{ fontSize: '0.8rem', color: '#64748b', margin: '0.5rem 0 0 0' }}>
                  Ref: MEI/PROP-LND/2026<br />
                  Sifat: Terbuka & Mengikat
                </p>
              </div>
            </div>
          </header>

          {/* Proposal Introduction */}
          <section style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              PROPOSAL PENAWARAN PAKET USAHA LAUNDRY MANDIRI 100%
            </h2>
            <p style={{ fontSize: '0.925rem', color: '#334155', textAlign: 'justify', margin: 0 }}>
              Dengan hormat, <b>My Equipment Indonesia</b> mempersembahkan skema kemitraan pengadaan paket usaha laundry kiloan, koin self-service, dan komersial siap pakai di Kalimantan Barat. Konsep yang kami hadirkan adalah <b>100% KEPEMILIKAN MANDIRI</b>, di mana mitra bebas menentukan nama merek sendiri, <b>tanpa biaya franchise (0%)</b>, dan <b>tanpa potongan royalti omset bulanan (0%)</b>.
            </p>
          </section>

          {/* Key Advantages Matrix */}
          <section style={{ marginBottom: '2rem', backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginTop: 0, marginBottom: '0.75rem' }}>
              Keuntungan Utama Bermitra Bersama My Equipment Indonesia:
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓</span>
                <span><b>100% Omset Milik Anda</b>: Nol biaya lisensi dan royalti bulanan.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓</span>
                <span><b>Mesin Komersial Heavy Duty</b>: Unit mesin cuci & dryer standar industri tahan putar harian.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓</span>
                <span><b>Instalasi Lengkap oleh Teknisi</b>: Perakitan pipa air, tandon, jalur gas boiler, & kelistrikan aman.</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#16a34a', fontWeight: 'bold' }}>✓</span>
                <span><b>Gudang Suku Cadang di Kalbar</b>: Sparepart ready stock di Kubu Raya tanpa tunggu dari Jakarta.</span>
              </div>
            </div>
          </section>

          {/* Package Overview Table */}
          <section style={{ marginBottom: '2.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.75rem' }}>
              Daftar Pilihan Paket Usaha Siap Operasional:
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ backgroundColor: '#0284c7', color: '#ffffff' }}>
                    <th style={{ padding: '0.75rem', border: '1px solid #0284c7' }}>Pilihan Paket</th>
                    <th style={{ padding: '0.75rem', border: '1px solid #0284c7' }}>Peruntukan & Kapasitas</th>
                    <th style={{ padding: '0.75rem', border: '1px solid #0284c7' }}>Fasilitas Utama yang Didapat</th>
                    <th style={{ padding: '0.75rem', border: '1px solid #0284c7', textAlign: 'right' }}>Investasi Indikatif</th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pack, idx) => (
                    <tr key={pack.name} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                      <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 700, color: '#0f172a' }}>
                        {pack.name}
                        <br /><span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 600 }}>{pack.label}</span>
                      </td>
                      <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', color: '#334155' }}>
                        {pack.desc}
                      </td>
                      <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', color: '#334155' }}>
                        <ul style={{ margin: 0, paddingLeft: '1.1rem' }}>
                          {pack.points.slice(0, 3).map((pt, i) => (
                            <li key={i}>{pt}</li>
                          ))}
                        </ul>
                      </td>
                      <td style={{ padding: '0.75rem', border: '1px solid #e2e8f0', fontWeight: 800, color: '#16a34a', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        {pack.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: '0.775rem', color: '#64748b', fontStyle: 'italic', marginTop: '0.5rem' }}>
              * Harga paket dapat disesuaikan dengan kebutuhan kapasitas, merek mesin (LG, Speed Queen, Maytag), serta penyesuaian kondisi sumber air (pemasangan tabung filter gambut FRP).
            </p>
          </section>

          {/* Area Layanan & Penutup */}
          <section style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
              Jangkauan Pengiriman & Komitmen Teknisi:
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#475569', margin: '0 0 1rem 0' }}>
              Melayani pengiriman unit dan komisioning langsung ke 14 kabupaten/kota se-Kalimantan Barat: <b>Kota Pontianak, Kubu Raya, Singkawang, Sambas, Mempawah, Landak, Sanggau, Sekadau, Sintang, Melawi, Ketapang, Kayong Utara, Bengkayang, dan Kapuas Hulu</b>.
            </p>
          </section>

          {/* Footer & Signature Block */}
          <footer style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderTop: '2px solid #0f172a', paddingTop: '1.5rem' }}>
            <div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748b' }}>
                Dokumen dicetak dari sistem resmi:<br />
                <b>https://www.myequipmentindonesia.com/paket-usaha/proposal</b>
              </p>
            </div>
            <div style={{ textAlign: 'center', minWidth: '180px' }}>
              <p style={{ margin: 0, fontSize: '0.825rem', color: '#334155' }}>Pontianak, Kalimantan Barat</p>
              <p style={{ margin: '0.25rem 0 3.5rem 0', fontSize: '0.875rem', fontWeight: 700, color: '#0f172a' }}>
                My Equipment Indonesia Corp
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 700, textDecoration: 'underline' }}>
                Divisi Kemitraan & Paket Usaha
              </p>
            </div>
          </footer>
        </article>

        {/* Global Print Media Style */}
        <style dangerouslySetInnerHTML={{ __html: `
          @media print {
            body { background: white !important; padding: 0 !important; }
            .no-print, header nav, footer, .whatsapp-sticky-bar, .whatsapp-floating-toggle { display: none !important; }
            .proposal-page { padding: 0 !important; background: white !important; }
            .proposal-sheet { box-shadow: none !important; border-radius: 0 !important; padding: 1.5cm !important; width: 100% !important; max-width: 100% !important; }
          }
        ` }} />
      </div>
    </main>
  );
}
