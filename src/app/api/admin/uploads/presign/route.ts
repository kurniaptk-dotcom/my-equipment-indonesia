import { randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { z } from 'zod';
import { requireCmsUser } from '@/lib/access';

export const runtime = 'nodejs';
const uploadSchema = z.object({ filename: z.string().min(1).max(180), contentType: z.enum(['image/jpeg','image/png','image/webp']), size: z.number().int().positive().max(10 * 1024 * 1024) });
const extension: Record<string,string> = { 'image/jpeg':'jpg', 'image/png':'png', 'image/webp':'webp' };

export async function POST(request: Request) {
  try {
    await requireCmsUser();
    const parsed = uploadSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: 'File harus JPG, PNG, atau WebP dan maksimal 10 MB.' }, { status: 400 });
    const { CMS_S3_BUCKET: bucket, CMS_S3_REGION: region, CMS_S3_ACCESS_KEY: accessKeyId, CMS_S3_SECRET_KEY: secretAccessKey, CMS_MEDIA_PUBLIC_URL: publicBase } = process.env;
    if (!bucket || !region || !accessKeyId || !secretAccessKey || !publicBase) return NextResponse.json({ error: 'Konfigurasi object storage belum lengkap.' }, { status: 503 });
    const objectKey = `cms/${new Date().toISOString().slice(0,10)}/${randomUUID()}.${extension[parsed.data.contentType]}`;
    const client = new S3Client({ region, endpoint: process.env.CMS_S3_ENDPOINT || undefined, forcePathStyle: Boolean(process.env.CMS_S3_ENDPOINT), credentials: { accessKeyId, secretAccessKey } });
    const command = new PutObjectCommand({ Bucket: bucket, Key: objectKey, ContentType: parsed.data.contentType, ContentLength: parsed.data.size });
    const uploadUrl = await getSignedUrl(client, command, { expiresIn: 300 });
    const base = publicBase.replace(/\/$/, '');
    const publicUrl = `${base}/${objectKey.split('/').map(encodeURIComponent).join('/')}`;
    return NextResponse.json({ uploadUrl, publicUrl, method: 'PUT', headers: { 'Content-Type': parsed.data.contentType } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Upload tidak dapat disiapkan.';
    const status = message.includes('Sesi admin') ? 401 : 500;
    if (status !== 401) console.error('CMS media presign failed:', error);
    return NextResponse.json({ error: status === 401 ? 'Silakan masuk kembali.' : 'Upload belum dapat disiapkan. Coba lagi atau hubungi Admin.' }, { status });
  }
}
