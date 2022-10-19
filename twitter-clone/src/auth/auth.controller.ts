import { Controller, Get, Req, UseGuards } from '@nestjs/common'
import { GoogleAuthGurard } from './utils/guards'

@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGurard)
  handleLogin() {
    return { msg: 'google auth' }
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGurard)
  handleRedirect() {
    return { msg: 'OK' }
  }

  @Get('google/logout')
  // @UseGuards(GoogleAuthGurard)
  handleLogout(/*@Req */) {
    // req.logout()   // logout comes from req object... probably set there by google
    // res.redirect('/')
    return { msg: 'Loged out!!!' }
  }
}
