import 'server-only';
import { cache } from 'react';
import { categories as seedCategories, packages as seedPackages, portfolio as seedPortfolio, products as seedProducts } from '@/data/catalog';
import { initialFaqs } from '@/data/faq-seed';
import { databaseConfigured, query } from '@/lib/db';

export type CmsCategory = { slug: string; title: string; icon: string; desc: string; sortOrder: number; published: boolean };
export type CmsProduct = (typeof seedProducts)[number] & { sortOrder: number; published: boolean };
export type CmsPackage = { name: string; label: string; price: string; priceValue: number; desc: string; image: string; points: string[]; sortOrder: number; published: boolean };
export type CmsPortfolioItem = { id: string; name: string; image: string; sortOrder: number; published: boolean; permissionConfirmed: boolean; permissionNote: string };
export type CmsPromo = { id: string; title: string; description: string; sourceUrl: string; startsAt: string; endsAt: string; image: string | null; sortOrder: number; published: boolean };
export type CmsFaq = { id: string; question: string; answer: string; href: string; sortOrder: number; published: boolean };
export type CmsArticle = { id: string; slug: string; title: string; type: 'article'|'activity'; excerpt: string; coverImage: string|null; coverAlt: string; contentMarkdown: string; youtubeUrl: string|null; eventDate: string|null; eventLocation: string|null; published: boolean; publishedAt: string|null; updatedAt: string };
export type ContactSettings = { phone: string; email: string; whatsapp: string; locations: { name: string; address: string }[]; serviceHours: string; serviceHoursSource: string; serviceHoursVerifiedAt: string };
export type SeoSettings = { siteName: string; defaultTitle: string; description: string; socialImage: string; socialImageAlt: string };

const currency = (amount: number) => `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`;
const fallbackContact: ContactSettings = {
  phone: '+62 895 0444 4471', email: 'myequipmentindonesia@gmail.com', whatsapp: '6289504444471',
  serviceHours: 'Senin–Minggu, 08.00–21.00 WIB. Tanggal merah: libur.',
  serviceHoursSource: 'https://www.myequipmentindonesia.com/paket-usaha-laundry-pontianak/',
  serviceHoursVerifiedAt: '2026-10-27',
  locations: [
    { name: 'Pontianak', address: 'Jl. Adisucipto, Perumahan Teluk Mulus B.31, Kubu Raya, Kalimantan Barat' },
    { name: 'Singkawang', address: 'Jln. Terminal Induk II / Terminal Induk Lama, Kios No. 3, Singkawang' },
  ],
};
export const fallbackSeoSettings: SeoSettings = {
  siteName: 'My Equipment Indonesia',
  defaultTitle: 'My Equipment Indonesia | Solusi Usaha Laundry',
  description: 'Pusat mesin dan perlengkapan usaha laundry. Konsultasi paket usaha, mesin laundry, chemical, cleaning, serta suku cadang bersama My Equipment Indonesia.',
  socialImage: '/images/laundry-hero.webp',
  socialImageAlt: 'Perlengkapan usaha laundry My Equipment Indonesia',
};

export async function getCategories(includeUnpublished = false): Promise<CmsCategory[]> {
  if (!databaseConfigured()) return seedCategories.map((item, sortOrder) => ({ slug: item.slug, title: item.title, icon: item.icon, desc: item.desc, sortOrder, published: true }));
  try {
    const { rows } = await query('SELECT slug,title,icon,description,sort_order,published FROM categories ' + (includeUnpublished ? '' : 'WHERE published=true ') + 'ORDER BY sort_order,title');
    return rows.map((row) => ({ slug: String(row.slug), title: String(row.title), icon: String(row.icon), desc: String(row.description), sortOrder: Number(row.sort_order), published: Boolean(row.published) }));
  } catch (error) {
    console.warn('Gagal memuat kategori dari database, menggunakan fallback data:', error);
    return seedCategories.map((item, sortOrder) => ({ slug: item.slug, title: item.title, icon: item.icon, desc: item.desc, sortOrder, published: true }));
  }
}

export async function getProducts(includeUnpublished = false): Promise<CmsProduct[]> {
  if (!databaseConfigured()) return seedProducts.map((item, sortOrder) => ({ ...item, sortOrder, published: true }));
  try {
    const { rows } = await query(`SELECT p.*, c.title AS category_title FROM products p LEFT JOIN categories c ON c.slug=p.category_slug ${includeUnpublished ? '' : 'WHERE p.published=true AND c.published=true'} ORDER BY p.sort_order,p.name`);
    return rows.map((row) => ({ slug: String(row.slug), legacySlugs: (row.legacy_slugs as string[]) ?? [], name: String(row.name), category: String(row.category_title ?? row.category_slug), categorySlug: String(row.category_slug), price: row.price === null ? null : Number(row.price), priceSource: row.price_source as 'catalog-snapshot' | 'confirm', image: row.image ? String(row.image) : null, imageAlt: String(row.image_alt), description: String(row.description), specs: row.specs as { label: string; value: string }[], storeUrl: String(row.store_url), sortOrder: Number(row.sort_order), published: Boolean(row.published) }));
  } catch (error) {
    console.warn('Gagal memuat produk dari database, menggunakan fallback data:', error);
    return seedProducts.map((item, sortOrder) => ({ ...item, sortOrder, published: true }));
  }
}

