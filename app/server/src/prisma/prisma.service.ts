import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfService } from 'src/modules/conf/conf.service';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(confService: ConfService) {
    super({
      datasources: {
        db: {
          url: confService.databaseUrl,
        },
      },
    });
  }
}
