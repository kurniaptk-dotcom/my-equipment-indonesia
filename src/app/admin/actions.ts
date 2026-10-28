'use server';

import { createHash, randomBytes } from 'node:crypto';
import argon2 from 'argon2';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { requireAdmin, requireCmsUser } from '@/lib/access';
import { query } from '@/lib/db';
import { isAllowedArticleImage, markdownImageSources, youtubeVideoId } from '@/lib/article-content';
import { parseSeoSettings } from '@/lib/seo-settings';

const slugSchema = z.string().trim().min(2).max(100).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const text = (form: FormData, key: string) => String(form.get(key) ?? '').trim();
const checkbox = (form: FormData, key: string) => form.get(key) === 'on';
const integer = (form: FormData, key: string, optional = false) => {
  const value = text(form, key);
  if (optional && value === '') return null;
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 0) throw new Error(`${key} harus berupa angka nol atau lebih.`);
  return parsed;
};
const safeUrl = (value: string, label: string, optional = false) => {
  if (optional && !value) return null;
  let url: URL;
  try { url = new URL(value); } catch { throw new Error(`${label} harus berupa URL lengkap.`); }
  if (!['https:', 'http:'].includes(url.protocol)) throw new Error(`${label} harus menggunakan HTTP atau HTTPS.`);
  return value;
};
const safeImage = (value: string, optional = true) => {
  if (!value && optional) return null;
  if (value.startsWith('/images/') && !value.includes('..')) return value;
  const publicMedia = process.env.CMS_MEDIA_PUBLIC_URL;
  if (!publicMedia) throw new Error('Set CMS_MEDIA_PUBLIC_URL sebelum menautkan gambar object storage.');
  if (!isAllowedArticleImage(value,publicMedia)) throw new Error('Gambar harus berasal dari media CMS atau folder gambar lokal.');
  return value;
};

function refreshPublicPages(slug?: string) {
  revalidatePath('/', 'layout');
  for (const path of ['/', '/produk', '/paket-usaha', '/layanan', '/tentang-kami', '/inspirasi', '/artikel', '/promo', '/faq', '/kontak', '/konsultasi', '/garansi-servis', '/estimasi-modal', '/sitemap.xml']) revalidatePath(path);
  revalidatePath('/produk/[slug]', 'page');
  revalidatePath('/artikel/[slug]', 'page');
  if (slug) revalidatePath(`/produk/${slug}`);
}

