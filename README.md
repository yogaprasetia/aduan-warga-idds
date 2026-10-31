# Layanan Aduan Warga (contoh IDDS)

Contoh web layanan publik sederhana yang mengikuti **INA Digital Design System (IDDS)** — https://design.inadigital.go.id.

Warga dapat:
- membaca cara menyampaikan aduan dan FAQ (beranda);
- mengirim aduan lewat formulir dengan validasi per kolom;
- menerima nomor tiket dan memantau statusnya (stepper + riwayat tindak lanjut).

Data disimpan di `localStorage` peramban (situs statis, tanpa server/database) — cocok untuk demo atau titik awal.

## Kepatuhan IDDS
- Komponen resmi `ina-*` dari `@idds/styles` + perilaku `@idds/js`: button, badge, alert, accordion, breadcrumb, text field, text area, radio, checkbox, stepper, table, toast.
- Font Inter dan ikon Tabler, tema `data-brand="inagov"` (ganti ke `panrb`, `bkn`, `lan`, `bgn`, dll.).
- Satu tombol utama per layar, label di atas kolom dengan tanda `*`, pesan galat spesifik di bawah kolom, status dengan badge + teks.
- Aksesibilitas: tautan "Lewati ke konten", fokus keyboard terlihat, `aria-invalid`/`aria-describedby`, `aria-current`, `role="alert"`.
- Responsif sampai lebar 390 px; semua aset lokal (berjalan tanpa internet).

## Menjalankan
```bash
python3 -m http.server 8093   # lalu buka http://localhost:8093
```
Atau buka di hosting statis mana pun (GitHub Pages, Netlify, server kantor).

## Struktur
- `index.html` — hasil build dari `src/index.tpl.html` (`python3 src/build.py` menyisipkan ikon Tabler & markup field).
- `app.css` — tata letak halaman berbasis token `--ina-*`.
- `app.js` — navigasi, validasi, tiket, status.
- `idds/` — aset resmi `@idds/styles`, `@idds/js`, font Inter, ikon Tabler (lisensi di `idds/LICENSES.txt`).

Isi kelurahan, alamat, dan data adalah fiktif.
