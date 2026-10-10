# Perencanaan Pengembangan Template Landing Page Premium Blogspot

## 📝 Deskripsi Proyek
Proyek ini bertujuan untuk mengembangkan template landing page premium berbasis Blogspot (Blogger) yang dilengkapi dengan sistem perlindungan lisensi per domain. Template ini memanfaatkan teknologi modern agar lebih dinamis, cepat, dan mudah dikustomisasi oleh pengguna awam melalui menu Tata Letak (Layout) Blogspot.

## 🛠️ Technology Stack
1. **Frontend Template (Core):** XML Blogspot
2. **Frontend Logic & UI:** React JS
3. **Styling:** Tailwind CSS
4. **Backend (License Server):** Laravel
5. **Asset Hosting/CDN:** GitHub Repository (terhubung dengan CDN seperti jsDelivr)

## 🏗️ Arsitektur Sistem
1. **Penyimpanan Aset (GitHub & jsDelivr):** 
   - Kode React JS dan Tailwind CSS dikompilasi (build) dan disimpan di repository GitHub: `https://github.com/pesonaku/template-blogspot-premium`.
   - Template Blogspot (`template.xml`) memuat aset melalui CDN jsDelivr:
     - CSS: `https://cdn.jsdelivr.net/gh/pesonaku/template-blogspot-premium@main/dist/style.css`
     - JS: `https://cdn.jsdelivr.net/gh/pesonaku/template-blogspot-premium@main/dist/app.js`
2. **Sistem Lisensi (Laravel & React):**
   - Saat landing page diakses, skrip React JS membaca konfigurasi lisensi (`window.BloggerSettings.licenseKey`) dan nama domain (`window.location.hostname`).
   - Melakukan request ke API Backend Laravel (`/api/verify-license`).
   - Jika lisensi valid, landing page dirender. Jika tidak valid / kadaluarsa / domain tidak sesuai, sistem menampilkan pesan pemblokiran lisensi.
3. **Kustomisasi (Blogger Layout):**
   - Menggunakan `<b:section>` dan `<b:widget>` Blogspot di menu Tata Letak untuk mengatur lisensi, teks hero, warna, dan fitur tanpa menyentuh kode XML.

## 📋 Struktur Folder Proyek
```
template-blogspot-premium/
├── template.xml             # Template utama Blogspot
├── issue.md                 # Dokumentasi Issue & Rencana Proyek
├── package.json             # NPM dependencies (React, Vite, Tailwind)
├── vite.config.js           # Konfigurasi build single-bundle tanpa hash
├── tailwind.config.js       # Konfigurasi Tailwind CSS
├── postcss.config.js        # Konfigurasi PostCSS
├── src/
│   ├── main.jsx             # Entry point React
│   ├── App.jsx              # Komponen utama landing page
│   ├── index.css            # Stylesheet utama Tailwind
│   └── components/
│       ├── LicenseGuard.jsx # Komponen validasi lisensi domain
│       └── SkeletonHero.jsx # Komponen kerangka section
├── dist/                    # Folder hasil build (app.js & style.css)
└── backend-laravel/         # Implementasi API Server Lisensi (Laravel)
    ├── routes/api.php
    ├── app/Http/Controllers/LicenseController.php
    └── database/migrations/2026_10_10_000000_create_licenses_table.php
```
