import { PrismaService } from 'src/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { userDetails } from 'src/types'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async validateUser(details: userDetails) {
    console.log('auth service validate user')
    const user = await this.prisma.user.findUnique({
      where: {
        email: details.email,
      },
    })
    if (user) return user

    const newUser = await this.prisma.user.create({
      data: {
        email: details.email,
        name: details.displayName,
      },
    })
    return newUser
  }

  async findUser(id: number) {
    console.log('auth service findUser')
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }
}
