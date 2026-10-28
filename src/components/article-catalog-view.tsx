'use client';

import { useId, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { CmsArticle } from '@/lib/content';

interface ArticleCatalogViewProps {
  articles: CmsArticle[];
  initialCategory?: string;
}

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 180));
  return `${minutes} mnt baca`;
}

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  return new Intl.DateTimeFormat('id-ID', { dateStyle: 'long', timeZone: 'UTC' }).format(
    new Date(`${dateStr.slice(0, 10)}T00:00:00Z`)
  );
}

export function ArticleCatalogView({ articles, initialCategory }: ArticleCatalogViewProps) {
  const searchInputId = useId();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'article' | 'activity'>(
    initialCategory === 'kegiatan' ? 'activity' : initialCategory === 'artikel' ? 'article' : 'all'
  );

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Category filter
      if (activeCategory !== 'all' && article.type !== activeCategory) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = article.title.toLowerCase().includes(query);
        const matchesExcerpt = article.excerpt?.toLowerCase().includes(query) ?? false;
        const matchesContent = article.contentMarkdown.toLowerCase().includes(query);
        return matchesTitle || matchesExcerpt || matchesContent;
      }
      return true;
    });
  }, [articles, activeCategory, searchQuery]);

  // Featured article: the first item when in default all view with no search
  const isDefaultView = activeCategory === 'all' && !searchQuery.trim();
  const featuredArticle = isDefaultView && filteredArticles.length > 0 ? filteredArticles[0] : null;
  const gridArticles = featuredArticle ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="article-catalog-container">
      {/* Search & Category Filter Toolbar */}
      <div className="article-toolbar">
        <div className="article-search-box">
          <svg className="article-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            id={searchInputId}
            type="search"
            aria-label="Cari artikel atau panduan"
            placeholder="Cari panduan, mesin, modal, atau SOP laundry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="article-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="article-search-clear"
              aria-label="Hapus pencarian"
            >
              ✕
            </button>
          )}
        </div>

        <nav className="article-filter-chips" aria-label="Filter kategori artikel">
          <button
            type="button"
            className={`article-filter-chip ${activeCategory === 'all' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('all')}
            aria-pressed={activeCategory === 'all'}
          >
            Semua
            <span className="chip-badge">{articles.length}</span>
          </button>
          <button
            type="button"
            className={`article-filter-chip ${activeCategory === 'article' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('article')}
            aria-pressed={activeCategory === 'article'}
          >
            Panduan Bisnis & Tips
            <span className="chip-badge">{articles.filter((a) => a.type === 'article').length}</span>
          </button>
          <button
            type="button"
            className={`article-filter-chip ${activeCategory === 'activity' ? 'is-active' : ''}`}
            onClick={() => setActiveCategory('activity')}
            aria-pressed={activeCategory === 'activity'}
          >
            Dokumentasi Kegiatan
            <span className="chip-badge">{articles.filter((a) => a.type === 'activity').length}</span>
          </button>
        </nav>
      </div>

      {/* Featured Spotlight Card */}
      {featuredArticle && (
        <section className="article-spotlight" aria-label="Artikel pilihan utama">
          <Link href={`/artikel/${featuredArticle.slug}`} className="article-spotlight-link">
            <div className="article-spotlight-media">
              {featuredArticle.coverImage ? (
                <Image
                  src={featuredArticle.coverImage}
                  alt={featuredArticle.coverAlt || featuredArticle.title}
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 620px"
                  className="article-spotlight-img"
                />
              ) : (
                <div className="article-spotlight-placeholder">
                  <span>ME</span>
                </div>
              )}
              <span className="article-spotlight-badge">★ Panduan Utama</span>
            </div>

            <div className="article-spotlight-body">
              <div className="article-meta-row">
                <span className="article-type-tag">
                  {featuredArticle.type === 'activity' ? 'Dokumentasi' : 'Panduan Bisnis'}
                </span>
                <span className="article-reading-time">
                  ⏱ {calculateReadingTime(featuredArticle.contentMarkdown)}
                </span>
                {featuredArticle.publishedAt && (
                  <time dateTime={featuredArticle.publishedAt} className="article-meta-date">
                    {formatDate(featuredArticle.publishedAt)}
                  </time>
                )}
              </div>

              <h2 className="article-spotlight-title">{featuredArticle.title}</h2>
              <p className="article-spotlight-excerpt">{featuredArticle.excerpt}</p>

              <div className="article-spotlight-footer">
                <div className="article-author-meta">
                  <div className="author-avatar" aria-hidden="true">ME</div>
                  <div>
                    <span className="author-name">Tim Teknis My Equipment</span>
                    <span className="author-role">Pusat Edukasi Laundry Kalbar</span>
                  </div>
                </div>
                <span className="article-cta-btn">
                  Baca Panduan Lengkap <span aria-hidden="true">→</span>
                </span>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Articles 3-Column Grid */}
      {gridArticles.length > 0 ? (
        <section className="article-grid-section" aria-label="Daftar artikel dan panduan">
          {searchQuery.trim() && (
            <p className="article-search-count">
              Menampilkan {filteredArticles.length} artikel untuk pencarian &ldquo;{searchQuery}&rdquo;
            </p>
          )}

          <div className="article-card-grid">
            {gridArticles.map((article) => (
              <article className="article-card article-card-modern" key={article.id}>
                <Link href={`/artikel/${article.slug}`} className="article-card-link">
                  <div className="article-card-image">
                    {article.coverImage ? (
                      <Image
                        src={article.coverImage}
                        alt={article.coverAlt || article.title}
                        fill
                        sizes="(max-width:700px) 100vw, (max-width:1000px) 50vw, 33vw"
                        className="article-card-img"
                      />
                    ) : (
                      <div className="article-card-placeholder" aria-hidden="true">
                        <span>ME</span>
                      </div>
                    )}
                    <span className="article-badge-overlay">
                      {article.type === 'activity' ? 'Kegiatan' : 'Panduan'}
                    </span>
                  </div>

                  <div className="article-card-copy">
                    <div className="article-card-meta">
                      <span className="article-reading-time">
                        ⏱ {calculateReadingTime(article.contentMarkdown)}
                      </span>
                      {article.publishedAt && (
                        <time dateTime={article.publishedAt}>
                          {formatDate(article.publishedAt)}
                        </time>
                      )}
                    </div>

                    <h3 className="article-card-title">{article.title}</h3>
                    <p className="article-card-excerpt">{article.excerpt}</p>

                    <div className="article-card-footer">
                      <span className="article-read-link">
                        Baca selengkapnya <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>
      ) : (
        <section className="article-empty-state" aria-label="Artikel tidak ditemukan">
          <div className="empty-state-icon">🔍</div>
          <h3>Tidak ada artikel yang cocok</h3>
          <p>
            {searchQuery
              ? `Tidak ditemukan artikel untuk kata kunci "${searchQuery}". Coba gunakan kata kunci lain.`
              : 'Belum ada konten pada kategori yang dipilih.'}
          </p>
          {(searchQuery || activeCategory !== 'all') && (
            <button
              type="button"
              className="button button-outline"
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
            >
              Reset Filter & Pencarian
            </button>
          )}
        </section>
      )}
    </div>
  );
}
