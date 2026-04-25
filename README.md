# Sales Page Generator — Raden Mahesa

Aplikasi web untuk menghasilkan **sales page** (halaman penjualan) berbasis AI secara otomatis. Pengguna cukup memasukkan informasi produk, lalu sistem akan men-generate halaman penjualan lengkap (headline, benefit, fitur, testimoni, pricing, CTA, FAQ) yang siap dipakai dan diekspor ke HTML.

---

## 📚 Dokumentasi Tertulis

### 1. Penjelasan Singkat

Sales Page Generator adalah aplikasi **Single Page Application (SPA)** yang membantu pelaku bisnis, marketer, dan content creator membuat halaman penjualan profesional dalam hitungan detik. Cukup isi form berisi nama produk, deskripsi, fitur, target audiens, harga, dan unique selling point — AI akan otomatis menyusun copywriting yang **conversion-focused** lengkap dengan struktur sales page modern.

Fitur utama:
- 🔐 Autentikasi user (signup/login dengan email & password)
- ✍️ Form input produk yang sederhana
- 🤖 Generate sales page otomatis menggunakan AI
- 🎨 Multiple template untuk preview hasil
- 💾 Simpan & kelola halaman di dashboard
- 📤 Export hasil ke file HTML siap deploy
- 🔄 Regenerate per-section (regenerate hanya bagian tertentu tanpa harus ulang semua)

---

### 2. Pendekatan

Pendekatan yang digunakan adalah **AI-Assisted Content Generation** dengan arsitektur **client-heavy + serverless backend**:

1. **Frontend SPA** — seluruh UI dirender di sisi client (React + Vite). Tidak perlu server tradisional.
2. **Backend-as-a-Service** — autentikasi, database, dan storage dikelola oleh Supabase (Lovable Cloud), tanpa perlu menulis dan maintain server sendiri.
3. **AI Generation via Edge Function** — proses generate konten dilakukan di Supabase Edge Function (Deno) yang memanggil AI Gateway. Pendekatan ini menjaga API key tetap aman di server, bukan di client.
4. **Structured Output dengan Tool Calling** — alih-alih parsing teks bebas dari AI, kami menggunakan **function calling** dengan JSON schema sehingga output AI selalu terstruktur dan valid (headline, benefits, features, dst.). Ini mengurangi error parsing & meningkatkan reliability.
5. **Type-safe routing** — menggunakan TanStack Router untuk routing dengan validasi TypeScript end-to-end.

---

### 3. Tools

| Kategori | Tools | Fungsi |
|----------|-------|--------|
| **Frontend Framework** | React 19 + TypeScript | UI library dan type safety |
| **Build Tool** | Vite 7 | Bundler super cepat untuk dev & production build |
| **Routing** | TanStack Router | File-based routing yang type-safe |
| **State Management** | TanStack Query | Cache & sinkronisasi data dari backend |
| **Styling** | Tailwind CSS v4 + shadcn/ui | Utility-first CSS + komponen UI siap pakai |
| **Backend** | Supabase (Lovable Cloud) | Auth, PostgreSQL database, storage |
| **Serverless Functions** | Supabase Edge Functions (Deno) | Endpoint untuk generate AI |
| **AI Model** | Google Gemini (via AI Gateway) | Model LLM untuk generate copywriting |
| **Form & Validation** | React Hook Form + Zod | Validasi input user |
| **Deployment** | Vercel / GitHub Pages | Hosting static SPA |
| **Package Manager** | npm (dengan `--legacy-peer-deps`) | Instalasi dependencies |

---

### 4. Logika

Alur kerja sistem secara end-to-end:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐     ┌────────────┐
│   User       │────▶│  React SPA   │────▶│  Edge Function   │────▶│ AI Gateway │
│  (browser)   │     │  (Frontend)  │     │  (Supabase/Deno) │     │  (Gemini)  │
└──────────────┘     └──────┬───────┘     └────────┬─────────┘     └─────┬──────┘
                            │                      │                     │
                            │                      │◀────────────────────┘
                            │                      │  Structured JSON
                            │◀─────────────────────┘  (tool calling)
                            │
                            ▼
                     ┌──────────────┐
                     │  Supabase DB │
                     │  (Postgres)  │
                     └──────────────┘
