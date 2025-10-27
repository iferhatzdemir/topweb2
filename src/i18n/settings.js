import { i18n, defaultNamespace } from './config';

export const fallbackLng = i18n.defaultLocale;
export const languages = i18n.locales;
export const defaultNS = defaultNamespace;
export const cookieName = 'i18next';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: process.env.NODE_ENV === 'development',
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
