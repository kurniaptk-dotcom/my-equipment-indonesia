import type { Metadata } from 'next';
import Link from 'next/link';
import { waLink } from '@/data/catalog';
import { getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> {
  return createPageMetadata({
    title: 'Kontak & Alamat Showroom My Equipment Pontianak, Kubu Raya, & Singkawang',
    description:
      'Alamat lengkap showroom dan workshop pusat My Equipment di Pontianak & Kubu Raya, cabang Singkawang. Konsultasi paket usaha, uji coba mesin, dan servis panggilan se-Kalbar.',
    canonical: '/kontak',
  });
}

export const dynamic = 'force-dynamic';

const GOOGLE_MAPS_OFFICIAL_URL =
  'https://www.google.com/maps/place/My+Equipment+Indonesia+Corp/@-0.1018164,109.3939182,17z/data=!3m1!4b1!4m6!3m5!1s0x2e1d5182504320b9:0x822c17173bbad83c!8m2!3d-0.1018218!4d109.3964931!16s%2Fg%2F11xmdvxx0_';

const mapLink = (address: string) => {
  if (
    address.toLowerCase().includes('teluk mulus') ||
    address.toLowerCase().includes('adisucipto') ||
    address.toLowerCase().includes('adi sucipto')
  ) {
    return GOOGLE_MAPS_OFFICIAL_URL;
  }
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
};

export default async function Kontak() {
  const contact = await getContactSettings();
  const showroomVisitHref = waLink(
    'Halo My Equipment, saya berencana mengunjungi showroom. Lokasi yang saya inginkan: [Pontianak / Singkawang]. Waktu kunjungan: [hari/tanggal dan jam]. Mohon konfirmasi alamat dan kesiapan unit mesin sebelum saya datang. Sumber: halaman Kontak dan Showroom.',
    contact.whatsapp
  );
  const serviceHoursVerifiedLabel = contact.serviceHoursVerifiedAt
    ? new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(
        new Date(`${contact.serviceHoursVerifiedAt}T00:00:00Z`)
      )
    : 'terverifikasi';

  return (
    <main className="subpage">
      <section className="wrap contact-hero">
        <div>
          <span className="eyebrow">Kontak & Showroom Resmi Kalbar</span>
          <h1>
            Kunjungi Showroom <br />
            <em>dan Workshop Kami.</em>
          </h1>
          <p>
            Uji coba mesin cuci, mesin pengering konversi gas, dan setrika uap boiler langsung di workshop pusat Kubu Raya/Pontianak atau pos cabang Singkawang.
          </p>
          <Link className="button" href={showroomVisitHref} target="_blank" rel="noreferrer">
            Jadwalkan Kunjungan via WhatsApp <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="contact-highlight">
          <span>ME</span>
          <b>Pusat Mesin Laundry Kalbar</b>
          <small>{contact.locations.map((location) => location.name).join(' & ')}</small>
        </div>
      </section>

      <section className="wrap contact-layout">
        <div className="contact-methods">
          <span className="eyebrow">Hubungi Tim Resmi</span>
          <h2>Kanal Pelayanan Cepat</h2>
          <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`}>
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <div>
              <b>Telepon / WhatsApp Konsultasi</b>
              <small>{contact.phone}</small>
            </div>
            <i>↗</i>
          </a>
          <a href={`mailto:${contact.email}`}>
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <div>
              <b>Email Korespondensi</b>
              <small>{contact.email}</small>
            </div>
            <i>↗</i>
          </a>
          <Link href="/konsultasi">
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <line x1="9" y1="9" x2="15" y2="9" />
                <line x1="9" y1="13" x2="15" y2="13" />
                <line x1="9" y1="17" x2="11" y2="17" />
              </svg>
            </span>
            <div>
              <b>Formulir Konsultasi Rencana Usaha</b>
              <small>Hitung kebutuhan mesin & penawaran resmi</small>
            </div>
            <i>↗</i>
          </Link>
        </div>

        <div className="showroom-cards">
          <span className="eyebrow">Lokasi Showroom & Workshop</span>
          <h2>Kunjungi Kantor Fisik Kami</h2>
          {contact.locations.map((location, index) => (
            <article key={location.name}>
              <div className="showroom-number">{String(index + 1).padStart(2, '0')}</div>
              <div>
                <b>{location.name}</b>
                <p>{location.address}</p>
                <Link href={mapLink(location.address)} target="_blank" rel="noreferrer">
                  Buka Peta Google Maps ↗
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {contact.serviceHours && (
        <section className="wrap contact-hours" aria-labelledby="contact-hours-title">
          <div>
            <span className="eyebrow">Jam Layanan & Showroom</span>
            <h2 id="contact-hours-title">{contact.serviceHours}</h2>
            <p>
              Workshop pusat dan showroom buka setiap hari. Teknisi kami standby untuk melayani konsultasi langsung, survei denah ruko, dan pengiriman mesin ke seluruh Kalimantan Barat.
            </p>
            <small>Diverifikasi {serviceHoursVerifiedLabel}</small>
          </div>
          <Link href={contact.serviceHoursSource} target="_blank" rel="noreferrer">
            Lihat Sumber Resmi ↗
          </Link>
        </section>
      )}

      <p className="wrap note">
        Untuk memastikan unit demo dan teknisi siap mendampingi Anda, mohon lakukan konfirmasi jadwal kunjungan terlebih dahulu melalui WhatsApp.
      </p>
    </main>
  );
}
