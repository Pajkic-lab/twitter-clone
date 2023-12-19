import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserProfile } from './user.profile';
import { AuthMediaRepository } from '../auth/auth.media-repository';

@Module({
  imports: [],
  providers: [UserService, UserRepository, AuthMediaRepository, UserProfile],
  controllers: [UserController],
})
export class UserModule {}
