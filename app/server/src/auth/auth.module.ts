import { GoogleAuthGurard } from './google-strategy/google-auth.gurard';
import { GoogleStrategy } from './google-strategy/google-strategy';
import { DtoValidation } from './local-strategy/dto-validation';
import { LocalStrategy } from './local-strategy/local-strategy';
import { AuthMediaRepository } from './auth.media-repository';
import { HelperService } from 'src/helper/helper.service';
import { HttpService } from 'src/http/http.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { IsGuestGurard } from './is-guest.guard';
import { SessionSerializer } from './serializer';
import { IsAuthGurard } from './is-auth.guard';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    GoogleStrategy,
    SessionSerializer,
    HelperService,
    HttpService,
    LocalStrategy,
    AuthRepository,
    DtoValidation,
    IsGuestGurard,
    IsAuthGurard,
    GoogleAuthGurard,
    AuthMediaRepository,
  ],
})
export class AuthModule {}
