import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/modules/cloudinary/cloudinary.service';
import { MediaDirectory } from '../../dtos';

@Injectable()
export class AuthMediaRepository {
  constructor(private cloudinary: CloudinaryService) {}
  async uploadImage(file: string, userId: number, dir: MediaDirectory.Private) {
    try {
      return await this.cloudinary.uploadImage(file, userId, dir);
    } catch (error) {
      throw new HttpException('Error while updating user media', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
