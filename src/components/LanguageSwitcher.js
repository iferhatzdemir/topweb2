'use client';

import { usePathname, useRouter } from 'next/navigation';
import { i18n, localeNames } from '@/i18n/config';
import { useEffect, useState } from 'react';

export default function LanguageSwitcher({ currentLocale: initialLocale }) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentLocale, setCurrentLocale] = useState(initialLocale || 'tr');
  const [isChanging, setIsChanging] = useState(false);

  // Cookie'den locale'i oku
  useEffect(() => {
    const getCookie = (name) => {
      if (typeof document === 'undefined') return null;
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    const cookieLocale = getCookie('i18next');
    if (cookieLocale && cookieLocale !== currentLocale) {
      setCurrentLocale(cookieLocale);
    }
  }, [currentLocale]);

  const handleLanguageChange = (newLocale) => {
    if (isChanging) return; // Prevent multiple clicks
    setIsChanging(true);

    // Cookie'ye kaydet
    document.cookie = `i18next=${newLocale}; path=/; max-age=31536000`;

    // State'i güncelle
    setCurrentLocale(newLocale);

    // Yeni URL'i oluştur
    let newPathname = pathname;

    // Mevcut locale'i path'ten çıkar
    const currentLocaleInPath = i18n.locales.find(locale =>
      pathname.startsWith(`/${locale}`)
    );

    if (currentLocaleInPath) {
      newPathname = pathname.replace(`/${currentLocaleInPath}`, '');
    }

    // Varsayılan dil değilse yeni locale ekle
    if (newLocale !== i18n.defaultLocale) {
      newPathname = `/${newLocale}${newPathname || ''}`;
    }

    // Boş path kontrolü
    if (!newPathname || newPathname === '') {
      newPathname = '/';
    }

    // URL'i güncelle ve sayfayı yenile
    window.location.href = newPathname;
  };

  return (
    <div className="ltn__drop-menu language-menu">
      <ul>
        <li>
          <a href="#" className="dropdown-toggle">
            <span className="active-lang">
              {localeNames[currentLocale] || 'Türkçe'}
            </span>
          </a>
          <ul>
            {i18n.locales
              .filter(locale => locale !== currentLocale)
              .map(locale => (
                <li key={locale}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLanguageChange(locale);
                    }}
                    style={{ cursor: isChanging ? 'wait' : 'pointer' }}
                  >
                    {localeNames[locale]}
                  </a>
                </li>
              ))}
          </ul>
        </li>
      </ul>
    </div>
  );
}
