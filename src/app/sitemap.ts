import type { MetadataRoute } from 'next';
import { getArticles, getPortfolio, getProducts } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { KALBAR_CITIES } from '@/data/cities';
import { EXPANSION_CITIES } from '@/data/expansion-cities';

const pages = [
  '',
  '/paket-usaha',
  '/paket-usaha/proposal',
  '/produk',
  '/layanan',
  '/tentang-kami',
  '/konsultasi',
  '/estimasi-modal',
  '/promo',
  '/artikel',
  '/inspirasi',
  '/faq',
  '/garansi-servis',
  '/kontak',
];
const CITY_ALIASES = ['putussibau', 'ngabang', 'nanga-pinoh', 'sukadana', 'balik-papan', 'sepaku', 'penajam'];

export const dynamic='force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getSiteUrl();
  const [products, portfolio, articles]=await Promise.all([getProducts(),getPortfolio(),getArticles()]);
  const publicPages=pages.filter((path)=>path!=='/artikel' || articles.length>0).filter((path)=>path!=='/inspirasi' || portfolio.length>0);
  return [
    ...publicPages.map((path) => ({
      url: `${site}${path}`,
      changeFrequency: path === '' || path === '/paket-usaha' ? ('daily' as const) : path === '/paket-usaha/proposal' ? ('weekly' as const) : ('weekly' as const),
      priority: path === '' ? 1 : path === '/paket-usaha' ? 0.95 : path === '/paket-usaha/proposal' ? 0.9 : 0.7,
    })),
    ...EXPANSION_CITIES.map((city) => ({
      url: `${site}/wilayah/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...KALBAR_CITIES.map((city) => ({
      url: `${site}/wilayah/${city.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...CITY_ALIASES.map((alias) => ({
      url: `${site}/wilayah/${alias}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.85,
    })),
    ...products.map((product) => ({ url: `${site}/produk/${product.slug}`, changeFrequency: 'monthly' as const, priority: 0.65 })),
    ...articles.map((article) => {
      const isPillar = [
        'peluang-usaha-laundry-mess-sawit-dan-tambang-kalbar',
        'distributor-mesin-laundry-balikpapan-samarinda-kaltim-kalsel',
        'peluang-usaha-laundry-mess-pekerja-ikn-nusantara-kaltim',
        'rekomendasi-supplier-dan-toko-mesin-laundry-banjarmasin-kalsel',
        'peluang-usaha-cuci-karpet-masjid-kantor-pontianak-kalbar',
        'rincian-modal-usaha-laundry-kiloan-pontianak-kalbar-2026',
        'dryer-gas-vs-dryer-listrik-usaha-laundry-hemat-biaya-kalbar',
        'peluang-bisnis-laundry-koin-self-service-qris-pontianak-kalbar',
        'perbandingan-franchise-laundry-kiloan-vs-paket-usaha-mandiri-kalbar',
        'solusi-filter-air-gambut-dan-sumur-bor-laundry-kiloan-kalbar',
      ].includes(article.slug);

      return {
        url: `${site}/artikel/${article.slug}`,
        lastModified: new Date(article.updatedAt),
        changeFrequency: isPillar ? ('weekly' as const) : ('monthly' as const),
        priority: isPillar ? 0.8 : 0.65,
      };
    }),
  ];
}
