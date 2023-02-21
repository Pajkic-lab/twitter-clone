import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreatGoogleUserDto, CreateUserDto, ConfirmUserDto } from 'src/dtos';
import { AuthRepository } from './auth.repository';
import { Req } from '@nestjs/common/decorators';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

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

    if (!user) throw new NotFoundException('User does not exist');
    if (await bcrypt.compare(confirmUser.password, user.password)) return user;
    throw new NotFoundException('Invalid credentials');
  }

  async authUser(userId: number) {
    const user = await this.authRepository.findUserById(userId);
    if (!user) throw new NotFoundException('User does not exist');
    delete user.password;
    return { user };
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

  async logOut(@Req() request) {
    request.logOut(err => {
      if (err) throw new BadRequestException(err.message);
    });
    return;
  }

  async checkNameUniqueness(uniqueName: string) {
    const res = await this.authRepository.isUserNameUnique(uniqueName);
    if (res !== null) {
      return { isNameUnique: false };
    }
    return { isNameUnique: true };
  }

  async createUniqueUserName(userId: number, uniqueName: string) {
    let user;
    const res = await this.authRepository.isUserNameUnique(uniqueName);
    if (res !== null) {
      throw new NotFoundException('Uniqu user name already exist!');
    } else {
      user = await this.authRepository.createUserNameUnique(userId, uniqueName);
      if (!user) throw new HttpException('Error while updating unique user name', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { uniqueName: user.uniqueName };
  }
}
