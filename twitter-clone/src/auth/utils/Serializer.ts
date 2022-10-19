import { PassportSerializer } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

@Injectable()
export class SessionSerializer extends PassportSerializer {
  authService: AuthService
  constructor(authService: AuthService) {
    super()
    this.authService = authService
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  serializeUser(user: User, done: Function) {
    console.log('serializer user')
    done(null, user)
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  async deserializeUser(payload: any, done: Function) {
    const user = await this.authService.findUser(payload.id)
    console.log('Deserialize user!')
    console.log(user)
    return user ? done(null, user) : done(null, null)
  }
}
