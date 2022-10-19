import { UserController } from './user.controller'
import { UserService } from './user.service'
import { Module } from '@nestjs/common'

@Module({
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
