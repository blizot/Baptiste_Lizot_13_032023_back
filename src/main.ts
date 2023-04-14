import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

import * as docs from './docs/openapi.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  SwaggerModule.setup('api/v1/docs', app, docs as any);

  await app.listen(5000);
}
bootstrap();
