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
        <span>🖨️</span>
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
        <span>📲</span>
        <span>Konsultasi WhatsApp</span>
      </a>
    </div>
  );
}

