import 'reflect-metadata';

import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import compression from 'compression';
import { json, urlencoded } from 'express';
import session from 'express-session';
import passport from 'passport';
import { AppModule } from './app.module';
import { ConfigurationService } from './modules/configuration/configuration.service';
import { CorsService } from './modules/http/cors.service';

const LIMIT = '50mb';
const MAX_AGE = 2147483647;
const CHECK_PERIOD = 2 * 60 * 1000;

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
        maxAge: MAX_AGE,
        httpOnly: false,
      },
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: CHECK_PERIOD,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    })
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
    })
  );
}

function setupSizeLimit(app: INestApplication) {
  app.use(json({ limit: LIMIT }));
}

function setupEncode(app: INestApplication) {
  app.use(urlencoded({ extended: true, limit: LIMIT }));
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

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()} 🚀🚀🚀`);
})();
