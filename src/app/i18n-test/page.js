/* eslint-disable react/no-unescaped-entities */
import { headers } from 'next/headers';
import { i18n } from '@/i18n/config';
import { useTranslation } from '@/i18n';
import Link from 'next/link';

export default async function I18nTestPage() {
  // Middleware'den locale al
  const headersList = headers();
  const locale = headersList.get('x-locale') || i18n.defaultLocale;

  // Çevirileri yükle
  const { t: tCommon } = await useTranslation(locale, 'common');
  const { t: tButtons } = await useTranslation(locale, 'buttons');
  const { t: tNavigation } = await useTranslation(locale, 'navigation');
  const { t: tProducts } = await useTranslation(locale, 'products');
  const { t: tCart } = await useTranslation(locale, 'cart');
  const { t: tAlerts } = await useTranslation(locale, 'alerts');
  const { t: tCheckout } = await useTranslation(locale, 'checkout');
  const { t: tAuth } = await useTranslation(locale, 'auth');
  const { t: tEmpty } = await useTranslation(locale, 'empty-states');
  const { t: tErrors } = await useTranslation(locale, 'errors');

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui' }}>
      <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#C1839F', margin: 0 }}>
          🧪 i18n Test Page - <span style={{ color: '#7D4C61' }}>{locale.toUpperCase()}</span>
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link
            href="/i18n-test"
            style={{
              padding: '8px 16px',
              background: locale === 'tr' ? '#C1839F' : '#ddd',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: locale === 'tr' ? 'bold' : 'normal'
            }}
          >
            TR
          </Link>
          <Link
            href="/en/i18n-test"
            style={{
              padding: '8px 16px',
              background: locale === 'en' ? '#7D4C61' : '#ddd',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontWeight: locale === 'en' ? 'bold' : 'normal'
            }}
          >
            EN
          </Link>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>

        {/* Common */}
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#C1839F', marginTop: 0 }}>📦 Common</h2>
          <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
            <li><strong>welcome:</strong> {tCommon('welcome')}</li>
            <li><strong>loading:</strong> {tCommon('loading')}</li>
            <li><strong>search:</strong> {tCommon('search')}</li>
            <li><strong>save:</strong> {tCommon('save')}</li>
            <li><strong>cancel:</strong> {tCommon('cancel')}</li>
          </ul>
        </div>

        {/* Buttons */}
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#C1839F', marginTop: 0 }}>🔘 Buttons</h2>
          <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
            <li><strong>login:</strong> {tButtons('login')}</li>
            <li><strong>register:</strong> {tButtons('register')}</li>
            <li><strong>addToCart:</strong> {tButtons('addToCart')}</li>
            <li><strong>checkout:</strong> {tButtons('checkout')}</li>
          </ul>
        </div>

        {/* Navigation */}
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#C1839F', marginTop: 0 }}>🧭 Navigation</h2>
          <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
            <li><strong>home:</strong> {tNavigation('home')}</li>
            <li><strong>about:</strong> {tNavigation('about')}</li>
            <li><strong>products:</strong> {tNavigation('products')}</li>
            <li><strong>shop:</strong> {tNavigation('shop')}</li>
            <li><strong>contact:</strong> {tNavigation('contact')}</li>
          </ul>
        </div>

        {/* Products */}
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#C1839F', marginTop: 0 }}>🛍️ Products</h2>
          <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
            <li><strong>price:</strong> {tProducts('price')}</li>
            <li><strong>inStock:</strong> {tProducts('inStock')}</li>
            <li><strong>outOfStock:</strong> {tProducts('outOfStock')}</li>
            <li><strong>addToWishlist:</strong> {tProducts('addToWishlist')}</li>
          </ul>
        </div>

        {/* Cart */}
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#C1839F', marginTop: 0 }}>🛒 Cart</h2>
          <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
            <li><strong>title:</strong> {tCart('title')}</li>
            <li><strong>emptyCart:</strong> {tCart('emptyCart')}</li>
            <li><strong>subtotal:</strong> {tCart('subtotal')}</li>
            <li><strong>total:</strong> {tCart('total')}</li>
          </ul>
        </div>

        {/* Alerts */}
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#C1839F', marginTop: 0 }}>⚠️ Alerts</h2>
          <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
            <li><strong>demoMode:</strong> {tAlerts('demoMode')}</li>
            <li><strong>addedToCart:</strong> {tAlerts('addedToCart')}</li>
            <li><strong>loginSuccess:</strong> {tAlerts('loginSuccess')}</li>
          </ul>
        </div>

        {/* Checkout */}
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#C1839F', marginTop: 0 }}>💳 Checkout</h2>
          <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
            <li><strong>title:</strong> {tCheckout('title')}</li>
            <li><strong>billingDetails:</strong> {tCheckout('billingDetails')}</li>
            <li><strong>placeOrder:</strong> {tCheckout('placeOrderButton')}</li>
          </ul>
        </div>

        {/* Auth */}
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#C1839F', marginTop: 0 }}>🔐 Auth</h2>
          <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
            <li><strong>email:</strong> {tAuth('email')}</li>
            <li><strong>password:</strong> {tAuth('password')}</li>
            <li><strong>rememberMe:</strong> {tAuth('rememberMe')}</li>
          </ul>
        </div>

        {/* Empty States */}
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#C1839F', marginTop: 0 }}>📭 Empty States</h2>
          <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
            <li><strong>emptyCart:</strong> {tEmpty('emptyCart')}</li>
            <li><strong>noProduct:</strong> {tEmpty('noProduct')}</li>
          </ul>
        </div>

        {/* Errors */}
        <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px' }}>
          <h2 style={{ color: '#C1839F', marginTop: 0 }}>❌ Errors</h2>
          <ul style={{ lineHeight: '1.8', paddingLeft: '20px' }}>
            <li><strong>404 title:</strong> {tErrors('404.title')}</li>
            <li><strong>404 message:</strong> {tErrors('404.message')}</li>
          </ul>
        </div>

      </div>

      <div style={{ marginTop: '40px', padding: '20px', background: '#E8F4F8', borderRadius: '8px' }}>
        <h3 style={{ marginTop: 0 }}>📚 Nasıl Kullanılır?</h3>

        <h4>Server Component'te:</h4>
        <pre style={{ background: '#2F2F2F', color: '#fff', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
{`import { headers } from 'next/headers';
import { i18n } from '@/i18n/config';
import { useTranslation } from '@/i18n';

export default async function MyPage() {
  const headersList = headers();
  const locale = headersList.get('x-locale') || i18n.defaultLocale;

  const { t } = await useTranslation(locale, 'common');

  return <h1>{t('welcome')}</h1>;
}`}
        </pre>

        <h4>Client Component'te:</h4>
        <pre style={{ background: '#2F2F2F', color: '#fff', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
{`'use client';
import { useTranslation } from '@/i18n/client';

export default function MyButton({ locale }) {
  const { t } = useTranslation(locale, 'buttons');

  return <button>{t('addToCart')}</button>;
}`}
        </pre>

        <h4>Interpolasyon:</h4>
        <pre style={{ background: '#2F2F2F', color: '#fff', padding: '15px', borderRadius: '4px', overflow: 'auto' }}>
{`// JSON: "itemsInCart": "{{count}} ürün sepetinizde"
const text = t('itemsInCart', { count: 5 });
// Çıktı: "5 ürün sepetinizde"`}
        </pre>
      </div>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <Link
          href="/"
          style={{
            padding: '12px 24px',
            background: '#C1839F',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          ← {locale === 'tr' ? 'Ana Sayfaya Dön' : 'Back to Home'}
        </Link>
      </div>
    </div>
  );
}
