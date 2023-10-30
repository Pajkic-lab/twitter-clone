import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConfService } from './conf.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: ConfService.validate,
    }),
  ],
  providers: [ConfService],
  exports: [ConfService],
})
export class ConfModule {}
