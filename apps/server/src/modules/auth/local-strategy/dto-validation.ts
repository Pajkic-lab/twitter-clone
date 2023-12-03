import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import {
  CreateUserDto,
  ConfirmUserDto,
  SignUpEmailRequestDto,
  SignInEmailRequestDto,
} from '@tw/data';

@Injectable()
export class DtoValidation {
  validateSignUpEmailRequestDto = async (dto: SignUpEmailRequestDto) => {
    const createUserDto = new SignUpEmailRequestDto(dto);

    const errors = await validate(createUserDto);

    if (errors.length > 0) {
      const validationErrors = errors.map((error: ValidationError) => {
        const property = Object.keys(error.constraints!)[0];
        return error?.constraints![property!];
      });

      throw new HttpException(
        {
          message: validationErrors.join(', '),
        },
        HttpStatus.BAD_REQUEST
      );
    }
  };

  validateSignInEmailRequestDto = async (dto: SignInEmailRequestDto) => {
    const createUserDto = new SignInEmailRequestDto(dto);

    const errors = await validate(createUserDto);

    if (errors.length > 0) {
      const validationErrors = errors.map((error: ValidationError) => {
        const property = Object.keys(error.constraints!)[0];
        return error?.constraints![property!];
      });

      throw new HttpException(
        {
          message: validationErrors.join(', '),
        },
        HttpStatus.BAD_REQUEST
      );
    }
  };
}
