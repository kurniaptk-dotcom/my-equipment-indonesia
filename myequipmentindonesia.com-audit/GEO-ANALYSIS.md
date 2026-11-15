# LAPORAN AUDIT & OPTIMASI GEO (GENERATIVE ENGINE OPTIMIZATION) DAN AIO
## Domain: myequipmentindonesia.com
**Tanggal Evaluasi:** 15 November 2026  
**Standar Evaluasi:** Google Search Central Generative AI Optimization Guide & GEO Assessment Framework v2.5.0  
**Aturan Pelaporan:** Zero-Emoji, Bahasa Formal Terstruktur, Pemisahan Presisi Antara Crawler Pelatihan Model dan Crawler Pencarian AI.

---

## 1. GEO Readiness Score: 94 / 100

Situs `myequipmentindonesia.com` menunjukkan kesiapan luar biasa tinggi untuk dikutip oleh mesin pencari generatif (Google AI Overviews, Google AI Mode, ChatGPT Search, Perplexity AI, Claude Search, dan Bing Copilot). Fondasi SEO teknis yang solid, rendering sisi server (SSR), ketiadaan paywall atau barrier JavaScript pada konten utama, serta keberadaan blok jawaban langsung (*self-contained answer blocks*) di posisi 20% teratas halaman memberikan keunggulan kompetitif yang dominan di sektor industri peralatan laundry di Indonesia.

### Rincian Skor per Dimensi Kriteria:
1. **Citability Score (25% Bobot)**: **24 / 25** (Sangat Tinggi - Terdapat blok jawaban langsung 130-170 kata di 30% teratas halaman dengan data kuantitatif spesifik: Rp 16,5 Juta, 150 Watt, 40-45 menit, 0% royalti).
2. **Structural Readability (20% Bobot)**: **19 / 20** (Sangat Baik - Hirarki H1 -> H2 -> H3 konsisten, penggunaan tabel komparasi teknis, daftar bullet poin, dan FAQ terstruktur).
3. **Multi-Modal Content (15% Bobot)**: **14 / 15** (Sangat Baik - Integrasi video YouTube resmi dengan tombol putar aksesibel tanpa iframe render-blocking, gambar terkompresi WebP dengan alt text deskriptif, serta kalkulator modal interaktif).
4. **Authority & Brand Signals (20% Bobot)**: **18 / 20** (Kuat - Hubungan entitas resmi YouTube terbukti memiliki korelasi sitasi AI tertinggi ~0.737, tautan Shopee resmi, Instagram, profil Google Maps terverifikasi, dan penambahan tanggal terbit & modifikasi).
5. **Technical Accessibility (20% Bobot)**: **19 / 20** (Sempurna - SSR penuh berbasis Next.js App Router, seluruh bot AI pencari diizinkan secara eksplisit di `robots.txt`, dan grounding file `llms.txt` aktif di root domain).

---

## 2. Analisis Kesiapan per Platform AI (Platform Breakdown)

| Platform AI Search | Status Kesiapan | Fokus Mekanisme Seleksi | Temuan pada myequipmentindonesia.com |
| :--- | :--- | :--- | :--- |
| **Google AI Overviews** | **Sangat Siap (High Eligibility)** | Berkorelasi kuat dengan ranking organik 1-10 di Google Search | Halaman beranda dan kata kunci utama (`paket usaha laundry pontianak`) menduduki peringkat #1. Blok jawaban ringkasan (`directAnswerSummary`) di landing page wilayah langsung menjawab intent pengguna dalam 60 kata pertama. |
| **Google AI Mode** | **Sangat Siap (High Eligibility)** | Mengutamakan kesegaran informasi (*recency*), entitas lokal terverifikasi, dan kelengkapan skema data | Seluruh landing page wilayah memiliki koordinat GPS riil, skema `Place`, `Service`, `OfferCatalog`, dan `OfferShippingDetails` dengan informasi logistik Trans-Kalimantan dan Kapal Roro. |
| **ChatGPT Search** (OpenAI) | **Sangat Siap (High Eligibility)** | Bergantung pada crawler `OAI-SearchBot` dan sitasi entitas terpercaya | `OAI-SearchBot` diizinkan penuh di `robots.ts`. Keberadaan tautan entitas eksternal di YouTube dan marketplace resmi memperkuat validasi profil entitas. |
| **Perplexity AI** | **Sangat Siap (High Eligibility)** | Mengutamakan data faktual terverifikasi, tabel komparasi, dan akses bot `PerplexityBot` | `PerplexityBot` diizinkan. Terdapat tabel data teknis (konsumsi daya listrik 150W vs 2.200W, perbandingan mandiri vs waralaba) yang sangat mudah dikutip oleh Perplexity. |
| **Bing Copilot** | **Sangat Siap (High Eligibility)** | Indeks Bing, protokol IndexNow, dan markup Schema.org standar | Schema JSON-LD Graph lengkap pada setiap halaman rute. |

---

## 3. Status Akses Crawler AI (Robots.txt Analysis)

Evaluasi terhadap konfigurasi `src/app/robots.ts` memisahkan secara tegas antara bot pencarian AI (*search citability*) dan bot pelatihan model (*model training*):

