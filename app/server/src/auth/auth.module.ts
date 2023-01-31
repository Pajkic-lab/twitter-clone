import { GoogleStrategy } from './google-strategy/google-strategy';
import { SessionSerializer } from './google-strategy/serializer';
import { HelperService } from 'src/helper/helper.service';
import { HttpService } from 'src/http/http.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { LocalStrategy } from './local-strategy/local-strategy';
import { IsAuthGurard } from './is-auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SessionSerializer, HelperService, HttpService, LocalStrategy, IsAuthGurard],
})
export class AuthModule {}
