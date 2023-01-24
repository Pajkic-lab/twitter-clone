import { PrismaService } from 'src/prisma/prisma.service';
import { HelperService } from 'src/helper/helper.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CronJobService {
  constructor(private prisma: PrismaService, private helperService: HelperService) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async dbPing() {
    console.log(await this.prisma.$queryRaw`SELECT 1`);
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async googlePing() {
    const { status } = await axios.get(this.helperService.baseUrlServer('/auth/google/login'));
    status == 200 ? console.log('google auth service ping success!') : console.log('google auth service ping fail!');
  }
}
