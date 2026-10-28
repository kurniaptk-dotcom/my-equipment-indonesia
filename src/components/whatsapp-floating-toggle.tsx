'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { ContactSettings } from '@/lib/content';
import { waLink } from '@/data/catalog';

type Props = {
  contact: ContactSettings;
};

const quickTopics = [
  {
    title: 'Paket Usaha Laundry',
    desc: 'Rekomendasi paket sesuai anggaran',
    message: 'Halo My Equipment, saya ingin konsultasi pemilihan paket usaha laundry.',
  },
  {
    title: 'Tanya Mesin & Sparepart',
    desc: 'Spesifikasi, harga, & ketersediaan',
    message: 'Halo My Equipment, saya ingin menanyakan ketersediaan dan spesifikasi mesin laundry.',
  },
  {
    title: 'Kunjungan Showroom',
    desc: 'Atur jadwal survei unit & konsultasi',
    message: 'Halo My Equipment, saya ingin mengatur jadwal kunjungan ke showroom.',
  },
  {
    title: 'Konsultasi Umum',
    desc: 'Tanya layanan & pengiriman',
    message: 'Halo My Equipment, saya ingin bertanya seputar layanan My Equipment.',
  },
] as const;

export function WhatsAppFloatingToggle({ contact }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const defaultChatHref = waLink('Halo My Equipment, saya ingin konsultasi usaha laundry.', contact.whatsapp);

  return (
    <div
      ref={containerRef}
      className={`whatsapp-floating-wrapper${isOpen ? ' is-open' : ''}`}
      data-testid="whatsapp-floating-widget"
    >
      {isOpen && (
        <aside
          id="whatsapp-floating-card"
          className="whatsapp-floating-card"
          role="dialog"
          aria-label="Konsultasi WhatsApp My Equipment"
          data-testid="whatsapp-floating-card"
        >
          <div className="whatsapp-floating-card__header">
            <div className="whatsapp-floating-card__avatar" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
            </div>
            <div className="whatsapp-floating-card__info">
              <b>My Equipment Support</b>
              <div className="whatsapp-floating-card__status">
                <span className="online-dot" aria-hidden="true" />
                <span>Online (08.00 - 21.00 WIB)</span>
              </div>
            </div>
            <button
              type="button"
              className="whatsapp-floating-card__close"
              onClick={() => {
                setIsOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Tutup jendela chat"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div className="whatsapp-floating-card__body">
            <div className="whatsapp-floating-card__bubble">
              <p>Halo! 👋 Ada yang bisa kami bantu? Pilih kebutuhan konsultasi Anda atau langsung hubungi via WhatsApp:</p>
            </div>

            <div className="whatsapp-floating-topics">
              {quickTopics.map((topic) => (
                <Link
                  key={topic.title}
                  href={waLink(topic.message, contact.whatsapp)}
                  target="_blank"
                  rel="noreferrer"
                  className="whatsapp-floating-topic-item"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="whatsapp-floating-topic-text">
                    <b>{topic.title}</b>
                    <small>{topic.desc}</small>
                  </div>
                  <span className="whatsapp-floating-topic-arrow" aria-hidden="true">→</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="whatsapp-floating-card__footer">
            <Link
              href={defaultChatHref}
              target="_blank"
              rel="noreferrer"
              className="whatsapp-floating-cta-button"
              onClick={() => setIsOpen(false)}
            >
              Mulai Chat di WhatsApp <span aria-hidden="true">↗</span>
            </Link>
            <span className="whatsapp-floating-disclaimer">Respon cepat via WhatsApp resmi</span>
          </div>
        </aside>
      )}

      <button
        ref={triggerRef}
        type="button"
        className="whatsapp-floating-trigger"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="whatsapp-floating-card"
        aria-label={isOpen ? 'Tutup bantuan WhatsApp' : 'Buka bantuan WhatsApp'}
        data-testid="whatsapp-floating-trigger"
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <>
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            <span className="whatsapp-floating-label">Chat Kami</span>
          </>
        )}
      </button>
    </div>
  );
}