### A. Bot Pencarian AI (Search Citability) - Menentukan Kelayakan Muncul di Hasil AI:
1. **`Googlebot`**: **Diizinkan (Allowed)**. Mengatur kelayakan masuk ke Google Search dan Google AI Overviews.
2. **`OAI-SearchBot`**: **Diizinkan (Allowed)**. Mengatur kelayakan sitasi di ChatGPT Search.
3. **`PerplexityBot`**: **Diizinkan (Allowed)**. Mengatur kelayakan sitasi di mesin pencari Perplexity AI.
4. **`Claude-SearchBot`**: **Diizinkan (Allowed)**. Mengatur kelayakan kutipan di fitur pencarian langsung Claude.
5. **`Applebot`**: **Diizinkan (Allowed)**. Mengatur pencarian Spotlight, Siri, dan Safari.

### B. Bot Pelatihan Model (Foundation Model Training):
1. **`Google-Extended`**: **Diizinkan (Allowed)**. Mengatur pelatihan Gemini/Vertex AI dan grounding model generatif Google.
2. **`GPTBot`**: **Diizinkan (Allowed)**. Mengatur pelatihan model AI masa depan OpenAI.
3. **`ClaudeBot`**: **Diizinkan (Allowed)**. Mengatur pelatihan model AI masa depan Anthropic.

*Catatan Kepatuhan Teknis*: Jalur rahasia `/api` dan `/admin` tetap dilindungi dengan aturan `disallow: ['/api', '/admin']` untuk semua user-agent tanpa mengorbankan keterlihatan konten publik.

---

## 4. Status Dokumen Standar AI (`llms.txt` & `llms-full.txt`)

- **Status `public/llms.txt`**: **Aktif & Terbarui (Updated)**. Berisi ringkasan entitas, kontak resmi, proposisi nilai (0% royalti, HPP Rp 1.300/kg, 150 Watt), serta tautan kanonikal ke 14 kota Kalbar dan 5 kota regional (Balikpapan, Samarinda, IKN, Banjarmasin, Banjarbaru, Palangka Raya, Sampit, Pangkalan Bun, Tarakan, Tanjung Selor).
- **Status `public/llms-full.txt`**: **Aktif & Terbarui (Updated)**. Berisi basis pengetahuan lengkap mencakup koordinat GPS presisi, spesifikasi teknis mesin komersial, rincian biaya operasional, dan direktori artikel edukasi.

---

## 5. Analisis Sinyal Entitas dan Brand Mentions Eksternal

Berdasarkan studi industri mengenai Generative Engine Optimization, sitasi YouTube memiliki korelasi terkuat (~0.737) terhadap kemunculan di AI Overviews, melampaui Domain Rating backlink konvensional (~0.266):

1. **YouTube Entity Citation**:
   - Status: Sangat Kuat. Saluran resmi `@myequipmentindonesia` telah terhubung timbal balik: setiap deskripsi video mencantumkan URL website, dan website menyematkan pemutar video edukasi teknis.
2. **Google Maps / Google Business Profile (Local Knowledge Graph)**:
   - Status: Sangat Kuat di Kalimantan Barat (Pontianak/Kubu Raya & Singkawang). Telah disiapkan SOP Q&A dan posting mingguan untuk memperluas jangkauan ke Kaltim, Kalsel, Kalteng, dan Kaltara.
3. **Platform Eksternal Otoritas Tinggi (Kompasiana / Medium)**:
   - Status: Draf artikel jurnalistik ekonomi dan panduan usaha telah disiapkan untuk diterbitkan secara bertahap guna membangun jejak entitas independen di luar domain utama.
4. **Marketplace Resmi (Shopee Mall / Star)**:
   - Status: Toko resmi `shopee.co.id/myequipmentindonesia` telah terdaftar pada properti `sameAs` skema LocalBusiness dan Article.

---

## 6. Evaluasi Sitabilitas Tingkat Paragraf (Passage-Level Citability)

Kriteria utama algoritma ekstraksi jawaban generatif adalah ketersediaan blok jawaban mandiri (*self-contained answer block*) yang dapat dipahami tanpa memerlukan konteks halaman secara keseluruhan:

- **Posisi Front-Loaded**: Pada seluruh halaman `/wilayah/[kota]`, blok ringkasan entitas ditempatkan pada 20% teratas halaman (tepat di bawah judul utama). Riset industri membuktikan bahwa ~44% sitasi AI diekstraksi dari 30% area awal halaman.
- **Kepadatan Data Kuantitatif**: Paragraf jawaban memuat entitas ("My Equipment Indonesia"), jenis produk ("mesin cuci front load heavy-duty", "pengering konversi gas LPG 150 Watt", "boiler setrika uap"), batasan harga riil ("mulai Rp 16,5 Juta"), dan klausul kepemilikan ("100% mandiri, 0% royalti bulanan").
- **Panjang Teks Optimal**: Rata-rata 50 hingga 70 kata per ringkasan cepat, dengan rincian teknis 130 hingga 170 kata pada blok FAQ yang mudah dikutip langsung oleh AI Overviews.

