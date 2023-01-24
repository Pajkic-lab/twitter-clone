import { Controller, Get, Req, Res, Session, UseGuards } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { HelperService } from 'src/helper/helper.service';
import { GoogleAuthGurard } from './utils/Guards';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private prisma: PrismaService, private config: ConfigService, private helperService: HelperService) {}

  @Get('google/login')
  @UseGuards(GoogleAuthGurard)
  handleLogin() {
    console.log('saljem request google serveru poslednja instanca na masini');
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGurard)
  handleRedirect(@Req() request: Request, @Res() response: Response) {
    // response.redirect(process.env.NODE_ENV == 'production' ? '/home' : `${this.config.get('BASE_URL_CLIENT')}/home`);
    response.redirect(this.helperService.baseUrlClient('/home'));
  }

  @Get('google/logout')
  async logout(@Session() session, @Req() req, @Res() response: Response) {
    delete req.user;
    session.destroy(err => {
      if (err) {
        console.log(err);
      }
    });
    await this.prisma.session.deleteMany({
      // delete or delete many whats the difference
      where: {
        sid: session.sid,
      },
    });
    // response.redirect(process.env.NODE_ENV == 'production' ? '/' : `${this.config.get('BASE_URL_CLIENT')}`);
    response.redirect(this.helperService.baseUrlClient('/'));
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
