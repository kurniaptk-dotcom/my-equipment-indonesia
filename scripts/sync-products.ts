import { getPool } from '../src/lib/db';
import { loadEnvConfig } from '@next/env';
import { products } from '../src/data/catalog';

require.cache[require.resolve('server-only')] = {
  id: require.resolve('server-only'),
  filename: require.resolve('server-only'),
  loaded: true,
  exports: {},
} as any;

loadEnvConfig(process.cwd());

async function main() {
  const pool = getPool(process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL);
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    let inserted = 0;
    let updated = 0;
    for (const [sort, item] of products.entries()) {
      const res = await client.query(
        `INSERT INTO products(slug,legacy_slugs,name,category_slug,price,price_source,image,image_alt,description,specs,store_url,sort_order,published)
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,true)
         ON CONFLICT (slug) DO UPDATE SET
           legacy_slugs = EXCLUDED.legacy_slugs,
           name = EXCLUDED.name,
           category_slug = EXCLUDED.category_slug,
           price = EXCLUDED.price,
           price_source = EXCLUDED.price_source,
           image = EXCLUDED.image,
           image_alt = EXCLUDED.image_alt,
           description = EXCLUDED.description,
           specs = EXCLUDED.specs,
           store_url = EXCLUDED.store_url,
           sort_order = EXCLUDED.sort_order,
           published = true
         RETURNING (xmax = 0) AS is_insert`,
        [item.slug, item.legacySlugs ?? [], item.name, item.categorySlug, item.price, item.priceSource, item.image, item.imageAlt, item.description, JSON.stringify(item.specs), item.storeUrl, sort]
      );
      if (res.rows[0]?.is_insert) {
        inserted++;
      } else {
        updated++;
      }
    }
    await client.query('COMMIT');
    console.log(`Sinkronisasi produk selesai: ${inserted} produk baru dimasukkan, ${updated} produk diperbarui. Total katalog: ${products.length}.`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error('Sinkronisasi produk gagal:', error);
  process.exit(1);
});
