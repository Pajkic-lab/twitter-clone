import { Module } from '@nestjs/common';
import { HttpService } from './http.service';
import { CorsService } from './cors.service';

@Module({
  providers: [HttpService, CorsService],
})
export class HttpModule {}
