import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaService } from './prisma/prisma.service';
import { ValidationPipe } from '@nestjs/common/pipes';
import { CorsService } from './http/cors.service';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as compression from 'compression';
import { urlencoded, json } from 'express';
import { AppModule } from './app.module';
import * as passport from 'passport';
import helmet from 'helmet';
import * as hpp from 'hpp';

(async function () {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const prismaService = app.get<PrismaService>(PrismaService);
  const corsService = app.get<CorsService>(CorsService);
  app.use(hpp());
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: { imgSrc: ["'self'", 'data:', 'https://cloudinary.com/', 'https://res.cloudinary.com/'] },
      },
    }),
  );
  app.enableCors({
    origin: [corsService.configCors(), corsService.configCloudinaryCors()],
    credentials: true,
  });
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.use(compression());
  app.use(
    session({
      name: configService.get('SESSION_NAME'),
      secret: configService.get('SESSION_SECRET'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 2147483647,
        httpOnly: false,
      },
      store: new PrismaSessionStore(prismaService, {
        checkPeriod: 2 * 60 * 1000,
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }),
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  await app.listen(configService.get('PORT') || 5000);
  console.log(`Application is running on: ${await app.getUrl()} 🚀🚀🚀`);
})();
