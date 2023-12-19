import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-strategy/google-auth.guard';
import { IsAuthGuard } from './is-auth.guard';
import { IsGuestGuard } from './is-guest.guard';
import { LocalAuthGuard } from './local-strategy/local-auth.guard';
import { HttpService } from '../http/http.service';
import { Request, Response } from 'express';
import {
  RequestContainingUserId,
  HttpResponse,
  AuthenticationResponseDto,
  SignInEmailResponseDto,
  SignUpEmailResponseDto,
  SocialStatsResponseDto,
} from '@tw/data';

@Controller('auth')
export class AuthController {
  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  @Get('google/sign-in')
  @UseGuards(IsGuestGuard, GoogleAuthGuard)
  handleGoogleLogin() {
    return;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect(@Res() response: Response): void {
    response.redirect(this.httpService.baseUrlClient('/'));
  }

  @Post('sign-up')
  @UseGuards(IsGuestGuard, LocalAuthGuard)
  handleLocalRegister(
    @Req() request: RequestContainingUserId
  ): Promise<HttpResponse<SignUpEmailResponseDto>> {
    return this.authService.sigUpGetUser(request.user.id);
  }

  @Post('sign-in')
  @UseGuards(IsGuestGuard, LocalAuthGuard)
  handleLocalLogin(
    @Req() request: RequestContainingUserId
  ): Promise<HttpResponse<SignInEmailResponseDto>> {
    return this.authService.signInGetUser(request.user.id);
  }

  @Get('user')
  @UseGuards(IsAuthGuard)
  handleAuthUser(@Req() request: RequestContainingUserId): Promise<
    HttpResponse<{
      user: AuthenticationResponseDto;
      socialStats: SocialStatsResponseDto;
    }>
  > {
    return this.authService.authUser(request.user.id);
  }

  @Get('logout')
  @UseGuards(IsAuthGuard)
  handleLogOut(@Req() request: Request): Promise<void> {
    return this.authService.logOut(request);
  }
}
