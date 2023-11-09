import { Module } from '@nestjs/common';
import { CorsService } from './cors.service';
import { HttpService } from './http.service';

@Module({
  providers: [HttpService, CorsService],
  imports: [],
})
export class HttpModule {}
