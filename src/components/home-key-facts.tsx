import Link from 'next/link';

export function HomeKeyFacts() {
  return (
    <section className="wrap home-keyfacts-section" aria-label="Ringkasan Parameter Usaha Laundry Mandiri Kalbar" data-reveal>
      <div className="home-keyfacts-header">
        <div className="home-keyfacts-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
          </svg>
          <span>PARAMETER FINANSIAL & TEKNIS RESMI 2026</span>
        </div>
        <h2 className="home-keyfacts-title">
          Fakta Kunci & Efisiensi Operasional Laundry Komersial Kalbar
        </h2>
        <p className="home-keyfacts-subtitle">
          Data acuan riil bagi calon pengusaha laundry di 14 kabupaten/kota Kalimantan Barat sebelum memulai investasi mesin cuci dan pengering komersial.
        </p>
      </div>

      <div className="home-keyfacts-grid">
        {/* Metric 1: HPP */}
        <div className="keyfact-card">
          <div className="keyfact-top">
            <span className="keyfact-tag">HPP Produksi Riil</span>
            <span className="keyfact-val">± Rp 1.300 <small>/ kg</small></span>
          </div>
          <p className="keyfact-desc">
            Biaya operasional cuci, kering, dan setrika (deterjen, softener, parfum grade A, gas LPG, dan listrik). Menghasilkan <strong>margin laba kotor 75% - 85%</strong> pada tarif jual standar Kalbar Rp 7.000 - Rp 9.000/kg.
          </p>
          <div className="keyfact-footer">
            <span>Estimasi Balik Modal: <strong>5 - 8 Bulan</strong></span>
          </div>
        </div>

        {/* Metric 2: Daya Listrik */}
        <div className="keyfact-card">
          <div className="keyfact-top">
            <span className="keyfact-tag">Konsumsi Daya Dryer</span>
            <span className="keyfact-val">150 - 250 <small>Watt</small></span>
          </div>
          <p className="keyfact-desc">
            Mesin pengering komersial sistem konversi gas LPG dengan pemantik safety otomatis solenoid valve. <strong>Hemat daya 90%</strong> dibanding dryer listrik murni (2.200W), aman dioperasikan pada daya listrik PLN 900 VA - 1.300 VA.
          </p>
          <div className="keyfact-footer">
            <span>Waktu Pengeringan: <strong>40 - 45 Menit (100% Kering)</strong></span>
          </div>
        </div>

        {/* Metric 3: Skema Non-Franchise */}
        <div className="keyfact-card">
          <div className="keyfact-top">
            <span className="keyfact-tag">Sistem Kemitraan</span>
            <span className="keyfact-val">0% <small>Royalti Fee</small></span>
          </div>
          <p className="keyfact-desc">
            100% Usaha Mandiri. Tanpa biaya kemitraan (franchise fee), tanpa potongan omset bulanan, dan bebas menggunakan nama brand outlet Anda sendiri seumur hidup. Seluruh profit usaha milik Anda sepenuhnya.
          </p>
          <div className="keyfact-footer">
            <span>Status Legalitas: <strong>Hak Milik Aset Mesin Penuh</strong></span>
          </div>
        </div>

        {/* Metric 4: Tiga Fasilitas Resmi */}
        <div className="keyfact-card">
          <div className="keyfact-top">
            <span className="keyfact-tag">Fasilitas Resmi Kalbar</span>
            <span className="keyfact-val">3 Jaminan <small>Penuh</small></span>
          </div>
          <p className="keyfact-desc">
            Setiap paket usaha langsung mendapatkan: <strong>Gratis Ongkir</strong> armada internal ke 14 kota Kalbar, <strong>Gratis Instalasi</strong> pipa safety oleh teknisi di lokasi outlet, serta <strong>Gratis Pelatihan SOP & Manajemen Bisnis</strong> sampai siap beroperasi.
          </p>
          <div className="keyfact-footer">
            <span>Layanan Teknisi: <strong>Panggilan Cepat Se-Kalbar</strong></span>
          </div>
        </div>
      </div>

      <div className="home-keyfacts-actions">
        <Link href="/estimasi-modal" className="home-keyfacts-btn-primary">
          <span>Kalkulator Modal & Simulasi BEP Realtime</span>
          <span aria-hidden="true">→</span>
        </Link>
        <Link href="/paket-usaha/proposal" className="home-keyfacts-btn-secondary">
          <span>Unduh Dokumen Proposal Resmi (PDF)</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
