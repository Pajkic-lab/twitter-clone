import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { CreateUserDto, ConfirmUserDto } from '@tw/data';

@Injectable()
export class DtoValidation {
  validateCreateUserDto = async (
    username: string,
    email: string,
    password: string,
    confirmPassword: string
  ) => {
    const createUserDto = new CreateUserDto({
      name: username,
      email,
      password,
      confirmPassword,
    });

    const errors = await validate(createUserDto);

    if (errors.length > 0) {
      const validationErrors = errors.map((error: ValidationError) => {
        const property = Object.keys(error.constraints)[0];
        return error.constraints[property];
      });

      throw new HttpException(
        {
          message: validationErrors.join(', '),
        },
        HttpStatus.BAD_REQUEST
      );
    }
  };

  validateConfirmUserDto = async (email: string, password: string) => {
    const createUserDto = new ConfirmUserDto({
      email,
      password,
    });

    const errors = await validate(createUserDto);

    if (errors.length > 0) {
      const validationErrors = errors.map((error: ValidationError) => {
        const property = Object.keys(error.constraints)[0];
        return error.constraints[property];
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
