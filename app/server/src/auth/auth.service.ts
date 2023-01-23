import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
// import { userDetails } from 'src/types';
import { UserDto } from 'src/dtos/userDto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async validateUser(details: UserDto) {
    console.log('auth service validate user, "second instance after google server on local"');
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
    console.log('auth service findUser');
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  }
}
