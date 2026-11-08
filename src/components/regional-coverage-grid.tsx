'use client';

import React from 'react';
import Link from 'next/link';
import { KALBAR_CITIES } from '@/data/cities';
import { waLink } from '@/data/catalog';

interface RegionalCoverageGridProps {
  whatsapp?: string;
}

export function RegionalCoverageGrid({ whatsapp = '6289504444471' }: RegionalCoverageGridProps) {
  return (
    <section
      className="wrap regional-coverage-hub"
      id="wilayah-kalbar"
      aria-label="Jangkauan Layanan Paket Usaha Laundry 14 Kabupaten Kota Kalimantan Barat"
      style={{ margin: '3.5rem auto' }}
    >
      <div className="section-title text-center" style={{ textAlign: 'center', marginBottom: '2.25rem' }}>
        <span
          className="eyebrow"
          style={{
            display: 'inline-block',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 700,
            fontSize: '0.825rem',
            color: '#0284c7',
            marginBottom: '0.5rem',
          }}
        >
          JANGKAUAN 14 KABUPATEN / KOTA
        </span>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem 0' }}>
          Paket Usaha Laundry Siap Kirim &amp; Pasang ke Kota Anda
        </h2>
        <p style={{ maxWidth: '760px', margin: '0 auto', color: '#475569', fontSize: '1rem', lineHeight: 1.6 }}>
          My Equipment melayani pengiriman aman, instalasi plumbing &amp; cerobong gas oleh teknisi langsung di ruko, serta pelatihan manajemen gratis ke seluruh penjuru Kalimantan Barat.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}
      >
        {KALBAR_CITIES.map((city) => {
          const waChatLink = waLink(
            `Halo My Equipment, saya di ${city.name} dan tertarik dengan paket usaha laundry mandiri. Mohon informasi pengiriman dan jadwal teknisi ke lokasi saya.`,
            whatsapp
          );

          return (
            <div
              key={city.slug}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '14px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
              }}
              className="city-coverage-card"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: city.slug === 'pontianak' || city.slug === 'kubu-raya' ? '#e0f2fe' : '#f1f5f9',
                      color: city.slug === 'pontianak' || city.slug === 'kubu-raya' ? '#0369a1' : '#475569',
                    }}
                  >
                    {city.districtType} {city.name}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#16a34a', fontWeight: 700 }}>
                    Mulai {city.startingPrice}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a', margin: '0 0 6px 0', lineHeight: 1.35 }}>
                  <Link
                    href={`/wilayah/${city.slug}`}
                    style={{ color: 'inherit', textDecoration: 'none' }}
                    title={`Paket Usaha Laundry ${city.name}`}
                  >
                    Paket Usaha Laundry {city.name}
                  </Link>
                </h3>

                <p style={{ fontSize: '0.825rem', color: '#64748b', margin: '0 0 10px 0', lineHeight: 1.5 }}>
                  {city.lead.slice(0, 115)}...
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.775rem',
                    color: '#0284c7',
                    fontWeight: 600,
                    marginBottom: '12px',
                    padding: '6px 8px',
                    background: '#f0f9ff',
                    borderRadius: '6px',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
                    <rect x="1" y="3" width="15" height="13" rx="2" />
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                    <circle cx="5.5" cy="18.5" r="2.5" />
                    <circle cx="18.5" cy="18.5" r="2.5" />
                  </svg>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {city.deliveryEstimate.slice(0, 48)}...
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                <Link
                  href={`/wilayah/${city.slug}`}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    background: '#f8fafc',
                    color: '#0f172a',
                    border: '1px solid #cbd5e1',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  Lihat Paket &rarr;
                </Link>

                <a
                  href={waChatLink}
                  target="_blank"
                  rel="noreferrer"
                  title={`Chat teknisi untuk ${city.name}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.55rem 0.75rem',
                    borderRadius: '8px',
                    background: '#16a34a',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden="true">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
                  </svg>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
