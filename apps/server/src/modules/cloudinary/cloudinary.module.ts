import { Global, Module } from '@nestjs/common';
import { CloudinaryBase } from './cloudinary-base.service';
import { CloudinaryService } from './cloudinary.service';

@Global()
@Module({
  providers: [CloudinaryService, CloudinaryBase],
  exports: [CloudinaryService],
  imports: [],
})
export class CloudinaryModule {}
