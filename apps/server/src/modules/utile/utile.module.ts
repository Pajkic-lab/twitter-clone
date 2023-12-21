import { Module } from '@nestjs/common';
import { UtileController } from './utile.controller';
import { UtileProfile } from './utile.profile';
import { UtileRepository } from './utile.repository';
import { UtileService } from './utile.service';

@Module({
  imports: [],
  providers: [UtileService, UtileRepository, UtileProfile],
  controllers: [UtileController],
})
export class UtileModule {}
