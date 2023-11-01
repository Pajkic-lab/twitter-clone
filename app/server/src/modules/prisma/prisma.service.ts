import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(confService: ConfigurationService) {
    super({
      datasources: {
        db: {
          url: confService.databaseUrl,
        },
      },
    });
  }
}
