"use client";
import { useTranslation as useI18nTranslation } from '@/i18n/client';

/**
 * Custom hook to get Turkish translation function
 * Sadece Türkçe dil desteği için basitleştirilmiş hook
 * Usage: const { t } = useLocale('namespace');
 */
export function useLocale(namespace = 'common') {
  // Sadece Türkçe kullanıldığı için locale her zaman 'tr'
  const { t, i18n } = useI18nTranslation('tr', namespace);

  return { t, locale: 'tr', i18n };
}