```

**Langkah detail:**

1. **Autentikasi**
   - User signup/login melalui Supabase Auth.
   - Session disimpan di localStorage (managed by Supabase client).
   - Route `_authenticated/*` diproteksi — redirect ke `/login` jika belum login.

2. **Input Produk**
   - User mengisi form di halaman `/new` (komponen `ProductForm`).
   - Input divalidasi dengan Zod sebelum dikirim.

3. **Request Generate**
   - Frontend memanggil `supabase.functions.invoke("generate-sales-page", { body: { input } })`.
   - Request dikirim ke Edge Function dengan JWT user untuk verifikasi.

4. **AI Generation (Edge Function)**
   - Edge Function membangun prompt:
     - **System prompt**: instruksi untuk AI berperan sebagai elite direct-response copywriter.
     - **User prompt**: data produk yang user inputkan.
   - Memanggil AI Gateway dengan **function/tool calling** + JSON schema (`build_sales_page`).
   - AI **wajib** mengembalikan output sesuai schema (headline, subheadline, description, benefits[], features[], socialProof[], pricing, cta, faq[]).
   - Error handling: 429 (rate limit), 402 (credits habis), 500 (gateway error).

5. **Render & Simpan**
   - Hasil di-render di `SalesPageView` dengan template terpilih (komponen `TemplatePicker`).
   - User bisa menyimpan ke database (table `sales_pages`) untuk diakses lagi nanti dari dashboard.

6. **Regenerate Section**
   - Jika user tidak puas dengan satu bagian (misal headline), bisa regenerate section tersebut tanpa men-generate ulang seluruh halaman.

7. **Export**
   - User bisa mengekspor hasil ke file HTML standalone (`export-html.ts`) yang siap di-host di mana saja.

---

## 🎬 Video Penjelasan

### Walkthrough Sistem

> 📹 **Link Video:** _[Tambahkan link YouTube / Google Drive di sini]_

Video walkthrough mendemonstrasikan:
1. **Onboarding** — proses signup & login user baru.
2. **Membuat halaman baru** — mengisi form produk dari awal sampai hasil generate muncul.
3. **Memilih template** — preview hasil dengan beberapa pilihan template visual.
4. **Regenerate per-section** — demo regenerate bagian tertentu (misal headline atau pricing).
5. **Dashboard** — menampilkan riwayat halaman yang sudah dibuat.
6. **Export HTML** — mengunduh hasil sebagai file HTML siap deploy.

### Cara Kerja

Penjelasan teknis yang dibahas di video:

1. **Frontend rendering** — bagaimana React + TanStack Router meng-handle navigasi dan state.
2. **Auth flow** — alur login/signup serta proteksi route `_authenticated/*`.
3. **Pemanggilan Edge Function** — bagaimana frontend secara aman memanggil function dengan JWT user.
4. **AI Tool Calling** — penjelasan kenapa kami pakai structured output (function calling) dibanding parsing teks bebas, dan bagaimana JSON schema menjamin validitas output.
5. **Database & RLS** — bagaimana Row-Level Security memastikan user hanya bisa akses data miliknya sendiri.
6. **Deployment pipeline** — proses build & deploy ke Vercel.

---

## 🚀 Cara Menjalankan Lokal

```bash
# Install dependencies
npm install --legacy-peer-deps

# Jalankan dev server
npm run dev

# Build untuk production
npm run build

# Preview hasil build
npm run preview
```

Pastikan file `.env` berisi:
```env
VITE_SUPABASE_URL=https://<project-id>.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=<anon-key>
VITE_SUPABASE_PROJECT_ID=<project-id>
```

---

## 📦 Deployment

- **Vercel** → lihat [`DEPLOY_VERCEL.md`](./DEPLOY_VERCEL.md)
- **GitHub Pages** → lihat [`DEPLOY_GITHUB_PAGES.md`](./DEPLOY_GITHUB_PAGES.md)

---

## 👤 Author

**Raden Mahesa**

---

_Built with ❤️ using React, TanStack Start, Supabase, and AI._