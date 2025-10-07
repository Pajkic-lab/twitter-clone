import { Mapper } from '@automapper/core';
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import {
  FollowUserRequestDto,
  FollowUserResponseDto,
  FollowerListResponseDto,
  FollowingListResponseDto,
  HttpResponse,
  SocialBase,
  SocialStatsResponseDto,
  UnFollowUserResponseDto,
  UserWithFollowingStatus,
} from '@tw/data';
import { InjectMapper } from '../../common/decorators/inject-mapper.decorator';
import { createResponse } from '../../common/http/create-response';
import { AuthRepository } from '../auth/auth.repository';
import { UserRepository } from '../user/user.repository';
import { SocialRepository } from './social.repository';

@Injectable()
export class SocialService {
  constructor(
    private authRepository: AuthRepository,
    private socialRepository: SocialRepository,
    private userRepository: UserRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async getStats(userId: string): Promise<HttpResponse<SocialStatsResponseDto>> {
    const socialStats = await this.authRepository.getSocialStats(userId);

    if (!socialStats) throw new NotFoundException('Social stats do not exist');

    return createResponse({
      payload: socialStats,
      message: 'social stats returned successfully',
    });
  }

  async getPublicUserSocialStats(
    publicUserId: string,
  ): Promise<HttpResponse<SocialStatsResponseDto>> {
    const socialStats = await this.authRepository.getSocialStats(publicUserId);

    if (!socialStats) throw new NotFoundException('Social stats do not exist');

    return createResponse({
      payload: socialStats,
      message: 'social stats returned successfully',
    });
  }

  async getPublicUserFollowingStatus(userId: string, publicUserId: string) {
    const followingStatus = await this.userRepository.getFollowingStatus(publicUserId, userId);

    return createResponse({
      payload: { followingStatus },
      message: 'public user following status success',
    });
  }

  async followUser(
    userId: string,
    followUser: FollowUserRequestDto,
  ): Promise<HttpResponse<FollowUserResponseDto>> {
    const followingStatus = await this.userRepository.getFollowingStatus(followUser.userId, userId);
    if (followingStatus)
      throw new HttpException(
        'User to follow is already followed',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const social = await this.socialRepository.followUser(userId, followUser.userId);
    if (!social)
      throw new HttpException('Error while following user', HttpStatus.INTERNAL_SERVER_ERROR);

    const userToFollow = this.mapper.map(social, SocialBase, FollowUserResponseDto);

    return createResponse({
      payload: userToFollow,
      message: 'follow user success',
    });
  }

  async unFollowUser(
    userId: string,
    userIdToUnFollow: string,
  ): Promise<HttpResponse<UnFollowUserResponseDto>> {
    const { count } = await this.socialRepository.unFollowUser(userId, userIdToUnFollow);

    if (!count)
      throw new HttpException('Error while unFollowing user', HttpStatus.INTERNAL_SERVER_ERROR);

    return createResponse({
      payload: { userIdToUnFollow },
      message: 'un follow user success',
    });
  }

  async handleFollowers(
    userId: string,
    offset: number,
    limit: number,
  ): Promise<HttpResponse<FollowerListResponseDto[]>> {
    const userList = await this.socialRepository.getFollowers(userId, offset, limit);
    if (!userList) {
      throw new HttpException('Error while finding followers', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const followerList = this.mapper.mapArray(
      userList,
      UserWithFollowingStatus,
      FollowerListResponseDto,
    );

    return createResponse({
      payload: followerList,
      message: 'follower list success',
    });
  }

  async handleFollowing(
    userId: string,
    offset: number,
    limit: number,
  ): Promise<HttpResponse<FollowingListResponseDto[]>> {
    const userList = await this.socialRepository.getFollowingUsers(userId, offset, limit);

    if (!userList) {
      throw new HttpException(
        'Error while finding following users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const followingList = this.mapper.mapArray(
      userList,
      UserWithFollowingStatus,
      FollowingListResponseDto,
    );

    return createResponse({
      payload: followingList,
      message: 'following list success',
    });
  }

  async handlePublicProfileFollowers(
    meId: string,
    publicUserId: string,
    offset: number,
    limit: number,
  ): Promise<HttpResponse<FollowerListResponseDto[]>> {
    const userList = await this.socialRepository.getPublicProfileFollowers(
      meId,
      publicUserId,
      offset,
      limit,
    );
    if (!userList) {
      throw new HttpException('Error while finding followers', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const followerList = this.mapper.mapArray(
      userList,
      UserWithFollowingStatus,
      FollowerListResponseDto,
    );

    return createResponse({
      payload: followerList,
      message: 'follower list success',
    });
  }

  async handlePublicProfileFollowing(
    meId: string,
    publicUserId: string,
    offset: number,
    limit: number,
  ): Promise<HttpResponse<FollowingListResponseDto[]>> {
    const userList = await this.socialRepository.getPublicProfileFollowingUsers(
      meId,
      publicUserId,
      offset,
      limit,
    );

    if (!userList) {
      throw new HttpException(
        'Error while finding following users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const followingList = this.mapper.mapArray(
      userList,
      UserWithFollowingStatus,
      FollowingListResponseDto,
    );

    return createResponse({
      payload: followingList,
      message: 'following list success',
    });
  }
  //
}
