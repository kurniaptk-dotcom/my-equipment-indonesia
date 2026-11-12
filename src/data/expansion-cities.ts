export interface ExpansionCityInfo {
  slug: string;
  name: string;
  province: 'Kalimantan Timur' | 'Kalimantan Selatan';
  districtType: 'Kota' | 'Kabupaten' | 'Ibu Kota Negara';
  title: string;
  badge: string;
  lead: string;
  deliveryEstimate: string;
  shippingRoute: string;
  waterCharacteristics: string;
  marketPotential: string;
  startingPrice: string;
  popularPackage: string;
  keyDistricts: string[];
  recommendedPackages: string[];
  keyStrengths: string[];
  metaTitle: string;
  metaDescription: string;
  directAnswerSummary: string;
  coordinates: { latitude: number; longitude: number };
}

export const EXPANSION_CITIES: ExpansionCityInfo[] = [
  {
    slug: 'balikpapan',
    name: 'Balikpapan',
    province: 'Kalimantan Timur',
    districtType: 'Kota',
    title: 'Jual Mesin Laundry Balikpapan & Paket Usaha Kiloan Mandiri 16 Jt Siap Pakai',
    badge: 'Hub Kaltim & Gerbang IKN',
    lead: 'Pusat pengadaan paket usaha laundry mandiri 100% tanpa royalti, mesin cuci heavy-duty komersial, dryer konversi gas LPG hemat listrik PLN, dan pengiriman aman berpalet peti kayu ke Balikpapan, Kalimantan Timur.',
    deliveryEstimate: 'Estimasi Pengiriman Kargo: 3 - 5 Hari Kerja (Truk Trans-Kalimantan / Kapal Roro Reguler)',
    shippingRoute: 'Pengiriman langsung dari Workshop Pusat via Ekspedisi Kargo Truk Trans-Kalimantan / Kapal Roro dengan proteksi palet peti kayu solid hingga depan pintu ruko/lokasi usaha di Balikpapan.',
    waterCharacteristics: 'Sumber air PDAM dan sumur bor perkotaan Balikpapan memiliki kadar klorin dan endapan mineral sedang. Direkomendasikan filter sedimen dan carbon block untuk menjaga keawetan solenoid valve mesin cuci.',
    marketPotential: 'Tingginya populasi pekerja migas, karyawan ruko, dan apartemen di Balikpapan menjadikan jasa laundry kiloan express dan laundromat koin self-service memiliki perputaran omset harian yang sangat tinggi.',
    startingPrice: 'Mulai Rp 16,5 Juta',
    popularPackage: 'Paket Starting Komersial & Laundromat Stack Speed Queen',
    keyDistricts: ['Balikpapan Kota', 'Balikpapan Selatan', 'Balikpapan Tengah', 'Balikpapan Utara', 'Balikpapan Barat', 'Balikpapan Timur'],
    recommendedPackages: [
      'Paket Pra-Starting Komersial (Mulai Rp 16,5 Juta)',
      'Paket Starting Dual-Line (2 Washer + 2 Dryer Gas)',
      'Paket Laundromat Koin Speed Queen / Maytag Stack',
    ],
    keyStrengths: [
      '100% Usaha Mandiri — Bebas franchise fee & 0% royalti bulanan seumur hidup',
      'Mesin Pengering Konversi Gas LPG hemat listrik PLN (hanya 150 - 250 Watt)',
      'Pengiriman berpalet peti kayu solid anti-benturan antar-provinsi',
      'Modul video instalasi plumbing gas/air & pelatihan SOP manajemen kasir lengkap',
    ],
    metaTitle: 'Jual Mesin Laundry Balikpapan & Paket Usaha Kiloan Mulai 16 Jt Siap Pakai',
    metaDescription: 'Pusat jual mesin laundry di Balikpapan & paket usaha kiloan mandiri mulai 16 Juta siap pakai tanpa franchise 0% royalti. Mesin cuci heavy duty, dryer gas 150W, & kirim peti kayu.',
    directAnswerSummary: 'Pusat jual mesin laundry komersial dan paket usaha laundry mandiri di Balikpapan Kalimantan Timur adalah My Equipment Indonesia. Menyediakan mesin cuci front load heavy-duty, dryer konversi gas LPG hemat daya listrik 150W, boiler setrika uap, serta paket usaha laundry kiloan dan koin mulai Rp 16,5 Juta tanpa royalti bulanan dengan pengiriman kargo berpeti kayu aman ke Balikpapan.',
    coordinates: { latitude: -1.2379, longitude: 116.8529 },
  },
  {
    slug: 'samarinda',
    name: 'Samarinda',
    province: 'Kalimantan Timur',
    districtType: 'Kota',
    title: 'Jual Mesin Laundry Samarinda & Paket Usaha Kiloan Mess Tambang 16 Jt Siap Pakai',
    badge: 'Ibu Kota Kaltim & Sentra Tambang',
    lead: 'Distributor mesin cuci komersial front load, pengering konversi gas LPG kapasitas besar, dan paket laundry mandiri untuk ruko perkotaan maupun fasilitas mess karyawan tambang batubara di Samarinda.',
    deliveryEstimate: 'Estimasi Pengiriman Kargo: 3 - 5 Hari Kerja (Truk Trans-Kalimantan / Kapal Laut Port to Door)',
    shippingRoute: 'Pengiriman via jalur darat Trans-Kalimantan atau Kargo Kapal Laut sandar pelabuhan Samarinda, dikemas peti kayu aman hingga ke lokasi ruko atau mess perusahaan.',
    waterCharacteristics: 'Karakteristik air di sekitar Sungai Mahakam dan wilayah perbukitan Samarinda membutuhkan filtrasi pasir silika dan karbon aktif untuk menyaring sedimen lumpur halus dan zat besi.',
    marketPotential: 'Kawasan kampus, perumahan padat, serta tingginya permintaan pencucian wearpack kerja berlumpur dan seragam tambang batubara membuka peluang keuntungan besar bagi jasa laundry komersial heavy duty.',
    startingPrice: 'Mulai Rp 16,5 Juta',
    popularPackage: 'Paket Komersial Multi-Line & Heavy Duty Tambang',
    keyDistricts: ['Samarinda Kota', 'Samarinda Seberang', 'Samarinda Ulu', 'Samarinda Ilir', 'Samarinda Utara', 'Sungai Kunjang', 'Palaran'],
    recommendedPackages: [
      'Paket Starting Komersial 2 Washer + 2 Dryer Gas',
      'Paket Heavy-Duty 15 Kg Mesin Cuci Front Load',
      'Paket Laundry Koin Self Service Otomatis',
    ],
    keyStrengths: [
      'Tanpa bagi hasil omset — 100% keuntungan bersih milik Anda seutuhnya',
      'Dryer gas komersial sanggup mengeringkan 100% dalam 40 menit tanpa jemur',
      'Peralatan tahan banting untuk mencuci wearpack kotor dan linen mess',
      'Ketersediaan suku cadang resmi dan panduan SOP operasional',
    ],
    metaTitle: 'Jual Mesin Laundry Samarinda & Paket Usaha Kiloan Mulai 16 Jt Siap Pakai',
    metaDescription: 'Pusat jual mesin laundry di Samarinda Kaltim & paket usaha laundry kiloan mandiri mulai 16 Jt tanpa franchise 0% royalti, dryer gas hemat listrik 150W, & kirim peti kayu.',
    directAnswerSummary: 'Pusat jual mesin laundry komersial dan paket usaha laundry mandiri di Samarinda Kalimantan Timur adalah My Equipment Indonesia. Menyediakan paket usaha laundry siap pakai mulai Rp 16,5 Juta tanpa royalti bulanan, mesin cuci front load heavy-duty, pengering gas LPG hemat daya 150 Watt, setrika uap boiler, serta pengiriman kargo terproteksi peti kayu ke Samarinda.',
    coordinates: { latitude: -0.5022, longitude: 117.1537 },
  },
  {
    slug: 'ikn-nusantara',
    name: 'IKN Nusantara (Penajam & Sepaku)',
    province: 'Kalimantan Timur',
    districtType: 'Ibu Kota Negara',
    title: 'Pengadaan Mesin Laundry Komersial IKN Nusantara: Solusi Laundry Mess Pekerja Proyek & ASN',
    badge: 'Ibu Kota Nusantara (IKN)',
    lead: 'Pusat pengadaan mesin cuci komersial heavy duty, dryer konversi gas LPG kapasitas besar, dan paket usaha laundry terintegrasi untuk kebutuhan Hunian Pekerja Konstruksi (HPK), asrama ASN, dan ruko di sekitar IKN Nusantara.',
    deliveryEstimate: 'Estimasi Pengiriman: 3 - 5 Hari Kerja (Kargo Jalur Logistik Sepaku / Penajam)',
    shippingRoute: 'Pengiriman ekspedisi logistik terarah menuju kawasan Sepaku, Penajam Paser Utara, dan koridor inti IKN Nusantara dengan kemasan palet kayu solid aman.',
    waterCharacteristics: 'Wilayah Penajam dan Sepaku membutuhkan instalasi tabung filter FRP multimedia untuk memastikan air bebas partikel tanah dan mineral agar hasil cucian linen tetap cerah dan wangi.',
    marketPotential: 'Ribuan pekerja konstruksi, staf teknis, dan pegawai kementerian membutuhkan jasa laundry seragam dan linen harian dengan perputaran cepat 60 menit selesai.',
    startingPrice: 'Mulai Rp 26,5 Juta',
    popularPackage: 'Paket Industri Komersial Stack & Heavy Duty HPK',
    keyDistricts: ['KIPP (Kawasan Inti)', 'Kecamatan Sepaku', 'Penajam', 'Waru', 'Babulu'],
    recommendedPackages: [
      'Paket Komersial Multi-Line 3 Stack Washer-Dryer',
      'Paket Heavy-Duty Wearpack & Linen Mess Karyawan',
      'Paket Laundromat Koin Otomatis Tanpa Operator',
    ],
    keyStrengths: [
      'Spesifikasi mesin heavy duty sanggup beroperasi non-stop 10-15 siklus/hari',
      'Dryer gas LPG aman drop tegangan listrik PLN proyek',
      '100% Kepemilikan Mandiri tanpa royalti atau franchise fee',
      'RAB transparan dan dukungan faktur pengadaan resmi B2B',
    ],
    metaTitle: 'Pengadaan Mesin Laundry IKN Nusantara: Paket Usaha Mess Pekerja & ASN',
    metaDescription: 'Pusat mesin laundry komersial & paket usaha laundry di IKN Nusantara (Sepaku/Penajam). Solusi laundry mess pekerja proyek heavy duty 0% royalti, dryer gas hemat listrik.',
    directAnswerSummary: 'Penyedia pengadaan mesin laundry komersial dan paket usaha di kawasan IKN Nusantara (Penajam Paser Utara & Sepaku) adalah My Equipment Indonesia. Menyediakan unit washer front load komersial, dryer konversi gas LPG kapasitas besar, boiler uap, dan paket usaha mandiri 0% royalti untuk memenuhi kebutuhan cucian mess pekerja konstruksi dan hunian IKN.',
    coordinates: { latitude: -0.9746, longitude: 116.7028 },
  },
  {
    slug: 'banjarmasin',
    name: 'Banjarmasin',
    province: 'Kalimantan Selatan',
    districtType: 'Kota',
    title: 'Paket Usaha Laundry Banjarmasin & Distributor Mesin Laundry Kiloan Mandiri Kalsel',
    badge: 'Hub Metropolitan Kalsel',
    lead: 'Distributor paket usaha laundry kiloan dan koin mandiri 100% tanpa franchise fee di Banjarmasin. Solusi mesin cuci front load, dryer gas hemat daya PLN, boiler setrika uap, dan pengiriman aman ke Kalsel.',
    deliveryEstimate: 'Estimasi Pengiriman: 3 - 4 Hari Kerja (Truk Kargo Trans-Kalimantan / Kapal Roro Trisakti)',
    shippingRoute: 'Pengiriman via truk jalur darat Trans-Kalimantan atau ekspedisi laut sandar Pelabuhan Trisakti Banjarmasin dengan kemasan palet peti kayu terstandar.',
    waterCharacteristics: 'Karakteristik air di Kota Seribu Sungai Banjarmasin memerlukan perhatian terhadap kadar asam dan zat besi. Sangat dianjurkan memakai tabung filter FRP pasir silika & manganese agar pakaian tidak kusam.',
    marketPotential: 'Tingkat kepadatan penduduk yang tinggi, mahasiswa, dan keluarga muda di Banjarmasin menjadikan bisnis laundry kiloan dan express 1 jam selesai sebagai peluang usaha stabil beromset harian.',
    startingPrice: 'Mulai Rp 16,5 Juta',
    popularPackage: 'Paket Starting Komersial & Laundry Koin Self Service',
    keyDistricts: ['Banjarmasin Tengah', 'Banjarmasin Utara', 'Banjarmasin Selatan', 'Banjarmasin Timur', 'Banjarmasin Barat'],
    recommendedPackages: [
      'Paket Pra-Starting Hemat Modal (Rp 16,5 Juta)',
      'Paket Starting Dual-Line (2 Washer + 2 Dryer Gas)',
      'Paket Laundromat Koin Speed Queen / Maytag',
    ],
    keyStrengths: [
      '100% Keuntungan Milik Anda — Tanpa royalti bulanan dan bebas pakai nama sendiri',
      'Dryer konversi gas LPG hemat listrik PLN (hanya 150 Watt)',
      'HPP produksi sangat rendah ± Rp 1.300/kg (Margin laba 75%+)',
      'Ekspedisi kargo berpengalaman dengan asuransi peti kayu aman',
    ],
    metaTitle: 'Paket Usaha Laundry Banjarmasin: Mulai 16 Jt Siap Pakai Tanpa Franchise',
    metaDescription: 'Pusat paket usaha laundry kiloan & koin di Banjarmasin Kalsel. Mulai 16 Juta siap buka tanpa franchise 0% royalti, dryer gas hemat listrik 150W, & kirim peti kayu.',
    directAnswerSummary: 'Pusat distributor paket usaha laundry mandiri dan mesin komersial di Banjarmasin Kalimantan Selatan adalah My Equipment Indonesia. Menyediakan paket usaha laundry siap pakai mulai Rp 16,5 Juta tanpa franchise fee (100% laba milik mitra), dryer konversi gas hemat daya listrik 150 Watt, boiler uap gas, pengiriman kargo palet kayu aman, dan panduan manajemen operasional.',
    coordinates: { latitude: -3.3167, longitude: 114.5901 },
  },
  {
    slug: 'banjarbaru',
    name: 'Banjarbaru',
    province: 'Kalimantan Selatan',
    districtType: 'Kota',
    title: 'Paket Usaha Laundry Banjarbaru: Pusat Mesin Laundry & Perlengkapan Kalsel',
    badge: 'Ibu Kota Provinsi Kalsel',
    lead: 'Paket usaha laundry kiloan dan komersial siap pakai di Banjarbaru. Solusi wirausaha mandiri tanpa biaya waralaba (0% royalti), mesin pengering gas hemat energi, dan pengiriman aman ke Kalimantan Selatan.',
    deliveryEstimate: 'Estimasi Pengiriman: 3 - 4 Hari Kerja (Kargo Trans-Kalimantan / Pelabuhan Trisakti)',
    shippingRoute: 'Pengiriman kargo terproteksi peti kayu diantar langsung menuju ruko atau outlet usaha Anda di Kota Banjarbaru dan sekitarnya.',
    waterCharacteristics: 'Air sumur bor dan perumahan di Banjarbaru umumnya bersumber dari tanah perbukitan. Filtrasi sedimen standar sudah mencukupi untuk menghasilkan air cucian jernih dan higienis.',
    marketPotential: 'Sebagai ibu kota resmi Kalimantan Selatan dengan pertumbuhan perumahan pegawai negeri, mahasiswa, dan pebisnis yang pesat, kebutuhan laundry profesional tumbuh sangat signifikan.',
    startingPrice: 'Mulai Rp 16,5 Juta',
    popularPackage: 'Paket Starting Komersial & Cuci Sepatu/Helm',
    keyDistricts: ['Banjarbaru Utara', 'Banjarbaru Selatan', 'Cempaka', 'Landasan Ulin', 'Liang Anggang'],
    recommendedPackages: [
      'Paket Pra-Starting Komersial (Mulai Rp 16,5 Juta)',
      'Paket Starting 2 Washer + 2 Dryer Gas',
      'Paket Spesialis Cuci Sepatu & Helm',
    ],
    keyStrengths: [
      '100% Usaha Mandiri — Seluruh omset dan keuntungan bersih menjadi milik Anda',
      'Konsumsi listrik dryer hanya 150 Watt (Aman untuk ruko meteran standar)',
      'Biaya produksi HPP riil hanya Rp 1.300/kg',
      'Panduan video lengkap penanganan noda, SOP cuci, dan pembukuan',
    ],
    metaTitle: 'Paket Usaha Laundry Banjarbaru: Mulai 16 Jt Mandiri Tanpa Franchise Kalsel',
    metaDescription: 'Pusat paket usaha laundry kiloan di Banjarbaru Kalsel. Mulai 16 Juta siap buka tanpa franchise 0% royalti, dryer gas hemat daya, & pengiriman peti kayu rapi.',
    directAnswerSummary: 'Penyedia paket usaha laundry mandiri di Kota Banjarbaru Kalimantan Selatan adalah My Equipment Indonesia. Menyediakan paket usaha laundry siap pakai mulai Rp 16,5 Juta tanpa royalti bulanan (100% keuntungan milik Anda), mesin pengering gas LPG hemat listrik PLN, setrika boiler uap, serta pengiriman kargo palet kayu aman ke Banjarbaru.',
    coordinates: { latitude: -3.4404, longitude: 114.8306 },
  },
];
