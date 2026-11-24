'use client';

type GtagEventParams = {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: unknown;
};

declare global {
  interface Window {
    gtag?: (command: 'event', eventName: string, eventParams?: GtagEventParams) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Utility to safely send custom events to Google Analytics 4 (GA4).
 */
export function trackEvent(eventName: string, params?: GtagEventParams): void {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  } else if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...params });
  }

  if (process.env.NODE_ENV === 'development') {
    // Helpful log in development mode for verifying lead tracking
    console.debug(`[Analytics Event] ${eventName}:`, params);
  }
}

/**
 * Tracks a WhatsApp CTA click event with normalized metadata.
 */
export function trackWhatsAppClick(refCode: string, metadata?: Record<string, unknown>): void {
  trackEvent('whatsapp_lead_click', {
    event_category: 'lead_generation',
    event_label: refCode,
    page_path: typeof window !== 'undefined' ? window.location.pathname : undefined,
    timestamp: new Date().toISOString(),
    ...metadata,
  });
}
