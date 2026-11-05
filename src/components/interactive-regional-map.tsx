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
    description: 'Kantor pusat resmi, showroom live unit front loading & dryer komersial, ready stock sparepart asli, dan pusat komando teknisi se-Kalbar.',
    regionCategory: 'hub',
    categoryLabel: 'Hub Pusat',
    transitEstimate: 'Same Day / Langsung di Tempat',
    serviceHighlight: 'Showroom Utama & Teknisi Standby',
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
    roleBadge: 'Workshop & Gudang Distribusi',
    badge: 'Workshop & Distribusi',
    description: 'Pusat workshop perakitan konversi gas, gudang stok mesin, serta titik tolak armada truk ekspedisi darat ke 14 kabupaten/kota.',
    regionCategory: 'hub',
    categoryLabel: 'Workshop Hub',
    transitEstimate: 'Same Day Dispatch',
    serviceHighlight: 'Perakitan Gas & Armada Distribusi',
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
    roleBadge: 'Hub Pantura & Teknisi',
    badge: 'Showroom & Teknisi Wilayah',
    description: 'Layanan terdepan kawasan Pantura. Pengiriman mesin laundry kiloan & koin self-service dengan teknisi lokal standby untuk servis berkala.',
    regionCategory: 'pantura',
    categoryLabel: 'Pantura',
    transitEstimate: '3 - 4 Jam Rute Darat',
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
    roleBadge: 'Jalur Pesisir Utara',
    badge: 'Ujung Pesisir Utara',
    description: 'Pengiriman unit menjangkau Pemangkat, Tebas, hingga Sambas kota. Instalasi tuntas sistem plumbing, pemanas, dan training SOP kasir.',
    regionCategory: 'pantura',
    categoryLabel: 'Pantura',
    transitEstimate: '4 - 5 Jam Rute Pesisir',
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
    roleBadge: 'Koridor Cepat Barat',
    badge: 'Jalur Pesisir Barat',
    description: 'Akses kilat dari workshop pusat. Teknisi siap datang langsung survei kelayakan air & gas serta pendampingan uji coba mesin.',
    regionCategory: 'hub',
    categoryLabel: 'Pesisir Barat',
    transitEstimate: '1 - 2 Jam dari Workshop',
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
    displayName: 'Landak (Ngabang)',
    roleBadge: 'Jalur Trans Kalimantan',
    badge: 'Jalur Trans Kalimantan',
    description: 'Pengiriman teratur ke Ngabang dan area perkebunan. Solusi ideal paket laundry kiloan pemula maupun penambahan pengering kapasitas besar.',
    regionCategory: 'hulu',
    categoryLabel: 'Trans Kalbar',
    transitEstimate: '3 - 4 Jam ke Ngabang',
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
    roleBadge: 'Hub Wilayah Tengah',
    badge: 'Hub Wilayah Tengah',
    description: 'Instalasi lengkap pipa plumbing & gas ke Sanggau Kapuas, Tayan, hingga Entikong. Teknisi datang mengawal hingga mesin siap beroperasi.',
    regionCategory: 'hulu',
    categoryLabel: 'Trans Kalbar',
    transitEstimate: '4 - 5 Jam via Poros Tengah',
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
    roleBadge: 'Koridor Poros Tengah',
    badge: 'Pusat Perlintasan',
    description: 'Dukungan penuh paket usaha laundry mandiri tanpa royalty. Jaminan ketersediaan sparepart pemanas gas, valve, dan suplai kimia deterjen.',
    regionCategory: 'hulu',
    categoryLabel: 'Trans Kalbar',
    transitEstimate: '5 - 6 Jam Rute Poros',
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
    description: 'Pasar potensial tinggi untuk laundry koin QRIS & kiloan express. Unit dikirim via ekspedisi aman terpal, teknisi on-site untuk setup total.',
    regionCategory: 'hulu',
    categoryLabel: 'Hulu Kalbar',
    transitEstimate: '7 - 8 Jam (Ekspedisi Truk Aman)',
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
    displayName: 'Melawi (Nanga Pinoh)',
    roleBadge: 'Kawasan Berkembang',
    badge: 'Kawasan Berkembang',
    description: 'Pengiriman dan instalasi ke Nanga Pinoh. Teknisi mendampingi uji coba pencucian perdana bersama mitra hingga operasional berjalan lancar.',
    regionCategory: 'hulu',
    categoryLabel: 'Hulu Kalbar',
    transitEstimate: '8 - 9 Jam Rute Pinoh',
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
    displayName: 'Kapuas Hulu (Putussibau)',
    roleBadge: 'Ujung Timur Kalbar',
    badge: 'Ujung Timur Kalbar',
    description: 'Layanan terjauh ke Putussibau tetap tercover! Pengemasan peti kayu kokoh bergaransi, instalasi teknis di tempat, dan panduan video SOP lengkap.',
    regionCategory: 'hulu',
    categoryLabel: 'Hulu Kalbar',
    transitEstimate: '10 - 12 Jam (Peti Kayu Ekstra Kokoh)',
    serviceHighlight: 'Packing Kayu Aman & Setup Tuntas',
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
    roleBadge: 'Kawasan Perbukitan & Border',
    badge: 'Lintas Perbatasan',
    description: 'Akses lancar via rute pegunungan. Solusi paket usaha hemat listrik & gas untuk perumahan warga dan fasilitas mes perkebunan kelapa sawit.',
    regionCategory: 'pantura',
    categoryLabel: 'Pantura',
    transitEstimate: '3 - 4 Jam Rute Perbukitan',
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
    roleBadge: 'Pusat Industri Selatan',
    badge: 'Kawasan Industri Selatan',
    description: 'Pengiriman darat atau ekspedisi laut langsung. Banyak mitra laundry komersial untuk seragam pabrik, hotel, serta mess tambang dan sawit.',
    regionCategory: 'selatan',
    categoryLabel: 'Selatan',
    transitEstimate: 'Rute Darat & Kapal Laut Reguler',
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
    displayName: 'Kayong Utara (Sukadana)',
    roleBadge: 'Pesisir Selatan',
    badge: 'Pesisir Sukadana',
    description: 'Layanan ke Sukadana, Teluk Batang, dan sekitarnya. Pengiriman terjamin sampai depan ruko dengan garansi teknisi dan ketersediaan suku cadang.',
    regionCategory: 'selatan',
    categoryLabel: 'Selatan',
    transitEstimate: 'Rute Jalur Sukadana Terjadwal',
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

