import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HealthCheck, HealthCheckService, PrismaHealthIndicator } from '@nestjs/terminus';
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('Environment')
@Controller('/health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private db: PrismaHealthIndicator,
    private prismaService: PrismaService,
  ) {}

  @ApiOperation({
    summary: 'Get application health status',
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved application health status',
  })
  @ApiResponse({ status: 422, description: 'Something went wrong' })
  @Get('/check')
  @HealthCheck()
  check() {
    return this.health.check([() => this.db.pingCheck('database', this.prismaService)]);
  }
}
