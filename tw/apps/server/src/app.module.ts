import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { CronJobModule } from './modules/cron-job/cron-job.module';
import { HelperModule } from './modules/helper/helper.module';
import { HttpModule } from './modules/http/http.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UtileModule } from './modules/utile/utile.module';

const coreModules = [
  ConfigurationModule,
  PrismaModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../client'),
  }),
  PassportModule.register({
    session: true,
  }),
  ScheduleModule.forRoot(),
];

const applicationModules = [
  AuthModule,
  CronJobModule,
  HelperModule,
  HttpModule,
  CloudinaryModule,
  UtileModule,
];

@Module({
  imports: [...coreModules, ...applicationModules],
})
export class AppModule {}
