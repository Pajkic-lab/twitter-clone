import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigurationService } from '../configuration/configuration.service';

@Injectable()
export class CloudinaryBase {
  constructor(private confService: ConfigurationService) {
    cloudinary.config({
      cloud_name: this.confService.cloudinaryCloudName,
      api_key: this.confService.cloudinaryApiKey,
      api_secret: this.confService.cloudinarySecret,
    });
  }
}
