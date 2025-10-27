/**
 * Intl API ile TR-TR formatlama yardımcıları
 * Sayı, para birimi ve tarih formatlaması
 */

/**
 * TR formatında para birimi formatla (TRY)
 * @param {number} amount - Miktar
 * @param {string} locale - Dil kodu (varsayılan: 'tr-TR')
 * @param {string} currency - Para birimi (varsayılan: 'TRY')
 * @returns {string} Formatlanmış para birimi
 */
export function formatCurrency(amount, locale = 'tr-TR', currency = 'TRY') {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * TR formatında sayı formatla
 * @param {number} number - Sayı
 * @param {string} locale - Dil kodu (varsayılan: 'tr-TR')
 * @param {object} options - Intl.NumberFormat seçenekleri
 * @returns {string} Formatlanmış sayı
 */
export function formatNumber(number, locale = 'tr-TR', options = {}) {
  return new Intl.NumberFormat(locale, options).format(number);
}

/**
 * TR formatında tarih formatla
 * @param {Date|string|number} date - Tarih
 * @param {string} locale - Dil kodu (varsayılan: 'tr-TR')
 * @param {object} options - Intl.DateTimeFormat seçenekleri
 * @returns {string} Formatlanmış tarih
 */
export function formatDate(
  date,
  locale = 'tr-TR',
  options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
) {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date;
  return new Intl.DateTimeFormat(locale, options).format(dateObj);
}

/**
 * Kısa tarih formatı (DD.MM.YYYY)
 * @param {Date|string|number} date - Tarih
 * @param {string} locale - Dil kodu (varsayılan: 'tr-TR')
 * @returns {string} Formatlanmış kısa tarih
 */
export function formatShortDate(date, locale = 'tr-TR') {
  return formatDate(date, locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

/**
 * Uzun tarih formatı (Gün, DD Ay YYYY)
 * @param {Date|string|number} date - Tarih
 * @param {string} locale - Dil kodu (varsayılan: 'tr-TR')
 * @returns {string} Formatlanmış uzun tarih
 */
export function formatLongDate(date, locale = 'tr-TR') {
  return formatDate(date, locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Tarih ve saat formatla
 * @param {Date|string|number} date - Tarih
 * @param {string} locale - Dil kodu (varsayılan: 'tr-TR')
 * @returns {string} Formatlanmış tarih ve saat
 */
export function formatDateTime(date, locale = 'tr-TR') {
  return formatDate(date, locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Göreceli zaman formatla (2 saat önce, 3 gün önce, vb.)
 * @param {Date|string|number} date - Tarih
 * @param {string} locale - Dil kodu (varsayılan: 'tr-TR')
 * @returns {string} Formatlanmış göreceli zaman
 */
export function formatRelativeTime(date, locale = 'tr-TR') {
  const dateObj = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date;
  const now = new Date();
  const diffInSeconds = Math.floor((now - dateObj) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const intervals = [
    { seconds: 31536000, unit: 'year' },
    { seconds: 2592000, unit: 'month' },
    { seconds: 86400, unit: 'day' },
    { seconds: 3600, unit: 'hour' },
    { seconds: 60, unit: 'minute' },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return rtf.format(-count, interval.unit);
    }
  }

  return rtf.format(-diffInSeconds, 'second');
}

/**
 * Yüzde formatla
 * @param {number} value - Değer (0-1 arası veya 0-100 arası)
 * @param {string} locale - Dil kodu (varsayılan: 'tr-TR')
 * @param {boolean} isDecimal - Değer 0-1 arası mı? (varsayılan: false)
 * @returns {string} Formatlanmış yüzde
 */
export function formatPercent(value, locale = 'tr-TR', isDecimal = false) {
  const actualValue = isDecimal ? value : value / 100;
  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(actualValue);
}

/**
 * Liste formatla (item1, item2 ve item3)
 * @param {Array<string>} items - Öğeler listesi
 * @param {string} locale - Dil kodu (varsayılan: 'tr-TR')
 * @param {string} type - Liste tipi: 'conjunction' (ve), 'disjunction' (veya)
 * @returns {string} Formatlanmış liste
 */
export function formatList(items, locale = 'tr-TR', type = 'conjunction') {
  return new Intl.ListFormat(locale, {
    style: 'long',
    type: type
  }).format(items);
}

/**
 * Dosya boyutu formatla (KB, MB, GB)
 * @param {number} bytes - Byte cinsinden boyut
 * @param {string} locale - Dil kodu (varsayılan: 'tr-TR')
 * @returns {string} Formatlanmış dosya boyutu
 */
export function formatFileSize(bytes, locale = 'tr-TR') {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${formatNumber(size, locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  })} ${units[unitIndex]}`;
}

/**
 * Telefon numarası formatla (TR formatı)
 * @param {string} phone - Telefon numarası
 * @returns {string} Formatlanmış telefon numarası
 */
export function formatPhoneNumber(phone) {
  // Sadece rakamları al
  const cleaned = phone.replace(/\D/g, '');

  // TR formatı: +90 (5XX) XXX XX XX
  if (cleaned.length === 11 && cleaned.startsWith('90')) {
    return `+90 (${cleaned.slice(2, 5)}) ${cleaned.slice(5, 8)} ${cleaned.slice(8, 10)} ${cleaned.slice(10)}`;
  }

  // 10 haneli format: (5XX) XXX XX XX
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)} ${cleaned.slice(6, 8)} ${cleaned.slice(8)}`;
  }

  return phone;
}
