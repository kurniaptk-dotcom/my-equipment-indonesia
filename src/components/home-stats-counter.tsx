'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
  sublabel?: string;
}

const statsData: StatItem[] = [
  {
    id: 'packages',
    target: 500,
    suffix: '+',
    label: 'Paket Usaha Dibuat',
  },
  {
    id: 'entrepreneurs',
    target: 1000,
    suffix: '+',
    label: 'Pengusaha Terbantu',
  },
  {
    id: 'regions',
    target: 14,
    suffix: '',
    label: 'Kota Terjangkau',
    sublabel: 'se-Kalimantan Barat',
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
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

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
          const duration = 2000;
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <section
      className="home-stats-banner-section wrap"
      aria-label="Pencapaian dan dampak My Equipment Indonesia"
      ref={containerRef}
      data-reveal
    >
      <div className="home-stats-banner-card">
        {statsData.map((item, idx) => {
          const currentVal = counts[item.id] ?? 0;
          const displayVal =
            item.target >= 1000
              ? new Intl.NumberFormat('id-ID').format(currentVal)
              : currentVal;

          return (
            <div className="home-stats-banner-item" key={item.id}>
              {/* Icon Circle */}
              <div className="home-stats-banner-icon" aria-hidden="true">
                {idx === 0 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m7.5 4.27 9 5.15M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
                    <path d="m3.3 7 8.7 5 8.7-5M12 22V12" />
                  </svg>
                )}
                {idx === 1 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )}
                {idx === 2 && (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                )}
              </div>

              {/* Number and Label Wrap */}
              <div className="home-stats-banner-text">
                <div className="home-stats-banner-number">
                  {displayVal}
                  <span className="home-stats-banner-suffix">{item.suffix}</span>
                </div>
                <div className="home-stats-banner-label">
                  {item.label}
                  {item.sublabel && <small className="home-stats-banner-sub">{item.sublabel}</small>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
