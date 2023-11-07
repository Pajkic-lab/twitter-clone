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
// import { HttpService } from 'src/modules/http/http.service';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './google-strategy/google-auth.guard';
import { IsAuthGuard } from './is-auth.guard';
import { IsGuestGuard } from './is-guest.guard';
import { LocalAuthGuard } from './local-strategy/local-auth.guard';
import { HttpService } from '../http/http.service';

@Controller('auth')
export class AuthController {
  constructor(
    private httpService: HttpService,
    private authService: AuthService
  ) {}

  @Get('google/login')
  @UseGuards(IsGuestGuard, GoogleAuthGuard)
  handleGooleLogin() {
    return;
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleGoogleRedirect(@Res() response) {
    response.redirect(this.httpService.baseUrlClient('/'));
  }

  @Post('register')
  @UseGuards(IsGuestGuard, LocalAuthGuard)
  handleLocalRegister() {
    return;
  }

  @Post('login')
  @UseGuards(IsGuestGuard, LocalAuthGuard)
  handleLocalLogin() {
    return;
  }

  @Get('user')
  @UseGuards(IsAuthGuard)
  handleAuthUser(@Req() request) {
    return this.authService.authUser(request.user.id);
  }

  @Get('logout')
  @UseGuards(IsAuthGuard)
  handlelogout(@Req() request) {
    return this.authService.logOut(request);
  }

  @Post('nameuniqueness')
  @UseGuards(IsAuthGuard)
  handleNameuniqueness(@Body() body) {
    return this.authService.checkNameUniqueness(body.uniqueName);
  }

  @Post('createuniquename')
  @UseGuards(IsAuthGuard)
  handleUpdateUserUniqueName(@Req() request) {
    return this.authService.updateUniqueUserName(
      request.user.id,
      request.body.uniqueName
    );
  }

  @Patch('update/user')
  @UseGuards(IsAuthGuard)
  handleUpdateUser(@Req() request) {
    return this.authService.updateUser(
      request.user.id,
      request.body.updateUser
    );
  }

  @Get('public/user/:id')
  @UsePipes(new ParseIntPipe())
  handleGetPublicUser(@Param('id') id: number, @Req() request) {
    return this.authService.getPublicUser(id, request.user?.id);
  }

  @Post('follow/user')
  @UseGuards(IsAuthGuard)
  handleFollowUser(@Req() request) {
    return this.authService.followUser(request.user.id, request.body.userId);
  }

  @Delete('unfollow/user/:userIdToUnfollow')
  @UseGuards(IsAuthGuard)
  @UsePipes(new ParseIntPipe())
  handleUnFollowUser(
    @Param('userIdToUnfollow') userIdToUnfollow: number,
    @Req() request
  ) {
    return this.authService.unFollowUser(request.user.id, userIdToUnfollow);
  }
}
