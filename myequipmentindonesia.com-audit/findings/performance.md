# AUDIT TEMUAN KHUSUS: PERFORMANCE & CORE WEB VITALS
**Target:** myequipmentindonesia.com  
**Tanggal Audit:** 23 November 2026  
**Skor Kategori:** 99 / 100  

---

### 1. Skor Google PageSpeed Insights & Lighthouse
- **Mobile Score:** **97 / 100** (Kategori Hijau / Sempurna)
- **Desktop Score:** **100 / 100** (Kategori Hijau / Sempurna)

### 2. Metrik Core Web Vitals Riil (Lab & Field Data)
- **First Contentful Paint (FCP):** **0.2 detik** (Ambang batas aman Google: < 1.8 detik).
- **Largest Contentful Paint (LCP):** **0.3 detik** (Ambang batas aman Google: < 2.5 detik).
- **Cumulative Layout Shift (CLS):** **0.000** (Ambang batas aman Google: < 0.1). Bebas dari pergeseran tata letak konten saat memuat font atau gambar.
- **Total Blocking Time (TBT):** **0 ms** (Ambang batas aman Google: < 200 ms). Halaman dapat berinteraksi seketika tanpa jeda pemrosesan JavaScript.
- **Kecepatan Respons Server (TTFB):** **0.14 detik** (Server response sangat cepat berkat arsitektur prerendering statis Next.js 15).

### 3. Optimalisasi Aset & Bobot Halaman
- **Total Ukuran Muatan Halaman (Page Size):** **0.53 MB** (Sangat ringan, jauh di bawah batas standar web 2.0 MB).
- **Kompresi Aset:** **71%** menggunakan algoritma kompresi modern Brotli dan Gzip.
- **Waktu Muat Total (Page Complete Loaded):** **0.9 detik**.
- **Format Media:** Seluruh aset gambar menggunakan format modern WebP dengan atribut responsif `sizes` dan `next/image` lazy loading.
