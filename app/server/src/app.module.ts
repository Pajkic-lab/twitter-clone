import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CronJobModule } from './cron-job/cron-job.module';
import { HelperModule } from './helper/helper.module';
import { HttpModule } from './http/http.module';
import { ConfigurationModule } from './modules/conf/configuration.module';
import { PrismaModule } from './prisma/prisma.module';
import { UtileModule } from './utile/utile.module';

@Module({
  imports: [
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../../client/build'),
    }),
    PassportModule.register({
      session: true,
    }),
    ScheduleModule.forRoot(),
    ConfigurationModule,
    AuthModule,
    CronJobModule,
    HelperModule,
    HttpModule,
    CloudinaryModule,
    UtileModule,
  ],
  providers: [],
})
export class AppModule {}
