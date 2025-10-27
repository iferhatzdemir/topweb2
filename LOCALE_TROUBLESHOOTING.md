# Locale Sorun Giderme Kılavuzu

## 🔴 Sorun: Site İngilizce Açılıyor (Türkçe Olması Gerekiyor)

### Neden Oluyor?

Tarayıcınızda **eski bir cookie** var ve bu cookie'de `i18next=en` değeri kayıtlı. Middleware önce cookie'yi kontrol ediyor, bu yüzden İngilizce açılıyor.

### ✅ Hızlı Çözüm

#### Yöntem 1: Cookie'yi Manuel Silme

1. **Chrome/Edge:**
   - `F12` tuşuna bas (Developer Tools)
   - **Application** tab'ına git
   - Sol menüden **Cookies** → **http://localhost:3000**
   - `i18next` cookie'sini bul ve sağ tık → **Delete**
   - `F5` ile sayfayı yenile

2. **Firefox:**
   - `F12` tuşuna bas
   - **Storage** tab'ına git
   - **Cookies** → **http://localhost:3000**
   - `i18next` satırına sağ tık → **Delete**
   - `F5` ile sayfayı yenile

3. **Safari:**
   - `Option + Command + C` (Geliştirici menüsü)
   - **Storage** tab'ına git
   - **Cookies** altında `i18next`'i sil

#### Yöntem 2: Test Sayfası Kullan

```bash
# Tarayıcıda aç:
http://localhost:3000/test-locale
```

Bu sayfada:
- ✅ Mevcut locale bilgilerini görebilirsiniz
- ✅ "Cookie'yi Sil ve Yenile" butonuna tıklayın

#### Yöntem 3: Incognito/Private Mode

Gizli sekme açın (cookie'ler temiz):
```bash
Chrome: Ctrl + Shift + N
Firefox: Ctrl + Shift + P
Safari: Command + Shift + N
```

Ardından:
```
http://localhost:3000
```

---

## 📋 Dil Öncelik Sırası

Middleware şu sırayla kontrol eder:

```
1. URL Path (/en veya /en/*)     → EN
2. Cookie (i18next)              → Cookie'deki dil
3. Varsayılan                    → TR (Türkçe)
```

**Önemli:** Tarayıcı dili (`Accept-Language`) ARTIK kullanılmıyor!

---

## 🧪 Test Senaryoları

### Senaryo 1: Temiz Başlangıç (Cookie Yok)

```bash
URL: http://localhost:3000/
Beklenen: Türkçe (TR)
Cookie: i18next=tr (otomatik oluşur)
```

### Senaryo 2: İngilizce'ye Geçiş

```bash
URL: http://localhost:3000/en
Beklenen: İngilizce (EN)
Cookie: i18next=en (güncellenir)
```

### Senaryo 3: Cookie Var (EN), URL Normal

```bash
URL: http://localhost:3000/products
Cookie: i18next=en
Beklenen: İngilizce (EN) - Cookie'den
```

### Senaryo 4: Cookie Var (EN), URL TR'ye Zorlar

```bash
URL: http://localhost:3000/
Cookie: i18next=en
Beklenen: Türkçe (TR) - Ana sayfa her zaman TR
Cookie: i18next=tr (TR'ye güncellenir)
```

---

## 🔍 Debugging

### Test Sayfasını Kullan

```bash
http://localhost:3000/test-locale
```

Bu sayfa şunları gösterir:
- ✅ `x-locale` header değeri
- ✅ `i18next` cookie değeri
- ✅ `Accept-Language` header
- ✅ Varsayılan dil (TR)

### DevTools Console

```javascript
// Cookie'yi kontrol et
document.cookie

// Cookie'yi sil
document.cookie = 'i18next=; path=/; max-age=0'

// Sayfayı yenile
window.location.reload()
```

### Server Logs

Development mode'da middleware logları:

```bash
npm run dev
```

Terminalde şu satırı `middleware.js`'e ekleyerek debug edebilirsiniz:

```javascript
console.log('🌍 Locale:', {
  pathname,
  localeFromQuery,
  pathnameLocale,
  cookieLocale: getCookieLocale(request),
  finalLocale: locale
});
```

---

## ⚙️ Teknik Detaylar

### Middleware Akışı

```
1. Request gelir: http://localhost:3000/products
2. Middleware kontrol eder:
   - URL'de /en var mı? Hayır
   - Query'de ?locale=en var mı? Hayır
   - Cookie'de i18next var mı?
     - Evet → i18next=en → locale = 'en'
     - Hayır → locale = 'tr' (varsayılan)
3. Response header'a ekler: x-locale: en
4. Cookie'ye kaydeder: i18next=en
5. Layout header'dan okur: const locale = headers().get('x-locale')
6. HTML render: <html lang="en">
```

### Rewrites (next.config.mjs)

```javascript
/en           →  /?locale=en
/en/products  →  /products?locale=en
```

Bu sayede `/en` route'u çalışır ama fiziksel klasör gerekmez.

---

## 🚀 Production'a Çıkmadan Önce

### 1. Cookie Temizleme Talimatı Ekle

Kullanıcılara yanlış dil açılırsa:

```
Ayarlar → Gizlilik → Site Ayarları →
yourdomain.com → Çerezleri Temizle
```

### 2. Dil Değiştirici Butonu

`LanguageSwitcher` component'ini header'a ekleyin:

```jsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

<LanguageSwitcher currentLocale={locale} />
```

### 3. SEO Kontrolü

Tüm sayfalarda `<html lang={locale}>` doğru mu kontrol edin:

```bash
# View source:
http://localhost:3000/         → <html lang="tr">
http://localhost:3000/en       → <html lang="en">
```

---

## 📝 Sık Sorulan Sorular

### S: Neden tarayıcı dilini kullanmıyoruz?

**C:** Kullanıcı deneyimi için. Eğer kullanıcı bir kere Türkçe'yi seçtiyse, tarayıcı dili İngilizce bile olsa Türkçe'de kalmalı. Cookie ile bu tercihi hatırlıyoruz.

### S: Cookie'yi silmeden Türkçe'ye dönmek mümkün mü?

**C:** Evet, ana sayfaya gidin:

```
http://localhost:3000/
```

Veya LanguageSwitcher component'ini kullanın.

### S: /en route'u 404 veriyor?

**C:** Development server'ı yeniden başlatın:

```bash
npm run dev
```

Rewrites'ın yüklenmesi için gerekli.

### S: Production'da çalışır mı?

**C:** Evet! Build'den sonra test edin:

```bash
npm run build
npm run start

# Test:
http://localhost:3000/
http://localhost:3000/en
```

---

## 🆘 Hala Çalışmıyor mu?

### Full Reset

```bash
# 1. Server'ı durdur (Ctrl+C)

# 2. Node modules ve cache'i temizle
rm -rf node_modules .next
npm install

# 3. Cookie'leri tamamen temizle (Tarayıcı ayarları)

# 4. Server'ı başlat
npm run dev

# 5. Incognito mode'da test et
http://localhost:3000/
```

### Hala Sorun Varsa

1. Test sayfasını kontrol edin: `http://localhost:3000/test-locale`
2. Ekran görüntüsü alın
3. Console'daki hataları not edin
4. Developer Tools → Network → Headers bölümünü kontrol edin

---

**Versiyon:** 1.0.0
**Son Güncelleme:** 24.10.2025
