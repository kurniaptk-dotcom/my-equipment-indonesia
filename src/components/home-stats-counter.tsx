'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  prefix?: string;
  label: string;
  description: string;
  icon?: string;
}

const statsData: StatItem[] = [
  {
    id: 'packages',
    target: 500,
    suffix: '+',
    label: 'Paket Usaha Dibuat',
    description: 'Unit paket laundry kiloan, koin & komersial terpasang siap pakai.',
    icon: '📦',
  },
  {
    id: 'entrepreneurs',
    target: 1000,
    suffix: '+',
    label: 'Pengusaha Terbantu',
    description: 'Mitra dan pengusaha laundry yang didampingi di seluruh Kalbar.',
    icon: '🤝',
  },
  {
    id: 'regions',
    target: 14,
    suffix: '',
    label: 'Kabupaten & Kota',
    description: 'Cakupan pengiriman unit, teknisi, dan instalasi se-Kalimantan Barat.',
    icon: '📍',
  },
  {
    id: 'profit',
    target: 100,
    suffix: '%',
    label: 'Keuntungan Milik Anda',
    description: 'Sistem kepemilikan mandiri tanpa potongan royalti atau franchise fee.',
    icon: '✨',
  },
];

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export function HomeStatsCounter() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    packages: 0,
    entrepreneurs: 0,
    regions: 0,
    profit: 0,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const instantCounts: { [key: string]: number } = {};
      statsData.forEach((s) => {
        instantCounts[s.id] = s.target;
      });
      setCounts(instantCounts);
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 2000; // ms
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);

            const nextCounts: { [key: string]: number } = {};
            statsData.forEach((item) => {
              nextCounts[item.id] = Math.round(easedProgress * item.target);
            });

            setCounts(nextCounts);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              const finalCounts: { [key: string]: number } = {};
              statsData.forEach((item) => {
                finalCounts[item.id] = item.target;
              });
              setCounts(finalCounts);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <section
      className="home-stats-section wrap"
      aria-label="Pencapaian dan dampak My Equipment Indonesia"
      ref={containerRef}
      data-reveal
    >
      <div className="home-stats-header">
        <span className="eyebrow">REKAM JEJAK & KEPERCAYAAN</span>
        <h2>Tumbuh dan Berkembang Bersama Pengusaha Laundry Kalbar</h2>
        <p>
          Dedikasi kami menghadirkan paket usaha laundry berkualitas tinggi, layanan teknisi responsif, dan pendampingan manajemen berkelanjutan.
        </p>
      </div>

      <div className="home-stats-grid">
        {statsData.map((item) => {
          const currentVal = counts[item.id] ?? 0;
          const displayVal =
            item.target >= 1000
              ? new Intl.NumberFormat('id-ID').format(currentVal)
              : currentVal;

          return (
            <article className="home-stat-card" key={item.id}>
              <div className="home-stat-icon-wrapper" aria-hidden="true">
                <span className="home-stat-icon">{item.icon}</span>
              </div>
              <div className="home-stat-number-wrap">
                <span className="home-stat-number">
                  {displayVal}
                  <span className="home-stat-suffix">{item.suffix}</span>
                </span>
              </div>
              <h3 className="home-stat-label">{item.label}</h3>
              <p className="home-stat-desc">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
