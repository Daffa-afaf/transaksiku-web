# Transaksiku Web

Dashboard React + Tailwind untuk mengelola transfer, saldo, laporan, serta preferensi aplikasi. Sudah ada login gate, layout bertema, dan pengambilan data dengan cache via React Query.

## Fitur
- Login sebelum masuk ke shell aplikasi
- Alur transfer dengan form, daftar transaksi, dan komponen kartu yang bisa dipakai ulang
- Statistik dan grafik dashboard (Recharts) untuk ringkasan cepat
- Halaman Rekening dan Laporan dengan tabel yang dapat digunakan ulang
- Halaman Settings dengan konteks tema/preferensi, plus helper toast dan modal
- State loading/error bawaan lewat komponen UI reusable

## Tech Stack
- React 18 + React Router 7
- Tailwind CSS 3 (PostCSS + autoprefixer)
- React Query (@tanstack/react-query) untuk cache data
- Recharts untuk visualisasi
- React Scripts (CRA) sebagai tooling build

## Struktur Proyek (ringkas)
```
transaksiku/
|-- public/
|-- src/
|   |-- components/       # atoms, molecules, stats dashboard, modal/toast, dll.
|   |-- contexts/         # Preferences context (tema, toggle)
|   |-- hooks/            # Logika settings
|   |-- layout/           # Header, Sidebar shell
|   |-- pages/            # Dashboard, Transfer, Rekening, Laporan, Settings, Login
|   |-- services/         # Helper data (dashboard, laporan, rekening, settings)
|   `-- utils/            # Dummy data dan toast helpers
`-- tailwind.config.js
```

## Memulai
Prasyarat: Node.js 18+ dan npm.

```bash
# install dependency
npm install

# jalankan dev server (http://localhost:3000)
npm start

# jalankan test (default CRA)
npm test

# build produksi
npm run build
```

## Skrip
- npm start: menjalankan development server dengan hot reload
- npm run build: build produksi ke folder build/
- npm test: CRA test runner
- npm run eject: mengeluarkan konfigurasi CRA (irreversible)

## Catatan
- Tidak ada environment variable wajib; dummy data ada di src/utils dan helper service di src/services.
- Ubah konfigurasi Tailwind di tailwind.config.js dan gaya global di src/index.css.
- Untuk deploy, layani output build/ di hosting statis (Netlify, Vercel, dsb.).
