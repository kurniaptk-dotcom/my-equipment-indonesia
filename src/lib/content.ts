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
  const { rows } = await query('SELECT slug,title,icon,description,sort_order,published FROM categories ' + (includeUnpublished ? '' : 'WHERE published=true ') + 'ORDER BY sort_order,title');
  return rows.map((row) => ({ slug: String(row.slug), title: String(row.title), icon: String(row.icon), desc: String(row.description), sortOrder: Number(row.sort_order), published: Boolean(row.published) }));
}

export async function getProducts(includeUnpublished = false): Promise<CmsProduct[]> {
  if (!databaseConfigured()) return seedProducts.map((item, sortOrder) => ({ ...item, sortOrder, published: true }));
  const { rows } = await query(`SELECT p.*, c.title AS category_title FROM products p LEFT JOIN categories c ON c.slug=p.category_slug ${includeUnpublished ? '' : 'WHERE p.published=true AND c.published=true'} ORDER BY p.sort_order,p.name`);
  return rows.map((row) => ({ slug: String(row.slug), legacySlugs: (row.legacy_slugs as string[]) ?? [], name: String(row.name), category: String(row.category_title ?? row.category_slug), categorySlug: String(row.category_slug), price: row.price === null ? null : Number(row.price), priceSource: row.price_source as 'catalog-snapshot' | 'confirm', image: row.image ? String(row.image) : null, imageAlt: String(row.image_alt), description: String(row.description), specs: row.specs as { label: string; value: string }[], storeUrl: String(row.store_url), sortOrder: Number(row.sort_order), published: Boolean(row.published) }));
}

export async function getProductBySlug(slug: string, includeUnpublished = false) {
  if (!databaseConfigured()) {
    const products = await getProducts(includeUnpublished);
    return products.find((product) => product.slug === slug || product.legacySlugs?.includes(slug));
  }
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
}

export async function getPackages(includeUnpublished = false): Promise<CmsPackage[]> {
  if (!databaseConfigured()) return seedPackages.map((item, sortOrder) => ({ ...item, priceValue: Number(item.price.replace(/[^0-9]/g, '')), sortOrder, published: true }));
  const { rows } = await query('SELECT * FROM packages ' + (includeUnpublished ? '' : 'WHERE published=true ') + 'ORDER BY sort_order,name');
  return rows.map((row) => ({ name: String(row.name), label: String(row.label), priceValue: Number(row.price), price: currency(Number(row.price)), desc: String(row.description), image: String(row.image ?? ''), points: row.points as string[], sortOrder: Number(row.sort_order), published: Boolean(row.published) }));
}

export async function getPortfolio(includeUnpublished = false): Promise<CmsPortfolioItem[]> {
  if (!databaseConfigured()) return seedPortfolio.map((item, sortOrder) => ({ id: `seed-${sortOrder}`, ...item, sortOrder, published: true })).filter((item) => includeUnpublished || (item.published && item.permissionConfirmed));
  const { rows } = await query('SELECT id,name,image,sort_order,published,permission_confirmed,permission_note FROM portfolio_items ' + (includeUnpublished ? '' : 'WHERE published=true AND permission_confirmed=true ') + 'ORDER BY sort_order,name');
  return rows.map((row) => ({ id: String(row.id), name: String(row.name), image: String(row.image), sortOrder: Number(row.sort_order), published: Boolean(row.published), permissionConfirmed: Boolean(row.permission_confirmed), permissionNote: String(row.permission_note ?? '') }));
}

export async function getPromos(includeUnpublished = false): Promise<CmsPromo[]> {
  if (!databaseConfigured()) return [];
  const today = new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Bangkok',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
  const { rows } = await query(`SELECT id,title,description,source_url,starts_at,ends_at,image,sort_order,published FROM promos ${includeUnpublished ? '' : 'WHERE published=true AND starts_at<=$1::date AND ends_at>=$1::date'} ORDER BY sort_order,starts_at DESC`, includeUnpublished?[]:[today]);
  return rows.map((row) => ({ id: String(row.id), title: String(row.title), description: String(row.description), sourceUrl: String(row.source_url), startsAt: String(row.starts_at).slice(0,10), endsAt: String(row.ends_at).slice(0,10), image: row.image ? String(row.image) : null, sortOrder: Number(row.sort_order), published: Boolean(row.published) }));
}

export async function getFaqs(includeUnpublished = false): Promise<CmsFaq[]> {
  if (!databaseConfigured()) return initialFaqs.map((item, sortOrder) => ({ id: `seed-${sortOrder}`, ...item, sortOrder, published: true }));
  const { rows } = await query('SELECT id,question,answer,href,sort_order,published FROM faqs ' + (includeUnpublished ? '' : 'WHERE published=true ') + 'ORDER BY sort_order,id');
  return rows.map((row) => ({ id: String(row.id), question: String(row.question), answer: String(row.answer), href: String(row.href), sortOrder: Number(row.sort_order), published: Boolean(row.published) }));
}

export const seedArticles: CmsArticle[] = [
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
  const { rows } = await query(`SELECT id,slug,title,type,excerpt,cover_image AS "coverImage",cover_alt AS "coverAlt",content_markdown AS "contentMarkdown",youtube_url AS "youtubeUrl",event_date AS "eventDate",event_location AS "eventLocation",published,published_at AS "publishedAt",updated_at AS "updatedAt" FROM articles ${includeUnpublished ? '' : 'WHERE published=true '} ORDER BY published_at DESC NULLS LAST,updated_at DESC`);
  return rows.map((row) => ({ ...row, id:String(row.id),slug:String(row.slug),title:String(row.title),type:row.type as 'article'|'activity',excerpt:String(row.excerpt),coverImage:row.coverImage?String(row.coverImage):null,coverAlt:String(row.coverAlt),contentMarkdown:String(row.contentMarkdown),youtubeUrl:row.youtubeUrl?String(row.youtubeUrl):null,eventDate:row.eventDate?String(row.eventDate).slice(0,10):null,eventLocation:row.eventLocation?String(row.eventLocation):null,published:Boolean(row.published),publishedAt:row.publishedAt?new Date(String(row.publishedAt)).toISOString():null,updatedAt:new Date(String(row.updatedAt)).toISOString() }));
}
export async function getArticleBySlug(slug: string, includeUnpublished = false) {
  return (await getArticles(includeUnpublished)).find((article) => article.slug === slug);
}

export const getContactSettings = cache(async (): Promise<ContactSettings> => {
  if (!databaseConfigured()) return fallbackContact;
  const { rows } = await query<{ value: ContactSettings }>("SELECT value FROM site_settings WHERE key='contact'");
  return { ...fallbackContact, ...rows[0]?.value };
});

export const getSeoSettings = cache(async (): Promise<SeoSettings> => {
  if (!databaseConfigured()) return fallbackSeoSettings;
  const { rows } = await query<{ value: Partial<SeoSettings> }>("SELECT value FROM site_settings WHERE key='seo'");
  return { ...fallbackSeoSettings, ...rows[0]?.value };
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
