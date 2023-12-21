import { Module } from '@nestjs/common';
import { IsAuthGuard } from '../../common/guards/is-auth.guard';
import { SocialController } from './social.controller';
import { SocialProfile } from './social.profile';
import { SocialRepository } from './social.repository';
import { SocialService } from './social.service';

@Module({
  imports: [],
  providers: [SocialService, SocialRepository, SocialProfile, IsAuthGuard],
  controllers: [SocialController],
})
export class SocialModule {}
