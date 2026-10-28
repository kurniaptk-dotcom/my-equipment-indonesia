import type { ReactNode, SVGProps } from 'react';

const paths: Record<string, ReactNode> = {
  'mesin-laundry': <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M4 8h16"/><circle cx="12" cy="14" r="4"/><path d="M7 5.5h.01M10 5.5h.01"/></>,
  'peralatan-pendukung': <><path d="M7 4h10l-1.5 5H8.5L7 4Z"/><path d="M8.5 9 5 18.5A2 2 0 0 0 7 21h10a2 2 0 0 0 2-2.5L15.5 9"/><path d="M8 14h8"/></>,
  'perlengkapan-laundry': <><path d="M9 3h6v3l2 2v12a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8l2-2V3Z"/><path d="M9 6h6M9 13h6"/></>,
  'chemical-laundry': <><path d="M10 3h4M11 3v6L5 19a1.5 1.5 0 0 0 1.3 2h11.4a1.5 1.5 0 0 0 1.3-2L13 9V3"/><path d="M8 15h8"/></>,
  cleaning: <><path d="M12 3 4 6v5c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></>,
  aksesori: <><circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.5.9L16 21h-3l-.4-2.1a8 8 0 0 1-1.5-.9l-1.7.6L8 16.2l1.4-1.1a7 7 0 0 1 0-1.8L8 12.2l1.4-2.4 1.7.6a8 8 0 0 1 1.5-.9L13 7h3l.4 2.1a8 8 0 0 1 1.5.9l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1-.2 2.1Z"/></>,
  'suku-cadang': <><path d="m14.5 6.5 3-3a5 5 0 0 0-6.3 6.3l-7.4 7.4a2.1 2.1 0 0 0 3 3l7.4-7.4a5 5 0 0 0 6.3-6.3l-3 3-3-3Z"/></>,
  all: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  quality: <><path d="m12 3 2.6 5.3 5.9.9-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.9L12 3Z"/></>,
  consultation: <><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/><path d="M17 19a5 5 0 0 1-5 3h-1"/></>,
  catalog: <><path d="M12 3 4 6v5c0 5 3.4 8.4 8 10 4.6-1.6 8-5 8-10V6l-8-3Z"/><path d="m9 12 2 2 4-4"/></>,
  showroom: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
  contact: <><path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8 8 0 0 1-3.5-.8L4 20l1.5-3.5A7 7 0 0 1 4 12c0-4.1 3.6-7.5 8-7.5s8 3.1 8 7Z"/><path d="M8 12h8M8 15h5"/></>,
};

export function CategoryIcon({ slug, ...props }: SVGProps<SVGSVGElement> & { slug: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[slug] ?? paths.all}</svg>;
}
