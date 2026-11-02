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
    { name: 'Pontianak & Kubu Raya (Kantor Pusat)', address: 'Jl. Adi Sucipto Perum. Teluk Mulus B No.33, Sungai Raya, Kubu Raya, Kalimantan Barat 78391' },
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

- **Kantor & Showroom Pusat**: Jl. Adi Sucipto Perum. Teluk Mulus B No.33, Sungai Raya, Kab. Kubu Raya, Kalimantan Barat 78391 (arah Bandara Supadio).
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
    title: 'Rincian Modal Usaha Laundry Kiloan di Pontianak & Kalbar 2026: Rencana Anggaran Biaya & Estimasi Balik Modal',
    type: 'article',
    excerpt: 'Panduan lengkap rincian modal awal buka usaha laundry kiloan di Pontianak dan Kalimantan Barat tanpa franchise. Mulai dari estimasi harga mesin komersial, instalasi, chemical, hingga simulasi balik modal (ROI) realistis.',
    coverImage: '/images/laundry-hero.png',
    coverAlt: 'Rincian modal usaha laundry kiloan di Pontianak dan Kalbar',
    contentMarkdown: `## Gambaran Peluang Usaha Laundry Kiloan di Kalimantan Barat

Membuka usaha laundry kiloan di Kalimantan Barat—mulai dari kawasan padat penduduk di Kota Pontianak, Kubu Raya, Singkawang, hingga wilayah kabupaten seperti Sambas, Sintang, dan Ketapang—merupakan salah satu peluang bisnis jasa dengan arus kas harian (*cashflow*) yang paling stabil dan tahan krisis.

Kebutuhan mencuci masyarakat modern kian meningkat seiring padatnya aktivitas kerja, mahasiswa, dan keluarga muda. Ditambah lagi dengan iklim tropis Kalimantan Barat dengan curah hujan yang tinggi, keberadaan outlet laundry yang memiliki mesin pengering (*dryer*) cepat menjadi andalan utama warga sekitar.

Bagi calon pengusaha pemula, pertanyaan paling mendasar yang sering diajukan adalah: **"Berapa modal awal yang sebenarnya dibutuhkan untuk membuka usaha laundry kiloan di Kalbar? Dan berapa lama waktu yang diperlukan hingga modal kembali (Break Even Point / ROI)?"**

Berikut ini adalah bedah lengkap Rencana Anggaran Biaya (RAB) modal awal dan simulasi finansial transparan yang disusun langsung oleh tim konsultan **My Equipment Indonesia** berdasarkan pengalaman mendampingi lebih dari 1.000+ outlet mitra di Kalimantan Barat.

---

## Rincian Komponen Modal Awal Usaha Laundry Kiloan (Tahun 2026)

Secara umum, modal awal membuka usaha laundry kiloan non-franchise terbagi menjadi empat pos pengeluaran utama:

### 1. Mesin & Peralatan Utama (Porsi Terbesar: 65% – 75%)
Peralatan mesin adalah jantung dari bisnis laundry Anda. Menggunakan mesin berstandar komersial (*heavy-duty*) sangat disarankan agar mesin tahan bekerja 8–12 jam setiap hari tanpa mengalami kerusakan terus-menerus.
- **Mesin Cuci Komersial Front-Load**: Kapasitas 10–15 kg dengan putaran peras tinggi (*spin 1200+ RPM*). Putaran peras yang kuat memeras air lebih maksimal sehingga proses pengeringan di dryer menjadi jauh lebih cepat.
- **Mesin Pengering (Dryer) Konversi Gas LPG**: Kapasitas 10–15 kg (Speed Queen, Maytag, atau Unimac). Menggunakan konversi gas LPG menghemat daya listrik PLN hingga 90% (hanya butuh daya listrik ~250 Watt untuk memutar drum mesin).
- **Setrika Uap Boiler Standar Konveksi**: Kapasitas tabung 15–25 Liter lengkap dengan setrika geser kepala uap dan meja vakum (*vacuum table*). Setrika uap boiler tidak meninggalkan bekas mengkilap pada kain, tidak membakar sablon, dan melicinkan pakaian 3x lebih cepat dibanding setrika listrik rumah tangga.

### 2. Instalasi Teknis & Plumbing (Porsi: 10% – 15%)
Instalasi teknis sering kali dilupakan oleh pemula, padahal ini menentukan kelancaran operasional:
- **Jalur Pipa Air & Booster Pump**: Memastikan tekanan suplai air masuk ke mesin cuci stabil minimal 2 bar.
- **Tabung Filter Air (Water Treatment)**: Sangat krusial di wilayah Kalbar yang memiliki sumber air berkarakter gambut atau mengandung zat besi tinggi agar pakaian putih pelanggan tidak menguning.
- **Pemasangan Pipa Gas & Cerobong Exhaust (Ducting)**: Pipa tembaga gas bersertifikasi SNI dan pipa aluminium cerobong buang hawa panas keluar ruangan agar suasana outlet tetap dingin dan nyaman.
- **Instalasi Kelistrikan Aman**: Pemasangan MCB terpisah untuk tiap unit mesin guna mencegah korsleting listrik.

### 3. Paket Chemical & Perlengkapan Operasional Awal (Porsi: 5% – 8%)
- **Stok Chemical Laundry Grade A**: Deterjen konsentrat rendah busa (*low suds* khusus front-load), pelembut pakaian (*softener*), pelicin setrika, parfum laundry kualitas premium, dan bahan pembersih noda (*anti-noda darah, minyak, karat, tinta*).
- **Perlengkapan Kasir & Finishing**: Timbangan digital akurat 30–40 kg, rak susun pakaian bersih, keranjang sortir warna, plastik packing laundry berbagai ukuran, isolasi/sealer, tag gun penanda nomor pakaian pelanggan, dan nota transaksi.

### 4. Sewa Tempat & Branding Ringan (Porsi: 10% – 15%)
- Sewa kios atau ruko kecil ukuran 3x6 meter atau memanfaatkan garasi/teras rumah sendiri.
- Banner/spanduk nama laundry, neon box depan, dan pengecatan dinding outlet agar tampak bersih, higienis, dan profesional di mata pelanggan.

---

## Pilihan Skala Modal Sesuai Anggaran (Tanpa Beban Franchise)

Bersama **My Equipment Indonesia**, Anda tidak diwajibkan membayar *franchise fee* lisensi waralaba atau potongan royalti omset bulanan sepeser pun. Semua keuntungan menjadi milik Anda 100%. Tersedia 3 opsi skala paket usaha yang dapat disesuaikan dengan anggaran Anda:

| Skala Paket Usaha | Estimasi Modal Awal | Rekomendasi Kapasitas Cucian | Cocok Untuk |
| :--- | :--- | :--- | :--- |
| **Paket Pra-Starting / Pemula** | **Rp 15 Juta – Rp 25 Juta** | 25 – 45 kg / hari | Pemula rumahan, ibu rumah tangga, atau lokasi perumahan baru |
| **Paket Starting / Running Reguler** | **Rp 35 Juta – Rp 55 Juta** | 60 – 100 kg / hari | Lokasi strategis dekat kampus, kos-kosan, ruko jalan utama |
| **Paket Growing / Stack Komersial** | **Rp 65 Juta – Rp 120 Juta** | 120 – 250+ kg / hari | Outlet laundry koin/self-service modern, semi-industri, hotel & resto |

*Catatan: Pembelian paket usaha di My Equipment sudah termasuk survei lokasi, pengiriman ke 14 kabupaten/kota se-Kalbar, instalasi lengkap oleh teknisi, serta training operasional dan manajemen SOP gratis.*

---

## Simulasi Perhitungan Omset, Biaya Operasional, dan Balik Modal (BEP)

Mari kita hitung simulasi keuangan nyata untuk **Paket Starting Reguler (Modal Investasi ~Rp 45.000.000)** dengan target pasar di Pontianak atau Kubu Raya:

### 1. Asumsi Pendapatan Bulanan:
- Rata-rata cucian masuk per hari: **60 kg / hari**
- Tarif rata-rata laundry kiloan cuci-kering-setrika di Pontianak: **Rp 7.500 / kg**
- Omset Kotor per Hari: 60 kg x Rp 7.500 = **Rp 450.000**
- **Total Omset Kotor per Bulan (30 Hari)**: 30 x Rp 450.000 = **Rp 13.500.000**

### 2. Biaya Operasional Bulanan (HPP):
- Gas LPG (konversi dryer & boiler): ~Rp 700.000
- Listrik PLN (washer & penerangan): ~Rp 450.000
- Air PDAM / Pengolahan Air: ~Rp 250.000
- Chemical (Deterjen, Softener, Parfum Grade A): ~Rp 900.000
- Plastik Packing, Hanger & Tagging: ~Rp 350.000
- Gaji Karyawan Operator (1 Orang): ~Rp 2.000.000
- Biaya Operasional Lain-Lain & Promosi: ~Rp 350.000
- **Total Biaya Operasional Bulanan**: **Rp 5.000.000**

### 3. Laba Bersih & Waktu Balik Modal:
- **Laba Bersih per Bulan**: Rp 13.500.000 - Rp 5.000.000 = **Rp 8.500.000 / bulan**
- **Waktu Balik Modal (Payback Period)**:
  $$\\text{Waktu Balik Modal} = \\frac{\\text{Modal Investasi Awal}}{\\text{Laba Bersih Bulanan}} = \\frac{\\text{Rp 45.000.000}}{\\text{Rp 8.500.000}} \\approx \\mathbf{5{,}3\\ \\text{Bulan}}$$

Hanya dalam waktu **sekitar 5 hingga 6 bulan**, modal awal Anda sudah kembali sepenuhnya! Setelah titik balik modal tercapai, keuntungan bersih Rp 8.500.000+ per bulan menjadi *passive income* atau sumber modal untuk membuka cabang kedua Anda.

---

## 4 Tips Menghemat Modal dan Memaksimalkan Profit Usaha Laundry di Kalbar

1. **Wajib Memilih Mesin Pengering Konversi Gas Daripada Listrik Murni**  
   Banyak pengusaha pemula terjebak membeli mesin pengering listrik biasa karena harganya tampak murah. Padahal, dryer listrik menyedot daya PLN 2.000–2.500 Watt per unit, yang membuat tagihan listrik membengkak jutaan rupiah dan sering trip jeglek. Dryer konversi gas hanya membutuhkan daya listrik ~250 Watt dan menghemat biaya hingga 75%!
2. **Pasang Filter Air Berkualitas Sejak Awal**  
   Air dengan kandungan zat besi tinggi atau warna kekuningan akan merusak serat pakaian pelanggan dan menimbulkan komplain. Menginvestasikan tabung filter air media silika dan karbon aktif di awal adalah investasi proteksi reputasi laundry Anda.
3. **Pilih Skema Kemitraan Non-Franchise**  
   Dengan memilih paket usaha non-franchise dari My Equipment, Anda menghemat pengeluaran puluhan juta rupiah untuk biaya lisensi nama brand waralaba, dan bebas mengelola harga serta keuntungan 100% secara mandiri.
4. **Hitung Rencana Anggaran Biaya dengan Kalkulator Simulasi Modal**  
   Anda dapat menghitung perkiraan modal awal secara mandiri menggunakan fitur interaktif di website kami melalui halaman [**Simulasi & Estimasi Modal Usaha Laundry**](https://www.myequipmentindonesia.com/estimasi-modal).

---

## Mulai Konsultasi Paket Usaha Laundry Anda Bersama My Equipment

Tertarik memulai usaha laundry kiloan di Pontianak, Kubu Raya, Singkawang, atau kota lainnya di Kalimantan Barat? Tim konsultan **My Equipment Indonesia** siap membantu Anda menyusun Rencana Anggaran Biaya (RAB) yang presisi sesuai modal yang Anda miliki.

- **Katalog Paket Usaha**: Lihat [Pilihan Paket Usaha Laundry](https://www.myequipmentindonesia.com/paket-usaha)
- **Showroom Pusat**: Jl. Adi Sucipto Perum. Teluk Mulus B No.33, Sungai Raya, Kabupaten Kubu Raya, Kalimantan Barat 78391
- **Konsultasi WhatsApp Langsung**: **0895-0444-4471** (*Konsultasi teknis, survei lokasi, dan perhitungan RAB gratis*)`,
    youtubeUrl: 'https://www.youtube.com/watch?v=1S1MumVG5xo',
    eventDate: null,
    eventLocation: null,
    published: true,
    publishedAt: '2026-10-29T10:00:00Z',
    updatedAt: '2026-10-29T10:00:00Z',
  },
  {
    id: 'seed-dryer-gas-vs-listrik',
    slug: 'mesin-pengering-konversi-gas-vs-listrik-laundry-kalbar',
    title: 'Mesin Pengering Konversi Gas vs Listrik: Mana yang Paling Menguntungkan untuk Laundry di Kalbar?',
    type: 'article',
    excerpt: 'Analisis mendalam perbandingan dryer konversi gas LPG vs dryer listrik untuk usaha laundry kiloan di Pontianak dan Kalbar. Cek perbandingan konsumsi daya PLN, biaya operasional per kg, dan efisiensi waktu pengeringan.',
    coverImage: '/images/dryer-speedqueen.png',
    coverAlt: 'Perbandingan mesin pengering konversi gas vs listrik untuk usaha laundry',
    contentMarkdown: `## Dilema Memilih Dryer: Konversi Gas LPG atau Listrik Murni?

Bagi pengusaha laundry kiloan di Kalimantan Barat, musim penghujan adalah momen panen omset terbesar. Ketika matahari tertutup awan mendung dan kelembapan udara mencapai puncaknya, masyarakat berbondong-bondong membawa cucian basah ke outlet laundry.

Namun, kemampuan melayani puluhan hingga ratusan kilogram cucian per hari sangat bergantung pada satu mesin vital: **Mesin Pengering (*Clothes Dryer*)**.

Salah satu pertanyaan paling krusial yang dihadapi calon mitra My Equipment sebelum membeli paket usaha adalah:  
**"Lebih menguntungkan mana untuk usaha laundry di Kalbar, mesin pengering konversi gas LPG atau mesin pengering listrik biasa?"**

Artikel ini menyajikan perbandingan teknis dan finansial mendalam (*head-to-head*) agar Anda dapat mengambil keputusan investasi yang tepat dan menguntungkan.

---

## Tabel Perbandingan Singkat: Dryer Gas vs Dryer Listrik

| Indikator Perbandingan | Mesin Pengering Konversi Gas LPG | Mesin Pengering Listrik Biasa | Pemenang |
| :--- | :--- | :--- | :--- |
| **Konsumsi Daya Listrik PLN** | **200 – 300 Watt** (hanya memutar motor tabung) | **2.000 – 2.500 Watt** (pemanas elemen koil) | 🏆 **Dryer Gas (Hemat 90%)** |
| **Kebutuhan Daya Meteran PLN** | Cukup daya rumah tangga 1.300 / 2.200 VA | Wajib daya industri 4.400 – 7.700+ VA | 🏆 **Dryer Gas** |
| **Biaya Operasional per Putaran (Load)** | **Rp 700 – Rp 1.100** per siklus (Gas LPG) | **Rp 3.500 – Rp 4.500** per siklus (Tarif PLN) | 🏆 **Dryer Gas (Lebih Murah 75%)** |
| **Kecepatan Pengeringan (Durasi)** | **35 – 45 Menit** (kering 100% siap setrika) | **60 – 90 Menit** | 🏆 **Dryer Gas (2x Lebih Cepat)** |
| **Karakteristik Panas Tabung** | Panas api stabil dan cepat merata | Panas bertahap dari elemen listrik | 🏆 **Dryer Gas** |
| **Biaya Tambah Daya PLN di Awal** | **Rp 0** (bisa langsung pakai listrik yang ada) | **Rp 3 Juta – Rp 7 Juta** untuk upgrade kWh | 🏆 **Dryer Gas** |

---

## 1. Beban Daya Listrik PLN di Outlet Usaha

Salah satu kendala terbesar ruko atau kios sewaan di Pontianak, Kubu Raya, Singkawang, dan daerah lainnya di Kalbar adalah keterbatasan daya listrik PLN terpasang, yang umumnya hanya berkisar antara **1.300 VA hingga 2.200 VA**.

- **Pada Dryer Listrik Murni**:  
  Elemen pemanas (*heating element*) mengandalkan arus listrik berkekuatan tinggi, menyerap minimal **2.200 Watt**. Jika Anda mengoperasikan 2 unit dryer listrik bersamaan ditambah mesin cuci dan setrika, listrik dipastikan langsung jeglek (*overload*). Untuk menambah daya meteran PLN ke 5.500 VA atau 7.700 VA, Anda harus mengeluarkan biaya pasang baru PLN sebesar jutaan rupiah, belum termasuk biaya beban tagihan abonemen bulanan yang tinggi.
- **Pada Dryer Konversi Gas LPG**:  
  Sumber energi panas berasal dari api pembakaran gas LPG, sedangkan arus listrik PLN hanya digunakan untuk memutar motor drum dan menjalankan sensor elektronik dengan daya hanya **sekitar 250 Watt**. Anda bahkan bisa mengoperasikan **3 hingga 4 unit mesin dryer gas sekaligus** pada daya listrik standar 1.300 VA tanpa risiko jeglek!

---

## 2. Perhitungan Biaya Operasional (HPP) per Siklus Cucian

Mari kita bandingkan biaya riil untuk mengeringkan 1 tabung pakaian kapasitas 10 kg:

### Menggunakan Dryer Konversi Gas:
- 1 Tabung Gas LPG 3 kg (harga ~Rp 20.000 di Kalbar) dapat digunakan rata-rata untuk **18 hingga 22 siklus pengeringan penuh**.
- Biaya gas per siklus: Rp 20.000 / 20 = **Rp 1.000**.
- Konsumsi listrik motor (250 Watt x 0,7 jam x Rp 1.500/kWh) = **Rp 260**.
- **Total Biaya Pengeringan per Siklus**: **~Rp 1.260 / 10 kg cucian** (Hanya sekitar **Rp 126 per kg**).

### Menggunakan Dryer Listrik:
- Daya elemen pemanas: 2.200 Watt (2,2 kWh).
- Waktu siklus pengeringan listrik: 1,2 jam (72 menit).
- Total konsumsi energi: 2,2 kW x 1,2 jam = 2,64 kWh.
- Tarif listrik PLN komersial/bisnis rata-rata: Rp 1.500 / kWh.
- **Total Biaya Pengeringan per Siklus**: 2,64 kWh x Rp 1.500 = **~Rp 3.960 / 10 kg cucian** (Sekitar **Rp 396 per kg**).

> **Kesimpulan Penghematan**: Dengan mengeringkan 50 kg cucian per hari menggunakan Dryer Konversi Gas, Anda menghemat pengeluaran operasional sekitar **Rp 1.350.000 per bulan** dibandingkan dryer listrik! Dalam kurun waktu satu tahun, penghematan ini setara dengan membeli 1 unit mesin pengering baru!

---

## 3. Kecepatan Perputaran Cucian (*Turnaround Time*)

Di bisnis laundry komersial, **kecepatan adalah kunci kepuasan pelanggan**. Pelanggan laundry kiloan menyukai layanan kilat (*same-day service* atau paket 4 jam selesai).

Sistem pemanas api pada dryer konversi gas mencapai suhu kerja optimal (65°C – 75°C) hanya dalam waktu 2 menit setelah tombol start ditekan. Hasilnya, cucian basah 10–12 kg dapat kering sempurna 100% (bukan sekadar lembap) dalam waktu **35 hingga 45 menit**.

Sementara pada dryer listrik, elemen pemanas membutuhkan waktu pemanasan awal (*pre-heating*) yang lebih lama sehingga satu siklus membutuhkan waktu 60 hingga 90 menit. Akibatnya, terjadi antrean pakaian cucian menumpuk di outlet Anda.

---

## 4. Apakah Konversi Gas LPG Aman?

Banyak pemula merasa ragu karena khawatir dengan faktor keamanan gas LPG. Di **My Equipment Indonesia**, seluruh mesin pengering konversi gas (seperti brand legendaris **Speed Queen, Maytag, dan Unimac**) dikonversi menggunakan suku cadang berstandar industri dengan tiga lapis sistem proteksi otomatis:

1. **Double Solenoid Gas Valve**: Katup gas hanya membuka jika ada sinyal api pemantik aktif. Bila api padam secara tiba-tiba, katup gas akan menutup otomatis dalam hitungan milidetik (*zero gas leak*).
2. **Igniter Otomatis Elektrik**: Sistem penyalaan api otomatis tanpa perlu korek manual.
3. **High-Limit Thermostat Sensor**: Sensor pintar yang otomatis memutus aliran gas jika suhu di dalam drum melebihi batas toleransi aman, sehingga pakaian tidak akan hangus atau rusak.

Tim teknisi My Equipment juga melengkapi instalasi dengan pipa tembaga tebal, selang gas SNI berlapis kawat baja, serta cerobong buang hawa panas aluminium (*exhaust ducting*) yang langsung mengarah keluar ruangan outlet.

---

## Rekomendasi Mesin Dryer Terbaik di My Equipment Indonesia

Untuk kebutuhan usaha laundry kiloan maupun laundromat koin di Kalimantan Barat, My Equipment menyediakan berbagai pilihan mesin pengering komersial siap pakai:

- **Speed Queen Commercial Heavy-Duty (USA)**: Mesin pengering paling populer dan teruji tahan banting puluhan tahun di industri laundry komersial.
- **Maytag Commercial MDG28**: Dryer kapasitas besar dengan drum galvanis anti-karat dan sirkulasi udara optimal.
- **Stack Washer-Dryer Komersial**: Pilihan hemat tempat di mana mesin cuci dan mesin pengering disusun bertingkat ke atas, sangat ideal untuk ruko berukuran minimalis.

Semua unit mesin pengering di My Equipment sudah bergaransi resmi, siap kirim ke seluruh 14 kabupaten/kota se-Kalbar, dan langsung dipasang tuntas oleh teknisi tersertifikasi kami.

---

## Konsultasikan Kebutuhan Mesin Dryer Anda Sekarang

Masih bingung menentukan kombinasi mesin cuci dan mesin pengering yang paling tepat untuk modal Anda? Konsultasikan langsung bersama konsultan spesialis **My Equipment Indonesia**:

- **Katalog Mesin & Dryer**: Kunjungi [Katalog Mesin Laundry](https://www.myequipmentindonesia.com/produk)
- **Paket Usaha Siap Pakai**: Lihat [Paket Usaha Laundry Kalbar](https://www.myequipmentindonesia.com/paket-usaha)
- **WhatsApp Konsultasi**: **0895-0444-4471** (*Gratis panduan setting layout & rekomendasi mesin*)`,
    youtubeUrl: 'https://www.youtube.com/watch?v=jTE2r4FtbCY',
    eventDate: null,
    eventLocation: null,
    published: true,
    publishedAt: '2026-10-29T10:30:00Z',
    updatedAt: '2026-10-29T10:30:00Z',
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
  {
    id: 'seed-solusi-air-gambut',
    slug: 'solusi-air-gambut-dan-kuning-laundry-kalbar',
    title: 'Solusi Air Gambut & Kuning untuk Usaha Laundry di Kalimantan Barat: Panduan Lengkap Water Treatment',
    type: 'article',
    excerpt: 'Tantangan utama laundry di Pontianak, Kubu Raya, dan pesisir Kalbar adalah air gambut kecokelatan dan kadar zat besi tinggi. Pelajari konfigurasi tabung filter pasir silika, karbon aktif, mangan zeolit, dan formula chemical pencerah.',
    coverImage: '/images/case-atma-outlet.jpg',
    coverAlt: 'Instalasi tabung filter air water treatment usaha laundry Kalbar',
    contentMarkdown: `## Tantangan Air Gambut & Kuning bagi Pengusaha Laundry di Kalimantan Barat

Bagi pelaku usaha laundry di Pontianak, Kubu Raya, Mempawah, Sambas, hingga Ketapang, salah satu tantangan operasional terbesar yang dihadapi bukanlah mesin cuci atau mesin pengering, melainkan **kualitas sumber air baku**.

Sebagian besar dataran rendah dan pesisir Kalimantan Barat memiliki karakteristik tanah gambut (*peatland*) dan lapisan alluvial yang menyebabkan sumber air tanah (sumur bor maupun parit) memiliki ciri khas:
1. **Warna kecokelatan seperti teh pekat** akibat peluruhan senyawa organik asam humat dan asam fulvat.
2. **Kadar zat besi (Fe) dan mangan (Mn) tinggi** yang menyebabkan air tampak jernih saat keluar pompa tetapi menguning atau meninggalkan endapan karat kemerahan setelah kontak dengan udara bebas.
3. **Derajat keasaman (pH) rendah** (pH 4,0 – 5,5) yang dapat mengikis seal karet mesin dan menurunkan efektivitas deterjen laundry.

Jika air berkualitas buruk ini langsung dialirkan ke mesin cuci, pakaian putih pelanggan akan berubah kusam kekuningan (*yellowing*), serat kain menjadi kasar kaku, dan aroma cucian menjadi apek meskipun sudah diberi parfum.

---

## 4 Lapis Sistem Filtrasi Air (Water Treatment) Standar My Equipment

Berdasarkan pengalaman mendampingi lebih dari 1.000 outlet di Kalimantan Barat, **My Equipment Indonesia** merekomendasikan setup instalasi penyaringan air bertahap (*multi-stage water filtration*) yang terbukti efektif menghasilkan air jernih standar komersial:

\`\`\`
[Sumber Air Baku] ──> [Tandon Aerasi (Oksidasi Alami)] ──> [Booster Pump]
         │
         ▼
[Tabung FRP 1: Pasir Silika] (Menyaring lumpur & partikel tersuspensi)
         │
         ▼
[Tabung FRP 2: Mangan Zeolit / Ferrolite] (Menyerap zat besi Fe & mangan Mn)
         │
         ▼
[Tabung FRP 3: Karbon Aktif Iodin Tinggi] (Menghilangkan warna teh gambut & bau)
         │
         ▼
[Housing Filter Spun 10" / 20" 1 Micron] (Penyaringan mikro akhir)
         │
         ▼
[Tandon Air Bersih Siap Pakai] ──> [Mesin Cuci Laundry]
\`\`\`

### 1. Tabung Filter Media Pasir Silika (FRP 1054)
Berfungsi menyaring partikel kasat mata, lumpur halus, lumut, dan endapan tanah aluvial. Pasir silika memiliki pori mikro bertingkat yang menjerat kotoran fisik sebelum air masuk ke tahap kimiawi.

### 2. Tabung Filter Mangan Zeolit / Ferrolite
Media khusus ini bertindak sebagai katalisator oksidasi untuk mengikat kandungan zat besi terlarut (Fe) dan mangan (Mn). Air yang semula mengandung bau karat akan dinetralkan sehingga tidak menimbulkan noda kuning pada pakaian pelanggan.

### 3. Tabung Karbon Aktif Berkualitas Tinggi (Iodine Number 800–1000)
Media karbon aktif dari tempurung kelapa (*coconut shell activated carbon*) adalah kunci utama menjernihkan air gambut. Karbon aktif menyerap zat organik asam humat penyebab warna cokelat dan menghilangkan bau tanah atau bau parit yang menyengat.

### 4. Housing Filter Cartridge Spun Polypropylene (1 & 5 Micron)
Filter cartridge kerapatan mikro dipasang tepat sebelum pipa distribusi ke tandon penampungan bersih untuk memastikan tidak ada debu karbon aktif yang lolos ke tabung mesin cuci.

---

## SOP Perawatan & Backwash Filter Air Usaha Laundry

Filter air tidak bisa dibiarkan begitu saja tanpa perawatan berkala. Agar kualitas air tetap stabil, lakukan langkah operasional berikut:

1. **Backwash Harian / 2 Hari Sekali**: Putar tuas katup *3-way valve* tabung FRP ke posisi *Backwash* selama 5–10 menit untuk membilas kotoran yang terperangkap keluar menuju parit pembuangan, lalu putar ke posisi *Fast Rinse* selama 3 menit sebelum kembali ke *Filter*.
2. **Penggantian Spun Cartridge**: Ganti filter cartridge putih 10/20 inch setiap 2 hingga 4 minggu sekali jika warnanya sudah berubah cokelat gelap.
3. **Rejuvenasi Media Karbon & Ferrolite**: Media di dalam tabung FRP umumnya tahan 8 hingga 18 bulan tergantung intensitas pemakaian dan tingkat kepekatan air baku. Hubungi teknisi My Equipment saat air mulai menunjukkan tanda penurunan kejernihan.

---

## Formula Chemical Tambahan untuk Menjaga Cucian Tetap Cemerlang

Selain filter mekanis, pengusaha laundry di Kalbar dianjurkan melengkapi rak chemical dengan bahan pendukung khusus:
- **Oxygen Bleach (Pencerah Oksigen)**: Aman digunakan untuk pakaian putih maupun berwarna, efektif mengangkat sisa pigmen mineral tanpa merusak serat kain.
- **Rust & Mineral Remover (Anti-Noda Karat)**: Cairan spotting khusus untuk menangani noda cipratan air berkarat yang membandel pada pakaian kerja atau seragam sekolah putih.
- **Deterjen Low-Foam dengan Water Softener**: Deterjen komersial My Equipment diformulasikan dengan senyawa pengikat kesadahan air sehingga deterjen tetap berbusa optimal dan aktif mengikat kotoran meskipun pH air sedikit di bawah normal.

---

## Layanan Konsultasi & Setup Water Treatment My Equipment

Membeli paket usaha laundry di **My Equipment Indonesia** sudah mencakup inspeksi awal kualitas air dan rekomendasi instalasi water treatment yang tepat untuk lokasi outlet Anda di Kalimantan Barat:

- **Workshop & Showroom**: Jl. Adi Sucipto Perum. Teluk Mulus B No.33, Sungai Raya, Kubu Raya (dekat Pontianak).
- **Cabang Singkawang**: Terminal Induk II / Terminal Induk Lama Kios No. 3, Singkawang.
- **WhatsApp**: **0895-0444-4471** (*Konsultasi paket usaha laundry dan solusi instalasi air gambut gratis*).`,
    youtubeUrl: 'https://www.youtube.com/watch?v=1S1MumVG5xo',
    eventDate: null,
    eventLocation: null,
    published: true,
    publishedAt: '2026-11-01T08:00:00Z',
    updatedAt: '2026-11-01T08:00:00Z',
  },
  {
    id: 'seed-laundry-koin-untan',
    slug: 'peluang-usaha-laundry-koin-self-service-pontianak-kampus-untan',
    title: 'Peluang Usaha Laundry Koin Self-Service di Kawasan Kampus Pontianak & Untan: Analisis Potensi & Modal',
    type: 'article',
    excerpt: 'Konsep laundromat koin mandiri semakin diminati mahasiswa UNTAN, POLNEP, dan kalangan profesional muda Pontianak. Simak analisis efisiensi tanpa karyawan setrika, sistem koin/QRIS, dan estimasi waktu balik modal.',
    coverImage: '/images/case-happy-family-outlet.jpg',
    coverAlt: 'Outlet laundromat koin self service di sekitar kampus Universitas Tanjungpura Pontianak',
    contentMarkdown: `## Tren Usaha Laundry Koin Self-Service di Pontianak

Dalam beberapa tahun terakhir, gaya hidup mencuci masyarakat perkotaan di Kalimantan Barat—khususnya Kota Pontianak dan Kubu Raya—mengalami pergeseran signifikan. Kehadiran **laundromat mandiri** (*self-service coin laundry*) kian ramai menggantikan kebiasaan mencuci kiloan konvensional yang memakan waktu 2–3 hari.

Kawasan sekitar kampus perguruan tinggi terbesar di Kalimantan Barat, seperti **Universitas Tanjungpura (UNTAN)**, **Politeknik Negeri Pontianak (POLNEP)**, **IKIP PGRI**, dan **IAIN Pontianak**, menjadi lokasi paling subur bagi bisnis laundry koin.

Ribuan mahasiswa rantau dan pekerja kos di sepanjang Jalan Sepakat II, Jalan Reformasi, Jalan Daya Nasional, dan Ampera membutuhkan solusi mencuci yang:
- **Cepat selesai**: Selesai cuci dan kering 100% hanya dalam 60–75 menit.
- **Privasi terjaga**: Pakaian dalam dan pakaian pribadi dicuci sendiri tanpa disentuh orang lain.
- **Pakaian anti-tertukar & anti-hilang**: Satu mesin dipakai eksklusif oleh satu pelanggan.
- **Biaya terjangkau**: Rata-rata Rp 10.000 – Rp 20.000 per siklus cuci/kering untuk kapasitas hingga 7–10 kg.

---

## 4 Keunggulan Bisnis Laundry Koin Dibanding Laundry Kiloan Konvensional

| Parameter Perbandingan | Laundry Koin Self-Service | Laundry Kiloan Konvensional |
| :--- | :--- | :--- |
| **Ketergantungan Karyawan** | Rendah (hanya 1 staf kasir/penjaga kebersihan) | Sangat tinggi (butuh tukang cuci, tukang setrika, checker) |
| **Masalah Komplain Pakaian** | Hampir Nol (pelanggan mencuci sendiri) | Rawan (baju tertukar, kancing hilang, pakaian luntur) |
| **Arus Kas & Pembayaran** | Pembayaran di muka (*Cash / Koin / QRIS*) | Pembayaran mundur saat cucian diambil (rawan piutang macet) |
| **Waktu Perputaran Order** | 1 Jam langsung selesai dibawa pulang | 2–3 hari (menumpuk di rak outlet) |
| **Kebutuhan Ruang Setrika** | Tidak butuh meja setrika & ruang gantung luas | Butuh area setrika uap dan rak susun besar |

### 1. Zero Beban Gaji Karyawan Setrika
Pada laundry konvensional, porsi biaya gaji karyawan setrika memakan 25%–35% dari omset bulanan. Ditambah risiko karyawan tidak masuk kerja saat orderan membludak. Di laundromat koin, pelanggan melakukan pencucian dan pemindahan ke mesin pengering secara mandiri.

### 2. Cash Flow Kas Langsung Cair (No Kasbon)
Pelanggan harus membeli koin/token atau melakukan scan QRIS sebelum mesin menyala. Tidak ada istilah pakaian selesai dicuci tapi tidak kunjung diambil atau kasbon nota yang tidak tertagih.

### 3. Hemat Ruang Operasional dengan Stack Washer-Dryer
Dengan menggunakan unit komersial bertingkat (*stack washer-dryer*), Anda dapat menempatkan 6–8 unit mesin hanya pada ruko atau kios berukuran 4x6 meter, menyisakan area luas untuk kursi tunggu pelanggan dan meja lipat.

---

## Simulasi Finansial & Balik Modal (ROI) Laundry Koin di Pontianak

Berikut adalah proyeksi kalkulasi bisnis realistis untuk outlet laundry koin dengan kapasitas **3 pasang stack washer-dryer (total 3 washer + 3 dryer komersial)** di kawasan kos kampus UNTAN:

### Asumsi Operasional:
- Tarif per siklus cuci: Rp 12.000
- Tarif per siklus pengering: Rp 13.000
- Total paket cuci + kering per konsumen: **Rp 25.000 / load (7–10 kg)**
- Rata-rata perputaran per mesin: 8 siklus/hari
- Total transaksi harian (3 mesin x 8 siklus): **24 transaksi / hari**

### 1. Pendapatan Kotor (Omset):
$\\text{Omset Harian} = 24 \\text{ load} \\times \\text{Rp 25.000} = \\mathbf{\\text{Rp 600.000 / hari}}$
$\\text{Omset Bulanan (30 Hari)} = 30 \\times \\text{Rp 600.000} = \\mathbf{\\text{Rp 18.000.000 / bulan}}$

### 2. Pengeluaran Operasional Bulanan:
- Gas LPG untuk 3 unit dryer konversi (720 siklus x Rp 1.000): Rp 720.000
- Listrik PLN & Air (PDAM / Sumur Bor + Filter): Rp 1.500.000
- Chemical Laundry (Deterjen Konsentrat Rendah Busa & Softener): Rp 1.200.000
- Gaji 1 orang staf shift jaga / kasir / kebersihan: Rp 2.200.000
- Wi-Fi pelanggan & operasional kasir: Rp 350.000
- Alokasi sewa tempat proporsional: Rp 2.500.000
- **Total Biaya Operasional**: **Rp 8.470.000 / bulan**

### 3. Laba Bersih & Waktu Balik Modal:
$\\text{Laba Bersih Bulanan} = \\text{Rp 18.000.000} - \\text{Rp 8.470.000} = \\mathbf{\\text{Rp 9.530.000 / bulan}}$

Dengan modal investasi paket stack koin komersial lengkap instalasi sekitar Rp 75–85 juta, titik impas (**Break Even Point**) tercapai dalam kurun waktu **sekitar 8 hingga 9 bulan**!

---

## Fasilitas Pendukung yang Disukai Mahasiswa & Pelanggan Koin

Untuk memastikan laundromat Anda menjadi pilihan utama anak kos di sekitar Pontianak, lengkapi outlet Anda dengan:
1. **Free Wi-Fi Berkecepatan Tinggi**: Mahasiswa dapat mengerjakan tugas kuliah atau streaming video sambil menunggu 45 menit cucian selesai.
2. **Stopkontak Charger & Meja Nyaman**: Meja kerja minimalis dengan colokan handphone/laptop.
3. **Sistem Pembayaran Fleksibel**: Menyediakan opsi koin fisik maupun mesin QRIS otomatis (GoPay, OVO, Dana, ShopeePay, BCA).
4. **Vending Machine Minuman Dingin**: Menambah pendapatan sampingan (*side income*) sekaligus memberikan kenyamanan ekstra.

---

## Konsultasi & Pengadaan Paket Laundry Koin Bersama My Equipment

**My Equipment Indonesia** menyediakan paket lengkap usaha laundry koin mandiri siap buka di seluruh wilayah Kalimantan Barat:

- **Mesin Komersial Heavy-Duty**: Stack Washer & Dryer Speed Queen, Maytag, atau Foggia komersial dengan drum baja kokoh.
- **Sistem Koin & Token Box Terintegrasi**: Mekanisme koin anti-macet dengan kunci master brankas koin yang aman.
- **Instalasi Pipa, Gas, & Filter Air Selesai di Tempat**: Tim teknisi kami menangani instalasi komplit hingga uji coba operasional (*commissioning*).
- **100% Kepemilikan Mandiri**: Tanpa franchise fee, tanpa bagi hasil royalti, dan nama outlet sepenuhnya milik Anda.

Kunjungi showroom kami atau diskusikan rancangan outlet Anda:
- **Showroom Pusat**: Jl. Adi Sucipto Perum. Teluk Mulus B No.33, Sungai Raya, Kubu Raya (arah Bandara Supadio).
- **Kios Cabang Singkawang**: Terminal Induk II / Terminal Induk Lama Kios No. 3, Singkawang.
- **WhatsApp Konsultasi Cepat**: **0895-0444-4471** (*Gratis panduan layout dan RAB bisnis laundry koin*)`,
    youtubeUrl: 'https://www.youtube.com/watch?v=zzSh9yeSZH0',
    eventDate: null,
    eventLocation: null,
    published: true,
    publishedAt: '2026-11-02T09:00:00Z',
    updatedAt: '2026-11-02T09:00:00Z',
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
