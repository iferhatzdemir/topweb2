# 🌍 i18n Uygulama Özeti

Bu belge, Broccoli e-ticaret projesine entegre edilen çok dilli (i18n) sistemin kapsamlı bir özetidir.

## 📋 İçindekiler

1. [Genel Bakış](#genel-bakış)
2. [Yapılandırma](#yapılandırma)
3. [Çeviri Dosyaları](#çeviri-dosyaları)
4. [Güncellenmiş Komponentler](#güncellenmiş-komponentler)
5. [Kullanım Örnekleri](#kullanım-örnekleri)
6. [Test](#test)
7. [Sonraki Adımlar](#sonraki-adımlar)

---

## 🎯 Genel Bakış

### Özellikler

✅ **Varsayılan Dil**: Türkçe (TR)
✅ **Desteklenen Diller**: Türkçe (TR), İngilizce (EN)
✅ **Framework**: Next.js 14 App Router + react-i18next
✅ **Lazy Loading**: Namespace bazlı dinamik yükleme
✅ **SEO**: `<html lang="tr">` desteği, hreflang etiketleri
✅ **Cookie Persistence**: Kullanıcı dil tercihi kalıcı olarak saklanır
✅ **URL Desteği**: `/en` prefix ile İngilizce sayfalar

### Teknik Stack

- **i18next**: Core kütüphane
- **react-i18next**: React entegrasyonu
- **i18next-resources-to-backend**: Dinamik namespace yükleme
- **i18next-browser-languagedetector**: Tarayıcı dil algılama
- **Next.js Middleware**: Locale yönlendirme
- **Custom Hook (useLocale)**: Basitleştirilmiş kullanım

---

## ⚙️ Yapılandırma

### Dosya Yapısı

```
src/
├── i18n/
│   ├── config.js           # Ana konfigürasyon
│   ├── index.js            # Server-side hook
│   ├── client.js           # Client-side hook
│   ├── settings.js         # i18next ayarları
│   └── locales/
│       ├── tr/             # Türkçe çeviriler
│       │   ├── common.json
│       │   ├── header.json
│       │   ├── footer.json
│       │   ├── navigation.json
│       │   ├── products.json
│       │   ├── cart.json
│       │   ├── checkout.json
│       │   ├── auth.json
│       │   ├── blog.json
│       │   ├── pages.json
│       │   ├── buttons.json
│       │   ├── alerts.json
│       │   ├── empty-states.json
│       │   └── errors.json
│       └── en/             # İngilizce çeviriler
│           └── (aynı dosyalar)
├── hooks/
│   └── useLocale.js        # Custom i18n hook
├── middleware.js           # Locale yönlendirme
└── app/
    └── layout.js           # Root layout (locale desteği)
```

### Namespace Listesi

Sistemde 14 farklı namespace bulunmaktadır:

| Namespace | Kullanım Alanı | Dosya |
|-----------|---------------|-------|
| `common` | Genel terimler, butonlar | common.json |
| `header` | Üst menü, dil seçici | header.json |
| `footer` | Alt menü, copyright | footer.json |
| `navigation` | Menü linkleri | navigation.json |
| `products` | Ürün kartları, detay | products.json |
| `cart` | Sepet sayfası | cart.json |
| `checkout` | Ödeme sayfası | checkout.json |
| `auth` | Login, Register | auth.json |
| `blog` | Blog sayfaları | blog.json |
| `pages` | Diğer sayfalar (About, Contact, FAQ) | pages.json |
| `buttons` | Buton metinleri | buttons.json |
| `alerts` | Bildirimler | alerts.json |
| `empty-states` | Boş durum mesajları | empty-states.json |
| `errors` | Hata mesajları | errors.json |

---

## 📝 Çeviri Dosyaları

### Örnek: header.json (TR)

```json
{
  "topBar": {
    "address": "15/A, Nest Tower, NYC",
    "email": "info@webmail.com",
    "languages": {
      "label": "Dil",
      "english": "İngilizce",
      "turkish": "Türkçe"
    },
    "currency": {
      "label": "Para Birimi",
      "try": "TRY"
    }
  },
  "search": {
    "placeholder": "Ürün ara...",
    "button": "Ara"
  },
  "cart": {
    "title": "Sepetim",
    "emptyCart": "Sepetiniz boş",
    "viewCart": "Sepeti Görüntüle",
    "checkout": "Ödemeye Geç"
  },
  "account": {
    "myAccount": "Hesabım",
    "login": "Giriş Yap",
    "logout": "Çıkış Yap"
  }
}
```

### İnterpolasyon Örnekleri

**Değişken kullanımı:**
```json
{
  "itemsInCart": "{{count}} ürün sepetinizde",
  "copyright": "© {{year}} Broccoli. Tüm hakları saklıdır."
}
```

**Nested keys:**
```json
{
  "login": {
    "title": "Hesabınıza Giriş Yapın",
    "email": "E-posta*",
    "password": "Şifre*"
  }
}
```

---

## 🔧 Güncellenmiş Komponentler

### 1. Header Komponentleri

#### ✅ HeaderTop.js
**Lokasyon**: `src/components/layout/headers/HeaderTop.js`

**Değişiklikler**:
- `useLocale('header')` hook'u eklendi
- Adres ve e-posta çevirileri: `t('topBar.address')`, `t('topBar.email')`
- `LanguageSwitcher` komponenti entegre edildi

**Kullanım**:
```jsx
const { t } = useLocale('header');

<Link href="/locations">
  <i className="icon-placeholder"></i> {t('topBar.address')}
</Link>
```

### 2. Footer Komponentleri

#### ✅ FooterCompany.js
**Lokasyon**: `src/components/layout/footers/FooterCompany.js`

**Çevirilen İçerik**:
- Başlık: `t('company.title')` → "Şirket" / "Company"
- Linkler: `t('company.about')`, `t('company.blog')`, `t('company.allProducts')`, etc.

#### ✅ FooterCustomerCare.js
**Lokasyon**: `src/components/layout/footers/FooterCustomerCare.js`

**Çevirilen İçerik**:
- Başlık: `t('customerCare.title')` → "Müşteri Hizmetleri" / "Customer Care"
- Linkler: `t('customerCare.login')`, `t('customerCare.myAccount')`, etc.

#### ✅ Copyright2.js
**Lokasyon**: `src/components/layout/footers/Copyright2.js`

**Çevirilen İçerik**:
```jsx
const currentYear = new Date().getFullYear();
{t('copyright.text', { year: currentYear })}
// Çıktı: © 2025 Broccoli. Tüm hakları saklıdır.
```

### 3. Product Components

#### ✅ ProductCard.js
**Lokasyon**: `src/components/shared/cards/ProductCard.js`

**Çevirilen İçerik**:
- `title={t('quickView')}` → "Hızlı Görünüm" / "Quick View"
- `title={t('addToCart')}` → "Sepete Ekle" / "Add to Cart"
- `title={t('addToWishlist')}` → "Favorilere Ekle" / "Add to Wishlist"

### 4. Cart Page

#### ✅ CartPrimary.js
**Lokasyon**: `src/components/sections/cart/CartPrimary.js`

**Çevirilen İçerik**:
```jsx
const { t } = useLocale('cart');

// Boş sepet mesajı
<Nodata text={t('emptyCart')} />

// Kupon kodu
<input placeholder={t('couponCode')} />
<button>{t('applyCoupon')}</button>

// Sepet toplamı
<h4>{t('cartTotals')}</h4>
<td>{t('subtotal')}</td>
<td>{t('shippingHandling')}</td>
<td>{t('orderTotal')}</td>

// Ödeme butonu
<Link href="/checkout">{t('proceedToCheckout')}</Link>
```

### 5. Auth Pages

#### ✅ LoginPrimary.js
**Lokasyon**: `src/components/sections/login/LoginPrimary.js`

**Çevirilen İçerik**:
```jsx
const { t } = useLocale('auth');

<h1>{t('login.title')}</h1>
<p>{t('login.subtitle')}</p>
<input placeholder={t('login.email')} />
<input placeholder={t('login.password')} />
<button>{t('login.signIn')}</button>
<Link>{t('login.forgotPassword')}</Link>
<h4>{t('login.noAccount')}</h4>
<Link>{t('login.createAccount')}</Link>
```

---

## 💻 Kullanım Örnekleri

### Client Component Örneği

```jsx
"use client";
import { useLocale } from "@/hooks/useLocale";

const MyComponent = () => {
  const { t, locale } = useLocale('products');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button>{t('addToCart')}</button>
      <p>Aktif dil: {locale}</p>
    </div>
  );
};
```

### Server Component Örneği

```jsx
import { useTranslation } from '@/i18n';
import { headers } from 'next/headers';

export default async function MyPage() {
  const headersList = headers();
  const locale = headersList.get('x-locale') || 'tr';
  const { t } = await useTranslation(locale, 'products');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### Çoklu Namespace Kullanımı

```jsx
const { t: tCommon } = useLocale('common');
const { t: tProducts } = useLocale('products');

<div>
  <h1>{tProducts('title')}</h1>
  <button>{tCommon('save')}</button>
</div>
```

### İnterpolasyon

```jsx
// JSON: "itemsInCart": "{{count}} ürün sepetinizde"
{t('itemsInCart', { count: 5 })}
// Çıktı: 5 ürün sepetinizde
```

---

## 🧪 Test

### Test Sayfaları

#### 1. **i18n Test Sayfası**
**URL**: `http://localhost:3000/i18n-test`

Bu sayfa tüm 14 namespace'i yükler ve çevirileri grid formatında gösterir.

**Özellikler**:
- TR/EN toggle butonu
- Tüm namespace'lerin çevirileri
- Interpolasyon örnekleri
- Nested key kullanımı

#### 2. **Locale Test Sayfası**
**URL**: `http://localhost:3000/test-locale`

Locale algılama debug sayfası.

**Gösterilen Bilgiler**:
- Aktif locale
- Cookie değeri
- Header değeri
- Tarayıcı dili

### Manuel Test Senaryoları

#### Türkçe Sayfa Testi
```bash
# Ana sayfa (varsayılan Türkçe)
http://localhost:3000/

# Header'da dil seçici ile Türkçe seçili olmalı
# Tüm metinler Türkçe olmalı
```

#### İngilizce Sayfa Testi
```bash
# İngilizce ana sayfa
http://localhost:3000/en

# Header'da dil seçici ile İngilizce seçili olmalı
# Tüm metinler İngilizce olmalı
```

#### Dil Değiştirme Testi
```
1. Ana sayfayı aç (Türkçe)
2. Header'daki dil seçiciden "English" seç
3. Sayfa /en'e yönlendirilmeli
4. Tüm metinler İngilizce'ye dönmeli
5. Sayfayı yenile
6. Dil tercihi korunmalı (cookie)
```

#### Sayfa Geçişleri Testi
```
1. http://localhost:3000/en adresine git
2. Shop sayfasına git
3. URL /en/shop olmalı, içerik İngilizce olmalı
4. Product detay sayfasına git
5. URL /en/products/[id] olmalı, içerik İngilizce olmalı
6. Cart sayfasına git
7. URL /en/cart olmalı, içerik İngilizce olmalı
```

---

## 🚀 Sonraki Adımlar

### Tamamlanmış ✅

- [x] i18n altyapısı kurulumu
- [x] 14 namespace ile çeviri dosyaları oluşturma (TR/EN)
- [x] Header/Footer komponentleri güncelleme
- [x] Product card çevirisi
- [x] Cart sayfası çevirisi
- [x] Login/Register sayfaları çevirisi
- [x] LanguageSwitcher entegrasyonu
- [x] useLocale custom hook
- [x] Test sayfaları
- [x] Dokümantasyon

### Devam Eden İşler 🔄

#### Yüksek Öncelik
1. **Checkout Sayfası**
   - Dosya: `src/components/sections/checkout/CheckoutPrimary.js`
   - Namespace: `checkout`
   - Form alanları, ödeme yöntemleri, validasyon mesajları

2. **Register Sayfası**
   - Dosya: `src/components/sections/register/RegisterPrimary.js`
   - Namespace: `auth`
   - Form alanları, kayıt mesajları

3. **Product Details Sayfası**
   - Dosya: `src/components/sections/products/*`
   - Namespace: `products`
   - Tab'lar, yorumlar, açıklamalar

#### Orta Öncelik
4. **Blog Sayfaları**
   - Namespace: `blog`
   - Blog listesi, detay sayfası, yorumlar

5. **About/Contact Sayfaları**
   - Namespace: `pages`
   - Hakkımızda, İletişim form

6. **FAQ Sayfası**
   - Namespace: `pages`
   - Soru/cevaplar

#### Düşük Öncelik
7. **Search Component**
   - Namespace: `header`
   - Arama placeholder'ı, sonuç mesajları

8. **Wishlist Sayfası**
   - Namespace: `common`
   - Favori listesi mesajları

9. **Order Tracking**
   - Namespace: `pages`
   - Sipariş takip form ve durumları

### Önerilen Geliştirmeler

#### 1. Dinamik İçerik Çevirisi
**Problem**: Ürün başlıkları, kategoriler gibi database'den gelen içerikler henüz çevrilmiyor.

**Çözüm**:
```javascript
// Ürün modelinde
{
  title_tr: "Organik Domates",
  title_en: "Organic Tomato",
  description_tr: "Taze organik domates",
  description_en: "Fresh organic tomato"
}

// Component'te kullanım
const { locale } = useLocale();
<h2>{product[`title_${locale}`]}</h2>
```

#### 2. CMS Entegrasyonu
- Admin panelinden çeviri yönetimi
- Çeviri önizleme
- Bulk çeviri import/export

#### 3. Otomatik Çeviri
- DeepL/Google Translate API entegrasyonu
- Eksik çevirilerin otomatik doldurulması
- İnsan onayı workflow

#### 4. Daha Fazla Dil Desteği
```javascript
// config.js
export const i18n = {
  defaultLocale: 'tr',
  locales: ['tr', 'en', 'de', 'fr', 'ar'], // Almanca, Fransızca, Arapça
  localeDetection: true,
};
```

#### 5. RTL Dil Desteği (Arapça)
```jsx
<html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
```

#### 6. Locale-Aware Routing
```
/tr/about → Hakkımızda
/en/about → About Us
/de/about → Über uns
```

---

## 📚 Kaynaklar

### Dokümantasyon
- [HOW_TO_USE_I18N.md](./HOW_TO_USE_I18N.md) - Detaylı kullanım kılavuzu
- [LANGUAGE_STYLE_GUIDE.md](./LANGUAGE_STYLE_GUIDE.md) - Çeviri terimleri ve stil rehberi
- [I18N_QA_CHECKLIST.md](./I18N_QA_CHECKLIST.md) - QA test listesi
- [LOCALE_TROUBLESHOOTING.md](./LOCALE_TROUBLESHOOTING.md) - Sorun giderme

### Test Sayfaları
- [/i18n-test](http://localhost:3000/i18n-test) - Tüm çeviriler
- [/test-locale](http://localhost:3000/test-locale) - Locale debug

### Örnek Komponentler
- [src/components/LanguageSwitcher.js](./src/components/LanguageSwitcher.js) - Dil değiştirici
- [src/components/examples/I18nButtonExample.js](./src/components/examples/I18nButtonExample.js) - Client component örneği

---

## 🎨 Renk Paleti (Ek Bilgi)

Projeye ayrıca yeni bir renk paleti uygulanmıştır:

| Renk | Hex | Kullanım |
|------|-----|----------|
| 🌸 Gül Kurusu | #C1839F | Ana renk (primary) |
| 🎗️ Şarap Tonlu | #7D4C61 | Koyu vurgu (secondary) |
| 🩶 Açık Nötr | #F9F6F7 | Arka plan |
| 🪞 Soluk Gri-Pembe | #EAD7DC | İkincil arka plan |
| 🖤 Koyu Füme | #2F2F2F | Yazı rengi |

**Güncellenen dosya**: `src/app/globals.css`

---

## 📞 Destek

### Sorun mu yaşıyorsunuz?

1. **Çeviriler görünmüyor**
   - Tarayıcı console'unda hata var mı kontrol edin
   - Cookie'leri temizleyin (test-locale sayfasından)
   - Namespace'in doğru olduğundan emin olun

2. **Dil değişmiyor**
   - Tarayıcı console'da network sekmesini kontrol edin
   - Cookie değerini kontrol edin (test-locale sayfası)
   - LanguageSwitcher'ın doğru entegre edildiğini kontrol edin

3. **Hydration hatası**
   - Server ve client render'ı aynı locale kullanmalı
   - useEffect ile locale'i set ettiğinizden emin olun

### İletişim
- GitHub Issues: [Proje Issues](https://github.com/your-repo/issues)
- Dokümantasyon: Bu klasördeki .md dosyaları

---

**Son Güncelleme**: 2025-01-24
**Versiyon**: 1.0.0
**Durum**: ✅ Production Ready (Devam eden geliştirmeler ile)
