import { getPool } from '../src/lib/db';
import { loadEnvConfig } from '@next/env';

require.cache[require.resolve('server-only')] = {
  id: require.resolve('server-only'),
  filename: require.resolve('server-only'),
  loaded: true,
  exports: {},
} as any;

loadEnvConfig(process.cwd());

async function main() {
  const { seedArticles } = await import('../src/lib/content');
  const pool = getPool(process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL);
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    let inserted = 0;
    let updated = 0;
    for (const item of seedArticles) {
      const res = await client.query(
        `INSERT INTO articles(slug,title,type,excerpt,cover_image,cover_alt,content_markdown,youtube_url,event_date,event_location,published,published_at,updated_at)
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
         ON CONFLICT (slug) DO UPDATE SET
           title = EXCLUDED.title,
           type = EXCLUDED.type,
           excerpt = EXCLUDED.excerpt,
           cover_image = EXCLUDED.cover_image,
           cover_alt = EXCLUDED.cover_alt,
           content_markdown = EXCLUDED.content_markdown,
           youtube_url = EXCLUDED.youtube_url,
           published = EXCLUDED.published,
           published_at = EXCLUDED.published_at,
           updated_at = EXCLUDED.updated_at
         RETURNING (xmax = 0) AS is_insert`,
        [item.slug, item.title, item.type, item.excerpt, item.coverImage, item.coverAlt, item.contentMarkdown, item.youtubeUrl, item.eventDate, item.eventLocation, item.published, item.publishedAt, item.updatedAt]
      );
      if (res.rows[0]?.is_insert) {
        inserted++;
      } else {
        updated++;
      }
    }
    await client.query('COMMIT');
    console.log(`Sinkronisasi artikel selesai: ${inserted} artikel baru dimasukkan, ${updated} artikel diperbarui. Total seed: ${seedArticles.length}.`);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch((error) => {
  console.error('Sinkronisasi artikel gagal:', error);
  process.exit(1);
});
