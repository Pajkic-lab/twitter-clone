import { Controller, Get, Redirect, Req, Res, Session, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { GoogleAuthGurard } from './utils/Guards';

@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGurard)
  handleLogin() {
    console.log('saljem request google serveru poslednja instanca na masini');
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGurard)
  handleRedirect(@Req() request: Request, @Res() response: Response) {
    response.redirect(process.env.NODE_ENV == 'production' ? '/home' : 'http://localhost:3000/home');
  }

  @Get('google/logout')
  @Redirect(process.env.NODE_ENV == 'production' ? '/' : 'http://localhost:3000')
  async logout(@Session() session, @Req() req) {
    delete req.user;
    session.destroy(err => {
      if (err) {
        console.log(err);
      }
    });
    await this.prisma.session.deleteMany({
      where: {
        sid: session.sid,
      },
    });
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
