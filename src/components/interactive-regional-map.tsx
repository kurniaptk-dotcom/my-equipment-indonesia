'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { waLink } from '@/data/catalog';

export interface RegionalCity {
  id: string;
  name: string;
  displayName: string;
  roleBadge?: string;
  badge: string;
  description: string;
  lon: number;
  lat: number;
  x: number;
  y: number;
  lx: number;
  ly: number;
  align: 'start' | 'middle' | 'end';
  isHub?: boolean;
}

const KALBAR_PATH = "M772.6,122.7L766.2,125L765.9,125.1L764.1,141.8L764.5,142.4L761.8,147.4L757,146.8L752.7,149.7L745.1,148.5L738.9,156.7L732.8,159L736.4,164.4L736.3,164.8L731.5,170.1L731.6,174.1L737.4,178.1L732.6,184L733.8,187.7L726.8,191.9L726.8,195.6L713.6,207.5L705.2,211.3L703.2,217.9L694.5,221.1L685,229.5L675.4,234.9L660.9,234.1L654.2,237.6L661.4,243.4L671.4,247.3L673.7,259.8L662.3,279.5L648.1,294.3L652.9,298.9L653.6,303.4L649,307.5L636.7,305.2L627.5,310L624.1,308.7L605.8,313.4L601.3,316.8L588.8,316.7L586,322.2L580.6,325L573.7,325.2L568.8,328.4L561.5,329.6L550.3,327.6L531.7,332.8L524.2,323.3L518.6,321.3L506.9,328.5L498.3,329.9L493.3,332.3L493.4,337.7L487.6,341.3L481.5,337L481.4,346.2L472.1,350.7L459.6,351.6L457.6,353.7L445.8,357.6L445.7,362.2L439,366.5L436.8,370.6L439.1,373.4L437.7,379.8L429.3,380.8L428.7,386.5L419.6,383.6L410.8,387.2L399.8,397.2L393.6,399.5L390.5,407.3L386.7,405.3L380.9,407L382.3,412.5L376.5,414.3L371.6,412L364.2,411.9L360.3,415.9L355.5,416.4L348.4,421.3L348.6,424.7L355.7,429.6L363.5,424.7L366.9,427L369,433.8L363.1,438.8L362.8,444.2L366.1,447.5L363.9,452.7L372.5,453.3L377.5,458.1L372.9,464.1L376.5,472.3L370.8,481.6L375.4,486.6L380,499.9L380,504.9L383.9,517.3L381.7,521.4L387.5,523.3L387.7,527L384.2,530.8L374.7,534.4L368,535.3L362.6,541.3L352.3,543.1L341,546.8L334.7,550.7L331.5,556L323.3,559.3L320.3,554.3L317.6,543.8L312.2,540L306.5,540.3L291.5,546L277.9,555.2L272.8,552.4L267.9,544.4L271.1,541L272.1,532.4L267.2,529.9L268.8,526.1L266.3,521L259.7,519.8L264.6,508.8L262.2,502.3L258.6,498.1L257.4,488.7L251.2,481.5L250.1,475.2L253.6,470.8L254.2,465.3L251.9,455.7L246.4,450L239.9,448.2L227.5,441.1L231.9,435.7L237.6,431.9L243.5,425L244.2,411.3L247.8,404.7L248.7,395.8L246.7,391.8L238.9,386L235.2,386.2L228.7,378L233.4,371.1L220.8,368L211.4,363.3L209.7,358.4L205.5,357.2L195.8,359L194.8,357.3L190.8,356.3L187.3,349.3L168.1,344.7L164.6,352.4L151.3,349.3L143.6,340.2L144.4,326.1L154,330.4L163.5,330.4L172.3,335L180.6,333.5L193.3,339.8L193.6,334.7L188.8,330.6L198.7,329L197.6,327.8L187.4,328.4L187.8,325.9L186.9,324.7L178.4,323.9L175.8,322.1L173.6,321.2L166.4,322.9L161.1,317.5L146.5,320L139.1,315.5L134,317.7L129.6,314.6L127.2,309.8L125.6,296.5L127.6,294.3L124.5,288.1L128.5,286.3L131,284.2L137.9,282.8L136,279.7L137.1,274.8L135.3,266.9L133.3,265.1L135.3,253.4L130.7,248L128.2,240.2L122.4,235.1L108.7,229.9L102.1,229.3L105.6,223.5L104.3,215.6L101.4,213.9L103.5,205L102,195.8L96.6,190.8L97.1,184.2L92.6,180.1L102,175.7L107.7,170.6L110.2,162.2L108.4,157.2L101.8,147.8L106.4,146.5L112.1,135.6L117.2,131.2L119.8,124.5L118.5,118.8L120.8,111.7L129.9,105.2L141,101L145.8,97.7L149.9,89.1L156.3,81.3L157.8,76.8L155.2,71.6L158.3,69.8L167.5,69.5L172,66.8L188.2,64.6L186.2,70.9L181.5,72.9L183.9,78.9L189.2,83.2L196.4,84.4L199.5,87.4L197.4,91.1L196.5,100.7L213.7,113.7L218.5,121.1L231.6,121.7L235.4,124.8L236.7,132.5L245.9,136.8L253.6,143.5L264,145.2L266.1,150.8L270.6,151.9L274.9,157.8L275.1,163L291,164.3L291.5,167.4L301.1,174.4L312.2,176.9L330.5,172.1L336.8,169.6L342.4,171.4L355.2,167.1L371.9,163L380.2,160L405.8,159.8L411.8,159.2L418.4,160.8L427.8,160.8L436.7,158.8L448.8,161.4L452.6,159.8L459.5,161.6L463.3,160.6L475.2,162.5L479.5,156.1L488,150.3L509.6,148.8L513.3,142.6L515.4,132.7L519.4,129.4L521.5,124.4L518,122.4L521.5,117.8L528.1,116.6L533.9,113.2L547.7,111.2L554.2,106.1L575.7,106.9L578.5,108.3L591,107.5L599.4,110L605.1,105.2L609.9,106.8L620.5,106.8L628.1,110.1L623.9,116.4L617.7,118.4L616.9,122.7L634.5,120.9L641.8,125.5L653,124.3L660.4,125.6L673.2,134.8L687.5,131.1L693.6,133.4L698.7,140.7L703.5,141.2L708.6,137.4L720.3,134L724.7,130.1L724.2,126.2L730.9,124.3L744,118.4L749.1,119.1L757.8,117.3L764.6,117.4L772.6,122.7Z M201.8,359.1L209.3,359.5L210.7,371.1L212.2,373.2L196.4,380.8L182.1,385.9L176.7,389.5L165.7,387L170.5,368.1L170.4,362.5L175,356.6L183.5,359.4L187.9,357.4L194,357.9L194.9,360.2L198.5,361.1L201.8,359.1Z M99.5,412L105.1,412.4L111.1,417.8L107.4,422.3L95.2,425.3L90.4,414.9L97.8,414.2L99.5,412Z M123.4,287.8L119.3,285.8L124.2,281.2L132.9,281.5L128.2,286L123.4,287.8Z M176.7,327.7L173.2,323.8L173,322.2L175.8,322.4L178.2,324.1L182.3,325.2L187.1,325.1L187.2,328.1L181.8,329.9L176.7,327.7Z M130.2,269.9L134.1,269.9L136.7,274.3L135.5,280L129.3,273.4L130.2,269.9Z M248.5,527.3L253.7,523.6L255.7,530.4L249.7,532.3L248.5,527.3Z ";

