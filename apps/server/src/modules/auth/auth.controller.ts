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
  ReqUserContaining,
  NameUniquenessRequestDto,
  NameUniquenessResponseDto,
} from '@tw/data';

@Controller('auth')
export class AuthController {
  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  @Get('google/login')
  @UseGuards(IsGuestGuard, GoogleAuthGuard)
  handleGooleLogin(): void {
    return;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect(@Res() response: Response): void {
    response.redirect(this.httpService.baseUrlClient('/'));
  }

  @Post('register')
  @UseGuards(IsGuestGuard, LocalAuthGuard)
  handleLocalRegister(): void {
    return;
  }

  @Post('login')
  @UseGuards(IsGuestGuard, LocalAuthGuard)
  handleLocalLogin(@Req() request: ReqUserContaining) {
    // socail status does not have DTO type
    return this.authService.authUser(request.user.id);
  }

  @Get('user')
  @UseGuards(IsAuthGuard)
  handleAuthUser(@Req() request: ReqUserContaining) {
    // socail status does not have DTO type
    return this.authService.authUser(request.user.id);
  }

  @Get('logout')
  @UseGuards(IsAuthGuard)
  handleLogOut(@Req() request: Request): Promise<void> {
    return this.authService.logOut(request);
  }

  @Post('name-uniqueness')
  @UseGuards(IsAuthGuard)
  // research should controller have response type declaration?
  handleNameUniqueness(
    @Body() body: NameUniquenessRequestDto
  ): Promise<NameUniquenessResponseDto> {
    return this.authService.checkNameUniqueness(body);
  }

  @Post('create-unique-name')
  @UseGuards(IsAuthGuard)
  handleUpdateUserUniqueName(
    @Req() request: ReqUserContaining,
    @Body() body: NameUniquenessRequestDto
  ) {
    return this.authService.updateUniqueUserName(request.user.id, body);
  }

  // @Patch('update/user')
  // @UseGuards(IsAuthGuard)
  // handleUpdateUser(@Req() request) {
  //   return this.authService.updateUser(
  //     request.user.id,
  //     request.body.updateUser
  //   );
  // }

  // @Get('public/user/:id')
  // @UsePipes(new ParseIntPipe())
  // handleGetPublicUser(@Param('id') id: number, @Req() request) {
  //   return this.authService.getPublicUser(id, request.user?.id);
  // }

  // @Post('follow/user')
  // @UseGuards(IsAuthGuard)
  // handleFollowUser(@Req() request) {
  //   return this.authService.followUser(request.user.id, request.body.userId);
  // }

  // @Delete('unfollow/user/:userIdToUnfollow')
  // @UseGuards(IsAuthGuard)
  // @UsePipes(new ParseIntPipe())
  // handleUnFollowUser(
  //   @Param('userIdToUnfollow') userIdToUnfollow: number,
  //   @Req() request
  // ) {
  //   return this.authService.unFollowUser(request.user.id, userIdToUnfollow);
  // }
}
