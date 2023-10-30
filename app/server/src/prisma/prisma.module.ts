import { Global, Module } from '@nestjs/common';
import { ConfModule } from 'src/modules/conf/conf.module';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
  imports: [ConfModule],
})
export class PrismaModule {}
