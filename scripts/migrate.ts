import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { loadEnvConfig } from '@next/env';
import { getPool } from '../src/lib/db';

loadEnvConfig(process.cwd());

async function main() {
  const directory = join(process.cwd(), 'src/db/migrations');
  const files = (await readdir(directory)).filter((file) => file.endsWith('.sql')).sort();
  const pool = getPool();
  for (const file of files) {
    console.log(`Menjalankan migrasi ${file}`);
    await pool.query(await readFile(join(directory, file), 'utf8'));
  }
  await pool.end();
  console.log('Migrasi selesai.');
}

main().catch((error) => { console.error('Migrasi gagal:', error.message); process.exit(1); });
