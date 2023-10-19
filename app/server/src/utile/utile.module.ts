import { Module } from '@nestjs/common';
import { UtileService } from './utile.service';
import { UtileController } from './utile.controller';
import { UtileRepository } from './utile.repository';

@Module({
  providers: [UtileService, UtileRepository],
  controllers: [UtileController],
})
export class UtileModule {}
