'use client';

import { useId, useMemo, useState } from 'react';
import Link from 'next/link';
import { waLink } from '@/data/catalog';

export type BusinessModel = 'kiloan' | 'koin' | 'express';

interface ModelConfig {
  id: BusinessModel;
  name: string;
  badge: string;
  unitLabel: string;
  unitShort: string;
  defaultVolume: number;
  minVolume: number;
  maxVolume: number;
  volumeStep: number;
  defaultPrice: number;
  minPrice: number;
  maxPrice: number;
  priceStep: number;
  presets: { label: string; volume: number }[];
  cogsRatio: number; // Cost of goods/utilities per unit ratio (chemical, gas, electric, water)
  recommendedPackage: (vol: number) => {
    name: string;
    estCapex: number;
    description: string;
    machines: string[];
  };
}

const MODELS: Record<BusinessModel, ModelConfig> = {
  kiloan: {
    id: 'kiloan',
    name: 'Laundry Kiloan',
    badge: 'Paling Populer',
    unitLabel: 'Muatan Pakaian per Hari',
    unitShort: 'kg',
    defaultVolume: 50,
    minVolume: 20,
    maxVolume: 200,
    volumeStep: 5,
    defaultPrice: 8000,
    minPrice: 5000,
    maxPrice: 15000,
    priceStep: 500,
    presets: [
      { label: 'Pemula (35 kg)', volume: 35 },
      { label: 'Standar (60 kg)', volume: 60 },
      { label: 'Ramai (100 kg)', volume: 100 },
      { label: 'Komersial (150 kg)', volume: 150 },
    ],
    cogsRatio: 0.32,
    recommendedPackage: (vol) => {
      if (vol <= 40) {
        return {
          name: 'Paket Starting Single Stack',
          estCapex: 19500000,
          description: 'Cocok untuk pemula di area perumahan/kost, operasional hemat listrik.',
          machines: ['1 Unit Washer Front Loading 8 kg', '1 Unit Dryer Konversi 10.5 kg', '1 Unit Setrika Uap Boiler 10L', 'Paket Chemical Starter 15L'],
        };
      }
      if (vol <= 85) {
        return {
          name: 'Paket Basic Dual Line',
          estCapex: 36000000,
          description: 'Kapasitas stabil harian tanpa antrean cucian menumpuk saat musim hujan.',
          machines: ['2 Unit Washer Front Loading 8-10 kg', '2 Unit Dryer Konversi 10.5 kg', '1 Unit Setrika Uap Boiler 15L', 'Perlengkapan & Rak Display Lengkap'],
        };
      }
      return {
        name: 'Paket Growing Commercial',
        estCapex: 68000000,
        description: 'Kapasitas tinggi untuk outlet ruko strategis, kampus, dan instansi.',
        machines: ['3-4 Unit Washer Heavy Duty', '3-4 Unit Dryer Komersial Speed Queen / Maytag', '2 Unit Setrika Uap Boiler 20L', 'Instalasi Pipa Plumbing & Gas Full Safety'],
      };
    },
  },
  koin: {
    id: 'koin',
    name: 'Laundry Koin / Self-Service',
    badge: 'Tren Modern',
    unitLabel: 'Siklus Cuci-Kering per Hari',
    unitShort: 'siklus',
    defaultVolume: 25,
    minVolume: 10,
    maxVolume: 100,
    volumeStep: 5,
    defaultPrice: 25000,
    minPrice: 15000,
    maxPrice: 40000,
    priceStep: 1000,
    presets: [
      { label: 'Awal (15 cycle)', volume: 15 },
      { label: 'Optimal (30 cycle)', volume: 30 },
      { label: 'Ramai (50 cycle)', volume: 50 },
      { label: 'Peak (80 cycle)', volume: 80 },
    ],
    cogsRatio: 0.28,
    recommendedPackage: (vol) => {
      if (vol <= 30) {
        return {
          name: 'Paket Koin 2 Stack (2 Cuci + 2 Kering)',
          estCapex: 48000000,
          description: 'Investasi efisien minim karyawan, pelanggan mencuci mandiri dengan sistem koin/QRIS.',
          machines: ['2 Stack Mesin Cuci + Kering Koin', 'Sistem Box Koin / Smartlink Token', 'Instalasi Plumbing & Gas Standar Safety', 'Training Pengoperasian & Maintenance'],
        };
      }
      return {
        name: 'Paket Koin 4 Stack Commercial Hub',
        estCapex: 95000000,
        description: 'Pusat laundry koin modern di lokasi padat mahasiswa dan pekerja.',
        machines: ['4 Stack Washer & Dryer Commercial Grade', 'Central Token & Coin Dispenser', 'Instalasi Gas Sentral & Exhaust Ducting', 'Pendampingan Branding & SOP Outlet'],
      };
    },
  },
  express: {
    id: 'express',
    name: 'Laundry Express & Bedcover',
    badge: 'Margin Tinggi',
    unitLabel: 'Kapasitas Cucian per Hari',
    unitShort: 'kg',
    defaultVolume: 60,
    minVolume: 25,
    maxVolume: 180,
    volumeStep: 5,
    defaultPrice: 12000,
    minPrice: 8000,
    maxPrice: 25000,
    priceStep: 1000,
    presets: [
      { label: 'Kecil (30 kg)', volume: 30 },
      { label: 'Menengah (60 kg)', volume: 60 },
      { label: 'Besar (90 kg)', volume: 90 },
      { label: 'Heavy Bedcover (140 kg)', volume: 140 },
    ],
    cogsRatio: 0.35,
    recommendedPackage: (vol) => {
      if (vol <= 50) {
        return {
          name: 'Paket Express Fast Turnaround',
          estCapex: 42000000,
          description: 'Dilengkapi dryer kapasitas drum besar untuk pengeringan bedcover tebal dalam 45 menit.',
          machines: ['1 Unit Washer Kapasitas Besar 14 kg', '1 Unit Washer 8 kg', '2 Unit Dryer Heavy Duty 15 kg', '1 Unit Boiler Uap 20L + 2 Kepala Setrika'],
        };
      }
      return {
        name: 'Paket Commercial Heavy Duty Bedcover',
        estCapex: 78000000,
        description: 'Didesain khusus untuk menangani sprei, selimut tebal, dan order ekspres 3 jam selesai.',
        machines: ['2 Unit Washer 15-20 kg Bedcover', '2 Unit Dryer Komersial 16 kg', 'Setrika Boiler 25L Dobel Meja Vakum', 'Chemical Premium Anti Noda & Pencerah Warna'],
      };
    },
  },
};

