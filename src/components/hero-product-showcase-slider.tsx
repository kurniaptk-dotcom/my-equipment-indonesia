'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export interface HeroSlide {
  id: string;
  badge: string;
  title: string;
  description: string;
  specs: string[];
  image: string;
  alt: string;
  href: string;
  ctaText: string;
  tabLabel: string;
  tabIcon: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'showroom',
    badge: 'Showroom Resmi Kalbar',
    title: 'Showroom & Unit Siap Uji Coba',
    description: 'Kunjungi showroom kami di Pontianak & Singkawang untuk melihat dan mencoba mesin secara langsung.',
    specs: ['Ready Stock', 'Garansi Resmi', 'Teknisi Standby'],
    image: '/images/hero-showroom.webp',
    alt: 'Showroom resmi peralatan laundry My Equipment di Kalimantan Barat',
    href: '/kontak',
    ctaText: 'Kunjungi Showroom',
    tabLabel: 'Showroom',
    tabIcon: '📍',
  },
  {
    id: 'washer',
    badge: 'Mesin Cuci Komersial',
    title: 'Commercial Front Loading Washer',
    description: 'Kapasitas 8–20 kg drum stainless tebal, hemat air & listrik, tangguh untuk ratusan siklus cuci harian.',
    specs: ['Heavy Duty Drum', 'Inverter Hemat', 'Anti Getar'],
    image: '/images/washer-lg-8kg.jpg',
    alt: 'Mesin cuci komersial heavy duty front loading',
    href: '/produk',
    ctaText: 'Lihat Mesin Cuci',
    tabLabel: 'Mesin Cuci',
    tabIcon: '⚡',
  },
  {
    id: 'dryer',
    badge: 'Dryer Konversi Gas Cepat Kering',
    title: 'Speed Queen & Commercial Dryer',
    description: 'Pengeringan ekstra cepat 35–45 menit. Pakaian kering 100% tanpa bau apek saat musim hujan.',
    specs: ['Kering 100%', 'Konversi Gas Aman', '10.5–15 Kg'],
    image: '/images/dryer-speedqueen.webp',
    alt: 'Mesin pengering komersial Speed Queen',
    href: '/produk',
    ctaText: 'Lihat Pengering',
    tabLabel: 'Dryer Gas',
    tabIcon: '🔥',
  },
  {
    id: 'outlet',
    badge: 'Instalasi Mitra Kalbar',
    title: 'Paket Usaha Siap Buka & Beroperasi',
    description: 'Terpasang rapi oleh teknisi berpengalaman, lengkap dengan instalasi plumbing, gas & training operasional.',
    specs: ['Bebas Franchise', 'Plumbing Tuntas', '100% Milik Anda'],
    image: '/images/case-atma-outlet.webp',
    alt: 'Instalasi outlet paket usaha laundry mitra di Kalimantan Barat',
    href: '/inspirasi',
    ctaText: 'Lihat Portofolio',
    tabLabel: 'Mitra Kalbar',
    tabIcon: '✨',
  },
];

const AUTOPLAY_INTERVAL = 5500;

export function HeroProductShowcaseSlider() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = HERO_SLIDES.length;

  const goToSlide = useCallback((idx: number) => {
    setCurrentIdx((idx + totalSlides) % totalSlides);
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    goToSlide(currentIdx - 1);
  }, [currentIdx, goToSlide]);

  const handleNext = useCallback(() => {
    goToSlide(currentIdx + 1);
  }, [currentIdx, goToSlide]);

  // Autoplay timer with pause-on-hover / pause-on-focus (WCAG compliance)
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToSlide(currentIdx + 1);
    }, AUTOPLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIdx, isPaused, goToSlide]);

  // Touch Swipe Handlers for Mobile Ergonomics
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setTouchEndX(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 45;

    if (distance > minSwipeDistance) {
      handleNext();
    } else if (distance < -minSwipeDistance) {
      handlePrev();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div
      className="hero-slider-card"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      aria-label="Showcase produk dan showroom My Equipment Indonesia"
      role="region"
    >
      <div
        className="hero-slider-viewport"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top Status & Counter Bar */}
        <div className="hero-slider-top-bar" aria-hidden="true">
          <div className="hero-live-pill">
            <span className="hero-live-dot" />
            <span>SHOWCASE PRODUK & SHOWROOM</span>
          </div>
          <div className="hero-counter-badge">
            <b>{String(currentIdx + 1).padStart(2, '0')}</b> / {String(totalSlides).padStart(2, '0')}
          </div>
        </div>

        {/* Slider Track */}
        <div
          className="hero-slider-track"
          style={{ transform: `translateX(-${currentIdx * 100}%)` }}
        >
          {HERO_SLIDES.map((slide, idx) => {
            const isActive = idx === currentIdx;

            return (
              <div
                key={slide.id}
                className={`hero-slide-item ${isActive ? 'is-active' : ''}`}
                aria-hidden={!isActive}
              >
                <div className="hero-slide-img-wrap">
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    fill
                    priority={idx === 0}
                    sizes="(max-width: 900px) 100vw, 50vw"
                    className="hero-slide-img"
                  />
                </div>

                <div className="hero-slide-vignette" />

                {/* Frosted Glass Meta Card */}
                <div className="hero-slide-meta-card">
                  <div className="hero-meta-header">
                    <span className="hero-meta-tag">
                      <span className="hero-meta-tag-icon">{slide.tabIcon}</span>
                      <span>{slide.badge}</span>
                    </span>
                  </div>

                  <h3 className="hero-meta-title">{slide.title}</h3>
                  <p className="hero-meta-desc">{slide.description}</p>

                  <div className="hero-meta-footer">
                    <div className="hero-specs-list" aria-label="Spesifikasi unggulan">
                      {slide.specs.map(spec => (
                        <span key={spec} className="hero-spec-chip">
                          {spec}
                        </span>
                      ))}
                    </div>

                    <Link href={slide.href} className="hero-slide-cta-btn">
                      <span>{slide.ctaText}</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Arrows (Visible on Desktop) */}
        <button
          type="button"
          className="hero-nav-arrow hero-nav-prev"
          onClick={handlePrev}
          aria-label="Slide sebelumnya"
        >
          ‹
        </button>
        <button
          type="button"
          className="hero-nav-arrow hero-nav-next"
          onClick={handleNext}
          aria-label="Slide berikutnya"
        >
          ›
        </button>
      </div>

      {/* Bottom Interactive Category Tabs with Progress Bars */}
      <div className="hero-slider-tabs" role="tablist" aria-label="Kategori showcase">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentIdx;

          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`hero-slider-tab-btn ${isActive ? 'active' : ''}`}
              onClick={() => goToSlide(idx)}
            >
              <span className="hero-tab-title">
                <span className="hero-tab-icon">{slide.tabIcon}</span> {slide.tabLabel}
              </span>
              <div className="hero-tab-progress-track">
                <div
                  className={`hero-tab-progress-bar ${isActive && !isPaused ? 'is-animating' : ''}`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

