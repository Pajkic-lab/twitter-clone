import { CreatGoogleUserDto, CreateUserDto, ConfirmUserDto, UpdateUserDto, MediaDirectory } from 'src/dtos';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AuthMediaRepository } from './auth.media-repository';
import { HttpException } from '@nestjs/common/exceptions';
import { AuthRepository } from './auth.repository';
import { HttpStatus } from '@nestjs/common/enums';
import { Req } from '@nestjs/common/decorators';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository, private mediaRepository: AuthMediaRepository) {}

  async registerUser(createUser: CreateUserDto) {
    const salt = 10;

    const user = await this.authRepository.findUserByEmail(createUser.email);
    if (user) throw new NotFoundException('User already exist');

    createUser.password = await bcrypt.hash(createUser.password, salt);
    delete createUser.confirmPassword;

    const newUser = await this.authRepository.createUser(createUser);
    return newUser;
  }

  async loginUser(confirmUser: ConfirmUserDto) {
    const user = await this.authRepository.findUserByEmail(confirmUser.email);

    if (!user) throw new NotFoundException('User does not exist');
    if (await bcrypt.compare(confirmUser.password, user.password)) return user;
    throw new NotFoundException('Invalid credentials');
  }

  async authUser(userId: number) {
    const user = await this.authRepository.findUserById(userId);
    if (!user) throw new NotFoundException('User does not exist');
    delete user.password;
    const socialStats = await this.authRepository.getSocialStats(userId);
    if (!socialStats) throw new NotFoundException('Social stats do not exist');
    return { user, socialStats };
  }

  async validateGoogleUser(createUser: CreatGoogleUserDto) {
    const user = await this.authRepository.findUserByEmail(createUser.email);
    if (user) return user;

    const newUser = await this.authRepository.createGoogleUser(createUser);
    return newUser;
  }

  async findUser(userId: number) {
    const user = await this.authRepository.findUserById(userId);
    return user;
  }

  async logOut(@Req() request) {
    request.logOut(err => {
      if (err) throw new BadRequestException(err.message);
    });
    return;
  }

  async checkNameUniqueness(uniqueName: string) {
    const res = await this.authRepository.isUserNameUnique(uniqueName);
    if (res !== null) {
      return { isNameUnique: false };
    }
    return { isNameUnique: true };
  }

  async updateUniqueUserName(userId: number, uniqueName: string) {
    let user;
    const res = await this.authRepository.isUserNameUnique(uniqueName);
    if (res !== null) {
      throw new NotFoundException('Uniqu user name already exist!');
    } else {
      user = await this.authRepository.updateUserNameUnique(userId, uniqueName);
      if (!user) throw new HttpException('Error while updating unique user name', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { uniqueName: user.uniqueName };
  }

  async updateUser(userId: number, updateUser: UpdateUserDto) {
    let avatarUrl;
    let coverUrl;

    updateUser.id = userId;
    if (updateUser.avatar) {
      const res = await this.mediaRepository.uploadImage(updateUser.avatar, userId, MediaDirectory.Private);
      avatarUrl = res.url;
      updateUser.avatar = avatarUrl;
    }
    if (updateUser.cover) {
      const res = await this.mediaRepository.uploadImage(updateUser.cover, userId, MediaDirectory.Private);
      coverUrl = res.url;
      updateUser.cover = coverUrl;
    }

    const user = await this.authRepository.updateUser(updateUser);
    delete user.password;
    return { user };
  }

  async getPublicUser(publicUserId: number, userId?: number) {
    let followingStatus;
    if (publicUserId === userId) {
      throw new NotFoundException('Can not acces to specific user as authenticated same user');
    }
    const user = await this.authRepository.findUserById(publicUserId);
    if (!user) throw new NotFoundException('User does not exist');
    delete user.password;
    delete user.email;
    const socialStats = await this.authRepository.getSocialStats(publicUserId);

    if (!socialStats) throw new NotFoundException('Social status do not exist');
    if (userId) {
      followingStatus = await this.authRepository.getFollowingStatus(publicUserId, userId);
    }
    return { user, socialStats, followingStatus };
  }

  async followUser(userId, userIdToFollow) {
    const { followingCount, followersCount } = await this.authRepository.followUser(userId, userIdToFollow);
    return { followingCount, followersCount };
  }

  async unFollowUser(userId, userIdToUnFollow) {
    const { followingCount, followersCount } = await this.authRepository.unFollowUser(userId, userIdToUnFollow);
    return { followingCount, followersCount };
  }
}
