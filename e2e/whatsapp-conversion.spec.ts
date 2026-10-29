import { expect, test, type Page } from '@playwright/test';

const knownPages = [
  { path: '/produk', marker: 'catalog', text: 'katalog' },
  { path: '/produk/mesin-cuci-lg-8-kg', marker: 'product-detail', text: 'Mesin Cuci LG 8 Kg' },
  { path: '/paket-usaha', marker: 'packages', text: 'paket usaha' },
] as const;

function verifyWhatsAppDraft(href: string | null, expected: string) {
  expect(href).toBeTruthy();
  const url = new URL(href!);
  expect(url.hostname).toBe('wa.me');
  expect(url.pathname).toMatch(/^\/\d+$/);
  expect(url.pathname).toBe('/6289504444471');
  const message = decodeURIComponent(url.searchParams.get('text') ?? '');
  expect(message.toLocaleLowerCase()).toContain(expected.toLocaleLowerCase());
  return message;
}

async function assertNoHorizontalOverflow(page: Page) {
  const sizes = await page.evaluate(() => ({ width: document.documentElement.clientWidth, scroll: document.documentElement.scrollWidth }));
  expect(sizes.scroll, `horizontal overflow: ${sizes.scroll}px on ${sizes.width}px viewport`).toBeLessThanOrEqual(sizes.width + 1);
}

test('CTA WhatsApp mengikuti konteks halaman, hanya sticky di ponsel, dan menyimpan draf', async ({ page }) => {
  for (const item of knownPages) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(item.path);
    const main = page.locator(`main[data-page="${item.marker}"]`);
    await expect(main).toBeVisible();
    const cta = page.getByTestId('whatsapp-sticky-bar');
    await expect(cta).toBeVisible();
    const draft = verifyWhatsAppDraft(await cta.getByRole('link').getAttribute('href'), item.text);
    expect(draft).toContain('Sumber:');
    const bounds = await cta.boundingBox();
    expect(bounds).toBeTruthy();
    expect(bounds!.y + bounds!.height).toBeLessThanOrEqual(845);
    await assertNoHorizontalOverflow(page);

    await page.setViewportSize({ width: 940, height: 900 });
    await expect(cta).toBeHidden();
    await assertNoHorizontalOverflow(page);
    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect(cta).toBeHidden();
    await assertNoHorizontalOverflow(page);
  }
});

test('CTA estimator kosong nonaktif dan pesan mengikuti jumlah serta subtotal', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/estimasi-modal');
  const sticky = page.getByTestId('estimator-sticky-cta');
  await expect(sticky).toBeVisible();
  await expect(sticky.getByRole('button')).toBeDisabled();
  await expect(sticky).toContainText('0 item');

  const firstItem = page.locator('.estimator-row').first();
  const name = (await firstItem.locator('.estimator-info b').innerText()).trim();
  await firstItem.getByRole('button', { name: /^Tambah/ }).click();
  await expect(sticky.getByRole('link')).toBeVisible();
  await expect(sticky).toContainText('1 item');
  const draft = verifyWhatsAppDraft(await sticky.getByRole('link').getAttribute('href'), name);
  expect(draft).toContain('Subtotal sementara: Rp');
  expect(draft).toContain('Sumber: estimator');

  await firstItem.getByRole('button', { name: /^Tambah/ }).click();
  await expect(sticky).toContainText('2 item');
  await expect(sticky).toContainText('Rp 11.400.000');
  await firstItem.getByRole('button', { name: /^Kurangi/ }).click();
  await expect(sticky).toContainText('1 item');
  await expect(sticky).toContainText('Rp 5.700.000');
  await firstItem.getByRole('button', { name: /^Kurangi/ }).click();
  const unpricedItem = page.locator('.estimator-row').filter({ hasText: 'Mesin Cuci LG 8 Kg' });
  await unpricedItem.getByRole('button', { name: /^Tambah/ }).click();
  await expect(sticky).toContainText('1 item');
  await expect(sticky).toContainText('harga perlu konfirmasi');
  const unpricedDraft = verifyWhatsAppDraft(await sticky.getByRole('link').getAttribute('href'), 'Mesin Cuci LG 8 Kg');
  expect(unpricedDraft).toContain('harga belum tersedia (perlu konfirmasi)');
  expect(unpricedDraft).toContain('Subtotal sementara: Rp 0');
  await assertNoHorizontalOverflow(page);
  await page.setViewportSize({ width: 940, height: 900 });
  await expect(sticky).toBeHidden();
  await assertNoHorizontalOverflow(page);
  await page.setViewportSize({ width: 1440, height: 1000 });
  await expect(sticky).toBeHidden();
  await assertNoHorizontalOverflow(page);
});

