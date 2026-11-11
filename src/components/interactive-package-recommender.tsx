'use client';

import { useState } from 'react';
import Link from 'next/link';
import { waLink } from '@/data/catalog';

interface RecommenderProps {
  whatsapp: string;
}

interface QuestionStep {
  id: number;
  question: string;
  options: {
    label: string;
    desc: string;
    value: string;
  }[];
}

const STEPS: QuestionStep[] = [
  {
    id: 1,
    question: 'Berapa perkiraan alokasi modal usaha yang Anda siapkan?',
    options: [
      { label: 'Rp 15 Juta – Rp 25 Juta', desc: 'Mulai rintisan awal laundry rumahan / kiloan hemat daya', value: 'pemula' },
      { label: 'Rp 26 Juta – Rp 45 Juta', desc: 'Ruko komersial siap ramai (dual-line washer & dryer gas)', value: 'komersial' },
      { label: 'Di atas Rp 50 Juta', desc: 'Laundromat koin modern / kapasitas besar instansi & mess', value: 'laundromat' },
    ],
  },
  {
    id: 2,
    question: 'Di mana rencana lokasi atau target pasar laundry Anda?',
    options: [
      { label: 'Area Perumahan & Pemukiman Padat', desc: 'Dominasi cucian kiloan harian keluarga & sprei', value: 'perumahan' },
      { label: 'Kawasan Kampus, Kos-Kosan, atau Karyawan', desc: 'Butuh sistem cepat express 60 menit atau koin self-service', value: 'kampus' },
      { label: 'Daerah Perkebunan Sawit / Tambang / Instansi', desc: 'Butuh mesin heavy-duty wearpack & kapasitas borongan', value: 'b2b' },
    ],
  },
  {
    id: 3,
    question: 'Berapa kapasitas daya listrik PLN yang tersedia di lokasi?',
    options: [
      { label: '900 VA s/d 1.300 VA (Standar)', desc: 'Wajib gunakan mesin pengering gas LPG hemat 150 Watt', value: 'listrik-rendah' },
      { label: '2.200 VA s/d 3.500 VA (Sedang)', desc: 'Cukup leluasa untuk beberapa mesin cuci front load + dryer gas', value: 'listrik-sedang' },
      { label: '4.400 VA ke atas (Besar / 3-Phase)', desc: 'Siap untuk ekspansi skala industri atau banyak unit stack', value: 'listrik-besar' },
    ],
  },
];

