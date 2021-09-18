import { config as dotEnvConfig } from 'dotenv';

import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfig } from 'src/common/services';
import { AppModule } from './app.module';

async function bootstrap() {
  dotEnvConfig();
  AppConfig.initialise();

  console.log('logger ---- ', AppConfig.getConfigs());

  const app = await NestFactory.create(AppModule);

  app.enableVersioning({
    type: VersioningType.URI
  });
  app.useGlobalInterceptors(app.get(Reflector));
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Resful Api using NestJS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(AppConfig.getConfigs().port);
}
bootstrap();
