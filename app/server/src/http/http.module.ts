import { Module } from '@nestjs/common';
import { ConfModule } from 'src/modules/conf/conf.module';
import { CorsService } from './cors.service';
import { HttpService } from './http.service';

@Module({
  providers: [HttpService, CorsService],
  imports: [ConfModule],
})
export class HttpModule {}
