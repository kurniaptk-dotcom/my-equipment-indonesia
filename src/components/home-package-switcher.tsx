'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { waLink } from '@/data/catalog';
import type { CmsPackage } from '@/lib/content';

interface HomePackageSwitcherProps {
  packages: CmsPackage[];
  whatsapp: string;
}

export function HomePackageSwitcher({ packages, whatsapp }: HomePackageSwitcherProps) {
  // If packages empty, fallback
  if (!packages || packages.length === 0) return null;

  const [activeIdx, setActiveIdx] = useState(1); // Default to middle/featured package
  const activePackage = packages[activeIdx] || packages[0];

  return (
    <section className="section wrap home-package-switcher-section" id="paket" data-reveal>
      <div className="section-title">
        <div>
          <span className="eyebrow">PILIHAN PAKET USAHA</span>
          <h2>Pilih Paket yang Sesuai Rencana Anda</h2>
        </div>
        <p>
          Bebas biaya franchise dan tanpa potongan royalti bulanan. Seluruh omset dan keuntungan 100% milik Anda.
        </p>
      </div>

      {/* Interactive Tabs Header */}
      <div className="package-switcher-tabs" role="tablist" aria-label="Kategori Paket Usaha">
        {packages.map((pkg, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
              key={pkg.name}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`switcher-tab-btn ${isActive ? 'is-active' : ''}`}
              onClick={() => setActiveIdx(idx)}
            >
              <span className="tab-icon">
                {idx === 0 ? '🧺' : idx === 1 ? '🪙' : '🏨'}
              </span>
              <span className="tab-label-group">
                <span className="tab-name">Paket {pkg.name}</span>
                <span className="tab-badge">{pkg.label}</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Package Showcase Card */}
      <div className="package-showcase-panel">
        <div className="package-showcase-card">
          {/* Left: Visual Image Frame */}
          <div className="package-showcase-media">
            <div className="showcase-img-wrap">
              {activePackage.image ? (
                <Image
                  src={activePackage.image}
                  alt={`Paket Usaha Laundry ${activePackage.name} - My Equipment Kalimantan Barat`}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  className="showcase-img"
                  priority
                />
              ) : (
                <div className="showcase-img-placeholder">
                  <span>ME</span>
                </div>
              )}
              <span className="showcase-floating-badge">
                ✓ 100% Tanpa Royalti
              </span>
            </div>
          </div>

          {/* Right: Info & Pricing */}
          <div className="package-showcase-content">
            <div className="showcase-header">
              <span className="showcase-category">{activePackage.label}</span>
              <h3 className="showcase-title">Paket Usaha Laundry {activePackage.name}</h3>
              <p className="showcase-desc">{activePackage.desc}</p>
            </div>

            {/* Feature Points */}
            <div className="showcase-points">
              <span className="points-heading">Fasilitas yang Didapatkan:</span>
              <ul className="points-list">
                {activePackage.points.map((pt, i) => (
                  <li key={i}>
                    <span className="point-check" aria-hidden="true">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price & Action Row */}
            <div className="showcase-action-row">
              <div className="showcase-price-box">
                <small>Investasi Paket Lengkap*</small>
                <b className="showcase-price">{activePackage.price}</b>
              </div>

              <div className="showcase-btn-group">
                <a
                  href={waLink(
                    `Halo My Equipment, saya tertarik dengan Paket ${activePackage.name} (${activePackage.price}). Mohon informasi rincian unit dan jadwal survei teknisi.`,
                    whatsapp
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="button button-primary showcase-wa-btn"
                  onClick={() => {
                    if (typeof window !== 'undefined' && (window as unknown as { gtag?: Function }).gtag) {
                      (window as unknown as { gtag: Function }).gtag('event', 'whatsapp_lead_click', {
                        event_category: 'conversion',
                        event_label: `home_package_${activePackage.name}`,
                      });
                    }
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: '18px', height: '18px' }} aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
                  </svg>
                  <span>Konsultasi Paket Ini ↗</span>
                </a>

                <Link href="/paket-usaha" className="button button-outline showcase-detail-btn">
                  <span>Bandingkan Semua Paket →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
