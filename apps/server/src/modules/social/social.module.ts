import { Module } from '@nestjs/common';
import { IsAuthGuard } from '../../common/guards/is-auth.guard';
import { AuthRepository } from '../auth/auth.repository';
import { SocialController } from './social.controller';
import { SocialProfile } from './social.profile';
import { SocialRepository } from './social.repository';
import { SocialService } from './social.service';

@Module({
  imports: [],
  providers: [
    AuthRepository,
    SocialService,
    SocialRepository,
    SocialProfile,
    IsAuthGuard,
  ],
  controllers: [SocialController],
})
export class SocialModule {}
