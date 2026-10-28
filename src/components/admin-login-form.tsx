'use client';

import { useState, type FormEvent } from 'react';
import { signIn } from 'next-auth/react';

export function AdminLoginForm() {
  const [error,setError]=useState('');
  const [pending,setPending]=useState(false);
  async function submit(event:FormEvent<HTMLFormElement>) {
    event.preventDefault(); setError(''); setPending(true);
    const data=new FormData(event.currentTarget);
    try {
      const result=await signIn('credentials',{email:String(data.get('email')),password:String(data.get('password')),redirect:false,callbackUrl:'/admin'});
      if (!result || result.error) setError('Email atau password salah, akun nonaktif, atau akses sementara dibatasi.');
      // Auth.js may derive its absolute redirect host from Next's bind address
      // (0.0.0.0 in local network mode). Keep the browser on its current origin.
      else window.location.assign('/admin');
    } catch { setError('CMS belum siap. Periksa konfigurasi database dan AUTH_SECRET.'); }
    finally { setPending(false); }
  }
  return <form className="cms-login-form" onSubmit={submit}><label>Email<input name="email" type="email" autoComplete="username" required/></label><label>Password<input name="password" type="password" autoComplete="current-password" required/></label>{error&&<p role="alert">{error}</p>}<button className="button" disabled={pending}>{pending?'Memeriksa…':'Masuk ke CMS'}</button></form>;
}
