import type { Metadata } from 'next';
import Link from 'next/link';
import { waLink } from '@/data/catalog';
import { getContactSettings } from '@/lib/content';
import { createPageMetadata } from '@/lib/page-metadata';

export async function generateMetadata(): Promise<Metadata> { return createPageMetadata({ title:'Kontak dan Showroom', description:'Hubungi My Equipment Indonesia melalui WhatsApp, telepon, email, atau kunjungi showroom.', canonical:'/kontak' }); }
export const dynamic = 'force-dynamic';
const mapLink = (address: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
export default async function Kontak() {
  const contact=await getContactSettings();
  const showroomVisitHref=waLink('Halo My Equipment, saya berencana mengunjungi showroom. Lokasi yang saya inginkan: [sebutkan lokasi]. Waktu yang saya inginkan: [hari/tanggal dan jam]. Mohon konfirmasi alamat dan kesiapan showroom sebelum saya datang. Sumber: halaman Kontak dan Showroom.',contact.whatsapp);
  const serviceHoursVerifiedLabel = contact.serviceHoursVerifiedAt
    ? new Intl.DateTimeFormat('id-ID',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${contact.serviceHoursVerifiedAt}T00:00:00Z`))
    : 'belum diverifikasi';
  return <main className="subpage"><section className="wrap contact-hero"><div><span className="eyebrow">Kontak My Equipment</span><h1>Hubungi kami<br/><em>dan atur kunjungan.</em></h1><p>Konfirmasi jam layanan, lokasi, dan kesiapan showroom melalui WhatsApp sebelum datang.</p><Link className="button" href={showroomVisitHref} target="_blank" rel="noreferrer">Atur kunjungan via WhatsApp <span aria-hidden="true">↗</span></Link></div><div className="contact-highlight"><span>ME</span><b>Tim My Equipment</b><small>{contact.locations.map((location)=>location.name).join(' dan ')}</small></div></section>
    <section className="wrap contact-layout"><div className="contact-methods"><span className="eyebrow">Hubungi tim</span><h2>Kanal resmi</h2><a href={`tel:${contact.phone.replace(/[^+\d]/g,'')}`}><span>☎</span><div><b>Telepon / WhatsApp</b><small>{contact.phone}</small></div><i>↗</i></a><a href={`mailto:${contact.email}`}><span>✉</span><div><b>Email</b><small>{contact.email}</small></div><i>↗</i></a><Link href="/konsultasi"><span>☷</span><div><b>Konsultasi</b><small>Kirim kebutuhan melalui form WhatsApp</small></div><i>↗</i></Link></div>
      <div className="showroom-cards"><span className="eyebrow">Showroom</span><h2>Kunjungi setelah konfirmasi.</h2>{contact.locations.map((location,index)=><article key={location.name}><div className="showroom-number">{String(index+1).padStart(2,'0')}</div><div><b>{location.name}</b><p>{location.address}</p><Link href={mapLink(location.address)} target="_blank" rel="noreferrer">Buka peta</Link></div></article>)}</div></section>
    {contact.serviceHours && <section className="wrap contact-hours" aria-labelledby="contact-hours-title"><div><span className="eyebrow">Jam layanan kantor</span><h2 id="contact-hours-title">{contact.serviceHours}</h2><p>Jadwal ini tercantum pada halaman paket resmi. Konfirmasi kembali sebelum berkunjung, terutama untuk showroom selain Pontianak.</p><small>Diverifikasi {serviceHoursVerifiedLabel}</small></div><Link href={contact.serviceHoursSource} target="_blank" rel="noreferrer">Lihat sumber resmi ↗</Link></section>}
    <p className="wrap note">Konfirmasi alamat showroom dan kesiapan kunjungan melalui WhatsApp sebelum berangkat.</p>
  </main>;
}
