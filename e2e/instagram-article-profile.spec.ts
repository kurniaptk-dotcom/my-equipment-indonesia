import { expect, test } from '@playwright/test';

test.describe('Instagram Profile Card in Articles', () => {
  test('halaman indeks /artikel menampilkan kartu profil Instagram resmi', async ({ page }) => {
    await page.goto('/artikel');

    const igCard = page.locator('.ig-profile-card-full');
    await expect(igCard).toBeVisible();

    // Verify handle and verified badge
    await expect(igCard.locator('.ig-handle')).toContainText('pusat.mesin.laundry.kalbar');
    await expect(igCard.locator('.ig-verified-badge')).toBeVisible();

    // Verify stats
    await expect(igCard.locator('.ig-stats-row')).toContainText('6.306');
    await expect(igCard.locator('.ig-stats-row')).toContainText('pengikut');
    await expect(igCard.locator('.ig-stats-row')).toContainText('209');
    await expect(igCard.locator('.ig-stats-row')).toContainText('kiriman');

    // Verify action buttons
    const profileLink = igCard.locator('a.ig-btn-primary');
    await expect(profileLink).toHaveAttribute('href', 'https://www.instagram.com/pusat.mesin.laundry.kalbar/');

    const dmLink = igCard.locator('a.ig-btn-secondary');
    await expect(dmLink).toHaveAttribute('href', 'https://ig.me/m/pusat.mesin.laundry.kalbar');

    // Verify highlights
    const highlights = igCard.locator('.ig-highlight-item');
    expect(await highlights.count()).toBeGreaterThanOrEqual(4);
  });

  test('halaman indeks /artikel menampilkan spotlight utama dan pencarian artikel interaktif', async ({ page }) => {
    await page.goto('/artikel');

    // Featured spotlight is visible
    const spotlight = page.locator('.article-spotlight');
    await expect(spotlight).toBeVisible();
    await expect(spotlight.locator('.article-spotlight-badge')).toContainText('Panduan Utama');

    // Test live search input
    const searchInput = page.locator('input[type="search"]');
    await expect(searchInput).toBeVisible();
    await searchInput.fill('Speed Queen');

    // Should filter articles to the Speed Queen guide
    const cards = page.locator('.article-card-modern');
    await expect(cards).toHaveCount(1);
    await expect(cards.first()).toContainText('Speed Queen');

    // Clear search
    await page.locator('.article-search-clear').click({ force: true });
    await expect(searchInput).toHaveValue('');
    expect(await page.locator('.article-card-modern').count()).toBeGreaterThan(1);
  });

  test('halaman detail artikel menampilkan layout editorial, aside, dan rekomendasi terkait', async ({ page }) => {
    await page.goto('/artikel/cara-memilih-mesin-cuci-laundry-kiloan');

    const igAsideCard = page.locator('.article-detail-aside .ig-profile-card-aside');
    await expect(igAsideCard).toBeVisible();
    await expect(igAsideCard.locator('.ig-handle')).toContainText('pusat.mesin.laundry.kalbar');
    await expect(igAsideCard.locator('.ig-verified-badge')).toBeVisible();
    await expect(igAsideCard.locator('a.ig-btn-primary')).toBeVisible();

    // Author strip and takeaway box
    await expect(page.locator('.article-author-strip')).toBeVisible();
    await expect(page.locator('.article-takeaway-card')).toBeVisible();

    // Related articles at bottom
    const relatedSection = page.locator('.article-related-section');
    await expect(relatedSection).toBeVisible();
    expect(await relatedSection.locator('.article-card-modern').count()).toBeGreaterThanOrEqual(2);
  });

  test('tidak terjadi horizontal overflow pada mobile (390px)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/artikel');

    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1);

    await page.goto('/artikel/cara-memilih-mesin-cuci-laundry-kiloan');
    const detailScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    const detailClientWidth = await page.evaluate(() => document.documentElement.clientWidth);
    expect(detailScrollWidth).toBeLessThanOrEqual(detailClientWidth + 1);
  });
});

