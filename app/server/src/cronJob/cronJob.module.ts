import { HelperService } from 'src/helper/helper.service';
import { CronJobService } from './cronJob.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [CronJobService, HelperService],
})
export class CronJobModule {}
