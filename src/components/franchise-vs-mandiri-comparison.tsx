'use client';

import React from 'react';
import Link from 'next/link';
import { waLink } from '@/data/catalog';

interface FranchiseVsMandiriComparisonProps {
  whatsapp?: string;
  sourceContext?: string;
}

interface ComparisonItem {
  feature: string;
  category: string;
  franchise: string;
  franchiseBad: boolean;
  myEquipment: string;
  myEquipmentHighlight: string;
}

const COMPARISON_DATA: ComparisonItem[] = [
  {
    feature: 'Biaya Kemitraan (Franchise Fee)',
    category: 'Biaya Awal',
    franchise: 'Rp 30 Juta – Rp 100 Juta+ (Hanya untuk izin nama)',
    franchiseBad: true,
    myEquipment: 'Rp 0 (GRATIS)',
    myEquipmentHighlight: '100% modal Anda murni menjadi aset mesin & peralatan hak milik penuh.',
  },
  {
    feature: 'Bagi Hasil / Royalti Fee Bulanan',
    category: 'Operasional',
    franchise: '5% – 10% dari total omzet dipotong tiap bulan seumur hidup',
    franchiseBad: true,
    myEquipment: '0% (Tanpa Potongan Royalti)',
    myEquipmentHighlight: 'Seluruh omzet dan laba bersih 100% masuk ke kantong Anda sendiri.',
  },
  {
    feature: 'Hak Nama & Merek Usaha (Brand)',
    category: 'Legalitas',
    franchise: 'Wajib menyewa brand pusat; tidak bisa buka cabang mandiri',
    franchiseBad: true,
    myEquipment: '100% Milik Anda Sendiri',
    myEquipmentHighlight: 'Bebas menentukan nama outlet sendiri, bebas ekspansi buka cabang tanpa izin siapa pun.',
  },
  {
    feature: 'Pasokan Deterjen, Parfum & Chemical',
    category: 'Bahan Baku',
    franchise: 'Wajib beli mahal dari pusat franchise (terikat kontrak)',
    franchiseBad: true,
    myEquipment: 'Bebas / Suplai Harga Grosir Lokal',
    myEquipmentHighlight: 'Disediakan bibit parfum & deterjen grade A ramah lingkungan harga pabrik di Kalbar.',
  },
  {
    feature: 'Ongkos Kirim Unit Mesin',
    category: 'Logistik',
    franchise: 'Ditanggung mitra (ekspedisi kontainer laut Jakarta sangat mahal)',
    franchiseBad: true,
    myEquipment: 'GRATIS Ongkir Seluruh Kalbar',
    myEquipmentHighlight: 'Pengiriman aman dengan armada resmi ke 14 kota/kabupaten di Kalimantan Barat.',
  },
  {
    feature: 'Instalasi Mesin, Perpipaan & Gas',
    category: 'Teknis',
    franchise: 'Dikenakan biaya tambahan tiket teknisi + akomodasi luar pulau',
    franchiseBad: true,
    myEquipment: 'GRATIS Instalasi Teknisi Langsung',
    myEquipmentHighlight: 'Pemasangan plumbing air tandon, ducting hawa panas, dan safety gas sampai mesin menyala.',
  },
  {
    feature: 'Pelatihan Manajemen Bisnis',
    category: 'Edukasi',
    franchise: 'Buku panduan teori kaku dengan batasan SOP sepihak',
    franchiseBad: true,
    myEquipment: 'GRATIS Pelatihan Management Lengkap',
    myEquipmentHighlight: 'Bimbingan SOP cuci noda, setrika uap cepat, pembukuan kasir, dan strategi promosi lokal.',
  },
  {
    feature: 'Kesiapan Servis & Sparepart',
    category: 'Purnajual',
    franchise: 'Menunggu teknisi terbang dari Jakarta jika ada kendala mesin',
    franchiseBad: true,
    myEquipment: 'Teknisi Lokal Kalbar Siaga',
    myEquipmentHighlight: 'Workshop fisik di Kubu Raya / Pontianak dengan ketersediaan suku cadang ready stock.',
  },
];

