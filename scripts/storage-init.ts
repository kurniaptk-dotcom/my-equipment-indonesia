import { loadEnvConfig } from '@next/env';
import { CreateBucketCommand, PutBucketCorsCommand, PutBucketPolicyCommand, S3Client } from '@aws-sdk/client-s3';

loadEnvConfig(process.cwd());

async function main() {
  const bucket = process.env.CMS_S3_BUCKET;
  const region = process.env.CMS_S3_REGION;
  const accessKeyId = process.env.CMS_S3_ACCESS_KEY;
  const secretAccessKey = process.env.CMS_S3_SECRET_KEY;
  const publicUrl = process.env.CMS_MEDIA_PUBLIC_URL;
  const siteOrigin = new URL(process.env.CMS_PUBLIC_URL || 'http://localhost:3000').origin;
  if (!bucket || !region || !accessKeyId || !secretAccessKey || !publicUrl) throw new Error('Konfigurasi object storage belum lengkap.');

  const client = new S3Client({
    region,
    endpoint: process.env.CMS_S3_ENDPOINT || undefined,
    forcePathStyle: Boolean(process.env.CMS_S3_ENDPOINT),
    credentials: { accessKeyId, secretAccessKey },
  });

  try {
    await client.send(new CreateBucketCommand({ Bucket: bucket }));
  } catch (error) {
    const code = (error as { name?: string }).name;
    if (code !== 'BucketAlreadyOwnedByYou' && code !== 'BucketAlreadyExists') throw error;
  }

  await client.send(new PutBucketPolicyCommand({
    Bucket: bucket,
    Policy: JSON.stringify({
      Version: '2012-10-17',
      Statement: [{ Effect: 'Allow', Principal: '*', Action: ['s3:GetObject'], Resource: [`arn:aws:s3:::${bucket}/*`] }],
    }),
  }));
  await client.send(new PutBucketCorsCommand({
    Bucket: bucket,
    CORSConfiguration: { CORSRules: [{ AllowedOrigins: [siteOrigin], AllowedMethods: ['GET', 'HEAD', 'PUT'], AllowedHeaders: ['*'], ExposeHeaders: ['ETag'], MaxAgeSeconds: 3600 }] },
  }));
  await client.destroy();
  console.log(`Bucket ${bucket} siap untuk media CMS.`);
}

main().catch((error) => {
  console.error('Inisialisasi storage gagal:', error instanceof Error ? error.message : 'kesalahan tidak diketahui');
  process.exit(1);
});
