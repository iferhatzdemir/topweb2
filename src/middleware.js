import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Statik dosyalar ve API route'ları için middleware atlanır
  const excludePaths = [
    '/api',
    '/_next',
    '/favicon.ico',
    '/plugins.js',
    '/images',
    '/assets',
    '/fonts',
  ];

  if (excludePaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Sadece Türkçe dil desteği olduğu için locale her zaman 'tr'
  const response = NextResponse.next();
  response.headers.set('x-locale', 'tr');

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
