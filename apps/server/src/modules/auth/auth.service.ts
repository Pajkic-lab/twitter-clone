import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { Req } from '@nestjs/common/decorators';
import bcrypt from 'bcryptjs';
import { AuthMediaRepository } from './auth.media-repository';
import { AuthRepository } from './auth.repository';
import { Request } from 'express';
import {
  SignUpEmailRequestDto,
  CreatableUser,
  SignUpEmailResponseDto,
  SignInEmailRequestDto,
  SignInEmailResponseDto,
  AuthenticationResponseDto,
  CreatableGoogleUser,
  HttpResponse,
  UserBase,
  SocialStatsResponseDto,
} from '@tw/data';
import { createResponse } from '../../common/http/create-response';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '../../common/decorators/inject-mapper.decorator';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  // invoked from strategy
  async signUpUser(createUser: SignUpEmailRequestDto): Promise<User> {
    const salt = 10;

    const user = await this.authRepository.findUserByEmail(createUser.email);

    if (user) throw new NotFoundException('User already exist');

    const hashedPassword = await bcrypt.hash(createUser.password, salt);

    const creatableUser: CreatableUser = {
      name: createUser.username,
      email: createUser.email,
      password: hashedPassword,
    };

    return await this.authRepository.createUser(creatableUser);
  }

  // invoked from strategy
  async signInUser(signInUser: SignInEmailRequestDto): Promise<User> {
    const user = await this.authRepository.findUserByEmail(signInUser.email);

    if (!user) throw new NotFoundException('User does not exist');

    if (await bcrypt.compare(signInUser.password, user?.password!)) return user;

    throw new NotFoundException('Invalid credentials');
  }

  async signInGetUser(
    userId: number
  ): Promise<HttpResponse<SignInEmailResponseDto>> {
    const user = await this.authRepository.findUserById(userId);

    if (!user) throw new NotFoundException('User does not exist');

    const payload = this.mapper.map(user, UserBase, SignInEmailResponseDto);

    return createResponse({ payload, message: 'users.signInSuccess' });
  }

  async sigUpGetUser(
    userId: number
  ): Promise<HttpResponse<SignUpEmailResponseDto>> {
    const user = await this.authRepository.findUserById(userId);

    if (!user) throw new NotFoundException('User does not exist');

    const payload = this.mapper.map(user, UserBase, SignUpEmailResponseDto);

    return createResponse({ payload, message: 'users.signUpSuccess' });
  }

  async authUser(userId: number): Promise<
    HttpResponse<{
      user: AuthenticationResponseDto;
      socialStats: SocialStatsResponseDto;
    }>
  > {
    const user = await this.authRepository.findUserById(userId);

    if (!user) throw new NotFoundException('User does not exist');

    const authUser = this.mapper.map(user, UserBase, AuthenticationResponseDto);

    // this should be separate request
    const socialStats = await this.authRepository.getSocialStats(userId);

    if (!socialStats) throw new NotFoundException('Social stats do not exist');

    return createResponse({
      payload: { user: authUser, socialStats },
      message: 'users.authSuccess',
    });
  }

  async validateGoogleUser(createUser: CreatableGoogleUser): Promise<User> {
    const user = await this.authRepository.findUserByEmail(createUser.email);

    if (user) return user;

    return await this.authRepository.createGoogleUser(createUser);
  }

  async findUser(userId: number) {
    const user = await this.authRepository.findUserById(userId);
    return user;
  }

  async logOut(@Req() request: Request) {
    request.logOut((err) => {
      if (err) throw new BadRequestException(err.message);
    });
    return;
  }
}
