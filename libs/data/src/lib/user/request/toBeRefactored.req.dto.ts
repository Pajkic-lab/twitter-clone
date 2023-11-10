import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';

export class CreatGoogleUserDto {
  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}

export class CreateUserDto {
  constructor(data: CreateUserDto) {
    Object.assign(this, data);
  }

  @IsNotEmpty()
  @IsString()
  name: string;

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

export class ConfirmUserDto {
  // to resolve this do i need constructor and why?

  constructor(data: ConfirmUserDto) {
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

export class UpdateUserDto {
  @IsOptional()
  id: number;

  @IsOptional()
  name: string;

  @IsOptional()
  bio: string;

  @IsOptional()
  location: string;

  @IsOptional()
  website: string;

  @IsOptional()
  cover: string;

  @IsOptional()
  avatar: string;
}

export enum MediaDirectory {
  Private = 'private',
  Public = 'public',
}