test('panduan paket memvalidasi jawaban, merangkum pilihan, dan hanya membuka WhatsApp setelah ditekan', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/paket-usaha');
  const guide = page.getByTestId('package-guide');
  await page.getByRole('link', { name: /Bantu saya memilih/i }).click();
  await expect(guide).toBeInViewport();
  await expect(guide.getByRole('heading', { name: 'Ceritakan rencana usaha' })).toBeVisible();

  let popupCount = 0;
  page.on('popup', () => { popupCount += 1; });
  await guide.getByRole('button', { name: 'Lanjutkan' }).click();
  await expect(guide.getByRole('alert')).toContainText('Pilih jenis usaha dan kisaran anggaran');
  expect(popupCount).toBe(0);

  const fields = guide.locator('.package-guide-fields select');
  await expect(fields).toHaveCount(3);
  await fields.nth(0).selectOption({ label: 'Laundry kiloan' });
  await fields.nth(1).selectOption({ label: 'Rp 25-50 juta' });
  const packageValue = await fields.nth(2).locator('option').nth(1).getAttribute('value');
  expect(packageValue).toBeTruthy();
  const visiblePackageNames = await page.locator('.subpackage .package-card h2').allTextContents();
  expect(visiblePackageNames.some((name) => name.includes(packageValue!))).toBeTruthy();
  await fields.nth(2).selectOption(packageValue!);
  await guide.getByRole('button', { name: 'Lanjutkan' }).click();
  await expect(guide.getByRole('heading', { name: 'Apa yang ingin dibahas?' })).toBeFocused();
  await guide.getByLabel(/Lokasi usaha/).locator('..').locator('input').fill('Pontianak');
  await guide.getByLabel(/Kebutuhan yang ingin didiskusikan/).locator('..').locator('textarea').fill('Mesin cuci dan pengering untuk rencana laundry kiloan.');
  await guide.getByRole('button', { name: 'Tinjau draf' }).click();
  await expect(guide.getByRole('heading', { name: 'Periksa draf konsultasi' })).toBeFocused();
  await expect(guide.locator('.package-guide-message')).toContainText(packageValue!);
  await expect(guide.locator('.package-guide-message')).toContainText('Lokasi usaha: Pontianak');
  await expect(guide.locator('.package-guide-message')).toContainText('Anggaran: Rp 25-50 juta');
  expect(popupCount).toBe(0);

  const whatsappLink = guide.getByTestId('package-guide-whatsapp');
  const draft = verifyWhatsAppDraft(await whatsappLink.getAttribute('href'), 'Laundry kiloan');
  expect(draft).toContain(`Paket yang ingin ditanyakan: ${packageValue}`);
  expect(draft).toContain('Lokasi usaha: Pontianak');
  expect(draft).toContain('Sumber: panduan paket usaha');

  await page.context().route('https://wa.me/**', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>WhatsApp draft mock</title>' }));
  const popupPromise = page.waitForEvent('popup');
  await whatsappLink.click();
  const popup = await popupPromise;
  await popup.waitForURL(/wa\.me/, { waitUntil: 'commit', timeout: 5000 });
  expect(new URL(popup.url()).pathname).toBe('/6289504444471');
  await popup.close();

  for (const width of [390, 940, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await assertNoHorizontalOverflow(page);
  }
});

test('katalog menyaring kategori dan pencarian serta mendukung kembali browser', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/produk');
  await expect(page.locator('main[data-page="catalog"]')).toBeVisible();
  await expect(page.locator('.catalog-chip-hint')).toBeVisible();
  await expect(page.locator('.catalog-chips button').first()).toHaveCSS('min-height', '44px');
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.getByRole('heading', { name: /11 produk ditemukan/i })).toBeVisible();
  await page.getByRole('complementary', { name: 'Filter kategori produk' }).getByRole('button', { name: /Mesin Laundry/ }).click();
  await expect(page).toHaveURL(/kategori=mesin-laundry/);
  await expect(page.getByRole('heading', { name: /3 produk ditemukan/i })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/produk$/);
  await expect(page.getByRole('heading', { name: /11 produk ditemukan/i })).toBeVisible();
  await page.getByRole('searchbox', { name: 'Cari produk' }).fill('LG');
  await expect(page.getByRole('heading', { name: /1 produk ditemukan/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /Mesin Cuci LG 8 Kg/ })).toBeVisible();
});

