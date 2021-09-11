import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { AppConfig } from 'src/common/services';

async function bootstrap() {
  AppConfig.initialise();
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
