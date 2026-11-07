'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { waLink } from '@/data/catalog';
import type { CmsPortfolioItem } from '@/lib/content';

export interface EnrichedPortfolioItem {
  id: string;
  name: string;
  image: string;
  category: 'kiloan' | 'koin' | 'rumahan' | 'komersial';
  categoryLabel: string;
  location: string;
  city: string;
  capacity: string;
  equipmentSpecs: string[];
  description: string;
}

const ENRICHED_DATA: Record<string, {
  category: 'kiloan' | 'koin' | 'rumahan' | 'komersial';
  categoryLabel: string;
  location: string;
  city: string;
  capacity: string;
  equipmentSpecs: string[];
  description: string;
}> = {
  'Atma Laundry': {
    category: 'kiloan',
    categoryLabel: 'Laundry Kiloan',
    location: 'Sungai Raya, Kab. Kubu Raya',
    city: 'Kubu Raya',
    capacity: '50 Kg / Hari',
    equipmentSpecs: [
      '2 Unit Washer Front Loading Commercial 10 kg',
      '2 Unit Dryer Konversi Gas Heavy Duty 10.5 kg',
      '1 Unit Setrika Uap Boiler 15 Liter (2 Kepala)',
      'Instalasi Pipa Air & Gas Standar Safety',
    ],
    description: 'Outlet laundry kiloan perumahan dengan sistem dual-line cuci dan kering tanpa jemur manual.',
  },
  'Dinar Laundry': {
    category: 'koin',
    categoryLabel: 'Self Service & Koin',
    location: 'Kota Pontianak, Kalbar',
    city: 'Pontianak',
    capacity: '80 Kg / Hari (35 Siklus)',
    equipmentSpecs: [
      '2 Stack Commercial Washer-Dryer Speed Queen',
      'Sistem Pembayaran Token Box & QRIS Otomatis',
      'Instalasi Ducting Pembuangan Hawa Panas Sentral',
      'Filter Multimedia Air Bersih Anti-Gambut',
    ],
    description: 'Laundromat koin modern semi-otomatis berlokasi strategis untuk mahasiswa dan masyarakat perkotaan.',
  },
  'Happy Family Laundry': {
    category: 'rumahan',
    categoryLabel: 'Laundry Rumahan',
    location: 'Kota Singkawang, Kalbar',
    city: 'Singkawang',
    capacity: '35 Kg / Hari',
    equipmentSpecs: [
      '1 Unit Washer Front Loading LG 8 kg',
      '1 Unit Dryer Konversi Gas 10.5 kg',
      '1 Unit Setrika Uap Boiler 10 Liter',
      'Timbangan Digital & Keranjang Standar Laundry',
    ],
    description: 'Paket rintisan awal laundry rumahan hemat modal dengan efisiensi gas dan operasional mandiri.',
  },
  'Kila Laundry': {
    category: 'kiloan',
    categoryLabel: 'Laundry Kiloan & Bedcover',
    location: 'Mempawah Hilir, Kab. Mempawah',
    city: 'Mempawah',
    capacity: '60 Kg / Hari',
    equipmentSpecs: [
      '2 Unit Washer Front Loading 10 kg',
      '2 Unit Dryer Konversi Gas 10.5 kg',
      '1 Unit Setrika Uap Boiler 15 Liter + Meja Vacuum',
      'Chemical Deterjen Rendah Busa & Softener Premium',
    ],
    description: 'Pelayanan kiloan cepat dan bedcover keluarga dengan meja vacuum untuk hasil setrika licin rapi.',
  },
  'Permata Laundry Express': {
    category: 'komersial',
    categoryLabel: 'Laundry Komersial',
    location: 'Kapuas Kanan Hulu, Kab. Sintang',
    city: 'Sintang',
    capacity: '120 Kg / Hari',
    equipmentSpecs: [
      '3 Stack Commercial Washer-Dryer Heavy Duty',
      '1 Unit Setrika Uap Boiler Industri 25 Liter',
      'Instalasi Jalur Pipa Gas Central & Boiler Tekanan Tinggi',
      'Training SOP Manajemen Karyawan & Kasir',
    ],
    description: 'Kapasitas industri melayani kontrak cucian borongan instansi, hotel transit, mess perkebunan, dan rumah sakit.',
  },
};

interface PortfolioCatalogProps {
  portfolio: CmsPortfolioItem[];
  whatsapp: string;
}

