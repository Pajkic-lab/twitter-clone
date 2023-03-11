import { HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common/decorators';

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
}
