# Token Bazlı Tema Geçişi Kılavuzu

## 1. Özet
- Global design token seti (`renk`, `spacing`, `radius`, `shadow`) `src/app/globals.css` altında tanımlandı.
- Button, Input, Card, Navbar, Footer, Badge ve Modal bileşenleri için yeniden kullanılabilir UI katmanı `src/components/ui` klasörüne taşındı.
- `theme-dark` sınıfı ile tetiklenen isteğe bağlı koyu tema varyantı eklendi.
- `TokenizedThemeShowcase` bileşeni (examples klasörü) yeni tema bileşenlerinin birlikte nasıl çalıştığını gösterir.

## 2. Dosya Yapısı
```text
src/
├─ app/
│  └─ globals.css         # Design token'lar ve bileşen override'ları
├─ components/
│  ├─ shared/
│  │  └─ buttons/ButtonPrimary.js  # Token tabanlı Button sarmalayıcısı
│  ├─ ui/
│  │  ├─ Badge.jsx / Badge.module.css
│  │  ├─ Button.jsx / Button.module.css
│  │  ├─ Card.jsx / Card.module.css
│  │  ├─ Footer.jsx / Footer.module.css
│  │  ├─ Input.jsx / Input.module.css
│  │  ├─ Modal.jsx / Modal.module.css
│  │  └─ Navbar.jsx / Navbar.module.css
│  └─ examples/
│     └─ TokenizedThemeShowcase.{js, module.css}
```

## 3. Bileşen Dönüşüm Örnekleri
### 3.1 ButtonPrimary
```diff
-        <Link href={path} className="theme-btn-1 btn btn-effect-1">
-          {text}
-        </Link>
+        <Button
+          as={Link}
+          href={path}
+          variant={variant}
+          tone={tone}
+          size={size}
+          {...rest}
+        >
+          {text}
+        </Button>
```

### 3.2 Global CSS
```diff
-  --ltn__primary-color: #C1839F;
-  --ltn__secondary-color: #C1839F;
+  --ltn__primary-color: var(--color-primary-500);
+  --ltn__secondary-color: var(--color-primary-500);
+
+  --space-sm: 0.75rem;
+  --radius-md: 0.5rem;
+  --shadow-sm: 0 8px 18px rgba(213, 115, 115, 0.18);
+
+.theme-dark {
+  --surface-background: var(--color-gray-900);
+  --text-primary: var(--color-gray-50);
+}
```

## 4. Uygulama Adımları
- [ ] Sayfa/bölüm bazlı bileşenlerde (`sections/`, `layout/`) eski `.theme-btn-*` veya statik stiller yerine yeni UI bileşenlerini kullanın.
- [ ] Yeni bileşenlere `className` geçerek gerektiğinde ek varyantlar tanımlayın; ortak stilleri `src/components/ui` altında genişletin.
- [ ] Koyu tema ihtiyacında `document.body.classList.toggle('theme-dark')` veya layout düzeyinde `<body className="theme-dark">` uygulayın.
- [ ] Kütüphane dışı custom bileşenlerde spacing/radius değerlerini `var(--space-*)` ve `var(--radius-*)` üzerinden okuyun.
- [ ] PR'larda `TokenizedThemeShowcase` bileşenini kullanarak görsel regresyonları hızlıca kontrol edin.

## 5. Test Önerisi
- `npm run lint`
- Temalı bileşen sayfalarında (örn. Storybook veya Next.js sayfası) açık/koyu tema geçişini manuel doğrulayın.
