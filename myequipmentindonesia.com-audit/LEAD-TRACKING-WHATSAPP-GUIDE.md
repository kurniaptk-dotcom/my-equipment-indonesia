# Panduan Lengkap Sistem Pelacakan Lead WhatsApp & Analitik GA4
**My Equipment Indonesia (myequipmentindonesia.com)**  
*Dokumen Operasional CS, Sales, dan Digital Marketing*

---

## 1. Arsitektur Pelacakan Lead (Dual-Layer Tracking)

Sistem pelacakan lead website My Equipment Indonesia menggunakan pendekatan **Dual-Layer Tracking** yang menghubungkan langsung analitik website (Google Analytics 4) dengan layar obrolan WhatsApp Customer Service (CS):

1. **Layer 1: Tag Referensi Pre-filled Chat (`[Ref: KODE_SUMBER]`)**  
   Setiap tautan WhatsApp yang dibuat dari tombol CTA di seluruh website menyematkan kode referensi unik di akhir pesan. Saat calon konsumen menekan tombol, kode ini otomatis terbawa ke ruang obrolan WhatsApp. Tim CS dapat langsung mengidentifikasi asal-usul pengunjung tanpa perlu login ke dashboard analitik.

2. **Layer 2: Real-time Event Tracking GA4 (`generate_lead` & `whatsapp_lead_click`)**  
   Script global di `src/app/layout.tsx` secara otomatis mengekstrak kode `[Ref: ...]` saat tombol diklik dan menembakkan event konversi ke Google Analytics 4:
   - Event GA4 Standard: `generate_lead` (dengan `currency: IDR` dan estimasi nilai transaksi rata-rata Rp 16.500.000).
   - Event GA4 Custom: `whatsapp_lead_click` (dengan dimensi `event_label`, `ref_code`, `link_url`, dan `page_location`).

---

## 2. Tabel Master Kode Referensi Lead WhatsApp

### A. Beranda (Home Page)
| Kode Referensi | Lokasi Tombol | Tipe Lead / Intensi Pengunjung |
| :--- | :--- | :--- |
| `[Ref: WEB-HOME-HERO]` | Tombol CTA utama di Banner Hero Atas | Pengunjung baru mencari konsultasi paket laundry |
| `[Ref: WEB-HOME-BOTTOM-CTA]` | Tombol CTA di bagian penutup beranda | Pengunjung yang telah membaca seluruh beranda |
| `[Ref: WEB-HOME-PROPOSAL-PDF]` | Tombol "Minta via WhatsApp" di kotak proposal | Calon mitra meminta brosur/proposal resmi 2026 |
| `[Ref: WEB-HOME-PORTFOLIO-{ID}]` | Tombol konsultasi di kartu portfolio outlet | Tertarik dengan hasil instalasi outlet tertentu |
| `[Ref: WEB-HOME-SHOWROOM-{NO}]` | Tombol jadwalkan kunjungan showroom | Calon pembeli siap survei fisik unit mesin |

### B. Halaman Paket Usaha (`/paket-usaha`)
| Kode Referensi | Lokasi Tombol | Tipe Lead / Intensi Pengunjung |
| :--- | :--- | :--- |
| `[Ref: PKT-HERO-GENERAL]` | Banner Hero halaman paket usaha | Konsultasi umum rekomendasi paket |
| `[Ref: PKT-CARD-{NAMA_PAKET}]` | Tombol di kartu masing-masing paket | Tertarik spesifik pada paket tersebut (contoh: `PKT-CARD-KOMERSIAL-DUAL-LINE`) |
| `[Ref: PKT-B2B-CORP]` | Tombol pengadaan laundry mess/tambang/sawit | Lead korporasi / institusi skala besar |
| `[Ref: PKT-PROPOSAL-PDF]` | Tombol permintaan proposal resmi | Membutuhkan dokumen penawaran harga formal |
| `[Ref: PKT-BOTTOM-CTA]` | Tombol penutup halaman paket usaha | Konsultasi penentuan skala kebutuhan mesin |

### C. Halaman Wilayah Kalimantan (`/wilayah/[kota]`)
| Kode Referensi | Lokasi Tombol | Tipe Lead / Intensi Pengunjung |
| :--- | :--- | :--- |
| `[Ref: GEO-{KOTA}-HERO]` | Hero Banner halaman kota | Pengusaha lokal kota tersebut (contoh: `GEO-BONTANG-HERO`, `GEO-PONTIANAK-HERO`) |
| `[Ref: GEO-{KOTA}-PKT-{PAKET}]` | Kartu paket di halaman wilayah | Memilih paket tertentu untuk dikirim ke kota tujuan |

### D. Fitur Interaktif & Kalkulator Bisnis
| Kode Referensi | Lokasi Tombol | Tipe Lead / Intensi Pengunjung |
| :--- | :--- | :--- |
| `[Ref: CALC-ROI-SIMULATION]` | Tombol kirim hasil Kalkulator ROI | Lead matang: membawa rincian kapasitas, omset proyeksi, laba bersih, dan estimasi BEP |
| `[Ref: QUIZ-RECOMMENDER-RESULT]` | Hasil kuis rekomendasi 30 detik | Lead terarah: hasil filter modal dan skala usaha |
| `[Ref: ESTIMATOR-CART-MODAL]` | Rincian keranjang Custom Estimator | Calon pembeli yang merakit sendiri daftar unit mesin dan perlengkapannya |
| `[Ref: ESTIMATOR-STICKY-BAR]` | Sticky bar di bawah halaman estimator | Calon pembeli melihat subtotal harga rakitan |
| `[Ref: FORM-CONSULTATION-SUBMIT]` | Formulir survei konsultasi | Pengunjung mengisi data lengkap profil usaha |
| `[Ref: FORM-SERVICE-REQUEST-SUBMIT]`| Formulir garansi & permintaan servis | Pelanggan existing mengajukan klaim teknis |

