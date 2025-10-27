# i18n Kurulum Talimatları

## Adım 1: Gerekli Paketleri Yükleyin

```bash
npm install i18next react-i18next i18next-resources-to-backend i18next-browser-languagedetector
```

## Adım 2: Environment Değişkenlerini Ayarlayın

`.env.local` dosyası oluşturun (proje kök dizininde):

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

Production için gerçek domain'inizi kullanın:
```env
NEXT_PUBLIC_BASE_URL=https://yourdomain.com
```

## Adım 3: Next.js Config Güncelleyin (Opsiyonel)

`next.config.mjs` dosyasına i18n ayarları ekleyebilirsiniz:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    // Opsiyonel: Image optimization için domain ekleyin
    images: {
        domains: ['yourdomain.com'],
    },
};

export default nextConfig;
```

## Adım 4: Projeyi Çalıştırın

```bash
npm run dev
```

Tarayıcıda açın: `http://localhost:3000`

## Adım 5: Dil Değiştirmeyi Test Edin

1. Ana sayfaya gidin
2. Dil değiştirici menüsünü kullanarak İngilizce'ye geçin
3. URL'nin `/en/` prefix'i alacağını gözlemleyin
4. Cookie'de `i18next=en` değerinin saklandığını kontrol edin

## Yapı

Aşağıdaki dosya ve klasörler otomatik olarak oluşturulmuştur:

```
src/
├── i18n/
│   ├── config.js              # i18n konfigürasyonu
│   ├── settings.js            # i18n ayarları
│   ├── index.js               # Server-side çeviri
│   ├── client.js              # Client-side çeviri
│   └── locales/
│       ├── tr/
│       │   ├── common.json
│       │   ├── navigation.json
│       │   ├── products.json
│       │   ├── cart.json
│       │   └── auth.json
│       └── en/
│           ├── common.json
│           ├── navigation.json
│           ├── products.json
│           ├── cart.json
│           └── auth.json
├── lib/
│   ├── intl.js                # Intl API formatlamaları
│   └── generateMetadata.js    # SEO metadata helper'ları
├── components/
│   └── LanguageSwitcher.js    # Dil değiştirici component
└── middleware.js              # Locale routing middleware
```

## Kullanım Örnekleri

### Server Component

```jsx
import { useTranslation } from '@/i18n';

export default async function Page({ params }) {
  const { t } = await useTranslation(params.locale, 'common');

  return <h1>{t('welcome')}</h1>;
}
```

### Client Component

```jsx
'use client';
import { useTranslation } from '@/i18n/client';

export default function Button({ locale }) {
  const { t } = useTranslation(locale, 'common');

  return <button>{t('save')}</button>;
}
```

### Para Birimi Formatı

```jsx
import { formatCurrency } from '@/lib/intl';

const price = formatCurrency(1299.99, 'tr-TR', 'TRY');
// Çıktı: ₺1.299,99
```

### Tarih Formatı

```jsx
import { formatDate } from '@/lib/intl';

const date = formatDate(new Date(), 'tr-TR');
// Çıktı: 24 Ekim 2025
```

## Hızlı Başlangıç Checklist

- [ ] npm install komutu çalıştırıldı
- [ ] .env.local dosyası oluşturuldu
- [ ] npm run dev ile proje başlatıldı
- [ ] Ana sayfa yükleniyor
- [ ] Dil değiştirici çalışıyor
- [ ] URL'ler doğru şekilde değişiyor

## Sorun Giderme

### "Module not found" Hatası

Tüm paketlerin yüklendiğinden emin olun:
```bash
npm install
```

### Çeviriler Görünmüyor

1. JSON dosyalarının syntax'ının doğru olduğundan emin olun
2. Namespace adının config'de tanımlı olduğunu kontrol edin
3. Browser console'da hata olup olmadığını kontrol edin

### Middleware Çalışmıyor

1. `src/middleware.js` dosyasının doğru konumda olduğundan emin olun
2. Next.js'i yeniden başlatın (Ctrl+C ve npm run dev)

## Sonraki Adımlar

1. Detaylı kullanım için `EXAMPLE_USAGE.md` dosyasını okuyun
2. Kendi sayfalarınızda çevirileri kullanmaya başlayın
3. Yeni namespace'ler ekleyin (ihtiyaca göre)
4. SEO metadata'larını özelleştirin

## Destek

Herhangi bir sorun yaşarsanız:
- `EXAMPLE_USAGE.md` dosyasındaki örneklere bakın
- Console loglarını kontrol edin
- JSON dosyalarının formatını doğrulayın
