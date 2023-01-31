import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGurard } from './google-strategy/google-auth.gurard';
import { HttpService } from 'src/http/http.service';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { LocalAuthGurard } from './local-strategy/local-auth.guard';
import { IsAuthGurard } from './is-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private httpService: HttpService, private config: ConfigService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGurard)
  handleGooleLogin(@Res() response: Response) {
    response.redirect(this.httpService.baseUrlClient('/'));
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGurard)
  handleGoogleRedirect(@Res() response: Response) {
    response.redirect(this.httpService.baseUrlClient('/home'));
  }

  @Get('google/logout')
  @UseGuards(IsAuthGurard)
  async logout(@Req() request: Request, @Res() response: Response) {
    request.logOut(err => {
      err && console.log(err);
    });
    response.clearCookie(this.config.get('SESSION_NAME')).redirect(this.httpService.baseUrlClient('/'));
  }

  @Get('status')
  @UseGuards(IsAuthGurard)
  user(@Req() request: Request) {
    if (request.user) {
      return {
        msg: 'Authenticated',
      };
    }
    return {
      msg: 'Not Authenticated',
    };
  }

  @Post('register')
  @UseGuards(LocalAuthGurard)
  handleLocalLogin(@Req() request: Request, @Res() response: Response) {
    response.send();
  }

  @Get('protected')
  check() {
    return 'nesto';
  }
}
