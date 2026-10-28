import type { ReactNode, SVGProps } from 'react';

export type AdminIconName = 'overview' | 'products' | 'categories' | 'packages' | 'portfolio' | 'promos' | 'faq' | 'contact' | 'users' | 'plus' | 'external' | 'logout' | 'search' | 'close' | 'check' | 'help';

const paths: Record<AdminIconName, ReactNode> = {
  overview: <><rect x="3.5" y="3.5" width="7" height="7" rx="1.5"/><rect x="13.5" y="3.5" width="7" height="4" rx="1.5"/><rect x="13.5" y="9.5" width="7" height="11" rx="1.5"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.5"/></>,
  products: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 4v16M16 4v16M4 9h16M4 15h16"/></>,
  categories: <><path d="M4 5h7v6H4zM13 5h7v6h-7zM4 13h7v6H4zM13 13h7v6h-7z"/></>,
  packages: <><path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z"/><path d="m4.5 7.8 7.5 4.3 7.5-4.3M12 12v9M8 5.3l8 4.5"/></>,
  portfolio: <><rect x="3.5" y="4" width="17" height="16" rx="2"/><circle cx="9" cy="9" r="1.5"/><path d="m5 17 5-5 3.5 3 2.5-2 3 4"/></>,
  promos: <><path d="m20 13-7 7-10-10V4h6l11 9Z"/><circle cx="8" cy="8" r="1"/></>,
  faq: <><circle cx="12" cy="12" r="8.5"/><path d="M9.8 9a2.3 2.3 0 1 1 3.7 1.8c-1 .7-1.5 1.1-1.5 2.2M12 16.5h.01"/></>,
  contact: <><path d="M4 5.5h16v13H4z"/><path d="m4.5 7 7.5 6 7.5-6"/></>,
  users: <><circle cx="9" cy="8" r="3"/><path d="M3.5 19v-1.4A4.6 4.6 0 0 1 8.1 13h1.8a4.6 4.6 0 0 1 4.6 4.6V19M16 5.4a3 3 0 0 1 0 5.8M17 13.4a4.5 4.5 0 0 1 3.5 4.4V19"/></>,
  plus: <path d="M12 5v14M5 12h14"/>,
  external: <><path d="M13 5h6v6M19 5l-9 9"/><path d="M18 13v5a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></>,
  logout: <><path d="M10 5H5v14h5M14 8l4 4-4 4M8 12h10"/></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8"/><path d="m16 16 4 4"/></>,
  close: <path d="m6 6 12 12M18 6 6 18"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  help: <><circle cx="12" cy="12" r="9"/><path d="M9.8 9a2.3 2.3 0 1 1 3.7 1.8c-1 .7-1.5 1.1-1.5 2.2M12 16.5h.01"/></>,
};

export function AdminIcon({ name, size = 18, ...props }: SVGProps<SVGSVGElement> & { name: AdminIconName; size?: number }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" focusable="false" {...props}>{paths[name]}</svg>;
}
