# marmaramarket

Marmara Üniversitesi öğrencilerine özel 2. el alışveriş / ilan platformu.
Hazırlanan tasarımın çalışan Vite + React uygulamasına dönüştürülmüş hâli.

## Çalıştırma

```bash
npm install
npm run dev      # http://localhost:5173
```

Diğer komutlar: `npm run build` (üretim derlemesi), `npm run preview` (derlemeyi önizle).

## Yapı

```
index.html            Google Fonts (Hanken Grotesk, Inter, Material Symbols)
src/
  main.jsx            giriş noktası
  App.jsx             tüm state + ekran yönlendirme (screen/hist)
  constants.js        marka renkleri, durum listeleri
  utils.js            chip / heart / decorate / filterItems
  index.css           global stiller, responsive kabuk (.app-shell)
  data/items.js       örnek ilanlar, kategoriler, teslim noktaları, mesajlar
  components/         Icon, ItemCard, ItemRow, BottomNav, ScreenHeader
  screens/            11 ekran (Home, Search, Detail, Seller, Fav, Post,
                      Pickup, Messages, Chat, Profile, Login)
design/
  MarmaraMarket.html  orijinal tasarım export'u (referans)
```

## Ekranlar

Anasayfa · Arama (filtreler) · İlan detayı · Satıcı profili · Favoriler ·
İlan ver (3 adımlı sihirbaz) · Teslim noktaları · Mesajlar · Sohbet · Profil · Giriş

Navigasyon `App.jsx` içindeki `screen` state'i ile yürür; `hist` dizisi geri
tuşunu besler. Alt navigasyon yalnızca `NAV_SCREENS` listesindeki ekranlarda görünür.

## Notlar

- **Veri geçicidir.** Tüm ilanlar, mesajlar ve kullanıcılar `src/data/items.js`
  içindeki sabit dizilerden gelir. Backend eklendiğinde bu modülün yerini API
  çağrıları alacak; ekranlar veriyi prop olarak aldığı için değişiklik App.jsx
  ile veri katmanında sınırlı kalır.
- **Giriş ekranı demodur.** "Doğrulama kodu gönder" kodu otomatik doldurur,
  gerçek e-posta doğrulaması yapılmaz.
- Tasarım mobil önceliklidir; geniş ekranda `--shell-width` (480px) ile
  ortalanır. Bu değeri `src/index.css` içinden değiştirebilirsin.
- Material Symbols yalnızca kullanılan 43 ikonla yüklenir (`index.html` içindeki
  `icon_names` parametresi). Yeni ikon eklersen o listeye de eklemen gerekir.
