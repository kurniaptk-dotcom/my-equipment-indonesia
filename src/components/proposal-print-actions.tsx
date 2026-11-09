'use client';

export function ProposalPrintActions({ whatsappHref }: { whatsappHref: string }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
      <button
        type="button"
        onClick={() => window.print()}
        style={{
          backgroundColor: '#0284c7',
          color: '#ffffff',
          border: 'none',
          padding: '0.65rem 1.25rem',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '0.875rem',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          boxShadow: '0 2px 8px rgba(2, 132, 199, 0.25)',
        }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="6 9 6 2 18 2 18 9" />
          <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
          <rect x="6" y="14" width="12" height="8" />
        </svg>
        <span>Cetak / Simpan PDF</span>
      </button>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noreferrer"
        style={{
          backgroundColor: '#16a34a',
          color: '#ffffff',
          textDecoration: 'none',
          padding: '0.65rem 1.25rem',
          borderRadius: '8px',
          fontWeight: 600,
          fontSize: '0.875rem',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          boxShadow: '0 2px 8px rgba(22, 163, 74, 0.25)',
        }}
      >
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
        <span>Konsultasi WhatsApp</span>
      </a>
    </div>
  );
}

