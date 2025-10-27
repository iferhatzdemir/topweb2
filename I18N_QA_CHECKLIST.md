# i18n QA Checklist

Çok dilli uygulamanızın kalitesini garanti altına almak için bu kapsamlı kontrol listesini kullanın.

## İçindekiler
1. [Çeviri Kalitesi](#1-çeviri-kalitesi)
2. [Teknik Doğrulama](#2-teknik-doğrulama)
3. [UI/UX Testi](#3-uiux-testi)
4. [Fonksiyonel Testler](#4-fonksiyonel-testler)
5. [SEO ve Erişilebilirlik](#5-seo-ve-erişilebilirlik)
6. [Performans](#6-performans)
7. [Tarayıcı ve Cihaz Testi](#7-tarayıcı-ve-cihaz-testi)

---

## 1. Çeviri Kalitesi

### 1.1 Dil ve Dilbilgisi
- [ ] **Yazım hataları**: Tüm metinler yazım hatalarından arındırılmış
- [ ] **Dilbilgisi kuralları**: Doğru dilbilgisi kullanılmış
- [ ] **Noktalama işaretleri**: Noktalama işaretleri doğru ve tutarlı
- [ ] **Büyük/küçük harf**: Dil kurallarına uygun büyük/küçük harf kullanımı
- [ ] **Aksan işaretleri**: Türkçe karakterler (ç, ğ, ı, ö, ş, ü) doğru görünüyor

### 1.2 Terminoloji
- [ ] **Terim tutarlılığı**: Aynı terimler için aynı çeviriler kullanılmış
- [ ] **Sözlük uyumu**: Terimler sözlüğe (LANGUAGE_STYLE_GUIDE.md) uygun
- [ ] **Marka terimleri**: Markaya özel terimler korunmuş
- [ ] **Teknik terimler**: Teknik terimler doğru çevrilmiş

### 1.3 Ton ve Üslup
- [ ] **Marka tonu**: Çeviriler marka tonuna uygun
- [ ] **Hedef kitle**: Hedef kitleye uygun dil kullanılmış
- [ ] **Tutarlı üslup**: Tüm sayfalarda tutarlı üslup
- [ ] **Kullanıcı odaklı**: "Siz" zamiri kullanılmış, kullanıcı odaklı ifadeler

### 1.4 Bağlam
- [ ] **UI bağlamı**: Çeviriler UI bağlamına uygun
- [ ] **Anlamlılık**: Çeviriler bağımsız olarak anlamlı
- [ ] **Kültürel uygunluk**: Kültürel farklılıklar dikkate alınmış

---

## 2. Teknik Doğrulama

### 2.1 JSON Dosyaları
- [ ] **Geçerli JSON**: Tüm JSON dosyaları geçerli format
- [ ] **Key tutarlılığı**: Tüm dillerde aynı key'ler mevcut
- [ ] **Eksik çeviriler**: Hiç eksik çeviri yok
- [ ] **Boş değerler**: Boş string veya null değer yok
- [ ] **Özel karakterler**: Özel karakterler escape edilmiş (", \, vb.)

#### Test Komutu
```bash
# JSON formatını doğrula
node -e "require('./src/i18n/locales/tr/common.json')"
node -e "require('./src/i18n/locales/en/common.json')"
```

### 2.2 Interpolasyon
- [ ] **Değişken isimleri**: Interpolasyon değişkenleri korunmuş ({{count}}, {{name}}, vb.)
- [ ] **Değişken formatı**: Doğru interpolasyon formatı (i18next: {{variable}})
- [ ] **Çoğul formlar**: Pluralization doğru uygulanmış
- [ ] **Dinamik içerik**: Dinamik içerikler test edilmiş

#### Test Örneği
```javascript
// Interpolasyon testi
t('showing', { firstItem: 1, lastItem: 10, totalItems: 50 })
// Beklenen: "1-10 arası gösteriliyor (toplam 50 sonuç)"

// Pluralization testi
t('itemsInCart', { count: 0 })  // "0 ürün sepetinizde"
t('itemsInCart', { count: 1 })  // "1 ürün sepetinizde"
t('itemsInCart', { count: 5 })  // "5 ürün sepetinizde"
```

### 2.3 Namespace Yapısı
- [ ] **Namespace organizasyonu**: Doğru namespace'ler kullanılmış
- [ ] **Import yolları**: Import yolları doğru
- [ ] **Lazy loading**: Namespace'ler gerektiğinde yükleniyor
- [ ] **Config dosyası**: i18n config güncel

---

## 3. UI/UX Testi

### 3.1 Görsel Düzen
- [ ] **Metin taşması**: Metinler container'lardan taşmıyor
- [ ] **Kırpılma**: Buton ve label'larda metin kırpılmıyor
- [ ] **Satır sonu**: Uzun çeviriler düzgün satır sonuna geliyor
- [ ] **Boşluklar**: Metinler arası boşluklar uygun
- [ ] **Hizalama**: Metinler düzgün hizalanmış

#### Test Senaryosu
**Türkçe vs İngilizce Uzunluk Farkları:**
- Butonlarda uzun metinler (örn: "Favorilere Ekle" vs "Add to Wishlist")
- Mobil ekranlarda navigasyon menüsü
- Ürün kartlarında başlıklar
- Form label'ları

### 3.2 Responsive Tasarım
- [ ] **Mobil görünüm**: Mobilde tüm metinler okunabilir
- [ ] **Tablet görünüm**: Tablet'te düzen bozulmuyor
- [ ] **Desktop görünüm**: Desktop'ta her şey yerli yerinde

#### Viewport Boyutları
- Mobile: 375px, 390px, 414px
- Tablet: 768px, 1024px
- Desktop: 1366px, 1920px

### 3.3 Font ve Tipografi
- [ ] **Font desteği**: Tüm karakterler doğru font ile gösteriliyor
- [ ] **Türkçe karakterler**: ç, ğ, ı, ö, ş, ü doğru görünüyor
- [ ] **Font boyutu**: Tüm dillerde okunabilir font boyutu
- [ ] **Satır yüksekliği**: Uygun satır yüksekliği (line-height)

---

## 4. Fonksiyonel Testler

### 4.1 Dil Değiştirme
- [ ] **Dil seçimi**: Dil değiştirici çalışıyor
- [ ] **Cookie kaydı**: Seçilen dil cookie'ye kaydediliyor
- [ ] **Sayfa yenileme**: Sayfa yenilendiğinde dil korunuyor
- [ ] **URL güncelleme**: URL locale prefix'i alıyor (örn: /en/products)
- [ ] **Otomatik yönlendirme**: Middleware doğru yönlendiriyor

#### Test Adımları
1. TR dilinde siteyi aç
2. EN diline geç
3. Sayfayı yenile → Dil EN olmalı
4. Yeni sekme aç → Dil EN olmalı
5. Cookie'leri temizle → Varsayılan dile dön (TR)

### 4.2 Checkout Akışı
- [ ] **Sepet sayfası**: Tüm metinler çevrilmiş
- [ ] **Checkout formu**: Form label'ları ve placeholder'lar çevrilmiş
- [ ] **Placeholder doğruluğu**: Placeholder metinleri yönergeleri koruyor ve locale'e göre uyarlanmış
- [ ] **Doğrulama mesajları**: Hata mesajları çevrilmiş
- [ ] **Başarı mesajları**: Sipariş onay mesajları çevrilmiş
- [ ] **Email bildirimleri**: Otomatik email'ler doğru dilde

#### Test Senaryosu
1. Ürün sepete ekle
2. Sepeti görüntüle
3. Checkout'a git
4. Formu doldur
5. Doğrulama hatası oluştur → Hata mesajı çevrilmiş mi?
6. Siparişi tamamla → Onay mesajı çevrilmiş mi?

### 4.3 Kullanıcı Akışları
- [ ] **Kayıt olma**: Tüm form ve mesajlar çevrilmiş
- [ ] **Giriş yapma**: Login sayfası çevrilmiş
- [ ] **Şifre sıfırlama**: Şifre sıfırlama akışı çevrilmiş
- [ ] **Profil güncelleme**: Hesap sayfası çevrilmiş
- [ ] **Sipariş takibi**: Sipariş geçmişi çevrilmiş

### 4.4 Ürün Sayfaları
- [ ] **Ürün listeleme**: Sıralama ve filtreleme çevrilmiş
- [ ] **Ürün detayı**: Tüm tab'lar ve bölümler çevrilmiş
- [ ] **Yorumlar**: Yorum formu çevrilmiş
- [ ] **İlgili ürünler**: İlgili ürün bölümü çevrilmiş

---

## 5. SEO ve Erişilebilirlik

### 5.1 SEO
- [ ] **HTML lang**: `<html lang="tr">` veya `<html lang="en">` doğru
- [ ] **Meta title**: Sayfa başlıkları çevrilmiş
- [ ] **Meta description**: Sayfa açıklamaları çevrilmiş
- [ ] **Hreflang tags**: Alternate dil linkleri mevcut
- [ ] **Canonical URL**: Canonical linkler doğru
- [ ] **Open Graph**: OG tag'leri çevrilmiş
- [ ] **Structured data**: JSON-LD doğru dilde

#### Kontrol Komutları
```bash
# View source'ta kontrol et:
# <html lang="tr">
# <link rel="alternate" hreflang="en" href="..." />
# <link rel="alternate" hreflang="tr" href="..." />
# <link rel="canonical" href="..." />
```

### 5.2 Erişilebilirlik
- [ ] **aria-label**: aria-label'lar çevrilmiş
- [ ] **alt text**: Görsellerin alt text'leri çevrilmiş
- [ ] **Ekran okuyucu**: Ekran okuyucu ile test edilmiş
- [ ] **Klavye navigasyonu**: Klavye ile erişilebilir
- [ ] **WCAG uyumu**: WCAG 2.1 AA standartlarına uygun

---

## 6. Performans

### 6.1 Yükleme Hızı
- [ ] **İlk yükleme**: İlk sayfa yüklemesi hızlı (<3s)
- [ ] **Dil değiştirme**: Dil değiştirme anında
- [ ] **Namespace loading**: Namespace'ler lazy loading ile yükleniyor
- [ ] **Bundle size**: i18n dosyaları bundle size'ı artırmamış

#### Test Araçları
- Lighthouse (Performance score >90)
- WebPageTest
- Chrome DevTools Network tab

### 6.2 Caching
- [ ] **JSON caching**: Çeviri dosyaları cache'leniyor
- [ ] **Cookie caching**: Dil tercihi cookie'de
- [ ] **Static generation**: Statik sayfalar pre-render edilmiş

---

## 7. Tarayıcı ve Cihaz Testi

### 7.1 Tarayıcı Uyumluluğu
- [ ] **Chrome**: Son 2 versiyon
- [ ] **Firefox**: Son 2 versiyon
- [ ] **Safari**: Son 2 versiyon
- [ ] **Edge**: Son 2 versiyon
- [ ] **Mobile Safari**: iOS son 2 versiyon
- [ ] **Chrome Mobile**: Android son 2 versiyon

### 7.2 Cihaz Testi
- [ ] **iPhone**: iPhone 12, 13, 14, 15
- [ ] **Android**: Samsung, Google Pixel
- [ ] **Tablet**: iPad, Android tablet
- [ ] **Desktop**: Windows, macOS

---

## 8. Özel Senaryolar

### 8.1 Edge Cases
- [ ] **Çok uzun metinler**: 100+ karakter içeren çeviriler
- [ ] **Özel karakterler**: `&`, `<`, `>`, `"`, `'` karakterleri
- [ ] **Sayılar**: Büyük sayılar (1,000,000)
- [ ] **Tarihler**: Farklı tarih formatları
- [ ] **Para birimleri**: TRY, USD, EUR formatları

### 8.2 Hata Durumları
- [ ] **404 sayfası**: Çevrilmiş
- [ ] **500 sayfası**: Çevrilmiş
- [ ] **Boş durumlar**: Empty state mesajları çevrilmiş
- [ ] **Yükleme durumları**: Loading mesajları çevrilmiş
- [ ] **Hata mesajları**: Tüm error mesajları çevrilmiş

---

## 9. Regresyon Testi

### 9.1 Yeni Özellik Eklendiğinde
- [ ] Yeni çeviriler tüm dillere eklendi
- [ ] Mevcut çeviriler bozulmadı
- [ ] Namespace yapısı korundu
- [ ] Dokümantasyon güncellendi

### 9.2 Çeviri Güncellendiğinde
- [ ] Değişiklik log'landı
- [ ] İlgili sayfalar test edildi
- [ ] UI düzeni kontrol edildi
- [ ] Terim sözlüğü güncellendi

---

## 10. Test Raporu Şablonu

### Test Özeti

| Kategori | Durum | Notlar |
|----------|-------|--------|
| Çeviri Kalitesi | ✅/❌ | |
| Teknik Doğrulama | ✅/❌ | |
| UI/UX | ✅/❌ | |
| Fonksiyonel | ✅/❌ | |
| SEO | ✅/❌ | |
| Performans | ✅/❌ | |
| Tarayıcı Uyumu | ✅/❌ | |

### Bulunan Hatalar

| # | Kategori | Açıklama | Öncelik | Durum |
|---|----------|----------|---------|-------|
| 1 | | | Yüksek/Orta/Düşük | Açık/Kapalı |

### Test Ortamı

- **Test Tarihi**:
- **Test Eden**:
- **Tarayıcı**:
- **Cihaz**:
- **Dil**:
- **Versiyon**:

---

## Hızlı Test Scripti

Aşağıdaki test scriptini kullanarak otomatik kontroller yapabilirsiniz:

```bash
#!/bin/bash

echo "🧪 i18n QA Testi Başlıyor..."

# JSON formatı kontrolü
echo "📋 JSON dosyaları kontrol ediliyor..."
for file in src/i18n/locales/**/*.json; do
  node -e "require('./$file')" || echo "❌ Hata: $file"
done

# Eksik çeviri kontrolü
echo "🔍 Eksik çeviriler kontrol ediliyor..."
# (Burada eksik çeviri kontrolü için custom script eklenebilir)

# Build testi
echo "🏗️  Build testi..."
npm run build

echo "✅ Testler tamamlandı!"
```

---

## Onay İmzaları

Test tamamlandığında aşağıdaki imzalar alınmalıdır:

- [ ] **QA Engineer**: İsim, Tarih
- [ ] **Çevirmen**: İsim, Tarih
- [ ] **Product Manager**: İsim, Tarih
- [ ] **Tech Lead**: İsim, Tarih

---

**Versiyon**: 1.0.0
**Son Güncelleme**: 24.10.2025
