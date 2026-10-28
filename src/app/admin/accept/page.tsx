import Link from 'next/link';
import { AcceptAccessForm } from '@/components/admin-forms';

export const metadata = { title: 'Aktifkan atau pulihkan akun CMS' };
export default async function AcceptAccess({ searchParams }: { searchParams:Promise<{token?:string}> }) {
  const {token=''}=await searchParams;
  return <main className="cms-login-page"><section className="cms-login-card"><span className="eyebrow">Undangan dan pemulihan akun</span><h1>Atur password CMS</h1><p>Tautan hanya dapat digunakan satu kali dan kedaluwarsa dalam 24 jam.</p>{token?<AcceptAccessForm token={token}/>:<p role="alert">Token tidak tersedia. Minta tautan baru kepada Admin.</p>}<Link href="/admin/login">Kembali ke halaman masuk</Link></section></main>;
}
