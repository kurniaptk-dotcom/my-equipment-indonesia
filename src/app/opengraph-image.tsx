import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'My Equipment Indonesia - Pusat Mesin & Paket Usaha Laundry Komersial Kalimantan Barat';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a1728',
          padding: '50px 60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow Effects */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '420px',
            height: '420px',
            borderRadius: '50%',
            backgroundColor: '#0284c7',
            opacity: 0.22,
            filter: 'blur(75px)',
          }}
        />

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                backgroundColor: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '24px',
              }}
            >
              M
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#ffffff', fontSize: '22px', fontWeight: 800, letterSpacing: '0.5px' }}>
                MY EQUIPMENT INDONESIA
              </span>
              <span style={{ color: '#38bdf8', fontSize: '13px', fontWeight: 600 }}>
                Distributor Mesin Laundry &amp; Chemical Kalbar
              </span>
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'rgba(2, 132, 199, 0.2)',
              border: '1px solid #0284c7',
              borderRadius: '20px',
              padding: '6px 18px',
              color: '#38bdf8',
              fontSize: '14px',
              fontWeight: 700,
            }}
          >
            Pontianak · Singkawang · Se-Kalbar
          </div>
        </div>

        {/* Center */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              color: '#ffffff',
              fontSize: '50px',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-1.5px',
              maxWidth: '960px',
            }}
          >
            Solusi Lengkap Paket Usaha &amp; Mesin Laundry Komersial
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '22px', margin: 0, fontWeight: 500, lineHeight: 1.45 }}>
            Pusat mesin cuci komersial, dryer konversi gas, boiler setrika uap, dan perlengkapan laundry tanpa biaya franchise seumur hidup.
          </p>
        </div>

        {/* Bottom Feature Grid */}
        <div style={{ display: 'flex', gap: '16px' }}>
          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span style={{ color: '#f59e0b', fontSize: '14px', fontWeight: 800 }}>PAKET USAHA</span>
            <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700 }}>Mulai Rp 16,5 Jt Siap Pakai</span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span style={{ color: '#38bdf8', fontSize: '14px', fontWeight: 800 }}>LAYANAN TEKNISI</span>
            <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700 }}>Instalasi &amp; Servis 14 Wilayah</span>
          </div>

          <div
            style={{
              flex: 1,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}
          >
            <span style={{ color: '#10b981', fontSize: '14px', fontWeight: 800 }}>KEMITRAAN MANDIRI</span>
            <span style={{ color: '#ffffff', fontSize: '16px', fontWeight: 700 }}>0% Royalti · 100% Laba Milik Anda</span>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '18px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ffffff', fontSize: '16px', fontWeight: 700 }}>
            <span>WhatsApp:</span>
            <span style={{ color: '#38bdf8' }}>+62 895-0444-4471</span>
          </div>
          <div style={{ color: '#94a3b8', fontSize: '15px', fontWeight: 600 }}>
            myequipmentindonesia.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