export async function getProductBySlug(slug: string, includeUnpublished = false) {
  if (!databaseConfigured()) {
    const products = await getProducts(includeUnpublished);
    return products.find((product) => product.slug === slug || product.legacySlugs?.includes(slug));
  }
  try {
    const visibility = includeUnpublished ? '' : 'AND p.published=true AND c.published=true';
    const { rows } = await query(`SELECT p.*, c.title AS category_title FROM products p LEFT JOIN categories c ON c.slug=p.category_slug
      WHERE (p.slug=$1 OR p.legacy_slugs @> ARRAY[$1]::text[]) ${visibility} LIMIT 1`, [slug]);
    const row = rows[0];
    if (!row) return undefined;
    return {
      slug: String(row.slug), legacySlugs: (row.legacy_slugs as string[]) ?? [], name: String(row.name),
      category: String(row.category_title ?? row.category_slug), categorySlug: String(row.category_slug),
      price: row.price === null ? null : Number(row.price), priceSource: row.price_source as 'catalog-snapshot' | 'confirm',
      image: row.image ? String(row.image) : null, imageAlt: String(row.image_alt), description: String(row.description),
      specs: row.specs as { label: string; value: string }[], storeUrl: String(row.store_url),
      sortOrder: Number(row.sort_order), published: Boolean(row.published),
    };
  } catch (error) {
    console.warn('Gagal memuat produk by slug dari database, menggunakan fallback data:', error);
    const products = await getProducts(includeUnpublished);
    return products.find((product) => product.slug === slug || product.legacySlugs?.includes(slug));
  }
}

export async function getPackages(includeUnpublished = false): Promise<CmsPackage[]> {
  if (!databaseConfigured()) return seedPackages.map((item, sortOrder) => ({ ...item, priceValue: Number(item.price.replace(/[^0-9]/g, '')), sortOrder, published: true }));
  try {
    const { rows } = await query('SELECT * FROM packages ' + (includeUnpublished ? '' : 'WHERE published=true ') + 'ORDER BY sort_order,name');
    return rows.map((row) => ({ name: String(row.name), label: String(row.label), priceValue: Number(row.price), price: currency(Number(row.price)), desc: String(row.description), image: String(row.image ?? ''), points: row.points as string[], sortOrder: Number(row.sort_order), published: Boolean(row.published) }));
  } catch (error) {
    console.warn('Gagal memuat paket dari database, menggunakan fallback data:', error);
    return seedPackages.map((item, sortOrder) => ({ ...item, priceValue: Number(item.price.replace(/[^0-9]/g, '')), sortOrder, published: true }));
  }
}

export async function getPortfolio(includeUnpublished = false): Promise<CmsPortfolioItem[]> {
  if (!databaseConfigured()) return seedPortfolio.map((item, sortOrder) => ({ id: `seed-${sortOrder}`, ...item, sortOrder, published: true })).filter((item) => includeUnpublished || (item.published && item.permissionConfirmed));
  try {
    const { rows } = await query('SELECT id,name,image,sort_order,published,permission_confirmed,permission_note FROM portfolio_items ' + (includeUnpublished ? '' : 'WHERE published=true AND permission_confirmed=true ') + 'ORDER BY sort_order,name');
    return rows.map((row) => ({ id: String(row.id), name: String(row.name), image: String(row.image), sortOrder: Number(row.sort_order), published: Boolean(row.published), permissionConfirmed: Boolean(row.permission_confirmed), permissionNote: String(row.permission_note ?? '') }));
  } catch (error) {
    console.warn('Gagal memuat portfolio dari database, menggunakan fallback data:', error);
    return seedPortfolio.map((item, sortOrder) => ({ id: `seed-${sortOrder}`, ...item, sortOrder, published: true })).filter((item) => includeUnpublished || (item.published && item.permissionConfirmed));
  }
}

export async function getPromos(includeUnpublished = false): Promise<CmsPromo[]> {
  if (!databaseConfigured()) return [];
  try {
    const today = new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
    const { rows } = await query(`SELECT id,title,description,source_url,starts_at,ends_at,image,sort_order,published FROM promos ${includeUnpublished ? '' : 'WHERE published=true AND starts_at<=$1::date AND ends_at>=$1::date'} ORDER BY sort_order,starts_at DESC`, includeUnpublished?[]:[today]);
    return rows.map((row) => ({ id: String(row.id), title: String(row.title), description: String(row.description), sourceUrl: String(row.source_url), startsAt: String(row.starts_at).slice(0,10), endsAt: String(row.ends_at).slice(0,10), image: row.image ? String(row.image) : null, sortOrder: Number(row.sort_order), published: Boolean(row.published) }));
  } catch (error) {
    console.warn('Gagal memuat promo dari database, menggunakan fallback data:', error);
    return [];
  }
}

