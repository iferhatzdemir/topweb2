"use client";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslation as useI18nTranslation } from '@/i18n/client';
import { i18n } from '@/i18n/config';

const LOCALE_COOKIE = 'i18next';

const getLocaleFromCookie = () => {
  if (typeof document === 'undefined') {
    return null;
  }

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${LOCALE_COOKIE}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift();
  }

  return null;
};

const resolveLocaleFromPath = (pathname) => {
  if (!pathname) {
    return i18n.defaultLocale;
  }

  const matchingLocale = i18n.locales.find((locale) => {
    if (pathname === `/${locale}`) {
      return true;
    }

    return pathname.startsWith(`/${locale}/`);
  });

  return matchingLocale || i18n.defaultLocale;
};

export function useLocale(namespace = 'common') {
  const pathname = usePathname();

  const localeFromPath = useMemo(
    () => resolveLocaleFromPath(pathname),
    [pathname]
  );

  const [locale, setLocale] = useState(localeFromPath);

  useEffect(() => {
    if (localeFromPath !== locale) {
      setLocale(localeFromPath);
    }
  }, [localeFromPath, locale]);

  const syncCookieLocale = useCallback(() => {
    const cookieLocale = getLocaleFromCookie();

    if (cookieLocale && i18n.locales.includes(cookieLocale) && cookieLocale !== locale) {
      setLocale(cookieLocale);
    }
  }, [locale]);

  useEffect(() => {
    syncCookieLocale();
  }, [syncCookieLocale]);

  const { t, i18n: i18nextInstance } = useI18nTranslation(locale, namespace);

  return { t, locale, i18n: i18nextInstance };
}
