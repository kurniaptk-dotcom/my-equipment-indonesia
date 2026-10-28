import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';
import { getCmsUser } from '@/lib/access';
import { signOutCms } from '@/app/admin/actions';
import { AdminShell } from '@/components/admin-shell';

export const dynamic = 'force-dynamic';
export default async function AdminLayout({children}:{children:ReactNode}) {
  const user=await getCmsUser();
  if(!user) redirect('/admin/login');
  return <AdminShell user={user} logoutAction={signOutCms}>{children}</AdminShell>;
}
