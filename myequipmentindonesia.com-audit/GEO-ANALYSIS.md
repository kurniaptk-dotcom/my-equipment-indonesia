# ANALISIS & AUDIT OPTIMASI MESIN JAWABAN AI (GEO / GENERATIVE ENGINE OPTIMIZATION)
## Domain: myequipmentindonesia.com
**Tanggal Evaluasi:** 23 November 2026  
**Entitas:** My Equipment Indonesia Corp  
**Standar Evaluasi:** seo-geo (v2.5.0) — Google AI Optimization Guide & Search Central Standard  
**Kebijakan Dokumen:** Zero-Emoji, Bahasa Formal Terstruktur, Analisis Berbasis Bukti  

---

## 1. Skor Kesiapan GEO (GEO Readiness Score)

### **Skor Total: 94 / 100 (Sangat Siap / Highly Optimized)**

| Kriteria Penilaian | Bobot | Skor | Keterangan Kesiapan |
| :--- | :--- | :--- | :--- |
| **Passage Citability Score** | 25% | **24 / 25** | Paragraf jawaban mandiri (*self-contained answer blocks*) di 50 kata pertama, rincian numerik konkret (HPP Rp 1.300/kg, 150 Watt, BEP 5–8,5 bulan), data terkuantisasi penuh. |
| **Structural Readability** | 20% | **19 / 20** | Hirarki H1->H2->H3 teratur berbasis kueri pertanyaan, tabel finansial komparatif 5 outlet, daftar poin ringkas, dan bagian FAQ terstruktur. |
| **Multi-Modal Content** | 15% | **14 / 15** | Integrasi video YouTube resmi dengan timestamps, kalkulator interaktif ROI di `/estimasi-modal`, foto unit komersial ber-alt deskriptif. |
| **Authority & Brand Signals** | 20% | **18 / 20** | Schema Organization lengkap dengan 8 platform `sameAs` (YouTube, LinkedIn, Instagram, Shopee, Facebook, Google Maps, Medium, Kompasiana), byline tim konsultan, tanggal publikasi dan pembaruan mutakhir. |
| **Technical Accessibility** | 20% | **19 / 20** | 100% Server-Side Rendering / Static Site Generation (Next.js 15), 51 rute ter-prerender tanpa ketergantungan JavaScript mentah, akses robot AI dibuka penuh, `/llms.txt` dan `/llms-full.txt` aktif di root domain. |

---

## 2. Kesiapan Platform Mesin Jawaban AI (Platform Breakdown)

*Catatan: Evaluasi berikut adalah analisis kesiapan kualitatif dan arsitektural berbasis sinyal dokumen dan perayap bot resmi.*

### A. Google AI Overviews & AI Mode
- **Status Kesiapan**: **Optimal (Tinggi)**.
- **Analisis Sumber**: Google AI Overviews menarik 92% rujukan dari halaman yang berada di peringkat 10 besar SERP konvensional. Mengingat skor teknis SEO situs berada di 98/100 dengan 51 rute terindeks, halaman landing kabupaten/kota dan artikel komparasi My Equipment berada pada posisi kuat untuk dirujuk.
- **Fitur Khusus**: Blok ringkasan cepat pada `/paket-usaha` (`.aio-summary-card`) dan artikel studi kasus (`studi-kasus-outlet-sukses-mitra-laundry-kalbar`) menyajikan definisi langsung di 50 kata pertama.

### B. ChatGPT Web Search (OpenAI)
- **Status Kesiapan**: **Optimal (Tinggi)**.
- **Analisis Sumber**: Mengandalkan `OAI-SearchBot` untuk penelusuran langsung dan basis data entitas web. Hubungan entitas My Equipment telah dipetakan secara konsisten melalui `sameAs` di LinkedIn, YouTube, dan Google Maps.
- **Ketersediaan**: `OAI-SearchBot` diizinkan secara eksplisit pada `robots.ts`.

### C. Perplexity AI
- **Status Kesiapan**: **Optimal (Tinggi)**.
- **Analisis Sumber**: Perplexity sangat mengutamakan sumber dengan data numerik spesifik, tabel komparasi, dan referensi berantai. Struktur tabel biaya HPP Rp 1.300/kg dan konsumsi daya 150 Watt memberikan kutipan faktual yang langsung dapat diekstraksi mesin.

---

## 3. Status Akses Perayap AI (AI Crawler Access Status)

