import { Module } from '@nestjs/common';
import { IsAuthGuard } from '../../common/guards/is-auth.guard';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UserController } from './user.controller';
import { UserProfile } from './user.profile';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [],
  providers: [UserService, UserRepository, IsAuthGuard, UserProfile, CloudinaryService],
  controllers: [UserController],
})
export class UserModule {}
