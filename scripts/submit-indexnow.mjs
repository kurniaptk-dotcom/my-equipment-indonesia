/**
 * IndexNow Bulk URL Submitter for My Equipment Indonesia
 * Submits all URLs from sitemap.xml to api.indexnow.org (Bing, Copilot, ChatGPT Search, Yandex).
 * Usage: npm run seo:indexnow
 */

const HOST = 'www.myequipmentindonesia.com';
const SITE_URL = `https://${HOST}`;
const INDEXNOW_KEY = '8f3a9c2e4b7d1065a9e2c4f8b1d3076e';
const KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;

async function run() {
  console.log(`Fetching sitemap from ${SITEMAP_URL} ...`);
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) {
    throw new Error(`Failed to fetch sitemap: HTTP ${res.status}`);
  }
  const xml = await res.text();
  const urlMatches = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  const uniqueUrls = [...new Set(urlMatches)].filter((u) => u.startsWith(SITE_URL));

  if (uniqueUrls.length === 0) {
    console.log('No URLs found in sitemap. Aborting.');
    return;
  }

  console.log(`Found ${uniqueUrls.length} URLs. Submitting to IndexNow...`);

  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList: uniqueUrls,
  };

  const submitRes = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload),
  });

  console.log(`IndexNow response status: HTTP ${submitRes.status}`);
  if (submitRes.status === 200 || submitRes.status === 202) {
    console.log(`SUCCESS: ${uniqueUrls.length} URLs submitted to IndexNow.`);
  } else {
    const body = await submitRes.text();
    console.error(`IndexNow returned error (${submitRes.status}): ${body}`);
    process.exitCode = 1;
  }
}

run().catch((err) => {
  console.error('IndexNow submission failed:', err);
  process.exit(1);
});
