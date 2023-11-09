import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [],
  exports: [],
})
export class DataAccessModule {}
