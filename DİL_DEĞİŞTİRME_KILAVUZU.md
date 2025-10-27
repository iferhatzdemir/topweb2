# 🌍 Dil Değiştirme Kılavuzu

## Dil Değiştirme Nasıl Çalışıyor?

Broccoli projesinde dil değiştirme sistemi şu şekilde çalışır:

### 1. 📍 Dil Seçici (LanguageSwitcher)

Header'ın sağ üst köşesinde bir dil seçici bulunur.

**Lokasyon**: `src/components/LanguageSwitcher.js`

```jsx
<div className="ltn__language-menu">
  <LanguageSwitcher currentLocale={currentLocale} />
</div>
```

### 2. 🔄 Dil Değiştirme Akışı

Kullanıcı dil seçiciye tıkladığında:

```
1. Kullanıcı "English" veya "Türkçe" seçer
   ↓
2. Cookie'ye kaydedilir (i18next=en veya i18next=tr)
   ↓
3. URL değişir:
   - TR için: http://localhost:3000/
   - EN için: http://localhost:3000/en
   ↓
4. Sayfa yenilenir (window.location.href)
   ↓
5. Middleware cookie'yi okur ve locale'i belirler
   ↓
6. Tüm komponentler yeni dilde render edilir
```

### 3. 🍪 Cookie Yönetimi

Dil tercihi tarayıcıda 1 yıl boyunca saklanır:

```javascript
document.cookie = `i18next=${newLocale}; path=/; max-age=31536000`;
```

**Cookie adı**: `i18next`
**Değerler**: `tr` veya `en`
**Süre**: 1 yıl (31536000 saniye)

### 4. 🛣️ URL Yapısı

Dil URL'de prefix olarak gösterilir:

| Dil | URL Örneği | Açıklama |
|-----|-----------|----------|
| 🇹🇷 TR (varsayılan) | `/` | Prefix yok |
| 🇹🇷 TR | `/products/1` | Türkçe ürün detayı |
| 🇬🇧 EN | `/en` | İngilizce ana sayfa |
| 🇬🇧 EN | `/en/products/1` | İngilizce ürün detayı |

### 5. ⚙️ Middleware

Middleware her istekte locale'i belirler:

**Lokasyon**: `src/middleware.js`

**Öncelik sırası**:
1. URL'deki locale (`/en`)
2. Query parameter (`?locale=en`)
3. Cookie (`i18next=en`)
4. Varsayılan (`tr`)

```javascript
// Middleware locale'i header'a ekler
response.headers.set('x-locale', locale);
```

---

## 🖱️ Kullanım Senaryoları

### Senaryo 1: İlk Ziyaret

```
Kullanıcı → http://localhost:3000
↓
Middleware → Cookie yok, varsayılan TR seç
↓
Sayfa → Türkçe gösterilir
↓
Header dil seçici → "Türkçe" gösterilir
```

### Senaryo 2: Dil Değiştirme

```
Kullanıcı → Dil seçiciden "English" seçer
↓
LanguageSwitcher → Cookie'ye "en" yazar
↓
LanguageSwitcher → URL'i /en olarak değiştirir
↓
Sayfa → Yenilenir (window.location.href = '/en')
↓
Middleware → Cookie'den "en" okur
↓
Sayfa → İngilizce gösterilir
```

### Senaryo 3: Sayfa Geçişleri

```
Kullanıcı /en sayfasında
↓
"Shop" linkine tıklar
↓
URL → /en/shop olur
↓
Middleware → URL'den "en" alır
↓
Shop sayfası → İngilizce gösterilir
```

### Senaryo 4: Tekrar Ziyaret

```
Kullanıcı → Tarayıcıyı kapatır
↓
Daha sonra tekrar gelir → http://localhost:3000
↓
Middleware → Cookie'den "en" okur
↓
URL → /en'e yönlendirilir
↓
Sayfa → İngilizce gösterilir (tercih hatırlandı ✅)
```

---

## 🔧 Teknik Detaylar

### LanguageSwitcher Komponenti

```jsx
const handleLanguageChange = (newLocale) => {
  // 1. Cookie'ye kaydet
  document.cookie = `i18next=${newLocale}; path=/; max-age=31536000`;

  // 2. Yeni URL'i oluştur
  let newPathname = pathname;

  // Mevcut locale'i path'ten çıkar
  if (pathname.startsWith('/en')) {
    newPathname = pathname.replace('/en', '');
  }

  // Yeni locale ekle (TR değilse)
  if (newLocale !== 'tr') {
    newPathname = `/${newLocale}${newPathname || ''}`;
  }

  // 3. Sayfayı yenile
  window.location.href = newPathname || '/';
};
```

### useLocale Hook

Komponentlerde dil değişikliklerini otomatik algılar:

```jsx
export function useLocale(namespace = 'common') {
  const [currentLocale, setCurrentLocale] = useState('tr');

  useEffect(() => {
    // Cookie'yi oku
    const locale = getCookie('i18next') || 'tr';
    setCurrentLocale(locale);

    // Her saniye kontrol et (dil değişirse güncelle)
    const interval = setInterval(() => {
      const newLocale = getCookie('i18next') || 'tr';
      if (newLocale !== currentLocale) {
        setCurrentLocale(newLocale);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [currentLocale]);

  return { t, locale: currentLocale, i18n };
}
```

