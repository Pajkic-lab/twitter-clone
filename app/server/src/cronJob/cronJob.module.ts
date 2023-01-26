import { CronJobService } from './cronJob.service';
import { HttpService } from 'src/http/http.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [CronJobService, HttpService],
})
export class CronJobModule {}