function formatRupiah(num: number): string {
  return 'Rp ' + new Intl.NumberFormat('id-ID').format(Math.round(num));
}

export function InteractiveRoiCalculator({ whatsapp = '6289504444471' }: { whatsapp?: string }) {
  const [activeModel, setActiveModel] = useState<BusinessModel>('kiloan');
  const [operatingDays, setOperatingDays] = useState<number>(30);

  const model = MODELS[activeModel];
  const [volume, setVolume] = useState<number>(model.defaultVolume);
  const [price, setPrice] = useState<number>(model.defaultPrice);

  const volumeInputId = useId();
  const priceInputId = useId();

  // Switch model handler
  function handleModelChange(newModel: BusinessModel) {
    setActiveModel(newModel);
    const cfg = MODELS[newModel];
    setVolume(cfg.defaultVolume);
    setPrice(cfg.defaultPrice);
  }

  // Financial calculations
  const calculations = useMemo(() => {
    const grossMonthly = volume * price * operatingDays;
    const utilitiesAndChemical = grossMonthly * model.cogsRatio;
    
    // Estimasi biaya tenaga kerja disesuaikan skala
    let laborCost = 0;
    if (activeModel === 'koin') {
      laborCost = volume > 40 ? 1200000 : 600000; // Minimalist supervisor / part-time
    } else {
      if (volume <= 40) laborCost = 1500000; // 1 operator
      else if (volume <= 80) laborCost = 3000000; // 2 operator
      else laborCost = 4500000; // 3 operator
    }

    const totalOpex = utilitiesAndChemical + laborCost;
    const netProfit = Math.max(0, grossMonthly - totalOpex);
    const profitMargin = grossMonthly > 0 ? (netProfit / grossMonthly) * 100 : 0;

    const packageRec = model.recommendedPackage(volume);
    const paybackMonths = netProfit > 0 ? packageRec.estCapex / netProfit : 0;

    return {
      grossMonthly,
      utilitiesAndChemical,
      laborCost,
      totalOpex,
      netProfit,
      profitMargin,
      packageRec,
      paybackMonths: Math.round(paybackMonths * 10) / 10,
    };
  }, [volume, price, operatingDays, model, activeModel]);

  // WhatsApp Message formatted
  const waMessage = useMemo(() => {
    return [
      'Halo Tim Ahli My Equipment Indonesia,',
      `Saya baru saja mencoba *Simulasi Modal & Potensi Omset Laundry* di website:`,
      '',
      `📋 *Rincian Rencana Usaha:*`,
      `• Model Bisnis: ${model.name}`,
      `• Target Muatan: ${volume} ${model.unitShort}/hari (${operatingDays} hari/bulan)`,
      `• Tarif Jual Rencana: ${formatRupiah(price)}/${model.unitShort}`,
      '',
      `💰 *Proyeksi Finansial:*`,
      `• Estimasi Omzet Kotor: ${formatRupiah(calculations.grossMonthly)}/bulan`,
      `• Estimasi Laba Bersih: ${formatRupiah(calculations.netProfit)}/bulan (Margin ~${Math.round(calculations.profitMargin)}%)`,
      `• Estimasi Balik Modal (BEP): ~${calculations.paybackMonths} bulan`,
      '',
      `📦 *Rekomendasi Paket:*`,
      `• ${calculations.packageRec.name} (Est. ${formatRupiah(calculations.packageRec.estCapex)})`,
      '',
      'Saya ingin konsultasi lebih lanjut mengenai ketersediaan paket ini, survey lokasi, dan instalasi teknis di Kalbar.',
    ].join('\n');
  }, [model, volume, price, operatingDays, calculations]);

  const waHref = waLink(waMessage, whatsapp);

  // Volume slider percentage for gradient fill
  const volPct = ((volume - model.minVolume) / (model.maxVolume - model.minVolume)) * 100;
  const pricePct = ((price - model.minPrice) / (model.maxPrice - model.minPrice)) * 100;

  return (
    <div className="roi-calculator-card" id="kalkulator-modal">
      {/* Header bar */}
      <div className="roi-calculator-header">
        <div className="roi-badge-pill">
          <span className="roi-badge-dot" aria-hidden="true" />
          <span>SIMULASI INTERAKTIF BISNIS LAUNDRY</span>
        </div>
        <h3>Kalkulator Estimasi Modal & Potensi Omset</h3>
        <p>
          Sesuaikan target kapasitas harian dan tarif rencana Anda untuk melihat simulasi omzet, perkiraan laba bersih, dan rekomendasi paket mesin laundry siap pakai.
        </p>

        {/* Business Model Tabs */}
        <div className="roi-model-tabs" role="tablist" aria-label="Pilihan Model Bisnis Laundry">
          {(Object.keys(MODELS) as BusinessModel[]).map((key) => {
            const m = MODELS[key];
            const isActive = activeModel === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`roi-model-tab${isActive ? ' is-active' : ''}`}
                onClick={() => handleModelChange(key)}
              >
                <span className="roi-tab-name">{m.name}</span>
                <span className="roi-tab-badge">{m.badge}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Controls vs Results */}
      <div className="roi-calculator-body">
        {/* Left Column: Sliders & Controls */}
        <div className="roi-controls-column">
          {/* Slider 1: Volume */}
          <div className="roi-control-group">
            <div className="roi-control-label-row">
              <label htmlFor={volumeInputId}>
                <b>{model.unitLabel}</b>
                <small>Kapasitas cucian yang ditargetkan per hari</small>
              </label>
              <div className="roi-val-display">
                <span className="roi-val-number">{volume}</span>
                <span className="roi-val-unit">{model.unitShort}/hari</span>
              </div>
            </div>

            <input
              id={volumeInputId}
              type="range"
              min={model.minVolume}
              max={model.maxVolume}
              step={model.volumeStep}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="roi-range-slider"
              style={{
                background: `linear-gradient(to right, #0d5ea6 0%, #0d5ea6 ${volPct}%, #e2e8f0 ${volPct}%, #e2e8f0 100%)`,
              }}
              aria-label={model.unitLabel}
            />

            {/* Quick preset chips */}
            <div className="roi-preset-chips" aria-label="Pilihan target cepat">
              {model.presets.map((preset) => (
                <button
                  key={preset.volume}
                  type="button"
                  className={`roi-chip${volume === preset.volume ? ' is-selected' : ''}`}
                  onClick={() => setVolume(preset.volume)}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Slider 2: Price per unit */}
          <div className="roi-control-group">
            <div className="roi-control-label-row">
              <label htmlFor={priceInputId}>
                <b>Rencana Tarif Layanan</b>
                <small>Harga jual ke konsumen per {model.unitShort}</small>
              </label>
              <div className="roi-val-display">
                <span className="roi-val-number">{formatRupiah(price)}</span>
                <span className="roi-val-unit">/{model.unitShort}</span>
              </div>
            </div>

            <input
              id={priceInputId}
              type="range"
              min={model.minPrice}
              max={model.maxPrice}
              step={model.priceStep}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="roi-range-slider"
              style={{
                background: `linear-gradient(to right, #0d5ea6 0%, #0d5ea6 ${pricePct}%, #e2e8f0 ${pricePct}%, #e2e8f0 100%)`,
              }}
              aria-label="Rencana Tarif Layanan"
            />
          </div>

          {/* Operating days switch */}
          <div className="roi-control-group">
            <div className="roi-days-row">
              <div>
                <b>Hari Buka per Bulan</b>
                <small>Pilih hari kerja aktif operasional</small>
              </div>
              <div className="roi-days-toggle" role="radiogroup" aria-label="Hari buka per bulan">
                <button
                  type="button"
                  className={`roi-day-btn${operatingDays === 26 ? ' is-active' : ''}`}
                  onClick={() => setOperatingDays(26)}
                  role="radio"
                  aria-checked={operatingDays === 26}
                >
                  26 Hari (Libur Minggu)
                </button>
                <button
                  type="button"
                  className={`roi-day-btn${operatingDays === 30 ? ' is-active' : ''}`}
                  onClick={() => setOperatingDays(30)}
                  role="radio"
                  aria-checked={operatingDays === 30}
                >
                  30 Hari (Non-Stop)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Financial Results & Package Card */}
        <div className="roi-results-column">
          {/* Revenue & Profit Cards */}
          <div className="roi-summary-grid">
            <div className="roi-stat-card roi-stat-primary">
              <span className="roi-stat-caption">Proyeksi Omset Kotor</span>
              <b className="roi-stat-value">{formatRupiah(calculations.grossMonthly)}</b>
              <small className="roi-stat-sub">per bulan ({operatingDays} hari kerja)</small>
            </div>

            <div className="roi-stat-card roi-stat-profit">
              <div className="roi-stat-badge-top">
                <span>Margin ~{Math.round(calculations.profitMargin)}%</span>
              </div>
              <span className="roi-stat-caption">Estimasi Laba Bersih</span>
              <b className="roi-stat-value text-green">{formatRupiah(calculations.netProfit)}</b>
              <small className="roi-stat-sub">setelah dipotong bahan kimia, gas, listrik & karyawan</small>
            </div>
          </div>

          {/* Payback period callout */}
          <div className="roi-payback-box">
            <div className="roi-payback-left">
              <span className="roi-payback-icon" aria-hidden="true">⏱️</span>
              <div>
                <b>Estimasi Balik Modal (BEP)</b>
                <span>Perkiraan pengembalian investasi mesin</span>
              </div>
            </div>
            <div className="roi-payback-num">
              ~{calculations.paybackMonths} <small>Bulan</small>
            </div>
          </div>

          {/* Recommended Package Card */}
          <div className="roi-package-box">
            <div className="roi-package-header">
              <span className="roi-pkg-label">REKOMENDASI PAKET MESIN</span>
              <h4>{calculations.packageRec.name}</h4>
              <p>{calculations.packageRec.description}</p>
            </div>

            <div className="roi-package-machines">
              <b>Kelengkapan Utama Termasuk:</b>
              <ul>
                {calculations.packageRec.machines.map((item, idx) => (
                  <li key={idx}>
                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="roi-check-icon">
                      <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="roi-package-footer">
              <div className="roi-pkg-price">
                <small>Estimasi Investasi Paket</small>
                <b>{formatRupiah(calculations.packageRec.estCapex)}</b>
              </div>

              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="roi-whatsapp-cta"
                aria-label="Konsultasikan hasil simulasi ini via WhatsApp ke My Equipment"
              >
                <svg className="roi-wa-icon" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
                </svg>
                <span>Konsultasikan Hasil Simulasi Ini via WhatsApp</span>
                <span aria-hidden="true" className="roi-arrow-icon">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Transparent Disclaimer */}
      <div className="roi-disclaimer">
        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="roi-info-icon">
          <path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clipRule="evenodd" />
        </svg>
        <p>
          <strong>Catatan Transparan:</strong> Perhitungan di atas merupakan simulasi indikatif berdasarkan rata-rata performa outlet mitra My Equipment di Kalimantan Barat. Hasil aktual dipengaruhi oleh lokasi usaha, penetapan tarif lokal, kualitas pelayanan, dan manajemen operasional harian.
        </p>
      </div>
    </div>
  );
}
