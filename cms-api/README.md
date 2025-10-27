# CMS API

NestJS + Prisma tabanlı headless CMS API'si. JWT/refresh kimlik doğrulama, sürüm yönetimi, taslak/yayınlanmış içerik ve S3 uyumlu dosya yüklemeleri içerir.

## Hızlı Başlangıç

```bash
cd cms-api
cp .env.example .env
npm install
npm run prisma:generate
npm run start:dev
```

## Öne Çıkanlar
- REST ve GraphQL üzerinden CRUD uç noktaları
- Argon2 ile parola hashleme, JWT access/refresh
- Prisma ile MySQL 8 şeması
- Swagger/OpenAPI dokümantasyonu (`/docs`)
- Postman koleksiyonu: `postman/cms-api.postman_collection.json`
- MinIO uyumlu imzalı URL servisleri
