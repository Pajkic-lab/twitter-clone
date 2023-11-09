import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthMediaRepository } from './auth.media-repository';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-strategy/google-auth.guard';
import { GoogleStrategy } from './google-strategy/google-strategy';
import { IsAuthGuard } from './is-auth.guard';
import { IsGuestGuard } from './is-guest.guard';
import { DtoValidation } from './local-strategy/dto-validation';
import { LocalStrategy } from './local-strategy/local-strategy';
import { SessionSerializer } from './serializer';
import { HelperService } from '../helper/helper.service';
import { HttpService } from '../http/http.service';
import { DataAccessModule } from '@tw/data-access';

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
    IsGuestGuard,
    IsAuthGuard,
    GoogleAuthGuard,
    AuthMediaRepository,
  ],
  imports: [DataAccessModule],
})
export class AuthModule {}
