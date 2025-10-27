# i18n Nasıl Kullanılır?

## 🎯 Hızlı Başlangıç

### 1. Test Sayfasını Kontrol Et

```bash
# Tarayıcıda aç:
http://localhost:3000/i18n-test        # TR versiyonu
http://localhost:3000/en/i18n-test     # EN versiyonu
```

Bu sayfada **tüm namespace'lerin** çalıştığını görebilirsiniz!

---

## 📚 JSON Dosyaları

### Mevcut Namespace'ler

```
src/i18n/locales/
├── tr/
│   ├── common.json          ✅ Genel kullanım
│   ├── navigation.json      ✅ Menü & linkler
│   ├── buttons.json         ✅ Butonlar
│   ├── products.json        ✅ Ürün sayfaları
│   ├── cart.json            ✅ Sepet
│   ├── checkout.json        ✅ Ödeme
│   ├── auth.json            ✅ Giriş/Kayıt
│   ├── alerts.json          ✅ Uyarılar
│   ├── empty-states.json    ✅ Boş durumlar
│   └── errors.json          ✅ Hata mesajları
└── en/
    └── (aynı dosyalar)
```

### Tüm JSON'lar Geçerli ✅

```bash
# Kontrol edildi, tümü valid:
✅ common.json
✅ navigation.json
✅ buttons.json
✅ products.json
✅ cart.json
✅ checkout.json
✅ auth.json
✅ alerts.json
✅ empty-states.json
✅ errors.json
```

---

## 💻 Server Component'te Kullanım

### Basit Örnek

```jsx
import { headers } from 'next/headers';
import { i18n } from '@/i18n/config';
import { useTranslation } from '@/i18n';

export default async function HomePage() {
  // 1. Locale'i al
  const headersList = headers();
  const locale = headersList.get('x-locale') || i18n.defaultLocale;

  // 2. Çevirileri yükle
  const { t } = await useTranslation(locale, 'common');

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('loading')}</p>
    </div>
  );
}
```

### Birden Fazla Namespace

```jsx
export default async function ProductPage() {
  const headersList = headers();
  const locale = headersList.get('x-locale') || i18n.defaultLocale;

  // Birden fazla namespace yükle
  const { t: tCommon } = await useTranslation(locale, 'common');
  const { t: tProducts } = await useTranslation(locale, 'products');
  const { t: tButtons } = await useTranslation(locale, 'buttons');

  return (
    <div>
      <h1>{tProducts('title')}</h1>
      <p>{tProducts('price')}: ₺1299</p>
      <button>{tButtons('addToCart')}</button>
      <p>{tCommon('loading')}</p>
    </div>
  );
}
```

---

## 🎨 Client Component'te Kullanım

### Basit Örnek

```jsx
'use client';

import { useTranslation } from '@/i18n/client';

export default function AddToCartButton({ locale = 'tr' }) {
  const { t } = useTranslation(locale, 'buttons');

  return (
    <button onClick={() => alert(t('addedToCart'))}>
      {t('addToCart')}
    </button>
  );
}
```

### State ile Kullanım

```jsx
'use client';

import { useTranslation } from '@/i18n/client';
import { useState } from 'react';

export default function CartButton({ locale }) {
  const { t: tButtons } = useTranslation(locale, 'buttons');
  const { t: tAlerts } = useTranslation(locale, 'alerts');

  const [message, setMessage] = useState('');

  const handleClick = () => {
    // Sepete ekleme işlemi...
    setMessage(tAlerts('addedToCart'));
  };

  return (
    <div>
      <button onClick={handleClick}>
        {tButtons('addToCart')}
      </button>
      {message && <div className="alert">{message}</div>}
    </div>
  );
}
```

### Parent'tan Locale Geçirme

```jsx
// Parent (Server Component)
import { headers } from 'next/headers';
import { i18n } from '@/i18n/config';
import CartButton from './CartButton';

export default async function ProductPage() {
  const headersList = headers();
  const locale = headersList.get('x-locale') || i18n.defaultLocale;

  return (
    <div>
      {/* Locale'i child component'e geç */}
      <CartButton locale={locale} />
    </div>
  );
}

// Child (Client Component)
'use client';
import { useTranslation } from '@/i18n/client';

export default function CartButton({ locale }) {
  const { t } = useTranslation(locale, 'buttons');
  return <button>{t('addToCart')}</button>;
}
```