test('detail produk, link toko, 404 slug tidak dikenal, dan redirect URL lama', async ({ page }) => {
  await page.goto('/produk/mesin-cuci-lg-8-kg');
  await expect(page.getByRole('heading', { name: 'Mesin Cuci LG 8 Kg' })).toBeVisible();
  const store = page.getByTestId('product-store-link');
  expect(new URL((await store.getAttribute('href'))!).hostname).toBe('produk.myequipmentindonesia.com');

  const missing = await page.goto('/produk/produk-tidak-dikenal-xyz');
  expect(missing?.status()).toBe(404);

  await page.goto('/product/mesin-cuci-pontianak-samsung-8kg');
  await expect(page).toHaveURL(/\/produk\/mesin-cuci-samsung-8-kg$/);
  await expect(page.getByRole('heading', { name: 'Mesin Cuci Samsung 8 Kg' })).toBeVisible();
});

test('tidak memuat vendor analytics eksternal pada halaman konversi', async ({ page }) => {
  const requests: string[] = [];
  page.on('request', (request) => requests.push(request.url()));
  for (const path of ['/produk', '/produk/mesin-cuci-lg-8-kg', '/paket-usaha', '/estimasi-modal']) await page.goto(path);
  expect(requests.filter((url) => /googletagmanager|google-analytics|segment\.io|posthog|mixpanel|amplitude/i.test(url))).toEqual([]);
});

test('jam layanan punya sumber, cakupan garansi dan pengiriman tidak diklaim universal', async ({ page }) => {
  await page.goto('/kontak');
  const showroomCta = page.getByRole('link', { name: /Atur kunjungan via WhatsApp/i });
  const visitDraft = verifyWhatsAppDraft(await showroomCta.getAttribute('href'), 'berencana mengunjungi showroom');
  expect(visitDraft).toContain('[sebutkan lokasi]');
  expect(visitDraft).toContain('[hari/tanggal dan jam]');
  expect(visitDraft).toContain('konfirmasi alamat dan kesiapan showroom');
  await expect(page.getByRole('heading', { name: /Senin.*Minggu.*08\.00.*21\.00 WIB/i })).toBeVisible();
  const hoursSource = page.getByRole('link', { name: /Lihat sumber resmi/i });
  expect(new URL((await hoursSource.getAttribute('href'))!).hostname).toBe('www.myequipmentindonesia.com');
  await expect(page.getByText(/Diverifikasi 27 Oktober 2026/i)).toBeVisible();

  await page.goto('/garansi-servis');
  await expect(page.getByText(/belum merinci satu cakupan garansi atau pengiriman yang berlaku untuk semua produk dan lokasi/i)).toBeVisible();
  await expect(page.getByText(/Area layanan, metode, ongkir, dan estimasi waktu perlu dikonfirmasi/i)).toBeVisible();
});

test('portfolio publik menampilkan lima outlet dengan izin yang tercatat', async ({ page }) => {
  await page.goto('/inspirasi');
  await expect(page.getByRole('heading', { name: /Portfolio outlet/i })).toBeVisible();
  await expect(page.locator('.portfolio-card')).toHaveCount(5);
  for (const outlet of ['Atma Laundry', 'Dinar Laundry', 'Happy Family Laundry', 'Kila Laundry', 'Permata Laundry Express']) {
    const card = page.locator('.portfolio-card').filter({ hasText: outlet });
    await expect(card).toBeVisible();
    const draft = verifyWhatsAppDraft(await card.getByRole('link', { name: /Tanya tentang outlet ini/i }).getAttribute('href'), outlet);
    expect(draft).toContain('Sumber:');
  }
  await expect.poll(() => page.locator('.portfolio-card img').evaluateAll((images) => images.every((image) => (image as HTMLImageElement).naturalWidth > 0))).toBe(true);
});

