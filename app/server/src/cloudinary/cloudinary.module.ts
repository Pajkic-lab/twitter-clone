import { CloudinaryService } from './cloudinary.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
