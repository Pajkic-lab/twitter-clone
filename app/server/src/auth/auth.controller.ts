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
  handleUpdateUserUniqueName(@Req() request) {
    return this.authService.updateUniqueUserName(request.user.id, request.body.uniqueName);
  }

  @Patch('update/user')
  @UseGuards(IsAuthGurard)
  handleUpdateUser(@Req() request) {
    return this.authService.updateUser(request.user.id, request.body.updateUser);
  }

  @Get('public/user/:id')
  @UsePipes(new ParseIntPipe())
  handleGetPublicUser(@Param('id') id: number, @Req() request) {
    return this.authService.getPublicUser(id, request.user?.id);
  }

  @Post('follow/user')
  @UseGuards(IsAuthGurard)
  handleFollowUser(@Req() request) {
    return this.authService.followUser(request.user.id, request.body.userId);
  }

  @Delete('unfollow/user/:userIdToUnfollow')
  @UseGuards(IsAuthGurard)
  @UsePipes(new ParseIntPipe())
  handleUnFollowUser(@Param('userIdToUnfollow') userIdToUnfollow: number, @Req() request) {
    return this.authService.unFollowUser(request.user.id, userIdToUnfollow);
  }
}
