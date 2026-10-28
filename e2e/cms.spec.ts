import { expect, test, type Browser, type Page } from '@playwright/test';
import { randomUUID } from 'node:crypto';

const adminEmail = process.env.E2E_ADMIN_EMAIL;
const adminPassword = process.env.E2E_ADMIN_PASSWORD;
const databaseMode = process.env.E2E_USE_DATABASE === 'true';
const cmsEnabled = databaseMode && Boolean(adminEmail && adminPassword);

test.describe('CMS berbasis PostgreSQL', () => {
  test.skip(!cmsEnabled, 'Jalankan dengan E2E_USE_DATABASE=true dan kredensial admin khusus pengujian.');

  async function signIn(page: Page, email: string, password: string) {
    await page.goto('/admin/login');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Masuk ke CMS' }).click();
    await expect(page).toHaveURL(/\/admin$/);
    await expect(page.getByRole('heading', { name: /Selamat datang/ })).toBeVisible();
  }

  test('Admin dapat menyimpan draf, menerbitkan, dan menonaktifkan artikel', async ({ page }) => {
    await page.goto('/admin/login');
    await page.getByLabel('Email').fill(adminEmail!);
    await page.getByLabel('Password').fill('password-yang-salah');
    await page.getByRole('button', { name: 'Masuk ke CMS' }).click();
    await expect(page.getByRole('alert')).toContainText('Email atau password salah');
    await signIn(page, adminEmail!, adminPassword!);

    const presign = await page.request.post('/api/admin/uploads/presign', {
      data: { filename: 'e2e.webp', contentType: 'image/webp', size: 1024 },
    });
    expect(presign.status()).toBe(200);
    expect((await presign.json()).publicUrl).toMatch(/^https:\/\/media\.example\.test\/cms\//);
    const invalidUpload = await page.request.post('/api/admin/uploads/presign', {
      data: { filename: 'bad.svg', contentType: 'image/svg+xml', size: 1024 },
    });
    expect(invalidUpload.status()).toBe(400);

    for (const width of [390, 940, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of ['/admin/products', '/admin/articles', '/admin/settings']) {
        await page.goto(route);
        await expect(page.locator('main.cms-dashboard')).toBeVisible();
        const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }));
        expect(dimensions.content, `${route} overflow pada viewport ${width}px`).toBeLessThanOrEqual(dimensions.viewport + 1);
      }
    }
    const slug = `e2e-artikel-${randomUUID().slice(0, 8)}`;
    const title = `Artikel E2E ${slug}`;
    await page.goto('/admin/articles');
    await page.locator('.cms-add-card summary').click();
    const createForm = page.locator('.cms-add-form form');
    await createForm.getByLabel('Judul').fill(title);
    await createForm.getByLabel('Slug URL unik').fill(slug);
    await createForm.getByLabel('Ringkasan').fill('Artikel yang dibuat otomatis untuk verifikasi CMS.');
    await createForm.getByLabel('Isi artikel dalam Markdown').fill('# Konten E2E\n\nArtikel uji CMS.');
    await createForm.locator('input[name="published"]').uncheck();
    await createForm.getByRole('button', { name: 'Simpan artikel' }).click();
    await expect(createForm.getByText('Draf berhasil disimpan.')).toBeVisible();
    expect((await page.request.get(`/artikel/${slug}`)).status()).toBe(404);
    expect(await (await page.request.get('/sitemap.xml')).text()).not.toContain(slug);

    const record = page.locator('details.cms-record').filter({ hasText: title });
    await record.locator('summary').click();
    const editForm = record.locator('form.cms-edit-form');
    await editForm.locator('input[name="published"]').check();
    await editForm.getByRole('button', { name: 'Simpan artikel' }).click();
    await expect(editForm.getByText('Artikel berhasil diterbitkan.')).toBeVisible();
    const article = await page.goto(`/artikel/${slug}`);
    expect(article?.ok()).toBeTruthy();
    await expect(page.getByRole('heading', { name: title })).toBeVisible();
    const articleWhatsApp = page.getByRole('link', { name: /Tanya via WhatsApp/i });
    const articleWaUrl = new URL((await articleWhatsApp.getAttribute('href'))!);
    expect(articleWaUrl.hostname).toBe('wa.me');
    expect(articleWaUrl.pathname).toBe('/6289504444471');
    expect(decodeURIComponent(articleWaUrl.searchParams.get('text') ?? '')).toContain(title);
    expect(decodeURIComponent(articleWaUrl.searchParams.get('text') ?? '')).toContain(`/artikel/${slug}`);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute('content', new RegExp(title));
    expect(await (await page.request.get('/sitemap.xml')).text()).toContain(slug);

    await page.goto('/admin/articles');
    const publishedRecord = page.locator('details.cms-record').filter({ hasText: title });
    await publishedRecord.locator('summary').click();
    const publishedForm = publishedRecord.locator('form.cms-edit-form');
    await publishedForm.locator('input[name="published"]').uncheck();
    await publishedForm.getByRole('button', { name: 'Simpan artikel' }).click();
    await expect(publishedForm.getByText('Draf berhasil disimpan.')).toBeVisible();
    expect((await page.request.get(`/artikel/${slug}`)).status()).toBe(404);
    expect(await (await page.request.get('/sitemap.xml')).text()).not.toContain(slug);
  });

  test('Editor hanya mengelola konten; akun nonaktif kehilangan sesi CMS', async ({ browser, page }) => {
    await signIn(page, adminEmail!, adminPassword!);
    const editorEmail = `editor-${randomUUID().slice(0, 8)}@example.test`;
    const editorPassword = `E2E-${randomUUID()}-Editor!`;

    await page.goto('/admin/users');
    const inviteForm = page.locator('.cms-invite-card');
    await inviteForm.getByLabel('Nama lengkap').fill('Editor E2E');
    await inviteForm.getByLabel('Email').fill(editorEmail);
    await inviteForm.getByRole('button', { name: 'Buat tautan undangan' }).click();
    await expect(inviteForm.getByText('Tautan undangan aktif selama 24 jam.')).toBeVisible();
    const inviteUrl = await inviteForm.locator('.cms-copy-link input').inputValue();

    const editorContext = await browser.newContext();
    const editorPage = await editorContext.newPage();
    try {
      await editorPage.goto(inviteUrl);
      await editorPage.getByLabel('Password baru (minimal 12 karakter)').fill(editorPassword);
      await editorPage.getByRole('button', { name: 'Simpan Password' }).click();
      await expect(editorPage.getByText('Password berhasil disimpan. Silakan masuk ke CMS.')).toBeVisible();
      await editorPage.goto(inviteUrl);
      await editorPage.getByLabel('Password baru (minimal 12 karakter)').fill(editorPassword);
      await editorPage.getByRole('button', { name: 'Simpan Password' }).click();
      await expect(editorPage.locator('.cms-form-message.error')).toContainText('Tautan tidak valid');
      await signIn(editorPage, editorEmail, editorPassword);
      await editorPage.goto('/admin/articles');
      await expect(editorPage.getByRole('heading', { name: 'Artikel & kegiatan' })).toBeVisible();
      expect((await editorPage.goto('/admin/settings'))?.status()).toBe(404);
      expect((await editorPage.goto('/admin/users'))?.status()).toBe(404);

      await page.goto('/admin/users');
      const editorRecord = page.locator('.cms-user-list article').filter({ hasText: editorEmail });
      await editorRecord.getByRole('button', { name: 'Nonaktifkan' }).click();
      await editorPage.goto('/admin/articles');
      await expect(editorPage).toHaveURL(/\/admin\/login$/);
    } finally {
      await editorContext.close();
    }
  });
});

test('endpoint upload CMS menolak pengguna tanpa sesi', async ({ request }) => {
  const response = await request.post('/api/admin/uploads/presign', {
    data: { filename: 'foto.webp', contentType: 'image/webp', size: 1024 },
  });
  expect(response.status()).toBe(401);
});
