import { ServeStaticModule } from '@nestjs/serve-static'
import { PrismaModule } from './prisma/prisma.module'
import { AppController } from './app.controller'
import { ConfigModule } from '@nestjs/config'
import { AppService } from './app.service'
import { Module } from '@nestjs/common'
import { join } from 'path'
import { PassportModule } from '@nestjs/passport'
import { UserModule } from './user/user.module'
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client/build'),
    }),
    PassportModule.register({ session: true }),
    PrismaModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
