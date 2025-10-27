# Normalizasyon Notları

Bu şema, MySQL 8 (InnoDB, utf8mb4) üzerinde çalışacak şekilde 3NF ve gerektiğinde Boyce-Codd normal form prensiplerini uygular. Aşağıdaki tablolar kritik normalizasyon kararlarını ve gerekçelerini özetler:

## Ürün & Fiyat Yönetimi
- **products** tablosu ürünün değişmeyen temel özelliklerini saklar; varyant bazlı farklılıklar `product_variants` tablosuna ayrılmıştır. Böylece renk/boyut gibi özellikler tekrar eden sütunlara dönüşmez.
- **product_attributes** ve **product_attribute_values** ilişkisi, nitelikleri (ör. renk) ve değerlerini (ör. "Gül Kurusu") ayrı tablolara taşıyarak EAV benzeri ancak kontrollü bir yapı sağlar. `product_variant_attributes` köprü tablosu varyant başına nitelik kombinasyonunu temsil eder.
- **price_books** ve **product_prices** tablolari, farklı kanal/pazar senaryoları için (perakende, B2B, kampanya) fiyatların yinelenmesini önler. `price_history` ile tarihsel değişiklikler ayrı tutulur; ürün tablosunda tekil fiyat saklanmaz.

## Stok Yönetimi
- **inventory_locations** ve **product_inventory** tablolari stok bilgisini lokasyon bazında tutar; tek sütunlu stok yapısının doğuracağı tekrarları engeller. `inventory_movements` ile hareketler izlenir; miktar değişimleri normalize edilerek auditable hale getirilir.

## Kampanya & Kupon
- Kampanyalar (`campaigns`) ürün/kategori bağlamına `campaign_products` ve `campaign_categories` köprü tabloları ile bağlanır. Böylece bir kampanya çok ürünü, bir ürün de çok kampanyayı destekler (N-N ilişki).
- Kupon kullanım kayıtları `coupon_usage` tablosunda tutulur; kupon tablosuna yeni satırlar eklemek yerine her kullanım için ayrı kayıt ile normalizasyon korunur.

## İçerik & SEO
- İçerik sayfaları (`pages`) ve blog gönderileri (`blog_posts`) metin içerikleri uzun metin (LONGTEXT) olarak saklar. `seo_meta` tablosu, SEO alanlarını entity bazlı ayrı bir tabloya taşıyarak yerelleştirme (`locale`) desteği ve içerik tekrarını azaltır.
- `page_blocks` dinamik bileşen verisini JSON alanı ile saklar; blok tipleri tekrarlı sütunlara dönüşmez.

## Kullanıcı & RBAC
- RBAC, `users` ↔ `roles` (N-N) ve `roles` ↔ `permissions` (N-N) yapıları ile normalize edilmiştir. Böylece rollerin yetkileri ve kullanıcı-rol atamaları ayrı tablolarda yönetilir.
- Oturum (`user_sessions`), yenileme tokenı (`refresh_tokens`) ve doğrulama tokenları (`verification_tokens`) farklı kullanım amaçlarına göre ayrılarak veri şişmesini ve karmaşık indeksleri önler.

## Sipariş & Sepet
- Sipariş (`orders`) ve sipariş kalemi (`order_items`) ayrımı, sipariş başlık ve kalem verilerinin tekrarını engeller. `order_status_history` ile değişiklikler ayrı satırlarda izlenir.
- Sepet (`carts`) ve sepet kalemleri (`cart_items`) normalizasyonu, kullanıcı/sessiyon başına bir sepet ve satır bazlı ürün bağlantılarını mümkün kılar.

## Medya & İçerik Blokları
- Medya dosyaları `product_media` tablosunda tutulur; varyant bazlı görseller `variant_id` ile ilişkilendirilebilir. Bu yapı, medya verisinin ürün tablosunda tekrarını engeller.

## Genel İndeks & FK Stratejisi
- Her tabloda primary key yanı sıra SELECT/WHERE/LIMIT kullanım sıklığına göre `idx_*` indeksleri tanımlanmıştır. N-N ilişkilerde birleşik primary key kullanılarak tekrarların önüne geçilir.
- Tüm foreign key’ler InnoDB referans bütünlüğü ve cascade güncelleme/silme politikaları ile tanımlanmıştır; veri tutarlılığı otomatik olarak korunur.

## Denormalizasyon Notu
- Toplam tutarlar (`orders.total_amount`, `cart_items.total_price`) sorgu performansı için hesaplanmış kolon olarak saklanır. Bu alanlar uygulama katmanında veya trigger ile yeniden hesaplanmalıdır; raporlama senaryolarında önemli hız kazancı sağlar.

