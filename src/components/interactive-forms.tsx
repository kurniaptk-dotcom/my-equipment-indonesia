'use client';

import Image from 'next/image';
import { useState, type FormEvent } from 'react';
import { waLink, type Product } from '@/data/catalog';
import { WhatsAppStickyBar } from '@/components/whatsapp-sticky-bar';

const money = (amount: number) => `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;

type ScaleOption = {
  id: string;
  name: string;
  capacity: string;
  desc: string;
  presetItems: string[];
};

const scales: ScaleOption[] = [
  {
    id: 'rumahan',
    name: 'Rumahan',
    capacity: '1 - 2 mesin',
    desc: 'Untuk usaha kecil rumahan',
    presetItems: ['mesin-cuci-samsung-8-kg'],
  },
  {
    id: 'kecil',
    name: 'Kecil',
    capacity: '3 - 5 mesin',
    desc: 'Untuk pemula & ruko awal',
    presetItems: ['mesin-cuci-samsung-8-kg', 'dryer-speedqueen-10-5kg'],
  },
  {
    id: 'menengah',
    name: 'Menengah',
    capacity: '6 - 10 mesin',
    desc: 'Untuk skala berkembang & ramai',
    presetItems: ['mesin-cuci-samsung-8-kg', 'dryer-speedqueen-10-5kg', 'boiler-setrika-uap-nagamoto-25l'],
  },
  {
    id: 'besar',
    name: 'Besar',
    capacity: '> 10 mesin',
    desc: 'Untuk usaha profesional & komersial',
    presetItems: ['mesin-cuci-samsung-8-kg', 'dryer-speedqueen-10-5kg', 'boiler-setrika-uap-nagamoto-25l', 'meja-setrika-vakum-kotak'],
  },
];

export function EstimateForm({ products, whatsapp }: { products: Product[]; whatsapp: string }) {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [activeScale, setActiveScale] = useState<string>('rumahan');
  const [currentStep, setCurrentStep] = useState<number>(1);

  const priced = products.filter((product) => product.price !== null);
  const unpriced = products.filter((product) => product.price === null);
  const selected = products.filter((product) => (quantities[product.slug] ?? 0) > 0);
  const needsConfirmation = selected.some((product) => product.price === null || product.priceSource === 'confirm');
  const total = priced.reduce((sum, product) => sum + (product.price ?? 0) * (quantities[product.slug] ?? 0), 0);
  const count = Object.values(quantities).reduce((sum, quantity) => sum + quantity, 0);

  // Perkiraan breakdown kategori
  const mesinTotal = selected
    .filter((p) => p.categorySlug === 'mesin-laundry')
    .reduce((sum, p) => sum + (p.price ?? 0) * (quantities[p.slug] ?? 0), 0);
  const perlengkapanTotal = selected
    .filter((p) => p.categorySlug === 'perlengkapan-laundry' || p.categorySlug === 'suku-cadang')
    .reduce((sum, p) => sum + (p.price ?? 0) * (quantities[p.slug] ?? 0), 0);
  const chemicalTotal = selected
    .filter((p) => p.categorySlug === 'chemical-laundry')
    .reduce((sum, p) => sum + (p.price ?? 0) * (quantities[p.slug] ?? 0), 0);
  const instalasiEst = count > 0 ? 1500000 : 0;

  function applyScalePreset(scaleId: string) {
    setActiveScale(scaleId);
    const targetScale = scales.find((s) => s.id === scaleId);
    if (!targetScale) return;
    const nextQuantities: Record<string, number> = {};
    for (const slug of targetScale.presetItems) {
      if (products.some((p) => p.slug === slug)) {
        nextQuantities[slug] = 1;
      }
    }
    setQuantities(nextQuantities);
  }

  const message = `Halo My Equipment, saya ingin konsultasi estimasi perlengkapan.\n${selected
    .map((product) =>
      product.price === null
        ? `- ${product.name} x ${quantities[product.slug]}: harga belum tersedia (perlu konfirmasi)`
        : `- ${product.name} x ${quantities[product.slug]}: ${money(product.price * quantities[product.slug])}${
            product.priceSource === 'confirm' ? ' (perlu konfirmasi)' : ' (indikatif)'
          }`
    )
    .join('\n')}\nSubtotal sementara: ${money(total)}. Mohon konfirmasi harga dan ketersediaannya.`;

  return (
    <div className="estimator-container">
      {/* Step Indicator Wizard */}
      <div className="calc-steps-indicator" aria-label="Tahapan Kalkulator">
        <button
          type="button"
          className={`calc-step-item${currentStep >= 1 ? ' is-active' : ''}`}
          onClick={() => setCurrentStep(1)}
        >
          <span className="calc-step-num">1</span>
          <span className="calc-step-label">Pilih Skala Usaha</span>
        </button>
        <div className="calc-step-line" aria-hidden="true" />
        <button
          type="button"
          className={`calc-step-item${currentStep >= 2 ? ' is-active' : ''}`}
          onClick={() => setCurrentStep(2)}
        >
          <span className="calc-step-num">2</span>
          <span className="calc-step-label">Pilih Peralatan</span>
        </button>
        <div className="calc-step-line" aria-hidden="true" />
        <button
          type="button"
          className={`calc-step-item${currentStep >= 3 ? ' is-active' : ''}`}
          onClick={() => setCurrentStep(3)}
        >
          <span className="calc-step-num">3</span>
          <span className="calc-step-label">Perlengkapan</span>
        </button>
        <div className="calc-step-line" aria-hidden="true" />
        <button
          type="button"
          className={`calc-step-item${currentStep >= 4 ? ' is-active' : ''}`}
          onClick={() => setCurrentStep(4)}
        >
          <span className="calc-step-num">4</span>
          <span className="calc-step-label">Hasil Estimasi</span>
        </button>
      </div>

      {/* Skala Usaha Selection Cards */}
      <section className="estimator-scale-section" aria-labelledby="scale-selector-title">
        <div className="estimator-section-header">
          <span className="eyebrow">Langkah 1</span>
          <h2 id="scale-selector-title">1. Pilih Skala Usaha</h2>
        </div>
        <div className="scale-cards-grid">
          {scales.map((scale) => {
            const isSelected = activeScale === scale.id;
            return (
              <div
                key={scale.id}
                className={`scale-card${isSelected ? ' is-selected' : ''}`}
                onClick={() => applyScalePreset(scale.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    applyScalePreset(scale.id);
                  }
                }}
                aria-pressed={isSelected}
              >
                <div className="scale-card-header">
                  <div className="scale-radio-circle" aria-hidden="true">
                    {isSelected && <span className="scale-radio-dot" />}
                  </div>
                  <div>
                    <b>{scale.name}</b>
                    <span className="scale-card-capacity">{scale.capacity}</span>
                  </div>
                </div>
                <small className="scale-card-desc">{scale.desc}</small>
              </div>
            );
          })}
        </div>
      </section>

      {/* Original 2-column layout */}
      <div className="estimator-layout">
        <section className="estimator-list" aria-labelledby="estimator-products-title">
          <div className="estimator-heading">
            <div>
              <span className="eyebrow">Pilih dari katalog</span>
              <h2 id="estimator-products-title">Perlengkapan</h2>
            </div>
            <span aria-live="polite">{count} item dipilih</span>
          </div>

          {products.map((product) => (
            <article className="estimator-row" key={product.slug}>
              <div className="estimator-thumb">
                {product.image ? (
                  <Image src={product.image} alt="" width={140} height={120} sizes="80px" />
                ) : (
                  <span role="img" aria-label={`Foto ${product.name} belum tersedia`}>
                    ME
                  </span>
                )}
              </div>
              <div className="estimator-info">
                <span>{product.category}</span>
                <b>{product.name}</b>
                <small>
                  {money(product.price ?? 0)} ·{' '}
                  {product.priceSource === 'confirm' ? 'nominal perlu dikonfirmasi' : 'harga indikatif'}
                </small>
              </div>
              <div className="quantity-control">
                <button
                  type="button"
                  aria-label={`Kurangi ${product.name}`}
                  disabled={!quantities[product.slug]}
                  onClick={() =>
                    setQuantities((state) => ({
                      ...state,
                      [product.slug]: Math.max(0, (state[product.slug] ?? 0) - 1),
                    }))
                  }
                >
                  −
                </button>
                <output aria-label={`Jumlah ${product.name}`}>{quantities[product.slug] ?? 0}</output>
                <button
                  type="button"
                  aria-label={`Tambah ${product.name}`}
                  onClick={() =>
                    setQuantities((state) => ({
                      ...state,
                      [product.slug]: Math.min(99, (state[product.slug] ?? 0) + 1),
                    }))
                  }
                >
                  +
                </button>
              </div>
            </article>
          ))}

          {products.length === 0 && (
            <p className="empty-state">Belum ada item katalog. Hubungi tim untuk meminta daftar kebutuhan.</p>
          )}
        </section>

        <aside className="estimate-summary" aria-labelledby="estimator-summary-title">
          <span className="eyebrow">Rincian Perhitungan</span>
          <h2 id="estimator-summary-title">Estimasi Modal Awal</h2>

          <div className="estimate-breakdown-list">
            <div className="estimate-breakdown-row">
              <span>Mesin Laundry</span>
              <b>{money(mesinTotal)}</b>
            </div>
            <div className="estimate-breakdown-row">
              <span>Perlengkapan Pendukung</span>
              <b>{money(perlengkapanTotal)}</b>
            </div>
            <div className="estimate-breakdown-row">
              <span>Chemical Laundry</span>
              <b>{money(chemicalTotal)}</b>
            </div>
            <div className="estimate-breakdown-row">
              <span>Instalasi & Setup</span>
              <b>{money(instalasiEst)}</b>
            </div>
          </div>

          <div className="estimate-total">
            <small>{count} item dipilih</small>
            <b>{money(total)}</b>
          </div>

          <div className="estimate-action-inline">
            {count > 0 ? (
              <a className="button button-block" href={waLink(message, whatsapp)} target="_blank" rel="noreferrer">
                Kirim pilihan ke WhatsApp ↗
              </a>
            ) : (
              <button className="button button-block" type="button" disabled>
                Pilih perlengkapan untuk lanjut
              </button>
            )}
          </div>

          <small className="estimate-disclaimer">
            {needsConfirmation
              ? 'Subtotal sementara; ada harga yang perlu dikonfirmasi.'
              : 'Harga bersifat indikatif.'}{' '}
            Estimasi dapat berubah tergantung merek, spesifikasi, dan kebutuhan lokasi usaha Anda.
          </small>

          {unpriced.length > 0 && (
            <div className="unpriced-note">
              <b>Produk tanpa harga katalog</b>
              <p>{unpriced.map((product) => product.name).join(', ')}. Tanyakan estimasi kepada tim.</p>
            </div>
          )}
        </aside>

        <WhatsAppStickyBar
          href={count > 0 ? waLink(`${message}\nSumber: estimator perlengkapan My Equipment.`, whatsapp) : undefined}
          label={count > 0 ? 'Kirim estimasi ke WhatsApp' : 'Pilih item untuk konsultasi'}
          context={`${count} item · ${money(total)}${
            needsConfirmation && count > 0 ? ' · harga perlu konfirmasi' : ''
          }`}
          disabled={count === 0}
          testId="estimator-sticky-cta"
        />
      </div>
    </div>
  );
}

export function ConsultationForm({ whatsapp }: { whatsapp: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [whatsappHref, setWhatsappHref] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string, fallback = 'Belum diisi') => String(form.get(key) ?? '').trim() || fallback;
    const message = [
      'Halo My Equipment, saya ingin konsultasi rekomendasi paket usaha laundry.',
      `Nama: ${value('name')}`,
      `Nomor WhatsApp: ${value('phone')}`,
      `Jenis usaha: ${value('type')}`,
      `Estimasi modal: ${value('budget', 'Belum ditentukan')}`,
      `Target kapasitas: ${value('capacity', 'Belum ditentukan')}`,
      `Lokasi usaha: ${value('location')}`,
      `Email: ${value('email', 'Tidak disertakan')}`,
      `Kebutuhan: ${value('needs', 'Rekomendasi paket & perlengkapan awal')}`,
    ].join('\n');
    const href = waLink(message, whatsapp);
    setWhatsappHref(href);
    setSubmitted(true);
    window.open(href, '_blank', 'noopener,noreferrer');
  }

  return (
    <form className="consult-form-grid" onSubmit={submit}>
      <div className="consult-form-fields">
        <label>
          Jenis Usaha
          <select name="type" defaultValue="">
            <option value="" disabled>
              Pilih jenis usaha
            </option>
            <option>Laundry Kiloan</option>
            <option>Laundry Self Service (Koin/Digital)</option>
            <option>Laundry Sepatu & Helm</option>
            <option>Laundry Rumahan</option>
            <option>Usaha Cleaning & Karpet</option>
            <option>Lainnya</option>
          </select>
        </label>

        <label>
          Nama Lengkap
          <input name="name" required placeholder="Masukkan nama lengkap" autoComplete="name" />
        </label>

        <label>
          Estimasi Modal
          <select name="budget" defaultValue="">
            <option value="" disabled>
              Pilih rentang modal
            </option>
            <option>Di bawah Rp 25 juta</option>
            <option>Rp 25 - 50 juta</option>
            <option>Rp 50 - 100 juta</option>
            <option>Lebih dari Rp 100 juta</option>
            <option>Belum ditentukan</option>
          </select>
        </label>

        <label>
          Nomor WhatsApp
          <input
            name="phone"
            type="tel"
            required
            placeholder="Masukkan nomor WhatsApp aktif"
            autoComplete="tel"
          />
        </label>

        <label>
          Target Kapasitas
          <select name="capacity" defaultValue="">
            <option value="" disabled>
              Pilih kapasitas per hari
            </option>
            <option>Kapasitas 20 - 30 Kg / hari</option>
            <option>Kapasitas 30 - 50 Kg / hari</option>
            <option>Kapasitas 50 - 100 Kg / hari</option>
            <option>Kapasitas &gt; 100 Kg / hari</option>
            <option>Belum tahu (butuh saran)</option>
          </select>
        </label>

        <label>
          Email (Opsional)
          <input name="email" type="email" placeholder="Masukkan email Anda" autoComplete="email" />
        </label>

        <label className="field-full">
          Lokasi Usaha
          <input
            name="location"
            placeholder="Contoh: Pontianak, Kubu Raya, Singkawang, dll."
            autoComplete="address-level2"
          />
        </label>

        <label className="field-full">
          Kebutuhan yang Ingin Didiskusikan
          <textarea
            name="needs"
            rows={3}
            placeholder="Ceritakan rencana usaha atau daftar peralatan yang dicari"
          />
        </label>
      </div>

      <button className="button button-block consult-submit-button" type="submit">
        Kirim Permintaan Konsultasi →
      </button>

      <p className="form-note" aria-live="polite">
        {submitted ? (
          <>
            Pesan konsultasi sudah disiapkan. Jika WhatsApp tidak otomatis terbuka,{' '}
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              klik di sini untuk membuka WhatsApp
            </a>
            .
          </>
        ) : (
          'Form ini menyusun draf pesan WhatsApp resmi; data tidak disimpan di server.'
        )}
      </p>
    </form>
  );
}

export function ServiceRequestForm({ whatsapp }: { whatsapp: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [whatsappHref, setWhatsappHref] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const value = (key: string, fallback = 'Belum diisi') => String(form.get(key) ?? '').trim() || fallback;
    const message = [
      'Halo Tim Garansi & Servis My Equipment, saya ingin mengajukan layanan servis/perbaikan.',
      `Nama: ${value('name')}`,
      `Nomor WhatsApp: ${value('phone')}`,
      `Produk/Mesin: ${value('product')}`,
      `Keluhan/Kendala: ${value('issue')}`,
      `Lokasi: ${value('location', 'Belum disebutkan')}`,
    ].join('\n');
    const href = waLink(message, whatsapp);
    setWhatsappHref(href);
    setSubmitted(true);
    window.open(href, '_blank', 'noopener,noreferrer');
  }

  return (
    <form className="service-request-form" onSubmit={submit}>
      <label>
        Nama Lengkap
        <input name="name" required placeholder="Masukkan nama lengkap Anda" autoComplete="name" />
      </label>

      <label>
        Nomor WhatsApp
        <input
          name="phone"
          type="tel"
          required
          placeholder="Masukkan nomor WhatsApp aktif"
          autoComplete="tel"
        />
      </label>

      <label>
        Produk / Mesin
        <select name="product" defaultValue="" required>
          <option value="" disabled>
            Pilih produk yang membutuhkan servis
          </option>
          <option>Mesin Cuci Front Load (LG / Samsung / Electrolux)</option>
          <option>Mesin Pengering / Dryer (SpeedQueen / Maytag / Diamante)</option>
          <option>Boiler & Setrika Uap (Nagamoto / Maomoto)</option>
          <option>Meja Setrika Vakum</option>
          <option>Suku Cadang / Sparepart</option>
          <option>Instalasi Pipa & Gas</option>
          <option>Lainnya</option>
        </select>
      </label>

      <label>
        Lokasi / Alamat
        <input name="location" placeholder="Kota atau alamat outlet laundry" />
      </label>

      <label>
        Keluhan & Kendala
        <textarea
          name="issue"
          required
          rows={3}
          placeholder="Jelaskan kendala mesin atau kebutuhan servis secara singkat"
        />
      </label>

      <button className="button button-block" type="submit">
        Kirim Permintaan Servis →
      </button>

      <p className="form-note" aria-live="polite">
        {submitted ? (
          <>
            Pesan servis sudah disiapkan di WhatsApp.{' '}
            <a href={whatsappHref} target="_blank" rel="noreferrer">
              Buka WhatsApp di sini
            </a>
            .
          </>
        ) : (
          'Teknisi My Equipment akan merespons permintaan servis Anda dengan cepat.'
        )}
      </p>
    </form>
  );
}