// Arcs from Pontianak Hub (156.7, 263.5)
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

const REGION_TABS = [
  { id: 'all', label: 'Semua (14)' },
  { id: 'hub', label: 'Hub & Pusat' },
  { id: 'pantura', label: 'Pantura' },
  { id: 'hulu', label: 'Trans & Hulu' },
  { id: 'selatan', label: 'Selatan' },
] as const;

interface InteractiveRegionalMapProps {
  whatsapp: string;
}

export function InteractiveRegionalMap({ whatsapp }: InteractiveRegionalMapProps) {
  const [activeCityId, setActiveCityId] = useState<string>('pontianak');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const gradientId = useId();
  const landGlowId = useId();
  const arcGradientId = useId();

  const activeCity = CITIES_DATA.find(c => c.id === activeCityId) || CITIES_DATA[0];

  const handleSelectCity = (id: string) => {
    setActiveCityId(id);
  };

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    if (filterId !== 'all') {
      const match = CITIES_DATA.find(c => c.regionCategory === filterId);
      if (match && activeCity.regionCategory !== filterId) {
        setActiveCityId(match.id);
      }
    }
  };

  const displayedCities = activeFilter === 'all'
    ? CITIES_DATA
    : CITIES_DATA.filter(c => c.regionCategory === activeFilter);

  const dynamicWaText = `Halo My Equipment, saya ingin konsultasi pembukaan usaha laundry dan pengiriman mesin ke ${activeCity.name}. Mohon informasi estimasi biaya pengiriman dan jadwal teknisi ke lokasi saya.`;
  const dynamicWaUrl = waLink(dynamicWaText, whatsapp);

  return (
    <section className="wrap home-coverage-section" id="layanan-kalbar" aria-label="Jangkauan Distribusi dan Layanan Seluruh Kalimantan Barat">
      {/* Modern Bento Container */}
      <div className="cov-bento-card">
        {/* Ambient Top Glow */}
        <div className="cov-ambient-glow" aria-hidden="true" />

        {/* Left Column: Heading, Trust Highlights, & Dynamic Interactive Card */}
        <div className="cov-left-col">
          <div className="cov-eyebrow-beacon">
            <span className="cov-beacon-dot" />
            <span className="cov-beacon-text">JANGKAUAN DISTRIBUSI & TEKNISI RESMI</span>
          </div>

          <h2 className="cov-title-modern">
            Siap Melayani <br />
            <span className="cov-title-accent">Seluruh Kalimantan Barat</span>
          </h2>

          <p className="cov-desc-modern">
            Pengiriman unit aman bergaransi, instalasi teknis tuntas (plumbing, kelistrikan & gas), serta training operasional langsung di lokasi ke 14 kabupaten/kota.
          </p>

          {/* Quick Trust Badges */}
          <div className="cov-trust-badges">
            <div className="cov-trust-item">
              <span className="cov-trust-icon">🚚</span>
              <span>Armada Truk Sendiri</span>
            </div>
            <div className="cov-trust-item">
              <span className="cov-trust-icon">🛠️</span>
              <span>Teknisi On-Site Komisioning</span>
            </div>
            <div className="cov-trust-item">
              <span className="cov-trust-icon">💧</span>
              <span>Solusi Air Gambut & Boiler</span>
            </div>
          </div>

          {/* Dynamic Active City Terminal Card */}
          <div className="cov-terminal-card" key={activeCity.id}>
            <div className="cov-terminal-header">
              <div className="cov-terminal-title-wrap">
                <span className="cov-terminal-pin">📍</span>
                <div>
                  <h3 className="cov-terminal-city-name">{activeCity.name}</h3>
                  <span className="cov-terminal-role">{activeCity.roleBadge || activeCity.badge}</span>
                </div>
              </div>
              <span className="cov-terminal-status-pill">
                <span className="cov-status-live-dot" />
                Siap Kirim
              </span>
            </div>

            <p className="cov-terminal-desc">{activeCity.description}</p>

            <div className="cov-terminal-metrics">
              <div className="cov-metric-cell">
                <span className="cov-metric-label">⏱️ Estimasi Waktu</span>
                <span className="cov-metric-value">{activeCity.transitEstimate}</span>
              </div>
              <div className="cov-metric-cell">
                <span className="cov-metric-label">🔧 Layanan Teknisi</span>
                <span className="cov-metric-value">{activeCity.serviceHighlight}</span>
              </div>
            </div>

            <div className="cov-terminal-actions">
              <Link href={`/wilayah/${activeCity.id}`} className="cov-terminal-btn-primary">
                <span>Lihat Pilihan Paket di {activeCity.displayName}</span>
                <span aria-hidden="true">→</span>
              </Link>
              <a
                href={dynamicWaUrl}
                target="_blank"
                rel="noreferrer"
                className="cov-terminal-btn-wa"
                aria-label={`Konsultasi via WhatsApp untuk pengiriman ke ${activeCity.name}`}
              >
                <span>Tanya Biaya Kirim & Teknisi via WA</span>
                <span aria-hidden="true">💬</span>
              </a>
            </div>
          </div>
        </div>

        {/* Center Column: Interactive High-Tech Radar Map */}
        <div className="cov-center-map-col">
          <div className="cov-radar-frame">
            {/* Background Ambient Radar Glow */}
            <div className="cov-radar-ambient-glow" aria-hidden="true" />

            <svg
              className="kalbar-svg-modern"
              viewBox="-25 45 835 535"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Peta jangkauan wilayah distribusi Kalimantan Barat"
            >
              <defs>
                {/* Land Gradient with Modern Depth */}
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.95" />
                  <stop offset="45%" stopColor="#bfdbfe" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.85" />
                </linearGradient>

                {/* Soft Land Shadow */}
                <filter id={landGlowId} x="-10%" y="-10%" width="120%" height="120%">
                  <feDropShadow dx="0" dy="6" stdDeviation="12" floodColor="#0284c7" floodOpacity="0.16" />
                </filter>

                {/* Arc Gradient for Active Route */}
                <linearGradient id={arcGradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0284c7" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#0ea5e9" />
                </linearGradient>
              </defs>

              {/* Concentric Distribution Radar Rings from Pontianak (156.7, 263.5) */}
              <g className="map-radar-rings" aria-hidden="true">
                <circle cx="156.7" cy="263.5" r="95" className="radar-dist-ring ring-100k" />
                <circle cx="156.7" cy="263.5" r="195" className="radar-dist-ring ring-250k" />
                <circle cx="156.7" cy="263.5" r="320" className="radar-dist-ring ring-500k" />
                <text x="160" y="172" fill="#94a3b8" fontSize="10" fontWeight="600" opacity="0.6">R100 KM</text>
                <text x="160" y="72" fill="#94a3b8" fontSize="10" fontWeight="600" opacity="0.6">R250 KM</text>
              </g>

              {/* Province Land Silhouette */}
              <path
                className="map-land-modern"
                d={KALBAR_PATH}
                fill={`url(#${gradientId})`}
                filter={`url(#${landGlowId})`}
              />

              {/* Distribution Arcs */}
              <g className="map-network-arcs" aria-hidden="true">
                {NETWORK_ARCS.map(arc => {
                  const isActive = activeCityId === arc.id;
                  return (
                    <path
                      key={arc.id}
                      className={`map-line-arc ${isActive ? 'active-line' : ''}`}
                      d={arc.path}
                      stroke={isActive ? `url(#${arcGradientId})` : '#93c5fd'}
                    />
                  );
                })}
              </g>

              {/* City Nodes */}
              {CITIES_DATA.map(city => {
                const isActive = city.id === activeCityId;
                const isHub = Boolean(city.isHub);

                if (isHub && city.id === 'pontianak') {
                  return (
                    <g
                      key={city.id}
                      className="map-hub-group"
                      onClick={() => handleSelectCity(city.id)}
                      onMouseEnter={() => handleSelectCity(city.id)}
                      role="button"
                      tabIndex={0}
                      aria-label="Pontianak Kantor Pusat & Showroom"
                    >
                      {/* Concentric Sonar Pulses */}
                      <circle cx={city.x} cy={city.y} r={24} className="hub-sonar-outer" />
                      <circle cx={city.x} cy={city.y} r={14} className="hub-sonar-inner" />
                      
                      {/* Solid Center Pin */}
                      <circle cx={city.x} cy={city.y} r={7} fill="#0284c7" stroke="#ffffff" strokeWidth="2.5" />
                      <circle cx={city.x} cy={city.y} r={2.5} fill="#ffffff" />

                      {/* Elevated Floating Badge */}
                      <g transform={`translate(${city.x - 72}, ${city.y - 38})`}>
                        <rect
                          width="144"
                          height="28"
                          rx="14"
                          fill="#0f172a"
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          filter="drop-shadow(0 4px 10px rgba(15, 23, 42, 0.25))"
                        />
                        <circle cx="16" cy="14" r="4" fill="#22c55e" />
                        <text
                          x="78"
                          y="18"
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="700"
                          fontFamily="system-ui, sans-serif"
                        >
                          Pontianak (Hub Pusat)
                        </text>
                      </g>
                    </g>
                  );
                }

                return (
                  <g
                    key={city.id}
                    className={`map-city-node ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleSelectCity(city.id)}
                    onMouseEnter={() => handleSelectCity(city.id)}
                    role="button"
                    tabIndex={0}
                    aria-label={city.name}
                  >
                    {/* Active Ping Aura */}
                    {isActive && (
                      <circle cx={city.x} cy={city.y} r={18} className="city-active-sonar" />
                    )}

                    {/* Node Dot */}
                    <circle
                      cx={city.x}
                      cy={city.y}
                      r={isActive ? 8 : 5}
                      className="city-node-circle"
                    />

                    {/* Floating Active Pill Tooltip on Map */}
                    {isActive && (
                      <g transform={`translate(${city.x}, ${city.y - 20})`} className="map-node-tooltip">
                        <rect
                          x="-50"
                          y="-20"
                          width="100"
                          height="22"
                          rx="11"
                          fill="#0f172a"
                          stroke="#38bdf8"
                          strokeWidth="1.2"
                          filter="drop-shadow(0 4px 8px rgba(0,0,0,0.22))"
                        />
                        <circle cx="-36" cy="-9" r="3" fill="#38bdf8" />
                        <text
                          x="6"
                          y="-6"
                          textAnchor="middle"
                          fill="#f8fafc"
                          fontSize="9.5"
                          fontWeight="700"
                          fontFamily="system-ui, sans-serif"
                        >
                          {city.displayName}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Map Interaction Legend */}
            <div className="cov-map-legend">
              <span className="cov-legend-hint">
                <span className="cov-legend-pulse" />
                Klik atau arahkan kursor ke titik peta untuk info rute pengiriman
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: 14 City Grid with Filter Tabs */}
        <div className="cov-right-chips-col">
          <div className="cov-chips-header">
            <div>
              <h3 className="cov-chips-heading">14 Kabupaten/Kota</h3>
              <p className="cov-chips-sub">Seluruh Wilayah Kalbar Terjangkau</p>
            </div>
            <span className="cov-coverage-badge">100% Tercover</span>
          </div>

          {/* Region Filter Tabs */}
          <div className="cov-filter-tabs" role="tablist" aria-label="Filter wilayah">
            {REGION_TABS.map(tab => {
              const isSelected = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`cov-tab-pill ${isSelected ? 'active' : ''}`}
                  onClick={() => handleFilterClick(tab.id)}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Dynamic Interactive City Cards Grid */}
          <div className="cov-chips-grid-modern" role="group" aria-label="Daftar 14 kabupaten dan kota Kalimantan Barat">
            {displayedCities.map(c => {
              const isSelected = activeCityId === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  className={`cov-city-btn ${isSelected ? 'active' : ''}`}
                  onClick={() => handleSelectCity(c.id)}
                  onMouseEnter={() => handleSelectCity(c.id)}
                  aria-pressed={isSelected}
                >
                  <span className="cov-city-btn-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                      <circle cx="12" cy="9" r="2.5" fill="currentColor" />
                    </svg>
                  </span>
                  <div className="cov-city-btn-info">
                    <span className="cov-city-btn-name">{c.name}</span>
                    <span className="cov-city-btn-tag">{c.categoryLabel}</span>
                  </div>
                  {isSelected && (
                    <span className="cov-city-btn-active-dot" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Footnote / Detail Services Link */}
          <div className="cov-right-footer">
            <Link href="/layanan" className="cov-btn-all-services">
              <span>Pelajari Standar SOP Instalasi & Servis Teknisi</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
