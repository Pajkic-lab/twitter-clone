import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInEmailRequestDto {
  constructor(data: SignInEmailRequestDto) {
    Object.assign(this, data);
  }

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  // @Length(25, 200)
  email: string;

  @IsNotEmpty()
  @IsString()
  // @Length(5, 200)
  password: string;
}
