import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  ClassSerializerInterceptor,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Enable CORS for all routes
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Movie Management API')
    .setDescription('Backend for movies management')
    .setVersion('1.0')
    .setContact(
      'Juan Pablo Bizantino',
      'https://www.linkedin.com/in/jpbizantino/',
      'jpbizantino@gmail.com',
    )
    .setLicense('Unlicensed', '')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
