'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

const SLIDES = [
  {
    src: '/images/hero-showroom.webp',
    alt: 'Showroom resmi peralatan laundry My Equipment Indonesia',
  },
  {
    src: '/images/case-atma-outlet.webp',
    alt: 'Instalasi outlet laundry modern mitra My Equipment di Kalimantan Barat',
  },
  {
    src: '/images/case-dinar-outlet.webp',
    alt: 'Outlet laundry komersial siap pakai mitra My Equipment',
  },
  {
    src: '/images/case-happy-family-outlet.webp',
    alt: 'Instalasi mesin laundry koin dan kiloan terpasang di Kalimantan Barat',
  },
  {
    src: '/images/hero-stacked.webp',
    alt: 'Mesin cuci dan pengering komersial stack washer-dryer',
  },
];

const AUTOPLAY_DELAY = 4500;

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

  // Autoplay timer
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      goToSlide(currentIdx + 1);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(timer);
  }, [currentIdx, isPaused, goToSlide]);

  // Mobile Touch Swipe Handlers
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
      className="hero-slider-container"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="Slider foto peralatan dan showroom My Equipment"
      role="region"
    >
      <div className="hero-slider-frame">
        {/* Track with smooth slide */}
        <div
          className="hero-slider-track"
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}
        >
          {SLIDES.map((slide, idx) => (
            <div key={slide.src} className="hero-slide-item">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={idx === 0}
                sizes="(max-width: 900px) 100vw, 50vw"
                className="hero-slide-img"
              />
            </div>
          ))}
        </div>

        {/* Minimal Navigation Arrows */}
        <button
          type="button"
          className="hero-slider-arrow hero-slider-prev"
          onClick={handlePrev}
          aria-label="Foto sebelumnya"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          type="button"
          className="hero-slider-arrow hero-slider-next"
          onClick={handleNext}
          aria-label="Foto berikutnya"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Minimal Indicator Dots */}
        <div className="hero-slider-dots" role="tablist" aria-label="Navigasi slide foto">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === currentIdx}
              aria-label={`Lihat foto ${idx + 1}`}
              className={`hero-slider-dot ${idx === currentIdx ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
