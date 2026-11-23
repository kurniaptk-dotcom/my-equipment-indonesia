# Design System & UI/UX Guidelines: My Equipment Indonesia

## 1. Overview & Design Philosophy

My Equipment Indonesia adalah platform B2B dan direct-to-consumer untuk penyediaan mesin laundry komersial, paket usaha laundry mandiri (koin/QRIS), instalasi teknis, serta suku cadang di Kalimantan Barat dan seluruh regional Kalimantan.

Arketipe desain sistem kami mengadopsi sinergi tiga pilar:
1. **Stripe B2B Financial Trust**: Tipografi berbobot presisi, tata letak data tabular berjarak proporsional (`tnum`), pembagian kartu bergradasi elevasi halus, dan kejelasan kalkulasi ROI/HPP tanpa ambiguitas visual.
2. **Shopify Commercial Warmth**: Aksesibilitas onboarding bagi pengusaha pemula, hierarki visual lencana status (Badge/Pill) yang jelas, kartu paket usaha bertingkat (Starter, Komersial, Self-Service), dan penegasan elemen konversi (WhatsApp konsultasi, unduh proposal).
3. **Industrial Hardware Precision**: Representasi visual perangkat keras (drum stainless steel grade 304, burner gas hemat energi, motor penggerak heavy-duty) dengan palet warna baja, kontras tinggi, garis pandu teknis, dan spesifikasi konsumsi daya (150 Watt vs 2.200 Watt).

---

## 2. Core Principles

- **Clarity Over Decoration**: Setiap elemen visual melayani pemahaman pengguna mengenai spesifikasi teknis mesin, modal investasi, dan proyeksi keuntungan.
- **Hardware Credibility**: Tampilan harus mencerminkan mesin kelas industri yang tangguh dan tahan lama, bukan sekadar barang ritel rumah tangga biasa.
- **Tabular Rigor**: Angka harga rupiah, watt listrik, dimensi mesin, dan kapasitas kg selalu menggunakan fitur numerik monospaced tabular (`font-feature-settings: "tnum"`).
- **Zero Ambiguity CTA**: Aksi utama (Konsultasi Paket Usaha, Cek Ketersediaan Sparepart) selalu menonjol, mudah disentuh di perangkat mobile (minimal 44px tap target), dan bebas distraksi.
- **Strict Zero-Emoji Policy**: Tidak diperkenankan penggunaan karakter emoji di seluruh antarmuka, label, tombol, maupun badge. Gunakan ikon SVG semantik berukuran 16px-20px dengan stroke seragam (1.75px-2px).

---

## 3. Color Palette & Semantic Tokens

### 3.1 Primary & Brand Colors
- `--primary`: `#0968e8` (Cobalt Royal - warna tindakan primer, interaksi, dan tombol utama)
- `--primary-hover`: `#0756c2`
- `--primary-light`: `#eff6ff` (Biru aksen latar belakang lembut)
- `--primary-border`: `#bfdbfe`

### 3.2 Neutral & Surface Hierarchy
- `--bg-canvas`: `#f8fafc` (Slate 50 - latar belakang dasar halaman)
- `--bg-surface`: `#ffffff` (Putih murni untuk kartu dan kontainer)
- `--bg-surface-subtle`: `#f1f5f9` (Slate 100 - strip spesifikasi dan tabel)
- `--border-subtle`: `#e2e8f0` (Slate 200 - garis batas default kartu)
- `--border-strong`: `#cbd5e1` (Slate 300 - garis batas input aktif dan hover)
- `--border-primary`: `#93c5fd` (Slate/Blue - garis fokus paket unggulan)

### 3.3 Text & Typography Contrast
- `--text-heading`: `#0f172a` (Slate 900 - kontras tinggi untuk judul dan headline)
- `--text-body`: `#334155` (Slate 700 - keterbacaan optimal artikel dan deskripsi)
- `--text-muted`: `#64748b` (Slate 500 - label sekunder, catatan kaki teknis)
- `--text-inverse`: `#ffffff` (Teks kontras di atas latar belakang gelap)

### 3.4 Feedback & Functional Accents
- `--accent-safety`: `#ea580c` (Safety Orange - efisiensi gas, burner api, peringatan teknis)
- `--accent-safety-bg`: `#fff7ed`
- `--accent-safety-border`: `#fed7aa`
- `--accent-trust`: `#16a34a` (Industrial Green - status ready stock, garansi resmi)
- `--accent-trust-bg`: `#f0fdf4`
- `--accent-trust-border`: `#bbf7d0`
- `--badge-hot-bg`: `#eff6ff`
- `--badge-hot-text`: `#1d4ed8`
- `--badge-hot-border`: `#93c5fd`

---

## 4. Typography Scale & Settings

Sistem tipografi menggunakan **Plus Jakarta Sans** sebagai font utama antarmuka.

