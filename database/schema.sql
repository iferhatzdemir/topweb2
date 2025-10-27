-- ============================================
-- BROCCOLI E-COMMERCE DATABASE SCHEMA
-- MySQL 8.0+ (InnoDB, utf8mb4)
-- ============================================

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- ============================================
-- 1. ÜRÜN YÖNETİMİ (PRODUCT MANAGEMENT)
-- ============================================

-- Kategoriler
CREATE TABLE `categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` INT UNSIGNED NULL DEFAULT NULL,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(150) NOT NULL,
  `description` TEXT NULL,
  `image` VARCHAR(255) NULL,
  `icon` VARCHAR(255) NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `meta_title` VARCHAR(255) NULL,
  `meta_description` TEXT NULL,
  `meta_keywords` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC),
  INDEX `idx_parent_id` (`parent_id` ASC),
  INDEX `idx_is_active` (`is_active` ASC),
  INDEX `idx_sort_order` (`sort_order` ASC),
  CONSTRAINT `fk_categories_parent`
    FOREIGN KEY (`parent_id`)
    REFERENCES `categories` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Markalar
CREATE TABLE `brands` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(150) NOT NULL,
  `description` TEXT NULL,
  `logo` VARCHAR(255) NULL,
  `website` VARCHAR(255) NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC),
  INDEX `idx_is_active` (`is_active` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ürünler
CREATE TABLE `products` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` INT UNSIGNED NULL,
  `brand_id` INT UNSIGNED NULL,
  `sku` VARCHAR(50) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(300) NOT NULL,
  `short_description` TEXT NULL,
  `description` TEXT NULL,
  `base_price` DECIMAL(10,2) NOT NULL,
  `discount_type` ENUM('fixed', 'percentage') NULL,
  `discount_value` DECIMAL(10,2) NULL DEFAULT 0,
  `final_price` DECIMAL(10,2) GENERATED ALWAYS AS (
    CASE
      WHEN discount_type = 'fixed' THEN base_price - discount_value
      WHEN discount_type = 'percentage' THEN base_price - (base_price * discount_value / 100)
      ELSE base_price
    END
  ) STORED,
  `tax_rate` DECIMAL(5,2) NOT NULL DEFAULT 18.00,
  `stock_quantity` INT NOT NULL DEFAULT 0,
  `low_stock_threshold` INT NOT NULL DEFAULT 10,
  `weight` DECIMAL(8,2) NULL COMMENT 'gram cinsinden',
  `dimensions` VARCHAR(50) NULL COMMENT 'LxWxH cm',
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `is_bestseller` TINYINT(1) NOT NULL DEFAULT 0,
  `is_new` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('draft', 'published', 'out_of_stock', 'discontinued') NOT NULL DEFAULT 'draft',
  `view_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `rating_avg` DECIMAL(3,2) NULL DEFAULT NULL,
  `rating_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `meta_title` VARCHAR(255) NULL,
  `meta_description` TEXT NULL,
  `meta_keywords` VARCHAR(255) NULL,
  `published_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `sku_UNIQUE` (`sku` ASC),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC),
  INDEX `idx_category_id` (`category_id` ASC),
  INDEX `idx_brand_id` (`brand_id` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_is_featured` (`is_featured` ASC),
  INDEX `idx_is_bestseller` (`is_bestseller` ASC),
  INDEX `idx_final_price` (`final_price` ASC),
  INDEX `idx_created_at` (`created_at` ASC),
  FULLTEXT INDEX `ft_search` (`name`, `description`),
  CONSTRAINT `fk_products_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_products_brand`
    FOREIGN KEY (`brand_id`)
    REFERENCES `brands` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ürün Varyantları (Renk, Boyut vb.)
CREATE TABLE `product_attributes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL COMMENT 'Renk, Boyut, Model vb.',
  `type` ENUM('color', 'size', 'text', 'number') NOT NULL DEFAULT 'text',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_attribute_values` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `attribute_id` INT UNSIGNED NOT NULL,
  `value` VARCHAR(100) NOT NULL,
  `color_code` VARCHAR(7) NULL COMMENT 'HEX renk kodu',
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_attribute_id` (`attribute_id` ASC),
  CONSTRAINT `fk_attr_values_attribute`
    FOREIGN KEY (`attribute_id`)
    REFERENCES `product_attributes` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_variants` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `sku` VARCHAR(50) NOT NULL,
  `price_adjustment` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `stock_quantity` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `sku_UNIQUE` (`sku` ASC),
  INDEX `idx_product_id` (`product_id` ASC),
  CONSTRAINT `fk_variants_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stok Lokasyonları (Depo/Mağaza)
CREATE TABLE `inventory_locations` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(50) NOT NULL,
  `name` VARCHAR(150) NOT NULL,
  `location_type` ENUM('warehouse', 'store', 'dropship') NOT NULL DEFAULT 'warehouse',
  `address` TEXT NULL,
  `city` VARCHAR(100) NULL,
  `state` VARCHAR(100) NULL,
  `country_code` VARCHAR(2) NOT NULL DEFAULT 'TR',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC),
  INDEX `idx_location_type` (`location_type` ASC),
  INDEX `idx_is_active` (`is_active` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ürün Bazlı Stok Seviyeleri
CREATE TABLE `product_inventory` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `variant_id` INT UNSIGNED NULL,
  `variant_key` INT UNSIGNED GENERATED ALWAYS AS (IFNULL(`variant_id`, 0)) STORED,
  `location_id` INT UNSIGNED NOT NULL,
  `on_hand` INT NOT NULL DEFAULT 0,
  `reserved` INT NOT NULL DEFAULT 0,
  `safety_stock` INT NOT NULL DEFAULT 0,
  `reorder_point` INT NOT NULL DEFAULT 0,
  `incoming` INT NOT NULL DEFAULT 0,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_inventory_product_location_variant` (`product_id` ASC, `location_id` ASC, `variant_key` ASC),
  INDEX `idx_product_location` (`product_id` ASC, `location_id` ASC),
  INDEX `idx_reorder_point` (`reorder_point` ASC),
  CONSTRAINT `fk_inventory_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_inventory_variant`
    FOREIGN KEY (`variant_id`)
    REFERENCES `product_variants` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_inventory_location`
    FOREIGN KEY (`location_id`)
    REFERENCES `inventory_locations` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Stok Hareketleri
CREATE TABLE `inventory_movements` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `inventory_id` BIGINT UNSIGNED NOT NULL,
  `movement_type` ENUM('sale', 'return', 'adjustment', 'transfer_in', 'transfer_out', 'purchase_order') NOT NULL,
  `reference_type` VARCHAR(50) NULL,
  `reference_id` INT UNSIGNED NULL,
  `quantity_change` INT NOT NULL,
  `reason` VARCHAR(255) NULL,
  `created_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_inventory_id` (`inventory_id` ASC),
  INDEX `idx_movement_type` (`movement_type` ASC),
  INDEX `idx_reference` (`reference_type` ASC, `reference_id` ASC),
  CONSTRAINT `fk_movements_inventory`
    FOREIGN KEY (`inventory_id`)
    REFERENCES `product_inventory` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_movements_user`
    FOREIGN KEY (`created_by`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_variant_attributes` (
  `variant_id` INT UNSIGNED NOT NULL,
  `attribute_value_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`variant_id`, `attribute_value_id`),
  INDEX `idx_attribute_value_id` (`attribute_value_id` ASC),
  CONSTRAINT `fk_variant_attrs_variant`
    FOREIGN KEY (`variant_id`)
    REFERENCES `product_variants` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_variant_attrs_value`
    FOREIGN KEY (`attribute_value_id`)
    REFERENCES `product_attribute_values` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ürün Görselleri
CREATE TABLE `product_media` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `variant_id` INT UNSIGNED NULL,
  `media_type` ENUM('image', 'video', 'audio') NOT NULL DEFAULT 'image',
  `file_path` VARCHAR(500) NOT NULL,
  `file_url` VARCHAR(500) NULL,
  `thumbnail_path` VARCHAR(500) NULL,
  `alt_text` VARCHAR(255) NULL,
  `title` VARCHAR(255) NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_primary` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_product_id` (`product_id` ASC),
  INDEX `idx_variant_id` (`variant_id` ASC),
  INDEX `idx_sort_order` (`sort_order` ASC),
  CONSTRAINT `fk_media_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_media_variant`
    FOREIGN KEY (`variant_id`)
    REFERENCES `product_variants` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Fiyat Listeleri ve Tarihçesi
CREATE TABLE `price_books` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `currency` VARCHAR(3) NOT NULL DEFAULT 'TRY',
  `description` TEXT NULL,
  `is_default` TINYINT(1) NOT NULL DEFAULT 0,
  `priority` INT NOT NULL DEFAULT 0,
  `starts_at` TIMESTAMP NULL DEFAULT NULL,
  `ends_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_price_books_name` (`name` ASC),
  INDEX `idx_is_default` (`is_default` ASC),
  INDEX `idx_schedule` (`starts_at` ASC, `ends_at` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_prices` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `variant_id` INT UNSIGNED NULL,
  `price_book_id` INT UNSIGNED NOT NULL,
  `base_price` DECIMAL(10,2) NOT NULL,
  `discount_type` ENUM('fixed', 'percentage') NULL,
  `discount_value` DECIMAL(10,2) NULL,
  `final_price` DECIMAL(10,2) GENERATED ALWAYS AS (
    CASE
      WHEN discount_type = 'fixed' THEN base_price - discount_value
      WHEN discount_type = 'percentage' THEN base_price - (base_price * discount_value / 100)
      ELSE base_price
    END
  ) STORED,
  `starts_at` TIMESTAMP NULL DEFAULT NULL,
  `ends_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_price_variant_book` (`variant_id` ASC, `price_book_id` ASC, `starts_at` ASC),
  INDEX `idx_product_book` (`product_id` ASC, `price_book_id` ASC),
  INDEX `idx_active_window` (`starts_at` ASC, `ends_at` ASC),
  CONSTRAINT `fk_prices_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_prices_variant`
    FOREIGN KEY (`variant_id`)
    REFERENCES `product_variants` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_prices_book`
    FOREIGN KEY (`price_book_id`)
    REFERENCES `price_books` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `price_history` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_price_id` BIGINT UNSIGNED NOT NULL,
  `changed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `changed_by` INT UNSIGNED NULL,
  `old_base_price` DECIMAL(10,2) NULL,
  `new_base_price` DECIMAL(10,2) NULL,
  `old_discount_type` ENUM('fixed', 'percentage') NULL,
  `new_discount_type` ENUM('fixed', 'percentage') NULL,
  `old_discount_value` DECIMAL(10,2) NULL,
  `new_discount_value` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id`),
  INDEX `idx_product_price_id` (`product_price_id` ASC),
  CONSTRAINT `fk_price_history_price`
    FOREIGN KEY (`product_price_id`)
    REFERENCES `product_prices` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_price_history_user`
    FOREIGN KEY (`changed_by`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ürün Etiketleri
CREATE TABLE `tags` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(70) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_tags` (
  `product_id` INT UNSIGNED NOT NULL,
  `tag_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`product_id`, `tag_id`),
  INDEX `idx_tag_id` (`tag_id` ASC),
  CONSTRAINT `fk_product_tags_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_product_tags_tag`
    FOREIGN KEY (`tag_id`)
    REFERENCES `tags` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ürün Yorumları ve Değerlendirmeler
CREATE TABLE `product_reviews` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `product_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NULL,
  `rating` TINYINT UNSIGNED NOT NULL COMMENT '1-5 yıldız',
  `title` VARCHAR(255) NULL,
  `comment` TEXT NOT NULL,
  `is_verified_purchase` TINYINT(1) NOT NULL DEFAULT 0,
  `is_approved` TINYINT(1) NOT NULL DEFAULT 0,
  `helpful_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `unhelpful_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_product_id` (`product_id` ASC),
  INDEX `idx_user_id` (`user_id` ASC),
  INDEX `idx_rating` (`rating` ASC),
  INDEX `idx_is_approved` (`is_approved` ASC),
  CONSTRAINT `fk_reviews_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_reviews_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `chk_rating` CHECK (`rating` >= 1 AND `rating` <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Kampanyalar ve İndirimler
CREATE TABLE `campaigns` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(150) NOT NULL,
  `description` TEXT NULL,
  `campaign_type` ENUM('product_discount', 'category_discount', 'cart_discount', 'free_shipping', 'buy_x_get_y') NOT NULL,
  `discount_type` ENUM('fixed', 'percentage') NULL,
  `discount_value` DECIMAL(10,2) NULL,
  `min_purchase_amount` DECIMAL(10,2) NULL,
  `max_discount_amount` DECIMAL(10,2) NULL,
  `usage_limit` INT NULL COMMENT 'Toplam kullanım limiti',
  `usage_limit_per_user` INT NULL,
  `usage_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `start_date` TIMESTAMP NOT NULL,
  `end_date` TIMESTAMP NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC),
  INDEX `idx_dates` (`start_date` ASC, `end_date` ASC),
  INDEX `idx_is_active` (`is_active` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `campaign_products` (
  `campaign_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`campaign_id`, `product_id`),
  INDEX `idx_product_id` (`product_id` ASC),
  CONSTRAINT `fk_campaign_products_campaign`
    FOREIGN KEY (`campaign_id`)
    REFERENCES `campaigns` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_campaign_products_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `campaign_categories` (
  `campaign_id` INT UNSIGNED NOT NULL,
  `category_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`campaign_id`, `category_id`),
  INDEX `idx_category_id` (`category_id` ASC),
  CONSTRAINT `fk_campaign_categories_campaign`
    FOREIGN KEY (`campaign_id`)
    REFERENCES `campaigns` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_campaign_categories_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `categories` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 2. İÇERİK YÖNETİMİ (CONTENT MANAGEMENT)
-- ============================================

-- İçerik Sayfaları (Hakkımızda, KVKK, İade Politikası vb.)
CREATE TABLE `pages` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `parent_id` INT UNSIGNED NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(300) NOT NULL,
  `content` LONGTEXT NULL,
  `excerpt` TEXT NULL,
  `template` VARCHAR(50) NULL DEFAULT 'default',
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `meta_title` VARCHAR(255) NULL,
  `meta_description` TEXT NULL,
  `meta_keywords` VARCHAR(255) NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `published_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC),
  INDEX `idx_parent_id` (`parent_id` ASC),
  INDEX `idx_is_active` (`is_active` ASC),
  FULLTEXT INDEX `ft_search` (`title`, `content`),
  CONSTRAINT `fk_pages_parent`
    FOREIGN KEY (`parent_id`)
    REFERENCES `pages` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blog Kategorileri
CREATE TABLE `blog_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(150) NOT NULL,
  `description` TEXT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blog Yazıları
CREATE TABLE `blog_posts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` INT UNSIGNED NULL,
  `author_id` INT UNSIGNED NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(300) NOT NULL,
  `excerpt` TEXT NULL,
  `content` LONGTEXT NOT NULL,
  `featured_image` VARCHAR(500) NULL,
  `video_url` VARCHAR(500) NULL,
  `audio_url` VARCHAR(500) NULL,
  `view_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `comment_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `status` ENUM('draft', 'published', 'scheduled', 'archived') NOT NULL DEFAULT 'draft',
  `meta_title` VARCHAR(255) NULL,
  `meta_description` TEXT NULL,
  `meta_keywords` VARCHAR(255) NULL,
  `published_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC),
  INDEX `idx_category_id` (`category_id` ASC),
  INDEX `idx_author_id` (`author_id` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_published_at` (`published_at` ASC),
  FULLTEXT INDEX `ft_search` (`title`, `content`),
  CONSTRAINT `fk_blog_posts_category`
    FOREIGN KEY (`category_id`)
    REFERENCES `blog_categories` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_blog_posts_author`
    FOREIGN KEY (`author_id`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `blog_post_tags` (
  `post_id` INT UNSIGNED NOT NULL,
  `tag_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`post_id`, `tag_id`),
  INDEX `idx_tag_id` (`tag_id` ASC),
  CONSTRAINT `fk_blog_tags_post`
    FOREIGN KEY (`post_id`)
    REFERENCES `blog_posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_blog_tags_tag`
    FOREIGN KEY (`tag_id`)
    REFERENCES `tags` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Blog Yorumları
CREATE TABLE `blog_comments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `post_id` INT UNSIGNED NOT NULL,
  `parent_id` INT UNSIGNED NULL,
  `user_id` INT UNSIGNED NULL,
  `author_name` VARCHAR(100) NOT NULL,
  `author_email` VARCHAR(255) NOT NULL,
  `comment` TEXT NOT NULL,
  `is_approved` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_post_id` (`post_id` ASC),
  INDEX `idx_parent_id` (`parent_id` ASC),
  INDEX `idx_user_id` (`user_id` ASC),
  INDEX `idx_is_approved` (`is_approved` ASC),
  CONSTRAINT `fk_blog_comments_post`
    FOREIGN KEY (`post_id`)
    REFERENCES `blog_posts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_blog_comments_parent`
    FOREIGN KEY (`parent_id`)
    REFERENCES `blog_comments` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_blog_comments_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Menüler
CREATE TABLE `menus` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `location` VARCHAR(50) NOT NULL COMMENT 'header, footer, sidebar vb.',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_location_UNIQUE` (`name` ASC, `location` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `menu_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `menu_id` INT UNSIGNED NOT NULL,
  `parent_id` INT UNSIGNED NULL,
  `title` VARCHAR(100) NOT NULL,
  `url` VARCHAR(500) NULL,
  `target` ENUM('_self', '_blank') NOT NULL DEFAULT '_self',
  `icon` VARCHAR(100) NULL,
  `css_class` VARCHAR(100) NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_menu_id` (`menu_id` ASC),
  INDEX `idx_parent_id` (`parent_id` ASC),
  INDEX `idx_sort_order` (`sort_order` ASC),
  CONSTRAINT `fk_menu_items_menu`
    FOREIGN KEY (`menu_id`)
    REFERENCES `menus` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_menu_items_parent`
    FOREIGN KEY (`parent_id`)
    REFERENCES `menu_items` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Banner ve Hero Slider
CREATE TABLE `banners` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `location` VARCHAR(50) NOT NULL COMMENT 'hero, sidebar, footer vb.',
  `type` ENUM('image', 'slider', 'video') NOT NULL DEFAULT 'image',
  `title` VARCHAR(255) NULL,
  `subtitle` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `image` VARCHAR(500) NULL,
  `mobile_image` VARCHAR(500) NULL,
  `video_url` VARCHAR(500) NULL,
  `link_url` VARCHAR(500) NULL,
  `link_text` VARCHAR(100) NULL,
  `link_target` ENUM('_self', '_blank') NOT NULL DEFAULT '_self',
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `start_date` TIMESTAMP NULL DEFAULT NULL,
  `end_date` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_location` (`location` ASC),
  INDEX `idx_is_active` (`is_active` ASC),
  INDEX `idx_dates` (`start_date` ASC, `end_date` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sayfa Blokları (Dinamik İçerik Blokları)
CREATE TABLE `page_blocks` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `page_id` INT UNSIGNED NULL,
  `block_type` VARCHAR(50) NOT NULL COMMENT 'hero, features, testimonials, products vb.',
  `identifier` VARCHAR(100) NULL COMMENT 'Benzersiz tanımlayıcı',
  `title` VARCHAR(255) NULL,
  `content` LONGTEXT NULL,
  `settings` JSON NULL COMMENT 'Blok ayarları (JSON)',
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_page_id` (`page_id` ASC),
  INDEX `idx_block_type` (`block_type` ASC),
  UNIQUE INDEX `identifier_UNIQUE` (`identifier` ASC),
  CONSTRAINT `fk_blocks_page`
    FOREIGN KEY (`page_id`)
    REFERENCES `pages` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `seo_meta` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `entity_type` ENUM('page', 'product', 'category', 'blog_post', 'campaign') NOT NULL,
  `entity_id` INT UNSIGNED NOT NULL,
  `locale` VARCHAR(5) NOT NULL DEFAULT 'tr-TR',
  `meta_title` VARCHAR(255) NULL,
  `meta_description` TEXT NULL,
  `meta_keywords` VARCHAR(255) NULL,
  `structured_data` JSON NULL,
  `canonical_url` VARCHAR(500) NULL,
  `og_image` VARCHAR(500) NULL,
  `og_type` VARCHAR(50) NULL,
  `twitter_card` VARCHAR(50) NULL,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_seo_entity_locale` (`entity_type` ASC, `entity_id` ASC, `locale` ASC),
  INDEX `idx_entity_type` (`entity_type` ASC),
  INDEX `idx_locale` (`locale` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- SEO ve Site Ayarları
CREATE TABLE `site_settings` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `setting_key` VARCHAR(100) NOT NULL,
  `setting_value` LONGTEXT NULL,
  `setting_type` ENUM('text', 'textarea', 'json', 'boolean', 'number') NOT NULL DEFAULT 'text',
  `group_name` VARCHAR(50) NULL COMMENT 'general, seo, email, payment vb.',
  `description` VARCHAR(255) NULL,
  `is_public` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Frontend erişilebilir mi?',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `setting_key_UNIQUE` (`setting_key` ASC),
  INDEX `idx_group_name` (`group_name` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 3. KULLANICI YÖNETİMİ VE RBAC
-- ============================================

-- Kullanıcılar
CREATE TABLE `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `phone` VARCHAR(20) NULL,
  `avatar` VARCHAR(500) NULL,
  `date_of_birth` DATE NULL,
  `gender` ENUM('male', 'female', 'other') NULL,
  `status` ENUM('active', 'inactive', 'banned', 'pending_verification') NOT NULL DEFAULT 'pending_verification',
  `email_verified_at` TIMESTAMP NULL DEFAULT NULL,
  `last_login_at` TIMESTAMP NULL DEFAULT NULL,
  `last_login_ip` VARCHAR(45) NULL,
  `failed_login_attempts` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `locked_until` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_email_verified_at` (`email_verified_at` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Roller
CREATE TABLE `roles` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(50) NOT NULL,
  `slug` VARCHAR(70) NOT NULL,
  `description` TEXT NULL,
  `is_system` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Sistem rolü silinemez',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- İzinler
CREATE TABLE `permissions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(150) NOT NULL,
  `module` VARCHAR(50) NOT NULL COMMENT 'products, orders, users vb.',
  `description` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC),
  INDEX `idx_module` (`module` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Kullanıcı-Rol İlişkisi
CREATE TABLE `user_roles` (
  `user_id` INT UNSIGNED NOT NULL,
  `role_id` INT UNSIGNED NOT NULL,
  `assigned_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `idx_role_id` (`role_id` ASC),
  CONSTRAINT `fk_user_roles_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_user_roles_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `roles` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Rol-İzin İlişkisi
CREATE TABLE `role_permissions` (
  `role_id` INT UNSIGNED NOT NULL,
  `permission_id` INT UNSIGNED NOT NULL,
  `granted_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_id`, `permission_id`),
  INDEX `idx_permission_id` (`permission_id` ASC),
  CONSTRAINT `fk_role_permissions_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `roles` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_role_permissions_permission`
    FOREIGN KEY (`permission_id`)
    REFERENCES `permissions` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Oturum ve Token Yönetimi
CREATE TABLE `user_sessions` (
  `id` VARCHAR(255) NOT NULL,
  `user_id` INT UNSIGNED NULL,
  `ip_address` VARCHAR(45) NULL,
  `user_agent` TEXT NULL,
  `payload` LONGTEXT NOT NULL,
  `last_activity` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_user_id` (`user_id` ASC),
  INDEX `idx_last_activity` (`last_activity` ASC),
  CONSTRAINT `fk_sessions_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `refresh_tokens` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `token` VARCHAR(500) NOT NULL,
  `device_id` VARCHAR(255) NULL,
  `expires_at` TIMESTAMP NOT NULL,
  `is_revoked` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `token_UNIQUE` (`token`(255) ASC),
  INDEX `idx_user_id` (`user_id` ASC),
  INDEX `idx_expires_at` (`expires_at` ASC),
  CONSTRAINT `fk_refresh_tokens_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Email Doğrulama ve Şifre Sıfırlama Tokenleri
CREATE TABLE `verification_tokens` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `token` VARCHAR(255) NOT NULL,
  `token_type` ENUM('email_verification', 'password_reset', 'phone_verification') NOT NULL,
  `expires_at` TIMESTAMP NOT NULL,
  `used_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `token_UNIQUE` (`token` ASC),
  INDEX `idx_user_id` (`user_id` ASC),
  INDEX `idx_expires_at` (`expires_at` ASC),
  CONSTRAINT `fk_verification_tokens_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Audit Log (Sistem Aktivite Kaydı)
CREATE TABLE `audit_logs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NULL,
  `action` VARCHAR(100) NOT NULL,
  `module` VARCHAR(50) NOT NULL,
  `record_id` INT UNSIGNED NULL,
  `old_values` JSON NULL,
  `new_values` JSON NULL,
  `ip_address` VARCHAR(45) NULL,
  `user_agent` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_user_id` (`user_id` ASC),
  INDEX `idx_module_record` (`module` ASC, `record_id` ASC),
  INDEX `idx_created_at` (`created_at` ASC),
  CONSTRAINT `fk_audit_logs_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 4. SİPARİŞ VE ÖDEME YÖNETİMİ
-- ============================================

-- Kullanıcı Adresleri
CREATE TABLE `user_addresses` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `address_type` ENUM('billing', 'shipping', 'both') NOT NULL DEFAULT 'both',
  `first_name` VARCHAR(100) NOT NULL,
  `last_name` VARCHAR(100) NOT NULL,
  `company` VARCHAR(150) NULL,
  `address_line1` VARCHAR(255) NOT NULL,
  `address_line2` VARCHAR(255) NULL,
  `city` VARCHAR(100) NOT NULL,
  `state` VARCHAR(100) NULL,
  `postal_code` VARCHAR(20) NOT NULL,
  `country_code` VARCHAR(2) NOT NULL DEFAULT 'TR',
  `phone` VARCHAR(20) NOT NULL,
  `is_default` TINYINT(1) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_user_id` (`user_id` ASC),
  INDEX `idx_address_type` (`address_type` ASC),
  CONSTRAINT `fk_addresses_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sepet
CREATE TABLE `carts` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NULL,
  `session_id` VARCHAR(255) NULL COMMENT 'Misafir kullanıcılar için',
  `coupon_code` VARCHAR(50) NULL,
  `discount_amount` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_user_id` (`user_id` ASC),
  INDEX `idx_session_id` (`session_id` ASC),
  INDEX `idx_updated_at` (`updated_at` ASC),
  CONSTRAINT `fk_carts_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cart_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `cart_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `variant_id` INT UNSIGNED NULL,
  `quantity` INT UNSIGNED NOT NULL DEFAULT 1,
  `unit_price` DECIMAL(10,2) NOT NULL,
  `total_price` DECIMAL(10,2) GENERATED ALWAYS AS (`quantity` * `unit_price`) STORED,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_cart_id` (`cart_id` ASC),
  INDEX `idx_product_id` (`product_id` ASC),
  INDEX `idx_variant_id` (`variant_id` ASC),
  CONSTRAINT `fk_cart_items_cart`
    FOREIGN KEY (`cart_id`)
    REFERENCES `carts` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_items_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_cart_items_variant`
    FOREIGN KEY (`variant_id`)
    REFERENCES `product_variants` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Favoriler (Wishlist)
CREATE TABLE `wishlists` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NOT NULL,
  `variant_id` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `user_product_UNIQUE` (`user_id` ASC, `product_id` ASC, `variant_id` ASC),
  INDEX `idx_product_id` (`product_id` ASC),
  CONSTRAINT `fk_wishlists_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_wishlists_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_wishlists_variant`
    FOREIGN KEY (`variant_id`)
    REFERENCES `product_variants` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Kuponlar
CREATE TABLE `coupons` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(50) NOT NULL,
  `description` TEXT NULL,
  `discount_type` ENUM('fixed', 'percentage') NOT NULL,
  `discount_value` DECIMAL(10,2) NOT NULL,
  `min_purchase_amount` DECIMAL(10,2) NULL,
  `max_discount_amount` DECIMAL(10,2) NULL,
  `usage_limit` INT NULL,
  `usage_limit_per_user` INT NULL,
  `usage_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `start_date` TIMESTAMP NOT NULL,
  `end_date` TIMESTAMP NOT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC),
  INDEX `idx_dates` (`start_date` ASC, `end_date` ASC),
  INDEX `idx_is_active` (`is_active` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `coupon_usage` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `coupon_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NULL,
  `order_id` INT UNSIGNED NULL,
  `discount_amount` DECIMAL(10,2) NOT NULL,
  `used_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_coupon_id` (`coupon_id` ASC),
  INDEX `idx_user_id` (`user_id` ASC),
  INDEX `idx_order_id` (`order_id` ASC),
  CONSTRAINT `fk_coupon_usage_coupon`
    FOREIGN KEY (`coupon_id`)
    REFERENCES `coupons` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_coupon_usage_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_coupon_usage_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Kargo Şirketleri
CREATE TABLE `shipping_methods` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `code` VARCHAR(50) NOT NULL,
  `description` TEXT NULL,
  `logo` VARCHAR(500) NULL,
  `calculation_type` ENUM('fixed', 'weight_based', 'price_based', 'free') NOT NULL,
  `base_cost` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `free_shipping_threshold` DECIMAL(10,2) NULL COMMENT 'Bu tutarın üzeri ücretsiz',
  `estimated_delivery_days` VARCHAR(50) NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ödeme Yöntemleri
CREATE TABLE `payment_methods` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `code` VARCHAR(50) NOT NULL,
  `description` TEXT NULL,
  `logo` VARCHAR(500) NULL,
  `type` ENUM('credit_card', 'bank_transfer', 'cash_on_delivery', 'wallet', 'other') NOT NULL,
  `gateway` VARCHAR(50) NULL COMMENT 'iyzico, stripe vb.',
  `credentials` JSON NULL COMMENT 'API anahtarları vb.',
  `extra_fee_type` ENUM('fixed', 'percentage') NULL,
  `extra_fee_value` DECIMAL(10,2) NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `code_UNIQUE` (`code` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Siparişler
CREATE TABLE `orders` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_number` VARCHAR(50) NOT NULL,
  `user_id` INT UNSIGNED NULL,
  `status` ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded') NOT NULL DEFAULT 'pending',
  `payment_status` ENUM('pending', 'paid', 'failed', 'refunded', 'partially_refunded') NOT NULL DEFAULT 'pending',
  `payment_method_id` INT UNSIGNED NULL,
  `shipping_method_id` INT UNSIGNED NULL,
  `coupon_code` VARCHAR(50) NULL,

  -- Fiyat Detayları
  `subtotal` DECIMAL(10,2) NOT NULL COMMENT 'Ürünler toplamı',
  `discount_amount` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `shipping_cost` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `tax_amount` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `payment_fee` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `total_amount` DECIMAL(10,2) NOT NULL,

  -- Adres Bilgileri (Sipariş anında kaydedilir)
  `billing_first_name` VARCHAR(100) NOT NULL,
  `billing_last_name` VARCHAR(100) NOT NULL,
  `billing_company` VARCHAR(150) NULL,
  `billing_address_line1` VARCHAR(255) NOT NULL,
  `billing_address_line2` VARCHAR(255) NULL,
  `billing_city` VARCHAR(100) NOT NULL,
  `billing_state` VARCHAR(100) NULL,
  `billing_postal_code` VARCHAR(20) NOT NULL,
  `billing_country_code` VARCHAR(2) NOT NULL,
  `billing_phone` VARCHAR(20) NOT NULL,
  `billing_email` VARCHAR(255) NOT NULL,

  `shipping_first_name` VARCHAR(100) NOT NULL,
  `shipping_last_name` VARCHAR(100) NOT NULL,
  `shipping_company` VARCHAR(150) NULL,
  `shipping_address_line1` VARCHAR(255) NOT NULL,
  `shipping_address_line2` VARCHAR(255) NULL,
  `shipping_city` VARCHAR(100) NOT NULL,
  `shipping_state` VARCHAR(100) NULL,
  `shipping_postal_code` VARCHAR(20) NOT NULL,
  `shipping_country_code` VARCHAR(2) NOT NULL,
  `shipping_phone` VARCHAR(20) NOT NULL,

  -- Kargo Takip
  `tracking_number` VARCHAR(100) NULL,
  `shipped_at` TIMESTAMP NULL DEFAULT NULL,
  `delivered_at` TIMESTAMP NULL DEFAULT NULL,

  -- Notlar
  `customer_note` TEXT NULL,
  `admin_note` TEXT NULL,

  -- IP ve Device
  `ip_address` VARCHAR(45) NULL,
  `user_agent` TEXT NULL,

  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `order_number_UNIQUE` (`order_number` ASC),
  INDEX `idx_user_id` (`user_id` ASC),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_payment_status` (`payment_status` ASC),
  INDEX `idx_created_at` (`created_at` ASC),
  INDEX `idx_payment_method` (`payment_method_id` ASC),
  INDEX `idx_shipping_method` (`shipping_method_id` ASC),
  CONSTRAINT `fk_orders_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_payment_method`
    FOREIGN KEY (`payment_method_id`)
    REFERENCES `payment_methods` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_shipping_method`
    FOREIGN KEY (`shipping_method_id`)
    REFERENCES `shipping_methods` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sipariş Kalemleri
CREATE TABLE `order_items` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` INT UNSIGNED NOT NULL,
  `product_id` INT UNSIGNED NULL,
  `variant_id` INT UNSIGNED NULL,
  `product_name` VARCHAR(255) NOT NULL COMMENT 'Sipariş anındaki ürün adı',
  `product_sku` VARCHAR(50) NOT NULL,
  `variant_details` JSON NULL COMMENT 'Varyant özellikleri',
  `quantity` INT UNSIGNED NOT NULL,
  `unit_price` DECIMAL(10,2) NOT NULL,
  `discount_amount` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `tax_amount` DECIMAL(10,2) NOT NULL DEFAULT 0,
  `total_price` DECIMAL(10,2) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_order_id` (`order_id` ASC),
  INDEX `idx_product_id` (`product_id` ASC),
  INDEX `idx_variant_id` (`variant_id` ASC),
  CONSTRAINT `fk_order_items_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_order_items_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `products` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
  CONSTRAINT `fk_order_items_variant`
    FOREIGN KEY (`variant_id`)
    REFERENCES `product_variants` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Sipariş Durum Geçmişi
CREATE TABLE `order_status_history` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` INT UNSIGNED NOT NULL,
  `status` VARCHAR(50) NOT NULL,
  `comment` TEXT NULL,
  `notify_customer` TINYINT(1) NOT NULL DEFAULT 0,
  `created_by` INT UNSIGNED NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_order_id` (`order_id` ASC),
  INDEX `idx_created_at` (`created_at` ASC),
  CONSTRAINT `fk_order_history_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_order_history_user`
    FOREIGN KEY (`created_by`)
    REFERENCES `users` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ödeme Kayıtları
CREATE TABLE `payment_transactions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `order_id` INT UNSIGNED NOT NULL,
  `payment_method_id` INT UNSIGNED NULL,
  `transaction_id` VARCHAR(255) NULL COMMENT 'Ödeme sağlayıcısından gelen ID',
  `transaction_type` ENUM('charge', 'refund', 'void') NOT NULL DEFAULT 'charge',
  `amount` DECIMAL(10,2) NOT NULL,
  `currency` VARCHAR(3) NOT NULL DEFAULT 'TRY',
  `status` ENUM('pending', 'processing', 'success', 'failed', 'cancelled') NOT NULL DEFAULT 'pending',
  `gateway_response` JSON NULL COMMENT 'Ödeme sağlayıcısının yanıtı',
  `error_message` TEXT NULL,
  `processed_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_order_id` (`order_id` ASC),
  INDEX `idx_transaction_id` (`transaction_id` ASC),
  INDEX `idx_status` (`status` ASC),
  CONSTRAINT `fk_transactions_order`
    FOREIGN KEY (`order_id`)
    REFERENCES `orders` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_transactions_payment_method`
    FOREIGN KEY (`payment_method_id`)
    REFERENCES `payment_methods` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- 5. EK TABLOLAR
-- ============================================

-- Şubeler / Mağazalar
CREATE TABLE `branches` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(150) NOT NULL,
  `slug` VARCHAR(200) NOT NULL,
  `phone` VARCHAR(20) NULL,
  `email` VARCHAR(255) NULL,
  `address` TEXT NULL,
  `city` VARCHAR(100) NULL,
  `state` VARCHAR(100) NULL,
  `postal_code` VARCHAR(20) NULL,
  `country_code` VARCHAR(2) NOT NULL DEFAULT 'TR',
  `latitude` DECIMAL(10,7) NULL,
  `longitude` DECIMAL(10,7) NULL,
  `working_hours` JSON NULL,
  `image` VARCHAR(500) NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `slug_UNIQUE` (`slug` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- SSS (Sıkça Sorulan Sorular)
CREATE TABLE `faqs` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(100) NULL,
  `question` VARCHAR(500) NOT NULL,
  `answer` TEXT NOT NULL,
  `sort_order` INT NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_category` (`category` ASC),
  INDEX `idx_is_active` (`is_active` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Müşteri Yorumları / Testimonials
CREATE TABLE `testimonials` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(100) NOT NULL,
  `customer_title` VARCHAR(150) NULL,
  `customer_avatar` VARCHAR(500) NULL,
  `rating` TINYINT UNSIGNED NOT NULL,
  `comment` TEXT NOT NULL,
  `is_featured` TINYINT(1) NOT NULL DEFAULT 0,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `sort_order` INT NOT NULL DEFAULT 0,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_is_active` (`is_active` ASC),
  CONSTRAINT `chk_testimonial_rating` CHECK (`rating` >= 1 AND `rating` <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Email Abonelikleri
CREATE TABLE `newsletter_subscribers` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL,
  `status` ENUM('active', 'unsubscribed', 'bounced') NOT NULL DEFAULT 'active',
  `token` VARCHAR(255) NULL,
  `subscribed_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `unsubscribed_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `idx_status` (`status` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- İletişim Formları
CREATE TABLE `contact_submissions` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NULL,
  `subject` VARCHAR(255) NULL,
  `message` TEXT NOT NULL,
  `status` ENUM('new', 'read', 'replied', 'archived') NOT NULL DEFAULT 'new',
  `ip_address` VARCHAR(45) NULL,
  `user_agent` TEXT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_status` (`status` ASC),
  INDEX `idx_created_at` (`created_at` ASC)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
