'use client';

import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import { waLink, type Product } from '@/data/catalog';
import { WhatsAppStickyBar } from '@/components/whatsapp-sticky-bar';

const money = (amount: number) => `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;

export function EstimateForm({ products, whatsapp }: { products: Product[]; whatsapp: string }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const priced = products.filter((product) => product.price !== null);
  const unpriced = products.filter((product) => product.price === null);
  const selected = products.filter((product) => (quantities[product.slug] ?? 0) > 0);
  const needsConfirmation = selected.some((product) => product.price === null || product.priceSource === 'confirm');
  const total = priced.reduce((sum, product) => sum + (product.price ?? 0) * (quantities[product.slug] ?? 0), 0);
  const count = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);
  const message = `Halo My Equipment, saya ingin konsultasi estimasi perlengkapan.\n${selected.map((product) => product.price === null
    ? `- ${product.name} x ${quantities[product.slug]}: harga belum tersedia (perlu konfirmasi)`
    : `- ${product.name} x ${quantities[product.slug]}: ${money(product.price * quantities[product.slug])}${product.priceSource === 'confirm' ? ' (perlu konfirmasi)' : ' (indikatif)'}`).join('\n')}\nSubtotal sementara: ${money(total)}. Mohon konfirmasi harga dan ketersediaannya.`;

  return <div className="estimator-layout">
    <section className="estimator-list" aria-labelledby="estimator-products-title">
      <div className="estimator-heading"><div><span className="eyebrow">Pilih dari katalog</span><h2 id="estimator-products-title">Perlengkapan</h2></div><span aria-live="polite">{count} item dipilih</span></div>
      {products.map((product) => <article className="estimator-row" key={product.slug}>
        <div className="estimator-thumb">{product.image ? <Image src={product.image} alt="" width={140} height={120} sizes="80px" /> : <span role="img" aria-label={`Foto ${product.name} belum tersedia`}>ME</span>}</div>
        <div className="estimator-info"><span>{product.category}</span><b>{product.name}</b><small>{money(product.price ?? 0)} · {product.priceSource === 'confirm' ? 'nominal perlu dikonfirmasi' : 'harga indikatif'}</small></div>
        <div className="quantity-control"><button type="button" aria-label={`Kurangi ${product.name}`} disabled={!quantities[product.slug]} onClick={() => setQuantities((state) => ({ ...state, [product.slug]: Math.max(0, (state[product.slug] ?? 0) - 1) }))}>−</button><output aria-label={`Jumlah ${product.name}`}>{quantities[product.slug] ?? 0}</output><button type="button" aria-label={`Tambah ${product.name}`} onClick={() => setQuantities((state) => ({ ...state, [product.slug]: Math.min(99, (state[product.slug] ?? 0) + 1) }))}>+</button></div>
      </article>)}
      {products.length === 0 && <p className="empty-state">Belum ada item katalog. Hubungi tim untuk meminta daftar kebutuhan.</p>}
    </section>
    <aside className="estimate-summary" aria-labelledby="estimator-summary-title">
      <span className="eyebrow">Ringkasan estimasi</span><h2 id="estimator-summary-title">Subtotal perlengkapan</h2>
      <p>Jumlah berubah sesuai pilihan. Harga akhir dan ketersediaan dikonfirmasi oleh toko.</p>
      <div className="estimate-total"><small>{count} item dipilih</small><b>{money(total)}</b></div>
      <div className="estimate-action-inline">{count > 0 ? <a className="button button-block" href={waLink(message, whatsapp)} target="_blank" rel="noreferrer">Kirim pilihan ke WhatsApp ↗</a> : <button className="button button-block" type="button" disabled>Pilih perlengkapan untuk lanjut</button>}</div>
      <small className="estimate-disclaimer">{needsConfirmation ? 'Subtotal sementara; ada harga yang perlu dikonfirmasi.' : 'Harga bersifat indikatif.'} Tidak termasuk ongkir, pemasangan, biaya operasional, atau komponen yang tidak dipilih.</small>
      {unpriced.length > 0 && <div className="unpriced-note"><b>Produk tanpa harga katalog</b><p>{unpriced.map((product) => product.name).join(', ')}. Tanyakan estimasi kepada tim.</p></div>}
    </aside>
    <WhatsAppStickyBar href={count > 0 ? waLink(`${message}\nSumber: estimator perlengkapan My Equipment.`, whatsapp) : undefined} label={count > 0 ? 'Kirim estimasi ke WhatsApp' : 'Pilih item untuk konsultasi'} context={`${count} item ${String.fromCharCode(183)} ${money(total)}${needsConfirmation && count > 0 ? ` ${String.fromCharCode(183)} harga perlu konfirmasi` : ''}`} disabled={count === 0} testId="estimator-sticky-cta" />
  </div>;
}

export function ConsultationForm({ whatsapp }: { whatsapp: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [whatsappHref, setWhatsappHref] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string, fallback = 'Belum diisi') => String(form.get(key) ?? '').trim() || fallback;
    const message = [
      'Halo My Equipment, saya ingin konsultasi usaha laundry.',
      `Nama: ${value('name')}`, `Jenis usaha: ${value('type')}`, `Anggaran: ${value('budget', 'Belum ditentukan')}`,
      `Kebutuhan: ${value('needs')}`, `Lokasi: ${value('location')}`,
    ].join('\n');
    const href = waLink(message, whatsapp);
    setWhatsappHref(href);
    setSubmitted(true);
    window.open(href, '_blank', 'noopener,noreferrer');
  }

  return <form className="consult-form" onSubmit={submit}>
    <label>Nama lengkap<input name="name" required placeholder="Nama Anda" autoComplete="name" /></label>
    <label>Jenis usaha<select name="type" defaultValue=""><option value="" disabled>Pilih jenis usaha</option><option>Laundry kiloan</option><option>Laundry self service</option><option>Laundry sepatu atau helm</option><option>Usaha cleaning</option><option>Lainnya</option></select></label>
    <label>Perkiraan anggaran<select name="budget" defaultValue=""><option value="" disabled>Pilih kisaran anggaran</option><option>Di bawah Rp 25 juta</option><option>Rp 25–50 juta</option><option>Rp 50–100 juta</option><option>Lebih dari Rp 100 juta</option><option>Belum ditentukan</option></select></label>
    <label>Lokasi usaha<input name="location" placeholder="Kota atau kabupaten" autoComplete="address-level2" /></label>
    <label className="form-wide">Kebutuhan yang ingin didiskusikan<textarea name="needs" rows={4} placeholder="Ceritakan rencana atau perlengkapan yang dicari" /></label>
    <button className="button form-wide" type="submit">Buat pesan WhatsApp ↗</button>
    <p className="form-wide form-note" aria-live="polite">{submitted ? <>Pesan sudah disiapkan. Jika WhatsApp tidak terbuka, <a href={whatsappHref} target="_blank" rel="noreferrer">buka WhatsApp di sini</a>.</> : 'Form ini menyusun pesan di WhatsApp; data tidak disimpan oleh situs.'}</p>
  </form>;
}