export async function saveContent(form: FormData) {
  const user = await requireCmsUser();
  const section = text(form, 'section');
  const id = text(form, 'id');
  const published = checkbox(form, 'published');
  if ((section === 'settings' || section === 'seo') && user.role !== 'admin') throw new Error('Pengaturan hanya dapat diubah Admin.');
  if (section === 'categories') {
    const slug = slugSchema.parse(text(form, 'slug'));
    const title = z.string().min(2).max(100).parse(text(form, 'title'));
    const originalSlug = text(form,'originalSlug');
    if (originalSlug && originalSlug !== slug) {
      const updated = await query('UPDATE categories SET slug=$1,title=$2,icon=$3,description=$4,sort_order=$5,published=$6,updated_at=now() WHERE slug=$7',[slug,title,text(form,'icon').slice(0,50),text(form,'description'),integer(form,'sortOrder'),published,originalSlug]);
      if (!updated.rowCount) throw new Error('Kategori yang diedit sudah tidak ditemukan.');
    } else await query(`INSERT INTO categories(slug,title,icon,description,sort_order,published,updated_at) VALUES($1,$2,$3,$4,$5,$6,now())
      ON CONFLICT(slug) DO UPDATE SET title=EXCLUDED.title,icon=EXCLUDED.icon,description=EXCLUDED.description,sort_order=EXCLUDED.sort_order,published=EXCLUDED.published,updated_at=now()`, [slug,title,text(form,'icon').slice(0,50),text(form,'description'),integer(form,'sortOrder'),published]);
  } else if (section === 'products') {
    const slug = slugSchema.parse(text(form, 'slug'));
    const name = z.string().min(2).max(180).parse(text(form, 'name'));
    const categorySlug = slugSchema.parse(text(form, 'categorySlug'));
    const priceSource = z.enum(['catalog-snapshot','confirm']).parse(text(form,'priceSource'));
    const storeUrl = safeUrl(text(form,'storeUrl'),'URL toko')!;
    const price = integer(form,'price',true);
    if (priceSource === 'confirm' && price !== null) throw new Error('Kosongkan harga untuk produk yang perlu dikonfirmasi.');
    if (priceSource === 'catalog-snapshot' && price === null) throw new Error('Masukkan harga indikatif atau pilih status perlu dikonfirmasi.');
    const specs = text(form,'specs').split('\n').map((line)=>line.trim()).filter(Boolean).map((line)=>{const [label,...value]=line.split('|');return {label:label.trim(),value:value.join('|').trim()};});
    if (specs.some((spec) => !spec.label || !spec.value)) throw new Error('Isi spesifikasi dengan format Nama|Nilai, satu spesifikasi per baris.');
    const legacySlugs = text(form,'legacySlugs').split('\n').map((value)=>value.trim()).filter(Boolean);
    if (legacySlugs.some((value)=>!slugSchema.safeParse(value).success)) throw new Error('Setiap slug lama harus menggunakan huruf kecil, angka, dan tanda hubung.');
    const originalSlug = text(form,'originalSlug');
    if(originalSlug && originalSlug !== slug && !legacySlugs.includes(originalSlug)) legacySlugs.push(originalSlug);
    const params = [slug,legacySlugs,name,categorySlug,price,priceSource,safeImage(text(form,'image')),text(form,'imageAlt'),text(form,'description'),JSON.stringify(specs),storeUrl,integer(form,'sortOrder'),published];
    if (originalSlug && originalSlug !== slug) {
      const updated = await query(`UPDATE products SET slug=$1,legacy_slugs=$2,name=$3,category_slug=$4,price=$5,price_source=$6,image=$7,image_alt=$8,description=$9,specs=$10,store_url=$11,sort_order=$12,published=$13,updated_at=now() WHERE slug=$14`,[...params,originalSlug]);
      if (!updated.rowCount) throw new Error('Produk yang diedit sudah tidak ditemukan.');
    } else await query(`INSERT INTO products(slug,legacy_slugs,name,category_slug,price,price_source,image,image_alt,description,specs,store_url,sort_order,published,updated_at)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,now()) ON CONFLICT(slug) DO UPDATE SET legacy_slugs=EXCLUDED.legacy_slugs,name=EXCLUDED.name,category_slug=EXCLUDED.category_slug,price=EXCLUDED.price,price_source=EXCLUDED.price_source,image=EXCLUDED.image,image_alt=EXCLUDED.image_alt,description=EXCLUDED.description,specs=EXCLUDED.specs,store_url=EXCLUDED.store_url,sort_order=EXCLUDED.sort_order,published=EXCLUDED.published,updated_at=now()`, params);
    refreshPublicPages(slug);
    return { ok: true, message: 'Produk berhasil disimpan.' };
  } else if (section === 'packages') {
    const name = z.string().min(2).max(100).parse(text(form,'name'));
    const price=integer(form,'price');
    if(price===0) throw new Error('Harga paket harus lebih besar dari nol.');
    const fields=[name,text(form,'label'),price,text(form,'description'),safeImage(text(form,'image')),JSON.stringify(text(form,'points').split('\n').map((v)=>v.trim()).filter(Boolean)),integer(form,'sortOrder'),published];
    if(id) await query('UPDATE packages SET name=$1,label=$2,price=$3,description=$4,image=$5,points=$6,sort_order=$7,published=$8,updated_at=now() WHERE id=$9',[...fields,id]);
    else await query('INSERT INTO packages(name,label,price,description,image,points,sort_order,published) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',fields);
  } else if (section === 'portfolio') {
    const name = z.string().min(2).max(140).parse(text(form,'name'));
    const image = safeImage(z.string().min(1).parse(text(form,'image')),false)!;
    const permissionConfirmed = checkbox(form,'permissionConfirmed');
    const permissionNote = z.string().max(1200).parse(text(form,'permissionNote'));
    if (permissionConfirmed && permissionNote.length < 10) throw new Error('Catat tanggal dan kanal persetujuan sebelum menayangkan portfolio.');
    if (id) await query('UPDATE portfolio_items SET name=$1,image=$2,sort_order=$3,published=$4,permission_confirmed=$5,permission_note=$6,updated_at=now() WHERE id=$7',[name,image,integer(form,'sortOrder'),published,permissionConfirmed,permissionConfirmed?permissionNote:'',id]);
    else await query('INSERT INTO portfolio_items(name,image,sort_order,published,permission_confirmed,permission_note) VALUES($1,$2,$3,$4,$5,$6)',[name,image,integer(form,'sortOrder'),published,permissionConfirmed,permissionConfirmed?permissionNote:'']);
  } else if (section === 'promos') {
    const title = z.string().min(2).max(160).parse(text(form,'title'));
    const sourceUrl = safeUrl(text(form,'sourceUrl'),'Sumber promo')!;
    const startsAt = text(form,'startsAt');
    const endsAt = text(form,'endsAt');
    if (!/^\d{4}-\d{2}-\d{2}$/.test(startsAt) || !/^\d{4}-\d{2}-\d{2}$/.test(endsAt) || endsAt <= startsAt) throw new Error('Tanggal akhir promo harus setelah tanggal mulai.');
    const fields = [title,text(form,'description'),sourceUrl,startsAt,endsAt,safeImage(text(form,'image')),integer(form,'sortOrder'),published];
    if (id) await query('UPDATE promos SET title=$1,description=$2,source_url=$3,starts_at=$4,ends_at=$5,image=$6,sort_order=$7,published=$8,updated_at=now() WHERE id=$9',[...fields,id]);
    else await query('INSERT INTO promos(title,description,source_url,starts_at,ends_at,image,sort_order,published) VALUES($1,$2,$3,$4,$5,$6,$7,$8)',fields);
  } else if (section === 'faqs') {
    const question = z.string().min(4).max(240).parse(text(form,'question'));
    const answer = z.string().min(4).max(3000).parse(text(form,'answer'));
    const href = text(form,'href') || '/kontak';
    if (!href.startsWith('/') && !href.startsWith('https://')) throw new Error('Tautan FAQ harus berupa path situs atau URL HTTPS.');
    if (id) await query('UPDATE faqs SET question=$1,answer=$2,href=$3,sort_order=$4,published=$5,updated_at=now() WHERE id=$6',[question,answer,href,integer(form,'sortOrder'),published,id]);
    else await query('INSERT INTO faqs(question,answer,href,sort_order,published) VALUES($1,$2,$3,$4,$5)',[question,answer,href,integer(form,'sortOrder'),published]);
  } else if (section === 'articles') {
    const slug = slugSchema.parse(text(form,'slug'));
    const originalSlug = text(form,'originalSlug');
    const title = z.string().trim().min(2).max(180).parse(text(form,'title'));
    const type = z.enum(['article','activity']).parse(text(form,'type'));
    const excerpt = z.string().max(500).parse(text(form,'excerpt'));
    const markdown = z.string().trim().min(1).max(60000).parse(String(form.get('contentMarkdown') ?? '').replace(/\r\n/g,'\n'));
    const coverImage = safeImage(text(form,'coverImage'));
    const coverAlt = z.string().max(240).parse(text(form,'coverAlt'));
    if (coverImage && coverAlt.length < 3) throw new Error('Tambahkan teks alternatif yang menjelaskan foto cover.');
    for (const image of markdownImageSources(markdown)) {
      if (!image.alt.trim()) throw new Error('Setiap gambar di isi artikel harus memiliki alt text.');
      if (!isAllowedArticleImage(image.src)) throw new Error('Gambar artikel hanya boleh berasal dari /images atau media CMS.');
    }
    const youtubeUrl = text(form,'youtubeUrl');
    if (youtubeUrl && !youtubeVideoId(youtubeUrl)) throw new Error('Masukkan URL video YouTube yang valid.');
    const eventDate = type === 'activity' ? text(form,'eventDate') : '';
    const eventLocation = type === 'activity' ? z.string().max(180).parse(text(form,'eventLocation')) : '';
    if (eventDate && (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || Number.isNaN(Date.parse(`${eventDate}T00:00:00Z`)) || new Date(`${eventDate}T00:00:00Z`).toISOString().slice(0,10) !== eventDate)) throw new Error('Tanggal kegiatan tidak valid.');
    const values = [slug,title,type,excerpt,coverImage,coverAlt,markdown,youtubeUrl || null,eventDate || null,eventLocation || null,published];
    if (originalSlug) {
      const updated = await query(`UPDATE articles SET slug=$1,title=$2,type=$3,excerpt=$4,cover_image=$5,cover_alt=$6,content_markdown=$7,youtube_url=$8,event_date=$9,event_location=$10,published=$11,published_at=CASE WHEN $11 AND published_at IS NULL THEN now() ELSE published_at END,updated_at=now() WHERE slug=$12`,[...values,originalSlug]);
      if (!updated.rowCount) throw new Error('Artikel yang diedit sudah tidak ditemukan.');
    } else {
      await query(`INSERT INTO articles(slug,title,type,excerpt,cover_image,cover_alt,content_markdown,youtube_url,event_date,event_location,published,published_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,CASE WHEN $11 THEN now() ELSE NULL END)`,values);
    }
    refreshPublicPages();
    if (originalSlug) revalidatePath(`/artikel/${originalSlug}`);
    revalidatePath(`/artikel/${slug}`);
    return { ok:true,message:published?'Artikel berhasil diterbitkan.':'Draf berhasil disimpan.' };
  } else if (section === 'settings') {
    const contact = {
      phone: z.string().min(6).max(40).parse(text(form,'phone')),
      email: z.string().email().max(254).parse(text(form,'email')),
      whatsapp: z.string().regex(/^\d{8,16}$/).parse(text(form,'whatsapp').replace(/\D/g,'')),
      serviceHours: z.string().max(200).parse(text(form,'serviceHours')),
      serviceHoursSource: safeUrl(text(form,'serviceHoursSource'),'Sumber jam layanan',true) ?? '',
      serviceHoursVerifiedAt: text(form,'serviceHoursVerifiedAt'),
      locations: text(form,'locationsText').split('\n').map((line)=>line.trim()).filter(Boolean).map((line)=>{ const [name,...address]=line.split('|'); return {name:name.trim(),address:address.join('|').trim()}; }),
    };
    if (contact.serviceHours && (!contact.serviceHoursSource || !/^\d{4}-\d{2}-\d{2}$/.test(contact.serviceHoursVerifiedAt))) throw new Error('Jam layanan memerlukan URL sumber dan tanggal verifikasi.');
    if (contact.locations.some((item) => !item.name?.trim() || !item.address?.trim())) throw new Error('Setiap showroom harus memiliki nama dan alamat.');
    if (!contact.locations.length) throw new Error('Tambahkan setidaknya satu lokasi showroom.');
    await query("INSERT INTO site_settings(key,value,updated_at) VALUES('contact',$1,now()) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value,updated_at=now()",[JSON.stringify(contact)]);
  } else if (section === 'seo') {
    const parsed = parseSeoSettings({
      siteName:text(form,'siteName'),
      defaultTitle:text(form,'defaultTitle'),
      description:text(form,'description'),
      socialImage:safeImage(text(form,'socialImage')) ?? '',
      socialImageAlt:text(form,'socialImageAlt'),
    });
    await query("INSERT INTO site_settings(key,value,updated_at) VALUES('seo',$1,now()) ON CONFLICT(key) DO UPDATE SET value=EXCLUDED.value,updated_at=now()",[JSON.stringify(parsed)]);
  } else {
    throw new Error('Bagian CMS tidak dikenal.');
  }
  refreshPublicPages();
  return { ok: true, message: 'Perubahan berhasil disimpan dan langsung diterbitkan.' };
}

