import Link from 'next/link';

type Props = {
  href?: string;
  label: string;
  context?: string;
  disabled?: boolean;
  testId?: string;
};

export function WhatsAppStickyBar({ href, label, context, disabled = false, testId = 'whatsapp-sticky-bar' }: Props) {
  return <aside className="whatsapp-sticky-bar" aria-label="Konsultasi WhatsApp" data-testid={testId}>
    <div className="whatsapp-sticky-bar__copy">
      {context && <span>{context}</span>}
      <b>{label}</b>
    </div>
    {disabled || !href
      ? <button className="whatsapp-sticky-bar__action" type="button" disabled>Pilih item untuk lanjut</button>
      : <Link className="whatsapp-sticky-bar__action" href={href} target="_blank" rel="noreferrer">Konsultasi <span aria-hidden="true">↗</span></Link>}
  </aside>;
}
