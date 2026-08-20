# Marmara Market — Deploy Rehberi (AWS EC2)

Bu rehber, uygulamayı tek bir AWS EC2 free-tier instance'ında Docker Compose ile
canlıya almanı anlatır. Beş container çalışır: `postgres`, `app` (Next.js),
`socket` (gerçek zamanlı mesajlaşma), `nginx` (reverse proxy).

## 1. EC2 Instance Oluştur

1. AWS konsolunda EC2 → "Launch instance".
2. AMI: **Ubuntu 24.04 LTS**. Tip: **t2.micro** veya **t3.micro** (free tier).
3. Bir key pair oluştur/seç (SSH ile bağlanmak için).
4. Security group'ta şu portları aç:
   - 22 (SSH) — sadece kendi IP'ne kısıtlaman önerilir
   - 80 (HTTP)
   - 443 (HTTPS)
5. Instance'ı başlat ve public IP'sini not al.

SSH ile bağlan:

```bash
ssh -i your-key.pem ubuntu@<EC2_PUBLIC_IP>
```

## 2. Docker Kur

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker
sudo apt-get update && sudo apt-get install -y docker-compose-plugin git
```

## 3. Repoyu Çek

```bash
git clone <REPO_URL> marmara-market
cd marmara-market
```

(Henüz bir Git remote'un yoksa: `git init`, GitHub'da boş bir repo oluştur,
`git remote add origin <url>`, `git push -u origin main` ile önce kendi
makinenden gönder, sonra EC2'de `git clone` yap.)

## 4. AWS S3 Bucket (ilan fotoğrafları)

1. S3 konsolunda yeni bir bucket oluştur (örn. `marmara-market-uploads`).
   "Block all public access" ayarını **kapat** (fotoğraflar herkese açık
   okunabilir olacak).
2. Bucket policy ekle (sadece `listings/` altını herkese açık okunur yap):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadListingImages",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::marmara-market-uploads/listings/*"
    }
  ]
}
```

3. CORS ayarı ekle (tarayıcının presigned URL'e doğrudan yükleme yapabilmesi için):

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["PUT"],
    "AllowedOrigins": ["https://your-domain.com"],
    "ExposeHeaders": []
  }
]
```

4. IAM → yeni bir kullanıcı oluştur (sadece programatik erişim), bu bucket'a
   `s3:PutObject`/`s3:DeleteObject` izni veren bir policy ekle, **Access Key
   ID** ve **Secret Access Key** al.

## 5. AWS SES (OTP e-postaları)

1. SES konsolunda gönderen adresini veya domainini doğrula (Verified identities).
2. SES varsayılan olarak "sandbox" modda başlar — sadece doğrulanmış adreslere
   e-posta gönderebilirsin. Gerçek öğrencilere ulaşmak için **production
   access** talebi aç (SES konsolunda "Request production access").
3. Aynı IAM kullanıcısına (veya ayrı birine) `ses:SendEmail` izni ver.

## 6. `.env` Dosyasını Hazırla

```bash
cp .env.example .env
nano .env
```

Doldurman gerekenler: `POSTGRES_PASSWORD`, `DATABASE_URL` (şifreyle eşleşmeli),
`JWT_SECRET` (`openssl rand -hex 32`), `AWS_REGION`, `AWS_ACCESS_KEY_ID`,
`AWS_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME`, `SES_FROM_EMAIL`, `APP_ORIGIN`
(`https://your-domain.com`), `NEXT_PUBLIC_SOCKET_URL` (boş bırakabilirsin —
aynı domain üzerinden nginx yönlendirir), `INTERNAL_EMIT_SECRET`
(`openssl rand -hex 32`).

## 7. Uygulamayı Ayağa Kaldır

```bash
docker compose up -d --build
docker compose logs -f app
```

İlk açılışta `postgres` container'ı `infra/init.sql`'i otomatik çalıştırıp
tabloları oluşturur.

Bu noktada `http://<EC2_PUBLIC_IP>` adresinden (henüz SSL'siz) siteye
ulaşabilmen gerekir.

## 8. Domain ve SSL

1. Domain sağlayıcında bir **A kaydı** oluştur: `your-domain.com` → EC2 public IP.
2. DNS yayılana kadar bekle (`dig your-domain.com`).
3. Certbot ile sertifika al (webroot yöntemi, nginx zaten
   `/.well-known/acme-challenge/`'ı `certbot_www` volume'üne yönlendiriyor):

```bash
docker run --rm \
  -v marmara-market_certbot_www:/var/www/certbot \
  -v marmara-market_certbot_conf:/etc/letsencrypt \
  certbot/certbot certonly --webroot -w /var/www/certbot \
  -d your-domain.com --email you@example.com --agree-tos --no-eff-email
```

4. `infra/nginx.conf` içindeki 443 bloğunun yorumunu kaldır, `your-domain.com`
   kısmını gerçek domaininle değiştir; 80 portlu bloktaki `location /`
   içeriğini `return 301 https://$host$request_uri;` yap (acme-challenge
   location'ı olduğu gibi kalsın).
5. Nginx'i yeniden başlat: `docker compose restart nginx`.

Sertifika 90 günde bir yenilenmeli — bir cron job ile
`docker run --rm ... certbot renew` komutunu ayda bir çalıştırman yeterli.

## 9. Güncelleme (yeni kod deploy etme)

```bash
cd marmara-market
git pull
docker compose up -d --build
```

## 10. Sorun Giderme

```bash
docker compose ps                 # hangi container ayakta
docker compose logs -f app        # Next.js logları
docker compose logs -f socket     # mesajlaşma sunucusu logları
docker compose logs -f postgres   # veritabanı logları
docker compose exec postgres psql -U marmara -d marmara   # DB'ye bağlan
```
