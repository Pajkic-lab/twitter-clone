import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from '@nestjs/common';
import { MediaDirectory } from 'src/dtos';

@Injectable()
export class CloudinaryService {
  constructor(configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: configService.get('CLOUDINARY_API_KEY'),
      api_secret: configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(image: string, userId: number, dir: MediaDirectory.Private) {
    return await cloudinary.uploader.upload(image, { folder: `twitter-clone/user_${userId}/${dir}` });
  }
}