export async function saveContentState(_previous: { ok: boolean; message: string }, form: FormData) {
  try { return await saveContent(form); }
  catch (error) { return { ok: false, message: error instanceof Error ? error.message : 'Perubahan gagal disimpan.' }; }
}

export async function createInvite(form: FormData) {
  const admin = await requireAdmin();
  const email = z.string().email().max(254).parse(text(form,'email')).toLowerCase();
  const fullName = z.string().min(2).max(120).parse(text(form,'fullName'));
  const role = z.enum(['admin','editor']).parse(text(form,'role'));
  const existing = await query('SELECT 1 FROM cms_users WHERE email=$1 UNION ALL SELECT 1 FROM cms_tokens WHERE email=$1 AND purpose=\'invite\' AND used_at IS NULL AND expires_at>now() LIMIT 1',[email]);
  if (existing.rowCount) throw new Error('Email tersebut sudah memiliki akun atau undangan yang masih aktif.');
  const rawToken = randomBytes(32).toString('base64url');
  const tokenHash = createHash('sha256').update(rawToken).digest('hex');
  await query("INSERT INTO cms_tokens(token_hash,purpose,email,full_name,role,expires_at,created_by) VALUES($1,'invite',$2,$3,$4,now()+interval '24 hours',$5)",[tokenHash,email,fullName,role,admin.id]);
  const origin = process.env.CMS_PUBLIC_URL || 'http://localhost:3000';
  return { ok: true, message: 'Tautan undangan aktif selama 24 jam.', inviteUrl: `${origin}/admin/accept?token=${rawToken}` };
}

