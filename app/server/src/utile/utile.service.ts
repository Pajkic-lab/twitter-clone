import { HttpException } from '@nestjs/common/exceptions';
import { UtileRepository } from './utile.repository';
import { HttpStatus } from '@nestjs/common/enums';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtileService {
  constructor(private utileRepository: UtileRepository) {}

  async getMostPupularUsers(userId: number) {
    const mostPupularUsers = await this.utileRepository.getMostPopularUsers(userId);
    if (!mostPupularUsers) {
      throw new HttpException('Error while finding most pupular profiles', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { mostPupularUsers };
  }
}
