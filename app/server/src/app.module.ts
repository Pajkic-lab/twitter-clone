import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CronJobModule } from './cron-job/cron-job.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PrismaModule } from './prisma/prisma.module';
import { HelperModule } from './helper/helper.module';
import { PassportModule } from '@nestjs/passport';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { HttpModule } from './http/http.module';
import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { join } from 'path';
import { UtileModule } from './utile/utile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ServeStaticModule.forRoot({
      // rootPath: join(__dirname, '..', '../client/build'),
      rootPath: join(__dirname, '..', '../../client/build'),
    }),
    PassportModule.register({
      session: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    AuthModule,
    CronJobModule,
    HelperModule,
    HttpModule,
    CloudinaryModule,
    UtileModule,
  ],
})
export class AppModule {}

// cd server && npm i && npm run build && cd ../client && npm i && npm run build && cd ../..

// Oct 20 05:58:54 PM  [Nest] 340  - 10/20/2023, 3:58:54 PM   ERROR [ExceptionsHandler] ENOENT: no such file or directory, stat '/opt/render/project/src/app/server/client/build/index.html'
// Oct 20 05:58:54 PM  Error: ENOENT: no such file or directory, stat '/opt/render/project/src/app/server/client/build/index.html'
