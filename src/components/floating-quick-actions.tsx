'use client';

import { useState } from 'react';
import { waLink } from '@/data/catalog';

interface QuickActionsProps {
  whatsapp: string;
}

export function FloatingQuickActions({ whatsapp }: QuickActionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const mapsUrl = 'https://www.google.com/maps/dir/?api=1&destination=-0.1018218,109.3964931';
  const waConsultHref = waLink(
    'Halo My Equipment Indonesia, saya sedang membuka website dan ingin konsultasi paket usaha laundry langsung dengan konsultan teknis.',
    whatsapp
  );

  return (
    <div className="floating-quick-widget" aria-label="Menu Aksi Cepat Pengunjung">
      {isOpen && (
        <div className="quick-actions-menu">
          <a
            href={waConsultHref}
            target="_blank"
            rel="noreferrer"
            className="quick-action-item action-wa"
          >
            <span className="action-icon">
              <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.41a8.17 8.17 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.34-.76-1.84-.2-.49-.4-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.8.6.26 1.07.42 1.44.54.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.11-.23-.17-.48-.29" />
              </svg>
            </span>
            <span className="action-label">Chat WhatsApp Resmi</span>
          </a>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="quick-action-item action-maps"
          >
            <span className="action-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <span className="action-label">Petunjuk Rute Showroom</span>
          </a>

          <a
            href="/paket-usaha/proposal"
            className="quick-action-item action-pdf"
          >
            <span className="action-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18" aria-hidden="true">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
              </svg>
            </span>
            <span className="action-label">Buka Proposal PDF</span>
          </a>
        </div>
      )}

      <button
        type="button"
        className={`quick-main-toggle ${isOpen ? 'active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Buka menu bantuan cepat My Equipment"
      >
        {isOpen ? (
          <span className="toggle-close-icon" aria-hidden="true">✕</span>
        ) : (
          <span className="toggle-chat-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span className="quick-ping-dot" aria-hidden="true" />
          </span>
        )}
      </button>
    </div>
  );
}
