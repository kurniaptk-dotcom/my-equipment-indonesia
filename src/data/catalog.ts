export const storeUrl = 'https://produk.myequipmentindonesia.com/';
export const waNumber = '6289504444471';
export const waLink = (message = 'Halo My Equipment, saya ingin konsultasi usaha laundry.', number = waNumber) => `https://wa.me/${number.replace(/\D/g,'')}?text=${encodeURIComponent(message)}`;

export type Category = { slug: string; title: string; icon: string; desc: string };
export const categories: Category[] = [
  { slug: 'mesin-laundry', icon: '▦', title: 'Mesin Laundry', desc: 'Mesin cuci & pengering' },
  { slug: 'peralatan-pendukung', icon: '⌁', title: 'Peralatan Pendukung', desc: 'Setrika uap & meja' },
  { slug: 'perlengkapan-laundry', icon: '♧', title: 'Perlengkapan Laundry', desc: 'Kebutuhan operasional' },
  { slug: 'chemical-laundry', icon: '✳', title: 'Chemical Laundry', desc: 'Deterjen & perawatan' },
  { slug: 'cleaning', icon: '⚙', title: 'Cleaning', desc: 'Peralatan cleaning' },
  { slug: 'aksesori', icon: '◇', title: 'Aksesori', desc: 'Aksesori usaha laundry' },
  { slug: 'suku-cadang', icon: '⌕', title: 'Suku Cadang', desc: 'Komponen mesin' },
];

export type Product = {
  slug: string;
  legacySlugs?: string[];
  name: string;
  category: string;
  categorySlug: string;
  price: number | null;
  priceSource: 'catalog-snapshot' | 'confirm';
  image: string | null;
  imageAlt: string;
  description: string;
  specs: { label: string; value: string }[];
  storeUrl: string;
};

