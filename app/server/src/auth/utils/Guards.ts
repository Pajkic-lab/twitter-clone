import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGurard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const activate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);
    console.log('GoogleAuthGurard');
    return activate;
  }
}
