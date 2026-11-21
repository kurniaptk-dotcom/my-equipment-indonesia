# ARSITEKTUR SITUS & HIERARKI URL (SITE STRUCTURE)
## Domain: myequipmentindonesia.com
**Framework:** Next.js 15 App Router  
**Tipe Struktur:** Hybrid B2B Commercial Catalog & Multi-Location Regional Hub  
**Aturan Format:** Zero-Emoji, Diagram Hirarki, Standar Canonical.

---

## 1. POHON HIERARKI URL UTAMA (URL TREE)

```
https://www.myequipmentindonesia.com
│
├── / (Beranda: Otoritas Brand, Ringkasan Produk, Brand Trust Strip, Map, FAQ)
│
├── /paket-usaha (Katalog Paket Usaha Siap Buka: Mulai 16 Jt, 0% Royalti)
│   └── /paket-usaha/proposal (Dokumen Penawaran Resmi PDF Siap Cetak - 0% Bounce Rate)
│
├── /produk (Katalog Lengkap Mesin & Perlengkapan Laundry)
│   ├── /produk?kategori=dryer
│   ├── /produk?kategori=washer
│   ├── /produk?kategori=boiler
│   ├── /produk?kategori=suku-cadang
│   ├── /produk?kategori=chemical-laundry
│   ├── /produk?merk=speed-queen
│   ├── /produk?merk=maytag
│   ├── /produk?merk=lg
│   ├── /produk?merk=samsung
│   ├── /produk?merk=diamante
│   ├── /produk?merk=mr-spin
│   └── /produk/[slug] (Detail Produk: Schema Product + Offer + AggregateRating + FAQPage)
│       ├── /produk/mesin-cuci-lg-8-kg
│       ├── /produk/mesin-pengering-speedqueen
│       ├── /produk/mesin-pengering-maytag-mdg28
│       ├── /produk/mesin-pengering-diamante-ultra-clean
│       ├── /produk/setrika-uap-boiler-15-liter
│       └── ...
│
├── /layanan (Layanan Distribusi, Servis Panggilan, & Pelatihan)
│   ├── /konsultasi (Form & Kontak Diskusi Usaha Langsung)
│   ├── /estimasi-modal (Kalkulator Interaktif ROI, HPP, & Simulasi BEP)
│   ├── /promo (Program Penawaran Mesin & Paket Usaha)
│   └── /garansi-servis (Jaminan Resmi 1 Tahun Mesin & 3 Bulan Sparepart)
│
├── /wilayah/[kota] (34 Rute Landing Page Geografis se-Kalimantan)
│   │
│   ├── Kalimantan Barat (14 Kota/Kabupaten Basis Utama):
│   │   ├── /wilayah/pontianak
│   │   ├── /wilayah/kubu-raya
│   │   ├── /wilayah/singkawang
│   │   ├── /wilayah/sambas
│   │   ├── /wilayah/mempawah
│   │   ├── /wilayah/sintang
│   │   ├── /wilayah/ketapang
│   │   ├── /wilayah/sanggau
│   │   ├── /wilayah/sekadau
│   │   ├── /wilayah/landak (Alias: /wilayah/ngabang)
│   │   ├── /wilayah/melawi (Alias: /wilayah/nanga-pinoh)
│   │   ├── /wilayah/kayong-utara (Alias: /wilayah/sukadana)
│   │   ├── /wilayah/kapuas-hulu (Alias: /wilayah/putussibau)
│   │   └── /wilayah/bengkayang
│   │
│   ├── Kalimantan Timur & IKN (Pusat Pertumbuhan B2B):
│   │   ├── /wilayah/balikpapan (Alias: /wilayah/balik-papan)
│   │   ├── /wilayah/samarinda
│   │   └── /wilayah/ikn-nusantara (Alias: /wilayah/sepaku, /wilayah/penajam)
│   │
│   ├── Kalimantan Selatan (Pusat Perdagangan Regional):
│   │   ├── /wilayah/banjarmasin
│   │   └── /wilayah/banjarbaru
│   │
│   ├── Kalimantan Tengah (Perkebunan Sawit & Tambang):
│   │   ├── /wilayah/palangka-raya (Alias: /wilayah/palangkaraya)
│   │   ├── /wilayah/sampit
│   │   └── /wilayah/pangkalan-bun (Alias: /wilayah/pangkalanbun)
│   │
│   └── Kalimantan Utara (Kawasan Industri & Perbatasan):
│       ├── /wilayah/tarakan
│       └── /wilayah/tanjung-selor (Alias: /wilayah/tanjungselor, /wilayah/bulungan)
│
├── /artikel (Hub Konten Edukasi, Kegiatan, & Panduan Teknis)
│   ├── /artikel/komparasi-mesin-cuci-laundry-lg-vs-samsung-vs-maytag
│   ├── /artikel/perbandingan-dryer-laundry-speed-queen-vs-maytag-vs-diamante
│   ├── /artikel/rincian-modal-usaha-laundry-kiloan-pontianak-kalbar-2026
│   ├── /artikel/dryer-gas-vs-dryer-listrik-usaha-laundry-hemat-biaya-kalbar
│   ├── /artikel/solusi-filter-air-gambut-dan-sumur-bor-laundry-kiloan-kalbar
│   ├── /artikel/peluang-usaha-laundry-mess-sawit-dan-tambang-kalbar
│   ├── /artikel/distributor-mesin-laundry-balikpapan-samarinda-kaltim-kalsel
│   ├── /artikel/peluang-usaha-laundry-mess-pekerja-ikn-nusantara-kaltim
│   ├── /artikel/rekomendasi-supplier-dan-toko-mesin-laundry-banjarmasin-kalsel
│   ├── /artikel/rekomendasi-toko-dan-supplier-mesin-laundry-balikpapan-kaltim
│   ├── /artikel/peluang-usaha-laundry-kalteng-palangkaraya-sampit-pangkalanbun
│   └── /artikel/distributor-mesin-laundry-kaltara-tarakan-tanjungselor-nunukan
│
├── /inspirasi (Galeri Dokumentasi Proyek Outlet Mitra Asli)
├── /tentang-kami (Profil Perusahaan, Legalitas, Lokasi Showroom & Workshop)
├── /kontak (Alamat Fisik, Jam Buka, Peta Lokasi, WhatsApp)
├── /faq (Tanya Jawab Lengkap Usaha Laundry)
├── /sitemap.xml (Peta Situs Dinamis Prioritas Tinggi)
├── /robots.txt (Perayapan Dioptimalkan untuk Search Engines & AI Bots)
├── /llms.txt (Ringkasan Otoritas AI Grounding)
└── /llms-full.txt (Pengetahuan Lengkap Ground Truth se-Kalimantan untuk LLM)
```

