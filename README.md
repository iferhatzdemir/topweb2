This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## CMS API entegrasyonu

- `cms-api/openapi.json` dosyası NestJS Swagger tanımını içerir. Şema güncellendiğinde `npm run cms-client:generate` komutu ile tipli istemciyi yeniden üretin.
- Önyüz ile CMS arasındaki iletişim `src/lib/cms-client` altındaki otomatik üretim kodu üzerinden yürütülür.
- React bileşenleri için hafif bir SWR katmanı (`useSWRLite`) uygulanarak stale-while-revalidate önbellekleme sağlandı.

### Gerekli ortam değişkenleri

```bash
NEXT_PUBLIC_CMS_API_URL=http://localhost:4000
# Tarayıcıdan kullanılacak salt-okunur token (opsiyonel)
NEXT_PUBLIC_CMS_API_TOKEN=public-demo-token
# Sunucu tarafında saklanacak servis hesabı token'ı (opsiyonel)
CMS_API_TOKEN=server-side-token
```

Public token'ı yalnızca salt-okunur işlemler için paylaşın. Yönetici ayrıcalıkları taşıyan token'ları kesinlikle istemciye göndermeyin.

## Kullanılabilir komutlar

- `npm run dev`: Geliştirme sunucusunu başlatır.
- `npm run build`: Üretim derlemesi oluşturur.
- `npm run start`: Üretim derlemesini çalıştırır.
- `npm run lint`: ESLint kontrollerini çalıştırır.
- `npm run cms-client:generate`: OpenAPI şemasından tipli CMS istemcisi üretir.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
