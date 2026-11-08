import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Paket Usaha Laundry Pontianak: Mulai 16 Jt Siap Pakai Tanpa Franchise';
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
          backgroundColor: '#0c1b33',
          padding: '50px 60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Background decorative glows */}
        <div
          style={{
            position: 'absolute',
            top: '-80px',
            right: '-80px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            backgroundColor: '#0284c7',
            opacity: 0.25,
            filter: 'blur(80px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-60px',
            left: '-60px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            backgroundColor: '#2563eb',
            opacity: 0.2,
            filter: 'blur(70px)',
          }}
        />

        {/* Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#0284c7',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '22px',
              }}
            >
              M
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 800, letterSpacing: '0.5px' }}>
                MY EQUIPMENT INDONESIA
              </span>
              <span style={{ color: '#38bdf8', fontSize: '13px', fontWeight: 600 }}>
                Pusat Mesin &amp; Paket Usaha Laundry Kalimantan Barat
              </span>
            </div>
          </div>
          <div
            style={{
              backgroundColor: 'rgba(2, 132, 199, 0.25)',
              border: '1px solid #0284c7',
              borderRadius: '20px',
              padding: '6px 18px',
              color: '#38bdf8',
              fontSize: '14px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            Resmi 2026 · Siap Pakai
          </div>
        </div>

        {/* Center Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '10px' }}>
          <div
            style={{
              display: 'flex',
              alignSelf: 'flex-start',
              backgroundColor: '#f59e0b',
              color: '#0f172a',
              fontSize: '18px',
              fontWeight: 900,
              padding: '6px 16px',
              borderRadius: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Promo Paket Hemat · Mulai Rp 16,5 Juta
          </div>

          <h1
            style={{
              color: '#ffffff',
              fontSize: '48px',
              fontWeight: 900,
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-1px',
              maxWidth: '1000px',
            }}
          >
            Paket Usaha Laundry Pontianak Siap Jalan
          </h1>

          <p style={{ color: '#94a3b8', fontSize: '22px', margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
            Mesin Cuci Front Load + Dryer Gas Komersial + Boiler Setrika Uap + Bonus Bimbingan Manajemen Bisnis.
          </p>
        </div>

        {/* Key Features Badges */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {[
            '0% Royalti Franchise',
            '100% Milik Sendiri',
            'Instalasi Teknisi Resmi',
            'Gratis Training SOP',
            'Kirim 14 Wilayah Kalbar',
          ].map((tag) => (
            <div
              key={tag}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#e2e8f0',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '15px',
                fontWeight: 600,
              }}
            >
              <span style={{ color: '#38bdf8', fontWeight: 900 }}>•</span>
              <span>{tag}</span>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontSize: '16px', fontWeight: 700 }}>
            <span>WhatsApp Konsultasi:</span>
            <span style={{ color: '#ffffff' }}>0895-0444-4471</span>
          </div>
          <div style={{ color: '#94a3b8', fontSize: '15px', fontWeight: 600 }}>
            myequipmentindonesia.com/paket-usaha
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
