import { Module } from '@nestjs/common';
import { ContractTestController } from './contract-test.controller';

@Module({
  controllers: [ContractTestController],
  providers: [],
  imports: [],
})
export class ContractTestModule {}
