import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { DtoValidation } from './dto-validation';
import { ConfirmUserDto, CreateUserDto } from '@tw/data';

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
    const { username, email, password, confirmPassword } = request.body;
    let user: CreateUserDto | ConfirmUserDto;

    if (confirmPassword) {
      try {
        /**
         * validation is conducted in validate function because guard runs before validation pipe in controller.
         */

        await this.dtoValidation.validateCreateUserDto(
          username,
          email,
          password,
          confirmPassword
        );
      } catch (error) {
        throw error;
      }

      user = await this.authService.registerUser({
        name: username,
        email,
        password,
        confirmPassword,
      });
    } else {
      try {
        await this.dtoValidation.validateConfirmUserDto(email, password);
      } catch (error) {
        throw error;
      }

      user = await this.authService.loginUser({
        email,
        password,
      });
    }
    return user || null;
  }
}
