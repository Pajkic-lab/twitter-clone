import { Global, Module } from '@nestjs/common';
import { ConfModule } from 'src/modules/conf/conf.module';
import { CloudinaryService } from './cloudinary.service';

@Global()
@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
  imports: [ConfModule],
})
export class CloudinaryModule {}
