import { notFound } from 'next/navigation';
import { redirect } from 'next/navigation';
import { ContentManager, UsersManager } from '@/components/admin-forms';
import { getCmsUser } from '@/lib/access';
import { getAdminRecords, getCategories } from '@/lib/content';

export const dynamic='force-dynamic';
const allowed=['products','categories','packages','portfolio','promos','faqs','articles','settings','users'];
export default async function AdminSection({params}:{params:Promise<{section:string}>}){
  const {section}=await params;
  if(!allowed.includes(section)) notFound();
  const user = await getCmsUser();
  if (!user) redirect('/admin/login');
  if(section==='settings'||section==='users') {
    if(user.role!=='admin') notFound();
  }
  const [records,categories,seoRecords]=await Promise.all([getAdminRecords(section),getCategories(true),section==='settings'?getAdminRecords('seo'):Promise.resolve([])]);
  if(section==='users') return <main className="cms-dashboard"><span className="eyebrow">CMS My Equipment</span><h1>Pengguna</h1><p>Admin mengelola akun staf. Tautan akses hanya ditampilkan satu kali.</p><UsersManager records={records}/></main>;
  return <main className="cms-dashboard"><ContentManager section={section} records={records} categories={categories} seoRecord={seoRecords[0]}/></main>;
}