const CITIES_DATA: RegionalCity[] = [
  {
    id: 'pontianak',
    name: 'Kota Pontianak',
    displayName: 'Kota Pontianak',
    roleBadge: 'Kantor Pusat & Hub',
    badge: 'Hub Utama & Showroom',
    description: 'Kantor pusat resmi, showroom unit mesin front loading & dryer komersial, ready stock sparepart, dan pusat koordinasi teknisi se-Kalbar.',
    lon: 109.3425,
    lat: -0.0263,
    x: 156.7,
    y: 263.5,
    lx: 156.7,
    ly: 263.5,
    align: 'middle',
    isHub: true,
  },
  {
    id: 'kubu-raya',
    name: 'Kubu Raya',
    displayName: 'Kubu Raya',
    roleBadge: 'Workshop & Gudang',
    badge: 'Workshop & Distribusi',
    description: 'Workshop instalasi konversi gas, gudang distribusi mesin, dan armada pengiriman utama melayani rute darat seluruh Kalbar.',
    lon: 109.42,
    lat: -0.19,
    x: 166.5,
    y: 279.6,
    lx: 180,
    ly: 294,
    align: 'start',
    isHub: true,
  },
  {
    id: 'singkawang',
    name: 'Singkawang',
    displayName: 'Singkawang',
    badge: 'Showroom & Teknisi Wilayah',
    description: 'Area showroom & jaringan teknisi standby di Singkawang. Pengiriman mesin laundry kiloan & koin serta servis berkala tersedia rutin.',
    lon: 108.9863,
    lat: 0.9073,
    x: 111.6,
    y: 171.8,
    lx: 98,
    ly: 172,
    align: 'end',
  },
  {
    id: 'sambas',
    name: 'Sambas',
    displayName: 'Sambas',
    badge: 'Ujung Pesisir Utara',
    description: 'Pengiriman unit mesin laundry hingga Pemangkat, Tebas, dan Sambas kota. Instalasi tuntas oleh teknisi beserta training SOP laundry kiloan.',
    lon: 109.3039,
    lat: 1.3625,
    x: 151.8,
    y: 127.1,
    lx: 140,
    ly: 114,
    align: 'end',
  },
  {
    id: 'mempawah',
    name: 'Mempawah',
    displayName: 'Mempawah',
    badge: 'Jalur Pesisir Barat',
    description: 'Pengiriman unit kilat 1-2 jam dari Pontianak. Teknisi siap datang langsung untuk survei plumbing, pemasangan gas, dan training staf kasir/operasional.',
    lon: 108.9632,
    lat: 0.3597,
    x: 108.7,
    y: 225.6,
    lx: 96,
    ly: 226,
    align: 'end',
  },
  {
    id: 'landak',
    name: 'Landak',
    displayName: 'Landak',
    badge: 'Jalur Trans Kalimantan',
    description: 'Pengiriman rutin Ngabang dan sekitarnya. Cocok untuk paket laundry kiloan pemula maupun penambahan mesin pengering hotel/mess sawit.',
    lon: 109.7611,
    lat: 0.4283,
    x: 209.8,
    y: 219.0,
    lx: 222,
    ly: 216,
    align: 'start',
  },
  {
    id: 'sanggau',
    name: 'Sanggau',
    displayName: 'Sanggau',
    badge: 'Hub Wilayah Tengah',
    description: 'Layanan instalasi unit lengkap pipa & kelistrikan ke Sanggau Kapuas, Tayan, dan Entikong. Teknisi datang bersama unit hingga mesin siap running.',
    lon: 110.4578,
    lat: 0.1238,
    x: 298.1,
    y: 247.9,
    lx: 312,
    ly: 246,
    align: 'start',
  },
  {
    id: 'sekadau',
    name: 'Sekadau',
    displayName: 'Sekadau',
    badge: 'Pusat Perlintasan',
    description: 'Dukungan penuh paket usaha laundry kiloan siap buka di Sekadau. Jaminan ketersediaan sparepart boiler, pemanas gas, dan sabun deterjen.',
    lon: 110.9507,
    lat: 0.0345,
    x: 360.7,
    y: 256.4,
    lx: 374,
    ly: 258,
    align: 'start',
  },
  {
    id: 'sintang',
    name: 'Sintang',
    displayName: 'Sintang',
    badge: 'Pusat Bisnis Timur Kalbar',
    description: 'Pasar potensial tinggi untuk laundry koin & kiloan express. Unit dikirim via ekspedisi aman terpal, teknisi menyusul untuk setup tuntas.',
    lon: 111.4988,
    lat: 0.0639,
    x: 430.4,
    y: 253.6,
    lx: 444,
    ly: 250,
    align: 'start',
  },
  {
    id: 'melawi',
    name: 'Melawi',
    displayName: 'Melawi',
    badge: 'Kawasan Berkembang',
    description: 'Pengiriman dan instalasi ke Nanga Pinoh dan kecamatan sekitar. Teknisi mendampingi uji coba cuci pertama bersama mitra.',
    lon: 111.6983,
    lat: -0.3364,
    x: 455.7,
    y: 291.6,
    lx: 468,
    ly: 294,
    align: 'start',
  },
  {
    id: 'kapuas-hulu',
    name: 'Kapuas Hulu',
    displayName: 'Kapuas Hulu',
    badge: 'Ujung Timur Kalbar',
    description: 'Layanan terjauh ke Putussibau dan Danau Sentarum tetap tercover! Pengemasan kayu ekstra kokoh dan panduan instalasi video/teknisi on-site.',
    lon: 112.9288,
    lat: 0.8251,
    x: 612.0,
    y: 181.5,
    lx: 624,
    ly: 178,
    align: 'start',
  },
  {
    id: 'bengkayang',
    name: 'Bengkayang',
    displayName: 'Bengkayang',
    badge: 'Lintas Perbatasan',
    description: 'Akses cepat via rute pesisir atau pegunungan. Dukungan paket usaha hemat listrik & gas untuk daerah perumahan dan kos perkebunan.',
    lon: 109.6633,
    lat: 0.8219,
    x: 197.4,
    y: 180.3,
    lx: 210,
    ly: 176,
    align: 'start',
  },
  {
    id: 'ketapang',
    name: 'Ketapang',
    displayName: 'Ketapang',
    badge: 'Kawasan Industri Selatan',
    description: 'Pengiriman rute darat atau kapal laut langsung ke Ketapang. Banyak mitra laundry komersial untuk seragam pabrik dan mess tambang/sawit.',
    lon: 109.9723,
    lat: -1.8488,
    x: 236.7,
    y: 435.3,
    lx: 220,
    ly: 442,
    align: 'end',
  },
  {
    id: 'kayong-utara',
    name: 'Kayong Utara',
    displayName: 'Kayong Utara',
    badge: 'Pesisir Sukadana',
    description: 'Layanan ke Sukadana, Teluk Batang, dan sekitarnya. Pengiriman terjamin sampai depan ruko dengan garansi mesin resmi.',
    lon: 109.9536,
    lat: -1.2483,
    x: 234.3,
    y: 378.2,
    lx: 218,
    ly: 382,
    align: 'end',
  },
];

