# License Server (Laravel Backend)

Server API backend ini bertugas memvalidasi kode lisensi domain untuk template Blogspot (`pesonaku/template-blogspot-premium`).

## 🚀 Fitur
- **Verifikasi Lisensi Realtime:** Endpoint `POST /api/verify-license` menerima `license_key` dan `domain`.
- **Domain Normalizer:** Otomatis membersihkan `http://`, `https://`, `www.`, port, dan path agar pencocokan domain akurat.
- **CORS Enabled:** Mendukung request langsung dari domain klien Blogspot.
- **Masa Berlaku:** Mendukung lisensi berbatas waktu (*expiration date*) dan status *active/suspended/expired*.

## 🛠️ Instalasi & Setup
1. Buat project Laravel atau letakkan controller & migration ini ke project Laravel Anda:
   ```bash
   composer create-project laravel/laravel license-server
   ```
2. Jalankan migration database:
   ```bash
   php artisan migrate
   ```
3. Uji endpoint verifikasi via cURL:
   ```bash
   curl -X POST https://your-domain.com/api/verify-license \
     -H "Content-Type: application/json" \
     -d '{"license_key":"PREM-XXXX-XXXX-XXXX","domain":"namablog.blogspot.com"}'
   ```
