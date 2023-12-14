import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-strategy/google-auth.guard';
import { IsAuthGuard } from './is-auth.guard';
import { IsGuestGuard } from './is-guest.guard';
import { LocalAuthGuard } from './local-strategy/local-auth.guard';
import { HttpService } from '../http/http.service';
import { Request, Response } from 'express';
import {
  RequestContainingUserId,
  NameUniqueRequestDto,
  NameUniqueResponseDto,
  HttpResponse,
  AuthenticationResponseDto,
  SignInEmailResponseDto,
  SignUpEmailResponseDto,
  SocialStatsResponseDto,
  NameUniqueUpdateResponseDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
  PublicUserResponseDto,
  FollowUserRequestDto,
  FollowUserResponseDto,
} from '@tw/data';

@Controller('auth')
export class AuthController {
  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  @Get('google/login')
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

  @Post('name-unique')
  @UseGuards(IsAuthGuard)
  handleNameUniqueness(
    @Body() body: NameUniqueRequestDto
  ): Promise<HttpResponse<NameUniqueResponseDto>> {
    return this.authService.checkNameUniqueness(body);
  }

  @Patch('name-unique')
  @UseGuards(IsAuthGuard)
  handleUpdateUserUniqueName(
    @Req() request: RequestContainingUserId,
    @Body() body: NameUniqueRequestDto
  ): Promise<HttpResponse<NameUniqueUpdateResponseDto>> {
    return this.authService.updateUniqueUserName(request.user.id, body);
  }

  @Patch('update/user')
  @UseGuards(IsAuthGuard)
  handleUpdateUser(
    @Req() request: RequestContainingUserId,
    @Body() body: UpdateUserRequestDto
  ): Promise<HttpResponse<UpdateUserResponseDto>> {
    return this.authService.updateUser(request.user.id, body);
  }

  @Get('public/user/:id')
  @UsePipes(new ParseIntPipe())
  handleGetPublicUser(
    @Param('id') id: number,
    @Req() request: RequestContainingUserId
  ): Promise<
    HttpResponse<{
      user: PublicUserResponseDto;
      socialStats: SocialStatsResponseDto;
      followingStatus: boolean;
    }>
  > {
    return this.authService.getPublicUser(id, request.user.id);
  }

  @Post('follow/user')
  @UseGuards(IsAuthGuard)
  handleFollowUser(
    @Req() request: RequestContainingUserId,
    @Body() body: FollowUserRequestDto
  ): Promise<HttpResponse<FollowUserResponseDto>> {
    return this.authService.followUser(request.user.id, body);
  }

  @Delete('un-follow/user/:userIdToUnFollow')
  @UseGuards(IsAuthGuard)
  @UsePipes(new ParseIntPipe())
  handleUnFollowUser(
    @Param('userIdToUnFollow') userIdToUnFollow: number,
    @Req() request: RequestContainingUserId
  ) {
    return this.authService.unFollowUser(request.user.id, userIdToUnFollow);
  }
}
