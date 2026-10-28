const fallbackSiteUrl = 'https://www.myequipmentindonesia.com';

export function getSiteUrl(): string {
  const candidate = process.env.SITE_URL?.trim();
  if (!candidate) return fallbackSiteUrl;
  try {
    const url = new URL(candidate);
    if (!['http:', 'https:'].includes(url.protocol)) return fallbackSiteUrl;
    return url.origin;
  } catch {
    return fallbackSiteUrl;
  }
}
