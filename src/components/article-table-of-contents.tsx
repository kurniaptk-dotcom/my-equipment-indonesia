'use client';

import { useEffect, useState } from 'react';
import type { TocItem } from '@/lib/toc';
export type { TocItem };

export function ArticleTableOfContents({
  items,
  variant = 'aside',
}: {
  items: TocItem[];
  variant?: 'aside' | 'mobile';
}) {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!items.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -60% 0px' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 90;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(id);
      window.history.pushState(null, '', `#${id}`);
      if (variant === 'mobile') setIsOpen(false);
    }
  };

  if (variant === 'mobile') {
    return (
      <div className="article-toc-mobile">
        <button
          type="button"
          className="toc-mobile-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <span className="toc-mobile-title">
            <span aria-hidden="true">📖</span> Daftar Isi Panduan ({items.length} Bagian)
          </span>
          <span className="toc-toggle-icon" aria-hidden="true">
            {isOpen ? '▲' : '▼'}
          </span>
        </button>

        {isOpen && (
          <nav className="toc-mobile-nav" aria-label="Daftar isi artikel">
            <ol className="toc-list">
              {items.map((item, index) => (
                <li
                  key={item.id}
                  className={`${activeId === item.id ? 'active' : ''} ${
                    item.level === 3 ? 'toc-sub-item' : 'toc-main-item'
                  }`}
                >
                  <a href={`#${item.id}`} onClick={(e) => handleClick(e, item.id)}>
                    <span className="toc-number">{index + 1}.</span> {item.text}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        )}
      </div>
    );
  }

  return (
    <nav className="article-toc-aside" aria-label="Daftar isi panduan">
      <div className="toc-aside-header">
        <span className="toc-aside-badge">DAFTAR ISI</span>
        <span className="toc-count">{items.length} Poin Pembahasan</span>
      </div>
      <ol className="toc-aside-list">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`${activeId === item.id ? 'active' : ''} ${
              item.level === 3 ? 'toc-sub-item' : 'toc-main-item'
            }`}
          >
            <a href={`#${item.id}`} onClick={(e) => handleClick(e, item.id)}>
              <span className="toc-index">{String(index + 1).padStart(2, '0')}</span>
              <span className="toc-text">{item.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
