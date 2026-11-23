# RENCANA AKSI SEO & GEO PRIORITAS (PRIORITIZED ACTION PLAN)
## Domain: myequipmentindonesia.com
**Pembaruan Terakhir:** 23 November 2026  
**Status Audit On-Page & Technical:** 98 / 100 (Grade A+)  
**Aturan:** Zero-Emoji, Bahasa Formal Terstruktur, Target Terukur.

---

## TINGKAT PRIORITAS 1: KRITIS (CRITICAL - SELESAI / 0 ISU AKTIF)

Semua kendala teknis yang sebelumnya berpotensi menghambat perayapan dan pengindeksan telah berhasil diselesaikan secara tuntas:
- **Title Tag Beranda**: Telah dipersingkat dari 77 karakter menjadi 50 karakter (`Pusat Mesin dan Paket Usaha Laundry Mandiri Kalbar`), menghilangkan peringatan terpotong di Google SERP.
- **Tautan Internal Beranda**: 8 anchor text generik telah diubah menjadi anchor text deskriptif yang kaya kata kunci semantik.
- **Validasi Cuplikan Produk GSC**: Pembersihan markup `@type: Offer` tanpa harga telah selesai dan lulus validasi Google Search Console.
- **Pengindeksan Rute 5 Provinsi**: 40 artikel pilar dan 24 landing page kabupaten/kota telah terdaftar di `sitemap.xml` dan terhubung dalam arsitektur tautan internal tanpa halaman yatim (*zero orphan pages*).

---

## TINGKAT PRIORITAS 2: TINGGI (HIGH PRIORITY - EKSEKUSI MINGGU 1 - 2)

Fokus utama tahap ini adalah mendongkrak otoritas domain (*Domain Authority*) dari level 21 menuju level 30+ melalui sindikasi artikel backlink luar berkualitas tinggi:

