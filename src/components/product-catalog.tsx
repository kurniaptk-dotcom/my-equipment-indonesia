'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/data/catalog';
import { CategoryIcon } from '@/components/category-icon';

type CatalogCategory = { slug: string; title: string; desc: string; icon: string };
const money = (amount: number | null) => amount === null ? 'Hubungi untuk harga' : `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;

export const AVAILABLE_BRANDS = [
  { slug: 'speed-queen', name: 'Speed Queen' },
  { slug: 'maytag', name: 'Maytag' },
  { slug: 'lg', name: 'LG' },
  { slug: 'samsung', name: 'Samsung' },
  { slug: 'diamante', name: 'Diamante' },
  { slug: 'mr-spin', name: 'Mr Spin' },
];

export function ProductCatalog({ products, categories, initialCategory = '' }: { products: Product[]; categories: CatalogCategory[]; initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    const syncFiltersFromUrl = () => {
      const sp = new URL(window.location.href).searchParams;
      setCategory(sp.get('kategori') ?? '');
      setSelectedBrand(sp.get('merk') ?? '');
    };
    syncFiltersFromUrl();
    window.addEventListener('popstate', syncFiltersFromUrl);
    return () => window.removeEventListener('popstate', syncFiltersFromUrl);
  }, []);

  function selectCategory(nextCategory: string) {
    setCategory(nextCategory);
    const url = new URL(window.location.href);
    if (nextCategory) url.searchParams.set('kategori', nextCategory);
    else url.searchParams.delete('kategori');
    window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }

  function selectBrand(nextBrandSlug: string) {
    setSelectedBrand(nextBrandSlug);
    const url = new URL(window.location.href);
    if (nextBrandSlug) url.searchParams.set('merk', nextBrandSlug);
    else url.searchParams.delete('merk');
    window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }

  const visible = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchCategory = !category || product.categorySlug === category;
      const matchSearch = `${product.name} ${product.category}`.toLocaleLowerCase('id').includes(search.trim().toLocaleLowerCase('id'));
      const activeBrandName = AVAILABLE_BRANDS.find((b) => b.slug === selectedBrand)?.name || selectedBrand;
      const matchBrand = !selectedBrand || product.name.toLowerCase().includes(activeBrandName.toLowerCase());
      return matchCategory && matchSearch && matchBrand;
    });
    if (sort === 'low') return [...filtered].sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER));
    if (sort === 'high') return [...filtered].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    return filtered;
  }, [category, selectedBrand, products, search, sort]);

  const hasFilters = Boolean(category || selectedBrand || search);
  const clearFilters = () => { setSearch(''); selectCategory(''); selectBrand(''); };

  return <div className="catalog-layout">
    <aside className="catalog-sidebar" aria-label="Filter kategori dan merek produk">
      <h2>Kategori</h2>
      <button type="button" aria-pressed={!category} className={!category ? 'selected' : ''} onClick={() => selectCategory('')}>
        <CategoryIcon className="category-button-icon" slug="all" />Semua produk <span>{products.length}</span>
      </button>
      {categories.map((item) => <button type="button" key={item.slug} aria-pressed={category === item.slug} className={category === item.slug ? 'selected' : ''} onClick={() => selectCategory(item.slug)}>
        <CategoryIcon className="category-button-icon" slug={item.slug} />{item.title}<span>{products.filter((product) => product.categorySlug === item.slug).length}</span>
      </button>)}

      <h2 style={{ marginTop: '1.75rem' }}>Merek Mesin</h2>
      <button type="button" aria-pressed={!selectedBrand} className={!selectedBrand ? 'selected' : ''} onClick={() => selectBrand('')}>
        Semua Merek <span>{products.length}</span>
      </button>
      {AVAILABLE_BRANDS.map((item) => {
        const count = products.filter((product) => product.name.toLowerCase().includes(item.name.toLowerCase())).length;
        if (count === 0) return null;
        return (
          <button
            type="button"
            key={item.slug}
            aria-pressed={selectedBrand === item.slug}
            className={selectedBrand === item.slug ? 'selected' : ''}
            onClick={() => selectBrand(item.slug)}
          >
            {item.name} <span>{count}</span>
          </button>
        );
      })}
    </aside>

    <div className="catalog-results">
      <div className="catalog-toolbar">
        <div><span className="eyebrow">Katalog ringkas</span><h2 aria-live="polite" aria-atomic="true">{visible.length} produk ditemukan</h2></div>
        <div className="catalog-controls">
          <label className="search-box"><span aria-hidden="true"><CategoryIcon slug="all" /></span><input type="search" aria-label="Cari produk" placeholder="Cari nama produk, merek, atau tipe" value={search} onChange={(event) => setSearch(event.target.value)} />{search && <button type="button" aria-label="Hapus pencarian" onClick={() => setSearch('')}>×</button>}</label>
          <label className="sort-box"><span className="sr-only">Urutkan produk</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Urutan pilihan</option><option value="low">Harga terendah</option><option value="high">Harga tertinggi</option></select></label>
        </div>
      </div>

      {/* Brand Filter Chips for Fast Browsing */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '8px',
          marginBottom: '8px',
          WebkitOverflowScrolling: 'touch',
        }}
        aria-label="Filter cepat merek mesin"
      >
        <span style={{ fontSize: '12px', fontWeight: 700, color: '#64748b', whiteSpace: 'nowrap' }}>
          Merek:
        </span>
        <button
          type="button"
          aria-pressed={!selectedBrand}
          onClick={() => selectBrand('')}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: !selectedBrand ? '2px solid #2563eb' : '1px solid #cbd5e1',
            background: !selectedBrand ? '#eff6ff' : '#ffffff',
            color: !selectedBrand ? '#1d4ed8' : '#475569',
            fontWeight: !selectedBrand ? 700 : 500,
            fontSize: '12px',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'all 0.15s ease',
          }}
        >
          Semua Merek
        </button>
        {AVAILABLE_BRANDS.map((item) => {
          const isSelected = selectedBrand === item.slug;
          return (
            <button
              type="button"
              key={item.slug}
              aria-pressed={isSelected}
              onClick={() => selectBrand(item.slug)}
              style={{
                padding: '6px 14px',
                borderRadius: '20px',
                border: isSelected ? '2px solid #2563eb' : '1px solid #cbd5e1',
                background: isSelected ? '#eff6ff' : '#ffffff',
                color: isSelected ? '#1d4ed8' : '#475569',
                fontWeight: isSelected ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease',
              }}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <p className="catalog-chip-hint">Geser daftar kategori untuk melihat pilihan lainnya <span aria-hidden="true">→</span></p>
      <div className="catalog-chips" role="group" aria-label="Pilih kategori produk">
        <button type="button" aria-pressed={!category} className={!category ? 'active' : ''} onClick={() => selectCategory('')}>Semua produk</button>
        {categories.map((item) => <button type="button" key={item.slug} aria-pressed={category === item.slug} className={category === item.slug ? 'active' : ''} onClick={() => selectCategory(item.slug)}>{item.title}</button>)}
      </div>

      {visible.length ? <div className="catalog-product-grid">{visible.map((product) => <Link className="catalog-product-card" href={`/produk/${product.slug}`} key={product.slug}>
        <div className="catalog-product-image">{product.image ? <Image src={product.image} alt={product.imageAlt} fill sizes="(max-width: 650px) 50vw, (max-width: 950px) 34vw, 25vw" /> : <span className="image-placeholder" role="img" aria-label={`Foto ${product.name} belum tersedia`}><b aria-hidden="true"><CategoryIcon slug={product.categorySlug} /></b><small>Foto produk belum tersedia</small></span>}</div>
        <div className="catalog-product-copy"><span>{product.category}</span><h3>{product.name}</h3><b>{money(product.price)}</b><small>{product.price === null ? 'Konfirmasi harga dan stok' : product.priceSource === 'catalog-snapshot' ? 'Harga indikatif · konfirmasi ke toko' : 'Harga perlu dikonfirmasi'}</small></div>
        <span className="product-go" aria-hidden="true">↗</span>
      </Link>)}</div> : <div className="empty-state"><span aria-hidden="true"><CategoryIcon slug="all" /></span><h3>Produk belum ditemukan</h3><p>Coba kata pencarian atau kategori lain.</p><button type="button" className="button button-outline" onClick={clearFilters}>Hapus semua filter</button></div>}
      {visible.length > 0 && <p className="note">Harga dan stok dapat berubah. Konfirmasikan informasi terbaru di toko resmi sebelum transaksi.</p>}
      {hasFilters && visible.length > 0 && <button type="button" className="catalog-clear-filters" onClick={clearFilters}>Hapus filter dan pencarian</button>}
    </div>
  </div>;
}
