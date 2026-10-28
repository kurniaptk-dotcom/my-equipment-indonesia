import { getPool } from '../src/lib/db';
import { loadEnvConfig } from '@next/env';
import { categories, packages, portfolio, products } from '../src/data/catalog';
import { initialFaqs } from '../src/data/faq-seed';

loadEnvConfig(process.cwd());

async function main() {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const hasData = await client.query<{ exists: boolean }>('SELECT EXISTS(SELECT 1 FROM products) AS exists');
    if (hasData.rows[0]?.exists) {
      console.log('Data CMS sudah ada; seed tidak mengubah data yang ada.');
      await client.query('ROLLBACK');
      return;
    }
    for (const [sort, item] of categories.entries()) {
      await client.query('INSERT INTO categories(slug,title,icon,description,sort_order,published) VALUES($1,$2,$3,$4,$5,true)', [item.slug, item.title, item.icon, item.desc, sort]);
    }
    for (const [sort, item] of products.entries()) {
      await client.query('INSERT INTO products(slug,legacy_slugs,name,category_slug,price,price_source,image,image_alt,description,specs,store_url,sort_order,published) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,true)', [item.slug, item.legacySlugs ?? [], item.name, item.categorySlug, item.price, item.priceSource, item.image, item.imageAlt, item.description, JSON.stringify(item.specs), item.storeUrl, sort]);
    }
    for (const [sort, item] of packages.entries()) {
      const amount = Number(item.price.replace(/[^0-9]/g, ''));
      await client.query('INSERT INTO packages(name,label,price,description,image,points,sort_order,published) VALUES($1,$2,$3,$4,$5,$6,$7,true)', [item.name, item.label, amount, item.desc, item.image, JSON.stringify(item.points), sort]);
    }
    for (const [sort, item] of portfolio.entries()) {
      await client.query('INSERT INTO portfolio_items(name,image,sort_order,published,permission_confirmed,permission_note) VALUES($1,$2,$3,true,$4,$5)', [item.name, item.image, sort, item.permissionConfirmed, item.permissionNote]);
    }
    for (const [sort, item] of initialFaqs.entries()) {
      await client.query('INSERT INTO faqs(question,answer,href,sort_order,published) VALUES($1,$2,$3,$4,true)', [item.question, item.answer, item.href, sort]);
    }
    const contact = {
      phone: '+62 895 0444 4471', email: 'myequipmentindonesia@gmail.com', whatsapp: '6289504444471',
      serviceHours: 'Senin–Minggu, 08.00–21.00 WIB. Tanggal merah: libur.',
      serviceHoursSource: 'https://www.myequipmentindonesia.com/paket-usaha-laundry-pontianak/',
      serviceHoursVerifiedAt: '2026-10-27',
      locations: [
        { name: 'Pontianak', address: 'Jl. Adisucipto, Perumahan Teluk Mulus B.31, Kubu Raya, Kalimantan Barat' },
        { name: 'Singkawang', address: 'Jln. Terminal Induk II / Terminal Induk Lama, Kios No. 3, Singkawang' },
      ],
    };
    await client.query("INSERT INTO site_settings(key,value) VALUES('contact',$1)", [JSON.stringify(contact)]);
    await client.query('COMMIT');
    console.log(`Seed selesai: ${categories.length} kategori, ${products.length} produk, ${packages.length} paket, ${portfolio.length} portfolio, ${initialFaqs.length} FAQ.`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => { console.error('Seed gagal:', error.message); process.exit(1); });
