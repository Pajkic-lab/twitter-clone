import { PassportStrategy } from '@nestjs/passport';
import { HttpService } from 'src/http/http.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService, private authService: AuthService, private httpService: HttpService) {
    super({
      passReqToCallback: true,
      // usernameField: 'email',
    });
  }

  async validate(request: Request) {
    const { username, email, password } = request.body;
    const user = await this.authService.validateUserLocal({
      username,
      email,
      password,
    }); // no user throw error
    return user || null;
  }
}
