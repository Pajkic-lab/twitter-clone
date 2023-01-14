import { Module } from '@nestjs/common';
import { CronJobService } from './cronJob.service';

@Module({
  providers: [CronJobService],
})
export class CronJobModule {}
