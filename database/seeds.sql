-- ============================================
-- BROCCOLI E-COMMERCE SAMPLE SEED DATA
-- MySQL 8.0+ (InnoDB, utf8mb4)
-- ============================================

START TRANSACTION;

-- Roller ve İzinler
INSERT INTO roles (id, name, slug, description, is_system) VALUES
  (1, 'Sistem Yöneticisi', 'admin', 'Tüm modüllere tam yetki', 1),
  (2, 'Mağaza Yöneticisi', 'store-manager', 'Ürün ve sipariş yönetimi', 0)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO permissions (id, name, slug, module, description) VALUES
  (1, 'Ürünleri yönet', 'products.manage', 'products', 'Ürün oluşturma/güncelleme/silme'),
  (2, 'Siparişleri yönet', 'orders.manage', 'orders', 'Sipariş sürecini yönet')
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO role_permissions (role_id, permission_id, granted_at) VALUES
  (1, 1, NOW()),
  (1, 2, NOW()),
  (2, 1, NOW())
ON DUPLICATE KEY UPDATE granted_at = VALUES(granted_at);

-- Kullanıcılar
INSERT INTO users (id, email, password_hash, first_name, last_name, status, email_verified_at, created_at)
VALUES
  (1, 'admin@example.com', '$2y$10$examplehashforadmin', 'Admin', 'User', 'active', NOW(), NOW()),
  (2, 'manager@example.com', '$2y$10$examplehashformanager', 'Store', 'Manager', 'active', NOW(), NOW())
ON DUPLICATE KEY UPDATE first_name = VALUES(first_name);

INSERT INTO user_roles (user_id, role_id, assigned_at) VALUES
  (1, 1, NOW()),
  (2, 2, NOW())
ON DUPLICATE KEY UPDATE assigned_at = VALUES(assigned_at);

-- Kategoriler ve Markalar
INSERT INTO categories (id, name, slug, description, is_active, sort_order)
VALUES
  (1, 'Elektronik', 'elektronik', 'Elektronik ürünler', 1, 1),
  (2, 'Moda', 'moda', 'Giyim ve aksesuar', 1, 2)
ON DUPLICATE KEY UPDATE description = VALUES(description);

INSERT INTO brands (id, name, slug, description, is_active)
VALUES
  (1, 'BroccoliTech', 'broccolitech', 'Akıllı yaşam ürünleri', 1),
  (2, 'RoseLine', 'roseline', 'Moda ürünleri', 1)
ON DUPLICATE KEY UPDATE description = VALUES(description);

-- Ürün ve Varyantlar
INSERT INTO products (id, category_id, brand_id, sku, name, slug, base_price, tax_rate, stock_quantity, status, is_featured, published_at)
VALUES
  (1, 1, 1, 'BT-1000', 'Akıllı Ev Asistanı', 'akilli-ev-asistani', 2499.90, 18.00, 120, 'published', 1, NOW()),
  (2, 2, 2, 'RL-500', 'Gül Kurusu Midi Elbise', 'gul-kurusu-midi-elbise', 899.90, 18.00, 60, 'published', 1, NOW())
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO product_variants (id, product_id, sku, price_adjustment, stock_quantity, is_active)
VALUES
  (1, 1, 'BT-1000-TR', 0, 100, 1),
  (2, 1, 'BT-1000-EN', 50, 20, 1),
  (3, 2, 'RL-500-S', 0, 20, 1),
  (4, 2, 'RL-500-M', 0, 25, 1)
ON DUPLICATE KEY UPDATE stock_quantity = VALUES(stock_quantity);

-- Fiyat Kitapları
INSERT INTO price_books (id, name, currency, is_default, priority)
VALUES
  (1, 'Perakende Liste', 'TRY', 1, 1),
  (2, 'Kampanya Şubat', 'TRY', 0, 10)
ON DUPLICATE KEY UPDATE priority = VALUES(priority);

