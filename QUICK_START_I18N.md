# 🚀 i18n Hızlı Başlangıç Kılavuzu

Bu kılavuz, Broccoli projesinde i18n (çok dilli destek) sistemini nasıl kullanacağınızı öğretir.

## ⚡ Hızlı Test

### 1. Projeyi Çalıştırın
```bash
npm run dev
```

### 2. Türkçe Sayfayı Test Edin
Tarayıcıda açın:
```
http://localhost:3000
```
✅ Tüm metinler Türkçe olmalı

### 3. İngilizce Sayfayı Test Edin
Tarayıcıda açın:
```
http://localhost:3000/en
```
✅ Tüm metinler İngilizce olmalı

### 4. Dil Değiştirici Test Edin
1. Header'da (sağ üstte) dil seçiciye tıklayın
2. "English" veya "Türkçe" seçin
3. Sayfa otomatik yenilenecek ve dil değişecek

---

## 📝 Yeni Bir Komponente i18n Eklemek

### Client Component (Tavsiye Edilen)

```jsx
"use client";
import { useLocale } from "@/hooks/useLocale";

const MyComponent = () => {
  // useLocale hook'u ile namespace belirtin
  const { t, locale } = useLocale('products');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <button>{t('addToCart')}</button>
    </div>
  );
};

export default MyComponent;
```

### Server Component

```jsx
import { useTranslation } from '@/i18n';
import { headers } from 'next/headers';

export default async function MyServerPage() {
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

---

## 📂 Çeviri Dosyalarına Yeni Metin Eklemek

### Adım 1: Namespace Seçin

Mevcut namespace'ler:
- `common` - Genel terimler
- `header` - Header metinleri
- `footer` - Footer metinleri
- `navigation` - Menü linkleri
- `products` - Ürünler
- `cart` - Sepet
- `checkout` - Ödeme
- `auth` - Login/Register
- `blog` - Blog
- `pages` - Diğer sayfalar
- `buttons` - Butonlar
- `alerts` - Bildirimler
- `empty-states` - Boş durumlar
- `errors` - Hatalar

### Adım 2: JSON Dosyalarına Ekleyin

**Türkçe** (`src/i18n/locales/tr/products.json`):
```json
{
  "title": "Ürünler",
  "addToCart": "Sepete Ekle",
  "newKey": "Yeni çeviri metni"  // ← Yeni eklendi
}
```

**İngilizce** (`src/i18n/locales/en/products.json`):
```json
{
  "title": "Products",
  "addToCart": "Add to Cart",
  "newKey": "New translation text"  // ← Yeni eklendi
}
```

### Adım 3: Komponentte Kullanın

```jsx
const { t } = useLocale('products');

<div>{t('newKey')}</div>
```

---

## 🎯 Kullanım Senaryoları

### 1. Basit Metin

```jsx
// JSON
{
  "welcome": "Hoş Geldiniz"
}

// Component
{t('welcome')}
// Çıktı: Hoş Geldiniz
```

### 2. Değişken ile (Interpolation)

```jsx
// JSON
{
  "itemsInCart": "{{count}} ürün sepetinizde"
}

// Component
{t('itemsInCart', { count: 5 })}
// Çıktı: 5 ürün sepetinizde
```

### 3. Nested Keys

```jsx
// JSON
{
  "login": {
    "title": "Giriş Yap",
    "email": "E-posta",
    "password": "Şifre"
  }
}

// Component
{t('login.title')}    // Giriş Yap
{t('login.email')}    // E-posta
{t('login.password')} // Şifre
```

### 4. Çoklu Namespace

```jsx
const { t: tCommon } = useLocale('common');
const { t: tProducts } = useLocale('products');

<div>
  <h1>{tProducts('title')}</h1>
  <button>{tCommon('save')}</button>
</div>
```

### 5. Placeholder

```jsx
<input
  type="text"
  placeholder={t('search.placeholder')}
/>
```

### 6. Button Title

```jsx
<button
  title={t('products.addToCart')}
  aria-label={t('products.addToCart')}
>
  <i className="fas fa-shopping-cart"></i>
