import { headers } from 'next/headers';
import { i18n } from '@/i18n/config';
import Link from 'next/link';

export default function NotFound() {
  // Middleware'den gelen locale'i al
  const headersList = headers();
  const locale = headersList.get('x-locale') || i18n.defaultLocale;

  const content = {
    tr: {
      title: '404 - Sayfa Bulunamadı',
      heading: 'Oops! Sayfa Bulunamadı',
      message: 'Aradığınız sayfa mevcut değil veya taşınmış olabilir.',
      button: 'Ana Sayfaya Dön',
    },
    en: {
      title: '404 - Page Not Found',
      heading: 'Oops! Page Not Found',
      message: "The page you are looking for doesn't exist or has been moved.",
      button: 'Back to Home',
    },
  };

  const t = content[locale] || content.tr;

  return (
    <html lang={locale}>
      <body>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '20px',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>
          <h1 style={{ fontSize: '120px', margin: 0, color: '#C1839F' }}>404</h1>
          <h2 style={{ fontSize: '32px', marginBottom: '16px', color: '#2F2F2F' }}>{t.heading}</h2>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '32px', maxWidth: '500px' }}>
            {t.message}
          </p>
          <Link
            href={locale === 'en' ? '/en' : '/'}
            style={{
              padding: '12px 32px',
              backgroundColor: '#C1839F',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              transition: 'background-color 0.3s'
            }}
          >
            {t.button}
          </Link>
        </div>
      </body>
    </html>
  );
}
