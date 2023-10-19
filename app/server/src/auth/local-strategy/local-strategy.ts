import { CreateUserDto, ConfirmUserDto } from 'src/dtos';
import { PassportStrategy } from '@nestjs/passport';
import { DtoValidation } from './dto-validation';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';
import { Strategy } from 'passport-local';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private dtoValidation: DtoValidation) {
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

        await this.dtoValidation.validateCreateUserDto(username, email, password, confirmPassword);
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
