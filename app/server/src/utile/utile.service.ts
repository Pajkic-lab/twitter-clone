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

  async getSearchData(searchData: string, userId?: number) {
    const searchRespons = await this.utileRepository.getSearchData(searchData, userId);
    if (!searchRespons) {
      throw new HttpException('Error while searching for user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { searchRespons };
  }
}
