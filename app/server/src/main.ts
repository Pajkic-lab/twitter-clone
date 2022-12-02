import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import * as compression from 'compression';
import * as passport from 'passport';
import helmet from 'helmet';
import * as hpp from 'hpp';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const prismaService = app.get<PrismaService>(PrismaService);
  app.enableCors({
    origin: '*',
  });
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(
    session({
      name: 'twitter-clone-auth-session',
      secret: configService.get('SESSION_SECRET'),
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 6000000,
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
  await app.listen(configService.get('PORT') || 5000);
  console.log(`Application is running on: ${await app.getUrl()} 🚀🚀🚀`);
}
bootstrap();