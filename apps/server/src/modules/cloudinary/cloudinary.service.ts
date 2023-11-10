import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { MediaDirectory } from '@tw/data';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class CloudinaryService {
  constructor(private confService: ConfigurationService) {
    cloudinary.config({
      cloud_name: this.confService.cloudinaryCloudName,
      api_key: this.confService.cloudinaryApiKey,
      api_secret: this.confService.cloudinarySecret,
    });
  }

  async uploadImage(
    image: string,
    userId: number,
    dir: MediaDirectory.Private
  ) {
    return await cloudinary.uploader.upload(image, {
      folder: `twitter-clone/user_${userId}/${dir}`,
    });
  }
}
