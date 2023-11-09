import { Module } from '@nestjs/common';
import { UtileController } from './utile.controller';
import { UtileRepository } from './utile.repository';
import { UtileService } from './utile.service';
import { DataAccessModule } from '@tw/data-access';

@Module({
  imports: [DataAccessModule],
  providers: [UtileService, UtileRepository],
  controllers: [UtileController],
})
export class UtileModule {}
