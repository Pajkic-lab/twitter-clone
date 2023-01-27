import { PassportStrategy } from '@nestjs/passport';
import { HttpService } from 'src/http/http.service';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService, private authService: AuthService, private httpService: HttpService) {
    console.log('3333333333333333333333333333333333333333');
    super();
  }

  async validate(name: string, email: string, password: string) {
    console.log(name, email, password); ////////////////////////////////////////
    const user = await this.authService.validateUser({
      email,
      password,
    }); // no user throw error
    return user || null;
  }
}
