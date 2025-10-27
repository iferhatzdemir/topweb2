/**
 * i18n Configuration
 * Sadece Türkçe dil desteği
 */

export const i18n = {
  defaultLocale: 'tr',
  locales: ['tr'], // Sadece Türkçe
  localeDetection: false, // Dil algılama kapalı
};

export const localeNames = {
  tr: 'Türkçe',
};

// Namespace tanımları - lazy loading için
export const namespaces = {
  common: 'common',
  navigation: 'navigation',
  header: 'header',
  footer: 'footer',
  home: 'home',
  products: 'products',
  cart: 'cart',
  checkout: 'checkout',
  auth: 'auth',
  blog: 'blog',
  pages: 'pages',
  buttons: 'buttons',
  alerts: 'alerts',
  'empty-states': 'empty-states',
  errors: 'errors',
};

export const defaultNamespace = namespaces.common;