export async function getFaqs(includeUnpublished = false): Promise<CmsFaq[]> {
  if (!databaseConfigured()) return initialFaqs.map((item, sortOrder) => ({ id: `seed-${sortOrder}`, ...item, sortOrder, published: true }));
  try {
    const { rows } = await query('SELECT id,question,answer,href,sort_order,published FROM faqs ' + (includeUnpublished ? '' : 'WHERE published=true ') + 'ORDER BY sort_order,id');
    return rows.map((row) => ({ id: String(row.id), question: String(row.question), answer: String(row.answer), href: String(row.href), sortOrder: Number(row.sort_order), published: Boolean(row.published) }));
  } catch (error) {
    console.warn('Gagal memuat FAQ dari database, menggunakan fallback data:', error);
    return initialFaqs.map((item, sortOrder) => ({ id: `seed-${sortOrder}`, ...item, sortOrder, published: true }));
  }
}

export const seedArticles: CmsArticle[] = [
  {
    id: 'seed-pusat-paket-laundry-kalbar',
    slug: 'pusat-paket-usaha-laundry-kalbar-my-equipment-tanpa-franchise',
    title: 'Mengenal My Equipment: Pusat Paket Usaha Laundry Terlengkap Tanpa Franchise di Kalimantan Barat',
    type: 'article',
    excerpt: 'Solusi lengkap membuka usaha laundry di Pontianak dan seluruh Kalbar tanpa biaya franchise & royalti. Tersedia kustomisasi paket usaha sesuai anggaran dan pendampingan manajemen seumur hidup.',
    coverImage: '/images/laundry-hero.png',
    coverAlt: 'Pusat Paket Usaha Laundry Kalbar My Equipment Indonesia',
    contentMarkdown: `## Solusi Buka Usaha Laundry Tanpa Beban Franchise di Kalimantan Barat

Membuka usaha laundry kiloan maupun komersial kian diminati masyarakat di Kalimantan Barat, mulai dari kawasan padat penduduk di Kota Pontianak, Kubu Raya, Singkawang, hingga wilayah kabupaten seperti Sambas, Sintang, dan Ketapang. Namun, salah satu kekhawatiran terbesar pemula adalah beban biaya kemitraan yang mahal seperti *Franchise Fee* awal dan potongan *Royalty Fee* bulanan.

Hadir sejak tahun 2019, **My Equipment Indonesia** (dikenal juga sebagai **Pusat Mesin Laundry Kalbar**) hadir memberikan solusi berbeda: penyediaan paket usaha laundry lengkap dengan kepemilikan 100% mandiri, tanpa sistem bagi hasil atau royalti sepeser pun.

---

### Keunggulan Memilih Paket Usaha Non-Franchise My Equipment

1. **100% Keuntungan Milik Anda**
   Semua omset dan laba bersih yang dihasilkan outlet sepenuhnya menjadi hak milik Anda tanpa potongan bulanan. Anda juga bebas menentukan nama merek (*brand*) outlet laundry Anda sendiri tanpa terikat lisensi waralaba.

2. **Paket Usaha yang Dapat Dikustomisasi (Customizable)**
   Setiap calon pengusaha memiliki ketersediaan modal dan target pasar yang berbeda. Tim konsultan My Equipment membantu menyusun Rencana Anggaran Biaya (RAB) dan spesifikasi mesin yang paling pas dengan modal Anda, mulai dari:
   - **Paket Pra-Starting / Small Starting**: Estimasi modal belasan juta rupiah, sangat ideal untuk pemula atau laundry rumahan.
   - **Paket Starting**: Kombinasi mesin cuci komersial dan dryer gas untuk melayani cucian reguler 50–80 kg/hari.
   - **Paket Running**: Paket kapasitas menengah bagi outlet yang berlokasi di dekat kampus atau kawasan perumahan padat.
   - **Paket Growing**: Paket komersial kapasitas besar atau model koin stack (*self-service laundromat*) dengan sistem otomasi modern.

3. **Layanan End-to-End: Pengiriman, Instalasi & Training**
   Membeli mesin di My Equipment bukan sekadar transaksi jual beli putus. Pembelian paket usaha sudah mencakup:
   - Pengiriman unit mesin ke seluruh 14 kabupaten/kota di Kalimantan Barat.
   - Instalasi teknis lengkap oleh teknisi berpengalaman (jalur perpipaan air, tandon booster, instalasi cerobong hawa panas dryer, dan kelistrikan aman).
   - Training SOP operasional, tata cara takaran *chemical* laundry, teknik setrika uap boiler, hingga pelatihan kasir.

4. **Bonus Pendampingan Manajemen Laundry Seumur Hidup**
   Mitra My Equipment mendapatkan akses konsultasi langsung seputar strategi promosi lokal, penentuan harga jual per kilogram, hingga penanganan komplain pakaian pelanggan agar usaha laundry Anda bertahan dan berkembang pesat.

---

### Kunjungi Workshop & Showroom Resmi di Kubu Raya & Singkawang

Bagi Anda yang ingin melihat langsung unit mesin cuci *front-load*, dryer komersial *heavy-duty*, dan setrika uap boiler beroperasi, Anda dapat mengunjungi lokasi workshop kami:

- **Kantor & Showroom Pusat**: Jl. Adisucipto, Perumahan Teluk Mulus B.31, Kec. Sungai Raya, Kab. Kubu Raya, Kalimantan Barat (arah Bandara Supadio).
- **Kios Cabang Singkawang**: Terminal Induk II / Terminal Induk Lama, Kios No. 3, Kota Singkawang.
- **Konsultasi WhatsApp**: +62 895-0444-4471 (*Layanan konsultasi gratis & survei kebutuhan mesin*).`,
    youtubeUrl: 'https://www.youtube.com/watch?v=1S1MumVG5xo',
    eventDate: null,
    eventLocation: null,
    published: true,
    publishedAt: '2026-10-26T09:00:00Z',
    updatedAt: '2026-10-26T09:00:00Z',
  },
  {
    id: 'seed-paket-laundry-sepatu-helm',
    slug: 'peluang-bisnis-paket-laundry-sepatu-dan-helm-pontianak',
    title: 'Peluang Bisnis Laundry Sepatu & Helm di Pontianak: Modal Terjangkau, Margin Tinggi',
    type: 'article',
    excerpt: 'Tren sneakers care dan perawatan helm kian ramai di kalangan generasi muda Kalimantan Barat. Simak ulasan paket usaha spesialis sepatu & helm lengkap dengan perlengkapan dan chemical premium.',
    coverImage: '/images/chemical-laundry.jpg',
    coverAlt: 'Perlengkapan dan chemical paket laundry sepatu helm My Equipment',
    contentMarkdown: `## Membuka Bisnis Laundry Sepatu & Helm (Sneakers Care) di Kalimantan Barat

Tren bersepatu *sneakers* serta kesadaran pengendara motor merawat kebersihan helm telah melahirkan peluang usaha jasa baru yang sangat menggiurkan di Pontianak dan sekitarnya: **Laundry Sepatu dan Helm**.

Berbeda dengan laundry kiloan konvensional yang mengandalkan volume cucian berbobot kilogram, laundry sepatu dan helm merupakan bisnis jasa berbasis keahlian (*specialty care*) dengan margin keuntungan per transaksi mencapai 70% hingga 80%.

---

### Mengapa Usaha Laundry Sepatu & Helm Sangat Potensial di Kalbar?

1. **Iklim Tropis & Musim Penghujan**
   Curah hujan yang tinggi di Kalimantan Barat kerap membuat sepatu basah, berlumpur, serta helm menjadi lembap dan berbau apek. Banyak konsumen enggan mencuci sepatu mahal mereka sendiri karena takut rusak atau pudar.

2. **Nilai Jasa per Unit Tinggi**
   Biaya jasa cuci sepatu deep-clean di area perkotaan berkisar antara **Rp 30.000 hingga Rp 75.000 per pasang**, sedangkan cuci helm berkisar **Rp 25.000 hingga Rp 50.000**. Dengan modal bahan kimia (*chemical*) hanya Rp 3.000–Rp 5.000 per pasang, potensi laba bersih hariannya sangat menguntungkan.

3. **Kebutuhan Ruang Usaha Minimalis**
   Usaha ini tidak membutuhkan ruko besar. Anda bahkan bisa memulai dari teras rumah atau kios kecil berukuran 2x3 meter di dekat area kampus (seperti kawasan UNTAN) atau pusat keramaian pemuda di Pontianak.

---

### Komponen Paket Usaha Laundry Sepatu & Helm My Equipment

My Equipment Indonesia menghadirkan **Paket Khusus Laundry Sepatu & Helm** siap pakai yang mencakup seluruh instrumen penting:

- **Mesin Pengering Sepatu & Helm Khusus**: Dilengkapi pemanas suhu terkontrol dan sinar UV/Ozon untuk membunuh bakteri penyebab bau apek tanpa merusak lem sol sepatu.
- **Set Sikat Premium (Standard, Hard, Brass, & Horsehair Brush)**: Dirancang khusus agar aman untuk berbagai jenis material kain (kanvas, kulit/leather, suede, mesh, hingga nubuck).
- **Chemical Pembersih Standar Profesional**:
  - *Cleaner Foam*: Cairan pembersih lembut rendah air.
  - *Unyellowing Agent*: Cairan khusus mengembalikan midsole putih yang menguning akibat oksidasi.
  - *Leather Conditioner*: Menjaga elastisitas dan kilau bahan kulit asli maupun sintetis.
  - *Water Repellent Spray*: Pelapis nano anti-air untuk proteksi sepatu setelah dicuci.
  - *Disinfectant & Fragrance Spray*: Pewangi antibakteri khusus busa helm.
- **SOP & Training Treatment Langsung**: Edukasi teknik *dry cleaning*, pembersihan noda membandel (*spotting*), dan penanganan material sensitif.

Untuk informasi detail mengenai rincian harga paket dan katalog chemical sepatu helm, tim My Equipment siap melayani konsultasi langsung via WhatsApp di **0895-0444-4471**.`,
    youtubeUrl: null,
    eventDate: null,
    eventLocation: null,
    published: true,
    publishedAt: '2026-10-24T10:30:00Z',
    updatedAt: '2026-10-24T10:30:00Z',
  },
  {
    id: 'seed-dokumentasi-ekspedisi-singkawang-sambas',
    slug: 'dokumentasi-pengiriman-instalasi-paket-laundry-singkawang-sambas',
    title: 'Dokumentasi Pengiriman & Instalasi Paket Usaha Laundry ke Singkawang dan Sambas',
    type: 'activity',
    excerpt: 'Laporan ekspedisi armada My Equipment mengantar unit mesin cuci komersial dan dryer konversi gas, instalasi filter air anti-gambut, serta pelatihan SOP mesin untuk mitra di Singkawang dan Sambas.',
    coverImage: '/images/case-atma-outlet.jpg',
    coverAlt: 'Pengiriman dan instalasi mesin laundry komersial di Singkawang dan Sambas',
    contentMarkdown: `## Pengiriman Armada & Instalasi Outlet Mitra di Wilayah Pantura Kalbar

Tim teknisi dan armada logistik My Equipment Indonesia kembali menyelesaikan penugasan pengiriman serta instalasi paket usaha laundry komersial untuk mitra kami di wilayah Pantai Utara (Pantura) Kalimantan Barat, yaitu Kota Singkawang dan Kabupaten Sambas.

Pengiriman ini merupakan bagian dari komitmen layanan My Equipment dalam mendampingi calon pengusaha laundry di seluruh penjuru Kalbar, memastikan mesin sampai dengan aman dan dapat langsung beroperasi tanpa kendala.

---

### Rangkaian Pekerjaan Instalasi di Lokasi Mitra

1. **Mobilisasi & Penempatan Mesin**
   Tim membawa 2 unit mesin cuci front-load kapasitas 10 kg dan 2 unit dryer komersial konversi gas LPG. Unit mesin diposisikan secara ergonomis dengan sistem stacking bracket kokoh untuk menghemat luas lantai outlet.

2. **Instalasi Sistem Penyaringan Air (Water Treatment)**
   Karakteristik air tanah di sebagian wilayah pesisir Kalbar memerlukan perhatian khusus pada kadar zat besi dan warna gambut. Tim memasang tabung filter media pasir silika dan karbon aktif dengan pompa pendorong (*booster pump*) agar suplai air bersih masuk ke mesin cuci dengan tekanan stabil minimal 2 bar.

3. **Pemasangan Pipa Gas LPG & Cerobong Hawa Panas (Ducting)**
   Jalur gas pengering dikoneksikan menggunakan pipa tembaga tebal dan selang berstandar SNI. Cerobong pembuangan hawa panas dibuat mengarah keluar ruangan melalui pipa fleksibel aluminium tahan karat untuk menjaga sirkulasi udara di dalam outlet tetap sejuk.

4. **Uji Coba Operasional (Commissioning Test) & Training SOP**
   Setelah semua instalasi terpasang, teknisi melakukan *trial wash* dan pengeringan penuh untuk memastikan tidak ada getaran berlebih, kebocoran air, atau suhu dryer yang tidak merata. Pemilik outlet dan karyawan baru diberikan modul pelatihan standar penggunaan mesin, takaran deterjen ramah lingkungan, serta teknik perawatan filter serat harian.

---

Selamat kepada mitra baru My Equipment di Singkawang dan Sambas atas *soft opening* outletnya! Semoga usahanya terus berkembang pesat dan menjadi solusi kebersihan pakaian andalan masyarakat sekitar.`,
    youtubeUrl: 'https://www.youtube.com/watch?v=zzSh9yeSZH0',
    eventDate: '2026-10-22',
    eventLocation: 'Singkawang & Sambas, Kalimantan Barat',
    published: true,
    publishedAt: '2026-10-22T08:00:00Z',
    updatedAt: '2026-10-22T08:00:00Z',
  },
  {
    id: 'seed-panduan-memilih-mesin',
    slug: 'cara-memilih-mesin-cuci-laundry-kiloan',
    title: 'Panduan Memilih Mesin Cuci Komersial untuk Usaha Laundry Kiloan',
    type: 'article',
    excerpt: 'Tips praktis memilih mesin cuci komersial berdaya tahan tinggi, hemat air dan listrik untuk operasional laundry kiloan harian.',
    coverImage: '/images/washer-lg-8kg.jpg',
    coverAlt: 'Mesin cuci front load komersial My Equipment',
    contentMarkdown: `## Memilih Mesin Cuci yang Tepat untuk Usaha Laundry

Memulai usaha laundry membutuhkan perencanaan kapasitas mesin yang matang. Mesin komersial dirancang untuk siklus pencucian intensif setiap hari dengan efisiensi air dan listrik yang jauh lebih baik daripada mesin rumah tangga biasa.

### 1. Perhatikan Kapasitas Tabung dan Siklus Harian
Untuk laundry kiloan dengan target 50–100 kg per hari, kombinasi 2 hingga 3 unit mesin kapasitas 8–15 kg akan memberikan fleksibilitas operasional terbaik. Jika salah satu mesin sedang mencuci beban besar seperti bedcover, mesin lainnya tetap bisa beroperasi untuk pakaian reguler.

### 2. Efisiensi Air, Listrik, dan Putaran RPM
Pilihlah mesin cuci front load berkecepatan spin tinggi (1200–1400 RPM). Semakin tinggi RPM saat pemerasan, semakin sedikit kadar air yang tersisa pada pakaian, sehingga waktu proses pengeringan di mesin dryer menjadi jauh lebih singkat dan hemat gas.

### 3. Ketersediaan Suku Cadang dan Layanan Servis
Pastikan penyedia mesin memberikan garansi resmi dan dukungan teknisi lokal yang siap membantu maintenance berkala mesin Anda. Tim My Equipment siap mendampingi kebutuhan setup dan perbaikan berkala di wilayah Kalimantan Barat.`,
    youtubeUrl: 'https://www.youtube.com/watch?v=1S1MumVG5xo',
    eventDate: null,
    eventLocation: null,
    published: true,
    publishedAt: '2026-10-20T08:00:00Z',
    updatedAt: '2026-10-20T08:00:00Z',
  },
  {
    id: 'seed-estimasi-roi-laundry',
    slug: 'estimasi-balik-modal-usaha-laundry-kalbar',
    title: 'Estimasi Balik Modal (ROI) Buka Usaha Laundry Kiloan di Kalimantan Barat',
    type: 'article',
    excerpt: 'Simulasi perhitungan modal awal, biaya operasional bulanan, dan proyeksi keuntungan bersih laundry kiloan hingga titik impas (BEP).',
    coverImage: '/images/laundry-hero.png',
    coverAlt: 'Peralatan dan mesin laundry komersial',
    contentMarkdown: `## Analisis Finansial Usaha Laundry Kiloan di Kalbar

Bisnis laundry kiloan merupakan salah satu usaha jasa dengan perputaran kas harian yang stabil. Kebutuhan mencuci masyarakat perkotaan seperti Pontianak, Singkawang, dan Kubu Raya terus meningkat seiring padatnya aktivitas kerja dan perkuliahan.

### Rincian Modal Awal (Skala Kecil-Menengah)
- **Paket Mesin & Dryer Komersial**: Rp 35.000.000 – Rp 48.000.000
- **Instalasi Pipa Air, Gas & Listrik**: Rp 2.500.000 – Rp 3.500.000
- **Perlengkapan (Timbangan, Keranjang, Rak, Tag Gun)**: Rp 2.000.000
- **Stok Chemical (Deterjen, Parfum, Sour, Anti Noda)**: Rp 1.500.000

### Proyeksi Pendapatan Bulanan
Dengan rata-rata volume cucian 50 kg per hari pada tarif Rp 8.000/kg:
- **Omset Kotor**: 50 kg x Rp 8.000 x 30 hari = **Rp 12.000.000/bulan**
- **Biaya Operasional (Deterjen, Gas, Listrik, Air, Gaji)**: ~Rp 4.500.000/bulan
- **Keuntungan Bersih**: ~**Rp 7.500.000/bulan**

Dengan margin keuntungan tersebut, rata-rata mitra My Equipment dapat mencapai Break Even Point (BEP) dalam waktu 6 hingga 9 bulan pertama.`,
    youtubeUrl: null,
    eventDate: null,
    eventLocation: null,
    published: true,
    publishedAt: '2026-10-15T09:00:00Z',
    updatedAt: '2026-10-15T09:00:00Z',
  },
  {
    id: 'seed-perawatan-mesin-dryer',
    slug: 'perawatan-mesin-dryer-speed-queen-gas',
    title: 'Panduan Perawatan Mesin Pengering Speed Queen & Konversi Gas Aman',
    type: 'article',
    excerpt: 'Langkah mudah membersihkan filter lint, mengecek regulator gas, dan menjaga keawetan mesin dryer komersial agar performa selalu maksimal.',
    coverImage: '/images/dryer-speedqueen.png',
    coverAlt: 'Mesin pengering Speed Queen komersial',
    contentMarkdown: `## Menjaga Performa Mesin Dryer Komersial Tetap Awet

Mesin pengering (dryer) adalah tulang punggung operasional laundry kiloan, terutama di musim penghujan. Perawatan preventif yang tepat dapat mencegah kerusakan motor drum dan memastikan efisiensi konsumsi gas LPG.

### 1. Bersihkan Filter Lint (Serat Kain) Setiap 2-3 Siklus
Penumpukan serat kain di filter udara dapat menghambat sirkulasi udara panas. Akibatnya, waktu pengeringan menjadi lebih lama dan komponen thermostat bekerja terlalu keras.

### 2. Gunakan Regulator dan Selang Gas Berstandar SNI
Pastikan konversi gas dilakukan oleh teknisi bersertifikasi. Gunakan regulator bertekanan rendah yang stabil dan lakukan pengecekan kebocoran selang dengan busa sabun secara berkala setiap penggantian tabung gas.

### 3. Pengecekan Roller dan Fan Blower
Setiap 6 bulan sekali, mintalah teknisi resmi My Equipment untuk memeriksa kondisi v-belt, roller drum, dan membersihkan debu pada kipas blower pengering.`,
    youtubeUrl: 'https://www.youtube.com/watch?v=jTE2r4FtbCY',
    eventDate: null,
    eventLocation: null,
    published: true,
    publishedAt: '2026-10-10T10:00:00Z',
    updatedAt: '2026-10-10T10:00:00Z',
  },
  {
    id: 'seed-instalasi-self-service',
    slug: 'dokumentasi-instalasi-laundry-self-service-pontianak',
    title: 'Dokumentasi Instalasi & Pelatihan Outlet Laundry Self-Service di Pontianak',
    type: 'activity',
    excerpt: 'Laporan kegiatan setup 6 unit mesin koin komersial, instalasi jalur pipa air tandon booster, dan pelatihan staf manajemen outlet mitra.',
    coverImage: '/images/case-happy-family-outlet.jpg',
    coverAlt: 'Instalasi outlet laundry self service di Pontianak',
    contentMarkdown: `## Pendampingan Menyeluruh dari Desain Outlet hingga Siap Beroperasi

Tim teknisi My Equipment baru saja menyelesaikan proyek instalasi sistem laundry mandiri (self-service laundromat) di kawasan Pontianak Kota. Proyek ini mencakup perakitan 3 unit stack washer-dryer komersial berkapasitas 15 kg.

### Tahapan Instalasi yang Dilakukan
1. **Pemasangan Jalur Pipa Air & Booster Pump**: Memastikan debit air konstan ke setiap mesin dengan tekanan minimal 2 bar.
2. **Sistem Pembuangan Gas Buang (Ducting Dryer)**: Pembuangan hawa panas dibuat menggunakan pipa spiral aluminium anti-karat langsung ke area luar outlet.
3. **Pelatihan Sistem Operasional & SOP Kasir**: Tim My Equipment memberikan edukasi langsung mengenai penanganan chemical laundry dan trouble-shooting ringan kepada pemilik serta staf outlet.`,
    youtubeUrl: 'https://www.youtube.com/watch?v=zzSh9yeSZH0',
    eventDate: '2026-10-05',
    eventLocation: 'Jl. Reformasi, Pontianak',
    published: true,
    publishedAt: '2026-10-05T07:00:00Z',
    updatedAt: '2026-10-05T07:00:00Z',
  },
  {
    id: 'seed-sop-cucian-wangi',
    slug: 'sop-operasional-laundry-kiloan-anti-luntur',
    title: 'Standar Operasional (SOP) Laundry Kiloan: Rahasia Cucian Wangi & Anti-Luntur',
    type: 'article',
    excerpt: 'Metode sortir pakaian, takaran deterjen rendah busa, penetral chemical, dan teknik penyetrikaan uap untuk hasil laundry berstandar hotel.',
    coverImage: '/images/chemical-laundry.jpg',
    coverAlt: 'Chemical laundry deterjen dan parfum laundry',
    contentMarkdown: `## SOP Profesional untuk Menjaga Loyalitas Pelanggan Laundry

Kualitas hasil cucian yang bersih, higienis, dan wangi tahan lama adalah kunci utama keberhasilan usaha laundry. Banyak konsumen berpindah tempat laundry karena pakaian mereka kusam, luntur, atau apek.

### 1. Tahap Sortir Berdasarkan Warna dan Jenis Bahan
Jangan pernah mencampur pakaian warna putih dengan pakaian berwarna gelap pada pencucian pertama. Pisahkan pula bahan berbulu tebal seperti handuk dan selimut dari kain sutra atau katun tipis.

### 2. Gunakan Deterjen Komersial Rendah Busa (Low Foam)
Mesin front load memerlukan deterjen khusus bertipe low foam dengan daya bersih kuat (optical brightener). Busa yang terlalu banyak justru menghambat gaya jatuh pakaian di dalam drum dan membuat hasil bilasan kurang bersih.

### 3. Pengaplikasian Parfum Laundry Berbasis Alkohol
Parfum laundry waterless (berbasis alkohol) sebaiknya disemprotkan saat proses packing akhir pakaian yang sudah dingin, bukan saat pakaian masih panas dari setrika uap. Ini memastikan aroma parfum terkunci sempurna di serat kain.`,
    youtubeUrl: null,
    eventDate: null,
    eventLocation: null,
    published: true,
    publishedAt: '2026-09-28T11:00:00Z',
    updatedAt: '2026-09-28T11:00:00Z',
  },
];

