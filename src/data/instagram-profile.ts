export interface InstagramHighlight {
  id: string;
  title: string;
  imageUrl: string;
  url: string;
}

export interface InstagramProfileData {
  handle: string;
  name: string;
  verified: boolean;
  category: string;
  postsCount: number;
  followersCount: number;
  followingCount: number;
  bioLines: string[];
  websiteLabel: string;
  websiteUrl: string;
  profileUrl: string;
  dmUrl: string;
  avatarUrl: string;
  socialProof: string;
  highlights: InstagramHighlight[];
}

export const instagramProfileData: InstagramProfileData = {
  handle: 'pusat.mesin.laundry.kalbar',
  name: 'Pusat Mesin Laundry Kalbar',
  verified: true,
  category: 'Pusat Bisnis',
  postsCount: 209,
  followersCount: 6306,
  followingCount: 187,
  bioLines: [
    '⭐ Bantu 1000+ Pengusaha Laundry di KalBar.',
    'Ready Paket Usaha Laundry',
    'Bonus Pendampingan Management Laundry',
  ],
  websiteLabel: 'www.myequipmentindonesia.com',
  websiteUrl: 'https://www.myequipmentindonesia.com',
  profileUrl: 'https://www.instagram.com/pusat.mesin.laundry.kalbar/',
  dmUrl: 'https://ig.me/m/pusat.mesin.laundry.kalbar',
  avatarUrl: '/images/instagram/avatar.webp',
  socialProof: 'Diikuti oleh 6.300+ mitra dan pengusaha laundry di Kalimantan Barat',
  highlights: [
    {
      id: 'pengiriman',
      title: 'Pengiriman',
      imageUrl: '/images/instagram/highlight-pengiriman.webp',
      url: 'https://www.instagram.com/pusat.mesin.laundry.kalbar/',
    },
    {
      id: 'balai-karangan',
      title: 'Balai Karangan',
      imageUrl: '/images/instagram/highlight-balai-karangan.webp',
      url: 'https://www.instagram.com/pusat.mesin.laundry.kalbar/',
    },
    {
      id: 'sambas',
      title: 'Sambas',
      imageUrl: '/images/instagram/highlight-sambas.webp',
      url: 'https://www.instagram.com/pusat.mesin.laundry.kalbar/',
    },
    {
      id: 'training',
      title: 'Training',
      imageUrl: '/images/instagram/highlight-training.webp',
      url: 'https://www.instagram.com/pusat.mesin.laundry.kalbar/',
    },
  ],
};
