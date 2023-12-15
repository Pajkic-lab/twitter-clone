import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Req } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import bcrypt from 'bcryptjs';
import { AuthMediaRepository } from './auth.media-repository';
import { AuthRepository } from './auth.repository';
import { Request } from 'express';
import {
  MediaDirectory,
  SignUpEmailRequestDto,
  CreatableUser,
  SignUpEmailResponseDto,
  SignInEmailRequestDto,
  SignInEmailResponseDto,
  AuthenticationResponseDto,
  CreatableGoogleUser,
  NameUniqueRequestDto,
  NameUniqueResponseDto,
  HttpResponse,
  UserBase,
  SocialStatsResponseDto,
  NameUniqueUpdateResponseDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
  PublicUserResponseDto,
  FollowUserRequestDto,
  SocialBase,
  FollowUserResponseDto,
  UnFollowUserResponseDto,
} from '@tw/data';
import { createResponse } from '../../common/http/create-response';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '../../common/decorators/inject-mapper.decorator';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private mediaRepository: AuthMediaRepository,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  // invoked from strategy
  async signUpUser(createUser: SignUpEmailRequestDto): Promise<User> {
    const salt = 10;

    const user = await this.authRepository.findUserByEmail(createUser.email);

    if (user) throw new NotFoundException('User already exist');

    const hashedPassword = await bcrypt.hash(createUser.password, salt);

    const creatableUser: CreatableUser = {
      name: createUser.username,
      email: createUser.email,
      password: hashedPassword,
    };

    return await this.authRepository.createUser(creatableUser);
  }

  // invoked from strategy
  async signInUser(signInUser: SignInEmailRequestDto): Promise<User> {
    const user = await this.authRepository.findUserByEmail(signInUser.email);

    if (!user) throw new NotFoundException('User does not exist');

    if (await bcrypt.compare(signInUser.password, user?.password!)) return user;

    throw new NotFoundException('Invalid credentials');
  }

  async signInGetUser(
    userId: number
  ): Promise<HttpResponse<SignInEmailResponseDto>> {
    const user = await this.authRepository.findUserById(userId);

    if (!user) throw new NotFoundException('User does not exist');

    const payload = this.mapper.map(user, UserBase, SignInEmailResponseDto);

    return createResponse({ payload, message: 'users.signInSuccess' });
  }

  async sigUpGetUser(
    userId: number
  ): Promise<HttpResponse<SignUpEmailResponseDto>> {
    const user = await this.authRepository.findUserById(userId);

    if (!user) throw new NotFoundException('User does not exist');

    const payload = this.mapper.map(user, UserBase, SignUpEmailResponseDto);

    return createResponse({ payload, message: 'users.signUpSuccess' });
  }

  async authUser(userId: number): Promise<
    HttpResponse<{
      user: AuthenticationResponseDto;
      socialStats: SocialStatsResponseDto;
    }>
  > {
    const user = await this.authRepository.findUserById(userId);

    if (!user) throw new NotFoundException('User does not exist');

    const authUser = this.mapper.map(user, UserBase, AuthenticationResponseDto);

    // this should be separate request
    const socialStats = await this.authRepository.getSocialStats(userId);

    if (!socialStats) throw new NotFoundException('Social stats do not exist');

    return createResponse({
      payload: { user: authUser, socialStats },
      message: 'users.authSuccess',
    });
  }

  async validateGoogleUser(createUser: CreatableGoogleUser): Promise<User> {
    const user = await this.authRepository.findUserByEmail(createUser.email);

    if (user) return user;

    return await this.authRepository.createGoogleUser(createUser);
  }

  async findUser(userId: number) {
    const user = await this.authRepository.findUserById(userId);
    return user;
  }

  async logOut(@Req() request: Request) {
    request.logOut((err) => {
      if (err) throw new BadRequestException(err.message);
    });
    return;
  }

  async checkNameUniqueness(
    data: NameUniqueRequestDto
  ): Promise<HttpResponse<NameUniqueResponseDto>> {
    const res = await this.authRepository.isUserNameUnique(data.uniqueName);

    let isNameUnique;

    if (res !== null) {
      isNameUnique = false;
    } else {
      isNameUnique = true;
    }

    return createResponse({
      payload: { isNameUnique },
      message: 'users.name is unique',
    });
  }

  async updateUniqueUserName(
    userId: number,
    data: NameUniqueRequestDto
  ): Promise<HttpResponse<NameUniqueUpdateResponseDto>> {
    let user;
    user = await this.authRepository.isUserNameUnique(data.uniqueName);
    if (user !== null) {
      throw new NotFoundException('Uniqu user name already exist!');
    } else {
      user = await this.authRepository.updateUserNameUnique(
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
      message: 'users.name is unique',
    });
  }

  async updateUser(
    userId: number,
    updateUser: UpdateUserRequestDto
  ): Promise<HttpResponse<UpdateUserResponseDto>> {
    let avatarUrl: string = '';
    let coverUrl: string = '';

    if (updateUser.avatar) {
      const { url } = await this.mediaRepository.uploadImage(
        updateUser.avatar,
        userId,
        MediaDirectory.Private
      );
      avatarUrl = url;
    }
    if (updateUser.cover) {
      const { url } = await this.mediaRepository.uploadImage(
        updateUser.cover,
        userId,
        MediaDirectory.Private
      );
      coverUrl = url;
    }

    updateUser.avatar = avatarUrl;
    updateUser.cover = coverUrl;

    const user = await this.authRepository.updateUser(userId, updateUser);

    const updatedUser = this.mapper.map(user, UserBase, UpdateUserResponseDto);

    return createResponse({
      payload: updatedUser,
      message: 'users.is updated',
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

    const user = await this.authRepository.findUserById(publicUserId);

    if (!user) throw new NotFoundException('User does not exist');

    const publicUser = this.mapper.map(user, UserBase, PublicUserResponseDto);

    const socialStats = await this.authRepository.getSocialStats(publicUserId);

    if (!socialStats) throw new NotFoundException('Social status do not exist');
    if (userId) {
      followingStatus = await this.authRepository.getFollowingStatus(
        publicUserId,
        userId
      );
    }

    return createResponse({
      payload: { user: publicUser, socialStats, followingStatus },
      message: 'users.authSuccess',
    });
  }

  async followUser(
    userId: number,
    followUser: FollowUserRequestDto
  ): Promise<HttpResponse<FollowUserResponseDto>> {
    const social = await this.authRepository.followUser(
      userId,
      followUser.userId
    );
    if (!social)
      throw new HttpException(
        'Error while following user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    const userToFollow = this.mapper.map(
      social,
      SocialBase,
      FollowUserResponseDto
    );

    return createResponse({
      payload: userToFollow,
      message: 'users. to follow',
    });
  }

  async unFollowUser(
    userId: number,
    userIdToUnFollow: number
  ): Promise<HttpResponse<UnFollowUserResponseDto>> {
    const { count } = await this.authRepository.unFollowUser(
      userId,
      userIdToUnFollow
    );
    console.log(11222, count);
    if (!count)
      throw new HttpException(
        'Error while unFollowing user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    return createResponse({
      payload: { userIdToUnFollow },
      message: 'users. un-follow',
    });
  }
}
