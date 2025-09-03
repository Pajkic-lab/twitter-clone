import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import {
  AuthenticationResponseDto,
  HttpResponse,
  RequestContainingUserId,
  SignInEmailResponseDto,
  SignUpEmailResponseDto,
} from '@tw/data';
import { Request, Response } from 'express';
import { IsAuthGuard } from '../../common/guards/is-auth.guard';
import { IsGuestGuard } from '../../common/guards/is-guest.guard';
import { HttpService } from '../http/http.service';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-strategy/google-auth.guard';
import { LocalAuthGuard } from './local-strategy/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private httpService: HttpService, private authService: AuthService) {}

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
    @Req() request: RequestContainingUserId,
  ): Promise<HttpResponse<SignUpEmailResponseDto>> {
    return this.authService.sigUpGetUser(request.user.id);
  }

  @Post('sign-in')
  @UseGuards(IsGuestGuard, LocalAuthGuard)
  handleLocalLogin(
    @Req() request: RequestContainingUserId,
  ): Promise<HttpResponse<SignInEmailResponseDto>> {
    return this.authService.signInGetUser(request.user.id);
  }

  @Get()
  @UseGuards(IsAuthGuard)
  handleAuthUser(
    @Req() request: RequestContainingUserId,
  ): Promise<HttpResponse<AuthenticationResponseDto>> {
    return this.authService.authUser(request.user.id);
  }

  @Get('sign-out')
  @UseGuards(IsAuthGuard)
  handleSignOut(@Req() request: Request): Promise<void> {
    return this.authService.signOut(request);
  }
}
