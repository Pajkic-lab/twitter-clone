import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Profile, Strategy } from 'passport-google-oauth20';
import { ConfigurationService } from '../../configuration/configuration.service';
import { HttpService } from '../../http/http.service';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  authService: AuthService;

  constructor(
    authService: AuthService,
    httpService: HttpService,
    confService: ConfigurationService
  ) {
    super({
      clientID: confService.googleClientId,
      clientSecret: confService.googleClientSecret,
      callbackURL: httpService.baseUrlServer('/auth/google/redirect'),
      scope: ['profile', 'email'],
    });
    this.authService = authService;
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile
  ): Promise<User> {
    if (!profile.emails?.[0]?.value) {
      throw new Error('Missing email address');
    }

    const user = await this.authService.validateGoogleUser({
      email: profile.emails?.[0]?.value,
      name: profile.displayName,
    });

    return user;
  }
}
