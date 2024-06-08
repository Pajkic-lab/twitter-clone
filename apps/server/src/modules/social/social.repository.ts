import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Social } from '@prisma/client';
import { PrismaService } from 'libs/data-access/src/lib/prisma/prisma.service';

@Injectable()
export class SocialRepository {
  constructor(private prisma: PrismaService) {}

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

  async getFollowers(userId: number, offset: number, limit: number) {
    // refactor this to use raw query or what ever, just move all the logic to db
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

      const followersWithStatus = [];

      for (const follower of followers) {
        const res = await this.prisma.social.findFirst({
          where: {
            userId,
            followingId: follower.user.id,
          },
        });

        followersWithStatus.push({
          ...follower.user,
          followingStatus: Boolean(res),
        });
      }

      return followersWithStatus;
    } catch (error) {
      throw new HttpException(
        'Error while getting followers',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getFollowingUsers(userId: number, offset: number, limit: number) {
    // refactor this to use raw query or what ever, just move all the logic to db
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

      const followingUserWithStatus = [];

      for (const followingUser of followingUsers) {
        const userWithStatus = {
          ...followingUser.following,
          followingStatus: true,
        };
        followingUserWithStatus.push(userWithStatus);
      }

      return followingUserWithStatus;
    } catch (error) {
      throw new HttpException(
        'Error while getting following users',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async getPublicProfileFollowers(
    meId: number,
    publicUserId: number,
    offset: number,
    limit: number
  ) {
    // refactor this to use raw query or what ever, just move all the logic to db
    try {
      const followers = await this.prisma.social.findMany({
        where: {
          followingId: publicUserId,
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

      const followersWithStatus = [];

      for (const follower of followers) {
        const res = await this.prisma.social.findFirst({
          where: {
            userId: meId,
            followingId: follower.user.id,
          },
        });

        followersWithStatus.push({
          ...follower.user,
          followingStatus: Boolean(res),
        });
      }

      return followersWithStatus;
    } catch (error) {
      throw new HttpException(
        'Error while getting followers',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
  //
  //
  //
  //
  async getPublicProfileFollowingUsers(
    meId: number,
    publicUserId: number,
    offset: number,
    limit: number
  ) {
    // refactor this to use raw query or what ever, just move all the logic to db
    try {
      const followingUsers = await this.prisma.social.findMany({
        where: {
          userId: publicUserId,
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

      const followingUserWithStatus = [];

      for (const followingUser of followingUsers) {
        const res = await this.prisma.social.findFirst({
          where: {
            userId: meId,
            followingId: followingUser.following.id,
          },
        });

        followingUserWithStatus.push({
          ...followingUser.following,
          followingStatus: Boolean(res),
        });
      }

      return followingUserWithStatus;
    } catch (error) {
      throw new HttpException(
        'Error while getting following users',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
