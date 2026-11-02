'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

const SLIDES = [
  {
    src: '/images/hero-3d-podium-only.png',
    alt: 'Paket Usaha Laundry Siap Pakai My Equipment Indonesia - Stack Washer Dryer Komersial',
    is3DShowcase: true,
  },
  {
    src: '/images/hero-showroom.webp',
    alt: 'Showroom resmi dan workshop peralatan laundry My Equipment di Pontianak',
    caption: 'Showroom & Workshop Resmi (Pontianak)',
  },
  {
    src: '/images/case-dinar-outlet.webp',
    alt: 'Instalasi outlet laundry komersial siap pakai mitra My Equipment di Kalimantan Barat',
    caption: 'Instalasi Outlet Mitra Komersial Kalbar',
  },
  {
    src: '/images/case-happy-family-outlet.webp',
    alt: 'Instalasi mesin laundry koin dan kiloan terpasang di Kalimantan Barat',
    caption: 'Instalasi Paket Laundry Koin & Kiloan',
  },
  {
    src: '/images/hero-stacked.webp',
    alt: 'Mesin cuci dan pengering komersial stack washer-dryer heavy duty',
    caption: 'Unit Stack Washer-Dryer Heavy Duty',
  },
];

const AUTOPLAY_DELAY = 5000;

export function HeroProductShowcaseSlider() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const totalSlides = SLIDES.length;

  const goToSlide = useCallback((idx: number) => {
    setCurrentIdx((idx + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    goToSlide(currentIdx - 1);
  }, [currentIdx, goToSlide]);

  const handleNext = useCallback(() => {
    goToSlide(currentIdx + 1);
  }, [currentIdx, goToSlide]);

  // Autoplay
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToSlide(currentIdx + 1);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [currentIdx, isPaused, goToSlide]);

  // Mobile Touch Handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchEndX.current = null;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="hero-showcase-wrapper"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="Showcase produk dan paket usaha laundry My Equipment"
      role="region"
    >
      {/* Visual Slider Frame */}
      <div className="hero-showcase-frame">
        <div
          className="hero-showcase-track"
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}
        >
          {SLIDES.map((slide, idx) => (
            <div key={slide.src} className="hero-showcase-slide">
              <div className="hero-showcase-img-wrap">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={idx === 0}
                  sizes="(max-width: 900px) 100vw, 550px"
                  className={slide.is3DShowcase ? 'hero-showcase-img-contain' : 'hero-showcase-img-cover'}
                />
              </div>
              {slide.caption && (
                <div className="hero-showcase-caption">
                  <span>{slide.caption}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Clean Bottom Controls: <  ● ○ ○ ○  > */}
      <div className="hero-showcase-controls" aria-label="Navigasi showcase produk">
        <button
          type="button"
          className="hero-ctrl-btn hero-ctrl-prev"
          onClick={handlePrev}
          aria-label="Lihat slide sebelumnya"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div className="hero-ctrl-dots" role="tablist">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === currentIdx}
              aria-label={`Slide ${idx + 1}`}
              className={`hero-ctrl-dot ${idx === currentIdx ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>

        <button
          type="button"
          className="hero-ctrl-btn hero-ctrl-next"
          onClick={handleNext}
          aria-label="Lihat slide berikutnya"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
