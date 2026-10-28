import 'server-only';
import { auth } from '@/auth';
import { query } from '@/lib/db';

export type CmsUser = { id: string; email: string; fullName: string; role: 'admin' | 'editor'; active: boolean };

export async function getCmsUser(): Promise<CmsUser | null> {
  const session = await auth();
  const id = session?.user?.id;
  if (!id) return null;
  const { rows } = await query('SELECT id,email,full_name,role,active FROM cms_users WHERE id=$1', [id]);
  const user = rows[0];
  if (!user || !user.active) return null;
  return { id: String(user.id), email: String(user.email), fullName: String(user.full_name), role: user.role as CmsUser['role'], active: true };
}

export async function requireCmsUser(): Promise<CmsUser> {
  const user = await getCmsUser();
  if (!user) throw new Error('Sesi admin tidak valid. Silakan masuk kembali.');
  return user;
}

export async function requireAdmin(): Promise<CmsUser> {
  const user = await requireCmsUser();
  if (user.role !== 'admin') throw new Error('Aksi ini hanya dapat dilakukan Admin.');
  return user;
}