### 1. Publikasi Artikel Otoritas B2B di LinkedIn Pulse (DA 98)
- **Tujuan**: Membangun sinyal kredibilitas B2B korporat dan injeksi backlink berkualitas tinggi langsung ke situs utama.
- **Naskah Siap Pakai**: [myequipmentindonesia.com-audit/DRAFT-LINKEDIN-B2B-OFFPAGE.md](file:///d:/Project/Project%20Aplikasi%20Kurnia/My%20Equipment/myequipmentindonesia.com-audit/DRAFT-LINKEDIN-B2B-OFFPAGE.md)
- **Judul**: *Membangun Ekosistem Industri Binatu Komersial di Kalimantan: Peluang Bisnis Laundry B2B Tanpa Beban Royalti Waralaba*
- **Langkah Eksekusi**:
  1. Masuk ke LinkedIn dan pilih opsi "Tulis Artikel" (*Write Article*) menggunakan profil bisnis My Equipment Indonesia.
  2. Salin naskah lengkap dari berkas draf.
  3. Sisipkan hyperlink pada anchor text yang telah dipetakan (mengarah ke `/paket-usaha`, `/estimasi-modal`, dan artikel master regional se-Kalimantan).
  4. Terbitkan dan bagikan tautan artikel ke feed LinkedIn.

### 2. Publikasi Artikel Regional di Kompasiana (DA 85+) & Medium (DA 95+)
- **Tujuan**: Menangkap kueri pencarian lokal dan menanamkan backlink dofollow/nofollow dari media massa nasional.
- **Naskah Siap Pakai**:
  - Wilayah Kalteng & Kaltara: [myequipmentindonesia.com-audit/DRAFT-KOMPASIANA-KALTENG-KALTARA.md](file:///d:/Project/Project%20Aplikasi%20Kurnia/My%20Equipment/myequipmentindonesia.com-audit/DRAFT-KOMPASIANA-KALTENG-KALTARA.md)
  - Wilayah Kaltim & Kalsel: [myequipmentindonesia.com-audit/KOMPASIANA-GUEST-POST-KALTIM-KALSEL.md](file:///d:/Project/Project%20Aplikasi%20Kurnia/My%20Equipment/myequipmentindonesia.com-audit/KOMPASIANA-GUEST-POST-KALTIM-KALSEL.md)
- **Langkah Eksekusi**:
  1. Buka akun Kompasiana dan Medium.
  2. Salin judul dan isi artikel.
  3. Pasang hyperlink pada kata kunci sasaran (Sampit, Palangka Raya, Tarakan, Tanjung Selor, Balikpapan, IKN).
  4. Publikasikan pada rubrik Ekonomi / Wirausaha.

### 3. Permintaan Pengindeksan Google Search Console (Manual Fast-Track)
- **Tujuan**: Mempercepat perayapan Googlebot dan pengenalan Google AI Overviews untuk artikel pilar master se-Kalimantan.
- **Langkah**:
  1. Masuk ke [Google Search Console URL Inspection](https://search.google.com/search-console/inspect?resource_id=sc-domain%3Amyequipmentindonesia.com&id=https%3A%2F%2Fwww.myequipmentindonesia.com%2Fartikel%2Fdistributor-mesin-laundry-se-kalimantan-panduan-ekosistem-dan-paket-usaha).
  2. Klik "Uji URL Langsung" (*Test Live URL*).
  3. Klik "Minta Pengindeksan" (*Request Indexing*).

### 4. Optimasi Deskripsi & Stempel Waktu (Timestamps) YouTube
- **Tujuan**: Memicu sinyal multimodal Google Gemini Video Search.
- **Naskah Siap Pakai**: [myequipmentindonesia.com-audit/YOUTUBE-METADATA-OPTIMASI.md](file:///d:/Project/Project%20Aplikasi%20Kurnia/My%20Equipment/myequipmentindonesia.com-audit/YOUTUBE-METADATA-OPTIMASI.md)
- **Langkah**:
  1. Buka YouTube Studio pada kanal resmi `@myequipmentindonesia`.
  2. Perbarui deskripsi video unggulan dengan naskah timestamps lengkap dan tautan website resmi.
  3. Perbarui tag video sesuai daftar rekomendasi.

---

## TINGKAT PRIORITAS 3: MENENGAH (MEDIUM PRIORITY - KONFIGURASI DNS DOMAIN)

Penyelesaian dua catatan teknis pada server DNS domain untuk mencapai skor 100% pada audit keamanan email dan otentikasi domain:

### 1. Pemasangan Rekaman DNS SPF (Sender Policy Framework)
- **Tipe Rekaman**: `TXT`
- **Host / Name**: `@` (atau `myequipmentindonesia.com`)
- **Nilai / Value**: `v=spf1 include:_spf.google.com ~all`
- **Tujuan**: Mencegah pemalsuan email atas nama domain korporat My Equipment dan meningkatkan reputasi pengiriman email ke klien B2B.

### 2. Pemasangan Rekaman DNS DMARC (Domain-based Message Authentication)
- **Tipe Rekaman**: `TXT`
- **Host / Name**: `_dmarc`
- **Nilai / Value**: `v=DMARC1; p=none; sp=none; rua=mailto:myequipmentindonesia@gmail.com`
- **Tujuan**: Mengaktifkan protokol verifikasi email standar industri dan menghijaukan skor Technology pada audit SEOptimer.

---

## TINGKAT PRIORITAS 4: RENDAH (LOW PRIORITY - BACKLOG OPTIONAL)

1. **Pembuatan Akun Profil Resmi X (Twitter)**:
   - Membuat akun `@myequipmentid` dan menautkannya di footer untuk menyempurnakan sinyal sosial.
2. **Pemasangan Facebook Pixel**:
   - Dipasang saat Anda memulai kampanye Meta Ads berbayar (Facebook/Instagram Ads) untuk retargeting pengunjung web.
3. **Siklus Pemeliharaan Konten Kuartalan (AI Recency Loop)**:
   - Meninjau kembali data teknis dan tarif kargo setiap 3 bulan sekali agar konten tetap memiliki nilai *freshness* tinggi di Google AI Overviews.
