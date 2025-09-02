import 'reflect-metadata';

import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import compression from 'compression';
import { json, urlencoded } from 'express';
import session from 'express-session';
import passport from 'passport';
import { AppModule } from './app.module';
import { ConfigurationService } from './modules/configuration/configuration.service';
import { CorsService } from './modules/http/cors.service';

const FILE_SIZE_LIMIT = '50mb';
const SESSION_MAX_AGE = 2147483647;
const SESSION_CHECK_PERIOD = 2 * 60 * 1000;
const SWAGGER_TITLE = 'API Documentation';
const SWAGGER_DESCRIPTION = 'API Documentation';
const SWAGGER_VERSION = '1.0';
const SWAGGER_TAG = 'api';
const SWAGGER_PATH = 'docs';
//

async function generateDocumentation(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(SWAGGER_VERSION)
    // .addBearerAuth()
    .addTag(SWAGGER_TAG)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_PATH, app, document);
}

function setupSession(app: INestApplication) {
  const sessionName = app.get(ConfigurationService).sessionName;
  const sessionSecret = app.get(ConfigurationService).sessionSecret;

  app.use(
    session({
      name: sessionName,
      secret: sessionSecret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: SESSION_MAX_AGE,
        httpOnly: false,
      },
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: SESSION_CHECK_PERIOD,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );
}

function enableCors(app: INestApplication) {
  const corsService = app.get<CorsService>(CorsService);

  app.enableCors({
    origin: corsService.configCors(),
    credentials: true,
  });
}

function enableGlobalPipes(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
}

function setupSizeLimit(app: INestApplication) {
  app.use(json({ limit: FILE_SIZE_LIMIT }));
}

function setupEncode(app: INestApplication) {
  app.use(urlencoded({ extended: true, limit: FILE_SIZE_LIMIT }));
}

function enablePassport(app: INestApplication) {
  app.use(passport.initialize());
}

function enablePassportSession(app: INestApplication) {
  app.use(passport.session());
}

function enableCompression(app: INestApplication) {
  app.use(compression());
}

(async function boot() {
  const app = await NestFactory.create(AppModule);

  const port = app.get(ConfigurationService).port;

  enableCors(app);
  setupSizeLimit(app);
  setupEncode(app);
  setupSession(app);
  enablePassport(app);
  enablePassportSession(app);
  enableCompression(app);
  enableGlobalPipes(app);
  generateDocumentation(app);

  await app.listen(port);
  console.log(
    `Loaded environment: ${
      app.get(ConfigurationService).nodeEnvironment
    } 🚀🚀🚀 Application is running on: ${await app.getUrl()} 🚀🚀🚀`,
  );
})();
