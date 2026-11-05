'use client';

import React, { useState, useId } from 'react';
import Link from 'next/link';
import { waLink } from '@/data/catalog';

export interface RegionalCity {
  id: string;
  name: string;
  displayName: string;
  roleBadge: string;
  badge: string;
  description: string;
  regionCategory: 'hub' | 'pantura' | 'hulu' | 'selatan';
  categoryLabel: string;
  transitEstimate: string;
  serviceHighlight: string;
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
    displayName: 'Pontianak',
    roleBadge: 'Kantor Pusat & Showroom',
    badge: 'Hub Utama & Showroom',
    description: 'Kantor pusat resmi, showroom unit mesin front loading & dryer komersial, ready stock sparepart, dan pusat koordinasi teknisi se-Kalbar.',
    regionCategory: 'hub',
    categoryLabel: 'Hub Pusat',
    transitEstimate: 'Same Day',
    serviceHighlight: 'Showroom & Teknisi Standby',
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
    regionCategory: 'hub',
    categoryLabel: 'Workshop Hub',
    transitEstimate: 'Same Day',
    serviceHighlight: 'Perakitan Gas & Truk Siap Kirim',
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
    roleBadge: 'Hub Area Pantura',
    badge: 'Showroom & Teknisi Wilayah',
    description: 'Showroom & teknisi standby di Singkawang. Pengiriman mesin laundry kiloan & koin serta jadwal servis rutin terjangkau.',
    regionCategory: 'pantura',
    categoryLabel: 'Pantura',
    transitEstimate: '3 - 4 Jam',
    serviceHighlight: 'Teknisi Area Pantura Standby',
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
    roleBadge: 'Pesisir Utara Kalbar',
    badge: 'Ujung Pesisir Utara',
    description: 'Pengiriman unit menjangkau Pemangkat, Tebas, hingga Sambas kota. Instalasi tuntas teknisi plumbing & training SOP.',
    regionCategory: 'pantura',
    categoryLabel: 'Pantura',
    transitEstimate: '4 - 5 Jam',
    serviceHighlight: 'Instalasi Lengkap & Training SOP',
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
    roleBadge: 'Jalur Pesisir Barat',
    badge: 'Jalur Pesisir Barat',
    description: 'Pengiriman unit kilat 1-2 jam dari Pontianak. Teknisi siap datang survei plumbing, gas, dan training staf.',
    regionCategory: 'hub',
    categoryLabel: 'Pesisir Barat',
    transitEstimate: '1 - 2 Jam',
    serviceHighlight: 'Survei Cepat & Komisioning Kilat',
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
    roleBadge: 'Jalur Trans Kalimantan',
    badge: 'Jalur Trans Kalimantan',
    description: 'Pengiriman rutin ke Ngabang dan mess perkebunan sawit. Cocok untuk paket usaha kiloan & dryer kapasitas besar.',
    regionCategory: 'hulu',
    categoryLabel: 'Trans Kalbar',
    transitEstimate: '3 - 4 Jam',
    serviceHighlight: 'Mesin Heavy Duty Mess & Kiloan',
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
    roleBadge: 'Hub Poros Tengah',
    badge: 'Hub Wilayah Tengah',
    description: 'Layanan instalasi unit ke Sanggau Kapuas, Tayan, dan Entikong. Teknisi mengawal setup pipa plumbing & gas.',
    regionCategory: 'hulu',
    categoryLabel: 'Trans Kalbar',
    transitEstimate: '4 - 5 Jam',
    serviceHighlight: 'Setup Pipa Gas & Filter Gambut',
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
    roleBadge: 'Pusat Perlintasan',
    badge: 'Pusat Perlintasan',
    description: 'Dukungan penuh paket usaha laundry mandiri tanpa royalty. Jaminan sparepart pemanas gas & deterjen.',
    regionCategory: 'hulu',
    categoryLabel: 'Trans Kalbar',
    transitEstimate: '5 - 6 Jam',
    serviceHighlight: 'Garansi Sparepart & Training Kasir',
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
    roleBadge: 'Pusat Bisnis Hulu',
    badge: 'Pusat Bisnis Timur Kalbar',
    description: 'Pasar potensial tinggi laundry koin QRIS & kiloan express. Unit dikirim via truk aman, teknisi on-site setup tuntas.',
    regionCategory: 'hulu',
    categoryLabel: 'Hulu Kalbar',
    transitEstimate: '7 - 8 Jam',
    serviceHighlight: 'Teknisi Datang Setup Tuntas On-Site',
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
    roleBadge: 'Kawasan Berkembang',
    badge: 'Kawasan Berkembang',
    description: 'Pengiriman dan instalasi ke Nanga Pinoh. Teknisi mendampingi uji cuci perdana bersama mitra hingga running.',
    regionCategory: 'hulu',
    categoryLabel: 'Hulu Kalbar',
    transitEstimate: '8 - 9 Jam',
    serviceHighlight: 'Pendampingan Uji Cuci Pertama',
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
    roleBadge: 'Ujung Timur Kalbar',
    badge: 'Ujung Timur Kalbar',
    description: 'Layanan terjauh ke Putussibau tetap tercover! Pengemasan peti kayu kokoh dan panduan instalasi teknisi on-site.',
    regionCategory: 'hulu',
    categoryLabel: 'Hulu Kalbar',
    transitEstimate: '10 - 12 Jam',
    serviceHighlight: 'Packing Kayu Ekstra & Setup Tuntas',
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
    roleBadge: 'Kawasan Perbukitan',
    badge: 'Lintas Perbatasan',
    description: 'Akses cepat via rute pegunungan. Dukungan paket usaha hemat listrik & gas untuk warga & mess perkebunan.',
    regionCategory: 'pantura',
    categoryLabel: 'Pantura',
    transitEstimate: '3 - 4 Jam',
    serviceHighlight: 'Instalasi Lengkap Plumbing & Gas',
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
    roleBadge: 'Kawasan Industri Selatan',
    badge: 'Kawasan Industri Selatan',
    description: 'Pengiriman rute darat atau kapal laut langsung. Banyak mitra laundry untuk mess sawit, tambang, & hotel.',
    regionCategory: 'selatan',
    categoryLabel: 'Selatan',
    transitEstimate: 'Rute Reguler',
    serviceHighlight: 'Dryer Kapasitas Besar Mess & Tambang',
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
    roleBadge: 'Pesisir Selatan',
    badge: 'Pesisir Sukadana',
    description: 'Layanan ke Sukadana & Teluk Batang. Pengiriman terjamin sampai depan ruko dengan garansi mesin resmi.',
    regionCategory: 'selatan',
    categoryLabel: 'Selatan',
    transitEstimate: 'Jalur Sukadana',
    serviceHighlight: 'Garansi Mesin & Suplai Kimia',
    lon: 109.9536,
    lat: -1.2483,
    x: 234.3,
    y: 378.2,
    lx: 218,
    ly: 382,
    align: 'end',
  },
];

