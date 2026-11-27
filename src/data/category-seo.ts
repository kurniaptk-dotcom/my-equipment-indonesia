export type CategorySeoContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  buyingTips: string[];
  faqs: { q: string; a: string }[];
  relatedArticles: { slug: string; title: string }[];
};

export const CATEGORY_SEO_MAP: Record<string, CategorySeoContent> = {
  'mesin-laundry': {
    slug: 'mesin-laundry',
    metaTitle: 'Jual Mesin Cuci & Dryer Konversi Gas Laundry | My Equipment',
    metaDescription:
      'Distributor resmi mesin cuci front load commercial & dryer konversi gas 150W di Pontianak & Kalimantan. Speed Queen, Maytag, LG, Diamante ready stock bergaransi.',
    eyebrow: 'Distributor Resmi Mesin Laundry Kalimantan',
    h1: 'Mesin Cuci Commercial & Dryer Konversi Gas Laundry',
    intro:
      'Temukan unit mesin cuci front loading heavy duty, mesin pengering (dryer) konversi gas LPG hemat listrik 150W, dan mesin stack/koin dari merk terpercaya seperti Speed Queen, Maytag, LG Commercial, dan Diamante. Seluruh unit bergaransi resmi dengan dukungan teknisi lokal di Pontianak, Singkawang, dan pengiriman peti kayu ke seluruh Kalimantan.',
    buyingTips: [
      'Pilih dryer konversi gas LPG (150–250 Watt) agar aman pada listrik ruko standar PLN 1.300 VA dan memangkas biaya pengeringan hingga Rp 500–800 per siklus.',
      'Sesuaikan kapasitas tabung washer dengan target omset harian: 8–10,5 kg untuk laundry kiloan pemula, atau 15–20 kg (stack/komersial) untuk laundromat koin dan bedcover.',
      'Pastikan distributor menyediakan gudang sparepart ready stock (vanbelt, selenoid, thermostat, pemantik) agar operasional outlet tidak pernah terhenti.',
    ],
    faqs: [
      {
        q: 'Apakah dryer konversi gas aman untuk ruko dengan listrik 1.300 VA?',
        a: 'Sangat aman. Dryer konversi gas LPG hanya membutuhkan daya listrik 150 hingga 250 Watt untuk memutar drum dan blower karena sumber panas berasal dari gas LPG, bukan elemen pemanas listrik 2.200 Watt.',
      },
      {
        q: 'Merk mesin laundry apa saja yang ready stock di My Equipment Indonesia?',
        a: 'Kami menyediakan unit dan suku cadang resmi untuk Speed Queen, Maytag, LG Commercial, Samsung, Electrolux, Diamante, dan Mr Spin, siap kirim ke seluruh Kalimantan Barat, Kaltim, Kalsel, Kalteng, dan Kaltara.',
      },
      {
        q: 'Apakah pembelian mesin satuan sudah termasuk panduan instalasi?',
        a: 'Ya. Untuk area Pontianak, Kubu Raya, Singkawang, dan Kalbar tersedia layanan instalasi teknisi langsung, sedangkan untuk luar provinsi dilengkapi panduan SOP plumbing, manifold gas SNI, dan video call teknisi senior.',
      },
    ],
    relatedArticles: [
      {
        slug: 'perbandingan-mesin-laundry-speed-queen-vs-maytag-kalimantan',
        title: 'Perbandingan Speed Queen vs Maytag untuk Laundry Koin & Komersial di Kalimantan',
      },
      {
        slug: 'dryer-gas-vs-dryer-listrik-usaha-laundry-hemat-biaya-kalbar',
        title: 'Dryer Gas 150W vs Dryer Listrik 2.200W: Perbandingan Biaya Operasional per Kg',
      },
    ],
  },
  'peralatan-pendukung': {
    slug: 'peralatan-pendukung',
    metaTitle: 'Harga Setrika Uap Boiler Gas 15L & 25L Terdekat | My Equipment',
    metaDescription:
      'Jual setrika uap boiler gas 15 liter, 25 liter, meja vakum, dan kepala setrika uap di Pontianak & Kalimantan. Tanpa listrik PLN, anti-gosong, bergaransi resmi.',
    eyebrow: 'Pusat Setrika Uap Boiler Gas & Meja Vakum',
    h1: 'Setrika Uap Boiler Gas & Peralatan Pendukung Laundry',
    intro:
      'Tingkatkan kecepatan finishing outlet hingga 3 kali lipat dengan setrika uap boiler berbahan bakar gas LPG (0 Watt listrik). Cocok untuk semua jenis kain, sablon, hingga jas tanpa risiko gosong atau mengkilap. Tersedia kapasitas 10L, 15L, 25L, hingga 35L lengkap dengan kepala setrika geser/pencet dan meja setrika vakum.',
    buyingTips: [
      'Kapasitas boiler 15 liter ideal untuk outlet baru dengan 1–2 kepala setrika dan volume 40–70 kg/hari.',
      'Kapasitas boiler 25 liter direkomendasikan untuk outlet ramai (80–150 kg/hari) agar tidak perlu sering mengisi ulang air di jam sibuk.',
      'Gunakan meja setrika dengan busa tahan panas dan selang uap berlapis kawat baja agar uap tidak mengembun pada pakaian.',
    ],
    faqs: [
      {
        q: 'Berapa kapasitas setrika uap boiler yang cocok untuk pemula?',
        a: 'Untuk usaha laundry pemula atau skala ruko 1–2 set mesin, setrika uap boiler 15 liter (1 atau 2 kepala setrika) adalah pilihan paling efisien dari sisi harga beli, waktu pemanasan, dan konsumsi gas.',
      },
      {
        q: 'Apakah setrika uap boiler membutuhkan listrik PLN?',
        a: 'Tidak sama sekali (0 Watt). Boiler memanaskan air menggunakan kompor gas LPG, sehingga menghemat tagihan listrik bulanan secara drastis dibandingkan setrika listrik 350–450 Watt per unit.',
      },
      {
        q: 'Apakah tersedia layanan servis dan suku cadang boiler di Pontianak?',
        a: 'Ya, My Equipment menyediakan sparepart lengkap seperti kran senkyo, safety valve, kaca duga, selang uap, hingga kepala setrika beserta layanan servis teknisi lokal.',
      },
    ],
    relatedArticles: [
      {
        slug: 'harga-setrika-uap-boiler-15-liter-vs-25-liter-vs-setrika-listrik-laundry',
        title: 'Harga & Perbandingan Setrika Uap Boiler 15L vs 25L vs Setrika Listrik',
      },
      {
        slug: 'rincian-modal-usaha-laundry-kiloan-pontianak-kalbar-2026',
        title: 'Rincian Modal Usaha Laundry Kiloan Pontianak & Kalbar 2026',
      },
    ],
  },
  'perlengkapan-laundry': {
    slug: 'perlengkapan-laundry',
    metaTitle: 'Toko Perlengkapan Laundry Terdekat & Lengkap | My Equipment',
    metaDescription:
      'Jual perlengkapan operasional usaha laundry lengkap di Pontianak & Kalbar: keranjang, timbangan digital, tag gun, plastik packing, hanger, & media promosi.',
    eyebrow: 'Kebutuhan Operasional Outlet Harian',
    h1: 'Perlengkapan Operasional & Media Promosi Laundry',
    intro:
      'Lengkapi alur kerja outlet laundry Anda agar rapi, higienis, dan bebas tertukar. Tersedia timbangan digital akurat, keranjang pakaian sortir, tag gun & tag pin anti-luntur, plastik packing berbagai ukuran, hanger komersial, hingga media promosi outlet.',
    buyingTips: [
      'Gunakan sistem penandaan pakaian dengan tag gun dan kain penanda tahan cuci agar risiko pakaian pelanggan tertukar mendekati nol.',
      'Sediakan minimal 6–10 keranjang sortir berlabel (masuk, cuci, kering, setrika, siap ambil) untuk memperlancar alur kerja karyawan.',
      'Pilih timbangan digital dengan layar ganda (menghadap kasir dan pelanggan) guna membangun transparansi sejak transaksi pertama.',
    ],
    faqs: [
      {
        q: 'Apakah perlengkapan operasional bisa dibeli satuan maupun paket starter kit?',
        a: 'Bisa. Seluruh perlengkapan seperti timbangan, keranjang, tag pin, dan plastik packing dapat dibeli satuan di showroom Pontianak maupun langsung masuk dalam paket usaha siap buka.',
      },
      {
        q: 'Apakah bisa dikirim ke kabupaten di luar Pontianak?',
        a: 'Ya, pengiriman perlengkapan operasional melayani seluruh 14 kabupaten/kota di Kalimantan Barat serta rute kargo ke Kaltim, Kalsel, Kalteng, dan Kaltara.',
      },
    ],
    relatedArticles: [
      {
        slug: 'studi-kasus-outlet-sukses-mitra-laundry-kalbar',
        title: 'Studi Kasus Outlet Sukses Mitra Laundry di Kalimantan Barat',
      },
    ],
  },
  'chemical-laundry': {
    slug: 'chemical-laundry',
    metaTitle: 'Supplier Deterjen, Parfum & Chemical Laundry | My Equipment',
    metaDescription:
      'Pusat jual deterjen cair low-foam, parfum laundry grade premium, softener, dan anti-noda khusus mesin front load di Pontianak & Kalimantan.',
    eyebrow: 'Chemical Grade Komersial & HPP Hemat',
    h1: 'Deterjen Low-Foam, Parfum & Chemical Laundry',
    intro:
      'Jaga kualitas hasil cucian wangi tahan lama sekaligus melindungi komponen mesin cuci front loading dengan chemical khusus laundry komersial. Formulasi rendah busa (low-foam), ramah serat kain, dengan HPP chemical yang terukur efisien di kisaran Rp 500–600 per kilogram cucian.',
    buyingTips: [
      'Wajib gunakan deterjen cair low-foam (rendah busa) pada mesin cuci front load agar tidak merusak modul elektronik dan bearing drum.',
      'Simpan stok anti-noda spesifik (noda darah, tinta, karat air gambut, dan kerah baju) untuk meningkatkan kepuasan pelanggan premium.',
      'Gunakan botol takar standar (gelas ukur ml) di setiap mesin agar pemakaian chemical konsisten dan tidak boros.',
    ],
    faqs: [
      {
        q: 'Mengapa mesin cuci front load tidak boleh memakai deterjen bubuk rumah tangga?',
        a: 'Deterjen bubuk biasa menghasilkan busa berlebih dan residu kerak yang dapat menyumbat saluran pembuangan, merusak seal pintu, dan memperpendek usia bearing mesin cuci front loading.',
      },
      {
        q: 'Berapa estimasi biaya chemical laundry per kg cucian?',
        a: 'Dengan dosis terukur sesuai SOP My Equipment, total biaya deterjen cair, softener, dan parfum laundry berada di kisaran Rp 500 hingga Rp 650 per kg cucian.',
      },
    ],
    relatedArticles: [
      {
        slug: 'resep-dosis-chemical-laundry-kiloan-dan-cara-hilangkan-noda-membandel',
        title: 'Resep Dosis Chemical Laundry Kiloan & Cara Hilangkan Noda Membandel',
      },
      {
        slug: 'solusi-filter-air-gambut-dan-sumur-bor-laundry-kiloan-kalbar',
        title: 'Solusi Filter Air Gambut & Sumur Bor untuk Laundry Kiloan di Kalimantan',
      },
    ],
  },
  cleaning: {
    slug: 'cleaning',
    metaTitle: 'Peralatan Cuci Karpet & Cleaning Komersial | My Equipment',
    metaDescription:
      'Jual mesin polisher cuci karpet, vacuum cleaner wet & dry, dan perlengkapan cleaning komersial untuk usaha cuci karpet masjid, kantor, dan sofa di Kalimantan.',
    eyebrow: 'Ekspansi Layanan Cuci Karpet & Sofa',
    h1: 'Peralatan Cleaning & Mesin Cuci Karpet Komersial',
    intro:
      'Perluas sumber pendapatan outlet laundry Anda dengan layanan cuci karpet masjid, karpet rumah, sofa, dan springbed ber-margin tinggi. Tersedia peralatan cleaning komersial tangguh yang siap dipakai untuk kerja harian.',
    buyingTips: [
      'Tambahkan layanan cuci karpet dan sofa untuk mendongkrak margin keuntungan di luar laundry kiloan harian.',
      'Gunakan vacuum cleaner wet & dry berdaya hisap kuat agar waktu pengeringan karpet jauh lebih singkat dan bebas bau apek.',
    ],
    faqs: [
      {
        q: 'Apakah usaha cuci karpet bisa digabungkan dengan outlet laundry kiloan?',
        a: 'Sangat bisa. Banyak mitra laundry memanfaatkan pelanggan kiloan eksisting untuk menawarkan jasa cuci karpet dan sofa dengan nilai transaksi per order yang jauh lebih besar.',
      },
    ],
    relatedArticles: [
      {
        slug: 'peluang-usaha-cuci-karpet-masjid-kantor-pontianak-kalbar',
        title: 'Peluang Usaha Cuci Karpet Masjid & Kantor di Pontianak Kalbar',
      },
    ],
  },
  aksesori: {
    slug: 'aksesori',
    metaTitle: 'Aksesori & Kelengkapan Outlet Laundry | My Equipment',
    metaDescription:
      'Jual berbagai aksesori pendukung mesin dan outlet usaha laundry di Pontianak & Kalbar. Siap kirim ke seluruh Kalimantan dengan harga distributor.',
    eyebrow: 'Kelengkapan Pendukung Outlet',
    h1: 'Aksesori Usaha & Instalasi Laundry',
    intro:
      'Lengkapi detail operasional dan keamanan instalasi outlet laundry Anda dengan aksesori standar komersial mulai dari selang, konektor, perlengkapan rak, hingga alat bantu kerja harian.',
    buyingTips: [
      'Gunakan selang dan regulator gas berstandar SNI pada setiap jalur dryer konversi gas dan boiler uap demi keselamatan kerja.',
      'Pastikan jalur pembuangan uap (ducting) dryer mengarah ke luar ruangan agar suhu ruangan kerja tetap sejuk dan bebas lembap.',
    ],
    faqs: [
      {
        q: 'Apakah aksesori instalasi sudah termasuk jika membeli paket usaha?',
        a: 'Ya, paket usaha siap buka My Equipment sudah mencakup kelengkapan instalasi dasar beserta pengerjaan oleh tim teknisi.',
      },
    ],
    relatedArticles: [
      {
        slug: 'panduan-memilih-paket-laundry-modal-15-juta-25-juta-50-juta',
        title: 'Panduan Memilih Paket Laundry Modal 15 Juta, 25 Juta, hingga 50 Juta',
      },
    ],
  },
  'suku-cadang': {
    slug: 'suku-cadang',
    metaTitle: 'Jual Sparepart Mesin Laundry & Dryer Gas | My Equipment',
    metaDescription:
      'Pusat suku cadang mesin cuci & dryer gas terlengkap di Pontianak Kalbar: vanbelt, jarum pemantik, selenoid gas, kran boiler, thermostat, & bearing ready stock.',
    eyebrow: 'Gudang Sparepart Ready Stock Kalimantan',
    h1: 'Suku Cadang (Sparepart) Mesin Laundry & Boiler',
    intro:
      'Hindari kerugian akibat mesin berhenti beroperasi berhari-hari menunggu kiriman suku cadang dari luar pulau. My Equipment Indonesia menyimpan stok lokal sparepart penting untuk dryer konversi gas, mesin cuci front load, dan boiler setrika uap langsung di Pontianak.',
    buyingTips: [
      'Simpan cadangan suku cadang fast-moving di outlet Anda seperti vanbelt dryer, jarum pemantik, dan seal karet kran boiler agar tidak mengganggu operasional saat jam ramai.',
      'Kirimkan foto komponen lama beserta merk dan tipe mesin Anda via WhatsApp agar tim teknisi kami memastikan kecocokan ukuran sparepart sebelum dikirim.',
    ],
    faqs: [
      {
        q: 'Suku cadang apa yang paling sering dibutuhkan pada dryer konversi gas?',
        a: 'Komponen fast-moving utama meliputi vanbelt drum, jarum pemantik api, modul pemantik/igniter, selenoid valve gas, thermostat pengatur suhu, dan bearing/idler pulley.',
      },
      {
        q: 'Apakah melayani pengiriman sparepart ke luar kota seperti Singkawang, Ketapang, atau Balikpapan?',
        a: 'Ya, suku cadang ringan dapat dikirim cepat menggunakan ekspedisi reguler atau travel/kargo harian ke seluruh Kalimantan.',
      },
    ],
    relatedArticles: [
      {
        slug: 'penyebab-dryer-gas-tidak-mau-panas-dan-solusi-pemantik-laundry',
        title: 'Penyebab Dryer Gas Tidak Mau Panas & Solusi Pemantik Laundry',
      },
    ],
  },
};
