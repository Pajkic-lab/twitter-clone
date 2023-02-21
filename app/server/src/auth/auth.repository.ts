import { CreatGoogleUserDto, CreateUserDto } from 'src/dtos';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

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
}
