import { ImageResponse } from 'next/og';
import { getArticles } from '@/lib/content';

export const runtime = 'nodejs';
export const alt = 'Artikel & Panduan Usaha Laundry My Equipment Indonesia';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const articles = await getArticles(true);
  const article = articles.find((a) => a.slug === slug);

  const title = article?.title || 'Panduan Usaha Laundry Kalbar';
  const typeLabel = article?.type === 'activity' ? 'DOKUMENTASI & EKSPEDISI' : 'PANDUAN & EDUKASI BISNIS';

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a192f',
          padding: '50px 60px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            backgroundColor: '#0284c7',
            opacity: 0.2,
            filter: 'blur(70px)',
          }}
        />

        {/* Top Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
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
            <span style={{ color: '#ffffff', fontSize: '20px', fontWeight: 800 }}>
              MY EQUIPMENT INDONESIA
            </span>
          </div>
          <div
            style={{
              backgroundColor: 'rgba(2, 132, 199, 0.25)',
              border: '1px solid #0284c7',
              borderRadius: '20px',
              padding: '6px 16px',
              color: '#38bdf8',
              fontSize: '13px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {typeLabel}
          </div>
        </div>

        {/* Center Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              color: '#ffffff',
              fontSize: title.length > 70 ? '38px' : '46px',
              fontWeight: 900,
              lineHeight: 1.2,
              margin: 0,
              letterSpacing: '-0.5px',
              maxWidth: '1050px',
            }}
          >
            {title}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '20px', margin: 0, fontWeight: 500 }}>
            Pusat Edukasi &amp; Paket Usaha Laundry Kalimantan Barat · 100% Kepemilikan Mandiri
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            paddingTop: '20px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontSize: '16px', fontWeight: 700 }}>
            <span>Konsultasi WhatsApp:</span>
            <span style={{ color: '#ffffff' }}>0895-0444-4471</span>
          </div>
          <div style={{ color: '#94a3b8', fontSize: '15px', fontWeight: 600 }}>
            myequipmentindonesia.com/artikel
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
