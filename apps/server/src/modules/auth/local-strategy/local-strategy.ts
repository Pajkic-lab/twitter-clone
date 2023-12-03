import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { DtoValidation } from './dto-validation';
import { SignInEmailRequestDto, SignUpEmailRequestDto } from '@tw/data';

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

  async validate(request: Request) {
    const requestUser = request.body;

    const shapeDeterminate = async <
      T extends SignUpEmailRequestDto | SignInEmailRequestDto
    >(
      requestUser: T
    ) => {
      if ('confirmPassword' in requestUser) {
        try {
          await this.dtoValidation.validateSignUpEmailRequestDto(requestUser);
        } catch (error) {
          throw error;
        }

        let payload;
        payload = await this.authService.registerUser(requestUser);
        return payload;
      } else {
        try {
          await this.dtoValidation.validateSignInEmailRequestDto(requestUser);
        } catch (error) {
          throw error;
        }

        let payload;
        payload = await this.authService.loginUser(requestUser);
        return payload;
      }
    };

    const user = await shapeDeterminate(requestUser);

    return user;
  }
}