// Arcs from Pontianak (156.7, 263.5)
const NETWORK_ARCS = [
  { id: 'kubu-raya', path: 'M156.7,263.5 Q160,270 166.5,279.6' },
  { id: 'mempawah', path: 'M156.7,263.5 Q125,245 108.7,225.6' },
  { id: 'singkawang', path: 'M156.7,263.5 Q120,210 111.6,171.8' },
  { id: 'sambas', path: 'M156.7,263.5 Q135,185 151.8,127.1' },
  { id: 'bengkayang', path: 'M156.7,263.5 Q175,215 197.4,180.3' },
  { id: 'landak', path: 'M156.7,263.5 Q180,235 209.8,219.0' },
  { id: 'sanggau', path: 'M156.7,263.5 Q225,248 298.1,247.9' },
  { id: 'sekadau', path: 'M156.7,263.5 Q255,250 360.7,256.4' },
  { id: 'sintang', path: 'M156.7,263.5 Q290,245 430.4,253.6' },
  { id: 'melawi', path: 'M156.7,263.5 Q300,270 455.7,291.6' },
  { id: 'kapuas-hulu', path: 'M156.7,263.5 Q380,205 612.0,181.5' },
  { id: 'kayong-utara', path: 'M156.7,263.5 Q190,320 234.3,378.2' },
  { id: 'ketapang', path: 'M156.7,263.5 Q190,350 236.7,435.3' },
];