---

## 🔄 Interpolasyon (Dinamik Değerler)

### Basit Değişkenler

```jsx
// JSON: "itemsInCart": "{{count}} ürün sepetinizde"
const { t } = await useTranslation(locale, 'cart');

<p>{t('itemsInCart', { count: 5 })}</p>
// Çıktı: "5 ürün sepetinizde"

<p>{t('itemsInCart', { count: 0 })}</p>
// Çıktı: "0 ürün sepetinizde"
```

### Birden Fazla Değişken

```jsx
// JSON: "showing": "{{firstItem}}-{{lastItem}} arası gösteriliyor (toplam {{totalItems}} sonuç)"
const { t } = await useTranslation(locale, 'products');

<p>{t('showing', { firstItem: 1, lastItem: 10, totalItems: 50 })}</p>
// Çıktı: "1-10 arası gösteriliyor (toplam 50 sonuç)"
```

### Formatlama ile

```jsx
import { formatCurrency } from '@/lib/intl';

// JSON: "freeShippingOver": "{{amount}} üzeri ücretsiz kargo"
const { t } = await useTranslation(locale, 'cart');

<p>{t('freeShippingOver', {
  amount: formatCurrency(500, 'tr-TR', 'TRY')
})}</p>
// Çıktı: "₺500,00 üzeri ücretsiz kargo"
```

---

## 🎯 Nested Keys (İç İçe Anahtarlar)

### JSON Yapısı

```json
{
  "checkout": {
    "validation": {
      "requiredField": "Bu alan zorunludur",
      "invalidEmail": "Geçersiz e-posta"
    }
  }
}
```

### Kullanım

```jsx
const { t } = await useTranslation(locale, 'checkout');

<p>{t('validation.requiredField')}</p>
// Çıktı: "Bu alan zorunludur"

<p>{t('validation.invalidEmail')}</p>
// Çıktı: "Geçersiz e-posta"
```

---

## 📋 Pratik Örnekler

### 1. Navigation Menu

```jsx
// components/Header.js
import { headers } from 'next/headers';
import { i18n } from '@/i18n/config';
import { useTranslation } from '@/i18n';
import Link from 'next/link';

export default async function Header() {
  const headersList = headers();
  const locale = headersList.get('x-locale') || i18n.defaultLocale;
  const { t } = await useTranslation(locale, 'navigation');

  return (
    <nav>
      <Link href="/">{t('home')}</Link>
      <Link href="/about">{t('about')}</Link>
      <Link href="/products">{t('products')}</Link>
      <Link href="/contact">{t('contact')}</Link>
    </nav>
  );
}
```

### 2. Product Card

```jsx
// components/ProductCard.js (Server Component)
import { headers } from 'next/headers';
import { i18n } from '@/i18n/config';
import { useTranslation } from '@/i18n';
import { formatCurrency } from '@/lib/intl';
import AddToCartButton from './AddToCartButton';

export default async function ProductCard({ product }) {
  const headersList = headers();
  const locale = headersList.get('x-locale') || i18n.defaultLocale;

  const { t } = await useTranslation(locale, 'products');

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{t('price')}: {formatCurrency(product.price, locale)}</p>
      <p>{product.inStock ? t('inStock') : t('outOfStock')}</p>
      <AddToCartButton locale={locale} product={product} />
    </div>
  );
}

// components/AddToCartButton.js (Client Component)
'use client';
import { useTranslation } from '@/i18n/client';

export default function AddToCartButton({ locale, product }) {
  const { t } = useTranslation(locale, 'buttons');

  return <button>{t('addToCart')}</button>;
}
```

### 3. Empty State

