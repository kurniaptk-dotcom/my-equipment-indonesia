import type { MetadataRoute } from 'next';
import { getArticles, getPortfolio, getProducts } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';
import { KALBAR_CITIES } from '@/data/cities';

const pages = [
  '',
  '/paket-usaha',
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
const CITY_ALIASES = ['putussibau', 'ngabang', 'nanga-pinoh', 'sukadana'];

export const dynamic='force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getSiteUrl();
  const [products, portfolio, articles]=await Promise.all([getProducts(),getPortfolio(),getArticles()]);
  const publicPages=pages.filter((path)=>path!=='/artikel' || articles.length>0).filter((path)=>path!=='/inspirasi' || portfolio.length>0);
  return [
    ...publicPages.map((path) => ({
      url: `${site}${path}`,
      changeFrequency: path === '' || path === '/paket-usaha' ? ('daily' as const) : ('weekly' as const),
      priority: path === '' ? 1 : path === '/paket-usaha' ? 0.95 : 0.7,
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
    ...products.map((product) => ({ url: `${site}/produk/${product.slug}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...articles.map((article) => ({ url: `${site}/artikel/${article.slug}`,lastModified:new Date(article.updatedAt),changeFrequency:'monthly' as const,priority:0.55 })),
  ];
}
