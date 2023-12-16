import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
})
export class AutoMapperModule {}