export async function getArticles(includeUnpublished = false): Promise<CmsArticle[]> {
  if (!databaseConfigured()) return seedArticles.filter((item) => includeUnpublished || item.published);
  try {
    const { rows } = await query(`SELECT id,slug,title,type,excerpt,cover_image AS "coverImage",cover_alt AS "coverAlt",content_markdown AS "contentMarkdown",youtube_url AS "youtubeUrl",event_date AS "eventDate",event_location AS "eventLocation",published,published_at AS "publishedAt",updated_at AS "updatedAt" FROM articles ${includeUnpublished ? '' : 'WHERE published=true '} ORDER BY published_at DESC NULLS LAST,updated_at DESC`);
    return rows.map((row) => ({ ...row, id:String(row.id),slug:String(row.slug),title:String(row.title),type:row.type as 'article'|'activity',excerpt:String(row.excerpt),coverImage:row.coverImage?String(row.coverImage):null,coverAlt:String(row.coverAlt),contentMarkdown:String(row.contentMarkdown),youtubeUrl:row.youtubeUrl?String(row.youtubeUrl):null,eventDate:row.eventDate?String(row.eventDate).slice(0,10):null,eventLocation:row.eventLocation?String(row.eventLocation):null,published:Boolean(row.published),publishedAt:row.publishedAt?new Date(String(row.publishedAt)).toISOString():null,updatedAt:new Date(String(row.updatedAt)).toISOString() }));
  } catch (error) {
    console.warn('Gagal memuat artikel dari database, menggunakan fallback data:', error);
    return seedArticles.filter((item) => includeUnpublished || item.published);
  }
}
export async function getArticleBySlug(slug: string, includeUnpublished = false) {
  return (await getArticles(includeUnpublished)).find((article) => article.slug === slug);
}

