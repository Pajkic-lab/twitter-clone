import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
// import { ConfigurationService } from 'src/modules/configuration/configuration.service';
// import { HttpService } from 'src/modules/http/http.service';
import { AuthService } from '../auth.service';
import { HttpService } from '../../http/http.service';
import { ConfigurationService } from '../../configuration/configuration.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  authService: AuthService;

  constructor(
    authService: AuthService,
    httpService: HttpService,
    private confService: ConfigurationService
  ) {
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
