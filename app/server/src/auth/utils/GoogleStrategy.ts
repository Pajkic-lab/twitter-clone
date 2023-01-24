import { Profile, Strategy } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  authService: AuthService;

  constructor(config: ConfigService, authService: AuthService) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: process.env.NODE_ENV == 'production' ? '/auth/google/redirect' : 'http://localhost:5000/auth/google/redirect',
      scope: ['profile', 'email'],
    });
    this.authService = authService; // do i need this line of code and what it does
  }

  async validate(accesToken: string, refreshToken: string, profile: Profile) {
    console.log('google strategy validate, "first instance after google server on local"');
    const user = await this.authService.validateUser({
      email: profile.emails[0].value,
      displayName: profile.displayName,
    });
    return user || null;
  }
}
