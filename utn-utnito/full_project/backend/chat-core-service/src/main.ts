import * as dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV === 'docker' ? '.env.docker' : '.env',
});

import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { LogLevel, ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './basic/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: getLoggerLevels(),
  });

  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(compression());

  const configService = app.get(ConfigService);
  const allowedOrigin = configService.get<string>('CORS_ALLOWED_ORIGIN', 'http://localhost:5300');

  app.enableCors({
    origin: allowedOrigin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));

  setupSwagger(app);

  const port = configService.get<number>('APP_PORT', 5001);
  await app.listen(port);
}

function getLoggerLevels(): LogLevel[] {
  const configService = new ConfigService();
  const logLevel = configService.get<string>('APP_LOG_LEVEL', 'log');

  const levelMap: Record<string, LogLevel[]> = {
    error: ['error'],
    warn: ['error', 'warn'],
    log: ['error', 'warn', 'log'],
    debug: ['error', 'warn', 'log', 'debug'],
    verbose: ['error', 'warn', 'log', 'debug', 'verbose'],
  };

  return levelMap[logLevel.toLowerCase()] || ['error', 'warn', 'log'];
}

function setupSwagger(app: any): void {
  const configService: ConfigService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_APP_TITLE', 'UTNito chat core service'))
    .setDescription(configService.get('SWAGGER_APP_DESCRIPTION', 'UTNito chat core API'))
    .setVersion(configService.get('SWAGGER_APP_VERSION', '1.0.0'))
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        in: 'header',
        description: 'Paste your JWT here (with no "Bearer " prefix).',
      },
      configService.get('API_SECURITY_SCHEMA_NAME', 'jwtAuth'),
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  const basePath = configService.get('SWAGGER_BASE_PATH', '');
  SwaggerModule.setup(`${basePath}/api`, app, document);
}

bootstrap();
