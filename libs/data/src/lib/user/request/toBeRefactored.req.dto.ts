import { IsEmail, IsOptional, IsString, IsNotEmpty } from 'class-validator';

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
