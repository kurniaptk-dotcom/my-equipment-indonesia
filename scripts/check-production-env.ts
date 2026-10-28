const required = [
  'DATABASE_URL',
  'AUTH_SECRET',
  'AUTH_URL',
  'CMS_PUBLIC_URL',
  'CMS_S3_REGION',
  'CMS_S3_BUCKET',
  'CMS_S3_ACCESS_KEY',
  'CMS_S3_SECRET_KEY',
  'CMS_MEDIA_PUBLIC_URL',
] as const;

const missing = required.filter((key) => !process.env[key]?.trim());
const problems: string[] = missing.map((key) => `${key} belum diisi.`);

function parseUrl(key: string, protocols: string[]) {
  const raw = process.env[key];
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (!protocols.includes(parsed.protocol)) throw new Error();
    return parsed;
  } catch {
    problems.push(`${key} harus URL valid dengan protokol ${protocols.join(' atau ')}.`);
    return null;
  }
}

const database = process.env.DATABASE_URL;
if (database) {
  try {
    const url = new URL(database);
    if (!['postgres:', 'postgresql:'].includes(url.protocol) || !url.hostname) throw new Error();
  } catch {
    problems.push('DATABASE_URL harus memakai URL PostgreSQL yang valid.');
  }
}

if ((process.env.AUTH_SECRET?.length ?? 0) < 32) problems.push('AUTH_SECRET harus memiliki minimal 32 karakter.');
const authUrl = parseUrl('AUTH_URL', ['https:']);
const publicUrl = parseUrl('CMS_PUBLIC_URL', ['https:']);
parseUrl('CMS_MEDIA_PUBLIC_URL', ['https:']);
const endpoint = process.env.CMS_S3_ENDPOINT;
if (endpoint) parseUrl('CMS_S3_ENDPOINT', ['https:']);
if (authUrl && publicUrl && authUrl.origin !== publicUrl.origin) problems.push('AUTH_URL dan CMS_PUBLIC_URL harus menggunakan origin yang sama.');

if (problems.length) {
  console.error('Pemeriksaan konfigurasi produksi gagal:');
  for (const problem of problems) console.error(`- ${problem}`);
  process.exitCode = 1;
} else {
  console.log('Konfigurasi produksi wajib tersedia dan valid. Nilai rahasia tidak ditampilkan.');
}
