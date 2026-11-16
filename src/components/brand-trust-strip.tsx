import Link from 'next/link';

interface BrandItem {
  name: string;
  badge: string;
  desc: string;
  href: string;
  country: string;
}

const BRANDS: BrandItem[] = [
  {
    name: 'Speed Queen',
    badge: 'USA Commercial',
    desc: 'Standar emas laundromat dunia & dryer gas awet puluhan tahun',
    href: '/produk?merk=speed-queen',
    country: 'USA',
  },
  {
    name: 'Maytag',
    badge: 'USA Heavy-Duty',
    desc: 'Ketahanan cuci kerja berat mess sawit, tambang & ruko',
    href: '/produk?merk=maytag',
    country: 'USA',
  },
  {
    name: 'LG Commercial',
    badge: 'Inverter Direct Drive',
    desc: 'Motor tanpa belt, senyap, hemat air & listrik, suku cadang melimpah',
    href: '/produk?merk=lg',
    country: 'Korea',
  },
  {
    name: 'Samsung',
    badge: 'Digital Inverter',
    desc: 'Teknologi EcoBubble lembut merawat serat pakaian kiloan',
    href: '/produk?merk=samsung',
    country: 'Korea',
  },
  {
    name: 'Diamante',
    badge: 'Gas Dryer Specialist',
    desc: 'Dryer gas 150 Watt terfavorit paket usaha laundry pemula',
    href: '/produk?merk=diamante',
    country: 'Pilihan Populer',
  },
  {
    name: 'Mr Spin',
    badge: 'Commercial Gas Dryer',
    desc: 'Pengering konversi gas efisiensi tinggi hemat modal ruko',
    href: '/produk?merk=mr-spin',
    country: 'Ekonomis Handal',
  },
];

export function BrandTrustStrip() {
  return (
    <section
      className="wrap brand-trust-strip"
      aria-label="Merek mesin cuci dan pengering resmi My Equipment Indonesia"
      style={{
        marginTop: '2.5rem',
        marginBottom: '2.5rem',
      }}
    >
      <div
        style={{
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          border: '1px solid #e2e8f0',
          borderRadius: '16px',
          padding: '2rem 1.75rem',
          boxShadow: '0 4px 20px rgba(15, 23, 42, 0.04)',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 1.75rem' }}>
          <span
            style={{
              display: 'inline-block',
              fontSize: '11px',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#2563eb',
              background: '#eff6ff',
              padding: '4px 12px',
              borderRadius: '20px',
              marginBottom: '0.65rem',
            }}
          >
            Merek Mesin Komersial Resmi
          </span>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', margin: '0 0 0.5rem' }}>
            Didukung Merek Produsen Binatu Terkemuka Dunia
          </h2>
          <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
            Seluruh paket usaha dan pengadaan unit satuan My Equipment Indonesia menggunakan mesin cuci front load dan dryer gas asli dari merek terpercaya dengan jaminan garansi resmi dan ketersediaan suku cadang lokal Kalimantan.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '14px',
          }}
        >
          {BRANDS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.15rem 1.25rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                background: '#ffffff',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              className="brand-card-hover"
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <b style={{ fontSize: '1.05rem', color: '#0f172a' }}>{item.name}</b>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#047857',
                      background: '#d1fae5',
                      padding: '2px 8px',
                      borderRadius: '12px',
                    }}
                  >
                    {item.badge}
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.45, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '12px',
                  paddingTop: '10px',
                  borderTop: '1px solid #f1f5f9',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#2563eb',
                }}
              >
                <span>Lihat Koleksi Unit</span>
                <span aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
