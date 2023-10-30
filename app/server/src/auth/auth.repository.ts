import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto, CreatGoogleUserDto, UpdateUserDto } from 'src/dtos';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaService) {}

  async findUserByEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          email,
        },
      });
    } catch (error) {
      throw new HttpException('Error while finding user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createUser({ name, email, password }: CreateUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          name,
          email,
          password,
        },
      });
    } catch (error) {
      throw new HttpException('Error while creating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createGoogleUser({ name, email }: CreatGoogleUserDto) {
    try {
      return await this.prisma.user.create({
        data: {
          name,
          email,
        },
      });
    } catch (error) {
      throw new HttpException('Error while creating user via google', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findUserById(userId: number) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
    } catch (error) {
      throw new HttpException('Error while finding user via google', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async isUserNameUnique(uniqueName: string) {
    try {
      return await this.prisma.user.findUnique({
        where: {
          uniqueName,
        },
      });
    } catch (error) {
      throw new HttpException('Error while cheching name uniqueness', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUserNameUnique(id: number, uniqueName: string) {
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
      throw new HttpException('Error while cheching name uniqueness', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateUser({ id, name, avatar, cover, bio, website, location }: UpdateUserDto) {
    try {
      return await this.prisma.user.update({
        where: {
          id,
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
      throw new HttpException('Error while editing user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getSocialStats(userId: number) {
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
      throw new HttpException('Error while geting social stats', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getFollowingStatus(publicUserId: number, userId: number) {
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
      throw new HttpException('Error while geting social status', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async followUser(userId: number, userIdToFollow: number) {
    try {
      return await this.prisma.social.create({
        data: {
          userId,
          followingId: userIdToFollow,
        },
      });
    } catch (error) {
      throw new HttpException('Error while following user', HttpStatus.INTERNAL_SERVER_ERROR);
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

      // const followingCount = await this.prisma.social.count({
      //   where: { userId },
      // });

      // const followersCount = await this.prisma.social.count({
      //   where: {
      //     followingId: userId,
      //   },
      // });
      // return { followingCount, followersCount };
    } catch (error) {
      throw new HttpException('Error while following user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
