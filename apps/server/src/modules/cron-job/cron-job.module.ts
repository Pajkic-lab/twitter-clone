import { Module } from '@nestjs/common';
import { DataAccessModule } from '@tw/data-access';
import { CronJobService } from './cron-job.service';

@Module({
  imports: [DataAccessModule],
  providers: [CronJobService],
})
export class CronJobModule {}
