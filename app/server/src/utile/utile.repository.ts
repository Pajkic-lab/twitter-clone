import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UtileRepository {
  constructor(private prisma: PrismaService) {}

  async getMostPopularUsers(userId: number) {
    try {
      return await this.prisma.user.findMany({
        where: {
          NOT: {
            id: userId,
          },
        },
        select: {
          id: true,
          name: true,
          uniqueName: true,
          avatar: true,
        },
        orderBy: {
          followers: {
            _count: 'desc',
          },
        },
        take: 3,
      });
    } catch (error) {
      throw new HttpException('Error while finding users', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSearchData(searchData: string, userId?: number) {
    try {
      const normalizedSearchData = searchData.toLowerCase();
      return await this.prisma.user.findMany({
        where: {
          OR: [{ uniqueName: { contains: normalizedSearchData } }, { name: { contains: normalizedSearchData } }],
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
      throw new HttpException('Error while searching for user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getUserList() {
    try {
      return await this.prisma.user.findMany({
        take: 20,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new HttpException('Error while getting user list', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getFollowers(userId: number, offset: number, limit: number) {
    try {
      const followers = await this.prisma.social.findMany({
        where: {
          followingId: userId,
        },
        select: {
          user: true,
        },
        orderBy: {
          user: {
            createdAt: 'desc',
          },
        },
        skip: offset,
        take: limit,
      });

      const followersWithStatus = await Promise.all(
        followers.map(async follower => {
          const res = await this.prisma.social.findFirst({
            where: {
              userId,
              followingId: follower.user.id,
            },
          });

          return {
            ...follower.user,
            followingStatus: Boolean(res),
          };
        }),
      );

      return followersWithStatus;
    } catch (error) {
      throw new HttpException('Error while getting followers', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getFollowingUsers(userId: number, offset: number, limit: number) {
    try {
      const followingUsers = await this.prisma.social.findMany({
        where: {
          userId,
        },
        select: {
          following: {
            select: {
              id: true,
              email: true,
              password: true,
              name: true,
              avatar: true,
              cover: true,
              uniqueName: true,
              bio: true,
              location: true,
              website: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        skip: offset,
        take: limit,
      });

      const followingUserWithStatus = await Promise.all(
        followingUsers.map(async followingUser => {
          return {
            ...followingUser.following,
            followingStatus: true,
          };
        }),
      );

      return followingUserWithStatus;
    } catch (error) {
      throw new HttpException('Error while getting followers', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
