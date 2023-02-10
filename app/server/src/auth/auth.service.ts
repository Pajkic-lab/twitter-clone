import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatGoogleUserDto, CreateUserDto, ConfirmUserDto } from 'src/dtos';
import { AuthRepository } from './auth.repository';
import { Req } from '@nestjs/common/decorators';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  async registerUser(createUser: CreateUserDto) {
    const salt = 10;

    const user = await this.authRepository.findUserByEmail(createUser.email);
    if (user) throw new NotFoundException('User already exist');

    createUser.password = await bcrypt.hash(createUser.password, salt);
    delete createUser.confirmPassword;

    const newUser = await this.authRepository.createUser(createUser);
    return newUser;
  }

  async loginUser(confirmUser: ConfirmUserDto) {
    const user = await this.authRepository.findUserByEmail(confirmUser.email);

    if (!user) throw new NotFoundException('User do not exist');
    if (await bcrypt.compare(confirmUser.password, user.password)) return user;
    throw new NotFoundException('Invalid credentials');
  }

  async validateGoogleUser(createUser: CreatGoogleUserDto) {
    const user = await this.authRepository.findUserByEmail(createUser.email);
    if (user) return user;

    const newUser = await this.authRepository.createGoogleUser(createUser);
    return newUser;
  }

  async findUser(userId: number) {
    const user = await this.authRepository.findUserById(userId);
    return user;
  }

  logOut(@Req() request) {
    request.logOut(err => {
      if (err) throw new BadRequestException(err.message);
    });
  }
}
