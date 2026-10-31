'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { waLink } from '@/data/catalog';

export type RegionCluster = 'all' | 'pantura' | 'pusat' | 'timur' | 'selatan';

export interface CityCoverageInfo {
  name: string;
  cluster: 'pantura' | 'pusat' | 'timur' | 'selatan';
  clusterLabel: string;
  leadTime: string;
  hubOffice: string;
  technicianService: string;
  training: string;
  partsAvailability: string;
  highlightBadge?: string;
  mapCoords?: { x: number; y: number }; // percentage on map
}

const COVERAGE_DATA: CityCoverageInfo[] = [
  {
    name: 'Kota Pontianak',
    cluster: 'pusat',
    clusterLabel: 'Pusat & Buffer',
    leadTime: 'Hari H (Same Day)',
    hubOffice: 'Kantor Pusat & Showroom Utama',
    technicianService: 'Teknisi standby 24 jam. Siap survey lokasi ruko/rumah gratis.',
    training: 'Pelatihan langsung di showroom atau di outlet mitra.',
    partsAvailability: 'Stok suku cadang 100% ready di gudang pusat.',
    highlightBadge: 'Kantor Pusat',
    mapCoords: { x: 32, y: 55 },
  },
  {
    name: 'Kubu Raya',
    cluster: 'pusat',
    clusterLabel: 'Pusat & Buffer',
    leadTime: 'Hari H (Same Day)',
    hubOffice: 'Showroom & Gudang Utama',
    technicianService: 'Instalasi pipa air, saluran pembuangan, dan cerobong gas hari yang sama.',
    training: 'SOP cuci kiloan, koin, dan teknik setrika uap boiler.',
    partsAvailability: 'Stok suku cadang 100% ready di gudang pusat.',
    highlightBadge: 'Buffer Bandara',
    mapCoords: { x: 38, y: 62 },
  },
  {
    name: 'Singkawang',
    cluster: 'pantura',
    clusterLabel: 'Wilayah Pantura',
    leadTime: '1 Hari (Next Day Delivery)',
    hubOffice: 'Cabang Showroom Singkawang',
    technicianService: 'Teknisi cabang Singkawang langsung ke lokasi untuk setting unit lengkap.',
    training: 'Training operasional mesin dan keselamatan kerja instalasi gas.',
    partsAvailability: 'Suku cadang ready di cabang Singkawang & drop Pontianak.',
    highlightBadge: 'Showroom Cabang',
    mapCoords: { x: 33, y: 28 },
  },
  {
    name: 'Sambas',
    cluster: 'pantura',
    clusterLabel: 'Wilayah Pantura',
    leadTime: '1 – 2 Hari',
    hubOffice: 'Area Layanan Cabang Singkawang & Pontianak',
    technicianService: 'Setting instalasi plumbing ganda, cerobong gas dryer, dan kelistrikan.',
    training: 'Pelatihan SOP lengkap hingga mesin lolos uji coba cuci & kering.',
    partsAvailability: 'Pengiriman suku cadang kilat via shuttle darat.',
    mapCoords: { x: 35, y: 15 },
  },
  {
    name: 'Mempawah',
    cluster: 'pantura',
    clusterLabel: 'Wilayah Pantura',
    leadTime: '1 Hari',
    hubOffice: 'Rute Jalur Utama Pantura',
    technicianService: 'Instalasi langsung oleh tim teknisi My Equipment.',
    training: 'Pendampingan takaran chemical dan SOP kasir laundry.',
    partsAvailability: 'Dukungan suku cadang prioritas dari gudang Pontianak.',
    mapCoords: { x: 31, y: 44 },
  },
  {
    name: 'Landak',
    cluster: 'pusat',
    clusterLabel: 'Pusat & Buffer',
    leadTime: '1 – 2 Hari',
    hubOffice: 'Rute Tengah Kalbar (Ngabang)',
    technicianService: 'Pengantaran dengan armada terlindung + teknisi setting mesin.',
    training: 'Pelatihan operasional mesin cuci, pengering konversi, dan setrika uap.',
    partsAvailability: 'Pengiriman suku cadang terjadwal setiap hari.',
    mapCoords: { x: 45, y: 46 },
  },
  {
    name: 'Bengkayang',
    cluster: 'pantura',
    clusterLabel: 'Wilayah Pantura',
    leadTime: '1 – 2 Hari',
    hubOffice: 'Rute Pantura – Pegunungan',
    technicianService: 'Pemasangan jalur perpipaan dan uji keamanan gas LPG komersial.',
    training: 'Pelatihan SOP perawatan berkala mesin cuci dan pengering.',
    partsAvailability: 'Dukungan teknis dan suplai suku cadang cepat.',
    mapCoords: { x: 41, y: 32 },
  },
  {
    name: 'Sanggau',
    cluster: 'timur',
    clusterLabel: 'Jalur Trans-Kalbar',
    leadTime: '1 – 2 Hari',
    hubOffice: 'Koridor Trans-Kalimantan',
    technicianService: 'Teknisi datang bersama unit untuk instalasi pipa air & jalur gas.',
    training: 'Pelatihan menyeluruh untuk pemilik usaha dan staf karyawan.',
    partsAvailability: 'Suplai suku cadang reguler via ekspedisi darat.',
    mapCoords: { x: 55, y: 52 },
  },
  {
    name: 'Sekadau',
    cluster: 'timur',
    clusterLabel: 'Jalur Trans-Kalbar',
    leadTime: '1 – 2 Hari',
    hubOffice: 'Koridor Trans-Kalimantan',
    technicianService: 'Instalasi lengkap mesin cuci, dryer konversi, dan boiler setrika.',
    training: 'Training keselamatan kerja dan panduan perawatan mesin mandiri.',
    partsAvailability: 'Jaminan ketersediaan suku cadang asli tanpa inden.',
    mapCoords: { x: 64, y: 56 },
  },
  {
    name: 'Sintang',
    cluster: 'timur',
    clusterLabel: 'Jalur Trans-Kalbar',
    leadTime: '2 – 3 Hari',
    hubOffice: 'Hub Layanan Pedalaman Kalbar',
    technicianService: 'Teknisi standby mendampingi sampai mesin lulus uji beban cuci ramai.',
    training: 'SOP manajemen laundry, pencatatan nota, dan teknik chemical.',
    partsAvailability: 'Dukungan ekspedisi suku cadang harian Pontianak – Sintang.',
    highlightBadge: 'Hub Pedalaman',
    mapCoords: { x: 73, y: 55 },
  },
  {
    name: 'Melawi',
    cluster: 'timur',
    clusterLabel: 'Jalur Trans-Kalbar',
    leadTime: '2 – 3 Hari',
    hubOffice: 'Area Nanga Pinoh & Sekitar',
    technicianService: 'Pengiriman unit mesin dengan packing kayu aman + instalasi teknisi.',
    training: 'Training operasional langsung di lokasi ruko mitra.',
    partsAvailability: 'Ketersediaan sparepart boiler, konversi, dan washer.',
    mapCoords: { x: 69, y: 68 },
  },
  {
    name: 'Kapuas Hulu',
    cluster: 'timur',
    clusterLabel: 'Jalur Trans-Kalbar',
    leadTime: '3 – 4 Hari',
    hubOffice: 'Area Putussibau & Perbatasan',
    technicianService: 'Teknisi khusus dikirim untuk setting mesin lengkap sampai tuntas.',
    training: 'Pelatihan intensif operasional dan troubleshooting mesin mandiri.',
    partsAvailability: 'Paket cadangan komponen fast-moving disertakan saat pengiriman.',
    mapCoords: { x: 86, y: 44 },
  },
  {
    name: 'Ketapang',
    cluster: 'selatan',
    clusterLabel: 'Pesisir Selatan',
    leadTime: '2 – 3 Hari (Ekspedisi Khusus / Roro)',
    hubOffice: 'Area Pesisir Selatan Kalbar',
    technicianService: 'Tim teknisi diberangkatkan untuk instalasi lengkap plumbing & kelistrikan.',
    training: 'Pelatihan SOP operasional komersial dan teknik setrika uap bertekanan.',
    partsAvailability: 'Suplai suku cadang teratur via jalur laut & darat.',
    highlightBadge: 'Pesisir Selatan',
    mapCoords: { x: 48, y: 84 },
  },
  {
    name: 'Kayong Utara',
    cluster: 'selatan',
    clusterLabel: 'Pesisir Selatan',
    leadTime: '2 – 3 Hari',
    hubOffice: 'Area Sukadana & Sekitar',
    technicianService: 'Instalasi teknis perpipaan dan pengaturan burner gas dryer.',
    training: 'Pelatihan operasional laundry siap jalan untuk karyawan lokal.',
    partsAvailability: 'Garansi resmi dan dukungan teknisi berkala.',
    mapCoords: { x: 42, y: 74 },
  },
];

