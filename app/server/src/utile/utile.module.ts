import { Module } from '@nestjs/common';
import { UtileController } from './utile.controller';
import { UtileRepository } from './utile.repository';
import { UtileService } from './utile.service';

@Module({
  providers: [UtileService, UtileRepository],
  controllers: [UtileController],
})
export class UtileModule {}
