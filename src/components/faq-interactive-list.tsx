'use client';

import { useState } from 'react';
import Link from 'next/link';
import { waLink } from '@/data/catalog';
import type { CmsFaq } from '@/lib/content';

type Props = {
  questions: CmsFaq[];
  whatsapp: string;
};

const topicCategories = [
  { id: 'all', label: 'Semua Pertanyaan', icon: '📋' },
  { id: 'pembelian', label: 'Pembelian', icon: '🛒' },
  { id: 'produk', label: 'Produk & Spesifikasi', icon: '🧺' },
  { id: 'paket-usaha', label: 'Paket Usaha', icon: '📦' },
  { id: 'pengiriman', label: 'Pengiriman', icon: '🚚' },
  { id: 'garansi', label: 'Garansi & Servis', icon: '🛡️' },
  { id: 'pembayaran', label: 'Pembayaran', icon: '💳' },
  { id: 'konsultasi', label: 'Konsultasi', icon: '💬' },
  { id: 'lainnya', label: 'Lainnya', icon: 'ℹ️' },
] as const;

export function FaqInteractiveList({ questions, whatsapp }: Props) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredQuestions = questions.filter((item) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (activeCategory === 'all') return true;
    if (activeCategory === 'pembelian') {
      return /beli|transaksi|toko|pesan|order/i.test(item.question + item.answer);
    }
    if (activeCategory === 'produk') {
      return /produk|mesin|spesifikasi|dryer|washer|daya|listrik/i.test(item.question + item.answer);
    }
    if (activeCategory === 'paket-usaha') {
      return /paket|usaha|modal|pemula|kiloan/i.test(item.question + item.answer);
    }
    if (activeCategory === 'pengiriman') {
      return /kirim|ekspedisi|ongkir|luar kota|kalbar/i.test(item.question + item.answer);
    }
    if (activeCategory === 'garansi') {
      return /garansi|servis|rusak|teknisi|suku cadang/i.test(item.question + item.answer);
    }
    if (activeCategory === 'pembayaran') {
      return /bayar|transfer|tempo|cicil|rekening/i.test(item.question + item.answer);
    }
    if (activeCategory === 'konsultasi') {
      return /konsultasi|tanya|hubungi|whatsapp|survei/i.test(item.question + item.answer);
    }
    return true;
  });

  return (
    <div className="faq-interactive-wrapper">
      {/* Search Bar Header */}
      <div className="faq-search-container">
        <div className="faq-search-box">
          <svg
            className="faq-search-icon"
            viewBox="0 0 24 24"
            width="20"
            height="20"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pertanyaan seputar mesin, garansi, pengiriman..."
            aria-label="Cari pertanyaan"
          />
          {searchQuery && (
            <button
              type="button"
              className="faq-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* 2-Column Layout */}
      <div className="faq-split-layout">
        {/* Left Column: Topics Sidebar */}
        <aside className="faq-sidebar-nav" aria-label="Kategori Pertanyaan">
          <span className="faq-sidebar-title">Kategori Topik</span>
          <div className="faq-nav-list" role="tablist">
            {topicCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`faq-nav-btn${isActive ? ' is-active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="faq-nav-icon" aria-hidden="true">
                    {cat.icon}
                  </span>
                  <span className="faq-nav-label">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Right Column: Accordion Questions */}
        <div className="faq-content-column">
          <div className="faq-list" aria-label="Daftar pertanyaan">
            {filteredQuestions.length ? (
              filteredQuestions.map((item) => (
                <details className="faq-item" key={item.id}>
                  <summary>
                    <span>{item.question}</span>
                    <span className="faq-chevron" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="faq-answer-body">
                    <p>{item.answer}</p>
                    {item.href && (
                      <Link
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                        className="faq-related-link"
                      >
                        Lihat informasi terkait <span aria-hidden="true">→</span>
                      </Link>
                    )}
                  </div>
                </details>
              ))
            ) : (
              <div className="faq-no-results">
                <h3>Pertanyaan tidak ditemukan</h3>
                <p>
                  Belum ada jawaban untuk kata kunci <b>"{searchQuery}"</b>. Silakan tanyakan langsung kepada konsultan kami via WhatsApp.
                </p>
                <Link
                  className="button"
                  href={waLink(`Halo My Equipment, saya ingin bertanya tentang: ${searchQuery}`, whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Tanyakan via WhatsApp ↗
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

