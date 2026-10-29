import type { NextConfig } from 'next';
import { products } from './src/data/catalog';
const publicMedia = process.env.CMS_MEDIA_PUBLIC_URL ? new URL(process.env.CMS_MEDIA_PUBLIC_URL) : null;
const publicMediaPattern = publicMedia ? {
  protocol: publicMedia.protocol.slice(0, -1) as 'http' | 'https',
  hostname: publicMedia.hostname,
  ...(publicMedia.port ? { port: publicMedia.port } : {}),
  pathname: `${publicMedia.pathname.replace(/\/$/, '')}/**`,
} : null;
const nextConfig: NextConfig = {
  distDir: process.env.NEXT_DIST_DIR || '.next',
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 82],
    remotePatterns: publicMediaPattern ? [publicMediaPattern] : [],
  },
  async redirects() { return [
    // WP Legacy URL 301 Permanent Redirects (Anti-loss SEO preservation)
    { source: '/paket-usaha-laundry-pontianak', destination: '/paket-usaha', permanent: true },
    { source: '/paket-usaha-laundry-kiloan-pontianak', destination: '/paket-usaha', permanent: true },
    { source: '/supplier-mesin-laundry', destination: '/produk', permanent: true },
    { source: '/landing-page-mesin-pengering', destination: '/produk?kategori=dryer', permanent: true },
    { source: '/landing-page-setrika-uap-boiler', destination: '/produk?kategori=boiler', permanent: true },
    { source: '/produk-my-equipment', destination: '/produk', permanent: true },
    { source: '/smartlink', destination: '/layanan', permanent: true },
    { source: '/kelas-laundry', destination: '/layanan', permanent: true },
    { source: '/agent-laundry', destination: '/layanan', permanent: true },
    { source: '/kopdar-my-equipment', destination: '/inspirasi', permanent: true },
    { source: '/renold-kharisma-21-september-2023-training', destination: '/inspirasi', permanent: true },
    { source: '/data-konsumen-mq', destination: '/tentang-kami', permanent: true },
    { source: '/anti-noda', destination: '/produk?kategori=chemical-laundry', permanent: true },
    { source: '/pusat-mesin-laundry-facebook-leads-form', destination: '/konsultasi', permanent: true },
    { source: '/my-equipment-indonesia-leads-google-ads', destination: '/konsultasi', permanent: true },
    { source: '/cart', destination: '/produk', permanent: true },
    { source: '/checkout', destination: '/produk', permanent: true },
    { source: '/my-account', destination: '/produk', permanent: true },
    { source: '/sample-page', destination: '/', permanent: true },
    ...products.flatMap((product) => [product.slug, ...(product.legacySlugs ?? [])].map((slug) => ({ source: `/product/${slug}`, destination: `/produk/${product.slug}`, permanent: true }))),
    { source: '/product-category/mesin-laundry-pontianak', destination: '/produk?kategori=mesin-laundry', permanent: true },
    { source: '/product-category/chemical-laundry-pontianak', destination: '/produk?kategori=chemical-laundry', permanent: true },
    { source: '/product-category/spare-part-mesin-pengering-pontianak', destination: '/produk?kategori=suku-cadang', permanent: true },
    { source: '/product/:slug', destination: '/produk', permanent: true },
    { source: '/product-category/:slug', destination: '/produk', permanent: true },
    { source: '/product-tag/:slug', destination: '/produk', permanent: true },
    { source: '/shop', destination: '/produk', permanent: true },
  ]; },
  async rewrites() { return [
    { source: '/layanan/konsultasi', destination: '/konsultasi' },
    { source: '/layanan/kalkulator-modal', destination: '/estimasi-modal' },
    { source: '/layanan/promo', destination: '/promo' },
    { source: '/layanan/inspirasi', destination: '/inspirasi' },
    { source: '/layanan/faq', destination: '/faq' },
    { source: '/layanan/garansi-servis', destination: '/garansi-servis' },
  ]; },
  async headers() {
    const securityHeaders = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'X-Frame-Options', value: 'DENY' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
      ...(process.env.NODE_ENV === 'production' ? [{ key: 'Strict-Transport-Security', value: 'max-age=31536000' }] : []),
    ];
    return [
      { source: '/:path*', headers: securityHeaders },
      { source: '/admin/:path*', headers: [{ key: 'Cache-Control', value: 'private, no-store, max-age=0' }] },
      { source: '/api/:path*', headers: [{ key: 'Cache-Control', value: 'no-store' }] },
    ];
  },
};
export default nextConfig;
