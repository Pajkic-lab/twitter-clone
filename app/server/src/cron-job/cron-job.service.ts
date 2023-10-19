import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from 'src/http/http.service';
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CronJobService {
  constructor(private prisma: PrismaService, private httpService: HttpService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async dbPing() {
    console.log(await this.prisma.$queryRaw`SELECT 1`);
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async googlePing() {
    const { status } = await axios.get('https://twitter-clone-j82h.onrender.com/auth/google/login');
    console.log('google ping', status);
  }
}
