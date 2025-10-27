'use client';

import { useTranslation } from '@/i18n/client';
import { useState } from 'react';

/**
 * Client Component i18n Örneği
 *
 * Kullanım:
 * import I18nButtonExample from '@/components/examples/I18nButtonExample';
 * <I18nButtonExample locale={locale} />
 */
export default function I18nButtonExample({ locale = 'tr' }) {
  const { t: tButtons } = useTranslation(locale, 'buttons');
  const { t: tAlerts } = useTranslation(locale, 'alerts');
  const { t: tCommon } = useTranslation(locale, 'common');

  const [message, setMessage] = useState('');

  const handleClick = () => {
    setMessage(tAlerts('addedToCart'));
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px', margin: '20px 0' }}>
      <h3 style={{ color: '#C1839F', marginTop: 0 }}>
        🎨 Client Component Örneği
      </h3>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <button
          onClick={handleClick}
          style={{
            padding: '10px 20px',
            background: '#C1839F',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {tButtons('addToCart')}
        </button>

        <button
          style={{
            padding: '10px 20px',
            background: '#7D4C61',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {tButtons('addToWishlist')}
        </button>

        <button
          style={{
            padding: '10px 20px',
            background: '#EAD7DC',
            color: '#2F2F2F',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          {tButtons('checkout')}
        </button>
      </div>

      {message && (
        <div style={{
          padding: '12px 16px',
          background: '#d4edda',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          color: '#155724',
          marginBottom: '15px'
        }}>
          ✅ {message}
        </div>
      )}

      <div style={{ background: 'white', padding: '15px', borderRadius: '4px', fontSize: '14px' }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Kullanılan Çeviriler:</p>
        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: '1.8' }}>
          <li><code>buttons.addToCart</code> → {tButtons('addToCart')}</li>
          <li><code>buttons.addToWishlist</code> → {tButtons('addToWishlist')}</li>
          <li><code>buttons.checkout</code> → {tButtons('checkout')}</li>
          <li><code>alerts.addedToCart</code> → {tAlerts('addedToCart')}</li>
          <li><code>common.loading</code> → {tCommon('loading')}</li>
        </ul>
      </div>
    </div>
  );
}
