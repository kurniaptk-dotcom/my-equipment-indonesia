export interface FeaturedVideo {
  url: string;
  title: string;
  location: string;
  badge: string;
  desc: string;
}

export const featuredVideos: FeaturedVideo[] = [
  {
    url: 'https://www.youtube.com/watch?v=1S1MumVG5xo',
    title: 'Pengiriman & Instalasi Dryer Gas Komersial di Kalimantan Barat',
    location: 'Pontianak & Kubu Raya',
    badge: 'Dokumentasi Kiriman',
    desc: 'Proses unboxing, perakitan pipa gas LPG, dan pengetesan putaran drum mesin pengering komersial oleh tim teknisi resmi My Equipment.',
  },
  {
    url: 'https://www.youtube.com/watch?v=jTE2r4FtbCY',
    title: 'Komisioning Mesin Cuci Heavy Duty & Jalur Pipa Outlet Mitra',
    location: 'Singkawang & Pantura',
    badge: 'Uji Coba Lapangan',
    desc: 'Pengecekan akhir kestabilan getaran mesin cuci front load dan jalur suplai gas sebelum serah terima unit ke pengusaha laundry.',
  },
  {
    url: 'https://www.youtube.com/watch?v=zzSh9yeSZH0',
    title: 'Serah Terima Paket Usaha Laundry Komersial Siap Buka',
    location: 'Distribusi Antar-Kabupaten',
    badge: 'Kemitraan Mandiri',
    desc: 'Pendampingan lengkap mulai dari pengiriman armada, setting boiler setrika uap, hingga pelatihan SOP takaran deterjen sampai mahir.',
  },
];