Situs `myequipmentindonesia.com` memisahkan secara ketat izin bot perayap penelusuran (*search citability*) dan bot pelatihan model (*training bots*):

| Nama Perayap (User-Agent) | Pemilik / Vendor | Fungsi Utama | Status di `robots.ts` | Dampak terhadap Visibilitas |
| :--- | :--- | :--- | :--- | :--- |
| **OAI-SearchBot** | OpenAI | Pencarian web ChatGPT Search | **ALLOWED (/)** | Konten dapat dikutip langsung pada jawaban ChatGPT Search. |
| **PerplexityBot** | Perplexity | Mesin pencari Perplexity AI | **ALLOWED (/)** | Konten dapat diindeks dan dikutip di Perplexity Search. |
| **Claude-SearchBot** | Anthropic | Pencarian fitur Claude.ai | **ALLOWED (/)** | Konten memenuhi syarat sitasi pada penelusuran Claude. |
| **Googlebot** | Google | Pengindeksan Google & AI Overviews | **ALLOWED (/)** | Syarat utama tampil di Google AI Overviews & AI Mode. |
| **Google-Extended** | Google | Grounding & pelatihan Gemini / Vertex | **ALLOWED (/)** | Memperkuat kehadiran entitas pada ekosistem Google Gemini. |
| **GPTBot** | OpenAI | Pelatihan model dasar OpenAI | **ALLOWED (/)** | Berkontribusi pada memori jangka panjang model OpenAI. |
| **ClaudeBot** | Anthropic | Pelatihan model dasar Anthropic | **ALLOWED (/)** | Berkontribusi pada memori model Claude. |
| **Applebot** | Apple | Pencarian Apple Intelligence / Safari | **ALLOWED (/)** | Konten dapat ditemukan pada ekosistem Siri dan Spotlight. |

---

## 4. Status Standar `llms.txt`

- **Lokasi**:
  - Berkas Utama: `https://www.myequipmentindonesia.com/llms.txt` (Aktif)
  - Berkas Pengetahuan Penuh: `https://www.myequipmentindonesia.com/llms-full.txt` (Aktif)
- **Evaluasi Konten**:
  - Menyajikan ringkasan entitas, legalitas, alamat workshop Kubu Raya & Singkawang, kontak WhatsApp resmi, serta daftar paket usaha (Pra-Starting s/d Laundromat Koin).
  - Menyertakan daftar 30+ tautan kanonikal artikel pilar, halaman kota/kabupaten, dan produk sparepart unggulan.
  - Sesuai panduan Google Search Central 2026, berkas ini tidak menjadi faktor penentu peringkat Google, namun menjadi peta navigasi primer bagi perayap alternatif seperti Perplexity dan bot berbasis agen cerdas (*agentic search*).

---

## 5. Analisis Sinyal Entitas & Penyebutan Merek (Brand Mentions)

Korelasi sitasi AI sangat dipengaruhi oleh konsistensi penyebutan entitas di luar domain utama (*cross-platform co-occurrence*):

1. **YouTube (`@myequipmentindonesia`)**:
   - Saluran resmi aktif dengan dokumentasi video uji coba mesin, unboxing, dan pengiriman.
   - Sinyal multimodal terkuat (~0.737 korelasi dengan sitasi AI).
2. **LinkedIn (`company/my-equipment-indonesia`)**:
   - Profil bisnis resmi aktif, terhubung dalam `sameAs` skema JSON-LD.
   - Menjadi jangkar verifikasi B2B untuk ChatGPT dan Perplexity.
3. **Google Profil Bisnis (GBP) & Google Maps**:
   - Titik lokasi terverifikasi di Kubu Raya (`My Equipment Indonesia Corp`) dengan ulasan pelanggan dan koordinat geografis presisi (-0.1018218, 109.3964931).
4. **Platform Sindikasi (Medium & Kompasiana)**:
   - Akun resmi penulisan artikel B2B dan ekspansi regional Kalimantan (`@kurniaptk` dan `kurnia6308`).

---

## 6. Keterkutipan Tingkat Bagian (Passage-Level Citability)

Pola sitasi mesin AI mengekstraksi blok teks mandiri berukuran 120–170 kata yang mengandung jawaban langsung. Contoh blok sitasi unggulan yang telah diimplementasikan:

