'use client';

import React from 'react';
import Link from 'next/link';
import { EXPANSION_CITIES } from '@/data/expansion-cities';
import { waLink } from '@/data/catalog';

interface ExpansionCoverageGridProps {
  whatsapp?: string;
}

export function ExpansionCoverageGrid({ whatsapp = '6289504444471' }: ExpansionCoverageGridProps) {
  return (
    <section
      className="wrap expansion-coverage-hub"
      id="wilayah-ekspansi"
      aria-label="Jangkauan Ekspedisi Paket Usaha Laundry Kalimantan Timur dan Kalimantan Selatan"
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
          EKSPEDISI REGIONAL LINTAS-KALIMANTAN
        </span>
        <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', fontWeight: 800, color: '#0f172a', margin: '0 0 0.75rem 0' }}>
          Pengiriman Paket Mesin Laundry ke Kaltim &amp; Kalsel
        </h2>
        <p style={{ maxWidth: '780px', margin: '0 auto', color: '#475569', fontSize: '1rem', lineHeight: 1.6 }}>
          Melayani pengadaan mesin komersial 100% mandiri (0% royalti) untuk pengusaha di Balikpapan, Samarinda, IKN Nusantara Sepaku, Banjarmasin, dan Banjarbaru. Pengiriman berproteksi palet peti kayu solid via kargo Trans-Kalimantan / Kapal Roro dengan asuransi dan pendampingan teknis instalasi.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '16px',
          marginBottom: '2rem',
        }}
      >
        {EXPANSION_CITIES.map((city) => {
          const waChatLink = waLink(
            `Halo My Equipment Indonesia, saya tertarik membuka usaha laundry di wilayah ${city.name} (${city.province}). Mohon info estimasi ongkir kargo Trans-Kalimantan / Kapal Roro berpalet kayu, paket usaha mandiri 0% royalti, dan proposal RAB gratis. Sumber: halaman paket usaha ekspansi.`,
            whatsapp
          );

          return (
            <div
              key={city.slug}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '14px',
                padding: '1.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
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
                      background: '#f0fdf4',
                      color: '#166534',
                      border: '1px solid #bbf7d0',
                    }}
                  >
                    {city.province}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: '#0284c7', fontWeight: 700 }}>
                    {city.startingPrice}
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
                  {city.lead.slice(0, 118)}...
                </p>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.775rem',
                    color: '#0369a1',
                    fontWeight: 600,
                    marginBottom: '12px',
                    padding: '6px 8px',
                    background: '#f0f9ff',
                    borderRadius: '6px',
                    border: '1px solid #e0f2fe',
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
                  Lihat Wilayah &rarr;
                </Link>

                <a
                  href={waChatLink}
                  target="_blank"
                  rel="noreferrer"
                  title={`Konsultasi pengiriman ke ${city.name}`}
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

      {/* B2B Regional Pillar Article Callout Links */}
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          borderRadius: '16px',
          padding: '1.75rem 2rem',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#38bdf8',
              }}
            >
              RISET &amp; ANALISIS BISNIS REGIONAL
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0.25rem 0 0 0', color: '#ffffff' }}>
              Panduan Komersial B2B IKN Nusantara &amp; Kalimantan Timur
            </h3>
          </div>
          <Link
            href="/artikel"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontSize: '0.85rem',
              fontWeight: 700,
              textDecoration: 'none',
              border: '1px solid rgba(255, 255, 255, 0.2)',
            }}
          >
            Semua Artikel Riset &rarr;
          </Link>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '12px',
          }}
        >
          <Link
            href="/artikel/peluang-usaha-laundry-mess-pekerja-ikn-nusantara-kaltim"
            style={{
              display: 'block',
              padding: '1rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'background 0.2s ease',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, marginBottom: '4px' }}>
              SEKTOR INFRASTRUKTUR &amp; MESS
            </div>
            <div style={{ fontSize: '0.925rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.4 }}>
              Peluang Usaha Laundry Mess Pekerja IKN Nusantara: Mesin Heavy Duty &amp; Hitungan BEP 2 Bulan &rarr;
            </div>
          </Link>

          <Link
            href="/artikel/distributor-mesin-laundry-balikpapan-samarinda-kaltim-kalsel"
            style={{
              display: 'block',
              padding: '1rem',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'background 0.2s ease',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 700, marginBottom: '4px' }}>
              DISTRIBUTOR RESMI MANDIRI
            </div>
            <div style={{ fontSize: '0.925rem', fontWeight: 700, color: '#ffffff', lineHeight: 1.4 }}>
              Distributor Mesin Laundry Balikpapan, Samarinda, Kaltim &amp; Kalsel: Solusi 0% Royalti &rarr;
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
