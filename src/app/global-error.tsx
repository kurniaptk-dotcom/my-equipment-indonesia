'use client';

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="id"><body style={{ margin: 0, background: '#f4f8fd', color: '#101d36', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
    <main role="alert" style={{ maxWidth: 620, margin: '12vh auto', padding: 32, background: '#fff', border: '1px solid #e5ebf3', borderRadius: 16 }}>
      <p style={{ color: '#0968e8', fontWeight: 700 }}>My Equipment Indonesia</p>
      <h1 style={{ fontSize: 32, lineHeight: 1.2 }}>Situs sedang mengalami gangguan.</h1>
      <p style={{ color: '#64748b', lineHeight: 1.6 }}>Coba muat ulang. Jika masalah berlanjut, hubungi tim My Equipment.</p>
      <button type="button" onClick={reset} style={{ minHeight: 44, padding: '0 16px', border: 0, borderRadius: 8, background: '#0968e8', color: '#fff', fontSize: 15, fontWeight: 700, cursor: 'pointer' }}>Coba lagi</button>
      <a href="/kontak" style={{ marginLeft: 14, color: '#064eb8', fontWeight: 700 }}>Hubungi kami</a>
    </main>
  </body></html>;
}
