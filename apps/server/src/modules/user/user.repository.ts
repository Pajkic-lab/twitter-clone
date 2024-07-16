import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { User } from '@prisma/client';
import { SocialStatsResponseDto, UpdateUserRequestDto } from '@tw/data';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async isUserNameUnique(uniqueName: string): Promise<User | null> {
    try {
      return await this.prisma.user.findUnique({
        where: {
          uniqueName,
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error while checking name uniqueness',
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
        'Error while checking name uniqueness',
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

  async getMostPopularUsers(userId: number): Promise<User[]> {
    try {
      return await this.prisma.user.findMany({
        where: {
          AND: [
            {
              NOT: {
                id: userId,
              },
            },
            {
              NOT: {
                followers: {
                  some: {
                    userId: userId,
                  },
                },
              },
            },
          ],
        },
        orderBy: {
          followers: {
            _count: 'desc',
          },
        },
        take: 3, // this should come from API, it should not be hardcoded
      });
    } catch (error) {
      throw new HttpException(
        'Error while finding users',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getSearchData(searchData: string, userId?: number): Promise<User[]> {
    try {
      const normalizedSearchData = searchData.toLowerCase();
      return await this.prisma.user.findMany({
        where: {
          OR: [
            { uniqueName: { contains: normalizedSearchData } },
            { name: { contains: normalizedSearchData } },
          ],
          NOT: {
            id: userId,
          },
        },
        orderBy: {
          followers: {
            _count: 'desc',
          },
        },
        take: 10,
      });
    } catch (error) {
      throw new HttpException(
        'Error while searching for user',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
