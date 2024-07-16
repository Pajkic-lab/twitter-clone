import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import {
  CreatableGoogleUser,
  CreatableUser,
  SocialStatsResponseDto,
} from '@tw/data';
import { PrismaService } from '../prisma/prisma.service';

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

  // this is duplicate, there is already findUserById in user repo
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
        'Error while getting social stats',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