export function InteractivePackageRecommender({ whatsapp }: RecommenderProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{
    packageName: string;
    price: string;
    desc: string;
    features: string[];
    waMessage: string;
  } | null>(null);

  const handleSelect = (val: string) => {
    const nextAnswers = { ...answers, [currentStep]: val };
    setAnswers(nextAnswers);

    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate Recommendation
      const modal = nextAnswers[0];
      const pasar = nextAnswers[1];
      const listrik = nextAnswers[2];

      if (modal === 'pemula') {
        setResult({
          packageName: 'Paket Pra-Starting Komersial',
          price: 'Mulai Rp 16,5 Juta',
          desc: 'Kombinasi ideal bagi pemula: 1 Washer Front Loading + 1 Dryer Konversi Gas LPG (hanya 150 Watt) + Boiler Setrika Uap tanpa takut jeglek.',
          features: [
            'Hemat daya listrik PLN (bisa untuk daya 900-1300 VA)',
            'Kering 100% tanpa jemur terik matahari',
            '100% Usaha Mandiri tanpa potongan royalti',
            'Gratis ongkir armada & instalasi teknisi Kalbar',
          ],
          waMessage: `Halo My Equipment Indonesia, saya telah mencoba Kuis Rekomendasi Paket di website. Rekomendasi saya adalah Paket Pra-Starting (Rp 16,5 Jt). Mohon info ketersediaan unit dan jadwal survei teknisi.`,
        });
      } else if (modal === 'laundromat' || pasar === 'b2b') {
        setResult({
          packageName: 'Paket Laundromat Koin / Komersial Stack Heavy-Duty',
          price: 'Rp 68 Juta – Rp 135 Juta',
          desc: 'Solusi mesin tumpuk (stack) Speed Queen / Maytag komersial dengan sistem pembayaran koin / QRIS otomatis atau kebutuhan cucian borongan instansi.',
          features: [
            'Sistem autopilot minim risiko karyawan',
            'Sangat diminati mahasiswa & mess karyawan sawit/tambang',
            'Plumbing central & manifold gas SNI',
            'Jaminan spare part ready stock & teknisi lokal',
          ],
          waMessage: `Halo My Equipment Indonesia, saya tertarik dengan Paket Laundromat / Komersial Stack dari hasil kuis website. Mohon kirimkan proposal teknis dan rincian mesinnya.`,
        });
      } else {
        setResult({
          packageName: 'Paket Starting Komersial Dual-Line',
          price: 'Mulai Rp 26,5 Juta – Rp 38,5 Juta',
          desc: 'Pilihan paling populer bagi ruko laundry: 2 Washer Commercial + 2 Dryer Konversi Gas LPG + Boiler Setrika Uap 15L untuk kapasitas 60–100 kg/hari.',
          features: [
            'Alur kerja dual-line bebas antrean cucian',
            'Estimasi BEP balik modal cepat dalam 3–5 bulan',
            'HPP operasional sangat hemat Rp 1.300/kg',
            'Gratis pelatihan SOP dan manajemen bisnis sampai mahir',
          ],
          waMessage: `Halo My Equipment Indonesia, hasil kuis website merekomendasikan Paket Starting Dual-Line (26,5 Jt - 38,5 Jt). Saya ingin konsultasi jadwal survei ruko saya.`,
        });
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <section className="wrap recommender-section" aria-label="Kuis Rekomendasi Paket Laundry 30 Detik" data-reveal>
      <div className="recommender-header">
        <div className="recommender-badge">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polygon points="12 6 12 12 16 14" />
          </svg>
          <span>SIMULASI CEPAT 30 DETIK</span>
        </div>
        <h2 className="recommender-title">
          Bingung Pilih Paket? Cari Tahu Setup Mesin yang Paling Pas untuk Anda
        </h2>
        <p className="recommender-subtitle">
          Jawab 3 pertanyaan praktis berikut untuk menemukan rekomendasi mesin cuci, pengering, dan estimasi modal yang paling efisien sesuai anggaran Anda.
        </p>
      </div>

      <div className="recommender-card">
        {!result ? (
          <div>
            <div className="recommender-progress-bar">
              <div
                className="recommender-progress-fill"
                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              />
            </div>
            <div className="recommender-step-count">
              Langkah {currentStep + 1} dari {STEPS.length}
            </div>
            <h3 className="recommender-question">{STEPS[currentStep].question}</h3>

            <div className="recommender-options-grid">
              {STEPS[currentStep].options.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  className="recommender-option-btn"
                  onClick={() => handleSelect(opt.value)}
                >
                  <div className="recommender-opt-radio" aria-hidden="true" />
                  <div className="recommender-opt-body">
                    <span className="recommender-opt-label">{opt.label}</span>
                    <span className="recommender-opt-desc">{opt.desc}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="recommender-result-view">
            <div className="recommender-result-top">
              <span className="recommender-result-chip">REKOMENDASI TERBAIK UNTUK ANDA</span>
              <h3 className="recommender-result-name">{result.packageName}</h3>
              <div className="recommender-result-price">{result.price}</div>
            </div>

            <p className="recommender-result-desc">{result.desc}</p>

            <div className="recommender-result-features">
              <b>Keunggulan Setup Ini:</b>
              <ul>
                {result.features.map((feat) => (
                  <li key={feat}>
                    <span aria-hidden="true">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="recommender-result-actions">
              <a
                href={waLink(result.waMessage, whatsapp)}
                target="_blank"
                rel="noreferrer"
                className="button button-primary"
              >
                <span>Konsultasikan Paket Ini via WhatsApp</span>
                <span aria-hidden="true">→</span>
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="button button-outline"
              >
                <span>Ulangi Kuis</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