---

## 🐛 Sorun Giderme

### Problem 1: Dil Değişmiyor

**Semptom**: Dil seçiciye tıklıyorum ama dil değişmiyor.

**Çözüm**:
1. Tarayıcı console'unu açın (F12)
2. Network sekmesinde yönlendirme var mı kontrol edin
3. Application → Cookies → Cookie'yi kontrol edin
4. Cookie'yi manuel silin ve tekrar deneyin

**Test**:
```bash
# Test sayfasına gidin
http://localhost:3000/test-locale

# "Locale Cookie'yi Sil" butonuna tıklayın
```

### Problem 2: Cookie Silinmiyor

**Semptom**: Cookie'yi siliyorum ama hala eski dil görünüyor.

**Çözüm**:
```javascript
// Manuel cookie silme
document.cookie = 'i18next=; path=/; max-age=0';

// Sayfayı yenile
window.location.reload();
```

### Problem 3: URL ve Dil Uyumsuz

**Semptom**: URL `/en` ama sayfa Türkçe gösteriliyor.

**Çözüm**:
1. Middleware'in doğru çalıştığını kontrol edin
2. Cache'i temizleyin: `npm run dev` yeniden başlatın
3. Browser cache'i temizleyin (Ctrl+Shift+R)

### Problem 4: Dil Seçici Görünmüyor

**Semptom**: Header'da dil seçici yok.

**Çözüm**:
1. HeaderTop komponentin yüklendiğini kontrol edin
2. LanguageSwitcher import edilmiş mi kontrol edin
3. Console'da hata var mı bakın

---

## 📝 Örnek Kullanım

### Komponentte Dil Alma

```jsx
"use client";
import { useLocale } from "@/hooks/useLocale";

const MyComponent = () => {
  const { t, locale } = useLocale('products');

  return (
    <div>
      <p>Aktif Dil: {locale}</p>
      <button>{t('addToCart')}</button>
    </div>
  );
};
```

### Manuel Dil Değiştirme (Programatik)

```jsx
const changeToEnglish = () => {
  document.cookie = 'i18next=en; path=/; max-age=31536000';
  window.location.href = '/en';
};

const changeToTurkish = () => {
  document.cookie = 'i18next=tr; path=/; max-age=31536000';
  window.location.href = '/';
};
```

---

## ✅ Test Checklist

Dil değiştirme sistemini test etmek için:

- [ ] Ana sayfada dil seçici görünüyor
- [ ] Dil seçiciye tıklayınca dropdown açılıyor
- [ ] "English" seçince sayfa `/en`'e yönleniyor
- [ ] Sayfa İngilizce gösteriliyor
- [ ] Header metinleri İngilizce
- [ ] Footer metinleri İngilizce
- [ ] Product card butonları İngilizce
- [ ] Dil seçici "English" gösteriyor
- [ ] "Türkçe" seçince sayfa `/`'ye yönleniyor
- [ ] Sayfa Türkçe gösteriliyor
- [ ] Tüm metinler Türkçe
- [ ] Dil seçici "Türkçe" gösteriyor
- [ ] Tarayıcıyı kapatıp açınca dil tercihi korunuyor
- [ ] Farklı sayfalarda dil tercihi devam ediyor

---

## 🎨 Görsel Akış

```
┌─────────────────────────────────────────┐
│         KULLANICI                       │
│  Header'da Dil Seçiciye Tıklar          │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│      LANGUAGESWITCHER                   │
│  1. Cookie'ye kaydet (i18next=en)       │
│  2. URL oluştur (/en)                   │
│  3. window.location.href = '/en'        │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         MIDDLEWARE                      │
│  1. Cookie oku (i18next=en)             │
│  2. Header ekle (x-locale: en)          │
│  3. İsteği devam ettir                  │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│         LAYOUT                          │
│  1. Header'dan locale oku (en)          │
│  2. <html lang="en"> ayarla             │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│       KOMPONENTLER                      │
│  1. useLocale('namespace') kullan       │
│  2. Cookie'den locale al (en)           │
│  3. İngilizce çevirileri yükle          │
│  4. Render et                           │
└─────────────────────────────────────────┘
```

---

## 🚀 Gelişmiş Özellikler

### Otomatik Dil Algılama (Pasif)

Şu anda browser dili algılaması kapalı (varsayılan TR). Aktif etmek için:

```javascript
// middleware.js içinde
const browserLang = request.headers.get('accept-language')?.split(',')[0]?.split('-')[0];
const locale = getCookie(request) || browserLang || 'tr';
```

### Dil Kısayolları

Klavye kısayolları eklemek için:

```jsx
useEffect(() => {
  const handleKeyPress = (e) => {
    // Ctrl + Shift + T = Türkçe
    if (e.ctrlKey && e.shiftKey && e.key === 'T') {
      changeToTurkish();
    }
    // Ctrl + Shift + E = English
    if (e.ctrlKey && e.shiftKey && e.key === 'E') {
      changeToEnglish();
    }
  };

  window.addEventListener('keydown', handleKeyPress);
  return () => window.removeEventListener('keydown', handleKeyPress);
}, []);
```

---

**Son Güncelleme**: 2025-01-24
**Versiyon**: 1.0.0
