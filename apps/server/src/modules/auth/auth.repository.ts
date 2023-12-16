import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'libs/data-access/src/lib/prisma/prisma.service';
import {
  CreatableGoogleUser,
  CreatableUser,
  SignUpEmailResponseDto,
  SocialStatsResponseDto,
  UpdateUserDto,
  UpdateUserRequestDto,
  // User,
} from '@tw/data';
import { Social, User } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error while finding user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createUser({ name, email, password }: CreatableUser): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error while creating user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async createGoogleUser({ name, email }: CreatableGoogleUser): Promise<User> {
    try {
      return await this.prisma.user.create({
        data: {
          name,
          email,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error while creating user via google',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async findUserById(userId: number): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error while finding user via google',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async isUserNameUnique(uniqueName: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          uniqueName,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error while cheching name uniqueness',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateUserNameUnique(id: number, uniqueName: string): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          uniqueName,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error while cheching name uniqueness',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async updateUser(
    userId: number,
    { name, avatar, cover, bio, website, location }: UpdateUserRequestDto
  ): Promise<User> {
    try {
      return await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          ...(name && { name }),
          ...(avatar && { avatar }),
          ...(cover && { cover }),
          ...(bio && { bio }),
          ...(website && { website }),
          ...(location && { location }),
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error while editing user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getSocialStats(userId: number): Promise<SocialStatsResponseDto> {
    try {
      const followingCount = await this.prisma.social.count({
        where: { userId },
      });
      const followersCount = await this.prisma.social.count({
        where: {
          followingId: userId,
        },
      });
      return { followingCount, followersCount };
    } catch (error) {
      throw new HttpException(
        'Error while geting social stats',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getFollowingStatus(
    publicUserId: number,
    userId: number
  ): Promise<boolean> {
    try {
      const res = await this.prisma.social.findFirst({
        where: {
          userId,
          followingId: publicUserId,
        },
      });
      if (res) return true;
      return false;
    } catch (error) {
      throw new HttpException(
        'Error while geting social status',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async followUser(userId: number, userIdToFollow: number): Promise<Social> {
    try {
      return await this.prisma.social.create({
        data: {
          userId,
          followingId: userIdToFollow,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error while following user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async unFollowUser(userId: number, userIdToUnFollow: number) {
    try {
      return await this.prisma.social.deleteMany({
        where: {
          userId: userId,
          followingId: userIdToUnFollow,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error while following user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
