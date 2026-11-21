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
    slug: 'mesin-cuci-samsung-8-kg', legacySlugs: ['mesin-cuci-pontianak-samsung-8kg', 'jual-mesin-laundry-samsung-pontianak'],
    name: 'Mesin Cuci Samsung 8 Kg Front Load Inverter', category: 'Mesin Laundry', categorySlug: 'mesin-laundry',
    price: 5700000, priceSource: 'catalog-snapshot', image: null, imageAlt: 'Mesin cuci Samsung front loading laundry Pontianak',
    description: 'Pusat jual mesin cuci Samsung 8 kg front load inverter untuk usaha laundry di Pontianak & Kalbar. Dilengkapi teknologi Digital Inverter hemat listrik dan drum Diamond Drum higienis.',
    specs: [{ label: 'Merek', value: 'Samsung' }, { label: 'Kapasitas', value: '8 Kg' }, { label: 'Tipe', value: 'Front Loading' }, { label: 'Motor', value: 'Digital Inverter' }],
    storeUrl: storeProduct('mesin-cuci-pontianak-samsung-8kg'),
  },
  {
    slug: 'mesin-cuci-lg-8-kg', legacySlugs: ['jual-mesin-laundry-lg-pontianak', 'mesin-cuci-lg-pontianak'],
    name: 'Mesin Cuci LG 8 Kg Inverter Direct Drive', category: 'Mesin Laundry', categorySlug: 'mesin-laundry',
    price: 5950000, priceSource: 'catalog-snapshot', image: '/images/washer-lg-8kg-crop.webp', imageAlt: 'Mesin cuci LG 8 kg laundry Pontianak Inverter Direct Drive',
    description: 'Pusat jual mesin cuci LG 8 kg front load Inverter Direct Drive di Pontianak & Kalimantan Barat. Motor tangguh tanpa v-belt, getaran senyap, hemat air, dan pilihan utama usaha laundry kiloan.',
    specs: [{ label: 'Merek', value: 'LG' }, { label: 'Kapasitas', value: '8 Kg' }, { label: 'Motor', value: 'Inverter Direct Drive' }, { label: 'Kategori', value: 'Mesin cuci front load' }],
    storeUrl: `${storeUrl}product-category/mesin-laundry-pontianak/`,
  },
  {
    slug: 'mesin-cuci-lg-commercial-giant-c-10-5-kg', legacySlugs: ['jual-mesin-cuci-lg-commercial-pontianak', 'lg-giant-c-pontianak'],
    name: 'Mesin Cuci LG Giant C Max Commercial 10,5 Kg', category: 'Mesin Laundry', categorySlug: 'mesin-laundry',
    price: 16800000, priceSource: 'catalog-snapshot', image: '/images/washer-lg-8kg-crop.webp', imageAlt: 'Mesin cuci LG Giant C Max commercial laundry 10.5 kg Pontianak',
    description: 'Distributor mesin cuci komersial LG Giant C Max front load 10,5 kg di Pontianak & Kalbar. Dirancang khusus heavy-duty untuk laundry kiloan ramai dan koin, putaran ekstraksi cepat, drum stainless steel miring 10 derajat.',
    specs: [{ label: 'Merek', value: 'LG Commercial' }, { label: 'Kapasitas', value: '10,5 Kg' }, { label: 'Tipe', value: 'Commercial Front Load' }, { label: 'Garansi', value: 'Resmi 1 Tahun' }],
    storeUrl: `${storeUrl}product-category/mesin-laundry-pontianak/`,
  },
  {
    slug: 'mesin-cuci-maytag-commercial-mhn33', legacySlugs: ['jual-mesin-cuci-maytag-pontianak', 'maytag-mhn33-pontianak'],
    name: 'Mesin Cuci Maytag Commercial Front Load MHN33 10,5 Kg', category: 'Mesin Laundry', categorySlug: 'mesin-laundry',
    price: 17500000, priceSource: 'catalog-snapshot', image: '/images/hero-stacked.webp', imageAlt: 'Mesin cuci Maytag MHN33 commercial heavy duty Pontianak',
    description: 'Pusat jual mesin cuci Maytag MHN33 commercial front load heavy duty USA di Pontianak Kalbar. Tangguh mencuci cucian berat seragam tambang batubara, mess sawit, sprei, dan kiloan express, motor torsi tinggi tanpa komputerisasi rumit.',
    specs: [{ label: 'Merek', value: 'Maytag' }, { label: 'Kapasitas', value: '10,5 Kg' }, { label: 'Asal', value: 'USA Commercial Grade' }, { label: 'Tipe', value: 'Heavy Duty Front Load' }],
    storeUrl: `${storeUrl}product-category/mesin-laundry-pontianak/`,
  },
  {
    slug: 'mesin-pengering-speedqueen', legacySlugs: ['jual-dryer-speed-queen-pontianak', 'dryer-speed-queen-pontianak'],
    name: 'Mesin Pengering Speed Queen Gas 10,5 Kg MDG20', category: 'Mesin Laundry', categorySlug: 'mesin-laundry',
    price: 14975000, priceSource: 'catalog-snapshot', image: '/images/dryer-speedqueen.webp', imageAlt: 'Mesin pengering Speed Queen gas MDG20 komersial Pontianak',
    description: 'Pusat jual mesin pengering Speed Queen gas MDG20 kapasitas 10,5 kg komersial di Pontianak & Kalimantan Barat. Standar emas industri laundromat dunia, hemat daya listrik hanya 150-250 Watt, kering 100% dalam 40 menit, dan awet puluhan tahun.',
    specs: [{ label: 'Merek', value: 'Speed Queen' }, { label: 'Kapasitas', value: '10,5 Kg' }, { label: 'Pemanas', value: 'Gas LPG Otomatis' }, { label: 'Daya Listrik', value: '150 - 250 Watt' }],
    storeUrl: `${storeUrl}product-category/mesin-laundry-pontianak/`,
  },
  {
    slug: 'mesin-pengering-maytag-mdg28', legacySlugs: ['jual-dryer-maytag-pontianak', 'dryer-maytag-gas-pontianak'],
    name: 'Mesin Pengering Maytag Commercial Gas 10,5 Kg MDG28', category: 'Mesin Laundry', categorySlug: 'mesin-laundry',
    price: 15500000, priceSource: 'catalog-snapshot', image: '/images/dryer-speedqueen.webp', imageAlt: 'Mesin pengering Maytag MDG28 gas komersial Pontianak',
    description: 'Distributor mesin pengering Maytag MDG28 gas komersial kapasitas 10,5 kg di Pontianak Kalbar. Heavy-duty commercial USA, drum baja galvanis luas, sistem TurboVent ekstra cepat mengeringkan pakaian, dan aman untuk daya ruko PLN 1.300 VA.',
    specs: [{ label: 'Merek', value: 'Maytag' }, { label: 'Kapasitas', value: '10,5 Kg' }, { label: 'Pemanas', value: 'Gas LPG Murni' }, { label: 'Daya Listrik', value: '150 - 250 Watt' }],
    storeUrl: `${storeUrl}product-category/mesin-laundry-pontianak/`,
  },
  {
    slug: 'mesin-pengering-diamante-10-5-kg', legacySlugs: ['jual-dryer-diamante-pontianak', 'dryer-diamante-gas-pontianak'],
    name: 'Mesin Pengering Diamante Ultra Clean Gas 10,5 Kg', category: 'Mesin Laundry', categorySlug: 'mesin-laundry',
    price: 7850000, priceSource: 'catalog-snapshot', image: '/images/dryer-speedqueen.webp', imageAlt: 'Mesin pengering Diamante Ultra Clean gas 10.5 kg Pontianak',
    description: 'Pusat jual dryer Diamante Ultra Clean konversi gas 10,5 kg di Pontianak & Kalbar. Pilihan terfavorit paket usaha laundry kiloan pemula, hemat listrik ruko PLN hanya 150 Watt, kering 100% dalam 40-45 menit, dan suku cadang lengkap tersedia.',
    specs: [{ label: 'Merek', value: 'Diamante' }, { label: 'Kapasitas', value: '10,5 Kg' }, { label: 'Pemanas', value: 'Gas LPG Otomatis' }, { label: 'Daya Listrik', value: '150 Watt' }],
    storeUrl: `${storeUrl}product-category/mesin-laundry-pontianak/`,
  },
  {
    slug: 'mesin-pengering-mr-spin-10-5-kg', legacySlugs: ['jual-dryer-mr-spin-pontianak', 'dryer-mr-spin-gas-pontianak'],
    name: 'Mesin Pengering Mr Spin Gas 10,5 Kg', category: 'Mesin Laundry', categorySlug: 'mesin-laundry',
    price: 7650000, priceSource: 'catalog-snapshot', image: '/images/dryer-speedqueen.webp', imageAlt: 'Mesin pengering Mr Spin gas 10.5 kg Pontianak',
    description: 'Distributor mesin pengering Mr Spin konversi gas LPG 10,5 kg di Pontianak & Kalimantan Barat. Solusi efisiensi tinggi hemat daya listrik PLN (150 Watt), putaran drum stabil, panas merata anti-kusut, dan bergaransi resmi.',
    specs: [{ label: 'Merek', value: 'Mr Spin' }, { label: 'Kapasitas', value: '10,5 Kg' }, { label: 'Pemanas', value: 'Gas LPG' }, { label: 'Daya Listrik', value: '150 Watt' }],
    storeUrl: `${storeUrl}product-category/mesin-laundry-pontianak/`,
  },
  {
    slug: 'setrika-uap-boiler-15-liter', legacySlugs: ['jual-setrika-terdekat', 'setrika-uap-boiler-pontianak'], name: 'Setrika Uap Boiler 15 Liter Gas', category: 'Peralatan Pendukung', categorySlug: 'peralatan-pendukung',
    price: 3850000, priceSource: 'catalog-snapshot', image: '/images/steamer-boiler.webp', imageAlt: 'Setrika uap boiler pada meja setrika dari media My Equipment',
    description: 'Daftar harga dan pusat jual setrika uap boiler 15 liter gas LPG terdekat di Pontianak & Kalbar. Tabung baja tebal anti-gosong, tanpa beban listrik PLN, hasil setrika 3x lebih cepat licin sempurna untuk laundry kiloan.',
    specs: [{ label: 'Kapasitas Tabung', value: '15 Liter' }, { label: 'Bahan Bakar', value: 'Gas LPG (0 Watt Listrik)' }, { label: 'Kepala Setrika', value: '1 - 2 Unit Geser' }, { label: 'Garansi', value: 'Tabung & Servis Resmi' }],
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
    description: 'Deterjen laundry cair konsentrat matic rendah busa (low suds) dalam kemasan 5 liter. Diformulasikan khusus untuk mesin cuci komersial front-loading, efektif mengangkat noda membandel tanpa merusak seal bearing drum.',
    specs: [{ label: 'Kemasan', value: 'Jerigen 5 Liter' }, { label: 'Tipe Busa', value: 'Low Suds (Khusus Mesin Front Load)' }, { label: 'Kategori', value: 'Chemical laundry' }, { label: 'Ketersediaan', value: 'Ready Stock Pontianak' }],
    storeUrl: `${storeUrl}product-category/chemical-laundry-pontianak/`,
  },
  {
    slug: 'parfum-laundry-grade-a-5-liter', name: 'Parfum Laundry Grade A Tahan Lama 5 Liter', category: 'Chemical Laundry', categorySlug: 'chemical-laundry',
    price: 125000, priceSource: 'catalog-snapshot', image: null, imageAlt: 'Parfum laundry konsentrat grade a 5 liter Pontianak',
    description: 'Parfum bibit wangi laundry konsentrat tinggi grade A kemasan 5 liter berbasis pelarut murni standar komersial. Aroma mewah tahan lama 14 hingga 30 hari di dalam kemasan plastik packing tanpa meninggalkan bercak noda kuning pada serat pakaian.',
    specs: [{ label: 'Kemasan', value: 'Jerigen 5 Liter' }, { label: 'Grade Konsentrasi', value: 'Grade A Super Tahan Lama' }, { label: 'Pilihan Aroma Favorit', value: 'Sakura, Ocean Fresh, Snappy, Philux' }, { label: 'Ketersediaan', value: 'Ready Stock Pontianak' }],
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
    slug: 'jarum-pemantik-panjang', name: 'Jarum Pemantik Panjang Pengering Gas (Igniter)', category: 'Suku Cadang', categorySlug: 'suku-cadang',
    price: 65000, priceSource: 'catalog-snapshot', image: '/images/dryer-speedqueen.webp', imageAlt: 'Jarum pemantik panjang busi igniter mesin pengering dryer gas laundry',
    description: 'Suku cadang jarum pemantik panjang (igniter electrode sensor) untuk mesin pengering dryer konversi gas laundry. Menghasilkan loncatan bunga api presisi untuk menyalakan burner gas otomatis pada mesin Diamante, Mr Spin, Speed Queen, Maytag, dan Beko.',
    specs: [{ label: 'Tipe Komponen', value: 'Jarum Pemantik / Busi Igniter Gas' }, { label: 'Ukuran', value: 'Batang Jarum Panjang Presisi' }, { label: 'Kompatibilitas', value: 'Diamante, Mr Spin, Speed Queen, Maytag, Beko' }, { label: 'Ketersediaan', value: 'Ready Stock Pontianak' }],
    storeUrl: `${storeUrl}product-category/spare-part-mesin-pengering-pontianak/`,
  },
  {
    slug: 'solenoid-valve-dryer-gas', name: 'Solenoid Valve Gas Dryer Mesin Pengering 220V', category: 'Suku Cadang', categorySlug: 'suku-cadang',
    price: 175000, priceSource: 'catalog-snapshot', image: '/images/dryer-speedqueen.webp', imageAlt: 'Solenoid valve kran gas elektrik mesin pengering dryer laundry',
    description: 'Katup selenoid gas otomatis 220V untuk mesin pengering laundry konversi gas LPG. Membuka aliran gas seketika saat jarum pemantik memercik dan menutup rapat otomatis saat siklus selesai atau api padam guna menjamin keamanan anti-bocor.',
    specs: [{ label: 'Tipe Komponen', value: 'Solenoid Valve Gas 220V' }, { label: 'Fungsi Pengaman', value: 'Auto Gas Cut-Off (Anti Bocor)' }, { label: 'Daya', value: 'Listrik Rendah AC 220V' }, { label: 'Ketersediaan', value: 'Ready Stock Pontianak' }],
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
  { name: 'Putussibau Sentral Laundry', image: '/images/hero-showroom.webp', permissionConfirmed: true, permissionNote: 'Dokumentasi pengiriman unit peti kayu komersial ke Kapuas Hulu 2026.' },
  { name: 'Ketapang Mandiri Laundry', image: '/images/hero-stage-clean.webp', permissionConfirmed: true, permissionNote: 'Instalasi paket usaha komersial dual-line Ketapang Kalbar 2026.' },
];

export const productBySlug = (slug: string) => products.find((product) => product.slug === slug || product.legacySlugs?.includes(slug));
