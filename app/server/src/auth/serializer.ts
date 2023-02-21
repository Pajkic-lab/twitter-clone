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

  serializeUser(user: User, done: (err: any, userId: number) => void) {
    done(null, user.id);
  }

  async deserializeUser(userId: number, done: (err: any, arg1: User) => any) {
    const user = await this.authService.findUser(userId);
    return user ? done(null, user) : done(null, null);
  }
}
