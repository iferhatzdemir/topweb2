import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });
  const configService = app.get(ConfigService);

  const corsOrigins = configService.get<string>('CORS_ORIGINS', '');
  const originList = corsOrigins.split(',').map((origin) => origin.trim()).filter(Boolean);

  app.enableCors({
    origin: originList.length ? originList : true,
    credentials: true
  });

  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: true
    })
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('CMS API')
    .setDescription('Headless CMS API for the ecommerce platform')
    .setVersion('0.1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  const port = configService.get<number>('PORT') ?? 4000;
  await app.listen(port);
}

bootstrap();