export function FranchiseVsMandiriComparison({
  whatsapp = '6289504444471',
  sourceContext = 'halaman paket usaha',
}: FranchiseVsMandiriComparisonProps) {
  const waConsultationLink = waLink(
    `Halo My Equipment Indonesia, saya tertarik membuka usaha laundry mandiri (non-franchise) tanpa potongan royalti. Mohon informasi rincian paket dan konsultasi gratis manajemen bisnis. Sumber: ${sourceContext}.`,
    whatsapp
  );

  return (
    <section
      className="franchise-comparison-section wrap"
      id="perbandingan-franchise"
      aria-label="Perbandingan Paket Usaha Mandiri vs Franchise Laundry"
      style={{ margin: '3.5rem auto' }}
    >
      <div className="section-title text-center" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span
          className="eyebrow"
          style={{
            display: 'inline-block',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 700,
            fontSize: '0.825rem',
            color: '#0284c7',
            marginBottom: '0.5rem',
          }}
        >
          KEPUTUSAN INVESTASI CERDAS
        </span>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem 0' }}>
          Kenapa Pengusaha di Kalbar Memilih <span style={{ color: '#0284c7' }}>Paket Mandiri</span> Dibanding Franchise?
        </h2>
        <p style={{ maxWidth: '780px', margin: '0 auto', color: '#475569', fontSize: '1rem', lineHeight: 1.6 }}>
          Membuka usaha laundry kiloan tidak harus membayar puluhan juta hanya untuk menyewa nama merek orang lain.
          Di <strong>My Equipment Indonesia</strong>, modal Anda 100% menjadi aset mesin milik sendiri dengan keuntungan penuh tanpa bagi hasil.
        </p>
      </div>

      {/* Desktop / Tablet Table View */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.07)',
          overflow: 'hidden',
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '0.925rem',
            }}
          >
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '2px solid #e2e8f0' }}>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: '#1e293b', width: '28%' }}>
                  Poin Analisis Investasi
                </th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: '#64748b', width: '36%', background: '#fff1f2' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    <span style={{ color: '#9f1239' }}>Franchise / Waralaba Umum</span>
                  </div>
                </th>
                <th style={{ padding: '1.25rem 1.5rem', fontWeight: 800, color: '#0369a1', width: '36%', background: '#f0fdf4' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                    <span style={{ color: '#15803d' }}>Paket Mandiri My Equipment</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map((item, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: idx === COMPARISON_DATA.length - 1 ? 'none' : '1px solid #f1f5f9',
                    background: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                  }}
                >
                  <td style={{ padding: '1.15rem 1.5rem', verticalAlign: 'top' }}>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.725rem',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        padding: '2px 8px',
                        borderRadius: '4px',
                        background: '#e2e8f0',
                        color: '#475569',
                        marginBottom: '4px',
                      }}
                    >
                      {item.category}
                    </span>
                    <div style={{ fontWeight: 700, color: '#0f172a' }}>{item.feature}</div>
                  </td>

                  <td
                    style={{
                      padding: '1.15rem 1.5rem',
                      verticalAlign: 'top',
                      background: idx % 2 === 0 ? 'rgba(255, 241, 242, 0.4)' : 'rgba(255, 241, 242, 0.7)',
                      color: '#475569',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <span style={{ color: '#e11d48', marginTop: '2px', flexShrink: 0 }} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                          <line x1="18" y1="6" x2="6" y2="18" />
                          <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                      </span>
                      <span>{item.franchise}</span>
                    </div>
                  </td>

                  <td
                    style={{
                      padding: '1.15rem 1.5rem',
                      verticalAlign: 'top',
                      background: idx % 2 === 0 ? 'rgba(240, 253, 244, 0.5)' : 'rgba(240, 253, 244, 0.85)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ color: '#16a34a', marginTop: '2px', flexShrink: 0 }} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                      <strong style={{ color: '#15803d', fontSize: '0.95rem' }}>{item.myEquipment}</strong>
                    </div>
                    <p style={{ margin: '0 0 0 25px', fontSize: '0.825rem', color: '#166534', lineHeight: 1.5 }}>
                      {item.myEquipmentHighlight}
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer Guarantee Bar */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            padding: '1.5rem 1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem',
            color: '#ffffff',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span
                style={{
                  display: 'inline-flex',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: '#22c55e',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                }}
              >
                100% MANDIRI
              </span>
              <strong style={{ fontSize: '1.05rem', color: '#f8fafc' }}>
                Miliki Bisnis Laundry Sukses di Kalbar Tanpa Ikatan Waralaba
              </strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#94a3b8' }}>
              Nikmati fasilitas resmi: <strong>Gratis Ongkir</strong>, <strong>Gratis Instalasi</strong>, dan <strong>Gratis Pelatihan Management</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <Link
              href="/paket-usaha/proposal"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.65rem 1.15rem',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontWeight: 600,
                fontSize: '0.875rem',
                textDecoration: 'none',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              <span>Download Proposal PDF</span>
            </Link>

            <a
              href={waConsultationLink}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.65rem 1.25rem',
                borderRadius: '8px',
                background: '#16a34a',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.875rem',
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(22, 163, 74, 0.3)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
              </svg>
              <span>Konsultasi Paket Bebas Royalti</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
