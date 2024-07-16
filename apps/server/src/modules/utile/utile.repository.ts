import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UtileRepository {
  constructor(private prisma: PrismaService) {}

  async getUserList() {
    try {
      return await this.prisma.user.findMany({
        take: 20,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      throw new HttpException(
        'Error while getting user list',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