export async function createResetLink(form: FormData) {
  const admin = await requireAdmin();
  const id = z.string().uuid().parse(text(form,'id'));
  const { rows } = await query('SELECT email,full_name,role,active FROM cms_users WHERE id=$1',[id]);
  const target = rows[0];
  if (!target?.active) throw new Error('Akun tidak ditemukan atau tidak aktif.');
  const rawToken = randomBytes(32).toString('base64url');
  const tokenHash = createHash('sha256').update(rawToken).digest('hex');
  await query("INSERT INTO cms_tokens(token_hash,purpose,email,full_name,role,expires_at,created_by) VALUES($1,'reset',$2,$3,$4,now()+interval '24 hours',$5)",[tokenHash,target.email,target.full_name,target.role,admin.id]);
  return { ok: true, message: 'Tautan reset aktif selama 24 jam.', inviteUrl: `${process.env.CMS_PUBLIC_URL || 'http://localhost:3000'}/admin/accept?token=${rawToken}` };
}

export async function createInviteState(_previous: { ok: boolean; message: string; inviteUrl?: string }, form: FormData) {
  try { return await createInvite(form); } catch (error) { return { ok: false, message: error instanceof Error ? error.message : 'Undangan gagal dibuat.' }; }
}

export async function createResetState(_previous: { ok: boolean; message: string; inviteUrl?: string }, form: FormData) {
  try { return await createResetLink(form); } catch (error) { return { ok: false, message: error instanceof Error ? error.message : 'Tautan reset gagal dibuat.' }; }
}

