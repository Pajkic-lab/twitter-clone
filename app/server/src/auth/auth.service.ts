import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dtos/userDto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(details: UserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: details.email,
      },
    });
    if (user) return user;

    const newUser = await this.prisma.user.create({
      data: {
        email: details.email,
        name: details.displayName,
      },
    });
    return newUser;
  }

  async findUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }

  async validateUserLocal(details: { username: string; email: string; password: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: details.email,
      },
    });
    if (user) return user;

    const newUser = await this.prisma.user.create({
      data: {
        email: details.email,
        name: details.username,
        password: details.password,
      },
    });
    return newUser;
  }
}
