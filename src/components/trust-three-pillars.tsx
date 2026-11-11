import Link from 'next/link';

export function TrustThreePillars() {
  return (
    <section className="wrap trust-pillars-section" aria-label="3 Jaminan Resmi My Equipment Indonesia" data-reveal>
      <div className="trust-pillars-header">
        <div className="trust-pillars-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
          <span>STANDAR PELAYANAN DISTRIBUTOR RESMI KALBAR</span>
        </div>
        <h2 className="trust-pillars-title">
          3 Jaminan Resmi Kemitraan Mandiri My Equipment
        </h2>
        <p className="trust-pillars-subtitle">
          Bukan sekadar jual beli putus. Kami mendampingi setiap pengusaha laundry di Kalimantan Barat dari pengiriman, perakitan pipa, hingga pembukuan bisnis tanpa dipungut biaya franchise sepeser pun.
        </p>
      </div>

      <div className="trust-pillars-grid">
        {/* Pilar 1: Gratis Ongkir Armada */}
        <div className="trust-pillar-card pillar-card-shipping">
          <div className="pillar-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div className="pillar-body">
            <span className="pillar-tag">FASILITAS RESMI 01</span>
            <h3 className="pillar-heading">Gratis Ongkir Armada Internal</h3>
            <p className="pillar-desc">
              Pengiriman unit mesin cuci komersial dan dryer gas menggunakan armada resmi terproteksi palet peti kayu rapi. Menjangkau seluruh 14 kabupaten/kota se-Kalbar tanpa risiko kerusakan di jalan.
            </p>
            <ul className="pillar-features">
              <li>
                <span className="pillar-check" aria-hidden="true">✓</span>
                <span>Armada resmi internal terjadwal</span>
              </li>
              <li>
                <span className="pillar-check" aria-hidden="true">✓</span>
                <span>Proteksi packing kayu standar ekspedisi</span>
              </li>
              <li>
                <span className="pillar-check" aria-hidden="true">✓</span>
                <span>Pengiriman sampai depan pintu ruko</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pilar 2: Gratis Instalasi Teknisi */}
        <div className="trust-pillar-card pillar-card-install">
          <div className="pillar-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
          </div>
          <div className="pillar-body">
            <span className="pillar-tag">FASILITAS RESMI 02</span>
            <h3 className="pillar-heading">Gratis Instalasi Teknisi ke Lokasi</h3>
            <p className="pillar-desc">
              Teknisi resmi turun langsung ke lokasi ruko Anda. Memasang jalur pipa air bersih, manifold gas LPG berstandar safety, cerobong pembuangan hawa panas exhaust dryer, dan komisioning mesin sampai siap berputar.
            </p>
            <ul className="pillar-features">
              <li>
                <span className="pillar-check" aria-hidden="true">✓</span>
                <span>Instalasi plumbing air & gas standar SNI</span>
              </li>
              <li>
                <span className="pillar-check" aria-hidden="true">✓</span>
                <span>Pemasangan ducting cerobong hawa panas</span>
              </li>
              <li>
                <span className="pillar-check" aria-hidden="true">✓</span>
                <span>Uji beban putaran drum & kebocoran gas</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Pilar 3: Gratis Pelatihan Manajemen */}
        <div className="trust-pillar-card pillar-card-training">
          <div className="pillar-icon-box">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="28" height="28" aria-hidden="true">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
          </div>
          <div className="pillar-body">
            <span className="pillar-tag">FASILITAS RESMI 03</span>
            <h3 className="pillar-heading">Gratis Pelatihan Manajemen Bisnis</h3>
            <p className="pillar-desc">
              Pendampingan praktis manajemen laundry sampai Anda dan karyawan mahir: SOP pemilahan pakaian anti-luntur, takaran chemical deterjen & parfum tahan lama, hingga pembukuan kasir harian.
            </p>
            <ul className="pillar-features">
              <li>
                <span className="pillar-check" aria-hidden="true">✓</span>
                <span>Modul SOP operasional & penanganan noda</span>
              </li>
              <li>
                <span className="pillar-check" aria-hidden="true">✓</span>
                <span>Takaran chemical presisi hemat HPP Rp 1.300</span>
              </li>
              <li>
                <span className="pillar-check" aria-hidden="true">✓</span>
                <span>Strategi penentuan harga & promo pembukaan</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="trust-pillars-action">
        <Link href="/paket-usaha" className="button button-primary">
          <span>Lihat Pilihan Paket Usaha Lengkap</span>
          <span aria-hidden="true">→</span>
        </Link>
        <Link href="/paket-usaha/proposal" className="button button-outline">
          <span>Unduh Proposal PDF Siap Cetak</span>
          <span aria-hidden="true">↗</span>
        </Link>
      </div>
    </section>
  );
}
