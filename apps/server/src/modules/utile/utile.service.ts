import { Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { UtileRepository } from './utile.repository';
import { InjectMapper } from '../../common/decorators/inject-mapper.decorator';
import { Mapper } from '@automapper/core';
import {
  FollowerListResponseDto,
  HttpResponse,
  MostPopularUsersResponseDto,
  SearchUsersResponseDto,
  UserWithFollowingStatus,
  UserBase,
  FollowingListResponseDto,
} from '@tw/data';
import { createResponse } from '../../common/http/create-response';

@Injectable()
export class UtileService {
  constructor(
    private utileRepository: UtileRepository,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  async handleGetUserList() {
    return await this.utileRepository.getUserList();
  }

  async getMostPopularUsers(
    userId: number
  ): Promise<HttpResponse<MostPopularUsersResponseDto[]>> {
    const mostPopularUsers = await this.utileRepository.getMostPopularUsers(
      userId
    );
    if (!mostPopularUsers) {
      throw new HttpException(
        'Error while finding most pupular profiles',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const users = this.mapper.mapArray(
      mostPopularUsers,
      UserBase,
      MostPopularUsersResponseDto
    );

    return createResponse({
      payload: users,
      message: 'users.most popular users',
    });
  }

  async getSearchData(
    searchData: string,
    userId?: number
  ): Promise<HttpResponse<SearchUsersResponseDto[]>> {
    const searchedUsers = await this.utileRepository.getSearchData(
      searchData,
      userId
    );

    if (!searchedUsers) {
      throw new HttpException(
        'Error while searching for user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const users = this.mapper.mapArray(
      searchedUsers,
      UserBase,
      SearchUsersResponseDto
    );

    return createResponse({
      payload: users,
      message: 'users. searched users',
    });
  }

  async handleFollowers(
    userId: number,
    offset: number,
    limit: number
  ): Promise<HttpResponse<FollowerListResponseDto[]>> {
    const userList = await this.utileRepository.getFollowers(
      userId,
      offset,
      limit
    );
    if (!userList) {
      throw new HttpException(
        'Error while finding followers',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const followerList = this.mapper.mapArray(
      userList,
      UserWithFollowingStatus,
      FollowerListResponseDto
    );

    return createResponse({
      payload: followerList,
      message: 'users. follower list',
    });
  }

  async handleFollowing(
    userId: number,
    offset: number,
    limit: number
  ): Promise<HttpResponse<FollowingListResponseDto[]>> {
    const userList = await this.utileRepository.getFollowingUsers(
      userId,
      offset,
      limit
    );

    if (!userList) {
      throw new HttpException(
        'Error while finding following users',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }

    const followingList = this.mapper.mapArray(
      userList,
      UserWithFollowingStatus,
      FollowingListResponseDto
    );

    return createResponse({
      payload: followingList,
      message: 'users. following list',
    });
  }
}