export const getContactSettings = cache(async (): Promise<ContactSettings> => {
  if (!databaseConfigured()) return fallbackContact;
  try {
    const { rows } = await query<{ value: ContactSettings }>("SELECT value FROM site_settings WHERE key='contact'");
    return { ...fallbackContact, ...rows[0]?.value };
  } catch (error) {
    console.warn('Gagal memuat kontak dari database, menggunakan fallback data:', error);
    return fallbackContact;
  }
});

export const getSeoSettings = cache(async (): Promise<SeoSettings> => {
  if (!databaseConfigured()) return fallbackSeoSettings;
  try {
    const { rows } = await query<{ value: Partial<SeoSettings> }>("SELECT value FROM site_settings WHERE key='seo'");
    return { ...fallbackSeoSettings, ...rows[0]?.value };
  } catch (error) {
    console.warn('Gagal memuat SEO settings dari database, menggunakan fallback data:', error);
    return fallbackSeoSettings;
  }
});

export async function getAdminCounts() {
  if (!databaseConfigured()) return { products: seedProducts.length, categories: seedCategories.length, packages: seedPackages.length, portfolio: seedPortfolio.length, promos: 0, faqs: initialFaqs.length, articles: 0, users: 0 };
  const { rows } = await query(`SELECT (SELECT count(*) FROM products)::int products,(SELECT count(*) FROM categories)::int categories,(SELECT count(*) FROM packages)::int packages,(SELECT count(*) FROM portfolio_items)::int portfolio,(SELECT count(*) FROM promos)::int promos,(SELECT count(*) FROM faqs)::int faqs,(SELECT count(*) FROM articles)::int articles,(SELECT count(*) FROM cms_users)::int users`);
  return rows[0] as Record<string, number>;
}

