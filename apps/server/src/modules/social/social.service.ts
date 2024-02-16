import { Mapper } from '@automapper/core';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  FollowUserRequestDto,
  FollowUserResponseDto,
  FollowerListResponseDto,
  FollowingListResponseDto,
  HttpResponse,
  SocialBase,
  UnFollowUserResponseDto,
  UserWithFollowingStatus,
} from '@tw/data';
import { InjectMapper } from '../../common/decorators/inject-mapper.decorator';
import { createResponse } from '../../common/http/create-response';
import { SocialRepository } from './social.repository';

@Injectable()
export class SocialService {
  constructor(
    private socialRepository: SocialRepository,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  async followUser(
    userId: number,
    followUser: FollowUserRequestDto
  ): Promise<HttpResponse<FollowUserResponseDto>> {
    const social = await this.socialRepository.followUser(
      userId,
      followUser.userId
    );
    if (!social)
      throw new HttpException(
        'Error while following user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    // create mapper and resolve this
    const userToFollow = this.mapper.map(
      social,
      SocialBase,
      FollowUserResponseDto
    );

    return createResponse({
      payload: userToFollow,
      message: 'follow user success',
    });
  }

  async unFollowUser(
    userId: number,
    userIdToUnFollow: number
  ): Promise<HttpResponse<UnFollowUserResponseDto>> {
    const { count } = await this.socialRepository.unFollowUser(
      userId,
      userIdToUnFollow
    );

    if (!count)
      throw new HttpException(
        'Error while unFollowing user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    return createResponse({
      payload: { userIdToUnFollow },
      message: 'un follow user success',
    });
  }

  async handleFollowers(
    userId: number,
    offset: number,
    limit: number
  ): Promise<HttpResponse<FollowerListResponseDto[]>> {
    const userList = await this.socialRepository.getFollowers(
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
      message: 'follower list success',
    });
  }

  async handleFollowing(
    userId: number,
    offset: number,
    limit: number
  ): Promise<HttpResponse<FollowingListResponseDto[]>> {
    const userList = await this.socialRepository.getFollowingUsers(
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
      message: 'following list success',
    });
  }
}