const storeProduct = (slug: string) => `${storeUrl}product/${slug}`;
export const products: Product[] = [
  {
    slug: 'mesin-cuci-samsung-8-kg', legacySlugs: ['mesin-cuci-pontianak-samsung-8kg'],
    name: 'Mesin Cuci Samsung 8 Kg', category: 'Mesin Laundry', categorySlug: 'mesin-laundry',
    price: 5700000, priceSource: 'catalog-snapshot', image: null, imageAlt: 'Foto produk belum tersedia',
    description: 'Mesin cuci untuk kebutuhan operasional laundry. Hubungi tim untuk memastikan tipe, ketersediaan, dan harga terbaru.',
    specs: [{ label: 'Kapasitas pada nama produk', value: '8 Kg' }, { label: 'Kategori', value: 'Mesin cuci' }],
    storeUrl: storeProduct('mesin-cuci-pontianak-samsung-8kg'),
  },
  {
    slug: 'mesin-cuci-lg-8-kg', name: 'Mesin Cuci LG 8 Kg', category: 'Mesin Laundry', categorySlug: 'mesin-laundry',
    price: null, priceSource: 'confirm', image: '/images/washer-lg-8kg-crop.webp', imageAlt: 'Mesin cuci LG 8 kg dari media My Equipment',
    description: 'Mesin cuci LG 8 kg yang ditampilkan dalam media resmi My Equipment. Tanyakan ketersediaan dan harga terbaru kepada tim.',
    specs: [{ label: 'Kapasitas pada media', value: '8 Kg' }, { label: 'Merek pada media', value: 'LG' }],
    storeUrl: `${storeUrl}product-category/mesin-laundry-pontianak/`,
  },
  {
    slug: 'mesin-pengering-speedqueen', name: 'Mesin Pengering Speed Queen', category: 'Mesin Laundry', categorySlug: 'mesin-laundry',
    price: 14975000, priceSource: 'catalog-snapshot', image: '/images/dryer-speedqueen.webp', imageAlt: 'Mesin pengering Speed Queen dari media My Equipment',
    description: 'Pilihan mesin pengering untuk kebutuhan usaha laundry. Detail model dan ketersediaan dapat dikonfirmasi melalui toko resmi.',
    specs: [{ label: 'Kategori', value: 'Mesin pengering' }, { label: 'Merek pada media', value: 'Speed Queen' }],
    storeUrl: `${storeUrl}product-category/mesin-laundry-pontianak/`,
  },
  {
    slug: 'setrika-uap-boiler-15-liter', name: 'Setrika Uap Boiler 15 Liter', category: 'Peralatan Pendukung', categorySlug: 'peralatan-pendukung',
    price: 3850000, priceSource: 'catalog-snapshot', image: '/images/steamer-boiler.webp', imageAlt: 'Setrika uap boiler pada meja setrika dari media My Equipment',
    description: 'Perangkat setrika uap boiler untuk menunjang operasional laundry. Pastikan kelengkapan dan informasi produk sebelum membeli.',
    specs: [{ label: 'Kapasitas pada nama produk', value: '15 Liter' }, { label: 'Kategori', value: 'Setrika uap boiler' }],
    storeUrl: `${storeUrl}product-category/mesin-laundry-pontianak/`,
  },
  {
    slug: 'rak-besi-laundry', name: 'Rak Besi Laundry', category: 'Perlengkapan Laundry', categorySlug: 'perlengkapan-laundry',
    price: 1250000, priceSource: 'catalog-snapshot', image: null, imageAlt: 'Foto rak besi laundry belum tersedia',
    description: 'Rak untuk membantu penyimpanan dan pengelolaan perlengkapan laundry. Hubungi toko untuk memastikan ukuran dan ketersediaan.',
    specs: [{ label: 'Kategori', value: 'Perlengkapan laundry' }],
    storeUrl: storeProduct('rak-besi-laundry'),
  },
  {
    slug: 'chemical-laundry-detoxy-5-liter', name: 'Deterjen Laundry Detoxy 5 Liter', category: 'Chemical Laundry', categorySlug: 'chemical-laundry',
    price: 65000, priceSource: 'catalog-snapshot', image: null, imageAlt: 'Foto deterjen Detoxy 5 liter belum tersedia',
    description: 'Deterjen laundry dalam kemasan 5 liter yang tercantum pada katalog toko. Konfirmasikan varian dan harga terbaru sebelum pemesanan.',
    specs: [{ label: 'Kemasan pada nama produk', value: '5 Liter' }, { label: 'Kategori', value: 'Chemical laundry' }],
    storeUrl: `${storeUrl}product-category/chemical-laundry-pontianak/`,
  },
  {
    slug: 'vacuum-extractor-30-liter', name: 'Vacuum Extractor 30 Liter', category: 'Cleaning', categorySlug: 'cleaning',
    price: 5850000, priceSource: 'catalog-snapshot', image: null, imageAlt: 'Ilustrasi kategori cleaning laundry',
    description: 'Peralatan cleaning yang tercantum dalam katalog My Equipment. Tanyakan tipe, spesifikasi, dan ketersediaannya kepada tim.',
    specs: [{ label: 'Kapasitas pada nama produk', value: '30 Liter' }, { label: 'Kategori', value: 'Cleaning' }],
    storeUrl: `${storeUrl}product-category/mesin-cleaning-pontianak/`,
  },
  {
    slug: 'keranjang-laundry-great-a', name: 'Keranjang Laundry Great A', category: 'Perlengkapan Laundry', categorySlug: 'perlengkapan-laundry',
    price: 40000, priceSource: 'catalog-snapshot', image: '/images/basket-laundry-crop.webp', imageAlt: 'Keranjang laundry dari media My Equipment',
    description: 'Keranjang untuk mendukung penanganan pakaian pada operasional laundry. Hubungi toko untuk ketersediaan terbaru.',
    specs: [{ label: 'Kategori', value: 'Perlengkapan laundry' }],
    storeUrl: storeProduct('keranjang-laundry-great-a'),
  },
  {
    slug: 'meja-setrika-uap-boiler', name: 'Meja Setrika Uap Boiler', category: 'Peralatan Pendukung', categorySlug: 'peralatan-pendukung',
    price: 850000, priceSource: 'catalog-snapshot', image: '/images/steamer-boiler.webp', imageAlt: 'Meja setrika dengan boiler dari media My Equipment',
    description: 'Meja pendukung setrika uap yang tercantum pada katalog toko. Tanyakan ukuran dan detail kelengkapannya.',
    specs: [{ label: 'Kategori', value: 'Peralatan pendukung' }],
    storeUrl: `${storeUrl}product-category/perlengkapan-usaha-laundry-pontianak/`,
  },
  {
    slug: 'vanbelt-pengering-10-5-kg', name: 'Vanbelt Pengering 10,5 Kg', category: 'Suku Cadang', categorySlug: 'suku-cadang',
    price: 250000, priceSource: 'catalog-snapshot', image: null, imageAlt: 'Ilustrasi kategori suku cadang mesin laundry',
    description: 'Suku cadang pengering yang tercantum pada katalog toko. Cocokkan tipe mesin dan kode komponen sebelum membeli.',
    specs: [{ label: 'Kapasitas pada nama produk', value: '10,5 Kg' }, { label: 'Kategori', value: 'Suku cadang pengering' }],
    storeUrl: `${storeUrl}product-category/spare-part-mesin-pengering-pontianak/`,
  },
  {
    slug: 'solasi-naichi', name: 'Solasi Naichi', category: 'Aksesori', categorySlug: 'aksesori',
    price: 7500, priceSource: 'catalog-snapshot', image: null, imageAlt: 'Foto produk belum tersedia',
    description: 'Aksesori operasional laundry yang tercantum pada katalog toko. Konfirmasikan jenis produk dan harga terbaru melalui kanal resmi.',
    specs: [{ label: 'Kategori toko', value: 'Perlengkapan laundry' }],
    storeUrl: `${storeUrl}product-category/perlengkapan-usaha-laundry-pontianak/`,
  },
];

