
-- Buat user demo di auth.users dengan password ter-hash (bcrypt)
DO $$
DECLARE
  demo_id uuid := gen_random_uuid();
  sales_id uuid := gen_random_uuid();
  admin_id uuid := gen_random_uuid();
BEGIN
  -- Demo user
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'demo@pageforge.app') THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', demo_id, 'authenticated', 'authenticated',
      'demo@pageforge.app', crypt('Demo1234!', gen_salt('bf')),
      now(), '{"provider":"email","providers":["email"]}'::jsonb,
      '{"display_name":"Demo User"}'::jsonb,
      now(), now(), '', '', '', ''
    );
    INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    VALUES (gen_random_uuid(), demo_id,
      jsonb_build_object('sub', demo_id::text, 'email', 'demo@pageforge.app', 'email_verified', true),
      'email', demo_id::text, now(), now(), now());
  END IF;

  -- Sales user
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'sales@pageforge.app') THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', sales_id, 'authenticated', 'authenticated',
      'sales@pageforge.app', crypt('Sales1234!', gen_salt('bf')),
      now(), '{"provider":"email","providers":["email"]}'::jsonb,
      '{"display_name":"Sales Team"}'::jsonb,
      now(), now(), '', '', '', ''
    );
    INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    VALUES (gen_random_uuid(), sales_id,
      jsonb_build_object('sub', sales_id::text, 'email', 'sales@pageforge.app', 'email_verified', true),
      'email', sales_id::text, now(), now(), now());
  END IF;

  -- Admin user
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@pageforge.app') THEN
    INSERT INTO auth.users (
      instance_id, id, aud, role, email, encrypted_password,
      email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
      created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
    ) VALUES (
      '00000000-0000-0000-0000-000000000000', admin_id, 'authenticated', 'authenticated',
      'admin@pageforge.app', crypt('Admin1234!', gen_salt('bf')),
      now(), '{"provider":"email","providers":["email"]}'::jsonb,
      '{"display_name":"Admin"}'::jsonb,
      now(), now(), '', '', '', ''
    );
    INSERT INTO auth.identities (id, user_id, identity_data, provider, provider_id, last_sign_in_at, created_at, updated_at)
    VALUES (gen_random_uuid(), admin_id,
      jsonb_build_object('sub', admin_id::text, 'email', 'admin@pageforge.app', 'email_verified', true),
      'email', admin_id::text, now(), now(), now());
  END IF;
END $$;

-- Pastikan profiles ter-create (kalau trigger handle_new_user belum jalan)
INSERT INTO public.profiles (id, email, display_name)
SELECT u.id, u.email, COALESCE(u.raw_user_meta_data->>'display_name', split_part(u.email, '@', 1))
FROM auth.users u
WHERE u.email IN ('demo@pageforge.app','sales@pageforge.app','admin@pageforge.app')
ON CONFLICT (id) DO NOTHING;

-- Tambah contoh sales pages dummy
INSERT INTO public.sales_pages (user_id, product_name, product_description, features, target_audience, price, unique_selling_point, template, content)
SELECT
  u.id,
  'Kursus Digital Marketing Pro',
  'Pelatihan online lengkap untuk menguasai digital marketing dari nol hingga mahir.',
  'Video HD, sertifikat, mentoring grup, akses seumur hidup',
  'Pemula yang ingin berkarir di digital marketing',
  'Rp 499.000',
  'Satu-satunya kursus dengan mentoring 1-on-1 mingguan',
  'modern',
  '{"headline":"Kuasai Digital Marketing dalam 30 Hari","subheadline":"Kurikulum praktis dari praktisi industri","benefits":[{"title":"Materi Lengkap","description":"50+ modul video berkualitas HD"},{"title":"Mentoring Pribadi","description":"Sesi 1-on-1 dengan praktisi senior"},{"title":"Sertifikat Resmi","description":"Diakui industri & LinkedIn"}],"socialProof":{"testimonials":[{"name":"Budi S.","role":"Founder UMKM","quote":"Omzet naik 3x dalam 2 bulan!"}],"stats":["10.000+ alumni","Rating 4.9/5"]},"cta":{"primary":"Daftar Sekarang","secondary":"Lihat Kurikulum"},"faq":[{"question":"Apakah cocok untuk pemula?","answer":"Ya, kurikulum dirancang dari nol."}]}'::jsonb
FROM auth.users u WHERE u.email = 'demo@pageforge.app'
AND NOT EXISTS (SELECT 1 FROM public.sales_pages sp WHERE sp.user_id = u.id);

INSERT INTO public.sales_pages (user_id, product_name, product_description, features, target_audience, price, unique_selling_point, template, content)
SELECT
  u.id,
  'Smartwatch FitPro X1',
  'Jam tangan pintar dengan monitor kesehatan 24/7 dan baterai tahan 14 hari.',
  'Heart rate, SpO2, GPS, waterproof IP68, 100+ sport modes',
  'Profesional aktif dan pecinta olahraga',
  'Rp 1.299.000',
  'Baterai paling awet di kelasnya — 14 hari nonstop',
  'minimal',
  '{"headline":"Kesehatan & Performa di Pergelangan Tangan Anda","subheadline":"FitPro X1 — partner aktivitas harian Anda","benefits":[{"title":"Monitor 24/7","description":"Pantau detak jantung & oksigen darah real-time"},{"title":"Baterai 14 Hari","description":"Lupakan charger, fokus pada aktivitas"},{"title":"Tahan Air IP68","description":"Aman untuk renang & olahraga ekstrem"}],"socialProof":{"testimonials":[{"name":"Ratna A.","role":"Marathon Runner","quote":"Akurasi GPS-nya luar biasa!"}],"stats":["50.000+ pengguna","Garansi 1 tahun"]},"cta":{"primary":"Beli Sekarang","secondary":"Spesifikasi Lengkap"},"faq":[{"question":"Apakah kompatibel dengan iPhone?","answer":"Ya, mendukung iOS 12+ dan Android 6+."}]}'::jsonb
FROM auth.users u WHERE u.email = 'sales@pageforge.app'
AND NOT EXISTS (SELECT 1 FROM public.sales_pages sp WHERE sp.user_id = u.id);
