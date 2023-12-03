import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SignInEmailResponseDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