### E. Menu Melayang (Floating Widget) & Mobile Bar
| Kode Referensi | Lokasi Tombol | Tipe Lead / Intensi Pengunjung |
| :--- | :--- | :--- |
| `[Ref: FLOAT-DIRECT-TRIGGER]` | Klik cepat tombol utama WhatsApp melayang | Pertanyaan instan pengunjung |
| `[Ref: FLOAT-PAKET-USAHA]` | Menu cepat: Paket Usaha Laundry | Rekomendasi paket berdasarkan modal |
| `[Ref: FLOAT-MESIN-SPAREPART]` | Menu cepat: Tanya Mesin & Sparepart | Kebutuhan spesifikasi mesin satuan |
| `[Ref: FLOAT-SHOWROOM-VISIT]` | Menu cepat: Kunjungan Showroom | Janji temu survei showroom |
| `[Ref: FLOAT-KONSULTASI-UMUM]` | Menu cepat: Konsultasi Umum | Pertanyaan seputar layanan / ekspedisi |
| `[Ref: MOBILE-QUICK-BAR]` | Tombol bar WhatsApp di layar HP bawah | Pengguna mobile yang langsung chat |

### F. Halaman Pendukung & Edukasi
| Kode Referensi | Lokasi Tombol | Tipe Lead / Intensi Pengunjung |
| :--- | :--- | :--- |
| `[Ref: PROD-{SLUG}]` | Halaman detail produk mesin | Bertanya ketersediaan stok & harga mesin spesifik |
| `[Ref: ART-{SLUG}]` | Penutup artikel panduan / studi kasus | Pembaca artikel edukasi yang ingin mendalami solusi |
| `[Ref: PROPOSAL-DOC-CONFIRM]` | Halaman baca proposal resmi | Konfirmasi ketersediaan unit setelah membaca proposal |
| `[Ref: FRANCHISE-VS-MANDIRI-COMPARE]`| Tabel komparasi Franchise vs Mandiri | Calon mitra yang membandingkan efisiensi modal |
| `[Ref: TIER-TABLE-{TIER}]` | Tabel matriks komparasi paket | Konsultasi tier spesifik |
| `[Ref: GRID-KALBAR-{KOTA}]` | Kartu grid wilayah Kalbar | Cek ongkir dan survei teknisi Kalbar |
| `[Ref: GRID-EXPANSION-{KOTA}]` | Kartu grid wilayah ekspansi | Cek kargo Trans-Kalimantan / Kapal Roro |
| `[Ref: FOOTER-DIRECT-CONSULT]` | Link WhatsApp di footer situs | Pengunjung di bagian bawah halaman umum |
| `[Ref: NAV-MOBILE-MENU]` | Link WhatsApp di menu hamburger | Navigasi menu mobile |

---

## 3. SOP Penanganan Chat untuk Tim Customer Service (CS)

1. **Periksa Baris Terakhir Pesan Masuk**:
   - Jika ada tag `[Ref: GEO-BONTANG-HERO]`: Langsung buka dengan salam ramah, sebutkan bahwa My Equipment melayani pengiriman kargo Trans-Kalimantan / Kapal Roro berpalet kayu solid ke Bontang, serta jelaskan keunggulan paket mandiri 0% royalti seumur hidup.
   - Jika ada tag `[Ref: CALC-ROI-SIMULATION]`: Calon mitra ini sangat analitis. Berikan apresiasi atas simulasi perhitungan modalnya, konfirmasikan ketersediaan unit mesin yang direkomendasikan kalkulator, dan tawarkan pembuatan RAB resmi dalam format PDF.
   - Jika ada tag `[Ref: PKT-B2B-CORP]`: Alihkan atau gunakan format korporat. Tanyakan nama instansi/perusahaan, lokasi mess perkebunan atau basecamp tambang, kapasitas pakaian karyawan per hari, dan jadwal pengadaan.
   - Jika ada tag `[Ref: PROD-DRYER-...]`: Langsung cek stok fisik di gudang Pontianak, infokan daya listrik (150 Watt untuk konversi gas), dan garansi suku cadang distributor.

2. **Jangan Hapus Kode Referensi pada Catatan CRM**:
   - Cantumkan kode referensi pada spreadsheet pencatatan closing lead untuk evaluasi bulanan efektivitas saluran digital.

---

## 4. Cara Memantau Laporan di Google Analytics 4 (GA4)

1. Masuk ke **Google Analytics 4** properti `G-TZNB85PVLX`.
2. Buka menu **Reports (Laporan) > Engagement (Interaksi) > Events (Peristiwa)**.
3. Klik peristiwa `whatsapp_lead_click` atau `generate_lead`.
4. Tambahkan secondary dimension: **Event label** atau **ref_code**.
5. Anda akan melihat tabel peringkat tombol CTA mana yang menghasilkan leads terbanyak setiap hari/minggu/bulan.
