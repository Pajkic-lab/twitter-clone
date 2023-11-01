import { Module } from '@nestjs/common';

import { CronJobService } from './cron-job.service';

@Module({
  imports: [],
  providers: [CronJobService],
})
export class CronJobModule {}
