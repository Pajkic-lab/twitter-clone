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
  NameUniquenessRequestDto,
  NameUniquenessResponseDto,
  HttpResponse,
  UserBase,
  SocialStatsResponseDto,
} from '@tw/data';
import { plainToClass } from 'class-transformer';
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

    // return { user: authUser, socialStats };
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
    data: NameUniquenessRequestDto
  ): Promise<NameUniquenessResponseDto> {
    const res = await this.authRepository.isUserNameUnique(data.uniqueName);
    if (res !== null) {
      return { isNameUnique: false };
    }
    return { isNameUnique: true };
  }

  async updateUniqueUserName(userId: number, data: NameUniquenessRequestDto) {
    let user;
    const res = await this.authRepository.isUserNameUnique(data.uniqueName);
    if (res !== null) {
      throw new NotFoundException('Uniqu user name already exist!');
    } else {
      user = await this.authRepository.updateUserNameUnique(
        userId,
        data.uniqueName
      );
      if (!user)
        throw new HttpException(
          'Error while updating unique user name',
          HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
    return { uniqueName: user.uniqueName };
  }

  // async updateUser(userId: number, updateUser: UpdateUserDto) {
  //   let avatarUrl;
  //   let coverUrl;

  //   updateUser.id = userId;
  //   if (updateUser.avatar) {
  //     const res = await this.mediaRepository.uploadImage(
  //       updateUser.avatar,
  //       userId,
  //       MediaDirectory.Private
  //     );
  //     avatarUrl = res.url;
  //     updateUser.avatar = avatarUrl;
  //   }
  //   if (updateUser.cover) {
  //     const res = await this.mediaRepository.uploadImage(
  //       updateUser.cover,
  //       userId,
  //       MediaDirectory.Private
  //     );
  //     coverUrl = res.url;
  //     updateUser.cover = coverUrl;
  //   }

  //   const user = await this.authRepository.updateUser(updateUser);
  //   delete user.password;
  //   return { user };
  // }

  // async getPublicUser(publicUserId: number, userId?: number) {
  //   let followingStatus;
  //   if (publicUserId === userId) {
  //     throw new NotFoundException(
  //       'Can not acces to specific user as authenticated same user'
  //     );
  //   }
  //   const user = await this.authRepository.findUserById(publicUserId);
  //   if (!user) throw new NotFoundException('User does not exist');
  //   delete user.password;
  //   delete user.email;
  //   const socialStats = await this.authRepository.getSocialStats(publicUserId);

  //   if (!socialStats) throw new NotFoundException('Social status do not exist');
  //   if (userId) {
  //     followingStatus = await this.authRepository.getFollowingStatus(
  //       publicUserId,
  //       userId
  //     );
  //   }
  //   return { user, socialStats, followingStatus };
  // }

  async followUser(userId: number, userIdToFollow: number) {
    const res = await this.authRepository.followUser(userId, userIdToFollow);
    if (!res)
      throw new HttpException(
        'Error while following user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    return { userIdToFollow };
  }

  async unFollowUser(userId: number, userIdToUnFollow: number) {
    const res = await this.authRepository.unFollowUser(
      userId,
      userIdToUnFollow
    );
    if (!res)
      throw new HttpException(
        'Error while unFollowing user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    return { userIdToUnFollow };
  }
}
