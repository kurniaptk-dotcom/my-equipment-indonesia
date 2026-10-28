import argon2 from 'argon2';
import { loadEnvConfig } from '@next/env';
import { getPool } from '../src/lib/db';

loadEnvConfig(process.cwd());

async function main() {
  const email=process.env.CMS_RESET_EMAIL?.trim().toLowerCase();
  const password=process.env.CMS_RESET_PASSWORD;
  if(!email || !password || password.length<12) throw new Error('Set CMS_RESET_EMAIL dan CMS_RESET_PASSWORD (minimal 12 karakter).');
  const pool=getPool();
  const hash=await argon2.hash(password,{type:argon2.argon2id});
  const result=await pool.query("UPDATE cms_users SET password_hash=$1,active=true,updated_at=now() WHERE email=$2 AND role='admin'",[hash,email]);
  await pool.end();
  if(!result.rowCount) throw new Error('Admin tidak ditemukan. Periksa CMS_RESET_EMAIL.');
  console.log(`Password Admin ${email} berhasil direset. Password tidak ditampilkan.`);
}
main().catch((error)=>{console.error('Reset gagal:',error.message);process.exit(1)});
