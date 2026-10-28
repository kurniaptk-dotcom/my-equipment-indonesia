import { Pool } from 'pg';

const globalPool = globalThis as typeof globalThis & { cmsPool?: Pool };

export function databaseConfigured() {
  if (process.env.NODE_ENV !== 'production' && process.env.USE_LOCAL_SEED_CONTENT === 'true') return false;
  return Boolean(process.env.DATABASE_URL);
}

export function getPool() {
  if (!process.env.DATABASE_URL) throw new Error('DATABASE_URL belum dikonfigurasi.');
  if (!globalPool.cmsPool) {
    globalPool.cmsPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false' } : undefined,
      max: Number(process.env.DATABASE_POOL_SIZE ?? 10),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
  }
  return globalPool.cmsPool;
}

export async function query<T extends Record<string, unknown> = Record<string, unknown>>(text: string, values: unknown[] = []) {
  return getPool().query<T>(text, values);
}
