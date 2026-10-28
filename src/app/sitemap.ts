import type { MetadataRoute } from 'next';
import { getArticles, getPortfolio, getProducts } from '@/lib/content';
import { getSiteUrl } from '@/lib/site-url';

const pages = ['', '/paket-usaha', '/produk', '/layanan', '/tentang-kami', '/konsultasi', '/estimasi-modal', '/promo', '/inspirasi', '/faq', '/garansi-servis', '/kontak'];
export const dynamic='force-dynamic';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = getSiteUrl();
  const [products, portfolio, articles]=await Promise.all([getProducts(),getPortfolio(),getArticles()]);
  const publicPages=pages.filter((path)=>path!=='/artikel' || articles.length>0).filter((path)=>path!=='/inspirasi' || portfolio.length>0);
  return [
    ...publicPages.map((path) => ({ url: `${site}${path}`, changeFrequency: path ? 'monthly' as const : 'weekly' as const, priority: path ? 0.7 : 1 })),
    ...products.map((product) => ({ url: `${site}/produk/${product.slug}`, changeFrequency: 'monthly' as const, priority: 0.6 })),
    ...articles.map((article) => ({ url: `${site}/artikel/${article.slug}`,lastModified:new Date(article.updatedAt),changeFrequency:'monthly' as const,priority:0.55 })),
  ];
}
