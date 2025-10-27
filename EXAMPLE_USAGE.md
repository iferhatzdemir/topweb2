# i18n Kullanım Kılavuzu

Bu proje, Next.js App Router için TR varsayılan dil olarak yapılandırılmış çok dilli (i18n) desteğine sahiptir.

## Özellikler

- ✅ TR varsayılan dil, EN eklenebilir yapı
- ✅ Intl API ile tr-TR formatları (sayı, tarih, para birimi)
- ✅ Namespace tabanlı lazy-loading
- ✅ SEO optimize edilmiş (hreflang, canonical, locale-aware meta)
- ✅ Middleware ile otomatik locale yönlendirme
- ✅ Cookie tabanlı dil tercihi

## Kurulum

### 1. Gerekli Paketleri Yükleyin

```bash
npm install i18next react-i18next i18next-resources-to-backend i18next-browser-languagedetector
```

### 2. Environment Değişkenleri

`.env.local` dosyasına ekleyin:

```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## Temel Kullanım

### Server Component'lerde Çeviri Kullanımı

```jsx
import { useTranslation } from '@/i18n';

export default async function Page({ params }) {
  const { locale } = params;
  const { t } = await useTranslation(locale, 'common');

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
}
```

### Client Component'lerde Çeviri Kullanımı

```jsx
'use client';

import { useTranslation } from '@/i18n/client';

export default function ClientComponent({ locale }) {
  const { t } = useTranslation(locale, 'common');

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button>{t('save')}</button>
    </div>
  );
}
```

### Birden Fazla Namespace Kullanımı

```jsx
import { useTranslation } from '@/i18n';

export default async function ProductPage({ params }) {
  const { locale } = params;
  const { t: tCommon } = await useTranslation(locale, 'common');
  const { t: tProducts } = await useTranslation(locale, 'products');

  return (
    <div>
      <h1>{tProducts('title')}</h1>
      <button>{tCommon('save')}</button>
    </div>
  );
}
```

## Intl API Formatlamaları

### Para Birimi (TRY)

```jsx
import { formatCurrency } from '@/lib/intl';

// TR formatı: ₺1.234,56
const price = formatCurrency(1234.56, 'tr-TR', 'TRY');

// EN formatı: $1,234.56
const priceEN = formatCurrency(1234.56, 'en-US', 'USD');
```

### Tarih Formatlama

```jsx
import {
  formatDate,
  formatShortDate,
  formatLongDate,
  formatDateTime,
  formatRelativeTime
} from '@/lib/intl';

// Tam tarih: 24 Ekim 2025
const date = formatDate(new Date(), 'tr-TR');

// Kısa tarih: 24.10.2025
const shortDate = formatShortDate(new Date(), 'tr-TR');

// Uzun tarih: Cuma, 24 Ekim 2025
const longDate = formatLongDate(new Date(), 'tr-TR');

// Tarih ve saat: 24 Ekim 2025 14:30
const dateTime = formatDateTime(new Date(), 'tr-TR');

// Göreceli zaman: 2 saat önce
const relativeTime = formatRelativeTime(new Date(Date.now() - 7200000), 'tr-TR');
```

### Sayı Formatlama

```jsx
import { formatNumber, formatPercent } from '@/lib/intl';

// Sayı: 1.234.567,89
const number = formatNumber(1234567.89, 'tr-TR');

// Yüzde: %45,5
const percent = formatPercent(45.5, 'tr-TR');
```

### Telefon Formatlama

```jsx
import { formatPhoneNumber } from '@/lib/intl';

// TR formatı: +90 (555) 123 45 67
const phone = formatPhoneNumber('905551234567');
```

## SEO ve Metadata

### Sayfa Metadata'sı

```jsx
import { generatePageMetadata } from '@/lib/generateMetadata';

