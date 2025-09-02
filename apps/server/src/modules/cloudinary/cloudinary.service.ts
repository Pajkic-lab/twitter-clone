import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MediaDirectory } from '@tw/data';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryBase } from './cloudinary-base.service';

/**
 * This whole service should be redesign, DB schema needs to change to properly handle img resources.
 * Img Id should be stored in db and then used to find image and remove it, don't remove whole dir.
 */
@Injectable()
export class CloudinaryService extends CloudinaryBase {
  async uploadImage(image: string, userId: number, dir: MediaDirectory) {
    try {
      if (dir === MediaDirectory.avatar || dir === MediaDirectory.cover) {
        await this.deleteDir(userId, dir);
      }

      // webpurify does not work, maybe i reached limit...
      return await cloudinary.uploader.upload(image, {
        folder: `twitter-clone/user:${userId}/${dir}`,
        moderation: 'webpurify',
      });
    } catch (error) {
      throw new HttpException(
        `Error while uploading img, user: ${userId}, dir: ${dir}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteDir(userId: number, dir: MediaDirectory) {
    try {
      return await cloudinary.api.delete_resources_by_prefix(`twitter-clone/user:${userId}/${dir}`);
    } catch (error) {
      throw new HttpException(
        `Error while deleting images, user: ${userId}, dir: ${dir}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
