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
    displayName: 'Kota Pontianak (Pusat)',
    roleBadge: 'Kantor Pusat & Hub',
    badge: 'Hub Utama & Showroom',
    description: 'Kantor pusat resmi, showroom unit mesin front loading & dryer komersial, ready stock sparepart, dan pusat koordinasi teknisi se-Kalbar.',
    lon: 109.3425,
    lat: -0.0263,
    x: 156.7,
    y: 263.5,
    lx: 142,
    ly: 260,
    align: 'end',
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
    id: 'bengkayang',
    name: 'Bengkayang',
    displayName: 'Bengkayang',
    badge: 'Wilayah Tercover Penuh',
    description: 'Armada pengiriman siap antar paket mesin laundry lengkap. Instalasi pipa boiler setrika uap, instalasi listrik, dan kalibrasi pengering gas.',
    lon: 109.6639,
    lat: 0.8222,
    x: 197.4,
    y: 180.2,
    lx: 212,
    ly: 174,
    align: 'start',
  },
  {
    id: 'landak',
    name: 'Landak',
    displayName: 'Landak (Ngabang)',
    badge: 'Trans Kalimantan',
    description: 'Rute pengiriman via Ngabang dan Mandor. Teknisi mendampingi proses setting mesin, layout ruangan laundry, hingga hari pertama buka.',
    lon: 109.9575,
    lat: 0.3842,
    x: 234.6,
    y: 223.2,
    lx: 234,
    ly: 208,
    align: 'middle',
  },
  {
    id: 'sanggau',
    name: 'Sanggau',
    displayName: 'Sanggau',
    badge: 'Jalur Poros Tengah',
    description: 'Pengiriman aman ke Sanggau Kapuas, Tayan, dan sekitarnya. Termasuk instalasi plumbing water heater/gas dan garansi mesin resmi.',
    lon: 110.5898,
    lat: 0.1250,
    x: 314.7,
    y: 248.6,
    lx: 314,
    ly: 268,
    align: 'middle',
  },
  {
    id: 'sekadau',
    name: 'Sekadau',
    displayName: 'Sekadau',
    badge: 'Jalur Poros Tengah',
    description: 'Pusat rute ekspedisi mesin laundry ke Sekadau. Didukung suplai deterjen, parfum laundry ramah serat kain, serta pelatihan kasir.',
    lon: 110.9507,
    lat: 0.0357,
    x: 360.4,
    y: 257.4,
    lx: 360,
    ly: 242,
    align: 'middle',
  },
  {
    id: 'sintang',
    name: 'Sintang',
    displayName: 'Sintang',
    badge: 'Hub Wilayah Timur Kalbar',
    description: 'Pengiriman armada rutin ke Sintang. Teknisi lokal standby untuk perakitan stack washer-dryer komersial dan maintenance terencana.',
    lon: 111.4989,
    lat: 0.0700,
    x: 429.9,
    y: 254.0,
    lx: 430,
    ly: 274,
    align: 'middle',
  },
  {
    id: 'melawi',
    name: 'Melawi',
    displayName: 'Melawi (Nanga Pinoh)',
    badge: 'Wilayah Tercover Penuh',
    description: 'Pengiriman unit paket usaha laundry ke Nanga Pinoh dan sekitarnya. Fasilitas konsultasi layout ruko & kelistrikan sebelum unit dikirim.',
    lon: 111.6978,
    lat: -0.3396,
    x: 455.1,
    y: 294.3,
    lx: 470,
    ly: 308,
    align: 'start',
  },
  {
    id: 'kapuas-hulu',
    name: 'Kapuas Hulu',
    displayName: 'Kapuas Hulu (Putussibau)',
    badge: 'Ujung Timur Kalbar',
    description: 'Pengiriman armada ekspedisi terpercaya hingga Putussibau. Seluruh unit dipacking kayu kokoh dengan asuransi pengiriman serta garansi teknisi.',
    lon: 112.9250,
    lat: 0.8667,
    x: 610.5,
    y: 175.8,
    lx: 624,
    ly: 172,
    align: 'start',
  },
  {
    id: 'kayong-utara',
    name: 'Kayong Utara',
    displayName: 'Kayong Utara (Sukadana)',
    badge: 'Pesisir Barat Daya',
    description: 'Pengiriman ke Sukadana & Teluk Batang lewat armada darat/laut terpadu. Teknisi instalasi lengkap sampai mesin siap beroperasi menghasilkan omset.',
    lon: 109.9525,
    lat: -1.2464,
    x: 234.0,
    y: 383.3,
    lx: 220,
    ly: 384,
    align: 'end',
  },
  {
    id: 'ketapang',
    name: 'Ketapang',
    displayName: 'Ketapang',
    badge: 'Pusat Wilayah Selatan',
    description: 'Jalur logistik rutin ke Ketapang kota dan kecamatan. Dukungan penuh mulai dari paket mesin laundry kiloan, koin self-service, hingga chemical laundry.',
    lon: 109.9719,
    lat: -1.8494,
    x: 236.4,
    y: 442.5,
    lx: 250,
    ly: 448,
    align: 'start',
  },
];

