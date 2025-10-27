import { i18n, localeMetadata } from './config';

const DEFAULT_LOCALE_INFO = localeMetadata[i18n.defaultLocale];

const ensureLocaleInfo = (locale) => {
  if (!locale) {
    return DEFAULT_LOCALE_INFO;
  }

  return localeMetadata[locale] || DEFAULT_LOCALE_INFO;
};

const getSafeNumber = (value) => {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return 0;
  }

  return Number(value);
};

export const formatNumber = (value, locale = i18n.defaultLocale, options = {}) => {
  const { intlLocale } = ensureLocaleInfo(locale);

  return new Intl.NumberFormat(intlLocale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(getSafeNumber(value));
};

export const formatCurrency = (
  value,
  locale = i18n.defaultLocale,
  options = {}
) => {
  const { intlLocale, currency } = ensureLocaleInfo(locale);

  return new Intl.NumberFormat(intlLocale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    ...options,
  }).format(getSafeNumber(value));
};

export const formatDate = (value, locale = i18n.defaultLocale, options = {}) => {
  if (!value) {
    return '';
  }

  const { intlLocale } = ensureLocaleInfo(locale);
  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat(intlLocale, {
    dateStyle: 'medium',
    ...options,
  }).format(date);
};

export const formatDateTime = (value, locale = i18n.defaultLocale, options = {}) => {
  if (!value) {
    return '';
  }

  const { intlLocale } = ensureLocaleInfo(locale);
  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat(intlLocale, {
    dateStyle: 'medium',
    timeStyle: 'short',
    ...options,
  }).format(date);
};

export const formatRelative = (value, locale = i18n.defaultLocale, options = {}) => {
  if (!value) {
    return '';
  }

  const { intlLocale } = ensureLocaleInfo(locale);
  const formatter = new Intl.RelativeTimeFormat(intlLocale, {
    numeric: 'auto',
    ...options,
  });

  const diff = Number(value);
  if (Number.isNaN(diff)) {
    return '';
  }

  return formatter.format(diff, options.unit || 'day');
};

export const getIntlConfig = (locale = i18n.defaultLocale) => {
  const info = ensureLocaleInfo(locale);

  return {
    locale,
    intlLocale: info.intlLocale,
    currency: info.currency,
  };
};
