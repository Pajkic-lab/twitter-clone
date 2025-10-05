import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  authService: AuthService;

  constructor(authService: AuthService) {
    super();
    this.authService = authService;
  }

  serializeUser(user: User, done: (err: any, userId: string) => void) {
    done(null, user.id);
  }

  async deserializeUser(userId: string, done: (err: any, arg1: any) => any) {
    const user = await this.authService.findUser(userId);
    return user ? done(null, user) : done(null, null);
  }
}
