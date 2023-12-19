import { Module } from '@nestjs/common';
import { SocialService } from './social.service';
import { SocialRepository } from './social.repository';
import { SocialProfile } from './social.profile';
import { SocialController } from './social.controller';

@Module({
  imports: [],
  providers: [SocialService, SocialRepository, SocialProfile],
  controllers: [SocialController],
})
export class SocialModule {}
