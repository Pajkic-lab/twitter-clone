import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpEmailRequestDto {
  constructor(data: SignUpEmailRequestDto) {
    Object.assign(this, data);
  }
  /**
   * Key word "username" is being used because passport local strategy require exact key word.
   */
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  // @Length(5, 200)
  password: string;

  @IsNotEmpty()
  @IsString()
  confirmPassword: string;
}
