import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { MediaDirectory } from '@tw/data';

@Injectable()
// this should probably be service rather than repository
export class AuthMediaRepository {
  constructor(private cloudinary: CloudinaryService) {}
  // should check does img already exist if exist delete old and post new
  async uploadImage(file: string, userId: number, dir: MediaDirectory.Private) {
    try {
      return await this.cloudinary.uploadImage(file, userId, dir);
    } catch (error) {
      throw new HttpException(
        'Error while updating user media',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