export async function getAdminRecords(section: string): Promise<Record<string, unknown>[]> {
  if (!databaseConfigured()) throw new Error('Konfigurasikan DATABASE_URL lalu jalankan migrasi dan seed CMS.');
  const sources: Record<string, string> = {
    products: `SELECT slug,legacy_slugs AS "legacySlugs",name,category_slug AS "categorySlug",price,price_source AS "priceSource",image,image_alt AS "imageAlt",description,specs,store_url AS "storeUrl",sort_order AS "sortOrder",published FROM products ORDER BY sort_order,name`,
    categories: `SELECT slug,title,icon,description AS desc,sort_order AS "sortOrder",published FROM categories ORDER BY sort_order,title`,
    packages: `SELECT id,name,label,price,description AS desc,image,points,sort_order AS "sortOrder",published FROM packages ORDER BY sort_order,name`,
    portfolio: `SELECT id,name,image,sort_order AS "sortOrder",published,permission_confirmed AS "permissionConfirmed",permission_note AS "permissionNote" FROM portfolio_items ORDER BY sort_order,name`,
    promos: `SELECT id,title,description,source_url AS "sourceUrl",starts_at AS "startsAt",ends_at AS "endsAt",image,sort_order AS "sortOrder",published FROM promos ORDER BY sort_order,title`,
    faqs: `SELECT id,question,answer,href,sort_order AS "sortOrder",published FROM faqs ORDER BY sort_order,id`,
    articles: `SELECT id,slug,title,type,excerpt,cover_image AS "coverImage",cover_alt AS "coverAlt",content_markdown AS "contentMarkdown",youtube_url AS "youtubeUrl",event_date AS "eventDate",event_location AS "eventLocation",published,published_at AS "publishedAt",updated_at AS "updatedAt" FROM articles ORDER BY updated_at DESC`,
  };
  if (section === 'settings') return [{ ...(await getContactSettings()) }];
  if (section === 'seo') return [{ ...(await getSeoSettings()) }];
  if (section === 'users') {
    const { rows } = await query('SELECT id,email,full_name AS "fullName",role,active,created_at AS "createdAt" FROM cms_users ORDER BY created_at');
    return rows;
  }
  const sql = sources[section];
  if (!sql) throw new Error('Bagian CMS tidak dikenal.');
  const { rows } = await query(sql);
  return rows as Record<string, unknown>[];
}
