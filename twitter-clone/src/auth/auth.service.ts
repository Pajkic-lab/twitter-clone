import { PrismaService } from 'src/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { userDetails } from 'src/types'

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async validateUser(details: userDetails) {
    console.log('Auth service!!!')
    console.log(details)
    const user = await this.prisma.user.findUnique({
      where: {
        email: details.email,
      },
    })
    if (user) return user
    console.log('User not found creating new User!!!')
    const newUser = await this.prisma.user.create({
      data: {
        email: details.email,
        name: details.displayName,
      },
    })
    return newUser
  }

  async findUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    })
    return user
  }
}
