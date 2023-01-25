import { Controller, Get, Req, Res, Session, UseGuards } from '@nestjs/common';
import { HttpService } from 'src/http/http.service';
import { GoogleAuthGurard } from './utils/Guards';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService, private httpService: HttpService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGurard)
  handleLogin() {
    console.log('');
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGurard)
  handleRedirect(@Req() request: Request, @Res() response: Response) {
    response.redirect(this.httpService.baseUrlClient('/home'));
  }

  @Get('google/logout')
  async logout(@Session() session: Record<string, any>, @Req() request: Request, @Res() response: Response) {
    this.authService.deleteSession(request, session);
    response.redirect(this.httpService.baseUrlClient('/'));
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
