import { PrismaService } from 'src/prisma/prisma.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CronJobService {
  constructor(private prisma: PrismaService) {}

  @Cron(CronExpression.EVERY_6_HOURS)
  async dbPing() {
    console.log(await this.prisma.$queryRaw`SELECT 1`);
  }
}