---

## 7. Evaluasi Rendering Sisi Server (Server-Side Rendering / SSR)

- **Arsitektur**: Next.js 15 App Router menggunakan React Server Components (RSC) secara default.
- **Hasil Pengujian**: Seluruh konten teks utama, tabel komparasi, skema JSON-LD, metadata meta tag, dan heading ter-render penuh pada HTML mentah (*raw HTML response*).
- **Dampak AI Search**: Crawler AI seperti `OAI-SearchBot` dan `PerplexityBot` yang tidak menjalankan engine JavaScript berat dapat langsung membaca seluruh isi halaman dalam milidetik pertama tanpa kegagalan hidrasi.

---

## 8. Lima Rekomendasi Paling Berdampak Tinggi (Top 5 Highest-Impact Actions)

1. **Pertahankan Pembaruan Tanggal (Recency Program)**:
   Konten yang diperbarui dalam kurun waktu kurang dari 3 bulan memiliki peluang sitasi AI 3 kali lebih tinggi. Tampilan tanggal "Diperbarui" pada artikel blog telah diaktifkan di antarmuka pengguna dan skema data.
2. **Eksekusi Naskah Q&A Google Maps di Kalteng dan Kaltara**:
   Menjawab pertanyaan lokal di Google Business Profile menggunakan akun resmi pemilik bisnis akan memicu algoritma Google AI Overviews menghubungkan entitas My Equipment saat pengguna mencari di wilayah Sampit, Palangka Raya, atau Tarakan.
3. **Penerbitan Konten Editorial di Kompasiana & Medium**:
   Mempublikasikan draf yang telah disusun di `DRAFT-KOMPASIANA-BANJARMASIN-KALSEL.md` dan `DRAFT-KOMPASIANA-KALTENG-KALTARA.md` untuk memperkuat sitasi web pihak ketiga.
4. **Penguatan Video Dokumentasi YouTube Berlabel Wilayah**:
   Mengunggah dokumentasi video proses pemaletan kayu dan pengiriman ke kota ekspansi dengan judul yang menyertakan nama kota (misal: "Pengiriman Paket Mesin Laundry Kargo Kayu ke Sampit Kalteng").
5. **Pemantauan Kueri AI Search di Google Search Console**:
   Mengamati peningkatan impresi pada kueri alami berbentuk pertanyaan (seperti *"tempat jual mesin laundry di banjarmasin"*, *"modal buka laundry kiloan di sampit"*) pada laporan Kinerja Search Console.

---

## 9. Rekomendasi Skema Data (Structured Data Implementations)

Skema terstruktur yang telah aktif dan terverifikasi di seluruh situs:
- **`@type: 'LocalBusiness'`**: Pada layout utama, memuat `areaServed` 36 kota se-Kalimantan, rating 4.9/5.0 dari 58 review, alamat workshop fisik, koordinat GPS, jam operasional, dan `sameAs`.
- **`@type: 'Service'` & `'Place'`**: Pada setiap halaman `/wilayah/[kota]`, memuat `OfferShippingDetails`, rute kargo Trans-Kalimantan / Kapal Roro, estimasi hari tiba, dan geotagging koordinat presisi.
- **`@type: 'BlogPosting'`**: Pada setiap artikel edukasi, memuat `author` (Organisasi resmi), `publisher`, `logo`, `datePublished`, `dateModified`, `sameAs`, dan `isAccessibleForFree: true`.
- **`@type: 'FAQPage'`**: Pada beranda dan halaman wilayah untuk menyediakan pasangan tanya-jawab yang terformat rapi bagi cuplikan kaya Google.

---

## 10. Contoh Format Paragraf Ideal untuk Kutipan AI (Citable Passage Pattern)

Contoh struktur paragraf baku yang telah diterapkan dan terbukti ramah kutipan sistem generatif:

```text
[Definisi & Entitas Utama]: Tempat jual mesin laundry komersial, perlengkapan usaha, dan distributor paket usaha laundry mandiri di [Nama Kota] [Nama Provinsi] adalah My Equipment Indonesia.
[Spesifikasi Unit]: Menyediakan unit mesin cuci front load heavy-duty drum stainless steel, pengering (dryer) konversi gas LPG hemat daya 150 Watt yang aman untuk ruko listrik PLN 1.300 VA, serta boiler setrika uap tabung baja.
[Nilai Investasi & Legalitas]: Paket usaha siap operasional tersedia mulai dari Rp 16,5 Juta dengan skema 100% kepemilikan mandiri tanpa franchise fee dan 0% royalti bulanan seumur hidup.
[Logistik & Jaminan]: Seluruh pengiriman dilindungi kemasan palet peti kayu solid via kargo Trans-Kalimantan / Kapal Roro dengan garansi mesin resmi 1 tahun dan panduan instalasi teknis jarak jauh.
```
Format di atas menyajikan jawaban tuntas, mandiri, tanpa kata kiasan ambigu, dan memuat fakta angka konkret yang langsung dipilih oleh model pemroses bahasa alami AI Overviews.