INSERT INTO product_prices (id, product_id, variant_id, price_book_id, base_price, discount_type, discount_value, starts_at)
VALUES
  (1, 1, 1, 1, 2499.90, NULL, NULL, NOW()),
  (2, 1, 2, 1, 2549.90, 'fixed', 100.00, NOW()),
  (3, 2, 3, 1, 899.90, NULL, NULL, NOW()),
  (4, 2, 4, 1, 899.90, NULL, NULL, NOW()),
  (5, 2, 3, 2, 899.90, 'percentage', 15.00, NOW())
ON DUPLICATE KEY UPDATE base_price = VALUES(base_price);

-- Stok Lokasyonları ve Envanter
INSERT INTO inventory_locations (id, code, name, location_type, country_code, is_active)
VALUES
  (1, 'WH-IST', 'İstanbul Ana Depo', 'warehouse', 'TR', 1),
  (2, 'ST-NISH', 'Nişantaşı Mağaza', 'store', 'TR', 1)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO product_inventory (id, product_id, variant_id, location_id, on_hand, reserved, safety_stock, reorder_point)
VALUES
  (1, 1, 1, 1, 80, 5, 10, 20),
  (2, 1, 2, 1, 18, 2, 5, 10),
  (3, 2, 3, 1, 30, 3, 5, 10),
  (4, 2, 4, 2, 15, 1, 5, 10)
ON DUPLICATE KEY UPDATE on_hand = VALUES(on_hand);

INSERT INTO inventory_movements (inventory_id, movement_type, reference_type, reference_id, quantity_change, reason, created_at)
VALUES
  (1, 'purchase_order', 'purchase_order', 1001, 100, 'Tedarikçi teslimatı', NOW()),
  (1, 'sale', 'order', 5001, -5, 'Sipariş gönderimi', NOW()),
  (3, 'transfer_in', 'transfer', 2001, 10, 'Depodan mağazaya transfer', NOW())
ON DUPLICATE KEY UPDATE quantity_change = VALUES(quantity_change);

-- Kampanya ve Kupon Örneği
INSERT INTO campaigns (id, name, slug, campaign_type, discount_type, discount_value, start_date, end_date, is_active)
VALUES
  (1, 'Sevgililer Günü Kampanyası', 'sevgililer-gunu', 'cart_discount', 'percentage', 10.00, NOW(), DATE_ADD(NOW(), INTERVAL 14 DAY), 1)
ON DUPLICATE KEY UPDATE discount_value = VALUES(discount_value);

INSERT INTO coupons (id, code, discount_type, discount_value, start_date, end_date, is_active)
VALUES
  (1, 'LOVE10', 'percentage', 10.00, NOW(), DATE_ADD(NOW(), INTERVAL 14 DAY), 1)
ON DUPLICATE KEY UPDATE discount_value = VALUES(discount_value);

-- Menü ve Banner
INSERT INTO menus (id, name, location, is_active)
VALUES
  (1, 'Ana Menü', 'header', 1)
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO menu_items (id, menu_id, title, url, sort_order, is_active)
VALUES
  (1, 1, 'Yeni Gelenler', '/yeni', 1, 1),
  (2, 1, 'Kampanyalar', '/kampanyalar', 2, 1)
ON DUPLICATE KEY UPDATE title = VALUES(title);

INSERT INTO banners (id, name, location, type, title, description, image, link_url, sort_order, is_active)
VALUES
  (1, 'Hero Vitrin', 'hero', 'image', 'Gül Kurusu Koleksiyon', 'Yeni sezonu keşfedin', '/images/hero.jpg', '/koleksiyon', 1, 1)
ON DUPLICATE KEY UPDATE title = VALUES(title);

-- Statik İçerik Sayfası
INSERT INTO pages (id, title, slug, content, template, is_active, published_at)
VALUES
  (1, 'Hakkımızda', 'hakkimizda', '<p>Broccoli ile sürdürülebilir alışveriş deneyimi</p>', 'default', 1, NOW())
ON DUPLICATE KEY UPDATE content = VALUES(content);

INSERT INTO seo_meta (entity_type, entity_id, locale, meta_title, meta_description)
VALUES
  ('page', 1, 'tr-TR', 'Hakkımızda - Broccoli', 'Broccoli e-ticaret markasının hikayesi')
ON DUPLICATE KEY UPDATE meta_title = VALUES(meta_title);

COMMIT;
