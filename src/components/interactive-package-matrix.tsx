'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { waLink } from '@/data/catalog';
import type { CmsPackage } from '@/lib/content';

interface SpecRow {
  category: string;
  name: string;
  tooltip?: string;
  values: Record<string, string | boolean>;
}

const SPEC_ROWS: SpecRow[] = [
  // Kategori: Kapasitas & Performa
  {
    category: 'Kapasitas & Alur Kerja',
    name: 'Rekomendasi Kapasitas Harian',
    values: {
      'Pra-Starting': '20 – 35 kg / hari',
      'Starting': '40 – 65 kg / hari',
      'Running': '70 – 120 kg / hari',
      'Growing': '130 – 250+ kg / hari',
    },
  },
  {
    category: 'Kapasitas & Alur Kerja',
    name: 'Waktu Selesai Cuci-Kering',
    values: {
      'Pra-Starting': 'Tergantung cuaca (manual)',
      'Starting': '45 – 60 menit per siklus',
      'Running': '35 – 50 menit (continuous)',
      'Growing': 'Super cepat multi-drum',
    },
  },
  // Kategori: Armada Mesin
  {
    category: 'Armada Mesin Utama',
    name: 'Mesin Cuci (Washer)',
    tooltip: 'Unit washer front loading hemat air dan deterjen khusus komersial',
    values: {
      'Pra-Starting': '1 Unit Front Loading 8 kg',
      'Starting': '1 Unit Front Loading 8-10 kg',
      'Running': '2 Unit Front Loading 8-10 kg',
      'Growing': '3 – 4 Unit Heavy Duty',
    },
  },
  {
    category: 'Armada Mesin Utama',
    name: 'Mesin Pengering (Dryer)',
    tooltip: 'Mesin pengering pakaian konversi gas LPG cepat kering 100% tanpa dijemur',
    values: {
      'Pra-Starting': 'Belum termasuk (opsional)',
      'Starting': '1 Unit Dryer Konversi 10.5 kg',
      'Running': '2 Unit Dryer Konversi 10.5 kg',
      'Growing': '3 – 4 Unit Komersial Stack',
    },
  },
  {
    category: 'Armada Mesin Utama',
    name: 'Setrika Uap Boiler Gas',
    tooltip: 'Setrika uap tabung boiler bertekanan tinggi, licin seketika tanpa gosong',
    values: {
      'Pra-Starting': '1 Unit Boiler 5 – 10 Liter',
      'Starting': '1 Unit Boiler 10 – 15 Liter',
      'Running': '1 Unit Boiler 15 – 20 Liter',
      'Growing': '2 Unit Boiler 25 Liter',
    },
  },
  {
    category: 'Armada Mesin Utama',
    name: 'Kepala & Meja Setrika Uap',
    values: {
      'Pra-Starting': '1 Setrika + Meja Standar',
      'Starting': '1 Setrika + Meja Uap Khusus',
      'Running': '2 Setrika + Meja Uap Vakum',
      'Growing': '4 Setrika + 2 Meja Vakum',
    },
  },
  // Kategori: Perlengkapan Operasional
  {
    category: 'Perlengkapan & Chemical',
    name: 'Paket Bahan Kimia (Chemical)',
    tooltip: 'Deterjen cair rendah busa, pelembut konsentrat, dan parfum laundry premium',
    values: {
      'Pra-Starting': 'Starter Pack 10 Liter',
      'Starting': 'Paket Lengkap 25 Liter',
      'Running': 'Paket Komersial 50 Liter',
      'Growing': 'Paket Industri 100 Liter',
    },
  },
  {
    category: 'Perlengkapan & Chemical',
    name: 'Timbangan Digital & Keranjang',
    values: {
      'Pra-Starting': 'Timbangan manual + 5 Keranjang',
      'Starting': 'Timbangan digital 30 kg + 8 Keranjang',
      'Running': 'Timbangan digital 40 kg + 15 Keranjang',
      'Growing': '2 Timbangan presisi + 25 Keranjang',
    },
  },
  {
    category: 'Perlengkapan & Chemical',
    name: 'Tag Gun, Hanger & Plastik',
    values: {
      'Pra-Starting': '5 Lusin Hanger',
      'Starting': 'Tag gun + 10 Lusin Hanger + Plastik',
      'Running': 'Tag gun + 25 Lusin Hanger + Plastik 3 Ukuran',
      'Growing': 'Full accessories kit + Rak Stainless',
    },
  },
  // Kategori: Layanan & Garansi
  {
    category: 'Layanan & Pendampingan',
    name: '100% Kepemilikan (Tanpa Franchise/Royalti)',
    values: {
      'Pra-Starting': true,
      'Starting': true,
      'Running': true,
      'Growing': true,
    },
  },
  {
    category: 'Layanan & Pendampingan',
    name: 'Instalasi Plumbing Air & Jalur Gas Kalbar',
    tooltip: 'Pemasangan perpipaan air bersih, pembuangan, dan regulator gas oleh teknisi My Equipment',
    values: {
      'Pra-Starting': 'Area Terjangkau',
      'Starting': 'Termasuk (14 Kab/Kota)',
      'Running': 'Termasuk (14 Kab/Kota)',
      'Growing': 'Termasuk (14 Kab/Kota)',
    },
  },
  {
    category: 'Layanan & Pendampingan',
    name: 'Pelatihan SOP Operasional Mesin',
    tooltip: 'Training langsung cara setting takaran chemical, merawat drum, dan keselamatan kerja',
    values: {
      'Pra-Starting': true,
      'Starting': true,
      'Running': true,
      'Growing': true,
    },
  },
  {
    category: 'Layanan & Pendampingan',
    name: 'Garansi Mesin & Dukungan Spare Part Lokal',
    tooltip: 'Jaminan suku cadang tersedia cepat dari gudang Pontianak tanpa menunggu kiriman luar pulau',
    values: {
      'Pra-Starting': 'Garansi Resmi',
      'Starting': 'Garansi Resmi + Sparepart Ready',
      'Running': 'Garansi Prioritas + Teknisi Lokal',
      'Growing': 'Garansi Prioritas & Kunjungan Berkala',
    },
  },
];