interface InteractiveRegionalMapProps {
  whatsapp: string;
}

export function InteractiveRegionalMap({ whatsapp }: InteractiveRegionalMapProps) {
  const [activeCityId, setActiveCityId] = useState<string>('pontianak');
  const gradientId = useId();

  const activeCity = CITIES_DATA.find(c => c.id === activeCityId) || CITIES_DATA[0];

  const handleSelectCity = (id: string) => {
    setActiveCityId(id);
  };

  const dynamicWaText = `Halo My Equipment, saya ingin konsultasi pembukaan usaha laundry dan pengiriman mesin ke ${activeCity.name}. Mohon informasi estimasi biaya pengiriman dan teknisi.`;
  const dynamicWaUrl = waLink(dynamicWaText, whatsapp);

  return (
    <section className="wrap home-coverage-section" id="layanan-kalbar" aria-label="Cakupan layanan Kalimantan Barat">
      {/* Container Card Matching Image 2 */}
      <div className="cov-banner-card">
        {/* Left Column: Heading, Subtitle & Action Button */}
        <div className="cov-left-col">
          <span className="cov-eyebrow-clean">JANGKAUAN LAYANAN</span>

          <h2 className="cov-title-clean">
            Siap Melayani<br />
            Seluruh Kalimantan Barat
          </h2>

          <p className="cov-desc-clean">
            Pengiriman unit, instalasi teknis (plumbing & gas), serta training operasional ke 14 kabupaten/kota.
          </p>

          <Link href="/layanan" className="cov-btn-detail">
            <span>Lihat Detail Layanan</span>
            <span className="cov-btn-arrow" aria-hidden="true">→</span>
          </Link>

          {/* Active City Toast / Status Badge */}
          <div className="cov-city-status-box">
            <div className="cov-status-head">
              <span className="cov-status-pin" aria-hidden="true">📍</span>
              <b>{activeCity.name}</b>
              <span className="cov-status-tag">{activeCity.roleBadge || activeCity.badge}</span>
            </div>
            <p className="cov-status-text">{activeCity.description}</p>
            <div className="cov-status-actions" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
              <Link href={`/wilayah/${activeCity.id}`} className="cov-status-page-link" style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0369a1', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <span>Lihat Pilihan Paket Usaha di {activeCity.name}</span>
                <span aria-hidden="true">↗</span>
              </Link>
              <a
                href={dynamicWaUrl}
                target="_blank"
                rel="noreferrer"
                className="cov-status-wa"
              >
                <span>Tanya Kirim ke {activeCity.name} via WhatsApp</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Center Column: Interactive Kalbar Vector Map */}
        <div className="cov-center-map-col">
          <div className="cov-map-visual">
            <svg
              className="kalbar-svg-clean"
              viewBox="-25 45 835 535"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Peta jangkauan wilayah Kalimantan Barat"
            >
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                </linearGradient>
              </defs>

              {/* Province Land Silhouette */}
              <path className="map-land-clean" d={KALBAR_PATH} />

              {/* Radial Distribution Arcs */}
              <g className="map-lines-group-clean" aria-hidden="true">
                {NETWORK_ARCS.map(arc => (
                  <path
                    key={arc.id}
                    className={`map-line-arc ${activeCityId === arc.id ? 'active-line' : ''}`}
                    d={arc.path}
                  />
                ))}
              </g>

              {/* Nodes */}
              {CITIES_DATA.map(city => {
                const isActive = city.id === activeCityId;
                const isHub = Boolean(city.isHub);

                if (isHub && city.id === 'pontianak') {
                  return (
                    <g
                      key={city.id}
                      className="map-hub-pin"
                      onClick={() => handleSelectCity(city.id)}
                      role="button"
                      tabIndex={0}
                      aria-label="Pontianak Kantor Pusat"
                    >
                      {/* Pulse circle */}
                      <circle cx={city.x} cy={city.y} r={18} className="hub-pulse-ring" />
                      
                      {/* Blue Pin Marker */}
                      <circle cx={city.x} cy={city.y} r={7} fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" />

                      {/* White Badge Tag: "Pontianak (Kantor Pusat)" */}
                      <g transform={`translate(${city.x - 65}, ${city.y - 36})`}>
                        <rect
                          width="130"
                          height="26"
                          rx="13"
                          fill="#ffffff"
                          stroke="#0284c7"
                          strokeWidth="1.5"
                          filter="drop-shadow(0 2px 6px rgba(0,0,0,0.12))"
                        />
                        <circle cx="14" cy="13" r="4.5" fill="#0284c7" />
                        <text
                          x="70"
                          y="17"
                          textAnchor="middle"
                          fill="#0f172a"
                          fontSize="10"
                          fontWeight="700"
                          fontFamily="system-ui, sans-serif"
                        >
                          Pontianak (Kantor Pusat)
                        </text>
                      </g>
                    </g>
                  );
                }

                return (
                  <g
                    key={city.id}
                    className={`map-node-pin ${isActive ? 'active-node' : ''}`}
                    onClick={() => handleSelectCity(city.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={city.name}
                  >
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={isActive ? 8 : 4.5}
                      className="map-node-circle"
                    />
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Right Column: 14 Kabupaten / Kota List Chips Matching Image 2 */}
        <div className="cov-right-chips-col">
          <h3 className="cov-chips-heading">14 Kabupaten/Kota yang Kami Layani</h3>

          <div className="cov-chips-grid-clean" role="group" aria-label="Daftar 14 kabupaten dan kota di Kalimantan Barat">
            {CITIES_DATA.map(c => {
              const isSelected = activeCityId === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`cov-city-pill ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectCity(c.id)}
                  aria-pressed={isSelected}
                >
                  <span className="cov-pill-pin" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" fill="currentColor" />
                    </svg>
                  </span>
                  <span className="cov-pill-name">{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