// Radiating distribution network arcs from Pontianak Hub (156.7, 263.5)
const NETWORK_ARCS = [
  { id: 'kubu-raya', path: 'M156.7,263.5 Q160,270 166.5,279.6', delay: '0s' },
  { id: 'mempawah', path: 'M156.7,263.5 Q125,245 108.7,225.6', delay: '0.2s' },
  { id: 'singkawang', path: 'M156.7,263.5 Q120,210 111.6,171.8', delay: '0.4s' },
  { id: 'sambas', path: 'M156.7,263.5 Q135,185 151.8,127.1', delay: '0.6s' },
  { id: 'bengkayang', path: 'M156.7,263.5 Q175,215 197.4,180.3', delay: '0.8s' },
  { id: 'landak', path: 'M156.7,263.5 Q180,235 209.8,219.0', delay: '1.0s' },
  { id: 'sanggau', path: 'M156.7,263.5 Q225,248 298.1,247.9', delay: '1.2s' },
  { id: 'sekadau', path: 'M156.7,263.5 Q255,250 360.7,256.4', delay: '1.4s' },
  { id: 'sintang', path: 'M156.7,263.5 Q290,245 430.4,253.6', delay: '1.6s' },
  { id: 'melawi', path: 'M156.7,263.5 Q300,270 455.7,291.6', delay: '1.8s' },
  { id: 'kapuas-hulu', path: 'M156.7,263.5 Q380,205 612.0,181.5', delay: '2.0s' },
  { id: 'kayong-utara', path: 'M156.7,263.5 Q190,320 234.3,378.2', delay: '2.2s' },
  { id: 'ketapang', path: 'M156.7,263.5 Q190,350 236.7,435.3', delay: '2.4s' },
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

  const dynamicWaText = `Halo My Equipment, saya ingin konsultasi pembukaan usaha laundry dan pengiriman mesin ke ${activeCity.name}. Mohon informasi estimasi biaya pengiriman dan jadwal teknisi ke lokasi saya.`;
  const dynamicWaUrl = waLink(dynamicWaText, whatsapp);

  // Exact percentage coordinates for HTML overlay card:
  // ViewBox: minX = -25, minY = 45, width = 835, height = 535
  const pctX = ((activeCity.x + 25) / 835) * 100;
  const pctY = ((activeCity.y - 45) / 535) * 100;

  return (
    <section className="wrap home-coverage-section" id="layanan-kalbar" aria-label="Jangkauan Distribusi dan Layanan Seluruh Kalimantan Barat">
      {/* 2-Column Clean Split Bento Container */}
      <div className="cov-split-card">
        
        {/* Left Column: Heading, Trust Chips & Active City Terminal */}
        <div className="cov-split-left">
          {/* Eyebrow Pill */}
          <div className="cov-eyebrow-chip">
            <span className="cov-dot-green" aria-hidden="true" />
            <span>Jangkauan Distribusi &amp; Teknisi Resmi</span>
          </div>

          {/* Heading */}
          <h2 className="cov-split-title">
            Siap Melayani <br />
            <span className="cov-blue-text">Seluruh Kalimantan <br />Barat</span>
          </h2>

          {/* Subtitle */}
          <p className="cov-split-desc">
            Pengiriman unit aman bergaransi, instalasi teknis tuntas, serta training operasional langsung di seluruh wilayah Kalimantan Barat.
          </p>

          {/* Trust Chips (3-column horizontal row) */}
          <div className="cov-trust-row" role="list" aria-label="Keunggulan Layanan Distribusi">
            <div className="cov-trust-chip" role="listitem">
              <span className="cov-trust-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="1" y="3" width="15" height="13" rx="2" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </span>
              <span>Armada Distribusi</span>
            </div>

            <div className="cov-trust-chip" role="listitem">
              <span className="cov-trust-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </span>
              <span>Teknisi On-Site</span>
            </div>

            <div className="cov-trust-chip" role="listitem">
              <span className="cov-trust-ico" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
                </svg>
              </span>
              <span>Solusi Air &amp; Boiler</span>
            </div>
          </div>

          {/* Active City Card */}
          <div className="cov-active-city-card" key={activeCity.id}>
            <div className="cov-active-card-top">
              <div className="cov-active-title-group">
                <span className="cov-active-pin-badge" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="#0284c7" stroke="#0284c7" strokeWidth="1">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" fill="#ffffff" />
                  </svg>
                </span>
                <div>
                  <h3 className="cov-active-city-name">{activeCity.name}</h3>
                  <span className="cov-active-city-role">{activeCity.roleBadge || activeCity.badge}</span>
                </div>
              </div>

              <span className="cov-active-status-badge">
                <span className="cov-check-icon" aria-hidden="true">✓</span>
                <span>Siap Kirim</span>
              </span>
            </div>

            {/* 2-Column Metrics */}
            <div className="cov-active-metrics-row">
              <div className="cov-metric-item">
                <span className="cov-metric-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </span>
                <div>
                  <span className="cov-metric-lbl">ESTIMASI WAKTU</span>
                  <b className="cov-metric-val">{activeCity.transitEstimate}</b>
                </div>
              </div>

              <div className="cov-metric-item">
                <span className="cov-metric-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                  </svg>
                </span>
                <div>
                  <span className="cov-metric-lbl">LAYANAN TEKNIS</span>
                  <b className="cov-metric-val">{activeCity.serviceHighlight}</b>
                </div>
              </div>
            </div>

            {/* Primary Action Button */}
            <Link href={`/wilayah/${activeCity.id}`} className="cov-active-action-btn">
              <span>Lihat Jangkauan di Peta</span>
              <span className="cov-action-arrow" aria-hidden="true">→</span>
            </Link>

            {/* WhatsApp Link */}
            <div className="cov-active-wa-link">
              <a href={dynamicWaUrl} target="_blank" rel="noreferrer">
                <span>Konsultasi biaya kirim &amp; teknisi ke {activeCity.name} via WA</span>
                <span className="cov-wa-bubble-ico" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="13" height="13">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Large Interactive Map with Floating HTML Overlay */}
        <div className="cov-split-right">
          {/* Top-Right Floating Hint */}
          <div className="cov-floating-hint">
            <span className="cov-hint-hand" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
                <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
                <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
                <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
              </svg>
            </span>
            <span>Klik titik di peta untuk lihat detail wilayah</span>
          </div>

          {/* SVG Map Container */}
          <div className="cov-map-canvas-wrap">
            <svg
              className="kalbar-svg-fullscreen"
              viewBox="-25 45 835 535"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Peta jangkauan wilayah Kalimantan Barat"
            >
              <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#eff6ff" />
                  <stop offset="60%" stopColor="#dbeafe" />
                  <stop offset="100%" stopColor="#bfdbfe" />
                </linearGradient>
              </defs>

              {/* Concentric Ambient Radar Pulse Rings from Pontianak (156.7, 263.5) */}
              <g className="map-ambient-sonar-rings" aria-hidden="true">
                <circle cx="156.7" cy="263.5" r="75" className="sonar-ring sonar-ring-1" />
                <circle cx="156.7" cy="263.5" r="160" className="sonar-ring sonar-ring-2" />
                <circle cx="156.7" cy="263.5" r="280" className="sonar-ring sonar-ring-3" />
                <circle cx="156.7" cy="263.5" r="410" className="sonar-ring sonar-ring-4" />
              </g>

              {/* Province Land Silhouette */}
              <path
                className="map-province-land"
                d={KALBAR_PATH}
                fill={`url(#${gradientId})`}
              />

              {/* Radiating Animated Distribution Beams from Pontianak */}
              <g className="map-radiating-arcs" aria-hidden="true">
                {NETWORK_ARCS.map(arc => {
                  const isActive = activeCityId === arc.id;
                  return (
                    <path
                      key={arc.id}
                      className={`radiating-arc ${isActive ? 'active-beam' : ''}`}
                      d={arc.path}
                      style={{ animationDelay: arc.delay }}
                    />
                  );
                })}
              </g>

              {/* 14 Interactive City Nodes */}
              {CITIES_DATA.map(city => {
                const isActive = city.id === activeCityId;
                const isHub = Boolean(city.isHub);

                if (isHub && city.id === 'pontianak') {
                  return (
                    <g
                      key={city.id}
                      className="map-hub-pin-node"
                      onClick={() => handleSelectCity(city.id)}
                      onMouseEnter={() => handleSelectCity(city.id)}
                      role="button"
                      tabIndex={0}
                      aria-label="Pontianak Kantor Pusat & Showroom"
                    >
                      {/* Pontianak Sonar Halo */}
                      <circle cx={city.x} cy={city.y} r={22} className="hub-live-sonar-outer" />
                      <circle cx={city.x} cy={city.y} r={12} className="hub-live-sonar-inner" />
                      
                      {/* Center Target Marker */}
                      <circle cx={city.x} cy={city.y} r={7.5} fill="#ffffff" stroke="#0284c7" strokeWidth="2.5" />
                      <circle cx={city.x} cy={city.y} r={3.5} fill="#0284c7" />
                    </g>
                  );
                }

                return (
                  <g
                    key={city.id}
                    className={`map-regency-node ${isActive ? 'node-active' : ''}`}
                    onClick={() => handleSelectCity(city.id)}
                    onMouseEnter={() => handleSelectCity(city.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={city.name}
                  >
                    {/* Active Halo */}
                    {isActive && (
                      <circle cx={city.x} cy={city.y} r={14} className="regency-sonar-halo" />
                    )}

                    {/* Outer Dot Rim & Core */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={isActive ? 7 : 5}
                      fill="#ffffff"
                      stroke="#0284c7"
                      strokeWidth={isActive ? 2.8 : 2}
                      className="regency-dot-outer"
                    />
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={isActive ? 3 : 2}
                      fill="#0284c7"
                      className="regency-dot-inner"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Razor-Sharp HTML Floating Tooltip Card Anchored Over Active Dot */}
            <div
              className="cov-map-floating-popup"
              style={{
                left: `${pctX}%`,
                top: `${pctY}%`,
              }}
              aria-hidden="true"
            >
              <div className="cov-popup-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                  <path d="M3 21h18M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16M9 9h1M9 13h1M9 17h1M14 9h1M14 13h1M14 17h1" />
                </svg>
              </div>
              <div className="cov-popup-content">
                <div className="cov-popup-name">{activeCity.displayName}</div>
                <div className="cov-popup-role">{activeCity.roleBadge || activeCity.badge}</div>
              </div>
              <div className="cov-popup-pointer" />
            </div>
          </div>

          {/* Quick Regency Scroller Bar for Mobile */}
          <div className="cov-mobile-regencies-bar" role="group" aria-label="Pilih kabupaten/kota cepat">
            {CITIES_DATA.map(c => {
              const isSelected = activeCityId === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`cov-mini-pill ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectCity(c.id)}
                  aria-pressed={isSelected}
                >
                  <span className="cov-mini-dot" />
                  <span>{c.displayName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