export function InteractivePackageMatrix({
  packages,
  whatsapp = '6289504444471',
}: {
  packages: CmsPackage[];
  whatsapp?: string;
}) {
  const [selectedPackageName, setSelectedPackageName] = useState<string>('Running');
  const [showDifferencesOnly, setShowDifferencesOnly] = useState<boolean>(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Categories list
  const categories = useMemo(() => {
    const set = new Set<string>();
    SPEC_ROWS.forEach((r) => set.add(r.category));
    return ['all', ...Array.from(set)];
  }, []);

  // Filtered rows
  const filteredRows = useMemo(() => {
    return SPEC_ROWS.filter((row) => {
      // Category filter
      if (activeCategoryFilter !== 'all' && row.category !== activeCategoryFilter) {
        return false;
      }
      // Differences only filter
      if (showDifferencesOnly) {
        const vals = Object.values(row.values);
        const allSame = vals.every((v) => v === vals[0]);
        if (allSame) return false;
      }
      return true;
    });
  }, [activeCategoryFilter, showDifferencesOnly]);

  // Selected package details
  const selectedPackage = useMemo(() => {
    return packages.find((p) => p.name.toLowerCase() === selectedPackageName.toLowerCase()) ?? packages[2] ?? packages[0];
  }, [packages, selectedPackageName]);

  const waHref = useMemo(() => {
    const msg = [
      'Halo Tim My Equipment Indonesia,',
      `Saya sedang melihat *Tabel Perbandingan Paket Usaha* di website dan tertarik dengan:`,
      `📦 *Paket Laundry ${selectedPackage?.name}* (Harga Indikatif: ${selectedPackage?.price})`,
      '',
      'Mohon informasi rincian lengkap mesin yang didapat, ketersediaan unit, serta estimasi pengiriman & teknisi ke lokasi saya.',
    ].join('\n');
    return waLink(msg, whatsapp);
  }, [selectedPackage, whatsapp]);

  return (
    <div className="pkg-matrix-container" id="perbandingan-paket">
      {/* Header controls bar */}
      <div className="pkg-matrix-header">
        <div className="pkg-matrix-heading-left">
          <div className="pkg-matrix-pill">
            <span className="pkg-matrix-dot" aria-hidden="true" />
            <span>FITUR INTERAKTIF</span>
          </div>
          <h3>Tabel Perbandingan Spesifikasi Paket</h3>
          <p>
            Bandingkan armada mesin, kapasitas harian, kelengkapan operasional, dan garansi antar paket untuk menemukan investasi yang paling pas.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="pkg-matrix-toolbar">
          <label className="pkg-diff-toggle" htmlFor="diff-toggle-input">
            <input
              id="diff-toggle-input"
              type="checkbox"
              checked={showDifferencesOnly}
              onChange={(e) => setShowDifferencesOnly(e.target.checked)}
            />
            <span className="pkg-toggle-slider" aria-hidden="true" />
            <span className="pkg-toggle-label">Hanya Tampilkan Perbedaan</span>
          </label>

          {/* Category Filter Chips */}
          <div className="pkg-category-chips" role="tablist" aria-label="Filter kategori spesifikasi">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`pkg-cat-chip${activeCategoryFilter === cat ? ' is-active' : ''}`}
                onClick={() => setActiveCategoryFilter(cat)}
              >
                {cat === 'all' ? 'Semua Spesifikasi' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Package Selector Pills */}
      <div className="pkg-mobile-selector-strip" aria-label="Pilih paket sorotan untuk perbandingan">
        <span className="pkg-mobile-selector-label">Sorot Paket:</span>
        <div className="pkg-mobile-pill-buttons">
          {packages.map((pack) => (
            <button
              key={pack.name}
              type="button"
              className={`pkg-mobile-pill-btn${selectedPackageName === pack.name ? ' is-active' : ''}`}
              onClick={() => setSelectedPackageName(pack.name)}
            >
              <b>{pack.name}</b>
              <small>{pack.price}</small>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Matrix Table */}
      <div className="pkg-table-wrapper" tabIndex={0} aria-label="Tabel perbandingan paket usaha laundry">
        <table className="pkg-matrix-table">
          <thead>
            <tr>
              <th className="pkg-col-feature">
                <span>Fitur & Kelengkapan</span>
              </th>
              {packages.map((pack) => {
                const isSelected = selectedPackageName.toLowerCase() === pack.name.toLowerCase();
                return (
                  <th
                    key={pack.name}
                    className={`pkg-col-package${isSelected ? ' is-highlighted' : ''}`}
                    onClick={() => setSelectedPackageName(pack.name)}
                  >
                    <div className="pkg-th-content">
                      {isSelected && <span className="pkg-popular-badge">Pilihan Sorotan</span>}
                      <span className="pkg-th-label">{pack.label}</span>
                      <h4 className="pkg-th-title">Paket {pack.name}</h4>
                      <b className="pkg-th-price">{pack.price}</b>
                      <Link
                        href={waLink(`Halo My Equipment, saya ingin konsultasi Paket ${pack.name}. Mohon info rincian dan harga terbaru.`, whatsapp)}
                        target="_blank"
                        rel="noreferrer"
                        className="pkg-th-cta-btn"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Tanya Paket ↗
                      </Link>
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row, rowIdx) => {
              // Group header if category changed
              const isFirstOfCategory =
                rowIdx === 0 || filteredRows[rowIdx - 1]?.category !== row.category;

              return (
                <tr key={row.name} className="pkg-matrix-row">
                  <td className="pkg-cell-feature">
                    {isFirstOfCategory && activeCategoryFilter === 'all' && (
                      <span className="pkg-row-category-tag">{row.category}</span>
                    )}
                    <div className="pkg-feature-name-wrap">
                      <b>{row.name}</b>
                      {row.tooltip && (
                        <button
                          type="button"
                          className="pkg-tooltip-btn"
                          aria-label={`Info: ${row.tooltip}`}
                          onClick={() => setActiveTooltip(activeTooltip === row.name ? null : row.name)}
                        >
                          ℹ️
                        </button>
                      )}
                    </div>
                    {activeTooltip === row.name && (
                      <div className="pkg-tooltip-popup">
                        <p>{row.tooltip}</p>
                      </div>
                    )}
                  </td>

                  {packages.map((pack) => {
                    const isSelected = selectedPackageName.toLowerCase() === pack.name.toLowerCase();
                    const val = row.values[pack.name];

                    return (
                      <td
                        key={pack.name}
                        className={`pkg-cell-val${isSelected ? ' is-highlighted' : ''}`}
                        onClick={() => setSelectedPackageName(pack.name)}
                      >
                        {typeof val === 'boolean' ? (
                          val ? (
                            <span className="pkg-check-icon" aria-label="Termasuk">
                              ✓ Termasuk
                            </span>
                          ) : (
                            <span className="pkg-cross-icon" aria-label="Tidak termasuk">
                              —
                            </span>
                          )
                        ) : (
                          <span className="pkg-text-val">{val ?? '—'}</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Floating Action Strip for the selected package */}
      <div className="pkg-matrix-footer">
        <div className="pkg-footer-info">
          <span>Paket yang sedang dipilih:</span>
          <b>Paket Laundry {selectedPackage.name}</b>
          <small>Estimasi: {selectedPackage.price}</small>
        </div>

        <div className="pkg-footer-actions">
          <a
            href={waHref}
            target="_blank"
            rel="noreferrer"
            className="pkg-footer-wa-btn"
          >
            <svg className="pkg-wa-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
            </svg>
            <span>Konsultasi Paket {selectedPackage.name} via WhatsApp</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
