import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';
// import { PrismaService } from 'src/modules/prisma/prisma.service';

@Injectable()
export class CronJobService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_10_MINUTES)
  async dbPing() {
    console.log(await this.prisma.$queryRaw`SELECT 1`);
  }

  @Cron(CronExpression.EVERY_12_HOURS)
  async googlePing() {
    const { status } = await axios.get(
      'https://twitter-clone-j82h.onrender.com/auth/google/login'
    );
    console.log('google ping', status);
  }
}
