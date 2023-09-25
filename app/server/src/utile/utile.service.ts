import { HttpException } from '@nestjs/common/exceptions';
import { UtileRepository } from './utile.repository';
import { HttpStatus } from '@nestjs/common/enums';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UtileService {
  constructor(private utileRepository: UtileRepository) {}

  async handleGetUserList() {
    return await this.utileRepository.getUserList();
  }

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

  async handleFollowers(userId: number, offset: number, limit: number) {
    const followersList = await this.utileRepository.getFollowers(userId, offset, limit);
    if (!followersList) {
      throw new HttpException('Error while finding followers', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { followersList };
  }

  async handleFollowing(userId: number, offset: number, limit: number) {
    const followingList = await this.utileRepository.getFollowingUsers(userId, offset, limit);
    if (!followingList) {
      throw new HttpException('Error while finding following users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { followingList };
  }
}
