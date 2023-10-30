import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { HttpService } from 'src/http/http.service';
import { ConfService } from 'src/modules/conf/conf.service';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  authService: AuthService;

  constructor(authService: AuthService, httpService: HttpService, private confService: ConfService) {
    super({
      clientID: confService.googleClientId,
      clientSecret: confService.googleClientSecret,
      callbackURL: httpService.baseUrlServer('/auth/google/redirect'),
      scope: ['profile', 'email'],
    });
    this.authService = authService;
  }

  async validate(accesToken: string, refreshToken: string, profile: Profile) {
    const user = await this.authService.validateGoogleUser({
      email: profile.emails[0].value,
      name: profile.displayName,
    });
    return user || null;
  }
}
