import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import argon2 from 'argon2';
import { createHash } from 'node:crypto';
import { z } from 'zod';
import { query } from '@/lib/db';

const credentialsSchema = z.object({ email: z.string().email().max(254), password: z.string().min(1).max(200) });
const maxAttempts = 5;
const attemptWindowMinutes = 15;

async function isRateLimited(key: string) {
  const { rows } = await query('SELECT attempts,window_started,blocked_until FROM cms_login_attempts WHERE key_hash=$1', [key]);
  const item = rows[0];
  if (!item) return false;
  if (item.blocked_until && new Date(String(item.blocked_until)).getTime() > Date.now()) return true;
  return Number(item.attempts) >= maxAttempts && Date.now() - new Date(String(item.window_started)).getTime() < attemptWindowMinutes * 60_000;
}

async function recordFailedAttempt(key: string) {
  await query(`INSERT INTO cms_login_attempts(key_hash,attempts,window_started) VALUES($1,1,now())
    ON CONFLICT(key_hash) DO UPDATE SET
    attempts=CASE WHEN cms_login_attempts.window_started < now()-interval '15 minutes' THEN 1 ELSE cms_login_attempts.attempts+1 END,
    window_started=CASE WHEN cms_login_attempts.window_started < now()-interval '15 minutes' THEN now() ELSE cms_login_attempts.window_started END,
    blocked_until=CASE WHEN cms_login_attempts.window_started >= now()-interval '15 minutes' AND cms_login_attempts.attempts+1 >= 5 THEN now()+interval '15 minutes' ELSE NULL END`, [key]);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.AUTH_SECRET,
  trustHost: true,
  session: { strategy: 'jwt', maxAge: 8 * 60 * 60 },
  pages: { signIn: '/admin/login' },
  providers: [Credentials({
    credentials: { email: { label: 'Email', type: 'email' }, password: { label: 'Password', type: 'password' } },
    async authorize(raw, request) {
      const parsed = credentialsSchema.safeParse(raw);
      if (!parsed.success) return null;
      const email = parsed.data.email.trim().toLowerCase();
      // An account key cannot be evaded by supplying a forged X-Forwarded-For header.
      const keys = [createHash('sha256').update(`account:${email}`).digest('hex')];
      const trustedProxyIp = request.headers.get('x-real-ip')?.trim();
      if (trustedProxyIp) keys.push(createHash('sha256').update(`source:${trustedProxyIp}`).digest('hex'));
      for (const key of keys) if (await isRateLimited(key)) return null;
      const { rows } = await query('SELECT id,email,full_name,password_hash,role,active FROM cms_users WHERE email=$1', [email]);
      const user = rows[0];
      const valid = Boolean(user?.active && await argon2.verify(String(user.password_hash), parsed.data.password).catch(() => false));
      if (!valid) {
        await Promise.all(keys.map(recordFailedAttempt));
        return null;
      }
      await Promise.all(keys.map((key) => query('DELETE FROM cms_login_attempts WHERE key_hash=$1', [key])));
      return { id: String(user.id), email: String(user.email), name: String(user.full_name), role: String(user.role) as 'admin' | 'editor' };
    },
  })],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = 'role' in user ? user.role : undefined;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
        session.user.role = token.role === 'admin' ? 'admin' : 'editor';
      }
      return session;
    },
  },
});
