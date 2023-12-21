import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { SignInEmailRequestDto, SignUpEmailRequestDto } from '@tw/data';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { DtoValidation } from './dto-validation';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private dtoValidation: DtoValidation
  ) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(request: Request): Promise<User> {
    const requestUser = request.body;

    const shapeDeterminate = async <
      T extends SignUpEmailRequestDto | SignInEmailRequestDto
    >(
      requestUser: T
    ): Promise<User> => {
      if ('confirmPassword' in requestUser) {
        try {
          await this.dtoValidation.validateSignUpEmailRequestDto(requestUser);
        } catch (error) {
          throw error;
        }

        return await this.authService.signUpUser(requestUser);
      } else {
        try {
          await this.dtoValidation.validateSignInEmailRequestDto(requestUser);
        } catch (error) {
          throw error;
        }

        return await this.authService.signInUser(requestUser);
      }
    };

    return await shapeDeterminate(requestUser);
  }
}
