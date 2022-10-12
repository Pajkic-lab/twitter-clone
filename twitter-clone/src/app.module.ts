import { ServeStaticModule } from '@nestjs/serve-static'
import { PrismaModule } from './prisma/prisma.module'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { Module } from '@nestjs/common'
import { join } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/build'),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