test('beranda menampilkan portfolio aman dan video pilihan tanpa memuat iframe sebelum diputar', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Inspirasi outlet laundry/i })).toBeVisible();
  await expect(page.locator('.portfolio-home-card')).toHaveCount(3);
  await expect(page.locator('.portfolio-home-card')).toContainText(['Atma Laundry', 'Dinar Laundry', 'Happy Family Laundry']);
  expect(await page.locator('.home-article-preview').count()).toBeGreaterThanOrEqual(0);
  await expect(page.locator('.home-video-preview .article-video-card')).toHaveCount(3);
  await expect(page.locator('.portfolio-home-item .content-whatsapp-link')).toHaveCount(3);
  await expect(page.locator('.home-video-preview .content-whatsapp-link')).toHaveCount(0);
  const portfolioDraft = verifyWhatsAppDraft(await page.locator('.portfolio-home-item').first().getByRole('link', { name: /Tanya tentang outlet ini/i }).getAttribute('href'), 'Atma Laundry');
  expect(portfolioDraft).toContain('Sumber: beranda');
  await expect(page.locator('.home-video-preview .article-video-card .article-video>a')).toHaveCount(3);
  await expect(page.locator('.home-video-preview .article-video-card').getByText('Tanya tentang video ini')).toHaveCount(0);
  await expect(page.locator('.home-video-preview iframe')).toHaveCount(0);

  for (const width of [390, 940, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await assertNoHorizontalOverflow(page);
    await expect(page.locator('.home-video-preview .article-video-card')).toHaveCount(3);
  }

  await page.getByRole('button', { name: 'Putar video: Video ShortMQ Indonesia 1' }).click();
  await expect(page.locator('.home-video-preview iframe').first()).toHaveAttribute('src', /youtube-nocookie\.com\/embed\/1S1MumVG5xo/);
  await expect(page.locator('.home-video-preview iframe')).toHaveCount(1);
});

test('halaman artikel memuat konten edukasi atau state siap, dan tautan navigasi tetap tersedia', async ({ page }) => {
  await page.setViewportSize({width:390,height:844});
  await page.route('https://i.ytimg.com/**', (route) => route.abort());
  await page.goto('/artikel');
  await expect(page.getByRole('heading',{name:/Artikel.*Kegiatan/i})).toBeVisible();
  await expect(page.getByRole('link',{name:/Kunjungi kanal/i})).toHaveAttribute('href','https://www.youtube.com/@ShortMQIndonesia');
  const cardCount = await page.locator('.article-card-modern, .article-video-card').count();
  expect(cardCount).toBeGreaterThan(0);
  await page.locator('.mobile-menu summary').click();
  await expect(page.locator('.mobile-menu-panel').getByRole('link',{name:'Artikel',exact:true})).toBeVisible();
  const missing=await page.goto('/artikel/draf-yang-belum-diterbitkan');
  expect(missing?.status()).toBe(404);
  await assertNoHorizontalOverflow(page);
});

test('konten dapat dijangkau dengan keyboard dan aset utama menggunakan WebP', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/produk');
  await page.keyboard.press('Tab');
  const skipLink = page.getByRole('link', { name: 'Lewati ke konten utama' });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main-content$/);
  await expect(page.locator('#main-content')).toBeFocused();

  const hero = page.locator('.catalog-hero-art img');
  await expect(hero).toHaveAttribute('src', /hero-stacked\.webp/);
  const loaded = await hero.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0);
  expect(loaded).toBeTruthy();
});

