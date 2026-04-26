# Deploy ke GitHub Pages

Aplikasi ini adalah **SPA (Single Page Application)**. Auth & database tetap memakai Supabase (cloud), AI generation memakai Supabase Edge Function — keduanya jalan dari client tanpa butuh server.

## Setup (User/Org repo: `username.github.io`)

1. **Buat repo** bernama persis `username.github.io` di GitHub.
2. **Push semua kode** ke branch `main`.
3. Di repo GitHub → **Settings → Pages**:
   - Source: pilih **GitHub Actions**
4. Di repo GitHub → **Settings → Secrets and variables → Actions** → tambahkan secrets:
   - `VITE_SUPABASE_URL` → `https://zlsaqsplstraxvbrazsj.supabase.co`
   - `VITE_SUPABASE_PUBLISHABLE_KEY` → (dari file `.env`)
   - `VITE_SUPABASE_PROJECT_ID` → `zlsaqsplstraxvbrazsj`
5. **Push ke `main`** → workflow `.github/workflows/deploy.yml` otomatis build & deploy.

Site akan tersedia di `https://username.github.io`.

## Build Lokal

```bash
bun install
bun run build      # output: dist/
bun run preview    # uji hasil build
```

## Catatan

- File `index.html` ada di root (Vite default). File ini yang akan jadi entry point GitHub Pages.
- File `public/404.html` menangani SPA deep-link (refresh halaman seperti `/dashboard` tidak akan 404).
- Auth Supabase: tambahkan URL `https://username.github.io` ke **Allowed Redirect URLs** di Supabase Auth settings.