### 4.1 Skala Hirarki
- **Display 1 (Hero Title)**: `2.5rem` s/d `3.5rem` (40px - 56px), Weight `800`, Line-height `1.15`, Letter-spacing `-0.03em`.
- **Heading 1 (Page Title)**: `2.0rem` s/d `2.5rem` (32px - 40px), Weight `700`, Line-height `1.2`, Letter-spacing `-0.025em`.
- **Heading 2 (Section Title)**: `1.5rem` s/d `1.875rem` (24px - 30px), Weight `700`, Line-height `1.25`, Letter-spacing `-0.02em`.
- **Heading 3 (Card / Item Title)**: `1.125rem` s/d `1.25rem` (18px - 20px), Weight `600`, Line-height `1.35`, Letter-spacing `-0.01em`.
- **Body Regular**: `1.0rem` (16px), Weight `400` / `500`, Line-height `1.6`.
- **Body Small / Specs**: `0.875rem` (14px), Weight `500`, Line-height `1.5`.
- **Micro / Metadata**: `0.75rem` (12px), Weight `600`, Letter-spacing `0.04em`, Text-transform `uppercase`.

### 4.2 Numeric & Metric Rules
Untuk seluruh penulisan nilai nominal, kapasitas mesin, dan voltase:
```css
font-variant-numeric: tabular-nums;
font-feature-settings: "tnum" 1, "cv05" 1;
```
Contoh:
- Rp 45.000.000
- 150 Watt (Listrik operasional)
- 15 Kg s/d 20 Kg (Kapasitas drum)

---

## 5. Spacing, Elevation, and Shadows

### 5.1 Spacing Rhythm
Mengikuti basis 4px grid:
- `space-1`: 4px
- `space-2`: 8px
- `space-3`: 12px
- `space-4`: 16px
- `space-6`: 24px
- `space-8`: 32px
- `space-12`: 48px
- `space-16`: 64px
- `space-24`: 96px

### 5.2 Elevation & Shadow Layers
- **Shadow Low (Card resting)**:
  `0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)`
- **Shadow Medium (Card interactive/featured)**:
  `0 4px 6px -1px rgba(15, 23, 42, 0.07), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`
- **Shadow High (Hover lift / Active card)**:
  `0 12px 24px -4px rgba(15, 23, 42, 0.08), 0 4px 8px -2px rgba(15, 23, 42, 0.04)`
- **Shadow Accent (Featured package glow)**:
  `0 10px 25px -5px rgba(9, 104, 232, 0.15), 0 8px 10px -6px rgba(9, 104, 232, 0.1)`

---

## 6. Component Blueprint Specifications

### 6.1 Package Tier Card (`.package-card`)
- **Struktur**:
  1. Header: Kategori badge, nama paket, dan peruntukan bisnis (misal: "Cocok untuk Ruko 1 Pintu").
  2. Pricing Block: Harga paket transparan dengan label "Investasi Lengkap Termasuk Instalasi". Angka bergaya tabular.
  3. Machine Equipment List: Daftar unit mesin dengan lencana kapasitas (misal: "2x Washer 15kg", "2x Dryer Gas 15kg").
  4. Technical Highlights Strip: Komparasi daya listrik (misal: "Hanya butuh 900VA - 1.300VA").
  5. Action Button: Full-width button dengan state hover jelas menuju WhatsApp konsultan teknis.
- **Featured / Recommended State**:
  - Diberikan border utama `2px solid var(--primary)`.
  - Disertai lencana atas: `Paling Dipilih Pengusaha Kalbar`.
  - Sedikit elevasi lebih tinggi (`transform: translateY(-4px)` pada desktop viewport).

### 6.2 Technical Metric Callout (`.metric-badge`)
- Kontainer kompak dengan border radius `8px` (`border: 1px solid var(--border-subtle)`).
- Mengelompokkan label metrik teknis (kapasitas, watt, tipe burner) dengan kontras tinggi.

### 6.3 Trust Pillar Block (`.trust-card`)
- Menampilkan 4 pilar utama My Equipment:
  1. Teknisi Lokal Siaga Kalbar (SLA servis cepat).
  2. Garansi Resmi & Sparepart Terjamin (stok gudang Pontianak).
  3. Konsultasi Desain & Tata Letak Instalasi (Plumbing & Ducting).
  4. Training Operasional & SOP Kasir/Sistem Koin Mandiri.

### 6.4 Specification Comparison Table (`.spec-table`)
- Alternating row background (`#ffffff` dan `#f8fafc`).
- Sticky header saat di-scroll pada perangkat tablet/mobile.
- Kolom penekanan daya hemat listrik diberi aksen latar hijau lembut (`#f0fdf4`).

---

## 7. Responsiveness & Mobile Ergonomics

- **Mobile Viewport (< 640px)**:
  - Tombol aksi utama sticky di bagian bawah layar jika pengguna berada pada halaman paket usaha (`.sticky-mobile-cta`).
  - Grid paket usaha beralih ke tata letak vertikal dengan separator jelas antar paket.
  - Ukuran target sentuh tombol minimal `48px` untuk kenyamanan jempol.
- **Desktop Viewport (>= 1024px)**:
  - Tata letak grid 3 kolom simetris untuk paket usaha utama.
  - Hover transition halus: `transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1)`.

---

## 8. Anti-Patterns & Quality Standards

- **DILARANG** menggunakan emoji dalam bentuk apapun (misal: centang emoji, api, roket, dll). Gunakan ikon SVG garis bersih.
- **DILARANG** menggunakan warna neon berlebih atau gradien multi-warna mencolok yang merusak citra korporat B2B.
- **DILARANG** menggunakan font angka non-tabular pada tabel harga atau perbandingan watt mesin.
- **DILARANG** menyembunyikan rincian mesin dalam paket usaha; kejelasan komponen adalah kunci kepercayaan calon mitra bisnis.
