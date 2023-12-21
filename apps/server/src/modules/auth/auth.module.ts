import { Module } from '@nestjs/common';
import { IsAuthGuard } from '../../common/guards/is-auth.guard';
import { IsGuestGuard } from '../../common/guards/is-guest.guard';
import { HelperService } from '../helper/helper.service';
import { HttpService } from '../http/http.service';
import { AuthController } from './auth.controller';
import { AuthProfile } from './auth.profile';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-strategy/google-auth.guard';
import { GoogleStrategy } from './google-strategy/google-strategy';
import { DtoValidation } from './local-strategy/dto-validation';
import { LocalStrategy } from './local-strategy/local-strategy';
import { SessionSerializer } from './serializer';

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
    AuthProfile,
  ],
  imports: [],
})
export class AuthModule {}
