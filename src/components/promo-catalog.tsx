'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { waLink } from '@/data/catalog';
import type { CmsPromo } from '@/lib/content';

type PromoItem = {
  id: string;
  category: 'paket-usaha' | 'mesin-laundry' | 'perlengkapan' | 'chemical' | 'aksesoris';
  badge: string;
  badgeType: 'discount' | 'packet' | 'cashback' | 'bundle';
  name: string;
  originalPrice: number;
  promoPrice: number;
  image: string;
  description: string;
  validUntil: string;
};

const defaultPromoItems: PromoItem[] = [
  {
    id: 'promo-1',
    category: 'mesin-laundry',
    badge: 'Diskon 15%',
    badgeType: 'discount',
    name: 'Mesin Cuci Front Load 10 Kg Electrolux',
    originalPrice: 9700000,
    promoPrice: 8500000,
    image: '/images/washer-8kg.jpg',
    description: 'Kapasitas 10 Kg efisien listrik & air, cocok untuk operasional harian laundry kiloan.',
    validUntil: '31 Desember 2026',
  },
  {
    id: 'promo-2',
    category: 'paket-usaha',
    badge: 'Paket Hemat',
    badgeType: 'packet',
    name: 'Paket Usaha Laundry Rumahan Siap Buka',
    originalPrice: 32500000,
    promoPrice: 27500000,
    image: '/images/hero-stacked.webp',
    description: 'Sudah termasuk 2 washer front load, 1 dryer gas SpeedQueen, chemical starter, dan instalasi awal.',
    validUntil: '31 Desember 2026',
  },
  {
    id: 'promo-3',
    category: 'perlengkapan',
    badge: 'Cashback',
    badgeType: 'cashback',
    name: 'Rak Stainless 3 Susun Anti Karat',
    originalPrice: 1500000,
    promoPrice: 1250000,
    image: '/images/rack-laundry-crop.jpg',
    description: 'Rak penyimpanan baju bersih & perlengkapan deterjen, kuat menahan beban hingga 150 kg.',
    validUntil: '31 Desember 2026',
  },
  {
    id: 'promo-4',
    category: 'chemical',
    badge: 'Bundling',
    badgeType: 'bundle',
    name: 'Chemical Laundry 5 Liter (3 Varian Lengkap)',
    originalPrice: 825000,
    promoPrice: 675000,
    image: '/images/chemical-laundry.jpg',
    description: 'Paket bundling Deterjen Cair Rendah Busa + Pelembut Pakaian + Parfum Laundry konsentrat.',
    validUntil: '31 Desember 2026',
  },
  {
    id: 'promo-5',
    category: 'mesin-laundry',
    badge: 'Diskon 10%',
    badgeType: 'discount',
    name: 'Mesin Pengering SpeedQueen 10.5 Kg Gas',
    originalPrice: 15500000,
    promoPrice: 13950000,
    image: '/images/dryer-speedqueen.webp',
    description: 'Dryer komersial terlaris, waktu kering super cepat 35-45 menit, drum heavy duty.',
    validUntil: '31 Desember 2026',
  },
  {
    id: 'promo-6',
    category: 'perlengkapan',
    badge: 'Paket Hemat',
    badgeType: 'packet',
    name: 'Setrika Uap Boiler Gas 25 Liter Nagamoto',
    originalPrice: 6200000,
    promoPrice: 5400000,
    image: '/images/steamer-boiler.webp',
    description: 'Hasil setrika licin lebih cepat, tanpa gosong pada serat kain halus, kapasitas 25 liter.',
    validUntil: '31 Desember 2026',
  },
];

const categories = [
  { id: 'all', label: 'Semua Promo' },
  { id: 'paket-usaha', label: 'Paket Usaha' },
  { id: 'mesin-laundry', label: 'Mesin Laundry' },
  { id: 'perlengkapan', label: 'Perlengkapan' },
  { id: 'chemical', label: 'Chemical' },
  { id: 'aksesoris', label: 'Aksesoris' },
] as const;

const money = (num: number) => `Rp ${new Intl.NumberFormat('id-ID').format(num)}`;

export function PromoCatalog({
  cmsPromos,
  whatsapp,
}: {
  cmsPromos: CmsPromo[];
  whatsapp: string;
}) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredItems =
    activeCategory === 'all'
      ? defaultPromoItems
      : defaultPromoItems.filter((item) => item.category === activeCategory);

  return (
    <div className="promo-catalog-wrapper">
      {/* Category Filter Tabs */}
      <div className="promo-filter-tabs" role="tablist" aria-label="Kategori Promo">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`promo-tab-btn${isActive ? ' is-active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Promo Cards Grid */}
      <div className="promo-cards-grid">
        {filteredItems.map((item) => (
          <article className="promo-product-card" key={item.id}>
            <div className="promo-card-visual">
              <span className={`promo-badge-tag badge-${item.badgeType}`}>{item.badge}</span>
              <Image
                src={item.image}
                alt={item.name}
                width={360}
                height={260}
                sizes="(max-width: 650px) 90vw, 320px"
              />
            </div>

            <div className="promo-card-content">
              <h3>{item.name}</h3>
              <p>{item.description}</p>

              <div className="promo-pricing-row">
                <span className="promo-original-price">{money(item.originalPrice)}</span>
                <b className="promo-discount-price">{money(item.promoPrice)}</b>
              </div>

              <div className="promo-card-footer">
                <small className="promo-validity">Berlaku s/d {item.validUntil}</small>
                <Link
                  href={waLink(
                    `Halo My Equipment, saya tertarik dengan ${item.name} pada promo (${item.badge}). Apakah penawaran ini masih berlaku?`,
                    whatsapp
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="promo-claim-btn"
                  aria-label={`Klaim promo ${item.name}`}
                >
                  Klaim Promo ↗
                </Link>
              </div>
            </div>
          </article>
        ))}

        {filteredItems.length === 0 && (
          <div className="promo-empty-tab">
            <p>Belum ada promo aktif untuk kategori ini. Hubungi tim kami untuk menanyakan penawaran khusus.</p>
          </div>
        )}
      </div>

      {/* CMS Promos jika ada yang tercatat dari database */}
      {cmsPromos.length > 0 && (
        <div className="cms-promos-section">
          <h3>Promo Khusus Tambahan dari Admin</h3>
          <div className="promo-cards-grid">
            {cmsPromos.map((promo) => (
              <article className="promo-product-card" key={promo.id}>
                <div className="promo-card-content">
                  <span className="promo-badge-tag badge-discount">Promo Terverifikasi</span>
                  <h3>{promo.title}</h3>
                  <p>{promo.description}</p>
                  <small>
                    Berlaku {promo.startsAt} s/d {promo.endsAt}
                  </small>
                  <Link href={promo.sourceUrl} target="_blank" rel="noreferrer" className="button button-small">
                    Buka Sumber Promo ↗
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