export function PortfolioCatalog({ portfolio, whatsapp }: PortfolioCatalogProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Map CMS items with enriched metadata
  const items: EnrichedPortfolioItem[] = useMemo(() => {
    return portfolio.map((item) => {
      const extra = ENRICHED_DATA[item.name] || {
        category: 'kiloan',
        categoryLabel: 'Laundry Kiloan',
        location: 'Kalimantan Barat',
        city: 'Kalbar',
        capacity: '50 Kg / Hari',
        equipmentSpecs: [
          'Unit Washer & Dryer Komersial',
          'Setrika Uap Boiler Lengkap',
          'Instalasi Resmi Teknisi Kalbar',
        ],
        description: 'Outlet mitra usaha laundry mandiri My Equipment Indonesia.',
      };

      return {
        id: item.id,
        name: item.name,
        image: item.image,
        category: extra.category,
        categoryLabel: extra.categoryLabel,
        location: extra.location,
        city: extra.city,
        capacity: extra.capacity,
        equipmentSpecs: extra.equipmentSpecs,
        description: extra.description,
      };
    });
  }, [portfolio]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {
      all: items.length,
      kiloan: 0,
      koin: 0,
      rumahan: 0,
      komersial: 0,
    };
    items.forEach((item) => {
      if (counts[item.category] !== undefined) {
        counts[item.category] += 1;
      }
    });
    return counts;
  }, [items]);

  // Filtered items based on category & search
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchCat = activeCategory === 'all' || item.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.location.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.equipmentSpecs.some((spec) => spec.toLowerCase().includes(query));

      return matchCat && matchSearch;
    });
  }, [items, activeCategory, searchQuery]);

  return (
    <section className="portfolio-catalog-container" aria-label="Katalog Portfolio Outlet Laundry">
      {/* Search & Filter Toolbar */}
      <div className="portfolio-toolbar">
        {/* Category Tabs */}
        <div className="portfolio-filter-tabs" role="tablist" aria-label="Filter kategori outlet">
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            className={`portfolio-tab-btn ${activeCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <span>Semua Outlet</span>
            <span className="tab-counter">{categoryCounts.all}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'kiloan'}
            className={`portfolio-tab-btn ${activeCategory === 'kiloan' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('kiloan')}
          >
            <span>Laundry Kiloan</span>
            <span className="tab-counter">{categoryCounts.kiloan}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'koin'}
            className={`portfolio-tab-btn ${activeCategory === 'koin' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('koin')}
          >
            <span>Self Service &amp; Koin</span>
            <span className="tab-counter">{categoryCounts.koin}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'rumahan'}
            className={`portfolio-tab-btn ${activeCategory === 'rumahan' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('rumahan')}
          >
            <span>Rumahan</span>
            <span className="tab-counter">{categoryCounts.rumahan}</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'komersial'}
            className={`portfolio-tab-btn ${activeCategory === 'komersial' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('komersial')}
          >
            <span>Komersial &amp; Hotel</span>
            <span className="tab-counter">{categoryCounts.komersial}</span>
          </button>
        </div>

        {/* Search Input Box */}
        <div className="portfolio-search-wrap">
          <svg
            className="portfolio-search-ico"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama outlet, kota, atau mesin..."
            className="portfolio-search-input"
            aria-label="Cari portfolio outlet"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="portfolio-search-clear"
              aria-label="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Catalog Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="portfolio-catalog-grid">
          {filteredItems.map((item, idx) => {
            const waText = `Halo My Equipment, saya melihat dokumentasi portfolio outlet "${item.name}" (${item.location}) di website. Saya tertarik membuka usaha laundry dengan setup mesin dan kapasitas serupa. Mohon info rincian paket dan estimasi biayanya.`;
            const waUrl = waLink(waText, whatsapp);

            return (
              <article className="portfolio-catalog-card" key={item.id || idx}>
                {/* Visual Photo Card */}
                <div className="portfolio-card-media">
                  <Image
                    src={item.image}
                    alt={`Dokumentasi Outlet ${item.name} - My Equipment Indonesia`}
                    fill
                    sizes="(max-width: 650px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="portfolio-card-img"
                    priority={idx < 3}
                  />

                  {/* Top-Left Category Badge */}
                  <span className="portfolio-badge-category">
                    {item.categoryLabel}
                  </span>

                  {/* Top-Right Location Tag */}
                  <span className="portfolio-badge-location">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </svg>
                    <span>{item.city}</span>
                  </span>

                  {/* Bottom-Left Capacity Tag */}
                  <span className="portfolio-badge-capacity">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="11" height="11" aria-hidden="true">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <span>{item.capacity}</span>
                  </span>
                </div>

                {/* Card Content & Details */}
                <div className="portfolio-card-content">
                  {/* Verified Status Banner */}
                  <div className="portfolio-status-row">
                    <span className="portfolio-status-dot" aria-hidden="true" />
                    <span className="portfolio-status-text">Instalasi Selesai &amp; Beroperasi</span>
                  </div>

                  <h3 className="portfolio-outlet-name">{item.name}</h3>

                  <div className="portfolio-location-full">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" aria-hidden="true">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{item.location}</span>
                  </div>

                  <p className="portfolio-outlet-desc">{item.description}</p>

                  {/* Installed Equipment Specs */}
                  <div className="portfolio-specs-box">
                    <div className="portfolio-specs-title">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13" aria-hidden="true">
                        <rect x="4" y="2" width="16" height="20" rx="3" />
                        <circle cx="12" cy="14" r="4" />
                      </svg>
                      <span>Paket Mesin Terpasang:</span>
                    </div>
                    <ul className="portfolio-specs-list">
                      {item.equipmentSpecs.map((spec, sIdx) => (
                        <li key={sIdx}>
                          <span className="spec-check" aria-hidden="true">✓</span>
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="portfolio-card-footer">
                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="portfolio-wa-cta"
                    >
                      <svg className="portfolio-wa-ico" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
                      </svg>
                      <span>Konsultasi Setup Serupa</span>
                      <span aria-hidden="true">→</span>
                    </a>

                    <Link href="/paket-usaha" className="portfolio-link-compare">
                      <span>Pilihan Paket</span>
                      <span aria-hidden="true">↗</span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="portfolio-empty-state">
          <div className="empty-state-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="40" height="40" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3>Tidak Ada Outlet yang Sesuai Pencarian</h3>
          <p>Coba gunakan kata kunci lain atau pilih kategori &ldquo;Semua Outlet&rdquo;.</p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className="portfolio-reset-btn"
          >
            Reset Filter &amp; Tampilkan Semua
          </button>
        </div>
      )}
    </section>
  );
}

