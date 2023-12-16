import { Module } from '@nestjs/common';
import { UtileController } from './utile.controller';
import { UtileRepository } from './utile.repository';
import { UtileService } from './utile.service';
import { UtileProfile } from './utile.profile';

@Module({
  imports: [],
  providers: [UtileService, UtileRepository, UtileProfile],
  controllers: [UtileController],
})
export class UtileModule {}
