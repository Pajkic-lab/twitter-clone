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
        name: details.displayName || 'testni input',
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

  // async deleteSession(request: Request, session: Record<string, any>) {
  //   delete request.user;
  //   session.destroy(err => {
  //     if (err) {
  //       console.log(err);
  //     }
  //   });
  //   await this.prisma.session.deleteMany({
  //     where: {
  //       sid: session.sid,
  //     },
  //   });
  // }
}
