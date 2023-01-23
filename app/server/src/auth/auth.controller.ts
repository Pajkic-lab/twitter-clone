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
    response.redirect('http://localhost:3000/home'); // redirect to base URL, handel base url
  }

  @Get('google/logout')
  @Redirect('http://localhost:3000')
  async logout(@Session() session, @Req() req) {
    console.log(session);
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
