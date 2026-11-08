import { NextRequest, NextResponse } from 'next/server';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

export const runtime = 'nodejs';

let cachedClient: S3Client | null = null;

function getClient() {
  if (cachedClient) return cachedClient;
  const {
    CMS_S3_REGION: region,
    CMS_S3_ACCESS_KEY: accessKeyId,
    CMS_S3_SECRET_KEY: secretAccessKey,
    CMS_S3_ENDPOINT: endpoint
  } = process.env;

  if (!accessKeyId || !secretAccessKey) return null;

  cachedClient = new S3Client({
    region: region || 'auto',
    endpoint: endpoint || undefined,
    forcePathStyle: Boolean(endpoint),
    credentials: { accessKeyId, secretAccessKey }
  });
  return cachedClient;
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  try {
    const { path } = await context.params;
    if (!path || path.length === 0) {
      return new NextResponse('Not found', { status: 404 });
    }

    const key = path.map(decodeURIComponent).join('/');
    const client = getClient();
    const bucket = process.env.CMS_S3_BUCKET;

    if (!client || !bucket) {
      return new NextResponse('Media storage not configured', { status: 503 });
    }

    const ifNoneMatch = request.headers.get('if-none-match');

    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
      IfNoneMatch: ifNoneMatch || undefined
    });

    const s3Response = await client.send(command);

    if (!s3Response.Body) {
      return new NextResponse('Object empty', { status: 404 });
    }

    const headers = new Headers();
    if (s3Response.ContentType) headers.set('Content-Type', s3Response.ContentType);
    if (s3Response.ContentLength !== undefined) headers.set('Content-Length', s3Response.ContentLength.toString());
    if (s3Response.ETag) headers.set('ETag', s3Response.ETag);
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');

    // Body in AWS SDK v3 is streamable
    // @ts-ignore
    const body = s3Response.Body.transformToWebStream();
    return new Response(body, {
      status: 200,
      headers
    });
  } catch (error: any) {
    if (error?.$metadata?.httpStatusCode === 304 || error?.name === '304NotModified') {
      return new NextResponse(null, { status: 304 });
    }
    if (error?.name === 'NoSuchKey' || error?.$metadata?.httpStatusCode === 404) {
      return new NextResponse('File not found', { status: 404 });
    }
    console.error('Media proxy error:', error);
    return new NextResponse('Failed to load media', { status: 500 });
  }
}
