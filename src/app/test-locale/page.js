/* eslint-disable react/no-unescaped-entities */
import { headers, cookies } from 'next/headers';
import { i18n } from '@/i18n/config';
import Link from 'next/link';

export default function TestLocalePage() {
  const headersList = headers();
  const cookieStore = cookies();

  const localeFromHeader = headersList.get('x-locale');
  const localeFromCookie = cookieStore.get('i18next')?.value;
  const acceptLanguage = headersList.get('accept-language');

  return (
    <div style={{ padding: '40px', fontFamily: 'monospace' }}>
      <h1>🧪 Locale Test Page</h1>

      <div style={{ background: '#f5f5f5', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
        <h2>Current Locale Information</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>x-locale Header:</td>
              <td style={{ padding: '10px', color: '#C1839F', fontSize: '18px', fontWeight: 'bold' }}>
                {localeFromHeader || 'Not set'}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>i18next Cookie:</td>
              <td style={{ padding: '10px' }}>{localeFromCookie || 'Not set'}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>Accept-Language:</td>
              <td style={{ padding: '10px', fontSize: '12px' }}>{acceptLanguage || 'Not set'}</td>
            </tr>
            <tr>
              <td style={{ padding: '10px', fontWeight: 'bold' }}>Default Locale:</td>
              <td style={{ padding: '10px' }}>{i18n.defaultLocale}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2>Test Links</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              padding: '10px 20px',
              background: '#C1839F',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Home (TR)
          </Link>
          <Link
            href="/en"
            style={{
              padding: '10px 20px',
              background: '#7D4C61',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            Home (EN)
          </Link>
          <Link
            href="/about"
            style={{
              padding: '10px 20px',
              background: '#C1839F',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            About (TR)
          </Link>
          <Link
            href="/en/about"
            style={{
              padding: '10px 20px',
              background: '#7D4C61',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px'
            }}
          >
            About (EN)
          </Link>
        </div>
      </div>

      <div style={{ marginTop: '30px', padding: '20px', background: '#FFF9E6', borderLeft: '4px solid #FFD700', borderRadius: '4px' }}>
        <h3>⚠️ Eğer İngilizce Açılıyorsa:</h3>
        <ol style={{ lineHeight: '1.8' }}>
          <li>Tarayıcınızın Developer Tools'unu açın (F12)</li>
          <li>Application (veya Storage) tab'ına gidin</li>
          <li>Cookies altında localhost'u seçin</li>
          <li><code>i18next</code> cookie'sini silin</li>
          <li>Sayfayı yenileyin (F5)</li>
          <li>Artık Türkçe olarak açılmalı</li>
        </ol>

        <p style={{ marginTop: '20px', fontWeight: 'bold', color: '#C1839F' }}>
          Beklenen: x-locale Header = "tr" (Türkçe)
        </p>
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#E8F4F8', borderRadius: '4px' }}>
        <h3>📋 Öncelik Sırası:</h3>
        <ol style={{ lineHeight: '1.8' }}>
          <li><strong>URL path</strong> (örn: /en, /en/about) → EN</li>
          <li><strong>Cookie</strong> (i18next) → Cookie'deki dil</li>
          <li><strong>Varsayılan</strong> → TR (Türkçe)</li>
        </ol>
      </div>

      <div style={{ marginTop: '30px' }}>
        <button
          onClick={() => {
            document.cookie = 'i18next=; path=/; max-age=0';
            window.location.reload();
          }}
          style={{
            padding: '12px 24px',
            background: '#ff4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          🗑️ Cookie'yi Sil ve Yenile
        </button>
      </div>
    </div>
  );
}
