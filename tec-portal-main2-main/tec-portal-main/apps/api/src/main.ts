import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .addBearerAuth(
      {
        description: 'App ID',
        type: 'apiKey',
        name: 'x-app-id',
        in: 'header',
      },
      'appId'
    )
    .addBearerAuth(
      {
        description: 'API Key',
        type: 'apiKey',
        name: 'x-api-key',
        in: 'header',
      },
      'apiKey'
    )
    .setTitle('TEC Portal')
    .setDescription('TEC Portal API')
    .setVersion('1.0')
    .addTag('tec-portal')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.API_PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap().then();
