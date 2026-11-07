import React from 'react';
import Link from 'next/link';
import { waLink } from '@/data/catalog';

interface PackageComparisonTableProps {
  whatsapp?: string;
}

interface PackageTier {
  name: string;
  badge: string;
  price: string;
  capacity: string;
  equipment: string[];
  features: string[];
  target: string;
  bepEstimate: string;
  popular?: boolean;
}

const PACKAGE_TIERS: PackageTier[] = [
  {
    name: 'Pra-Starting (Rumahan)',
    badge: 'Mulai Rintisan',
    price: 'Rp 14.950.000',
    capacity: '25 – 40 kg / hari',
    equipment: [
      '1 Unit Washer Front Loading 8 kg',
      '1 Unit Setrika Uap Boiler Gas 5–10L',
      'Meja Setrika & Timbangan Digital',
      'Starter Kit Chemical Laundry Ramah Lingkungan',
    ],
    features: [
      'Instalasi teknisi resmi langsung di lokasi',
      'Bonus Pelatihan SOP Cuci & Setrika Uap',
      'Bimbingan Manajemen Kas & Promosi Awal',
      '100% Tanpa Franchise Fee & Tanpa Royalti',
    ],
    target: 'Usaha rumahan, perumahan padat, kos-kosan mahasiswa',
    bepEstimate: '3 – 5 Bulan',
  },
  {
    name: 'Starting Reguler',
    badge: 'Paling Diminati Pemula',
    price: 'Rp 21.500.000',
    capacity: '45 – 65 kg / hari',
    equipment: [
      '1 Unit Washer Front Loading 8–10 kg',
      '1 Unit Setrika Uap Boiler 10–15L (Tekanan Tinggi)',
      'Meja Uap Khusus & Selang Teflon Safety',
      'Paket Chemical + Keranjang & Display Tag',
    ],
    features: [
      'Instalasi plumbing pipa air & kelistrikan aman',
      'Bonus Modul Manajemen Operasional Laundry',
      'Training SOP Penanganan Noda & Serat Kain',
      'Garansi servis & suku cadang siaga di Kalbar',
    ],
    target: 'Outlet ruko pemula, laundry kiloan reguler & bedcover single',
    bepEstimate: '4 – 6 Bulan',
    popular: true,
  },
  {
    name: 'Running Express (Siap Gas)',
    badge: 'Operasional Praktis 100% Kering',
    price: 'Rp 38.500.000',
    capacity: '70 – 120 kg / hari',
    equipment: [
      '1 Unit Washer Commercial Front Loading 10 kg',
      '1 Unit Dryer Pengering Konversi Gas 10.5 kg (Kering 100%)',
      '1 Unit Setrika Uap Boiler 15L (2 Kepala Setrika)',
      'Ducting Exhaust Udara Panas & Regulator Gas Safety',
    ],
    features: [
      'Instalasi lengkap cerobong gas & kelistrikan anti-jeglek',
      'Bonus Pelatihan Manajemen Karyawan & Kasir',
      'Sistem Alur Kerja Kilat: Cuci-Kering 60 Menit',
      'Dukungan promosi lokal & Google Maps setup',
    ],
    target: 'Laundry kiloan express, kawasan perhotelan/kantor, anti-musim hujan',
    bepEstimate: '5 – 7 Bulan',
  },
  {
    name: 'Growing Multi-Capacity',
    badge: 'Kapasitas Besar & Skala Industri',
    price: 'Rp 58.500.000',
    capacity: '130 – 250+ kg / hari',
    equipment: [
      '2 Unit Washer Commercial Heavy Duty',
      '2 Unit Dryer Gas Komersial Kapasitas Jumbo',
      '1 Unit Setrika Uap Boiler Industri 25–35L',
      'Meja Vacuum Khusus & Rak Display Bertingkat',
    ],
    features: [
      'Instalasi manifold gas tersentralisasi & safety valve',
      'Bonus Pelatihan Manajemen Audit Keuangan Laundry',
      'SOP Penanganan Cucian Borongan Hotel & Restoran',
      'Prioritas kunjungan teknisi darurat',
    ],
    target: 'Laundromat komersial skala besar, rekanan asrama, mess & hotel',
    bepEstimate: '6 – 8 Bulan',
  },
  {
    name: 'Laundromat Koin / QRIS',
    badge: 'Self-Service Modern Tanpa Kasir',
    price: 'Rp 68.000.000 – Rp 135 Jt',
    capacity: '30 – 80+ Siklus / hari',
    equipment: [
      '2 – 4 Stack Commercial Washer-Dryer (Speed Queen / Maytag)',
      'Sistem Box Koin Token / Kiosk Digital QRIS Cashless',
      'Instalasi Ducting Stainless & Saluran Pembuangan Sentral',
      'Paket Deterjen Otomatis Auto-Dosing Pump',
    ],
    features: [
      'Nol beban gaji karyawan setrika & lipat',
      'Cloud Dashboard: Monitoring omset harian via HP',
      'Pelatihan operasional sistem payment & perawatan filter',
      'Konsultasi penataan layout interior outlet modern',
    ],
    target: 'Kawasan kampus UNTAN, area kost eksklusif, ruko strategis perkotaan',
    bepEstimate: '8 – 12 Bulan',
  },
];

