import { expect, test, type Page } from '@playwright/test';

function verifyWhatsAppLink(href: string | null, expectedKeyword: string) {
  expect(href).toBeTruthy();
  const url = new URL(href!);
  expect(url.hostname).toBe('wa.me');
  expect(url.pathname).toBe('/6289504444471');
  const message = decodeURIComponent(url.searchParams.get('text') ?? '');
  expect(message.toLocaleLowerCase()).toContain(expectedKeyword.toLocaleLowerCase());
  return message;
}

async function assertNoHorizontalOverflow(page: Page) {
  const sizes = await page.evaluate(() => ({
    width: document.documentElement.clientWidth,
    scroll: document.documentElement.scrollWidth,
  }));
  expect(sizes.scroll, `horizontal overflow: ${sizes.scroll}px on ${sizes.width}px viewport`).toBeLessThanOrEqual(sizes.width + 1);
}

test('Floating toggle CTA WhatsApp muncul di halaman publik dan tersembunyi di CMS admin', async ({ page }) => {
  for (const path of ['/', '/produk', '/paket-usaha', '/kontak']) {
    await page.goto(path);
    const trigger = page.getByTestId('whatsapp-floating-trigger');
    await expect(trigger).toBeVisible();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  }

  await page.goto('/admin/login');
  const adminTrigger = page.getByTestId('whatsapp-floating-trigger');
  await expect(adminTrigger).toHaveCount(0);
});

test('Floating toggle WhatsApp membuka kartu dialog, menyediakan opsi topik, dan dapat ditutup via tombol dan tombol Escape', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const trigger = page.getByTestId('whatsapp-floating-trigger');
  await expect(trigger).toBeVisible();

  // Buka popup card
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');

  const card = page.getByTestId('whatsapp-floating-card');
  await expect(card).toBeVisible();
  await expect(card).toContainText('My Equipment Support');
  await expect(card).toContainText('Online');
  await expect(card).toContainText('Paket Usaha Laundry');
  await expect(card).toContainText('Tanya Mesin & Sparepart');
  await expect(card).toContainText('Kunjungan Showroom');
  await expect(card).toContainText('Konsultasi Umum');

  // Periksa link topik
  const topics = card.locator('.whatsapp-floating-topic-item');
  await expect(topics).toHaveCount(4);

  const topic1Href = await topics.nth(0).getAttribute('href');
  verifyWhatsAppLink(topic1Href, 'paket usaha laundry');

  const topic2Href = await topics.nth(1).getAttribute('href');
  verifyWhatsAppLink(topic2Href, 'mesin laundry');

  const topic3Href = await topics.nth(2).getAttribute('href');
  verifyWhatsAppLink(topic3Href, 'kunjungan ke showroom');

  const topic4Href = await topics.nth(3).getAttribute('href');
  verifyWhatsAppLink(topic4Href, 'layanan My Equipment');

  // Periksa tombol CTA langsung di footer kartu
  const directCta = card.locator('.whatsapp-floating-cta-button');
  const directHref = await directCta.getAttribute('href');
  verifyWhatsAppLink(directHref, 'konsultasi usaha laundry');

  // Uji penutupan via tombol Escape keyboard
  await page.keyboard.press('Escape');
  await expect(card).toBeHidden();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');

  // Buka kembali lalu tutup via tombol close 'X'
  await trigger.click();
  await expect(card).toBeVisible();
  const closeButton = card.getByLabel('Tutup jendela chat');
  await closeButton.click();
  await expect(card).toBeHidden();
  await expect(trigger).toBeFocused();
});

test('Floating toggle WhatsApp bebas overflow pada ponsel, tablet, dan desktop', async ({ page }) => {
  for (const width of [390, 940, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/produk');

    const trigger = page.getByTestId('whatsapp-floating-trigger');
    await expect(trigger).toBeVisible();
    await assertNoHorizontalOverflow(page);

    // Buka kartu pada viewport saat ini
    await trigger.click();
    const card = page.getByTestId('whatsapp-floating-card');
    await expect(card).toBeVisible();
    await assertNoHorizontalOverflow(page);

    // Tutup kartu
    await page.keyboard.press('Escape');
    await expect(card).toBeHidden();
    await assertNoHorizontalOverflow(page);
  }
});

