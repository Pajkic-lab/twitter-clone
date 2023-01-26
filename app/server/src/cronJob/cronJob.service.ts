import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from 'src/http/http.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CronJobService {
  constructor(private prisma: PrismaService, private httpService: HttpService) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async dbPing() {
    console.log(await this.prisma.$queryRaw`SELECT 1`);
  }

  @Cron(CronExpression.EVERY_30_MINUTES)
  async googlePing() {
    console.log('1111111111111', this.httpService.baseUrlServer('/auth/google/login'));
    console.log('2222222222222', axios.get(this.httpService.baseUrlServer('/auth/google/login')));
    const { status } = await axios.get(this.httpService.baseUrlServer('/auth/google/login'));
    status == 200 ? console.log('google auth service ping success!') : console.log('google auth service ping fail!');
  }
}
