'use client';

import { usePathname } from 'next/navigation';
import type { ReactNode } from 'react';

export function SiteChromeSwitch({
  header,
  footer,
  floatingCta,
  children,
}: {
  header: ReactNode;
  footer: ReactNode;
  floatingCta?: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname === '/admin' || pathname.startsWith('/admin/');
  return (
    <>
      {!isAdmin && header}
      {children}
      {!isAdmin && footer}
      {!isAdmin && floatingCta}
    </>
  );
}