export function PackageComparisonTable({ whatsapp = '6289504444471' }: PackageComparisonTableProps) {
  return (
    <section className="package-table-section wrap" id="tabel-perbandingan" aria-label="Tabel Perbandingan Paket Usaha Laundry Pontianak 2026">
      <div className="section-title">
        <div>
          <span className="eyebrow">RINGKASAN LENGKAP &amp; BIAYA INVESTASI</span>
          <h2>Tabel Perbandingan Paket Usaha Laundry 2026</h2>
        </div>
        <p>
          Temukan rincian estimasi modal, kelengkapan unit mesin komersial, kapasitas produksi harian, dan fasilitas pelatihan manajemen bisnis laundry tanpa franchise fee.
        </p>
      </div>

      <div className="package-table-responsive-wrapper">
        <table className="package-comparison-table">
          <caption className="sr-only">
            Tabel rincian paket usaha laundry kiloan dan koin komersial di Pontianak &amp; Kalimantan Barat
          </caption>
          <thead>
            <tr>
              <th scope="col" className="col-tier">Tingkat Paket</th>
              <th scope="col" className="col-price">Estimasi Modal</th>
              <th scope="col" className="col-cap">Kapasitas Harian</th>
              <th scope="col" className="col-gear">Kelengkapan Unit Mesin</th>
              <th scope="col" className="col-bonus">Bonus Pelatihan &amp; Teknisi</th>
              <th scope="col" className="col-target">Target Lokasi</th>
              <th scope="col" className="col-bep">Estimasi BEP</th>
              <th scope="col" className="col-action">Konsultasi</th>
            </tr>
          </thead>
          <tbody>
            {PACKAGE_TIERS.map((tier, idx) => {
              const waText = `Halo My Equipment, saya ingin konsultasi mengenai Paket Usaha Laundry "${tier.name}" (${tier.price}). Mohon informasi ketersediaan mesin, spesifikasi teknis, dan jadwal survei lokasi.`;
              const waHref = waLink(waText, whatsapp);

              return (
                <tr key={idx} className={tier.popular ? 'row-popular' : undefined}>
                  <td className="col-tier">
                    <div className="tier-name-wrap">
                      {tier.popular && <span className="tier-popular-pill">POPULER</span>}
                      <strong className="tier-title">{tier.name}</strong>
                      <span className="tier-badge-sub">{tier.badge}</span>
                    </div>
                  </td>
                  <td className="col-price">
                    <span className="tier-price-val">{tier.price}</span>
                    <small className="tier-price-note">100% Milik Anda</small>
                  </td>
                  <td className="col-cap">
                    <strong>{tier.capacity}</strong>
                  </td>
                  <td className="col-gear">
                    <ul className="tier-cell-list">
                      {tier.equipment.map((item, eIdx) => (
                        <li key={eIdx}>
                          <span className="table-check-icon" aria-hidden="true">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="col-bonus">
                    <ul className="tier-cell-list tier-bonus-list">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx}>
                          <span className="table-bonus-icon" aria-hidden="true">★</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="col-target">
                    <span className="tier-target-text">{tier.target}</span>
                  </td>
                  <td className="col-bep">
                    <span className="tier-bep-val">{tier.bepEstimate}</span>
                  </td>
                  <td className="col-action">
                    <a
                      href={waHref}
                      target="_blank"
                      rel="noreferrer"
                      className="table-cta-btn"
                      title={`Tanya rincian paket ${tier.name} via WhatsApp`}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13" aria-hidden="true">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
                      </svg>
                      <span>Tanya via WA</span>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="table-scroll-hint" aria-hidden="true">
        <span>← Geser ke samping untuk melihat rincian kelengkapan paket →</span>
      </div>
    </section>
  );
}
