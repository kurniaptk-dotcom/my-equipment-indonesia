export function youtubeVideoId(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return null;
    const host = url.hostname.toLowerCase();
    let id = '';
    if (host === 'youtu.be') id = url.pathname.split('/').filter(Boolean)[0] ?? '';
    else if (['youtube.com','www.youtube.com','m.youtube.com'].includes(host)) {
      const segments = url.pathname.split('/').filter(Boolean);
      if (url.pathname === '/watch') id = url.searchParams.get('v') ?? '';
      else if (segments[0] === 'embed' || segments[0] === 'shorts') id = segments[1] ?? '';
    }
    return /^[\w-]{11}$/.test(id) ? id : null;
  } catch { return null; }
}

export function isAllowedArticleImage(value: string, cmsMediaPublicUrl = process.env.CMS_MEDIA_PUBLIC_URL): boolean {
  if (value.startsWith('/images/')) {
    try {
      const parts = decodeURIComponent(value.split(/[?#]/,1)[0]).split('/');
      if (parts.some((part) => part === '.' || part === '..')) return false;
      return true;
    } catch { return false; }
  }
  if (!cmsMediaPublicUrl) return false;
  try {
    const media = new URL(cmsMediaPublicUrl), image = new URL(value);
    const localStorage = ['localhost','127.0.0.1','::1'].includes(media.hostname);
    return image.protocol === media.protocol && (image.protocol === 'https:' || localStorage) && image.origin === media.origin && image.pathname.startsWith(`${media.pathname.replace(/\/$/, '')}/`);
  } catch { return false; }
}

export function markdownImageSources(markdown: string): { src: string; alt: string }[] {
  const images: { src: string; alt: string }[] = [];
  const regex = /!\[([^\]]*)\]\(<?([^\s)>]+)>?(?:\s+["'][^"']*["'])?\)/g;
  for (const match of markdown.matchAll(regex)) images.push({ alt: match[1], src: match[2] });
  return images;
}