export async function generateMetadata({ params }) {
  const { locale } = params;

  return generatePageMetadata({
    title: 'Ürünler',
    description: 'Taze organik ürünler',
    locale: locale,
    path: '/products',
    keywords: ['organik', 'taze', 'doğal'],
  });
}
```

### Structured Data (JSON-LD)

```jsx
import {
  generateProductStructuredData,
  generateBreadcrumbStructuredData
} from '@/lib/generateMetadata';

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  const structuredData = generateProductStructuredData({
    name: product.name,
    description: product.description,
    price: product.price,
    currency: 'TRY',
    sku: product.sku,
    images: [product.image],
    inStock: true,
    path: `/products/${product.id}`,
  }, params.locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      {/* Sayfa içeriği */}
    </>
  );
}
```

## Dil Değiştirici Bileşeni

```jsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function Header({ locale }) {
  return (
    <header>
      <LanguageSwitcher currentLocale={locale} />
    </header>
  );
}
```

## Yeni Dil Ekleme

### 1. Konfigürasyonu Güncelleyin

`src/i18n/config.js`:
```js
export const i18n = {
  defaultLocale: 'tr',
  locales: ['tr', 'en', 'de'], // Yeni dil ekleyin
  localeDetection: true,
};

export const localeNames = {
  tr: 'Türkçe',
  en: 'English',
  de: 'Deutsch', // Yeni dil adı
};
```

### 2. Çeviri Dosyalarını Oluşturun

`src/i18n/locales/de/` klasörü altında tüm namespace'ler için JSON dosyaları oluşturun:
- `common.json`
- `navigation.json`
- `products.json`
- vb.

### 3. Middleware Otomatik Çalışır

Middleware yeni dili otomatik olarak algılayacak ve yönlendirmeleri yapacaktır.

## URL Yapısı

- Türkçe (varsayılan): `https://yourdomain.com/products`
- İngilizce: `https://yourdomain.com/en/products`
- Almanca: `https://yourdomain.com/de/products`

## Namespace Yapısı

Çeviri dosyaları namespace'lere bölünmüştür:

```
src/i18n/locales/
├── tr/
│   ├── common.json       # Genel çeviriler
│   ├── navigation.json   # Menü ve navigasyon
│   ├── products.json     # Ürün sayfaları
│   ├── cart.json         # Sepet sayfası
│   ├── auth.json         # Giriş/Kayıt
│   └── ...
└── en/
    ├── common.json
    ├── navigation.json
    └── ...
```

## Best Practices

1. **Lazy Loading**: Her sayfa sadece ihtiyacı olan namespace'leri yükler
2. **SEO**: Her dil için otomatik hreflang ve canonical linkler
3. **Type Safety**: TypeScript kullanarak çeviri anahtarlarını type-safe yapabilirsiniz
4. **Fallback**: Çeviri bulunamazsa varsayılan dile (TR) geri döner
5. **Cookie**: Kullanıcının dil tercihi cookie'de saklanır

## Örnekler

### E-Ticaret Ürün Kartı

```jsx
'use client';

import { useTranslation } from '@/i18n/client';
import { formatCurrency } from '@/lib/intl';

export default function ProductCard({ product, locale }) {
  const { t } = useTranslation(locale, 'products');

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{formatCurrency(product.price, locale)}</p>
      <button>{t('addToCart')}</button>
      {product.inStock ? (
        <span className="badge">{t('inStock')}</span>
      ) : (
        <span className="badge">{t('outOfStock')}</span>
      )}
    </div>
  );
}
```

### Blog Yazısı Tarihi

```jsx
import { formatLongDate, formatRelativeTime } from '@/lib/intl';

export default function BlogPost({ post, locale }) {
  return (
    <article>
      <h1>{post.title}</h1>
      <time dateTime={post.publishedAt}>
        {formatLongDate(post.publishedAt, locale)}
        <small> ({formatRelativeTime(post.publishedAt, locale)})</small>
      </time>
      <div>{post.content}</div>
    </article>
  );
}
```

## Sorun Giderme

### Çeviriler Görünmüyor

1. JSON dosyalarının doğru yerde olduğundan emin olun
2. Namespace adının doğru olduğunu kontrol edin
3. Browser console'da hata mesajlarını kontrol edin

### Dil Değişmiyor

1. Cookie'leri temizleyin
2. Middleware'in doğru çalıştığından emin olun
3. Browser cache'ini temizleyin

### SEO Sorunları

1. `NEXT_PUBLIC_BASE_URL` environment değişkeninin ayarlandığından emin olun
2. Canonical ve alternate linklerini kontrol edin
3. Google Search Console'da hreflang hatalarını kontrol edin
