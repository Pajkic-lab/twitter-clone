import { HelperService } from '../../helper/helper.service';
import { Profile, Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  authService: AuthService;

  constructor(config: ConfigService, authService: AuthService, helperService: HelperService) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: helperService.baseUrlServer('/auth/google/redirect'),
      scope: ['profile', 'email'],
    });
    this.authService = authService;
  }

  async validate(accesToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });
    return user || null;
  }
}
