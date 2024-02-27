import { Mapper } from '@automapper/core';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  HttpResponse,
  MediaDirectory,
  MostPopularUsersResponseDto,
  NameUniqueRequestDto,
  NameUniqueResponseDto,
  NameUniqueUpdateResponseDto,
  PublicUserResponseDto,
  SearchUsersResponseDto,
  SocialStatsResponseDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
  UserBase,
  UserResponseDto,
} from '@tw/data';
import { InjectMapper } from '../../common/decorators/inject-mapper.decorator';
import { createResponse } from '../../common/http/create-response';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private cloudinaryService: CloudinaryService,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  async getUser(userId: number): Promise<HttpResponse<UserResponseDto>> {
    let user;

    user = await this.userRepository.findUserById(userId);

    if (!user) throw new NotFoundException('User does not exist');

    user = this.mapper.map(user, UserBase, UserResponseDto);

    return createResponse({
      payload: user,
      message: 'user returned successfully',
    });
  }

  async checkNameUniqueness(
    data: NameUniqueRequestDto
  ): Promise<HttpResponse<NameUniqueResponseDto>> {
    // should return what data is validating
    const res = await this.userRepository.isUserNameUnique(data.uniqueName);

    let isNameUnique;

    if (res !== null) {
      isNameUnique = false;
    } else {
      isNameUnique = true;
    }

    return createResponse({
      payload: { isNameUnique },
      message: 'name is unique',
    });
  }

  async updateUniqueUserName(
    userId: number,
    data: NameUniqueRequestDto
  ): Promise<HttpResponse<NameUniqueUpdateResponseDto>> {
    let user;
    user = await this.userRepository.isUserNameUnique(data.uniqueName);
    if (user !== null) {
      throw new NotFoundException('Unique user name already exist!');
    } else {
      user = await this.userRepository.updateUserNameUnique(
        userId,
        data.uniqueName
      );
    }

    const uniqueName = this.mapper.map(
      user,
      UserBase,
      NameUniqueUpdateResponseDto
    );

    return createResponse({
      payload: uniqueName,
      message: 'unique name updated',
    });
  }

  async updateUser(
    userId: number,
    updateUser: UpdateUserRequestDto
  ): Promise<HttpResponse<UpdateUserResponseDto>> {
    let avatarUrl: string = '';
    let coverUrl: string = '';

    if (updateUser.avatar) {
      const { url } = await this.cloudinaryService.uploadImage(
        updateUser.avatar,
        userId,
        MediaDirectory.Private
      );
      avatarUrl = url;
    }
    if (updateUser.cover) {
      const { url } = await this.cloudinaryService.uploadImage(
        updateUser.cover,
        userId,
        MediaDirectory.Private
      );
      coverUrl = url;
    }

    updateUser.avatar = avatarUrl;
    updateUser.cover = coverUrl;

    const user = await this.userRepository.updateUser(userId, updateUser);

    const updatedUser = this.mapper.map(user, UserBase, UpdateUserResponseDto);

    return createResponse({
      payload: updatedUser,
      message: 'update user success',
    });
  }

  async getPublicUser(
    publicUserId: number,
    userId?: number
  ): Promise<
    HttpResponse<{
      user: PublicUserResponseDto;
      socialStats: SocialStatsResponseDto;
      followingStatus: boolean;
    }>
  > {
    let followingStatus;

    if (publicUserId === userId) {
      throw new NotFoundException(
        'Can not access to specific user as authenticated same user'
      );
    }

    const user = await this.userRepository.findUserById(publicUserId);

    if (!user) throw new NotFoundException('User does not exist');

    const publicUser = this.mapper.map(user, UserBase, PublicUserResponseDto);

    const socialStats = await this.userRepository.getSocialStats(publicUserId);

    if (!socialStats) throw new NotFoundException('Social status do not exist');
    if (userId) {
      followingStatus = await this.userRepository.getFollowingStatus(
        publicUserId,
        userId
      );
    }

    return createResponse({
      payload: { user: publicUser, socialStats, followingStatus },
      message: 'public user success',
    });
  }

  async getMostPopularUsers(
    userId: number
  ): Promise<HttpResponse<MostPopularUsersResponseDto[]>> {
    const mostPopularUsers = await this.userRepository.getMostPopularUsers(
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
      message: 'most popular users',
    });
  }

  async getSearchData(
    searchData: string,
    userId?: number
  ): Promise<HttpResponse<SearchUsersResponseDto[]>> {
    const searchedUsers = await this.userRepository.getSearchData(
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
      message: 'searched users retrieved',
    });
  }
}
