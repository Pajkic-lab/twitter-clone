import 'reflect-metadata';

import { ValidationPipe } from '@nestjs/common/pipes';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { PrismaClient } from '@prisma/client';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import * as compression from 'compression';
import { json, urlencoded } from 'express';
import * as session from 'express-session';
import helmet from 'helmet';
import * as hpp from 'hpp';
import * as passport from 'passport';
import { AppModule } from './app.module';
import { ConfigurationService } from './modules/configuration/configuration.service';
import { CorsService } from './modules/http/cors.service';

(async function () {
  const app = await NestFactory.create(AppModule);

  const port = app.get(ConfigurationService).port;
  const nodeEnv = app.get(ConfigurationService).nodeEnvironment;

  const sessionName = app.get(ConfigurationService).sessionName;
  const sessionSecret = app.get(ConfigurationService).sessionSecret;
  //
  const configService = app.get<ConfigService>(ConfigService);
  //
  const corsService = app.get<CorsService>(CorsService);

  app.use(hpp());
  app.use(
    helmet({
      crossOriginEmbedderPolicy: false,
      crossOriginResourcePolicy: false,
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          fontSrc: ["'self'"],
          imgSrc: ["'self'", 'https://cloudinary.com/', 'https://res.cloudinary.com/', 'data:'],
        },
      },
    }),
  );
  app.enableCors({
    origin: corsService.configCors(),
    credentials: true,
  });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.use(
    session({
      name: sessionName,
      secret: sessionSecret,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 2147483647,
        httpOnly: false,
      },
      store: new PrismaSessionStore(new PrismaClient(), {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(compression());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // await app.listen(nodeEnv === 'development' ? port : 5000);
  await app.listen(configService.get('PORT') || 5000);
  console.log(`Application is running on: ${await app.getUrl()} 🚀🚀🚀`);
})();