const CLUSTERS: { id: RegionCluster; label: string }[] = [
  { id: 'all', label: 'Semua 14 Daerah' },
  { id: 'pusat', label: 'Pusat & Sekitar' },
  { id: 'pantura', label: 'Pantura' },
  { id: 'timur', label: 'Pedalaman & Trans-Kalbar' },
  { id: 'selatan', label: 'Pesisir Selatan' },
];

export function InteractiveRegionalCoverage({
  whatsapp = '6289504444471',
}: {
  whatsapp?: string;
}) {
  const [selectedCityName, setSelectedCityName] = useState<string>('Kota Pontianak');
  const [activeCluster, setActiveCluster] = useState<RegionCluster>('all');

  const selectedCity = useMemo(() => {
    return COVERAGE_DATA.find((c) => c.name === selectedCityName) ?? COVERAGE_DATA[0];
  }, [selectedCityName]);

  const filteredCities = useMemo(() => {
    if (activeCluster === 'all') return COVERAGE_DATA;
    return COVERAGE_DATA.filter((c) => c.cluster === activeCluster);
  }, [activeCluster]);

  const cityWaHref = useMemo(() => {
    const msg = [
      'Halo Tim My Equipment Indonesia,',
      `Saya ingin berkonsultasi mengenai kebutuhan paket usaha laundry dan pengiriman ke daerah saya:`,
      `📍 *Lokasi Usaha: ${selectedCity.name}*`,
      `• Estimasi Kirim: ${selectedCity.leadTime}`,
      `• Kebutuhan: Paket usaha, instalasi teknisi di lokasi, dan informasi ketersediaan unit.`,
      '',
      'Mohon informasi rincian biaya kirim dan jadwal teknisi ke lokasi saya.',
    ].join('\n');
    return waLink(msg, whatsapp);
  }, [selectedCity, whatsapp]);

  return (
    <section className="wrap home-coverage-section" id="jangkauan-wilayah" aria-label="Cakupan layanan Kalimantan Barat">
      <div className="coverage-showcase-card">
        {/* Top Header & Cluster Filter Tabs */}
        <div className="cov-interactive-top">
          <div className="cov-top-titles">
            <span className="coverage-eyebrow">JANGKAUAN LAYANAN & TEKNISI RESMI</span>
            <h2>
              Siap Melayani & Garansi Teknisi ke <br />
              <span className="coverage-highlight-blue">14 Kabupaten/Kota se-Kalbar</span>
            </h2>
            <p>
              Klik kabupaten/kota Anda di bawah untuk memeriksa estimasi pengiriman unit mesin, jangkauan instalasi teknisi langsung (plumbing & gas), serta ketersediaan suku cadang resmi.
            </p>
          </div>

          {/* Region Cluster Tabs */}
          <div className="cov-cluster-tabs" role="tablist" aria-label="Filter wilayah Kalimantan Barat">
            {CLUSTERS.map((cluster) => (
              <button
                key={cluster.id}
                type="button"
                className={`cov-cluster-btn${activeCluster === cluster.id ? ' is-active' : ''}`}
                onClick={() => setActiveCluster(cluster.id)}
              >
                {cluster.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3-Column Interactive Layout: City Selector Grid + Map Hotspots + Active City Drawer */}
        <div className="cov-interactive-grid">
          {/* Left Column: 14 Interactive City Buttons */}
          <div className="cov-cities-column">
            <span className="cov-column-label">PILIH WILAYAH ANDA:</span>
            <div className="coverage-cities-grid">
              {filteredCities.map((city) => {
                const isSelected = selectedCity.name === city.name;
                return (
                  <button
                    key={city.name}
                    type="button"
                    className={`coverage-city-badge cov-city-interactive-btn${isSelected ? ' is-selected' : ''}`}
                    onClick={() => setSelectedCityName(city.name)}
                    aria-pressed={isSelected}
                  >
                    <svg className="city-pin-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
                    </svg>
                    <span className="cov-city-name">{city.name}</span>
                    {city.highlightBadge && (
                      <span className="cov-city-tag-pill">{city.highlightBadge}</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center Column: Map Media with Visual Hotspots */}
          <div className="cov-map-column">
            <div className="coverage-map-media cov-map-container-relative">
              <Image
                src="/images/kalbar-coverage-map-clean.png"
                alt="Peta Jangkauan Layanan My Equipment di Seluruh Kalimantan Barat"
                width={320}
                height={220}
                className="coverage-map-img"
              />

              {/* Interactive map hotspot indicators */}
              {COVERAGE_DATA.filter((c) => c.mapCoords).map((city) => {
                const isCurrent = selectedCity.name === city.name;
                return (
                  <button
                    key={city.name}
                    type="button"
                    className={`cov-map-hotspot${isCurrent ? ' is-active' : ''}`}
                    style={{
                      left: `${city.mapCoords?.x}%`,
                      top: `${city.mapCoords?.y}%`,
                    }}
                    onClick={() => setSelectedCityName(city.name)}
                    title={`Pilih ${city.name}`}
                    aria-label={`Lokasi ${city.name}`}
                  >
                    <span className="cov-hotspot-pulse" aria-hidden="true" />
                    <span className="cov-hotspot-dot" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
            <span className="cov-map-hint">💡 Klik pin di peta atau daftar kota untuk melihat detail layanan</span>
          </div>

          {/* Right Column: Live Interactive Service Drawer Card */}
          <div className="cov-detail-drawer" aria-live="polite">
            <div className="cov-drawer-header">
              <div className="cov-drawer-badge">
                <span className="cov-drawer-dot" aria-hidden="true" />
                <span>DETAIL LAYANAN DAERAH</span>
              </div>
              <h3 className="cov-drawer-city-title">{selectedCity.name}</h3>
              <span className="cov-drawer-cluster-tag">{selectedCity.clusterLabel} • {selectedCity.hubOffice}</span>
            </div>

            <div className="cov-drawer-specs">
              <div className="cov-spec-item">
                <span className="cov-spec-icon" aria-hidden="true">🚚</span>
                <div>
                  <b>Estimasi Waktu Pengiriman</b>
                  <p>{selectedCity.leadTime} via armada resmi</p>
                </div>
              </div>

              <div className="cov-spec-item">
                <span className="cov-spec-icon" aria-hidden="true">🔧</span>
                <div>
                  <b>Instalasi Teknisi di Tempat</b>
                  <p>{selectedCity.technicianService}</p>
                </div>
              </div>

              <div className="cov-spec-item">
                <span className="cov-spec-icon" aria-hidden="true">🎓</span>
                <div>
                  <b>Pelatihan & SOP Operasional</b>
                  <p>{selectedCity.training}</p>
                </div>
              </div>

              <div className="cov-spec-item">
                <span className="cov-spec-icon" aria-hidden="true">🛡️</span>
                <div>
                  <b>Jaminan Suku Cadang & Garansi</b>
                  <p>{selectedCity.partsAvailability}</p>
                </div>
              </div>
            </div>

            <div className="cov-drawer-cta-wrap">
              <a
                href={cityWaHref}
                target="_blank"
                rel="noreferrer"
                className="cov-drawer-wa-btn"
                aria-label={`Konsultasi pengiriman ke ${selectedCity.name} lewat WhatsApp`}
              >
                <svg className="cov-wa-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
                </svg>
                <span>Konsultasi Pengiriman ke {selectedCity.name}</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
