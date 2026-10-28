'use client';

import { useEffect, useRef, useState } from 'react';
import { waLink } from '@/data/catalog';

type PackageOption = { name: string; price: string };

const businessTypes = [
  'Laundry kiloan',
  'Laundry self service',
  'Laundry sepatu atau helm',
  'Usaha cleaning',
  'Lainnya',
];

const budgetOptions = [
  'Di bawah Rp 25 juta',
  'Rp 25-50 juta',
  'Rp 50-100 juta',
  'Lebih dari Rp 100 juta',
  'Belum ditentukan',
];

export function PackageConsultationGuide({ packages, whatsapp }: { packages: PackageOption[]; whatsapp: string }) {
  const [step, setStep] = useState(0);
  const [businessType, setBusinessType] = useState('');
  const [budget, setBudget] = useState('');
  const [packageName, setPackageName] = useState('');
  const [location, setLocation] = useState('');
  const [needs, setNeeds] = useState('');
  const [error, setError] = useState('');
  const businessTypeRef = useRef<HTMLSelectElement>(null);
  const budgetRef = useRef<HTMLSelectElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    stepHeadingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const message = [
    'Halo My Equipment, saya ingin konsultasi paket usaha laundry.',
    `Jenis usaha: ${businessType}`,
    `Anggaran: ${budget}`,
    `Paket yang ingin ditanyakan: ${packageName || 'Belum memilih'}`,
    `Lokasi usaha: ${location.trim() || 'Belum ditentukan'}`,
    `Kebutuhan: ${needs.trim() || 'Belum dirinci'}`,
    'Sumber: panduan paket usaha My Equipment.',
  ].join('\n');

  function nextStep() {
    if (step === 0 && (!businessType || !budget)) {
      setError('Pilih jenis usaha dan kisaran anggaran untuk melanjutkan.');
      if (!businessType) businessTypeRef.current?.focus();
      else budgetRef.current?.focus();
      return;
    }
    setError('');
    setStep((current) => Math.min(2, current + 1));
  }

  function previousStep() {
    setError('');
    setStep((current) => Math.max(0, current - 1));
  }

  function resetGuide() {
    setStep(0);
    setBusinessType('');
    setBudget('');
    setPackageName('');
    setLocation('');
    setNeeds('');
    setError('');
    businessTypeRef.current?.focus();
  }

  return <section className="package-guide" id="panduan" aria-labelledby="package-guide-title" data-testid="package-guide">
    <header className="package-guide-heading">
      <div>
        <span className="eyebrow">Panduan konsultasi</span>
        <h2 id="package-guide-title">Bantu tim memahami rencana Anda.</h2>
        <p>Isi beberapa hal yang ingin dibahas. Kami siapkan draf pesan untuk Anda tinjau sebelum membuka WhatsApp.</p>
      </div>
      <span className="package-guide-badge" aria-hidden="true">ME</span>
    </header>

    <ol className="package-guide-progress" aria-label="Langkah panduan konsultasi">
      {['Profil usaha', 'Kebutuhan', 'Tinjau draf'].map((label, index) => <li key={label} aria-current={step === index ? 'step' : undefined} className={step === index ? 'is-current' : step > index ? 'is-complete' : ''}>
        <span>{step > index ? '✓' : index + 1}</span><b>{label}</b>
      </li>)}
    </ol>

    <div className="package-guide-panel" role="group" aria-labelledby={`package-guide-step-${step}`}>
      <div className="package-guide-step-heading" aria-live="polite">
        <span>Langkah {step + 1} dari 3</span>
        <h3 ref={stepHeadingRef} id={`package-guide-step-${step}`} tabIndex={-1}>{['Ceritakan rencana usaha', 'Apa yang ingin dibahas?', 'Periksa draf konsultasi'][step]}</h3>
      </div>

      {step === 0 && <div className="package-guide-fields">
        <label><span className="package-guide-label-title">Jenis usaha <b aria-hidden="true">*</b></span>
          <select ref={businessTypeRef} value={businessType} aria-invalid={Boolean(error && !businessType)} aria-describedby={error && !businessType ? 'package-guide-error' : undefined} onChange={(event) => { setBusinessType(event.target.value); setError(''); }}>
            <option value="">Pilih jenis usaha</option>
            {businessTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </label>
        <label><span className="package-guide-label-title">Perkiraan anggaran <b aria-hidden="true">*</b></span>
          <select ref={budgetRef} value={budget} aria-invalid={Boolean(error && !budget)} aria-describedby={error && !budget ? 'package-guide-error' : undefined} onChange={(event) => { setBudget(event.target.value); setError(''); }}>
            <option value="">Pilih kisaran anggaran</option>
            {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label className="package-guide-field-wide"><span className="package-guide-label-title">Paket yang ingin ditanyakan <small>Opsional</small></span>
          <select value={packageName} onChange={(event) => setPackageName(event.target.value)}>
            <option value="">Belum memilih paket</option>
            {packages.map((option) => <option key={option.name} value={option.name}>Paket {option.name}</option>)}
          </select>
        </label>
        {error && <p className="package-guide-error" id="package-guide-error" role="alert">{error}</p>}
      </div>}

      {step === 1 && <div className="package-guide-fields">
        <label><span className="package-guide-label-title">Lokasi usaha <small>Opsional</small></span>
          <input value={location} maxLength={100} autoComplete="address-level2" placeholder="Kota atau kabupaten" onChange={(event) => setLocation(event.target.value)} />
        </label>
        <label className="package-guide-field-wide"><span className="package-guide-label-title">Kebutuhan yang ingin didiskusikan <small>Opsional</small></span>
          <textarea value={needs} maxLength={500} rows={4} placeholder="Contoh: ingin mengetahui kebutuhan mesin cuci dan pengering untuk rencana usaha saya." onChange={(event) => setNeeds(event.target.value)} />
          <span className="package-guide-character-count">{needs.length}/500 karakter</span>
        </label>
      </div>}

      {step === 2 && <div className="package-guide-review">
        <dl>
          <div><dt>Jenis usaha</dt><dd>{businessType}</dd></div>
          <div><dt>Anggaran</dt><dd>{budget}</dd></div>
          <div><dt>Paket</dt><dd>{packageName ? `Paket ${packageName}` : 'Belum memilih'}</dd></div>
          <div><dt>Lokasi</dt><dd>{location.trim() || 'Belum ditentukan'}</dd></div>
          <div><dt>Kebutuhan</dt><dd>{needs.trim() || 'Belum dirinci'}</dd></div>
        </dl>
        <div className="package-guide-message" aria-label="Pratinjau pesan WhatsApp">{message}</div>
        <p className="package-guide-privacy">Pesan hanya dibuka setelah Anda menekan tombol. Anda bisa meninjau dan mengeditnya di WhatsApp sebelum mengirim.</p>
      </div>}

      <div className="package-guide-actions">
        {step > 0 ? <button type="button" className="button button-outline" onClick={previousStep}>Kembali</button> : <span className="package-guide-required-note">* Wajib dipilih</span>}
        {step < 2 ? <button type="button" className="button" onClick={nextStep}>{step === 1 ? 'Tinjau draf' : 'Lanjutkan'} <span aria-hidden="true">→</span></button> : <div className="package-guide-final-actions"><button type="button" className="package-guide-reset" onClick={resetGuide}>Ubah dari awal</button><a className="button" data-testid="package-guide-whatsapp" href={waLink(message, whatsapp)} target="_blank" rel="noreferrer">Buka draf di WhatsApp <span aria-hidden="true">↗</span></a></div>}
      </div>
    </div>
  </section>;
}
