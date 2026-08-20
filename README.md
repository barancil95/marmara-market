# Marmara Market

Marmara Üniversitesi öğrencilerine özel kampüs pazar yeri. Sadece
`@marun.edu.tr` e-postasıyla kayıt olunabilir.

## Özellikler

- E-posta OTP ile giriş (şifresiz, domain kısıtlı)
- İlan verme (fotoğraflı), kategori/metin ile arama
- Alıcı/satıcı arası gerçek zamanlı mesajlaşma
- "Satıldı" olarak işaretleme (ödeme uygulama dışında, kampüste yapılır)

## Teknoloji

Next.js (App Router, TypeScript) + PostgreSQL + AWS S3 (fotoğraflar) + AWS SES
(OTP e-postaları) + Socket.io (mesajlaşma). Tamamı self-hosted; Supabase/Stripe
gibi ücretli SaaS servisleri kullanılmıyor. Detaylar için `.claude/plans` içindeki
plana bakabilirsin; canlıya alma adımları için [DEPLOY.md](./DEPLOY.md).

## Yerel Geliştirme

1. Bağımlılıkları kur: `npm install`
2. `.env.local` dosyasını doldur (örnek: `.env.example`). Yerelde AWS
   olmadan da geliştirebilirsin: S3 yerine dosyalar `public/uploads`'a
   yazılır, SES yerine OTP kodu terminale basılır (`src/lib/storage.ts`,
   `src/app/api/auth/request-otp/route.ts` — sadece `NODE_ENV !== "production"`
   iken).
3. Yerel bir Postgres başlat, örn:
   ```bash
   docker run -d --name marmara-postgres-dev \
     -e POSTGRES_USER=marmara -e POSTGRES_PASSWORD=devpass -e POSTGRES_DB=marmara \
     -p 127.0.0.1:5433:5432 \
     -v "$(pwd)/infra/init.sql:/docker-entrypoint-initdb.d/init.sql:ro" \
     postgres:16-alpine
   ```
4. `npm run dev` — bu, Next.js (`:3000`) ve mesajlaşma sunucusunu (`:3001`)
   aynı anda başlatır.

## Mimari Notu

Next.js ve Socket.io **iki ayrı process** olarak çalışır (`socket-server.ts`).
Next.js API route'ları yeni bir mesaj kaydettiğinde, mesajlaşma sunucusuna
küçük bir dahili HTTP isteğiyle (`INTERNAL_EMIT_SECRET` ile korunan
`/internal/emit`) haber verir, o da Socket.io üzerinden ilgili kullanıcılara
anlık iletir. Bu ayrım, Next.js'in kendi sunucu dahili modüllerinin `tsx` ile
aynı process'te custom server olarak çalıştırılınca çakışmasını (bilinen bir
uyumluluk sorunu) önlemek için tercih edildi.

## Deploy

Bkz. [DEPLOY.md](./DEPLOY.md) — AWS EC2 üzerinde Docker Compose ile canlıya alma.
