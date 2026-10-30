'use client';

import { useEffect, useRef, useState } from 'react';

interface StatItem {
  id: string;
  target: number;
  suffix: string;
  label: string;
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
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  return (
    <section
      className="home-stats-glass-section wrap"
      aria-label="Pencapaian dan dampak My Equipment Indonesia"
      ref={containerRef}
      data-reveal
    >
      <div className="home-stats-glass-grid">
        {statsData.map((item) => {
          const currentVal = counts[item.id] ?? 0;
          const displayVal =
            item.target >= 1000
              ? new Intl.NumberFormat('id-ID').format(currentVal)
              : currentVal;

          return (
            <div className="home-stats-glass-item" key={item.id}>
              <div className="home-stats-glass-number-wrap">
                <span className="home-stats-glass-number">
                  {displayVal}
                  <span className="home-stats-glass-suffix">{item.suffix}</span>
                </span>
              </div>
              <div className="home-stats-glass-label">{item.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