test('robots, sitemap, metadata sosial, dan halaman CMS menjaga aturan indeks', async ({ page }) => {
  const robots = await page.request.get('/robots.txt');
  expect(robots.ok()).toBeTruthy();
  const robotsText = await robots.text();
  expect(robotsText).toContain('Disallow: /api');
  expect(robotsText).not.toContain('Disallow: /admin');
  expect(robotsText).toContain('Sitemap: https://www.myequipmentindonesia.com/sitemap.xml');

  const sitemap = await page.request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  const sitemapXml = await sitemap.text();
  expect(sitemapXml).toContain('/produk/mesin-cuci-lg-8-kg');
  expect(sitemapXml).toContain('https://www.myequipmentindonesia.com/inspirasi');

  await page.goto('/');
  await expect(page).toHaveTitle('My Equipment Indonesia | Solusi Usaha Laundry');
  const organization = await page.locator('script[type="application/ld+json"]').textContent();
  expect(JSON.parse(organization ?? '{}')).toMatchObject({ '@type': 'Organization', name: 'My Equipment Indonesia' });
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content', /laundry-hero\.webp/);
  await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute('content','My Equipment Indonesia');
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');

  await page.goto('/produk');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href','https://www.myequipmentindonesia.com/produk');
  await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content','Katalog Produk | My Equipment Indonesia');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content',/laundry-hero\.webp/);

  await page.goto('/produk/mesin-cuci-lg-8-kg');
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute('content',/washer-lg-8kg/i);

  await page.goto('/inspirasi');
  await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
  await page.goto('/admin/login');
  await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test('respons penting memiliki header keamanan dan halaman error aman', async ({ page }) => {
  const home = await page.request.get('/');
  expect(home.headers()['x-content-type-options']).toBe('nosniff');
  expect(home.headers()['x-frame-options']).toBe('DENY');
  expect(home.headers()['referrer-policy']).toBe('strict-origin-when-cross-origin');
  expect(home.headers()['permissions-policy']).toContain('camera=()');
  expect(home.headers()['x-powered-by']).toBeUndefined();

  const admin = await page.request.get('/admin/login');
  expect(admin.headers()['cache-control']).toContain('no-store');
  const api = await page.request.get('/api/auth/session');
  expect(api.headers()['cache-control']).toBe('no-store');

  const missing = await page.goto('/halaman-yang-tidak-ada');
  expect(missing?.status()).toBe(404);
  await expect(page.getByRole('heading', { name: 'Halaman ini tidak tersedia.' })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
});

test('interaksi visual membantu tanpa mengganggu reduced motion atau keyboard', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const revealSection = page.locator('[data-reveal]').first();
  await expect(revealSection).toHaveClass(/is-revealed/);

  const trustCard = page.locator('.home-trust-card').first();
  await trustCard.hover();
  await expect.poll(() => trustCard.evaluate((element) => getComputedStyle(element).transform)).not.toBe('none');

  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-to-content')).toBeFocused();
  await expect(page.locator('.skip-to-content')).toBeInViewport();

  const reducedMotionPage = await page.context().newPage();
  await reducedMotionPage.emulateMedia({ reducedMotion: 'reduce' });
  await reducedMotionPage.setViewportSize({ width: 390, height: 844 });
  await reducedMotionPage.goto('/');
  const reducedSection = reducedMotionPage.locator('[data-reveal]').first();
  await expect(reducedSection).toHaveCSS('opacity', '1');
  await expect(reducedSection).toHaveCSS('transform', 'none');
  await assertNoHorizontalOverflow(reducedMotionPage);
  await reducedMotionPage.close();

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.locator('.mobile-menu summary').click();
  const menu = page.locator('.mobile-menu-panel');
  await expect(menu).toBeVisible();
  await expect(menu.getByRole('link', { name: 'Paket usaha' })).toBeVisible();
  const menuBounds = await menu.boundingBox();
  expect(menuBounds).toBeTruthy();
  expect(menuBounds!.x).toBeGreaterThanOrEqual(0);
  expect(menuBounds!.x + menuBounds!.width).toBeLessThanOrEqual(390);
});

test('rute penting tetap terbaca dan bebas overflow pada ukuran ponsel, tablet, desktop', async ({ page }) => {
  test.setTimeout(120_000);
  const routes = [
    { path: '/', heading: 'Paket Usaha' },
    { path: '/paket-usaha', heading: 'Mulai dari paket yang sesuai rencana Anda.' },
    { path: '/produk', heading: 'Temukan produk untuk laundry Anda.' },
    { path: '/produk/mesin-cuci-lg-8-kg', heading: 'Mesin Cuci LG 8 Kg' },
    { path: '/artikel', heading: /Artikel.*Kegiatan/i },
    { path: '/kontak', heading: /Hubungi kami/i },
    { path: '/admin/login', heading: 'Masuk ke CMS' },
  ] as const;
  const pageErrors: string[] = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  for (const width of [390, 940, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of routes) {
      await page.goto(route.path);
      await expect(page.getByRole('heading', { name: route.heading }).first()).toBeVisible();
      await assertNoHorizontalOverflow(page);
      const invalidImage = await page.locator('img:visible').evaluateAll((images) =>
        images.some((image) => image.getAttribute('alt') === null || (image.getAttribute('src')?.startsWith('/') && (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth === 0)),
      );
      expect(invalidImage, `alt kosong/tidak tersedia atau gambar rusak pada ${route.path} (${width}px)`).toBe(false);
    }
  }
  expect(pageErrors).toEqual([]);
});

test('CMS mengarahkan sesi tanpa login dan upload tidak mengungkap storage', async ({ page, request }) => {
  await page.goto('/admin/products');
  await expect(page).toHaveURL(/\/admin\/login$/);
  await expect(page.getByRole('heading', { name: 'Masuk ke CMS' })).toBeVisible();
  const response = await request.post('/api/admin/uploads/presign', {
    data: { filename: 'mesin.webp', contentType: 'image/webp', size: 2048 },
  });
  expect(response.status()).toBe(401);
  expect(await response.text()).not.toContain('secret');
});
