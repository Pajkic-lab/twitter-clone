import { Controller, Get, Req, Res, Session, UseGuards } from '@nestjs/common';
import { HttpService } from 'src/http/http.service';
import { GoogleAuthGurard } from './utils/Guards';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private httpService: HttpService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGurard)
  handleLogin() {
    null;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGurard)
  handleRedirect(@Req() request: Request, @Res() response: Response) {
    response.redirect(this.httpService.baseUrlClient('/home'));
  }

  @Get('google/logout')
  async logout(@Session() session: Record<string, any>, @Req() request: Request, @Res() response: Response) {
    request.logOut(err => {
      err && console.log(err);
    });
    response.clearCookie('twitter-clone-auth-session').redirect(this.httpService.baseUrlClient('/'));
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log(request.isAuthenticated());
    if (request.user) {
      return {
        msg: 'Authenticated',
      };
    }
    return {
      msg: 'Not Authenticated',
    };
  }
}
