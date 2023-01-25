import { Controller, Get, Req, Res, Session, UseGuards } from '@nestjs/common';
import { HelperService } from 'src/helper/helper.service';
import { HttpService } from 'src/http/http.service';
import { GoogleAuthGurard } from './utils/Guards';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private helperService: HelperService,
    private authService: AuthService,
    private httpService: HttpService,
  ) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGurard)
  handleLogin() {
    console.log('');
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGurard)
  handleRedirect(@Req() request: Request, @Res() response: Response) {
    this.httpService.baseUrlServer('/home');
    response.redirect(this.helperService.baseUrlClient('/home'));
  }

  @Get('google/logout')
  async logout(@Session() session: Record<string, any>, @Req() request: Request, @Res() response: Response) {
    this.authService.deleteSession(request, session);
    response.redirect(this.helperService.baseUrlClient('/'));
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log(request.user);
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
