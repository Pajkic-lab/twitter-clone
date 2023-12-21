import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { DataAccessModule } from '@tw/data-access';
import { join } from 'path';
import { AuthModule } from './modules/auth/auth.module';
import { AutoMapperModule } from './modules/automapper/automapper.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { ConfigurationModule } from './modules/configuration/configuration.module';
import { ContractTestModule } from './modules/contract-test/contract-test.module';
import { CronJobModule } from './modules/cron-job/cron-job.module';
import { HelperModule } from './modules/helper/helper.module';
import { HttpModule } from './modules/http/http.module';
import { SocialModule } from './modules/social/social.module';
import { UserModule } from './modules/user/user.module';
import { UtileModule } from './modules/utile/utile.module';

const coreModules = [
  ConfigurationModule,
  DataAccessModule,
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '../client'),
  }),
  PassportModule.register({
    session: true,
  }),
  ScheduleModule.forRoot(),
  AutoMapperModule,
];

const applicationModules = [
  UserModule,
  AuthModule,
  SocialModule,
  CronJobModule,
  HelperModule,
  HttpModule,
  CloudinaryModule,
  UtileModule,
  ContractTestModule,
];

@Module({
  imports: [...coreModules, ...applicationModules],
})
export class AppModule {}