export async function acceptAccessToken(_previous: { ok: boolean; message: string }, form: FormData) {
  const token = text(form,'token');
  const password = z.string().min(12).max(200).parse(text(form,'password'));
  const tokenHash = createHash('sha256').update(token).digest('hex');
  const poolClient = await (await import('@/lib/db')).getPool().connect();
  try {
    await poolClient.query('BEGIN');
    const { rows } = await poolClient.query('SELECT * FROM cms_tokens WHERE token_hash=$1 FOR UPDATE',[tokenHash]);
    const access = rows[0];
    if (!access || access.used_at || new Date(String(access.expires_at)).getTime() <= Date.now()) throw new Error('Tautan tidak valid, sudah digunakan, atau telah kedaluwarsa.');
    const hash = await argon2.hash(password,{type:argon2.argon2id});
    if (access.purpose === 'invite') {
      await poolClient.query('INSERT INTO cms_users(email,full_name,password_hash,role,active) VALUES($1,$2,$3,$4,true)',[access.email,access.full_name,hash,access.role]);
    } else {
      const result = await poolClient.query('UPDATE cms_users SET password_hash=$1,updated_at=now() WHERE email=$2 AND active=true',[hash,access.email]);
      if (!result.rowCount) throw new Error('Akun tidak ditemukan atau tidak aktif.');
    }
    await poolClient.query('UPDATE cms_tokens SET used_at=now() WHERE id=$1',[access.id]);
    await poolClient.query('COMMIT');
    return { ok: true, message: 'Password berhasil disimpan. Silakan masuk ke CMS.' };
  } catch (error) {
    await poolClient.query('ROLLBACK');
    return { ok: false, message: error instanceof Error ? error.message : 'Tautan tidak dapat digunakan.' };
  } finally { poolClient.release(); }
}

export async function toggleUserActive(form: FormData) {
  const admin = await requireAdmin();
  const id = z.string().uuid().parse(text(form,'id'));
  if (id === admin.id) throw new Error('Admin tidak dapat menonaktifkan akunnya sendiri.');
  await query('UPDATE cms_users SET active=NOT active,updated_at=now() WHERE id=$1',[id]);
  revalidatePath('/admin/users');
}

export async function signOutCms() {
  const { signOut } = await import('@/auth');
  await signOut({ redirectTo: '/admin/login' });
}
