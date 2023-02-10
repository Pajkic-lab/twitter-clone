import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  authService: AuthService;

  constructor(authService: AuthService) {
    super();
    this.authService = authService;
  }

  serializeUser(user: User, done: (arg0: any, arg1: User) => void) {
    done(null, user);
  }

  async deserializeUser(payload: any, done: (arg0: any, arg1: User) => any) {
    const user = await this.authService.findUser(payload.id);
    return user ? done(null, user) : done(null, null);
  }
}
