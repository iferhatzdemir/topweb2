/**
 * SEO için locale-aware metadata generator
 * Her sayfa için özelleştirilmiş metadata oluşturur
 */

import { i18n } from '@/i18n/config';

/**
 * Sayfa için locale-aware metadata oluştur
 * @param {Object} params - Metadata parametreleri
 * @param {string} params.title - Sayfa başlığı
 * @param {string} params.description - Sayfa açıklaması
 * @param {string} params.locale - Dil kodu
 * @param {string} params.path - Sayfa path'i
 * @param {Object} params.openGraph - OpenGraph verileri (opsiyonel)
 * @param {Array<string>} params.keywords - Anahtar kelimeler (opsiyonel)
 * @returns {Object} Next.js metadata objesi
 */
export function generatePageMetadata({
  title,
  description,
  locale = i18n.defaultLocale,
  path = '',
  openGraph = {},
  keywords = [],
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  // Locale prefix ekle (varsayılan dil hariç)
  const localePath = locale === i18n.defaultLocale
    ? path
    : `/${locale}${path}`;

  const url = `${baseUrl}${localePath}`;

  // Alternatif diller için canonical ve alternate linkler
  const alternateLanguages = {};
  i18n.locales.forEach(loc => {
    const locPath = loc === i18n.defaultLocale ? path : `/${loc}${path}`;
    alternateLanguages[loc] = `${baseUrl}${locPath}`;
  });

  return {
    title,
    description,
    keywords: keywords.join(', '),

    // Locale bilgisi
    alternates: {
      canonical: url,
      languages: alternateLanguages,
    },

    // OpenGraph
    openGraph: {
      title: openGraph.title || title,
      description: openGraph.description || description,
      url: url,
      siteName: openGraph.siteName || 'Broccoli',
      locale: locale,
      type: openGraph.type || 'website',
      images: openGraph.images || [],
      ...openGraph,
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: openGraph.title || title,
      description: openGraph.description || description,
      images: openGraph.images || [],
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Alternatif diller için hreflang linkleri oluştur
 * @param {string} path - Sayfa path'i
 * @returns {Array<Object>} hreflang link objesi dizisi
 */
export function generateAlternateLinks(path = '') {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return i18n.locales.map(locale => {
    const localePath = locale === i18n.defaultLocale
      ? path
      : `/${locale}${path}`;

    return {
      hrefLang: locale,
      href: `${baseUrl}${localePath}`,
    };
  });
}

/**
 * JSON-LD structured data oluştur
 * @param {Object} data - Structured data
 * @param {string} locale - Dil kodu
 * @returns {Object} JSON-LD objesi
 */
export function generateStructuredData(data, locale = i18n.defaultLocale) {
  return {
    '@context': 'https://schema.org',
    '@language': locale,
    ...data,
  };
}

/**
 * Breadcrumb structured data
 * @param {Array<Object>} items - Breadcrumb öğeleri [{name, path}]
 * @param {string} locale - Dil kodu
 * @returns {Object} Breadcrumb JSON-LD
 */
export function generateBreadcrumbStructuredData(items, locale = i18n.defaultLocale) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return generateStructuredData({
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const localePath = locale === i18n.defaultLocale
        ? item.path
        : `/${locale}${item.path}`;

      return {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: `${baseUrl}${localePath}`,
      };
    }),
  }, locale);
}

/**
 * Product structured data
 * @param {Object} product - Ürün bilgileri
 * @param {string} locale - Dil kodu
 * @returns {Object} Product JSON-LD
 */
export function generateProductStructuredData(product, locale = i18n.defaultLocale) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  return generateStructuredData({
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images || [],
    sku: product.sku,
    offers: {
      '@type': 'Offer',
      url: `${baseUrl}${product.path}`,
      priceCurrency: product.currency || 'TRY',
      price: product.price,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      priceValidUntil: product.priceValidUntil,
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating.value,
      reviewCount: product.rating.count,
    } : undefined,
  }, locale);
}