---

## 2. PETA INTERNAL LINKING SILO (INTERNAL LINK SILO ARCHITECTURE)

```
        +-----------------------------------------------+
        |                 BERANDA (/)                   |
        +-----------------------------------------------+
           /                     |                     \
          /                      |                      \
+-------------------+  +-------------------+  +-------------------+
|  /paket-usaha     |  |  /produk          |  |  /wilayah/*       |
|  - Paket 16 Jt    |  |  - Washer         |  |  - 34 Kota/Kab    |
|  - Proposal PDF   |  |  - Dryer Gas 150W |  |  - Karakter Air   |
|  - Simulasi Modal |  |  - Boiler Gas     |  |  - Estimasi Kirim |
+-------------------+  +-------------------+  +-------------------+
           \                     |                     /
            \                    |                    /
             +---------------------------------------+
             |         /artikel/* (Edukasi)          |
             | - Komparasi Washer & Dryer            |
             | - Panduan Mess Sawit & IKN            |
             | - Solusi Air Gambut & HPP             |
             +---------------------------------------+
```

### Aturan Baku Internal Linking:
1. **Hubungan Dua Arah Halaman Kota & Artikel Wilayah:**
   Setiap halaman wilayah (misal: `/wilayah/balikpapan`) menautkan artikel pilar regional (`/artikel/distributor-mesin-laundry-balikpapan-samarinda-kaltim-kalsel`), dan artikel tersebut wajib menautkan kembali halaman wilayah terkait.
2. **Koneksi Produk ke Paket Usaha:**
   Setiap halaman detail mesin (`/produk/[slug]`) memiliki tautan penawaran paket usaha (`/paket-usaha`) dan tombol WhatsApp konsultasi dengan pesan otomatis terisi sesuai nama mesin.
3. **Penyaluran Otoritas Proposal:**
   Halaman `/paket-usaha/proposal` memiliki rasio pantulan 0%, sehingga di bagian atas dan bawahnya selalu disematkan tautan kembali ke `/paket-usaha` dan `/layanan/konsultasi`.
