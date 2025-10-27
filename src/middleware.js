import { NextResponse } from 'next/server';
import { i18n } from '@/i18n/config';

const PUBLIC_FILE = /\.(.*)$/;

const isPublicAsset = (pathname) =>
  PUBLIC_FILE.test(pathname) ||
  pathname.startsWith('/_next') ||
  pathname.startsWith('/api');

const getLocaleFromPathname = (pathname) =>
  i18n.locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

export function middleware(request) {
  const { pathname } = request.nextUrl;

  if (isPublicAsset(pathname) || pathname === '/favicon.ico') {
    return NextResponse.next();
  }

  const activeLocale = getLocaleFromPathname(pathname);

  if (!activeLocale) {
    const response = NextResponse.next();
    response.headers.set('x-locale', i18n.defaultLocale);
    return response;
  }

  const localePrefix = `/${activeLocale}`;
  const strippedPathname = pathname.startsWith(localePrefix)
    ? pathname.slice(localePrefix.length) || '/'
    : pathname;

  const rewriteUrl = request.nextUrl.clone();
  rewriteUrl.pathname = strippedPathname;

  const response = NextResponse.rewrite(rewriteUrl);
  response.headers.set('x-locale', activeLocale);

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
