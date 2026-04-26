# Deploy ke Vercel

Aplikasi ini SPA murni (Vite + React + TanStack Router). Auth & database memakai Supabase Cloud, AI generation memakai Supabase Edge Function — semua jalan dari client.

## Cara 1: Via Dashboard Vercel (Termudah)

1. Push project ke GitHub.
2. Buka https://vercel.com/new → **Import** repo Anda.
3. Vercel otomatis mendeteksi Vite. Pastikan setting:
   - **Framework Preset**: Vite (atau Other)
   - **Build Command**: `bun run build` (atau `npm run build`)
   - **Output Directory**: `dist`
4. Tambahkan **Environment Variables** (klik *Environment Variables*):
   - `VITE_SUPABASE_URL` = `https://zlsaqsplstraxvbrazsj.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` = (lihat file `.env` di project)
   - `VITE_SUPABASE_PROJECT_ID` = `zlsaqsplstraxvbrazsj`
5. Klik **Deploy**. Selesai 🎉

## Cara 2: Via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel            # deploy preview
vercel --prod     # deploy production
```

Saat ditanya, isi env vars yang sama seperti di atas.

## Catatan Penting

- File `vercel.json` sudah dibuat — sudah handle SPA fallback (semua route diarahkan ke `index.html`), jadi refresh di `/dashboard`, `/login`, dst. tidak akan 404.
- **Auth Supabase**: setelah dapat URL Vercel (misal `https://nama-app.vercel.app`), tambahkan URL itu ke **Allowed Redirect URLs** di Supabase Auth settings agar login/signup berfungsi.
- Jika pakai **custom domain** Vercel, tambahkan juga domainnya ke Allowed Redirect URLs.