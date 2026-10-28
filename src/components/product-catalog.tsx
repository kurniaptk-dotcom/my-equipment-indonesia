'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import type { Product } from '@/data/catalog';
import { CategoryIcon } from '@/components/category-icon';

type CatalogCategory = { slug: string; title: string; desc: string; icon: string };
const money = (amount: number | null) => amount === null ? 'Hubungi untuk harga' : `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;

export function ProductCatalog({ products, categories, initialCategory = '' }: { products: Product[]; categories: CatalogCategory[]; initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('featured');

  useEffect(() => {
    const syncCategoryFromUrl = () => setCategory(new URL(window.location.href).searchParams.get('kategori') ?? '');
    window.addEventListener('popstate', syncCategoryFromUrl);
    return () => window.removeEventListener('popstate', syncCategoryFromUrl);
  }, []);

  function selectCategory(nextCategory: string) {
    setCategory(nextCategory);
    const url = new URL(window.location.href);
    if (nextCategory) url.searchParams.set('kategori', nextCategory);
    else url.searchParams.delete('kategori');
    window.history.pushState(null, '', `${url.pathname}${url.search}${url.hash}`);
  }

  const visible = useMemo(() => {
    const filtered = products.filter((product) => (!category || product.categorySlug === category) &&
      `${product.name} ${product.category}`.toLocaleLowerCase('id').includes(search.trim().toLocaleLowerCase('id')));
    if (sort === 'low') return [...filtered].sort((a, b) => (a.price ?? Number.MAX_SAFE_INTEGER) - (b.price ?? Number.MAX_SAFE_INTEGER));
    if (sort === 'high') return [...filtered].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    return filtered;
  }, [category, products, search, sort]);

  const hasFilters = Boolean(category || search);
  const clearFilters = () => { setSearch(''); selectCategory(''); };

  return <div className="catalog-layout">
    <aside className="catalog-sidebar" aria-label="Filter kategori produk">
      <h2>Kategori</h2>
      <button type="button" aria-pressed={!category} className={!category ? 'selected' : ''} onClick={() => selectCategory('')}>
        <CategoryIcon className="category-button-icon" slug="all" />Semua produk <span>{products.length}</span>
      </button>
      {categories.map((item) => <button type="button" key={item.slug} aria-pressed={category === item.slug} className={category === item.slug ? 'selected' : ''} onClick={() => selectCategory(item.slug)}>
        <CategoryIcon className="category-button-icon" slug={item.slug} />{item.title}<span>{products.filter((product) => product.categorySlug === item.slug).length}</span>
      </button>)}
    </aside>

    <div className="catalog-results">
      <div className="catalog-toolbar">
        <div><span className="eyebrow">Katalog ringkas</span><h2 aria-live="polite" aria-atomic="true">{visible.length} produk ditemukan</h2></div>
        <div className="catalog-controls">
          <label className="search-box"><span aria-hidden="true"><CategoryIcon slug="all" /></span><input type="search" aria-label="Cari produk" placeholder="Cari nama produk atau kategori" value={search} onChange={(event) => setSearch(event.target.value)} />{search && <button type="button" aria-label="Hapus pencarian" onClick={() => setSearch('')}>×</button>}</label>
          <label className="sort-box"><span className="sr-only">Urutkan produk</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Urutan pilihan</option><option value="low">Harga terendah</option><option value="high">Harga tertinggi</option></select></label>
        </div>
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
