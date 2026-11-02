'use client';

import React, { useState, useMemo } from 'react';
import { waLink } from '@/data/catalog';

interface RoiCalculatorProps {
  whatsapp?: string;
}

type BusinessType = 'kiloan' | 'koin' | 'express';

interface PackageRecommendation {
  name: string;
  price: number;
  priceFormatted: string;
  description: string;
  checklist: string[];
}

export function RoiCalculator({ whatsapp = '6289504444471' }: RoiCalculatorProps) {
  const [businessType, setBusinessType] = useState<BusinessType>('kiloan');
  const [capacity, setCapacity] = useState<number>(75);
  const [rate, setRate] = useState<number>(8000);
  const [daysPerMonth, setDaysPerMonth] = useState<number>(30);

  // Switch Business Type defaults
  const handleTypeChange = (type: BusinessType) => {
    setBusinessType(type);
    if (type === 'kiloan') {
      setCapacity(75);
      setRate(8000);
    } else if (type === 'koin') {
      setCapacity(30); // 30 siklus cuci-kering per hari
      setRate(20000); // Rp 20.000 per token / siklus
    } else if (type === 'express') {
      setCapacity(60); // 60 kg pakaian & bedcover
      setRate(12000); // Rp 12.000 / kg express
    }
  };

  // Math Projections
  const { omset, netProfit, marginPercent, bepMonths, recommendedPackage } = useMemo(() => {
    const rawOmset = capacity * rate * daysPerMonth;

    // Margin varies slightly:
    // Koin has no ironers / lower labor -> margin ~62%
    // Express has higher ticket price -> margin ~54%
    // Kiloan standard -> margin ~51.3% (matching Rp 9.240.000 / Rp 18.000.000 in mockup)
    let margin = 0.5133333333;
    if (businessType === 'koin') margin = 0.62;
    if (businessType === 'express') margin = 0.54;

    const rawNetProfit = Math.round((rawOmset * margin) / 1000) * 1000;
    const marginPct = Math.round(margin * 100);

    // Package Recommendation logic
    let pkg: PackageRecommendation;
    if (businessType === 'kiloan') {
      if (capacity <= 45) {
        pkg = {
          name: 'Paket Pemula Hemat (Single Line)',
          price: 24500000,
          priceFormatted: 'Rp 24.500.000',
          description: 'Cocok untuk rintisan awal laundry kiloan di perumahan atau kos-kosan.',
          checklist: [
            '1 Unit Washer Front Loading 8–10 kg',
            '1 Unit Dryer Konversi Gas 10.5 kg',
            '1 Unit Setrika Uap Boiler 10L',
            'Perlengkapan Timbangan & Keranjang Lengkap',
          ],
        };
      } else if (capacity <= 85) {
        // Matches exact mockup!
        pkg = {
          name: 'Paket Basic Dual Line',
          price: 36000000,
          priceFormatted: 'Rp 36.000.000',
          description: 'Kapasitas stabil harian tanpa antrean cucian menumpuk saat musim hujan.',
          checklist: [
            '2 Unit Washer Front Loading 8–10 kg',
            '2 Unit Dryer Konversi 10.5 kg',
            '1 Unit Setrika Uap Boiler 15L',
            'Perlengkapan & Rak Display Lengkap',
          ],
        };
      } else if (capacity <= 130) {
        pkg = {
          name: 'Paket Growing Triple Capacity',
          price: 52000000,
          priceFormatted: 'Rp 52.000.000',
          description: 'Kapasitas optimal menangani pesanan kiloan rutin dan pelanggan borongan.',
          checklist: [
            '3 Unit Washer Commercial 10 kg',
            '3 Unit Dryer Konversi Gas 10.5 kg',
            '1 Unit Setrika Uap Boiler 25L (2 Kepala Setrika)',
            'Paket Meja Vacuum & Chemical Awal Lengkap',
          ],
        };
      } else {
        pkg = {
          name: 'Paket Komersial Heavy Duty Stack',
          price: 78000000,
          priceFormatted: 'Rp 78.000.000',
          description: 'Performa industri komersial untuk hotel, mess karyawan, & rumah sakit.',
          checklist: [
            'Commercial Stack Washer-Dryer Heavy Duty',
            'Mesin Pengering Kapasitas Besar 15–20 kg',
            'Setrika Uap Boiler Industri 35L',
            'Instalasi Pipa Gas Safety Valve & Training SOP',
          ],
        };
      }
    } else if (businessType === 'koin') {
      if (capacity <= 30) {
        pkg = {
          name: 'Paket Koin Self-Service 2 Stack',
          price: 68000000,
          priceFormatted: 'Rp 68.000.000',
          description: 'Investasi efisien sistem koin/QRIS tanpa beban gaji karyawan setrika.',
          checklist: [
            '2 Stack Washer-Dryer Commercial Koin/QRIS',
            'Sistem Box Koin & Token Otomatis',
            'Instalasi Saluran Gas & Exhaust Udara Panas',
            'Setup Sistem Pembayaran Digital Cashless',
          ],
        };
      } else {
        pkg = {
          name: 'Paket Koin Modern 4 Stack Express',
          price: 135000000,
          priceFormatted: 'Rp 135.000.000',
          description: 'Outlet self-service modern untuk lokasi strategis kampus atau pusat kota.',
          checklist: [
            '4 Stack Washer-Dryer Commercial Speed Queen / Maytag',
            'Kiosk Central Payment System (QRIS & Kartu)',
            'Instalasi Plumbing Stainless & Ducting Sentral',
            'Training Manajemen Cloud Monitoring Omset Harian',
          ],
        };
      }
    } else {
      // Express & Bedcover
      pkg = {
        name: 'Paket Express & Bedcover Line',
        price: 58000000,
        priceFormatted: 'Rp 58.000.000',
        description: 'Dilengkapi drum diameter lebar muat bedcover king size tanpa dipaksa.',
        checklist: [
          '2 Unit Washer Ekstra Besar (15–20 kg)',
          '2 Unit Dryer Kapasitas Bedcover Heavy Duty',
          '1 Unit Boiler 25L Tekanan Tinggi',
          'Chemical Penghilang Noda & Pelembut Premium',
        ],
      };
    }

    // BEP (Months) = Package Cost / Monthly Net Profit
    const rawBep = rawNetProfit > 0 ? (pkg.price / rawNetProfit) : 0;
    const bepFormatted = rawBep > 0 ? `~${rawBep.toFixed(1)} Bulan` : '-';

    return {
      omset: rawOmset,
      netProfit: rawNetProfit,
      marginPercent: marginPct,
      bepMonths: bepFormatted,
      recommendedPackage: pkg,
    };
  }, [capacity, rate, daysPerMonth, businessType]);

  const rupiahFormat = (val: number) => {
    return `Rp ${new Intl.NumberFormat('id-ID').format(val)}`;
  };

  // WhatsApp Pre-filled link
  const consultationMessage = `Halo My Equipment Indonesia, saya telah melakukan simulasi perhitungan bisnis laundry di website:
- Jenis Usaha: ${businessType === 'kiloan' ? 'Laundry Kiloan' : businessType === 'koin' ? 'Laundry Koin Self-Service' : 'Laundry Express & Bedcover'}
- Kapasitas: ${capacity} ${businessType === 'koin' ? 'siklus' : 'kg'}/hari
- Rencana Tarif: ${rupiahFormat(rate)}/${businessType === 'koin' ? 'siklus' : 'kg'}
- Hari Operasional: ${daysPerMonth} hari/bulan
- Proyeksi Omset Kotor: ${rupiahFormat(omset)}/bulan
- Estimasi Laba Bersih: ${rupiahFormat(netProfit)}/bulan (Margin ~${marginPercent}%)
- Estimasi Balik Modal: ${bepMonths}
- Rekomendasi Paket: ${recommendedPackage.name} (${recommendedPackage.priceFormatted})

Mohon informasi rincian kelengkapan mesin, spesifikasi listrik/gas, dan konsultasi paket ini.`;

  const waHref = waLink(consultationMessage, whatsapp);

  return (
    <section className="roi-calc-section wrap" id="kalkulator" aria-label="Kalkulator Estimasi Modal dan Potensi Omset">
      <div className="roi-calc-header">
        <div className="roi-calc-pill">
          <span className="roi-pill-dot" aria-hidden="true" />
          <span>SIMULASI INTERAKTIF BISNIS LAUNDRY</span>
        </div>
        <h2 className="roi-calc-title">Kalkulator Estimasi Modal & Potensi Omset</h2>
        <p className="roi-calc-subtitle">
          Sesuaikan target kapasitas harian dan tarif rencana Anda untuk melihat simulasi omzet, perkiraan laba bersih, dan rekomendasi paket mesin laundry siap pakai.
        </p>
      </div>

      {/* Top Segmented Tabs */}
      <div className="roi-type-tabs" role="tablist" aria-label="Pilih model usaha laundry">
        <button
          type="button"
          role="tab"
          aria-selected={businessType === 'kiloan'}
          className={`roi-type-tab ${businessType === 'kiloan' ? 'active' : ''}`}
          onClick={() => handleTypeChange('kiloan')}
        >
          <span className="roi-tab-main">Laundry Kiloan</span>
          <span className="roi-tab-sub">Paling Populer</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={businessType === 'koin'}
          className={`roi-type-tab ${businessType === 'koin' ? 'active' : ''}`}
          onClick={() => handleTypeChange('koin')}
        >
          <span className="roi-tab-main">Laundry Koin / Self-Service</span>
          <span className="roi-tab-sub">Tren Modern</span>
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={businessType === 'express'}
          className={`roi-type-tab ${businessType === 'express' ? 'active' : ''}`}
          onClick={() => handleTypeChange('express')}
        >
          <span className="roi-tab-main">Laundry Express & Bedcover</span>
          <span className="roi-tab-sub">Margin Tinggi</span>
        </button>
      </div>

      {/* Main Grid: Inputs vs Outputs */}
      <div className="roi-calc-grid">
        {/* Left Card: Input Sliders & Options */}
        <div className="roi-input-card">
          {/* Slider 1: Kapasitas */}
          <div className="roi-field-group">
            <div className="roi-field-header">
              <div>
                <label htmlFor="roi-capacity-slider" className="roi-field-label">
                  {businessType === 'koin' ? 'Target Penggunaan Mesin per Hari' : 'Muatan Pakaian per Hari'}
                </label>
                <span className="roi-field-desc">
                  {businessType === 'koin' ? 'Estimasi siklus cuci-kering harian' : 'Kapasitas cucian yang ditargetkan per hari'}
                </span>
              </div>
              <div className="roi-value-badge">
                <b>{capacity}</b> {businessType === 'koin' ? 'siklus/hari' : 'kg/hari'}
              </div>
            </div>

            <input
              id="roi-capacity-slider"
              type="range"
              min={businessType === 'koin' ? 10 : 20}
              max={businessType === 'koin' ? 80 : 200}
              step={businessType === 'koin' ? 5 : 5}
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="roi-range-slider"
              aria-label="Atur kapasitas target harian"
            />

            {/* Quick Presets */}
            <div className="roi-presets-row">
              {businessType === 'koin' ? (
                <>
                  <button type="button" className={`roi-preset-btn ${capacity === 15 ? 'active' : ''}`} onClick={() => setCapacity(15)}>Rintisan (15 siklus)</button>
                  <button type="button" className={`roi-preset-btn ${capacity === 30 ? 'active' : ''}`} onClick={() => setCapacity(30)}>Standar (30 siklus)</button>
                  <button type="button" className={`roi-preset-btn ${capacity === 50 ? 'active' : ''}`} onClick={() => setCapacity(50)}>Ramai (50 siklus)</button>
                  <button type="button" className={`roi-preset-btn ${capacity === 75 ? 'active' : ''}`} onClick={() => setCapacity(75)}>Prime (75 siklus)</button>
                </>
              ) : (
                <>
                  <button type="button" className={`roi-preset-btn ${capacity === 35 ? 'active' : ''}`} onClick={() => setCapacity(35)}>Pemula (35 kg)</button>
                  <button type="button" className={`roi-preset-btn ${capacity === 60 ? 'active' : ''}`} onClick={() => setCapacity(60)}>Standar (60 kg)</button>
                  <button type="button" className={`roi-preset-btn ${capacity === 100 ? 'active' : ''}`} onClick={() => setCapacity(100)}>Ramai (100 kg)</button>
                  <button type="button" className={`roi-preset-btn ${capacity === 150 ? 'active' : ''}`} onClick={() => setCapacity(150)}>Komersial (150 kg)</button>
                </>
              )}
            </div>
          </div>

          {/* Slider 2: Tarif */}
          <div className="roi-field-group">
            <div className="roi-field-header">
              <div>
                <label htmlFor="roi-rate-slider" className="roi-field-label">
                  {businessType === 'koin' ? 'Tarif Layanan Koin per Siklus' : 'Rencana Tarif Layanan'}
                </label>
                <span className="roi-field-desc">
                  {businessType === 'koin' ? 'Harga koin/token cuci & kering' : 'Harga jual ke konsumen per kg'}
                </span>
              </div>
              <div className="roi-value-badge">
                <b>{rupiahFormat(rate)}</b> {businessType === 'koin' ? '/siklus' : '/kg'}
              </div>
            </div>

            <input
              id="roi-rate-slider"
              type="range"
              min={businessType === 'koin' ? 12000 : 5000}
              max={businessType === 'koin' ? 35000 : 15000}
              step={businessType === 'koin' ? 1000 : 500}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="roi-range-slider"
              aria-label="Atur rencana tarif layanan"
            />
          </div>

          {/* Segmented Switch: Hari Buka */}
          <div className="roi-days-row">
            <div>
              <span className="roi-field-label">Hari Buka per Bulan</span>
              <span className="roi-field-desc">Pilih hari kerja aktif operasional</span>
            </div>
            <div className="roi-days-toggle" role="group" aria-label="Pilih jumlah hari operasional per bulan">
              <button
                type="button"
                className={`roi-day-btn ${daysPerMonth === 26 ? 'active' : ''}`}
                onClick={() => setDaysPerMonth(26)}
              >
                26 Hari (Libur Minggu)
              </button>
              <button
                type="button"
                className={`roi-day-btn ${daysPerMonth === 30 ? 'active' : ''}`}
                onClick={() => setDaysPerMonth(30)}
              >
                30 Hari (Non-Stop)
              </button>
            </div>
          </div>
        </div>

        {/* Right Card: Financial Projections & Recommended Package */}
        <div className="roi-output-col">
          {/* Row 1: 2 Metrics Cards */}
          <div className="roi-metrics-grid">
            <div className="roi-metric-card">
              <span className="roi-metric-kicker">PROYEKSI OMSET KOTOR</span>
              <div className="roi-metric-val">{rupiahFormat(omset)}</div>
              <span className="roi-metric-sub">per bulan ({daysPerMonth} hari kerja)</span>
            </div>

            <div className="roi-metric-card roi-metric-profit">
              <div className="roi-metric-header">
                <span className="roi-metric-kicker">ESTIMASI LABA BERSIH</span>
                <span className="roi-margin-badge">Margin ~{marginPercent}%</span>
              </div>
              <div className="roi-metric-val roi-val-green">{rupiahFormat(netProfit)}</div>
              <span className="roi-metric-sub">setelah dipotong bahan kimia, gas, listrik & karyawan</span>
            </div>
          </div>

          {/* Row 2: BEP Card */}
          <div className="roi-bep-card">
            <div className="roi-bep-left">
              <span className="roi-bep-icon" aria-hidden="true">⏱️</span>
              <div>
                <span className="roi-bep-title">Estimasi Balik Modal (BEP)</span>
                <span className="roi-bep-desc">Perkiraan pengembalian investasi mesin</span>
              </div>
            </div>
            <div className="roi-bep-val">{bepMonths}</div>
          </div>

          {/* Row 3: Recommended Package Card */}
          <div className="roi-pkg-card">
            <div className="roi-pkg-badge">
              <span>REKOMENDASI PAKET MESIN</span>
            </div>

            <h3 className="roi-pkg-name">{recommendedPackage.name}</h3>
            <p className="roi-pkg-desc">{recommendedPackage.description}</p>

            <div className="roi-pkg-checklist-title">Kelengkapan Utama Termasuk:</div>
            <ul className="roi-pkg-checklist">
              {recommendedPackage.checklist.map((item, idx) => (
                <li key={idx}>
                  <span className="roi-check-icon" aria-hidden="true">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="roi-pkg-footer">
              <div className="roi-pkg-price-wrap">
                <span className="roi-pkg-price-label">Estimasi Investasi Paket:</span>
                <span className="roi-pkg-price">{recommendedPackage.priceFormatted}</span>
              </div>

              <a
                href={waHref}
                target="_blank"
                rel="noreferrer"
                className="roi-pkg-cta"
                title="Kirim detail simulasi modal dan omset ke WhatsApp My Equipment"
              >
                <svg className="roi-wa-svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
                </svg>
                <span>Kirimkan Hasil Simulasi Ini ke WhatsApp</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
