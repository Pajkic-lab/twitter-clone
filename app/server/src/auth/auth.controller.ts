import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGurard } from './google-strategy/google-auth.gurard';
import { LocalAuthGurard } from './local-strategy/local-auth.guard';
import { HttpService } from 'src/http/http.service';
import { IsGuestGurard } from './is-guest.guard';
import { IsAuthGurard } from './is-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private httpService: HttpService, private authService: AuthService) {}

  @Get('google/login')
  @UseGuards(IsGuestGurard, GoogleAuthGurard)
  handleGooleLogin() {
    return;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGurard)
  handleGoogleRedirect(@Res() response) {
    response.redirect(this.httpService.baseUrlClient('/'));
  }

  @Post('register')
  @UseGuards(IsGuestGurard, LocalAuthGurard)
  handleLocalRegister() {
    return;
  }

  @Post('login')
  @UseGuards(IsGuestGurard, LocalAuthGurard)
  handleLocalLogin() {
    return;
  }

  @Get('user')
  @UseGuards(IsAuthGurard)
  handleAuthUser(@Req() request) {
    return this.authService.authUser(request.user.id);
  }

  @Get('logout')
  @UseGuards(IsAuthGurard)
  handlelogout(@Req() request) {
    return this.authService.logOut(request);
  }

  @Post('nameuniqueness')
  @UseGuards(IsAuthGurard)
  handleNameuniqueness(@Body() body) {
    return this.authService.checkNameUniqueness(body.uniqueName);
  }

  @Post('createuniquename')
  @UseGuards(IsAuthGurard)
  handleCreateUserUniqueName(@Req() request) {
    return this.authService.createUniqueUserName(request.user.id, request.body.uniqueName);
  }

  @Get('status')
  @UseGuards(IsAuthGurard)
  user(@Req() request) {
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
