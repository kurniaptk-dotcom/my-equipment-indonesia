export interface CityCoverageInfo {
  slug: string;
  name: string;
  districtType: 'Kota' | 'Kabupaten';
  title: string;
  badge: string;
  lead: string;
  deliveryEstimate: string;
  waterCharacteristics: string;
  marketPotential: string;
  recommendedPackages: string[];
  keyStrengths: string[];
  metaTitle: string;
  metaDescription: string;
}

export const KALBAR_CITIES: CityCoverageInfo[] = [
  {
    slug: 'pontianak',
    name: 'Pontianak',
    districtType: 'Kota',
    title: 'Paket Usaha Laundry Pontianak: Mesin Komersial & Tanpa Franchise',
    badge: 'Kantor Pusat & Showroom Utama',
    lead: 'Pusat distributor mesin laundry komersial, paket usaha laundry kiloan & koin self-service di Kota Pontianak. Ready stock mesin cuci front load, dryer gas heavy-duty, dan setrika uap boiler.',
    deliveryEstimate: 'Pengiriman di hari yang sama (Same-day Delivery) langsung dari showroom Kubu Raya.',
    waterCharacteristics: 'Sumber air PDAM Tirta Khatulistiwa & air sumur bor. Direkomendasikan filter sedimen dan karbon aktif untuk menjaga kecerahan serat kain.',
    marketPotential: 'Tinggi sekali: kawasan padat penduduk, ribuan mahasiswa UNTAN, POLNEP, perhotelan, kos-kosan, dan keluarga muda pekerja.',
    recommendedPackages: ['Paket Laundry Koin Self-Service (Stack)', 'Paket Starting Reguler (Front-Load)', 'Paket Laundry Sepatu & Helm'],
    keyStrengths: [
      'Showroom unit mesin siap uji coba langsung',
      'Stok suku cadang & chemical laundry ready stock',
      'Pelatihan SOP dan manajemen laundry langsung di lokasi Anda',
      'Tim teknisi standby untuk pemeliharaan rutin',
    ],
    metaTitle: 'Paket Usaha Laundry Pontianak | Distributor Mesin Komersial Kalbar',
    metaDescription: 'Pusat paket usaha laundry kiloan & koin di Pontianak. 100% keuntungan milik Anda tanpa biaya franchise. Pengiriman langsung, instalasi teknisi, & training SOP.',
  },
  {
    slug: 'kubu-raya',
    name: 'Kubu Raya',
    districtType: 'Kabupaten',
    title: 'Paket Usaha Laundry Kubu Raya: Solusi Mesin Cuci & Dryer Komersial',
    badge: 'Workshop Pusat & Hub Distribusi',
    lead: 'Pusat workshop perakitan, konversi gas, dan gudang distribusi mesin laundry melayani Sungai Raya, Rasau Jaya, Sungai Kakap, Sungai Ambawang, hingga Kuala Mandor B.',
    deliveryEstimate: 'Pengiriman 1-3 jam langsung dari workshop Teluk Mulus Kubu Raya.',
    waterCharacteristics: 'Bervariasi antara air PDAM dan air tanah bergambut. Disarankan pemasangan tabung filter pasir silika dan karbon aktif multi-media.',
    marketPotential: 'Kawasan pemukiman berkembang pesat dekat Bandara Supadio, perumahan ASN, ruko baru, dan sentra kuliner.',
    recommendedPackages: ['Paket Starting Reguler (Kapasitas 60-80 kg/hari)', 'Paket Pra-Starting Rumahan', 'Paket Laundry Kiloan + Karpet'],
    keyStrengths: [
      'Dekat langsung dengan workshop dan teknisi pusat',
      'Bebas biaya ongkir untuk area sekitar Sungai Raya',
      'Konsultasi penataan layout outlet gratis',
    ],
    metaTitle: 'Paket Usaha Laundry Kubu Raya | Mesin Cuci & Pengering Siap Pakai',
    metaDescription: 'Paket usaha laundry kiloan & komersial di Kubu Raya. Tanpa royalti bulanan, gratis training operasional, dan instalasi lengkap oleh teknisi lokal.',
  },
  {
    slug: 'singkawang',
    name: 'Singkawang',
    districtType: 'Kota',
    title: 'Paket Usaha Laundry Singkawang: Mesin Cuci Kiloan & Koin Komersial',
    badge: 'Cabang Showroom & Teknisi Wilayah',
    lead: 'Layanan penjualan paket usaha laundry, mesin cuci front load, dryer gas, dan chemical laundry resmi untuk wilayah Kota Singkawang melalui showroom cabang Terminal Induk.',
    deliveryEstimate: 'Pengiriman 3-4 jam via armada logistik My Equipment rute Pantura.',
    waterCharacteristics: 'Sebagian besar air sumur bor pegunungan dan PDAM. Kualitas air relatif jernih, cukup filter sedimen halus 5 mikron.',
    marketPotential: 'Kota pariwisata yang sangat ramai homestay, hotel, guest house, dan industri kuliner dengan perputaran cucian sprei/linen yang tinggi.',
    recommendedPackages: ['Paket Laundry Komersial (Hotel & Guest House)', 'Paket Starting Laundry Kiloan', 'Paket Cuci Bedcover'],
    keyStrengths: [
      'Ada showroom dan pos teknisi resmi di Singkawang',
      'Pengiriman cepat jalur darat Pantura',
      'Garansi servis dan suku cadang terjamin',
    ],
    metaTitle: 'Paket Usaha Laundry Singkawang | Mesin Laundry Kiloan & Hotel',
    metaDescription: 'Pusat paket usaha laundry kiloan dan komersial di Singkawang. Showroom resmi Terminal Induk, mesin bergaransi, instalasi tuntas tanpa franchise fee.',
  },
  {
    slug: 'sambas',
    name: 'Sambas',
    districtType: 'Kabupaten',
    title: 'Paket Usaha Laundry Sambas & Pemangkat: Distributor Mesin Komersial',
    badge: 'Jangkauan Ekspedisi Pantura',
    lead: 'Paket usaha laundry kiloan siap buka untuk wilayah Sambas, Pemangkat, Tebas, Jawai, hingga Teluk Keramat. Instalasi jalur pipa air, gas dryer, dan kelistrikan aman.',
    deliveryEstimate: 'Pengiriman 4-6 jam armada ekspedisi aman terpal sampai depan ruko.',
    waterCharacteristics: 'Air tanah pesisir dengan kadar zat besi tertentu. Wajib menggunakan filter media mangan dan karbon aktif untuk menjaga pakaian putih tidak kuning.',
    marketPotential: 'Pusat perniagaan pesisir utara dengan aktivitas perdagangan dan sentra pertanian yang padat.',
    recommendedPackages: ['Paket Starting Laundry Kiloan', 'Paket Mesin Pengering Konversi Gas LPG', 'Paket Usaha Laundry Rumahan'],
    keyStrengths: [
      'Armada kirim langsung hingga ke pelosok kecamatan',
      'Teknisi ikut mengawal instalasi sampai mesin siap running',
      'Pendampingan SOP takaran deterjen ramah lingkungan',
    ],
    metaTitle: 'Paket Usaha Laundry Sambas & Pemangkat | Distributor Mesin Laundry',
    metaDescription: 'Penyedia paket usaha laundry di Kabupaten Sambas. Tanpa royalti, instalasi teknisi lengkap di Pemangkat, Tebas, dan Sambas kota.',
  },
  {
    slug: 'sintang',
    name: 'Sintang',
    districtType: 'Kabupaten',
    title: 'Paket Usaha Laundry Sintang: Pusat Mesin Cuci Kiloan & Koin',
    badge: 'Sentra Bisnis Timur Kalbar',
    lead: 'Melayani calon pengusaha laundry di Sintang, Sungai Tebelian, Sepauk, dan sekitarnya. Solusi tepat memulai bisnis laundry mandiri dengan mesin komersial tahan banting.',
    deliveryEstimate: 'Pengiriman 6-8 jam via rute Trans Kalimantan dengan proteksi packing kayu/pallet aman.',
    waterCharacteristics: 'Air permukaan sungai Kapuas/Melawi dan sumur bor. Direkomendasikan sistem tandon booster dan filter penjernih air silika.',
    marketPotential: 'Ibu kota perniagaan kawasan timur Kalbar, pusat universitas, kantor instansi pemerintah, dan kawasan perkebunan.',
    recommendedPackages: ['Paket Laundry Koin Self-Service (Stack Komersial)', 'Paket Running Kiloan Express', 'Dryer Heavy-Duty Speed Queen'],
    keyStrengths: [
      'Dukungan pengiriman teruji ke Sintang',
      'Panduan instalasi dan pelatihan teknisi on-site',
      'Konsultasi SOP jarak jauh dan ketersediaan sparepart',
    ],
    metaTitle: 'Paket Usaha Laundry Sintang | Paket Laundry Kiloan & Koin Kalbar',
    metaDescription: 'Jual paket usaha laundry di Sintang. Mesin komersial heavy-duty, instalasi lengkap oleh teknisi, 100% laba milik Anda tanpa franchise.',
  },
  {
    slug: 'ketapang',
    name: 'Ketapang',
    districtType: 'Kabupaten',
    title: 'Paket Usaha Laundry Ketapang: Mesin Cuci & Dryer Komersial',
    badge: 'Wilayah Selatan Kalbar',
    lead: 'Pusat penyedia paket usaha laundry di Kabupaten Ketapang dan sekitarnya. Pengiriman mesin laundry kiloan, koin, serta perlengkapan chemical dan setrika uap.',
    deliveryEstimate: 'Pengiriman via ekspedisi darat/laut terpercaya dengan pengemasan kayu aman.',
    waterCharacteristics: 'Sebagian besar air tanah gambut pesisir. Memerlukan penanganan filter multi-tahap (sedimen, silika, karbon) agar hasil cucian cerah.',
    marketPotential: 'Kawasan industri pertambangan, perkebunan kelapa sawit besar, perhotelan, dan kota perniagaan selatan Kalbar.',
    recommendedPackages: ['Paket Laundry Komersial Kapasitas Besar', 'Paket Usaha Starting Laundry Kiloan', 'Setrika Uap Boiler 25L'],
    keyStrengths: [
      'Spesifikasi mesin tahan kerja beban berat (heavy-duty)',
      'Dryer konversi gas hemat listrik untuk mengantisipasi daya terbatas',
      'Garansi mesin resmi dan pasokan suku cadang teratur',
    ],
    metaTitle: 'Paket Usaha Laundry Ketapang | Distributor Mesin Laundry Komersial',
    metaDescription: 'Paket usaha laundry kiloan & komersial di Ketapang. Mesin tahan kerja berat, efisiensi gas hemat listrik, garansi resmi My Equipment.',
  },
  {
    slug: 'sanggau',
    name: 'Sanggau',
    districtType: 'Kabupaten',
    title: 'Paket Usaha Laundry Sanggau: Mesin Laundry Siap Pakai Tanpa Franchise',
    badge: 'Jalur Trans Kalimantan',
    lead: 'Layanan paket usaha laundry kiloan untuk Sanggau Kapuas, Tayan Hilir, Parindu, hingga Entikong. Solusi lengkap mesin cuci front load, dryer gas, dan instalasi tuntas.',
    deliveryEstimate: 'Pengiriman 3-5 jam via jalur Trans Kalimantan langsung dari workshop.',
    waterCharacteristics: 'Air tanah berkarakteristik umum pedalaman. Memerlukan filter pasir silika dan karbon aktif standar.',
    marketPotential: 'Pusat lintasan perdagangan antar-kabupaten dan jalur perbatasan negara (PLBN Entikong) dengan potensi pasar jasa cuci harian yang stabil.',
    recommendedPackages: ['Paket Starting Laundry Kiloan', 'Paket Laundry Koin Stack', 'Setrika Uap Boiler 15L-25L'],
    keyStrengths: [
      'Akses jalan darat cepat dari kantor pusat Kubu Raya',
      'Teknisi siap datang untuk instalasi pipa, gas, dan kelistrikan',
      'Pelatihan operasional kasir dan manajemen anti-luntur',
    ],
    metaTitle: 'Paket Usaha Laundry Sanggau | Mesin Cuci & Dryer Komersial Siap Pakai',
    metaDescription: 'Paket usaha laundry di Kabupaten Sanggau. Tanpa royalti, pengiriman cepat Trans Kalimantan, instalasi teknisi lengkap sampai siap buka.',
  },
  {
    slug: 'mempawah',
    name: 'Mempawah',
    districtType: 'Kabupaten',
    title: 'Paket Usaha Laundry Mempawah: Mesin Cuci Front Load & Dryer Gas',
    badge: 'Jalur Pesisir Barat',
    lead: 'Paket usaha laundry siap buka untuk Mempawah, Sungai Pinyuh, Anjongan, hingga Segedong. Pengiriman cepat, instalasi pipa air, dan training SOP langsung di outlet mitra.',
    deliveryEstimate: 'Pengiriman kilat 1-2 jam dari workshop Kubu Raya/Pontianak.',
    waterCharacteristics: 'Air pesisir dan air sumur. Wajib filter sedimen dan karbon aktif untuk mencegah noda air pada pakaian.',
    marketPotential: 'Kawasan strategis dekat Pelabuhan Kijing dan sentra kuliner Pinyuh yang sedang tumbuh pesat.',
    recommendedPackages: ['Paket Starting Laundry Kiloan', 'Paket Small Starting Rumahan', 'Paket Mesin Pengering Konversi Gas'],
    keyStrengths: [
      'Waktu tempuh sangat dekat dengan kantor pusat',
      'Teknisi dapat segera meluncur untuk survei lokasi dan instalasi',
      'Jaminan pasokan chemical dan parfum laundry kualitas A',
    ],
    metaTitle: 'Paket Usaha Laundry Mempawah | Supplier Mesin Laundry Pontianak',
    metaDescription: 'Paket usaha laundry kiloan di Mempawah & Sungai Pinyuh. Pengiriman kilat 1 jam, mesin komersial hemat gas, 100% laba milik Anda.',
  },
];
