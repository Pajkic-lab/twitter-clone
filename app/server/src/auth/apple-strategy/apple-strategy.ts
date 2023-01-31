import { Strategy } from 'passport-apple';
import { PassportStrategy } from '@nestjs/passport';
import { HttpService } from 'src/http/http.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppleStrategy extends PassportStrategy(Strategy) {
  authService: AuthService;

  constructor(config: ConfigService, authService: AuthService, httpService: HttpService) {
    super({
      clientID: config.get('APPLE_CLIENT_ID'),
      teamID: '',
      callbackURL: httpService.baseUrlServer('/auth/apple/redirect'),
      keyID: '',
      privateKeyLocation: '',
      passReqToCallback: true,
    });
    this.authService = authService;
  }

  async validate(req, accessToken, refreshToken, idToken, profile, cb) {
    cb(null, idToken);
    ////
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });
    return user || null;
  }
}