</button>
```

---

## 🔍 Hangi Namespace'i Kullanmalıyım?

| Component Tipi | Namespace | Örnek |
|---------------|-----------|-------|
| Header, Navbar | `header` | Dil seçici, arama |
| Footer | `footer` | Alt menü, copyright |
| Ürün Kartı | `products` | Fiyat, stok, sepete ekle |
| Sepet Sayfası | `cart` | Sepet toplamı, kupon |
| Ödeme Sayfası | `checkout` | Fatura bilgileri, ödeme |
| Login/Register | `auth` | E-posta, şifre, kayıt |
| Blog | `blog` | Okumaya devam et, yorumlar |
| İletişim/Hakkımızda | `pages` | Form alanları, bilgiler |
| Butonlar | `buttons` | Genel butonlar |
| Bildirimler | `alerts` | Başarı/hata mesajları |
| Boş Durum | `empty-states` | Veri yok mesajları |
| Hatalar | `errors` | 404, 500 hataları |
| Genel | `common` | Kaydet, iptal, geri |

---

## 🐛 Sorun Giderme

### Çeviri Görünmüyor

**Problem**: Ekranda çeviri metni yerine key görünüyor (örn: `products.addToCart`)

**Çözümler**:
1. Namespace'in doğru olduğunu kontrol edin
   ```jsx
   // Yanlış
   const { t } = useLocale('product'); // 's' eksik!

   // Doğru
   const { t } = useLocale('products');
   ```

2. JSON dosyasında key'in var olduğunu kontrol edin
   ```bash
   # Dosyayı açın
   src/i18n/locales/tr/products.json
   ```

3. JSON syntax'ını kontrol edin (virgül, parantez)
   ```json
   {
     "title": "Ürünler",  // ← Virgül var
     "price": "Fiyat"     // ← Son satırda virgül YOK
   }
   ```

### Dil Değişmiyor

**Problem**: Dil seçiciye tıkladığımda dil değişmiyor

**Çözümler**:
1. Cookie'leri temizleyin
   ```
   http://localhost:3000/test-locale
   ```
   "Locale Cookie'yi Sil" butonuna tıklayın

2. Tarayıcı console'unda hata var mı kontrol edin (F12)

3. Sayfayı hard refresh yapın (Ctrl+Shift+R veya Cmd+Shift+R)

### Hydration Hatası

**Problem**: Console'da "Hydration error" uyarısı

**Çözüm**: Client component kullanıyorsanız, locale'i useEffect içinde set edin
```jsx
const [currentLocale, setCurrentLocale] = useState('tr');

useEffect(() => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };
  setCurrentLocale(getCookie('i18next') || 'tr');
}, []);

const { t } = useTranslation(currentLocale, 'products');
```

Veya daha kolay: `useLocale` hook'unu kullanın (önerilir!)
```jsx
const { t, locale } = useLocale('products');
```

---

## 📊 Test Sayfaları

### i18n Test Sayfası
**URL**: `http://localhost:3000/i18n-test`

Tüm namespace'lerdeki çevirileri gösterir. Çevirilerin doğru çalıştığını test etmek için kullanın.

### Locale Debug Sayfası
**URL**: `http://localhost:3000/test-locale`

Locale algılama detaylarını gösterir. Dil problemlerini debug etmek için kullanın.

---

## 📚 Detaylı Dokümantasyon

Daha fazla bilgi için:

- **[I18N_IMPLEMENTATION_SUMMARY.md](./I18N_IMPLEMENTATION_SUMMARY.md)** - Kapsamlı teknik dokümantasyon
- **[HOW_TO_USE_I18N.md](./HOW_TO_USE_I18N.md)** - Detaylı kullanım kılavuzu
- **[LANGUAGE_STYLE_GUIDE.md](./LANGUAGE_STYLE_GUIDE.md)** - Çeviri terimleri sözlüğü
- **[I18N_QA_CHECKLIST.md](./I18N_QA_CHECKLIST.md)** - QA test listesi

---

## ✅ Checklist

Yeni bir komponente i18n eklerken bu adımları takip edin:

- [ ] Hangi namespace'i kullanacağımı belirledim
- [ ] JSON dosyalarına (TR ve EN) çevirileri ekledim
- [ ] JSON syntax'ının doğru olduğunu kontrol ettim
- [ ] Component'e `useLocale` hook'unu ekledim
- [ ] Tüm sabit metinleri `t()` ile sarmaladım
- [ ] Türkçe sayfayı test ettim (`http://localhost:3000`)
- [ ] İngilizce sayfayı test ettim (`http://localhost:3000/en`)
- [ ] Dil değiştirici ile geçiş test ettim
- [ ] Console'da hata olmadığını kontrol ettim

---

**İyi çalışmalar! 🎉**

Sorularınız için: [I18N_IMPLEMENTATION_SUMMARY.md](./I18N_IMPLEMENTATION_SUMMARY.md) → Destek bölümü
