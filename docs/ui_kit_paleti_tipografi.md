# Gül Kurusu UI Kit Paleti ve Tipografi Önerisi

## 1. Renk Paleti ve Design Token Önerisi
- **Ana Renk (Primary)**: Gül kurusu #d57373 tonlarını temel alır; sıcak, modern ve feminen bir algı oluşturur.
- **Nötr Tonlar**: Gri 50-900 skalası arka plan, yüzey ve tipografi kontrastlarını dengeler.
- **Vurgu Renkleri (Accents)**: Yeşil (#3A7A6E) güven ve doğallık hissi verir, krem (#F5EFEF) ise yumuşak arka planlar için kullanılır.
- **Tipografi**: Başlıklarda Poppins (600/700), metinlerde Inter (400/500) kullanımı Türkçe karakter desteği ve okunabilirlik sağlar.

### 1.1 Design Token Sözlüğü (CSS Variables)
```css
:root {
  /* Primary Scale */
  --color-primary-50: #f8e9e9;
  --color-primary-100: #f1d3d3;
  --color-primary-200: #e8b9b9;
  --color-primary-300: #df9f9f;
  --color-primary-400: #d88686;
  --color-primary-500: #d57373; /* Base */
  --color-primary-600: #be5f5f;
  --color-primary-700: #9f4c4c;
  --color-primary-800: #7f3d3d;
  --color-primary-900: #5c2a2a;

  /* Accent Scale */
  --color-accent-green-100: #cce0db;
  --color-accent-green-200: #9fc7bd;
  --color-accent-green-300: #70ae9e;
  --color-accent-green-400: #4e9586;
  --color-accent-green-500: #3a7a6e; /* Base */
  --color-accent-green-600: #2f6057;

  --color-accent-cream-50: #fbf7f7;
  --color-accent-cream-100: #f5efef; /* Base */
  --color-accent-cream-200: #e7dede;

  --color-white: #ffffff;

  /* Neutral Gray (50-900) */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2933;
  --color-gray-900: #111827;

  /* Typography */
  --font-family-heading: 'Poppins', 'Helvetica Neue', Arial, sans-serif;
  --font-family-body: 'Inter', 'Helvetica Neue', Arial, sans-serif;

  /* Spacing Scale */
  --space-2xs: 0.25rem; /* 4px */
  --space-xs: 0.5rem;   /* 8px */
  --space-sm: 0.75rem;  /* 12px */
  --space-md: 1rem;     /* 16px */
  --space-lg: 1.5rem;   /* 24px */
  --space-xl: 2rem;     /* 32px */
  --space-2xl: 3rem;    /* 48px */

  /* Radius Scale */
  --radius-sm: 0.375rem; /* 6px */
  --radius-md: 0.5rem;   /* 8px */
  --radius-lg: 0.75rem;  /* 12px */
  --radius-xl: 1rem;     /* 16px */
}
```

## 2. Tailwind Config Örneği
```js
// tailwind.config.js
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8e9e9',
          100: '#f1d3d3',
          200: '#e8b9b9',
          300: '#df9f9f',
          400: '#d88686',
          500: '#d57373',
          600: '#be5f5f',
          700: '#9f4c4c',
          800: '#7f3d3d',
          900: '#5c2a2a',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2933',
          900: '#111827',
        },
        accent: {
          green: {
            100: '#cce0db',
            200: '#9fc7bd',
            300: '#70ae9e',
            400: '#4e9586',
            500: '#3a7a6e',
            600: '#2f6057',
          },
          cream: {
            50: '#fbf7f7',
            100: '#f5efef',
            200: '#e7dede',
          },
          white: '#ffffff',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'Helvetica Neue', 'Arial', 'sans-serif'],
        body: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      borderRadius: {
        sm: '0.375rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
      },
      spacing: {
        '2xs': '0.25rem',
        xs: '0.5rem',
        sm: '0.75rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
        '2xl': '3rem',
      },
    },
  },
  plugins: [],
};
```

## 3. WCAG Kontrast Notları
- **#d57373 (Primary 500) / #ffffff**: 3.22:1 kontrast oranı sunar; büyük metin (≥18pt) ve ikonlar için AA, normal metin için yetersizdir. Arka plan olarak #ffffff yerine #f5efef kullanmak kontrastı dengeler.
- **#d57373 (Primary 500) / #1f2933 (Gray 800)**: 4.59:1 oranıyla normal metinde AA seviyesini sağlar; büyük metinlerde AAA’ya yaklaşır.
- **#3A7A6E (Accent Green 500) / #ffffff**: 5.01:1 oranı ile normal metin ve buton etiketlerinde AA uyumludur.
- **#F5EFEF (Accent Cream 100) / #1f2933 (Gray 800)**: 12.98:1 ile AA/AAA gereksinimlerini karşılar; krem arka plan üzerinde koyu metin önerilir.
- **#F5EFEF (Accent Cream 100) / #3A7A6E (Accent Green 500)**: 4.41:1 oranı büyük başlıklar için AA, normal metin için sınırda; font ağırlığını artırmak önerilir.
- **Daha yüksek kontrast gerektiren durumlarda** Primary 700 (#9f4c4c) veya Gray 900 (#111827) tonları tercih edilerek AA/AAA seviyeleri güvence altına alınabilir.

## 4. Kullanım Önerileri
- Birincil CTA butonlarında Primary 500 arka plan + beyaz metin, hover’da Primary 600 ve aktif durumda Primary 700 kullanın.
- Sekonder butonlar için krem veya beyaz arka plan + Primary 600 metin, kenarlıkta Primary 300 önerilir.
- Başlıklarda Poppins SemiBold (600) 1.2 satır aralığı; paragraf metinlerinde Inter Regular (400) 1.5 satır aralığı kullanın.
- Kart bileşenleri için krem arka plan, 16px (radius-xl) köşe yuvarlatma ve 24px (space-lg) iç boşluk, gölgeyi minimal tutun.