export const packages = [
  { name: 'Pra-Starting', label: 'Langkah pertama', price: 'Rp 14.950.000', desc: 'Pilihan awal untuk mulai merintis usaha laundry.', image: '/images/hero-stacked.webp', points: ['Mesin cuci', 'Perlengkapan dasar', 'Konsultasi kebutuhan'] },
  { name: 'Starting', label: 'Paket pilihan', price: 'Rp 21.500.000', desc: 'Kelengkapan esensial untuk operasional laundry.', image: '/images/washer-lg-8kg-crop.webp', points: ['Mesin cuci', 'Setrika uap boiler', 'Perlengkapan operasional'] },
  { name: 'Running', label: 'Siap beroperasi', price: 'Rp 38.500.000', desc: 'Solusi usaha dengan mesin pengering untuk alur yang praktis.', image: '/images/dryer-speedqueen.webp', points: ['Mesin cuci & pengering', 'Peralatan pendukung', 'Tanyakan rincian paket'] },
  { name: 'Growing', label: 'Kapasitas lebih', price: 'Rp 58.500.000', desc: 'Pilihan untuk kebutuhan armada mesin yang lebih lengkap.', image: '/images/hero-stacked.webp', points: ['Armada mesin lebih lengkap', 'Perlengkapan usaha', 'Konsultasi kebutuhan'] },
];

export const portfolio = [
  { name: 'Atma Laundry', image: '/images/case-atma-outlet.webp', permissionConfirmed: true, permissionNote: 'Izin publikasi diberikan oleh pemilik situs pada 27 Oktober 2026.' },
  { name: 'Dinar Laundry', image: '/images/case-dinar-outlet.webp', permissionConfirmed: true, permissionNote: 'Izin publikasi diberikan oleh pemilik situs pada 27 Oktober 2026.' },
  { name: 'Happy Family Laundry', image: '/images/case-happy-family-outlet.webp', permissionConfirmed: true, permissionNote: 'Izin publikasi diberikan oleh pemilik situs pada 27 Oktober 2026.' },
  { name: 'Kila Laundry', image: '/images/case-kila-outlet.webp', permissionConfirmed: true, permissionNote: 'Izin publikasi diberikan oleh pemilik situs pada 27 Oktober 2026.' },
  { name: 'Permata Laundry Express', image: '/images/case-permata-outlet.webp', permissionConfirmed: true, permissionNote: 'Izin publikasi diberikan oleh pemilik situs pada 27 Oktober 2026.' },
];

export const productBySlug = (slug: string) => products.find((product) => product.slug === slug || product.legacySlugs?.includes(slug));
