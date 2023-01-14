import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CronJobService {
  constructor(private prisma: PrismaService) {}

  @Cron('* * 6 * * *')
  async dbPing() {
    console.log(await this.prisma.$queryRaw`SELECT 1`);
  }
}
