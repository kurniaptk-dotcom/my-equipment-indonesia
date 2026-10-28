import argon2 from 'argon2';
import { loadEnvConfig } from '@next/env';
import { getPool } from '../src/lib/db';

loadEnvConfig(process.cwd());

async function main() {
  const email = process.env.CMS_BOOTSTRAP_EMAIL?.trim().toLowerCase();
  const password = process.env.CMS_BOOTSTRAP_PASSWORD;
  const fullName = process.env.CMS_BOOTSTRAP_NAME?.trim() || 'Administrator';
  if (!email || !password || password.length < 12) throw new Error('Set CMS_BOOTSTRAP_EMAIL dan CMS_BOOTSTRAP_PASSWORD (minimal 12 karakter) sebelum menjalankan bootstrap.');
  const pool = getPool();
  const existing = await pool.query('SELECT id FROM cms_users WHERE role=\'admin\' LIMIT 1');
  if (existing.rowCount) throw new Error('Admin sudah ada; gunakan alur reset password admin.');
  const passwordHash = await argon2.hash(password, { type: argon2.argon2id });
  await pool.query('INSERT INTO cms_users(email,full_name,password_hash,role,active) VALUES($1,$2,$3,\'admin\',true)', [email, fullName, passwordHash]);
  await pool.end();
  console.log(`Admin ${email} berhasil dibuat. Password tidak ditampilkan.`);
}

main().catch((error) => { console.error('Bootstrap gagal:', error.message); process.exit(1); });