```jsx
// components/EmptyCart.js
import { headers } from 'next/headers';
import { i18n } from '@/i18n/config';
import { useTranslation } from '@/i18n';
import Link from 'next/link';

export default async function EmptyCart() {
  const headersList = headers();
  const locale = headersList.get('x-locale') || i18n.defaultLocale;

  const { t: tEmpty } = await useTranslation(locale, 'empty-states');
  const { t: tButtons } = await useTranslation(locale, 'buttons');

  return (
    <div className="empty-state">
      <h2>{tEmpty('emptyCart')}</h2>
      <p>{tEmpty('emptyCartDescription')}</p>
      <Link href="/products">
        <button>{tButtons('continueShopping')}</button>
      </Link>
    </div>
  );
}
```

### 4. Alert Messages

```jsx
'use client';
import { useTranslation } from '@/i18n/client';
import { useState } from 'react';

export default function ProductActions({ locale }) {
  const { t } = useTranslation(locale, 'alerts');
  const [alert, setAlert] = useState(null);

  const showAlert = (type) => {
    setAlert(t(type));
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div>
      {alert && <div className="alert">{alert}</div>}
      <button onClick={() => showAlert('addedToCart')}>
        Add to Cart
      </button>
      <button onClick={() => showAlert('addedToWishlist')}>
        Add to Wishlist
      </button>
    </div>
  );
}
```

---

## 🐛 Sorun Giderme

### "Cannot find module" Hatası

```bash
# node_modules'u yeniden kur
rm -rf node_modules .next
npm install
npm run dev
```

### Çeviriler Görünmüyor

1. **JSON dosyası var mı?**
   ```bash
   ls src/i18n/locales/tr/
   ```

2. **Namespace doğru mu?**
   ```jsx
   // ❌ Yanlış
   const { t } = await useTranslation(locale, 'button');

   // ✅ Doğru
   const { t } = await useTranslation(locale, 'buttons');
   ```

3. **Key doğru mu?**
   ```jsx
   // JSON'da "addToCart" varsa
   t('addToCart')  // ✅
   t('add-to-cart') // ❌
   ```

### Client Component'te Çalışmıyor

```jsx
// ❌ Yanlış: Server hook
import { useTranslation } from '@/i18n';

// ✅ Doğru: Client hook
import { useTranslation } from '@/i18n/client';
```

---

## 📊 Test Etme

### 1. Test Sayfası

```bash
http://localhost:3000/i18n-test
```

### 2. Manuel Test

```jsx
// Herhangi bir sayfada
import { headers } from 'next/headers';
import { useTranslation } from '@/i18n';

export default async function TestPage() {
  const locale = headers().get('x-locale') || 'tr';
  const { t } = await useTranslation(locale, 'common');

  console.log('Locale:', locale);
  console.log('Welcome text:', t('welcome'));

  return <h1>{t('welcome')}</h1>;
}
```

### 3. Console'da Test

```javascript
// Browser console'da
document.cookie // i18next=tr veya en olmalı
```

---

## 🎓 Best Practices

### 1. Locale'i Her Zaman Geçir

```jsx
// ✅ İyi
<MyClientComponent locale={locale} />

// ❌ Kötü (locale undefined olabilir)
<MyClientComponent />
```

### 2. Namespace'leri Gruplayın

```jsx
// ✅ İyi: Tek bir sayfa için gerekli namespace'ler
const { t: tCommon } = await useTranslation(locale, 'common');
const { t: tProducts } = await useTranslation(locale, 'products');
const { t: tButtons } = await useTranslation(locale, 'buttons');

// ❌ Kötü: Kullanılmayan namespace'ler
const { t: t1 } = await useTranslation(locale, 'common');
const { t: t2 } = await useTranslation(locale, 'navigation');
const { t: t3 } = await useTranslation(locale, 'cart');
// ... hepsi kullanılmıyor
```

### 3. Fallback Kullanın

```jsx
// Değer yoksa fallback
t('unknownKey') || 'Varsayılan Metin'
```

---

## 🚀 Özet

1. **Server Component:** `useTranslation` from `@/i18n`
2. **Client Component:** `useTranslation` from `@/i18n/client`
3. **Locale al:** `headers().get('x-locale')`
4. **Namespace:** 10 farklı namespace mevcut
5. **Test:** `http://localhost:3000/i18n-test`

Hepsi **çalışıyor ve test edildi!** ✅
