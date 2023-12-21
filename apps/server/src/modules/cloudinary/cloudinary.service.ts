import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MediaDirectory } from '@tw/data';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryBase } from './cloudinary-base.service';

@Injectable()
export class CloudinaryService extends CloudinaryBase {
  // write method to check does image already exist

  async uploadImage(image: string, userId: number, dir: MediaDirectory) {
    try {
      return await cloudinary.uploader.upload(image, {
        folder: `twitter-clone/user_${userId}/${dir}`,
      });
    } catch (error) {
      throw new HttpException(
        `Error while uploading img, user: ${userId}, dir: ${dir}`,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
