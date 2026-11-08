import { Pool } from 'pg';

const globalPool = globalThis as typeof globalThis & { cmsPool?: Pool };

export function databaseConfigured() {
  if (process.env.NODE_ENV !== 'production' && process.env.USE_LOCAL_SEED_CONTENT === 'true') return false;
  return Boolean(process.env.DATABASE_URL);
}

export function getPool(customConnectionString?: string) {
  const connectionString = customConnectionString || process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL belum dikonfigurasi.');

  const isCloud = connectionString.includes('neon.tech') || connectionString.includes('sslmode=require');
  const useSsl = process.env.DATABASE_SSL === 'true' || isCloud;
  const sslConfig = useSsl ? { rejectUnauthorized: process.env.DATABASE_SSL_REJECT_UNAUTHORIZED !== 'false' } : undefined;

  if (customConnectionString) {
    return new Pool({
      connectionString,
      ssl: sslConfig,
      max: Number(process.env.DATABASE_POOL_SIZE ?? 10),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  }

  if (!globalPool.cmsPool) {
    globalPool.cmsPool = new Pool({
      connectionString,
      ssl: sslConfig,
      max: Number(process.env.DATABASE_POOL_SIZE ?? 10),
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
  }
  return globalPool.cmsPool;
}

export async function query<T extends Record<string, unknown> = Record<string, unknown>>(text: string, values: unknown[] = []) {
  return getPool().query<T>(text, values);
}
