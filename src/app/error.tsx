'use client';

import Link from 'next/link';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="subpage error-page" role="alert">
    <span className="eyebrow">Gangguan sementara</span>
    <h1>Halaman belum dapat dimuat.</h1>
    <p>Coba muat ulang halaman. Jika masalah berlanjut, hubungi tim My Equipment.</p>
    <div className="error-actions"><button className="button" type="button" onClick={reset}>Coba lagi</button><Link className="button button-outline" href="/kontak">Hubungi kami</Link></div>
  </main>;
}