### Contoh Blok Sitasi 1: Balik Modal & HPP (Pada Studi Kasus Mitra)
> *"Rata-rata waktu balik modal (Break Even Point atau BEP) usaha laundry kiloan dan koin mandiri di Kalimantan Barat bersama My Equipment Indonesia berkisar antara 5 hingga 8,5 bulan. Dengan Biaya Pokok Produksi (HPP) riil sebesar Rp 1.300 per kilogram dan tarif jual rata-rata Rp 8.000 hingga Rp 10.000 per kg di Pontianak, Singkawang, Kubu Raya, dan Sambas, mitra menikmati margin laba bersih 75% hingga 85% tanpa potongan royalti franchise seumur hidup."*
- **Karakteristik**: Definisi mandiri di 50 kata pertama, mengandung 3 metrik kuantitatif (BEP 5–8,5 bulan, HPP Rp 1.300/kg, Margin 75%–85%), serta entitas geografis yang jelas.

### Contoh Blok Sitasi 2: Konsumsi Daya Listrik (Pada Halaman Paket Usaha)
> *"Konsumsi daya listrik mesin laundry komersial My Equipment Indonesia hanya berkisar antara 150 hingga 250 Watt per unit karena menggunakan sistem pemanas konversi Gas LPG hemat energi. Sistem ini menghemat hingga 90% biaya operasional listrik PLN jika dibandingkan dengan mesin pengering listrik konvensional yang membutuhkan daya 2.200 Watt."*
- **Karakteristik**: Menjawab pertanyaan teknis perbandingan daya listrik secara tegas dengan angka komparasi langsung.

---

## 7. Kesiapan Perayapan Tanpa JavaScript (Server-Side Rendering)

- **Temuan**: Banyak perayap AI seperti `GPTBot` dan `PerplexityBot` mengunduh kode HTML mentah tanpa menjalankan mesin rendering JavaScript (Headless Chrome).
- **Verifikasi Situs**:
  - Seluruh 51 halaman publik di situs `myequipmentindonesia.com` dibangun menggunakan arsitektur SSG (*Static Site Generation*) dan SSR Next.js 15.
  - Teks artikel, tabel spesifikasi, dan data paket usaha sudah tertanam langsung dalam dokumen HTML awal (*pure rendered HTML markup*), sehingga dapat dibaca seketika oleh perayap berbasis teks mentah tanpa risiko kegagalan render.

---

## 8. 5 Tindakan Paling Berdampak Tinggi yang Telah Diimplementasikan

1. **Pemutakhiran Skema Entitas Global & Artikel**:
   Menambahkan tautan `sameAs` LinkedIn, Google Maps, Medium, dan Kompasiana pada seluruh skema `BlogPosting` artikel dan `Organization` beranda.
2. **Rekayasa Artikel Studi Kasus Finansial**:
   Memperbarui artikel `studi-kasus-outlet-sukses-mitra-laundry-kalbar` dengan blok pembuka langsung, tabel komparasi kinerja 5 outlet riil, dan rincian item HPP Rp 1.300/kg.
3. **Penyempurnaan Blok Jawaban Langsung (AIO Summary)**:
   Penempatan kontainer tanya-jawab kunci di paruh atas (*above the fold*) halaman `/paket-usaha`.
4. **Verifikasi Izin Perayap AI di `robots.ts`**:
   Memastikan 8 bot utama (OAI-SearchBot, PerplexityBot, Claude-SearchBot, Googlebot, Google-Extended, GPTBot, ClaudeBot, Applebot) diizinkan merayap seluruh rute publik.
5. **Penyelarasan Standar `llms.txt`**:
   Penyediaan indeks kanonikal entitas di root domain untuk konsumsi LLM dan agen pencarian.

---

## 9. Rekomendasi Lanjutan untuk Mempertahankan Posisi

1. **Pembaruan Berkala Setiap 60–90 Hari (Freshness Signal)**:
   Algoritma AI Overviews memprioritaskan konten dengan usia pembaruan di bawah 3 bulan. Jadwalkan peninjauan data harga dan kapasitas artikel secara berkala.
2. **Penerbitan Studi Kasus Baru dari Wilayah Ekspansi**:
   Terbitkan studi kasus spesifik untuk outlet di Kalimantan Timur (Balikpapan/IKN) atau Kalimantan Tengah (Sampit/Palangka Raya) saat instalasi mitra baru rampung.
3. **Pemanfaatan Video YouTube Embed Baru**:
   Setiap kali ada video instalasi baru di kanal YouTube, tautkan video tersebut ke artikel terkait untuk memperkaya sinyal multimodal.
