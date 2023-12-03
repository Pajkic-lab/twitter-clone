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
  ConfirmUserDto,
  CreatGoogleUserDto,
  CreateUserDto,
  UpdateUserDto,
  MediaDirectory,
  SignUpEmailRequestDto,
  CreatableUser,
  SignUpEmailResponseDto,
  SignInEmailRequestDto,
  SignInEmailResponseDto,
  AuthenticationResponseDto,
  CreatableGoogleUser,
  NameUniquenessRequestDto,
} from '@tw/data';
import { plainToClass } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private mediaRepository: AuthMediaRepository
  ) {}

  async registerUser(
    createUser: SignUpEmailRequestDto
  ): Promise<SignUpEmailResponseDto> {
    const salt = 10;

    const user = await this.authRepository.findUserByEmail(createUser.email);
    if (user) throw new NotFoundException('User already exist');

    const hashedPassword = await bcrypt.hash(createUser.password, salt);

    const creatableUser: CreatableUser = {
      name: createUser.username,
      email: createUser.email,
      password: hashedPassword,
    };

    const createdUser = await this.authRepository.createUser(creatableUser);

    const responseDto = plainToClass(SignUpEmailResponseDto, createdUser);

    return responseDto;
  }

  async loginUser(signInUser: SignInEmailRequestDto) {
    const user = await this.authRepository.findUserByEmail(signInUser.email);

    if (!user) throw new NotFoundException('User does not exist');
    if (await bcrypt.compare(signInUser.password, user?.password!)) {
      const responseDto = plainToClass(SignInEmailResponseDto, user);
      return responseDto;
    }
    throw new NotFoundException('Invalid credentials');
  }

  async authUser(userId: number) {
    let user;
    user = await this.authRepository.findUserById(userId);
    if (!user) throw new NotFoundException('User does not exist');
    user = plainToClass(AuthenticationResponseDto, user);

    // this should be separate request
    const socialStats = await this.authRepository.getSocialStats(userId);
    if (!socialStats) throw new NotFoundException('Social stats do not exist');

    // user should be renamed to response DTO
    return { user, socialStats };
  }

  async validateGoogleUser(createUser: CreatableGoogleUser) {
    const user = await this.authRepository.findUserByEmail(createUser.email);
    if (user) return user;

    const newUser = await this.authRepository.createGoogleUser(createUser);
    return newUser;
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

  async checkNameUniqueness(data: NameUniquenessRequestDto) {
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