// Arcs from Pontianak hub
const HUB_COORDINATES = { x: 156.7, y: 263.5 };
const NETWORK_ARCS = CITIES_DATA.filter(c => c.id !== 'pontianak').map(c => {
  const mx = (HUB_COORDINATES.x + c.x) / 2;
  const my = (HUB_COORDINATES.y + c.y) / 2 - 12;
  return {
    id: c.id,
    path: `M ${HUB_COORDINATES.x} ${HUB_COORDINATES.y} Q ${mx} ${my} ${c.x} ${c.y}`,
  };
});

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
    <section className="wrap home-coverage-section" aria-label="Cakupan layanan Kalimantan Barat" data-reveal>
      <div className="coverage-showcase-card">
        {/* Left Column: Heading, Value Props & Dynamic City Details */}
        <div className="cov-info-col">
          <div className="cov-eyebrow">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
            </svg>
            Jangkauan Layanan Se-Kalbar
          </div>

          <h2>
            Siap Melayani<br />
            <span className="cov-highlight-blue">Seluruh Kalimantan Barat</span>
          </h2>

          <p className="cov-desc">
            Semua 14 kabupaten dan kota terlayani langsung dengan armada pengiriman unit mesin laundry, instalasi pipa & gas oleh teknisi berpengalaman, serta pendampingan operasional di lokasi.
          </p>

          <ul className="cov-features" aria-label="Keunggulan layanan My Equipment di Kalimantan Barat">
            <li>
              <span className="cov-check-icon" aria-hidden="true">✓</span>
              <span>Armada pengiriman aman ke seluruh kecamatan se-Kalbar</span>
            </li>
            <li>
              <span className="cov-check-icon" aria-hidden="true">✓</span>
              <span>Teknisi standby langsung dari Workshop Pontianak & Kubu Raya</span>
            </li>
            <li>
              <span className="cov-check-icon" aria-hidden="true">✓</span>
              <span>Bebas Franchise Fee & 100% keuntungan murni milik Anda</span>
            </li>
          </ul>

          {/* Dynamic Active City Card with WhatsApp Consultation */}
          <div className="cov-active-box" aria-live="polite">
            <div className="cov-active-header">
              <div className="cov-active-name">
                <span className="cov-pin-icon" aria-hidden="true">📍</span>
                <b>{activeCity.name}</b>
              </div>
              <span className="cov-active-tag">{activeCity.roleBadge || activeCity.badge}</span>
            </div>

            <p className="cov-active-desc">
              {activeCity.description}
            </p>

            <div className="cov-active-badges">
              <span>🚚 Siap Kirim</span>
              <span>🔧 Teknisi Siap</span>
              <span>📦 Garansi Resmi</span>
            </div>

            <a
              href={dynamicWaUrl}
              target="_blank"
              rel="noreferrer"
              className="cov-active-cta"
            >
              <span>Konsultasi Kirim ke {activeCity.name} via WA</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <Link href="/layanan" className="cov-detail-link">
            Lihat Detail Prosedur Layanan & SOP Teknisi <span aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Right Column: Interactive Kalbar Vector Map with Direct Labels */}
        <div className="cov-map-col">
          <div className="cov-svg-wrapper">
            <svg
              className="kalbar-svg"
              viewBox="-25 45 835 535"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Peta interaktif jangkauan 14 kabupaten kota di Kalimantan Barat"
            >
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.85" />
                  <stop offset="60%" stopColor="#bae6fd" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.75" />
                </linearGradient>
              </defs>

              {/* Province Land Silhouette */}
              <path className="map-land" d={KALBAR_PATH} />

              {/* Network Hub Distribution Lines from Pontianak */}
              <g className="map-lines-group" aria-hidden="true">
                {NETWORK_ARCS.map(arc => (
                  <path
                    key={arc.id}
                    className={`map-hub-line ${activeCityId === arc.id ? 'is-active-line' : ''}`}
                    d={arc.path}
                  />
                ))}
              </g>

              {/* 14 Interactive City Pins & Direct Labels */}
              <g className="map-pins-layer">
                {CITIES_DATA.map(city => {
                  const isActive = city.id === activeCityId;
                  const isHub = Boolean(city.isHub);
                  const radius = isHub ? 7 : 5;
                  const haloRadius = isHub ? 16 : 10;
                  
                  // Label length & pill offset
                  const labelText = city.displayName;
                  const textLen = labelText.length * 6.8 + 16;
                  let rx = city.lx;
                  if (city.align === 'end') rx = city.lx - textLen;
                  else if (city.align === 'middle') rx = city.lx - textLen / 2;
                  const ry = city.ly - 10;

                  return (
                    <g
                      key={city.id}
                      className={`map-pin-group ${isHub ? 'pin-hub' : ''} ${isActive ? 'is-active' : ''}`}
                      onClick={() => handleSelectCity(city.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectCity(city.id);
                        }
                      }}
                      tabIndex={0}
                      role="button"
                      aria-pressed={isActive}
                      aria-label={`${city.name}: ${city.roleBadge || city.badge}. Klik untuk melihat informasi layanan.`}
                      style={{ transformOrigin: `${city.x}px ${city.y}px` }}
                    >
                      {/* Pulse Halo for Hub and Active Pin */}
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={haloRadius}
                        className={`pin-halo ${isActive ? 'is-active-halo' : ''}`}
                      />

                      {/* Direct Visible Pill Background */}
                      <rect
                        className="pin-chip-bg"
                        x={rx}
                        y={ry}
                        width={textLen}
                        height={20}
                        rx={10}
                      />

                      {/* Direct Visible Text Label */}
                      <text
                        className="pin-chip-text"
                        x={rx + textLen / 2}
                        y={ry + 14}
                        textAnchor="middle"
                      >
                        {labelText}
                      </text>

                      {/* Pin Node Center Dot */}
                      <circle
                        cx={city.x}
                        cy={city.y}
                        r={radius}
                        className="pin-core-circle"
                      />
                    </g>
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Quick Filter Horizontal Scrollbar for Mobile Touch Ergonomics */}
          <div className="cov-chips-bar" aria-label="Pilih kabupaten kota untuk melihat detail">
            {CITIES_DATA.map(c => (
              <button
                key={c.id}
                type="button"
                className={`cov-chip-btn ${activeCityId === c.id ? 'active' : ''}`}
                onClick={() => handleSelectCity(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

