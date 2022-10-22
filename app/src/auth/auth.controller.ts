import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { GoogleAuthGurard } from './utils/Guards';

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGurard)
  handleLogin() {
    console.log('controler google login');
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGurard)
  handleRedirect(@Req() request: Request, @Res() response: Response) {
    response.redirect('http://localhost:3000'); // redirect to base URL, handel base url
  }

  @Get('google/logout')
  handleLogout(@Req() request: Request) {
    console.log(request.user);
    request.session.destroy(nesto => console.log(nesto));
    // delete cookie in DB
    console.log(request.user);
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
