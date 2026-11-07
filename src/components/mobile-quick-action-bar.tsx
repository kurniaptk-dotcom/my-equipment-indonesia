'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ContactSettings } from '@/lib/content';
import { waLink } from '@/data/catalog';

interface MobileQuickActionBarProps {
  contact: ContactSettings;
}

export function MobileQuickActionBar({ contact }: MobileQuickActionBarProps) {
  const pathname = usePathname();

  // Do not show on admin routes
  if (pathname?.startsWith('/admin')) {
    return null;
  }

  const defaultMsg = 'Halo My Equipment Indonesia, saya sedang melihat website dan ingin konsultasi seputar paket usaha serta mesin laundry.';
  const waUrl = waLink(defaultMsg, contact.whatsapp);

  return (
    <div className="mobile-quick-action-bar" aria-label="Aksi Cepat Mobile">
      <div className="mobile-quick-inner">
        <Link href="/paket-usaha" className="mobile-quick-btn mobile-quick-btn-secondary">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="17"
            height="17"
            aria-hidden="true"
          >
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
            <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
            <line x1="12" y1="22.08" x2="12" y2="12" />
          </svg>
          <span>Paket Usaha</span>
        </Link>

        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          className="mobile-quick-btn mobile-quick-btn-primary"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            width="17"
            height="17"
            aria-hidden="true"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
          </svg>
          <span>Chat Sales WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
